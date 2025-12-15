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
      admin: '/admin/dashboard',
      professor: '/professores/dashboard', 
      aluno: '/alunos/dashboard',
      pastor: '/admin/dashboard'
    }

    const destination = routes[role] || '/alunos/dashboard'
    console.log(`🔄 Redirecionando ${role} para: ${destination}`)
    navigate(destination, { replace: true })
  }

  const redirectBasedOnRole = () => {
    console.log('📍 redirectBasedOnRole chamado:', { isAuthenticated, user })
    if (isAuthenticated && user) {
      redirectToDashboard(user.role)
    } else {
      console.log('⚠️ Não redireciona - não autenticado ou sem user')
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