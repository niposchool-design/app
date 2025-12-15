// 🎌 OrientalGrid - Grid adaptivo baseado no nível do usuário
import React from 'react';
import { DESIGN_UTILS, type UserRole } from '../../lib/constants/design';

interface OrientalGridProps {
  children: React.ReactNode;
  level: UserRole;
  className?: string;
}

export const OrientalGrid: React.FC<OrientalGridProps> = ({
  children,
  level,
  className = ''
}) => {
  const gridCols = DESIGN_UTILS.gridCols[level];
  const gridGap = DESIGN_UTILS.gridGaps[level];
  
  return (
    <div className={`grid ${gridCols} ${gridGap} ${className}`}>
      {children}
    </div>
  );
};