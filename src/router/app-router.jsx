import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// ✅ LAZY LOADING - Import das páginas otimizadas
import { 
  PageLoadingFallback
} from '../pages/lazy-pages';

// 🔐 Import das páginas de autenticação (real)
import RealLoginForm from '../pages/real-login';
import RealRegisterForm from '../pages/real-register';

// 🎨 Página de showcase de componentes
import ComponentShowcase from '../pages/component-showcase';

// 🔍 Página de diagnóstico de banco de dados
import DatabaseDiagnostic from '../pages/database-diagnostic';

// 🧪 Página de testes de autenticação
import AuthTesting from '../pages/auth-testing.jsx';

// 🔄 Página de testes de redirecionamento
import RedirectTesting from '../pages/redirect-testing.jsx';

// 🎭 Página de testes de usuários por níveis
import UserLevelTesting from '../pages/user-level-testing.jsx';

// 🚫 Página de acesso negado
import UnauthorizedPage from '../pages/unauthorized';

// 🏠 Import das páginas públicas
import LandingPage from '../pages/landing';

// 🏠 Smart Dashboard (página inicial para usuários logados)
import SmartDashboard from '../pages/smart-dashboard';

// 🎯 NOVA ESTRUTURA - Import dos módulos de rotas organizados
import AdminRoutes from './admin-routes';
import StudentRoutes from './student-routes';
import TeacherRoutes from './teacher-routes';

// ✅ NOVA ESTRUTURA - ProtectedRoute 
import { SimpleProtectedRoute } from '../components/auth/working-protected-route';
import { RoleProtectedRoute } from '../components/auth/role-protected-route';

/**
 * AppRouterNew - Router integrado que suporta nova e antiga estrutura
 * Migrado de: src/app/router/AppRouter.jsx
 * Nova localização: src/router/app-router.jsx
 */
const AppRouterNew = () => {
  return (
    <Routes>
      {/* ===== PÁGINA INICIAL - LANDING PAGE PÚBLICA ===== */}
      <Route path="/" element={<LandingPage />} />
      
      {/* ===== AUTENTICAÇÃO ===== */}
      <Route path="/login" element={<RealLoginForm />} />
      <Route path="/register" element={<RealRegisterForm />} />
      
      {/* ===== DASHBOARD INTELIGENTE (APÓS LOGIN) ===== */}
      <Route 
        path="/dashboard" 
        element={
          <SimpleProtectedRoute>
            <SmartDashboard />
          </SimpleProtectedRoute>
        } 
      />

      {/* ===== NOVA ESTRUTURA ORGANIZADA ===== */}
      
      {/* 🎨 Showcase de Componentes */}
      <Route 
        path="/showcase" 
        element={<ComponentShowcase />} 
      />

      {/* 🔍 Diagnóstico do Banco de Dados */}
      <Route 
        path="/diagnostic" 
        element={<DatabaseDiagnostic />} 
      />

      {/* 🧪 Testes de Autenticação */}
      <Route 
        path="/auth-testing" 
        element={<AuthTesting />} 
      />

      {/* 🔄 Testes de Redirecionamento */}
      <Route 
        path="/redirect-testing" 
        element={<RedirectTesting />} 
      />

      {/* 🎭 Testes de Usuários por Níveis */}
      <Route 
        path="/user-testing" 
        element={<UserLevelTesting />} 
      />

      {/* 🚫 Página de Acesso Negado */}
      <Route 
        path="/unauthorized" 
        element={<UnauthorizedPage />} 
      />

      {/* 👑 Área Administrativa - APENAS ADMIN */}
      <Route 
        path="/admin/*" 
        element={
          <RoleProtectedRoute allowedRoles={['admin']}>
            <AdminRoutes />
          </RoleProtectedRoute>
        } 
      />

      {/* 👨‍🏫 Área dos Professores - PROFESSOR, PASTOR E ADMIN */}
      <Route 
        path="/teachers/*" 
        element={
          <RoleProtectedRoute allowedRoles={['professor', 'pastor', 'admin']}>
            <TeacherRoutes />
          </RoleProtectedRoute>
        } 
      />

      {/* 🎓 Área dos Estudantes - ALUNO E ADMIN */}
      <Route 
        path="/students/*" 
        element={
          <RoleProtectedRoute allowedRoles={['aluno', 'admin']}>
            <StudentRoutes />
          </RoleProtectedRoute>
        } 
      />

      {/* ===== DASHBOARD DE PERFORMANCE ===== */}
      {/* ===== COMPATIBILIDADE LEGACY ===== */}
      {/* Redirects para manter URLs antigas funcionando */}
      <Route path="/alunos/*" element={<Navigate to="/students" replace />} />
      <Route path="/professores/*" element={<Navigate to="/teachers" replace />} />
      <Route path="/admin-legacy/*" element={<Navigate to="/admin" replace />} />
      <Route path="/admin-new/*" element={<Navigate to="/admin" replace />} />

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
                  onClick={() => window.location.href = '/'} 
                  className="block w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Ir para Home
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