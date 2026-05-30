'use client'

import { useEffect, useState, useMemo, useCallback } from 'react'
import { supabase } from '@/lib/supabase/client'
import {
  Zap, ArrowLeft, Play, CheckCircle, ChevronRight, Video, Clock, Trophy,
  Sparkles, Target, Lightbulb, RefreshCw, SkipForward, Loader2, Flame,
} from 'lucide-react'
import Link from 'next/link'
import { completeAlphaItem, skipAlphaItem, generateNextSteps, generateDailyChallenge } from '@/app/actions/alpha-engine-actions'
import type { Tables } from '@/lib/supabase/database.types'

type LessonActivity = Tables<'v_lesson_activities'>
type LessonProgress = Tables<'v_lesson_progress'>

interface AlphaQueueItem {
  id: string
  source_type: string
  source_id: string | null
  item_type: string
  title: string
  description: string | null
  content: string | null
  difficulty: number
  points_reward: number
  priority: number
  status: string
  expires_at: string | null
  completed_at: string | null
  created_at: string
  lesson_title: string | null
  lesson_number: number | null
  challenge_title: string | null
}

const ITEM_TYPE_ICONS: Record<string, typeof Zap> = {
  exercise: Target,
  micro_challenge: Zap,
  practice_tip: Lightbulb,
  review: RefreshCw,
  next_lesson: Play,
}

const ITEM_TYPE_COLORS: Record<string, string> = {
  exercise: 'bg-blue-100 text-blue-600',
  micro_challenge: 'bg-amber-100 text-amber-600',
  practice_tip: 'bg-green-100 text-green-600',
  review: 'bg-purple-100 text-purple-600',
  next_lesson: 'bg-indigo-100 text-indigo-600',
}

const ITEM_TYPE_LABELS: Record<string, string> = {
  exercise: 'Exercício',
  micro_challenge: 'Micro-Desafio',
  practice_tip: 'Dica de Prática',
  review: 'Revisão',
  next_lesson: 'Próxima Aula',
}

export default function AlphaPage() {
  const [alphaActivities, setAlphaActivities] = useState<LessonActivity[]>([])
  const [progress, setProgress] = useState<LessonProgress[]>([])
  const [queue, setQueue] = useState<AlphaQueueItem[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingQueue, setLoadingQueue] = useState(true)
  const [generatingSteps, setGeneratingSteps] = useState(false)
  const [completingId, setCompletingId] = useState<string | null>(null)
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const [showTimeline, setShowTimeline] = useState(false)

  const loadData = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()

      const [activitiesRes, progressRes, queueRes] = await Promise.all([
        supabase
          .from('v_lesson_activities')
          .select('*')
          .eq('activity_type', 'alpha')
          .order('lesson_number', { ascending: true }),
        user ? supabase.from('v_lesson_progress').select('*').eq('student_id', user.id) : { data: [] },
        user ? supabase
          .from('v_alpha_queue' as any)
          .select('*')
          .eq('user_id', user.id)
          .in('status', ['pending', 'in_progress'])
          .order('priority', { ascending: false })
          .order('created_at', { ascending: true })
          .limit(10) : { data: [] },
      ])

      if (activitiesRes.data) setAlphaActivities(activitiesRes.data as LessonActivity[])
      if (progressRes.data) setProgress(progressRes.data as LessonProgress[])
      if (queueRes.data) setQueue(queueRes.data as AlphaQueueItem[])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
      setLoadingQueue(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  // Auto-generate steps if queue is empty (after initial load)
  useEffect(() => {
    if (!loadingQueue && queue.length === 0 && !generatingSteps) {
      handleGenerateSteps()
    }
  }, [loadingQueue]) // eslint-disable-line react-hooks/exhaustive-deps

  const progressMap = useMemo(() => {
    const map = new Map<string, boolean>()
    progress.forEach(p => map.set(p.lesson_id, p.is_completed))
    return map
  }, [progress])

  const currentAlpha = useMemo(() => {
    if (alphaActivities.length === 0) return null
    const notDone = alphaActivities.find(a => !progressMap.get(a.lesson_id))
    return notDone || alphaActivities[alphaActivities.length - 1]
  }, [alphaActivities, progressMap])

  const completedCount = alphaActivities.filter(a => progressMap.get(a.lesson_id)).length
  const totalCount = alphaActivities.length

  // Daily micro-challenge = highest priority micro_challenge
  const dailyChallenge = queue.find(q => q.item_type === 'micro_challenge')
  const regularQueue = queue.filter(q => q.item_type !== 'micro_challenge')

  async function handleCompleteItem(itemId: string) {
    setCompletingId(itemId)
    const result = await completeAlphaItem({ item_id: itemId })
    if (result.success) {
      setQueue(prev => prev.filter(q => q.id !== itemId))
      // If queue is getting low, generate more
      if (queue.length <= 3) {
        await handleGenerateSteps()
      }
    }
    setCompletingId(null)
  }

  async function handleSkipItem(itemId: string) {
    const result = await skipAlphaItem({ item_id: itemId })
    if (result.success) {
      setQueue(prev => prev.filter(q => q.id !== itemId))
    }
  }

  async function handleGenerateSteps() {
    setGeneratingSteps(true)
    await generateNextSteps()
    // Also generate daily challenge if none exists
    await generateDailyChallenge()
    // Reload queue
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data } = await supabase
        .from('v_alpha_queue' as any)
        .select('*')
        .eq('user_id', user.id)
        .in('status', ['pending', 'in_progress'])
        .order('priority', { ascending: false })
        .order('created_at', { ascending: true })
        .limit(10)
      if (data) setQueue(data as AlphaQueueItem[])
    }
    setGeneratingSteps(false)
  }

  if (loading) return (
    <div className="space-y-4">
      <div className="h-48 bg-gray-200 rounded-2xl animate-pulse" />
      {[1, 2, 3].map(i => <div key={i} className="h-20 bg-gray-200 rounded-xl animate-pulse" />)}
    </div>
  )

  return (
    <div className="space-y-6">
      <Link href="/lessons" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
        <ArrowLeft className="w-4 h-4" /> Voltar
      </Link>

      {/* Hero */}
      <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-4 right-6 opacity-20">
          <Flame className="w-24 h-24" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
              <Zap className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Alpha Contínuo</h1>
              <p className="text-white/80 text-sm">Nunca pare de evoluir</p>
            </div>
          </div>

          <p className="text-sm text-white/90 mb-4">
            Seu caminho de evolução musical. Complete atividades, ganhe pontos
            e desbloqueie novos desafios. Sempre há algo para fazer!
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/15 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold nw-tabular">{completedCount}</p>
              <p className="text-xs text-white/70">Aulas Alpha</p>
            </div>
            <div className="bg-white/15 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold nw-tabular">{queue.length}</p>
              <p className="text-xs text-white/70">Na fila</p>
            </div>
            <div className="bg-white/15 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold nw-tabular">{totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0}%</p>
              <p className="text-xs text-white/70">Progresso</p>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Micro-Challenge */}
      {dailyChallenge && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border-2 border-amber-200 shadow-lg overflow-hidden">
          <div className="bg-amber-100/50 px-6 py-3 flex items-center gap-2 border-b border-amber-200">
            <Zap className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-bold text-amber-700">Desafio do Dia</span>
            <span className="ml-auto flex items-center gap-1 text-xs font-bold text-amber-600 nw-tabular">
              +{dailyChallenge.points_reward} pts
            </span>
          </div>
          <div className="p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-2">{dailyChallenge.title}</h2>
            {dailyChallenge.description && (
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">{dailyChallenge.description}</p>
            )}
            {expandedItem === dailyChallenge.id && dailyChallenge.content && (
              <div className="bg-white rounded-xl p-4 mb-4 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed border border-amber-100">
                {dailyChallenge.content}
              </div>
            )}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setExpandedItem(expandedItem === dailyChallenge.id ? null : dailyChallenge.id)}
                className="px-4 py-2 text-sm font-bold text-amber-700 bg-amber-100 rounded-xl hover:bg-amber-200 transition-colors"
              >
                {expandedItem === dailyChallenge.id ? 'Recolher' : 'Ver Detalhes'}
              </button>
              <button
                onClick={() => handleCompleteItem(dailyChallenge.id)}
                disabled={completingId === dailyChallenge.id}
                className="flex items-center gap-2 px-5 py-2 bg-amber-600 text-white rounded-xl font-bold text-sm hover:bg-amber-700 transition-colors disabled:opacity-50"
              >
                {completingId === dailyChallenge.id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <CheckCircle className="w-4 h-4" />
                )}
                Completar
              </button>
            </div>
            <div className="flex items-center gap-1 mt-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className={`h-1.5 flex-1 rounded-full ${i < dailyChallenge.difficulty ? 'bg-amber-400' : 'bg-gray-200'}`} />
              ))}
              <span className="text-[10px] text-gray-400 ml-2">Dificuldade</span>
            </div>
          </div>
        </div>
      )}

      {/* Current Lesson Alpha */}
      {currentAlpha && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-gray-50 px-6 py-3 flex items-center gap-2 border-b border-gray-100">
            <Video className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-bold text-gray-700">Desafio Alpha da Aula</span>
            <span className="text-xs text-gray-400 ml-auto nw-tabular">Aula {currentAlpha.lesson_number}</span>
          </div>
          <div className="p-6">
            <h3 className="text-base font-bold text-gray-900 mb-1">{currentAlpha.title}</h3>
            {currentAlpha.description && (
              <p className="text-gray-500 text-sm mb-3">{currentAlpha.description}</p>
            )}
            <Link
              href={`/lessons/${currentAlpha.lesson_id}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-gray-800 transition-colors"
            >
              <Play className="w-4 h-4" />
              Ver Aula
            </Link>
          </div>
        </div>
      )}

      {/* Alpha Queue — Continuous Activities */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            Suas Próximas Atividades
          </h2>
          <button
            onClick={handleGenerateSteps}
            disabled={generatingSteps}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors disabled:opacity-50"
          >
            {generatingSteps ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
            {generatingSteps ? 'Gerando...' : 'Gerar Mais'}
          </button>
        </div>

        {generatingSteps && queue.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-purple-100">
            <Loader2 className="w-8 h-8 text-purple-400 mx-auto mb-3 animate-spin" />
            <p className="text-sm text-purple-600 font-medium">Gerando atividades personalizadas...</p>
            <p className="text-xs text-gray-400 mt-1">A AI está criando exercícios baseados no seu nível</p>
          </div>
        ) : regularQueue.length === 0 && !generatingSteps ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
            <CheckCircle className="w-10 h-10 text-green-400 mx-auto mb-3" />
            <p className="text-sm text-gray-500">Tudo concluído! Clique em "Gerar Mais" para novas atividades.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {regularQueue.map((item, idx) => {
              const Icon = ITEM_TYPE_ICONS[item.item_type] || Target
              const colorClass = ITEM_TYPE_COLORS[item.item_type] || 'bg-gray-100 text-gray-600'
              const label = ITEM_TYPE_LABELS[item.item_type] || item.item_type
              const isExpanded = expandedItem === item.id
              const isCompleting = completingId === item.id

              return (
                <div key={item.id} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden">
                  <div className="p-4 flex items-center gap-4">
                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setExpandedItem(isExpanded ? null : item.id)}>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-gray-900 text-sm truncate">{item.title}</h3>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-500 flex-shrink-0">
                          {label}
                        </span>
                      </div>
                      {item.description && (
                        <p className="text-xs text-gray-400 mt-1 truncate">{item.description}</p>
                      )}
                    </div>

                    {/* Points + Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs font-bold text-amber-600 nw-tabular">+{item.points_reward}</span>
                      <button
                        onClick={() => handleSkipItem(item.id)}
                        className="p-1.5 rounded-lg text-gray-300 hover:text-gray-500 hover:bg-gray-50 transition-all"
                        title="Pular"
                      >
                        <SkipForward className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleCompleteItem(item.id)}
                        disabled={isCompleting}
                        className="p-1.5 rounded-lg text-green-500 hover:text-green-700 hover:bg-green-50 transition-all disabled:opacity-50"
                        title="Completar"
                      >
                        {isCompleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded content */}
                  {isExpanded && item.content && (
                    <div className="px-4 pb-4 border-t border-gray-50">
                      <div className="bg-gray-50 rounded-xl p-4 mt-3 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                        {item.content}
                      </div>
                      <div className="flex items-center gap-1 mt-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div key={i} className={`h-1 flex-1 rounded-full ${i < item.difficulty ? 'bg-purple-400' : 'bg-gray-200'}`} />
                        ))}
                        <span className="text-[10px] text-gray-400 ml-2">Dificuldade <span className="nw-tabular">{item.difficulty}/5</span></span>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Toggle Timeline */}
      <button
        onClick={() => setShowTimeline(!showTimeline)}
        className="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold text-gray-500 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
      >
        <Trophy className="w-4 h-4 text-amber-500" />
        {showTimeline ? 'Ocultar' : 'Ver'} Todos os Desafios Alpha (<span className="nw-tabular">{totalCount}</span>)
        <ChevronRight className={`w-4 h-4 transition-transform ${showTimeline ? 'rotate-90' : ''}`} />
      </button>

      {/* Timeline of all Alpha challenges */}
      {showTimeline && (
        <div className="space-y-2">
          {alphaActivities.map(activity => {
            const isDone = progressMap.get(activity.lesson_id)
            const isCurrent = currentAlpha?.id === activity.id

            return (
              <Link key={activity.id} href={`/lessons/${activity.lesson_id}`} className="block group">
                <div className={`bg-white rounded-xl border shadow-sm p-4 hover:shadow-md transition-all flex items-center gap-4 ${
                  isCurrent ? 'border-amber-300 ring-1 ring-amber-100' : isDone ? 'border-green-200' : 'border-gray-100 hover:border-amber-200'
                }`}>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    isDone ? 'bg-green-100 text-green-600' : isCurrent ? 'bg-amber-100 text-amber-600' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {isDone ? <CheckCircle className="w-5 h-5" /> : <Zap className="w-5 h-5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-900 text-sm group-hover:text-amber-700 transition-colors truncate">
                        {activity.title}
                      </h3>
                      {isCurrent && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-700 flex-shrink-0">
                          Atual
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 nw-tabular">Aula {activity.lesson_number}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-amber-500 transition-colors flex-shrink-0" />
                </div>
              </Link>
            )
          })}
        </div>
      )}

      {alphaActivities.length === 0 && queue.length === 0 && !generatingSteps && (
        <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
          <Zap className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-gray-400">Nenhuma atividade Alpha disponível ainda.</p>
        </div>
      )}
    </div>
  )
}
