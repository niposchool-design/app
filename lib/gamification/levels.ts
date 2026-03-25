// =============================================
// Gamification Levels — Japanese-themed Names
// Based on: docs/pedagogia/ESSENCIA_PEDAGOGICA.md
// =============================================

export interface GamificationLevel {
  level: number
  name: string
  emoji: string
  kanji: string
  meaning: string
  minPoints: number
  maxPoints: number
  color: string
  gradient: string
}

/**
 * 8 níveis de gamificação com nomes japoneses/natureza.
 * Pontuação alinhada ao curriculum pedagógico.
 */
export const GAMIFICATION_LEVELS: GamificationLevel[] = [
  {
    level: 1,
    name: 'Semente Musical',
    emoji: '🌱',
    kanji: '種',
    meaning: 'Tane — O início da jornada',
    minPoints: 0,
    maxPoints: 100,
    color: 'green',
    gradient: 'from-green-400 to-emerald-500',
  },
  {
    level: 2,
    name: 'Broto Criativo',
    emoji: '🌿',
    kanji: '芽',
    meaning: 'Me — Crescimento inicial',
    minPoints: 101,
    maxPoints: 300,
    color: 'emerald',
    gradient: 'from-emerald-400 to-teal-500',
  },
  {
    level: 3,
    name: 'Árvore Sonora',
    emoji: '🌳',
    kanji: '木',
    meaning: 'Ki — Raízes fortes',
    minPoints: 301,
    maxPoints: 600,
    color: 'teal',
    gradient: 'from-teal-400 to-cyan-500',
  },
  {
    level: 4,
    name: 'Bambu Resiliente',
    emoji: '🎋',
    kanji: '竹',
    meaning: 'Take — Flexibilidade e força',
    minPoints: 601,
    maxPoints: 1000,
    color: 'cyan',
    gradient: 'from-cyan-400 to-blue-500',
  },
  {
    level: 5,
    name: 'Flor de Cerejeira',
    emoji: '🌸',
    kanji: '桜',
    meaning: 'Sakura — Beleza e dedicação',
    minPoints: 1001,
    maxPoints: 1500,
    color: 'pink',
    gradient: 'from-pink-400 to-rose-500',
  },
  {
    level: 6,
    name: 'Montanha Fuji',
    emoji: '🗾',
    kanji: '富士',
    meaning: 'Fuji — Grandeza alcançada',
    minPoints: 1501,
    maxPoints: 2500,
    color: 'blue',
    gradient: 'from-blue-400 to-indigo-500',
  },
  {
    level: 7,
    name: 'Sol Nascente',
    emoji: '🌅',
    kanji: '日の出',
    meaning: 'Hinode — Iluminação musical',
    minPoints: 2501,
    maxPoints: 4000,
    color: 'orange',
    gradient: 'from-orange-400 to-amber-500',
  },
  {
    level: 8,
    name: 'Mestre Alpha',
    emoji: '🎌',
    kanji: 'マスター',
    meaning: 'Masutā — Maestria completa',
    minPoints: 4001,
    maxPoints: Infinity,
    color: 'red',
    gradient: 'from-red-500 to-purple-600',
  },
]

/**
 * Pontuação por ação alinhada ao curriculum pedagógico.
 * Fonte: docs/pedagogia/GAMIFICACAO.md
 */
export const POINTS_CONFIG = {
  /** Completar uma aula */
  LESSON_COMPLETE: 50,
  /** Submeter evidência (foto/vídeo/áudio) */
  EVIDENCE_SUBMIT: 30,
  /** Completar autoavaliação */
  SELF_EVALUATION: 20,
  /** Completar portfólio */
  PORTFOLIO_COMPLETE: 100,
  /** Completar desafio */
  CHALLENGE_COMPLETE: 15,
  /** Registrar prática diária */
  DAILY_PRACTICE: 5,
  /** Ganhar achievement/badge */
  ACHIEVEMENT_BONUS: 50,
  /** Participação na comunidade (post/comentário) */
  COMMUNITY_PARTICIPATION: 5,
  /** Completar reflexão semanal */
  WEEKLY_REFLECTION: 15,
  /** Item Alpha Engine */
  ALPHA_ITEM: 5,
} as const

/**
 * Retorna o nível do jogador baseado em pontos totais.
 */
export function getPlayerLevel(totalPoints: number): GamificationLevel {
  for (let i = GAMIFICATION_LEVELS.length - 1; i >= 0; i--) {
    if (totalPoints >= GAMIFICATION_LEVELS[i].minPoints) {
      return GAMIFICATION_LEVELS[i]
    }
  }
  return GAMIFICATION_LEVELS[0]
}

/**
 * Retorna o progresso percentual dentro do nível atual.
 */
export function getLevelProgress(totalPoints: number): number {
  const level = getPlayerLevel(totalPoints)
  if (level.maxPoints === Infinity) return 100
  const range = level.maxPoints - level.minPoints
  const progress = totalPoints - level.minPoints
  return Math.min(100, Math.round((progress / range) * 100))
}

/**
 * Retorna o próximo nível, ou null se já é o máximo.
 */
export function getNextLevel(totalPoints: number): GamificationLevel | null {
  const current = getPlayerLevel(totalPoints)
  const idx = GAMIFICATION_LEVELS.findIndex(l => l.level === current.level)
  if (idx >= GAMIFICATION_LEVELS.length - 1) return null
  return GAMIFICATION_LEVELS[idx + 1]
}

/**
 * Pontos faltantes para o próximo nível.
 */
export function getPointsToNextLevel(totalPoints: number): number {
  const next = getNextLevel(totalPoints)
  if (!next) return 0
  return next.minPoints - totalPoints
}
