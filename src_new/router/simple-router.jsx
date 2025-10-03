import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// ✅ COMPONENTS BÁSICOS
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    <span className="ml-3 text-gray-600">Carregando...</span>
  </div>
);

// ✅ LAZY LOADING SIMPLIFICADO
const AdminDashboardLazy = React.lazy(() => import('@new/pages/admin/dashboard.jsx'));
const AdminStudentsLazy = React.lazy(() => import('@new/pages/admin/students.jsx'));
const AdminTeachersLazy = React.lazy(() => import('@new/pages/admin/teachers.jsx'));
const StructureBridgeLazy = React.lazy(() => import('@new/pages/structure-bridge-simple.jsx'));
const TestPageLazy = React.lazy(() => import('@new/pages/test-page.jsx'));

// ✅ COMPONENT SIMPLES DE PROTEÇÃO
const ProtectedRoute = ({ children }) => {
  // Por enquanto, apenas retorna o children
  // TODO: Implementar autenticação real
  return children;
};

/**
 * AppRouter - Sistema de roteamento simplificado
 * Versão estável sem dependências complexas
 */
const AppRouter = () => {
  return (
    <Routes>
      {/* ===== ROTA RAIZ ===== */}
      <Route path="/" element={<Navigate to="/test" replace />} />

      {/* ===== PÁGINA DE TESTE ===== */}
      <Route 
        path="/test" 
        element={
          <Suspense fallback={<LoadingFallback />}>
            <TestPageLazy />
          </Suspense>
        } 
      />

      {/* ===== PÁGINA DE INTEGRAÇÃO ===== */}
      <Route 
        path="/bridge" 
        element={
          <ProtectedRoute>
            <Suspense fallback={<LoadingFallback />}>
              <StructureBridgeLazy />
            </Suspense>
          </ProtectedRoute>
        } 
      />

      {/* ===== ADMIN PAGES ===== */}
      <Route 
        path="/admin/dashboard" 
        element={
          <ProtectedRoute>
            <Suspense fallback={<LoadingFallback />}>
              <AdminDashboardLazy />
            </Suspense>
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/admin/students" 
        element={
          <ProtectedRoute>
            <Suspense fallback={<LoadingFallback />}>
              <AdminStudentsLazy />
            </Suspense>
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/admin/teachers" 
        element={
          <ProtectedRoute>
            <Suspense fallback={<LoadingFallback />}>
              <AdminTeachersLazy />
            </Suspense>
          </ProtectedRoute>
        } 
      />

      {/* ===== FALLBACK ===== */}
      <Route path="*" element={<Navigate to="/bridge" replace />} />
    </Routes>
  );
};

export default AppRouter;