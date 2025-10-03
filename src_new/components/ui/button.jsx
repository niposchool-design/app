import React from 'react';

/**
 * Button - Componente de botão reutilizável
 * Nova localização: src_new/components/ui/button.jsx
 * 
 * @param {Object} props
 * @param {string} props.variant - Variante do botão (primary, secondary, danger, ghost)
 * @param {string} props.size - Tamanho do botão (sm, md, lg)
 * @param {boolean} props.disabled - Se o botão está desabilitado
 * @param {boolean} props.loading - Se o botão está carregando
 * @param {React.ReactNode} props.children - Conteúdo do botão
 * @param {string} props.className - Classes CSS adicionais
 * @param {Function} props.onClick - Função de clique
 */
const Button = React.memo(({ 
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  children,
  className = '',
  onClick,
  ...props
}) => {
  // Variantes de estilo
  const variants = {
    primary: 'bg-red-600 hover:bg-red-700 text-white border-red-600',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-900 border-gray-300',
    danger: 'bg-red-600 hover:bg-red-700 text-white border-red-600',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 border-transparent',
    outline: 'bg-transparent hover:bg-red-50 text-red-600 border-red-600'
  };

  // Tamanhos
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  // Classes base
  const baseClasses = `
    inline-flex items-center justify-center
    border rounded-lg font-medium
    transition-colors duration-200
    focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `.replace(/\s+/g, ' ').trim();

  // Combinar classes
  const buttonClasses = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `.replace(/\s+/g, ' ').trim();

  return (
    <button
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <svg 
          className="animate-spin -ml-1 mr-2 h-4 w-4" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;