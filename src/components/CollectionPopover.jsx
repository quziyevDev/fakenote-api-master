import React, { useContext } from 'react'
import { CollectionPopoverContext } from '../context/CollectionPopoverContext'
import { Flex, FormControl, IconButton, Input } from '@chakra-ui/react'
import { CheckIcon } from 'lucide-react'
import { CollectionContext } from '../context/CollectionContext'

export default function CollectionPopover() {
  const { isOpen, closePopover } = useContext(CollectionPopoverContext)
  const { createCollection } = useContext(CollectionContext)

  const submitHandler = (event) => {
    event.preventDefault()

    createCollection({
      name: event.target.name.value,
      color: event.target.color.value,
    })
    closePopover()
    event.target.reset()
  }

  if (!isOpen) return null

  return (
    <Flex onSubmit={submitHandler} as='form'>
      <Input name='name' />
      <Input w='14' overflow='hidden' p='0' name='color' type='color' />
      <IconButton type='submit'>
        <CheckIcon />
      </IconButton>
    </Flex>
  )
}
