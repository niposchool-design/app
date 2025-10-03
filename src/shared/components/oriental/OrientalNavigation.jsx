import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useOrientalNavigation } from '@/shared/hooks/useOrientalNavigation';

// Re-exportar provider do contexto
export { OrientalNavigationProvider } from './OrientalNavigationContext';

// 🔙 BOTÃO VOLTAR QUÂNTICO
export const OrientalBackButton = ({ 
  className = '', 
  showLabel = true, 
  variant = 'primary',
  customAction = null 
}) => {
  const { quantumGoBack } = useOrientalNavigation();
  const location = useLocation();

  // 🎨 Estilos por variante
  const variants = {
    primary: 'bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-white border-2 border-pink-300 text-pink-600 hover:bg-pink-50 hover:border-pink-400',
    minimal: 'bg-transparent text-pink-600 hover:bg-pink-50 border border-pink-200 hover:border-pink-300'
  };

  // 🚫 Não mostrar na home ou login
  if (['/dashboard', '/login', '/'].includes(location.pathname)) {
    return null;
  }

  const handleClick = () => {
    if (customAction) {
      customAction();
    } else {
      quantumGoBack();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`
        inline-flex items-center px-4 py-2 rounded-xl
        transition-all duration-300 transform hover:scale-105
        backdrop-blur-sm font-medium
        ${variants[variant]}
        ${className}
      `}
    >
      <ChevronLeft className="w-5 h-5 mr-2" />
      {showLabel && <span>Voltar</span>}
    </button>
  );
};

// 🍞 BREADCRUMB QUÂNTICO MELHORADO
export const OrientalBreadcrumbAdvanced = ({ 
  customBreadcrumbs = null,
  className = '',
  level = 'student' 
}) => {
  const { generateBreadcrumb } = useOrientalNavigation();
  const location = useLocation();
  const navigate = useNavigate();

  // 🎨 Estilos por nível
  const levelStyles = {
    student: 'from-blue-500/10 to-purple-500/10 border-blue-200',
    teacher: 'from-green-500/10 to-teal-500/10 border-green-200', 
    admin: 'from-red-500/10 to-pink-500/10 border-red-200'
  };

  const breadcrumbs = customBreadcrumbs || generateBreadcrumb(location.pathname);

  return (
    <nav 
      className={`
        flex items-center space-x-2 p-4 rounded-xl
        bg-gradient-to-r ${levelStyles[level]}
        border backdrop-blur-sm
        ${className}
      `}
      aria-label="Breadcrumb"
    >
      {breadcrumbs.map((crumb, index) => (
        <React.Fragment key={crumb.path}>
          {index > 0 && (
            <ChevronLeft className="w-4 h-4 text-gray-400 rotate-180" />
          )}
          
          <button
            onClick={() => navigate(crumb.path)}
            className={`
              flex items-center px-3 py-1 rounded-lg
              transition-all duration-200 hover:scale-105
              ${index === breadcrumbs.length - 1 
                ? 'bg-white/50 text-gray-800 font-semibold cursor-default' 
                : 'text-gray-600 hover:bg-white/30 hover:text-gray-800'
              }
            `}
            disabled={index === breadcrumbs.length - 1}
          >
            {crumb.icon && <crumb.icon className="w-4 h-4 mr-1" />}
            <span className="text-sm">{crumb.name}</span>
          </button>
        </React.Fragment>
      ))}
    </nav>
  );
};

// 🧭 NAVEGADOR CONTEXTUAL QUÂNTICO
export const OrientalContextualNavigation = ({ 
  currentSection,
  relatedSections = [],
  quickActions = [],
  level = 'student'
}) => {
  const navigate = useNavigate();

  // 🎨 Estilos por nível
  const levelStyles = {
    student: 'from-blue-50 to-purple-50 border-blue-200',
    teacher: 'from-green-50 to-teal-50 border-green-200',
    admin: 'from-red-50 to-pink-50 border-red-200'
  };

  return (
    <div className={`
      p-6 rounded-xl border-2
      bg-gradient-to-br ${levelStyles[level]}
      shadow-lg backdrop-blur-sm
    `}>
      {/* 📍 Seção Atual */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          📍 Você está em: <span className="text-pink-600">{currentSection}</span>
        </h3>
      </div>

      {/* 🔗 Seções Relacionadas */}
      {relatedSections.length > 0 && (
        <div className="mb-6">
          <h4 className="text-md font-medium text-gray-700 mb-3">🔗 Seções Relacionadas:</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {relatedSections.map((section, index) => (
              <button
                key={index}
                onClick={() => navigate(section.path)}
                className="
                  p-3 rounded-lg bg-white/60 hover:bg-white/80
                  border border-white/50 hover:border-pink-200
                  transition-all duration-200 hover:scale-105
                  text-left group
                "
              >
                <div className="flex items-center">
                  {section.icon && <section.icon className="w-5 h-5 mr-2 text-pink-500" />}
                  <span className="text-sm font-medium text-gray-700 group-hover:text-pink-600">
                    {section.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ⚡ Ações Rápidas */}
      {quickActions.length > 0 && (
        <div>
          <h4 className="text-md font-medium text-gray-700 mb-3">⚡ Ações Rápidas:</h4>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => navigate(action.path)}
                className="
                  px-4 py-2 rounded-lg
                  bg-gradient-to-r from-pink-500 to-red-500
                  text-white font-medium
                  hover:from-pink-600 hover:to-red-600
                  transition-all duration-200 hover:scale-105
                  shadow-md hover:shadow-lg
                "
              >
                {action.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};