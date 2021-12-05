import React, {useContext, useEffect, useState} from 'react'
import './App.css';
import Header from './components/Header/HeaderComponent'
import { Route, Routes } from 'react-router-dom'
import RootRoute from './routes/RootRoute'
import AuthContext from './contextManager/AuthContextManager';
import { urlFormat } from './utils/urlFormat'
import LandingPageComponent from './components/Landing/LandingPageComponent'
import ProfileComponent from './components/Profile/ProfileComponent'

function App() {
  const authCtx = useContext(AuthContext)
  const [hasValidToken, setHasValidToken] = useState(false)

  useEffect(() => {
    const token = authCtx.token
    const email = authCtx.userEmail

    if (!(token && email)) setHasValidToken(false)
    
    const validateTokenUrl = urlFormat('accounts/validate-token')
    const validateFormData = new FormData()
    validateFormData.append('token', token)
    validateFormData.append('email', email)

    const requestOptions = {
      method: 'POST',
      body: validateFormData
    }

    fetch(validateTokenUrl, requestOptions)
      .then((res)=>{
        if(res.ok) setHasValidToken(true)
        else setHasValidToken(false)
      })
      .catch((networkErr)=>{
      })

  },[authCtx.token, authCtx.userEmail])

  return (
    <div className="App">
      <Header></Header>
        <Routes>
            <Route path='/' element={<RootRoute/>}/>
        </Routes>
      
    </div>
  );
}

export default App;
