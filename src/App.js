import React from 'react'
import './App.css';
import Header from './components/Header/HeaderComponent'
import { Route, Routes } from 'react-router-dom'
import LandingPageComponent from './components/Landing/LandingPageComponent'
import ProfileComponent from './components/Profile/ProfileComponent'
import RequireAuth from './utils/requireAuth'
import { ExpenseContextProvider } from './contextManager/ExpenseContext'
import { ExpenseFilterProvider } from './contextManager/ExpenseFilterContext'
import AnalyticsComponent from './components/Analytics/AnalyticsComponent'

function App() {

  return (
    <div className="App">
      <Header></Header>
        <Routes>
            <Route path='/' element={<LandingPageComponent/>}/>
              <Route path='/profile' element={
                <RequireAuth>
                  <ExpenseFilterProvider>
                    <ExpenseContextProvider>
                      <ProfileComponent/>
                    </ExpenseContextProvider>
                  </ExpenseFilterProvider>
                </RequireAuth>}
              />
            <Route path='/account-settings' element={<RequireAuth><h2>Account settings</h2></RequireAuth>}/>
            <Route path='/analytics' element={<RequireAuth><AnalyticsComponent/></RequireAuth>}></Route>
        </Routes>
      
    </div>
  );
}

export default App;
