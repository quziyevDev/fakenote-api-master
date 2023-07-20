import React, { useContext } from 'react'
import { CollectionPopoverContext } from '../context/CollectionPopoverContext'
import { Flex, FormControl, IconButton, Input } from '@chakra-ui/react'
import { CheckIcon } from 'lucide-react'
import { CollectionContext } from '../context/CollectionContext'

export default function CollectionPopover() {
  const { isOpen, closePopover, type, collection } = useContext(
    CollectionPopoverContext
  )
  const { createCollection, updateCollection } = useContext(CollectionContext)

  const submitHandler = (event) => {
    event.preventDefault()
    if (type === 'create') {
      createCollection({
        name: event.target.name.value,
        color: event.target.color.value,
      })
    } else if (type === 'update') {
      updateCollection({
        id: collection.id,
        name: event.target.name.value,
        color: event.target.color.value,
      })
    }
    closePopover()
    event.target.reset()
  }

  if (!isOpen) return null

  return (
    <Flex onSubmit={submitHandler} as='form'>
      <Input defaultValue={collection && collection.name} name='name' />
      <Input
        w='14'
        defaultValue={collection && collection.color}
        overflow='hidden'
        p='0'
        name='color'
        type='color'
      />
      <IconButton type='submit'>
        <CheckIcon />
      </IconButton>
    </Flex>
  )
}
