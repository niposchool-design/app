'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Award, Lock, CheckCircle } from 'lucide-react'
import type { Tables } from '@/lib/supabase/database.types'

type Achievement = Tables<'v_achievements'>
type UserAchievement = Tables<'v_user_achievements'>

export default function AchievementsPage() {
  const [all, setAll] = useState<Achievement[]>([])
  const [mine, setMine] = useState<UserAchievement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        const { data: allData } = await supabase.from('v_achievements').select('*').eq('is_active', true).order('category')
        if (allData) setAll(allData as Achievement[])

        if (user) {
          const { data: myData } = await supabase.from('v_user_achievements').select('*').eq('user_id', user.id)
          if (myData) setMine(myData as UserAchievement[])
        }
      } catch (error) {
        console.error('Error loading achievements:', error)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const categories: Record<string, string> = {
    progress: 'Progresso',
    consistency: 'Consistência',
    milestone: 'Marcos',
    special: 'Especial',
  }

  const grouped = all.reduce((acc, a) => {
    const cat = a.category || 'special'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(a)
    return acc
  }, {} as Record<string, Achievement[]>)

  const completedIds = new Set(mine.filter(m => m.is_completed).map(m => m.achievement_id))
  const myMap = Object.fromEntries(mine.map(m => [m.achievement_id, m]))

  if (loading) {
    return <div className="space-y-6 animate-pulse"><div className="h-48 bg-gray-200 rounded-2xl" /><div className="h-64 bg-gray-200 rounded-2xl" /></div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Award className="w-6 h-6 text-amber-500" />
          Conquistas
        </h1>
        <span className="text-sm text-gray-500 font-medium">
          <span className="nw-tabular">{completedIds.size} / {all.length}</span> desbloqueadas
        </span>
      </div>

      {Object.entries(grouped).map(([cat, items]) => (
        <div key={cat}>
          <h2 className="text-lg font-bold text-gray-700 mb-4">{categories[cat] || cat}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map(a => {
              const completed = completedIds.has(a.id)
              const ua = myMap[a.id]
              return (
                <div key={a.id} className={`bg-white rounded-xl border p-4 flex items-start gap-4 transition-all ${completed ? 'border-amber-200 shadow-sm' : 'border-gray-100 opacity-70'}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${completed ? 'bg-amber-100' : 'bg-gray-100'}`} style={completed && a.badge_color ? { backgroundColor: a.badge_color + '20' } : {}}>
                    {completed ? (
                      <CheckCircle className="w-6 h-6" style={{ color: a.badge_color || '#F59E0B' }} />
                    ) : (
                      <Lock className="w-5 h-5 text-gray-300" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm text-gray-900">{a.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{a.description}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs font-medium text-amber-600 nw-tabular">+{a.points_reward} pts</span>
                      {!completed && ua && ua.target_progress > 0 && (
                        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-400 rounded-full" style={{ width: `${(ua.current_progress / ua.target_progress) * 100}%` }} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
