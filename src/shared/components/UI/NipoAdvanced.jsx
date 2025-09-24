import React from 'react';

// Componente de Greeting padronizado
export const NipoGreeting = ({ userName, greeting = 'こんにちは', className = '' }) => (
  <div className={`text-center mb-8 ${className}`}>
    <div className="mb-4">
      <span className="text-4xl sm:text-6xl block mb-2">🎵</span>
      <h1 className="text-2xl sm:text-3xl text-gray-800 font-light mb-2">
        {greeting}
      </h1>
      {userName && (
        <p className="text-lg sm:text-xl text-gray-600">
          <span className="font-semibold text-red-600">{userName}</span>
        </p>
      )}
    </div>
  </div>
);

// Componente de Action Button com emoji
export const NipoActionCard = ({ 
  icon: IconComponent, 
  emoji,
  title, 
  subtitle, 
  onClick, 
  disabled = false,
  className = '' 
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-red-100
      transition-all duration-300 hover:shadow-xl hover:-translate-y-1
      focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
      w-full text-left
      ${className}
    `}
  >
    <div className="flex items-center space-x-4">
      <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-md">
        {emoji ? (
          <span className="text-xl">{emoji}</span>
        ) : IconComponent ? (
          <IconComponent className="w-6 h-6 text-white" />
        ) : (
          <span className="text-white text-lg">🎵</span>
        )}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 text-base sm:text-lg mb-1">
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm text-gray-600">
            {subtitle}
          </p>
        )}
      </div>
      <div className="text-red-400">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  </button>
);

// Componente de Progress Ring
export const NipoProgressRing = ({ 
  progress = 0, 
  size = 60, 
  strokeWidth = 4, 
  color = '#ef4444',
  className = '' 
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={`relative ${className}`}>
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-in-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-semibold text-gray-900">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
};

// Componente de Achievement Badge
export const NipoAchievementBadge = ({ 
  emoji, 
  title, 
  description, 
  unlocked = false,
  className = '' 
}) => (
  <div className={`
    bg-white/90 backdrop-blur-sm rounded-xl p-4 border text-center
    transition-all duration-200
    ${unlocked 
      ? 'border-yellow-200 shadow-md' 
      : 'border-gray-200 opacity-60'
    }
    ${className}
  `}>
    <div className={`text-2xl mb-2 ${unlocked ? '' : 'grayscale'}`}>
      {emoji || '🏆'}
    </div>
    <h4 className="font-semibold text-sm text-gray-900 mb-1">
      {title}
    </h4>
    <p className="text-xs text-gray-600">
      {description}
    </p>
  </div>
);

// Componente de Quick Action
export const NipoQuickAction = ({ 
  icon: IconComponent, 
  emoji,
  label, 
  count,
  color = 'red',
  onClick,
  className = '' 
}) => (
  <button
    onClick={onClick}
    className={`
      bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-gray-200
      transition-all duration-200 hover:shadow-md hover:-translate-y-1
      focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
      w-full
      ${className}
    `}
  >
    <div className="text-center">
      {emoji ? (
        <div className="text-2xl mb-2">{emoji}</div>
      ) : IconComponent ? (
        <IconComponent className={`
          w-8 h-8 mx-auto mb-2
          ${color === 'red' ? 'text-red-500' : 
            color === 'blue' ? 'text-blue-500' : 
            color === 'green' ? 'text-green-500' : 
            'text-gray-500'}
        `} />
      ) : null}
      
      {count !== undefined && (
        <div className="text-xl font-bold text-gray-900 mb-1">
          {count}
        </div>
      )}
      
      <div className="text-sm text-gray-600">
        {label}
      </div>
    </div>
  </button>
);

// Componente de Status Indicator
export const NipoStatusIndicator = ({ 
  status = 'success', 
  text,
  icon: IconComponent,
  className = '' 
}) => {
  const statusStyles = {
    success: 'bg-green-50 text-green-700 border-green-200',
    warning: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    error: 'bg-red-50 text-red-700 border-red-200',
    info: 'bg-blue-50 text-blue-700 border-blue-200'
  };

  return (
    <div className={`
      inline-flex items-center space-x-2 px-3 py-2 rounded-full border text-sm font-medium
      ${statusStyles[status]}
      ${className}
    `}>
      {IconComponent && <IconComponent className="w-4 h-4" />}
      <span>{text}</span>
    </div>
  );
};