import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Logout from './pages/Logout/Logout';
import Auth from './pages/Auth/Auth';
import ProtectedRoute from './config/ProtectedRoute';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/auth' element={<Auth/>}/>
        <Route path='/logout' element={
          <ProtectedRoute>
            <Logout />
          </ProtectedRoute>
        }/>
      </Routes>
    </div>
  )
}

export default App
