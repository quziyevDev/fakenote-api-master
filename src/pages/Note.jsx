import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api'
import {
  Badge,
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react'

export default function Note() {
  const { noteId } = useParams()
  const [note, setNote] = useState(null)
  useEffect(() => {
    api
      .get(`/note/${noteId}`, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem('accessToken')),
        },
      })
      .then((result) => {
        setNote(result.data.note)
      })
  }, [])

  if (!note) return null

  return (
    <Container maxW='container.lg'>
      <Flex justify='space-between' align='center'>
        <Heading my='4'>{note.title}</Heading>
        <Badge colorScheme='blue'>
          {new Intl.DateTimeFormat('ru-RU').format(new Date(note.created_at))}
        </Badge>
      </Flex>
      <Image
        src={
          note.coverImage.length < 1
            ? '/Notes.png'
            : 'http://172.20.3.46:1998/' + note.coverImage
        }
      />

      <Text mt='10'>{note.description}</Text>
    </Container>
  )
}
