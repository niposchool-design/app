/**
 * 🛡️ PROTEÇÃO DE ROTAS POR PAPEL (ROLE)
 * 
 * Componente que verifica se o usuário tem permissão para acessar uma rota específica
 * baseado no seu papel (admin, professor, aluno).
 * 
 * - Bloqueia acesso direto via URL
 * - Redireciona para dashboard correto se não autorizado
 * - Mantém UX suave com loading states
 */

import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { ROUTES } from '../../lib/constants/routes'

interface RoleProtectedRouteProps {
  children: React.ReactNode
  allowedRoles: string[]
  redirectTo?: string
}

export function RoleProtectedRoute({ 
  children, 
  allowedRoles, 
  redirectTo 
}: RoleProtectedRouteProps) {
  const { user, loading } = useAuth()

  console.log('🛡️ RoleProtectedRoute EXECUTOU!', { 
    allowedRoles, 
    userRole: user?.role, 
    loading,
    hasUser: !!user
  })

  // Loading state - mostrar spinner
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sakura-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando permissões...</p>
        </div>
      </div>
    )
  }

  // Usuário não logado - redirecionar para login
  if (!user) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  // Verificar se o usuário tem permissão
  const userRole = user.role
  const hasPermission = allowedRoles.includes(userRole)

  console.log('🔐 Verificação de permissão:', { 
    userRole, 
    allowedRoles, 
    hasPermission 
  })

  if (!hasPermission) {
    console.log('❌ ACESSO NEGADO! Redirecionando...')
    // Se não tem permissão, redirecionar para dashboard correto
    const defaultRedirect = getDefaultDashboardForRole(userRole)
    const finalRedirect = redirectTo || defaultRedirect
    
    return <Navigate to={finalRedirect} replace />
  }

  console.log('✅ PERMISSÃO CONCEDIDA! Renderizando children...')
  // Usuário tem permissão - renderizar conteúdo
  return <>{children}</>
}

/**
 * 🎯 Função auxiliar para determinar dashboard padrão por papel
 */
function getDefaultDashboardForRole(role: string): string {
  switch (role) {
    case 'admin':
      return '/admin'
    case 'professor':
      return '/professores'
    case 'aluno':
      return '/alunos'
    default:
      return '/alunos' // fallback seguro
  }
}

/**
 * 🎨 Componente de acesso negado customizado (opcional)
 */
export function AccessDeniedPage() {
  const { user } = useAuth()
  const redirectUrl = getDefaultDashboardForRole(user?.role || 'aluno')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-white">
      <div className="max-w-md mx-auto text-center p-8">
        <div className="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Acesso Negado
        </h1>
        
        <p className="text-gray-600 mb-6">
          Você não tem permissão para acessar esta área.
        </p>
        
        <button
          onClick={() => window.location.href = redirectUrl}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Ir para meu Dashboard
        </button>
      </div>
    </div>
  )
}