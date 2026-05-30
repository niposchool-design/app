'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { PermissionGate } from '@/components/auth/PermissionGate'
import { RoleView } from '@/components/auth/RoleView'
import { Users, Plus, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import type { Tables } from '@/lib/supabase/database.types'

type Course = Tables<'v_courses'>

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const { data } = await supabase
          .from('v_courses')
          .select('*')
          .order('name')
        if (data) setCourses(data as Course[])
      } catch (error) {
        console.error('Error loading courses:', error)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Users className="w-6 h-6 text-indigo-500" />
          <RoleView student={<>Minhas Turmas</>} teacher={<>Minhas Turmas</>} admin={<>Gestão de Turmas</>} />
        </h1>
        <PermissionGate permission="courses.create">
          <Link href="/courses/new" className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors">
            <Plus className="w-4 h-4" />
            Nova Turma
          </Link>
        </PermissionGate>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => <div key={i} className="h-48 bg-gray-200 rounded-xl animate-pulse" />)}
        </div>
      ) : courses.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-900 mb-2">Nenhuma turma encontrada</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map(course => (
            <Link key={course.id} href={`/courses/${course.id}`} className="group">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-lg hover:border-indigo-200 transition-all h-full flex flex-col">
                <h3 className="font-bold text-gray-900 mb-1 group-hover:text-indigo-700 transition-colors">{course.name}</h3>
                {course.description && <p className="text-sm text-gray-500 line-clamp-2 mb-3 flex-1">{course.description}</p>}
                <div className="flex items-center justify-between text-xs text-gray-400 mt-auto pt-3 border-t border-gray-50">
                  <span>{course.teacher_name || 'Sem professor'}</span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span className="nw-tabular">{course.active_students}</span> alunos
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
