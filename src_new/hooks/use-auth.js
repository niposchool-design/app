import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@new/lib/supabase/supabaseClient';

/**
 * useAuth - Hook moderno para autenticação
 * Migrado de: src/features/auth/hooks/useAuthFlow.js
 * Nova localização: src_new/hooks/use-auth.js
 * 
 * @returns {Object} Estado e funções de autenticação
 */
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Carregar perfil do usuário
  const loadUserProfile = useCallback(async (userId) => {
    if (!userId) return null;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      return data;
    } catch (err) {
      console.error('Erro ao carregar perfil:', err);
      return null;
    }
  }, []);

  // Inicializar autenticação
  const initializeAuth = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Verificar sessão atual
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        throw sessionError;
      }

      if (session?.user) {
        setUser(session.user);
        const profile = await loadUserProfile(session.user.id);
        setUserProfile(profile);
      } else {
        setUser(null);
        setUserProfile(null);
      }
    } catch (err) {
      console.error('Erro na inicialização da auth:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [loadUserProfile]);

  // Login
  const login = useCallback(async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      // Carregar perfil
      if (data.user) {
        const profile = await loadUserProfile(data.user.id);
        setUser(data.user);
        setUserProfile(profile);
        return { user: data.user, profile };
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [loadUserProfile]);

  // Logout
  const logout = useCallback(async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setUser(null);
      setUserProfile(null);
      navigate('/');
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // Register
  const register = useCallback(async (email, password, metadata = {}) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata
        }
      });

      if (error) throw error;
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Verificar role do usuário
  const hasRole = useCallback((requiredRole) => {
    if (!userProfile) return false;
    
    const userRole = userProfile.role || 'student';
    
    // Hierarquia de roles
    const roleHierarchy = {
      admin: ['admin', 'teacher', 'student'],
      teacher: ['teacher', 'student'],
      student: ['student']
    };

    return roleHierarchy[userRole]?.includes(requiredRole) || false;
  }, [userProfile]);

  // Verificar se é admin
  const isAdmin = useCallback(() => hasRole('admin'), [hasRole]);

  // Verificar se é professor
  const isTeacher = useCallback(() => hasRole('teacher'), [hasRole]);

  // Verificar se é aluno
  const isStudent = useCallback(() => hasRole('student'), [hasRole]);

  // Escutar mudanças de autenticação
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          setUser(session.user);
          const profile = await loadUserProfile(session.user.id);
          setUserProfile(profile);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setUserProfile(null);
        }
        setLoading(false);
      }
    );

    // Inicializar
    initializeAuth();

    return () => subscription.unsubscribe();
  }, [initializeAuth, loadUserProfile]);

  return {
    // Estado
    user,
    userProfile,
    loading,
    error,
    
    // Verificações
    isAuthenticated: !!user,
    isAdmin: isAdmin(),
    isTeacher: isTeacher(),
    isStudent: isStudent(),
    
    // Ações
    login,
    logout,
    register,
    hasRole,
    
    // Aliases para compatibilidade (remover na FASE 8)
    usuario: user,
    perfil: userProfile
  };
};

export default useAuth;