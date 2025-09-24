import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/shared/contexts/AuthContext';

// 🏠 Import da Landing Page
import LandingPage from '@/pages/LandingPage';

// 🎯 Import do Dashboard Inteligente que redireciona por tipo de usuário
import SmartDashboard from '@/pages/SmartDashboard';

// Import das páginas existentes
import Dashboard from '@/pages/Dashboard';
import Login from '@/features/auth/pages/Login';
import Register from '@/features/auth/pages/Register';
import ConfirmEmail from '@/features/auth/components/ConfirmEmail';
import Vote from '@/features/auth/pages/Vote';

// 🎯 Import das páginas dos professores - MÓDULO COMPLETO
import ProfessoresLayout from '@/features/professores/pages/ProfessoresLayout';
import ProfessoresDashboard from '@/features/professores/pages/ProfessoresDashboard';
import ProfessoresConteudos from '@/features/professores/pages/ProfessoresConteudos';
import ProfessoresMinhaArea from '@/features/professores/pages/ProfessoresMinhaArea';
import ProfessoresEstatisticas from '@/features/professores/pages/ProfessoresEstatisticas';
import ProfessoresAdminPanel from '@/features/admin/pages/AdminDashboard';
import ConteudoDetalhes from '@/features/professores/pages/ConteudoDetalhes';
import FormConteudo from '@/features/professores/components/FormConteudo';

// 🎵 Import das páginas de instrumentos - NOVO MÓDULO
import InstrumentosLayout from '@/features/instrumentos/pages/InstrumentosLayout';
import InstrumentosList from '@/features/instrumentos/pages/InstrumentosList';
import InstrumentoPagina from '@/features/instrumentos/pages/InstrumentoPagina';

// 🆕 Import das páginas de ADMIN DE INSTRUMENTOS - NOVOS
import AdminInstruments from '@/features/admin/pages/AdminInstruments';
import AdminInstrumentDetails from '@/features/admin/pages/AdminInstrumentDetails';

// 🎓 Import das páginas dos alunos
import DetalheInstrumento from '@/features/alunos/instrumentos/pages/DetalheInstrumento';
import AlunoDashboard from '@/features/alunos/pages/AlunoDashboard';
import BibliotecaInstrumentos from '@/features/alunos/pages/BibliotecaInstrumentos';
import BibliotecaRepertorio from '@/features/alunos/pages/BibliotecaRepertorio';
import BibliotecaVideos from '@/features/alunos/pages/BibliotecaVideos';
import CentroEstudos from '@/features/alunos/pages/CentroEstudos';
import MetodologiasEnsino from '@/features/alunos/pages/MetodologiasEnsino';
import MeuInstrumento from '@/features/alunos/pages/MeuInstrumento';
import ProgressoAluno from '@/features/alunos/pages/ProgressoAluno';
import SistemaDuvidas from '@/features/alunos/pages/SistemaDuvidas';
import NovaPergunta from '@/features/alunos/pages/NovaPergunta';

// � Import do Scanner QR
import { QRScannerPage } from '@/features/alunos/pages/QRScannerPage';

// �📋 Import das páginas do Kanban Admin - NOVO MÓDULO
import Kanban from '@/features/admin/pages/Kanban';
import AulaDetail from '@/features/admin/pages/AulaDetail';

// Componente de Loading
const LoadingScreen = () => (
  <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 bg-red-500 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
        <span className="text-white text-2xl">🎵</span>
      </div>
      <p className="text-gray-600">Carregando Nipo School...</p>
    </div>
  </div>
);

// Componente de Proteção de Rota
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <LoadingScreen />;
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// 🎯 Componente de Proteção para Professores - ATUALIZADO
const ProfessorRoute = ({ children }) => {
  const { user, userProfile, loading } = useAuth();
  
  if (loading) return <LoadingScreen />;
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Verificar se é professor, pastor ou admin
  if (!userProfile || !['professor', 'pastor', 'admin'].includes(userProfile.tipo_usuario)) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

// 🔴 Componente de Proteção para Admins - NOVO
const AdminRoute = ({ children }) => {
  const { user, userProfile, loading } = useAuth();
  
  if (loading) return <LoadingScreen />;
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Verificar se é admin
  if (!userProfile || userProfile.tipo_usuario !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

// Componente de Rota para Landing (pública, mas não redireciona)
const LandingRoute = ({ children }) => {
  const { loading } = useAuth();
  
  if (loading) return <LoadingScreen />;
  
  return children;
};

// Componente de Rota Pública (redireciona se logado)
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <LoadingScreen />;
  
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

const AppRouter = () => {
  return (
    <Routes>
      {/* 🏠 Landing Page - Rota inicial */}
      <Route 
        path="/" 
        element={
          <LandingRoute>
            <LandingPage />
          </LandingRoute>
        } 
      />
      
      {/* Rotas públicas (só acessíveis se não logado) */}
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } 
      />
      
      <Route 
        path="/register" 
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } 
      />
      
      {/* 🎯 DASHBOARD INTELIGENTE - Redireciona automaticamente baseado no tipo de usuário */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <SmartDashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* 📊 Dashboard genérico (mantido para casos específicos) */}
      <Route 
        path="/dashboard/generic" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/vote" 
        element={
          <ProtectedRoute>
            <Vote />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/confirm-email" 
        element={<ConfirmEmail />} 
      />

      <Route 
        path="/confirmacao" 
        element={
          <PublicRoute>
            <ConfirmEmail />
          </PublicRoute>
        }
      />

      {/* ==========================================
          🎵 ÁREA DOS INSTRUMENTOS - NOVO MÓDULO
          ========================================== */}
      <Route 
        path="/instrumentos" 
        element={
          <ProtectedRoute>
            <InstrumentosLayout />
          </ProtectedRoute>
        }
      >
        {/* Lista de todos os instrumentos */}
        <Route index element={<InstrumentosList />} />
        
        {/* Página específica do instrumento */}
        <Route path=":instrumentoId" element={<InstrumentoPagina />} />
        
        {/* Filtros por categoria (futuro) */}
        <Route path="categoria/:categoria" element={<InstrumentosList />} />
      </Route>

      {/* ==========================================
          🎯 ÁREA DOS PROFESSORES - MÓDULO COMPLETO
          ========================================== */}
      <Route 
        path="/professores" 
        element={
          <ProfessorRoute>
            <ProfessoresLayout />
          </ProfessorRoute>
        }
      >
        {/* Dashboard dos professores */}
        <Route index element={<ProfessoresDashboard />} />
        
        {/* Lista de todos os conteúdos */}
        <Route path="conteudos" element={<ProfessoresConteudos />} />
        
        {/* Visualizar conteúdo específico */}
        <Route path="conteudos/:id" element={<ConteudoDetalhes />} />
        
        {/* Criar novo conteúdo */}
        <Route path="novo" element={<FormConteudo />} />
        
        {/* Editar conteúdo específico */}
        <Route path="editar/:id" element={<FormConteudo />} />
        
        {/* Área pessoal do professor */}
        <Route path="minha-area" element={<ProfessoresMinhaArea />} />
        
        {/* Painel Administrativo (apenas para admins) */}
        <Route path="admin" element={<ProfessoresAdminPanel />} />
        
        {/* 🆕 GESTÃO DE INSTRUMENTOS (ADMIN) - NOVAS ROTAS */}
        <Route path="admin/instruments" element={<AdminInstruments />} />
        <Route path="admin/instruments/:instrumentoId" element={<AdminInstrumentDetails />} />
        
        {/* 📋 KANBAN ADMIN - ROTAS INTEGRADAS */}
        <Route path="admin/kanban" element={<Kanban />} />
        <Route path="admin/aulas/:id" element={<AulaDetail />} />
        
        {/* Estatísticas e analytics */}
        <Route path="estatisticas" element={<ProfessoresEstatisticas />} />
        
        {/* Filtros por categoria */}
        <Route path="categoria/:categoriaId" element={<ProfessoresConteudos />} />
        
        {/* Filtros por tipo */}
        <Route path="tipo/:tipo" element={<ProfessoresConteudos />} />
      </Route>

      {/* Outras rotas protegidas existentes */}
      <Route 
        path="/modulos" 
        element={
          <ProtectedRoute>
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">📚 Módulos</h1>
                <p className="text-gray-600">Em desenvolvimento...</p>
              </div>
            </div>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/conquistas" 
        element={
          <ProtectedRoute>
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">🏆 Conquistas</h1>
                <p className="text-gray-600">Em desenvolvimento...</p>
              </div>
            </div>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/devocional" 
        element={
          <ProtectedRoute>
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">📖 Devocional</h1>
                <p className="text-gray-600">Em desenvolvimento...</p>
              </div>
            </div>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/perfil" 
        element={
          <ProtectedRoute>
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">👤 Perfil</h1>
                <p className="text-gray-600">Em desenvolvimento...</p>
              </div>
            </div>
          </ProtectedRoute>
        } 
      />
      
      {/* 🎓 Rotas específicas para alunos */}
      <Route 
        path="/alunos" 
        element={
          <ProtectedRoute>
            <AlunoDashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/alunos/dashboard" 
        element={
          <ProtectedRoute>
            <AlunoDashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/alunos/biblioteca-instrumentos" 
        element={
          <ProtectedRoute>
            <BibliotecaInstrumentos />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/alunos/biblioteca-repertorio" 
        element={
          <ProtectedRoute>
            <BibliotecaRepertorio />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/alunos/biblioteca-videos" 
        element={
          <ProtectedRoute>
            <BibliotecaVideos />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/alunos/centro-estudos" 
        element={
          <ProtectedRoute>
            <CentroEstudos />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/alunos/metodologias" 
        element={
          <ProtectedRoute>
            <MetodologiasEnsino />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/alunos/meu-instrumento" 
        element={
          <ProtectedRoute>
            <MeuInstrumento />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/alunos/progresso" 
        element={
          <ProtectedRoute>
            <ProgressoAluno />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/alunos/duvidas" 
        element={
          <ProtectedRoute>
            <SistemaDuvidas />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/alunos/nova-pergunta" 
        element={
          <ProtectedRoute>
            <NovaPergunta />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/alunos/instrumento/:instrumentoId" 
        element={
          <ProtectedRoute>
            <DetalheInstrumento />
          </ProtectedRoute>
        } 
      />
      
      {/* 🆕 NOVAS ROTAS QUE ESTAVAM FALTANDO */}
      
      {/* 📱 Scanner QR Code - COMPONENTE REAL */}
      <Route 
        path="/scanner" 
        element={
          <ProtectedRoute>
            <QRScannerPage />
          </ProtectedRoute>
        } 
      />
      
      {/* Páginas específicas do Centro de Estudos */}
      <Route 
        path="/alunos/teoria-musical" 
        element={
          <ProtectedRoute>
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">🎼 Teoria Musical</h1>
                <p className="text-gray-600">Em desenvolvimento...</p>
              </div>
            </div>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/alunos/repertorio" 
        element={
          <ProtectedRoute>
            <BibliotecaRepertorio />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/alunos/tecnica-vocal" 
        element={
          <ProtectedRoute>
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">🎤 Técnica Vocal</h1>
                <p className="text-gray-600">Em desenvolvimento...</p>
              </div>
            </div>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/alunos/instrumentos" 
        element={
          <ProtectedRoute>
            <BibliotecaInstrumentos />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/alunos/aulas-grupo" 
        element={
          <ProtectedRoute>
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">👥 Aulas em Grupo</h1>
                <p className="text-gray-600">Em desenvolvimento...</p>
              </div>
            </div>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/alunos/biblioteca" 
        element={
          <ProtectedRoute>
            <BibliotecaVideos />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/alunos/agenda" 
        element={
          <ProtectedRoute>
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">📅 Agenda</h1>
                <p className="text-gray-600">Em desenvolvimento...</p>
              </div>
            </div>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/alunos/metas" 
        element={
          <ProtectedRoute>
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">🎯 Metas</h1>
                <p className="text-gray-600">Em desenvolvimento...</p>
              </div>
            </div>
          </ProtectedRoute>
        } 
      />
      
      {/* Metodologias de Ensino */}
      <Route 
        path="/alunos/metodologia/orff" 
        element={
          <ProtectedRoute>
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">🎵 Método Orff</h1>
                <p className="text-gray-600">Em desenvolvimento...</p>
              </div>
            </div>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/alunos/metodologia/suzuki" 
        element={
          <ProtectedRoute>
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">🎻 Método Suzuki</h1>
                <p className="text-gray-600">Em desenvolvimento...</p>
              </div>
            </div>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/alunos/metodologia/musical-futures" 
        element={
          <ProtectedRoute>
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">🚀 Musical Futures</h1>
                <p className="text-gray-600">Em desenvolvimento...</p>
              </div>
            </div>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/alunos/metodologia/kodaly" 
        element={
          <ProtectedRoute>
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">🎶 Método Kodály</h1>
                <p className="text-gray-600">Em desenvolvimento...</p>
              </div>
            </div>
          </ProtectedRoute>
        } 
      />

      {/* 🔴 ROTA ADMIN INDEPENDENTE - Dashboard administrativo */}
      <Route 
        path="/admin" 
        element={
          <AdminRoute>
            <ProfessoresAdminPanel />
          </AdminRoute>
        } 
      />
      
      {/* Rota 404 */}
      <Route 
        path="*" 
        element={
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
              <p className="text-gray-600 mb-4">Página não encontrada</p>
              <button 
                onClick={() => window.history.back()}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
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