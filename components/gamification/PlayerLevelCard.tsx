'use client'

import {
  getPlayerLevel,
  getLevelProgress,
  getNextLevel,
  getPointsToNextLevel,
  GAMIFICATION_LEVELS,
} from '@/lib/gamification/levels'

interface PlayerLevelCardProps {
  totalPoints: number
  compact?: boolean
}

export function PlayerLevelCard({ totalPoints, compact = false }: PlayerLevelCardProps) {
  const level = getPlayerLevel(totalPoints)
  const progress = getLevelProgress(totalPoints)
  const nextLevel = getNextLevel(totalPoints)
  const pointsNeeded = getPointsToNextLevel(totalPoints)

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-lg">{level.emoji}</span>
        <div className="min-w-0">
          <p className="text-xs font-bold text-gray-900 truncate">{level.name}</p>
          <div className="flex items-center gap-2">
            <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${level.gradient}`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-[10px] text-gray-500 font-medium">{totalPoints} pts</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
      {/* Current Level */}
      <div className="flex items-center gap-3">
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${level.gradient} flex items-center justify-center shadow-lg`}>
          <span className="text-2xl">{level.emoji}</span>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">
            Nível {level.level}
          </p>
          <h3 className="text-lg font-bold text-gray-900">{level.name}</h3>
          <p className="text-xs text-gray-500">
            {level.kanji} — {level.meaning}
          </p>
        </div>
      </div>

      {/* Points & Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-bold text-gray-900">{totalPoints.toLocaleString('pt-BR')} pontos</span>
          {nextLevel && (
            <span className="text-gray-500 text-xs">
              {pointsNeeded.toLocaleString('pt-BR')} pts para {nextLevel.emoji} {nextLevel.name}
            </span>
          )}
        </div>
        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${level.gradient} transition-all duration-700`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Level Roadmap */}
      <div className="flex items-center justify-between gap-1 pt-2">
        {GAMIFICATION_LEVELS.map(l => (
          <div
            key={l.level}
            className={`flex flex-col items-center gap-1 ${
              l.level <= level.level ? 'opacity-100' : 'opacity-30'
            }`}
            title={`${l.name} (${l.minPoints}+ pts)`}
          >
            <span className="text-sm">{l.emoji}</span>
            {l.level === level.level && (
              <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${l.gradient}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
