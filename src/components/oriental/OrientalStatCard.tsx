// 🎌 OrientalStatCard - Cards de estatística com tamanhos por nível
import React from 'react';
import { DESIGN_UTILS, ROLE_CONFIG, type UserRole } from '../../lib/constants/design';
import { LucideIcon } from 'lucide-react';

interface OrientalStatCardProps {
  level: UserRole;
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    label?: string;
  };
  className?: string;
  onClick?: () => void;
}

export const OrientalStatCard: React.FC<OrientalStatCardProps> = ({
  level,
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  className = '',
  onClick
}) => {
  const config = ROLE_CONFIG[level];
  const cardPadding = DESIGN_UTILS.cardSizes[level];
  
  // Tamanhos diferentes por nível
  const sizes = {
    student: {
      iconSize: 'w-12 h-12',
      titleSize: 'text-sm',
      valueSize: 'text-3xl',
      subtitleSize: 'text-xs',
    },
    professor: {
      iconSize: 'w-8 h-8',
      titleSize: 'text-xs',
      valueSize: 'text-2xl',
      subtitleSize: 'text-xs',
    },
    admin: {
      iconSize: 'w-6 h-6',
      titleSize: 'text-xs',
      valueSize: 'text-xl',
      subtitleSize: 'text-xs',
    }
  };
  
  const size = sizes[level];
  
  return (
    <div 
      className={`
        bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl 
        ${cardPadding} shadow-lg hover:shadow-xl transition-all duration-300
        hover:-translate-y-1 cursor-pointer group
        ${className}
      `}
      onClick={onClick}
      style={{
        boxShadow: `0 4px 16px ${config.shadowColor}`
      }}
    >
      {/* Header com Ícone */}
      <div className="flex items-center gap-3 mb-4">
        {Icon && (
          <div 
            className={`${size.iconSize} rounded-lg flex items-center justify-center`}
            style={{ backgroundColor: `${config.color}20` }}
          >
            <Icon 
              className={`w-2/3 h-2/3`}
              style={{ color: config.color }}
            />
          </div>
        )}
        <div className="flex-1">
          <h3 className={`font-medium text-gray-700 ${size.titleSize}`}>
            {title}
          </h3>
          {subtitle && (
            <p className={`text-gray-500 ${size.subtitleSize} mt-1`}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
      
      {/* Valor Principal */}
      <div className="mb-2">
        <p 
          className={`font-bold ${size.valueSize} group-hover:scale-105 transition-transform`}
          style={{ color: config.color }}
        >
          {value}
        </p>
      </div>
      
      {/* Trend Indicator */}
      {trend && (
        <div className="flex items-center gap-2">
          <div 
            className={`
              flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium
              ${trend.value >= 0 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
              }
            `}
          >
            <span className="text-xs">
              {trend.value >= 0 ? '↗' : '↘'}
            </span>
            {Math.abs(trend.value)}%
          </div>
          {trend.label && (
            <span className="text-xs text-gray-500">
              {trend.label}
            </span>
          )}
        </div>
      )}
    </div>
  );
};