/**
 * Constants - Constantes da aplicação
 * Nova localização: src_new/lib/utils/constants.js
 */

// ==========================================
// CONSTANTES DE SISTEMA
// ==========================================

export const APP_NAME = 'Nipo School';
export const APP_VERSION = '2.0.0';
export const APP_DESCRIPTION = 'Sistema Oriental de Ensino Musical';

// ==========================================
// Export feature flags
export * from './feature-flags.js';

// User roles
// ==========================================

export const USER_ROLES = {
  ADMIN: 'admin',
  TEACHER: 'teacher',
  STUDENT: 'student'
};

export const ROLE_LABELS = {
  [USER_ROLES.ADMIN]: 'Administrador',
  [USER_ROLES.TEACHER]: 'Professor',
  [USER_ROLES.STUDENT]: 'Aluno'
};

export const ROLE_HIERARCHY = {
  [USER_ROLES.ADMIN]: [USER_ROLES.ADMIN, USER_ROLES.TEACHER, USER_ROLES.STUDENT],
  [USER_ROLES.TEACHER]: [USER_ROLES.TEACHER, USER_ROLES.STUDENT],
  [USER_ROLES.STUDENT]: [USER_ROLES.STUDENT]
};

// ==========================================
// STATUS DE SISTEMA
// ==========================================

export const STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived'
};

export const STATUS_LABELS = {
  [STATUS.ACTIVE]: 'Ativo',
  [STATUS.INACTIVE]: 'Inativo',
  [STATUS.PENDING]: 'Pendente',
  [STATUS.APPROVED]: 'Aprovado',
  [STATUS.REJECTED]: 'Rejeitado',
  [STATUS.DRAFT]: 'Rascunho',
  [STATUS.PUBLISHED]: 'Publicado',
  [STATUS.ARCHIVED]: 'Arquivado'
};

// ==========================================
// CATEGORIAS DE INSTRUMENTOS
// ==========================================

export const INSTRUMENT_CATEGORIES = {
  STRINGS: 'Cordas',
  WIND: 'Sopro',
  PERCUSSION: 'Percussão',
  KEYBOARD: 'Teclado',
  ORIENTAL: 'Oriental',
  ELECTRONIC: 'Eletrônico'
};

export const DIFFICULTY_LEVELS = {
  BEGINNER: 'Iniciante',
  INTERMEDIATE: 'Intermediário',
  ADVANCED: 'Avançado',
  EXPERT: 'Expert'
};

// ==========================================
// CONFIGURAÇÕES DE PAGINAÇÃO
// ==========================================

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50],
  MAX_PAGE_SIZE: 100
};

// ==========================================
// CONFIGURAÇÕES DE ARQUIVO
// ==========================================

export const FILE_CONFIG = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  ALLOWED_VIDEO_TYPES: ['video/mp4', 'video/webm', 'video/ogg']
};

// ==========================================
// CONFIGURAÇÕES DE VALIDAÇÃO
// ==========================================

export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_NAME_LENGTH: 100,
  MAX_DESCRIPTION_LENGTH: 500,
  MIN_AGE: 3,
  MAX_AGE: 100
};

// ==========================================
// CORES DO TEMA
// ==========================================

export const THEME_COLORS = {
  PRIMARY: '#dc2626', // red-600
  SECONDARY: '#6b7280', // gray-500
  SUCCESS: '#10b981', // emerald-500
  WARNING: '#f59e0b', // amber-500
  ERROR: '#ef4444', // red-500
  INFO: '#3b82f6' // blue-500
};

// ==========================================
// MENSAGENS PADRÃO
// ==========================================

export const MESSAGES = {
  SUCCESS: {
    CREATED: 'Criado com sucesso!',
    UPDATED: 'Atualizado com sucesso!',
    DELETED: 'Removido com sucesso!',
    SAVED: 'Salvo com sucesso!'
  },
  ERROR: {
    GENERIC: 'Ocorreu um erro inesperado',
    NETWORK: 'Erro de conexão. Verifique sua internet.',
    UNAUTHORIZED: 'Você não tem permissão para esta ação',
    NOT_FOUND: 'Item não encontrado',
    VALIDATION: 'Verifique os dados informados'
  },
  LOADING: {
    DEFAULT: 'Carregando...',
    SAVING: 'Salvando...',
    DELETING: 'Removendo...',
    PROCESSING: 'Processando...'
  }
};

// ==========================================
// CONFIGURAÇÕES DE CACHE
// ==========================================

export const CACHE_CONFIG = {
  DEFAULT_TTL: 30000, // 30 segundos
  LONG_TTL: 300000, // 5 minutos
  SHORT_TTL: 10000 // 10 segundos
};

// ==========================================
// ROTAS DA APLICAÇÃO
// ==========================================

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  
  // Admin
  ADMIN: '/admin',
  ADMIN_STUDENTS: '/admin/alunos',
  ADMIN_TEACHERS: '/admin/professores',
  ADMIN_INSTRUMENTS: '/admin/instruments',
  ADMIN_CURRICULUM: '/admin/curriculum',
  ADMIN_CLASSES: '/admin/turmas',
  ADMIN_QR: '/admin/qr-manager',
  
  // Student
  STUDENT: '/alunos',
  STUDENT_STUDIES: '/alunos/estudos',
  STUDENT_LIBRARY: '/alunos/biblioteca',
  STUDENT_PROGRESS: '/alunos/progresso',
  
  // Teacher
  TEACHER: '/professores',
  TEACHER_CONTENT: '/professores/conteudos',
  TEACHER_STATS: '/professores/estatisticas'
};

// ==========================================
// CONFIGURAÇÕES DE API
// ==========================================

export const API_CONFIG = {
  TIMEOUT: 30000, // 30 segundos
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000 // 1 segundo
};

// ==========================================
// EVENTOS DE SISTEMA
// ==========================================

export const EVENTS = {
  USER_LOGIN: 'user_login',
  USER_LOGOUT: 'user_logout',
  DATA_UPDATED: 'data_updated',
  ERROR_OCCURRED: 'error_occurred'
};