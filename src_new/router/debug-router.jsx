import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { SimpleProtectedRoute, SimplePublicRoute } from '@new/components/auth/simple-protected-route';

// ✅ LOADING COMPONENT
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
    <span className="ml-3 text-gray-600">Carregando...</span>
  </div>
);

// ✅ LAZY LOADING
const LandingPageLazy = React.lazy(() => import('@new/pages/landing.jsx'));
const SimpleLoginPageLazy = React.lazy(() => import('@new/pages/simple-login.jsx'));
const AdminDashboardLazy = React.lazy(() => import('@new/pages/dashboards/admin-dashboard.jsx'));
const TeacherDashboardLazy = React.lazy(() => import('@new/pages/dashboards/teacher-dashboard.jsx'));
const StudentDashboardLazy = React.lazy(() => import('@new/pages/dashboards/student-dashboard.jsx'));

// ✅ UNAUTHORIZED PAGE
const UnauthorizedPage = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">❌ Acesso Negado</h1>
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
 * DebugRouter - Router simplificado com debug
 */
const DebugRouter = () => {
  console.log('🌐 DebugRouter renderizado');

  return (
    <Routes>
      {/* Landing Page */}
      <Route 
        path="/" 
        element={
          <SimplePublicRoute>
            <Suspense fallback={<LoadingFallback />}>
              <LandingPageLazy />
            </Suspense>
          </SimplePublicRoute>
        } 
      />

      {/* Login */}
      <Route 
        path="/login" 
        element={
          <SimplePublicRoute>
            <Suspense fallback={<LoadingFallback />}>
              <SimpleLoginPageLazy />
            </Suspense>
          </SimplePublicRoute>
        } 
      />

      {/* Admin Dashboard */}
      <Route 
        path="/admin/dashboard" 
        element={
          <SimpleProtectedRoute requiredRole="admin">
            <Suspense fallback={<LoadingFallback />}>
              <AdminDashboardLazy />
            </Suspense>
          </SimpleProtectedRoute>
        } 
      />

      {/* Teacher Dashboard */}
      <Route 
        path="/teacher/dashboard" 
        element={
          <SimpleProtectedRoute requiredRole="teacher">
            <Suspense fallback={<LoadingFallback />}>
              <TeacherDashboardLazy />
            </Suspense>
          </SimpleProtectedRoute>
        } 
      />

      {/* Student Dashboard */}
      <Route 
        path="/student/dashboard" 
        element={
          <SimpleProtectedRoute requiredRole="student">
            <Suspense fallback={<LoadingFallback />}>
              <StudentDashboardLazy />
            </Suspense>
          </SimpleProtectedRoute>
        } 
      />

      {/* Unauthorized */}
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default DebugRouter;