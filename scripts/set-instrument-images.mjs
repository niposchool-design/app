// Atualiza image_url (colorida) e thumbnail_url (macro/lista) dos instrumentos
// via Supabase Management API, preservando UTF-8 (acentos) — evita o bug do curl.
// Edite o MAP por família e rode: node scripts/set-instrument-images.mjs
import { readFileSync } from 'node:fs'

const REF = 'tqlwkgiytdikumtcnizf' // PRODUÇÃO
const ENV = 'D:/projetos/diversos/nipo_school/.env'
const token = readFileSync(ENV, 'utf8')
  .split(/\r?\n/).find(l => l.startsWith('SUPABASE_TOKEN='))
  ?.replace('SUPABASE_TOKEN=', '').replace(/^"|"$/g, '').trim()
if (!token) { console.error('SUPABASE_TOKEN não encontrado'); process.exit(1) }

// [nome no banco, slug do arquivo]  (use matchMode 'like' p/ nomes com sufixo)
const MAP = [
  ['Saxofone', 'saxofone'],
  ['Saxofone Alto', 'saxofone-alto'],
  ['Saxofone Tenor', 'saxofone-tenor'],
  ['Saxofone Soprano', 'saxofone-soprano'],
  ['Saxofone Barítono', 'saxofone-baritono'],
  ['Clarinete', 'clarinete'],
]

const esc = s => s.replace(/'/g, "''")
const stmts = MAP.map(([name, slug]) =>
  `update core.instruments set image_url='/instrumentos/${slug}.webp', ` +
  `thumbnail_url='/instrumentos/${slug}-lista.webp', updated_at=now() ` +
  `where name='${esc(name)}';`
).join('\n')

const verify = `select name, image_url, thumbnail_url from core.instruments ` +
  `where name in (${MAP.map(([n]) => `'${esc(n)}'`).join(',')}) order by name;`

async function q(sql) {
  const r = await fetch(`https://api.supabase.com/v1/projects/${REF}/database/query`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: sql }),
  })
  const t = await r.text()
  return { ok: r.ok, body: t }
}

const up = await q(stmts)
console.log('UPDATE ->', up.ok ? 'OK' : up.body)
const v = await q(verify)
console.log('VERIFY ->')
for (const row of JSON.parse(v.body)) console.log(`  ${row.name}: img=${row.image_url} thumb=${row.thumbnail_url}`)
const missing = MAP.filter(([n]) => !JSON.parse(v.body).some(r => r.name === n))
if (missing.length) console.log('FALTANDO (nome não bateu):', missing.map(m => m[0]))
else console.log(`\nTodos os ${MAP.length} atualizados.`)
