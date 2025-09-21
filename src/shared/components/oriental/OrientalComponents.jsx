import React from 'react';
import { TrendingUp, Users, BookOpen, Award, Activity, BarChart3 } from 'lucide-react';

// =============================================================================
// SISTEMA DE DESIGN ORIENTAL UNIFICADO - NIPO SCHOOL
// =============================================================================
// Componentes base que unificam Admin, Professor e Aluno
// Hierarquia: Aluno (leve) → Professor (funcional) → Admin (completo)
// =============================================================================

// Paleta de cores oriental unificada
export const OrientalColors = {
  primary: 'from-orange-50 via-red-50 to-pink-50',
  gradients: {
    light: 'from-orange-100 to-red-100', // Aluno
    medium: 'from-orange-200 to-red-200', // Professor  
    strong: 'from-orange-300 to-red-300', // Admin
  },
  accents: {
    orange: 'from-orange-500 to-red-500',
    red: 'from-red-500 to-pink-500',
    pink: 'from-pink-500 to-orange-500',
  },
  borders: {
    light: 'border-orange-100',
    medium: 'border-orange-200', 
    strong: 'border-orange-300',
  }
};

// Container base oriental - adaptável por nível de usuário
export const OrientalContainer = ({ children, level = 'student', className = '' }) => {
  const backgrounds = {
    student: `bg-gradient-to-br ${OrientalColors.primary}`, // Mais suave
    teacher: `bg-gradient-to-br ${OrientalColors.primary}`, // Mantém elegância
    admin: `bg-gradient-to-br ${OrientalColors.primary}`,   // Consistente
  };

  return (
    <div className={`min-h-screen ${backgrounds[level]} ${className}`}>
      {children}
      {/* Elementos flutuantes orientais por nível */}
      <OrientalFloatingElements level={level} />
    </div>
  );
};

// Elementos flutuantes orientais - variam por usuário
const OrientalFloatingElements = ({ level }) => {
  const elements = {
    student: [
      { icon: '🌸', position: 'top-1/4 left-4', delay: '0s' },
      { icon: '⭐', position: 'top-1/3 right-8', delay: '1s' },
      { icon: '🎓', position: 'bottom-1/3 left-8', delay: '2s' }
    ],
    teacher: [
      { icon: '🌸', position: 'top-1/4 left-4', delay: '0s' },
      { icon: '先', position: 'top-1/3 right-8', delay: '1s' },
      { icon: '🎓', position: 'bottom-1/3 left-8', delay: '2s' }
    ],
    admin: [
      { icon: '🌸', position: 'top-1/4 left-4', delay: '0s' },
      { icon: '師', position: 'top-1/3 right-8', delay: '1s' },
      { icon: '⚡', position: 'bottom-1/3 left-8', delay: '2s' }
    ]
  };

  return (
    <>
      {elements[level]?.map((element, index) => (
        <div
          key={index}
          className={`fixed ${element.position} text-orange-200 text-xl animate-bounce opacity-30 pointer-events-none`}
          style={{ animationDelay: element.delay }}
        >
          {element.icon}
        </div>
      ))}
    </>
  );
};

// Navegação oriental unificada - adapta densidade por usuário
export const OrientalNavigation = ({ user, level = 'student', title, subtitle }) => {
  const icons = {
    student: '学', // Gaku (aprender)
    teacher: '先', // Sen (professor/mestre)
    admin: '師',   // Shi (mestre/especialista)
  };

  const subtitles = {
    student: 'Área do Estudante',
    teacher: 'Área do Professor', 
    admin: 'Painel Administrativo',
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-sm border-b border-orange-100 sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 sm:px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-md">
            <span className="text-white text-sm sm:text-lg font-bold">{icons[level]}</span>
          </div>
          <div>
            <span className="font-bold text-gray-800 text-base sm:text-lg">Nipo School</span>
            <p className="text-xs text-orange-500 font-medium hidden sm:block">
              {subtitle || subtitles[level]}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="flex items-center space-x-2 bg-gradient-to-r from-orange-50 to-red-50 px-3 py-2 rounded-full border border-orange-200">
            <span className="text-orange-500 font-bold">{icons[level]}</span>
            <span className="text-orange-600 font-bold text-sm">
              {user?.email?.split('@')[0] || 'Usuário'}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Card de estatística oriental - densidade varia por usuário
export const OrientalStatCard = ({ 
  title, 
  value, 
  icon: Icon = Activity, 
  level = 'student',
  subtitle,
  trend,
  className = '' 
}) => {
  const sizes = {
    student: 'p-6',     // Maior, mais espaço
    teacher: 'p-4',     // Médio, equilibrado
    admin: 'p-3',       // Menor, mais denso
  };

  const textSizes = {
    student: 'text-3xl', // Números grandes
    teacher: 'text-2xl', // Médios
    admin: 'text-xl',    // Menores
  };

  return (
    <div className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300 ${sizes[level]} ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <Icon className="w-6 h-6 text-orange-500" />
        {trend && level !== 'student' && (
          <TrendingUp className="w-4 h-4 text-green-500" />
        )}
      </div>
      
      <p className={`${textSizes[level]} font-bold text-gray-900 mb-1`}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </p>
      
      <p className="text-sm text-gray-600 font-medium">{title}</p>
      
      {subtitle && level !== 'student' && (
        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
      )}
    </div>
  );
};

// Botão de ação oriental - estilos por usuário
export const OrientalActionButton = ({ 
  children, 
  onClick, 
  level = 'student', 
  variant = 'primary',
  size = 'medium',
  className = '',
  ...props 
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600',
    secondary: 'bg-white/90 border border-orange-200 text-orange-600 hover:bg-orange-50',
    ghost: 'text-orange-600 hover:bg-orange-50',
  };

  const sizes = {
    small: 'px-3 py-2 text-sm',
    medium: 'px-4 py-2',
    large: 'px-6 py-3 text-lg',
  };

  const levelAdjustments = {
    student: 'rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1', // Mais lúdico
    teacher: 'rounded-xl shadow-md hover:shadow-lg', // Elegante
    admin: 'rounded-lg shadow-sm hover:shadow-md',   // Profissional
  };

  return (
    <button
      onClick={onClick}
      className={`
        ${variants[variant]} 
        ${sizes[size]} 
        ${levelAdjustments[level]}
        transition-all duration-200 font-medium
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

// Header de boas-vindas oriental - personalizado por usuário
export const OrientalWelcomeHeader = ({ user, greeting, level = 'student' }) => {
  const messages = {
    student: {
      title: 'Vamos Aprender Juntos!',
      subtitle: 'Sua jornada musical continua',
      emoji: '🎓',
    },
    teacher: {
      title: 'Inspire e Eduque',
      subtitle: 'Área dos Professores',
      emoji: '先',
    },
    admin: {
      title: 'Painel de Controle',
      subtitle: 'Gestão Completa da Escola',
      emoji: '師',
    }
  };

  const msg = messages[level];

  return (
    <header className="text-center mb-8">
      <h1 className="text-2xl sm:text-4xl font-light text-gray-800 mb-3">
        {greeting}, {user?.full_name?.split(' ')[0] || user?.email?.split('@')[0]}! 
        <span className="inline-block animate-bounce ml-2">{msg.emoji}</span>
      </h1>
      <p className="text-lg sm:text-xl text-gray-600 mb-2">
        {msg.title}
      </p>
      <p className="text-sm text-orange-500 font-medium">
        🌸 "{msg.subtitle}"
      </p>
    </header>
  );
};

// Grid responsivo oriental - densidade por usuário
export const OrientalGrid = ({ children, level = 'student', className = '' }) => {
  const densities = {
    student: 'grid-cols-1 sm:grid-cols-2 gap-6',           // Espaçoso
    teacher: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4', // Equilibrado
    admin: 'grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3',   // Denso
  };

  return (
    <div className={`grid ${densities[level]} ${className}`}>
      {children}
    </div>
  );
};

export default {
  OrientalContainer,
  OrientalNavigation,
  OrientalStatCard,
  OrientalActionButton,
  OrientalWelcomeHeader,
  OrientalGrid,
  OrientalColors,
};