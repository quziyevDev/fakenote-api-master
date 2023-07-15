import React from 'react'
import Sidebar from '../components/Sidebar'
import { Box, Flex } from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <Box h='100vh' overflowY='hidden'>
      <Navbar />
      <Flex h='full'>
        <Box maxW={300} w='full'>
          <Sidebar />
        </Box>
        <Box w='full'>
          <Outlet />
        </Box>
      </Flex>
    </Box>
  )
}
