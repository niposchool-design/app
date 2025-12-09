import { createBrowserClient } from '@supabase/ssr'
import type { Database } from './database.types'

// Cliente Supabase para uso no lado do cliente (browser)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Faltam variáveis de ambiente! Verifique NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY'
  )
}

// Usando createBrowserClient do @supabase/ssr para compatibilidade com cookies
export const supabase = createBrowserClient<Database>(
  supabaseUrl, 
  supabaseAnonKey
)

// Tipos
export type UserProfile = Database['public']['Tables']['profiles']['Row']

// Helpers
export const isAuthenticated = async () => {
  const { data: { session } } = await supabase.auth.getSession()
  return !!session
}

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export const getCurrentSession = async () => {
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}
