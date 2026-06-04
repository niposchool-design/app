'use client'

import { useEffect, useState, useMemo } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Search, BookOpen, Users, Music, Sparkles, Layers, Clock, ScrollText, Lightbulb, X, MapPin } from 'lucide-react'
import Link from 'next/link'
import type { Tables } from '@/lib/supabase/database.types'

type Period = Tables<'v_history_periods'>
interface Movement { id: string; name: string; description: string | null; start_year: number | null; end_year: number | null; main_locations: any; manifesto: string | null; characteristics: any; composers: any; iconic_works: any; historical_context: string | null; legacy: string | null; image_url: string | null }

const db = supabase as any

/* normaliza jsonb/text -> array de strings */
function toList(v: any): string[] {
  if (!v) return []
  if (Array.isArray(v)) return v.map(x => typeof x === 'string' ? x : (x?.name || x?.title || x?.label || String(x))).filter(Boolean)
  if (typeof v === 'string') return v.split(/[;\n]+/).map(s => s.trim()).filter(Boolean)
  return []
}

/* contadores globais — view + ícone + rótulo */
const GLOBAL_VIEWS: { view: string; icon: any; label: string }[] = [
  { view: 'v_history_composers', icon: Users, label: 'Compositores' },
  { view: 'v_history_works', icon: Music, label: 'Obras' },
  { view: 'v_history_genres', icon: Sparkles, label: 'Gêneros' },
  { view: 'v_history_movements', icon: Layers, label: 'Movimentos' },
  { view: 'v_history_timeline_events', icon: Clock, label: 'Eventos' },
  { view: 'v_history_cultural_contexts', icon: ScrollText, label: 'Contextos' },
  { view: 'v_history_theory_concepts', icon: Lightbulb, label: 'Conceitos' },
]

export default function HistoryPage() {
  const [periods, setPeriods] = useState<Period[]>([])
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [movements, setMovements] = useState<Movement[]>([])
  const [openMov, setOpenMov] = useState<Movement | null>(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    async function load() {
      try {
        const { data } = await supabase
          .from('v_history_periods')
          .select('*')
          .order('chronological_order')
        if (data) setPeriods(data as Period[])

        const results = await Promise.all(
          GLOBAL_VIEWS.map(g =>
            db.from(g.view).select('*', { count: 'exact', head: true })
          )
        )
        const c: Record<string, number> = {}
        GLOBAL_VIEWS.forEach((g, i) => { c[g.view] = results[i]?.count ?? 0 })
        setCounts(c)

        const { data: mv } = await db.from('v_history_movements').select('*').order('start_year')
        if (mv) setMovements(mv as Movement[])
      } catch (error) {
        console.error('Error loading history:', error)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return periods
    return periods.filter(p =>
      p.name?.toLowerCase().includes(q) ||
      (p.description || '').toLowerCase().includes(q) ||
      String(p.start_year || '').includes(q) ||
      String(p.end_year || '').includes(q)
    )
  }, [periods, search])

  const totalGlobals = GLOBAL_VIEWS.filter(g => (counts[g.view] ?? 0) > 0)

  return (
    <div className="space-y-8 pb-12">
      {/* ===== Masthead editorial ===== */}
      <header className="relative overflow-hidden rounded-3xl bg-stone-950 text-white px-6 py-12 md:px-12 md:py-16">
        <span aria-hidden className="pointer-events-none absolute -right-2 top-1/2 -translate-y-1/2 font-extrabold text-white/[0.05] select-none leading-none"
          style={{ writingMode: 'vertical-rl', fontSize: '11rem' }}>音楽史</span>
        <div className="pointer-events-none absolute -left-16 -top-16 w-72 h-72 rounded-full bg-amber-500/20 blur-3xl" />
        <div className="relative z-10 max-w-2xl">
          <p className="text-amber-400 tracking-[0.35em] text-xs font-semibold uppercase mb-4">音楽史 · História</p>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.05]">A história<br />da música.</h1>
          <p className="mt-5 text-stone-400 text-lg">
            <span className="nw-tabular text-white font-semibold">{periods.length}</span> períodos — compositores, obras, gêneros e movimentos que moldaram o som.
          </p>
        </div>
      </header>

      {/* ===== Contadores globais ===== */}
      {totalGlobals.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
          {totalGlobals.map(g => {
            const Icon = g.icon
            return (
              <div key={g.view} className="nw-card p-4 text-center">
                <div className="w-9 h-9 rounded-xl mx-auto mb-2 flex items-center justify-center bg-amber-50 text-amber-600">
                  <Icon className="w-4 h-4" />
                </div>
                <p className="nw-tabular text-xl font-bold text-stone-900">{counts[g.view]}</p>
                <p className="text-xs text-stone-500">{g.label}</p>
              </div>
            )
          })}
        </div>
      )}

      {/* ===== Busca ===== */}
      <div className="relative max-w-xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Buscar período por nome, descrição ou ano..."
          className="w-full pl-11 pr-4 py-3.5 bg-white border border-stone-200 rounded-full text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/40" />
      </div>

      {/* ===== Linha do tempo dos períodos ===== */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => <div key={i} className="h-32 bg-stone-200 rounded-2xl animate-pulse" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-stone-400"><BookOpen className="w-12 h-12 mx-auto mb-3 opacity-40" /><p>Nenhum período encontrado.</p></div>
      ) : (
        <div className="relative">
          {/* eixo vertical */}
          <div className="absolute left-[1.45rem] md:left-6 top-2 bottom-2 w-0.5 bg-stone-200" />
          <div className="space-y-6">
            {filtered.map((period, idx) => {
              const color = period.theme_color || '#78716c'
              return (
                <Link key={period.id} href={`/history/${period.id}`} className="block group">
                  <div className="flex gap-4 md:gap-5 relative">
                    {/* marcador do eixo */}
                    <div
                      className="nw-tabular w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xs z-10 shrink-0 shadow-md"
                      style={{ backgroundColor: color }}
                    >
                      {period.start_year}
                    </div>

                    {/* card retrato editorial */}
                    <div className="flex-1 overflow-hidden rounded-2xl bg-white border border-stone-100 shadow-sm hover:shadow-lg transition-all"
                      style={{ borderLeftWidth: 4, borderLeftColor: color }}>
                      <div className="flex flex-col sm:flex-row">
                        {/* capa */}
                        {period.cover_image_url ? (
                          <div className="sm:w-44 md:w-52 shrink-0 overflow-hidden bg-stone-100">
                            <div className="aspect-[16/9] sm:h-full sm:aspect-auto">
                              <img src={period.cover_image_url} alt={period.name}
                                className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-700 ease-out" />
                            </div>
                          </div>
                        ) : null}
                        <div className="flex-1 p-5">
                          <div className="flex items-baseline gap-3 mb-1">
                            <span className="nw-tabular text-xs text-stone-400">{String(idx + 1).padStart(2, '0')}</span>
                            <h3 className="font-extrabold text-lg md:text-xl text-stone-900 leading-tight">{period.name}</h3>
                          </div>
                          <p className="nw-tabular text-sm font-medium" style={{ color }}>
                            {period.start_year}{period.end_year ? ` – ${period.end_year}` : ' – presente'}
                          </p>
                          {period.description && (
                            <p className="text-sm text-stone-500 mt-2 line-clamp-2 leading-relaxed">{period.description}</p>
                          )}
                          <div className="flex items-center gap-4 mt-3 text-xs text-stone-400">
                            <span className="inline-flex items-center gap-1"><Users className="w-3.5 h-3.5" /><span className="nw-tabular">{period.composer_count || 0}</span> compositores</span>
                            <span className="inline-flex items-center gap-1"><Music className="w-3.5 h-3.5" /><span className="nw-tabular">{period.work_count || 0}</span> obras</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {/* ===== Movimentos (não pertencem a um período) ===== */}
      {movements.length > 0 && (
        <section>
          <div className="flex items-baseline gap-4 mb-6 pb-3 border-b-2 border-amber-500">
            <span className="font-extrabold leading-none select-none text-amber-600" style={{ fontSize: '2rem' }} aria-hidden>運動</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900">Movimentos</h2>
            <span className="nw-tabular ml-auto text-sm text-stone-400">{movements.length}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {movements.map(m => (
              <button key={m.id} onClick={() => setOpenMov(m)} className="text-left nw-card overflow-hidden hover:shadow-lg transition-all">
                {m.image_url && (
                  <div className="aspect-[16/9] bg-stone-100 overflow-hidden">
                    <img src={m.image_url} alt={m.name} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-bold text-stone-900">{m.name}</h3>
                  {(m.start_year || m.end_year) && (
                    <p className="nw-tabular text-sm text-amber-600 mt-0.5">{m.start_year}{m.end_year ? ` – ${m.end_year}` : ''}</p>
                  )}
                  {toList(m.main_locations).length > 0 && (
                    <p className="text-xs text-stone-400 mt-1 inline-flex items-center gap-1"><MapPin className="w-3 h-3" />{toList(m.main_locations).join(', ')}</p>
                  )}
                  {m.description && <p className="text-sm text-stone-500 mt-2 line-clamp-2">{m.description}</p>}
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Modal de movimento */}
      {openMov && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={() => setOpenMov(null)}>
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            {openMov.image_url && (
              <div className="aspect-[16/7] bg-stone-100 overflow-hidden rounded-t-3xl">
                <img src={openMov.image_url} alt={openMov.name} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-stone-900">{openMov.name}</h2>
                  {(openMov.start_year || openMov.end_year) && <p className="nw-tabular text-sm text-amber-600">{openMov.start_year}{openMov.end_year ? ` – ${openMov.end_year}` : ''}</p>}
                </div>
                <button onClick={() => setOpenMov(null)} className="p-2 rounded-full hover:bg-stone-100 text-stone-400 shrink-0"><X className="w-5 h-5" /></button>
              </div>
              {openMov.description && <p className="text-sm text-stone-600 leading-relaxed">{openMov.description}</p>}
              {openMov.manifesto && <MovBlock title="Manifesto" text={openMov.manifesto} />}
              {openMov.characteristics && <MovBlock title="Características" text={openMov.characteristics} />}
              {openMov.historical_context && <MovBlock title="Contexto histórico" text={openMov.historical_context} />}
              {openMov.legacy && <MovBlock title="Legado" text={openMov.legacy} />}
              {toList(openMov.composers).length > 0 && <MovChips title="Compositores" items={toList(openMov.composers)} />}
              {toList(openMov.iconic_works).length > 0 && <MovChips title="Obras icônicas" items={toList(openMov.iconic_works)} />}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function MovBlock({ title, text }: { title: string; text: any }) {
  const t = typeof text === 'string' ? text : toList(text).join(', ')
  if (!t) return null
  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-1">{title}</h3>
      <p className="text-sm text-stone-600 leading-relaxed whitespace-pre-wrap">{t}</p>
    </div>
  )
}
function MovChips({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-1.5">{title}</h3>
      <div className="flex flex-wrap gap-1.5">
        {items.map((it, i) => <span key={i} className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-full">{it}</span>)}
      </div>
    </div>
  )
}
