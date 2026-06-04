'use client'

import { useEffect, useState, useMemo } from 'react'
import { supabase } from '@/lib/supabase/client'
import {
  ArrowLeft, ChevronDown, ChevronUp, BookOpen, Loader2, Star,
  Layers, Target, GitBranch, Route, CalendarDays, Clock, Users2,
  Sparkles, ListChecks,
} from 'lucide-react'
import Link from 'next/link'

const db = supabase as any
const ACCENT = '#4f46e5' // índigo — cor do domínio currículo

/* ---------- tipos das views ---------- */
interface Methodology {
  id: string; code: string; name: string; description: string | null
  philosophy: string | null; key_principles: any; icon_name: string | null
}
interface Competency {
  id: string; methodology_id: string | null; name: string; description: string | null
  order_index: number | null; methodology_name: string | null; methodology_code: string | null
}
interface Module {
  id: string; name: string; description: string | null; order_index: number | null; is_active: boolean | null
}
interface TeachingSequence {
  id: string; title: string; methodology_name: string | null; age_range: string | null
  duration_weeks: number | null; objectives: string | null; week_number: number | null
  main_activity: string | null; circle_activity: string | null; game_dynamic: string | null
  required_materials: string | null; notes: string | null
}
interface LearningPath {
  id: string; title: string; description: string | null; cycle: string | null
  methodology_name: string | null; instrument_name: string | null
  difficulty_min: number | null; difficulty_max: number | null; step_count: number | null
}

/* Os 8 pilares Alpha — DNA transversal (mantido). */
const ALPHA_PILLARS = [
  { num: 1, title: 'Desafios Contínuos + Registro Digital', desc: 'O aluno nunca para. Sempre há um próximo passo.' },
  { num: 2, title: 'Aprendizagem Ativa e Protagonismo', desc: 'O aluno lidera, sugere, cria.' },
  { num: 3, title: 'Aprendizagem entre Pares', desc: 'Alunos avançados mentoram iniciantes.' },
  { num: 4, title: 'Integração App + Presencial', desc: 'Vídeos, feedback, comunidade entre as aulas.' },
  { num: 5, title: 'Projetos Coletivos', desc: 'Gravações, festivais, bandas experimentais.' },
  { num: 6, title: 'Acompanhamento Individualizado', desc: 'Professor acompanha evolução via app.' },
  { num: 7, title: 'Feedback e Celebração Constante', desc: 'Reconhecimento público, mural digital.' },
  { num: 8, title: 'Espiritualidade, Valores e Cultura Nipo-Brasileira', desc: 'União, respeito, disciplina, alegria.' },
]

const LEARNING_CYCLES = [
  { name: 'Inicial', age: '6-7 anos', color: '#16a34a', methods: ['Orff', 'Dalcroze', 'Waldorf'], desc: 'Exploração sonora, corpo, jogos, ritmo.' },
  { name: 'Fundamental', age: '8-11 anos', color: '#2563eb', methods: ['Kodály', 'Suzuki', 'Gordon', 'Musical Futures'], desc: 'Instrumentos, literacia, improvisação, grupos.' },
  { name: 'Intermediário', age: '12-14 anos', color: '#7c3aed', methods: ['Berklee', 'Lincoln', 'PRESTO'], desc: 'Bandas, performance, digital, autoria.' },
  { name: 'Avançado', age: '15+ anos', color: '#dc2626', methods: ['Berklee', 'Digital', 'Mentoria'], desc: 'Produção, empreendedorismo, especialização.' },
]

/* Normaliza key_principles (jsonb pode vir como array, objeto ou string). */
function toList(value: any): string[] {
  if (!value) return []
  if (Array.isArray(value)) return value.map(v => String(v))
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value)
      if (Array.isArray(parsed)) return parsed.map(v => String(v))
    } catch { /* texto puro */ }
    return value.split(/\n|;/).map(s => s.trim()).filter(Boolean)
  }
  if (typeof value === 'object') return Object.values(value).map(v => String(v))
  return []
}

type TabKey = 'metodologias' | 'competencias' | 'modulos' | 'sequencias' | 'trilhas'

export default function CurriculumPage() {
  const [methodologies, setMethodologies] = useState<Methodology[]>([])
  const [competencies, setCompetencies] = useState<Competency[]>([])
  const [modules, setModules] = useState<Module[]>([])
  const [sequences, setSequences] = useState<TeachingSequence[]>([])
  const [paths, setPaths] = useState<LearningPath[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<TabKey>('metodologias')

  useEffect(() => {
    async function load() {
      try {
        const [m, c, mod, s, p] = await Promise.all([
          db.from('v_methodologies').select('*').order('name'),
          db.from('v_competencies').select('*').order('order_index'),
          db.from('v_modules').select('*').order('order_index'),
          db.from('v_teaching_sequences').select('*').order('week_number'),
          db.from('v_learning_paths').select('*').order('cycle'),
        ])
        setMethodologies((m.data as Methodology[]) || [])
        setCompetencies((c.data as Competency[]) || [])
        setModules((mod.data as Module[]) || [])
        setSequences((s.data as TeachingSequence[]) || [])
        setPaths((p.data as LearningPath[]) || [])
      } catch (e) {
        console.error('Erro ao carregar currículo:', e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const tabs = useMemo(() => ([
    { key: 'metodologias' as const, label: 'Metodologias', icon: Layers, n: methodologies.length },
    { key: 'competencias' as const, label: 'Competências', icon: Target, n: competencies.length },
    { key: 'modulos' as const, label: 'Módulos', icon: GitBranch, n: modules.length },
    { key: 'sequencias' as const, label: 'Sequências Didáticas', icon: CalendarDays, n: sequences.length },
    { key: 'trilhas' as const, label: 'Trilhas & Ciclos', icon: Route, n: paths.length },
  ]), [methodologies, competencies, modules, sequences, paths])

  return (
    <div className="space-y-8 pb-12">
      {/* ===== Masthead editorial ===== */}
      <header className="relative overflow-hidden rounded-3xl bg-stone-950 text-white px-6 py-12 md:px-12 md:py-14">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-2 top-1/2 -translate-y-1/2 font-extrabold text-white/[0.05] select-none leading-none"
          style={{ writingMode: 'vertical-rl', fontSize: '11rem' }}
        >
          教育
        </span>
        <div className="pointer-events-none absolute -left-16 -top-16 w-72 h-72 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="relative z-10 max-w-2xl">
          <Link href="/academic" className="inline-flex items-center gap-2 text-sm text-stone-400 hover:text-white mb-5">
            <ArrowLeft className="w-4 h-4" /> Acadêmico
          </Link>
          <p className="text-indigo-300 tracking-[0.35em] text-xs font-semibold uppercase mb-4">道 · Currículo</p>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-[1.05]">O Método Alpha.</h1>
          <p className="mt-5 text-stone-400 text-lg">
            <span className="nw-tabular text-white font-semibold">{methodologies.length}</span> metodologias,{' '}
            <span className="nw-tabular text-white font-semibold">{competencies.length}</span> competências e{' '}
            <span className="nw-tabular text-white font-semibold">{modules.length}</span> módulos que estruturam o ensino.
          </p>
        </div>
      </header>

      {/* ===== Os 8 Pilares Alpha (DNA transversal) ===== */}
      <PillarsBlock />

      {/* ===== Abas ===== */}
      <div className="flex gap-1 overflow-x-auto border-b border-stone-200">
        {tabs.map(t => {
          const Icon = t.icon
          const on = tab === t.key
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`relative shrink-0 flex items-center gap-2 px-4 py-3.5 text-sm font-semibold transition-colors ${on ? 'text-stone-900' : 'text-stone-400 hover:text-stone-600'}`}
            >
              <Icon className="w-4 h-4" />
              {t.label}
              <span className="nw-tabular text-xs text-stone-400">{t.n}</span>
              {on && <span className="absolute left-3 right-3 -bottom-px h-0.5 rounded-full" style={{ background: ACCENT }} />}
            </button>
          )
        })}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-32 bg-stone-100 rounded-2xl animate-pulse" />)}
        </div>
      ) : (
        <>
          {tab === 'metodologias' && <MethodologiesTab items={methodologies} />}
          {tab === 'competencias' && <CompetenciesTab items={competencies} />}
          {tab === 'modulos' && <ModulesTab items={modules} />}
          {tab === 'sequencias' && <SequencesTab items={sequences} />}
          {tab === 'trilhas' && <PathsTab paths={paths} />}
        </>
      )}
    </div>
  )
}

/* ---------- cabeçalho de seção (kanji + régua colorida) ---------- */
function SectionHead({ kanji, title, count, color = ACCENT }: { kanji: string; title: string; count?: number; color?: string }) {
  return (
    <div className="flex items-baseline gap-4 mb-6 pb-3 border-b-2" style={{ borderColor: color }}>
      <span className="font-extrabold leading-none select-none" style={{ color, fontSize: '2rem' }} aria-hidden>{kanji}</span>
      <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900">{title}</h2>
      {count != null && <span className="nw-tabular ml-auto text-sm text-stone-400">{count}</span>}
    </div>
  )
}

function EmptyState({ text }: { text: string }) {
  return <div className="text-center py-16 text-stone-400"><BookOpen className="w-10 h-10 mx-auto mb-3 opacity-40" /><p>{text}</p></div>
}

/* ---------- Pilares ---------- */
function PillarsBlock() {
  const [open, setOpen] = useState(false)
  return (
    <div className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 hover:bg-stone-50 transition-colors">
        <div className="flex items-center gap-3 text-left">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ background: '#dc2626' }}>
            <Star className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-extrabold text-stone-900">Os 8 Pilares do Método Alpha</h2>
            <p className="text-xs text-stone-500">DNA da Nipo School — eixo transversal de todo o currículo</p>
          </div>
        </div>
        {open ? <ChevronUp className="w-5 h-5 text-stone-400" /> : <ChevronDown className="w-5 h-5 text-stone-400" />}
      </button>
      {open && (
        <div className="px-5 pb-5 grid grid-cols-1 md:grid-cols-2 gap-3">
          {ALPHA_PILLARS.map(p => (
            <div key={p.num} className="flex items-start gap-3 p-3 bg-red-50/50 rounded-xl border border-red-100">
              <div className="nw-tabular w-7 h-7 bg-red-100 rounded-full flex items-center justify-center text-red-700 font-bold text-xs flex-shrink-0">{p.num}</div>
              <div>
                <p className="text-sm font-bold text-stone-900">{p.title}</p>
                <p className="text-xs text-stone-500">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ---------- Metodologias (mostra philosophy + key_principles) ---------- */
function MethodologiesTab({ items }: { items: Methodology[] }) {
  const [expanded, setExpanded] = useState<string | null>(null)
  if (!items.length) return <EmptyState text="Nenhuma metodologia cadastrada." />
  return (
    <section>
      <SectionHead kanji="法" title="Metodologias" count={items.length} />
      <div className="space-y-3">
        {items.map(m => {
          const principles = toList(m.key_principles)
          const open = expanded === m.id
          return (
            <div key={m.id} className="nw-card bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden" style={{ borderLeftWidth: 3, borderLeftColor: ACCENT }}>
              <button onClick={() => setExpanded(open ? null : m.id)} className="w-full flex items-center gap-4 p-4 hover:bg-stone-50 transition-colors text-left">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm" style={{ background: `${ACCENT}14`, color: ACCENT }}>
                  {m.code?.slice(0, 3).toUpperCase() || <Layers className="w-5 h-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-stone-900 text-sm">{m.name}</h3>
                  {m.description && <p className="text-xs text-stone-500 line-clamp-1">{m.description}</p>}
                </div>
                {principles.length > 0 && <span className="nw-tabular text-xs text-stone-400 shrink-0">{principles.length} princípios</span>}
                {open ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
              </button>

              {open && (
                <div className="border-t border-stone-100 px-5 py-5 space-y-5 nw-rise">
                  {m.description && (
                    <p className="text-sm text-stone-600 leading-relaxed">{m.description}</p>
                  )}
                  {m.philosophy && (
                    <div>
                      <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-stone-400 mb-2">
                        <Sparkles className="w-3.5 h-3.5" /> Filosofia
                      </p>
                      <p className="text-sm text-stone-700 leading-relaxed whitespace-pre-wrap rounded-xl p-4" style={{ background: `${ACCENT}08` }}>
                        {m.philosophy}
                      </p>
                    </div>
                  )}
                  {principles.length > 0 && (
                    <div>
                      <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-stone-400 mb-2">
                        <ListChecks className="w-3.5 h-3.5" /> Princípios-chave
                      </p>
                      <ul className="grid sm:grid-cols-2 gap-2">
                        {principles.map((p, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-stone-700">
                            <span className="nw-tabular mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0" style={{ background: `${ACCENT}14`, color: ACCENT }}>{i + 1}</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

/* ---------- Competências (agrupadas por metodologia) ---------- */
function CompetenciesTab({ items }: { items: Competency[] }) {
  const groups = useMemo(() => {
    const map = new Map<string, Competency[]>()
    for (const c of items) {
      const key = c.methodology_name || 'Sem metodologia'
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(c)
    }
    return [...map.entries()]
  }, [items])

  if (!items.length) return <EmptyState text="Nenhuma competência cadastrada." />
  return (
    <section>
      <SectionHead kanji="能" title="Competências" count={items.length} />
      <div className="space-y-8">
        {groups.map(([methodology, comps]) => (
          <div key={methodology}>
            <h3 className="text-sm font-bold uppercase tracking-wide text-stone-400 mb-3">{methodology}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {comps.map(c => (
                <div key={c.id} className="nw-card bg-white rounded-2xl border border-stone-100 shadow-sm p-4" style={{ borderLeftWidth: 3, borderLeftColor: ACCENT }}>
                  <p className="font-bold text-stone-900 text-sm">{c.name}</p>
                  {c.description && <p className="text-sm text-stone-500 mt-1 leading-relaxed">{c.description}</p>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ---------- Módulos ---------- */
function ModulesTab({ items }: { items: Module[] }) {
  if (!items.length) return <EmptyState text="Nenhum módulo cadastrado." />
  return (
    <section>
      <SectionHead kanji="課" title="Módulos" count={items.length} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((m, i) => (
          <div key={m.id} className="nw-card relative bg-white rounded-2xl border border-stone-100 shadow-sm p-5 overflow-hidden" style={{ borderTopWidth: 3, borderTopColor: ACCENT }}>
            <span className="nw-tabular absolute top-4 right-5 text-2xl font-extrabold text-stone-100">{String(i + 1).padStart(2, '0')}</span>
            <p className="font-bold text-stone-900 relative z-10">{m.name}</p>
            {m.description && <p className="text-sm text-stone-500 mt-2 leading-relaxed relative z-10">{m.description}</p>}
          </div>
        ))}
      </div>
    </section>
  )
}

/* ---------- Sequências Didáticas ---------- */
function SequencesTab({ items }: { items: TeachingSequence[] }) {
  if (!items.length) return <EmptyState text="Nenhuma sequência didática cadastrada." />
  return (
    <section>
      <SectionHead kanji="序" title="Sequências Didáticas" count={items.length} />
      <div className="space-y-4">
        {items.map(s => (
          <article key={s.id} className="nw-card bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden" style={{ borderLeftWidth: 3, borderLeftColor: ACCENT }}>
            <div className="p-5">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {s.week_number != null && (
                  <span className="nw-tabular inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full text-white" style={{ background: ACCENT }}>
                    Semana {s.week_number}
                  </span>
                )}
                {s.methodology_name && <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ background: `${ACCENT}14`, color: ACCENT }}>{s.methodology_name}</span>}
                {s.age_range && <Meta icon={Users2} text={s.age_range} />}
                {s.duration_weeks != null && <Meta icon={Clock} text={`${s.duration_weeks} semanas`} />}
              </div>
              <h3 className="font-extrabold text-stone-900 text-lg leading-tight">{s.title}</h3>
              {s.objectives && <p className="text-sm text-stone-600 mt-2 leading-relaxed">{s.objectives}</p>}

              <div className="grid sm:grid-cols-3 gap-3 mt-4">
                {s.main_activity && <Block label="Atividade principal" text={s.main_activity} />}
                {s.circle_activity && <Block label="Roda / círculo" text={s.circle_activity} />}
                {s.game_dynamic && <Block label="Dinâmica de jogo" text={s.game_dynamic} />}
              </div>

              {(s.required_materials || s.notes) && (
                <div className="mt-4 pt-4 border-t border-stone-100 space-y-1.5">
                  {s.required_materials && <p className="text-xs text-stone-500"><span className="font-semibold text-stone-600">Materiais:</span> {s.required_materials}</p>}
                  {s.notes && <p className="text-xs text-stone-500"><span className="font-semibold text-stone-600">Notas:</span> {s.notes}</p>}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function Meta({ icon: Icon, text }: { icon: any; text: string }) {
  return <span className="inline-flex items-center gap-1 text-[11px] text-stone-500"><Icon className="w-3.5 h-3.5" />{text}</span>
}
function Block({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-xl p-3" style={{ background: `${ACCENT}08` }}>
      <p className="text-[10px] font-bold uppercase tracking-wide text-stone-400 mb-1">{label}</p>
      <p className="text-sm text-stone-700 leading-relaxed">{text}</p>
    </div>
  )
}

/* ---------- Trilhas & Ciclos (learning paths + ciclos didáticos) ---------- */
function PathsTab({ paths }: { paths: LearningPath[] }) {
  return (
    <div className="space-y-12">
      {/* Ciclos de aprendizagem */}
      <section>
        <SectionHead kanji="期" title="Ciclos de Aprendizagem" count={LEARNING_CYCLES.length} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {LEARNING_CYCLES.map(cycle => (
            <div key={cycle.name} className="nw-card relative bg-white rounded-2xl border border-stone-100 shadow-sm p-4 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1" style={{ background: cycle.color }} />
              <h3 className="font-bold text-stone-900 text-sm mt-1">{cycle.name}</h3>
              <p className="text-xs text-stone-400 mb-2">{cycle.age}</p>
              <p className="text-xs text-stone-600 mb-3">{cycle.desc}</p>
              <div className="flex flex-wrap gap-1">
                {cycle.methods.map(m => <span key={m} className="px-1.5 py-0.5 bg-stone-100 text-stone-600 text-[10px] rounded font-medium">{m}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trilhas (learning paths do banco) */}
      <section>
        <SectionHead kanji="路" title="Trilhas de Aprendizagem" count={paths.length} />
        {paths.length === 0 ? (
          <EmptyState text="Nenhuma trilha cadastrada ainda." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paths.map(p => (
              <Link key={p.id} href="/paths" className="group nw-card relative bg-white rounded-2xl border border-stone-100 shadow-sm p-5 overflow-hidden hover:-translate-y-0.5 hover:shadow-md transition-all" style={{ borderLeftWidth: 3, borderLeftColor: ACCENT }}>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {p.cycle && <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ background: `${ACCENT}14`, color: ACCENT }}>{p.cycle}</span>}
                  {p.methodology_name && <span className="text-[11px] text-stone-500">{p.methodology_name}</span>}
                  {p.instrument_name && <span className="text-[11px] text-stone-500">· {p.instrument_name}</span>}
                </div>
                <h3 className="font-extrabold text-stone-900 leading-tight">{p.title}</h3>
                {p.description && <p className="text-sm text-stone-500 mt-1 line-clamp-2 leading-relaxed">{p.description}</p>}
                <div className="mt-3 flex items-center gap-4 text-xs text-stone-400">
                  {p.step_count != null && <span className="inline-flex items-center gap-1"><Route className="w-3.5 h-3.5" /><span className="nw-tabular">{p.step_count}</span> etapas</span>}
                  {(p.difficulty_min != null || p.difficulty_max != null) && (
                    <span className="nw-tabular">Nível {p.difficulty_min ?? 1}–{p.difficulty_max ?? 5}</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
