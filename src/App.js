import React, { Suspense } from 'react'
import './App.css';
import Header from './components/Header/HeaderComponent'
import { Route, Routes } from 'react-router-dom'
import RequireAuth from './utils/requireAuth'
import { ExpenseContextProvider } from './contextManager/ExpenseContext'
import { ExpenseFilterProvider } from './contextManager/ExpenseFilterContext'
import LoadingSpinner from './components/UI/Loading'

const LandingPageComponent = React.lazy(()=>import('./components/Landing/LandingPageComponent'))
const ProfileComponent = React.lazy(()=>import('./components/Profile/ProfileComponent'))
const AnalyticsComponent = React.lazy(()=>import('./components/Analytics/AnalyticsComponent'))

function App() {

  return (
    <div className="App">
      <Header></Header>
        <Suspense fallback={<LoadingSpinner/>}>
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
              <Route path='/account-settings' element={<RequireAuth><h2>Working on it!</h2></RequireAuth>}/>
              <Route path='/analytics' element={<RequireAuth><AnalyticsComponent/></RequireAuth>}></Route>
          </Routes>
        </Suspense>
      
    </div>
  );
}

export default App;
