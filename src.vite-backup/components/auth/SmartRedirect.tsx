// src/components/auth/SmartRedirect.tsx
// Redirecionamento inteligente baseado no tipo de usuário

import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LoadingScreen } from '../shared/LoadingScreen';
import { getDashboardRoute } from '../../lib/utils/navigation';

/**
 * Componente que redireciona automaticamente para o dashboard correto
 * baseado no tipo_usuario do perfil
 */
export const SmartRedirect = () => {
  const { profile, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  // Redirecionar baseado no tipo de usuário
  const dashboardPath = getDashboardRoute(profile?.tipo_usuario);

  return <Navigate to={dashboardPath} replace />;
};
