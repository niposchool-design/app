import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute, PublicRoute } from '@new/components/auth/protected-route';

// ✅ LOADING COMPONENT
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
    <span className="ml-3 text-gray-600">Carregando...</span>
  </div>
);

// ✅ LAZY LOADING - Public Pages
const LandingPageLazy = React.lazy(() => import('@new/pages/landing.jsx'));
const LoginPageLazy = React.lazy(() => import('@new/pages/login.jsx'));

// ✅ LAZY LOADING - Dashboards
const AdminDashboardLazy = React.lazy(() => import('@new/pages/dashboards/admin-dashboard.jsx'));
const TeacherDashboardLazy = React.lazy(() => import('@new/pages/dashboards/teacher-dashboard.jsx'));
const StudentDashboardLazy = React.lazy(() => import('@new/pages/dashboards/student-dashboard.jsx'));

// ✅ UNAUTHORIZED PAGE
const UnauthorizedPage = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Acesso Negado</h1>
      <p className="text-gray-600 mb-4">Você não tem permissão para acessar esta página.</p>
      <button 
        onClick={() => window.history.back()}
        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
      >
        Voltar
      </button>
    </div>
  </div>
);

/**
 * AuthRouter - Sistema de roteamento com autenticação baseada em roles
 * Localização: src_new/router/auth-router.jsx
 */
const AuthRouter = () => {
  return (
    <Routes>
      {/* ===== ROTAS PÚBLICAS ===== */}
      
      {/* Landing Page */}
      <Route 
        path="/" 
        element={
          <PublicRoute>
            <Suspense fallback={<LoadingFallback />}>
              <LandingPageLazy />
            </Suspense>
          </PublicRoute>
        } 
      />

      {/* Login */}
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <Suspense fallback={<LoadingFallback />}>
              <LoginPageLazy />
            </Suspense>
          </PublicRoute>
        } 
      />

      {/* ===== DASHBOARDS PROTEGIDOS POR ROLE ===== */}

      {/* Admin Dashboard */}
      <Route 
        path="/admin/dashboard" 
        element={
          <ProtectedRoute requiredRole="admin">
            <Suspense fallback={<LoadingFallback />}>
              <AdminDashboardLazy />
            </Suspense>
          </ProtectedRoute>
        } 
      />

      {/* Teacher Dashboard */}
      <Route 
        path="/teacher/dashboard" 
        element={
          <ProtectedRoute requiredRole="teacher">
            <Suspense fallback={<LoadingFallback />}>
              <TeacherDashboardLazy />
            </Suspense>
          </ProtectedRoute>
        } 
      />

      {/* Student Dashboard */}
      <Route 
        path="/student/dashboard" 
        element={
          <ProtectedRoute requiredRole="student">
            <Suspense fallback={<LoadingFallback />}>
              <StudentDashboardLazy />
            </Suspense>
          </ProtectedRoute>
        } 
      />

      {/* ===== ROTAS GENÉRICAS PROTEGIDAS ===== */}

      {/* Admin Routes (qualquer rota /admin/*) */}
      <Route 
        path="/admin/*" 
        element={
          <ProtectedRoute requiredRole="admin">
            <Suspense fallback={<LoadingFallback />}>
              <AdminDashboardLazy />
            </Suspense>
          </ProtectedRoute>
        } 
      />

      {/* Teacher Routes (qualquer rota /teacher/*) */}
      <Route 
        path="/teacher/*" 
        element={
          <ProtectedRoute requiredRole="teacher">
            <Suspense fallback={<LoadingFallback />}>
              <TeacherDashboardLazy />
            </Suspense>
          </ProtectedRoute>
        } 
      />

      {/* Student Routes (qualquer rota /student/*) */}
      <Route 
        path="/student/*" 
        element={
          <ProtectedRoute requiredRole="student">
            <Suspense fallback={<LoadingFallback />}>
              <StudentDashboardLazy />
            </Suspense>
          </ProtectedRoute>
        } 
      />

      {/* ===== PÁGINAS ESPECIAIS ===== */}

      {/* Unauthorized */}
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      {/* ===== FALLBACK ===== */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AuthRouter;