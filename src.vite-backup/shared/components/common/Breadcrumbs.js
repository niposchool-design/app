import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid';
import { ROUTES } from '../../lib/constants/routes';
import { slugToTitle } from '../../lib/utils/slug';
/**
 * Mapeamento padrão de rotas para labels em português
 */
const DEFAULT_ROUTE_LABELS = {
    // Área do Aluno
    'student': 'Área do Aluno',
    'dashboard': 'Dashboard',
    'portfolio': 'Portfólio',
    'challenges': 'Desafios',
    'achievements': 'Conquistas',
    'instruments': 'Instrumentos',
    'history': 'História da Música',
    'profile': 'Perfil',
    // Área do Professor
    'teacher': 'Área do Professor',
    'classes': 'Turmas',
    'submissions': 'Envios',
    'reports': 'Relatórios',
    'students': 'Alunos',
    // Área Admin
    'admin': 'Administração',
    'users': 'Usuários',
    'system': 'Sistema',
    'settings': 'Configurações',
    // Gerais
    'edit': 'Editar',
    'new': 'Novo',
    'view': 'Visualizar',
    'create': 'Criar',
    'details': 'Detalhes'
};
/**
 * Gera breadcrumbs automaticamente baseado na URL atual
 */
function generateBreadcrumbsFromPath(pathname, customLabels = {}) {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs = [];
    // Sempre adicionar o home
    breadcrumbs.push({
        label: 'Início',
        href: ROUTES.HOME,
        icon: _jsx(HomeIcon, { className: "h-4 w-4" })
    });
    let currentPath = '';
    segments.forEach((segment, index) => {
        currentPath += `/${segment}`;
        const isLast = index === segments.length - 1;
        // Verificar se é um UUID ou slug
        let label = segment;
        // Tentar obter label customizado
        if (customLabels[segment]) {
            label = customLabels[segment];
        }
        // Tentar obter label padrão
        else if (DEFAULT_ROUTE_LABELS[segment]) {
            label = DEFAULT_ROUTE_LABELS[segment];
        }
        // Se parece com um slug, converter para título
        else if (segment.includes('-')) {
            label = slugToTitle(segment);
        }
        // Se parece com UUID, buscar contexto (isso seria expandido com dados reais)
        else if (segment.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
            // Por enquanto, usar um label genérico
            // Em implementação real, isso faria uma consulta para obter o nome real
            label = 'Item';
        }
        breadcrumbs.push({
            label,
            href: isLast ? undefined : currentPath,
            isActive: isLast
        });
    });
    return breadcrumbs;
}
/**
 * Componente de breadcrumbs inteligente e responsivo
 */
export default function Breadcrumbs({ items, showHomeIcon = true, autoGenerate = true, customLabels = {}, className = '' }) {
    const location = useLocation();
    // Determinar quais itens usar
    const breadcrumbItems = React.useMemo(() => {
        if (items) {
            return items;
        }
        if (autoGenerate) {
            return generateBreadcrumbsFromPath(location.pathname, customLabels);
        }
        return [];
    }, [items, autoGenerate, location.pathname, customLabels]);
    // Não renderizar se não há itens ou apenas um item (home)
    if (breadcrumbItems.length <= 1) {
        return null;
    }
    return (_jsx("nav", { className: `flex ${className}`, "aria-label": "Breadcrumb", children: _jsx("ol", { className: "flex items-center space-x-2", children: breadcrumbItems.map((item, index) => (_jsxs("li", { className: "flex items-center", children: [index > 0 && (_jsx(ChevronRightIcon, { className: "flex-shrink-0 h-4 w-4 text-gray-400 mx-2", "aria-hidden": "true" })), item.href ? (_jsxs(Link, { to: item.href, className: "text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors duration-200 flex items-center space-x-1", children: [index === 0 && showHomeIcon && item.icon, _jsx("span", { children: item.label })] })) : (_jsxs("span", { className: "text-sm font-medium text-gray-900 flex items-center space-x-1", "aria-current": "page", children: [index === 0 && showHomeIcon && item.icon, _jsx("span", { children: item.label })] }))] }, index))) }) }));
}
/**
 * Hook para usar breadcrumbs de forma programática
 */
export function useBreadcrumbs(customLabels) {
    const location = useLocation();
    return React.useMemo(() => generateBreadcrumbsFromPath(location.pathname, customLabels), [location.pathname, customLabels]);
}
/**
 * HOC para adicionar breadcrumbs automaticamente a uma página
 */
export function withBreadcrumbs(Component, breadcrumbConfig) {
    return function BreadcrumbWrappedComponent(props) {
        return (_jsxs("div", { children: [_jsx(Breadcrumbs, { autoGenerate: true, showHomeIcon: breadcrumbConfig?.showHomeIcon, customLabels: breadcrumbConfig?.customLabels, className: breadcrumbConfig?.className }), _jsx(Component, { ...props })] }));
    };
}
/**
 * Componente de breadcrumbs específico para páginas de instrumento
 */
export function InstrumentBreadcrumbs({ instrumentSlug, instrumentName }) {
    const items = [
        {
            label: 'Início',
            href: ROUTES.HOME,
            icon: _jsx(HomeIcon, { className: "h-4 w-4" })
        },
        {
            label: 'Instrumentos',
            href: ROUTES.ALUNO.INSTRUMENTS.INDEX
        },
        {
            label: instrumentName || slugToTitle(instrumentSlug),
            isActive: true
        }
    ];
    return _jsx(Breadcrumbs, { items: items });
}
/**
 * Componente de breadcrumbs específico para histórias da música
 */
export function HistoryBreadcrumbs({ periodSlug, periodName, topicSlug, topicName }) {
    const items = [
        {
            label: 'Início',
            href: ROUTES.HOME,
            icon: _jsx(HomeIcon, { className: "h-4 w-4" })
        },
        {
            label: 'História da Música',
            href: ROUTES.HISTORIA.INDEX
        }
    ];
    if (periodSlug) {
        items.push({
            label: periodName || slugToTitle(periodSlug),
            href: topicSlug ? ROUTES.HISTORIA.PERIODO_DETAIL(periodSlug) : undefined,
            isActive: !topicSlug
        });
    }
    if (topicSlug && topicName) {
        items.push({
            label: topicName,
            isActive: true
        });
    }
    return _jsx(Breadcrumbs, { items: items });
}
