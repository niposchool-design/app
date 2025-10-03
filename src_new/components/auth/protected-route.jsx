import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@new/contexts/auth-context';

/**
 * ProtectedRoute - Componente para proteger rotas baseado em roles
 * Localização: src_new/components/auth/protected-route.jsx
 */
export const ProtectedRoute = ({ 
  children, 
  requiredRole = null, 
  requiredPermission = null,
  redirectTo = '/login' 
}) => {
  const { isAuthenticated, user, hasRole, hasPermission, loading } = useAuth();
  const location = useLocation();

  // Mostrar loading enquanto verifica autenticação
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  // Redirecionar se não autenticado
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Verificar role específico se requerido
  if (requiredRole && !hasRole(requiredRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Verificar permissão específica se requerida
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

/**
 * PublicRoute - Para rotas que só devem ser acessíveis quando não logado
 */
export const PublicRoute = ({ children, redirectTo = null }) => {
  const { isAuthenticated, getCurrentDashboardPath, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  // Se autenticado, redirecionar para dashboard apropriado
  if (isAuthenticated) {
    const dashboardPath = redirectTo || getCurrentDashboardPath();
    return <Navigate to={dashboardPath} replace />;
  }

  return children;
};

/**
 * RoleBasedRoute - Renderiza componente baseado no role
 */
export const RoleBasedRoute = ({ 
  adminComponent, 
  teacherComponent, 
  studentComponent, 
  fallbackComponent = null 
}) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return fallbackComponent || <Navigate to="/login" replace />;
  }

  switch (user?.role) {
    case 'admin':
      return adminComponent || fallbackComponent;
    case 'teacher':
      return teacherComponent || fallbackComponent;
    case 'student':
      return studentComponent || fallbackComponent;
    default:
      return fallbackComponent || <Navigate to="/login" replace />;
  }
};