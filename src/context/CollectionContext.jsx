import { createContext, useState } from 'react'
import api from '../api'

export const CollectionContext = createContext(null)

export const CollectionProvider = ({ children }) => {
  const [collections, setCollections] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getAllCollection = () => {
    setIsLoading(true)
    api
      .get('/collection', {
        headers: {
          Authorization: JSON.parse(localStorage.getItem('accessToken')),
        },
      })
      .then((result) => {
        setIsLoading(false)
        setCollections(result.data.collections)
      })
  }

  const createCollection = (collection) => {
    setIsLoading(true)
    api
      .post('/collection', collection, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem('accessToken')),
        },
      })
      .then((result) => {
        setCollections([...collections, result.data.collection])
        setIsLoading(false)
      })
  }

  return (
    <CollectionContext.Provider
      value={{
        collections,
        isLoading,
        getAllCollection,
        createCollection,
      }}
    >
      {children}
    </CollectionContext.Provider>
  )
}
