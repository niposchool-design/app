import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@new/lib/supabase/supabaseClient';

/**
 * useQuestions - Hook para gerenciar sistema de dúvidas/fórum
 * Migrado de: src/shared/hooks/useDuvidas.js
 * Nova localização: src_new/hooks/use-questions.js
 * 
 * @returns {Object} Estado e funções para gerenciar dúvidas
 */
export const useQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carregar dúvidas
  const fetchQuestions = useCallback(async (filters = {}) => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('forum_perguntas')
        .select(`
          id,
          titulo,
          conteudo,
          status,
          categoria,
          tags,
          autor_id,
          created_at,
          updated_at,
          profiles!autor_id(
            nome,
            avatar_url
          ),
          forum_respostas(
            id,
            conteudo,
            autor_id,
            created_at,
            profiles!autor_id(
              nome,
              avatar_url
            )
          )
        `)
        .order('created_at', { ascending: false });

      // Aplicar filtros
      if (filters.userId) {
        query = query.eq('autor_id', filters.userId);
      }
      if (filters.status) {
        query = query.eq('status', filters.status);
      }
      if (filters.categoria) {
        query = query.eq('categoria', filters.categoria);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      setQuestions(data || []);
    } catch (err) {
      console.error('Erro ao carregar dúvidas:', err);
      setError(err.message);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Criar nova dúvida
  const createQuestion = useCallback(async (questionData) => {
    try {
      const { data, error } = await supabase
        .from('forum_perguntas')
        .insert([questionData])
        .select()
        .single();

      if (error) throw error;

      // Atualizar lista local
      setQuestions(prev => [data, ...prev]);
      return data;
    } catch (err) {
      console.error('Erro ao criar dúvida:', err);
      throw err;
    }
  }, []);

  // Responder dúvida
  const answerQuestion = useCallback(async (questionId, answerData) => {
    try {
      const { data, error } = await supabase
        .from('forum_respostas')
        .insert([{
          pergunta_id: questionId,
          ...answerData
        }])
        .select(`
          *,
          profiles!autor_id(nome, avatar_url)
        `)
        .single();

      if (error) throw error;

      // Atualizar lista local
      setQuestions(prev => prev.map(q => 
        q.id === questionId 
          ? { ...q, forum_respostas: [...(q.forum_respostas || []), data] }
          : q
      ));

      return data;
    } catch (err) {
      console.error('Erro ao responder dúvida:', err);
      throw err;
    }
  }, []);

  // Buscar dúvida por ID
  const getQuestionById = useCallback(async (id) => {
    try {
      const { data, error } = await supabase
        .from('forum_perguntas')
        .select(`
          *,
          profiles!autor_id(nome, avatar_url),
          forum_respostas(
            *,
            profiles!autor_id(nome, avatar_url)
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Erro ao buscar dúvida:', err);
      return null;
    }
  }, []);

  // Filtrar dúvidas localmente
  const filterQuestions = useCallback((filters = {}) => {
    const { search, status, categoria } = filters;
    
    return questions.filter(question => {
      if (search && !question.titulo.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      if (status && question.status !== status) return false;
      if (categoria && question.categoria !== categoria) return false;
      return true;
    });
  }, [questions]);

  // Obter estatísticas
  const getStats = useCallback(() => {
    const total = questions.length;
    const answered = questions.filter(q => q.forum_respostas?.length > 0).length;
    const pending = questions.filter(q => q.status === 'aberta').length;
    
    return {
      total,
      answered,
      pending,
      answerRate: total > 0 ? Math.round((answered / total) * 100) : 0
    };
  }, [questions]);

  // Carregar dados ao montar
  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  return {
    // Estado
    questions,
    loading,
    error,
    
    // Ações
    fetchQuestions,
    createQuestion,
    answerQuestion,
    getQuestionById,
    filterQuestions,
    getStats,
    
    // Aliases para compatibilidade (remover na FASE 8)
    duvidas: questions,
    carregarDuvidas: fetchQuestions
  };
};

export default useQuestions;