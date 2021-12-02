import React, {useState} from 'react'
import { useCookies } from 'react-cookie'

const AuthContext = React.createContext({
    token: null,
    isLoggedIn: false,
    loginHandler: (token) => {},
    logoutHandler: () => {} 
})

export const AuthContextProvider = (props) => {

    const [cookies, setCookie, deleteCookie] = useCookies([])
    const initialToken = cookies['auth_token'] ? cookies['auth_token'] : null
    const [token, setToken] = useState(initialToken)
    const isLoggedIn = token ? true : false

    const loginHandler = (token) => {
        setCookie('auth_token', token)
        setCookie('logged_in', true)
        setToken(token)
    }
    const logoutHandler = () => {
        deleteCookie('auth_token')
        deleteCookie('logged_in')
        setToken(null)
    }

    const initialContext = {
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