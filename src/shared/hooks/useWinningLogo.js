import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase/supabaseClient';

/**
 * 🏆 Hook para buscar o logo vencedor da votação
 * Retorna o logo com mais votos do banco de dados
 */
export const useWinningLogo = () => {
  const [winningLogo, setWinningLogo] = useState(null);
  const [logos, setLogos] = useState([]);
  const [votes, setVotes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWinningLogo = async () => {
      try {
        setLoading(true);
        
        // Buscar logos ativos
        const { data: logosData, error: logosError } = await supabase
          .from('logos')
          .select('*')
          .eq('ativo', true);

        if (logosError) throw logosError;

        // Buscar votos da view
        const { data: votosData, error: votosError } = await supabase
          .from('view_placar_logos')
          .select('*');

        if (votosError) throw votosError;

        // Processar dados
        const votesMap = {};
        votosData?.forEach(vote => {
          votesMap[vote.logo_id] = vote.total_votos;
        });

        setLogos(logosData || []);
        setVotes(votesMap);

        // Determinar logo vencedor
        const getWinningLogo = () => {
          if (Object.keys(votesMap).length === 0) return null;
          const maxVotes = Math.max(...Object.values(votesMap));
          const winningId = Object.keys(votesMap).find(id => votesMap[id] === maxVotes);
          return logosData?.find(logo => logo.id === winningId);
        };

        const winner = getWinningLogo();
        setWinningLogo(winner);
        setError(null);

      } catch (err) {
        console.error('Erro ao buscar logo vencedor:', err);
        setError(err.message);
        setWinningLogo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWinningLogo();
  }, []);

  // Função para calcular estatísticas
  const getVotingStats = () => {
    const totalVotes = Object.values(votes).reduce((sum, count) => sum + count, 0);
    
    const getPercentage = (logoId) => {
      const count = votes[logoId] || 0;
      return totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
    };

    return {
      totalVotes,
      getPercentage,
      winnerVotes: winningLogo ? votes[winningLogo.id] || 0 : 0,
      winnerPercentage: winningLogo ? getPercentage(winningLogo.id) : 0
    };
  };

  return {
    winningLogo,
    logos,
    votes,
    loading,
    error,
    stats: getVotingStats(),
    refetch: () => {
      // Force re-fetch
      setLoading(true);
      const event = new Event('storage');
      window.dispatchEvent(event);
    }
  };
};