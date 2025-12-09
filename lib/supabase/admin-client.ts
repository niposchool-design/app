import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

/**
 * 🔑 ADMIN CLIENT - Com service_role_key
 * 
 * Este cliente bypassa RLS e tem acesso TOTAL ao banco.
 * USE APENAS em Server Components ou API Routes!
 * 
 * ⚠️ NUNCA exponha o service_role_key no frontend!
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceRoleKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error(
    'Faltam variáveis de ambiente para admin client! Verifique NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY'
  )
}

// Cliente com privilégios administrativos (bypassa RLS)
export const adminSupabase = createClient<Database>(
  supabaseUrl,
  supabaseServiceRoleKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)
