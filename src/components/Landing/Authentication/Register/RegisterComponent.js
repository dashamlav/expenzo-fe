import React from 'react'
import './register.scss'

const RegisterComponent = () => {

    return (
        <div className="register-card-content">
            <div id="register-card-title">
                <h2>REGISTER</h2>
                <div class="underline-title"></div>
            </div>
            <form class="login-form">
                <label for="register-name" style={{'padding-top':'13px'}}>&nbsp;NAME
                </label>
                <input id="register-name" class="register-form-content" required />
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
                <input id="register-user-re-password" class="register-form-content" type="password" name="password" required />
                <div class="register-form-border"></div>

                <input id="register-submit-btn" type="submit" name="submit" value="REGISTER" />
            </form>
        </div>

    )
}

export default RegisterComponent