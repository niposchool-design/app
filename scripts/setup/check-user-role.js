const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://bvmvqddrywipggvuziph.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2bXZxZGRyeXdpcGdndnV6aXBoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI3NDk4MzYsImV4cCI6MjA0ODMyNTgzNn0.dDkdmpJ8xPLRaIEFTYJgkK9jYyaM9DQ1j4g1qp3I_qQ'

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkUser() {
  console.log('í´ Buscando usuÃ¡rio junior.sax@gmail.com...\n')
  
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('email', 'junior.sax@gmail.com')
    .single()
  
  if (error) {
    console.error('âŒ Erro:', error.message)
    return
  }
  
  if (!data) {
    console.log('âŒ UsuÃ¡rio nÃ£o encontrado na tabela profiles')
    return
  }
  
  console.log('âœ… UsuÃ¡rio encontrado:')
  console.log('í³§ Email:', data.email)
  console.log('í±¤ Nome:', data.full_name)
  console.log('í¾­ Role ATUAL:', data.tipo_usuario)
  console.log('í¶” ID:', data.id)
  console.log('\ní³‹ Dados completos:', JSON.stringify(data, null, 2))
}

checkUser().then(() => process.exit())
