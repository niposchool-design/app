import { createClient } from '@supabase/supabase-js'

/**
 * 🔑 ADMIN CLIENT - Com service_role_key
 * 
 * Este cliente bypassa RLS e tem acesso TOTAL ao banco.
 * USE APENAS em Server Components ou API Routes!
 * 
 * ⚠️ NUNCA exponha o service_role_key no frontend!
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl) {
  throw new Error('NEXT_PUBLIC_SUPABASE_URL não configurada')
}

if (!supabaseServiceRoleKey) {
  throw new Error(
    'SUPABASE_SERVICE_ROLE_KEY não configurada. '
    + 'Essa variável NÃO deve ter prefixo NEXT_PUBLIC_.'
  )
}

// Cliente com privilégios administrativos (bypassa RLS)
export const adminSupabase = createClient<any>(
  supabaseUrl,
  supabaseServiceRoleKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)
