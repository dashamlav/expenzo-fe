import React, {useContext} from 'react'
import './register.scss'
import AuthContext from '../../../../contextManager/AuthContextManager'

const RegisterComponent = () => {
    const authCtx = useContext(AuthContext)

    const registerSubmitHandler = (event) => {
        event.preventDefault()
        const name = event.target.name.value
        const email = event.target.email.value
        const password = event.target.password.value
        const confirmPassword = event.target.cnf_password.value

        //Validate fields here, and then send request to backend.
        // Get token in response and set AuthContext
        // authCtx.loginHandler(token)
    }
    return (
        <div className="register-card-content">
            <div id="register-card-title">
                <h2>REGISTER</h2>
                <div class="underline-title"></div>
            </div>
            <form class="login-form" onSubmit={registerSubmitHandler}>
                <label for="register-name" style={{'padding-top':'13px'}}>&nbsp;NAME
                </label>
                <input id="register-name" class="register-form-content" name="name" required />
                <div class="register-form-border"></div>
                <label for="register-user-email" style={{'padding-top':'13px'}}>
                    &nbsp;EMAIL
                </label>
                <input id="register-user-email" class="register-form-content" type="email" name="email" required />
                <div class="register-form-border"></div>
                <label for="register-user-password" style={{'padding-top':'13px'}}>&nbsp;PASSWORD
                </label>
                <input id="register-user-password" class="register-form-content" type="password" name="password" required />
                <div class="register-form-border"></div>

                <label for="register-user-re-password" style={{'padding-top':'13px'}}>&nbsp;CONFIRM PASSWORD
                </label>
                <input id="register-user-re-password" class="register-form-content" type="password" name="cnf_password" required />
                <div class="register-form-border"></div>

                <input id="register-submit-btn" type="submit" name="submit" value="REGISTER" />
            </form>
        </div>

    )
}

export default RegisterComponent