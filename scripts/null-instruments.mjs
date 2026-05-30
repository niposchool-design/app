// Zera image_url e thumbnail_url dos instrumentos listados em NAMES (volta ao ícone neutro).
// Uso: node scripts/null-instruments.mjs
import { readFileSync } from 'node:fs'

const REF = 'tqlwkgiytdikumtcnizf' // PRODUÇÃO
const ENV = 'D:/projetos/diversos/nipo_school/.env'
const token = readFileSync(ENV, 'utf8')
  .split(/\r?\n/).find(l => l.startsWith('SUPABASE_TOKEN='))
  ?.replace('SUPABASE_TOKEN=', '').replace(/^"|"$/g, '').trim()
if (!token) { console.error('SUPABASE_TOKEN não encontrado'); process.exit(1) }

// Madeiras (colagem bagunçada — regenerar individualmente)
const NAMES = [
  'Saxofone', 'Saxofone Alto', 'Saxofone Tenor', 'Saxofone Soprano',
  'Saxofone Barítono', 'Clarinete', 'Clarinete Baixo', 'Oboé',
  'Corne Inglês', 'Fagote', 'Contrafagote', 'Flauta',
  'Flauta Doce (Recorder)', 'Piccolo',
]

const esc = s => s.replace(/'/g, "''")
const inList = NAMES.map(n => `'${esc(n)}'`).join(',')
const sql = `update core.instruments set image_url=null, thumbnail_url=null, updated_at=now() where name in (${inList});`
const verify = `select name, image_url, thumbnail_url from core.instruments where name in (${inList}) order by name;`

async function q(s) {
  const r = await fetch(`https://api.supabase.com/v1/projects/${REF}/database/query`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: s }),
  })
  return { ok: r.ok, body: await r.text() }
}

const up = await q(sql)
console.log('NULL ->', up.ok ? 'OK' : up.body)
const v = await q(verify)
const rows = JSON.parse(v.body)
console.log(`VERIFY (${rows.length} linhas):`)
for (const r of rows) console.log(`  ${r.name}: img=${r.image_url} thumb=${r.thumbnail_url}`)
