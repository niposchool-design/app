import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

/**
 * Componente que redireciona o usuário para o dashboard apropriado baseado no seu papel
 * SEMPRE busca o role ATUALIZADO do banco de dados
 */
export function RoleBasedRedirect() {
  const { user, loading } = useAuth()

  // Log detalhado para debug
  console.log('🔄 RoleBasedRedirect - Estado:', {
    loading,
    hasUser: !!user,
    userRole: user?.role,
    userEmail: user?.email
  })

  // Mostra loading enquanto carrega a autenticação
  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando autenticação...</p>
          <p className="text-xs text-gray-500 mt-2">Carregando role do banco...</p>
        </div>
      </div>
    )
  }

  // Determina o dashboard baseado no papel do usuário - NOVA ESTRUTURA
  const getDashboardRoute = () => {
    const role = user.role
    
    const routes = {
      'admin': '/admin/dashboard',
      'professor': '/professores/dashboard',
      'aluno': '/alunos/dashboard',
      'pastor': '/admin/dashboard'
    }
    
    const route = routes[role as keyof typeof routes]
    
    if (!route) {
      console.error(`❌ Role desconhecido: ${role}, redirecionando para login`)
      return '/login'
    }
    
    console.log(`✅ RoleBasedRedirect: ${role} → ${route}`)
    
    return route
  }

  const dashboardRoute = getDashboardRoute()

  return <Navigate to={dashboardRoute} replace />
}

export default RoleBasedRedirect