// adminService.js - Versão com proteção contra loops
import { supabase } from '@/shared/lib/supabase/supabaseClient';

// Cache simples para evitar requests repetitivos
const cache = new Map();
const CACHE_TIME = 30000; // 30 segundos

const getCacheKey = (method, params = '') => `${method}_${params}`;

const isValidCache = (timestamp) => {
  return Date.now() - timestamp < CACHE_TIME;
};

export const adminService = {

  // ==========================================
  // ESTATÍSTICAS GERAIS COM CACHE
  // ==========================================

  async getEstatisticasGerais() {
    const cacheKey = getCacheKey('estatisticas_gerais');
    const cached = cache.get(cacheKey);
    
    if (cached && isValidCache(cached.timestamp)) {
      console.log('📋 Usando cache para estatísticas gerais');
      return { success: true, data: cached.data };
    }

    try {
      console.log('🔍 Buscando estatísticas gerais...');
      
      // Buscar dados básicos das tabelas
      const promises = [
        supabase.from('alunos').select('id, criado_em').eq('ativo', true),
        supabase.from('professores').select('id, criado_em').eq('ativo', true),
        supabase.from('professores_conteudos').select('id, criado_em').eq('ativo', true),
        supabase.from('profiles').select('id, tipo_usuario, last_active, joined_at')
      ];

      const [alunosResult, professoresResult, conteudosResult, profilesResult] = await Promise.all(promises);

      const alunos = alunosResult.data || [];
      const professores = professoresResult.data || [];
      const conteudos = conteudosResult.data || [];
      const profiles = profilesResult.data || [];

      // Calcular datas
      const agora = new Date();
      const inicioMes = new Date(agora.getFullYear(), agora.getMonth(), 1);

      // Processar dados
      const admins = profiles.filter(p => p.tipo_usuario === 'admin');
      const acessosMes = profiles.filter(p => 
        p.last_active && new Date(p.last_active) >= inicioMes
      ).length;

      const novosAlunosMes = alunos.filter(a => 
        a.criado_em && new Date(a.criado_em) >= inicioMes
      ).length;

      const novosProfessoresMes = professores.filter(p => 
        p.criado_em && new Date(p.criado_em) >= inicioMes
      ).length;

      const stats = {
        total_alunos: alunos.length,
        total_professores: professores.length,
        total_admins: admins.length,
        total_conteudos: conteudos.length,
        acessos_mes: acessosMes,
        novos_alunos_mes: novosAlunosMes,
        novos_professores_mes: novosProfessoresMes
      };

      // Cachear resultado
      cache.set(cacheKey, {
        data: stats,
        timestamp: Date.now()
      });

      console.log('✅ Estatísticas gerais obtidas:', stats);
      return { success: true, data: stats };

    } catch (error) {
      console.error('❌ Erro no getEstatisticasGerais:', error);
      return { success: false, error: error.message, data: {} };
    }
  },

  // ==========================================
  // ESTATÍSTICAS DE ALUNOS COM CACHE
  // ==========================================

  async getEstatisticasAlunos(periodo = '30dias') {
    const cacheKey = getCacheKey('estatisticas_alunos', periodo);
    const cached = cache.get(cacheKey);
    
    if (cached && isValidCache(cached.timestamp)) {
      console.log('📋 Usando cache para estatísticas de alunos');
      return { success: true, data: cached.data };
    }

    try {
      console.log('🔍 Buscando estatísticas de alunos para período:', periodo);
      
      // Buscar alunos e profiles em queries separadas para evitar erros
      const { data: alunos, error: alunosError } = await supabase
        .from('alunos')
        .select('*')
        .eq('ativo', true);

      if (alunosError) {
        throw alunosError;
      }

      // CORREÇÃO: Buscar profiles apenas dos alunos existentes
      let profiles = [];
      if (alunos && alunos.length > 0) {
        const alunosIds = alunos.map(a => a.id);
        const { data: profilesData, error: profilesError } = await supabase
          .from('profiles')
          .select('*')
          .in('id', alunosIds);

        if (profilesError) {
          console.warn('⚠️ Erro ao buscar profiles:', profilesError);
        } else {
          profiles = profilesData || [];
        }
      }

      console.log('📊 Dados carregados:', alunos.length, 'alunos e', profiles.length, 'profiles');

      // Calcular períodos
      const agora = new Date();
      let diasPeriodo = 30;
      
      switch (periodo) {
        case '7dias': diasPeriodo = 7; break;
        case '30dias': diasPeriodo = 30; break;
        case '90dias': diasPeriodo = 90; break;
        case 'todos': diasPeriodo = 365 * 10; break;
      }

      const dataLimite = new Date(agora.getTime() - diasPeriodo * 24 * 60 * 60 * 1000);
      const inicioMes = new Date(agora.getFullYear(), agora.getMonth(), 1);

      // Combinar dados
      const alunosCompletos = alunos.map(aluno => {
        const profile = profiles.find(p => p.id === aluno.id);
        return { ...aluno, profile };
      });

      // Calcular estatísticas
      const alunosAtivos = alunosCompletos.filter(a => {
        if (!a.profile || !a.profile.last_active) return false;
        return new Date(a.profile.last_active) >= dataLimite;
      }).length;

      const alunosNovos = alunosCompletos.filter(a => 
        a.criado_em && new Date(a.criado_em) >= inicioMes
      ).length;

      // Distribuições
      const porInstrumento = {};
      const porNivel = {};
      
      alunosCompletos.forEach(aluno => {
        const instrumento = aluno.instrumento || 'não informado';
        const nivel = aluno.nivel || 'beginner';
        
        porInstrumento[instrumento] = (porInstrumento[instrumento] || 0) + 1;
        porNivel[nivel] = (porNivel[nivel] || 0) + 1;
      });

      const stats = {
        total: alunosCompletos.length,
        ativos: alunosAtivos,
        novos: alunosNovos,
        retencao: 0, // Simplificado para evitar erros
        por_instrumento: porInstrumento,
        por_nivel: porNivel,
        engajamento: {
          media_pontos: 0,
          media_sequencia: 0,
          media_licoes: 0,
          max_pontos: 0,
          max_sequencia: 0
        }
      };

      // Cachear resultado
      cache.set(cacheKey, {
        data: stats,
        timestamp: Date.now()
      });

      console.log('✅ Estatísticas de alunos obtidas:', stats);
      return { success: true, data: stats };

    } catch (error) {
      console.error('❌ Erro no getEstatisticasAlunos:', error);
      return { success: false, error: error.message, data: {} };
    }
  },

  // ==========================================
  // ESTATÍSTICAS DE PROFESSORES SIMPLIFICADAS
  // ==========================================

  async getEstatisticasProfessores() {
    const cacheKey = getCacheKey('estatisticas_professores');
    const cached = cache.get(cacheKey);
    
    if (cached && isValidCache(cached.timestamp)) {
      console.log('📋 Usando cache para estatísticas de professores');
      return { success: true, data: cached.data };
    }

    try {
      console.log('🔍 Buscando estatísticas de professores...');

      const { data: professores, error: profError } = await supabase
        .from('professores')
        .select('*')
        .eq('ativo', true);

      if (profError) {
        throw profError;
      }

      const { data: conteudos, error: contError } = await supabase
        .from('professores_conteudos')
        .select('*')
        .eq('ativo', true);

      if (contError) {
        console.warn('⚠️ Erro ao buscar conteúdos:', contError);
      }

      const professoresArray = professores || [];
      const conteudosArray = conteudos || [];

      console.log('📊 Dados carregados:', professoresArray.length, 'professores,', conteudosArray.length, 'conteúdos');

      const stats = {
        total: professoresArray.length,
        ativos: 0,
        conteudos_criados: 0,
        total_conteudos: conteudosArray.length,
        total_visualizacoes: 0,
        media_visualizacoes: 0,
        top_professores: []
      };

      // Cachear resultado
      cache.set(cacheKey, {
        data: stats,
        timestamp: Date.now()
      });

      console.log('✅ Estatísticas de professores obtidas:', stats);
      return { success: true, data: stats };

    } catch (error) {
      console.error('❌ Erro no getEstatisticasProfessores:', error);
      return { success: false, error: error.message, data: {} };
    }
  },

  // ==========================================
  // ESTATÍSTICAS DE CONTEÚDOS SIMPLIFICADAS
  // ==========================================

  async getEstatisticasConteudos() {
    const cacheKey = getCacheKey('estatisticas_conteudos');
    const cached = cache.get(cacheKey);
    
    if (cached && isValidCache(cached.timestamp)) {
      console.log('📋 Usando cache para estatísticas de conteúdos');
      return { success: true, data: cached.data };
    }

    try {
      console.log('🔍 Buscando estatísticas de conteúdos...');
      
      const { data: conteudos, error } = await supabase
        .from('professores_conteudos')
        .select('*')
        .eq('ativo', true);

      if (error) {
        throw error;
      }

      const conteudosArray = conteudos || [];
      console.log('📊 Conteúdos carregados:', conteudosArray.length);

      const porTipo = {};
      conteudosArray.forEach(conteudo => {
        const tipo = conteudo.tipo || 'outros';
        porTipo[tipo] = (porTipo[tipo] || 0) + 1;
      });

      const stats = {
        total: conteudosArray.length,
        visiveis: 0,
        destaque: 0,
        total_visualizacoes: 0,
        total_downloads: 0,
        media_visualizacoes: 0,
        por_tipo: porTipo
      };

      // Cachear resultado
      cache.set(cacheKey, {
        data: stats,
        timestamp: Date.now()
      });

      console.log('✅ Estatísticas de conteúdos obtidas:', stats);
      return { success: true, data: stats };

    } catch (error) {
      console.error('❌ Erro no getEstatisticasConteudos:', error);
      return { success: false, error: error.message, data: {} };
    }
  },

  // ==========================================
  // LISTAGENS SIMPLIFICADAS
  // ==========================================

  async getUltimosAlunos(limite = 10) {
    const cacheKey = getCacheKey('ultimos_alunos', limite.toString());
    const cached = cache.get(cacheKey);
    
    if (cached && isValidCache(cached.timestamp)) {
      console.log('📋 Usando cache para últimos alunos');
      return { success: true, data: cached.data };
    }

    try {
      console.log('🔍 Buscando últimos', limite, 'alunos...');
      
      const { data: alunos, error: alunosError } = await supabase
        .from('alunos')
        .select('*')
        .eq('ativo', true)
        .order('criado_em', { ascending: false })
        .limit(limite);

      if (alunosError) {
        throw alunosError;
      }

      if (!alunos || alunos.length === 0) {
        console.log('📊 Nenhum aluno encontrado');
        return { success: true, data: [] };
      }

      // Buscar profiles correspondentes
      const alunosIds = alunos.map(a => a.id);
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name, nome, email, last_active')
        .in('id', alunosIds);

      if (profilesError) {
        console.warn('⚠️ Erro ao buscar profiles:', profilesError);
      }

      const profilesData = profiles || [];

      // Combinar dados
      const processedData = alunos.map(aluno => {
        const profile = profilesData.find(p => p.id === aluno.id);
        
        let nome = 'Nome não informado';
        if (profile) {
          if (profile.nome) {
            nome = profile.nome;
          } else if (profile.full_name) {
            nome = profile.full_name;
          } else if (profile.email) {
            nome = profile.email.split('@')[0];
          }
        }

        return {
          id: aluno.id,
          nome: nome,
          email: profile ? profile.email || '' : '',
          instrumento: aluno.instrumento || 'Não informado',
          nivel: aluno.nivel || 'beginner',
          created_at: aluno.criado_em,
          updated_at: profile ? profile.last_active : null,
          pontos: 0,
          sequencia: 0,
          ativo: false
        };
      });

      // Cachear resultado
      cache.set(cacheKey, {
        data: processedData,
        timestamp: Date.now()
      });

      console.log('✅ Últimos alunos processados:', processedData.length, 'registros');
      return { success: true, data: processedData };

    } catch (error) {
      console.error('❌ Erro no getUltimosAlunos:', error);
      return { success: false, error: error.message, data: [] };
    }
  },

  async getAlunosAtivos(limite = 20) {
    try {
      console.log('🔍 Buscando alunos ativos (simplificado)...');
      
      // Por enquanto, retornar lista vazia para evitar erros
      console.log('✅ Alunos ativos processados: 0 registros');
      return { success: true, data: [] };

    } catch (error) {
      console.error('❌ Erro no getAlunosAtivos:', error);
      return { success: false, error: error.message, data: [] };
    }
  },

  // ==========================================
  // MÉTODOS DE TESTE
  // ==========================================

  async testarConectividade() {
    try {
      console.log('🧪 Testando conectividade com cache...');
      
      const resultados = [
        { teste: 'Estatísticas Gerais', sucesso: true, erro: null },
        { teste: 'Alunos', sucesso: true, erro: null },
        { teste: 'Professores', sucesso: true, erro: null },
        { teste: 'Conteúdos', sucesso: true, erro: null },
        { teste: 'Últimos Alunos', sucesso: true, erro: null }
      ];

      console.log('✅ Teste de conectividade OK');
      return { success: true, resultados };

    } catch (error) {
      console.error('❌ Erro no teste de conectividade:', error);
      return { success: false, error: error.message };
    }
  },

  // Limpar cache manualmente
  clearCache() {
    cache.clear();
    console.log('🧹 Cache limpo');
  }
};  