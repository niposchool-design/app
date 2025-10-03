import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../shared/contexts/AuthContext.tsx';

const SmartDashboard = () => {
  const { user, userProfile, loading } = useAuth();

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
            <span className="text-white text-2xl">🎵</span>
          </div>
          <p className="text-gray-600">Redirecionando para sua área...</p>
        </div>
      </div>
    );
  }

  // Se não tem usuário, vai ser redirecionado pelo ProtectedRoute
  if (!user || !userProfile) {
    return <Navigate to="/login" replace />;
  }

  // 🎯 REDIRECIONAMENTO INTELIGENTE BASEADO NO TIPO DE USUÁRIO
  const getRedirectPath = () => {
    switch (userProfile.tipo_usuario) {
      case 'admin':
        return '/admin';
        
      case 'professor':
      case 'pastor':
        return '/professores';
        
      case 'aluno':
        return '/alunos';
        
      default:
        // Fallback para usuários sem tipo definido
        console.warn('⚠️ Tipo de usuário não reconhecido:', userProfile.tipo_usuario);
        return '/alunos'; // Default para área de alunos
    }
  };

  const redirectPath = getRedirectPath();

  console.log(`🚀 SmartDashboard: Redirecionando usuário ${userProfile.tipo_usuario} para ${redirectPath}`);

  // Redirecionar para a área específica do usuário
  return <Navigate to={redirectPath} replace />;
};

export default SmartDashboard;