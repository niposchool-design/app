import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/shared/lib/supabase/supabaseClient';

/**
 * Hook para instrumentos usando apenas as tabelas que realmente existem no banco
 * Baseado na análise real do banco de dados
 */
export const useInstrumentosReal = () => {
  const [instrumentos, setInstrumentos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para buscar instrumentos básicos
  const fetchInstrumentos = async () => {
    try {
      setIsLoading(true);
      setError(null);

      console.log('🎵 Buscando instrumentos da tabela principal...');

      // Buscar dados básicos da tabela instrumentos
      const { data: instrumentosBase, error: errorInstrumentos } = await supabase
        .from('instrumentos')
        .select('*')
        .eq('ativo', true)
        .order('nome');

      if (errorInstrumentos) {
        console.error('❌ Erro ao buscar instrumentos:', errorInstrumentos);
        throw errorInstrumentos;
      }

      console.log('✅ Instrumentos encontrados:', instrumentosBase?.length || 0);

      // Enriquecer dados com informações de tabelas relacionadas existentes
      const instrumentosEnriquecidos = await Promise.all(
        (instrumentosBase || []).map(async (instrumento) => {
          try {
            // 1. Buscar relação com professores (tabela: professor_instrumentos)
            const { data: professores } = await supabase
              .from('professor_instrumentos')
              .select(`
                professores:professor_id (
                  id,
                  nome_completo,
                  email,
                  experiencia_anos
                )
              `)
              .eq('instrumento_id', instrumento.id);

            // 2. Buscar alunos relacionados (tabela: instrumentos_alunos)
            const { data: alunos } = await supabase
              .from('instrumentos_alunos')
              .select(`
                alunos:aluno_id (
                  id,
                  full_name
                )
              `)
              .eq('instrumento_id', instrumento.id);

            // 3. Buscar turmas (tabela: turmas)
            const { data: turmas } = await supabase
              .from('turmas')
              .select('id, nome, data_inicio, data_fim, ativo')
              .eq('instrumento_id', instrumento.id)
              .eq('ativo', true);

            // 4. Buscar instrumentos físicos (tabela: instrumentos_fisicos)
            const { data: instrumentosFisicos } = await supabase
              .from('instrumentos_fisicos')
              .select('*')
              .eq('instrumento_id', instrumento.id)
              .eq('ativo', true);

            // 5. Buscar mídias (tabela: instrumento_midias)
            const { data: midias } = await supabase
              .from('instrumento_midias')
              .select('*')
              .eq('instrumento_id', instrumento.id)
              .eq('ativo', true);

            // 6. Buscar técnicas (tabela: instrumento_tecnicas)
            const { data: tecnicas } = await supabase
              .from('instrumento_tecnicas')
              .select('*')
              .eq('instrumento_id', instrumento.id)
              .eq('ativo', true);

            // 7. Buscar sons/áudios (tabela: instrumento_sons)
            const { data: sons } = await supabase
              .from('instrumento_sons')
              .select('*')
              .eq('instrumento_id', instrumento.id)
              .eq('ativo', true);

            // 8. Buscar curiosidades (tabela: instrumento_curiosidades)
            const { data: curiosidades } = await supabase
              .from('instrumento_curiosidades')
              .select('*')
              .eq('instrumento_id', instrumento.id)
              .eq('ativo', true);

            // Calcular estatísticas
            const stats = {
              total_professores: professores?.length || 0,
              total_alunos: alunos?.length || 0,
              total_turmas: turmas?.length || 0,
              instrumentos_fisicos_count: instrumentosFisicos?.length || 0,
              total_midias: midias?.length || 0,
              total_tecnicas: tecnicas?.length || 0,
              total_sons: sons?.length || 0,
              total_curiosidades: curiosidades?.length || 0,
              disponivel_escola: (instrumentosFisicos?.length || 0) > 0
            };

            console.log('🔍 DEBUG - Instrumento sendo processado:', {
              id: instrumento.id,
              nome: instrumento.nome,
              tipo_id: typeof instrumento.id
            });

            return {
              ...instrumento,
              // Dados relacionados
              professores: professores?.map(p => p.professores).filter(Boolean) || [],
              alunos: alunos?.map(a => a.alunos).filter(Boolean) || [],
              turmas: turmas || [],
              instrumentos_fisicos: instrumentosFisicos || [],
              midias: midias || [],
              tecnicas: tecnicas || [],
              sons: sons || [],
              curiosidades: curiosidades || [],
              // Estatísticas
              stats,
              // Campos calculados para compatibilidade
              disponivel_escola: stats.disponivel_escola,
              total_alunos: stats.total_alunos,
              total_professores: stats.total_professores,
              // URL de áudio principal (do primeiro som encontrado)
              audio_exemplo_url: sons?.length > 0 ? sons[0].audio_url : null,
              // Imagem principal (da primeira mídia encontrada)
              imagem_url: midias?.length > 0 ? midias[0].url : null
            };

          } catch (err) {
            console.warn(`⚠️ Erro ao enriquecer instrumento ${instrumento.nome}:`, err);
            return {
              ...instrumento,
              professores: [],
              alunos: [],
              turmas: [],
              instrumentos_fisicos: [],
              midias: [],
              tecnicas: [],
              sons: [],
              curiosidades: [],
              stats: {
                total_professores: 0,
                total_alunos: 0,
                total_turmas: 0,
                instrumentos_fisicos_count: 0,
                total_midias: 0,
                total_tecnicas: 0,
                total_sons: 0,
                total_curiosidades: 0,
                disponivel_escola: false
              },
              disponivel_escola: false,
              total_alunos: 0,
              total_professores: 0,
              audio_exemplo_url: null,
              imagem_url: null
            };
          }
        })
      );

      setInstrumentos(instrumentosEnriquecidos);

    } catch (err) {
      console.error('❌ Erro geral ao buscar instrumentos:', err);
      setError(err.message);
      
      // Fallback: dados mock básicos
      setInstrumentos([
        {
          id: '1',
          nome: 'Violino',
          categoria: 'cordas',
          descricao: 'Instrumento de cordas com som melodioso',
          nivel_dificuldade: 'intermediario',
          ativo: true,
          professores: [],
          alunos: [],
          turmas: [],
          instrumentos_fisicos: [],
          midias: [],
          tecnicas: [],
          sons: [],
          curiosidades: [],
          stats: { total_professores: 0, total_alunos: 0, total_turmas: 0, disponivel_escola: false },
          disponivel_escola: false,
          total_alunos: 0,
          total_professores: 0,
          audio_exemplo_url: null,
          imagem_url: null
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Buscar dados ao montar o componente
  useEffect(() => {
    fetchInstrumentos();
  }, []);

  // Função para recarregar dados
  const refreshData = () => {
    fetchInstrumentos();
  };

  // Categorias únicas extraídas dos instrumentos
  const categorias = useMemo(() => {
    const categoriasUnicas = [...new Set(instrumentos.map(i => i.categoria).filter(Boolean))];
    return categoriasUnicas.map(cat => ({
      id: cat,
      nome: cat.charAt(0).toUpperCase() + cat.slice(1),
      count: instrumentos.filter(i => i.categoria === cat).length
    }));
  }, [instrumentos]);

  // Estatísticas gerais
  const stats = useMemo(() => {
    return {
      totalInstruments: instrumentos.length,
      availableCount: instrumentos.filter(i => i.disponivel_escola).length,
      withAudio: instrumentos.filter(i => i.audio_exemplo_url).length,
      totalProfessores: instrumentos.reduce((sum, i) => sum + (i.total_professores || 0), 0),
      totalAlunos: instrumentos.reduce((sum, i) => sum + (i.total_alunos || 0), 0),
      totalTurmas: instrumentos.reduce((sum, i) => sum + (i.stats?.total_turmas || 0), 0)
    };
  }, [instrumentos]);

  return {
    instrumentos,
    categorias,
    stats,
    isLoading,
    error,
    refreshData
  };
};