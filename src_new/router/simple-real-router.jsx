import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// 🔐 Import das páginas de autenticação (real)
import RealLoginForm from '@new/pages/real-login';
import RealRegisterForm from '@new/pages/real-register';

// 🏠 Import das páginas básicas
import HomePage from '@new/pages/home-page';
import DashboardPage from '@new/pages/dashboard-page';

// 🔐 Import do ProtectedRoute da nova estrutura
import { ProtectedRoute } from '@new/components/auth/protected-route';

// ✅ Hook de autenticação nova estrutura
import { useAuth } from '@new/contexts/real-auth-context';

/**
 * SimpleRouter - Router simplificado da nova estrutura
 * Localização: src_new/router/simple-router.jsx
 */
const SimpleRouter = () => {
  return (
    <Routes>
      {/* ===== ROTAS PÚBLICAS ===== */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<RealLoginForm />} />
      <Route path="/register" element={<RealRegisterForm />} />
      
      {/* ===== DASHBOARD PRINCIPAL ===== */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <DashboardPage />
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
                  onClick={() => window.location.href = '/dashboard'} 
                  className="block w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Ir para Dashboard
                </button>
              </div>
            </div>
          </div>
        } 
      />
    </Routes>
  );
};

export default SimpleRouter;