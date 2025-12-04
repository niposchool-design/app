/**
 * 📊 PROGRESS BAR - NIPO SCHOOL
 * 
 * Componente para mostrar progresso visual conforme blueprint
 */

import React from 'react'

interface ProgressBarProps {
  progress: number // 0-100
  label?: string
  size?: 'sm' | 'md' | 'lg'
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple'
  showPercentage?: boolean
  className?: string
}

export function ProgressBar({ 
  progress, 
  label, 
  size = 'md', 
  color = 'blue',
  showPercentage = true,
  className = '' 
}: ProgressBarProps) {
  const clampedProgress = Math.max(0, Math.min(100, progress))
  
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  }
  
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
    purple: 'bg-purple-500'
  }

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
          {showPercentage && (
            <span className="text-sm text-gray-500">{Math.round(clampedProgress)}%</span>
          )}
        </div>
      )}
      
      <div className={`w-full bg-gray-200 rounded-full ${sizeClasses[size]}`}>
        <div
          className={`${colorClasses[color]} ${sizeClasses[size]} rounded-full transition-all duration-300 ease-out`}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  )
}

export default ProgressBar