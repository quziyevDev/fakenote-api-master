import { createContext, useState } from 'react'
import api from '../api'

export const CollectionNotesContext = createContext(null)

export const CollectionNotesProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [notes, setNotes] = useState([])
  const getAllNotes = (id) => {
    setIsLoading(true)
    api
      .get(`/collection/${id}`, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem('accessToken')),
        },
      })
      .then((result) => {
        setIsLoading(false)
        setNotes(result.data.notes)
      })
  }
  const createNote = (id, note) => {
    setIsLoading(true)
    api
      .post(`/collection/${id}`, note, {
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
      .put(`note/${id}`, rest, {
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
    <CollectionNotesContext.Provider
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
    </CollectionNotesContext.Provider>
  )
}
