import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import AuthProvider from './context/AuthContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import NotesProvider from './context/NotesContext.jsx'
import NoteModalProvider from './context/NoteModalContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider resetCSS>
        <AuthProvider>
          <NotesProvider>
            <NoteModalProvider>
              <App />
            </NoteModalProvider>
          </NotesProvider>
        </AuthProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
)
