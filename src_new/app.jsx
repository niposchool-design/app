import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// ✅ NOVA ESTRUTURA - Contexts e Router
import { AuthProvider } from '@new/contexts/real-auth-context';
import SimpleRealRouter from './router/simple-real-router.jsx';

// ✅ NOVA ESTRUTURA - Estilos
import '@new/styles/globals.css';

/**
 * AppNew - Aplicação principal da nova estrutura
 * Migrado de: src/app/App.jsx
 * Nova localização: src_new/app.jsx
 */
function AppNew() {
  return (
    <BrowserRouter future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }}>
      <AuthProvider>
        <SimpleRealRouter />
      </AuthProvider>
    </BrowserRouter> 
  );
}

export default AppNew;