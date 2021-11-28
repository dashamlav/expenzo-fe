import React from 'react'
import IntroComponent from './Intro/IntroComponent'
import AuthComponent from '../Landing/Authentication/AuthComponent'

const LandingPageComponent = () => {

    return(
        <div className="main-landing">
            <IntroComponent></IntroComponent>
            <AuthComponent></AuthComponent>
        </div>        
    )
}

export default LandingPageComponent