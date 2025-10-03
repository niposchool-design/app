import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// ✅ NOVA ESTRUTURA - Imports
import AppNew from '@new/app.jsx'
import { logFeatureFlags } from '@new/lib/utils/feature-flags'

// ✅ Log das feature flags no desenvolvimento
logFeatureFlags();

// ✅ Render da nova aplicação
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppNew />
  </StrictMode>,
)