import { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { NavigationContext } from './OrientalNavigationContext';

// 🎯 HOOK PARA USAR NAVEGAÇÃO
export const useOrientalNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useOrientalNavigation deve ser usado dentro de OrientalNavigationProvider');
  }
  return context;
};

// 🎯 HOOK PARA CONFIGURAR NAVEGAÇÃO CONTEXTUAL
export const useOrientalContextualNav = (sectionConfig) => {
  const { setCurrentBreadcrumb } = useOrientalNavigation();
  
  useEffect(() => {
    if (sectionConfig.breadcrumbs) {
      setCurrentBreadcrumb(sectionConfig.breadcrumbs);
    }
  }, [sectionConfig, setCurrentBreadcrumb]);
};

// 🎯 HOOK PERSONALIZADO PARA NAVEGAÇÃO INTELIGENTE
export const useSmartNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { quantumGoBack, generateBreadcrumb } = useOrientalNavigation();

  const navigateWithContext = (path, options = {}) => {
    if (options.replace) {
      navigate(path, { replace: true });
    } else {
      navigate(path);
    }
  };

  const navigateToSection = (sectionType, itemId = null) => {
    const sectionMap = {
      dashboard: '/dashboard',
      admin: '/admin',
      professores: '/professores',
      alunos: '/alunos',
      instruments: '/admin/instruments',
      aulas: '/admin/aulas',
      perfil: '/perfil'
    };

    const basePath = sectionMap[sectionType] || '/dashboard';
    const finalPath = itemId ? `${basePath}/${itemId}` : basePath;
    navigateWithContext(finalPath);
  };

  return {
    navigate: navigateWithContext,
    goBack: quantumGoBack,
    navigateToSection,
    currentPath: location.pathname,
    generateBreadcrumb
  };
};