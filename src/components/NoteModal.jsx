import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import React, { useContext } from 'react'
import { NoteModalContext } from '../context/NoteModalContext'

export default function NoteModal() {
  const { isOpen, closeModal } = useContext(NoteModalContext)
  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Note</ModalHeader>
        <ModalBody></ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  )
}
