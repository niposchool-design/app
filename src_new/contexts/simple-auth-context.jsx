import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * SimpleAuthContext - Versão simplificada para debug
 */
const SimpleAuthContext = createContext();

const mockUsers = [
  { id: 1, email: 'admin@niposchool.com', password: '123456', role: 'admin', name: 'Administrador' },
  { id: 2, email: 'professor@niposchool.com', password: '123456', role: 'teacher', name: 'Professor Silva' },
  { id: 3, email: 'aluno@niposchool.com', password: '123456', role: 'student', name: 'João Santos' }
];

export const SimpleAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Debug: Log do estado
  useEffect(() => {
    console.log('🔍 Auth State:', { user: user?.email, role: user?.role, loading });
  }, [user, loading]);

  // Verificar sessão salva ao carregar
  useEffect(() => {
    console.log('🔄 Verificando sessão salva...');
    
    const savedUser = localStorage.getItem('niposchool_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        console.log('✅ Sessão encontrada:', userData.email);
        setUser(userData);
      } catch (error) {
        console.error('❌ Erro ao recuperar sessão:', error);
        localStorage.removeItem('niposchool_user');
      }
    }
    
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    console.log('🔐 Tentando login:', email);
    setLoading(true);
    
    try {
      // Simular delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const foundUser = mockUsers.find(u => u.email === email && u.password === password);

      if (!foundUser) {
        throw new Error('Email ou senha incorretos');
      }

      const { password: _, ...userWithoutPassword } = foundUser;
      
      console.log('✅ Login bem-sucedido:', userWithoutPassword);
      
      setUser(userWithoutPassword);
      localStorage.setItem('niposchool_user', JSON.stringify(userWithoutPassword));
      
      return {
        success: true,
        user: userWithoutPassword,
        redirectPath: getRedirectPath(foundUser.role)
      };
      
    } catch (error) {
      console.error('❌ Erro no login:', error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    console.log('🚪 Fazendo logout...');
    setUser(null);
    localStorage.removeItem('niposchool_user');
  };

  const getRedirectPath = (role) => {
    const paths = {
      'admin': '/admin/dashboard',
      'teacher': '/teacher/dashboard',
      'student': '/student/dashboard'
    };
    const path = paths[role] || '/login';
    console.log('🎯 Redirect path para', role, ':', path);
    return path;
  };

  const getCurrentDashboardPath = () => {
    if (!user) return '/login';
    return getRedirectPath(user.role);
  };

  const isAuthenticated = !!user;

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    getCurrentDashboardPath,
    getRedirectPath,
    
    // Helpers
    isAdmin: user?.role === 'admin',
    isTeacher: user?.role === 'teacher', 
    isStudent: user?.role === 'student',
    userRole: user?.role,
    userName: user?.name,
    
    // Role checker
    hasRole: (role) => user?.role === role
  };

  console.log('🔄 Auth Context Value:', { 
    isAuthenticated, 
    userRole: user?.role, 
    loading 
  });

  return (
    <SimpleAuthContext.Provider value={value}>
      {children}
    </SimpleAuthContext.Provider>
  );
};

export const useSimpleAuth = () => {
  const context = useContext(SimpleAuthContext);
  if (!context) {
    throw new Error('useSimpleAuth deve ser usado dentro de SimpleAuthProvider');
  }
  return context;
};