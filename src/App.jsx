import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Layout from './pages/Layout'
import RequiredAuth from './pages/RequiredAuth'
import Notes from './pages/Notes'

export default function App() {
  return (
    <>
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='/' element={<RequiredAuth />}>
          <Route path='/' element={<Layout />}>
            <Route path='/' element={<Notes />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}
