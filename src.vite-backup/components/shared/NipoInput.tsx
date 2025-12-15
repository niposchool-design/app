/**
 * 🎨 NIPO INPUT - Componente de Input Reutilizável
 * 
 * Input estilizado com label, error, ícones e validação visual
 * Segue o design system Nipo School
 */

import React from 'react'
import clsx from 'clsx'
import { AlertCircle } from 'lucide-react'

export interface NipoInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Label do input */
  label?: string
  
  /** Mensagem de erro */
  error?: string
  
  /** Texto de ajuda */
  helperText?: string
  
  /** Ícone à esquerda */
  leftIcon?: React.ReactNode
  
  /** Ícone à direita */
  rightIcon?: React.ReactNode
  
  /** Input obrigatório (adiciona asterisco) */
  isRequired?: boolean
  
  /** Classes CSS adicionais */
  className?: string
  
  /** Classes do container */
  containerClassName?: string
  
  /** Classes do label */
  labelClassName?: string
}

export const NipoInput = React.forwardRef<HTMLInputElement, NipoInputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      isRequired,
      className,
      containerClassName,
      labelClassName,
      disabled,
      type = 'text',
      id,
      ...props
    },
    ref
  ) => {
    // Gerar ID único se não fornecido
    const inputId = id || `nipo-input-${Math.random().toString(36).substr(2, 9)}`
    
    // Classes do container
    const wrapperClasses = clsx('w-full', containerClassName)

    // Classes do label
    const labelClasses = clsx(
      'block text-sm font-medium text-gray-700 mb-1',
      disabled && 'opacity-50',
      labelClassName
    )

    // Classes do input
    const inputClasses = clsx(
      'block w-full rounded-lg border transition-colors duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-0',
      'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
      // Com ícone à esquerda
      leftIcon ? 'pl-10' : 'pl-3',
      // Com ícone à direita
      rightIcon || error ? 'pr-10' : 'pr-3',
      'py-2',
      // Estados
      error
        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
        : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500',
      className
    )

    // Classes do container do input
    const inputContainerClasses = clsx('relative', error && 'mb-1')

    return (
      <div className={wrapperClasses}>
        {/* Label */}
        {label && (
          <label htmlFor={inputId} className={labelClasses}>
            {label}
            {isRequired && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {/* Input Container */}
        <div className={inputContainerClasses}>
          {/* Left Icon */}
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400">{leftIcon}</span>
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            id={inputId}
            type={type}
            disabled={disabled}
            className={inputClasses}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            {...props}
          />

          {/* Right Icon ou Error Icon */}
          {(rightIcon || error) && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              {error ? (
                <AlertCircle className="h-5 w-5 text-red-500" />
              ) : (
                <span className="text-gray-400">{rightIcon}</span>
              )}
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <p id={`${inputId}-error`} className="text-sm text-red-600 mt-1">
            {error}
          </p>
        )}

        {/* Helper Text */}
        {!error && helperText && (
          <p id={`${inputId}-helper`} className="text-sm text-gray-500 mt-1">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

NipoInput.displayName = 'NipoInput'

// Variante Textarea
export interface NipoTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
  isRequired?: boolean
  className?: string
  containerClassName?: string
  labelClassName?: string
}

export const NipoTextarea = React.forwardRef<HTMLTextAreaElement, NipoTextareaProps>(
  (
    {
      label,
      error,
      helperText,
      isRequired,
      className,
      containerClassName,
      labelClassName,
      disabled,
      id,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const textareaId = id || `nipo-textarea-${Math.random().toString(36).substr(2, 9)}`

    const textareaClasses = clsx(
      'block w-full rounded-lg border transition-colors duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-0',
      'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
      'px-3 py-2',
      error
        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
        : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500',
      className
    )

    return (
      <div className={clsx('w-full', containerClassName)}>
        {label && (
          <label
            htmlFor={textareaId}
            className={clsx(
              'block text-sm font-medium text-gray-700 mb-1',
              disabled && 'opacity-50',
              labelClassName
            )}
          >
            {label}
            {isRequired && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          disabled={disabled}
          className={textareaClasses}
          aria-invalid={error ? 'true' : 'false'}
          {...props}
        />

        {error && (
          <p className="text-sm text-red-600 mt-1">{error}</p>
        )}

        {!error && helperText && (
          <p className="text-sm text-gray-500 mt-1">{helperText}</p>
        )}
      </div>
    )
  }
)

NipoTextarea.displayName = 'NipoTextarea'
