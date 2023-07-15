import { useDisclosure } from '@chakra-ui/react'
import { createContext, useState } from 'react'

export const NoteModalContext = createContext(null)

const NoteModalProvider = ({ children }) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [type, setType] = useState('create')

  const openModalForCreate = () => {
    onOpen()
    setType('create')
  }

  const openModalForUpdate = () => {
    onOpen()
    setType('update')
  }

  const closeModal = () => {
    onClose()
    setType('create')
  }

  return (
    <NoteModalContext.Provider
      value={{
        isOpen,
        type,
        openModalForCreate,
        openModalForUpdate,
        closeModal,
      }}
    >
      {children}
    </NoteModalContext.Provider>
  )
}

export default NoteModalProvider