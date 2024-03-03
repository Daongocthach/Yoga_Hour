import React from 'react'
import ReactDOM from 'react-dom/client'
import { CssBaseline } from '@mui/material'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import App from './App.jsx'
import './index.css'
import theme from './theme.js'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <CssVarsProvider theme={theme}>
        <CssBaseline>
          <App />
        </CssBaseline>
      </CssVarsProvider>
    </React.StrictMode>
)
