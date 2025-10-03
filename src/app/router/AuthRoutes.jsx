import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// 🔐 Import das páginas de autenticação
import Login from '@/features/auth/pages/Login';
import Register from '@/features/auth/pages/Register';
import ConfirmEmail from '@/features/auth/components/ConfirmEmail';
import Vote from '@/features/auth/pages/Vote';

// 🏠 Import das páginas públicas
import LandingPage from '@/pages/LandingPage';
import SmartDashboard from '@/pages/SmartDashboard';

// 🛡️ Import dos componentes de proteção
import { useAuth } from '@/shared/contexts/AuthContext.tsx';

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
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

/**
 * AuthRoutes - Módulo de rotas de autenticação e acesso
 * Responsável por: login, registro, redirecionamentos e dashboard inteligente
 */
const AuthRoutes = () => {
  const { user } = useAuth();

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
    </Routes>
  );
};

export default AuthRoutes;
export { ProtectedRoute };