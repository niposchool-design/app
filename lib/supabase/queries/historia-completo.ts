import { createClient } from '@/lib/supabase/server';

// ========================================
// INTERFACES COMPLETAS
// ========================================

export interface HistoriaPeriodo {
  id: string;
  nome: string;
  periodo_inicio: number | null;
  periodo_fim: number | null;
  descricao_curta: string | null;
  descricao_completa: string | null;
  contexto_historico: string | null;
  caracteristicas_principais: any;
  imagem_capa_url: string | null;
  cor_tematica: string | null;
  ordem_cronologica: number | null;
  ativo: boolean;
  created_at: string;
}

export interface HistoriaCompositor {
  id: string;
  nome_completo: string;
  nome_artistico: string | null;
  data_nascimento: string | null;
  data_falecimento: string | null;
  pais_nascimento: string | null;
  cidade_nascimento: string | null;
  periodo_id: string | null;
  biografia_curta: string | null;
  biografia_completa: string | null;
  principais_obras: string[] | null;
  estilo_musical: string | null;
  instrumentos_tocados: string[] | null;
  curiosidades: any;
  foto_url: string | null;
  audio_assinatura_url: string | null;
  nivel_importancia: number;
  tags: string[] | null;
  ativo: boolean;
  created_at: string;
}

export interface HistoriaObra {
  id: string;
  titulo: string;
  titulo_original: string | null;
  compositor_id: string | null;
  periodo_id: string | null;
  ano_composicao: number | null;
  tipo_obra: string | null;
  genero: string | null;
  duracao_minutos: number | null;
  instrumentacao: string[] | null;
  tonalidade: string | null;
  opus_numero: string | null;
  descricao: string | null;
  contexto_criacao: string | null;
  estrutura_formal: any;
  analise_musical: string | null;
  significado_historico: string | null;
  audio_url: string | null;
  partitura_url: string | null;
  video_performance_url: string | null;
  nivel_dificuldade: number | null;
  popularidade: number;
  tags: string[] | null;
  ativo: boolean;
  created_at: string;
}

export interface HistoriaGenero {
  id: string;
  nome: string;
  slug: string;
  periodo_origem_id: string | null;
  decada_origem: number | null;
  pais_origem: string | null;
  descricao: string | null;
  caracteristicas_musicais: any;
  generos_relacionados: string[] | null;
  compositores_principais: string[] | null;
  obras_representativas: string[] | null;
  influencias_culturais: string | null;
  imagem_url: string | null;
  cor_tematica: string | null;
  ativo: boolean;
  created_at: string;
}

// ========================================
// QUERIES DE PERÍODOS
// ========================================

/**
 * Busca todos os períodos em ordem cronológica
 */
export async function getPeriodosHistoria(): Promise<HistoriaPeriodo[]> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('historia_periodos')
    .select('*')
    .eq('ativo', true)
    .order('periodo_inicio', { ascending: true });

  if (error) {
    console.error('Erro ao buscar períodos históricos:', error);
    return [];
  }

  return data || [];
}

/**
 * Busca um período específico com compositores e obras
 */
export async function getPeriodoCompleto(id: string) {
  const supabase = await createClient();
  
  const [periodo, compositores, obras] = await Promise.all([
    supabase.from('historia_periodos').select('*').eq('id', id).eq('ativo', true).single(),
    supabase.from('historia_compositores').select('*').eq('periodo_id', id).eq('ativo', true).order('nivel_importancia', { ascending: false }),
    supabase.from('historia_obras').select('*').eq('periodo_id', id).eq('ativo', true).order('ano_composicao', { ascending: true })
  ]);

  if (periodo.error) {
    console.error('Erro ao buscar período:', periodo.error);
    return null;
  }

  return {
    ...periodo.data,
    compositores: compositores.data || [],
    obras: obras.data || []
  };
}

// ========================================
// QUERIES DE COMPOSITORES
// ========================================

/**
 * Busca compositores com suas obras
 */
export async function getCompositoresCompletos() {
  const supabase = await createClient();
  
  const { data: compositores, error } = await supabase
    .from('historia_compositores')
    .select(`
      *,
      periodo:historia_periodos(nome, periodo_inicio, periodo_fim)
    `)
    .eq('ativo', true)
    .order('data_nascimento', { ascending: true });

  if (error) {
    console.error('Erro ao buscar compositores:', error);
    return [];
  }

  // Buscar obras de cada compositor
  const compositoresComObras = await Promise.all(
    (compositores || []).map(async (compositor) => {
      const { data: obras } = await supabase
        .from('historia_obras')
        .select('id, titulo, ano_composicao, tipo_obra, audio_url')
        .eq('compositor_id', compositor.id)
        .eq('ativo', true)
        .order('ano_composicao', { ascending: true })
        .limit(5);

      return {
        ...compositor,
        obras: obras || []
      };
    })
  );

  return compositoresComObras;
}

/**
 * Busca compositores de um período específico
 */
export async function getCompositoresByPeriodo(periodoId: string): Promise<HistoriaCompositor[]> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('historia_compositores')
    .select('*')
    .eq('periodo_id', periodoId)
    .eq('ativo', true)
    .order('nivel_importancia', { ascending: false });

  if (error) {
    console.error('Erro ao buscar compositores:', error);
    return [];
  }

  return data || [];
}

/**
 * Busca compositor específico com todas as relações
 */
export async function getCompositorCompleto(id: string) {
  const supabase = await createClient();
  
  const [compositor, obras] = await Promise.all([
    supabase.from('historia_compositores').select(`
      *,
      periodo:historia_periodos(*)
    `).eq('id', id).eq('ativo', true).single(),
    supabase.from('historia_obras').select('*').eq('compositor_id', id).eq('ativo', true).order('ano_composicao', { ascending: true })
  ]);

  if (compositor.error) {
    console.error('Erro ao buscar compositor:', compositor.error);
    return null;
  }

  return {
    ...compositor.data,
    obras: obras.data || []
  };
}

// ========================================
// QUERIES DE OBRAS
// ========================================

/**
 * Busca obras com compositor e período
 */
export async function getObrasCompletas() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('historia_obras')
    .select(`
      *,
      compositor:historia_compositores(nome_completo, nome_artistico, pais_nascimento),
      periodo:historia_periodos(nome, cor_tematica)
    `)
    .eq('ativo', true)
    .order('ano_composicao', { ascending: true });

  if (error) {
    console.error('Erro ao buscar obras:', error);
    return [];
  }

  return data || [];
}

/**
 * Busca obra específica com todas as relações
 */
export async function getObraCompleta(id: string) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('historia_obras')
    .select(`
      *,
      compositor:historia_compositores(*),
      periodo:historia_periodos(*)
    `)
    .eq('id', id)
    .eq('ativo', true)
    .single();

  if (error) {
    console.error('Erro ao buscar obra:', error);
    return null;
  }

  return data;
}

// ========================================
// QUERIES DE GÊNEROS
// ========================================

/**
 * Busca gêneros com período de origem
 */
export async function getGenerosCompletos() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('historia_generos')
    .select(`
      *,
      periodo:historia_periodos(nome, periodo_inicio, periodo_fim)
    `)
    .eq('ativo', true)
    .order('nome', { ascending: true });

  if (error) {
    console.error('Erro ao buscar gêneros:', error);
    return [];
  }

  return data || [];
}

// ========================================
// QUERIES DE TIMELINE
// ========================================

/**
 * Busca linha do tempo completa com todos os relacionamentos
 */
export async function getTimelineCompleta() {
  const supabase = await createClient();
  
  // Buscar períodos com compositores e obras
  const { data: periodos, error } = await supabase
    .from('historia_periodos')
    .select('*')
    .eq('ativo', true)
    .order('periodo_inicio', { ascending: true });

  if (error) {
    console.error('Erro ao buscar timeline:', error);
    return [];
  }

  // Para cada período, buscar compositores e obras
  const timelineCompleta = await Promise.all(
    (periodos || []).map(async (periodo) => {
      const [compositores, obras] = await Promise.all([
        supabase.from('historia_compositores')
          .select('id, nome_completo, nome_artistico, data_nascimento, data_falecimento, pais_nascimento, foto_url, nivel_importancia')
          .eq('periodo_id', periodo.id)
          .eq('ativo', true)
          .order('nivel_importancia', { ascending: false })
          .limit(10),
        supabase.from('historia_obras')
          .select('id, titulo, ano_composicao, compositor_id, tipo_obra, audio_url')
          .eq('periodo_id', periodo.id)
          .eq('ativo', true)
          .order('ano_composicao', { ascending: true })
          .limit(10)
      ]);

      return {
        ...periodo,
        compositores: compositores.data || [],
        obras: obras.data || [],
        total_compositores: compositores.data?.length || 0,
        total_obras: obras.data?.length || 0
      };
    })
  );

  return timelineCompleta;
}

// ========================================
// QUERIES DE ESTATÍSTICAS
// ========================================

/**
 * Busca estatísticas gerais
 */
export async function getHistoriaStats() {
  const supabase = await createClient();
  
  const [periodos, compositores, obras, generos] = await Promise.all([
    supabase.from('historia_periodos').select('id', { count: 'exact', head: true }),
    supabase.from('historia_compositores').select('id', { count: 'exact', head: true }),
    supabase.from('historia_obras').select('id', { count: 'exact', head: true }),
    supabase.from('historia_generos').select('id', { count: 'exact', head: true })
  ]);

  return {
    totalPeriodos: periodos.count || 0,
    totalCompositores: compositores.count || 0,
    totalObras: obras.count || 0,
    totalGeneros: generos.count || 0,
  };
}

/**
 * Busca estatísticas por país
 */
export async function getStatsByPais() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('historia_compositores')
    .select('pais_nascimento')
    .eq('ativo', true);

  if (error) {
    console.error('Erro ao buscar stats por país:', error);
    return [];
  }

  // Contar compositores por país
  const paisesCount = (data || []).reduce((acc: any, comp: any) => {
    const pais = comp.pais_nascimento || 'Desconhecido';
    acc[pais] = (acc[pais] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(paisesCount)
    .map(([pais, count]) => ({ pais, count }))
    .sort((a: any, b: any) => b.count - a.count);
}

/**
 * Busca estatísticas por período
 */
export async function getStatsByPeriodo() {
  const supabase = await createClient();
  
  const { data: periodos, error } = await supabase
    .from('historia_periodos')
    .select('id, nome')
    .eq('ativo', true);

  if (error) {
    console.error('Erro ao buscar períodos:', error);
    return [];
  }

  // Para cada período, contar compositores e obras
  const statsPromises = (periodos || []).map(async (periodo) => {
    const [compositores, obras] = await Promise.all([
      supabase.from('historia_compositores').select('id', { count: 'exact', head: true }).eq('periodo_id', periodo.id).eq('ativo', true),
      supabase.from('historia_obras').select('id', { count: 'exact', head: true }).eq('periodo_id', periodo.id).eq('ativo', true)
    ]);

    return {
      periodo: periodo.nome,
      compositores: compositores.count || 0,
      obras: obras.count || 0
    };
  });

  const stats = await Promise.all(statsPromises);
  return stats.filter(s => s.compositores > 0 || s.obras > 0);
}
