import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from '@chakra-ui/react'
import React, { useContext } from 'react'
import { NoteModalContext } from '../context/NoteModalContext'
import { NotesContext } from '../context/NotesContext'
import { useParams } from 'react-router-dom'
import { CollectionNotesContext } from '../context/CollectionNotesContext'

export default function NoteModal() {
  const { isOpen, closeModal, noteData, type } = useContext(NoteModalContext)
  const { createNote, updateNote } = useContext(NotesContext)

  const collectionNotes = useContext(CollectionNotesContext)

  const { id } = useParams()

  const submitHandler = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData.entries())
    if (!id) {
      if (type === 'create') {
        createNote(data)
      } else if (type === 'update') {
        updateNote({
          id: noteData.id,
          ...data,
        })
      }
    } else {
      if (type === 'create') {
        collectionNotes.createNote(id, data)
      } else if (type === 'update') {
        collectionNotes.updateNote({
          id: noteData.id,
          ...data,
        })
      }
    }
    event.target.reset()
    closeModal()
  }

  return (
    <Modal size='2xl' isOpen={isOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Note</ModalHeader>
        <ModalBody>
          <form
            encType='multipart/form-data'
            onSubmit={submitHandler}
            id='create-note'
          >
            <FormControl>
              <FormLabel>Image</FormLabel>
              <Input name='img' type='file' />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input defaultValue={noteData && noteData.title} name='title' />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                defaultValue={noteData && noteData.description}
                name='description'
              />
            </FormControl>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => closeModal()}
            variant='outline'
            colorScheme='red'
            mr='4'
          >
            Close
          </Button>
          <Button form='create-note' type='submit' colorScheme='teal'>
            Create Note
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
