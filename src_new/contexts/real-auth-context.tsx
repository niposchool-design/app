import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useRef,
  ReactNode
} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, AuthChangeEvent, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase/supabaseClient';
import { getSmartRedirect } from '../services/redirectService';

// ========================================
// TIPOS
// ========================================
interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  nome: string;
  dob: string | null;
  instrument: string;
  tipo_usuario: 'aluno' | 'professor' | 'admin' | 'pastor';
  user_level: string;
  total_points: number;
  current_streak: number;
  best_streak: number;
  lessons_completed: number;
  modules_completed: number;
  theme_preference: string;
  notification_enabled: boolean;
  sound_enabled: boolean;
  has_voted: boolean;
  voted_logo: string | null;
  avatar_url: string | null;
  bio: string | null;
  phone: string | null;
  city: string | null;
  state: string | null;
  church_name: string | null;
  joined_at: string;
  last_active: string;
}

interface SignupData {
  fullName: string;
  dob: string;
  instrument: string;
  tipo_usuario: 'aluno' | 'professor' | 'admin' | 'pastor';
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<any>;
  signup: (email: string, password: string, userData: SignupData) => Promise<User>;
  logout: () => Promise<void>;
  recordVote: (logoId: string) => Promise<UserProfile>;
  fetchUserProfile: (userId: string, useCache?: boolean) => Promise<UserProfile | null>;
  updateProfile: (profileData: Partial<UserProfile>) => Promise<UserProfile>;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // States
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  // Controle
  const isRedirecting = useRef<boolean>(false);
  const profileCache = useRef<{ profile: UserProfile | null; timestamp: number }>({
    profile: null,
    timestamp: 0
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // ========================================
  // REDIRECIONAMENTO
  // ========================================
  const redirectByVote = (profile: UserProfile | null, force: boolean = false): void => {
    if (isRedirecting.current && !force) return;
    if (!profile) return;
    isRedirecting.current = true;
    try {
      const redirectResult = getSmartRedirect(profile, location.pathname, { force });
      if (redirectResult.shouldRedirect) {
        navigate(redirectResult.targetPath, { replace: true });
      }
    } catch (error) {
      console.error('Erro no redirecionamento:', error);
    } finally {
      setTimeout(() => {
        isRedirecting.current = false;
      }, 500);
    }
  };

  // ========================================
  // BUSCAR PERFIL
  // ========================================
  const fetchUserProfile = async (
    userId: string,
    useCache: boolean = true
  ): Promise<UserProfile | null> => {
    if (!userId) return null;

    const cacheAge = Date.now() - profileCache.current.timestamp;
    const cacheValid = cacheAge < 5 * 60 * 1000; // 5 minutos

    if (useCache && profileCache.current.profile && cacheValid) {
      return profileCache.current.profile;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('❌ Erro ao buscar perfil:', error);
        return null;
      }

      const profile = data as UserProfile;
      profileCache.current = { profile, timestamp: Date.now() };
      return profile;
    } catch (error) {
      console.error('❌ Erro inesperado ao buscar perfil:', error);
      return null;
    }
  };

  // ========================================
  // ATUALIZAR PERFIL
  // ========================================
  const updateProfile = async (profileData: Partial<UserProfile>): Promise<UserProfile> => {
    if (!user) throw new Error('Usuário não autenticado');

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;

      const updatedProfile = data as UserProfile;
      setUserProfile(updatedProfile);
      profileCache.current = { profile: updatedProfile, timestamp: Date.now() };
      
      return updatedProfile;
    } catch (error) {
      console.error('❌ Erro ao atualizar perfil:', error);
      throw error;
    }
  };

  // ========================================
  // LOGIN
  // ========================================
  const login = async (email: string, password: string): Promise<any> => {
    setLoading(true);
    try {
      console.log('🔐 Iniciando login para:', email);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password
      });

      if (error) {
        console.error('❌ Erro no login:', error);
        if (error.message === 'Email not confirmed') {
          return {
            success: false,
            needsEmailVerification: true,
            email: email,
            error: 'Por favor, confirme seu email antes de fazer login.'
          };
        }
        return { success: false, error: error.message };
      }

      if (data.user) {
        console.log('✅ Login bem-sucedido:', data.user.email);
        setUser(data.user);

        const profile = await fetchUserProfile(data.user.id, false);
        if (profile) {
          setUserProfile(profile);
          setTimeout(() => redirectByVote(profile), 100);
        }

        return { success: true, user: data.user, profile };
      }

      return { success: false, error: 'Erro desconhecido no login' };
    } catch (error) {
      console.error('❌ Erro inesperado no login:', error);
      return { success: false, error: 'Erro de conexão' };
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // SIGNUP
  // ========================================
  const signup = async (
    email: string,
    password: string,
    userData: SignupData
  ): Promise<User> => {
    try {
      console.log('📝 Iniciando cadastro para:', email);

      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          data: {
            full_name: userData.fullName,
            nome: userData.fullName,
            dob: userData.dob,
            instrument: userData.instrument,
            tipo_usuario: userData.tipo_usuario
          }
        }
      });

      if (error) {
        console.error('❌ Erro no cadastro:', error);
        throw error;
      }

      if (!data.user) {
        throw new Error('Erro ao criar usuário');
      }

      console.log('✅ Cadastro realizado:', data.user.email);
      return data.user;
    } catch (error) {
      console.error('❌ Erro no signup:', error);
      throw error;
    }
  };

  // ========================================
  // LOGOUT
  // ========================================
  const logout = async (): Promise<void> => {
    try {
      console.log('🚪 Fazendo logout...');
      
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setUser(null);
      setUserProfile(null);
      profileCache.current = { profile: null, timestamp: 0 };
      
      navigate('/login', { replace: true });
      console.log('✅ Logout realizado com sucesso');
    } catch (error) {
      console.error('❌ Erro no logout:', error);
    }
  };

  // ========================================
  // VOTAR EM LOGO
  // ========================================
  const recordVote = async (logoId: string): Promise<UserProfile> => {
    if (!user || !userProfile) {
      throw new Error('Usuário não autenticado');
    }

    try {
      const updatedProfile = await updateProfile({
        has_voted: true,
        voted_logo: logoId
      });

      return updatedProfile;
    } catch (error) {
      console.error('❌ Erro ao registrar voto:', error);
      throw error;
    }
  };

  // ========================================
  // AUTH STATE LISTENER
  // ========================================
  useEffect(() => {
    if (!mounted) return;

    console.log('🔄 Configurando listener de autenticação...');

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        console.log('🔔 Auth state changed:', event, session?.user?.email);

        if (event === 'SIGNED_IN' && session?.user) {
          setUser(session.user);
          const profile = await fetchUserProfile(session.user.id, false);
          if (profile) {
            setUserProfile(profile);
            setTimeout(() => redirectByVote(profile), 100);
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setUserProfile(null);
          profileCache.current = { profile: null, timestamp: 0 };
        }

        setLoading(false);
      }
    );

    return () => {
      console.log('🔄 Removendo listener de autenticação...');
      subscription.unsubscribe();
    };
  }, [mounted, navigate]);

  // ========================================
  // INITIAL SESSION CHECK
  // ========================================
  useEffect(() => {
    if (!mounted) return;

    const checkInitialSession = async () => {
      try {
        console.log('🔍 Verificando sessão inicial...');
        
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('❌ Erro ao verificar sessão:', error);
          setLoading(false);
          return;
        }

        if (session?.user) {
          console.log('✅ Sessão encontrada:', session.user.email);
          setUser(session.user);
          
          const profile = await fetchUserProfile(session.user.id, false);
          if (profile) {
            setUserProfile(profile);
          }
        } else {
          console.log('ℹ️ Nenhuma sessão ativa');
        }
      } catch (error) {
        console.error('❌ Erro ao verificar sessão inicial:', error);
      } finally {
        setLoading(false);
      }
    };

    checkInitialSession();
  }, [mounted]);

  // ========================================
  // CONTEXT VALUE
  // ========================================
  const contextValue: AuthContextType = {
    user,
    userProfile,
    loading,
    login,
    signup,
    logout,
    recordVote,
    fetchUserProfile,
    updateProfile
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// ========================================
// HOOK
// ========================================
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro do AuthProvider');
  }
  return context;
};