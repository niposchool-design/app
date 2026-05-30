'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Calendar, Clock, MapPin } from 'lucide-react'
import type { Tables } from '@/lib/supabase/database.types'

type Lesson = Tables<'v_lessons'>

export default function SchedulePage() {
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const { data } = await supabase
          .from('v_lessons')
          .select('*')
          .gte('scheduled_date', new Date().toISOString().split('T')[0])
          .order('scheduled_date')
          .limit(30)
        if (data) setLessons(data as Lesson[])
      } catch (error) {
        console.error('Error loading schedule:', error)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const groupedByDate = lessons.reduce((acc, lesson) => {
    const date = lesson.scheduled_date ? new Date(lesson.scheduled_date).toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' }) : 'Sem data'
    if (!acc[date]) acc[date] = []
    acc[date].push(lesson)
    return acc
  }, {} as Record<string, Lesson[]>)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
        <Calendar className="w-6 h-6 text-blue-500" />
        Agenda
      </h1>

      {loading ? (
        <div className="space-y-4">{[1, 2, 3].map(i => <div key={i} className="h-24 bg-gray-200 rounded-xl animate-pulse" />)}</div>
      ) : lessons.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-900 mb-2">Nenhuma aula agendada</h3>
          <p className="text-sm text-gray-500">As próximas aulas aparecerão aqui.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedByDate).map(([date, items]) => (
            <div key={date}>
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">{date}</h2>
              <div className="space-y-2">
                {items.map(lesson => (
                  <div key={lesson.id} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-4 hover:shadow-sm transition-shadow">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-bold text-lg shrink-0 nw-tabular">
                      {lesson.number || '?'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm text-gray-900 truncate">{lesson.title}</h3>
                      <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                        {lesson.duration_minutes && (
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /><span className="nw-tabular">{lesson.duration_minutes}</span> min</span>
                        )}
                        {lesson.teacher_name && <span>{lesson.teacher_name}</span>}
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-bold ${lesson.status === 'scheduled' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {lesson.status === 'scheduled' ? 'Confirmada' : lesson.status === 'completed' ? 'Concluída' : lesson.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
