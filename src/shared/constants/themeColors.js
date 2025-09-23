// Sistema de cores padronizado para todas as páginas de alunos
// Baseado nas cores definidas no Centro de Estudos

export const THEME_COLORS = {
  // Cores dos módulos principais
  'biblioteca-instrumentos': {
    primary: 'blue',
    gradient: 'from-blue-500 to-blue-600',
    background: 'from-blue-50 via-white to-blue-50',
    accent: 'bg-blue-100 text-blue-800',
    border: 'border-blue-200',
    light: 'bg-blue-50',
    dark: 'bg-blue-600'
  },
  'biblioteca-repertorio': {
    primary: 'green',
    gradient: 'from-green-500 to-green-600',
    background: 'from-green-50 via-white to-green-50',
    accent: 'bg-green-100 text-green-800',
    border: 'border-green-200',
    light: 'bg-green-50',
    dark: 'bg-green-600'
  },
  'metodologias-ensino': {
    primary: 'purple',
    gradient: 'from-purple-500 to-purple-600',
    background: 'from-purple-50 via-white to-purple-50',
    accent: 'bg-purple-100 text-purple-800',
    border: 'border-purple-200',
    light: 'bg-purple-50',
    dark: 'bg-purple-600'
  },
  'biblioteca-videos': {
    primary: 'red',
    gradient: 'from-red-500 to-red-600',
    background: 'from-red-50 via-white to-red-50',
    accent: 'bg-red-100 text-red-800',
    border: 'border-red-200',
    light: 'bg-red-50',
    dark: 'bg-red-600'
  },
  'sistema-duvidas': {
    primary: 'orange',
    gradient: 'from-orange-500 to-orange-600',
    background: 'from-orange-50 via-white to-orange-50',
    accent: 'bg-orange-100 text-orange-800',
    border: 'border-orange-200',
    light: 'bg-orange-50',
    dark: 'bg-orange-600'
  },
  'meu-instrumento': {
    primary: 'yellow',
    gradient: 'from-yellow-500 to-yellow-600',
    background: 'from-yellow-50 via-white to-yellow-50',
    accent: 'bg-yellow-100 text-yellow-800',
    border: 'border-yellow-200',
    light: 'bg-yellow-50',
    dark: 'bg-yellow-600'
  },
  // Cor padrão para outras páginas
  'default': {
    primary: 'red',
    gradient: 'from-red-500 to-red-600',
    background: 'from-red-50 via-white to-red-50',
    accent: 'bg-red-100 text-red-800',
    border: 'border-red-200',
    light: 'bg-red-50',
    dark: 'bg-red-600'
  }
};

// Função para obter cores de uma página
export const getPageTheme = (pageName) => {
  return THEME_COLORS[pageName] || THEME_COLORS.default;
};

// Mapa de rotas para temas
export const ROUTE_THEMES = {
  '/alunos/biblioteca/instrumentos': 'biblioteca-instrumentos',
  '/alunos/biblioteca-instrumentos': 'biblioteca-instrumentos',
  '/alunos/biblioteca/repertorio': 'biblioteca-repertorio',
  '/alunos/biblioteca-repertorio': 'biblioteca-repertorio',
  '/alunos/metodologias': 'metodologias-ensino',
  '/alunos/metodologias-ensino': 'metodologias-ensino',
  '/alunos/biblioteca/videos': 'biblioteca-videos',
  '/alunos/biblioteca-videos': 'biblioteca-videos',
  '/alunos/duvidas': 'sistema-duvidas',
  '/alunos/sistema-duvidas': 'sistema-duvidas',
  '/alunos/meu-instrumento': 'meu-instrumento',
  // Centro de estudos mantém o tema padrão vermelho (Nipo School)
  '/alunos/centro-estudos': 'default',
  '/alunos': 'default'
};

// Hook para usar tema da página atual
export const usePageTheme = () => {
  const location = window.location || { pathname: '/alunos' };
  const themeName = ROUTE_THEMES[location.pathname] || 'default';
  return getPageTheme(themeName);
};