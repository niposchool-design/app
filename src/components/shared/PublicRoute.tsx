/**
 * 🔓 PUBLIC ROUTE - NIPO SCHOOL
 * 
 * Componente para rotas públicas conforme blueprint
 */

import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useIsAuthenticated } from '../../hooks/useAuth'

interface PublicRouteProps {
  children: ReactNode
  redirectTo?: string
}

export function PublicRoute({ children, redirectTo = '/alunos' }: PublicRouteProps) {
  const isAuthenticated = useIsAuthenticated()
  const location = useLocation()

  if (isAuthenticated) {
    const from = location.state?.from?.pathname || redirectTo
    return <Navigate to={from} replace />
  }

  return <>{children}</>
}

export default PublicRoute