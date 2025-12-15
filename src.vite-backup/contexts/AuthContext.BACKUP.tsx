import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { supabase } from '@/lib/supabase/client'
import type { User as SupabaseUser } from '@supabase/supabase-js'

// Tipos
export type UserRole = 'aluno' | 'professor' | 'admin' | 'pastor'

export interface User {
  id: string
  nome: string
  email: string
  role: UserRole
  avatar?: string
}

interface ProfileData {
  tipo_usuario: string
  full_name: string | null
}

interface AuthContextType {
  user: User | null
  profile: ProfileData | null
  isAuthenticated: boolean
  isLoading: boolean
  loading: boolean // Alias para compatibilidade
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, userData?: any) => Promise<void>
  signOut: () => Promise<void>
}

// Context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Provider
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Carregar sessão existente ao iniciar
  useEffect(() => {
    loadSession()

    // Listener para mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('🔔 Auth state changed:', event)
      
      if (event === 'SIGNED_IN' && session) {
        // Buscar role real da tabela profiles
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('tipo_usuario, full_name')
          .eq('id', session.user.id)
          .single<ProfileData>()

        if (!profileError && profile) {
          const userData: User = {
            id: session.user.id,
            nome: profile.full_name || session.user.email?.split('@')[0] || 'Usuário',
            email: session.user.email!,
            role: profile.tipo_usuario as UserRole,
            avatar: session.user.user_metadata?.avatar,
          }
          
          console.log('✅ Login detectado (profiles):', {
            email: userData.email,
            role: userData.role
          })
          
          setUser(userData)
          setProfile(profile)
        } else {
          setUserFromSupabaseUser(session.user)
        }
      } else if (event === 'SIGNED_OUT') {
        console.log('👋 Logout detectado')
        setUser(null)
        setProfile(null)
      }
      setIsLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Carregar sessão do localStorage
  async function loadSession() {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        // Buscar role real da tabela profiles
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('tipo_usuario, full_name')
          .eq('id', session.user.id)
          .single<ProfileData>()

        if (!profileError && profile) {
          // Usar role da tabela profiles (fonte da verdade)
          const userData: User = {
            id: session.user.id,
            nome: profile.full_name || session.user.email?.split('@')[0] || 'Usuário',
            email: session.user.email!,
            role: profile.tipo_usuario as UserRole,
            avatar: session.user.user_metadata?.avatar,
          }
          
          console.log('🔄 Sessão carregada (profiles):', {
            email: userData.email,
            role: userData.role,
            nome: userData.nome,
            profileCompleto: profile,
            tipoUsuario: profile.tipo_usuario
          })
          
          setUser(userData)
          setProfile(profile)
        } else {
          // Fallback para metadata se profile não existir
          console.error('❌ ERRO ao buscar profile ou profile não existe:', {
            profileError,
            profile,
            userId: session.user.id
          })
          setUserFromSupabaseUser(session.user)
        }
      }
    } catch (error) {
      console.error('Erro ao carregar sessão:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Converter Supabase User para nosso User (fallback)
  function setUserFromSupabaseUser(supabaseUser: SupabaseUser) {
    const userData: User = {
      id: supabaseUser.id,
      nome: supabaseUser.user_metadata?.full_name || supabaseUser.email?.split('@')[0] || 'Usuário',
      email: supabaseUser.email!,
      role: (supabaseUser.user_metadata?.tipo_usuario as UserRole) || 'aluno',
      avatar: supabaseUser.user_metadata?.avatar,
    }
    
    // 🔍 DEBUG: Ver role detectado (metadata - menos confiável)
    console.log('⚠️ Usuário carregado via metadata (fallback):', {
      email: userData.email,
      role: userData.role,
      tipo_usuario_metadata: supabaseUser.user_metadata?.tipo_usuario
    })
    
    setUser(userData)
    setProfile({
      tipo_usuario: userData.role,
      full_name: userData.nome
    })
  }

  // Login
  async function signIn(email: string, password: string) {
    setIsLoading(true)
    try {
      console.log('🔐 Iniciando login para:', email)
      
      // 1. Autenticar no Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      })

      if (error) throw error
      if (!data.user) throw new Error('Falha na autenticação')

      console.log('✅ Autenticação bem-sucedida, buscando role do banco...')

      // 2. Buscar dados corretos da tabela profiles
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('tipo_usuario, full_name')
        .eq('id', data.user.id)
        .single<ProfileData>()

      if (profileError) {
        console.error('❌ Erro ao buscar profile:', profileError)
        throw new Error('Erro ao carregar dados do usuário')
      }

      if (!profile) {
        console.error('❌ Perfil não encontrado no banco')
        throw new Error('Perfil não encontrado')
      }

      console.log('📊 Dados do banco carregados:', {
        email: data.user.email,
        tipo_usuario: profile.tipo_usuario,
        full_name: profile.full_name
      })

      // 3. Criar objeto User com dados corretos da tabela
      const userData: User = {
        id: data.user.id,
        nome: profile.full_name || data.user.email?.split('@')[0] || 'Usuário',
        email: data.user.email!,
        role: profile.tipo_usuario as UserRole,
        avatar: undefined, // Avatar não existe na tabela profiles
      }

      console.log('👤 Usuário autenticado (profiles):', {
        email: userData.email,
        role: userData.role,
        nome: userData.nome
      })

      setUser(userData)
    } catch (error) {
      console.error('Erro no login:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Registro
  async function signUp(email: string, password: string, userData?: any) {
    setIsLoading(true)
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) throw error

      // Se necessário, criar perfil adicional
      if (data.user && userData) {
        const profileData = {
          id: data.user.id,
          email: data.user.email,
          full_name: userData.nome || userData.full_name,
          tipo_usuario: userData.tipo_usuario || 'aluno',
          ...userData
        }

        const { error: profileError } = await supabase
          .from('profiles')
          .insert(profileData)

        if (profileError) {
          console.error('Erro ao criar perfil:', profileError)
          // Não vamos lançar erro aqui para não bloquear o registro
        }
      }

      console.log('✅ Usuário registrado:', data.user?.email)
    } catch (error) {
      console.error('Erro no registro:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Logout
  async function signOut() {
    setIsLoading(true)
    try {
      await supabase.auth.signOut()
      setUser(null)
    } catch (error) {
      console.error('Erro no logout:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const value: AuthContextType = {
    user,
    profile,
    isAuthenticated: !!user,
    isLoading,
    loading: isLoading, // Alias para compatibilidade
    signIn,
    signUp,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Hook
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}
