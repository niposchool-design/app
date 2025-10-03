import { supabase } from '@/shared/lib/supabase/supabaseClient';

export const instrumentDetailService = {

  /**
   * Busca os dados completos de um instrumento, alinhado com a estrutura real do banco.
   * @param {string} instrumentoId - O ID do instrumento.
   * @returns {Promise<object>} - Um objeto com todos os dados ou um erro.
   */
  async getInstrumentoCompleto(instrumentoId) {
    if (!instrumentoId) {
      return { success: false, error: 'ID do instrumento não fornecido.' };
    }

    console.log(`🔍 Buscando dados completos para o instrumento: ${instrumentoId}`);

    try {
      // 1. Busca o registro principal do instrumento, que já contém os detalhes.
      console.log('📋 1. Buscando dados principais do instrumento...');
      const instrumentoPrincipalPromise = supabase
        .from('instrumentos')
        .select('*') // Pega todas as colunas, incluindo historia, origem, etc.
        .eq('id', instrumentoId)
        .single(); // .single() retorna um objeto só, ou um erro se não encontrar.

      // 2. Busca os dados das tabelas relacionadas em paralelo.
      console.log('🎵 2. Buscando sons...');
      const sonsPromise = supabase
        .from('instrumento_sons')
        .select('*')
        .eq('instrumento_id', instrumentoId);
        
      console.log('📸 3. Buscando mídias...');
      const midiasPromise = supabase
        .from('instrumento_midias')
        .select('*')
        .eq('instrumento_id', instrumentoId);
        
      console.log('🎯 4. Buscando técnicas...');
      const tecnicasPromise = supabase
        .from('instrumento_tecnicas')
        .select('*')
        .eq('instrumento_id', instrumentoId);
        
      console.log('💡 5. Buscando curiosidades...');
      const curiosidadesPromise = supabase
        .from('instrumento_curiosidades')
        .select('*')
        .eq('instrumento_id', instrumentoId);
        
      console.log('🎭 6. Buscando performances...');
      const performancesPromise = supabase
        .from('instrumento_performances')
        .select('*')
        .eq('instrumento_id', instrumentoId);
        
      console.log('🧠 7. Buscando quiz...');
      const quizPromise = supabase
        .from('instrumento_quiz')
        .select('*')
        .eq('instrumento_id', instrumentoId);
        
      console.log('🔗 8. Buscando relacionados...');
      const relacionadosPromise = supabase
        .from('instrumentos_relacionados')
        .select('*')
        .eq('instrumento_id', instrumentoId);

      console.log('👨‍🏫 9. Buscando professores...');
      const professoresPromise = supabase
        .from('professor_instrumentos')
        .select(`
          professores:professor_id (
            id,
            nome_completo,
            email,
            biografia,
            anos_experiencia,
            especializacao
          )
        `)
        .eq('instrumento_id', instrumentoId);

      // Executa todas as buscas ao mesmo tempo
      console.log('⏳ Executando todas as consultas...');
      const [
        instrumentoPrincipalRes,
        sonsRes,
        midiasRes,
        tecnicasRes,
        curiosidadesRes,
        performancesRes,
        quizRes,
        relacionadosRes,
        professoresRes
      ] = await Promise.all([
        instrumentoPrincipalPromise,
        sonsPromise,
        midiasPromise,
        tecnicasPromise,
        curiosidadesPromise,
        performancesPromise,
        quizPromise,
        relacionadosPromise,
        professoresPromise
      ]);
      
      console.log('📊 Resultados das consultas:');
      console.log('- Instrumento principal:', instrumentoPrincipalRes.error ? '❌ ERRO' : '✅ OK');
      console.log('- Sons:', sonsRes.error ? '❌ ERRO' : `✅ ${sonsRes.data?.length || 0} encontrados`);
      console.log('- Mídias:', midiasRes.error ? '❌ ERRO' : `✅ ${midiasRes.data?.length || 0} encontradas`);
      console.log('- Técnicas:', tecnicasRes.error ? '❌ ERRO' : `✅ ${tecnicasRes.data?.length || 0} encontradas`);
      console.log('- Curiosidades:', curiosidadesRes.error ? '❌ ERRO' : `✅ ${curiosidadesRes.data?.length || 0} encontradas`);
      console.log('- Performances:', performancesRes.error ? '❌ ERRO' : `✅ ${performancesRes.data?.length || 0} encontradas`);
      console.log('- Quiz:', quizRes.error ? '❌ ERRO' : `✅ ${quizRes.data?.length || 0} encontrado(s)`);
      console.log('- Relacionados:', relacionadosRes.error ? '❌ ERRO' : `✅ ${relacionadosRes.data?.length || 0} encontrados`);
      console.log('- Professores:', professoresRes.error ? '❌ ERRO' : `✅ ${professoresRes.data?.length || 0} encontrados`);
      
      // Logs detalhados de erros
      if (instrumentoPrincipalRes.error) {
        console.error('❌ Erro instrumento principal:', instrumentoPrincipalRes.error);
      }
      if (sonsRes.error) {
        console.error('❌ Erro sons:', sonsRes.error);
      }
      if (midiasRes.error) {
        console.error('❌ Erro mídias:', midiasRes.error);
      }
      if (tecnicasRes.error) {
        console.error('❌ Erro técnicas:', tecnicasRes.error);
      }
      if (curiosidadesRes.error) {
        console.error('❌ Erro curiosidades:', curiosidadesRes.error);
      }
      if (performancesRes.error) {
        console.error('❌ Erro performances:', performancesRes.error);
      }
      if (quizRes.error) {
        console.error('❌ Erro quiz:', quizRes.error);
      }
      if (relacionadosRes.error) {
        console.error('❌ Erro relacionados:', relacionadosRes.error);
      }
      if (professoresRes.error) {
        console.error('❌ Erro professores:', professoresRes.error);
      }
      
      if (instrumentoPrincipalRes.error) {
        throw new Error(`Instrumento principal não encontrado: ${instrumentoPrincipalRes.error.message}`);
      }

      // Combina tudo em um único objeto de retorno
      const dadosCompletos = {
        instrumentoDetalhado: instrumentoPrincipalRes.data, // Agora contém historia, origem, etc.
        sons: sonsRes.data || [],
        midias: midiasRes.data || [],
        tecnicas: tecnicasRes.data || [],
        curiosidades: curiosidadesRes.data || [],
        performances: performancesRes.data || [],
        quiz: quizRes.data || [],
        relacionados: relacionadosRes.data || [],
        professores: professoresRes.data?.map(p => p.professores).filter(Boolean) || []
      };

      console.log('✅ Dados completos do instrumento obtidos com sucesso!');
      console.log('📋 Resumo final:', {
        nome: dadosCompletos.instrumentoDetalhado?.nome,
        sons: dadosCompletos.sons.length,
        midias: dadosCompletos.midias.length,
        tecnicas: dadosCompletos.tecnicas.length,
        curiosidades: dadosCompletos.curiosidades.length,
        professores: dadosCompletos.professores.length
      });
      
      return { success: true, data: dadosCompletos };

    } catch (error) {
      console.error('❌ Erro no getInstrumentoCompleto:', error.message);
      return { success: false, error: error.message, data: {} };
    }
  },

  /**
   * Alias para compatibilidade com a página de alunos
   */
  async getInstrumentDetails(instrumentoId) {
    const resultado = await this.getInstrumentoCompleto(instrumentoId);
    
    if (resultado.success) {
      return resultado.data;
    } else {
      throw new Error(resultado.error);
    }
  },

  /**
   * Busca apenas sons de um instrumento
   */
  async getSons(instrumentoId) {
    const { data, error } = await supabase
      .from('instrumento_sons')
      .select('*')
      .eq('instrumento_id', instrumentoId)
      .eq('ativo', true)
      .order('nota_musical');
    
    if (error) throw error;
    return data || [];
  },

  /**
   * Busca apenas mídias de um instrumento
   */
  async getMidias(instrumentoId) {
    const { data, error } = await supabase
      .from('instrumento_midias')
      .select('*')
      .eq('instrumento_id', instrumentoId)
      .eq('ativo', true)
      .order('titulo');
    
    if (error) throw error;
    return data || [];
  },

  /**
   * Busca apenas curiosidades de um instrumento
   */
  async getCuriosidades(instrumentoId) {
    const { data, error } = await supabase
      .from('instrumento_curiosidades')
      .select('*')
      .eq('instrumento_id', instrumentoId)
      .eq('ativo', true)
      .order('titulo');
    
    if (error) throw error;
    return data || [];
  },

  /**
   * Busca apenas técnicas de um instrumento
   */
  async getTecnicas(instrumentoId) {
    const { data, error } = await supabase
      .from('instrumento_tecnicas')
      .select('*')
      .eq('instrumento_id', instrumentoId)
      .eq('ativo', true)
      .order('ordem_aprendizado', { ascending: true });
    
    if (error) throw error;
    return data || [];
  }
};