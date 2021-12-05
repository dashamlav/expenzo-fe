import React, { useState } from 'react'
import './auth.scss'
import LoginComponent from './Login/LoginComponent'
import RegisterComponent from './Register/RegisterComponent'
import Card from '../../UI/Card'

const AuthComponent = () => {

    let loginCardText = `Don't have an account yet?`
    let registerCardText = `Back to login`

    const [currentMode, setCurrentMode] = useState('login') 
    const [bottomText, setBottomText] = useState(loginCardText)   

    const changeState = () => {
        if (currentMode === 'login') {
            setCurrentMode('register')
            setBottomText(registerCardText)
        } else {
            setCurrentMode('login')
            setBottomText(loginCardText)
        }
    }
    return(
        <div className="auth-card">
            <Card>
                {
                    (currentMode === 'login') ?    
                    <LoginComponent></LoginComponent>: 
                    <RegisterComponent></RegisterComponent>
                }
                <p id="bottom-text" onClick={changeState}>{bottomText}</p>
            </Card>
        </div>
    )
}

export default AuthComponent