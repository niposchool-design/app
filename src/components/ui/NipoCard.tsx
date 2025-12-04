// 🎌 NIPO CARD - Componente Principal Oriental
// Implementação completa baseada na documentação oficial

import React from 'react';
import { cn } from '@/lib/utils';
import { ROLE_CONFIG, DESIGN_UTILS, PHILOSOPHY, type UserRole } from '@/lib/constants/design';

interface NipoCardProps {
  role: UserRole;
  title: string;
  value?: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  variant?: 'stat' | 'content' | 'action' | 'gamified';
  showPhilosophy?: boolean;
  showJapanese?: boolean;
  className?: string;
  onClick?: () => void;
}

export const NipoCard: React.FC<NipoCardProps> = ({
  role,
  title,
  value,
  subtitle,
  icon,
  children,
  variant = 'content',
  showPhilosophy = false,
  showJapanese = false,
  className,
  onClick,
}) => {
  const config = ROLE_CONFIG[role];
  const utils = DESIGN_UTILS;
  
  // Density-based styling
  const getDensityClasses = () => {
    const density = config.density;
    const sizes = utils.textSizes[role];
    const cardSize = utils.cardSizes[role];
    const iconSize = utils.iconSizes[role];
    
    return {
      cardSize,
      titleSize: sizes.title,
      valueSize: sizes.value,
      subtitleSize: sizes.subtitle,
      iconSize: variant === 'stat' ? iconSize.stat : iconSize.card,
    };
  };

  const { cardSize, titleSize, valueSize, subtitleSize, iconSize } = getDensityClasses();

  // Variant-specific styling
  const getVariantClasses = () => {
    switch (variant) {
      case 'stat':
        return 'border-l-4 border-current';
      case 'action':
        return 'hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1';
      case 'gamified':
        return 'border-2 border-dashed border-current/30 relative overflow-hidden';
      default:
        return '';
    }
  };

  // Role-based background and effects
  const getRoleClasses = () => {
    return cn(
      'bg-white rounded-xl shadow-lg',
      `hover:shadow-${role === 'admin' ? 'purple' : role === 'professor' ? 'blue' : 'green'}-200`,
      'border border-gray-100/50',
      'backdrop-blur-sm',
    );
  };

  return (
    <div
      className={cn(
        getRoleClasses(),
        cardSize,
        getVariantClasses(),
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      style={{
        boxShadow: `0 8px 32px ${config.shadowColor}`,
        color: config.color,
      }}
    >
      {/* Gamified Badge */}
      {variant === 'gamified' && (
        <div className="absolute top-2 right-2 text-xs px-2 py-1 bg-current/10 rounded-full">
          {config.japanese.character}
        </div>
      )}

      {/* Header com Icon e Title */}
      <div className="flex items-start gap-4 mb-4">
        {icon && (
          <div className={cn('flex-shrink-0', iconSize)}>
            {icon}
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <h3 className={cn('font-semibold text-gray-900', titleSize)}>
            {title}
          </h3>
          
          {showJapanese && (
            <p className="text-sm text-gray-500 mt-1">
              {config.japanese.title} • {config.japanese.subtitle}
            </p>
          )}
          
          {subtitle && (
            <p className={cn('text-gray-600 mt-1', subtitleSize)}>
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Value Display */}
      {value && (
        <div className="mb-4">
          <div className={cn('font-bold', valueSize)} style={{ color: config.color }}>
            {value}
          </div>
        </div>
      )}

      {/* Content Area */}
      {children && (
        <div className="space-y-4">
          {children}
        </div>
      )}

      {/* Philosophy Quote (for student role) */}
      {showPhilosophy && role === 'student' && (
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="text-center">
            {PHILOSOPHY.quotes.map((quote, index) => (
              quote.context === 'learning' && (
                <div key={index} className="text-xs text-gray-500 space-y-1">
                  <div className="font-medium">{quote.text}</div>
                  <div className="italic">{quote.translation}</div>
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {/* Accent Border */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-1 rounded-b-xl"
        style={{ backgroundColor: config.color }}
      />
    </div>
  );
};

// Componentes específicos por variante

export const NipoStatCard: React.FC<Omit<NipoCardProps, 'variant'>> = (props) => (
  <NipoCard {...props} variant="stat" />
);

export const NipoActionCard: React.FC<Omit<NipoCardProps, 'variant'>> = (props) => (
  <NipoCard {...props} variant="action" />
);

export const NipoGamifiedCard: React.FC<Omit<NipoCardProps, 'variant'>> = (props) => (
  <NipoCard {...props} variant="gamified" showPhilosophy showJapanese />
);

// Container para layout responsivo por densidade
interface NipoGridProps {
  role: UserRole;
  children: React.ReactNode;
  className?: string;
}

export const NipoGrid: React.FC<NipoGridProps> = ({ role, children, className }) => {
  const gridCols = DESIGN_UTILS.gridCols[role];
  const gridGap = DESIGN_UTILS.gridGaps[role];
  
  return (
    <div className={cn('grid', gridCols, gridGap, className)}>
      {children}
    </div>
  );
};