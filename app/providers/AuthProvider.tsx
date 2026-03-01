'use client'

import { createContext, useContext, useEffect, useState, useRef, type ReactNode } from 'react'
import { supabase } from '@/lib/supabase/client'
import type { UserRole } from '@/lib/types/rbac'

export type { UserRole }

export interface User {
  id: string
  email: string
  role: UserRole
  tenantId: string | null
}

interface AuthContextType {
  user: User | null
  loading: boolean
  isAuthenticated: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, userData?: Record<string, unknown>) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const isLoadingRef = useRef(false)
  const hasInitialized = useRef(false)
  const subscriptionRef = useRef<{ unsubscribe: () => void } | null>(null)

  useEffect(() => {
    setMounted(true)

    if (hasInitialized.current) return
    hasInitialized.current = true

    loadUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === 'SIGNED_OUT') {
        setUser(null)
        setLoading(false)
      } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
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

      // Read role and tenant_id from JWT claims (injected by custom_access_token_hook)
      const claims = session.access_token
        ? JSON.parse(atob(session.access_token.split('.')[1]))
        : {}

      const tenantId: string | null = claims.tenant_id || null
      const userRoles: string[] = claims.user_roles || []

      // Primary role: highest hierarchy (admin > teacher > student)
      const roleHierarchy: UserRole[] = ['admin', 'teacher', 'student']
      let role: UserRole = roleHierarchy.find(r => userRoles.includes(r)) || 'student'

      // Fallback: if JWT has no user_roles (hook not enabled), ask the RPC
      if (userRoles.length === 0) {
        try {
          const { data } = await supabase.rpc('rpc_get_user_rbac')
          if (data?.role?.slug) {
            role = data.role.slug as UserRole
          }
        } catch {
          // RPC not available yet, keep default
        }
      }

      setUser({
        id: session.user.id,
        email: session.user.email!,
        role,
        tenantId,
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
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      await loadUser()
    } catch (error) {
      setLoading(false)
      throw error
    }
  }

  async function signOut() {
    await supabase.auth.signOut()
    setUser(null)
  }

  async function signUp(email: string, password: string, userData?: Record<string, unknown>) {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: userData },
    })
    if (error) throw error
  }

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user,
    signIn,
    signUp,
    signOut,
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
