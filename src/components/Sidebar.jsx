import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Tooltip,
  VStack,
} from '@chakra-ui/react'
import { Edit2Icon, FilePlus, FolderPlus } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { NoteModalContext } from '../context/NoteModalContext'
import { CollectionContext } from '../context/CollectionContext'
import CollectionPopover from './CollectionPopover'
import { CollectionPopoverContext } from '../context/CollectionPopoverContext'
import { Trash2Icon } from 'lucide-react'

export default function Sidebar() {
  const { openModalForCreate } = useContext(NoteModalContext)
  const { isLoading, collections, getAllCollection, deleteCollection } =
    useContext(CollectionContext)
  const { openPopover, openPopoverForUpdate, isOpen } = useContext(
    CollectionPopoverContext
  )

  const [isEdit, setIsEdit] = useState(false)
  const [editableCollection, setEditableCollection] = useState(null)

  useEffect(() => {
    getAllCollection()
  }, [])

  useEffect(() => {
    if (!isOpen) {
      setIsEdit(false)
    }
  }, [isOpen])

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
          if (isEdit && editableCollection.id === collection.id) {
            return <CollectionPopover />
          }
          return (
            <Flex
              bg='gray.200'
              _hover={{
                bg: 'gray.100',
              }}
              justify='space-between'
              align='center'
              fontWeight='semibold'
              fontSize='lg'
              transition='0.2s'
              w='full'
              p='2'
              rounded='md'
              borderBottomWidth={4}
              borderBottomStyle='inset'
              borderBottomColor={collection.color}
            >
              <Link
                style={{ width: '100%' }}
                to={`collection/${collection.id}`}
              >
                {collection.name}
              </Link>
              <ButtonGroup isAttached>
                <Button
                  onClick={() => {
                    setIsEdit(true)
                    setEditableCollection(collection)
                    openPopoverForUpdate(collection)
                  }}
                  size='xs'
                  colorScheme='blue'
                >
                  <Edit2Icon size='14' />
                </Button>
                <Button
                  onClick={() => deleteCollection(collection.id)}
                  size='xs'
                  colorScheme='red'
                >
                  <Trash2Icon size='14' />
                </Button>
              </ButtonGroup>
            </Flex>
          )
        })}
        {!isEdit && <CollectionPopover />}
      </VStack>
    </Box>
  )
}
