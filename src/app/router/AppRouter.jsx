import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/shared/contexts/AuthContext';

// 🏠 Import da Landing Page
import LandingPage from '@/pages/LandingPage';

// 🎯 Import do Dashboard Inteligente
import SmartDashboard from '@/pages/SmartDashboard';

// Import das páginas de autenticação
import Login from '@/features/auth/pages/Login';
import Register from '@/features/auth/pages/Register';
import ConfirmEmail from '@/features/auth/components/ConfirmEmail';
import Vote from '@/features/auth/pages/Vote';

// 🎯 Import das páginas dos professores
import ProfessoresAdminPanel from '@/features/admin/pages/AdminDashboard';
import ProfessoresLayout from '@/features/professores/pages/ProfessoresLayout';
import ProfessoresDashboard from '@/features/professores/pages/ProfessoresDashboard';
import ProfessoresConteudos from '@/features/professores/pages/ProfessoresConteudos';
import ProfessoresMinhaArea from '@/features/professores/pages/ProfessoresMinhaArea';
import ProfessoresEstatisticas from '@/features/professores/pages/ProfessoresEstatisticas';
import ConteudoDetalhes from '@/features/professores/pages/ConteudoDetalhes';
import FormConteudo from '@/features/professores/components/FormConteudo';

// 👥 Import das páginas de admin
import AdminAlunos from '@/features/admin/pages/AdminAlunos';
import AdminAlunoDetalhe from '@/features/admin/pages/AdminAlunoDetalhe';
import AdminProfessores from '@/features/admin/pages/AdminProfessores';
import AdminProfessorDetalhe from '@/features/admin/pages/AdminProfessorDetalhe';
import AdminDevocionais from '@/features/admin/pages/AdminDevocionais';
import AdminInstruments from '@/features/admin/pages/AdminInstruments';
import AdminInstrumentView from '@/features/admin/pages/AdminInstrumentView';
import Kanban from '@/features/admin/pages/Kanban';
import AulaDetail from '@/features/admin/pages/AulaDetail';

// 📚 Import das páginas de conteúdo
import ModulosPage from '@/features/modulos/pages/ModulosPage';
import ConquistasPage from '@/features/conquistas/pages/ConquistasPage';
import DevocionalPage from '@/features/devocional/pages/DevocionalPage';

// 🎵 Import das páginas de instrumentos
import InstrumentosLayout from '@/features/instrumentos/pages/InstrumentosLayout';
import InstrumentosList from '@/features/instrumentos/pages/InstrumentosList';
import InstrumentoPagina from '@/features/instrumentos/pages/InstrumentoPagina';

// 📱 Import do Scanner QR
import { QRScannerPage } from '@/features/alunos/pages/QRScannerPage';

// 🧪 Import para debug/teste
import TestDevotionalQuery from '@/components/debug/TestDevotionalQuery';

// 👨‍🎓 Import das páginas dos alunos
import AlunoDashboard from '@/features/alunos/pages/AlunoDashboard';
import BibliotecaInstrumentos from '@/features/alunos/pages/BibliotecaInstrumentos';
import BibliotecaRepertorio from '@/features/alunos/pages/BibliotecaRepertorio';
import BibliotecaVideos from '@/features/alunos/pages/BibliotecaVideos';
import CentroEstudos from '@/features/alunos/pages/CentroEstudos';
import DetalheInstrumento from '@/features/alunos/pages/DetalheInstrumento';
import MetodologiasEnsino from '@/features/alunos/pages/MetodologiasEnsino';
import MeuInstrumento from '@/features/alunos/pages/MeuInstrumento';
import NovaPergunta from '@/features/alunos/pages/NovaPergunta';
import ProgressoAluno from '@/features/alunos/pages/ProgressoAluno';
import SistemaDuvidas from '@/features/alunos/pages/SistemaDuvidas';

// Componente de rota protegida
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }
  
  return user ? children : <Navigate to="/login" replace />;
};

// Componente de rota apenas para professores
const ProfessorRoute = ({ children }) => {
  const { userProfile, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }
  
  if (!userProfile || (userProfile.user_type !== 'professor' && userProfile.user_type !== 'admin')) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

// Componente principal do roteador
const AppRouter = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Rota inicial - redireciona baseado no estado de autenticação */}
      <Route 
        path="/" 
        element={user ? <Navigate to="/dashboard" replace /> : <LandingPage />} 
      />
      
      {/* Rotas públicas de autenticação */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/confirm-email" element={<ConfirmEmail />} />
      <Route path="/vote" element={<Vote />} />
      
      {/* Dashboard inteligente que redireciona por tipo de usuário */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <SmartDashboard />
          </ProtectedRoute>
        } 
      />

      {/* Rota principal dos admins */}
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute>
            <ProfessoresAdminPanel />
          </ProtectedRoute>
        } 
      />

      {/* Rotas dos professores */}
      <Route 
        path="/professores" 
        element={
          <ProfessorRoute>
            <ProfessoresLayout />
          </ProfessorRoute>
        }
      >
        <Route index element={<ProfessoresDashboard />} />
        <Route path="conteudos" element={<ProfessoresConteudos />} />
        <Route path="conteudos/:id" element={<ConteudoDetalhes />} />
        <Route path="novo" element={<FormConteudo />} />
        <Route path="editar/:id" element={<FormConteudo />} />
        <Route path="minha-area" element={<ProfessoresMinhaArea />} />
        <Route path="admin" element={<ProfessoresAdminPanel />} />
        <Route path="admin/instruments" element={<AdminInstruments />} />
        <Route path="admin/instruments/view/:instrumentId" element={<AdminInstrumentView />} />
        <Route path="admin/alunos" element={<AdminAlunos />} />
        <Route path="admin/professores" element={<AdminProfessores />} />
        <Route path="admin/devocionais" element={<AdminDevocionais />} />
        <Route path="admin/kanban" element={<Kanban />} />
        <Route path="admin/aulas/:id" element={<AulaDetail />} />
        <Route path="estatisticas" element={<ProfessoresEstatisticas />} />
        <Route path="categoria/:categoriaId" element={<ProfessoresConteudos />} />
        <Route path="tipo/:tipo" element={<ProfessoresConteudos />} />
      </Route>

      {/* Rota principal dos alunos */}
      <Route 
        path="/alunos" 
        element={
          <ProtectedRoute>
            <AlunoDashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<AlunoDashboard />} />
        <Route path="biblioteca/instrumentos" element={<BibliotecaInstrumentos />} />
        <Route path="biblioteca/repertorio" element={<BibliotecaRepertorio />} />
        <Route path="biblioteca/videos" element={<BibliotecaVideos />} />
        <Route path="centro-estudos" element={<CentroEstudos />} />
        <Route path="instrumento/:id" element={<DetalheInstrumento />} />
        <Route path="metodologias-ensino" element={<MetodologiasEnsino />} />
        <Route path="meu-instrumento" element={<MeuInstrumento />} />
        <Route path="progresso" element={<ProgressoAluno />} />
        <Route path="duvidas" element={<SistemaDuvidas />} />
        <Route path="duvidas/nova" element={<NovaPergunta />} />
      </Route>

      {/* Rotas diretas de admin */}
      <Route 
        path="/admin/alunos/:id" 
        element={
          <ProtectedRoute>
            <AdminAlunoDetalhe />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/admin/professores/:id" 
        element={
          <ProtectedRoute>
            <AdminProfessorDetalhe />
          </ProtectedRoute>
        } 
      />

      {/* Rotas dos alunos */}
      <Route 
        path="/modulos" 
        element={
          <ProtectedRoute>
            <ModulosPage />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/conquistas" 
        element={
          <ProtectedRoute>
            <ConquistasPage />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/devocional" 
        element={
          <ProtectedRoute>
            <DevocionalPage />
          </ProtectedRoute>
        } 
      />

      {/* Rotas diretas dos alunos (alternativas) */}
      <Route 
        path="/meu-instrumento" 
        element={
          <ProtectedRoute>
            <MeuInstrumento />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/biblioteca-instrumentos" 
        element={
          <ProtectedRoute>
            <BibliotecaInstrumentos />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/biblioteca-videos" 
        element={
          <ProtectedRoute>
            <BibliotecaVideos />
          </ProtectedRoute>
        } 
      />

      {/* Rotas de instrumentos */}
      <Route 
        path="/instrumentos" 
        element={
          <ProtectedRoute>
            <InstrumentosLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<InstrumentosList />} />
        <Route path=":instrumentId" element={<InstrumentoPagina />} />
      </Route>

      {/* Scanner QR */}
      <Route 
        path="/scanner" 
        element={
          <ProtectedRoute>
            <QRScannerPage />
          </ProtectedRoute>
        } 
      />

      {/* 🧪 Teste Debug (temporário) */}
      <Route 
        path="/test-devotional" 
        element={
          <ProtectedRoute>
            <TestDevotionalQuery />
          </ProtectedRoute>
        } 
      />

      {/* Rota catch-all */}
      <Route 
        path="*" 
        element={
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
              <p className="text-gray-600 mb-6">Página não encontrada</p>
              <button 
                onClick={() => window.history.back()} 
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Voltar
              </button>
            </div>
          </div>
        } 
      />
    </Routes>
  );
};

export default AppRouter;