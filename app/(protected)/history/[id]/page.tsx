'use client'

import { useEffect, useState, useMemo } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import {
  ArrowLeft, User, Music, Calendar, Users, Sparkles, Layers, Clock,
  ScrollText, Lightbulb, Trophy, Play, ChevronRight, CheckCircle2, XCircle,
  Globe, BookOpen, Star, Wrench,
} from 'lucide-react'
import Link from 'next/link'
import type { Tables } from '@/lib/supabase/database.types'

type Period = Tables<'v_history_periods'>
type Composer = Tables<'v_history_composers'>
type Work = Tables<'v_history_works'>

interface CulturalContext { id: string; title: string; context_type: string | null; description: string | null; impact_on_music: string | null; start_year: number | null; end_year: number | null; images_url: string | null }
interface TimelineEvent { id: string; year: number; title: string; event_type: string | null; category: string | null; description: string | null; importance: number | null; image_url: string | null; composer_name: string | null; work_title: string | null }
interface Genre { id: string; name: string; slug: string | null; origin_decade: string | null; origin_country: string | null; description: string | null; musical_characteristics: string | null; image_url: string | null; theme_color: string | null }
interface TheoryConcept { id: string; name: string; category: string | null; simple_definition: string | null; technical_definition: string | null; difficulty_level: number | null; diagram_url: string | null }
interface InstrumentEvolution { id: string; instrument_id: string | null; instrument_name: string | null; instrument_family: string | null; historical_version: string | null; approximate_year: number | null; inventor: string | null; technical_description: string | null; differences_from_modern: string | null; curiosities: string | null; image_url: string | null }
interface Quiz { id: string; question: string; question_type: string | null; options: string[] | null; correct_answer: string; explanation: string | null; points: number | null }

const db = supabase as any
const isHttp = (u: string | null | undefined): u is string => !!u && /^https?:\/\//i.test(u)
const yearOf = (d: string | null) => (d ? new Date(d).getFullYear() : null)

export default function HistoryDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [period, setPeriod] = useState<Period | null>(null)
  const [composers, setComposers] = useState<Composer[]>([])
  const [works, setWorks] = useState<Work[]>([])
  const [contexts, setContexts] = useState<CulturalContext[]>([])
  const [events, setEvents] = useState<TimelineEvent[]>([])
  const [genres, setGenres] = useState<Genre[]>([])
  const [concepts, setConcepts] = useState<TheoryConcept[]>([])
  const [evolution, setEvolution] = useState<InstrumentEvolution[]>([])
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('')

  useEffect(() => {
    async function load() {
      try {
        const { data: p } = await supabase.from('v_history_periods').select('*').eq('id', id).single()
        if (!p) { setLoading(false); return }
        setPeriod(p as Period)

        const [c, w, ctx, ev, g, th, ie, q] = await Promise.all([
          db.from('v_history_composers').select('*').eq('period_id', id).order('importance_level', { ascending: false }),
          db.from('v_history_works').select('*').eq('period_id', id).order('composition_year'),
          db.from('v_history_cultural_contexts').select('*').eq('period_id', id),
          db.from('v_history_timeline_events').select('*').eq('period_id', id).order('year'),
          db.from('v_history_genres').select('*').eq('origin_period_id', id),
          db.from('v_history_theory_concepts').select('*').eq('origin_period_id', id),
          db.from('v_history_instrument_evolution').select('*').eq('period_id', id).order('approximate_year'),
          db.from('v_history_quizzes').select('*').eq('period_id', id),
        ])
        setComposers((c.data as Composer[]) || [])
        setWorks((w.data as Work[]) || [])
        setContexts((ctx.data as CulturalContext[]) || [])
        setEvents((ev.data as TimelineEvent[]) || [])
        setGenres((g.data as Genre[]) || [])
        setConcepts((th.data as TheoryConcept[]) || [])
        setEvolution((ie.data as InstrumentEvolution[]) || [])
        setQuizzes((q.data as Quiz[]) || [])
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }
    if (id) load()
  }, [id])

  const c = period?.theme_color || '#d97706'

  const tabs = useMemo(() => {
    if (!period) return [] as { key: string; label: string; n?: number }[]
    const t: { key: string; label: string; n?: number }[] = [{ key: 'overview', label: 'Visão geral' }]
    if (composers.length) t.push({ key: 'composers', label: 'Compositores', n: composers.length })
    if (works.length) t.push({ key: 'works', label: 'Obras', n: works.length })
    if (contexts.length) t.push({ key: 'contexts', label: 'Contextos', n: contexts.length })
    if (events.length) t.push({ key: 'timeline', label: 'Linha do tempo', n: events.length })
    if (genres.length) t.push({ key: 'genres', label: 'Gêneros', n: genres.length })
    if (concepts.length) t.push({ key: 'concepts', label: 'Conceitos', n: concepts.length })
    if (evolution.length) t.push({ key: 'evolution', label: 'Instrumentos', n: evolution.length })
    if (quizzes.length) t.push({ key: 'quiz', label: 'Quiz', n: quizzes.length })
    return t
  }, [period, composers, works, contexts, events, genres, concepts, evolution, quizzes])

  useEffect(() => { if (tabs.length && !tab) setTab(tabs[0].key) }, [tabs, tab])

  if (loading) return (
    <div className="space-y-6 animate-pulse">
      <div className="h-56 bg-stone-200 rounded-3xl" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{[1, 2, 3, 4].map(i => <div key={i} className="h-24 bg-stone-200 rounded-2xl" />)}</div>
      <div className="h-64 bg-stone-200 rounded-3xl" />
    </div>
  )
  if (!period) return <div className="text-center py-16"><p className="text-stone-500">Período não encontrado.</p><Link href="/history" className="text-amber-600 hover:underline mt-4 inline-block">Voltar</Link></div>

  return (
    <div className="space-y-6 pb-12">
      <Link href="/history" className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-700">
        <ArrowLeft className="w-4 h-4" /> Voltar à História
      </Link>

      {/* HERO */}
      <div className="relative overflow-hidden rounded-3xl border border-stone-100 shadow-sm">
        <div className="aspect-[16/7] w-full" style={{ background: `linear-gradient(135deg, ${c}, #1c1917)` }}>
          {period.cover_image_url
            ? <img src={period.cover_image_url} alt={period.name} className="w-full h-full object-cover" />
            : <div className="w-full h-full" />}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
        <span aria-hidden className="pointer-events-none absolute top-4 right-5 font-extrabold text-white/15 select-none leading-none" style={{ fontSize: '4rem' }}>音楽史</span>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
          <div className="flex items-center gap-2 mb-2 text-sm opacity-90">
            <Calendar className="w-4 h-4" />
            <span className="nw-tabular">{period.start_year}{period.end_year ? ` – ${period.end_year}` : ' – presente'}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold drop-shadow">{period.name}</h1>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat icon={Users} c={c} value={composers.length || period.composer_count || 0} label="Compositores" />
        <Stat icon={Music} c={c} value={works.length || period.work_count || 0} label="Obras" />
        <Stat icon={Clock} c={c} value={events.length} label="Eventos" />
        <Stat icon={Trophy} c={c} value={quizzes.length} label="Quiz" />
      </div>

      {/* ABAS */}
      {tabs.length > 0 && (
        <div className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden">
          <div className="flex gap-1 overflow-x-auto border-b border-stone-100 px-2">
            {tabs.map(t => {
              const on = tab === t.key
              return (
                <button key={t.key} onClick={() => setTab(t.key)}
                  className={`relative shrink-0 px-4 py-3.5 text-sm font-semibold transition-colors ${on ? 'text-stone-900' : 'text-stone-400 hover:text-stone-600'}`}>
                  {t.label}{t.n != null && <span className="nw-tabular ml-1.5 text-xs text-stone-400">{t.n}</span>}
                  {on && <span className="absolute left-3 right-3 -bottom-px h-0.5 rounded-full" style={{ background: c }} />}
                </button>
              )
            })}
          </div>
          <div className="p-6">
            {tab === 'overview' && <Overview period={period} c={c} counts={{ composers: composers.length, works: works.length, genres: genres.length, events: events.length, contexts: contexts.length, concepts: concepts.length }} />}
            {tab === 'composers' && <Composers composers={composers} c={c} />}
            {tab === 'works' && <Works works={works} c={c} />}
            {tab === 'contexts' && <Contexts contexts={contexts} c={c} />}
            {tab === 'timeline' && <Timeline events={events} c={c} />}
            {tab === 'genres' && <Genres genres={genres} c={c} />}
            {tab === 'concepts' && <Concepts concepts={concepts} c={c} />}
            {tab === 'evolution' && <Evolution evolution={evolution} c={c} />}
            {tab === 'quiz' && <QuizPanel quizzes={quizzes} c={c} />}
          </div>
        </div>
      )}
    </div>
  )
}

/* ---------- auxiliares ---------- */
function Stat({ icon: Icon, value, label, c }: { icon: any; value: string | number; label: string; c: string }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-100 text-center">
      <div className="w-9 h-9 rounded-xl mx-auto mb-2 flex items-center justify-center" style={{ background: `${c}1a`, color: c }}><Icon className="w-4 h-4" /></div>
      <p className="nw-tabular text-xl font-bold text-stone-900">{value}</p>
      <p className="text-xs text-stone-500">{label}</p>
    </div>
  )
}

function Overview({ period, c, counts }: { period: Period; c: string; counts: Record<string, number> }) {
  const items: { label: string; n: number }[] = [
    { label: 'Compositores', n: counts.composers },
    { label: 'Obras', n: counts.works },
    { label: 'Gêneros', n: counts.genres },
    { label: 'Eventos', n: counts.events },
    { label: 'Contextos', n: counts.contexts },
    { label: 'Conceitos', n: counts.concepts },
  ].filter(i => i.n > 0)
  return (
    <div className="space-y-5">
      <div className="flex items-baseline gap-3 pb-2 border-b-2" style={{ borderColor: c }}>
        <span className="font-extrabold leading-none select-none" style={{ color: c, fontSize: '1.75rem' }} aria-hidden>史</span>
        <h2 className="text-xl font-extrabold text-stone-900">Sobre o período</h2>
      </div>
      <p className="nw-tabular text-sm font-medium" style={{ color: c }}>
        {period.start_year}{period.end_year ? ` – ${period.end_year}` : ' – presente'}
      </p>
      {period.description
        ? <p className="text-stone-600 whitespace-pre-wrap leading-relaxed">{period.description}</p>
        : <p className="text-stone-400 text-sm">Sem descrição cadastrada.</p>}
      {items.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 pt-2">
          {items.map(i => (
            <div key={i.label} className="text-center p-3 rounded-2xl" style={{ background: `${c}0d` }}>
              <p className="nw-tabular text-lg font-bold text-stone-900">{i.n}</p>
              <p className="text-[11px] text-stone-500">{i.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function Composers({ composers, c }: { composers: Composer[]; c: string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {composers.map(comp => {
        const by = yearOf(comp.birth_date)
        const dy = yearOf(comp.death_date)
        const name = (comp as any).artistic_name || comp.full_name
        return (
          <div key={comp.id} className="p-4 rounded-2xl border border-stone-100" style={{ background: `${c}08` }}>
            <div className="flex items-start gap-3">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-white shrink-0 flex items-center justify-center" style={{ border: `2px solid ${c}40` }}>
                {comp.photo_url
                  ? <img src={comp.photo_url} alt={name} className="w-full h-full object-cover" />
                  : <User className="w-6 h-6" style={{ color: c }} />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-stone-900 leading-tight">{name}</h3>
                  {comp.importance_level != null && (
                    <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold shrink-0" style={{ color: c }}>
                      <Star className="w-3 h-3 fill-current" /><span className="nw-tabular">{comp.importance_level}</span>
                    </span>
                  )}
                </div>
                {(comp as any).artistic_name && comp.full_name !== (comp as any).artistic_name && (
                  <p className="text-xs text-stone-400">{comp.full_name}</p>
                )}
                <div className="flex items-center gap-3 mt-0.5 text-xs text-stone-500">
                  {(by || dy) && <span className="nw-tabular">{by || '?'} – {dy || 'presente'}</span>}
                  {comp.birth_country && <span className="inline-flex items-center gap-1"><Globe className="w-3 h-3" />{comp.birth_country}</span>}
                </div>
                {(comp as any).work_count != null && (
                  <span className="text-xs font-medium" style={{ color: c }}><span className="nw-tabular">{(comp as any).work_count}</span> obras</span>
                )}
              </div>
            </div>
            {comp.biography && <p className="text-sm text-stone-600 leading-relaxed mt-3 line-clamp-4">{comp.biography}</p>}
          </div>
        )
      })}
    </div>
  )
}

function Works({ works, c }: { works: Work[]; c: string }) {
  return (
    <div className="space-y-2.5">
      {works.map(w => {
        const audio = isHttp(w.audio_url) ? w.audio_url : null
        const video = isHttp(w.video_url) ? w.video_url : null
        return (
          <div key={w.id} className="p-4 rounded-2xl border border-stone-100" style={{ background: `${c}06` }}>
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white" style={{ background: c }}><Music className="w-4 h-4" /></div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-stone-900 leading-tight">{w.title}</h3>
                {(w as any).composer_name && <p className="text-sm text-stone-500">{(w as any).composer_name}</p>}
                <div className="flex flex-wrap items-center gap-2 mt-1.5 text-[11px]">
                  {w.composition_year != null && <span className="nw-tabular px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">{w.composition_year}</span>}
                  {w.work_type && <span className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 capitalize">{w.work_type}</span>}
                  {w.genre && <span className="px-2 py-0.5 rounded-full capitalize" style={{ background: `${c}1a`, color: c }}>{w.genre}</span>}
                  {w.difficulty_level != null && <span className="nw-tabular px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">Nível {w.difficulty_level}</span>}
                </div>
              </div>
              {video && (
                <a href={video} target="_blank" rel="noopener noreferrer" className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-white hover:opacity-90" style={{ background: c }}><Play className="w-4 h-4" /></a>
              )}
            </div>
            {audio && <audio controls src={audio} className="w-full mt-3 h-9" />}
          </div>
        )
      })}
    </div>
  )
}

function Contexts({ contexts, c }: { contexts: CulturalContext[]; c: string }) {
  return (
    <div className="space-y-3">
      {contexts.map(ctx => (
        <div key={ctx.id} className="p-4 rounded-2xl border border-stone-100" style={{ background: `${c}08` }}>
          <div className="flex items-start gap-3">
            {isHttp(ctx.images_url) && (
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                <img src={ctx.images_url} alt={ctx.title} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2 flex-wrap">
                <h3 className="font-bold text-stone-900">{ctx.title}</h3>
                {ctx.context_type && <span className="text-[11px] px-2 py-0.5 rounded-full capitalize" style={{ background: `${c}1a`, color: c }}>{ctx.context_type}</span>}
                {(ctx.start_year || ctx.end_year) && <span className="nw-tabular text-xs text-stone-400">{ctx.start_year || ''}{ctx.end_year ? `–${ctx.end_year}` : ''}</span>}
              </div>
              {ctx.description && <p className="text-sm text-stone-600 leading-relaxed mt-1.5">{ctx.description}</p>}
              {ctx.impact_on_music && (
                <p className="text-sm text-stone-600 leading-relaxed mt-2 pl-3 border-l-2" style={{ borderColor: c }}>
                  <span className="font-semibold text-stone-700">Impacto na música: </span>{ctx.impact_on_music}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function Timeline({ events, c }: { events: TimelineEvent[]; c: string }) {
  return (
    <div className="relative pl-2">
      <div className="absolute left-[1.15rem] top-2 bottom-2 w-0.5 bg-stone-200" />
      <div className="space-y-5">
        {events.map(ev => (
          <div key={ev.id} className="flex gap-4 relative">
            <div className="nw-tabular w-10 h-10 rounded-full flex items-center justify-center text-white text-[10px] font-bold z-10 shrink-0 shadow-sm" style={{ background: c }}>
              {ev.year}
            </div>
            <div className="flex-1 p-4 rounded-2xl border border-stone-100" style={{ background: `${c}06` }}>
              <div className="flex items-baseline gap-2 flex-wrap">
                <h3 className="font-bold text-stone-900">{ev.title}</h3>
                {ev.event_type && <span className="text-[11px] px-2 py-0.5 rounded-full capitalize" style={{ background: `${c}1a`, color: c }}>{ev.event_type}</span>}
              </div>
              {ev.description && <p className="text-sm text-stone-600 leading-relaxed mt-1.5">{ev.description}</p>}
              {(ev.composer_name || ev.work_title) && (
                <p className="text-xs text-stone-400 mt-1.5">{[ev.composer_name, ev.work_title].filter(Boolean).join(' · ')}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Genres({ genres, c }: { genres: Genre[]; c: string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {genres.map(g => {
        const gc = g.theme_color || c
        return (
          <div key={g.id} className="p-4 rounded-2xl border border-stone-100" style={{ background: `${gc}08`, borderLeftWidth: 4, borderLeftColor: gc }}>
            <div className="flex items-baseline gap-2 flex-wrap">
              <h3 className="font-bold text-stone-900">{g.name}</h3>
              {g.origin_country && <span className="inline-flex items-center gap-1 text-xs text-stone-500"><Globe className="w-3 h-3" />{g.origin_country}</span>}
              {g.origin_decade && <span className="nw-tabular text-xs text-stone-400">{g.origin_decade}</span>}
            </div>
            {g.description && <p className="text-sm text-stone-600 leading-relaxed mt-1.5">{g.description}</p>}
            {g.musical_characteristics && (
              <p className="text-sm text-stone-600 leading-relaxed mt-2 pl-3 border-l-2" style={{ borderColor: gc }}>
                <span className="font-semibold text-stone-700">Características: </span>{g.musical_characteristics}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}

function Concepts({ concepts, c }: { concepts: TheoryConcept[]; c: string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {concepts.map(t => (
        <div key={t.id} className="p-4 rounded-2xl border border-stone-100" style={{ background: `${c}08` }}>
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${c}1a`, color: c }}><Lightbulb className="w-4 h-4" /></div>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2 flex-wrap">
                <h3 className="font-bold text-stone-900">{t.name}</h3>
                {t.category && <span className="text-[11px] px-2 py-0.5 rounded-full capitalize" style={{ background: `${c}1a`, color: c }}>{t.category}</span>}
                {t.difficulty_level != null && <span className="nw-tabular text-xs text-stone-400">Nível {t.difficulty_level}</span>}
              </div>
              {t.simple_definition && <p className="text-sm text-stone-600 leading-relaxed mt-1.5">{t.simple_definition}</p>}
              {t.technical_definition && <p className="text-xs text-stone-500 leading-relaxed mt-2">{t.technical_definition}</p>}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function Evolution({ evolution, c }: { evolution: InstrumentEvolution[]; c: string }) {
  return (
    <div className="space-y-3">
      {evolution.map(e => (
        <div key={e.id} className="p-4 rounded-2xl border border-stone-100" style={{ background: `${c}08` }}>
          <div className="flex items-start gap-3">
            {isHttp(e.image_url) ? (
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                <img src={e.image_url} alt={e.instrument_name || ''} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${c}1a`, color: c }}><Wrench className="w-4 h-4" /></div>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2 flex-wrap">
                <h3 className="font-bold text-stone-900">{e.instrument_name || e.historical_version}</h3>
                {e.historical_version && e.instrument_name && <span className="text-xs text-stone-500">{e.historical_version}</span>}
                {e.approximate_year != null && <span className="nw-tabular text-xs text-stone-400">~{e.approximate_year}</span>}
              </div>
              {e.instrument_family && <p className="text-[11px] text-stone-400 capitalize">{e.instrument_family}</p>}
              {e.technical_description && <p className="text-sm text-stone-600 leading-relaxed mt-1.5">{e.technical_description}</p>}
              {e.differences_from_modern && (
                <p className="text-sm text-stone-600 leading-relaxed mt-2 pl-3 border-l-2" style={{ borderColor: c }}>
                  <span className="font-semibold text-stone-700">Diferenças do moderno: </span>{e.differences_from_modern}
                </p>
              )}
              {e.inventor && <p className="text-xs text-stone-400 mt-1.5">Inventor: {e.inventor}</p>}
              {e.curiosities && <p className="text-xs text-stone-500 italic mt-1.5">{e.curiosities}</p>}
              {e.instrument_id && (
                <Link href={`/instruments/${e.instrument_id}`} className="inline-flex items-center gap-1 text-xs font-semibold mt-2 hover:underline" style={{ color: c }}>
                  Ver instrumento <ChevronRight className="w-3 h-3" />
                </Link>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function QuizPanel({ quizzes, c }: { quizzes: Quiz[]; c: string }) {
  const [i, setI] = useState(0)
  const [chosen, setChosen] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const q = quizzes[i]
  const opts = useMemo(() => {
    if (!q) return ['Verdadeiro', 'Falso']
    if (Array.isArray(q.options) && q.options.length) return q.options as string[]
    return ['Verdadeiro', 'Falso']
  }, [q])

  function pick(opt: string) {
    if (chosen) return
    setChosen(opt)
    if (opt === q.correct_answer) setScore(s => s + 1)
  }
  function next() {
    if (i + 1 >= quizzes.length) { setDone(true); return }
    setI(i + 1); setChosen(null)
  }
  function restart() { setI(0); setChosen(null); setScore(0); setDone(false) }

  if (done) {
    const pct = Math.round((score / quizzes.length) * 100)
    const stars = pct >= 80 ? 3 : pct >= 50 ? 2 : 1
    return (
      <div className="text-center py-8 nw-rise">
        <div className="text-4xl mb-3 tracking-widest">
          <span style={{ color: c }}>{'★'.repeat(stars)}</span><span className="text-stone-200">{'★'.repeat(3 - stars)}</span>
        </div>
        <p className="text-lg font-bold text-stone-900">Você acertou <span className="nw-tabular" style={{ color: c }}>{score}</span> de <span className="nw-tabular">{quizzes.length}</span></p>
        <p className="text-sm text-stone-500 mt-1"><span className="nw-tabular">{pct}%</span> de acerto</p>
        <button onClick={restart} className="mt-6 px-6 py-2.5 rounded-full text-white font-semibold text-sm hover:opacity-90 transition-opacity" style={{ background: c }}>Refazer quiz</button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="nw-progress flex-1"><span style={{ width: `${(i / quizzes.length) * 100}%`, background: c }} /></div>
        <span className="nw-tabular text-xs text-stone-400 shrink-0">{i + 1}/{quizzes.length}</span>
      </div>
      <div key={i} className="nw-rise">
        <p className="font-semibold text-stone-900 text-lg mb-4">{q.question}</p>
        <div className="grid sm:grid-cols-2 gap-2.5">
          {opts.map(opt => {
            const isChosen = chosen === opt, isCorrect = opt === q.correct_answer
            let cls = 'border-stone-200 hover:border-stone-300', extra = ''
            if (chosen) {
              if (isCorrect) { cls = 'border-emerald-300 bg-emerald-50 text-emerald-800'; extra = 'nw-pop' }
              else if (isChosen) { cls = 'border-red-300 bg-red-50 text-red-800'; extra = 'nw-shake' }
              else cls = 'border-stone-100 text-stone-400'
            }
            return (
              <button key={opt} onClick={() => pick(opt)} disabled={!!chosen}
                className={`flex items-center justify-between gap-2 p-3.5 rounded-xl border text-sm text-left transition-all ${cls} ${extra}`}>
                <span>{opt}</span>
                {chosen && isCorrect && <CheckCircle2 className="w-4 h-4 shrink-0" />}
                {chosen && isChosen && !isCorrect && <XCircle className="w-4 h-4 shrink-0" />}
              </button>
            )
          })}
        </div>
        {chosen && q.explanation && (
          <div className="mt-4 p-4 rounded-2xl text-sm text-stone-600 leading-relaxed nw-rise" style={{ background: `${c}0d`, borderLeft: `3px solid ${c}` }}>
            <span className="inline-flex items-center gap-1.5 font-semibold text-stone-700 mb-1"><BookOpen className="w-4 h-4" />Explicação</span>
            <p>{q.explanation}</p>
          </div>
        )}
        {chosen && (
          <div className="mt-6 flex items-center justify-between nw-rise">
            <span className="text-sm text-stone-500">Pontos: <span className="nw-tabular font-bold" style={{ color: c }}>{score}</span></span>
            <button onClick={next} className="px-5 py-2.5 rounded-full text-white font-semibold text-sm inline-flex items-center gap-1.5 hover:opacity-90 transition-opacity" style={{ background: c }}>
              {i + 1 >= quizzes.length ? 'Ver resultado' : 'Próxima'} <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
