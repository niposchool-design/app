import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, Home, ChevronRight, BookOpen, Play, MessageCircle, 
  Music, Users, Search, Menu, X
} from 'lucide-react';
import { useState } from 'react';

/**
 * Componente de Breadcrumbs inteligente para navegação hierárquica
 * Resolve o problema de páginas órfãs fornecendo sempre um caminho de volta
 */
export const Breadcrumbs = ({ 
  customPaths = {}, 
  showHomeLink = true, 
  className = "" 
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Mapear caminhos para nomes amigáveis e ícones
  const pathMapping = {
    'dashboard': { name: 'Dashboard', icon: Home, color: 'text-blue-600' },
    'alunos': { name: 'Área do Aluno', icon: Users, color: 'text-green-600' },
    'centro-estudos': { name: 'Centro de Estudos', icon: BookOpen, color: 'text-purple-600' },
    'biblioteca-videos': { name: 'Biblioteca de Vídeos', icon: Play, color: 'text-red-600' },
    'biblioteca-repertorio': { name: 'Repertório Musical', icon: Music, color: 'text-blue-600' },
    'metodologias-ensino': { name: 'Metodologias de Ensino', icon: BookOpen, color: 'text-orange-600' },
    'duvidas': { name: 'Sistema de Dúvidas', icon: MessageCircle, color: 'text-yellow-600' },
    'biblioteca-instrumentos': { name: 'Biblioteca de Instrumentos', icon: Music, color: 'text-indigo-600' },
    'meu-instrumento': { name: 'Meu Instrumento', icon: Music, color: 'text-pink-600' },
    'progresso': { name: 'Meu Progresso', icon: Users, color: 'text-green-600' },
    'professores': { name: 'Área do Professor', icon: Users, color: 'text-blue-700' },
    'admin': { name: 'Administração', icon: Users, color: 'text-red-700' },
    ...customPaths
  };

  // Dividir pathname em segmentos
  const pathSegments = location.pathname.split('/').filter(segment => segment);
  
  // Construir breadcrumbs
  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = '/' + pathSegments.slice(0, index + 1).join('/');
    const pathInfo = pathMapping[segment] || { name: segment, icon: ChevronRight, color: 'text-gray-600' };
    
    return {
      name: pathInfo.name,
      path,
      icon: pathInfo.icon,
      color: pathInfo.color,
      isLast: index === pathSegments.length - 1
    };
  });

  // Função para voltar
  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      // Fallback inteligente baseado no caminho atual
      if (location.pathname.includes('/alunos/')) {
        navigate('/alunos/centro-estudos');
      } else if (location.pathname.includes('/professores/')) {
        navigate('/dashboard/professor');
      } else if (location.pathname.includes('/admin/')) {
        navigate('/dashboard/admin');
      } else {
        navigate('/dashboard');
      }
    }
  };

  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`}>
      {/* Botão Voltar */}
      <button
        onClick={handleGoBack}
        className="flex items-center gap-1 px-3 py-1.5 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
        title="Voltar"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="hidden sm:inline">Voltar</span>
      </button>

      <div className="h-4 w-px bg-gray-300"></div>

      {/* Home Link */}
      {showHomeLink && (
        <>
          <Link
            to="/dashboard"
            className="flex items-center gap-1 px-2 py-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors"
            title="Ir para Dashboard"
          >
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Início</span>
          </Link>
          {breadcrumbs.length > 0 && <ChevronRight className="h-4 w-4 text-gray-400" />}
        </>
      )}

      {/* Breadcrumb Items */}
      {breadcrumbs.map((crumb, index) => {
        const Icon = crumb.icon;
        
        return (
          <React.Fragment key={crumb.path}>
            {crumb.isLast ? (
              <span className={`flex items-center gap-1 px-2 py-1 font-medium ${crumb.color}`}>
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{crumb.name}</span>
              </span>
            ) : (
              <Link
                to={crumb.path}
                className={`flex items-center gap-1 px-2 py-1 hover:bg-gray-100 rounded transition-colors ${crumb.color}`}
                title={`Ir para ${crumb.name}`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{crumb.name}</span>
              </Link>
            )}
            
            {!crumb.isLast && <ChevronRight className="h-4 w-4 text-gray-400" />}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

/**
 * Menu de navegação rápida para áreas principais
 */
export const QuickNavMenu = ({ currentArea = 'alunos' }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const navigationAreas = {
    alunos: {
      title: 'Área do Aluno',
      basePath: '/alunos',
      color: 'from-green-500 to-green-600',
      items: [
        { name: 'Centro de Estudos', path: '/alunos/centro-estudos', icon: BookOpen },
        { name: 'Meu Instrumento', path: '/alunos/meu-instrumento', icon: Music },
        { name: 'Biblioteca de Vídeos', path: '/alunos/biblioteca-videos', icon: Play },
        { name: 'Repertório Musical', path: '/alunos/biblioteca-repertorio', icon: Music },
        { name: 'Sistema de Dúvidas', path: '/alunos/duvidas', icon: MessageCircle },
        { name: 'Metodologias', path: '/alunos/metodologias-ensino', icon: BookOpen }
      ]
    },
    professores: {
      title: 'Área do Professor',
      basePath: '/dashboard/professor',
      color: 'from-blue-500 to-blue-600',
      items: [
        { name: 'Dashboard', path: '/dashboard/professor', icon: Home },
        { name: 'Minha Área', path: '/professores/minha-area', icon: Users },
        { name: 'Conteúdos', path: '/professores/conteudos', icon: BookOpen },
        { name: 'Estatísticas', path: '/professores/estatisticas', icon: Users }
      ]
    },
    admin: {
      title: 'Administração',
      basePath: '/dashboard/admin',
      color: 'from-red-500 to-red-600',
      items: [
        { name: 'Dashboard', path: '/dashboard/admin', icon: Home },
        { name: 'Instrumentos', path: '/admin/instrumentos', icon: Music },
        { name: 'Professores', path: '/admin/professores', icon: Users },
        { name: 'Devocionais', path: '/admin/devocionais', icon: BookOpen },
        { name: 'Relatórios', path: '/admin/relatorios', icon: BookOpen }
      ]
    }
  };

  const currentAreaData = navigationAreas[currentArea];

  if (!currentAreaData) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${currentAreaData.color} text-white rounded-lg hover:shadow-lg transition-all`}
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        <span className="font-medium">{currentAreaData.title}</span>
      </button>

      {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 z-40 bg-black/10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800">Navegação Rápida</h3>
            </div>
            
            <div className="py-2">
              {currentAreaData.items.map((item) => {
                const Icon = item.icon;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                  >
                    <Icon className="h-4 w-4 text-gray-500" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
            
            {/* Link para outras áreas */}
            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <div className="text-xs text-gray-600 mb-2">Outras áreas:</div>
              <div className="flex gap-2">
                {Object.entries(navigationAreas).map(([key, area]) => {
                  if (key === currentArea) return null;
                  
                  return (
                    <Link
                      key={key}
                      to={area.basePath}
                      onClick={() => setIsOpen(false)}
                      className="text-xs px-2 py-1 bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                    >
                      {area.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

/**
 * Componente de navegação completo que combina breadcrumbs e menu rápido
 */
export const NavigationBar = ({ 
  currentArea = 'alunos', 
  showBreadcrumbs = true, 
  showQuickNav = true,
  className = ""
}) => {
  return (
    <div className={`flex items-center justify-between p-4 bg-white border-b border-gray-200 ${className}`}>
      {showBreadcrumbs && (
        <Breadcrumbs className="flex-1" />
      )}
      
      {showQuickNav && (
        <div className="ml-4">
          <QuickNavMenu currentArea={currentArea} />
        </div>
      )}
    </div>
  );
};

export default NavigationBar;