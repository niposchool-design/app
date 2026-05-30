'use client'

import { useEffect, useState, useMemo } from 'react'
import { supabase } from '@/lib/supabase/client'
import { PermissionGate } from '@/components/auth/PermissionGate'
import {
  KanbanSquare, ArrowLeft, ChevronRight, ChevronLeft, Calendar,
  Filter, User, BookOpen, Loader2, Zap,
} from 'lucide-react'
import Link from 'next/link'
import { updateLessonStatus } from '@/app/actions/lesson-actions'
import { getLessonLevel, LESSON_LEVELS, LEVEL_COLORS } from '@/lib/lessons/constants'
import type { Tables } from '@/lib/supabase/database.types'

type Lesson = Tables<'v_lessons'>

const COLUMNS = [
  { status: 'draft', label: 'Rascunho', color: 'bg-gray-400', bg: 'bg-gray-50', border: 'border-gray-200' },
  { status: 'scheduled', label: 'Agendada', color: 'bg-blue-400', bg: 'bg-blue-50', border: 'border-blue-200' },
  { status: 'in_progress', label: 'Em Andamento', color: 'bg-amber-400', bg: 'bg-amber-50', border: 'border-amber-200' },
  { status: 'completed', label: 'Concluida', color: 'bg-emerald-400', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  { status: 'cancelled', label: 'Cancelada', color: 'bg-red-400', bg: 'bg-red-50', border: 'border-red-200' },
] as const

const statusOrder = COLUMNS.map(c => c.status)

export default function KanbanPage() {
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)
  const [movingId, setMovingId] = useState<string | null>(null)
  const [filterTeacher, setFilterTeacher] = useState('')
  const [filterLevel, setFilterLevel] = useState('')
  const [filterSearch, setFilterSearch] = useState('')

  useEffect(() => {
    async function load() {
      try {
        const { data } = await supabase.from('v_lessons').select('*').order('number')
        if (data) setLessons(data as Lesson[])
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  // Unique teacher names for filter
  const teachers = useMemo(() => {
    const names = new Set<string>()
    lessons.forEach(l => { if (l.teacher_name) names.add(l.teacher_name) })
    return Array.from(names).sort()
  }, [lessons])

  // Filtered lessons
  const filtered = useMemo(() =>
    lessons.filter(l =>
      (!filterTeacher || l.teacher_name === filterTeacher) &&
      (!filterLevel || getLessonLevel(l.number) === filterLevel) &&
      (!filterSearch || l.title.toLowerCase().includes(filterSearch.toLowerCase()))
    ), [lessons, filterTeacher, filterLevel, filterSearch])

  // Group by status
  const columns = useMemo(() => {
    const map: Record<string, Lesson[]> = {}
    COLUMNS.forEach(c => { map[c.status] = [] })
    filtered.forEach(l => {
      if (map[l.status]) map[l.status].push(l)
      else map.draft.push(l)
    })
    return map
  }, [filtered])

  async function moveLesson(lessonId: string, newStatus: string) {
    if (movingId) return
    setMovingId(lessonId)

    const result = await updateLessonStatus({ lesson_id: lessonId, status: newStatus })
    if (!('error' in result)) {
      setLessons(prev => prev.map(l => l.id === lessonId ? { ...l, status: newStatus as Lesson['status'] } : l))
    }

    setMovingId(null)
  }

  function getAdjacentStatus(currentStatus: string, direction: 'next' | 'prev'): string | null {
    const idx = statusOrder.indexOf(currentStatus as typeof statusOrder[number])
    if (direction === 'next' && idx < statusOrder.length - 1) return statusOrder[idx + 1]
    if (direction === 'prev' && idx > 0) return statusOrder[idx - 1]
    return null
  }

  if (loading) return (
    <div className="space-y-4">
      <div className="h-12 bg-gray-200 rounded-xl animate-pulse" />
      <div className="flex gap-4">
        {[1, 2, 3, 4, 5].map(i => <div key={i} className="flex-1 h-96 bg-gray-200 rounded-xl animate-pulse" />)}
      </div>
    </div>
  )

  return (
    <PermissionGate permission="lessons.create" fallback={
      <div className="text-center py-16">
        <p className="text-gray-500">Acesso restrito a administradores e professores.</p>
        <Link href="/lessons" className="text-blue-600 hover:underline mt-2 inline-block">Voltar</Link>
      </div>
    }>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/lessons" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <KanbanSquare className="w-6 h-6 text-indigo-500" />
              Kanban de Aulas
            </h1>
          </div>
          <span className="text-sm text-gray-400"><span className="nw-tabular">{filtered.length}</span> aulas</span>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 flex-wrap bg-white rounded-xl border border-gray-100 p-3">
          <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />

          <input
            type="text"
            value={filterSearch}
            onChange={e => setFilterSearch(e.target.value)}
            placeholder="Buscar..."
            className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 w-40"
          />

          <select
            value={filterLevel}
            onChange={e => setFilterLevel(e.target.value)}
            className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option value="">Todos os niveis</option>
            <option value="iniciante">Iniciante</option>
            <option value="intermediario">Intermediario</option>
            <option value="avancado">Avancado</option>
            <option value="showFinal">Show Final</option>
          </select>

          {teachers.length > 0 && (
            <select
              value={filterTeacher}
              onChange={e => setFilterTeacher(e.target.value)}
              className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="">Todos os professores</option>
              {teachers.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          )}

          {(filterSearch || filterLevel || filterTeacher) && (
            <button
              onClick={() => { setFilterSearch(''); setFilterLevel(''); setFilterTeacher('') }}
              className="text-xs text-blue-600 hover:underline"
            >
              Limpar filtros
            </button>
          )}
        </div>

        {/* Kanban Board */}
        <div className="flex gap-3 overflow-x-auto pb-4">
          {COLUMNS.map(col => {
            const items = columns[col.status] || []
            return (
              <div key={col.status} className={`flex-1 min-w-[240px] rounded-xl border ${col.border} ${col.bg}`}>
                {/* Column header */}
                <div className="p-3 flex items-center justify-between border-b border-gray-200/50">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${col.color}`} />
                    <span className="text-sm font-bold text-gray-700">{col.label}</span>
                  </div>
                  <span className="text-xs font-medium text-gray-400 bg-white px-2 py-0.5 rounded-full nw-tabular">
                    {items.length}
                  </span>
                </div>

                {/* Column cards */}
                <div className="p-2 space-y-2 max-h-[calc(100vh-320px)] overflow-y-auto">
                  {items.map(lesson => {
                    const level = getLessonLevel(lesson.number)
                    const levelConfig = LESSON_LEVELS[level]
                    const levelColor = LEVEL_COLORS[levelConfig.color]
                    const isMoving = movingId === lesson.id
                    const prevStatus = getAdjacentStatus(col.status, 'prev')
                    const nextStatus = getAdjacentStatus(col.status, 'next')

                    return (
                      <div key={lesson.id} className={`bg-white rounded-lg border border-gray-100 shadow-sm p-3 ${isMoving ? 'opacity-50' : ''}`}>
                        <Link href={`/lessons/${lesson.id}`} className="block group">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`w-6 h-6 ${levelColor.bg} ${levelColor.text} rounded flex items-center justify-center text-xs font-bold nw-tabular`}>
                              {lesson.number !== null ? lesson.number : '#'}
                            </span>
                            <h4 className="text-sm font-bold text-gray-900 group-hover:text-indigo-700 transition-colors truncate flex-1">
                              {lesson.title}
                            </h4>
                          </div>
                        </Link>

                        <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                          {lesson.scheduled_date && (
                            <span className="flex items-center gap-0.5">
                              <Calendar className="w-3 h-3" />
                              {new Date(lesson.scheduled_date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                            </span>
                          )}
                          {lesson.teacher_name && (
                            <span className="flex items-center gap-0.5">
                              <User className="w-3 h-3" />
                              {lesson.teacher_name.split(' ')[0]}
                            </span>
                          )}
                        </div>

                        {/* Move buttons */}
                        <div className="flex items-center gap-1">
                          {prevStatus && (
                            <button
                              onClick={() => moveLesson(lesson.id, prevStatus)}
                              disabled={isMoving}
                              className="flex-1 flex items-center justify-center gap-1 px-2 py-1 text-xs text-gray-500 hover:bg-gray-100 rounded transition-colors disabled:opacity-50"
                              title="Voltar status"
                            >
                              {isMoving ? <Loader2 className="w-3 h-3 animate-spin" /> : <ChevronLeft className="w-3 h-3" />}
                            </button>
                          )}
                          {nextStatus && (
                            <button
                              onClick={() => moveLesson(lesson.id, nextStatus)}
                              disabled={isMoving}
                              className="flex-1 flex items-center justify-center gap-1 px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded transition-colors font-medium disabled:opacity-50"
                              title="Avancar status"
                            >
                              {isMoving ? <Loader2 className="w-3 h-3 animate-spin" /> : <><span>Avancar</span><ChevronRight className="w-3 h-3" /></>}
                            </button>
                          )}
                        </div>
                      </div>
                    )
                  })}

                  {items.length === 0 && (
                    <div className="text-center py-8">
                      <BookOpen className="w-6 h-6 text-gray-300 mx-auto mb-1" />
                      <p className="text-xs text-gray-400">Nenhuma aula</p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </PermissionGate>
  )
}
