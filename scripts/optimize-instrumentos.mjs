// Converte os PNG/JPG salvos em public/instrumentos/ para .webp (otimizados).
// Uso: node scripts/optimize-instrumentos.mjs
// - foto principal (<slug>.png)  -> larg. máx 1200, q82
// - detalhes (<slug>-detalhe-N)  -> larg. máx 1200, q82
// Remove o arquivo de origem após converter. Idempotente.
import sharp from 'sharp'
import { readdir, stat, unlink } from 'node:fs/promises'
import { join, extname, basename } from 'node:path'

const DIR = join(process.cwd(), 'public', 'instrumentos')
const SRC = new Set(['.png', '.jpg', '.jpeg'])

const files = await readdir(DIR)
let done = 0
for (const f of files) {
  const ext = extname(f).toLowerCase()
  if (!SRC.has(ext)) continue
  const src = join(DIR, f)
  const out = join(DIR, basename(f, ext) + '.webp')
  await sharp(src)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(out)
  const { size } = await stat(out)
  await unlink(src)
  console.log(`${f} -> ${basename(out)}  (${Math.round(size / 1024)} KB)`)
  done++
}
console.log(`\n${done} imagem(ns) otimizada(s).`)
