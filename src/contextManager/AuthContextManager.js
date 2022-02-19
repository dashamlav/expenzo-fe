import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { urlFormat } from '../utils/urlFormat'

const AuthContext = React.createContext({
    userEmail: null,
    token: null,
    token_expiry: null,
    isLoggedIn: false,
    loginHandler: (token, userEmail) => {},
    logoutHandler: () => {} 
})

export const AuthContextProvider = (props) => {

    const [cookies, setCookie, deleteCookie] = useCookies(['auth_token', 'token_expiry', 'logged_in', 'user_email'])
    let initialToken = cookies['auth_token'] ? cookies['auth_token'] : null
    let initialEmail = cookies['user_email'] ? cookies['user_email'] : null
    let initialExpiry = cookies['token_expiry'] ? cookies['token_expiry']: null
    const [token, setToken] = useState(initialToken)
    const [tokenExpiryTime, setTokenExpiryTime] = useState(initialExpiry)
    const [userEmail, setUserEmail] = useState(initialEmail)
    const isLoggedIn = token ? true : false

    const loginHandler = (token, expiryTime, userEmail) => {
        setCookie('auth_token', token)
        setCookie('token_expiry', expiryTime)
        setCookie('logged_in', true)
        setCookie('user_email', userEmail)
        setToken(token)
        setUserEmail(userEmail)
    }
    const logoutHandler = () => {
        deleteCookie('auth_token')
        deleteCookie('logged_in')
        deleteCookie('user_email')
        setToken(null)
        setUserEmail(null)
    }

    useEffect(()=> {

        if (initialExpiry && initialEmail && initialToken) {
            let expiryTime = new Date(initialExpiry)
            let currentTime = new Date()

            if (currentTime>expiryTime) {
                const refreshTokenUrl = urlFormat('accounts/refresh-token')
                const payload = {
                    email: initialEmail,
                    token: initialToken
                }
                const requestOptions = {
                    method: 'POST',
                    body: JSON.stringify(payload),
                    headers: {'Content-Type': 'application/json'}
                }
              
                fetch(refreshTokenUrl, requestOptions)
                    .then(res=>res.json())
                    .then(res=>{
                        if(token !== res.token){
                            setCookie('auth_token',res.token)
                            setCookie('token_expiry',res.tokenExpiryTime)
                            setToken(res.token)
                            setTokenExpiryTime(res.tokenExpiryTime)
                        }
                    })
                    .catch(err=>err)
            }
        }
    },[initialEmail, initialExpiry, initialToken, token])


    const initialContext = {
        userEmail: userEmail,
        token: token,
        token_expiry: tokenExpiryTime,
        isLoggedIn: isLoggedIn,
        loginHandler: loginHandler,
        logoutHandler: logoutHandler,
    }
    return(
        <AuthContext.Provider value={initialContext}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext