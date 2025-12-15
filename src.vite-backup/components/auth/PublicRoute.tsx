/**
 * 🌐 PUBLIC ROUTE - NIPO SCHOOL
 * 
 * Componente para rotas públicas conforme blueprint
 */

import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { ROUTES } from '../../lib/constants/routes'

interface PublicRouteProps {
  children: React.ReactNode
  redirectTo?: string
}

export function PublicRoute({ children, redirectTo = ROUTES.APP }: PublicRouteProps) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  // Se usuário está autenticado, redireciona para área protegida
  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />
  }

  // Se não está autenticado, mostra rota pública
  return <>{children}</>
}

export default PublicRoute