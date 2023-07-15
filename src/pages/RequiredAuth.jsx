import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

export default function RequiredAuth() {
  const {isAuth} = useContext(AuthContext)
  if(isAuth) {
    return <Outlet />
  }
  return <Navigate to='/login' replace/>
}
