'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import {
  Sparkles, Brain, Users, Zap, MessageSquare, TrendingUp,
  AlertTriangle, ChevronRight, RefreshCw, Loader2,
} from 'lucide-react'
import Link from 'next/link'
import { PermissionGate } from '@/components/auth/PermissionGate'

interface AIStats {
  totalContent: number
  feedbackCount: number
  materialCount: number
  exerciseCount: number
  activeAlphaStudents: number
  totalAlphaItems: number
  completedAlphaItems: number
  skippedAlphaItems: number
}

interface InactiveStudent {
  user_id: string
  student_name: string
  last_activity: string
  days_inactive: number
}

interface RecentFeedback {
  id: string
  title: string
  content_type: string
  created_at: string
  metadata: any
}

export default function AIDashboardPage() {
  const [stats, setStats] = useState<AIStats | null>(null)
  const [inactive, setInactive] = useState<InactiveStudent[]>([])
  const [recentFeedback, setRecentFeedback] = useState<RecentFeedback[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboard()
  }, [])

  async function loadDashboard() {
    setLoading(true)
    try {
      // AI generated content stats
      const [contentRes, feedbackRes, materialRes, exerciseRes] = await Promise.all([
        (supabase as any).from('ai_generated_content').select('*', { count: 'exact', head: true }),
        (supabase as any).from('ai_generated_content').select('*', { count: 'exact', head: true }).eq('content_type', 'feedback'),
        (supabase as any).from('ai_generated_content').select('*', { count: 'exact', head: true }).eq('content_type', 'material'),
        (supabase as any).from('ai_generated_content').select('*', { count: 'exact', head: true }).eq('content_type', 'exercise'),
      ])

      // Alpha queue stats
      const [totalAlphaRes, completedAlphaRes, skippedAlphaRes] = await Promise.all([
        (supabase as any).from('alpha_queue').select('*', { count: 'exact', head: true }),
        (supabase as any).from('alpha_queue').select('*', { count: 'exact', head: true }).eq('status', 'completed'),
        (supabase as any).from('alpha_queue').select('*', { count: 'exact', head: true }).eq('status', 'skipped'),
      ])

      // Active alpha students (who have pending items)
      const { data: activeStudentsData } = await (supabase as any)
        .from('alpha_queue')
        .select('user_id')
        .eq('status', 'pending')
      const uniqueStudents = new Set((activeStudentsData || []).map((d: any) => d.user_id))

      setStats({
        totalContent: contentRes.count || 0,
        feedbackCount: feedbackRes.count || 0,
        materialCount: materialRes.count || 0,
        exerciseCount: exerciseRes.count || 0,
        activeAlphaStudents: uniqueStudents.size,
        totalAlphaItems: totalAlphaRes.count || 0,
        completedAlphaItems: completedAlphaRes.count || 0,
        skippedAlphaItems: skippedAlphaRes.count || 0,
      })

      // Recent AI feedback
      const { data: feedbackData } = await (supabase as any)
        .from('v_ai_generated_content')
        .select('id, title, content_type, created_at, metadata')
        .eq('content_type', 'feedback')
        .order('created_at', { ascending: false })
        .limit(5)
      if (feedbackData) setRecentFeedback(feedbackData)

      // Inactive students (no alpha activity in 7+ days)
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      const { data: inactiveData } = await (supabase as any)
        .from('v_user_progress')
        .select('user_id, display_name, last_activity_at')
        .lt('last_activity_at', sevenDaysAgo)
        .order('last_activity_at', { ascending: true })
        .limit(10)

      if (inactiveData) {
        setInactive(
          (inactiveData as any[]).map(s => ({
            user_id: s.user_id,
            student_name: s.display_name || 'Aluno',
            last_activity: s.last_activity_at,
            days_inactive: Math.floor((Date.now() - new Date(s.last_activity_at).getTime()) / (1000 * 60 * 60 * 24)),
          }))
        )
      }
    } catch (error) {
      console.error('Error loading AI dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-10 w-60 bg-gray-200 rounded" />
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-28 bg-gray-200 rounded-xl" />)}
        </div>
        <div className="h-64 bg-gray-200 rounded-xl" />
      </div>
    )
  }

  const s = stats || {} as AIStats
  const completionRate = s.totalAlphaItems > 0
    ? Math.round((s.completedAlphaItems / s.totalAlphaItems) * 100)
    : 0
  const skipRate = s.totalAlphaItems > 0
    ? Math.round((s.skippedAlphaItems / s.totalAlphaItems) * 100)
    : 0

  return (
    <PermissionGate permission="settings.view" fallback={<div className="text-center py-16"><p className="text-gray-500">Acesso restrito a administradores.</p></div>}>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Brain className="w-6 h-6 text-purple-500" />
          Dashboard AI
        </h1>
        <button
          onClick={loadDashboard}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Atualizar
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Sparkles} value={s.totalContent} label="Conteudos Gerados" color="purple" />
        <StatCard icon={MessageSquare} value={s.feedbackCount} label="Feedbacks AI" color="blue" />
        <StatCard icon={Users} value={s.activeAlphaStudents} label="Alunos Ativos Alpha" color="emerald" />
        <StatCard icon={Zap} value={s.totalAlphaItems} label="Itens Alpha Total" color="amber" />
      </div>

      {/* Alpha Performance */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-500" />
          Performance do Alpha Engine
        </h2>

        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">Taxa de Conclusao</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-gray-100 rounded-full h-3">
                <div className="bg-emerald-500 h-3 rounded-full transition-all" style={{ width: `${completionRate}%` }} />
              </div>
              <span className="text-sm font-bold text-emerald-600">{completionRate}%</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">{s.completedAlphaItems} de {s.totalAlphaItems} itens</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Taxa de Skip</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-gray-100 rounded-full h-3">
                <div className={`h-3 rounded-full transition-all ${skipRate > 40 ? 'bg-red-500' : skipRate > 20 ? 'bg-amber-500' : 'bg-gray-400'}`} style={{ width: `${skipRate}%` }} />
              </div>
              <span className="text-sm font-bold text-gray-600">{skipRate}%</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">{s.skippedAlphaItems} pulados</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Conteudo por Tipo</p>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Materiais</span>
                <span className="font-bold text-gray-700">{s.materialCount}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Exercicios</span>
                <span className="font-bold text-gray-700">{s.exerciseCount}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Feedbacks</span>
                <span className="font-bold text-gray-700">{s.feedbackCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent AI Feedback */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-500" />
            Feedbacks Recentes
          </h2>

          {recentFeedback.length === 0 ? (
            <p className="text-sm text-gray-400 py-4 text-center">Nenhum feedback AI gerado ainda.</p>
          ) : (
            <div className="space-y-3">
              {recentFeedback.map(fb => (
                <div key={fb.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Sparkles className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{fb.title}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(fb.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      {fb.metadata?.suggested_grade !== undefined && (
                        <span className="ml-2 font-bold text-blue-600">Nota sugerida: {fb.metadata.suggested_grade}/10</span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Inactive Students Alert */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            Alunos Inativos (7+ dias)
          </h2>

          {inactive.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-sm text-emerald-600 font-medium">Todos os alunos estao ativos!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {inactive.map(student => (
                <div key={student.user_id} className="flex items-center gap-3 p-3 bg-amber-50/50 rounded-lg border border-amber-100">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 font-bold text-xs">
                    {student.student_name[0]}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{student.student_name}</p>
                    <p className="text-xs text-amber-600">{student.days_inactive} dias sem atividade</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Links */}
      <div className="grid grid-cols-2 gap-4">
        <Link href="/settings/ai-content" className="group">
          <div className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md hover:border-purple-200 transition-all flex items-center gap-4">
            <div className="p-3 bg-purple-50 rounded-xl">
              <Sparkles className="w-6 h-6 text-purple-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 group-hover:text-purple-700 transition-colors">Gerenciar Conteudo AI</h3>
              <p className="text-sm text-gray-500">Gerar materiais para aulas</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-purple-500 transition-colors" />
          </div>
        </Link>
        <Link href="/evaluate" className="group">
          <div className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md hover:border-blue-200 transition-all flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-xl">
              <MessageSquare className="w-6 h-6 text-blue-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors">Avaliar Submissoes</h3>
              <p className="text-sm text-gray-500">Revisar feedbacks AI e avaliar</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-colors" />
          </div>
        </Link>
      </div>
    </div>
    </PermissionGate>
  )
}

function StatCard({ icon: Icon, value, label, color }: {
  icon: any; value: number; label: string; color: string
}) {
  const bgMap: Record<string, string> = {
    purple: 'bg-purple-50 text-purple-600',
    blue: 'bg-blue-50 text-blue-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
  }
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <div className="flex items-center gap-3">
        <div className={`p-2.5 rounded-xl ${bgMap[color] || 'bg-gray-50 text-gray-600'}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-xs text-gray-500">{label}</p>
        </div>
      </div>
    </div>
  )
}
