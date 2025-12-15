/**
 * 🎨 FORM FIELD - Componente de Campo de Formulário
 * 
 * Wrapper para React Hook Form com validação integrada
 * Segue o design system Nipo School
 */

import React from 'react'
import { FieldError, UseFormRegisterReturn } from 'react-hook-form'
import { NipoInput, NipoTextarea } from '../shared/NipoInput'

export interface FormFieldProps {
  /** Label do campo */
  label: string
  
  /** Registro do React Hook Form */
  registration?: UseFormRegisterReturn
  
  /** Erro do campo */
  error?: FieldError
  
  /** Tipo de input */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'date' | 'time' | 'datetime-local'
  
  /** Placeholder */
  placeholder?: string
  
  /** Helper text */
  helperText?: string
  
  /** Campo obrigatório */
  isRequired?: boolean
  
  /** Disabled */
  disabled?: boolean
  
  /** Ícone à esquerda */
  leftIcon?: React.ReactNode
  
  /** Ícone à direita */
  rightIcon?: React.ReactNode
  
  /** Classes CSS adicionais */
  className?: string
}

export const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      label,
      registration,
      error,
      type = 'text',
      placeholder,
      helperText,
      isRequired,
      disabled,
      leftIcon,
      rightIcon,
      className,
    },
    ref
  ) => {
    return (
      <NipoInput
        ref={ref}
        label={label}
        type={type}
        placeholder={placeholder}
        helperText={helperText}
        error={error?.message}
        isRequired={isRequired}
        disabled={disabled}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        className={className}
        {...registration}
      />
    )
  }
)

FormField.displayName = 'FormField'

// Textarea Field
export interface FormTextareaProps {
  label: string
  registration?: UseFormRegisterReturn
  error?: FieldError
  placeholder?: string
  helperText?: string
  isRequired?: boolean
  disabled?: boolean
  rows?: number
  className?: string
}

export const FormTextarea = React.forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  (
    {
      label,
      registration,
      error,
      placeholder,
      helperText,
      isRequired,
      disabled,
      rows = 4,
      className,
    },
    ref
  ) => {
    return (
      <NipoTextarea
        ref={ref}
        label={label}
        placeholder={placeholder}
        helperText={helperText}
        error={error?.message}
        isRequired={isRequired}
        disabled={disabled}
        rows={rows}
        className={className}
        {...registration}
      />
    )
  }
)

FormTextarea.displayName = 'FormTextarea'

// Select Field
export interface FormSelectProps {
  label: string
  registration?: UseFormRegisterReturn
  error?: FieldError
  helperText?: string
  isRequired?: boolean
  disabled?: boolean
  placeholder?: string
  options: Array<{ value: string; label: string }>
  className?: string
}

export const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  (
    {
      label,
      registration,
      error,
      helperText,
      isRequired,
      disabled,
      placeholder,
      options,
      className,
    },
    ref
  ) => {
    const selectId = `select-${Math.random().toString(36).substr(2, 9)}`

    return (
      <div className="w-full">
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {isRequired && <span className="text-red-500 ml-1">*</span>}
        </label>

        <select
          ref={ref}
          id={selectId}
          disabled={disabled}
          className={`
            block w-full rounded-lg border transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-offset-0
            disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
            px-3 py-2
            ${
              error
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
            }
            ${className}
          `}
          {...registration}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {error && (
          <p className="text-sm text-red-600 mt-1">{error.message}</p>
        )}

        {!error && helperText && (
          <p className="text-sm text-gray-500 mt-1">{helperText}</p>
        )}
      </div>
    )
  }
)

FormSelect.displayName = 'FormSelect'
