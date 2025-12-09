import { createClient } from '@/lib/supabase/server';
import type {
  Aula,
  AulaCompleta,
  Material,
  ProgressoAula,
  FiltrosAulas,
  EstatisticasProgresso,
  NivelAula,
} from '@/lib/types/aulas';

/**
 * Busca aulas filtradas por nível e outros critérios
 */
export async function getAulasPorNivel(
  nivel: NivelAula,
  filtros?: FiltrosAulas
): Promise<Aula[]> {
  const supabase = await createClient();

  let query = supabase
    .from('aulas')
    .select('*')
    .eq('nivel', nivel)
    .order('numero', { ascending: true });

  if (filtros?.status) {
    query = query.eq('status', filtros.status);
  }

  if (filtros?.formato) {
    query = query.eq('formato', filtros.formato);
  }

  if (filtros?.modulo) {
    query = query.eq('modulo', filtros.modulo);
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
    console.error('Erro ao buscar aulas por nível:', error);
    return [];
  }

  return data as Aula[];
}

/**
 * Busca todas as aulas (para listagem geral)
 */
export async function getTodasAulas(filtros?: FiltrosAulas): Promise<Aula[]> {
  const supabase = await createClient();

  let query = supabase
    .from('aulas')
    .select('*')
    .order('numero', { ascending: true });

  if (filtros?.nivel) {
    query = query.eq('nivel', filtros.nivel);
  }

  if (filtros?.status) {
    query = query.eq('status', filtros.status);
  }

  if (filtros?.formato) {
    query = query.eq('formato', filtros.formato);
  }

  if (filtros?.modulo) {
    query = query.eq('modulo', filtros.modulo);
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
    .select('*')
    .eq('numero', numero)
    .single();

  if (aulaError || !aula) {
    console.error('Erro ao buscar aula:', aulaError);
    return null;
  }

  // Buscar materiais da aula (se a tabela existir)
  const { data: materiais } = await supabase
    .from('aula_materiais')
    .select('*')
    .eq('aula_id', aula.id)
    .order('ordem', { ascending: true });

  // Buscar pré-requisitos (se a tabela existir)
  const { data: preRequisitos } = await supabase
    .from('aula_pre_requisitos')
    .select('*')
    .eq('aula_id', aula.id);

  // Buscar feedbacks (se a tabela existir)
  const { data: feedbacks } = await supabase
    .from('aula_feedbacks')
    .select('*')
    .eq('aula_id', aula.id)
    .order('data_feedback', { ascending: false });

  // Buscar registros (se a tabela existir)
  const { data: registros } = await supabase
    .from('aula_registros')
    .select('*')
    .eq('aula_id', aula.id)
    .order('data_registro', { ascending: false });

  // Buscar checklist (se a tabela existir)
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
    // Se não existe progresso, retornar null (aula não iniciada)
    return null;
  }

  return data as ProgressoAula;
}

/**
 * Busca progresso geral do aluno em todas as aulas
 */
export async function getProgressoGeralAluno(
  alunoId: string,
  nivel?: NivelAula
): Promise<ProgressoAula[]> {
  const supabase = await createClient();

  let query = supabase
    .from('aluno_progresso_aula')
    .select(`
      *,
      aulas (
        numero,
        titulo,
        nivel,
        data_programada
      )
    `)
    .eq('aluno_id', alunoId);

  if (nivel) {
    query = query.eq('aulas.nivel', nivel);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Erro ao buscar progresso geral:', error);
    return [];
  }

  return data as ProgressoAula[];
}

/**
 * Calcula estatísticas de progresso do aluno
 */
export async function getEstatisticasProgresso(
  alunoId: string,
  nivel?: NivelAula
): Promise<EstatisticasProgresso> {
  const supabase = await createClient();

  // Buscar total de aulas no nível
  let queryAulas = supabase.from('aulas').select('id', { count: 'exact' });

  if (nivel) {
    queryAulas = queryAulas.eq('nivel', nivel);
  }

  const { count: totalAulas } = await queryAulas;

  // Buscar progresso do aluno
  let queryProgresso = supabase
    .from('aluno_progresso_aula')
    .select('*', { count: 'exact' })
    .eq('aluno_id', alunoId);

  if (nivel) {
    // Join com aulas para filtrar por nível
    queryProgresso = queryProgresso.eq('aulas.nivel', nivel);
  }

  const { data: progressos, count: totalProgressos } = await queryProgresso;

  // Calcular estatísticas
  const aulasConcluidas = progressos?.filter((p) => p.status === 'concluida').length || 0;
  const aulasEmAndamento = progressos?.filter((p) => p.status === 'em_andamento').length || 0;
  const aulasNaoIniciadas = (totalAulas || 0) - (totalProgressos || 0);
  const desafiosEnviados = progressos?.filter((p) => p.desafio_enviado).length || 0;
  const desafiosAprovados = progressos?.filter((p) => p.desafio_aprovado).length || 0;

  const porcentagemCompleta = totalAulas
    ? Math.round((aulasConcluidas / totalAulas) * 100)
    : 0;

  return {
    total_aulas: totalAulas || 0,
    aulas_concluidas: aulasConcluidas,
    aulas_em_andamento: aulasEmAndamento,
    aulas_nao_iniciadas: aulasNaoIniciadas,
    porcentagem_completa: porcentagemCompleta,
    desafios_enviados: desafiosEnviados,
    desafios_aprovados: desafiosAprovados,
  };
}

/**
 * Atualiza progresso de uma aula
 */
export async function atualizarProgressoAula(
  alunoId: string,
  aulaId: string,
  dados: Partial<ProgressoAula>
): Promise<boolean> {
  const supabase = await createClient();

  // Verificar se já existe progresso
  const { data: progressoExistente } = await supabase
    .from('aluno_progresso_aula')
    .select('id')
    .eq('aluno_id', alunoId)
    .eq('aula_id', aulaId)
    .single();

  if (progressoExistente) {
    // Atualizar
    const { error } = await supabase
      .from('aluno_progresso_aula')
      .update({
        ...dados,
        updated_at: new Date().toISOString(),
      })
      .eq('id', progressoExistente.id);

    if (error) {
      console.error('Erro ao atualizar progresso:', error);
      return false;
    }
  } else {
    // Inserir novo
    const { error } = await supabase.from('aluno_progresso_aula').insert({
      aluno_id: alunoId,
      aula_id: aulaId,
      ...dados,
    });

    if (error) {
      console.error('Erro ao criar progresso:', error);
      return false;
    }
  }

  return true;
}

/**
 * Marca aula como iniciada
 */
export async function iniciarAula(alunoId: string, aulaId: string): Promise<boolean> {
  return atualizarProgressoAula(alunoId, aulaId, {
    status: 'em_andamento',
    data_inicio: new Date().toISOString(),
    porcentagem_completa: 0,
    desafio_enviado: false,
    desafio_aprovado: false,
  });
}

/**
 * Marca aula como concluída
 */
export async function concluirAula(
  alunoId: string,
  aulaId: string,
  notaAutoAvaliacao?: number
): Promise<boolean> {
  return atualizarProgressoAula(alunoId, aulaId, {
    status: 'concluida',
    data_conclusao: new Date().toISOString(),
    porcentagem_completa: 100,
    nota_auto_avaliacao: notaAutoAvaliacao,
  });
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
 * Busca aulas do show final (aulas 25-29)
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
