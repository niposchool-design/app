import { useState, useEffect } from 'react';
import { supabase } from '@/shared/lib/supabase/supabaseClient';

/**
 * Hook customizado para gerenciar metodologias de ensino
 * Conecta com a tabela metodologias_ensino
 */
export const useMetodologias = () => {
  const [metodologias, setMetodologias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const carregarMetodologias = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Carregar metodologias da tabela populada
      const { data: metodologiasData, error: metodologiasError } = await supabase
        .from('metodologias_ensino')
        .select('*')
        .eq('ativo', true)
        .order('nome');

      if (metodologiasError) {
        throw metodologiasError;
      }

      // Transformar dados para o formato esperado pelo componente
      const metodologiasFormatadas = metodologiasData?.map(metodologia => ({
        id: metodologia.id,
        nome: metodologia.nome,
        criador: metodologia.criador,
        origem: metodologia.pais_origem,
        faixa_etaria: metodologia.faixa_etaria,
        aplicada_escola: metodologia.aplicada_nipo_school || false,
        imagem_representativa_url: metodologia.imagem_url,
        descricao: metodologia.descricao,
        principios_fundamentais: metodologia.principios_chave ? 
          metodologia.principios_chave.split('\n').filter(p => p.trim()) : [],
        beneficios: metodologia.beneficios ? 
          metodologia.beneficios.split('\n').filter(b => b.trim()) : [],
        aplicacao_pratica: metodologia.aplicacao_pratica,
        recursos_necessarios: metodologia.recursos_necessarios ? 
          metodologia.recursos_necessarios.split(',').map(r => r.trim()).filter(r => r) : [],
        referencias_bibliograficas: metodologia.referencias,
        created_at: metodologia.created_at,
        instrumentos_utilizados: metodologia.instrumentos_principais ? 
          metodologia.instrumentos_principais.split(',').map(i => i.trim()).filter(i => i) : [],
        nivel_implementacao: metodologia.nivel_implementacao,
        // Campos adicionais úteis
        conceitos_chave: metodologia.conceitos_chave ? 
          metodologia.conceitos_chave.split(',').map(c => c.trim()).filter(c => c) : [],
        metodologia_ativa: metodologia.aplicada_nipo_school || false,
        tipo: metodologia.aplicada_nipo_school ? 'aplicada' : 'referencia'
      })) || [];

      setMetodologias(metodologiasFormatadas);
    } catch (err) {
      console.error('Erro ao carregar metodologias:', err);
      setError(err.message);
      setMetodologias([]);
    } finally {
      setLoading(false);
    }
  };

  // Função para filtrar metodologias
  const filtrarMetodologias = (filtros) => {
    return metodologias.filter(metodologia => {
      const matchBusca = !filtros.busca || 
        metodologia.nome.toLowerCase().includes(filtros.busca.toLowerCase()) ||
        metodologia.criador?.toLowerCase().includes(filtros.busca.toLowerCase()) ||
        metodologia.origem?.toLowerCase().includes(filtros.busca.toLowerCase());
      
      const matchFaixaEtaria = !filtros.faixaEtaria || filtros.faixaEtaria === 'todas' || 
        metodologia.faixa_etaria?.toLowerCase().includes(filtros.faixaEtaria.toLowerCase());
      
      const matchAplicacao = !filtros.aplicacao || filtros.aplicacao === 'todas' || 
        (filtros.aplicacao === 'aplicada' && metodologia.aplicada_escola) ||
        (filtros.aplicacao === 'nao_aplicada' && !metodologia.aplicada_escola);

      const matchOrigem = !filtros.origem || filtros.origem === 'todas' ||
        metodologia.origem?.toLowerCase() === filtros.origem.toLowerCase();

      return matchBusca && matchFaixaEtaria && matchAplicacao && matchOrigem;
    });
  };

  // Função para obter metodologia específica
  const obterMetodologia = (id) => {
    return metodologias.find(m => m.id === id);
  };

  // Função para obter metodologias aplicadas no Nipo School
  const obterMetodologiasAplicadas = () => {
    return metodologias.filter(m => m.aplicada_escola);
  };

  // Função para obter metodologias por origem
  const obterMetodologiasPorOrigem = () => {
    const origens = {};
    metodologias.forEach(m => {
      const origem = m.origem || 'Não especificado';
      if (!origens[origem]) {
        origens[origem] = [];
      }
      origens[origem].push(m);
    });
    return origens;
  };

  // Calcular estatísticas
  const calcularEstatisticas = () => {
    const aplicadas = metodologias.filter(m => m.aplicada_escola).length;
    const referencia = metodologias.filter(m => !m.aplicada_escola).length;
    
    const porOrigem = metodologias.reduce((acc, m) => {
      const origem = m.origem || 'Não especificado';
      acc[origem] = (acc[origem] || 0) + 1;
      return acc;
    }, {});

    const porFaixaEtaria = metodologias.reduce((acc, m) => {
      const faixa = m.faixa_etaria || 'Não especificado';
      acc[faixa] = (acc[faixa] || 0) + 1;
      return acc;
    }, {});

    const instrumentosUnicos = [...new Set(
      metodologias.flatMap(m => m.instrumentos_utilizados || [])
    )].filter(Boolean);

    const criadoresUnicos = [...new Set(
      metodologias.map(m => m.criador).filter(Boolean)
    )];

    return {
      totalMetodologias: metodologias.length,
      metodologiasAplicadas: aplicadas,
      metodologiasReferencia: referencia,
      porcentagemAplicadas: metodologias.length > 0 ? Math.round((aplicadas / metodologias.length) * 100) : 0,
      distribucaoPorOrigem: porOrigem,
      distribucaoPorFaixaEtaria: porFaixaEtaria,
      totalInstrumentos: instrumentosUnicos.length,
      instrumentosUnicos,
      totalCriadores: criadoresUnicos.length,
      criadoresUnicos,
      origensUnicas: Object.keys(porOrigem).length
    };
  };

  // Função para marcar como favorita (implementação futura)
  const toggleFavorito = async (metodologiaId) => {
    try {
      // Implementar lógica de favoritos quando necessário
      console.log('Toggle favorito metodologia:', metodologiaId);
    } catch (err) {
      console.error('Erro ao alterar favorito:', err);
    }
  };

  useEffect(() => {
    carregarMetodologias();
  }, []);

  return {
    metodologias,
    loading,
    error,
    recarregar: carregarMetodologias,
    filtrarMetodologias,
    obterMetodologia,
    obterMetodologiasAplicadas,
    obterMetodologiasPorOrigem,
    toggleFavorito,
    calcularEstatisticas: calcularEstatisticas()
  };
};