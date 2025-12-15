/**
 * 👥 TIPOS E PERMISSÕES DE USUÁRIO - NIPO SCHOOL
 */

export const ROLES = {
  ALUNO: 'aluno',
  PROFESSOR: 'professor',
  ADMIN: 'admin',
  PASTOR: 'pastor',
} as const

export type UserRole = typeof ROLES[keyof typeof ROLES]
export type TipoUsuario = UserRole // Alias para compatibilidade

// ========================================
// LABELS AMIGÁVEIS
// ========================================
export const ROLE_LABELS: Record<UserRole, string> = {
  aluno: 'Aluno',
  professor: 'Professor',
  admin: 'Administrador',
  pastor: 'Pastor',
}

// ========================================
// PERMISSÕES
// ========================================
export const PERMISSIONS = {
  [ROLES.ALUNO]: [
    'view_own_data',
    'submit_desafios',
    'create_portfolio',
    'view_achievements',
    'view_historia',
  ],
  [ROLES.PROFESSOR]: [
    'view_students',
    'evaluate_submissions',
    'manage_turmas',
    'create_aulas',
    'view_reports',
    'view_historia',
  ],
  [ROLES.ADMIN]: ['*'],
  [ROLES.PASTOR]: [
    'view_own_data',
    'submit_desafios',
    'create_portfolio',
    'view_achievements',
    'view_historia',
  ],
} as const

// ========================================
// HELPERS
// ========================================
export const hasPermission = (role: UserRole, permission: string): boolean => {
  if (role === ROLES.ADMIN) return true
  const rolePermissions = PERMISSIONS[role] as readonly string[]
  return rolePermissions?.includes(permission) ?? false
}

export const isAdmin = (role: UserRole): boolean => {
  return role === ROLES.ADMIN
}

export const isProfessor = (role: UserRole): boolean => {
  return role === ROLES.PROFESSOR || role === ROLES.ADMIN
}

export const isAluno = (role: UserRole): boolean => {
  return role === ROLES.ALUNO || role === ROLES.PASTOR
}

/**
 * Retorna a cor do badge para cada role
 */
export const getRoleColor = (role: UserRole): string => {
  const colors: Record<UserRole, string> = {
    aluno: 'bg-blue-100 text-blue-800',
    professor: 'bg-green-100 text-green-800',
    admin: 'bg-purple-100 text-purple-800',
    pastor: 'bg-indigo-100 text-indigo-800',
  }
  return colors[role]
}

/**
 * Retorna o ícone para cada role
 */
export const getRoleIcon = (role: UserRole): string => {
  const icons: Record<UserRole, string> = {
    aluno: '🎓',
    professor: '👨‍🏫',
    admin: '⚙️',
    pastor: '✝️',
  }
  return icons[role]
}
