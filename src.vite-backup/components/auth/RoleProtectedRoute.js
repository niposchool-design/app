import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ROUTES } from '../../lib/constants/routes';
export function RoleProtectedRoute({ children, allowedRoles, redirectTo }) {
    const { user, loading } = useAuth();
    // Loading state - mostrar spinner
    if (loading) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-sakura-50 to-white", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4" }), _jsx("p", { className: "text-gray-600", children: "Verificando permiss\u00F5es..." })] }) }));
    }
    // Usuário não logado - redirecionar para login
    if (!user) {
        return _jsx(Navigate, { to: ROUTES.LOGIN, replace: true });
    }
    // Verificar se o usuário tem permissão
    const userRole = user.role;
    const hasPermission = allowedRoles.includes(userRole);
    if (!hasPermission) {
        // Se não tem permissão, redirecionar para dashboard correto
        const defaultRedirect = getDefaultDashboardForRole(userRole);
        const finalRedirect = redirectTo || defaultRedirect;
        return _jsx(Navigate, { to: finalRedirect, replace: true });
    }
    // Usuário tem permissão - renderizar conteúdo
    return _jsx(_Fragment, { children: children });
}
/**
 * 🎯 Função auxiliar para determinar dashboard padrão por papel
 */
function getDefaultDashboardForRole(role) {
    switch (role) {
        case 'admin':
            return '/admin';
        case 'professor':
            return '/professores';
        case 'aluno':
            return '/alunos';
        default:
            return '/alunos'; // fallback seguro
    }
}
/**
 * 🎨 Componente de acesso negado customizado (opcional)
 */
export function AccessDeniedPage() {
    const { user } = useAuth();
    const redirectUrl = getDefaultDashboardForRole(user?.role || 'aluno');
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-white", children: _jsxs("div", { className: "max-w-md mx-auto text-center p-8", children: [_jsx("div", { className: "w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center", children: _jsx("svg", { className: "w-8 h-8 text-red-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" }) }) }), _jsx("h1", { className: "text-2xl font-bold text-gray-900 mb-4", children: "Acesso Negado" }), _jsx("p", { className: "text-gray-600 mb-6", children: "Voc\u00EA n\u00E3o tem permiss\u00E3o para acessar esta \u00E1rea." }), _jsx("button", { onClick: () => window.location.href = redirectUrl, className: "bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors", children: "Ir para meu Dashboard" })] }) }));
}
