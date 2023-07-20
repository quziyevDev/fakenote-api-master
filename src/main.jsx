import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import AuthProvider from './context/AuthContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import NotesProvider from './context/NotesContext.jsx'
import NoteModalProvider from './context/NoteModalContext.jsx'
import { CollectionProvider } from './context/CollectionContext.jsx'
import { CollectionPopoverProvider } from './context/CollectionPopoverContext.jsx'
import { CollectionNotesProvider } from './context/CollectionNotesContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider resetCSS>
        <AuthProvider>
          <CollectionProvider>
            <CollectionPopoverProvider>
              <CollectionNotesProvider>
                <NotesProvider>
                  <NoteModalProvider>
                    <App />
                  </NoteModalProvider>
                </NotesProvider>
              </CollectionNotesProvider>
            </CollectionPopoverProvider>
          </CollectionProvider>
        </AuthProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
)
