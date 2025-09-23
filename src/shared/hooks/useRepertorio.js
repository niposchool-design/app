import { useState, useEffect } from 'react';
import { supabase } from '@/shared/lib/supabase/supabaseClient';

/**
 * Hook customizado para gerenciar repertório musical
 * Conecta com a tabela repertorio_musical e modulos
 */
export const useRepertorio = () => {
  const [repertorio, setRepertorio] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const carregarRepertorio = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Carregar repertório musical da tabela populada
      const { data: repertorioData, error: repertorioError } = await supabase
        .from('repertorio_musical')
        .select(`
          *,
          modulos(id, nome, cor, icone)
        `)
        .eq('ativo', true)
        .order('titulo');

      if (repertorioError) {
        throw repertorioError;
      }

      // Transformar dados para o formato esperado pelo componente
      const repertorioFormatado = repertorioData?.map(item => ({
        id: item.id,
        titulo: item.titulo,
        compositor: item.compositor,
        nivel_dificuldade: item.nivel,
        categoria: {
          nome: item.modulos?.nome || 'Geral',
          cor_tema: item.modulos?.cor || '#6B7280'
        },
        categoria_id: item.modulo_id,
        tonalidade: item.tonalidade,
        duracao_estimada: item.duracao_minutos ? item.duracao_minutos * 60 : null,
        instrumentos: item.instrumentos || [],
        publico: item.publico || false,
        arquivo_partitura: item.partitura_url,
        arquivo_audio: item.audio_url,
        descricao: item.descricao,
        tags: item.tags || [],
        dificuldade_tecnica: item.dificuldade_tecnica,
        metodologia: item.metodologia,
        created_at: item.created_at,
        // Campos específicos para liberação (podem ser implementados futuramente)
        liberado: true, // Por enquanto todas são liberadas
        data_liberacao: item.created_at
      })) || [];

      setRepertorio(repertorioFormatado);

      // Extrair categorias únicas do repertório
      const categoriasUnicas = repertorioFormatado
        .filter(item => item.categoria?.nome)
        .reduce((acc, item) => {
          const catNome = item.categoria.nome;
          if (!acc.some(c => c.nome === catNome)) {
            acc.push({
              id: item.categoria_id,
              nome: catNome,
              cor_tema: item.categoria.cor_tema
            });
          }
          return acc;
        }, []);
      
      setCategorias(categoriasUnicas);
    } catch (err) {
      console.error('Erro ao carregar repertório:', err);
      setError(err.message);
      setRepertorio([]);
      setCategorias([]);
    } finally {
      setLoading(false);
    }
  };

  // Função para filtrar repertório
  const filtrarRepertorio = (filtros) => {
    return repertorio.filter(musica => {
      const matchCategoria = !filtros.categoria || filtros.categoria === 'todas' || 
        musica.categoria_id === filtros.categoria;
      
      const matchNivel = !filtros.nivel || filtros.nivel === 'todos' || 
        musica.nivel_dificuldade === filtros.nivel;
      
      const matchBusca = !filtros.busca || 
        musica.titulo.toLowerCase().includes(filtros.busca.toLowerCase()) ||
        musica.compositor?.toLowerCase().includes(filtros.busca.toLowerCase());
      
      const matchStatus = !filtros.status || filtros.status === 'todos' || 
        (filtros.status === 'liberado' && musica.liberado) ||
        (filtros.status === 'pendente' && !musica.liberado);
      
      const matchInstrumento = !filtros.instrumento || filtros.instrumento === 'todos' ||
        musica.instrumentos?.includes(filtros.instrumento);

      return matchCategoria && matchNivel && matchBusca && matchStatus && matchInstrumento;
    });
  };

  // Função para marcar como favorito (implementação futura)
  const toggleFavorito = async (musicaId) => {
    try {
      // Implementar lógica de favoritos quando necessário
      console.log('Toggle favorito:', musicaId);
    } catch (err) {
      console.error('Erro ao alterar favorito:', err);
    }
  };

  // Calcular estatísticas
  const calcularEstatisticas = () => {
    const totalPorNivel = {
      iniciante: repertorio.filter(m => m.nivel_dificuldade === 'iniciante').length,
      intermediário: repertorio.filter(m => m.nivel_dificuldade === 'intermediário').length,
      avançado: repertorio.filter(m => m.nivel_dificuldade === 'avançado').length
    };

    const totalPorCategoria = categorias.map(cat => ({
      categoria: cat.nome,
      total: repertorio.filter(m => m.categoria_id === cat.id).length,
      cor: cat.cor_tema
    }));

    const instrumentosUnicos = [...new Set(
      repertorio.flatMap(m => m.instrumentos || [])
    )].filter(Boolean);

    const compositoresUnicos = [...new Set(
      repertorio.map(m => m.compositor).filter(Boolean)
    )];

    const duracaoTotal = repertorio.reduce((acc, musica) => {
      return acc + (musica.duracao_estimada || 0);
    }, 0);

    return {
      totalMusicas: repertorio.length,
      totalPorNivel,
      totalPorCategoria,
      totalInstrumentos: instrumentosUnicos.length,
      instrumentosUnicos,
      totalCompositores: compositoresUnicos.length,
      compositoresUnicos,
      duracaoTotal: Math.floor(duracaoTotal / 60), // em minutos
      categorias: categorias.length
    };
  };

  useEffect(() => {
    carregarRepertorio();
  }, []);

  return {
    repertorio,
    categorias,
    loading,
    error,
    recarregar: carregarRepertorio,
    filtrarRepertorio,
    toggleFavorito,
    calcularEstatisticas: calcularEstatisticas()
  };
};