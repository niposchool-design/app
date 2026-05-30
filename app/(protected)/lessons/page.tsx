'use client'

import { useEffect, useState, useMemo } from 'react'
import { supabase } from '@/lib/supabase/client'
import { RoleView } from '@/components/auth/RoleView'
import { PermissionGate } from '@/components/auth/PermissionGate'
import { usePermissions } from '@/app/providers/PermissionsProvider'
import {
  BookOpen, Plus, ChevronRight, Calendar, Sprout, Leaf, TreePine, Star,
  KanbanSquare, Filter, Zap, RefreshCw, Target, Lightbulb, Globe, Mic,
  Clapperboard, GraduationCap,
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

  if (loading) return (
    <div className="space-y-4">
      {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-gray-200 rounded-2xl animate-pulse" />)}
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-indigo-500" />
          <RoleView
            student={<>Minhas Aulas</>}
            teacher={<>Gestao de Aulas</>}
            admin={<>Todas as Aulas</>}
          />
        </h1>
        <div className="flex items-center gap-2">
          <PermissionGate permission="lessons.create">
            <Link href="/lessons/kanban" className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors text-sm">
              <KanbanSquare className="w-4 h-4" />
              Kanban
            </Link>
          </PermissionGate>
          <PermissionGate permission="lessons.create">
            <Link href="/lessons/new" className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors text-sm">
              <Plus className="w-4 h-4" />
              Nova Aula
            </Link>
          </PermissionGate>
        </div>
      </div>

      {/* Year Toggle */}
      <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
        <button
          onClick={() => setSelectedYear(1)}
          className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${
            selectedYear === 1
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Ano 1 - 2025
          {isStudent && <span className="ml-2 text-xs opacity-60 nw-tabular">{y1Completed}/{y1Count}</span>}
        </button>
        <button
          onClick={() => setSelectedYear(2)}
          className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${
            selectedYear === 2
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Ano 2 - 2026
          {isStudent && <span className="ml-2 text-xs opacity-60 nw-tabular">{y2Completed}/{y2Count}</span>}
        </button>
      </div>

      {/* Student View */}
      {isStudent ? (
        <div className="space-y-6">
          {/* Overall progress for selected year */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700">
                Progresso {selectedYear === 1 ? 'Ano 1' : 'Ano 2'}
              </span>
              <span className="text-sm font-bold text-indigo-600 nw-tabular">
                {selectedYear === 1 ? y1Completed : y2Completed}/{selectedYear === 1 ? y1Count : y2Count} aulas
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-indigo-500 to-blue-500 h-3 rounded-full transition-all"
                style={{ width: `${(selectedYear === 1 ? y1Count : y2Count) > 0 ? ((selectedYear === 1 ? y1Completed : y2Completed) / (selectedYear === 1 ? y1Count : y2Count)) * 100 : 0}%` }}
              />
            </div>
          </div>

          {/* Alpha Challenge shortcut (Year 2 only) */}
          {selectedYear === 2 && (
            <Link href="/lessons/alpha" className="block group">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-4 text-white flex items-center gap-4 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold">Desafio Alpha</h3>
                  <p className="text-sm text-white/80">Veja seu desafio semanal de video</p>
                </div>
                <ChevronRight className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
              </div>
            </Link>
          )}

          {/* Level cards */}
          {selectedYear === 1 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(Object.entries(LESSON_LEVELS) as [LessonLevel, typeof LESSON_LEVELS[LessonLevel]][]).map(([key, level]) => {
                const Icon = levelIconsY1[key]
                const colors = LEVEL_COLORS[level.color]
                const stats = levelStatsY1[key]
                const percent = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0
                const isGated = key !== 'iniciante' && totalCompleted < level.prerequisite

                return (
                  <Link
                    key={key}
                    href={isGated ? '#' : levelRoutes[key]}
                    className={`group block rounded-2xl border overflow-hidden transition-all ${
                      isGated ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-lg hover:scale-[1.01]'
                    } ${colors.border}`}
                  >
                    <div className={`bg-gradient-to-br ${colors.gradient} p-6 text-white`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                            <Icon className="w-6 h-6" />
                          </div>
                          <div>
                            <h2 className="text-lg font-bold">{level.emoji} {level.label}</h2>
                            <p className="text-sm text-white/80">{stats.total} aulas</p>
                          </div>
                        </div>
                        {!isGated && <ChevronRight className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />}
                      </div>
                    </div>
                    <div className="bg-white p-4">
                      <p className="text-xs text-gray-500 mb-3 line-clamp-2">{level.description}</p>
                      {isGated ? (
                        <p className="text-xs text-amber-600 font-medium">
                          Requer {level.prerequisite} aulas concluidas ({totalCompleted} feitas)
                        </p>
                      ) : (
                        <>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-gray-500 nw-tabular">{stats.completed}/{stats.total} concluidas</span>
                            <span className="font-bold text-gray-700 nw-tabular">{percent}%</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2">
                            <div className={`bg-gradient-to-r ${colors.gradient} h-2 rounded-full transition-all`} style={{ width: `${percent}%` }} />
                          </div>
                        </>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(Object.entries(LESSON_LEVELS_YEAR2) as [LessonLevelYear2, typeof LESSON_LEVELS_YEAR2[LessonLevelYear2]][]).map(([key, level]) => {
                const Icon = levelIconsY2[key]
                const colors = LEVEL_COLORS[level.color]
                const stats = levelStatsY2[key]
                const percent = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0
                const isGated = totalCompleted < level.prerequisite

                return (
                  <Link
                    key={key}
                    href={isGated ? '#' : levelRoutes[key]}
                    className={`group block rounded-2xl border overflow-hidden transition-all ${
                      isGated ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-lg hover:scale-[1.01]'
                    } ${colors.border}`}
                  >
                    <div className={`bg-gradient-to-br ${colors.gradient} p-6 text-white`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                            <Icon className="w-6 h-6" />
                          </div>
                          <div>
                            <h2 className="text-lg font-bold">{level.emoji} {level.label}</h2>
                            <p className="text-sm text-white/80">{stats.total} aulas</p>
                          </div>
                        </div>
                        {!isGated && <ChevronRight className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />}
                      </div>
                    </div>
                    <div className="bg-white p-4">
                      <p className="text-xs text-gray-500 mb-3 line-clamp-2">{level.description}</p>
                      {isGated ? (
                        <p className="text-xs text-amber-600 font-medium">
                          Requer {level.prerequisite} aulas concluidas ({totalCompleted} feitas)
                        </p>
                      ) : (
                        <>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-gray-500 nw-tabular">{stats.completed}/{stats.total} concluidas</span>
                            <span className="font-bold text-gray-700 nw-tabular">{percent}%</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2">
                            <div className={`bg-gradient-to-r ${colors.gradient} h-2 rounded-full transition-all`} style={{ width: `${percent}%` }} />
                          </div>
                        </>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      ) : (
        /* Teacher/Admin: Flat list with filters */
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="">Todos os status</option>
              <option value="draft">Rascunho</option>
              <option value="scheduled">Agendada</option>
              <option value="in_progress">Em Andamento</option>
              <option value="completed">Concluida</option>
              <option value="cancelled">Cancelada</option>
            </select>
            <span className="text-xs text-gray-400 nw-tabular">{filteredLessons.length} aulas</span>
          </div>

          {filteredLessons.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Nenhuma aula encontrada</h3>
              <p className="text-sm text-gray-500">As aulas aparecerão aqui.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredLessons.map(lesson => {
                const year = getLessonYear(lesson.number)
                const levelKey = year === 1 ? getLessonLevel(lesson.number) : getLessonLevelYear2(lesson.number)
                const levelConfig = year === 1
                  ? LESSON_LEVELS[getLessonLevel(lesson.number)]
                  : LESSON_LEVELS_YEAR2[getLessonLevelYear2(lesson.number)]
                const colors = LEVEL_COLORS[levelConfig.color]
                return (
                  <Link key={lesson.id} href={`/lessons/${lesson.id}`} className="block group">
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md hover:border-indigo-200 transition-all flex items-center gap-4">
                      <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center ${colors.text} font-bold nw-tabular`}>
                        {lesson.number !== null ? lesson.number : '#'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 group-hover:text-indigo-700 transition-colors">{lesson.title}</h3>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          {lesson.module_name && <span>{lesson.module_name}</span>}
                          {lesson.teacher_name && <><span>-</span><span>{lesson.teacher_name}</span></>}
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-bold ${STATUS_COLORS[lesson.status] || 'bg-gray-100 text-gray-600'}`}>
                        {STATUS_LABELS[lesson.status] || lesson.status}
                      </span>
                      {lesson.scheduled_date && (
                        <span className="text-xs text-gray-400 items-center gap-1 hidden sm:flex">
                          <Calendar className="w-3 h-3" />
                          {new Date(lesson.scheduled_date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                        </span>
                      )}
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-500 transition-colors" />
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
