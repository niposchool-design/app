import React from 'react';
import { Crown, LogOut, GraduationCap, Users } from 'lucide-react';
import { NipoHeaderLogo } from './NipoLogo';

/**
 * Header padronizado para dashboards
 */
const DashboardHeader = ({ 
  type = 'default', 
  title, 
  subtitle, 
  userInfo, 
  stats = [],
  onLogout,
  className = "" 
}) => {
  const getHeaderConfig = () => {
    switch (type) {
      case 'admin':
        return {
          icon: Crown,
          gradient: 'from-purple-600 to-purple-700',
          textColor: 'text-purple-100',
          badgeColor: 'text-purple-200'
        };
      case 'professor':
        return {
          icon: GraduationCap,
          gradient: 'from-orange-500 to-red-500',
          textColor: 'text-orange-100',
          badgeColor: 'text-orange-200'
        };
      case 'aluno':
        return {
          icon: Users,
          gradient: 'from-blue-500 to-blue-600',
          textColor: 'text-blue-100',
          badgeColor: 'text-blue-200'
        };
      default:
        return {
          icon: Users,
          gradient: 'from-gray-600 to-gray-700',
          textColor: 'text-gray-100',
          badgeColor: 'text-gray-200'
        };
    }
  };

  const config = getHeaderConfig();
  const IconComponent = config.icon;

  return (
    <div className={`bg-gradient-to-r ${config.gradient} text-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          
          {/* Informações principais */}
          <div className="flex-1">
            {/* Logo + Title */}
            <div className="flex items-center gap-4 mb-4">
              <NipoHeaderLogo color="#ffffff" />
              <div className="flex items-center gap-3">
                <IconComponent className="w-8 h-8" />
                <h1 className="text-2xl sm:text-3xl font-light">
                  {title}
                </h1>
              </div>
            </div>
            
            {/* Subtitle */}
            {subtitle && (
              <p className={`${config.textColor} mb-2`}>
                {subtitle}
              </p>
            )}
            
            {/* User Info & Stats */}
            <div className={`flex items-center gap-4 text-sm ${config.badgeColor}`}>
              {userInfo && (
                <>
                  <span>👤 {userInfo}</span>
                  <span>•</span>
                </>
              )}
              {stats.map((stat, index) => (
                <React.Fragment key={index}>
                  <span>{stat}</span>
                  {index < stats.length - 1 && <span>•</span>}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Logout Button */}
          {onLogout && (
            <div className="flex-shrink-0">
              <button
                onClick={onLogout}
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl transition-all duration-200 group"
                title="Sair da conta"
              >
                <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:block font-medium">Sair</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;