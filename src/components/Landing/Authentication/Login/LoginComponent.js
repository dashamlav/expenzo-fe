import React, {useContext} from 'react'
import './login.scss'
import AuthContext from '../../../../contextManager/AuthContextManager'

const LoginComponent = () => {

    const authCtx = useContext(AuthContext)

    const loginSubmitHandler = (event) => {
        event.preventDefault()
        const email = event.target.email.value
        const password = event.target.password.value
        
       //Validate fields here, and then send request to backend.
        // Get token in response and set AuthContext
        // authCtx.loginHandler(token)
    }

    return( 
        <div className="login-card-content">
            <div id="login-card-title">
                <h2>LOGIN</h2>
                <div class="underline-title"></div>
            </div>
            <form class="login-form" onSubmit={loginSubmitHandler}>
                <label for="login-user-email" style={{'padding-top':'13px'}}>
                    &nbsp;EMAIL
                </label>
                <input id="login-user-email" class="login-form-content" type="email" name="email" required />
                <div class="login-form-border"></div>
                <label for="login-user-password" style={{'padding-top':'13px'}}>&nbsp;PASSWORD
                </label>
                <input id="login-user-password" class="login-form-content" type="password" name="password" required />
                <div class="login-form-border"></div>
                <a href="#">
                <legend id="forgot-password">Forgot password?</legend>
                </a>
                <input id="login-submit-btn" type="submit" name="submit" value="LOGIN" />
            </form>
        </div>
        
    )
}

export default LoginComponent