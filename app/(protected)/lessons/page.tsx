'use client'

import { useEffect, useState, useMemo } from 'react'
import { supabase } from '@/lib/supabase/client'
import { RoleView } from '@/components/auth/RoleView'
import { PermissionGate } from '@/components/auth/PermissionGate'
import { usePermissions } from '@/app/providers/PermissionsProvider'
import {
  BookOpen, Plus, ChevronRight, Calendar, Sprout, Leaf, TreePine, Star,
  KanbanSquare, Filter, Zap, RefreshCw, Target, Lightbulb, Globe, Mic,
  Clapperboard, GraduationCap, Lock, Clock,
} from 'lucide-react'
import Link from 'next/link'
import {
  LESSON_LEVELS, LESSON_LEVELS_YEAR2, getLessonLevel, getLessonLevelYear2,
  getLessonYear, STATUS_LABELS, STATUS_COLORS, LEVEL_COLORS,
} from '@/lib/lessons/constants'
import type { LessonLevel, LessonLevelYear2 } from '@/lib/lessons/constants'
import type { Tables } from '@/lib/supabase/database.types'

type Lesson = Tables<'v_lessons'>
type LessonProgress = Tables<'v_lesson_progress'>

const levelIconsY1 = {
  iniciante: Sprout,
  intermediario: Leaf,
  avancado: TreePine,
  showFinal: Star,
}

const levelIconsY2 = {
  retomada: RefreshCw,
  aprofundamento: Target,
  criacao: Lightbulb,
  cultura: Globe,
  performance: Mic,
  projetos: Clapperboard,
  formatura: GraduationCap,
}

const levelRoutes: Record<string, string> = {
  iniciante: '/lessons/iniciante',
  intermediario: '/lessons/intermediario',
  avancado: '/lessons/avancado',
  showFinal: '/lessons/show-final',
  retomada: '/lessons/retomada',
  aprofundamento: '/lessons/aprofundamento',
  criacao: '/lessons/criacao',
  cultura: '/lessons/cultura',
  performance: '/lessons/performance',
  projetos: '/lessons/projetos',
  formatura: '/lessons/formatura',
}

// Kanji editorial por nível — complementa o emoji existente em LESSON_LEVELS.
const levelKanji: Record<string, string> = {
  iniciante: '初', intermediario: '中', avancado: '上', showFinal: '舞',
  retomada: '再', aprofundamento: '深', criacao: '創', cultura: '化',
  performance: '演', projetos: '作', formatura: '卒',
}

// Cor hex por chave de cor do LEVEL_COLORS — para réguas/kanji/barras via style inline.
const LEVEL_HEX: Record<string, string> = {
  green: '#16a34a',
  yellow: '#ca8a04',
  red: '#dc2626',
  blue: '#2563eb',
  orange: '#ea580c',
  purple: '#7c3aed',
  amber: '#d97706',
}

export default function LessonsPage() {
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [progress, setProgress] = useState<LessonProgress[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('')
  const [selectedYear, setSelectedYear] = useState<1 | 2>(1)
  const { role } = usePermissions()
  const isStudent = role?.slug === 'student'

  useEffect(() => {
    async function load() {
      try {
        const { data: { user } } = await supabase.auth.getUser()

        const [lessonsRes, progressRes] = await Promise.all([
          supabase.from('v_lessons').select('*').order('number'),
          user ? supabase.from('v_lesson_progress').select('*').eq('student_id', user.id) : { data: [] },
        ])

        if (lessonsRes.data) setLessons(lessonsRes.data as Lesson[])
        if (progressRes.data) setProgress(progressRes.data as LessonProgress[])
      } catch (error) {
        console.error('Error loading lessons:', error)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const progressMap = useMemo(() => {
    const map = new Map<string, boolean>()
    progress.forEach(p => map.set(p.lesson_id, p.is_completed))
    return map
  }, [progress])

  const totalCompleted = progress.filter(p => p.is_completed).length

  // Year-filtered lessons
  const yearLessons = useMemo(() => {
    return lessons.filter(l => getLessonYear(l.number) === selectedYear)
  }, [lessons, selectedYear])

  // Count completions per level for Year 1
  const levelStatsY1 = useMemo(() => {
    const stats: Record<LessonLevel, { total: number; completed: number }> = {
      iniciante: { total: 0, completed: 0 },
      intermediario: { total: 0, completed: 0 },
      avancado: { total: 0, completed: 0 },
      showFinal: { total: 0, completed: 0 },
    }

    lessons.filter(l => getLessonYear(l.number) === 1).forEach(l => {
      const level = getLessonLevel(l.number)
      stats[level].total++
      if (progressMap.get(l.id)) stats[level].completed++
    })

    return stats
  }, [lessons, progressMap])

  // Count completions per level for Year 2
  const levelStatsY2 = useMemo(() => {
    const stats: Record<LessonLevelYear2, { total: number; completed: number }> = {
      retomada: { total: 0, completed: 0 },
      aprofundamento: { total: 0, completed: 0 },
      criacao: { total: 0, completed: 0 },
      cultura: { total: 0, completed: 0 },
      performance: { total: 0, completed: 0 },
      projetos: { total: 0, completed: 0 },
      formatura: { total: 0, completed: 0 },
    }

    lessons.filter(l => getLessonYear(l.number) === 2).forEach(l => {
      const level = getLessonLevelYear2(l.number)
      stats[level].total++
      if (progressMap.get(l.id)) stats[level].completed++
    })

    return stats
  }, [lessons, progressMap])

  // Lessons grouped by level key (for the editorial sections)
  const lessonsByLevel = useMemo(() => {
    const map = new Map<string, Lesson[]>()
    yearLessons.forEach(l => {
      const key = selectedYear === 1 ? getLessonLevel(l.number) : getLessonLevelYear2(l.number)
      const arr = map.get(key) || []
      arr.push(l)
      map.set(key, arr)
    })
    return map
  }, [yearLessons, selectedYear])

  // Teacher/admin filtered lessons
  const filteredLessons = useMemo(() => {
    let filtered = yearLessons
    if (statusFilter) filtered = filtered.filter(l => l.status === statusFilter)
    return filtered
  }, [yearLessons, statusFilter])

  // Year counts for tabs
  const y1Count = lessons.filter(l => getLessonYear(l.number) === 1).length
  const y2Count = lessons.filter(l => getLessonYear(l.number) === 2).length
  const y1Completed = lessons.filter(l => getLessonYear(l.number) === 1 && progressMap.get(l.id)).length
  const y2Completed = lessons.filter(l => getLessonYear(l.number) === 2 && progressMap.get(l.id)).length

  const yearCount = selectedYear === 1 ? y1Count : y2Count
  const yearCompleted = selectedYear === 1 ? y1Completed : y2Completed
  const yearPercent = yearCount > 0 ? Math.round((yearCompleted / yearCount) * 100) : 0

  if (loading) return (
    <div className="space-y-4">
      <div className="h-56 bg-stone-200 rounded-3xl animate-pulse" />
      {[1, 2, 3].map(i => <div key={i} className="h-32 bg-stone-200 rounded-2xl animate-pulse" />)}
    </div>
  )

  return (
    <div className="space-y-10 pb-12">
      {/* ===== Masthead editorial ===== */}
      <header className="relative overflow-hidden rounded-3xl bg-stone-950 text-white px-6 py-12 md:px-12 md:py-14 nw-rise">
        <span aria-hidden className="pointer-events-none absolute -right-2 top-1/2 -translate-y-1/2 font-extrabold text-white/[0.05] select-none leading-none"
          style={{ writingMode: 'vertical-rl', fontSize: '11rem' }}>授業</span>
        <div className="pointer-events-none absolute -left-16 -top-16 w-72 h-72 rounded-full bg-student/20 blur-3xl" />

        <div className="relative z-10">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="max-w-2xl">
              <p className="text-student tracking-[0.35em] text-xs font-semibold uppercase mb-4">授業 · Aulas</p>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.05]">
                <RoleView
                  student={<>Minhas aulas.</>}
                  teacher={<>Gestão de aulas.</>}
                  admin={<>Todas as aulas.</>}
                />
              </h1>
              <p className="mt-5 text-stone-400 text-lg">
                <span className="nw-tabular text-white font-semibold">{yearCount}</span> aulas
                {' '}— <span className="nw-tabular text-white font-semibold">{lessons.length}</span> no currículo completo.
              </p>
            </div>

            <PermissionGate permission="lessons.create">
              <div className="flex items-center gap-2">
                <Link href="/lessons/kanban" className="flex items-center gap-2 px-4 py-2.5 bg-white/10 border border-white/15 text-white rounded-full font-medium hover:bg-white/20 transition-colors text-sm">
                  <KanbanSquare className="w-4 h-4" />
                  Kanban
                </Link>
                <Link href="/lessons/new" className="flex items-center gap-2 px-4 py-2.5 bg-student text-white rounded-full font-bold hover:bg-student-dark transition-colors text-sm">
                  <Plus className="w-4 h-4" />
                  Nova Aula
                </Link>
              </div>
            </PermissionGate>
          </div>

          {/* Toggle de Ano */}
          <div className="mt-8 inline-flex items-center gap-1 bg-white/[0.06] border border-white/10 rounded-full p-1">
            <button
              onClick={() => setSelectedYear(1)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                selectedYear === 1 ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-300 hover:text-white'
              }`}
            >
              Ano 1 · 2025
              {isStudent && <span className="ml-2 text-xs opacity-60 nw-tabular">{y1Completed}/{y1Count}</span>}
            </button>
            <button
              onClick={() => setSelectedYear(2)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                selectedYear === 2 ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-300 hover:text-white'
              }`}
            >
              Ano 2 · 2026
              {isStudent && <span className="ml-2 text-xs opacity-60 nw-tabular">{y2Completed}/{y2Count}</span>}
            </button>
          </div>
        </div>
      </header>

      {/* Student View */}
      {isStudent ? (
        <div className="space-y-12">
          {/* Progresso geral do ano */}
          <div className="nw-card p-6">
            <div className="flex items-baseline justify-between mb-3">
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">
                Progresso {selectedYear === 1 ? 'Ano 1' : 'Ano 2'}
              </span>
              <span className="text-sm font-bold text-stone-700 nw-tabular">
                {yearCompleted}/{yearCount} aulas · {yearPercent}%
              </span>
            </div>
            <div className="nw-progress">
              <span style={{ width: `${yearPercent}%`, background: LEVEL_HEX.red }} />
            </div>
          </div>

          {/* Atalho Desafio Alpha (somente Ano 2) */}
          {selectedYear === 2 && (
            <Link href="/lessons/alpha" className="block group">
              <div className="relative overflow-hidden rounded-2xl bg-stone-950 text-white p-5 flex items-center gap-4 hover:shadow-lg transition-all">
                <span aria-hidden className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 font-extrabold text-white/[0.06] select-none leading-none text-6xl">挑</span>
                <div className="relative w-12 h-12 bg-student/20 text-student rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6" />
                </div>
                <div className="relative flex-1">
                  <p className="text-student tracking-[0.3em] text-[10px] font-semibold uppercase mb-0.5">挑戦 · Alpha</p>
                  <h3 className="font-bold">Desafio Alpha</h3>
                  <p className="text-sm text-stone-400">Veja seu desafio semanal de vídeo</p>
                </div>
                <ChevronRight className="relative w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
              </div>
            </Link>
          )}

          {/* Seções editoriais por nível */}
          {selectedYear === 1 ? (
            (Object.entries(LESSON_LEVELS) as [LessonLevel, typeof LESSON_LEVELS[LessonLevel]][]).map(([key, level], idx) => {
              const isGated = key !== 'iniciante' && totalCompleted < level.prerequisite
              return (
                <LevelSection
                  key={key}
                  index={idx + 1}
                  levelKey={key}
                  emoji={level.emoji}
                  label={level.label}
                  description={level.description}
                  prerequisite={level.prerequisite}
                  totalCompleted={totalCompleted}
                  colorKey={level.color}
                  Icon={levelIconsY1[key]}
                  stats={levelStatsY1[key]}
                  isGated={isGated}
                  lessons={lessonsByLevel.get(key) || []}
                  progressMap={progressMap}
                  route={levelRoutes[key]}
                />
              )
            })
          ) : (
            (Object.entries(LESSON_LEVELS_YEAR2) as [LessonLevelYear2, typeof LESSON_LEVELS_YEAR2[LessonLevelYear2]][]).map(([key, level], idx) => {
              const isGated = totalCompleted < level.prerequisite
              return (
                <LevelSection
                  key={key}
                  index={idx + 1}
                  levelKey={key}
                  emoji={level.emoji}
                  label={level.label}
                  description={level.description}
                  prerequisite={level.prerequisite}
                  totalCompleted={totalCompleted}
                  colorKey={level.color}
                  Icon={levelIconsY2[key]}
                  stats={levelStatsY2[key]}
                  isGated={isGated}
                  lessons={lessonsByLevel.get(key) || []}
                  progressMap={progressMap}
                  route={levelRoutes[key]}
                />
              )
            })
          )}
        </div>
      ) : (
        /* Teacher/Admin: Flat list with filters */
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Filter className="w-4 h-4 text-stone-400" />
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-stone-200 rounded-full text-sm bg-white focus:outline-none focus:ring-2 focus:ring-student/20 focus:border-student/40"
            >
              <option value="">Todos os status</option>
              <option value="draft">Rascunho</option>
              <option value="scheduled">Agendada</option>
              <option value="in_progress">Em Andamento</option>
              <option value="completed">Concluída</option>
              <option value="cancelled">Cancelada</option>
            </select>
            <span className="text-xs text-stone-400 nw-tabular">{filteredLessons.length} aulas</span>
          </div>

          {filteredLessons.length === 0 ? (
            <div className="text-center py-16 nw-card">
              <BookOpen className="w-12 h-12 text-stone-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-stone-900 mb-2">Nenhuma aula encontrada</h3>
              <p className="text-sm text-stone-500">As aulas aparecerão aqui.</p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {filteredLessons.map(lesson => {
                const year = getLessonYear(lesson.number)
                const levelConfig = year === 1
                  ? LESSON_LEVELS[getLessonLevel(lesson.number)]
                  : LESSON_LEVELS_YEAR2[getLessonLevelYear2(lesson.number)]
                const hex = LEVEL_HEX[levelConfig.color] || '#78716c'
                return (
                  <Link key={lesson.id} href={`/lessons/${lesson.id}`} className="block group">
                    <div className="nw-card p-4 hover:border-student/40 flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center font-bold nw-tabular shrink-0"
                        style={{ background: `${hex}14`, color: hex }}
                      >
                        {lesson.number !== null ? lesson.number : '#'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-stone-900 group-hover:text-student transition-colors truncate">{lesson.title}</h3>
                        <div className="flex items-center gap-2 text-xs text-stone-400">
                          {lesson.module_name && <span className="truncate">{lesson.module_name}</span>}
                          {lesson.teacher_name && <><span>·</span><span className="truncate">{lesson.teacher_name}</span></>}
                          {lesson.duration_minutes != null && (
                            <span className="items-center gap-1 hidden sm:flex nw-tabular">
                              <Clock className="w-3 h-3" />{lesson.duration_minutes} min
                            </span>
                          )}
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-bold ${STATUS_COLORS[lesson.status] || 'bg-gray-100 text-gray-600'}`}>
                        {STATUS_LABELS[lesson.status] || lesson.status}
                      </span>
                      {lesson.scheduled_date && (
                        <span className="text-xs text-stone-400 items-center gap-1 hidden sm:flex nw-tabular">
                          <Calendar className="w-3 h-3" />
                          {new Date(lesson.scheduled_date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                        </span>
                      )}
                      <ChevronRight className="w-4 h-4 text-stone-300 group-hover:text-student transition-colors shrink-0" />
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ============================================================================
// Seção editorial de um nível — cabeçalho com kanji + régua na cor do nível,
// índice em mono, barra de progresso .nw-progress, e cards das aulas.
// Respeita o gating: níveis bloqueados não listam aulas.
// ============================================================================
function LevelSection({
  index, levelKey, emoji, label, description, prerequisite, totalCompleted,
  colorKey, Icon, stats, isGated, lessons, progressMap, route,
}: {
  index: number
  levelKey: string
  emoji: string
  label: string
  description: string
  prerequisite: number
  totalCompleted: number
  colorKey: string
  Icon: React.ComponentType<{ className?: string }>
  stats: { total: number; completed: number }
  isGated: boolean
  lessons: Lesson[]
  progressMap: Map<string, boolean>
  route: string
}) {
  const hex = LEVEL_HEX[colorKey] || '#78716c'
  const percent = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0
  const kanji = levelKanji[levelKey] || '楽'

  return (
    <section className={isGated ? 'opacity-70' : undefined}>
      {/* Cabeçalho editorial do nível */}
      <div className="flex items-baseline gap-4 mb-5 pb-3 border-b-2" style={{ borderColor: hex }}>
        <span className="font-extrabold leading-none select-none" style={{ color: hex, fontSize: '2rem' }} aria-hidden>{kanji}</span>
        <div className="flex items-baseline gap-2 min-w-0">
          <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900">{emoji} {label}</h2>
          {isGated && <Lock className="w-4 h-4 text-amber-500 self-center shrink-0" />}
        </div>
        <span className="nw-tabular ml-auto text-sm text-stone-400 shrink-0">
          {String(index).padStart(2, '0')} · <span className="text-stone-600">{stats.total}</span>
        </span>
      </div>

      <p className="text-sm text-stone-500 mb-4 max-w-2xl">{description}</p>

      {/* Barra de progresso do nível */}
      {!isGated && stats.total > 0 && (
        <div className="mb-5">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-stone-500 nw-tabular">{stats.completed}/{stats.total} concluídas</span>
            <span className="font-bold text-stone-700 nw-tabular">{percent}%</span>
          </div>
          <div className="nw-progress">
            <span style={{ width: `${percent}%`, background: hex }} />
          </div>
        </div>
      )}

      {isGated ? (
        /* Nível bloqueado — gating preservado */
        <div className="nw-card p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#fef3c7', color: '#d97706' }}>
            <Lock className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-stone-900">Nível bloqueado</p>
            <p className="text-xs text-amber-600 font-medium nw-tabular">
              Requer {prerequisite} aulas concluídas ({totalCompleted} feitas)
            </p>
          </div>
        </div>
      ) : lessons.length === 0 ? (
        <div className="nw-card p-6 text-sm text-stone-400">Nenhuma aula publicada neste nível ainda.</div>
      ) : (
        <div className="space-y-2.5">
          {lessons.map(lesson => {
            const done = progressMap.get(lesson.id)
            return (
              <Link key={lesson.id} href={`/lessons/${lesson.id}`} className="block group">
                <div className="nw-card p-4 hover:border-student/40 flex items-center gap-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center font-bold nw-tabular shrink-0"
                    style={{ background: `${hex}14`, color: hex }}
                  >
                    {lesson.number !== null ? lesson.number : '#'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-stone-900 group-hover:text-student transition-colors truncate">{lesson.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-stone-400">
                      {lesson.module_name && <span className="truncate">{lesson.module_name}</span>}
                      {lesson.duration_minutes != null && (
                        <span className="items-center gap-1 hidden sm:flex nw-tabular">
                          <Clock className="w-3 h-3" />{lesson.duration_minutes} min
                        </span>
                      )}
                    </div>
                  </div>
                  {done ? (
                    <span className="px-2 py-1 rounded text-xs font-bold bg-emerald-100 text-emerald-700 shrink-0">Concluída</span>
                  ) : (
                    <span className={`px-2 py-1 rounded text-xs font-bold ${STATUS_COLORS[lesson.status] || 'bg-gray-100 text-gray-600'} shrink-0`}>
                      {STATUS_LABELS[lesson.status] || lesson.status}
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 text-stone-300 group-hover:text-student transition-colors shrink-0" />
                </div>
              </Link>
            )
          })}

          {/* Link para a página completa do nível (rota preservada) */}
          <Link href={route} className="inline-flex items-center gap-1 text-sm font-semibold pt-1 hover:gap-2 transition-all" style={{ color: hex }}>
            Ver nível completo <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </section>
  )
}
