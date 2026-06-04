'use client'

import { useEffect, useState, useRef, useMemo } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import {
  Music, ArrowLeft, Globe, Layers, Volume2, Video, Sparkles,
  Trophy, Link2, Play, ChevronRight, CheckCircle2, XCircle, Gauge, Baby, BookOpen,
} from 'lucide-react'
import Link from 'next/link'
import type { Tables } from '@/lib/supabase/database.types'
import { playNote, realAudioUrl } from '@/lib/audio/note-synth'

type Instrument = Tables<'v_instruments'>
interface Fact { id: string; title: string; description: string; image_url: string | null; order_index: number }
interface Sound { id: string; title: string; description: string | null; audio_url: string | null; sound_type: string | null }
interface Performance { id: string; artist: string; title: string; video_url: string | null; description: string | null }
interface Quiz { id: string; question_type: string; question: string; correct_answer: string; options: string[] | null; points: number }
interface Relation { id: string; related_instrument_id: string; relation_type: string | null; related_name: string; related_family: string | null; related_thumbnail_url: string | null; related_image_url: string | null }

const db = supabase as any

const FAM: Record<string, { c: string; k: string }> = {
  'Cordas': { c: '#dc2626', k: '弦' }, 'Madeiras': { c: '#d97706', k: '木管' },
  'Metais': { c: '#ea580c', k: '金管' }, 'Teclados': { c: '#7c3aed', k: '鍵盤' },
  'Percussão': { c: '#0284c7', k: '打' }, 'Percussão Melódica': { c: '#0d9488', k: '旋' },
  'Sopro Livre': { c: '#16a34a', k: '笛' }, 'Eletrônicos': { c: '#c026d3', k: '電' },
  'Voz': { c: '#e11d8f', k: '声' },
}
const famOf = (f: string | null) => FAM[f || ''] || { c: '#78716c', k: '楽' }

export default function InstrumentDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [instrument, setInstrument] = useState<Instrument | null>(null)
  const [facts, setFacts] = useState<Fact[]>([])
  const [sounds, setSounds] = useState<Sound[]>([])
  const [performances, setPerformances] = useState<Performance[]>([])
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [relations, setRelations] = useState<Relation[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('')

  useEffect(() => {
    async function load() {
      try {
        const [inst, f, s, p, q, r] = await Promise.all([
          supabase.from('v_instruments').select('*').eq('id', id).single(),
          db.from('v_instrument_facts').select('*').eq('instrument_id', id).order('order_index'),
          db.from('v_instrument_sounds').select('*').eq('instrument_id', id),
          db.from('v_instrument_performances').select('*').eq('instrument_id', id),
          db.from('v_instrument_quizzes').select('*').eq('instrument_id', id),
          db.from('v_instrument_relations').select('*').eq('instrument_id', id),
        ])
        if (inst.data) setInstrument(inst.data as Instrument)
        setFacts((f.data as Fact[]) || [])
        setSounds((s.data as Sound[]) || [])
        setPerformances((p.data as Performance[]) || [])
        setQuizzes((q.data as Quiz[]) || [])
        setRelations((r.data as Relation[]) || [])
      } catch (error) { console.error('Error:', error) } finally { setLoading(false) }
    }
    if (id) load()
  }, [id])

  const tabs = useMemo(() => {
    if (!instrument) return [] as { key: string; label: string; n?: number }[]
    const t: { key: string; label: string; n?: number }[] = []
    if (instrument.description || instrument.detailed_description) t.push({ key: 'sobre', label: 'Sobre' })
    if (facts.length) t.push({ key: 'curiosidades', label: 'Curiosidades', n: facts.length })
    if (sounds.length) t.push({ key: 'sons', label: 'Sons', n: sounds.length })
    if (performances.length) t.push({ key: 'performances', label: 'Performances', n: performances.length })
    if (quizzes.length) t.push({ key: 'quiz', label: 'Quiz', n: quizzes.length })
    if (relations.length) t.push({ key: 'relacionados', label: 'Relacionados', n: relations.length })
    return t
  }, [instrument, facts, sounds, performances, quizzes, relations])

  useEffect(() => { if (tabs.length && !tab) setTab(tabs[0].key) }, [tabs, tab])

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-72 bg-gray-200 rounded-3xl" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{[1, 2, 3, 4].map(i => <div key={i} className="h-24 bg-gray-200 rounded-2xl" />)}</div>
        <div className="h-48 bg-gray-200 rounded-3xl" />
      </div>
    )
  }
  if (!instrument) return <div className="text-center py-16"><p className="text-gray-500">Instrumento não encontrado.</p><Link href="/instruments" className="text-purple-600 hover:underline mt-4 inline-block">Voltar</Link></div>

  const img = instrument.image_url || (instrument as any).thumbnail_url
  const c = famOf(instrument.family).c

  return (
    <div className="space-y-6 pb-12">
      <Link href="/instruments" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
        <ArrowLeft className="w-4 h-4" /> Voltar aos Instrumentos
      </Link>

      {/* HERO */}
      <div className="relative overflow-hidden rounded-3xl border border-gray-100 shadow-sm">
        <div className="aspect-[16/7] w-full" style={{ background: `linear-gradient(135deg, ${c}22, #1c191722)` }}>
          {img ? <img src={img} alt={instrument.name} className="w-full h-full object-cover" />
            : <div className="w-full h-full flex items-center justify-center"><Music className="w-24 h-24 text-white/40" /></div>}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
        <span aria-hidden className="pointer-events-none absolute top-4 right-5 font-extrabold text-white/15 select-none leading-none" style={{ fontSize: '4rem' }}>{famOf(instrument.family).k}</span>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {instrument.family && <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: c }}><Layers className="w-3.5 h-3.5" />{instrument.family}</span>}
            {instrument.origin && <Badge icon={Globe} text={instrument.origin} />}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold drop-shadow">{instrument.name}</h1>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {instrument.difficulty_level != null && <Stat icon={Gauge} c={c} value={`${instrument.difficulty_level}/5`} label="Dificuldade" />}
        <Stat icon={Volume2} c={c} value={sounds.length || instrument.sounds_count || 0} label="Sons" />
        <Stat icon={Sparkles} c={c} value={facts.length} label="Curiosidades" />
        {instrument.recommended_age_range
          ? <Stat icon={Baby} c={c} value={instrument.recommended_age_range} label="Idade" />
          : <Stat icon={Trophy} c={c} value={quizzes.length} label="Quiz" />}
      </div>

      {/* ABAS */}
      {tabs.length > 0 && (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex gap-1 overflow-x-auto border-b border-gray-100 px-2">
            {tabs.map(t => {
              const on = tab === t.key
              return (
                <button key={t.key} onClick={() => setTab(t.key)}
                  className={`relative shrink-0 px-4 py-3.5 text-sm font-semibold transition-colors ${on ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}>
                  {t.label}{t.n != null && <span className="nw-tabular ml-1.5 text-xs text-gray-400">{t.n}</span>}
                  {on && <span className="absolute left-3 right-3 -bottom-px h-0.5 rounded-full" style={{ background: c }} />}
                </button>
              )
            })}
          </div>
          <div className="p-6">
            {tab === 'sobre' && (
              <div className="space-y-4">
                {instrument.description && <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">{instrument.description}</p>}
                {instrument.detailed_description && <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">{instrument.detailed_description}</p>}
                {instrument.category && <p className="text-sm text-gray-400 flex items-center gap-1.5 pt-2"><BookOpen className="w-4 h-4" />Categoria: <span className="capitalize text-gray-600">{instrument.category}</span></p>}
              </div>
            )}
            {tab === 'curiosidades' && <Facts facts={facts} c={c} />}
            {tab === 'sons' && <Sounds sounds={sounds} c={c} />}
            {tab === 'performances' && <Performances performances={performances} c={c} />}
            {tab === 'quiz' && <QuizPanel quizzes={quizzes} c={c} />}
            {tab === 'relacionados' && <Related relations={relations} />}
          </div>
        </div>
      )}
    </div>
  )
}

/* ---------- auxiliares ---------- */
function Badge({ icon: Icon, text }: { icon: any; text: string }) {
  return <span className="inline-flex items-center gap-1 text-xs font-medium bg-white/20 backdrop-blur px-2.5 py-1 rounded-full"><Icon className="w-3.5 h-3.5" />{text}</span>
}
function Stat({ icon: Icon, value, label, c }: { icon: any; value: string | number; label: string; c: string }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
      <div className="w-9 h-9 rounded-xl mx-auto mb-2 flex items-center justify-center" style={{ background: `${c}1a`, color: c }}><Icon className="w-4 h-4" /></div>
      <p className="nw-tabular text-xl font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  )
}
function Facts({ facts, c }: { facts: Fact[]; c: string }) {
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {facts.map(f => (
        <div key={f.id} className="p-4 rounded-2xl border border-gray-100" style={{ background: `${c}08` }}>
          <p className="font-semibold text-gray-900 text-sm mb-1">{f.title}</p>
          <p className="text-sm text-gray-600 leading-relaxed">{f.description}</p>
        </div>
      ))}
    </div>
  )
}
function Sounds({ sounds, c }: { sounds: Sound[]; c: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [playing, setPlaying] = useState<string | null>(null)

  function stop() {
    if (timer.current) { clearTimeout(timer.current); timer.current = null }
    if (audioRef.current) audioRef.current.pause()
  }
  useEffect(() => () => stop(), [])

  function synth(s: Sound) {
    const ms = playNote(s.title || s.sound_type || 'Lá')
    if (!ms) { setPlaying(null); return }
    setPlaying(s.id)
    timer.current = setTimeout(() => setPlaying(null), ms)
  }
  function play(s: Sound) {
    if (playing === s.id) { stop(); setPlaying(null); return }
    stop()
    const real = realAudioUrl(s.audio_url)
    if (real && audioRef.current) {
      audioRef.current.src = real
      audioRef.current.play().then(() => setPlaying(s.id)).catch(() => synth(s))
    } else { synth(s) }
  }

  return (
    <>
      <audio ref={audioRef} onEnded={() => setPlaying(null)} className="hidden" />
      <p className="text-xs text-gray-400 mb-3">Toque para ouvir a nota — sintetizada no seu navegador, sem download.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {sounds.map(s => {
          const on = playing === s.id
          return (
            <button key={s.id} onClick={() => play(s)}
              className="flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all hover:border-gray-300"
              style={on ? { borderColor: c, background: `${c}10` } : { borderColor: '#f3f4f6' }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-white" style={{ background: on ? c : `${c}cc` }}>
                {on ? <span className="nw-eq"><span /><span /><span /></span> : <Play className="w-4 h-4" />}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{s.title}</p>
                {s.sound_type && <p className="text-[11px] text-gray-400 truncate capitalize">{s.sound_type}</p>}
              </div>
            </button>
          )
        })}
      </div>
    </>
  )
}
function Performances({ performances, c }: { performances: Performance[]; c: string }) {
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {performances.map(p => (
        <a key={p.id} href={p.video_url || '#'} target="_blank" rel="noopener noreferrer"
          className="group flex items-center gap-3 p-4 rounded-2xl border border-gray-100 hover:border-gray-300 transition-all">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-white" style={{ background: c }}><Play className="w-5 h-5" /></div>
          <div className="min-w-0"><p className="font-semibold text-gray-900 text-sm truncate">{p.title}</p><p className="text-xs text-gray-500 truncate">{p.artist}</p></div>
          <ChevronRight className="w-4 h-4 text-gray-300 ml-auto" />
        </a>
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
  const opts = useMemo(() => (q?.options && q.options.length ? q.options : ['Verdadeiro', 'Falso']), [q])

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
          <span style={{ color: c }}>{'★'.repeat(stars)}</span><span className="text-gray-200">{'★'.repeat(3 - stars)}</span>
        </div>
        <p className="text-lg font-bold text-gray-900">Você acertou <span className="nw-tabular" style={{ color: c }}>{score}</span> de <span className="nw-tabular">{quizzes.length}</span></p>
        <p className="text-sm text-gray-500 mt-1"><span className="nw-tabular">{pct}%</span> de acerto</p>
        <button onClick={restart} className="mt-6 px-6 py-2.5 rounded-full text-white font-semibold text-sm hover:opacity-90 transition-opacity" style={{ background: c }}>Refazer quiz</button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="nw-progress flex-1"><span style={{ width: `${(i / quizzes.length) * 100}%`, background: c }} /></div>
        <span className="nw-tabular text-xs text-gray-400 shrink-0">{i + 1}/{quizzes.length}</span>
      </div>
      <div key={i} className="nw-rise">
        <p className="font-semibold text-gray-900 text-lg mb-4">{q.question}</p>
        <div className="grid sm:grid-cols-2 gap-2.5">
          {opts.map(opt => {
            const isChosen = chosen === opt, isCorrect = opt === q.correct_answer
            let cls = 'border-gray-200 hover:border-gray-300', extra = ''
            if (chosen) {
              if (isCorrect) { cls = 'border-emerald-300 bg-emerald-50 text-emerald-800'; extra = 'nw-pop' }
              else if (isChosen) { cls = 'border-red-300 bg-red-50 text-red-800'; extra = 'nw-shake' }
              else cls = 'border-gray-100 text-gray-400'
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
        {chosen && (
          <div className="mt-6 flex items-center justify-between nw-rise">
            <span className="text-sm text-gray-500">Pontos: <span className="nw-tabular font-bold" style={{ color: c }}>{score}</span></span>
            <button onClick={next} className="px-5 py-2.5 rounded-full text-white font-semibold text-sm inline-flex items-center gap-1.5 hover:opacity-90 transition-opacity" style={{ background: c }}>
              {i + 1 >= quizzes.length ? 'Ver resultado' : 'Próxima'} <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
function Related({ relations }: { relations: Relation[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {relations.map(r => (
        <Link key={r.id} href={`/instruments/${r.related_instrument_id}`} className="group">
          <div className="rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md hover:border-gray-300 transition-all">
            <div className="aspect-square bg-gradient-to-br from-stone-100 to-stone-200">
              {(r.related_thumbnail_url || r.related_image_url)
                ? <img src={r.related_thumbnail_url || r.related_image_url || ''} alt={r.related_name} className="w-full h-full object-cover" />
                : <div className="w-full h-full flex items-center justify-center"><Music className="w-8 h-8 text-stone-300" /></div>}
            </div>
            <div className="p-2.5"><p className="text-sm font-semibold text-gray-900 truncate">{r.related_name}</p>{r.relation_type && <p className="text-[11px] text-gray-400 capitalize">{r.relation_type}</p>}</div>
          </div>
        </Link>
      ))}
    </div>
  )
}
