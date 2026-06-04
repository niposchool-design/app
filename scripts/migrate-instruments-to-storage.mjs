// Migra as imagens de instrumentos de public/ para o bucket Storage `instruments`
// e aponta image_url/thumbnail_url para as URLs públicas do Storage.
// - busca a service_role via Management API (PAT), sem expor o valor
// - faz upsert de cada <slug>.webp e <slug>-lista.webp presente na pasta
// - atualiza o banco (UTF-8 seguro)
// Uso: node scripts/migrate-instruments-to-storage.mjs
import { readFileSync, existsSync } from 'node:fs'
import { readdir } from 'node:fs/promises'
import { join } from 'node:path'

const REF = 'tqlwkgiytdikumtcnizf' // PRODUÇÃO
const URL = `https://${REF}.supabase.co`
const BUCKET = 'instruments'
const DIR = join(process.cwd(), 'public', 'instrumentos')
const ENV = 'D:/projetos/diversos/nipo_school/.env'

const pat = readFileSync(ENV, 'utf8')
  .split(/\r?\n/).find(l => l.startsWith('SUPABASE_TOKEN='))
  ?.replace('SUPABASE_TOKEN=', '').replace(/^"|"$/g, '').trim()
if (!pat) { console.error('PAT (SUPABASE_TOKEN) não encontrado'); process.exit(1) }

// 1) service_role via Management API
const keysResp = await fetch(`https://api.supabase.com/v1/projects/${REF}/api-keys?reveal=true`, {
  headers: { Authorization: `Bearer ${pat}` },
})
const keys = await keysResp.json()
const serviceRole = Array.isArray(keys) ? keys.find(k => k.name === 'service_role')?.api_key : null
if (!serviceRole || serviceRole.includes('...')) {
  console.error('service_role não revelada. Resposta:', JSON.stringify(keys).slice(0, 300)); process.exit(1)
}
console.log(`service_role obtida (len=${serviceRole.length}, oculta).`)

// 2) instrumentos prontos (flauta-doce fica de fora: principal veio quebrada)
// Lista do que já foi migrado (edite/expanda por família ao subir novas levas)
const DONE = [
  ['Sitar', 'sitar'],
]

const pub = f => `${URL}/storage/v1/object/public/${BUCKET}/${f}`

async function upload(file) {
  const path = join(DIR, file)
  if (!existsSync(path)) return { file, skipped: true }
  const body = readFileSync(path)
  const r = await fetch(`${URL}/storage/v1/object/${BUCKET}/${file}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${serviceRole}`,
      apikey: serviceRole,
      'Content-Type': 'image/webp',
      'x-upsert': 'true',
    },
    body,
  })
  return { file, ok: r.ok, status: r.status, msg: r.ok ? '' : await r.text() }
}

// 3) sobe todos os webp da pasta (inclui flauta-doce-lista, se houver)
const files = (await readdir(DIR)).filter(f => f.endsWith('.webp'))
console.log(`\nSubindo ${files.length} arquivos para bucket '${BUCKET}'...`)
let okc = 0
for (const f of files) {
  const r = await upload(f)
  if (r.ok) { okc++; }
  else console.log(`  FALHA ${f}: ${r.status} ${r.msg}`)
}
console.log(`upload: ${okc}/${files.length} ok`)

// 4) atualiza o banco (Management API SQL, acentos seguros via JSON.stringify)
const esc = s => s.replace(/'/g, "''")
const stmts = DONE.map(([name, slug]) =>
  `update core.instruments set image_url='${pub(slug + '.webp')}', ` +
  `thumbnail_url='${pub(slug + '-lista.webp')}', updated_at=now() where name='${esc(name)}';`
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
console.log('\nDB update ->', up.ok ? 'OK' : up.body)
const v = await sql(`select name, image_url from core.instruments where name in (${DONE.map(([n]) => `'${esc(n)}'`).join(',')}) order by name;`)
for (const row of JSON.parse(v.body)) console.log(`  ${row.name}: ${row.image_url}`)
