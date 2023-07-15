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
  const createNote = (title, description) => {
    api
      .post(
        '/note',
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem('accessToken')),
          },
        }
      )
      .then((result) => {
        setNotes([...notes, result.data.note])
      })
  }

  return (
    <NotesContext.Provider
      value={{
        notes,
        isLoading,
        getAllNotes,
        createNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  )
}

export default NotesProvider
