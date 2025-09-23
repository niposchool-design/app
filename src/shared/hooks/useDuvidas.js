import { useState, useEffect } from 'react';
import { supabase } from '@/shared/lib/supabase/supabaseClient';
import { useAuth } from '@/shared/contexts/AuthContext';

/**
 * Hook customizado para gerenciar sistema de dúvidas/forum
 * Conecta com as tabelas forum_perguntas e forum_respostas
 */
export const useDuvidas = () => {
  const [duvidas, setDuvidas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const carregarDuvidas = async (userId = null) => {
    try {
      setLoading(true);
      setError(null);
      
      let query = supabase
        .from('forum_perguntas')
        .select(`
          *,
          modulos(id, nome, cor, icone),
          profiles!autor_id(nome, avatar_url),
          forum_respostas(
            *,
            profiles!autor_id(nome, avatar_url)
          )
        `)
        .order('created_at', { ascending: false });

      // Se especificar userId, filtrar por autor
      if (userId) {
        query = query.eq('autor_id', userId);
      }

      const { data: perguntasData, error: perguntasError } = await query;

      if (perguntasError) {
        throw perguntasError;
      }

      // Transformar dados para o formato esperado pelos componentes
      const duvidasFormatadas = perguntasData?.map(pergunta => {
        // Determinar status baseado nas respostas
        let status = 'aberta';
        if (pergunta.forum_respostas && pergunta.forum_respostas.length > 0) {
          const temRespostaOficial = pergunta.forum_respostas.some(resp => resp.oficial);
          status = temRespostaOficial ? 'respondida' : 'em_analise';
        }

        return {
          id: pergunta.id,
          titulo: pergunta.titulo,
          pergunta: pergunta.conteudo,
          status: status,
          data_criacao: new Date(pergunta.created_at),
          data_resposta: pergunta.forum_respostas?.length > 0 ? 
            new Date(pergunta.forum_respostas[0].created_at) : null,
          visualizacoes: pergunta.visualizacoes || 0,
          curtidas: pergunta.curtidas || 0,
          modulo: {
            nome: pergunta.modulos?.nome || 'Geral',
            cor: pergunta.modulos?.cor || 'gray',
            icone: pergunta.modulos?.icone || 'BookOpen'
          },
          autor: {
            nome: pergunta.profiles?.nome || 'Usuário',
            avatar_url: pergunta.profiles?.avatar_url || '/api/placeholder/40/40'
          },
          professor: pergunta.forum_respostas?.find(r => r.oficial) ? {
            nome: pergunta.forum_respostas.find(r => r.oficial).profiles?.nome || 'Professor',
            avatar_url: pergunta.forum_respostas.find(r => r.oficial).profiles?.avatar_url || '/api/placeholder/40/40'
          } : null,
          respostas: pergunta.forum_respostas?.map(resposta => ({
            id: resposta.id,
            resposta: resposta.conteudo,
            data_resposta: new Date(resposta.created_at),
            oficial: resposta.oficial,
            autor: {
              nome: resposta.profiles?.nome || 'Usuário',
              avatar_url: resposta.profiles?.avatar_url || '/api/placeholder/40/40'
            }
          })) || []
        };
      }) || [];

      setDuvidas(duvidasFormatadas);
    } catch (err) {
      console.error('Erro ao carregar dúvidas:', err);
      setError(err.message);
      setDuvidas([]);
    } finally {
      setLoading(false);
    }
  };

  // Função para criar nova pergunta
  const criarPergunta = async (perguntaData) => {
    try {
      if (!user) throw new Error('Usuário não autenticado');

      const { data, error } = await supabase
        .from('forum_perguntas')
        .insert([{
          titulo: perguntaData.titulo,
          conteudo: perguntaData.conteudo,
          modulo_id: perguntaData.modulo_id,
          autor_id: user.id,
          tags: perguntaData.tags || []
        }])
        .select()
        .single();

      if (error) throw error;

      // Recarregar dúvidas
      await carregarDuvidas(user.id);
      
      return data;
    } catch (err) {
      console.error('Erro ao criar pergunta:', err);
      throw err;
    }
  };

  // Função para responder pergunta
  const responderPergunta = async (perguntaId, resposta, oficial = false) => {
    try {
      if (!user) throw new Error('Usuário não autenticado');

      const { data, error } = await supabase
        .from('forum_respostas')
        .insert([{
          pergunta_id: perguntaId,
          conteudo: resposta,
          autor_id: user.id,
          oficial: oficial
        }])
        .select()
        .single();

      if (error) throw error;

      // Recarregar dúvidas
      await carregarDuvidas(user.id);
      
      return data;
    } catch (err) {
      console.error('Erro ao responder pergunta:', err);
      throw err;
    }
  };

  // Função para incrementar visualizações
  const incrementarVisualizacoes = async (perguntaId) => {
    try {
      const { error } = await supabase
        .from('forum_perguntas')
        .update({ 
          visualizacoes: supabase.rpc('increment_views', { pergunta_id: perguntaId })
        })
        .eq('id', perguntaId);

      if (error) throw error;

      // Atualizar estado local
      setDuvidas(prev => 
        prev.map(duvida => 
          duvida.id === perguntaId 
            ? { ...duvida, visualizacoes: duvida.visualizacoes + 1 }
            : duvida
        )
      );
    } catch (err) {
      console.error('Erro ao incrementar visualizações:', err);
    }
  };

  // Função para curtir pergunta
  const curtirPergunta = async (perguntaId) => {
    try {
      const { error } = await supabase
        .from('forum_perguntas')
        .update({ 
          curtidas: supabase.rpc('increment_likes', { pergunta_id: perguntaId })
        })
        .eq('id', perguntaId);

      if (error) throw error;

      // Atualizar estado local
      setDuvidas(prev => 
        prev.map(duvida => 
          duvida.id === perguntaId 
            ? { ...duvida, curtidas: duvida.curtidas + 1 }
            : duvida
        )
      );
    } catch (err) {
      console.error('Erro ao curtir pergunta:', err);
    }
  };

  // Função para filtrar dúvidas
  const filtrarDuvidas = (filtros) => {
    return duvidas.filter(duvida => {
      const matchBusca = !filtros.busca || 
        duvida.titulo.toLowerCase().includes(filtros.busca.toLowerCase()) ||
        duvida.pergunta.toLowerCase().includes(filtros.busca.toLowerCase());
      
      const matchModulo = !filtros.modulo || filtros.modulo === 'todos' || 
        duvida.modulo?.nome === filtros.modulo;
      
      const matchStatus = !filtros.status || filtros.status === 'todas' ||
        duvida.status === filtros.status;

      return matchBusca && matchModulo && matchStatus;
    });
  };

  // Calcular estatísticas
  const calcularEstatisticas = () => {
    const totalRespondidas = duvidas.filter(d => d.status === 'respondida').length;
    const totalEmAnalise = duvidas.filter(d => d.status === 'em_analise').length;
    const totalAbertas = duvidas.filter(d => d.status === 'aberta').length;
    const totalCurtidas = duvidas.reduce((acc, d) => acc + (d.curtidas || 0), 0);
    const totalVisualizacoes = duvidas.reduce((acc, d) => acc + (d.visualizacoes || 0), 0);
    
    const modulos = [...new Set(duvidas.map(d => d.modulo?.nome).filter(Boolean))];

    return {
      totalDuvidas: duvidas.length,
      totalRespondidas,
      totalEmAnalise,
      totalAbertas,
      totalCurtidas,
      totalVisualizacoes,
      totalModulos: modulos.length,
      modulos
    };
  };

  useEffect(() => {
    if (user) {
      carregarDuvidas(user.id);
    }
  }, [user]);

  return {
    duvidas,
    loading,
    error,
    recarregar: () => carregarDuvidas(user?.id),
    criarPergunta,
    responderPergunta,
    incrementarVisualizacoes,
    curtirPergunta,
    filtrarDuvidas,
    calcularEstatisticas: calcularEstatisticas()
  };
};