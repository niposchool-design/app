import React from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { ROUTES } from '../lib/constants/routes'
import { useAuth } from '../contexts/AuthContext'

// Layouts
import { PublicLayout } from '../components/layout/PublicLayout'
import { ProtectedLayout } from '../components/layout/ProtectedLayout'

// Public Pages
import LandingPage from '../features/shared/pages/LandingPage'
import NavigationPage from '../features/shared/pages/NavigationPage'
import { NotFoundPage } from '../features/shared/pages/NotFoundPage'
import ComponentShowcase from '../features/shared/pages/ComponentShowcase' // 🎌 NOVO

// Auth Pages
import { LoginPage } from '../features/shared/pages/auth/LoginPage'
import { SignUpPage } from '../features/shared/pages/auth/SignUpPage'
import { PasswordResetPage } from '../features/shared/pages/auth/PasswordResetPage'
import { VerifyEmailPage } from '../features/auth/pages/VerifyEmailPage'
import { RoleBasedRedirect } from '../components/auth/RoleBasedRedirect'
import { RoleProtectedRoute } from '../components/auth/RoleProtectedRoute' // 🛡️ NOVO

// Admin Pages
import DatabaseAdminPage from '../features/admin/pages/DatabaseAdminPage'
import SystemDiagnosticPage from '../features/admin/pages/SystemDiagnosticPage'
import DebugAuthPage from '../features/shared/pages/debug/DebugAuthPage'
import DebugRolePage from '../features/shared/pages/debug/DebugRolePage' // 🔍 NOVO - Debug Role
import { AulasKanbanPage } from '../features/admin/pages/AulasKanbanPage' // 📋 Kanban de Aulas
import { AulasListPage } from '../features/admin/pages/AulasListPage' // 📚 Lista de Aulas
import { AulaDetailPage } from '../features/admin/pages/AulaDetailPage' // 👁️ Detalhes da Aula
import { AulaEditPage } from '../features/admin/pages/AulaEditPage' // ✏️ Editar Aula
import { ProfessoresListPage } from '../features/admin/pages/ProfessoresListPage' // 👨‍🏫 Professores
import { AlunosListPage } from '../features/admin/pages/AlunosListPage' // 🎓 Alunos

// Instrumentos Pages
import InstrumentosPage from '../features/shared/pages/instrumentos/InstrumentosPage'

// História da Música Pages
import HistoriaMusicaHome from '../features/historia-musica/pages/HistoriaMusicaHome'

// Dashboard Pages
import SystemDashboardPage from '../features/shared/pages/dashboard/SystemDashboardPage'

// Dashboards
import { AlunoDashboard } from '../features/alunos/pages/AlunoDashboard'
import { ProfessorDashboard } from '../features/professores/pages/ProfessorDashboard'
import { AdminDashboard } from '../features/admin/pages/AdminDashboard'

// Páginas de Professor
import ConteudosPage from '../features/professores/pages/ConteudosPage'
import NovoConteudoPage from '../features/professores/pages/NovoConteudoPage'
import TurmasPage from '../features/professores/pages/TurmasPage'
import AvaliacoesPage from '../features/professores/pages/AvaliacoesPage'
import { ConteudoDetailPage } from '../features/professores/pages/ConteudoDetailPage' // 👁️ Detalhes Conteúdo
import { EstatisticasPage } from '../features/professores/pages/EstatisticasPage' // 📊 Estatísticas

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
import { ScannerPage } from '../features/shared/pages/ScannerPage' // 📱 NOVA - Scanner QR
import { ScannerPublicoPage } from '../features/shared/pages/ScannerPublicoPage' // 📱 Scanner Público
import { VotePage } from '../features/shared/pages/VotePage' // 🗳️ Sistema de Votação
import { QRManagerPage } from '../features/admin/pages/QRManagerPage' // 🎯 Admin QR Manager
import { QRDisplayPage } from '../features/admin/pages/QRDisplayPage' // 📺 QR Display

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
  // Landing Page SEM Layout (sem Navbar/Footer)
  {
    path: ROUTES.HOME,
    element: <LandingPage />,
  },
  // Login e Signup SEM Layout (sem Navbar/Footer) - Com portal Torii
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
  },
  {
    path: ROUTES.SIGNUP,
    element: <SignUpPage />,
  },
  {
    element: <PublicLayout />,
    children: [
      {
        path: '/verify-email', // 📧 Verificação de email
        element: <VerifyEmailPage />,
      },
      {
        path: '/confirmacao', // Redirect para verify-email
        element: <Navigate to="/verify-email" replace />,
      },
      {
        path: '/confirm-email', // Redirect para verify-email
        element: <Navigate to="/verify-email" replace />,
      },
      {
        path: '/nav', // Movido para outra rota
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
        path: '/debug/auth', // 🔍 Debug de autenticação
        element: <DebugAuthPage />,
      },
      {
        path: '/debug/role', // 🔍 Debug de role (público para facilitar acesso)
        element: <DebugRolePage />,
      },
      {
        path: ROUTES.PASSWORD_RESET,
        element: <PasswordResetPage />,
      },
      {
        path: '/scanner', // 📱 Scanner QR protegido (todos os usuários logados)
        element: (
          <RoleProtectedRoute allowedRoles={['aluno', 'professor', 'admin']}>
            <ScannerPage />
          </RoleProtectedRoute>
        ),
      },
      {
        path: '/scanner-publico', // 📱 Scanner público (sem login)
        element: <ScannerPublicoPage />,
      },
      {
        path: '/vote', // 🗳️ Sistema de Votação (apenas alunos)
        element: (
          <RoleProtectedRoute allowedRoles={['aluno']}>
            <VotePage />
          </RoleProtectedRoute>
        ),
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
        path: '/professores/conteudos',
        element: (
          <RoleProtectedRoute allowedRoles={['professor']}>
            <ConteudosPage />
          </RoleProtectedRoute>
        ),
      },
      {
        path: '/professores/novo',
        element: (
          <RoleProtectedRoute allowedRoles={['professor']}>
            <NovoConteudoPage />
          </RoleProtectedRoute>
        ),
      },
      {
        path: '/professores/turmas',
        element: (
          <RoleProtectedRoute allowedRoles={['professor']}>
            <TurmasPage />
          </RoleProtectedRoute>
        ),
      },
      {
        path: '/professores/avaliacoes',
        element: (
          <RoleProtectedRoute allowedRoles={['professor']}>
            <AvaliacoesPage />
          </RoleProtectedRoute>
        ),
      },
      {
        path: '/professores/conteudos/:id', // 👁️ Detalhes do Conteúdo
        element: (
          <RoleProtectedRoute allowedRoles={['professor']}>
            <ConteudoDetailPage />
          </RoleProtectedRoute>
        ),
      },
      {
        path: '/professores/estatisticas', // 📊 Estatísticas do Professor
        element: (
          <RoleProtectedRoute allowedRoles={['professor']}>
            <EstatisticasPage />
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
        path: '/admin/qr-manager', // 🎯 Gerenciador de QR Codes
        element: (
          <RoleProtectedRoute allowedRoles={['admin']}>
            <QRManagerPage />
          </RoleProtectedRoute>
        ),
      },
      {
        path: '/admin/qr-display/:aulaId', // 📺 Exibição QR em tela cheia
        element: (
          <RoleProtectedRoute allowedRoles={['admin']}>
            <QRDisplayPage />
          </RoleProtectedRoute>
        ),
      },
      {
        path: '/admin/aulas/kanban', // 📊 Kanban de Aulas
        element: (
          <RoleProtectedRoute allowedRoles={['admin']}>
            <AulasKanbanPage />
          </RoleProtectedRoute>
        ),
      },
      {
        path: '/admin/aulas', // 📚 Lista de Aulas
        element: (
          <RoleProtectedRoute allowedRoles={['admin']}>
            <AulasListPage />
          </RoleProtectedRoute>
        ),
      },
      {
        path: '/admin/aulas/:id', // 👁️ Detalhes da Aula
        element: (
          <RoleProtectedRoute allowedRoles={['admin']}>
            <AulaDetailPage />
          </RoleProtectedRoute>
        ),
      },
      {
        path: '/admin/aulas/editar/:id', // ✏️ Editar Aula
        element: (
          <RoleProtectedRoute allowedRoles={['admin']}>
            <AulaEditPage />
          </RoleProtectedRoute>
        ),
      },
      {
        path: '/admin/professores', // 👨‍🏫 Gestão de Professores
        element: (
          <RoleProtectedRoute allowedRoles={['admin']}>
            <ProfessoresListPage />
          </RoleProtectedRoute>
        ),
      },
      {
        path: '/admin/alunos', // 🎓 Gestão de Alunos
        element: (
          <RoleProtectedRoute allowedRoles={['admin']}>
            <AlunosListPage />
          </RoleProtectedRoute>
        ),
      },
      {
        path: '/instrumentos',
        element: <InstrumentosPage />,
      },
      {
        path: '/historia-musica',
        element: (
          <RoleProtectedRoute allowedRoles={['aluno', 'professor', 'admin']}>
            <HistoriaMusicaHome />
          </RoleProtectedRoute>
        ),
      },
      {
        path: '/system',
        element: <SystemDashboardPage />,
      },
      {
        path: '/configuracoes',
        element: (
          <RoleProtectedRoute allowedRoles={['aluno', 'professor', 'admin']}>
            <ConfiguracoesPage />
          </RoleProtectedRoute>
        ),
      },
      {
        path: '/notificacoes',
        element: (
          <RoleProtectedRoute allowedRoles={['aluno', 'professor', 'admin']}>
            <NotificacoesPage />
          </RoleProtectedRoute>
        ),
      },
      {
        path: '/ajuda',
        element: (
          <RoleProtectedRoute allowedRoles={['aluno', 'professor', 'admin']}>
            <AjudaPage />
          </RoleProtectedRoute>
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
