'use client'

import { useEffect, useState, useMemo } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Search, Music } from 'lucide-react'
import Link from 'next/link'
import type { Tables } from '@/lib/supabase/database.types'

type Instrument = Tables<'v_instruments'>

/* Famílias canônicas — cor + kanji + ordem editorial. Fallback para qualquer outra. */
const FAMILIES: Record<string, { color: string; kanji: string }> = {
  'Cordas': { color: '#dc2626', kanji: '弦' },
  'Madeiras': { color: '#d97706', kanji: '木管' },
  'Metais': { color: '#ea580c', kanji: '金管' },
  'Teclados': { color: '#7c3aed', kanji: '鍵盤' },
  'Percussão': { color: '#0284c7', kanji: '打' },
  'Percussão Melódica': { color: '#0d9488', kanji: '旋' },
  'Sopro Livre': { color: '#16a34a', kanji: '笛' },
  'Eletrônicos': { color: '#c026d3', kanji: '電' },
  'Voz': { color: '#e11d8f', kanji: '声' },
}
const FAMILY_ORDER = Object.keys(FAMILIES)
const fam = (f: string | null) => FAMILIES[f || ''] || { color: '#78716c', kanji: '楽' }

export default function InstrumentsPage() {
  const [instruments, setInstruments] = useState<Instrument[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [activeFamily, setActiveFamily] = useState('Todos')

  useEffect(() => {
    async function load() {
      try {
        const { data } = await supabase.from('v_instruments').select('*').order('display_order')
        if (data) setInstruments(data as Instrument[])
      } catch (e) { console.error(e) } finally { setLoading(false) }
    }
    load()
  }, [])

  const families = useMemo(() => {
    const present = [...new Set(instruments.map(i => i.family).filter(Boolean))] as string[]
    return present.sort((a, b) => {
      const ia = FAMILY_ORDER.indexOf(a), ib = FAMILY_ORDER.indexOf(b)
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib)
    })
  }, [instruments])

  const filtered = useMemo(() => instruments.filter(i => {
    const q = search.toLowerCase()
    const ms = !q || i.name.toLowerCase().includes(q) || (i.family || '').toLowerCase().includes(q) || (i.origin || '').toLowerCase().includes(q)
    return ms && (activeFamily === 'Todos' || i.family === activeFamily)
  }), [instruments, search, activeFamily])

  const groups = useMemo(() => {
    const fams = activeFamily === 'Todos' ? families : [activeFamily]
    return fams.map(f => ({ family: f, items: filtered.filter(i => i.family === f) })).filter(g => g.items.length)
  }, [filtered, families, activeFamily])

  return (
    <div className="space-y-8 pb-12">
      {/* ===== Masthead editorial ===== */}
      <header className="relative overflow-hidden rounded-3xl bg-stone-950 text-white px-6 py-12 md:px-12 md:py-16">
        <span aria-hidden className="pointer-events-none absolute -right-2 top-1/2 -translate-y-1/2 font-extrabold text-white/[0.05] select-none leading-none"
          style={{ writingMode: 'vertical-rl', fontSize: '11rem' }}>楽器</span>
        <div className="pointer-events-none absolute -left-16 -top-16 w-72 h-72 rounded-full bg-student/20 blur-3xl" />
        <div className="relative z-10 max-w-2xl">
          <p className="text-student tracking-[0.35em] text-xs font-semibold uppercase mb-4">楽器 · Galeria</p>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.05]">Os instrumentos<br />da Nipo School.</h1>
          <p className="mt-5 text-stone-400 text-lg">
            <span className="nw-tabular text-white font-semibold">{instruments.length}</span> instrumentos — som, história, técnica e cultura.
          </p>
        </div>
      </header>

      {/* ===== Busca + filtro ===== */}
      <div className="flex flex-col gap-4">
        <div className="relative max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Buscar por nome, família ou origem..."
            className="w-full pl-11 pr-4 py-3.5 bg-white border border-stone-200 rounded-full text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-student/20 focus:border-student/40" />
        </div>
        {families.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
            <Chip label="Todos" active={activeFamily === 'Todos'} onClick={() => setActiveFamily('Todos')} />
            {families.map(f => <Chip key={f} label={f} color={fam(f).color} active={activeFamily === f} onClick={() => setActiveFamily(f)} />)}
          </div>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => <div key={i} className="aspect-[4/5] bg-stone-200 rounded-xl animate-pulse" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-stone-400"><Music className="w-12 h-12 mx-auto mb-3 opacity-40" /><p>Nenhum instrumento encontrado.</p></div>
      ) : (
        <div className="space-y-14">
          {groups.map(({ family, items }, gi) => {
            const c = fam(family)
            return (
              <section key={family}>
                {/* cabeçalho editorial da família */}
                <div className="flex items-baseline gap-4 mb-6 pb-3 border-b-2" style={{ borderColor: c.color }}>
                  <span className="font-extrabold leading-none select-none" style={{ color: c.color, fontSize: '2rem' }} aria-hidden>{c.kanji}</span>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900 capitalize">{family}</h2>
                  <span className="nw-tabular ml-auto text-sm text-stone-400">{String(gi + 1).padStart(2, '0')} · <span className="text-stone-600">{items.length}</span></span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {items.map((it, i) => <Card key={it.id} it={it} index={i + 1} color={c.color} />)}
                </div>
              </section>
            )
          })}
        </div>
      )}
    </div>
  )
}

function Chip({ label, active, onClick, color }: { label: string; active: boolean; onClick: () => void; color?: string }) {
  return (
    <button onClick={onClick}
      className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium capitalize transition-all border ${active ? 'text-white border-transparent' : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'}`}
      style={active ? { background: color || '#0c0a09' } : undefined}>
      {label}
    </button>
  )
}

function Card({ it, index, color }: { it: Instrument; index: number; color: string }) {
  const thumb = (it as any).thumbnail_url || it.image_url
  return (
    <Link href={`/instruments/${it.id}`} className="group">
      <figure className="relative overflow-hidden rounded-xl bg-stone-100 shadow-sm">
        <div className="aspect-[4/5]">
          {thumb
            ? <img src={thumb} alt={it.name} className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-700 ease-out" />
            : <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-stone-100 to-stone-200"><Music className="w-10 h-10 text-stone-300" /></div>}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/15 to-transparent" />
        <span className="nw-tabular absolute top-3 left-3 text-[11px] font-semibold text-white/80">{String(index).padStart(2, '0')}</span>
        {it.difficulty_level != null && (
          <span className="nw-tabular absolute top-3 right-3 text-[11px] font-semibold text-white px-1.5 py-0.5 rounded" style={{ background: color }}>{it.difficulty_level}/5</span>
        )}
        <figcaption className="absolute inset-x-0 bottom-0 p-3.5">
          <h3 className="text-white font-bold leading-tight drop-shadow-sm">{it.name}</h3>
          {(it.origin || it.category) && <p className="text-white/60 text-[11px] mt-0.5 truncate">{it.origin || it.category}</p>}
        </figcaption>
      </figure>
    </Link>
  )
}
