/**
 * 🎨 NIPO CARD - Componente de Card Reutilizável
 * 
 * Container estilizado com header, body e footer
 * Segue o design system Nipo School
 */

import React from 'react'
import clsx from 'clsx'

export interface NipoCardProps {
  /** Título do card */
  title?: string
  
  /** Subtítulo do card */
  subtitle?: string
  
  /** Conteúdo do header personalizado */
  header?: React.ReactNode
  
  /** Conteúdo principal */
  children: React.ReactNode
  
  /** Footer do card */
  footer?: React.ReactNode
  
  /** Efeito hover */
  hoverable?: boolean
  
  /** Com borda */
  bordered?: boolean
  
  /** Com padding */
  padding?: 'none' | 'sm' | 'md' | 'lg'
  
  /** Classes CSS adicionais */
  className?: string
  
  /** Classes do body */
  bodyClassName?: string
  
  /** Clicável */
  onClick?: () => void
}

export const NipoCard: React.FC<NipoCardProps> = ({
  title,
  subtitle,
  header,
  children,
  footer,
  hoverable = false,
  bordered = true,
  padding = 'md',
  className,
  bodyClassName,
  onClick,
}) => {
  // Classes base do card
  const cardClasses = clsx(
    'bg-white rounded-lg transition-all duration-200',
    bordered && 'border border-gray-200',
    hoverable && 'hover:shadow-lg cursor-pointer',
    !hoverable && 'shadow-sm',
    onClick && 'cursor-pointer',
    className
  )

  // Classes de padding
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-6',
  }

  // Classes do body
  const bodyClasses = clsx(
    paddingClasses[padding],
    bodyClassName
  )

  return (
    <div className={cardClasses} onClick={onClick}>
      {/* Header */}
      {(title || subtitle || header) && (
        <div className={clsx('border-b border-gray-100', paddingClasses[padding], 'pb-4')}>
          {header ? (
            header
          ) : (
            <>
              {title && (
                <h3 className="text-lg font-semibold text-gray-900">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-sm text-gray-600 mt-1">
                  {subtitle}
                </p>
              )}
            </>
          )}
        </div>
      )}

      {/* Body */}
      <div className={bodyClasses}>
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div className={clsx('border-t border-gray-100', paddingClasses[padding], 'pt-4')}>
          {footer}
        </div>
      )}
    </div>
  )
}

// Subcomponentes para composição flexível

export const NipoCardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div className={clsx('px-5 py-4 border-b border-gray-100', className)}>
      {children}
    </div>
  )
}

export const NipoCardBody: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div className={clsx('px-5 py-4', className)}>
      {children}
    </div>
  )
}

export const NipoCardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div className={clsx('px-5 py-4 border-t border-gray-100', className)}>
      {children}
    </div>
  )
}

// Variantes especiais

export const NipoCardStat: React.FC<{
  label: string
  value: string | number
  icon?: React.ReactNode
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
  className?: string
}> = ({ label, value, icon, trend, trendValue, className }) => {
  const trendColors = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-gray-600',
  }

  return (
    <NipoCard padding="md" className={className}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {trend && trendValue && (
            <p className={clsx('text-sm mt-2', trendColors[trend])}>
              {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendValue}
            </p>
          )}
        </div>
        {icon && (
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-indigo-50 text-indigo-600">
            {icon}
          </div>
        )}
      </div>
    </NipoCard>
  )
}
