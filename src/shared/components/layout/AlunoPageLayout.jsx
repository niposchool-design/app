import React from 'react';
import { useLocation } from 'react-router-dom';
import { NavigationBar } from '@/shared/components/navigation/NavigationBar';
import { getPageTheme, ROUTE_THEMES } from '@/shared/constants/themeColors';

/**
 * Layout padrão para páginas de alunos
 * Fornece estrutura consistente com navegação e tema Nipo School
 */
export const AlunoPageLayout = ({ 
  children, 
  title, 
  subtitle, 
  icon: Icon,
  headerContent,
  className = "",
  customTheme = null // Para forçar um tema específico
}) => {
  const location = useLocation();
  
  // Determinar tema da página atual
  const themeName = customTheme || ROUTE_THEMES[location.pathname] || 'default';
  const theme = getPageTheme(themeName);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background} p-6 ${className}`}>
      <NavigationBar />
      
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho padrão */}
        {(title || subtitle || Icon || headerContent) && (
          <div className="text-center mb-8">
            {(title || Icon) && (
              <div className="inline-flex items-center gap-3 mb-4">
                {Icon && (
                  <div className={`p-3 bg-gradient-to-r ${theme.gradient} rounded-full`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                )}
                {title && (
                  <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
                )}
              </div>
            )}
            
            {subtitle && (
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
            
            {/* Conteúdo adicional do cabeçalho */}
            {headerContent}
          </div>
        )}

        {/* Conteúdo da página */}
        {children}
      </div>
    </div>
  );
};