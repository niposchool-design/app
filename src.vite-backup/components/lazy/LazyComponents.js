import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * 🚀 LAZY LOADING - Componentes carregados sob demanda
 *
 * Sistema de carregamento dinâmico para melhor performance
 */
import { lazy } from 'react';
// 📱 Páginas principais - carregamento prioritário
export const AlunoDashboard = lazy(() => import('../../features/alunos/pages/AlunoDashboard').then(module => ({
    default: module.AlunoDashboard
})));
export const ProfessorDashboard = lazy(() => import('../../features/professores/pages/ProfessorDashboard').then(module => ({
    default: module.ProfessorDashboard
})));
export const AdminDashboard = lazy(() => import('../../features/admin/pages/AdminDashboard').then(module => ({
    default: module.AdminDashboard
})));
// 🎨 Componentes pesados - carregamento diferido
export const ComponentShowcase = lazy(() => import('../../features/shared/pages/ComponentShowcase'));
export const QRPresenceSystem = lazy(() => import('../nipo/QRPresenceSystem').then(module => ({
    default: module.QRPresenceSystem
})));
export const RealTimeCollaboration = lazy(() => import('../nipo/RealTimeCollaboration').then(module => ({
    default: module.RealTimeCollaboration
})));
// 📚 Features específicas - carregamento sob demanda
export const HistoriaHomePage = lazy(() => import('../../features/historia-musica/pages/HistoriaMusicaHome'));
// 🎯 Loading Component Japonês
export const LazyLoadingComponent = () => (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-nipo-zen-50 to-sakura-50 flex items-center justify-center", children: _jsxs("div", { className: "text-center space-y-4", children: [_jsx("div", { className: "w-16 h-16 mx-auto", children: _jsx("div", { className: "w-full h-full border-4 border-sakura-200 border-t-sakura-600 rounded-full animate-zen-breath" }) }), _jsxs("div", { className: "space-y-2", children: [_jsx("p", { className: "text-xl font-zen text-nipo-zen-700", children: "\u8AAD\u307F\u8FBC\u307F\u4E2D..." }), _jsx("p", { className: "text-sm text-nipo-zen-600", children: "Carregando experi\u00EAncia zen" })] })] }) }));
