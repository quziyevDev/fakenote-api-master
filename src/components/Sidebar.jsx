import {
  Box,
  HStack,
  IconButton,
  Popover,
  Tooltip,
  VStack,
} from '@chakra-ui/react'
import { FilePlus, FolderPlus } from 'lucide-react'
import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { NoteModalContext } from '../context/NoteModalContext'
import { CollectionContext } from '../context/CollectionContext'
import CollectionPopover from './CollectionPopover'
import { CollectionPopoverContext } from '../context/CollectionPopoverContext'

export default function Sidebar() {
  const { openModalForCreate } = useContext(NoteModalContext)
  const { isLoading, collections, getAllCollection, createCollection } =
    useContext(CollectionContext)
  const { openPopover } = useContext(CollectionPopoverContext)

  useEffect(() => {
    getAllCollection()
  }, [])

  return (
    <Box h='full' bg='gray.50' shadow='md' p='4'>
      <HStack justify='end' mb='2'>
        <Tooltip bg='teal.400' label='Create Note'>
          <IconButton onClick={openModalForCreate} size='sm' rounded='full'>
            <FilePlus size={20} strokeWidth={1.5} />
          </IconButton>
        </Tooltip>
        <Tooltip bg='teal.400' label='Create Collection'>
          <IconButton onClick={() => openPopover()} size='sm' rounded='full'>
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
          to='/'
        >
          Global
        </Box>
        {collections.map((collection) => {
          return (
            <Box
              bg={collection.color}
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
              to={`collection/${collection.id}`}
            >
              {collection.name}
            </Box>
          )
        })}
        <CollectionPopover />
      </VStack>
    </Box>
  )
}
