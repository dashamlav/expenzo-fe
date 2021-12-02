import React from 'react'
import './App.css';
import Header from './components/Header/HeaderComponent'
import { Route, Routes } from 'react-router-dom'
import RootRoute from './routes/RootRoute'

function App() {
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
