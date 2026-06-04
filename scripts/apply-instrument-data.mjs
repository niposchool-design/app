// Aplica scripts/instrument-data.json em core.instruments (Management API, UTF-8 seguro).
// Atualiza family, category, origin, difficulty_level, description, is_active por name.
import { readFileSync } from 'node:fs'

const REF = 'tqlwkgiytdikumtcnizf'
const ENV = 'D:/projetos/diversos/nipo_school/.env'
const pat = readFileSync(ENV, 'utf8').split(/\r?\n/).find(l => l.startsWith('SUPABASE_TOKEN='))
  ?.replace('SUPABASE_TOKEN=', '').replace(/^"|"$/g, '').trim()
if (!pat) { console.error('PAT não encontrado'); process.exit(1) }

const data = JSON.parse(readFileSync(new URL('./instrument-data.json', import.meta.url), 'utf8'))
const esc = s => String(s).replace(/'/g, "''")

const stmts = data.map(d =>
  `update core.instruments set family='${esc(d.family)}', category='${esc(d.category)}', ` +
  `origin='${esc(d.origin)}', difficulty_level=${Number(d.difficulty) || 'null'}, ` +
  `description='${esc(d.description)}', is_active=${d.active ? 'true' : 'false'}, updated_at=now() ` +
  `where name='${esc(d.name)}';`
).join('\n')

async function sql(q) {
  const r = await fetch(`https://api.supabase.com/v1/projects/${REF}/database/query`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${pat}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: q }),
  })
  return { ok: r.ok, body: await r.text() }
}

const up = await sql(stmts)
console.log('UPDATE ->', up.ok ? 'OK' : up.body)
const v = await sql("select family, count(*) n from core.instruments where is_active group by family order by n desc;")
console.log('Famílias (ativos):')
for (const r of JSON.parse(v.body)) console.log(`  ${r.family}: ${r.n}`)
const inactive = await sql("select count(*) n from core.instruments where not is_active;")
console.log('Inativos (escondidos):', JSON.parse(inactive.body)[0].n)
