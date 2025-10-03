import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * AuthContext - Sistema de autenticação com roles
 * Localização: src_new/contexts/auth-context.jsx
 * 
 * Gerencia autenticação e roles de usuários:
 * - student (aluno)
 * - teacher (professor)  
 * - admin (administrador)
 */

const AuthContext = createContext();

// Mock do banco de dados (substituir por API real)
const mockUsers = [
  {
    id: 1,
    email: 'admin@niposchool.com',
    password: '123456',
    role: 'admin',
    name: 'Administrador',
    profile: {
      avatar: null,
      permissions: ['all']
    }
  },
  {
    id: 2,
    email: 'professor@niposchool.com', 
    password: '123456',
    role: 'teacher',
    name: 'Professor Silva',
    profile: {
      avatar: null,
      classes: ['Violino Básico', 'Piano Intermediário'],
      students: 15
    }
  },
  {
    id: 3,
    email: 'aluno@niposchool.com',
    password: '123456', 
    role: 'student',
    name: 'João Santos',
    profile: {
      avatar: null,
      course: 'Violino Básico',
      level: 'Iniciante',
      teacher: 'Professor Silva'
    }
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar se há sessão salva
  useEffect(() => {
    const savedUser = localStorage.getItem('niposchool_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Erro ao recuperar sessão:', error);
        localStorage.removeItem('niposchool_user');
      }
    }
    setLoading(false);
  }, []);

  /**
   * Login do usuário
   */
  const login = async (email, password) => {
    setLoading(true);
    
    try {
      // Simular consulta ao banco
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundUser = mockUsers.find(
        u => u.email === email && u.password === password
      );

      if (!foundUser) {
        throw new Error('Email ou senha incorretos');
      }

      // Remover senha dos dados salvos
      const { password: _, ...userWithoutPassword } = foundUser;
      
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      localStorage.setItem('niposchool_user', JSON.stringify(userWithoutPassword));
      
      return {
        success: true,
        user: userWithoutPassword,
        redirectPath: getRedirectPath(foundUser.role)
      };
      
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logout do usuário
   */
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('niposchool_user');
  };

  /**
   * Determinar caminho de redirecionamento baseado no role
   */
  const getRedirectPath = (role) => {
    switch (role) {
      case 'admin':
        return '/admin/dashboard';
      case 'teacher':
        return '/teacher/dashboard';
      case 'student':
        return '/student/dashboard';
      default:
        return '/login';
    }
  };

  /**
   * Verificar se usuário tem permissão específica
   */
  const hasPermission = (permission) => {
    if (!user) return false;
    
    // Admin tem todas as permissões
    if (user.role === 'admin') return true;
    
    // Verificar permissões específicas
    return user.profile?.permissions?.includes(permission) || false;
  };

  /**
   * Verificar se usuário tem role específico
   */
  const hasRole = (role) => {
    return user?.role === role;
  };

  /**
   * Obter caminho atual baseado no role do usuário
   */
  const getCurrentDashboardPath = () => {
    if (!user) return '/login';
    return getRedirectPath(user.role);
  };

  const value = {
    // Estado
    user,
    loading,
    isAuthenticated,
    
    // Métodos
    login,
    logout,
    hasPermission,
    hasRole,
    getCurrentDashboardPath,
    getRedirectPath,
    
    // Helpers
    isAdmin: user?.role === 'admin',
    isTeacher: user?.role === 'teacher', 
    isStudent: user?.role === 'student',
    userRole: user?.role,
    userName: user?.name,
    userProfile: user?.profile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook para usar o contexto de autenticação
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};

/**
 * Dados mock para desenvolvimento
 */
export const getMockUsers = () => mockUsers.map(({ password, ...user }) => user);