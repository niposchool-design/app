import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.SIMPLE'

interface AreaGuardProps {
  allowedRole: 'admin' | 'professor' | 'aluno'
}

export function AreaGuard({ allowedRole }: AreaGuardProps) {
  const { user, loading } = useAuth()

  console.log('🛡️ GUARD SIMPLES:', { allowedRole, userRole: user?.role, loading })

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
    </div>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (user.role !== allowedRole) {
    // Redirecionar para a área CORRETA do usuário
    const correctPath = {
      admin: '/admin/dashboard',
      professor: '/professores/dashboard',
      aluno: '/alunos/dashboard',
    }[user.role]

    console.log(`❌ ACESSO NEGADO! User é ${user.role}, tentou acessar ${allowedRole}. Redirecionando para ${correctPath}`)
    
    return <Navigate to={correctPath} replace />
  }

  console.log(`✅ ACESSO PERMITIDO para ${allowedRole}`)
  return <Outlet />
}
