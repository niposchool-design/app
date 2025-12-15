import { jsx as _jsx } from "react/jsx-runtime";
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
        return _jsx(LoadingScreen, {});
    }
    // Redirecionar baseado no tipo de usuário
    const dashboardPath = getDashboardRoute(profile?.tipo_usuario);
    return _jsx(Navigate, { to: dashboardPath, replace: true });
};
