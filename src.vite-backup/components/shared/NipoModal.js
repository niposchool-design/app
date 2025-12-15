import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * 🎨 NIPO MODAL - Componente de Modal Reutilizável
 *
 * Modal com overlay, animações e tamanhos variados
 * Segue o design system Nipo School
 */
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { X } from 'lucide-react';
import { NipoButton } from './NipoButton';
export const NipoModal = ({ isOpen, onClose, title, children, footer, size = 'md', closeOnOverlayClick = true, showCloseButton = true, className, }) => {
    // Fechar com ESC
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);
    // Bloquear scroll quando aberto
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);
    if (!isOpen)
        return null;
    // Classes de tamanho
    const sizeClasses = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-full mx-4',
    };
    // Handle overlay click
    const handleOverlayClick = (e) => {
        if (closeOnOverlayClick && e.target === e.currentTarget) {
            onClose();
        }
    };
    const modalContent = (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fadeIn", onClick: handleOverlayClick, role: "dialog", "aria-modal": "true", children: _jsxs("div", { className: clsx('relative bg-white rounded-lg shadow-xl w-full animate-slideInUp', sizeClasses[size], className), children: [(title || showCloseButton) && (_jsxs("div", { className: "flex items-center justify-between px-6 py-4 border-b border-gray-200", children: [title && (_jsx("h2", { className: "text-xl font-semibold text-gray-900", children: title })), showCloseButton && (_jsx("button", { onClick: onClose, className: "text-gray-400 hover:text-gray-600 transition-colors", "aria-label": "Fechar modal", children: _jsx(X, { size: 24 }) }))] })), _jsx("div", { className: "px-6 py-4 max-h-[70vh] overflow-y-auto", children: children }), footer && (_jsx("div", { className: "px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg", children: footer }))] }) }));
    return createPortal(modalContent, document.body);
};
export const NipoConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirmar', cancelText = 'Cancelar', variant = 'info', isLoading = false, }) => {
    const variantStyles = {
        danger: 'danger',
        warning: 'secondary',
        info: 'primary',
    };
    return (_jsx(NipoModal, { isOpen: isOpen, onClose: onClose, title: title, size: "sm", footer: _jsxs("div", { className: "flex gap-3 justify-end", children: [_jsx(NipoButton, { variant: "ghost", onClick: onClose, disabled: isLoading, children: cancelText }), _jsx(NipoButton, { variant: variantStyles[variant], onClick: onConfirm, isLoading: isLoading, children: confirmText })] }), children: _jsx("p", { className: "text-gray-700", children: message }) }));
};
