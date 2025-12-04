// src/features/gamificacao/components/AchievementCard.tsx
import { Badge, Star, Lock } from 'lucide-react'

interface Achievement {
  id: string
  name: string
  description: string
  badge_icon?: string
  badge_color?: string
  points_reward: number
  is_unlocked?: boolean
  progress?: {
    current: number
    target: number
  }
}

interface AchievementCardProps {
  achievement: Achievement
  onClick?: () => void
}

export function AchievementCard({ achievement, onClick }: AchievementCardProps) {
  const isUnlocked = achievement.is_unlocked
  const progress = achievement.progress

  return (
    <div
      data-testid="achievement-card"
      className={`
        relative p-6 rounded-lg border transition-all duration-200 cursor-pointer
        ${isUnlocked 
          ? 'border-green-200 bg-green-50 hover:shadow-md' 
          : 'border-gray-200 bg-gray-50 opacity-75'
        }
        ${onClick ? 'hover:shadow-lg' : ''}
      `}
      onClick={onClick}
    >
      {/* Badge Icon */}
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white mb-4 mx-auto">
        {achievement.badge_icon ? (
          <span className="text-2xl">{achievement.badge_icon}</span>
        ) : isUnlocked ? (
          <Star className="w-6 h-6 text-yellow-500" />
        ) : (
          <Lock className="w-6 h-6 text-gray-400" />
        )}
      </div>

      {/* Achievement Info */}
      <div className="text-center">
        <h3 className={`font-semibold mb-2 ${isUnlocked ? 'text-gray-900' : 'text-gray-600'}`}>
          {achievement.name}
        </h3>
        <p className={`text-sm mb-4 ${isUnlocked ? 'text-gray-700' : 'text-gray-500'}`}>
          {achievement.description}
        </p>

        {/* Progress Bar (se não desbloqueada) */}
        {!isUnlocked && progress && (
          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(progress.current / progress.target) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {progress.current} / {progress.target}
            </p>
          </div>
        )}

        {/* Points */}
        <div className={`
          inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
          ${isUnlocked 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-600'
          }
        `}>
          <Badge className="w-4 h-4 mr-1" />
          {achievement.points_reward} pts
        </div>
      </div>

      {/* Unlocked indicator */}
      {isUnlocked && (
        <div className="absolute top-2 right-2">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <Star className="w-4 h-4 text-white" fill="currentColor" />
          </div>
        </div>
      )}
    </div>
  )
}

export default AchievementCard