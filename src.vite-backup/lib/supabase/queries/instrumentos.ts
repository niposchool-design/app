/**
 * 🎵 QUERIES PARA INSTRUMENTOS
 * 
 * Funções para buscar dados da tabela 'instrumentos' (SCHEMA REAL)
 */

import { supabase } from '../client'

// ============================================
// TYPES - BASEADOS NO SCHEMA REAL DO SUPABASE
// ============================================

export type Instrumento = {
  id: string // uuid
  nome: string // character varying
  categoria: string | null // character varying (cordas, sopro, percussao, teclado)
  descricao: string | null // text
  imagem_url: string | null // text
  ativo: boolean | null // boolean
  ordem_exibicao: number | null // integer
  criado_em: string | null // timestamp
  historia: string | null // text
  origem: string | null // character varying
  familia_instrumental: string | null // character varying
  material_principal: string | null // text
  tecnica_producao_som: string | null // text
  dificuldade_aprendizado: string | null // character varying (iniciante, intermediário, avançado)
  anatomia_partes: Record<string, unknown> | null // jsonb
  curiosidades: unknown[] | null // jsonb (array)
}

export type InstrumentoAluno = {
  id: string
  aluno_id: string
  instrumento_id: string
  nivel_atual: string | null
  tempo_pratica_minutos: number
  ultima_pratica: string | null
  progresso_porcentagem: number
  tecnicas_dominadas: string[] | null
  observacoes: string | null
  criado_em: string
  atualizado_em: string
}

export type InstrumentoComDados = Instrumento & {
  total_sons?: number
  total_videos?: number
  total_tecnicas?: number
  favorito?: boolean
  meu_instrumento?: boolean
  progresso?: InstrumentoAluno
}

// ============================================
// CATEGORIAS (extraídas da coluna categoria)
// ============================================

/**
 * Busca todas as categorias únicas de instrumentos
 */
export async function getCategorias() {
  const { data, error } = await supabase
    .from('instrumentos')
    .select('categoria')
    .eq('ativo', true)
    .not('categoria', 'is', null)

  if (error) {
    console.error('Erro ao buscar categorias:', error)
    throw error
  }

  // Remove duplicatas e formata
  const categoriasUnicas = [...new Set(data.map(item => item.categoria))]
  return categoriasUnicas.filter(Boolean).sort()
}

// ============================================
// INSTRUMENTOS
// ============================================

/**
 * Busca todos os instrumentos ativos
 */
export async function getInstrumentos() {
  const { data, error } = await supabase
    .from('instrumentos')
    .select('*')
    .eq('ativo', true)
    .order('ordem_exibicao', { ascending: true, nullsFirst: false })
    .order('nome', { ascending: true })

  if (error) {
    console.error('Erro ao buscar instrumentos:', error)
    throw error
  }

  return data as Instrumento[]
}

/**
 * Busca instrumentos por categoria
 */
export async function getInstrumentosPorCategoria(categoria: string) {
  const { data, error } = await supabase
    .from('instrumentos')
    .select('*')
    .eq('categoria', categoria)
    .eq('ativo', true)
    .order('ordem_exibicao', { ascending: true, nullsFirst: false })
    .order('nome', { ascending: true })

  if (error) {
    console.error('Erro ao buscar instrumentos por categoria:', error)
    throw error
  }

  return data as Instrumento[]
}

/**
 * Busca instrumentos por nível de dificuldade
 */
export async function getInstrumentosPorNivel(nivel: string) {
  const { data, error } = await supabase
    .from('instrumentos')
    .select('*')
    .eq('dificuldade_aprendizado', nivel)
    .eq('ativo', true)
    .order('ordem_exibicao', { ascending: true, nullsFirst: false })
    .order('nome', { ascending: true })

  if (error) {
    console.error('Erro ao buscar instrumentos por nível:', error)
    throw error
  }

  return data as Instrumento[]
}

/**
 * Busca um instrumento específico por ID
 */
export async function getInstrumentoPorId(id: string) {
  const { data, error } = await supabase
    .from('instrumentos')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Erro ao buscar instrumento:', error)
    throw error
  }

  return data as Instrumento
}

/**
 * Busca por texto (nome, origem, descrição)
 */
export async function buscarInstrumentos(termo: string) {
  const { data, error } = await supabase
    .from('instrumentos')
    .select('*')
    .or(`nome.ilike.%${termo}%,origem.ilike.%${termo}%,descricao.ilike.%${termo}%`)
    .eq('ativo', true)
    .order('nome', { ascending: true })

  if (error) {
    console.error('Erro ao buscar instrumentos:', error)
    throw error
  }

  return data as Instrumento[]
}

// ============================================
// PROGRESSO DO ALUNO (instrumentos_alunos)
// ============================================

/**
 * Busca o progresso do aluno em um instrumento específico
 */
export async function getProgressoInstrumento(alunoId: string, instrumentoId: string) {
  const { data, error } = await supabase
    .from('instrumentos_alunos')
    .select('*')
    .eq('aluno_id', alunoId)
    .eq('instrumento_id', instrumentoId)
    .single()

  if (error && error.code !== 'PGRST116') {
    // PGRST116 = no rows returned
    console.error('Erro ao buscar progresso:', error)
    throw error
  }

  return data as InstrumentoAluno | null
}

/**
 * Busca todos os instrumentos que o aluno está estudando
 */
export async function getInstrumentosDoAluno(alunoId: string) {
  const { data, error } = await supabase
    .from('instrumentos_alunos')
    .select(`
      *,
      instrumento:instrumentos(*)
    `)
    .eq('aluno_id', alunoId)
    .order('ultima_pratica', { ascending: false, nullsFirst: false })

  if (error) {
    console.error('Erro ao buscar instrumentos do aluno:', error)
    throw error
  }

  return data
}

/**
 * Busca o instrumento principal do aluno (mais praticado)
 */
export async function getInstrumentoPrincipal(alunoId: string) {
  const { data, error } = await supabase
    .from('instrumentos_alunos')
    .select(`
      *,
      instrumento:instrumentos(*)
    `)
    .eq('aluno_id', alunoId)
    .order('tempo_pratica_minutos', { ascending: false })
    .limit(1)
    .single()

  if (error && error.code !== 'PGRST116') {
    console.error('Erro ao buscar instrumento principal:', error)
    throw error
  }

  return data
}

/**
 * Atualiza o progresso do aluno em um instrumento
 */
export async function atualizarProgressoInstrumento(
  alunoId: string,
  instrumentoId: string,
  dados: {
    progresso_porcentagem?: number
    tempo_pratica_minutos?: number
    nivel_atual?: string
    tecnicas_dominadas?: string[]
    observacoes?: string
  }
) {
  // Primeiro verifica se já existe um registro
  const { data: existente } = await supabase
    .from('instrumentos_alunos')
    .select('id')
    .eq('aluno_id', alunoId)
    .eq('instrumento_id', instrumentoId)
    .single()

  if (existente) {
    // Atualiza registro existente
    const { data, error } = await supabase
      .from('instrumentos_alunos')
      .update({
        ...dados,
        ultima_pratica: new Date().toISOString(),
        atualizado_em: new Date().toISOString()
      })
      .eq('id', existente.id)
      .select()
      .single()

    if (error) {
      console.error('Erro ao atualizar progresso:', error)
      throw error
    }

    return data
  } else {
    // Cria novo registro
    const { data, error } = await supabase
      .from('instrumentos_alunos')
      .insert({
        aluno_id: alunoId,
        instrumento_id: instrumentoId,
        ...dados,
        ultima_pratica: new Date().toISOString()
      })
      .select()
      .single()

    if (error) {
      console.error('Erro ao criar progresso:', error)
      throw error
    }

    return data
  }
}

// ============================================
// ESTATÍSTICAS
// ============================================

/**
 * Calcula estatísticas gerais da biblioteca
 */
export async function getEstatisticasBiblioteca() {
  // Total de instrumentos
  const { count: totalInstrumentos } = await supabase
    .from('instrumentos')
    .select('*', { count: 'exact', head: true })
    .eq('ativo', true)

  // Instrumentos por categoria
  const { data: instrumentos } = await supabase
    .from('instrumentos')
    .select('categoria')
    .eq('ativo', true)
    .not('categoria', 'is', null)

  // Conta por categoria
  const porCategoria = instrumentos?.reduce((acc, item) => {
    const cat = item.categoria || 'Sem categoria'
    acc[cat] = (acc[cat] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return {
    total_instrumentos: totalInstrumentos || 0,
    por_categoria: porCategoria || {}
  }
}
