/**
 * 🛡️ PROTEÇÃO DE ROTAS POR PAPEL (ROLE)
 * 
 * Componente que verifica se o usuário tem permissão para acessar uma rota específica
 * baseado no seu papel (admin, professor, aluno).
 * 
 * - Bloqueia acesso direto via URL
 * - Redireciona para dashboard correto se não autorizado
 * - Mantém UX suave com loading states
 * - Mostra mensagem clara de acesso negado
 */

import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
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
  const location = useLocation()

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
    console.log('🔒 Usuário não autenticado, redirecionando para login')
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
  }

  // Verificar se o usuário tem permissão
  const userRole = user.role
  const hasPermission = allowedRoles.includes(userRole)

  console.log('🛡️ RoleProtectedRoute:', { 
    path: location.pathname,
    userRole, 
    allowedRoles, 
    hasPermission,
    email: user.email
  })

  if (!hasPermission) {
    console.warn(`❌ ACESSO NEGADO! Usuário "${userRole}" tentou acessar rota permitida apenas para: [${allowedRoles.join(', ')}]`)
    
    // Se não tem permissão, redirecionar para dashboard correto do seu role
    const defaultRedirect = getDefaultDashboardForRole(userRole)
    const finalRedirect = redirectTo || defaultRedirect
    
    console.log(`🔄 Redirecionando ${userRole} de ${location.pathname} para ${finalRedirect}`)
    
    return <Navigate to={finalRedirect} replace />
  }

  console.log(`✅ ACESSO PERMITIDO! Usuário "${userRole}" pode acessar esta rota`)
  // Usuário tem permissão - renderizar conteúdo
  return <>{children}</>
}

/**
 * 🎯 Função auxiliar para determinar dashboard padrão por papel
 */
function getDefaultDashboardForRole(role: string): string {
  const dashboards: Record<string, string> = {
    'admin': '/admin',
    'professor': '/professores',
    'aluno': '/alunos',
    'pastor': '/admin', // Pastor tem acesso de admin
  }
  
  return dashboards[role] || '/alunos' // fallback seguro para alunos
}

/**
 * 🎨 Componente de acesso negado customizado
 */
export function AccessDeniedPage() {
  const { user } = useAuth()
  const redirectUrl = getDefaultDashboardForRole(user?.role || 'aluno')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Acesso Negado</h1>
        <p className="text-gray-600 mb-6">
          Você não tem permissão para acessar esta página.
        </p>
        
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            <strong>Seu perfil:</strong> {user?.role || 'Não identificado'}
          </p>
        </div>
        
        <a
          href={redirectUrl}
          className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Ir para meu Dashboard
        </a>
      </div>
    </div>
  )
}

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