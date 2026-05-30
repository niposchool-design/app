'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/app/providers/AuthProvider'
import { Route, ChevronRight, Plus, BookOpen, Filter } from 'lucide-react'
import Link from 'next/link'
import { PermissionGate } from '@/components/auth/PermissionGate'
import { startPath } from '@/app/actions/learning-path-actions'

type LearningPath = {
  id: string
  title: string
  description: string | null
  cycle: string | null
  methodology_name: string | null
  instrument_name: string | null
  difficulty_min: number
  difficulty_max: number
  total_steps: number
  step_count: number
  is_active: boolean
  created_at: string
}

type UserProgress = {
  path_id: string
  current_step: number
  status: string
  completed_steps: number
  total_steps: number
  path_title: string
}

const cycleLabels: Record<string, string> = {
  initial: 'Iniciação',
  fundamental: 'Fundamental',
  intermediate: 'Intermediário',
  advanced: 'Avançado',
}

const cycleColors: Record<string, string> = {
  initial: 'bg-green-100 text-green-700 border-green-200',
  fundamental: 'bg-blue-100 text-blue-700 border-blue-200',
  intermediate: 'bg-purple-100 text-purple-700 border-purple-200',
  advanced: 'bg-red-100 text-red-700 border-red-200',
}

export default function PathsPage() {
  const { user } = useAuth()
  const [paths, setPaths] = useState<LearningPath[]>([])
  const [progress, setProgress] = useState<UserProgress[]>([])
  const [loading, setLoading] = useState(true)
  const [filterCycle, setFilterCycle] = useState<string | null>(null)
  const [starting, setStarting] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const { data: pathsData } = await (supabase as any)
          .from('v_learning_paths')
          .select('*')
          .eq('is_active', true)
          .order('cycle', { ascending: true })
          .order('title', { ascending: true })

        if (pathsData) setPaths(pathsData)

        if (user) {
          const { data: progressData } = await (supabase as any)
            .from('v_user_path_progress')
            .select('*')
            .eq('user_id', user.id)

          if (progressData) setProgress(progressData)
        }
      } catch (error) {
        console.error('Error loading paths:', error)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [user])

  async function handleStartPath(pathId: string) {
    setStarting(pathId)
    const result = await startPath({ path_id: pathId })
    if ('error' in result) {
      console.error(result.error)
    } else {
      // Reload progress
      if (user) {
        const { data: progressData } = await (supabase as any)
          .from('v_user_path_progress')
          .select('*')
          .eq('user_id', user.id)
        if (progressData) setProgress(progressData)
      }
    }
    setStarting(null)
  }

  function getProgress(pathId: string) {
    return progress.find(p => p.path_id === pathId)
  }

  const filteredPaths = filterCycle
    ? paths.filter(p => p.cycle === filterCycle)
    : paths

  const cycles = [...new Set(paths.map(p => p.cycle).filter(Boolean))] as string[]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Route className="w-6 h-6 text-emerald-500" />
          Trilhas de Aprendizagem
        </h1>
        <PermissionGate permission="lessons.create">
          <Link href="/paths/new" className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 transition-colors">
            <Plus className="w-4 h-4" />
            Nova Trilha
          </Link>
        </PermissionGate>
      </div>

      {/* My active paths */}
      {progress.filter(p => p.status === 'active').length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Minhas Trilhas Ativas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {progress.filter(p => p.status === 'active').map(prog => {
              const pct = prog.total_steps > 0 ? Math.round((prog.completed_steps / prog.total_steps) * 100) : 0
              return (
                <Link key={prog.path_id} href={`/paths/${prog.path_id}`} className="group">
                  <div className="bg-white rounded-xl border border-emerald-100 p-4 hover:shadow-lg hover:border-emerald-300 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">{prog.path_title}</h3>
                      <span className="nw-tabular text-sm font-bold text-emerald-600">{pct}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                      <div className="bg-emerald-500 h-2 rounded-full transition-all" style={{ width: `${pct}%` }} />
                    </div>
                    <p className="text-xs text-gray-400"><span className="nw-tabular">{prog.completed_steps}</span> de <span className="nw-tabular">{prog.total_steps}</span> steps</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {/* Cycle filters */}
      {cycles.length > 0 && (
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <button
            onClick={() => setFilterCycle(null)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${!filterCycle ? 'bg-emerald-100 text-emerald-700 ring-2 ring-emerald-300' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            Todos
          </button>
          {cycles.map(cycle => (
            <button
              key={cycle}
              onClick={() => setFilterCycle(filterCycle === cycle ? null : cycle)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filterCycle === cycle ? 'bg-emerald-100 text-emerald-700 ring-2 ring-emerald-300' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {cycleLabels[cycle] || cycle}
            </button>
          ))}
        </div>
      )}

      {/* All paths grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => <div key={i} className="h-52 bg-gray-200 rounded-xl animate-pulse" />)}
        </div>
      ) : filteredPaths.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <Route className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-900 mb-2">Nenhuma trilha disponível</h3>
          <p className="text-sm text-gray-500">As trilhas de aprendizagem aparecerão aqui.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPaths.map(path => {
            const prog = getProgress(path.id)
            const pct = prog && path.total_steps > 0
              ? Math.round((prog.completed_steps / path.total_steps) * 100)
              : 0

            return (
              <div key={path.id} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-emerald-200 transition-all flex flex-col">
                <div className="p-5 flex-1">
                  <div className="flex items-start justify-between mb-3">
                    {path.cycle && (
                      <span className={`px-2 py-0.5 rounded text-xs font-bold border ${cycleColors[path.cycle] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                        {cycleLabels[path.cycle] || path.cycle}
                      </span>
                    )}
                    <div className="flex items-center gap-1 text-gray-400">
                      <BookOpen className="w-4 h-4" />
                      <span className="text-xs font-medium"><span className="nw-tabular">{path.step_count}</span> steps</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-gray-900 mb-2">{path.title}</h3>
                  {path.description && (
                    <p className="text-sm text-gray-500 line-clamp-2 mb-3">{path.description}</p>
                  )}

                  <div className="flex flex-wrap gap-1.5">
                    {path.methodology_name && (
                      <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded text-xs font-medium">{path.methodology_name}</span>
                    )}
                    {path.instrument_name && (
                      <span className="px-2 py-0.5 bg-amber-50 text-amber-600 rounded text-xs font-medium">{path.instrument_name}</span>
                    )}
                  </div>

                  {/* Progress bar if started */}
                  {prog && (
                    <div className="mt-3">
                      <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full transition-all ${prog.status === 'completed' ? 'bg-emerald-500' : 'bg-emerald-400'}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <p className="nw-tabular text-xs text-gray-400 mt-1">
                        {prog.status === 'completed' ? 'Concluída!' : `${pct}% completo`}
                      </p>
                    </div>
                  )}
                </div>

                <div className="px-5 pb-5 pt-0">
                  {prog ? (
                    <Link
                      href={`/paths/${path.id}`}
                      className="w-full flex items-center justify-center gap-2 py-2.5 bg-emerald-50 text-emerald-700 rounded-lg font-bold text-sm hover:bg-emerald-100 transition-colors"
                    >
                      {prog.status === 'completed' ? 'Revisar' : 'Continuar'}
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleStartPath(path.id)}
                      disabled={starting === path.id}
                      className="w-full py-2.5 bg-emerald-500 text-white rounded-lg font-bold text-sm hover:bg-emerald-600 transition-colors disabled:opacity-50"
                    >
                      {starting === path.id ? 'Iniciando...' : 'Começar Trilha'}
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
