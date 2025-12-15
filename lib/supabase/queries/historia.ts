import { createClient } from '@/lib/supabase/server';

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
  biografia_curta: string | null;
  principais_obras: string[] | null;
  foto_url: string | null;
  nivel_importancia: number;
  periodo_id: string | null;
}

export interface HistoriaInstrumento {
  nome: string;
  descricao: string;
  periodo_origem: string | null;
  tipo: string | null;
}

/**
 * Busca todos os períodos históricos da música
 */
export async function getPeriodosHistoria(): Promise<HistoriaPeriodo[]> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('historia_periodos')
    .select('*')
    .eq('ativo', true)
    .order('ordem_cronologica', { ascending: true });

  if (error) {
    console.error('Erro ao buscar períodos históricos:', error);
    return [];
  }

  return data || [];
}

/**
 * Busca um período específico por ID
 */
export async function getPeriodoById(id: string): Promise<HistoriaPeriodo | null> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('historia_periodos')
    .select('*')
    .eq('id', id)
    .eq('ativo', true)
    .single();

  if (error) {
    console.error('Erro ao buscar período:', error);
    return null;
  }

  return data;
}

/**
 * Busca compositores principais de um período
 */
export async function getCompositoresByPeriodo(periodoId: string): Promise<HistoriaCompositor[]> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('historia_compositores')
    .select('*')
    .eq('periodo_id', periodoId)
    .eq('ativo', true)
    .order('nivel_importancia', { ascending: false })
    .limit(10);

  if (error) {
    console.error('Erro ao buscar compositores:', error);
    return [];
  }

  return data || [];
}

/**
 * Busca instrumentos tradicionais
 * Nota: Temporariamente retorna array vazio pois tabla historia_instrumentos_evolucao
 * requer relação com tabela instrumentos que ainda não foi populada
 */
export async function getInstrumentosTradicionais(): Promise<HistoriaInstrumento[]> {
  // TODO: Implementar quando tabela 'instrumentos' estiver populada
  // const supabase = await createClient();
  
  // const { data, error } = await supabase
  //   .from('historia_instrumentos_evolucao')
  //   .select('versao_historica, descricao_tecnica, periodo_id')
  //   .limit(10);

  // if (error) {
  //   console.error('Erro ao buscar instrumentos tradicionais:', error);
  //   return [];
  // }

  // return data || [];
  
  return [];
}

/**
 * Busca estatísticas gerais de história da música
 */
export async function getHistoriaStats() {
  const supabase = await createClient();
  
  const [periodos, compositores, obras] = await Promise.all([
    supabase.from('historia_periodos').select('id', { count: 'exact', head: true }),
    supabase.from('historia_compositores').select('id', { count: 'exact', head: true }),
    supabase.from('historia_obras').select('id', { count: 'exact', head: true })
  ]);

  return {
    totalPeriodos: periodos.count || 0,
    totalCompositores: compositores.count || 0,
    totalObras: obras.count || 0,
  };
}
