import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * 🍞 BREADCRUMBS - Trilha de Navegação
 *
 * Mostra o caminho atual da navegação
 * Exemplo: Dashboard > Alunos > João Silva
 */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { ROUTES } from '../../lib/constants/routes';
// Mapeamento de rotas para nomes amigáveis
const ROUTE_NAMES = {
    '/app': 'Dashboard',
    '/app/aluno': 'Dashboard do Aluno',
    '/app/aluno/portfolio': 'Portfólio',
    '/app/aluno/conquistas': 'Conquistas',
    '/app/aluno/desafios': 'Desafios',
    '/app/aluno/instrumentos': 'Instrumentos',
    '/app/professor': 'Dashboard do Professor',
    '/app/professor/turmas': 'Turmas',
    '/app/professor/alunos': 'Alunos',
    '/app/professor/aulas': 'Aulas',
    '/app/professor/biblioteca': 'Biblioteca',
    '/app/admin': 'Dashboard Admin',
    '/app/admin/usuarios': 'Usuários',
    '/app/admin/instrumentos': 'Instrumentos',
    '/app/admin/conquistas': 'Conquistas',
    '/app/configuracoes': 'Configurações',
    '/app/notificacoes': 'Notificações',
    '/app/ajuda': 'Ajuda',
};
export const Breadcrumbs = () => {
    const location = useLocation();
    // Gera breadcrumbs a partir do pathname
    const generateBreadcrumbs = () => {
        const paths = location.pathname.split('/').filter(Boolean);
        const breadcrumbs = [];
        let currentPath = '';
        paths.forEach((segment, index) => {
            currentPath += `/${segment}`;
            const isLast = index === paths.length - 1;
            // Nome do breadcrumb
            let name = ROUTE_NAMES[currentPath] || segment;
            // Capitalize se não estiver no mapeamento
            if (!ROUTE_NAMES[currentPath]) {
                name = segment.charAt(0).toUpperCase() + segment.slice(1);
            }
            breadcrumbs.push({
                name,
                path: currentPath,
                isLast,
            });
        });
        return breadcrumbs;
    };
    const breadcrumbs = generateBreadcrumbs();
    // Não mostrar breadcrumbs na home
    if (location.pathname === '/' || location.pathname === ROUTES.APP) {
        return null;
    }
    return (_jsxs("nav", { className: "flex items-center gap-2 text-sm", "aria-label": "Breadcrumb", children: [_jsx(Link, { to: ROUTES.APP, className: "text-gray-500 hover:text-[var(--color-indigo)] transition-colors", children: _jsx(Home, { className: "w-4 h-4" }) }), breadcrumbs.map((crumb) => (_jsxs(React.Fragment, { children: [_jsx(ChevronRight, { className: "w-4 h-4 text-gray-400" }), crumb.isLast ? (_jsx("span", { className: "text-gray-900 font-medium", children: crumb.name })) : (_jsx(Link, { to: crumb.path, className: "text-gray-500 hover:text-[var(--color-indigo)] transition-colors", children: crumb.name }))] }, crumb.path)))] }));
};
