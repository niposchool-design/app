/**
 * 🎨 NIPO MODAL - Componente de Modal Reutilizável
 * 
 * Modal com overlay, animações e tamanhos variados
 * Segue o design system Nipo School
 */

import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import clsx from 'clsx'
import { X } from 'lucide-react'
import { NipoButton } from './NipoButton'

export interface NipoModalProps {
  /** Estado de abertura do modal */
  isOpen: boolean
  
  /** Callback ao fechar */
  onClose: () => void
  
  /** Título do modal */
  title?: string
  
  /** Conteúdo do modal */
  children: React.ReactNode
  
  /** Footer do modal */
  footer?: React.ReactNode
  
  /** Tamanho do modal */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  
  /** Permitir fechar ao clicar fora */
  closeOnOverlayClick?: boolean
  
  /** Mostrar botão de fechar */
  showCloseButton?: boolean
  
  /** Classes CSS adicionais */
  className?: string
}

export const NipoModal: React.FC<NipoModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeOnOverlayClick = true,
  showCloseButton = true,
  className,
}) => {
  // Fechar com ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  // Bloquear scroll quando aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  // Classes de tamanho
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4',
  }

  // Handle overlay click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose()
    }
  }

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fadeIn"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={clsx(
          'relative bg-white rounded-lg shadow-xl w-full animate-slideInUp',
          sizeClasses[size],
          className
        )}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            {title && (
              <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Fechar modal"
              >
                <X size={24} />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
            {footer}
          </div>
        )}
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}

// Modal de Confirmação
export interface NipoConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'warning' | 'info'
  isLoading?: boolean
}

export const NipoConfirmModal: React.FC<NipoConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  variant = 'info',
  isLoading = false,
}) => {
  const variantStyles = {
    danger: 'danger',
    warning: 'secondary',
    info: 'primary',
  } as const

  return (
    <NipoModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <div className="flex gap-3 justify-end">
          <NipoButton variant="ghost" onClick={onClose} disabled={isLoading}>
            {cancelText}
          </NipoButton>
          <NipoButton
            variant={variantStyles[variant]}
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmText}
          </NipoButton>
        </div>
      }
    >
      <p className="text-gray-700">{message}</p>
    </NipoModal>
  )
}
