import { Box, Button, Card, Flex, FormControl, FormLabel, Heading, Input, Text, Link as ChakraLink } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Register() {
  return (
    <Box
      w='full'
      h='100vh'
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      <Card variant='outline' maxW='sm' w='full' p='4'>
        <Heading fontSize='3xl'>Sign up</Heading>
        <Flex as='form' direction='column' gap='4' mt='4'>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input />
          </FormControl>
          <FormControl>
            <FormLabel>Surname</FormLabel>
            <Input />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type='email' />
          </FormControl>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type='password' />
          </FormControl>
          <Button colorScheme='teal'>Sign up</Button>
        </Flex>
        <Text mt='2'>
          If you have an account?{" "}
          <ChakraLink color='blue.400' as={Link} to='/login'>
            Sign in
          </ChakraLink>
        </Text>
      </Card>
    </Box>
  )
}
