// src/lib/utils/navigation.ts
// Utilitários de navegação e rotas

import { ROUTES, type RoleType } from '../constants/routes';

/**
 * Retorna a rota do dashboard baseado no tipo de usuário
 */
export const getDashboardRoute = (tipoUsuario?: RoleType | string | null): string => {
  switch (tipoUsuario) {
    case 'aluno':
      return ROUTES.ALUNO.INDEX;
    case 'professor':
      return ROUTES.PROFESSOR.INDEX;
    case 'admin':
      return ROUTES.ADMIN.INDEX;
    case 'pastor':
      return ROUTES.ADMIN.INDEX; // Pastor usa dashboard de admin
    default:
      return ROUTES.HOME;
  }
};

/**
 * Verifica se uma rota é pública
 */
export const isPublicRoute = (path: string): boolean => {
  const publicPaths: string[] = [ROUTES.HOME, ROUTES.LOGIN, ROUTES.SIGNUP];
  return publicPaths.includes(path);
};

/**
 * Extrai o role necessário do caminho da rota
 */
export const getRoleFromPath = (path: string): RoleType | null => {
  if (path.startsWith('/aluno')) return 'aluno';
  if (path.startsWith('/professor')) return 'professor';
  if (path.startsWith('/admin')) return 'admin';
  return null;
};

/**
 * Verifica se um usuário tem permissão para acessar uma rota
 */
export const canAccessRoute = (
  userRole: RoleType | string | null | undefined,
  path: string
): boolean => {
  // Rotas públicas são acessíveis por todos
  if (isPublicRoute(path)) {
    return true;
  }

  // Rota raiz do dashboard é acessível se autenticado
  if (path === ROUTES.DASHBOARD && userRole) {
    return true;
  }

  // Admin tem acesso a tudo
  if (userRole === 'admin' || userRole === 'pastor') {
    return true;
  }

  // Verifica role específico
  const requiredRole = getRoleFromPath(path);
  if (!requiredRole) {
    return true; // Rotas sem role específico são acessíveis
  }

  return userRole === requiredRole;
};

/**
 * Formata o nome do role para exibição
 */
export const formatRole = (role: RoleType | string | null | undefined): string => {
  switch (role) {
    case 'aluno':
      return 'Aluno';
    case 'professor':
      return 'Professor';
    case 'admin':
      return 'Administrador';
    case 'pastor':
      return 'Pastor';
    default:
      return 'Usuário';
  }
};
