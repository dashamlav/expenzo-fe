import React, { useContext } from 'react'
import IntroComponent from './Intro/IntroComponent'
import AuthComponent from '../Landing/Authentication/AuthComponent'
import AuthContext from '../../contextManager/AuthContextManager'
import { Navigate } from 'react-router-dom'
import './landing.scss'

const LandingPageComponent = () => {

    const authCtx = useContext(AuthContext)

    return(
        <React.Fragment>
            {
                (authCtx.isLoggedIn) ?
                <Navigate to="/profile" replace></Navigate> :
                <div className="main-landing">
                    <IntroComponent></IntroComponent>
                    <AuthComponent></AuthComponent>
                </div>   
            }
        </React.Fragment>
             
    )
}

export default LandingPageComponent