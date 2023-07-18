import { useDisclosure } from '@chakra-ui/react'
import { createContext, useState } from 'react'

export const CollectionPopoverContext = createContext(null)

export const CollectionPopoverProvider = ({ children }) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [type, setType] = useState('create')

  const openPopover = () => {
    onOpen()
    setType('create')
  }

  const openPopoverForUpdate = () => {
    onOpen()
    setType('update')
  }

  const closePopover = () => {
    onClose()
    setType('create')
  }

  return (
    <CollectionPopoverContext.Provider
      value={{
        isOpen,
        openPopover,
        openPopoverForUpdate,
        closePopover,
      }}
    >
      {children}
    </CollectionPopoverContext.Provider>
  )
}
