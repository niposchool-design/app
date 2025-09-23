import { useState, useEffect } from 'react';
import { supabase } from '@/shared/lib/supabase/supabaseClient';

/**
 * Hook customizado para gerenciar vídeos/lições do Centro de Estudos
 * Conecta com as tabelas lessons, modulos e profiles
 */
export const useVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const carregarVideos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Buscar lessons com informações dos módulos e professores
      const { data: lessonsData, error: lessonsError } = await supabase
        .from('lessons')
        .select(`
          *,
          modulos(id, nome, cor, icone),
          profiles(nome, avatar_url)
        `)
        .order('created_at', { ascending: false });

      if (lessonsError) {
        throw lessonsError;
      }

      // Transformar dados para o formato esperado pelos componentes
      const videosFormatados = lessonsData?.map(lesson => ({
        id: lesson.id,
        titulo: lesson.titulo,
        descricao: lesson.descricao,
        duracao: lesson.duracao || '00:00',
        thumbnail: lesson.thumbnail_url || '/api/placeholder/400/250',
        data_criacao: new Date(lesson.created_at),
        visualizacoes: lesson.visualizacoes || 0,
        professor: {
          nome: lesson.profiles?.nome || 'Professor',
          avatar_url: lesson.profiles?.avatar_url || '/api/placeholder/40/40'
        },
        modulo: {
          nome: lesson.modulos?.nome || 'Geral',
          cor: lesson.modulos?.cor || 'gray',
          icone: lesson.modulos?.icone || 'BookOpen'
        },
        tags: lesson.tags || [],
        url_video: lesson.url_video,
        nivel: lesson.nivel,
        metodologia: lesson.metodologia
      })) || [];

      setVideos(videosFormatados);
    } catch (err) {
      console.error('Erro ao carregar vídeos:', err);
      setError(err.message);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  // Função para incrementar visualizações
  const incrementarVisualizacoes = async (videoId) => {
    try {
      const { error } = await supabase
        .from('lessons')
        .update({ 
          visualizacoes: supabase.rpc('increment_views', { lesson_id: videoId })
        })
        .eq('id', videoId);

      if (error) throw error;

      // Atualizar estado local
      setVideos(prev => 
        prev.map(video => 
          video.id === videoId 
            ? { ...video, visualizacoes: video.visualizacoes + 1 }
            : video
        )
      );
    } catch (err) {
      console.error('Erro ao incrementar visualizações:', err);
    }
  };

  // Função para filtrar vídeos
  const filtrarVideos = (filtros) => {
    return videos.filter(video => {
      const matchBusca = !filtros.busca || 
        video.titulo.toLowerCase().includes(filtros.busca.toLowerCase()) ||
        video.descricao.toLowerCase().includes(filtros.busca.toLowerCase()) ||
        video.tags?.some(tag => tag.toLowerCase().includes(filtros.busca.toLowerCase()));
      
      const matchModulo = !filtros.modulo || filtros.modulo === 'todos' || 
        video.modulo?.nome === filtros.modulo;
      
      const matchNivel = !filtros.nivel || filtros.nivel === 'todos' ||
        video.nivel === filtros.nivel;

      return matchBusca && matchModulo && matchNivel;
    });
  };

  // Calcular estatísticas
  const calcularEstatisticas = () => {
    const totalSegundos = videos.reduce((acc, video) => {
      if (video.duracao) {
        const [min, seg] = video.duracao.split(':').map(Number);
        return acc + (min * 60) + (seg || 0);
      }
      return acc;
    }, 0);
    
    const horas = Math.floor(totalSegundos / 3600);
    const minutos = Math.floor((totalSegundos % 3600) / 60);
    const tempoTotal = `${horas}h ${minutos}m`;
    
    const totalVisualizacoes = videos.reduce((acc, video) => acc + (video.visualizacoes || 0), 0);
    
    const modulos = [...new Set(videos.map(v => v.modulo?.nome).filter(Boolean))];

    return {
      totalVideos: videos.length,
      tempoTotal,
      totalVisualizacoes,
      totalModulos: modulos.length,
      modulos
    };
  };

  useEffect(() => {
    carregarVideos();
  }, []);

  return {
    videos,
    loading,
    error,
    recarregar: carregarVideos,
    refreshVideos: carregarVideos,
    incrementarVisualizacoes,
    filtrarVideos,
    calcularEstatisticas
  };
};