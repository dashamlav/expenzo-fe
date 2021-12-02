import React, { useEffect, useState } from 'react'
import LandingPageComponent from '../components/Landing/LandingPageComponent'
import ProfileComponent from '../components/Profile/ProfileComponent'

const RootRoute = () => {

    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(()=> {
        let isLoggenIn = false;
        setLoggedIn(isLoggenIn)
    },[])

    return (
        <React.Fragment>
            {(loggedIn)? <ProfileComponent/> : <LandingPageComponent/>}            
        </React.Fragment>
    )
}

export default RootRoute