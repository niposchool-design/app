'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import {
  Users,
  CheckCircle,
  Calendar,
  Music,
  Video,
  Clock,
  BookOpen,
  Trophy,
} from 'lucide-react'
import Link from 'next/link'

interface TeacherStats {
  active_courses: number
  total_students: number
  pending_submissions: number
  pending_portfolios: number
}

export function TeacherDashboard() {
  const [stats, setStats] = useState<TeacherStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStats() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const { data } = await supabase
          .from('v_dashboard_teacher')
          .select('*')
          .eq('user_id', user.id)
          .single()

        if (data) setStats(data as TeacherStats)
      } catch (error) {
        console.error('Error loading teacher dashboard:', error)
      } finally {
        setLoading(false)
      }
    }
    loadStats()
  }, [])

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-10 w-48 bg-gray-200 rounded-lg" />
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 h-64 bg-gray-200 rounded-3xl" />
          <div className="h-64 bg-gray-200 rounded-3xl" />
        </div>
      </div>
    )
  }

  const s = stats || { active_courses: 0, total_students: 0, pending_submissions: 0, pending_portfolios: 0 }
  const totalPending = s.pending_submissions + s.pending_portfolios

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Painel do Sensei</h1>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} value={s.total_students} label="Alunos" color="blue" />
        <StatCard icon={BookOpen} value={s.active_courses} label="Turmas" color="indigo" />
        <StatCard icon={CheckCircle} value={s.pending_submissions} label="Correções" color="amber" />
        <StatCard icon={Calendar} value={s.pending_portfolios} label="Portfólios" color="green" />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions - Hero */}
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-br from-blue-600 to-cyan-700 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl" />
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                Central do Sensei
              </span>
              <h2 className="text-3xl font-bold mb-2">
                {totalPending > 0
                  ? `${totalPending} avaliações pendentes`
                  : 'Tudo em dia!'
                }
              </h2>
              <p className="text-blue-100 mb-6">
                {totalPending > 0
                  ? 'Seus alunos aguardam feedback.'
                  : 'Parabéns! Nenhuma avaliação pendente.'
                }
              </p>
              <div className="flex gap-4">
                <Link href="/evaluate" className="px-6 py-3 bg-white text-blue-700 rounded-xl font-bold shadow-lg hover:bg-blue-50 transition-all flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  SpeedGrader
                </Link>
                <Link href="/lessons/new" className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl font-bold hover:bg-white/20 transition-all">
                  Nova Aula
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Feed Activity */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Video className="w-5 h-5 text-blue-500" />
            Feed dos Alunos
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Acompanhe as postagens dos alunos no feed musical.
          </p>
          <Link href="/feed" className="w-full block text-center py-3 text-sm font-bold text-blue-600 border border-blue-200 rounded-xl hover:bg-blue-50 transition-colors">
            Ver Feed
          </Link>
        </div>
      </div>

      {/* Quick Access */}
      <h2 className="text-lg font-bold text-gray-900 mt-4">Acesso Rápido</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickCard href="/challenges" icon={Trophy} label="Desafios" desc="Criar e avaliar" color="yellow" />
        <QuickCard href="/repertoire" icon={Music} label="Repertório" desc="Partituras e cifras" color="pink" />
        <QuickCard href="/lessons/new" icon={Video} label="Nova Aula" desc="Criar conteúdo" color="blue" />
        <QuickCard href="/courses" icon={Users} label="Turmas" desc="Alunos e notas" color="cyan" />
      </div>
    </div>
  )
}

const STAT_CARD_COLORS: Record<string, string> = {
  blue: 'bg-blue-50 text-blue-600',
  indigo: 'bg-indigo-50 text-indigo-600',
  amber: 'bg-amber-50 text-amber-600',
  green: 'bg-green-50 text-green-600',
}

const QUICK_CARD_COLORS: Record<string, string> = {
  yellow: 'bg-yellow-50 text-yellow-500',
  pink: 'bg-pink-50 text-pink-500',
  blue: 'bg-blue-50 text-blue-500',
  cyan: 'bg-cyan-50 text-cyan-500',
}

function StatCard({ icon: Icon, value, label, color }: {
  icon: any; value: number; label: string; color: string
}) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${STAT_CARD_COLORS[color] ?? STAT_CARD_COLORS.blue}`}>
          <Icon className="w-4 h-4" />
        </div>
        <div>
          <p className="nw-tabular text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-xs text-gray-500">{label}</p>
        </div>
      </div>
    </div>
  )
}

function QuickCard({ href, icon: Icon, label, desc, color }: {
  href: string; icon: any; label: string; desc: string; color: string
}) {
  return (
    <Link href={href} className="group">
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all text-center flex flex-col items-center justify-center gap-3">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform ${QUICK_CARD_COLORS[color] ?? QUICK_CARD_COLORS.blue}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900">{label}</h3>
          <p className="text-xs text-gray-500">{desc}</p>
        </div>
      </div>
    </Link>
  )
}
