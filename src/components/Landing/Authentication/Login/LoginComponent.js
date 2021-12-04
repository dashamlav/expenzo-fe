import React, { useContext, useState } from 'react'
import '../auth.scss'
import AuthContext from '../../../../contextManager/AuthContextManager'
import { urlFormat } from '../../../../utils/urlFormat'

const LoginComponent = () => {

    const [errorMsg, setErrorMsg] = useState(null)
    const [borderClass, setBorderClass] = useState("auth-form-border")
    const authCtx = useContext(AuthContext)

    const loginSubmitHandler = (event) => {
        event.preventDefault()
        const email = event.target.email.value
        const password = event.target.password.value
        
        const loginApiUrl = urlFormat('accounts/login')
        const loginFormData = new FormData()
        loginFormData.append('email', email)
        loginFormData.append('password', password)
        const requestOptions = {
            method: "POST",
            body: loginFormData
        }
        fetch(loginApiUrl, requestOptions)
            .then((res)=>{
                if (!res.ok) {
                    setErrorMsg("Authentication failed")
                    setBorderClass("auth-form-border-error")
                } else {
                    setErrorMsg(null)
                    setBorderClass("auth-form-border")
                    return res.json()
                }
            })
            .then((data)=>{
                if(data) {
                    const token = data.token
                    authCtx.loginHandler(token)
                }
            })
            .catch((networkErr)=>{
                setErrorMsg("Network error")
                console.log(networkErr)
            })
       
    }

    return( 
        <div className="auth-card-content">
            <div className="auth-card-title">
                <h2>LOGIN</h2>
                <div className="underline-title"></div>
            </div>
            <form class="auth-form" onSubmit={loginSubmitHandler}>
                <label for="login-user-email" style={{'padding-top':'13px'}}>
                    &nbsp;EMAIL
                </label>
                <input id="login-user-email" className="auth-form-content" type="email" name="email" required />
                <div className={borderClass}></div>
                <label for="login-user-password" style={{'padding-top':'13px'}}>&nbsp;PASSWORD
                </label>
                <input id="login-user-password" className="auth-form-content" type="password" name="password" required />
                <div className={borderClass}></div>
                {/* <a href="#">
                <legend id="forgot-password">Forgot password?</legend>
                </a> */}
                {
                    (errorMsg) && <legend className="error-text">{errorMsg}</legend>
                }
                <input className="auth-submit-btn" type="submit" name="submit" value="LOGIN" />
            </form>
        </div>
        
    )
}

export default LoginComponent