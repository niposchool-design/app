import { createClient } from '@/lib/supabase/server';
import type {
  Aula,
  AulaCompleta,
  Material,
  ProgressoAula,
  FiltrosAulas,
  EstatisticasProgresso,
} from '@/lib/types/aulas';

/**
 * Busca uma aula pelo ID (uuid)
 */
export async function getAulaById(id: string): Promise<Aula | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('aulas')
    .select(`
      id,
      numero,
      titulo,
      data_programada,
      objetivo_didatico,
      resumo_atividades,
      desafio_alpha,
      nivel,
      formato,
      status,
      modulo_id,
      responsavel_id,
      detalhes_aula
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Erro ao buscar aula por ID ${id}:`, error);
    return null;
  }

  return data as Aula;
}
/**
 * Busca todas as aulas (progressão contínua - Método Alpha)
 * Ordenadas por número (0-29)
 */
export async function getTodasAulas(filtros?: FiltrosAulas): Promise<Aula[]> {
  const supabase = await createClient();

  let query = supabase
    .from('aulas')
    .select(`
      id,
      numero,
      titulo,
      data_programada,
      objetivo_didatico,
      resumo_atividades,
      desafio_alpha,
      nivel,
      formato,
      status,
      modulo_id,
      responsavel_id,
      detalhes_aula
    `)
    .order('numero', { ascending: true });

  if (filtros?.status) {
    query = query.eq('status', filtros.status);
  }

  if (filtros?.formato) {
    query = query.eq('formato', filtros.formato);
  }

  if (filtros?.modulo) {
    query = query.eq('modulo_id', filtros.modulo);
  }

  if (filtros?.data_inicio) {
    query = query.gte('data_programada', filtros.data_inicio);
  }

  if (filtros?.data_fim) {
    query = query.lte('data_programada', filtros.data_fim);
  }

  if (filtros?.search) {
    query = query.or(
      `titulo.ilike.%${filtros.search}%,objetivo_didatico.ilike.%${filtros.search}%`
    );
  }

  const { data, error } = await query;

  if (error) {
    console.error('Erro ao buscar todas as aulas:', error);
    return [];
  }

  return data as Aula[];
}

/**
 * Busca detalhes completos de uma aula por número
 */
export async function getAulaPorNumero(numero: number): Promise<AulaCompleta | null> {
  const supabase = await createClient();

  const { data: aula, error: aulaError } = await supabase
    .from('aulas')
    .select(`
      id,
      numero,
      titulo,
      data_programada,
      objetivo_didatico,
      resumo_atividades,
      desafio_alpha,
      nivel,
      formato,
      status,
      modulo_id,
      responsavel_id,
      detalhes_aula
    `)
    .eq('numero', numero)
    .single();

  if (aulaError || !aula) {
    console.error('Erro ao buscar aula:', aulaError);
    return null;
  }

  // Buscar materiais da aula
  const { data: materiais } = await supabase
    .from('aula_materiais')
    .select('*')
    .eq('aula_id', aula.id)
    .order('ordem', { ascending: true });

  // Buscar pré-requisitos
  const { data: preRequisitos } = await supabase
    .from('aula_pre_requisitos')
    .select('*')
    .eq('aula_id', aula.id);

  // Buscar feedbacks
  const { data: feedbacks } = await supabase
    .from('aula_feedbacks')
    .select('*')
    .eq('aula_id', aula.id)
    .order('data_feedback', { ascending: false });

  // Buscar registros
  const { data: registros } = await supabase
    .from('aula_registros')
    .select('*')
    .eq('aula_id', aula.id)
    .order('data_registro', { ascending: false });

  // Buscar checklist
  const { data: checklist } = await supabase
    .from('aula_checklist')
    .select('*')
    .eq('aula_id', aula.id)
    .order('ordem', { ascending: true });

  return {
    ...aula,
    materiais: materiais || [],
    pre_requisitos: preRequisitos || [],
    feedbacks: feedbacks || [],
    registros: registros || [],
    checklist: checklist || [],
  } as AulaCompleta;
}

/**
 * Busca progresso do aluno em uma aula específica
 */
export async function getProgressoAula(
  alunoId: string,
  aulaId: string
): Promise<ProgressoAula | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('aluno_progresso_aula')
    .select('*')
    .eq('aluno_id', alunoId)
    .eq('aula_id', aulaId)
    .single();

  if (error) {
    return null;
  }

  return data as ProgressoAula;
}

/**
 * Busca progresso geral do aluno em todas as aulas
 */
export async function getProgressoGeralAluno(
  alunoId: string
): Promise<ProgressoAula[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('aluno_progresso_aula')
    .select(`
      *,
      aulas (
        numero,
        titulo,
        data_programada
      )
    `)
    .eq('aluno_id', alunoId);

  if (error) {
    // Tabela de progresso ainda não implementada, retornar array vazio
    // Verifica se é erro de tabela não existente (objeto vazio {} ou código PGRST)
    const errorStr = JSON.stringify(error);
    const isTableNotFound =
      errorStr === '{}' ||
      error.code === 'PGRST116' ||
      error.code === '42P01' ||
      error.message?.includes('does not exist') ||
      error.message?.includes('relation') && error.message?.includes('does not exist');

    if (isTableNotFound) {
      console.log('Tabela aluno_progresso_aula não existe ainda. Retornando array vazio.');
      return [];
    }
    console.error('Erro ao buscar progresso geral:', error);
    return [];
  }

  return data as ProgressoAula[];
}

/**
 * Calcula estatísticas de progresso do aluno
 */
export async function getEstatisticasProgresso(
  alunoId: string
): Promise<EstatisticasProgresso> {
  const supabase = await createClient();

  // Buscar todas as aulas
  const { count: totalAulas, error: errorTotal } = await supabase
    .from('aulas')
    .select('id', { count: 'exact' });

  if (errorTotal) {
    console.error('Erro ao contar aulas:', errorTotal);
    return {
      totalAulas: 30,
      concluidas: 0,
      emAndamento: 0,
      desafiosAprovados: 0,
      porcentagemConclusao: 0,
    };
  }

  // Buscar progresso do aluno
  const { data: progressos, error: errorProgressos } = await supabase
    .from('aluno_progresso_aula')
    .select('*')
    .eq('aluno_id', alunoId);

  // Se tabela não existe, retornar estatísticas padrão
  if (errorProgressos?.code === 'PGRST116' || errorProgressos?.message?.includes('does not exist')) {
    console.log('Tabela aluno_progresso_aula não existe ainda. Retornando estatísticas padrão.');
    return {
      totalAulas: totalAulas || 30,
      concluidas: 0,
      emAndamento: 0,
      desafiosAprovados: 0,
      porcentagemConclusao: 0,
    };
  }

  // Calcular estatísticas
  const concluidas = progressos?.filter((p: ProgressoAula) => p.status === 'concluida').length || 0;
  const emAndamento = progressos?.filter((p: ProgressoAula) => p.status === 'em_andamento').length || 0;
  const desafiosAprovados = progressos?.filter((p: ProgressoAula) => p.desafio_aprovado).length || 0;

  return {
    totalAulas: totalAulas || 30,
    concluidas,
    emAndamento,
    desafiosAprovados,
    porcentagemConclusao: totalAulas ? (concluidas / totalAulas) * 100 : 0,
  };
}

/**
 * Busca materiais de uma aula
 */
export async function getMateriaisAula(aulaId: string): Promise<Material[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('aula_materiais')
    .select('*')
    .eq('aula_id', aulaId)
    .order('ordem', { ascending: true });

  if (error) {
    console.error('Erro ao buscar materiais:', error);
    return [];
  }

  return data as Material[];
}

/**
 * Busca aulas do Show Final (25-29)
 */
export async function getAulasShowFinal(): Promise<Aula[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('aulas')
    .select('*')
    .gte('numero', 25)
    .lte('numero', 29)
    .order('numero', { ascending: true });

  if (error) {
    console.error('Erro ao buscar aulas do show final:', error);
    return [];
  }

  return data as Aula[];
}

/**
 * Busca metodologias aplicadas em uma aula
 */
export async function getMetodologiasAula(aulaId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('metodologias')
    .select(`
      id,
      nome,
      resumo,
      filosofia,
      principios,
      caracteristicas,
      faixa_etaria,
      instrumentos_utilizados,
      sequencia_didatica,
      imagem_representativa_url,
      video_explicativo_url
    `)
    .contains('tags', [aulaId]);

  if (error) {
    console.error('Erro ao buscar metodologias:', error);
    return [];
  }

  return data || [];
}

/**
 * Busca instrumentos relacionados a uma aula
 */
export async function getInstrumentosAula(aulaId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('biblioteca_instrumentos')
    .select(`
      id,
      nome,
      categoria_id,
      origem,
      historia,
      curiosidades,
      uso_tradicional,
      uso_moderno,
      material,
      tecnicas_basicas,
      imagem_url,
      audio_exemplo_url,
      video_demonstracao_url,
      nivel_dificuldade,
      idade_recomendada,
      pre_requisitos,
      disponivel_escola,
      pode_emprestar
    `)
    .contains('tags', [aulaId]);

  if (error) {
    console.error('Erro ao buscar instrumentos:', error);
    return [];
  }

  return data || [];
}

/**
 * Busca repertório estudado em uma aula
 */
export async function getRepertorioAula(aulaId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('repertorio')
    .select(`
      id,
      titulo,
      compositor,
      arranjo_por,
      tonalidade,
      andamento,
      duracao_estimada,
      nivel_dificuldade,
      instrumentos_necessarios,
      partitura_url,
      cifra_url,
      letra_url,
      playback_url,
      video_tutorial_url,
      tags,
      observacoes
    `)
    .contains('tags', [aulaId]);

  if (error) {
    console.error('Erro ao buscar repertório:', error);
    return [];
  }

  return data || [];
}

/**
 * Busca vídeos educativos relacionados a uma aula
 */
export async function getVideosAula(aulaId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('videos_professores')
    .select(`
      id,
      titulo,
      descricao,
      duracao,
      video_url,
      thumbnail_url,
      modulo,
      instrumento_foco,
      nivel_dificuldade,
      transcricao,
      materiais_complementares
    `)
    .eq('aula_relacionada_id', aulaId)
    .eq('publico', true);

  if (error) {
    console.error('Erro ao buscar vídeos:', error);
    return [];
  }

  return data || [];
}

/**
 * Busca aulas pré-requisito (aulas anteriores necessárias)
 */
export async function getPreRequisitosAula(aulaId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('aula_pre_requisitos')
    .select(`
      *,
      aula_prerequisito:pre_requisito_aula_id (
        id,
        numero,
        titulo,
        objetivo_didatico,
        status
      )
    `)
    .eq('aula_id', aulaId);

  if (error) {
    console.error('Erro ao buscar pré-requisitos:', error);
    return [];
  }

  return data || [];
}

/**
 * Busca próximas aulas (aulas que dependem desta)
 */
export async function getProximasAulas(aulaNumero: number) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('aulas')
    .select('id, numero, titulo, objetivo_didatico, data_programada, status')
    .gt('numero', aulaNumero)
    .order('numero', { ascending: true })
    .limit(3);

  if (error) {
    console.error('Erro ao buscar próximas aulas:', error);
    return [];
  }

  return data || [];
}
