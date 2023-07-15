import { Avatar, Flex, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <Flex
      justify='space-between'
      align='center'
      py='4'
      px='8'
      bg='gray.800'
      color='white'
      shadow='md'
    >
      <Text fontSize='2xl' fontWeight='semibold' as={Link} to='/'>
        Yout Notes
      </Text>
      <Stack direction='row'>
        <Text fontSize='sm' fontWeight='bold'>
          Diyorbek Sharipov
        </Text>
        <Avatar size='xs' name='Diyorbek Sharipov' />
      </Stack>
    </Flex>
  )
}
