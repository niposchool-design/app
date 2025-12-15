import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ROUTES } from '../../lib/constants/routes';
export function PublicRoute({ children, redirectTo = ROUTES.APP }) {
    const { isAuthenticated, isLoading } = useAuth();
    if (isLoading) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center", children: _jsx("div", { className: "animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500" }) }));
    }
    // Se usuário está autenticado, redireciona para área protegida
    if (isAuthenticated) {
        return _jsx(Navigate, { to: redirectTo, replace: true });
    }
    // Se não está autenticado, mostra rota pública
    return _jsx(_Fragment, { children: children });
}
export default PublicRoute;
