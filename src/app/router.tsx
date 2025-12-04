import React from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { ROUTES } from '../lib/constants/routes'
import { useAuth } from '../contexts/AuthContext'

// Layouts
import { PublicLayout } from '../components/layout/PublicLayout'
import { ProtectedLayout } from '../components/layout/ProtectedLayout'

// Public Pages
import NavigationPage from '../features/shared/pages/NavigationPage'
import { NotFoundPage } from '../features/shared/pages/NotFoundPage'
import ComponentShowcase from '../features/shared/pages/ComponentShowcase' // 🎌 NOVO

// Auth Pages
import { LoginPage } from '../features/shared/pages/auth/LoginPage'
import { SignUpPage } from '../features/shared/pages/auth/SignUpPage'
import { PasswordResetPage } from '../features/shared/pages/auth/PasswordResetPage'
import { RoleBasedRedirect } from '../components/auth/RoleBasedRedirect'
import { RoleProtectedRoute } from '../components/auth/RoleProtectedRoute' // 🛡️ NOVO

// Admin Pages
import DatabaseAdminPage from '../features/admin/pages/DatabaseAdminPage'
import SystemDiagnosticPage from '../features/admin/pages/SystemDiagnosticPage'
import DebugAuthPage from '../features/shared/pages/debug/DebugAuthPage'

// Instrumentos Pages
import InstrumentosPage from '../features/shared/pages/instrumentos/InstrumentosPage'

// Dashboard Pages
import SystemDashboardPage from '../features/shared/pages/dashboard/SystemDashboardPage'

// Dashboards
import { AlunoDashboard } from '../features/alunos/pages/AlunoDashboard'
import { ProfessorDashboard } from '../features/professores/pages/ProfessorDashboard'
import { AdminDashboard } from '../features/admin/pages/AdminDashboard'

// Páginas de Aluno
import { ConquistasPage } from '../features/alunos/pages/ConquistasPage'
import { ConquistaDetailPage } from '../features/alunos/pages/ConquistaDetailPage'
import { PortfolioListPage } from '../features/alunos/pages/PortfolioListPage'
import { DesafiosListPage } from '../features/alunos/pages/DesafiosListPage'
// import { InstrumentosPage } from '../features/alunos/pages/InstrumentosPage' // REMOVIDO - duplicado
import { InstrumentoDetailPage } from '../features/alunos/pages/InstrumentoDetailPage'
import { MinhasAulasPage } from '../features/alunos/pages/MinhasAulasPage'
import { PerfilPage } from '../features/alunos/pages/PerfilPage'
import { ProgressoPage } from '../features/alunos/pages/ProgressoPage'
import { PortfolioDetailPage } from '../features/alunos/pages/PortfolioDetailPage'
import { PortfolioCreatePage } from '../features/alunos/pages/PortfolioCreatePage'
import { DesafioDetailPage } from '../features/alunos/pages/DesafioDetailPage'

// Páginas Gerais
import { ConfiguracoesPage } from '../features/shared/pages/ConfiguracoesPage'
import { NotificacoesPage } from '../features/shared/pages/NotificacoesPage'
import { AjudaPage } from '../features/shared/pages/AjudaPage'
import { TestePage } from '../features/shared/pages/TestePage' // 🧪 NOVA PÁGINA DE TESTE

interface ProtectedRouteProps {
  children: React.ReactNode
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  return <>{children}</>
}

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: ROUTES.HOME,
        element: <NavigationPage />,
      },
      {
        path: '/showcase', // 🎌 NOVA ROTA
        element: <ComponentShowcase />,
      },
      {
        path: '/teste', // 🧪 NOVA ROTA DE TESTE
        element: <TestePage />,
      },
      {
        path: ROUTES.LOGIN,
        element: <LoginPage />,
      },
      {
        path: ROUTES.SIGNUP,
        element: <SignUpPage />,
      },
      {
        path: ROUTES.PASSWORD_RESET,
        element: <PasswordResetPage />,
      },
    ],
  },
  {
    element: <ProtectedLayout />,
    children: [
      {
        path: '/dashboard',
        element: (
          <ProtectedRoute>
            <RoleBasedRedirect />
          </ProtectedRoute>
        ),
      },
      {
        path: '/alunos',
        element: (
          <RoleProtectedRoute allowedRoles={['aluno']}>
            <AlunoDashboard />
          </RoleProtectedRoute>
        ),
      },
      {
        path: '/alunos/conquistas',
        element: (
          <RoleProtectedRoute allowedRoles={['aluno']}>
            <ConquistasPage />
          </RoleProtectedRoute>
        ),
      },
      {
        path: '/alunos/conquistas/:id',
        element: (
          <RoleProtectedRoute allowedRoles={['aluno']}>
            <ConquistaDetailPage />
          </RoleProtectedRoute>
        ),
      },
      {
        path: '/alunos/portfolio',
        element: (
          <RoleProtectedRoute allowedRoles={['aluno']}>
            <PortfolioListPage />
          </RoleProtectedRoute>
        ),
      },
      {
        path: '/alunos/portfolio/criar',
        element: (
          <RoleProtectedRoute allowedRoles={['aluno']}>
            <PortfolioCreatePage />
          </RoleProtectedRoute>
        ),
      },
      {
        path: '/alunos/portfolio/:id',
        element: (
          <RoleProtectedRoute allowedRoles={['aluno']}>
            <PortfolioDetailPage />
          </RoleProtectedRoute>
        ),
      },
      {
        path: '/alunos/desafios',
        element: (
          <RoleProtectedRoute allowedRoles={['aluno']}>
            <DesafiosListPage />
          </RoleProtectedRoute>
        ),
      },
      {
        path: '/alunos/desafios/:id',
        element: (
          <RoleProtectedRoute allowedRoles={['aluno']}>
            <DesafioDetailPage />
          </RoleProtectedRoute>
        ),
      },
      {
        path: '/alunos/instrumentos',
        element: (
          <RoleProtectedRoute allowedRoles={['aluno']}>
            <InstrumentosPage />
          </RoleProtectedRoute>
        ),
      },
      {
        path: '/alunos/instrumentos/:id',
        element: (
          <RoleProtectedRoute allowedRoles={['aluno']}>
            <InstrumentoDetailPage />
          </RoleProtectedRoute>
        ),
      },
      {
        path: '/alunos/aulas',
        element: (
          <RoleProtectedRoute allowedRoles={['aluno']}>
            <MinhasAulasPage />
          </RoleProtectedRoute>
        ),
      },
      {
        path: '/alunos/progresso',
        element: (
          <RoleProtectedRoute allowedRoles={['aluno']}>
            <ProgressoPage />
          </RoleProtectedRoute>
        ),
      },
      {
        path: '/alunos/perfil',
        element: (
          <RoleProtectedRoute allowedRoles={['aluno']}>
            <PerfilPage />
          </RoleProtectedRoute>
        ),
      },
      {
        path: '/professores',
        element: (
          <RoleProtectedRoute allowedRoles={['professor']}>
            <ProfessorDashboard />
          </RoleProtectedRoute>
        ),
      },
      {
        path: '/admin',
        element: (
          <RoleProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </RoleProtectedRoute>
        ),
      },
      {
        path: '/admin/database',
        element: (
          <RoleProtectedRoute allowedRoles={['admin']}>
            <DatabaseAdminPage />
          </RoleProtectedRoute>
        ),
      },
      {
        path: '/admin/diagnostic',
        element: (
          <RoleProtectedRoute allowedRoles={['admin']}>
            <SystemDiagnosticPage />
          </RoleProtectedRoute>
        ),
      },
      {
        path: '/debug/auth',
        element: <DebugAuthPage />,
      },
      {
        path: '/instrumentos',
        element: <InstrumentosPage />,
      },
      {
        path: '/system',
        element: <SystemDashboardPage />,
      },
      {
        path: '/configuracoes',
        element: (
          <ProtectedRoute>
            <ConfiguracoesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/notificacoes',
        element: (
          <ProtectedRoute>
            <NotificacoesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/ajuda',
        element: (
          <ProtectedRoute>
            <AjudaPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])

export default router
