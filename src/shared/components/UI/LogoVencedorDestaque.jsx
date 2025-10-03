import React from 'react';
import { Trophy, Users, Sparkles, Crown } from 'lucide-react';
import { useWinningLogo } from '@/shared/hooks/useWinningLogo';

/**
 * 🏆 Componente para destacar o logo vencedor da votação
 * Mostra o logo vencedor com estatísticas da votação
 */
const LogoVencedorDestaque = ({ className = "" }) => {
  const { winningLogo, loading, stats } = useWinningLogo();

  if (loading) {
    return (
      <div className={`bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-2xl p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-yellow-200 rounded mb-3"></div>
          <div className="w-24 h-24 bg-yellow-200 rounded-xl mx-auto mb-4"></div>
          <div className="h-3 bg-yellow-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!winningLogo) {
    return null;
  }

  return (
    <div className={`bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-2xl p-6 relative overflow-hidden ${className}`}>
      
      {/* Decoração de fundo */}
      <div className="absolute top-2 right-2 text-yellow-300 opacity-30">
        <Crown className="w-12 h-12" />
      </div>
      
      <div className="absolute bottom-2 left-2 text-yellow-300 opacity-20">
        <Sparkles className="w-8 h-8" />
      </div>

      {/* Header */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <Trophy className="w-5 h-5 text-yellow-600" />
        <span className="font-bold text-yellow-800 text-sm uppercase tracking-wider">
          Logo Vencedor
        </span>
        <Trophy className="w-5 h-5 text-yellow-600" />
      </div>

      {/* Logo Vencedor */}
      <div className="text-center mb-4">
        <div className="w-20 h-20 mx-auto mb-3 bg-white rounded-xl shadow-md flex items-center justify-center p-2">
          <img
            src={winningLogo.url}
            alt={winningLogo.nome}
            className="max-w-full max-h-full object-contain"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div 
            className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center"
            style={{ display: 'none' }}
          >
            <span className="text-white text-2xl font-bold">🎵</span>
          </div>
        </div>
        
        <h4 className="font-bold text-gray-800 text-lg mb-1">
          {winningLogo.nome}
        </h4>
        
        <p className="text-sm text-gray-600 mb-3">
          {winningLogo.descricao || "Escolha da comunidade Nipo School"}
        </p>
      </div>

      {/* Estatísticas */}
      <div className="bg-white/70 rounded-xl p-3 text-center">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="flex items-center justify-center gap-1 mb-1">
              <Users className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Votos</span>
            </div>
            <div className="text-xl font-bold text-blue-800">
              {stats.winnerVotes}
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-center gap-1 mb-1">
              <Trophy className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-medium text-gray-700">Vitória</span>
            </div>
            <div className="text-xl font-bold text-yellow-700">
              {stats.winnerPercentage}%
            </div>
          </div>
        </div>
        
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-600">
            🎉 <strong>Parabéns!</strong> Este é o logo oficial escolhido pela nossa comunidade
          </p>
        </div>
      </div>

    </div>
  );
};

/**
 * Versão compacta para usar em headers ou sidebars
 */
export const LogoVencedorCompacto = ({ className = "" }) => {
  const { winningLogo, loading, stats } = useWinningLogo();

  if (loading || !winningLogo) return null;

  return (
    <div className={`bg-yellow-50 border border-yellow-200 rounded-lg p-3 ${className}`}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center">
          <img
            src={winningLogo.url}
            alt={winningLogo.nome}
            className="max-w-full max-h-full object-contain"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-1 mb-1">
            <Crown className="w-3 h-3 text-yellow-600" />
            <span className="text-xs font-bold text-yellow-800 uppercase">Vencedor</span>
          </div>
          <p className="text-sm font-medium text-gray-800">{winningLogo.nome}</p>
          <p className="text-xs text-gray-600">{stats.winnerVotes} votos ({stats.winnerPercentage}%)</p>
        </div>
      </div>
    </div>
  );
};

export default LogoVencedorDestaque;