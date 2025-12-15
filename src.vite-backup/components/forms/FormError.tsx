/**
 * 🎨 FORM ERROR - Componente de Mensagem de Erro
 * 
 * Exibe mensagens de erro de formulário
 * Segue o design system Nipo School
 */

import React from 'react'
import { AlertCircle } from 'lucide-react'
import clsx from 'clsx'

export interface FormErrorProps {
  /** Mensagem de erro */
  message?: string
  
  /** Classes CSS adicionais */
  className?: string
  
  /** Mostrar ícone */
  showIcon?: boolean
}

export const FormError: React.FC<FormErrorProps> = ({
  message,
  className,
  showIcon = true,
}) => {
  if (!message) return null

  return (
    <div
      className={clsx(
        'flex items-start gap-2 text-sm text-red-600 mt-1',
        className
      )}
      role="alert"
    >
      {showIcon && <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />}
      <span>{message}</span>
    </div>
  )
}

// Mensagem de erro de formulário (nível global)
export interface FormErrorMessageProps {
  /** Título do erro */
  title?: string
  
  /** Mensagens de erro (array ou string) */
  errors?: string | string[]
  
  /** Classes CSS adicionais */
  className?: string
}

export const FormErrorMessage: React.FC<FormErrorMessageProps> = ({
  title = 'Erro ao enviar formulário',
  errors,
  className,
}) => {
  if (!errors) return null

  const errorArray = Array.isArray(errors) ? errors : [errors]

  return (
    <div
      className={clsx(
        'rounded-lg bg-red-50 border border-red-200 p-4',
        className
      )}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-red-800">{title}</h3>
          {errorArray.length > 0 && (
            <ul className="mt-2 space-y-1">
              {errorArray.map((error, index) => (
                <li key={index} className="text-sm text-red-700">
                  • {error}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
