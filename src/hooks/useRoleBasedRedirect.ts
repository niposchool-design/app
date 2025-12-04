import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import type { UserRole } from '../contexts/AuthContext'

/**
 * Hook para redirecionamento baseado no papel do usuário
 */
export function useRoleBasedRedirect() {
  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const redirectToDashboard = (role: UserRole) => {
    const routes = {
      admin: '/admin',
      professor: '/professores', 
      aluno: '/alunos',
      pastor: '/admin'
    }

    const destination = routes[role] || '/alunos'
    console.log(`🔄 Redirecionando ${role} para: ${destination}`)
    navigate(destination, { replace: true })
  }

  const redirectBasedOnRole = () => {
    if (isAuthenticated && user) {
      redirectToDashboard(user.role)
    }
  }

  return {
    redirectBasedOnRole,
    redirectToDashboard
  }
}

/**
 * Hook que redireciona automaticamente quando o usuário faz login
 */
export function useAutoRedirectOnLogin() {
  const { user, isAuthenticated, loading } = useAuth()
  const { redirectBasedOnRole } = useRoleBasedRedirect()

  useEffect(() => {
    // Só redireciona quando a autenticação terminar de carregar
    if (!loading && isAuthenticated && user) {
      redirectBasedOnRole()
    }
  }, [loading, isAuthenticated, user, redirectBasedOnRole])
}

export default useRoleBasedRedirect