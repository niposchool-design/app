import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ROUTES } from '../lib/constants/routes';
import { useAuth } from '../contexts/AuthContext';
// Layouts
import { PublicLayout } from '../components/layout/PublicLayout';
import { ProtectedLayout } from '../components/layout/ProtectedLayout';
// Public Pages
import LandingPage from '../features/shared/pages/LandingPage';
import NavigationPage from '../features/shared/pages/NavigationPage';
import { NotFoundPage } from '../features/shared/pages/NotFoundPage';
import ComponentShowcase from '../features/shared/pages/ComponentShowcase'; // 🎌 NOVO
// Auth Pages
import { LoginPage } from '../features/shared/pages/auth/LoginPage';
import { SignUpPage } from '../features/shared/pages/auth/SignUpPage';
import { PasswordResetPage } from '../features/shared/pages/auth/PasswordResetPage';
import { RoleBasedRedirect } from '../components/auth/RoleBasedRedirect';
import { RoleProtectedRoute } from '../components/auth/RoleProtectedRoute'; // 🛡️ NOVO
// Admin Pages
import DatabaseAdminPage from '../features/admin/pages/DatabaseAdminPage';
import SystemDiagnosticPage from '../features/admin/pages/SystemDiagnosticPage';
import DebugAuthPage from '../features/shared/pages/debug/DebugAuthPage';
// Instrumentos Pages
import InstrumentosPage from '../features/shared/pages/instrumentos/InstrumentosPage';
// História da Música Pages
import HistoriaMusicaHome from '../features/historia-musica/pages/HistoriaMusicaHome';
// Dashboard Pages
import SystemDashboardPage from '../features/shared/pages/dashboard/SystemDashboardPage';
// Dashboards
import { AlunoDashboard } from '../features/alunos/pages/AlunoDashboard';
import { ProfessorDashboard } from '../features/professores/pages/ProfessorDashboard';
import { AdminDashboard } from '../features/admin/pages/AdminDashboard';
// Páginas de Professor
import ConteudosPage from '../features/professores/pages/ConteudosPage';
import NovoConteudoPage from '../features/professores/pages/NovoConteudoPage';
import TurmasPage from '../features/professores/pages/TurmasPage';
import AvaliacoesPage from '../features/professores/pages/AvaliacoesPage';
// Páginas de Aluno
import { ConquistasPage } from '../features/alunos/pages/ConquistasPage';
import { ConquistaDetailPage } from '../features/alunos/pages/ConquistaDetailPage';
import { PortfolioListPage } from '../features/alunos/pages/PortfolioListPage';
import { DesafiosListPage } from '../features/alunos/pages/DesafiosListPage';
// import { InstrumentosPage } from '../features/alunos/pages/InstrumentosPage' // REMOVIDO - duplicado
import { InstrumentoDetailPage } from '../features/alunos/pages/InstrumentoDetailPage';
import { MinhasAulasPage } from '../features/alunos/pages/MinhasAulasPage';
import { PerfilPage } from '../features/alunos/pages/PerfilPage';
import { ProgressoPage } from '../features/alunos/pages/ProgressoPage';
import { PortfolioDetailPage } from '../features/alunos/pages/PortfolioDetailPage';
import { PortfolioCreatePage } from '../features/alunos/pages/PortfolioCreatePage';
import { DesafioDetailPage } from '../features/alunos/pages/DesafioDetailPage';
// Páginas Gerais
import { ConfiguracoesPage } from '../features/shared/pages/ConfiguracoesPage';
import { NotificacoesPage } from '../features/shared/pages/NotificacoesPage';
import { AjudaPage } from '../features/shared/pages/AjudaPage';
import { TestePage } from '../features/shared/pages/TestePage'; // 🧪 NOVA PÁGINA DE TESTE
function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();
    if (loading) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" }) }));
    }
    if (!user) {
        return _jsx(Navigate, { to: ROUTES.LOGIN, replace: true });
    }
    return _jsx(_Fragment, { children: children });
}
export const router = createBrowserRouter([
    // Landing Page SEM Layout (sem Navbar/Footer)
    {
        path: ROUTES.HOME,
        element: _jsx(LandingPage, {}),
    },
    // Login e Signup SEM Layout (sem Navbar/Footer) - Com portal Torii
    {
        path: ROUTES.LOGIN,
        element: _jsx(LoginPage, {}),
    },
    {
        path: ROUTES.SIGNUP,
        element: _jsx(SignUpPage, {}),
    },
    {
        element: _jsx(PublicLayout, {}),
        children: [
            {
                path: '/nav', // Movido para outra rota
                element: _jsx(NavigationPage, {}),
            },
            {
                path: '/showcase', // 🎌 NOVA ROTA
                element: _jsx(ComponentShowcase, {}),
            },
            {
                path: '/teste', // 🧪 NOVA ROTA DE TESTE
                element: _jsx(TestePage, {}),
            },
            {
                path: ROUTES.PASSWORD_RESET,
                element: _jsx(PasswordResetPage, {}),
            },
        ],
    },
    {
        element: _jsx(ProtectedLayout, {}),
        children: [
            {
                path: '/dashboard',
                element: (_jsx(ProtectedRoute, { children: _jsx(RoleBasedRedirect, {}) })),
            },
            {
                path: '/alunos',
                element: (_jsx(RoleProtectedRoute, { allowedRoles: ['aluno'], children: _jsx(AlunoDashboard, {}) })),
            },
            {
                path: '/alunos/conquistas',
                element: (_jsx(RoleProtectedRoute, { allowedRoles: ['aluno'], children: _jsx(ConquistasPage, {}) })),
            },
            {
                path: '/alunos/conquistas/:id',
                element: (_jsx(RoleProtectedRoute, { allowedRoles: ['aluno'], children: _jsx(ConquistaDetailPage, {}) })),
            },
            {
                path: '/alunos/portfolio',
                element: (_jsx(RoleProtectedRoute, { allowedRoles: ['aluno'], children: _jsx(PortfolioListPage, {}) })),
            },
            {
                path: '/alunos/portfolio/criar',
                element: (_jsx(RoleProtectedRoute, { allowedRoles: ['aluno'], children: _jsx(PortfolioCreatePage, {}) })),
            },
            {
                path: '/alunos/portfolio/:id',
                element: (_jsx(RoleProtectedRoute, { allowedRoles: ['aluno'], children: _jsx(PortfolioDetailPage, {}) })),
            },
            {
                path: '/alunos/desafios',
                element: (_jsx(RoleProtectedRoute, { allowedRoles: ['aluno'], children: _jsx(DesafiosListPage, {}) })),
            },
            {
                path: '/alunos/desafios/:id',
                element: (_jsx(RoleProtectedRoute, { allowedRoles: ['aluno'], children: _jsx(DesafioDetailPage, {}) })),
            },
            {
                path: '/alunos/instrumentos',
                element: (_jsx(RoleProtectedRoute, { allowedRoles: ['aluno'], children: _jsx(InstrumentosPage, {}) })),
            },
            {
                path: '/alunos/instrumentos/:id',
                element: (_jsx(RoleProtectedRoute, { allowedRoles: ['aluno'], children: _jsx(InstrumentoDetailPage, {}) })),
            },
            {
                path: '/alunos/aulas',
                element: (_jsx(RoleProtectedRoute, { allowedRoles: ['aluno'], children: _jsx(MinhasAulasPage, {}) })),
            },
            {
                path: '/alunos/progresso',
                element: (_jsx(RoleProtectedRoute, { allowedRoles: ['aluno'], children: _jsx(ProgressoPage, {}) })),
            },
            {
                path: '/alunos/perfil',
                element: (_jsx(RoleProtectedRoute, { allowedRoles: ['aluno'], children: _jsx(PerfilPage, {}) })),
            },
            {
                path: '/professores',
                element: (_jsx(RoleProtectedRoute, { allowedRoles: ['professor'], children: _jsx(ProfessorDashboard, {}) })),
            },
            {
                path: '/professores/conteudos',
                element: (_jsx(RoleProtectedRoute, { allowedRoles: ['professor'], children: _jsx(ConteudosPage, {}) })),
            },
            {
                path: '/professores/novo',
                element: (_jsx(RoleProtectedRoute, { allowedRoles: ['professor'], children: _jsx(NovoConteudoPage, {}) })),
            },
            {
                path: '/professores/turmas',
                element: (_jsx(RoleProtectedRoute, { allowedRoles: ['professor'], children: _jsx(TurmasPage, {}) })),
            },
            {
                path: '/professores/avaliacoes',
                element: (_jsx(RoleProtectedRoute, { allowedRoles: ['professor'], children: _jsx(AvaliacoesPage, {}) })),
            },
            {
                path: '/admin',
                element: (_jsx(RoleProtectedRoute, { allowedRoles: ['admin'], children: _jsx(AdminDashboard, {}) })),
            },
            {
                path: '/admin/database',
                element: (_jsx(RoleProtectedRoute, { allowedRoles: ['admin'], children: _jsx(DatabaseAdminPage, {}) })),
            },
            {
                path: '/admin/diagnostic',
                element: (_jsx(RoleProtectedRoute, { allowedRoles: ['admin'], children: _jsx(SystemDiagnosticPage, {}) })),
            },
            {
                path: '/debug/auth',
                element: _jsx(DebugAuthPage, {}),
            },
            {
                path: '/instrumentos',
                element: _jsx(InstrumentosPage, {}),
            },
            {
                path: '/historia-musica',
                element: (_jsx(ProtectedRoute, { children: _jsx(HistoriaMusicaHome, {}) })),
            },
            {
                path: '/system',
                element: _jsx(SystemDashboardPage, {}),
            },
            {
                path: '/configuracoes',
                element: (_jsx(ProtectedRoute, { children: _jsx(ConfiguracoesPage, {}) })),
            },
            {
                path: '/notificacoes',
                element: (_jsx(ProtectedRoute, { children: _jsx(NotificacoesPage, {}) })),
            },
            {
                path: '/ajuda',
                element: (_jsx(ProtectedRoute, { children: _jsx(AjudaPage, {}) })),
            },
        ],
    },
    {
        path: '*',
        element: _jsx(NotFoundPage, {}),
    },
]);
export default router;
