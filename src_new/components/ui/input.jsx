import React from 'react';

/**
 * Input - Componente de entrada de dados reutilizável
 * Nova localização: src_new/components/ui/input.jsx
 * 
 * @param {Object} props
 * @param {string} props.type - Tipo do input (text, email, password, etc.)
 * @param {string} props.label - Label do input
 * @param {string} props.placeholder - Placeholder do input
 * @param {string} props.error - Mensagem de erro
 * @param {boolean} props.disabled - Se o input está desabilitado
 * @param {boolean} props.required - Se o input é obrigatório
 * @param {string} props.className - Classes CSS adicionais
 * @param {React.ReactNode} props.icon - Ícone do input
 */
const Input = React.memo(React.forwardRef(({ 
  type = 'text',
  label,
  placeholder,
  error,
  disabled = false,
  required = false,
  className = '',
  icon,
  ...props
}, ref) => {
  // Classes base do input
  const baseInputClasses = `
    block w-full px-3 py-2
    border border-gray-300 rounded-lg
    placeholder-gray-400
    focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500
    disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
    transition-colors duration-200
  `.replace(/\s+/g, ' ').trim();

  // Classes com erro
  const errorClasses = error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : '';

  // Classes finais
  const inputClasses = `${baseInputClasses} ${errorClasses} ${className}`.replace(/\s+/g, ' ').trim();

  return (
    <div className="space-y-1">
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Ícone à esquerda */}
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <div className="text-gray-400">
              {icon}
            </div>
          </div>
        )}

        {/* Input */}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className={icon ? `pl-10 ${inputClasses}` : inputClasses}
          {...props}
        />
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}));

Input.displayName = 'Input';

export default Input;