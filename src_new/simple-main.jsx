import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import DebugApp from '@new/app/debug-app.jsx'
import '@new/styles/globals.css'

console.log('🚀 Iniciando Nipo School - Versão Debug')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DebugApp />
  </StrictMode>,
)