import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from 'react-router-dom';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import { useAuth } from '../../contexts/AuthContext';
/**
 * Layout base para todas as páginas autenticadas
 */
function BaseLayout({ children, showBreadcrumbs = true, breadcrumbLabels, className = '' }) {
    return (_jsxs("div", { className: `min-h-screen bg-gray-50 ${className}`, children: [showBreadcrumbs && (_jsx("div", { className: "bg-white shadow-sm border-b border-gray-200", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4", children: _jsx(Breadcrumbs, { autoGenerate: true, customLabels: breadcrumbLabels, className: "mb-0" }) }) })), _jsx("main", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: children || _jsx(Outlet, {}) })] }));
}
/**
 * Layout específico para páginas de alunos
 */
export function AlunoLayout({ children, showBreadcrumbs = true, className = '' }) {
    const { profile } = useAuth();
    // Labels customizados para área do aluno
    const breadcrumbLabels = {
        'student': 'Minha Área',
        'dashboard': 'Painel',
        'portfolio': 'Meu Portfólio',
        'challenges': 'Meus Desafios',
        'achievements': 'Minhas Conquistas',
        'instruments': 'Instrumentos',
        'history': 'História da Música',
        'profile': 'Meu Perfil'
    };
    return (_jsxs(BaseLayout, { showBreadcrumbs: showBreadcrumbs, breadcrumbLabels: breadcrumbLabels, className: `aluno-layout ${className}`, children: [_jsx("div", { className: "bg-gradient-to-r from-blue-600 to-purple-600 text-white mb-8 rounded-lg shadow-lg", children: _jsxs("div", { className: "px-6 py-4", children: [_jsxs("h1", { className: "text-2xl font-bold", children: ["Ol\u00E1, ", profile?.full_name?.split(' ')[0] || 'Aluno', "! \uD83D\uDC4B"] }), _jsx("p", { className: "text-blue-100 mt-1", children: "Pronto para sua jornada musical hoje?" })] }) }), children || _jsx(Outlet, {})] }));
}
/**
 * Layout específico para páginas de professores
 */
export function ProfessorLayout({ children, showBreadcrumbs = true, className = '' }) {
    const { profile } = useAuth();
    // Labels customizados para área do professor
    const breadcrumbLabels = {
        'teacher': 'Área do Professor',
        'dashboard': 'Painel de Controle',
        'classes': 'Minhas Turmas',
        'students': 'Meus Alunos',
        'submissions': 'Envios dos Alunos',
        'reports': 'Relatórios',
        'profile': 'Meu Perfil'
    };
    return (_jsxs(BaseLayout, { showBreadcrumbs: showBreadcrumbs, breadcrumbLabels: breadcrumbLabels, className: `professor-layout ${className}`, children: [_jsx("div", { className: "bg-gradient-to-r from-green-600 to-teal-600 text-white mb-8 rounded-lg shadow-lg", children: _jsxs("div", { className: "px-6 py-4", children: [_jsxs("h1", { className: "text-2xl font-bold", children: ["Professor(a) ", profile?.full_name?.split(' ')[0] || 'Professor', " \uD83C\uDF93"] }), _jsx("p", { className: "text-green-100 mt-1", children: "Gerencie suas turmas e acompanhe o progresso dos alunos" })] }) }), children || _jsx(Outlet, {})] }));
}
/**
 * Layout específico para páginas de administração
 */
export function AdminLayout({ children, showBreadcrumbs = true, className = '' }) {
    const { profile } = useAuth();
    // Labels customizados para área administrativa
    const breadcrumbLabels = {
        'admin': 'Administração',
        'dashboard': 'Painel Administrativo',
        'users': 'Gestão de Usuários',
        'system': 'Sistema',
        'settings': 'Configurações',
        'reports': 'Relatórios Gerais',
        'profile': 'Meu Perfil'
    };
    return (_jsxs(BaseLayout, { showBreadcrumbs: showBreadcrumbs, breadcrumbLabels: breadcrumbLabels, className: `admin-layout ${className}`, children: [_jsx("div", { className: "bg-gradient-to-r from-red-600 to-pink-600 text-white mb-8 rounded-lg shadow-lg", children: _jsxs("div", { className: "px-6 py-4 flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold", children: "Administra\u00E7\u00E3o \u2699\uFE0F" }), _jsxs("p", { className: "text-red-100 mt-1", children: ["Bem-vindo(a), ", profile?.full_name?.split(' ')[0] || 'Admin'] })] }), _jsx("div", { className: "bg-red-500/20 px-3 py-1 rounded-full", children: _jsx("span", { className: "text-sm font-medium", children: "Modo Admin" }) })] }) }), children || _jsx(Outlet, {})] }));
}
/**
 * Layout específico para pastores (similar ao professor)
 */
export function PastorLayout({ children, showBreadcrumbs = true, className = '' }) {
    const { profile } = useAuth();
    // Labels customizados para área do pastor
    const breadcrumbLabels = {
        'pastor': 'Área Pastoral',
        'dashboard': 'Painel Pastoral',
        'classes': 'Grupos Musicais',
        'students': 'Membros',
        'submissions': 'Atividades',
        'reports': 'Relatórios Ministeriais',
        'profile': 'Meu Perfil'
    };
    return (_jsxs(BaseLayout, { showBreadcrumbs: showBreadcrumbs, breadcrumbLabels: breadcrumbLabels, className: `pastor-layout ${className}`, children: [_jsx("div", { className: "bg-gradient-to-r from-purple-600 to-indigo-600 text-white mb-8 rounded-lg shadow-lg", children: _jsxs("div", { className: "px-6 py-4", children: [_jsxs("h1", { className: "text-2xl font-bold", children: ["Pastor(a) ", profile?.full_name?.split(' ')[0] || 'Pastor', " \u271D\uFE0F"] }), _jsx("p", { className: "text-purple-100 mt-1", children: "Lideran\u00E7a musical e forma\u00E7\u00E3o ministerial" })] }) }), children || _jsx(Outlet, {})] }));
}
/**
 * Layout para páginas de instrumentos com funcionalidades específicas
 */
export function InstrumentLayout({ children, instrumentSlug, instrumentName, showBreadcrumbs = true, className = '' }) {
    return (_jsxs(BaseLayout, { showBreadcrumbs: false, className: `instrument-layout ${className}`, children: [showBreadcrumbs && instrumentSlug && (_jsx("div", { className: "bg-white shadow-sm border-b border-gray-200 -mt-8 mb-8", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4", children: _jsx(Breadcrumbs, { items: [
                            {
                                label: 'Início',
                                href: '/',
                                icon: _jsx("span", { children: "\uD83C\uDFE0" })
                            },
                            {
                                label: 'Instrumentos',
                                href: '/student/instruments'
                            },
                            {
                                label: instrumentName || instrumentSlug,
                                isActive: true
                            }
                        ] }) }) })), children || _jsx(Outlet, {})] }));
}
/**
 * Layout para páginas de história da música
 */
export function HistoryLayout({ children, periodSlug, periodName, topicSlug, topicName, showBreadcrumbs = true, className = '' }) {
    return (_jsxs(BaseLayout, { showBreadcrumbs: false, className: `history-layout ${className}`, children: [showBreadcrumbs && (_jsx("div", { className: "bg-white shadow-sm border-b border-gray-200 -mt-8 mb-8", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4", children: _jsx(Breadcrumbs, { items: [
                            {
                                label: 'Início',
                                href: '/',
                                icon: _jsx("span", { children: "\uD83C\uDFE0" })
                            },
                            {
                                label: 'História da Música',
                                href: '/student/history'
                            },
                            ...(periodSlug ? [{
                                    label: periodName || periodSlug,
                                    href: topicSlug ? `/student/history/${periodSlug}` : undefined,
                                    isActive: !topicSlug
                                }] : []),
                            ...(topicSlug && topicName ? [{
                                    label: topicName,
                                    isActive: true
                                }] : [])
                        ] }) }) })), children || _jsx(Outlet, {})] }));
}
export default BaseLayout;
