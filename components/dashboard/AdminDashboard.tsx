'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import {
  Users,
  GraduationCap,
  School,
  Music,
  ChevronRight,
  ArrowUpRight,
  UserPlus,
  Clock,
  Activity,
  BarChart3,
  Settings,
  Shield,
  CheckCircle,
  Database,
  Flame,
  Package,
} from 'lucide-react'
import Link from 'next/link'

interface DashboardStats {
  total_users: number
  total_students: number
  total_teachers: number
  active_courses: number
  total_lessons: number
  total_instruments: number
  total_feed_posts: number
  feed_posts_last_week: number
  active_practitioners_last_week: number
  practice_minutes_last_week: number
  inventory_total_items: number
  inventory_available_items: number
  total_support_materials: number
}

export function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStats() {
      try {
        const { data } = await supabase
          .from('v_dashboard_admin')
          .select('*')
          .single()
        if (data) setStats(data as DashboardStats)
      } catch (error) {
        console.error('Error loading admin dashboard:', error)
      } finally {
        setLoading(false)
      }
    }
    loadStats()
  }, [])

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-40 bg-gray-200 rounded-2xl" />
        <div className="grid grid-cols-4 gap-5">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-gray-200 rounded-xl" />)}
        </div>
      </div>
    )
  }

  const s = stats || {} as DashboardStats

  return (
    <div className="space-y-6">
      {/* Executive Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950 text-white p-8 shadow-2xl border border-purple-800/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-400/20 text-purple-200 text-xs font-semibold tracking-wide uppercase">
                Painel Executivo
              </span>
              <span className="flex items-center gap-1.5 text-emerald-300 text-xs font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-400/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Online
              </span>
            </div>
            <h1 className="text-4xl font-semibold tracking-tight">Painel Administrativo</h1>
            <p className="text-purple-200/80 max-w-2xl text-base">
              Visão estratégica completa da instituição.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/students" className="px-5 py-2.5 bg-white text-purple-900 rounded-xl text-sm font-semibold shadow-lg hover:bg-purple-50 transition-all flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              Novo Aluno
            </Link>
            <Link href="/courses/new" className="px-5 py-2.5 bg-purple-600 text-white rounded-xl text-sm font-semibold shadow-lg shadow-purple-900/30 hover:bg-purple-500 transition-all flex items-center gap-2">
              <School className="w-4 h-4" />
              Nova Turma
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard
          icon={GraduationCap}
          value={s.total_students || 0}
          label="Alunos Ativos"
          href="/students"
          color="purple"
        />
        <KPICard
          icon={Shield}
          value={s.total_teachers || 0}
          label="Professores"
          href="/students"
          color="indigo"
        />
        <KPICard
          icon={School}
          value={s.active_courses || 0}
          label="Turmas Ativas"
          href="/courses"
          color="violet"
        />
        <KPICard
          icon={Music}
          value={s.total_instruments || 0}
          label="Instrumentos"
          href="/instruments"
          color="fuchsia"
        />
      </div>

      {/* Activity Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Feed & Practice Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200/80 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">Atividade da Semana</h2>
              <p className="text-xs text-slate-500">Últimos 7 dias</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ActivityStat icon={Flame} value={s.feed_posts_last_week || 0} label="Posts no Feed" />
            <ActivityStat icon={Clock} value={s.practice_minutes_last_week || 0} label="Min. Prática" />
            <ActivityStat icon={Users} value={s.active_practitioners_last_week || 0} label="Alunos Praticando" />
            <ActivityStat icon={Package} value={s.inventory_available_items || 0} label="Itens Disponíveis" />
          </div>
        </div>

        {/* Quick Access */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-5">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-purple-600" />
            <h3 className="text-slate-900 font-semibold text-sm">Acesso Rápido</h3>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <QuickLink href="/students" icon={Users} label="Alunos" />
            <QuickLink href="/courses" icon={School} label="Turmas" />
            <QuickLink href="/evaluate" icon={CheckCircle} label="Avaliações" />
            <QuickLink href="/settings" icon={Settings} label="Config." />
          </div>
        </div>
      </div>
    </div>
  )
}

const KPI_CARD_COLORS: Record<string, string> = {
  purple: 'bg-purple-50 text-purple-600',
  indigo: 'bg-indigo-50 text-indigo-600',
  violet: 'bg-violet-50 text-violet-600',
  fuchsia: 'bg-fuchsia-50 text-fuchsia-600',
}

function KPICard({ icon: Icon, value, label, href, color }: {
  icon: any; value: number; label: string; href: string; color: string
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200/80 hover:shadow-lg hover:border-purple-200 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2.5 rounded-lg ${KPI_CARD_COLORS[color] ?? KPI_CARD_COLORS.purple}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <h3 className="nw-tabular text-3xl font-bold text-slate-900 mb-1 tracking-tight">{value}</h3>
      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</p>
      <div className="mt-4 pt-4 border-t border-slate-100">
        <Link href={href} className="text-xs font-medium text-purple-600 hover:text-purple-700 flex items-center gap-1">
          Ver detalhes <ChevronRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  )
}

function ActivityStat({ icon: Icon, value, label }: { icon: any; value: number; label: string }) {
  return (
    <div className="text-center p-3 rounded-lg bg-slate-50">
      <Icon className="w-4 h-4 text-slate-400 mx-auto mb-2" />
      <p className="nw-tabular text-2xl font-bold text-slate-900">{value}</p>
      <p className="text-[10px] text-slate-500 uppercase tracking-wider">{label}</p>
    </div>
  )
}

function QuickLink({ href, icon: Icon, label }: { href: string; icon: any; label: string }) {
  return (
    <Link href={href} className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg bg-slate-50 hover:bg-purple-50 border border-transparent hover:border-purple-200 transition-all group">
      <div className="p-2 bg-white rounded-lg shadow-sm text-slate-600 group-hover:text-purple-600 transition-colors">
        <Icon className="w-4 h-4" />
      </div>
      <span className="text-xs font-medium text-slate-600 group-hover:text-purple-700">{label}</span>
    </Link>
  )
}
