import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: join(__dirname, '..', '.env.local') })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function checkAll() {
  // SEM filtro de ativo - ver TUDO
  const { data: periodos } = await supabase
    .from('historia_periodos')
    .select('*')

  const { data: compositores } = await supabase
    .from('historia_compositores')
    .select('*')

  const { data: obras } = await supabase
    .from('historia_obras')
    .select('*')

  const { data: generos } = await supabase
    .from('historia_generos')
    .select('*')

  console.log('\n========== TODOS OS PERÍODOS (sem filtro) ==========')
  console.log(`Total: ${periodos?.length || 0}`)
  periodos?.forEach(p => console.log(`  [${p.ativo ? '✓' : '✗'}] ${p.ordem_cronologica}. ${p.nome}`))

  console.log('\n========== TODOS COMPOSITORES (sem filtro) ==========')
  console.log(`Total: ${compositores?.length || 0}`)
  compositores?.forEach(c => console.log(`  [${c.ativo ? '✓' : '✗'}] ${c.nome_artistico || c.nome_completo}`))

  console.log('\n========== TODAS OBRAS (sem filtro) ==========')
  console.log(`Total: ${obras?.length || 0}`)
  obras?.forEach(o => console.log(`  [${o.ativo ? '✓' : '✗'}] ${o.titulo}`))

  console.log('\n========== TODOS GÊNEROS (sem filtro) ==========')
  console.log(`Total: ${generos?.length || 0}`)
  generos?.forEach(g => console.log(`  [${g.ativo ? '✓' : '✗'}] ${g.nome} (${g.slug})`))
  
  console.log('\n')
}

checkAll()
