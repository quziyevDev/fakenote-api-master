import { useDisclosure } from '@chakra-ui/react'
import { createContext, useState } from 'react'

export const NoteModalContext = createContext(null)

const NoteModalProvider = ({ children }) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [type, setType] = useState('create')
  const [noteData, setNoteData] = useState(null)

  const openModalForCreate = () => {
    onOpen()
    setType('create')
  }

  const openModalForUpdate = (data) => {
    onOpen()
    setType('update')
    setNoteData(data)
  }

  const closeModal = () => {
    onClose()
    setType('create')
    setNoteData(null)
  }

  return (
    <NoteModalContext.Provider
      value={{
        isOpen,
        type,
        openModalForCreate,
        openModalForUpdate,
        closeModal,
        noteData
      }}
    >
      {children}
    </NoteModalContext.Provider>
  )
}

export default NoteModalProvider