import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import {NurseryProvider} from './context/NurseryContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <NurseryProvider>
        <App />
      </NurseryProvider>
    </BrowserRouter>
  </StrictMode>,
)
