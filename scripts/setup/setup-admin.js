import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bvmvqddrywipggvuziph.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2bXZxZGRyeXdpcGdndnV6aXBoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI3NDk4MzYsImV4cCI6MjA0ODMyNTgzNn0.dDkdmpJ8xPLRaIEFTYJgkK9jYyaM9DQ1j4g1qp3I_qQ'

const supabase = createClient(supabaseUrl, supabaseKey)

async function setupAdminUser() {
  const email = 'junior.sax@gmail.com'
  
  console.log('🔧 Configurando usuário admin...\n')
  
  try {
    // 1. Verificar se o usuário existe
    console.log('1️⃣ Verificando se usuário existe...')
    const { data: existing, error: checkError } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', email)
      .single()
    
    if (checkError && checkError.code !== 'PGRST116') {
      throw checkError
    }
    
    if (existing) {
      console.log('✅ Usuário encontrado no banco')
      console.log('   ID:', existing.id)
      console.log('   Email:', existing.email)
      console.log('   Nome:', existing.full_name)
      console.log('   Role ATUAL:', existing.tipo_usuario)
      
      // 2. Atualizar para admin
      console.log('\n2️⃣ Atualizando role para admin...')
      const { data: updated, error: updateError } = await supabase
        .from('profiles')
        .update({ 
          tipo_usuario: 'admin',
          full_name: existing.full_name || 'Administrador',
          updated_at: new Date().toISOString()
        })
        .eq('email', email)
        .select()
        .single()
      
      if (updateError) throw updateError
      
      console.log('✅ Role atualizado com sucesso!')
      console.log('   Novo role:', updated.tipo_usuario)
      
    } else {
      console.log('⚠️  Usuário NÃO encontrado no banco')
      console.log('   Você precisa fazer signup primeiro na aplicação')
      console.log('   Acesse: http://localhost:3001/signup')
      console.log('   Depois execute este script novamente')
      return
    }
    
    // 3. Verificar atualização
    console.log('\n3️⃣ Verificando atualização...')
    const { data: final, error: finalError } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', email)
      .single()
    
    if (finalError) throw finalError
    
    console.log('\n✅ CONFIGURAÇÃO COMPLETA!')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('📧 Email:', final.email)
    console.log('👤 Nome:', final.full_name)
    console.log('🎭 Role:', final.tipo_usuario.toUpperCase())
    console.log('🆔 ID:', final.id)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    
    console.log('\n⚠️  PRÓXIMOS PASSOS:')
    console.log('1. Acesse: http://localhost:3001/')
    console.log('2. Faça LOGOUT')
    console.log('3. Faça LOGIN novamente')
    console.log('4. A sidebar deve mostrar o menu de ADMIN')
    
  } catch (error) {
    console.error('\n❌ ERRO:', error.message)
    if (error.details) console.error('   Detalhes:', error.details)
    if (error.hint) console.error('   Dica:', error.hint)
  }
}

setupAdminUser().then(() => process.exit())
