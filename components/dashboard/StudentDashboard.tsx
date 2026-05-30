'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import {
  Flame,
  Trophy,
  Target,
  Clock,
  Music,
  Video,
  Star,
  Zap,
  ChevronRight,
  BookOpen,
  Award,
} from 'lucide-react'
import Link from 'next/link'
import { AlphaNextStep } from '@/components/alpha-next-step'

interface StudentStats {
  total_points: number
  level: number
  level_name: string
  current_xp: number
  xp_to_next_level: number
  current_streak: number
  longest_streak: number
  lessons_completed: number
  achievements_unlocked: number
  active_courses: number
  portfolio_count: number
  submissions_count: number
  unread_notifications: number
  practice_sessions_this_week: number
  practice_minutes_this_week: number
  total_posts: number
  pending_recommendations: number
  weekly_goal_minutes: number | null
}

export function StudentDashboard() {
  const [stats, setStats] = useState<StudentStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStats() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const { data } = await supabase
          .from('v_dashboard_student')
          .select('*')
          .eq('user_id', user.id)
          .single()

        if (data) setStats(data as StudentStats)
      } catch (error) {
        console.error('Error loading student dashboard:', error)
      } finally {
        setLoading(false)
      }
    }
    loadStats()
  }, [])

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-48 bg-gray-200 rounded-3xl" />
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-24 bg-gray-200 rounded-xl" />)}
        </div>
      </div>
    )
  }

  const s = stats || {} as StudentStats
  const xpPercent = s.xp_to_next_level > 0 ? Math.round((s.current_xp / s.xp_to_next_level) * 100) : 0
  const practiceGoal = s.weekly_goal_minutes || 60
  const practicePercent = Math.min(100, Math.round((s.practice_minutes_this_week / practiceGoal) * 100))

  return (
    <div className="space-y-6">
      {/* Hero: Level & XP */}
      <div className="bg-gradient-to-br from-red-600 via-orange-600 to-amber-500 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl font-black">
              {s.level || 1}
            </div>
            <div>
              <h1 className="text-3xl font-bold">{s.level_name || 'Iniciante'}</h1>
              <p className="text-orange-100">{s.total_points || 0} pontos totais</p>
            </div>
            {s.current_streak > 0 && (
              <div className="ml-auto flex items-center gap-2 bg-white/20 px-4 py-2 rounded-xl">
                <Flame className="w-5 h-5 text-yellow-300" />
                <span className="font-bold text-lg"><span className="nw-tabular">{s.current_streak}</span> dias</span>
              </div>
            )}
          </div>

          {/* XP Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium">XP para próximo nível</span>
              <span className="nw-tabular font-bold">{s.current_xp || 0} / {s.xp_to_next_level || 100}</span>
            </div>
            <div className="h-3 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-1000"
                style={{ width: `${xpPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Alpha: Next Step Widget */}
      <AlphaNextStep />

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MiniStat icon={Clock} value={`${s.practice_minutes_this_week || 0}m`} label="Prática esta semana" color="blue" />
        <MiniStat icon={Trophy} value={s.achievements_unlocked || 0} label="Conquistas" color="amber" />
        <MiniStat icon={Video} value={s.total_posts || 0} label="Posts no Feed" color="pink" />
        <MiniStat icon={Target} value={s.submissions_count || 0} label="Desafios feitos" color="green" />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Practice Goal */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-500" />
            Meta Semanal
          </h3>
          <div className="text-center mb-4">
            <p className="nw-tabular text-4xl font-black text-gray-900">{practicePercent}%</p>
            <p className="text-sm text-gray-500">{s.practice_minutes_this_week || 0} de {practiceGoal} min</p>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all"
              style={{ width: `${practicePercent}%` }}
            />
          </div>
          <Link href="/practice" className="block text-center text-sm font-bold text-blue-600 hover:text-blue-700">
            Registrar prática
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          <ActionCard href="/feed" icon={Video} title="Feed Musical" desc="Veja e poste vídeos" gradient="from-pink-500 to-rose-500" />
          <ActionCard href="/challenges" icon={Zap} title="Desafios" desc="Ganhe XP completando" gradient="from-amber-500 to-orange-500" />
          <ActionCard href="/instruments" icon={Music} title="Instrumentos" desc="Explore e aprenda" gradient="from-indigo-500 to-purple-500" />
          <ActionCard href="/history" icon={BookOpen} title="História" desc="Timeline interativa" gradient="from-emerald-500 to-teal-500" />
        </div>
      </div>

      {/* Recommendations */}
      {(s.pending_recommendations || 0) > 0 && (
        <div className="bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200 rounded-2xl p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-violet-100 rounded-lg">
              <Star className="w-5 h-5 text-violet-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-violet-900">
                {s.pending_recommendations} {s.pending_recommendations === 1 ? 'recomendação' : 'recomendações'} da IA
              </h3>
              <p className="text-sm text-violet-700">Baseadas no seu progresso e estilo de aprendizado</p>
            </div>
            <Link href="/progress" className="text-sm font-bold text-violet-600 flex items-center gap-1 hover:text-violet-700">
              Ver <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

const MINI_STAT_COLORS: Record<string, string> = {
  blue: 'bg-blue-50 text-blue-600',
  amber: 'bg-amber-50 text-amber-600',
  pink: 'bg-pink-50 text-pink-600',
  green: 'bg-green-50 text-green-600',
}

function MiniStat({ icon: Icon, value, label, color }: {
  icon: any; value: string | number; label: string; color: string
}) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${MINI_STAT_COLORS[color] ?? MINI_STAT_COLORS.blue}`}>
          <Icon className="w-4 h-4" />
        </div>
        <div>
          <p className="nw-tabular text-xl font-bold text-gray-900">{value}</p>
          <p className="text-[10px] text-gray-500 uppercase tracking-wider">{label}</p>
        </div>
      </div>
    </div>
  )
}

function ActionCard({ href, icon: Icon, title, desc, gradient }: {
  href: string; icon: any; title: string; desc: string; gradient: string
}) {
  return (
    <Link href={href} className="group">
      <div className={`bg-gradient-to-br ${gradient} rounded-2xl p-6 text-white shadow-md hover:shadow-xl hover:scale-[1.02] transition-all`}>
        <Icon className="w-8 h-8 mb-3 opacity-90" />
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-sm opacity-80">{desc}</p>
      </div>
    </Link>
  )
}
