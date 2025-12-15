import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// ✅ NOVA ESTRUTURA - Imports
import App from './app/App'

// ✅ Render da aplicação
const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)