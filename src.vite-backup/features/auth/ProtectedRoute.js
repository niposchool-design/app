import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
export function ProtectedRoute({ children, allowedRoles, requiredRole, 
// Novas props com valores padrão
requiredPermissions = [], fallbackRoute = "/acesso-negado", requireAuth = true, showLoadingSpinner = true }) {
    const { user, profile, loading } = useAuth();
    const location = useLocation();
    // ========================================
    // 🔄 LOADING STATE (mantém comportamento original)
    // ========================================
    if (loading) {
        if (!showLoadingSpinner) {
            return null;
        }
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" }), _jsx("p", { className: "mt-4 text-gray-600", children: "Carregando..." })] }) }));
    }
    // ========================================
    // 🔐 VERIFICAÇÃO DE AUTENTICAÇÃO (mantém comportamento original)
    // ========================================
    if (requireAuth && (!user || !profile)) {
        return _jsx(Navigate, { to: "/login", state: { from: location }, replace: true });
    }
    // ========================================
    // 👤 VERIFICAÇÃO DE ROLE ÚNICO (mantém comportamento original)
    // ========================================
    if (requiredRole && profile?.tipo_usuario !== requiredRole) {
        return _jsx(Navigate, { to: fallbackRoute, replace: true });
    }
    // ========================================
    // 👥 VERIFICAÇÃO DE MÚLTIPLOS ROLES (mantém comportamento original)
    // ========================================
    if (allowedRoles && allowedRoles.length > 0 && profile) {
        const userRole = profile.tipo_usuario;
        if (!allowedRoles.includes(userRole)) {
            return _jsx(Navigate, { to: fallbackRoute, replace: true });
        }
    }
    // ========================================
    // 🆕 VERIFICAÇÃO DE PERMISSÕES ESPECÍFICAS (nova funcionalidade)
    // ========================================
    if (requiredPermissions.length > 0 && profile) {
        // Por enquanto, permissões baseadas no tipo de usuário
        // Futuramente pode ser expandido para sistema de permissões granular
        const userPermissions = getUserPermissions(profile.tipo_usuario);
        const hasRequiredPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));
        if (!hasRequiredPermissions) {
            console.warn(`Usuário não tem permissões:`, requiredPermissions);
            return _jsx(Navigate, { to: fallbackRoute, replace: true });
        }
    }
    // ========================================
    // ✅ AUTORIZADO - RENDERIZA CONTEÚDO
    // ========================================
    return _jsx(_Fragment, { children: children });
}
/**
 * 🆕 Helper para obter permissões baseadas no tipo de usuário
 * Mantém compatibilidade total, mas permite expansão futura
 */
function getUserPermissions(tipoUsuario) {
    const permissionsMap = {
        aluno: [
            'portfolio.view',
            'portfolio.create',
            'portfolio.edit_own',
            'achievements.view',
            'challenges.view',
            'challenges.submit',
            'instruments.view',
            'profile.edit_own'
        ],
        professor: [
            'portfolio.view',
            'portfolio.create',
            'portfolio.edit_own',
            'achievements.view',
            'challenges.view',
            'challenges.submit',
            'instruments.view',
            'profile.edit_own',
            // Permissões específicas do professor
            'classes.view',
            'classes.create',
            'classes.edit_own',
            'submissions.view',
            'submissions.grade',
            'students.view_in_classes',
            'reports.view_own'
        ],
        admin: [
            // Admins têm todas as permissões
            'portfolio.view',
            'portfolio.create',
            'portfolio.edit',
            'portfolio.delete',
            'achievements.view',
            'achievements.manage',
            'challenges.view',
            'challenges.manage',
            'instruments.view',
            'instruments.manage',
            'profile.edit',
            'classes.view',
            'classes.create',
            'classes.edit',
            'classes.delete',
            'users.view',
            'users.create',
            'users.edit',
            'users.delete',
            'reports.view',
            'system.manage'
        ],
        pastor: [
            // Pastor tem permissões similares ao professor
            'portfolio.view',
            'portfolio.create',
            'portfolio.edit_own',
            'achievements.view',
            'challenges.view',
            'challenges.submit',
            'instruments.view',
            'profile.edit_own',
            'classes.view',
            'classes.create',
            'classes.edit_own',
            'submissions.view',
            'submissions.grade',
            'students.view_in_classes',
            'reports.view_own'
        ]
    };
    return permissionsMap[tipoUsuario] || [];
}
/**
 * 🆕 Hook para verificar permissões no componente
 * Pode ser usado para mostrar/ocultar elementos da UI
 */
export function usePermissions() {
    const { profile } = useAuth();
    return {
        hasRole: (role) => {
            return profile?.tipo_usuario === role;
        },
        hasPermission: (permission) => {
            if (!profile)
                return false;
            const userPermissions = getUserPermissions(profile.tipo_usuario);
            return userPermissions.includes(permission);
        },
        hasAnyPermission: (permissions) => {
            if (!profile)
                return false;
            const userPermissions = getUserPermissions(profile.tipo_usuario);
            return permissions.some(permission => userPermissions.includes(permission));
        },
        hasAllPermissions: (permissions) => {
            if (!profile)
                return false;
            const userPermissions = getUserPermissions(profile.tipo_usuario);
            return permissions.every(permission => userPermissions.includes(permission));
        },
        canAccess: (allowedRoles) => {
            if (!profile)
                return false;
            return allowedRoles.includes(profile.tipo_usuario);
        },
        // Lista todas as permissões do usuário atual
        getAllPermissions: () => {
            if (!profile)
                return [];
            return getUserPermissions(profile.tipo_usuario);
        }
    };
}
