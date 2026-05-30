'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Trophy, Award, Flame, Star, Target } from 'lucide-react'
import type { Tables } from '@/lib/supabase/database.types'

type UserProgress = Tables<'v_user_progress'>
type Achievement = Tables<'v_user_achievements'>

export default function ProgressPage() {
  const [progress, setProgress] = useState<UserProgress | null>(null)
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const { data: progressData } = await supabase.from('v_user_progress').select('*').eq('user_id', user.id).single()
        const { data: achievementsData } = await supabase.from('v_user_achievements').select('*').eq('user_id', user.id)

        if (progressData) setProgress(progressData as UserProgress)
        if (achievementsData) setAchievements(achievementsData as Achievement[])
      } catch (error) {
        console.error('Error loading progress:', error)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return <div className="space-y-6 animate-pulse"><div className="h-48 bg-gray-200 rounded-2xl" /><div className="h-64 bg-gray-200 rounded-2xl" /></div>
  }

  const p = progress || {} as UserProgress

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
        <Trophy className="w-6 h-6 text-amber-500" />
        Meu Progresso
      </h1>

      {/* Level Card */}
      <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center text-4xl font-black nw-tabular">
            {p.level || 1}
          </div>
          <div>
            <h2 className="text-3xl font-bold">{p.level_name || 'Iniciante'}</h2>
            <p className="text-orange-100"><span className="nw-tabular">{p.total_points || 0}</span> pontos totais</p>
          </div>
          {p.current_streak > 0 && (
            <div className="ml-auto flex items-center gap-2 bg-white/20 px-4 py-2 rounded-xl">
              <Flame className="w-6 h-6 text-yellow-300" />
              <span className="text-xl font-bold nw-tabular">{p.current_streak}</span>
              <span className="text-sm opacity-80">dias</span>
            </div>
          )}
        </div>
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span>XP para nível <span className="nw-tabular">{(p.level || 1) + 1}</span></span>
            <span className="font-bold nw-tabular">{p.current_xp || 0} / {p.xp_to_next_level || 100}</span>
          </div>
          <div className="h-3 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full" style={{ width: `${p.xp_to_next_level > 0 ? (p.current_xp / p.xp_to_next_level) * 100 : 0}%` }} />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatBox icon={Target} value={p.lessons_completed || 0} label="Aulas Completas" />
        <StatBox icon={Award} value={p.achievements_unlocked || 0} label="Conquistas" />
        <StatBox icon={Star} value={p.badges_earned || 0} label="Badges" />
        <StatBox icon={Flame} value={p.longest_streak || 0} label="Maior Streak" />
      </div>

      {/* Achievements */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Conquistas</h2>
        {achievements.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
            <Award className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-500">Nenhuma conquista desbloqueada ainda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {achievements.map(a => (
              <div key={a.id} className={`bg-white rounded-xl border p-4 flex items-center gap-4 ${a.is_completed ? 'border-amber-200' : 'border-gray-100 opacity-60'}`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${a.is_completed ? 'bg-amber-100' : 'bg-gray-100'}`}>
                  {a.badge_icon || '🏆'}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm text-gray-900">{a.achievement_name}</h3>
                  <p className="text-xs text-gray-400">{a.achievement_description}</p>
                  {!a.is_completed && a.target_progress && (
                    <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: `${(a.current_progress / a.target_progress) * 100}%` }} />
                    </div>
                  )}
                </div>
                {a.is_completed && <span className="text-xs font-bold text-amber-600 nw-tabular">+{a.points_reward} pts</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function StatBox({ icon: Icon, value, label }: { icon: any; value: number; label: string }) {
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
      <Icon className="w-5 h-5 text-gray-400 mx-auto mb-2" />
      <p className="text-2xl font-bold text-gray-900 nw-tabular">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  )
}
