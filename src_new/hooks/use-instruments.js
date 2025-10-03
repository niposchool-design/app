import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@new/lib/supabase/supabaseClient';

/**
 * useInstruments - Hook para gerenciar instrumentos
 * Migrado de: src/shared/hooks/useInstrumentos.js
 * Nova localização: src_new/hooks/use-instruments.js
 * 
 * @returns {Object} Estado e funções para gerenciar instrumentos
 */
export const useInstruments = () => {
  const [instruments, setInstruments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carregar instrumentos
  const fetchInstruments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: instrumentsData, error: instrumentsError } = await supabase
        .from('instrumentos')
        .select(`
          id,
          nome,
          categoria,
          descricao,
          nivel_dificuldade,
          idade_minima,
          preco_aula,
          disponivel,
          imagem_url,
          created_at,
          updated_at
        `)
        .order('nome');

      if (instrumentsError) {
        throw instrumentsError;
      }

      setInstruments(instrumentsData || []);

      // Extrair categorias únicas
      const uniqueCategories = [...new Set(
        instrumentsData?.map(inst => inst.categoria).filter(Boolean) || []
      )];
      setCategories(uniqueCategories);

    } catch (err) {
      console.error('Erro ao carregar instrumentos:', err);
      setError(err.message);
      setInstruments([]);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Buscar instrumento por ID
  const getInstrumentById = useCallback(async (id) => {
    try {
      const { data, error } = await supabase
        .from('instrumentos')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Erro ao buscar instrumento:', err);
      return null;
    }
  }, []);

  // Filtrar instrumentos
  const filterInstruments = useCallback((filters = {}) => {
    const { category, available, difficulty, search } = filters;
    
    return instruments.filter(instrument => {
      if (category && instrument.categoria !== category) return false;
      if (available !== undefined && instrument.disponivel !== available) return false;
      if (difficulty && instrument.nivel_dificuldade !== difficulty) return false;
      if (search && !instrument.nome.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [instruments]);

  // Obter estatísticas
  const getStats = useCallback(() => {
    return {
      total: instruments.length,
      available: instruments.filter(i => i.disponivel).length,
      categories: categories.length,
      byCategory: categories.reduce((acc, cat) => {
        acc[cat] = instruments.filter(i => i.categoria === cat).length;
        return acc;
      }, {})
    };
  }, [instruments, categories]);

  // Carregar dados ao montar
  useEffect(() => {
    fetchInstruments();
  }, [fetchInstruments]);

  return {
    // Estado
    instruments,
    categories,
    loading,
    error,
    
    // Ações
    fetchInstruments,
    getInstrumentById,
    filterInstruments,
    getStats,
    
    // Aliases para compatibilidade (remover na FASE 8)
    instrumentos: instruments,
    categorias: categories,
    carregarDados: fetchInstruments
  };
};

export default useInstruments;