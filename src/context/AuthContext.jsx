import { createContext, useState } from 'react'
import api from '../api'
import { useToast } from '@chakra-ui/react'

export const AuthContext = createContext({})

const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  const register = (user) => {
    setIsLoading(true)
    api
      .post('/auth/register', user)
      .then((result) => {
        setIsAuth(true)
        setIsLoading(false)
      })
      .catch((error) => {
        setIsAuth(false)
        setIsLoading(false)
        toast({
          status: 'error',
          colorScheme: 'red',
          title: error.response.data.error,
        })
      })
  }

  const login = (user) => {
    setIsLoading(true)
    api
      .post('/auth/login', user)
      .then((result) => {
        setIsAuth(true)
        setIsLoading(false)

        for (let key in result.data) {
          localStorage.setItem(key, JSON.stringify(result.data[key]))
        }
      })
      .catch((error) => {
        setIsAuth(false)
        setIsLoading(false)
        toast({
          status: 'error',
          colorScheme: 'red',
          title: error.response.data.error,
        })
      })
  }

  const verify = () => {
    setIsLoading(true)
    api
      .get('/auth/verify', {
        headers: {
          Authorization: JSON.parse(localStorage.getItem('accessToken')),
        },
      })
      .then((result) => {
        setIsLoading(false)
        setIsAuth(true)
      })
      .catch((error) => {
        setIsAuth(false)
        setIsLoading(false)
        toast({
          status: 'error',
          colorScheme: 'red',
          title: error.response.data.error,
        })
      })
  }

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        isLoading,
        register,
        login,
        verify,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
