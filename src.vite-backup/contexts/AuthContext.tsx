import { createContext, useContext, useEffect, useState, useRef, ReactNode } from 'react'
import { supabase } from '@/lib/supabase/client'

// SUPER SIMPLES - 3 roles possíveis
export type UserRole = 'aluno' | 'professor' | 'admin'

export interface User {
  id: string
  email: string
  role: UserRole
}

interface AuthContextType {
  user: User | null
  loading: boolean
  isAuthenticated: boolean
  profile: any
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, userData?: any) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const isLoadingRef = useRef(false) // Proteção contra múltiplas chamadas

  useEffect(() => {
    // Carregar usuário ao iniciar
    loadUser()

    // Listener para mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('🔔 onAuthStateChange:', event)
      if (event === 'SIGNED_IN' && session) {
        await loadUser()
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  async function loadUser() {
    // Prevenir múltiplas chamadas simultâneas
    if (isLoadingRef.current) {
      console.log('⚠️ loadUser já está rodando, pulando...')
      return
    }
    
    isLoadingRef.current = true
    console.log('📍 LOADUSER INICIADO')
    try {
      console.log('📍 Chamando getSession...')
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      console.log('📍 getSession retornou')
      
      console.log('📍 SESSION:', { hasSession: !!session, error: sessionError })
      
      if (!session?.user) {
        console.log('❌ SEM SESSÃO - limpando user')
        setUser(null)
        setLoading(false)
        return
      }

      console.log('📍 Buscando role em user_roles para user_id:', session.user.id)

      // Buscar role da tabela user_roles (sistema correto de permissões)
      // @ts-ignore
      const { data: userRole, error: userRoleError } = await supabase
        .from('user_roles')
        .select('role_type, is_active')
        .eq('user_id', session.user.id)
        .eq('is_active', true)
        .single()

      console.log('📍 USER_ROLES resultado:', { userRole, error: userRoleError })

      // Fallback para profiles.tipo_usuario se user_roles não existir
      let role: UserRole = 'aluno'
      
      if (userRole?.role_type) {
        // @ts-ignore
        role = userRole.role_type as UserRole
        console.log('✅ Role de user_roles:', role)
      } else {
        console.log('📍 Buscando fallback em profiles')
        // Tentar profiles como fallback
        // @ts-ignore
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('tipo_usuario')
          .eq('id', session.user.id)
          .single()
        
        console.log('📍 PROFILES resultado:', { profile, error: profileError })
        
        if (profile?.tipo_usuario) {
          // @ts-ignore
          role = profile.tipo_usuario as UserRole
          console.log('✅ Role de profiles:', role)
        } else {
          console.warn('⚠️ SEM ROLE! Usando fallback "aluno"')
        }
      }

      console.log('🔐 AUTH FINAL:', {
        email: session.user.email,
        role: role,
        userId: session.user.id,
        source: userRole?.role_type ? 'user_roles' : 'profiles'
      })

      setUser({
        id: session.user.id,
        email: session.user.email!,
        role: role
      })
      
      setLoading(false)
      isLoadingRef.current = false
    } catch (error) {
      console.error('💥 ERRO em loadUser:', error)
      setUser(null)
      setLoading(false)
      isLoadingRef.current = false
    }
  }

  async function signIn(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    await loadUser()
  }

  async function signOut() {
    await supabase.auth.signOut()
    setUser(null)
  }

  async function signUp(email: string, password: string, userData?: any) {
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
  }

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    profile: user ? { tipo_usuario: user.role } : null,
    signIn,
    signUp,
    signOut
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
