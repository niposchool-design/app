/**
 * Router com Estrutura de Áreas Isoladas
 * 
 * Organização:
 * - Rotas públicas (login, signup, landing)
 * - Áreas protegidas por AreaGuard:
 *   - /admin/* - Área administrativa
 *   - /professores/* - Área dos professores
 *   - /alunos/* - Área dos alunos
 */

import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AreaGuard } from '../routes/AreaGuard';

// Layouts específicos por área
import { AdminLayout } from '../areas/admin/layouts/AdminLayout';
import { ProfessorLayout } from '../areas/professores/layouts/ProfessorLayout';
import { AlunoLayout } from '../areas/alunos/layouts/AlunoLayout';

// Auth Pages
import { LoginPage } from '../features/shared/pages/auth/LoginPage';
import LandingPage from '../features/shared/pages/LandingPage';

// Admin Area Pages
import AdminDashboard from '../areas/admin/dashboard/page';
import AdminAulas from '../areas/admin/aulas/page';
import AdminProfessores from '../areas/admin/professores/page';
import AdminAlunos from '../areas/admin/alunos/page';
import AdminQR from '../areas/admin/qr/page';
import AdminAulasLista from '../areas/admin/aulas/lista/page';
import AdminAulaDetalhes from '../areas/admin/aulas/detalhes/page';
import AdminAulaEditar from '../areas/admin/aulas/editar/page';
import AdminQRDisplay from '../areas/admin/qr/display/page';
import AdminDatabase from '../areas/admin/database/page';
import AdminDiagnostic from '../areas/admin/diagnostic/page';

// Professores Area Pages
import ProfessoresDashboard from '../areas/professores/dashboard/page';
import ProfessoresAulas from '../areas/professores/aulas/page';
import ProfessoresAlunos from '../areas/professores/alunos/page';
import ProfessoresConteudoNovo from '../areas/professores/conteudos/novo/page';
import ProfessoresConteudoDetalhes from '../areas/professores/conteudos/detalhes/page';
import ProfessoresAvaliacoes from '../areas/professores/avaliacoes/page';
import ProfessoresEstatisticas from '../areas/professores/estatisticas/page';

// Alunos Area Pages
import AlunosDashboard from '../areas/alunos/dashboard/page';
import AlunosPortfolio from '../areas/alunos/portfolio/page';
import AlunosAulas from '../areas/alunos/aulas/page';
import AlunosPortfolioNovo from '../areas/alunos/portfolio/novo/page';
import AlunosPortfolioDetalhes from '../areas/alunos/portfolio/detalhes/page';
import AlunosConquistas from '../areas/alunos/conquistas/page';
import AlunosConquistaDetalhes from '../areas/alunos/conquistas/detalhes/page';
import AlunosDesafios from '../areas/alunos/desafios/page';
import AlunosDesafioDetalhes from '../areas/alunos/desafios/detalhes/page';
import AlunosInstrumentos from '../areas/alunos/instrumentos/page';
import AlunosProgresso from '../areas/alunos/progresso/page';
import AlunosPerfil from '../areas/alunos/perfil/page';

// Redirect baseado em role
import { RoleBasedRedirect } from '../components/auth/RoleBasedRedirect';

export const router = createBrowserRouter([
  // ========================================
  // ROTAS PÚBLICAS
  // ========================================
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },

  // ========================================
  // REDIRECT BASEADO EM ROLE
  // ========================================
  {
    path: '/dashboard',
    element: <RoleBasedRedirect />,
  },

  // ========================================
  // ÁREA ADMIN (Protegida)
  // ========================================
  {
    path: '/admin',
    element: <AreaGuard allowedRole="admin" />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            path: 'dashboard',
            element: <AdminDashboard />,
          },
          {
            path: 'aulas',
            element: <AdminAulas />,
          },
          {
            path: 'professores',
            element: <AdminProfessores />,
          },
          {
            path: 'alunos',
            element: <AdminAlunos />,
          },
          {
            path: 'qr',
            element: <AdminQR />,
          },
          {
            path: 'aulas/lista',
            element: <AdminAulasLista />,
          },
          {
            path: 'aulas/:id',
            element: <AdminAulaDetalhes />,
          },
          {
            path: 'aulas/:id/edit',
            element: <AdminAulaEditar />,
          },
          {
            path: 'qr/display',
            element: <AdminQRDisplay />,
          },
          {
            path: 'database',
            element: <AdminDatabase />,
          },
          {
            path: 'diagnostic',
            element: <AdminDiagnostic />,
          },
          // Redirect /admin para /admin/dashboard
          {
            index: true,
            element: <Navigate to="/admin/dashboard" replace />,
          },
        ],
      },
    ],
  },

  // ========================================
  // ÁREA PROFESSORES (Protegida)
  // ========================================
  {
    path: '/professores',
    element: <AreaGuard allowedRole="professor" />,
    children: [
      {
        element: <ProfessorLayout />,
        children: [
          {
            path: 'dashboard',
            element: <ProfessoresDashboard />,
          },
          {
            path: 'aulas',
            element: <ProfessoresAulas />,
          },
          {
            path: 'alunos',
            element: <ProfessoresAlunos />,
          },
          {
            path: 'conteudos/novo',
            element: <ProfessoresConteudoNovo />,
          },
          {
            path: 'conteudos/:id',
            element: <ProfessoresConteudoDetalhes />,
          },
          {
            path: 'avaliacoes',
            element: <ProfessoresAvaliacoes />,
          },
          {
            path: 'estatisticas',
            element: <ProfessoresEstatisticas />,
          },
          // Redirect /professores para /professores/dashboard
          {
            index: true,
            element: <Navigate to="/professores/dashboard" replace />,
          },
        ],
      },
    ],
  },

  // ========================================
  // ÁREA ALUNOS (Protegida)
  // ========================================
  {
    path: '/alunos',
    element: <AreaGuard allowedRole="aluno" />,
    children: [
      {
        element: <AlunoLayout />,
        children: [
          {
            path: 'dashboard',
            element: <AlunosDashboard />,
          },
          {
            path: 'portfolio',
            element: <AlunosPortfolio />,
          },
          {
            path: 'aulas',
            element: <AlunosAulas />,
          },
          {
            path: 'portfolio/novo',
            element: <AlunosPortfolioNovo />,
          },
          {
            path: 'portfolio/:id',
            element: <AlunosPortfolioDetalhes />,
          },
          {
            path: 'conquistas',
            element: <AlunosConquistas />,
          },
          {
            path: 'conquistas/:id',
            element: <AlunosConquistaDetalhes />,
          },
          {
            path: 'desafios',
            element: <AlunosDesafios />,
          },
          {
            path: 'desafios/:id',
            element: <AlunosDesafioDetalhes />,
          },
          {
            path: 'instrumentos/:id',
            element: <AlunosInstrumentos />,
          },
          {
            path: 'progresso',
            element: <AlunosProgresso />,
          },
          {
            path: 'perfil',
            element: <AlunosPerfil />,
          },
          // Redirect /alunos para /alunos/dashboard
          {
            index: true,
            element: <Navigate to="/alunos/dashboard" replace />,
          },
        ],
      },
    ],
  },

  // ========================================
  // 404 - PÁGINA NÃO ENCONTRADA
  // ========================================
  {
    path: '*',
    element: (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-gray-600 mb-8">Página não encontrada</p>
          <a href="/" className="text-blue-600 hover:underline">
            Voltar para o início
          </a>
        </div>
      </div>
    ),
  },
]);

export default router;
