/**
 * 🗺️ CONSTANTES DE ROTAS - NIPO SCHOOL
 * 
 * Todas as rotas da aplicação em um único lugar
 * Tipo-seguras com TypeScript
 * 
 * Total: 46 rotas únicas + módulo História da Música
 */

// ========================================
// ROTAS PÚBLICAS
// ========================================
export const ROUTES = {
  HOME: '/',
  SOBRE: '/sobre',
  CONTATO: '/contato',
  LOGIN: '/login',
  SIGNUP: '/signup',
  PASSWORD_RESET: '/password-reset',

  // ========================================
  // BASE AUTENTICADA
  // ========================================
  APP: '/dashboard', // Rota que redireciona baseado no papel do usuário
  DASHBOARD: '/dashboard', // Rota genérica de dashboard com redirecionamento inteligente
  SETTINGS: '/configuracoes',
  NOTIFICATIONS: '/notificacoes',
  HELP: '/ajuda',

  // ========================================
  // ALUNO
  // ========================================
  ALUNO: {
    INDEX: '/alunos',
    PROFILE: '/alunos/perfil',
    
    // Conquistas
    ACHIEVEMENTS: {
      INDEX: '/alunos/conquistas',
      DETAIL: (id: string) => `/alunos/conquistas/${id}`,
    },
    
    // Portfólio
    PORTFOLIO: {
      INDEX: '/alunos/portfolio',
      CREATE: '/alunos/portfolio/criar',
      DETAIL: (id: string) => `/alunos/portfolio/${id}`,
    },
    
    // Desafios Alpha
    CHALLENGES: {
      INDEX: '/alunos/desafios',
      DETAIL: (id: string) => `/alunos/desafios/${id}`,
    },
    
    // Biblioteca de Instrumentos
    INSTRUMENTS: {
      INDEX: '/alunos/instrumentos',
      DETAIL: (id: string) => `/alunos/instrumentos/${id}`,
    },
    
    // Aulas & Progresso
    CLASSES: '/alunos/aulas',
    PROGRESS: '/alunos/progresso',
  },

  // ========================================
  // PROFESSOR
  // ========================================
  PROFESSOR: {
    INDEX: '/professores',
    PROFILE: '/professores/perfil',
    
    // Turmas
    CLASSES: '/professores/turmas',
    CLASS_DETAIL: (id: string) => `/professores/turmas/${id}`,
    
    // Submissões
    SUBMISSIONS: '/professores/submissoes',
    SUBMISSION_DETAIL: (id: string) => `/professores/submissoes/${id}`,
    
    // Outros
    CALENDAR: '/professores/calendario',
    MATERIALS: '/professores/materiais',
    REPORTS: '/professores/relatorios',
  },

  // ========================================
  // ADMIN
  // ========================================
  ADMIN: {
    INDEX: '/admin',
    
    // Usuários
    USERS: '/admin/usuarios',
    USER_NEW: '/admin/usuarios/novo',
    USER_EDIT: (id: string) => `/admin/usuarios/${id}`,
    
    // Gestão
    CLASSES: '/admin/turmas',
    INSTRUMENTS: '/admin/instrumentos',
    ACHIEVEMENTS: '/admin/conquistas',
    CHALLENGES: '/admin/desafios',
    
    // Análise
    REPORTS: '/admin/relatorios',
    AUDIT: '/admin/auditoria',
  },

  // ========================================
  // HISTÓRIA DA MÚSICA
  // ========================================
  HISTORIA: {
    INDEX: '/historia',
    PERIODOS: '/historia/periodos',
    PERIODO_DETAIL: (id: string) => `/historia/periodos/${id}`,
    COMPOSITORES: '/historia/compositores',
    COMPOSITOR_DETAIL: (id: string) => `/historia/compositores/${id}`,
    OBRAS: '/historia/obras',
    OBRA_DETAIL: (id: string) => `/historia/obras/${id}`,
    TIMELINE: '/app/historia/timeline',
    GENEROS: '/app/historia/generos',
    QUIZ: '/app/historia/quiz',
    BIBLIOTECA: '/app/historia/biblioteca',
  },

  // ========================================
  // PÁGINAS DE ERRO
  // ========================================
  FORBIDDEN: '/403',
  NOT_FOUND: '/404',
} as const

// ========================================
// HELPERS
// ========================================
export const getDashboardRoute = (tipoUsuario: string): string => {
  const map: Record<string, string> = {
    aluno: ROUTES.ALUNO.INDEX,
    professor: ROUTES.PROFESSOR.INDEX,
    admin: ROUTES.ADMIN.INDEX,
    pastor: ROUTES.ALUNO.INDEX,
  }
  return map[tipoUsuario] || ROUTES.HOME
}

export const isPublicRoute = (pathname: string): boolean => {
  const publicRoutes: string[] = [
    ROUTES.HOME,
    ROUTES.SOBRE,
    ROUTES.CONTATO,
    ROUTES.LOGIN,
    ROUTES.SIGNUP,
    ROUTES.PASSWORD_RESET,
  ]
  return publicRoutes.includes(pathname)
}

export const isProtectedRoute = (pathname: string): boolean => {
  return pathname.startsWith('/app')
}

// ========================================
// TIPOS
// ========================================
export type RouteType = typeof ROUTES
export type RoleType = 'aluno' | 'professor' | 'admin' | 'pastor'
