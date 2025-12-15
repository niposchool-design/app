/**
 * 🎨 LOADING SCREEN - Componente de Carregamento
 * 
 * Tela de carregamento com múltiplas variantes
 * Segue o design system Nipo School
 */

import React from 'react'
import clsx from 'clsx'
import { Loader2 } from 'lucide-react'

export interface LoadingScreenProps {
  /** Variante do loading */
  variant?: 'page' | 'inline' | 'skeleton'
  
  /** Tamanho do spinner */
  size?: 'sm' | 'md' | 'lg'
  
  /** Texto de carregamento */
  text?: string
  
  /** Classes CSS adicionais */
  className?: string
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  variant = 'page',
  size = 'md',
  text = 'Carregando...',
  className,
}) => {
  // Classes de tamanho do spinner
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  }

  // Variante: Full Page Loading
  if (variant === 'page') {
    return (
      <div className={clsx(
        'min-h-screen flex items-center justify-center',
        'bg-gradient-to-br from-indigo-50 via-white to-pink-50',
        className
      )}>
        <div className="text-center">
          <Loader2 className={clsx('animate-spin text-indigo-600 mx-auto', sizeClasses[size])} />
          {text && (
            <p className="mt-4 text-gray-600 font-medium">{text}</p>
          )}
        </div>
      </div>
    )
  }

  // Variante: Inline Loading
  if (variant === 'inline') {
    return (
      <div className={clsx('flex items-center justify-center p-4', className)}>
        <Loader2 className={clsx('animate-spin text-indigo-600', sizeClasses[size])} />
        {text && (
          <span className="ml-3 text-gray-600">{text}</span>
        )}
      </div>
    )
  }

  // Variante: Skeleton Loading
  if (variant === 'skeleton') {
    return (
      <div className={clsx('space-y-3', className)}>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
      </div>
    )
  }

  return null
}

// Componente Spinner simples (para uso inline)
export const Spinner: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({
  size = 'md',
  className,
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  }

  return (
    <Loader2 className={clsx('animate-spin text-indigo-600', sizeClasses[size], className)} />
  )
}

// Componente Skeleton (para uso inline)
export const Skeleton: React.FC<{ className?: string; count?: number }> = ({
  className,
  count = 1,
}) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={clsx('h-4 bg-gray-200 rounded animate-pulse', className)}
        />
      ))}
    </div>
  )
}
