'use client'

import { useEffect, useState, useMemo } from 'react'
import { supabase } from '@/lib/supabase/client'
import { PermissionGate } from '@/components/auth/PermissionGate'
import { Music, Plus, Search, FileMusic, Clock, Gauge, KeyRound, Users } from 'lucide-react'
import Link from 'next/link'
import type { Tables } from '@/lib/supabase/database.types'

type Repertoire = Tables<'v_repertoire'>
interface Category { id: string; name: string; description: string | null; order_index: number | null }

const db = supabase as any
const ACCENT = '#dc2626'

/* difficulty_level pode vir como enum (beginner...) ou número legado — normaliza para rótulo PT-BR. */
const DIFF_LABEL: Record<string, string> = {
  beginner: 'Iniciante', intermediate: 'Intermediário', advanced: 'Avançado', expert: 'Expert',
  '1': 'Fácil', '2': 'Médio', '3': 'Difícil', '4': 'Expert', '5': 'Lendário',
}
const diffLabel = (d: unknown) => (d == null ? null : DIFF_LABEL[String(d)] || String(d))

/* required_instruments / tags chegam como Json — pode ser array de strings ou de objetos. */
function toStrList(raw: unknown): string[] {
  if (!raw) return []
  const arr = Array.isArray(raw) ? raw : [raw]
  return arr
    .map((v) => {
      if (typeof v === 'string') return v
      if (v && typeof v === 'object') return (v as any).name || (v as any).instrument || (v as any).label || ''
      return v == null ? '' : String(v)
    })
    .filter(Boolean)
}

export default function RepertoirePage() {
  const [items, setItems] = useState<Repertoire[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [activeCat, setActiveCat] = useState('Todos')

  useEffect(() => {
    async function load() {
      try {
        const [rep, cat] = await Promise.all([
          supabase.from('v_repertoire').select('*').order('title'),
          db.from('v_repertoire_categories').select('*').order('order_index'),
        ])
        if (rep.data) setItems(rep.data as Repertoire[])
        if (cat.data) setCategories(cat.data as Category[])
      } catch (error) {
        console.error('Error loading repertoire:', error)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  /* categorias presentes nos itens, na ordem do catálogo (order_index) */
  const cats = useMemo(() => {
    const present = new Set(items.map((i) => i.category_name).filter(Boolean) as string[])
    const ordered = categories.map((c) => c.name).filter((n) => present.has(n))
    const extras = [...present].filter((n) => !ordered.includes(n))
    return [...ordered, ...extras]
  }, [items, categories])

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return items.filter((i) => {
      const ms =
        !q ||
        i.title.toLowerCase().includes(q) ||
        (i.composer || '').toLowerCase().includes(q) ||
        (i.arranger || '').toLowerCase().includes(q) ||
        toStrList(i.tags).some((t) => t.toLowerCase().includes(q))
      return ms && (activeCat === 'Todos' || i.category_name === activeCat)
    })
  }, [items, search, activeCat])

  const groups = useMemo(() => {
    const names = activeCat === 'Todos' ? cats : [activeCat]
    const list = names
      .map((name) => ({ name, items: filtered.filter((i) => i.category_name === name) }))
      .filter((g) => g.items.length)
    const semCat = filtered.filter((i) => !i.category_name)
    if (semCat.length && (activeCat === 'Todos')) list.push({ name: 'Sem categoria', items: semCat })
    return list
  }, [filtered, cats, activeCat])

  return (
    <div className="space-y-8 pb-12">
      {/* ===== Masthead editorial ===== */}
      <header className="relative overflow-hidden rounded-3xl bg-stone-950 text-white px-6 py-12 md:px-12 md:py-16">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-2 top-1/2 -translate-y-1/2 font-extrabold text-white/[0.05] select-none leading-none"
          style={{ writingMode: 'vertical-rl', fontSize: '11rem' }}
        >
          楽曲
        </span>
        <div className="pointer-events-none absolute -left-16 -top-16 w-72 h-72 rounded-full blur-3xl" style={{ background: `${ACCENT}33` }} />
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center justify-between gap-4 mb-4">
            <p className="tracking-[0.35em] text-xs font-semibold uppercase" style={{ color: ACCENT }}>楽曲 · Repertório</p>
            <PermissionGate permission="repertoire.create">
              <Link
                href="/repertoire/new"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: ACCENT }}
              >
                <Plus className="w-4 h-4" /> Novo
              </Link>
            </PermissionGate>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.05]">O repertório<br />da Nipo School.</h1>
          <p className="mt-5 text-stone-400 text-lg">
            <span className="nw-tabular text-white font-semibold">{items.length}</span> peças — partituras, cifras, playback e tutoriais.
          </p>
        </div>
      </header>

      {/* ===== Busca + filtro ===== */}
      <div className="flex flex-col gap-4">
        <div className="relative max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por título, compositor, arranjador ou tag..."
            className="w-full pl-11 pr-4 py-3.5 bg-white border border-stone-200 rounded-full text-sm shadow-sm focus:outline-none focus:ring-2 focus:border-transparent"
            style={{ ['--tw-ring-color' as any]: `${ACCENT}33` }}
          />
        </div>
        {cats.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
            <Chip label="Todos" active={activeCat === 'Todos'} onClick={() => setActiveCat('Todos')} />
            {cats.map((c) => (
              <Chip key={c} label={c} active={activeCat === c} onClick={() => setActiveCat(c)} />
            ))}
          </div>
        )}
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-44 bg-stone-200 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-stone-400">
          <FileMusic className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p>{search || activeCat !== 'Todos' ? 'Nenhum resultado encontrado.' : 'Repertório vazio.'}</p>
        </div>
      ) : (
        <div className="space-y-14">
          {groups.map(({ name, items: groupItems }, gi) => (
            <section key={name}>
              {/* cabeçalho editorial da categoria */}
              <div className="flex items-baseline gap-4 mb-6 pb-3 border-b-2" style={{ borderColor: ACCENT }}>
                <span className="font-extrabold leading-none select-none" style={{ color: ACCENT, fontSize: '2rem' }} aria-hidden>
                  曲
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900">{name}</h2>
                <span className="nw-tabular ml-auto text-sm text-stone-400">
                  {String(gi + 1).padStart(2, '0')} · <span className="text-stone-600">{groupItems.length}</span>
                </span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {groupItems.map((it) => (
                  <Card key={it.id} it={it} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}

function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all border ${
        active ? 'text-white border-transparent' : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
      }`}
      style={active ? { background: ACCENT } : undefined}
    >
      {label}
    </button>
  )
}

function Card({ it }: { it: Repertoire }) {
  const instruments = toStrList(it.required_instruments)
  const tags = toStrList(it.tags)
  const diff = diffLabel(it.difficulty_level)

  return (
    <Link href={`/repertoire/${it.id}`} className="group block nw-rise">
      <article className="nw-card h-full bg-white rounded-2xl border border-stone-100 p-5 shadow-sm transition-all hover:shadow-md hover:border-stone-300 flex flex-col">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${ACCENT}14`, color: ACCENT }}>
            <Music className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-stone-900 leading-tight group-hover:text-stone-700">{it.title}</h3>
            {(it.composer || it.arranger) && (
              <p className="text-xs text-stone-400 mt-0.5 truncate">
                {it.composer}
                {it.arranger && <span> · arr. {it.arranger}</span>}
              </p>
            )}
          </div>
          {diff && (
            <span className="shrink-0 text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ background: `${ACCENT}14`, color: ACCENT }}>
              {diff}
            </span>
          )}
        </div>

        {/* metadados em mono */}
        {(it.tempo || it.key_signature || it.estimated_duration || it.min_participants != null) && (
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-4 text-xs text-stone-500">
            {it.key_signature && (
              <span className="inline-flex items-center gap-1">
                <KeyRound className="w-3.5 h-3.5 text-stone-300" />
                <span className="nw-tabular text-stone-700">{it.key_signature}</span>
              </span>
            )}
            {it.tempo && (
              <span className="inline-flex items-center gap-1">
                <Gauge className="w-3.5 h-3.5 text-stone-300" />
                <span className="nw-tabular text-stone-700">{it.tempo}</span>
              </span>
            )}
            {it.estimated_duration && (
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-stone-300" />
                <span className="nw-tabular text-stone-700">{it.estimated_duration}</span>
              </span>
            )}
            {it.min_participants != null && (
              <span className="inline-flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-stone-300" />
                <span className="nw-tabular text-stone-700">{it.min_participants}+</span>
              </span>
            )}
          </div>
        )}

        {instruments.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {instruments.slice(0, 5).map((ins, i) => (
              <span key={i} className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">
                {ins}
              </span>
            ))}
            {instruments.length > 5 && <span className="text-[11px] text-stone-400 px-1 py-0.5">+{instruments.length - 5}</span>}
          </div>
        )}

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-auto pt-4">
            {tags.slice(0, 4).map((t, i) => (
              <span key={i} className="text-[11px] px-2 py-0.5 rounded-full border border-stone-200 text-stone-400">
                #{t}
              </span>
            ))}
          </div>
        )}
      </article>
    </Link>
  )
}
