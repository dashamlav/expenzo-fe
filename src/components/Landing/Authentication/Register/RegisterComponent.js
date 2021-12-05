import React, { useContext, useState } from 'react'
import '../auth.scss'
import AuthContext from '../../../../contextManager/AuthContextManager'
import { urlFormat } from '../../../../utils/urlFormat'

const RegisterComponent = () => {
    const [errorMsg, setErrorMsg] = useState(null)
    const [borderClass, setBorderClass] = useState("auth-form-border")
    const authCtx = useContext(AuthContext)

    const registerSubmitHandler = (event) => {
        event.preventDefault()
        const name = event.target.name.value
        const email = event.target.email.value
        const password = event.target.password.value
        const confirmPassword = event.target.cnf_password.value
    
        if (password !== confirmPassword) {
            setErrorMsg("Passwords don't match")
            return
        }
        const registerApiUrl = urlFormat('accounts/register')
        const registerFormData = new FormData()
        registerFormData.append('name', name)
        registerFormData.append('email', email)
        registerFormData.append('password', password)
        const requestOptions = {
            method: "POST",
            body: registerFormData
        }
        fetch(registerApiUrl, requestOptions)
            .then((res)=>{
                if (!res.ok) {
                    setErrorMsg("Account already exists!")
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
                    authCtx.loginHandler(token,email)
                }
            })
            .catch((networkErr)=>{
                setErrorMsg("Network error")
                console.log(networkErr)
            })
    }
    return (
        <div className="auth-card-content">
            <div className="auth-card-title">
                <h2>REGISTER</h2>
                <div className="underline-title" style={{width:160}}></div>
            </div>
            <form className="auth-form" onSubmit={registerSubmitHandler}>
                <label for="register-name" style={{'padding-top':'13px'}}>&nbsp;NAME
                </label>
                <input id="register-name" className="auth-form-content" name="name" required />
                <div className={borderClass}></div>
                <label for="register-user-email" style={{'padding-top':'13px'}}>
                    &nbsp;EMAIL
                </label>
                <input id="register-user-email" className="auth-form-content" type="email" name="email" required />
                <div className={borderClass}></div>
                <label for="register-user-password" style={{'padding-top':'13px'}}>&nbsp;PASSWORD
                </label>
                <input id="register-user-password" className="auth-form-content" type="password" name="password" minlength="10" required />
                <div className={borderClass}></div>

                <label for="register-user-re-password" style={{'padding-top':'13px'}}>&nbsp;CONFIRM PASSWORD
                </label>
                <input id="register-user-re-password" className="auth-form-content" type="password" name="cnf_password" required />
                <div className={borderClass}></div>
                {
                    (errorMsg) && <legend className="error-text">{errorMsg}</legend>
                }
                <input className="auth-submit-btn" type="submit" name="submit" value="REGISTER" />
            </form>
        </div>

    )
}

export default RegisterComponent