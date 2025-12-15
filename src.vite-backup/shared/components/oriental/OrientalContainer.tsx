// 🎌 ORIENTAL CONTAINER - Sistema Oriental Unificado
// Implementação completa baseada na documentação oficial

import React from 'react';
import { cn } from '@/lib/utils';
import { ROLE_CONFIG, DESIGN_UTILS, type UserRole } from '@/lib/constants/design';

interface OrientalContainerProps {
  role: UserRole;
  children: React.ReactNode;
  showHeader?: boolean;
  showPhilosophy?: boolean;
  title?: string;
  subtitle?: string;
  className?: string;
}

export const OrientalContainer: React.FC<OrientalContainerProps> = ({
  role,
  children,
  showHeader = true,
  showPhilosophy = false,
  title,
  subtitle,
  className,
}) => {
  const config = ROLE_CONFIG[role];
  const background = DESIGN_UTILS.backgrounds[role];

  return (
    <div className={cn('min-h-screen', background, className)}>
      {/* Header Oriental */}
      {showHeader && (
        <div className="relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-current to-transparent transform -skew-y-1" 
                 style={{ color: config.color }} />
          </div>
          
          <div className="relative px-6 py-8 sm:px-8 lg:px-12">
            <div className="max-w-7xl mx-auto">
              {/* Role Badge */}
              <div className="flex items-center gap-4 mb-6">
                <div 
                  className="text-6xl font-bold opacity-20"
                  style={{ color: config.color }}
                >
                  {config.japanese.character}
                </div>
                
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                    {title || `Dashboard ${config.japanese.title}`}
                  </h1>
                  
                  <p className="text-lg text-gray-600 mt-2">
                    {subtitle || config.japanese.subtitle}
                  </p>
                  
                  {showPhilosophy && (
                    <p className="text-sm text-gray-500 mt-4 italic">
                      {config.philosophy}
                    </p>
                  )}
                </div>
              </div>

              {/* Role Indicator Bar */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: config.color }}
                  />
                  <span className="capitalize">{role}</span>
                </div>
                
                <span className="text-gray-400">•</span>
                
                <div className="flex items-center gap-1">
                  <span>Densidade:</span>
                  <span className="font-medium capitalize" style={{ color: config.color }}>
                    {config.density}
                  </span>
                </div>
                
                <span className="text-gray-400">•</span>
                
                <div className="flex items-center gap-1">
                  <span>Estilo:</span>
                  <span className="font-medium capitalize" style={{ color: config.color }}>
                    {config.dashboardStyle}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Area */}
      <div className="px-6 py-8 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </div>

      {/* Oriental Footer */}
      <div className="mt-auto px-6 py-4 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center gap-4">
              <span>© 2024 Nipo School</span>
              <span>•</span>
              <span>Sistema Oriental Unificado</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span>Filosofia:</span>
              <span className="font-medium" style={{ color: config.color }}>
                {role === 'student' ? 'Wabi-Sabi' : role === 'professor' ? 'Zen' : 'Kaizen'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Layouts específicos por papel

export const StudentLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <OrientalContainer 
    role="student" 
    showPhilosophy
    title="Centro de Estudos"
    subtitle="Sua jornada musical começa aqui"
  >
    {children}
  </OrientalContainer>
);

export const ProfessorLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <OrientalContainer 
    role="professor"
    title="Área dos Professores"
    subtitle="Ferramentas pedagógicas organizadas"
  >
    {children}
  </OrientalContainer>
);

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <OrientalContainer 
    role="admin"
    title="Painel Administrativo"
    subtitle="Controle total e inteligente"
  >
    {children}
  </OrientalContainer>
);