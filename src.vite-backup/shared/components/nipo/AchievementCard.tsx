import React from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import { Trophy, Star, Award, Medal, Crown, Zap } from 'lucide-react'

// 🎌 Tipos do AchievementCard
interface AchievementCardProps {
  title: string
  description: string
  icon?: React.ReactNode
  type?: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond'
  progress?: number // 0-100
  unlocked?: boolean
  role?: 'student' | 'professor' | 'admin'
  philosophy?: 'kaizen' | 'wabi-sabi' | 'zen'
  className?: string
  onClick?: () => void
}

// 🏆 Icon mapping por tipo
const achievementIcons = {
  bronze: Medal,
  silver: Award,
  gold: Trophy,
  platinum: Star,
  diamond: Crown
}

// 🎨 Color mapping por tipo
const achievementColors = {
  bronze: {
    bg: 'from-orange-400 to-orange-600',
    border: 'border-orange-300',
    glow: 'shadow-[0_0_20px_rgba(251,146,60,0.4)]',
    text: 'text-orange-700'
  },
  silver: {
    bg: 'from-gray-400 to-gray-600',
    border: 'border-gray-300',
    glow: 'shadow-[0_0_20px_rgba(156,163,175,0.4)]',
    text: 'text-gray-700'
  },
  gold: {
    bg: 'from-yellow-400 to-yellow-600',
    border: 'border-yellow-300',
    glow: 'shadow-[0_0_20px_rgba(251,191,36,0.4)]',
    text: 'text-yellow-700'
  },
  platinum: {
    bg: 'from-indigo-400 to-indigo-600',
    border: 'border-indigo-300',
    glow: 'shadow-[0_0_20px_rgba(129,140,248,0.4)]',
    text: 'text-indigo-700'
  },
  diamond: {
    bg: 'from-purple-400 to-purple-600',
    border: 'border-purple-300',
    glow: 'shadow-[0_0_20px_rgba(168,85,247,0.4)]',
    text: 'text-purple-700'
  }
}

export function AchievementCard({
  title,
  description,
  icon,
  type = 'bronze',
  progress,
  unlocked = false,
  role,
  philosophy = 'kaizen',
  className = '',
  onClick
}: AchievementCardProps) {
  const { isDark } = useTheme()
  
  const DefaultIcon = achievementIcons[type]
  const colors = achievementColors[type]

  // 🧘 Philosophy animations
  const getPhilosophyClasses = () => {
    switch (philosophy) {
      case 'kaizen':
        return 'hover:animate-scale-gentle transform-gpu'
      case 'wabi-sabi':
        return 'hover:animate-wave-gentle'
      case 'zen':
        return 'hover:animate-zen-breath'
      default:
        return ''
    }
  }

  // 👤 Role-based enhancements
  const getRoleClasses = () => {
    if (!role) return ''
    
    const roleMap = {
      student: 'hover:shadow-student',
      professor: 'hover:shadow-professor',
      admin: 'hover:shadow-admin'
    }
    
    return roleMap[role] || ''
  }

  return (
    <div
      className={`
        relative group cursor-pointer
        bg-white dark:bg-nipo-zen-800
        border-2 ${unlocked ? colors.border : 'border-nipo-zen-300 dark:border-nipo-zen-600'}
        rounded-zen overflow-hidden
        transition-all duration-500 ease-in-out
        ${unlocked ? colors.glow : 'shadow-zen'}
        ${unlocked ? 'hover:scale-105' : 'hover:scale-102'}
        ${getPhilosophyClasses()}
        ${getRoleClasses()}
        ${!unlocked ? 'opacity-60 grayscale' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {/* ✨ Unlock Animation Background */}
      <div className={`
        absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
        bg-gradient-to-br ${colors.bg}
        ${unlocked ? 'opacity-10' : 'opacity-0'}
      `} />

      {/* 🌟 Sparkle Effect */}
      {unlocked && (
        <div className="absolute top-2 right-2">
          <Zap className="w-5 h-5 text-yellow-400 animate-pulse" />
        </div>
      )}

      {/* 📄 Card Content */}
      <div className="relative p-6">
        {/* 🏆 Icon Section */}
        <div className="flex items-center gap-4 mb-4">
          <div className={`
            w-16 h-16 rounded-full flex items-center justify-center
            ${unlocked ? `bg-gradient-to-br ${colors.bg}` : 'bg-nipo-zen-200 dark:bg-nipo-zen-700'}
            ${unlocked ? 'shadow-lg' : ''}
            transition-all duration-300
          `}>
            {icon ? (
              <div className={`w-8 h-8 ${unlocked ? 'text-white' : 'text-nipo-zen-500'}`}>
                {icon}
              </div>
            ) : (
              <DefaultIcon className={`w-8 h-8 ${unlocked ? 'text-white' : 'text-nipo-zen-500'}`} />
            )}
          </div>

          {/* 📊 Progress Ring (se houver progress) */}
          {progress !== undefined && (
            <div className="relative w-12 h-12">
              <svg className="w-12 h-12 transform -rotate-90">
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  className="text-nipo-zen-200 dark:text-nipo-zen-700"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 20}`}
                  strokeDashoffset={`${2 * Math.PI * 20 * (1 - progress / 100)}`}
                  className={unlocked ? colors.text : 'text-nipo-zen-400'}
                  style={{
                    transition: 'stroke-dashoffset 1s ease-in-out'
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-zen font-bold text-nipo-zen-700 dark:text-nipo-zen-300">
                  {progress}%
                </span>
              </div>
            </div>
          )}
        </div>

        {/* 📝 Text Content */}
        <div className="space-y-2">
          <h3 className={`
            font-zen font-bold text-lg
            ${unlocked ? colors.text + ' dark:text-white' : 'text-nipo-zen-600 dark:text-nipo-zen-400'}
            group-hover:text-nipo-zen-900 dark:group-hover:text-white
            transition-colors duration-300
          `}>
            {title}
          </h3>
          
          <p className={`
            text-sm font-zen leading-relaxed
            ${unlocked ? 'text-nipo-zen-700 dark:text-nipo-zen-300' : 'text-nipo-zen-500 dark:text-nipo-zen-500'}
            group-hover:text-nipo-zen-800 dark:group-hover:text-nipo-zen-200
            transition-colors duration-300
          `}>
            {description}
          </p>
        </div>

        {/* 🔒 Lock Overlay para achievements não desbloqueados */}
        {!unlocked && (
          <div className="absolute inset-0 bg-black/5 dark:bg-black/20 flex items-center justify-center">
            <div className="text-center">
              <div className="w-8 h-8 mx-auto mb-2 text-nipo-zen-400">
                🔒
              </div>
              <span className="text-xs font-zen text-nipo-zen-500">
                Bloqueado
              </span>
            </div>
          </div>
        )}

        {/* ✨ Hover Effect Border */}
        <div className={`
          absolute inset-0 rounded-zen opacity-0 group-hover:opacity-100
          bg-gradient-to-r ${colors.bg}
          transition-opacity duration-300
          pointer-events-none
        `} style={{ padding: '2px' }}>
          <div className="w-full h-full bg-white dark:bg-nipo-zen-800 rounded-zen" />
        </div>
      </div>
    </div>
  )
}

// 🎌 Componentes especializados por role
export function StudentAchievementCard(props: Omit<AchievementCardProps, 'role'>) {
  return <AchievementCard {...props} role="student" philosophy="kaizen" />
}

export function ProfessorAchievementCard(props: Omit<AchievementCardProps, 'role'>) {
  return <AchievementCard {...props} role="professor" philosophy="zen" />
}

export function AdminAchievementCard(props: Omit<AchievementCardProps, 'role'>) {
  return <AchievementCard {...props} role="admin" philosophy="wabi-sabi" />
}

// 🏆 Achievement Grid Container
interface AchievementGridProps {
  children: React.ReactNode
  columns?: 2 | 3 | 4
  className?: string
}

export function AchievementGrid({ 
  children, 
  columns = 3, 
  className = '' 
}: AchievementGridProps) {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  }

  return (
    <div className={`
      grid ${gridCols[columns]} gap-6
      ${className}
    `}>
      {children}
    </div>
  )
}