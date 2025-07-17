import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import Home from '../pages/Home'
import Packages from '../pages/Tours' // Rename Tours to Packages
import Contact from '../pages/Contact'
import Register from '../pages/Register'
import Login from '../pages/Login'

const Router = () => {
  return (
    <Routes>
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/home' element={<Home />} />
        <Route path='/packages' element={<Packages />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
    </Routes>
  )
}

export default Router
