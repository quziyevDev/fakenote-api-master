import { useDisclosure } from '@chakra-ui/react'
import { createContext, useState } from 'react'

export const CollectionPopoverContext = createContext(null)

export const CollectionPopoverProvider = ({ children }) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [type, setType] = useState('create')
  const [collection, setCollection] = useState(null)

  const openPopover = () => {
    onOpen()
    setType('create')
    setCollection(null)
  }

  const openPopoverForUpdate = (collection) => {
    onOpen()
    setType('update')
    setCollection(collection)
  }

  const closePopover = () => {
    onClose()
    setType('create')
    setCollection(null)
  }

  return (
    <CollectionPopoverContext.Provider
      value={{
        isOpen,
        openPopover,
        openPopoverForUpdate,
        closePopover,
        type,
        collection,
      }}
    >
      {children}
    </CollectionPopoverContext.Provider>
  )
}
