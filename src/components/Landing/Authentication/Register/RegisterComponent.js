import React, { useContext, useState } from 'react'
import '../auth.scss'
import AuthContext from '../../../../contextManager/AuthContextManager'
import { urlFormat } from '../../../../utils/urlFormat'
import { useNavigate } from 'react-router-dom'

const RegisterComponent = () => {
    const [errorMsg, setErrorMsg] = useState(null)
    const [borderClass, setBorderClass] = useState("auth-form-border")
    const [step, setStep] = useState(1)
    const authCtx = useContext(AuthContext)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({})
    const [expiryTime, setExpiryTime] = useState(90)

    const getFormDetails = (event) => {
        event.preventDefault()
        const name = event.target.name.value
        const email = event.target.email.value
        const password = event.target.password.value
        const confirmPassword = event.target.cnf_password.value

        if (password !== confirmPassword) {
            setErrorMsg("Passwords don't match")
            return
        }

        setFormData({
            name: name,
            email: email,
            password: password
        })

        const registerPreflightUrl = urlFormat('accounts/register-preflight')
        const preflightFormData = new FormData()
        preflightFormData.append('name', name)
        preflightFormData.append('email',email)

        const requestOptions = {
            method: "POST",
            body: preflightFormData
        }

        fetch(registerPreflightUrl, requestOptions)
            .then(res=>{
                if(res.status === 400) {
                    setErrorMsg("Account already exists!")
                    setBorderClass("auth-form-border-error")
                } 
                else if (!res.ok) {
                    setErrorMsg("Something went wrong")
                    setBorderClass("auth-form-border-error")
                }
                else {
                    setErrorMsg(null)
                    setBorderClass("auth-form-border")
                    setStep(2)
                    const expiryInterval = setInterval(()=>{
                        setExpiryTime(secondsToExpire=>{
                            if (secondsToExpire<0) {
                                window.location.reload()
                                clearInterval(expiryInterval)
                            }
                            return secondsToExpire-1
                        })
                    },1000)
                }
            })
            .catch((networkErr)=>{
                setErrorMsg("Network error")
            })
 
    }

    const registerSubmitHandler = (event) => {
        event.preventDefault()
        let otpString = ''
        for (let inputIndex of [1,2,3,4,5,6]) {
            let inputValue = event.target[`otp-input-${inputIndex}`].value
            otpString += inputValue
        }

        if (otpString.length !== 6) {
            setErrorMsg("Invalid OTP")
            return
        }

        const registerApiUrl = urlFormat('accounts/register')
        const registerFormData = new FormData()
        registerFormData.append('name', formData.name)
        registerFormData.append('email', formData.email)
        registerFormData.append('password', formData.password)
        registerFormData.append('otp', otpString)

        const requestOptions = {
            method: "POST",
            body: registerFormData
        }
        fetch(registerApiUrl, requestOptions)
            .then((res)=>{
                if (!res.ok) {
                    setErrorMsg("Incorrect OTP")
                    setTimeout(()=>window.location.reload(),2000)
                } else {
                    setErrorMsg(null)
                    return res.json()
                }
            })
            .then((data)=>{
                if(data) {
                    const token = data.token
                    authCtx.loginHandler(token,formData.email)
                    navigate('/profile')
                }
            })
            .catch((networkErr)=>{
                setErrorMsg("Network error")
            })
    }
    return (

        <div className="auth-card-content">

            {
                step === 1 ?
                <React.Fragment>
                    <div className="auth-card-title">
                        <h2>REGISTER</h2>
                        <div className="underline-title" style={{width:160}}></div>
                    </div>
                    <form className="auth-form" onSubmit={getFormDetails}>
                        <label for="register-name" style={{paddingTop:'13px'}}>&nbsp;NAME
                        </label>
                        <input id="register-name" className="auth-form-content" name="name" required />
                        <div className={borderClass}></div>
                        <label for="register-user-email" style={{paddingTop:'13px'}}>
                            &nbsp;EMAIL
                        </label>
                        <input id="register-user-email" className="auth-form-content" type="email" name="email" required />
                        <div className={borderClass}></div>
                        <label for="register-user-password" style={{paddingTop:'13px'}}>&nbsp;PASSWORD
                        </label>
                        <input id="register-user-password" className="auth-form-content" type="password" name="password" minLength="10" required />
                        <div className={borderClass}></div>

                        <label for="register-user-re-password" style={{paddingTop:'13px'}}>&nbsp;CONFIRM PASSWORD
                        </label>
                        <input id="register-user-re-password" className="auth-form-content" type="password" name="cnf_password" required />
                        <div className={borderClass}></div>
                        {
                            (errorMsg) && <legend className="error-text">{errorMsg}</legend>
                        }
                        <input className="auth-submit-btn" type="submit" name="submit" value="REGISTER" />
                    </form>
                </React.Fragment>:
                <form className="auth-form" onSubmit={registerSubmitHandler}>
                    <div className="auth-card-title">
                        <h2>ENTER OTP</h2>
                        
                        {
                            [1,2,3,4,5,6].map(inputIndex=>
                                <input name={`otp-input-${inputIndex}`} key={inputIndex} maxLength="1" autoComplete="off"
                                    onChange={
                                        (ev)=>{
                                            if (ev.target.value) {
                                                if(ev.target.nextSibling) ev.target.nextSibling.focus()
                                            } else {
                                                if(ev.target.previousSibling) ev.target.previousSibling.focus()
                                            }
                                        }
                                }>
                                </input>
                            )
                        }  
                    <p style={{marginBottom:"0",fontFamily:"Futura"}}>

                        {
                            expiryTime>0?
                            `Expires in ${expiryTime}s`:
                            'OTP expired'
                        }
                    </p>
                    </div>
                    <input className="auth-submit-btn" style={{marginTop:"1em"}} type="submit" name="submit" value="REGISTER" />  
                    {
                        (errorMsg) && <legend className="otp-error-text">{errorMsg}</legend>
                    }                   
                </form>
            }
        </div>

    )
}

export default RegisterComponent