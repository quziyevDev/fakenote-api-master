import { createContext, useState } from 'react'
import api from '../api'

export const NotesContext = createContext(null)
const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const getAllNotes = () => {
    setIsLoading(true)
    api
      .get('/note', {
        headers: {
          Authorization: JSON.parse(localStorage.getItem('accessToken')),
        },
      })
      .then((result) => {
        setIsLoading(false)
        setNotes(result.data.notes)
      })
      .catch((error) => {
        setIsLoading(false)
      })
  }
  const createNote = (formData) => {
    setIsLoading(true)
    api
      .post('/note', formData, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem('accessToken')),
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((result) => {
        setIsLoading(false)
        setNotes([...notes, result.data.note])
      })
  }
  const deleteNote = (id) => {
    setIsLoading(true)
    api
      .delete(`/note/${id}`, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem('accessToken')),
        },
      })
      .then((result) => {
        setIsLoading(false)
        setNotes(notes.filter((note) => note.id !== id))
      })
  }
  const updateNote = ({ id, img, ...rest }) => {
    setIsLoading(true)
    api
      .put(`/note/${id}`, rest, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem('accessToken')),
        },
      })
      .then((result) => {
        setIsLoading(false)
        setNotes(
          notes.map((note) => {
            if (note.id === result.data.note.id) {
              return result.data.note
            } else {
              return note
            }
          })
        )
      })
  }
  return (
    <NotesContext.Provider
      value={{
        notes,
        isLoading,
        getAllNotes,
        createNote,
        deleteNote,
        updateNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  )
}

export default NotesProvider
