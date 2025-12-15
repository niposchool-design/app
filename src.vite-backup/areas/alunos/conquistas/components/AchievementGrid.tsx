// src/features/gamificacao/components/AchievementGrid.tsx
import { useState } from 'react'
import { Filter } from 'lucide-react'
import AchievementCard from './AchievementCard'

interface Achievement {
  id: string
  name: string
  description: string
  badge_icon?: string
  badge_color?: string
  points_reward: number
  category?: string
  is_unlocked?: boolean
  progress?: {
    current: number
    target: number
  }
}

interface AchievementGridProps {
  achievements: Achievement[]
  onAchievementClick?: (achievement: Achievement) => void
}

export function AchievementGrid({ achievements, onAchievementClick }: AchievementGridProps) {
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')

  // Filtrar conquistas
  const filteredAchievements = achievements.filter(achievement => {
    const statusMatch = 
      filter === 'all' || 
      (filter === 'unlocked' && achievement.is_unlocked) ||
      (filter === 'locked' && !achievement.is_unlocked)
    
    const categoryMatch = 
      categoryFilter === 'all' || 
      achievement.category === categoryFilter

    return statusMatch && categoryMatch
  })

  // Categorias únicas
  const categories = Array.from(new Set(achievements.map(a => a.category).filter(Boolean)))

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <option value="all">Todas</option>
            <option value="unlocked">Desbloqueadas</option>
            <option value="locked">Bloqueadas</option>
          </select>
        </div>

        {/* Category Filter */}
        {categories.length > 0 && (
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <option value="all">Todas as categorias</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-gray-900">
            {achievements.filter(a => a.is_unlocked).length}
          </div>
          <div className="text-sm text-gray-600">Desbloqueadas</div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-gray-900">
            {achievements.length}
          </div>
          <div className="text-sm text-gray-600">Total</div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-indigo-600">
            {achievements
              .filter(a => a.is_unlocked)
              .reduce((sum, a) => sum + a.points_reward, 0)
            }
          </div>
          <div className="text-sm text-gray-600">Pontos Ganhos</div>
        </div>
      </div>

      {/* Grid de Conquistas */}
      {filteredAchievements.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map(achievement => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              onClick={() => onAchievementClick?.(achievement)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-2">Nenhuma conquista encontrada</div>
          <button
            onClick={() => {
              setFilter('all')
              setCategoryFilter('all')
            }}
            className="text-indigo-600 hover:text-indigo-700 text-sm"
          >
            Limpar filtros
          </button>
        </div>
      )}
    </div>
  )
}

export default AchievementGrid