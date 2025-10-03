import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// 🔐 Import das páginas de autenticação
import Login from '@/features/auth/pages/Login';
import Register from '@/features/auth/pages/Register';

// 🏠 Import das páginas públicas
import LandingPage from '@/pages/LandingPage';
import SmartDashboard from '@/pages/SmartDashboard';

// 🎯 Import dos módulos de rotas especializados
import AlunosRoutes from './AlunosRoutes';
import ProfessoresRoutes from './ProfessoresRoutes';
import AdminRoutes from './AdminRoutes';
import { ProtectedRoute } from './AuthRoutes';

/**
 * AppRouter - Hub central de roteamento modular (versão simplificada para debug)
 */
const AppRouter = () => {
  return (
    <Routes>
      {/* Rotas básicas para teste */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <SmartDashboard />
          </ProtectedRoute>
        } 
      />

      {/* Módulos especializados */}
      <Route path="/alunos/*" element={<AlunosRoutes />} />
      <Route path="/professores/*" element={<ProfessoresRoutes />} />
      <Route path="/admin/*" element={<AdminRoutes />} />

      {/* 404 */}
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