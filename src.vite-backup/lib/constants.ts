/**
 * Application constants
 */

// User roles
export const USER_ROLES = {
  ADMIN: 'admin',
  PROFESSOR: 'professor',
  ALUNO: 'aluno',
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];

// Routes by role
export const ROUTES_BY_ROLE: Record<UserRole, string> = {
  admin: '/admin/dashboard',
  professor: '/professores/dashboard',
  aluno: '/alunos/dashboard',
};

// App info
export const APP_INFO = {
  NAME: 'Nipo School',
  VERSION: '2.0.0',
  DESCRIPTION: 'Sistema de gestão pedagógica musical',
};

// API endpoints
export const API_ENDPOINTS = {
  AUTH: '/auth',
  USERS: '/users',
  AULAS: '/aulas',
  ALUNOS: '/alunos',
  PROFESSORES: '/professores',
};

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'nipo_auth_token',
  USER_DATA: 'nipo_user_data',
  THEME: 'nipo_theme',
  LANGUAGE: 'nipo_language',
};

// Validation rules
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^\([0-9]{2}\) [0-9]{4,5}-[0-9]{4}$/,
  MIN_PASSWORD_LENGTH: 8,
  MAX_NAME_LENGTH: 100,
};

// Date formats
export const DATE_FORMATS = {
  SHORT: 'dd/MM/yyyy',
  LONG: "dd 'de' MMMM 'de' yyyy",
  WITH_TIME: 'dd/MM/yyyy HH:mm',
  TIME_ONLY: 'HH:mm',
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
};
