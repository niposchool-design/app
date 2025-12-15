import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import type { TipoUsuario } from '@/types'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: TipoUsuario[]
  requiredRole?: TipoUsuario
  // 🆕 NOVAS PROPS (opcionais, não quebram compatibilidade)
  requiredPermissions?: string[]
  fallbackRoute?: string
  requireAuth?: boolean
  showLoadingSpinner?: boolean
}

export function ProtectedRoute({ 
  children, 
  allowedRoles, 
  requiredRole,
  // Novas props com valores padrão
  requiredPermissions = [],
  fallbackRoute = "/acesso-negado",
  requireAuth = true,
  showLoadingSpinner = true
}: ProtectedRouteProps) {
  const { user, profile, loading } = useAuth()
  const location = useLocation()

  // ========================================
  // 🔄 LOADING STATE (mantém comportamento original)
  // ========================================
  if (loading) {
    if (!showLoadingSpinner) {
      return null
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  // ========================================
  // 🔐 VERIFICAÇÃO DE AUTENTICAÇÃO (mantém comportamento original)
  // ========================================
  if (requireAuth && (!user || !profile)) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // ========================================
  // 👤 VERIFICAÇÃO DE ROLE ÚNICO (mantém comportamento original)
  // ========================================
  if (requiredRole && profile?.tipo_usuario !== requiredRole) {
    return <Navigate to={fallbackRoute} replace />
  }

  // ========================================
  // 👥 VERIFICAÇÃO DE MÚLTIPLOS ROLES (mantém comportamento original)
  // ========================================
  if (allowedRoles && allowedRoles.length > 0 && profile) {
    const userRole = profile.tipo_usuario as TipoUsuario
    if (!allowedRoles.includes(userRole)) {
      return <Navigate to={fallbackRoute} replace />
    }
  }

  // ========================================
  // 🆕 VERIFICAÇÃO DE PERMISSÕES ESPECÍFICAS (nova funcionalidade)
  // ========================================
  if (requiredPermissions.length > 0 && profile) {
    // Por enquanto, permissões baseadas no tipo de usuário
    // Futuramente pode ser expandido para sistema de permissões granular
    const userPermissions = getUserPermissions(profile.tipo_usuario as TipoUsuario)
    
    const hasRequiredPermissions = requiredPermissions.every(permission => 
      userPermissions.includes(permission)
    )
    
    if (!hasRequiredPermissions) {
      console.warn(`Usuário não tem permissões:`, requiredPermissions)
      return <Navigate to={fallbackRoute} replace />
    }
  }

  // ========================================
  // ✅ AUTORIZADO - RENDERIZA CONTEÚDO
  // ========================================
  return <>{children}</>
}

/**
 * 🆕 Helper para obter permissões baseadas no tipo de usuário
 * Mantém compatibilidade total, mas permite expansão futura
 */
function getUserPermissions(tipoUsuario: TipoUsuario): string[] {
  const permissionsMap: Record<TipoUsuario, string[]> = {
    aluno: [
      'portfolio.view',
      'portfolio.create',
      'portfolio.edit_own',
      'achievements.view',
      'challenges.view',
      'challenges.submit',
      'instruments.view',
      'profile.edit_own'
    ],
    professor: [
      'portfolio.view',
      'portfolio.create',
      'portfolio.edit_own',
      'achievements.view',
      'challenges.view',
      'challenges.submit',
      'instruments.view',
      'profile.edit_own',
      // Permissões específicas do professor
      'classes.view',
      'classes.create',
      'classes.edit_own',
      'submissions.view',
      'submissions.grade',
      'students.view_in_classes',
      'reports.view_own'
    ],
    admin: [
      // Admins têm todas as permissões
      'portfolio.view',
      'portfolio.create',
      'portfolio.edit',
      'portfolio.delete',
      'achievements.view',
      'achievements.manage',
      'challenges.view',
      'challenges.manage',
      'instruments.view',
      'instruments.manage',
      'profile.edit',
      'classes.view',
      'classes.create',
      'classes.edit',
      'classes.delete',
      'users.view',
      'users.create',
      'users.edit',
      'users.delete',
      'reports.view',
      'system.manage'
    ],
    pastor: [
      // Pastor tem permissões similares ao professor
      'portfolio.view',
      'portfolio.create',
      'portfolio.edit_own',
      'achievements.view',
      'challenges.view',
      'challenges.submit',
      'instruments.view',
      'profile.edit_own',
      'classes.view',
      'classes.create',
      'classes.edit_own',
      'submissions.view',
      'submissions.grade',
      'students.view_in_classes',
      'reports.view_own'
    ]
  }

  return permissionsMap[tipoUsuario] || []
}

/**
 * 🆕 Hook para verificar permissões no componente
 * Pode ser usado para mostrar/ocultar elementos da UI
 */
export function usePermissions() {
  const { profile } = useAuth()
  
  return {
    hasRole: (role: TipoUsuario): boolean => {
      return profile?.tipo_usuario === role
    },
    
    hasPermission: (permission: string): boolean => {
      if (!profile) return false
      const userPermissions = getUserPermissions(profile.tipo_usuario as TipoUsuario)
      return userPermissions.includes(permission)
    },
    
    hasAnyPermission: (permissions: string[]): boolean => {
      if (!profile) return false
      const userPermissions = getUserPermissions(profile.tipo_usuario as TipoUsuario)
      return permissions.some(permission => userPermissions.includes(permission))
    },
    
    hasAllPermissions: (permissions: string[]): boolean => {
      if (!profile) return false
      const userPermissions = getUserPermissions(profile.tipo_usuario as TipoUsuario)
      return permissions.every(permission => userPermissions.includes(permission))
    },
    
    canAccess: (allowedRoles: TipoUsuario[]): boolean => {
      if (!profile) return false
      return allowedRoles.includes(profile.tipo_usuario as TipoUsuario)
    },

    // Lista todas as permissões do usuário atual
    getAllPermissions: (): string[] => {
      if (!profile) return []
      return getUserPermissions(profile.tipo_usuario as TipoUsuario)
    }
  }
}
