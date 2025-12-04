import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

/**
 * Componente que redireciona o usuário para o dashboard apropriado baseado no seu papel
 */
export function RoleBasedRedirect() {
  const { user, loading } = useAuth()

  // Mostra loading enquanto carrega a autenticação
  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecionando...</p>
        </div>
      </div>
    )
  }

  // Determina o dashboard baseado no papel do usuário
  const getDashboardRoute = () => {
    switch (user.role) {
      case 'admin':
        return '/admin'
      case 'professor':
        return '/professores'
      case 'aluno':
        return '/alunos'
      case 'pastor':
        return '/admin' // Pastores vão para área admin
      default:
        return '/alunos' // Fallback para alunos
    }
  }

  const dashboardRoute = getDashboardRoute()

  console.log(`🔄 Redirecionando usuário ${user.role} para: ${dashboardRoute}`)

  return <Navigate to={dashboardRoute} replace />
}

export default RoleBasedRedirect