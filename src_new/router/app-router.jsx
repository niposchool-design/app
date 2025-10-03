import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// ✅ LAZY LOADING - Import das páginas otimizadas
import { 
  StructureBridgeLazy,
  NavigationTestLazy,
  TestAdminDashboardLazy,
  PerformanceDashboardLazy,
  PageLoadingFallback
} from '@new/pages/lazy-pages';

// 🔐 Import das páginas de autenticação (real)
import RealLoginForm from '@new/pages/real-login';
import RealRegisterForm from '@new/pages/real-register';

// 🏠 Import das páginas públicas (temporariamente comentadas)
// import LandingPage from '@/pages/LandingPage';
// import SmartDashboard from '@/pages/SmartDashboard';

// 🎯 Import dos módulos de rotas legacy (temporariamente removidos)
// import AlunosRoutes from '@/app/router/AlunosRoutes';
// import ProfessoresRoutes from '@/app/router/ProfessoresRoutes';
// import AdminRoutes from '@/app/router/AdminRoutes';

// ✅ NOVA ESTRUTURA - ProtectedRoute 
import { ProtectedRoute } from '@new/components/auth/protected-route';

// ✅ Hook de autenticação nova estrutura
import { useAuth } from '@new/contexts/real-auth-context';

/**
 * NewAdminRoutes - Rotas da nova estrutura administrativa com lazy loading
 * Localização: src_new/router/new-admin-routes.jsx
 */
const NewAdminRoutes = () => {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Suspense fallback={<PageLoadingFallback />}>
      <Routes>
        {/* Dashboard principal */}
        <Route index element={<div className="p-6">Dashboard Admin - Em Construção</div>} />
        
        {/* Gestão de usuários */}
        <Route path="students" element={<AdminStudentsLazy />} />
        <Route path="teachers" element={<AdminTeachersLazy />} />
        
        {/* Gestão de conteúdo */}
        <Route path="instruments" element={<AdminInstrumentsLazy />} />
        <Route path="curriculum" element={<AdminCurriculumLazy />} />
        
        {/* Página de teste */}
        <Route path="test" element={<TestAdminDashboardLazy />} />
        
        {/* Fallback para estrutura legacy */}
        <Route path="*" element={<Navigate to="/admin-legacy" replace />} />
      </Routes>
    </Suspense>
  );
};

/**
 * AppRouterNew - Router integrado que suporta nova e antiga estrutura
 * Migrado de: src/app/router/AppRouter.jsx
 * Nova localização: src_new/router/app-router.jsx
 */
const AppRouterNew = () => {
  return (
    <Routes>
      {/* ===== ROTAS PÚBLICAS ===== */}
      <Route path="/" element={<div className="p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">🎵 Nipo School</h1>
        <p className="mb-4">Sistema Oriental de Ensino Musical</p>
        <div className="space-x-4">
          <a href="/login" className="bg-red-600 text-white px-4 py-2 rounded">Login</a>
          <a href="/register" className="bg-blue-600 text-white px-4 py-2 rounded">Cadastrar</a>
        </div>
      </div>} />
      <Route path="/login" element={<RealLoginForm />} />
      <Route path="/register" element={<RealRegisterForm />} />
      
      {/* ===== DASHBOARD PRINCIPAL ===== */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <div className="p-6 text-center">
              <h2 className="text-xl font-bold mb-4">Dashboard Principal</h2>
              <p>Dashboard inteligente - Em construção na nova estrutura</p>
            </div>
          </ProtectedRoute>
        } 
      />

      {/* ===== PÁGINA DE INTEGRAÇÃO ===== */}
      <Route 
        path="/bridge" 
        element={
          <ProtectedRoute>
            <Suspense fallback={<PageLoadingFallback />}>
              <StructureBridgeLazy />
            </Suspense>
          </ProtectedRoute>
        } 
      />

      {/* ===== NOVA ESTRUTURA - ADMIN ===== */}
      <Route 
        path="/admin-new/*" 
        element={
          <ProtectedRoute>
            <NewAdminRoutes />
          </ProtectedRoute>
        } 
      />

      {/* ===== DASHBOARD DE PERFORMANCE ===== */}
      <Route 
        path="/performance" 
        element={
          <ProtectedRoute>
            <Suspense fallback={<PageLoadingFallback />}>
              <PerformanceDashboardLazy />
            </Suspense>
          </ProtectedRoute>
        } 
      />

      {/* ===== ESTRUTURA LEGACY (TEMPORARIAMENTE DESABILITADA) ===== */}
      {/* <Route path="/alunos/*" element={<AlunosRoutes />} />
      <Route path="/professores/*" element={<ProfessoresRoutes />} />
      <Route path="/admin-legacy/*" element={<AdminRoutes />} /> */}
      
      {/* Rotas temporárias para migração */}
      <Route path="/alunos/*" element={<div className="p-6 text-center">
        <h2 className="text-xl font-bold mb-4">Área dos Alunos</h2>
        <p>Em migração para nova estrutura</p>
      </div>} />
      
      <Route path="/professores/*" element={<div className="p-6 text-center">
        <h2 className="text-xl font-bold mb-4">Área dos Professores</h2>
        <p>Em migração para nova estrutura</p>
      </div>} />
      
      <Route path="/admin-legacy/*" element={<div className="p-6 text-center">
        <h2 className="text-xl font-bold mb-4">Admin Legacy</h2>
        <p>Em migração para nova estrutura</p>
      </div>} />
      
      {/* Redirect para manter compatibilidade */}
      <Route path="/admin/*" element={<Navigate to="/admin-new" replace />} />

      {/* ===== PÁGINAS DE TESTE NOVA ESTRUTURA ===== */}
      <Route 
        path="/test-new" 
        element={
          <ProtectedRoute>
            <Suspense fallback={<PageLoadingFallback />}>
              <TestAdminDashboardLazy />
            </Suspense>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/navigation-test" 
        element={
          <ProtectedRoute>
            <Suspense fallback={<PageLoadingFallback />}>
              <NavigationTestLazy />
            </Suspense>
          </ProtectedRoute>
        } 
      />

      {/* ===== 404 ===== */}
      <Route 
        path="*" 
        element={
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
              <p className="text-gray-600 mb-6">Página não encontrada</p>
              <div className="space-y-2">
                <button 
                  onClick={() => window.history.back()} 
                  className="block w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Voltar
                </button>
                <button 
                  onClick={() => window.location.href = '/admin-new'} 
                  className="block w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Nova Estrutura Admin
                </button>
              </div>
            </div>
          </div>
        } 
      />
    </Routes>
  );
};

export default AppRouterNew;