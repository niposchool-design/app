/**
 * 🎯 APP - Componente Principal da Aplicação EVOLUTION
 * 
 * Configuração com:
 * - RouterProvider do React Router v6
 * - Error Boundaries
 * - Providers globais (Auth, Query, Theme)
 * - Estilos globais japoneses
 */

import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { router } from './router'
import { AuthProvider } from '../contexts/AuthContext'
import { ThemeProvider } from '../contexts/ThemeContext' // 🎌 NOVO

// Estilos globais japoneses
import '../styles/globals.css'

// Criar QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <ThemeProvider> {/* 🎌 THEME SYSTEM JAPONÊS */}
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
