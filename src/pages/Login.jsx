import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Card,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link as ChakraLink,
  Text,
} from '@chakra-ui/react'
import { AuthContext } from '../context/AuthContext'

export default function Login() {
  const { login, isLoading, isAuth, verify } = useContext(AuthContext)
  const navigate = useNavigate()
  const submitHandler = (event) => {
    event.preventDefault()
    const usernameInput = event.target.username
    const passwordInput = event.target.password
    login({
      username: usernameInput.value,
      password: passwordInput.value,
    })
  }

  useEffect(() => {
    if (isAuth) {
      navigate('/', {
        replace: true,
      })
    }
  }, [isAuth])

  useEffect(() => {
    verify()
  }, [])

  return (
    <Box
      w='full'
      h='100vh'
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      <Card variant='outline' maxW='sm' w='full' p='4'>
        <Heading fontSize='3xl'>Sign in</Heading>
        <Flex
          as='form'
          onSubmit={submitHandler}
          direction='column'
          gap='4'
          mt='4'
        >
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input name='username' />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input name='password' type='password' />
          </FormControl>
          <Button isLoading={isLoading} type='submit' colorScheme='teal'>
            Sign in
          </Button>
        </Flex>
        <Text mt='2'>
          If you don't have an account?{' '}
          <ChakraLink color='blue.400' as={Link} to='/register'>
            Sign up
          </ChakraLink>
        </Text>
      </Card>
    </Box>
  )
}
