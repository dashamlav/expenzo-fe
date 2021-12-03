import React, { useContext } from 'react'
import LandingPageComponent from '../components/Landing/LandingPageComponent'
import ProfileComponent from '../components/Profile/ProfileComponent'
import AuthContext from '../contextManager/AuthContextManager'

const RootRoute = () => {

    const authCtx = useContext(AuthContext)

    return (
        <React.Fragment>
            {(authCtx.isLoggedIn)? <ProfileComponent/> : <LandingPageComponent/>}            
        </React.Fragment>
    )
}

export default RootRoute