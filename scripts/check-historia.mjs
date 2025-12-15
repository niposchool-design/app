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
  const [periodos, compositores, obras, generos] = await Promise.all([
    supabase.from('historia_periodos').select('*'),
    supabase.from('historia_compositores').select('*'),
    supabase.from('historia_obras').select('*'),
    supabase.from('historia_generos').select('*')
  ])

  console.log('\n========== PERÍODOS ==========')
  console.log(`Total: ${periodos.data?.length || 0}`)
  periodos.data?.forEach(p => console.log(`- ${p.nome} (ordem: ${p.ordem_cronologica})`))

  console.log('\n========== COMPOSITORES ==========')
  console.log(`Total: ${compositores.data?.length || 0}`)
  compositores.data?.forEach(c => console.log(`- ${c.nome_artistico || c.nome_completo} (${c.pais_nascimento})`))

  console.log('\n========== OBRAS ==========')
  console.log(`Total: ${obras.data?.length || 0}`)
  obras.data?.forEach(o => console.log(`- ${o.titulo} (${o.ano_composicao})`))

  console.log('\n========== GÊNEROS ==========')
  console.log(`Total: ${generos.data?.length || 0}`)
  generos.data?.forEach(g => console.log(`- ${g.nome} (${g.slug})`))
  
  console.log('\n')
}

checkHistoriaData()
