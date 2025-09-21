// 🌸 Sistema de Rotas Oriental Unificado
// Integração dos dashboards orientais com hierarquia de usuário

import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/shared/contexts/AuthContext';
import { useEffect, useState } from 'react';

// Dashboards Orientais
import AlunoDashboardOriental from '@/features/alunos/pages/AlunoDashboardOriental';
import ProfessorDashboardOriental from '@/features/professores/pages/ProfessorDashboardOriental';
import AdminDashboardOriental from '@/features/admin/pages/AdminDashboardOriental';

// Loading Component Oriental
const OrientalLoader = () => (
  <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center">
    <div className="text-center space-y-4">
      <div className="text-6xl animate-pulse">🌸</div>
      <div className="text-orange-600 font-medium">Carregando experiência oriental...</div>
    </div>
  </div>
);

// Error Component Oriental
const OrientalError = ({ message = "Acesso negado" }) => (
  <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center">
    <div className="bg-white/80 backdrop-blur-sm border border-orange-200 rounded-2xl p-8 text-center max-w-md">
      <div className="text-4xl mb-4">🚫</div>
      <h2 className="text-xl font-semibold text-orange-800 mb-2">Acesso Restrito</h2>
      <p className="text-orange-600 mb-4">{message}</p>
      <button 
        onClick={() => window.location.href = '/'}
        className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:shadow-lg transition-all"
      >
        Voltar ao Início
      </button>
    </div>
  </div>
);

// Hook para determinar o tipo de usuário
const useUserRole = () => {
  const { user, userProfile } = useAuth();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setRole(null);
      setLoading(false);
      return;
    }

    if (userProfile) {
      // Determinar papel baseado no perfil
      if (userProfile.role === 'admin' || userProfile.is_admin) {
        setRole('admin');
      } else if (userProfile.role === 'professor' || userProfile.tipo_usuario === 'professor') {
        setRole('teacher');
      } else {
        setRole('student');
      }
      setLoading(false);
    }
  }, [user, userProfile]);

  return { role, loading };
};

// Componente de Proteção de Rota
const ProtectedRoute = ({ children, allowedRoles, fallback }) => {
  const { user } = useAuth();
  const { role, loading } = useUserRole();

  if (loading) {
    return <OrientalLoader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return fallback || <OrientalError message={`Esta área é restrita para ${allowedRoles.join(', ')}`} />;
  }

  return children;
};

// Dashboard Switcher - Redireciona para o dashboard apropriado
const DashboardSwitcher = () => {
  const { role, loading } = useUserRole();

  if (loading) {
    return <OrientalLoader />;
  }

  switch (role) {
    case 'admin':
      return <Navigate to="/dashboard/admin" replace />;
    case 'teacher':
      return <Navigate to="/dashboard/professor" replace />;
    case 'student':
    default:
      return <Navigate to="/dashboard/aluno" replace />;
  }
};

// Componente Principal de Rotas Orientais
export const OrientalRoutes = () => {
  return (
    <Routes>
      {/* Rota Principal - Redireciona para dashboard apropriado */}
      <Route path="/dashboard" element={<DashboardSwitcher />} />
      
      {/* Dashboard do Aluno - Ultra-leve e gamificado */}
      <Route 
        path="/dashboard/aluno" 
        element={
          <ProtectedRoute allowedRoles={['student', 'teacher', 'admin']}>
            <AlunoDashboardOriental />
          </ProtectedRoute>
        } 
      />
      
      {/* Dashboard do Professor - Funcional e pedagógico */}
      <Route 
        path="/dashboard/professor" 
        element={
          <ProtectedRoute 
            allowedRoles={['teacher', 'admin']}
            fallback={<OrientalError message="Área restrita para professores e administradores" />}
          >
            <ProfessorDashboardOriental />
          </ProtectedRoute>
        } 
      />
      
      {/* Dashboard Admin - Controle total e elegante */}
      <Route 
        path="/dashboard/admin" 
        element={
          <ProtectedRoute 
            allowedRoles={['admin']}
            fallback={<OrientalError message="Área restrita para administradores" />}
          >
            <AdminDashboardOriental />
          </ProtectedRoute>
        } 
      />

      {/* Rotas de Navegação Rápida */}
      <Route path="/aluno" element={<Navigate to="/dashboard/aluno" replace />} />
      <Route path="/professor" element={<Navigate to="/dashboard/professor" replace />} />
      <Route path="/admin" element={<Navigate to="/dashboard/admin" replace />} />
      
      {/* Fallback para dashboard */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

// Hook utilitário para navegação oriental
export const useOrientalNavigation = () => {
  const { role } = useUserRole();
  
  const navigateToAppropriate = () => {
    switch (role) {
      case 'admin':
        return '/dashboard/admin';
      case 'teacher':
        return '/dashboard/professor';
      case 'student':
      default:
        return '/dashboard/aluno';
    }
  };

  const canAccessDashboard = (targetRole) => {
    const permissions = {
      admin: ['admin'],
      teacher: ['teacher', 'admin'],
      student: ['student', 'teacher', 'admin']
    };
    
    return permissions[targetRole]?.includes(role) || false;
  };

  return {
    role,
    navigateToAppropriate,
    canAccessDashboard,
    isDashboardAllowed: (target) => canAccessDashboard(target)
  };
};

// Componente de Navegação Oriental
export const OrientalNavBar = () => {
  const { role } = useUserRole();
  const { canAccessDashboard } = useOrientalNavigation();

  const navItems = [
    {
      path: '/dashboard/aluno',
      label: 'Aluno',
      icon: '学',
      description: 'Experiência de aprendizagem',
      role: 'student'
    },
    {
      path: '/dashboard/professor', 
      label: 'Professor',
      icon: '先',
      description: 'Ferramentas pedagógicas',
      role: 'teacher'
    },
    {
      path: '/dashboard/admin',
      label: 'Admin',
      icon: '師',
      description: 'Gestão do sistema',
      role: 'admin'
    }
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-orange-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              🌸 Nipo School
            </div>
            
            <div className="flex space-x-4">
              {navItems.map((item) => (
                canAccessDashboard(item.role) && (
                  <a
                    key={item.path}
                    href={item.path}
                    className={`
                      flex items-center space-x-2 px-4 py-2 rounded-xl transition-all
                      ${location.pathname === item.path 
                        ? 'bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 border border-orange-200' 
                        : 'text-orange-600 hover:bg-orange-50 hover:text-orange-700'
                      }
                    `}
                    title={item.description}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                    {item.role === role && (
                      <span className="text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded-full">
                        Ativo
                      </span>
                    )}
                  </a>
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default OrientalRoutes;