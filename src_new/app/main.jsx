import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AppRouterNew from '@new/router/app-router';
import { AuthProvider } from '@new/contexts/real-auth-context';
import '@new/styles/globals.css';

/**
 * Main entry point da nova estrutura com autenticação real
 * Localização: src_new/app/main.jsx
 */

console.log('🚀 Nipo School - Iniciando aplicação (Nova Estrutura + Supabase)');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppRouterNew />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);