import React from 'react';
import { User, RefreshCw, LogOut } from 'lucide-react';
import { useAuth } from '@new/app/providers/AuthContext';
import { useNavigate } from 'react-router-dom';
import Logo from './logo';

/**
 * Header - Componente de cabeçalho principal da aplicação
 * Migrado de: src/shared/components/UI/NipoHeader.jsx
 * Nova localização: src_new/components/layout/header.jsx
 * 
 * @param {Object} props
 * @param {boolean} props.isLoading - Mostra spinner de carregamento
 * @param {boolean} props.showVersion - Mostra indicador de versão
 */
const Header = ({ isLoading = false, showVersion = true }) => {
  const { userProfile, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/'); // Redireciona para a landing page
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-sm border-b border-red-100 sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 sm:px-6 py-4">
        {/* Logo + Nome */}
        <div className="flex items-center space-x-3">
          <Logo />
        </div>
        
        {/* Avatar + Actions */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {isLoading && (
            <RefreshCw className="w-4 h-4 text-red-500 animate-spin" />
          )}
          
          {showVersion && (
            <div className="flex items-center space-x-2 bg-gradient-to-r from-red-50 to-orange-50 px-3 py-2 rounded-full border border-red-200">
              <span className="text-red-500 font-bold">改</span>
              <span className="text-red-600 font-bold text-sm">2</span>
            </div>
          )}
          
          {/* Avatar */}
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-full border-2 border-white shadow-md flex items-center justify-center">
            {userProfile?.avatar_url ? (
              <img 
                src={userProfile.avatar_url} 
                alt="Avatar" 
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            )}
          </div>
          
          {/* Logout Button */}
          <button 
            onClick={handleLogout}
            className="p-2 text-gray-500 hover:text-red-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-lg"
            title="Sair"
          >
            <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;