import React, { useContext, useEffect } from 'react'
import { NotesContext } from '../context/NotesContext'
import { Grid, Box, Spinner } from '@chakra-ui/react'
import NoteModal from '../components/NoteModal'
import Note from '../components/Note'

export default function Notes() {
  const { isLoading, notes, getAllNotes } = useContext(NotesContext)
  useEffect(() => {
    getAllNotes()
  }, [])
  return (
    <Box position='relative' minH='100%'>
      {isLoading && (
        <Box
          display='grid'
          placeItems='center'
          position='absolute'
          inset='0'
          zIndex={10}
          bg='rgba(0,0,0,0.05)'
          style={{
            backdropFilter: 'blur(3px)',
          }}
        >
          <Spinner size='xl' color='blue.400' />
        </Box>
      )}
      <Box p='4'>
        <Grid gridTemplateColumns={'repeat(5, 1fr)'} gap='4'>
          {notes.map((note) => {
            return <Note key={note.id} note={note} />
          })}
        </Grid>
        <NoteModal />
      </Box>
    </Box>
  )
}
