'use client'

import { createContext, useContext, useEffect, useState, useRef, ReactNode } from 'react'
import { supabase } from '@/lib/supabase/client'

// 3 roles possíveis - baseado na documentação existente
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
  const [mounted, setMounted] = useState(false)
  const isLoadingRef = useRef(false)
  const hasInitialized = useRef(false)
  const subscriptionRef = useRef<any>(null)

  useEffect(() => {
    setMounted(true)

    if (hasInitialized.current) return
    hasInitialized.current = true

    loadUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        setUser(null)
        setLoading(false)
      } else if (event === 'SIGNED_IN' && session) {
        loadUser()
      }
    })

    subscriptionRef.current = subscription

    return () => {
      subscriptionRef.current?.unsubscribe()
      hasInitialized.current = false
      setMounted(false)
    }
  }, [])

  async function loadUser() {
    if (isLoadingRef.current) return

    isLoadingRef.current = true

    try {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session?.user) {
        setUser(null)
        setLoading(false)
        isLoadingRef.current = false
        return
      }

      // Sistema de permissões: user_roles.role_type (fonte de verdade)
      // @ts-ignore - Supabase types
      const { data: userRole } = await supabase
        // @ts-ignore
        .from('user_roles')
        .select('role_type, is_active')
        .eq('user_id', session.user.id)
        .eq('is_active', true)
        .single()

      // Fallback para profiles.role
      let role: UserRole = 'aluno'

      // @ts-ignore
      if (userRole?.role_type) {
        // @ts-ignore
        role = userRole.role_type as UserRole
      } else {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single()

        if (profile) {
          // @ts-ignore
          role = profile.role as UserRole
        }
      }

      // Normalização de role e tratamento de aliases
      if (typeof role === 'string') {
        // @ts-ignore
        let roleStr = (role as string).toLowerCase().trim()
        if (roleStr === 'teacher') role = 'professor'
        if (roleStr === 'student') role = 'aluno'
        if (roleStr === 'administrator') role = 'admin'
      }

      setUser({
        id: session.user.id,
        email: session.user.email!,
        role: role
      })

    } catch (error) {
      console.error('Auth error:', error)
      setUser(null)
    } finally {
      setLoading(false)
      isLoadingRef.current = false
    }
  }

  async function signIn(email: string, password: string) {
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        throw error
      }

      console.log('✅ Login realizado:', { email, hasSession: !!data.session })

      // Aguarda o loadUser completar
      await loadUser()

      console.log('✅ User carregado após login')
    } catch (error) {
      setLoading(false)
      throw error
    }
  }

  async function signOut() {
    await supabase.auth.signOut()
    setUser(null)
  }

  async function signUp(email: string, password: string, userData?: any) {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    })
    if (error) throw error
  }

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    profile: user ? { role: user.role } : null,
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
