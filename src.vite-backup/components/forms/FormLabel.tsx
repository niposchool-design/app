/**
 * 🎨 FORM LABEL - Componente de Label de Formulário
 * 
 * Label estilizado para inputs de formulário
 * Segue o design system Nipo School
 */

import React from 'react'
import clsx from 'clsx'

export interface FormLabelProps {
  /** Texto do label */
  children: React.ReactNode
  
  /** ID do input associado */
  htmlFor?: string
  
  /** Campo obrigatório */
  isRequired?: boolean
  
  /** Disabled */
  disabled?: boolean
  
  /** Classes CSS adicionais */
  className?: string
}

export const FormLabel: React.FC<FormLabelProps> = ({
  children,
  htmlFor,
  isRequired,
  disabled,
  className,
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={clsx(
        'block text-sm font-medium text-gray-700 mb-1',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {children}
      {isRequired && <span className="text-red-500 ml-1" aria-label="required">*</span>}
    </label>
  )
}

// Helper text (texto de ajuda abaixo do input)
export interface FormHelperTextProps {
  children: React.ReactNode
  className?: string
}

export const FormHelperText: React.FC<FormHelperTextProps> = ({
  children,
  className,
}) => {
  return (
    <p className={clsx('text-sm text-gray-500 mt-1', className)}>
      {children}
    </p>
  )
}

// Form group (agrupa label + input + error)
export interface FormGroupProps {
  children: React.ReactNode
  className?: string
}

export const FormGroup: React.FC<FormGroupProps> = ({
  children,
  className,
}) => {
  return (
    <div className={clsx('mb-4', className)}>
      {children}
    </div>
  )
}
