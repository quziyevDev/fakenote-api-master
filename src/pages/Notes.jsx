import React, { useContext, useEffect } from 'react'
import { NotesContext } from '../context/NotesContext'
import { Card, CardBody, CardHeader, Grid, Box } from '@chakra-ui/react'
import NoteModal from '../components/NoteModal'

export default function Notes() {
  const { isLoading, notes, getAllNotes } = useContext(NotesContext)
  useEffect(() => {
    getAllNotes()
  }, [])
  return (
    <Box p='4'>
      <Grid gridTemplateColumns={'repeat(5, 1fr)'} gap='4'>
        {notes.map((note) => {
          return (
            <Card>
              <CardHeader>{note.title}</CardHeader>
              <CardBody>{note.description}</CardBody>
            </Card>
          )
        })}
      </Grid>
      <NoteModal />
    </Box>
  )
}
