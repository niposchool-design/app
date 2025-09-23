import { useState, useEffect } from 'react';
import { useVideos } from './useVideos';
import { useDuvidas } from './useDuvidas';
import { useRepertorio } from './useRepertorio';
import { useMetodologias } from './useMetodologias';

/**
 * Hook combinado para o Centro de Estudos
 * Gerencia todos os dados necessários de forma integrada
 */
const useCentroEstudos = () => {
  const [globalLoading, setGlobalLoading] = useState(true);
  const [inicializado, setInicializado] = useState(false);

  // Hooks individuais
  const videos = useVideos();
  const duvidas = useDuvidas();
  const repertorio = useRepertorio();
  const metodologias = useMetodologias();

  // Status de carregamento combinado
  const loading = {
    videos: videos.loading,
    duvidas: duvidas.loading,
    repertorio: repertorio.loading,
    metodologias: metodologias.loading,
    global: globalLoading
  };

  // Erros combinados
  const errors = {
    videos: videos.error,
    duvidas: duvidas.error,
    repertorio: repertorio.error,
    metodologias: metodologias.error,
    hasErrors: !!(videos.error || duvidas.error || repertorio.error || metodologias.error)
  };

  // Estatísticas combinadas do Centro de Estudos
  const estatisticasGerais = {
    totalItens: {
      videos: videos.videos?.length || 0,
      duvidas: duvidas.duvidas?.length || 0,
      repertorio: repertorio.repertorio?.length || 0,
      metodologias: metodologias.metodologias?.length || 0
    },
    resumo: {
      videosAssistir: videos.calcularEstatisticas?.totalVideos || 0,
      horasConteudo: videos.calcularEstatisticas?.tempoTotal || '0h 0m',
      duvidasRespondidas: duvidas.calcularEstatisticas?.totalRespondidas || 0,
      musicasRepertorio: repertorio.calcularEstatisticas?.totalMusicas || 0,
      metodologiasAplicadas: metodologias.calcularEstatisticas?.metodologiasAplicadas || 0,
      totalVisualizacoes: (videos.calcularEstatisticas?.totalVisualizacoes || 0) + 
                         (duvidas.calcularEstatisticas?.totalVisualizacoes || 0)
    }
  };

  // Função para recarregar todos os dados
  const recarregarTudo = async () => {
    setGlobalLoading(true);
    try {
      await Promise.all([
        videos.recarregar(),
        duvidas.recarregar(),
        repertorio.recarregar(),
        metodologias.recarregar()
      ]);
    } catch (error) {
      console.error('Erro ao recarregar dados do Centro de Estudos:', error);
    } finally {
      setGlobalLoading(false);
    }
  };

  // Função para busca global
  const buscarGlobal = (termo) => {
    const resultados = {
      videos: videos.filtrarVideos({ busca: termo }),
      duvidas: duvidas.filtrarDuvidas({ busca: termo }),
      repertorio: repertorio.filtrarRepertorio({ busca: termo }),
      metodologias: metodologias.filtrarMetodologias({ busca: termo })
    };

    const totalResultados = Object.values(resultados).reduce(
      (acc, items) => acc + items.length, 0
    );

    return {
      ...resultados,
      totalResultados,
      temResultados: totalResultados > 0
    };
  };

  // Obter conteúdo em destaque/recomendado
  const obterDestaques = () => {
    return {
      videoDestaque: videos.videos?.[0] || null, // Vídeo mais recente
      perguntaDestaque: duvidas.duvidas?.find(d => d.status === 'respondida') || null,
      musicaDestaque: repertorio.repertorio?.find(m => m.nivel_dificuldade === 'iniciante') || null,
      metodologiaDestaque: metodologias.metodologias?.find(m => m.aplicada_escola) || null
    };
  };

  // Verificar se todos os dados foram carregados
  useEffect(() => {
    const todosCarregados = !videos.loading && !duvidas.loading && 
                           !repertorio.loading && !metodologias.loading;
    
    if (todosCarregados && !inicializado) {
      setInicializado(true);
      setGlobalLoading(false);
    }
  }, [videos.loading, duvidas.loading, repertorio.loading, metodologias.loading, inicializado]);

  return {
    // Dados individuais
    videos: videos.videos,
    duvidas: duvidas.duvidas,
    repertorio: repertorio.repertorio,
    metodologias: metodologias.metodologias,
    categorias: repertorio.categorias,

    // Status
    loading,
    errors,
    inicializado,

    // Estatísticas
    estatisticas: {
      videos: videos.calcularEstatisticas,
      duvidas: duvidas.calcularEstatisticas,
      repertorio: repertorio.calcularEstatisticas,
      metodologias: metodologias.calcularEstatisticas,
      gerais: estatisticasGerais
    },

    // Funções de ação
    acoes: {
      // Vídeos
      incrementarVisualizacoesVideo: videos.incrementarVisualizacoes,
      
      // Dúvidas
      criarPergunta: duvidas.criarPergunta,
      responderPergunta: duvidas.responderPergunta,
      curtirPergunta: duvidas.curtirPergunta,
      incrementarVisualizacoesDuvida: duvidas.incrementarVisualizacoes,
      
      // Repertório
      toggleFavoritoRepertorio: repertorio.toggleFavorito,
      
      // Metodologias
      toggleFavoritoMetodologia: metodologias.toggleFavorito
    },

    // Funções de filtro
    filtros: {
      filtrarVideos: videos.filtrarVideos,
      filtrarDuvidas: duvidas.filtrarDuvidas,
      filtrarRepertorio: repertorio.filtrarRepertorio,
      filtrarMetodologias: metodologias.filtrarMetodologias
    },

    // Utilitários
    utils: {
      recarregarTudo,
      buscarGlobal,
      obterDestaques
    }
  };
};

export default useCentroEstudos;