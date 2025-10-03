import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSimpleAuth } from '@new/contexts/simple-auth-context';

/**
 * SimpleProtectedRoute - Versão simplificada com debug
 */
export const SimpleProtectedRoute = ({ children, requiredRole = null }) => {
  const { isAuthenticated, user, loading } = useSimpleAuth();
  const location = useLocation();

  console.log('🛡️ ProtectedRoute Check:', { 
    isAuthenticated, 
    userRole: user?.role, 
    requiredRole, 
    loading,
    currentPath: location.pathname
  });

  if (loading) {
    console.log('⏳ Mostrando loading...');
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('❌ Não autenticado, redirecionando para login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    console.log('❌ Role incorreto. Esperado:', requiredRole, 'Atual:', user?.role);
    return <Navigate to="/unauthorized" replace />;
  }

  console.log('✅ Acesso permitido');
  return children;
};

/**
 * SimplePublicRoute - Para páginas públicas com debug
 */
export const SimplePublicRoute = ({ children }) => {
  const { isAuthenticated, getCurrentDashboardPath, loading } = useSimpleAuth();

  console.log('🌐 PublicRoute Check:', { 
    isAuthenticated, 
    loading 
  });

  if (loading) {
    console.log('⏳ PublicRoute loading...');
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    const dashboardPath = getCurrentDashboardPath();
    console.log('✅ Usuário autenticado, redirecionando para:', dashboardPath);
    return <Navigate to={dashboardPath} replace />;
  }

  console.log('✅ Usuário não autenticado, mostrando página pública');
  return children;
};