'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import {
  Music, ArrowLeft, Globe, Layers, Volume2, Video, Sparkles,
  Trophy, Link2, Play, ChevronRight, CheckCircle2, XCircle, Gauge, Baby,
} from 'lucide-react'
import Link from 'next/link'
import type { Tables } from '@/lib/supabase/database.types'

type Instrument = Tables<'v_instruments'>
interface Fact { id: string; title: string; description: string; image_url: string | null; order_index: number }
interface Sound { id: string; title: string; description: string | null; audio_url: string | null; sound_type: string | null }
interface Performance { id: string; artist: string; title: string; video_url: string | null; description: string | null }
interface Quiz { id: string; question_type: string; question: string; correct_answer: string; options: string[] | null; points: number }
interface Relation { id: string; related_instrument_id: string; relation_type: string | null; related_name: string; related_family: string | null; related_thumbnail_url: string | null; related_image_url: string | null }

const db = supabase as any

export default function InstrumentDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [instrument, setInstrument] = useState<Instrument | null>(null)
  const [facts, setFacts] = useState<Fact[]>([])
  const [sounds, setSounds] = useState<Sound[]>([])
  const [performances, setPerformances] = useState<Performance[]>([])
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [relations, setRelations] = useState<Relation[]>([])
  const [loading, setLoading] = useState(true)

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
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }
    if (id) load()
  }, [id])

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-72 bg-gray-200 rounded-3xl" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{[1, 2, 3, 4].map(i => <div key={i} className="h-24 bg-gray-200 rounded-2xl" />)}</div>
        <div className="h-48 bg-gray-200 rounded-3xl" />
      </div>
    )
  }
  if (!instrument) {
    return <div className="text-center py-16"><p className="text-gray-500">Instrumento não encontrado.</p><Link href="/instruments" className="text-purple-600 hover:underline mt-4 inline-block">Voltar</Link></div>
  }

  const img = instrument.image_url || (instrument as any).thumbnail_url

  return (
    <div className="space-y-8 pb-12">
      <Link href="/instruments" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
        <ArrowLeft className="w-4 h-4" /> Voltar aos Instrumentos
      </Link>

      {/* HERO */}
      <div className="relative overflow-hidden rounded-3xl border border-gray-100 shadow-sm">
        <div className="aspect-[16/7] w-full bg-gradient-to-br from-purple-100 to-indigo-100">
          {img ? (
            <img src={img} alt={instrument.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center"><Music className="w-24 h-24 text-purple-300" /></div>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {instrument.family && <Badge icon={Layers} text={instrument.family} />}
            {instrument.origin && <Badge icon={Globe} text={instrument.origin} />}
            {instrument.category && <span className="text-xs font-semibold bg-white/20 backdrop-blur px-2.5 py-1 rounded-full capitalize">{instrument.category}</span>}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold drop-shadow">{instrument.name}</h1>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {instrument.difficulty_level != null && (
          <Stat icon={Gauge} color="purple" value={`${instrument.difficulty_level}/5`} label="Dificuldade" />
        )}
        <Stat icon={Volume2} color="indigo" value={sounds.length || instrument.sounds_count || 0} label="Sons" />
        <Stat icon={Sparkles} color="amber" value={facts.length} label="Curiosidades" />
        {instrument.recommended_age_range
          ? <Stat icon={Baby} color="emerald" value={instrument.recommended_age_range} label="Idade" />
          : <Stat icon={Trophy} color="emerald" value={quizzes.length} label="Quiz" />}
      </div>

      {/* SOBRE */}
      {(instrument.description || instrument.detailed_description) && (
        <Section title="Sobre" icon={Music}>
          {instrument.description && <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">{instrument.description}</p>}
          {instrument.detailed_description && <p className="text-gray-600 whitespace-pre-wrap leading-relaxed mt-4">{instrument.detailed_description}</p>}
        </Section>
      )}

      {/* CURIOSIDADES */}
      {facts.length > 0 && <FactsSection facts={facts} />}

      {/* SONS */}
      {sounds.length > 0 && <SoundsSection sounds={sounds} />}

      {/* PERFORMANCES */}
      {performances.length > 0 && (
        <Section title="Performances de referência" icon={Video}>
          <div className="grid sm:grid-cols-2 gap-3">
            {performances.map(p => (
              <a key={p.id} href={p.video_url || '#'} target="_blank" rel="noopener noreferrer"
                className="group flex items-center gap-3 p-4 rounded-2xl border border-gray-100 hover:border-purple-200 hover:bg-purple-50/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0"><Play className="w-5 h-5" /></div>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 text-sm truncate">{p.title}</p>
                  <p className="text-xs text-gray-500 truncate">{p.artist}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 ml-auto group-hover:text-purple-400" />
              </a>
            ))}
          </div>
        </Section>
      )}

      {/* QUIZ */}
      {quizzes.length > 0 && <QuizSection quizzes={quizzes} />}

      {/* RELACIONADOS */}
      {relations.length > 0 && (
        <Section title="Instrumentos relacionados" icon={Link2}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {relations.map(r => (
              <Link key={r.id} href={`/instruments/${r.related_instrument_id}`} className="group">
                <div className="rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md hover:border-purple-200 transition-all">
                  <div className="aspect-square bg-gradient-to-br from-purple-50 to-indigo-50">
                    {(r.related_thumbnail_url || r.related_image_url)
                      ? <img src={r.related_thumbnail_url || r.related_image_url || ''} alt={r.related_name} className="w-full h-full object-cover" />
                      : <div className="w-full h-full flex items-center justify-center"><Music className="w-8 h-8 text-purple-300" /></div>}
                  </div>
                  <div className="p-2.5">
                    <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-purple-700">{r.related_name}</p>
                    {r.relation_type && <p className="text-[11px] text-gray-400 capitalize">{r.relation_type}</p>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      )}
    </div>
  )
}

/* ---------- componentes auxiliares ---------- */

function Badge({ icon: Icon, text }: { icon: any; text: string }) {
  return <span className="inline-flex items-center gap-1 text-xs font-medium bg-white/20 backdrop-blur px-2.5 py-1 rounded-full"><Icon className="w-3.5 h-3.5" />{text}</span>
}

const STAT_COLORS: Record<string, string> = {
  purple: 'bg-purple-50 text-purple-600', indigo: 'bg-indigo-50 text-indigo-600',
  amber: 'bg-amber-50 text-amber-600', emerald: 'bg-emerald-50 text-emerald-600',
}
function Stat({ icon: Icon, value, label, color }: { icon: any; value: string | number; label: string; color: string }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
      <div className={`w-9 h-9 rounded-xl mx-auto mb-2 flex items-center justify-center ${STAT_COLORS[color] ?? STAT_COLORS.purple}`}><Icon className="w-4 h-4" /></div>
      <p className="nw-tabular text-xl font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  )
}

function Section({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) {
  return (
    <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
      <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900 mb-4"><Icon className="w-5 h-5 text-purple-500" />{title}</h2>
      {children}
    </section>
  )
}

function FactsSection({ facts }: { facts: Fact[] }) {
  const [expanded, setExpanded] = useState(false)
  const shown = expanded ? facts : facts.slice(0, 6)
  return (
    <Section title="Curiosidades" icon={Sparkles}>
      <div className="grid sm:grid-cols-2 gap-3">
        {shown.map(f => (
          <div key={f.id} className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100">
            <p className="font-semibold text-gray-900 text-sm mb-1">{f.title}</p>
            <p className="text-sm text-gray-600 leading-relaxed">{f.description}</p>
          </div>
        ))}
      </div>
      {facts.length > 6 && (
        <button onClick={() => setExpanded(!expanded)} className="mt-4 text-sm font-semibold text-purple-600 hover:text-purple-700">
          {expanded ? 'Ver menos' : `Ver todas (${facts.length})`}
        </button>
      )}
    </Section>
  )
}

function SoundsSection({ sounds }: { sounds: Sound[] }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState<string | null>(null)

  function toggle(s: Sound) {
    if (!s.audio_url || !audioRef.current) return
    if (playing === s.id) { audioRef.current.pause(); setPlaying(null); return }
    audioRef.current.src = s.audio_url
    audioRef.current.play().then(() => setPlaying(s.id)).catch(() => setPlaying(null))
  }

  return (
    <Section title="Sons & técnicas" icon={Volume2}>
      <audio ref={audioRef} onEnded={() => setPlaying(null)} className="hidden" />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {sounds.map(s => (
          <button key={s.id} onClick={() => toggle(s)} disabled={!s.audio_url}
            className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all ${playing === s.id ? 'border-purple-300 bg-purple-50' : 'border-gray-100 hover:border-purple-200'} ${!s.audio_url ? 'opacity-70' : ''}`}>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${playing === s.id ? 'bg-purple-600 text-white' : 'bg-purple-50 text-purple-600'}`}>
              <Play className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{s.title}</p>
              {s.sound_type && <p className="text-[11px] text-gray-400 truncate capitalize">{s.sound_type}</p>}
            </div>
          </button>
        ))}
      </div>
    </Section>
  )
}

function QuizSection({ quizzes }: { quizzes: Quiz[] }) {
  const [answers, setAnswers] = useState<Record<string, string>>({})

  function pick(q: Quiz, opt: string) {
    if (answers[q.id]) return
    setAnswers(prev => ({ ...prev, [q.id]: opt }))
  }
  const answered = Object.keys(answers).length
  const correct = quizzes.filter(q => answers[q.id] === q.correct_answer).length

  return (
    <Section title="Quiz" icon={Trophy}>
      {answered > 0 && (
        <p className="text-sm text-gray-500 mb-4">Acertos: <span className="nw-tabular font-bold text-purple-600">{correct}</span> de <span className="nw-tabular">{answered}</span></p>
      )}
      <div className="space-y-5">
        {quizzes.map((q, i) => {
          const opts = q.options && q.options.length ? q.options : ['Verdadeiro', 'Falso']
          const chosen = answers[q.id]
          return (
            <div key={q.id} className="p-4 rounded-2xl border border-gray-100">
              <p className="font-semibold text-gray-900 mb-3"><span className="nw-tabular text-purple-500 mr-1">{i + 1}.</span>{q.question}</p>
              <div className="grid sm:grid-cols-2 gap-2">
                {opts.map(opt => {
                  const isChosen = chosen === opt
                  const isCorrect = opt === q.correct_answer
                  let cls = 'border-gray-200 hover:border-purple-300'
                  if (chosen) {
                    if (isCorrect) cls = 'border-emerald-300 bg-emerald-50 text-emerald-800'
                    else if (isChosen) cls = 'border-red-300 bg-red-50 text-red-800'
                    else cls = 'border-gray-100 text-gray-400'
                  }
                  return (
                    <button key={opt} onClick={() => pick(q, opt)} disabled={!!chosen}
                      className={`flex items-center justify-between gap-2 p-3 rounded-xl border text-sm text-left transition-all ${cls}`}>
                      <span>{opt}</span>
                      {chosen && isCorrect && <CheckCircle2 className="w-4 h-4 shrink-0" />}
                      {chosen && isChosen && !isCorrect && <XCircle className="w-4 h-4 shrink-0" />}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
