import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { NavigationBar } from '@/shared/components/navigation/NavigationBar';
import { getPageTheme, ROUTE_THEMES } from '@/shared/constants/themeColors';

/**
 * Layout avançado para páginas de alunos
 * Baseado no design sofisticado da página MeuInstrumento
 */
export const AdvancedAlunoLayout = ({ 
  children, 
  title, 
  subtitle, 
  icon: Icon,
  heroContent,
  statsCards = [],
  tabs = [],
  activeTab = 'overview',
  onTabChange,
  onRefresh,
  loading = false,
  className = "",
  customTheme = null
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Determinar tema da página atual
  const themeName = customTheme || ROUTE_THEMES[location.pathname] || 'default';
  const theme = getPageTheme(themeName);

  return (
    <>
      {/* Estilos para animações */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.6s ease-out; }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      <div className={`min-h-screen bg-gradient-to-br ${theme.background} ${className}`}>
        <NavigationBar />
        
        {/* Header avançado */}
        <div className={`bg-gradient-to-r ${theme.gradient} text-white`}>
          <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="flex items-center gap-4 mb-6 animate-fade-in">
              <button
                onClick={() => navigate('/alunos/centro-estudos')}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-xl transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold">{title}</h1>
                {subtitle && (
                  <p className={`text-${theme.primary}-100`}>{subtitle}</p>
                )}
              </div>
              <div className="ml-auto flex items-center gap-3">
                {onRefresh && (
                  <button 
                    onClick={onRefresh} 
                    disabled={loading} 
                    className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl transition-all flex items-center gap-2 disabled:opacity-50"
                  >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    <span className="hidden sm:inline">Atualizar</span>
                  </button>
                )}
              </div>
            </div>

            {/* Hero section */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="flex flex-col md:flex-row items-start gap-6">
                {Icon && (
                  <div className="w-32 h-32 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0 hover:scale-105 transition-transform duration-300">
                    <Icon className="w-16 h-16 text-white" />
                  </div>
                )}
                
                <div className="flex-1">
                  {heroContent}
                  
                  {/* Stats Cards */}
                  {statsCards.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      {statsCards.map((stat, index) => (
                        <StatCard 
                          key={stat.label}
                          icon={stat.icon} 
                          value={stat.value} 
                          label={stat.label} 
                          color={stat.color || theme.primary} 
                          delay={index * 200} 
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="max-w-6xl mx-auto px-6 py-6">
          {/* Navegação por abas (se fornecida) */}
          {tabs.length > 0 && (
            <div className="mb-8 sticky top-4 z-10 animate-fade-in" style={{ animationDelay: '400ms' }}>
              <div className="flex flex-nowrap overflow-x-auto gap-2 bg-white/95 backdrop-blur-md rounded-2xl p-2 shadow-xl border border-gray-100">
                {tabs.map((tab, index) => (
                  <TabButton 
                    key={tab.id}
                    id={tab.id}
                    label={tab.label}
                    icon={tab.icon}
                    count={tab.count}
                    isActive={activeTab === tab.id}
                    onClick={() => onTabChange && onTabChange(tab.id)}
                    theme={theme}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Conteúdo das páginas */}
          <div className="mt-8">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

// Componente StatCard otimizado
const StatCard = ({ icon: Icon, value, label, color, delay = 0 }) => {
  const [count, setCount] = useState(0);
  
  React.useEffect(() => {
    const timer = setTimeout(() => {
      const counter = setInterval(() => {
        setCount(prev => {
          if (prev >= value) {
            clearInterval(counter);
            return value;
          }
          return prev + Math.ceil(value / 20);
        });
      }, 50);
      return () => clearInterval(counter);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <div className={`bg-white/90 backdrop-blur-sm rounded-xl p-4 border-l-4 border-${color}-500 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-lg group`}>
      <Icon className={`w-8 h-8 text-${color}-500 mx-auto mb-2 group-hover:scale-110 transition-transform`} />
      <div className={`text-2xl font-bold text-gray-900 mb-1`}>{count}</div>
      <div className="text-xs text-gray-600 uppercase tracking-wide">{label}</div>
    </div>
  );
};

// Componente TabButton
const TabButton = ({ id, label, icon: Icon, count, isActive, onClick, theme }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium text-sm transition-all whitespace-nowrap ${
      isActive
        ? `bg-gradient-to-r ${theme.gradient} text-white shadow-lg`
        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
    }`}
  >
    <Icon className="w-4 h-4" />
    <span>{label}</span>
    {count !== undefined && (
      <span className={`text-xs px-2 py-1 rounded-full ${
        isActive 
          ? 'bg-white/20 text-white' 
          : 'bg-gray-200 text-gray-600'
      }`}>
        {count}
      </span>
    )}
  </button>
);

export default AdvancedAlunoLayout;