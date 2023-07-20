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

  const deleteCollection = (id) => {
    setIsLoading(true)
    api
      .delete(`collection/${id}`, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem('accessToken')),
        },
      })
      .then(() => {
        setIsLoading(false)
        setCollections(collections.filter((collection) => collection.id !== id))
      })
  }

  const updateCollection = (collection) => {
    setIsLoading(true)
    api
      .put(
        `collection/${collection.id}`,
        {
          name: collection.name,
          color: collection.color,
        },
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem('accessToken')),
          },
        }
      )
      .then((result) => {
        setIsLoading(false)
        setCollections(
          collections.map((collection) => {
            if (collection.id === result.data.collection.id) {
              return result.data.collection
            } else {
              return collection
            }
          })
        )
      })
  }

  return (
    <CollectionContext.Provider
      value={{
        collections,
        isLoading,
        getAllCollection,
        createCollection,
        deleteCollection,
        updateCollection,
      }}
    >
      {children}
    </CollectionContext.Provider>
  )
}
