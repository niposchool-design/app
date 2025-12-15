/**
 * 🍞 TOAST - NIPO SCHOOL
 * 
 * Componente de notificação toast conforme blueprint
 */

import React from 'react'
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react'

interface ToastProps {
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  onClose: () => void
  className?: string
}

export function Toast({ type, message, onClose, className = '' }: ToastProps) {
  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <XCircle className="w-5 h-5 text-red-500" />,
    warning: <AlertCircle className="w-5 h-5 text-yellow-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />
  }

  const colors = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    warning: 'bg-yellow-50 border-yellow-200',
    info: 'bg-blue-50 border-blue-200'
  }

  return (
    <div className={`
      flex items-center p-4 rounded-lg border ${colors[type]} ${className}
    `}>
      {icons[type]}
      <span className="ml-3 text-sm font-medium text-gray-900">
        {message}
      </span>
      <button
        onClick={onClose}
        className="ml-auto -mx-1.5 -my-1.5 p-1.5 rounded-lg hover:bg-gray-100"
      >
        <span className="sr-only">Fechar</span>
        <XCircle className="w-4 h-4" />
      </button>
    </div>
  )
}

export default Toast