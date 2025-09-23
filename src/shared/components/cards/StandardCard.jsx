import React from 'react';
import { Play, ExternalLink, Download, Heart, Share, Clock, BookOpen, Music } from 'lucide-react';

/**
 * Card padronizado baseado no design do MeuInstrumento
 * Com backdrop-blur, animações e hover effects
 */
export const StandardCard = ({ 
  title, 
  description, 
  type = "default",
  thumbnail = null,
  badge = null,
  author = null,
  date = null,
  duration = null,
  difficulty = null,
  actions = [],
  onClick,
  className = "",
  loading = false,
  ...props 
}) => {
  const cardTypes = {
    video: { icon: Play, bgGradient: 'from-red-500 to-pink-500' },
    audio: { icon: Music, bgGradient: 'from-green-500 to-teal-500' },
    lesson: { icon: BookOpen, bgGradient: 'from-blue-500 to-indigo-500' },
    resource: { icon: Download, bgGradient: 'from-purple-500 to-violet-500' },
    default: { icon: ExternalLink, bgGradient: 'from-gray-500 to-slate-500' }
  };

  const TypeIcon = cardTypes[type]?.icon || cardTypes.default.icon;
  const gradientClass = cardTypes[type]?.bgGradient || cardTypes.default.bgGradient;

  if (loading) {
    return <LoadingCard />;
  }

  return (
    <div 
      className={`group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 overflow-hidden cursor-pointer ${className}`}
      onClick={onClick}
      {...props}
    >
      {/* Thumbnail ou ícone */}
      <div className="relative h-48 overflow-hidden">
        {thumbnail ? (
          <img 
            src={thumbnail} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${gradientClass} flex items-center justify-center`}>
            <TypeIcon className="w-16 h-16 text-white opacity-80" />
          </div>
        )}
        
        {/* Overlay com ações rápidas */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex items-center gap-2">
            {actions.slice(0, 3).map((action, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  action.onClick();
                }}
                className="p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transform hover:scale-110 transition-all"
                title={action.label}
              >
                <action.icon className="w-4 h-4 text-gray-700" />
              </button>
            ))}
          </div>
        </div>

        {/* Badge */}
        {badge && (
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full shadow-md">
              {badge}
            </span>
          </div>
        )}
      </div>

      {/* Conteúdo */}
      <div className="p-6">
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        
        {description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {description}
          </p>
        )}

        {/* Metadados */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-4">
          {author && (
            <div className="flex items-center gap-1">
              <span>👤</span>
              <span>{author}</span>
            </div>
          )}
          
          {duration && (
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{duration}</span>
            </div>
          )}
          
          {difficulty && (
            <div className="flex items-center gap-1">
              <span>📊</span>
              <span>{difficulty}</span>
            </div>
          )}
          
          {date && (
            <div className="flex items-center gap-1">
              <span>📅</span>
              <span>{date}</span>
            </div>
          )}
        </div>

        {/* Ações principais */}
        {actions.length > 0 && (
          <div className="flex items-center justify-between border-t border-gray-100 pt-4">
            <div className="flex items-center gap-2">
              {actions.slice(3).map((action, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    action.onClick();
                  }}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  title={action.label}
                >
                  <action.icon className="w-4 h-4" />
                </button>
              ))}
            </div>
            
            <TypeIcon className="w-5 h-5 text-gray-400" />
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Card de loading padronizado
 */
const LoadingCard = () => (
  <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 overflow-hidden animate-pulse">
    <div className="h-48 bg-gray-200"></div>
    <div className="p-6">
      <div className="h-6 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded mb-4"></div>
      <div className="flex gap-4 mb-4">
        <div className="h-3 bg-gray-200 rounded w-20"></div>
        <div className="h-3 bg-gray-200 rounded w-16"></div>
      </div>
      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <div className="flex gap-2">
          <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
          <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
        </div>
        <div className="w-5 h-5 bg-gray-200 rounded"></div>
      </div>
    </div>
  </div>
);

/**
 * Grid responsivo de cards
 */
export const CardGrid = ({ children, columns = "auto-fit", minWidth = "320px", gap = "6", className = "" }) => (
  <div 
    className={`grid gap-${gap} ${className}`}
    style={{
      gridTemplateColumns: columns === "auto-fit" 
        ? `repeat(auto-fit, minmax(${minWidth}, 1fr))` 
        : `repeat(${columns}, 1fr)`
    }}
  >
    {children}
  </div>
);

/**
 * Seção de cards com título e filtros
 */
export const CardSection = ({ 
  title, 
  subtitle, 
  children, 
  actions = [],
  loading = false,
  emptyState = null,
  className = ""
}) => (
  <div className={`mb-8 ${className}`}>
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        {subtitle && (
          <p className="text-gray-600 mt-1">{subtitle}</p>
        )}
      </div>
      
      {actions.length > 0 && (
        <div className="flex items-center gap-2">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className="px-4 py-2 bg-white/90 hover:bg-white text-gray-700 rounded-xl shadow-sm border border-gray-200 transition-all hover:shadow-md"
            >
              {action.icon && <action.icon className="w-4 h-4 mr-2 inline" />}
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
    
    {loading ? (
      <CardGrid>
        {Array.from({ length: 6 }).map((_, i) => (
          <LoadingCard key={i} />
        ))}
      </CardGrid>
    ) : children ? (
      children
    ) : emptyState ? (
      emptyState
    ) : (
      <div className="text-center py-12 text-gray-500">
        <p>Nenhum item encontrado.</p>
      </div>
    )}
  </div>
);

export default StandardCard;