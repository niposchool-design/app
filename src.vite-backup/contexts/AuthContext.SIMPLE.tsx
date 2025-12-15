import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
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
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Carregar usuário ao iniciar
    loadUser()

    // Listener para mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        await loadUser()
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  async function loadUser() {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session?.user) {
        setUser(null)
        setLoading(false)
        return
      }

      // Buscar role do banco
      const { data: profile } = await supabase
        .from('profiles')
        .select('tipo_usuario')
        .eq('id', session.user.id)
        .single()

      const role = profile?.tipo_usuario as UserRole || 'aluno'

      console.log('🔐 AUTH SIMPLES:', {
        email: session.user.email,
        role: role,
        userId: session.user.id
      })

      setUser({
        id: session.user.id,
        email: session.user.email!,
        role: role
      })
      
      setLoading(false)
    } catch (error) {
      console.error('Erro ao carregar usuário:', error)
      setUser(null)
      setLoading(false)
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

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
