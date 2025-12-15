import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ExclamationTriangleIcon, HomeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { ROUTES } from '../../lib/constants/routes';
import { useAuth } from '../../contexts/AuthContext';
/**
 * Componente de página de erro 404 contextual
 */
export function NotFoundPage({ title = "Página não encontrada", message = "A página que você está procurando não existe ou foi movida.", showBackButton = true, showSuggestions = true, customActions }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { profile } = useAuth();
    // Gerar sugestões baseadas no tipo de usuário e URL atual
    const getSuggestions = () => {
        const suggestions = [];
        // Sugestões baseadas no tipo de usuário
        if (profile?.tipo_usuario === 'aluno') {
            suggestions.push({ label: 'Meu Dashboard', href: ROUTES.ALUNO.INDEX }, { label: 'Meu Portfólio', href: ROUTES.ALUNO.PORTFOLIO.INDEX }, { label: 'Desafios', href: ROUTES.ALUNO.CHALLENGES.INDEX }, { label: 'Instrumentos', href: ROUTES.ALUNO.INSTRUMENTS.INDEX });
        }
        else if (profile?.tipo_usuario === 'professor') {
            suggestions.push({ label: 'Dashboard Professor', href: ROUTES.PROFESSOR.INDEX }, { label: 'Minhas Turmas', href: ROUTES.PROFESSOR.CLASSES }, { label: 'Relatórios', href: ROUTES.PROFESSOR.REPORTS });
        }
        else if (profile?.tipo_usuario === 'admin') {
            suggestions.push({ label: 'Administração', href: ROUTES.ADMIN.INDEX }, { label: 'Usuários', href: ROUTES.ADMIN.USERS }, { label: 'Auditoria', href: ROUTES.ADMIN.AUDIT });
        }
        // Sugestões baseadas na URL atual
        const path = location.pathname;
        if (path.includes('/instruments/')) {
            suggestions.unshift({ label: 'Todos os Instrumentos', href: ROUTES.ALUNO.INSTRUMENTS.INDEX });
        }
        else if (path.includes('/history/')) {
            suggestions.unshift({ label: 'História da Música', href: ROUTES.HISTORIA.INDEX });
        }
        else if (path.includes('/portfolio/')) {
            suggestions.unshift({ label: 'Meu Portfólio', href: ROUTES.ALUNO.PORTFOLIO.INDEX });
        }
        return suggestions.slice(0, 4); // Máximo 4 sugestões
    };
    return (_jsx("div", { className: "min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8", children: _jsxs("div", { className: "mx-auto max-w-md w-full", children: [_jsxs("div", { className: "text-center", children: [_jsx(ExclamationTriangleIcon, { className: "mx-auto h-16 w-16 text-gray-400" }), _jsx("h1", { className: "mt-4 text-6xl font-bold text-gray-900", children: "404" }), _jsx("h2", { className: "mt-4 text-2xl font-bold text-gray-900", children: title }), _jsx("p", { className: "mt-2 text-gray-600", children: message })] }), _jsxs("div", { className: "mt-8 space-y-4", children: [showBackButton && (_jsxs("button", { onClick: () => navigate(-1), className: "w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500", children: [_jsx(ArrowLeftIcon, { className: "mr-2 h-4 w-4" }), "Voltar"] })), _jsxs(Link, { to: ROUTES.HOME, className: "w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500", children: [_jsx(HomeIcon, { className: "mr-2 h-4 w-4" }), "Ir para In\u00EDcio"] }), customActions] }), showSuggestions && (_jsxs("div", { className: "mt-8", children: [_jsx("h3", { className: "text-sm font-medium text-gray-900 mb-4", children: "Voc\u00EA pode estar procurando por:" }), _jsx("div", { className: "space-y-2", children: getSuggestions().map((suggestion, index) => (_jsx(Link, { to: suggestion.href, className: "block px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors", children: suggestion.label }, index))) })] }))] }) }));
}
/**
 * Componente de página de erro 403 (acesso negado)
 */
export function ForbiddenPage({ title = "Acesso negado", message = "Você não tem permissão para acessar esta página.", showBackButton = true, showSuggestions = true, customActions }) {
    const navigate = useNavigate();
    const { profile } = useAuth();
    // Sugestões baseadas no tipo de usuário
    const getSuggestions = () => {
        if (profile?.tipo_usuario === 'aluno') {
            return [
                { label: 'Minha Área', href: ROUTES.ALUNO.INDEX },
                { label: 'Meu Portfólio', href: ROUTES.ALUNO.PORTFOLIO.INDEX },
                { label: 'Desafios', href: ROUTES.ALUNO.CHALLENGES.INDEX }
            ];
        }
        else if (profile?.tipo_usuario === 'professor') {
            return [
                { label: 'Área do Professor', href: ROUTES.PROFESSOR.INDEX },
                { label: 'Minhas Turmas', href: ROUTES.PROFESSOR.CLASSES }
            ];
        }
        return [{ label: 'Página Inicial', href: ROUTES.HOME }];
    };
    return (_jsx("div", { className: "min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8", children: _jsxs("div", { className: "mx-auto max-w-md w-full", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100", children: _jsx(ExclamationTriangleIcon, { className: "h-8 w-8 text-red-600" }) }), _jsx("h1", { className: "mt-4 text-6xl font-bold text-gray-900", children: "403" }), _jsx("h2", { className: "mt-4 text-2xl font-bold text-gray-900", children: title }), _jsx("p", { className: "mt-2 text-gray-600", children: message }), profile && (_jsxs("p", { className: "mt-2 text-sm text-gray-500", children: ["Logado como: ", profile.full_name, " (", profile.tipo_usuario, ")"] }))] }), _jsxs("div", { className: "mt-8 space-y-4", children: [showBackButton && (_jsxs("button", { onClick: () => navigate(-1), className: "w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500", children: [_jsx(ArrowLeftIcon, { className: "mr-2 h-4 w-4" }), "Voltar"] })), customActions] }), showSuggestions && (_jsxs("div", { className: "mt-8", children: [_jsx("h3", { className: "text-sm font-medium text-gray-900 mb-4", children: "P\u00E1ginas que voc\u00EA pode acessar:" }), _jsx("div", { className: "space-y-2", children: getSuggestions().map((suggestion, index) => (_jsx(Link, { to: suggestion.href, className: "block px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors", children: suggestion.label }, index))) })] }))] }) }));
}
/**
 * Componente de página de erro 500 (erro interno)
 */
export function ServerErrorPage({ title = "Algo deu errado", message = "Ocorreu um erro interno no servidor. Tente novamente em alguns instantes.", showBackButton = true, customActions }) {
    const navigate = useNavigate();
    return (_jsx("div", { className: "min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8", children: _jsxs("div", { className: "mx-auto max-w-md w-full", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100", children: _jsx(ExclamationTriangleIcon, { className: "h-8 w-8 text-red-600" }) }), _jsx("h1", { className: "mt-4 text-6xl font-bold text-gray-900", children: "500" }), _jsx("h2", { className: "mt-4 text-2xl font-bold text-gray-900", children: title }), _jsx("p", { className: "mt-2 text-gray-600", children: message })] }), _jsxs("div", { className: "mt-8 space-y-4", children: [_jsx("button", { onClick: () => window.location.reload(), className: "w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500", children: "Tentar Novamente" }), showBackButton && (_jsxs("button", { onClick: () => navigate(-1), className: "w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500", children: [_jsx(ArrowLeftIcon, { className: "mr-2 h-4 w-4" }), "Voltar"] })), _jsxs(Link, { to: ROUTES.HOME, className: "w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500", children: [_jsx(HomeIcon, { className: "mr-2 h-4 w-4" }), "Ir para In\u00EDcio"] }), customActions] })] }) }));
}
export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return (_jsx(ServerErrorPage, { title: "Erro na aplica\u00E7\u00E3o", message: "Ocorreu um erro inesperado. A p\u00E1gina ser\u00E1 recarregada automaticamente.", customActions: _jsx("button", { onClick: () => this.setState({ hasError: false }), className: "w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500", children: "Tentar Novamente" }) }));
        }
        return this.props.children;
    }
}
