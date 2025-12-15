/**
 * 🏷️ BADGE COMPONENT - NIPO SCHOOL
 * 
 * Componente para tags, status e indicadores
 */

import React from 'react'
import { cn } from '../../lib/utils'

export type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning'
export type BadgeSize = 'sm' | 'md' | 'lg'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant
  size?: BadgeSize
  children: React.ReactNode
}

const badgeVariants = {
  default: 'bg-purple-600 hover:bg-purple-700 text-white border-purple-600',
  secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-900 border-gray-200',
  destructive: 'bg-red-500 hover:bg-red-600 text-white border-red-500',
  outline: 'text-gray-900 border-gray-300 bg-transparent hover:bg-gray-50',
  success: 'bg-green-500 hover:bg-green-600 text-white border-green-500',
  warning: 'bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500'
}

const badgeSizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-base'
}

export function Badge({ 
  className, 
  variant = 'default', 
  size = 'md',
  children,
  ...props 
}: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border font-medium transition-colors',
        badgeVariants[variant],
        badgeSizes[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// Badges especializados para diferentes contextos
export function StatusBadge({ 
  status, 
  className, 
  ...props 
}: { 
  status: 'active' | 'inactive' | 'pending' | 'completed' 
} & Omit<BadgeProps, 'variant'>) {
  const statusVariants = {
    active: 'success',
    inactive: 'secondary',
    pending: 'warning',
    completed: 'default'
  } as const

  const statusLabels = {
    active: 'Ativo',
    inactive: 'Inativo',
    pending: 'Pendente',
    completed: 'Concluído'
  }

  return (
    <Badge 
      variant={statusVariants[status]} 
      className={className}
      {...props}
    >
      {statusLabels[status]}
    </Badge>
  )
}

export function CountBadge({ 
  count, 
  className, 
  ...props 
}: { 
  count: number 
} & Omit<BadgeProps, 'children'>) {
  return (
    <Badge 
      variant="default" 
      size="sm"
      className={cn('min-w-[20px] justify-center', className)}
      {...props}
    >
      {count > 99 ? '99+' : count}
    </Badge>
  )
}

export function LevelBadge({ 
  level, 
  className, 
  ...props 
}: { 
  level: 'iniciante' | 'intermediario' | 'avancado' 
} & Omit<BadgeProps, 'variant' | 'children'>) {
  const levelVariants = {
    iniciante: 'success',
    intermediario: 'warning',
    avancado: 'destructive'
  } as const

  const levelLabels = {
    iniciante: 'Iniciante',
    intermediario: 'Intermediário',
    avancado: 'Avançado'
  }

  return (
    <Badge 
      variant={levelVariants[level]} 
      className={className}
      {...props}
    >
      {levelLabels[level]}
    </Badge>
  )
}

export default Badge