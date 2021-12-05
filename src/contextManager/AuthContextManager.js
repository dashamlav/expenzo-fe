import React, {useState} from 'react'
import { useCookies } from 'react-cookie'

const AuthContext = React.createContext({
    userEmail: null,
    token: null,
    isLoggedIn: false,
    loginHandler: (token) => {},
    logoutHandler: () => {} 
})

export const AuthContextProvider = (props) => {

    const [cookies, setCookie, deleteCookie] = useCookies(['auth_token', 'logged_in'])
    const initialToken = cookies['auth_token'] ? cookies['auth_token'] : null
    const initialEmail = cookies['user_email'] ? cookies['user_email'] : null
    const [token, setToken] = useState(initialToken)
    const [userEmail, setUserEmail] = useState(initialEmail)
    const isLoggedIn = token ? true : false

    const loginHandler = (token, userEmail) => {
        setCookie('auth_token', token)
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

    const initialContext = {
        userEmail: userEmail,
        token: token,
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