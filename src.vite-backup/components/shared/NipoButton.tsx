/**
 * 🎨 NIPO BUTTON - Componente de Botão Reutilizável
 * 
 * Botão estilizado com variantes, tamanhos e estados
 * Segue o design system Nipo School
 */

import React from 'react'
import { Loader2 } from 'lucide-react'
import clsx from 'clsx'

export interface NipoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Variante visual do botão */
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline'
  
  /** Tamanho do botão */
  size?: 'sm' | 'md' | 'lg'
  
  /** Estado de carregamento */
  isLoading?: boolean
  
  /** Desabilitado */
  disabled?: boolean
  
  /** Ícone à esquerda */
  leftIcon?: React.ReactNode
  
  /** Ícone à direita */
  rightIcon?: React.ReactNode
  
  /** Largura completa */
  fullWidth?: boolean
  
  /** Children (texto do botão) */
  children: React.ReactNode
}

export const NipoButton = React.forwardRef<HTMLButtonElement, NipoButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className,
      children,
      type = 'button',
      ...props
    },
    ref
  ) => {
    // Classes base
    const baseClasses = clsx(
      'inline-flex items-center justify-center gap-2',
      'font-medium rounded-lg transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'active:scale-95',
      fullWidth && 'w-full'
    )

    // Classes de variante
    const variantClasses = {
      primary: clsx(
        'bg-indigo-600 text-white',
        'hover:bg-indigo-700',
        'focus:ring-indigo-500',
        'shadow-sm hover:shadow-md'
      ),
      secondary: clsx(
        'bg-gray-200 text-gray-900',
        'hover:bg-gray-300',
        'focus:ring-gray-400'
      ),
      danger: clsx(
        'bg-red-600 text-white',
        'hover:bg-red-700',
        'focus:ring-red-500',
        'shadow-sm hover:shadow-md'
      ),
      ghost: clsx(
        'bg-transparent text-gray-700',
        'hover:bg-gray-100',
        'focus:ring-gray-400'
      ),
      outline: clsx(
        'bg-transparent border-2 border-indigo-600 text-indigo-600',
        'hover:bg-indigo-50',
        'focus:ring-indigo-500'
      ),
    }

    // Classes de tamanho
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    }

    // Classes combinadas
    const buttonClasses = clsx(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      className
    )

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={buttonClasses}
        {...props}
      >
        {/* Loading Spinner */}
        {isLoading && (
          <Loader2 className="animate-spin" size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
        )}
        
        {/* Left Icon */}
        {!isLoading && leftIcon && (
          <span className="inline-flex">{leftIcon}</span>
        )}
        
        {/* Button Text */}
        <span>{children}</span>
        
        {/* Right Icon */}
        {!isLoading && rightIcon && (
          <span className="inline-flex">{rightIcon}</span>
        )}
      </button>
    )
  }
)

NipoButton.displayName = 'NipoButton'
