import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

// Validar variáveis de ambiente
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Faltam variáveis de ambiente! Verifique VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no arquivo .env'
  )
}

// Cliente Supabase tipado e configurado
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storage: window.localStorage,
  },
})

// Tipo do perfil do usuário
export type UserProfile = Database['public']['Tables']['profiles']['Row']

// Helper para verificar se está autenticado
export const isAuthenticated = async () => {
  const { data: { session } } = await supabase.auth.getSession()
  return !!session
}

// Helper para obter usuário atual
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Helper para obter sessão atual
export const getCurrentSession = async () => {
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

// Helper para fazer logout
export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

// Helper para obter perfil completo do usuário
export const getCurrentProfile = async () => {
  const user = await getCurrentUser()
  if (!user) return null

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error) {
    console.error('Erro ao buscar perfil:', error)
    return null
  }

  return data
}
