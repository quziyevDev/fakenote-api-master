import { Box, Grid, Spinner } from '@chakra-ui/react'
import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Note from '../components/Note'
import NoteModal from '../components/NoteModal'
import { CollectionNotesContext } from '../context/CollectionNotesContext'

export default function Collection() {
  const { id } = useParams()
  const { isLoading, notes, getAllNotes } = useContext(CollectionNotesContext)

  useEffect(() => {
    getAllNotes(id)
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
