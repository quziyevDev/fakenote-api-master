import { Box, HStack, IconButton, Tooltip, VStack } from '@chakra-ui/react'
import { FilePlus, FolderPlus } from 'lucide-react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { NoteModalContext } from '../context/NoteModalContext'

export default function Sidebar() {
  const { openModalForCreate } = useContext(NoteModalContext)
  return (
    <Box h='full' bg='gray.50' shadow='md' p='4'>
      <HStack justify='end' mb='2'>
        <Tooltip bg='teal.400' label='Create Note'>
          <IconButton onClick={openModalForCreate} size='sm' rounded='full'>
            <FilePlus size={20} strokeWidth={1.5} />
          </IconButton>
        </Tooltip>
        <Tooltip bg='teal.400' label='Create Collection'>
          <IconButton size='sm' rounded='full'>
            <FolderPlus size={20} strokeWidth={1.5} />
          </IconButton>
        </Tooltip>
      </HStack>
      <VStack gap={1}>
        <Box
          bg='gray.200'
          _hover={{
            bg: 'gray.100',
          }}
          fontWeight='semibold'
          fontSize='lg'
          transition='0.2s'
          w='full'
          p='2'
          rounded='md'
          as={Link}
        >
          Global
        </Box>
        <Box
          _hover={{
            bg: 'gray.100',
          }}
          fontWeight='semibold'
          fontSize='lg'
          transition='0.2s'
          w='full'
          p='2'
          rounded='md'
          as={Link}
        >
          For Job
        </Box>
        <Box
          _hover={{
            bg: 'gray.100',
          }}
          fontWeight='semibold'
          fontSize='lg'
          transition='0.2s'
          w='full'
          p='2'
          rounded='md'
          as={Link}
        >
          For Home
        </Box>
      </VStack>
    </Box>
  )
}
