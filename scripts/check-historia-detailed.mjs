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

async function checkHistoriaData() {
  // Buscar exatamente como o frontend faz
  const { data: periodos, error: errorPeriodos } = await supabase
    .from('historia_periodos')
    .select('*')
    .eq('ativo', true)
    .order('ordem_cronologica', { ascending: true })

  const { data: compositores, error: errorComp } = await supabase
    .from('historia_compositores')
    .select('*')
    .eq('ativo', true)

  const { data: obras, error: errorObras } = await supabase
    .from('historia_obras')
    .select('*')
    .eq('ativo', true)

  const { data: generos, error: errorGen } = await supabase
    .from('historia_generos')
    .select('*')
    .eq('ativo', true)

  console.log('\n========== PERÍODOS (ativo=true) ==========')
  if (errorPeriodos) {
    console.log('Erro:', errorPeriodos)
  } else {
    console.log(`Total: ${periodos?.length || 0}`)
    periodos?.forEach(p => console.log(`  ${p.ordem_cronologica}. ${p.nome} (${p.periodo_inicio}-${p.periodo_fim})`))
  }

  console.log('\n========== COMPOSITORES (ativo=true) ==========')
  if (errorComp) {
    console.log('Erro:', errorComp)
  } else {
    console.log(`Total: ${compositores?.length || 0}`)
    compositores?.forEach(c => console.log(`  - ${c.nome_artistico || c.nome_completo} (${c.pais_nascimento})`))
  }

  console.log('\n========== OBRAS (ativo=true) ==========')
  if (errorObras) {
    console.log('Erro:', errorObras)
  } else {
    console.log(`Total: ${obras?.length || 0}`)
    obras?.forEach(o => console.log(`  - ${o.titulo} (${o.ano_composicao})`))
  }

  console.log('\n========== GÊNEROS (ativo=true) ==========')
  if (errorGen) {
    console.log('Erro:', errorGen)
  } else {
    console.log(`Total: ${generos?.length || 0}`)
    generos?.forEach(g => console.log(`  - ${g.nome} (slug: ${g.slug})`))
  }
  
  console.log('\n')
}

checkHistoriaData()
