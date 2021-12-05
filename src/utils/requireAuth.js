import React, { useContext } from 'react'
import AuthContext from '../contextManager/AuthContextManager'
import { Navigate } from 'react-router-dom'

const RequireAuth = (props) => {
    const authCtx = useContext(AuthContext)
    const isLoggedIn = authCtx.isLoggedIn

    return (
        <React.Fragment>
            {
                (isLoggedIn) ?
                props.children :
                <Navigate to="/" replace />

            }
        </React.Fragment>
    )

}

export default RequireAuth