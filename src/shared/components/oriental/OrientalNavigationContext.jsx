import React, { createContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, MapPin } from 'lucide-react';

// 🧭 CONTEXTO QUÂNTICO DE NAVEGAÇÃO - MEMÓRIA TOTAL
export const NavigationContext = createContext({});

// 🗺️ PROVIDER DE NAVEGAÇÃO QUÂNTICA
export const OrientalNavigationProvider = ({ children }) => {
  const [navigationHistory, setNavigationHistory] = useState([]);
  const [currentBreadcrumb, setCurrentBreadcrumb] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  // 🧠 MEMÓRIA QUÂNTICA - Salva contexto de navegação
  useEffect(() => {
    const path = location.pathname;
    setNavigationHistory(prev => {
      const newHistory = [...prev, { path, timestamp: Date.now() }];
      // Mantém apenas os últimos 10 caminhos para performance
      return newHistory.slice(-10);
    });
  }, [location]);

  // 🎯 FUNÇÃO QUÂNTICA - Voltar inteligente
  const quantumGoBack = () => {
    const history = [...navigationHistory];
    if (history.length > 1) {
      history.pop(); // Remove atual
      const previousPath = history[history.length - 1]?.path;
      if (previousPath && previousPath !== location.pathname) {
        navigate(previousPath);
        return;
      }
    }
    
    // Fallback hierárquico inteligente
    const currentPath = location.pathname;
    const segments = currentPath.split('/').filter(Boolean);
    
    if (segments.length > 1) {
      segments.pop();
      navigate('/' + segments.join('/'));
    } else {
      navigate('/dashboard');
    }
  };

  // 🍞 GERADOR AUTOMÁTICO DE BREADCRUMBS
  const generateBreadcrumb = (path) => {
    const segments = path.split('/').filter(Boolean);
    const breadcrumbs = [{ name: 'Home', path: '/dashboard', icon: Home }];
    
    let currentPath = '';
    segments.forEach((segment, index) => {
      currentPath += '/' + segment;
      
      // 🎯 Mapeamento inteligente de nomes
      const nameMap = {
        'admin': 'Administração',
        'professores': 'Professores',
        'alunos': 'Alunos',
        'instruments': 'Instrumentos',
        'aulas': 'Aulas',
        'conteudos': 'Conteúdos',
        'relatorios': 'Relatórios',
        'configuracoes': 'Configurações',
        'dashboard': 'Dashboard',
        'kanban': 'Kanban',
        'novo': 'Novo',
        'editar': 'Editar',
        'qr-manager': 'QR Manager',
        'scanner': 'Scanner',
        'perfil': 'Perfil',
        'meu-instrumento': 'Meu Instrumento',
        'vote': 'Votação'
      };
      
      const name = nameMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
      breadcrumbs.push({ 
        name, 
        path: currentPath, 
        icon: index === segments.length - 1 ? MapPin : null 
      });
    });
    
    return breadcrumbs;
  };

  const contextValue = {
    navigationHistory,
    currentBreadcrumb,
    setCurrentBreadcrumb,
    quantumGoBack,
    generateBreadcrumb
  };

  return (
    <NavigationContext.Provider value={contextValue}>
      {children}
    </NavigationContext.Provider>
  );
};