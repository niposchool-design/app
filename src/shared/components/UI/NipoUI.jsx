import React from 'react';

// Componentes de Layout Base
export const NipoContainer = ({ children, className = '' }) => (
  <div className={`max-w-4xl mx-auto px-4 sm:px-6 py-6 ${className}`}>
    {children}
  </div>
);

export const NipoSection = ({ children, className = '' }) => (
  <div className={`mb-8 ${className}`}>
    {children}
  </div>
);

// Componentes de Card
export const NipoCard = ({ children, className = '', hover = true }) => (
  <div className={`
    bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-red-100 
    transition-all duration-300
    ${hover ? 'hover:shadow-xl hover:-translate-y-1' : ''}
    ${className}
  `}>
    {children}
  </div>
);

export const NipoStatsCard = ({ icon: IconComponent, value, label, color = 'red', className = '' }) => (
  <div className={`
    bg-white/90 backdrop-blur-sm rounded-xl p-4 text-center border 
    ${color === 'red' ? 'border-red-200' : 
      color === 'blue' ? 'border-blue-200' : 
      color === 'green' ? 'border-green-200' : 
      color === 'yellow' ? 'border-yellow-200' : 
      'border-gray-200'} 
    transition-all duration-200 hover:shadow-md
    ${className}
  `}>
    {IconComponent && (
      <IconComponent className={`
        w-6 h-6 mx-auto mb-2
        ${color === 'red' ? 'text-red-500' : 
          color === 'blue' ? 'text-blue-500' : 
          color === 'green' ? 'text-green-500' : 
          color === 'yellow' ? 'text-yellow-500' : 
          'text-gray-500'}
      `} />
    )}
    <p className="text-2xl font-bold text-gray-900">{value}</p>
    <p className="text-xs text-gray-600">{label}</p>
  </div>
);

// Componentes de Botão
export const NipoButton = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  className = '', 
  disabled = false,
  ...props 
}) => {
  const baseClasses = 'font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-lg',
    secondary: 'bg-white/90 backdrop-blur-sm border border-gray-200 text-gray-700 hover:bg-gray-50',
    outline: 'border-2 border-red-500 text-red-500 bg-transparent hover:bg-red-500 hover:text-white',
    ghost: 'text-gray-700 hover:bg-gray-100'
  };
  
  const sizes = {
    small: 'px-4 py-2 text-sm rounded-lg',
    medium: 'px-6 py-3 text-base rounded-xl',
    large: 'px-8 py-4 text-lg rounded-xl'
  };

  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

// Componentes de Grid
export const NipoGrid = ({ children, type = 'default', className = '' }) => {
  const gridTypes = {
    stats: 'grid grid-cols-2 lg:grid-cols-4 gap-4',
    actions: 'grid grid-cols-1 sm:grid-cols-2 gap-6',
    default: 'grid gap-4'
  };

  return (
    <div className={`${gridTypes[type]} ${className}`}>
      {children}
    </div>
  );
};

// Componente de Loading
export const NipoLoading = ({ text = 'Carregando...', className = '' }) => (
  <div className={`text-center py-8 ${className}`}>
    <div className="w-16 h-16 bg-red-500 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
      <span className="text-white text-2xl">🎵</span>
    </div>
    <p className="text-gray-600">{text}</p>
  </div>
);

// Componente de Empty State
export const NipoEmptyState = ({ 
  icon: IconComponent, 
  title = 'Nenhum item encontrado', 
  message = 'Não há itens para exibir no momento.',
  action,
  className = '' 
}) => (
  <div className={`text-center py-8 ${className}`}>
    {IconComponent ? (
      <IconComponent className="w-16 h-16 text-gray-300 mx-auto mb-4" />
    ) : (
      <div className="text-6xl mb-4">📭</div>
    )}
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 mb-6">{message}</p>
    {action && action}
  </div>
);

// Componente de Breadcrumb
export const NipoBreadcrumb = ({ items = [], className = '' }) => (
  <nav className={`flex items-center space-x-2 text-sm text-gray-500 mb-6 ${className}`}>
    {items.map((item, index) => (
      <React.Fragment key={index}>
        {index > 0 && <span className="text-gray-300">•</span>}
        {item.href ? (
          <a href={item.href} className="hover:text-gray-700 transition-colors">
            {item.label}
          </a>
        ) : (
          <span className={index === items.length - 1 ? 'text-gray-900 font-medium' : ''}>
            {item.label}
          </span>
        )}
      </React.Fragment>
    ))}
  </nav>
);

// Background padrão
export const NipoBackground = ({ children, className = '' }) => (
  <div className={`min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 ${className}`}>
    {children}
  </div>
);

// Footer padrão
export const NipoFooter = ({ className = '' }) => (
  <footer className={`text-center py-8 border-t border-red-200 bg-white/50 rounded-t-2xl backdrop-blur-sm ${className}`}>
    <div className="mb-4">
      <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg mx-auto mb-2 flex items-center justify-center">
        <span className="text-white text-sm font-bold">鳥</span>
      </div>
    </div>
    <p className="text-gray-600 font-medium mb-1">Nipo School App &copy; 2025</p>
    <p className="text-red-500 text-sm font-bold">
      🎵 "Se não for divertido, ninguém aprende. Se não for fácil, ninguém começa."
    </p>
    <p className="text-xs text-gray-400 mt-2">Versão Beta • ADNIPO Suzano</p>
  </footer>
);