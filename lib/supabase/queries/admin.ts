/**
 * 🔴 ADMIN QUERIES - Next.js 14
 * 
 * Estrutura Real do Banco (Schema: public)
 * 
 * Tabelas Descobertas:
 * - profiles: id, email, nome, telefone, avatar_url, data_nascimento, tipo_usuario, ativo, created_at, updated_at
 * - user_roles: id, user_id, role_type, is_active, created_at, updated_at
 * - aulas: id, titulo, descricao, professor_id, data, duracao_minutos, status, sala, instrumento, nivel, max_alunos, ativo, created_at, updated_at
 * 
 * Observações:
 * - profiles.tipo_usuario: 'admin' | 'professor' | 'aluno'
 * - user_roles.role_type: 'admin' | 'professor' | 'aluno'
 * - aulas.status: 'agendada' | 'em_andamento' | 'concluida' | 'cancelada'
 * - aulas.nivel: 'iniciante' | 'intermediario' | 'avancado'
 * - Relacionamentos: profiles.id → auth.users.id, user_roles.user_id → auth.users.id, aulas.professor_id → auth.users.id
 */

import { adminSupabase } from '../admin-client'

/**
 * Dashboard Stats - Usando adminSupabase (bypassa RLS)
 * 
 * ⚠️ ESTRUTURA REAL DA TABELA:
 * - profiles: full_name, dob, instrument, tipo_usuario (não tem campo 'ativo')
 * - aulas: numero, titulo, status, data_programada (não tem campo 'ativo')
 */
export async function getAdminDashboardStats() {
  console.log('🔍 [getAdminDashboardStats] Iniciando busca de estatísticas...')
  
  try {
    // Total de alunos (SEM filtro de ativo, pois o campo não existe)
    console.log('📊 Buscando total de alunos...')
    const alunosResponse = await adminSupabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .eq('tipo_usuario', 'aluno')
    
    console.log('✅ Alunos:', alunosResponse)
    if (alunosResponse.error) {
      console.error('❌ Erro ao buscar alunos:', alunosResponse.error)
    }

    // Total de professores (SEM filtro de ativo)
    console.log('📊 Buscando total de professores...')
    const professoresResponse = await adminSupabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .eq('tipo_usuario', 'professor')
    
    console.log('✅ Professores:', professoresResponse)
    if (professoresResponse.error) {
      console.error('❌ Erro ao buscar professores:', professoresResponse.error)
    }

    // Total de aulas (todas)
    console.log('📊 Buscando total de aulas...')
    const aulasResponse = await adminSupabase
      .from('aulas')
      .select('*', { count: 'exact', head: true })
    
    console.log('✅ Aulas:', aulasResponse)
    if (aulasResponse.error) {
      console.error('❌ Erro ao buscar aulas:', aulasResponse.error)
    }

    // Aulas hoje (usando data_programada que é o campo real)
    const hoje = new Date().toISOString().split('T')[0]
    console.log('📊 Buscando aulas de hoje:', hoje)
    const aulasHojeResponse = await adminSupabase
      .from('aulas')
      .select('*', { count: 'exact', head: true })
      .eq('data_programada', hoje)
    
    console.log('✅ Aulas hoje:', aulasHojeResponse)
    if (aulasHojeResponse.error) {
      console.error('❌ Erro ao buscar aulas de hoje:', aulasHojeResponse.error)
    }

    const stats = {
      totalAlunos: alunosResponse.count || 0,
      totalProfessores: professoresResponse.count || 0,
      totalAulas: aulasResponse.count || 0,
      aulasHoje: aulasHojeResponse.count || 0,
    }

    console.log('🎯 [getAdminDashboardStats] Estatísticas finais:', stats)
    return stats
    
  } catch (error) {
    console.error('❌ [getAdminDashboardStats] Erro fatal:', error)
    return {
      totalAlunos: 0,
      totalProfessores: 0,
      totalAulas: 0,
      aulasHoje: 0,
    }
  }
}

/**
 * Lista de Professores - Usando adminSupabase
 * Campo real: full_name (não 'nome')
 */
export async function getProfessores(filters?: {
  search?: string
  ativo?: boolean
  limit?: number
  offset?: number
}) {
  try {
    let query = adminSupabase
      .from('profiles')
      .select('*', { count: 'exact' })
      .eq('tipo_usuario', 'professor')

    if (filters?.search) {
      query = query.or(`full_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`)
    }

    query = query.order('full_name', { ascending: true })

    if (filters?.limit) {
      query = query.limit(filters.limit)
    }

    if (filters?.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
    }

    const { data, error, count } = await query

    if (error) throw error

    return { data, count: count || 0 }
  } catch (error) {
    console.error('Erro ao buscar professores:', error)
    return { data: [], count: 0 }
  }
}

/**
 * Lista de Alunos - Usando adminSupabase
 * Campo real: full_name (não 'nome')
 */
export async function getAlunos(filters?: {
  search?: string
  ativo?: boolean
  limit?: number
  offset?: number
}) {
  try {
    let query = adminSupabase
      .from('profiles')
      .select('*', { count: 'exact' })
      .eq('tipo_usuario', 'aluno')

    if (filters?.search) {
      query = query.or(`full_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`)
    }

    query = query.order('full_name', { ascending: true })

    if (filters?.limit) {
      query = query.limit(filters.limit)
    }

    if (filters?.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
    }

    const { data, error, count } = await query

    if (error) throw error

    return { data, count: count || 0 }
  } catch (error) {
    console.error('Erro ao buscar alunos:', error)
    return { data: [], count: 0 }
  }
}

/**
 * Detalhes de um Professor - Usando adminSupabase
 */
export async function getProfessorById(userId: string) {
  try {
    const { data, error } = await adminSupabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .eq('tipo_usuario', 'professor')
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Erro ao buscar professor:', error)
    return null
  }
}

/**
 * Detalhes de um Aluno - Usando adminSupabase
 */
export async function getAlunoById(userId: string) {
  try {
    const { data, error } = await adminSupabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .eq('tipo_usuario', 'aluno')
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Erro ao buscar aluno:', error)
    return null
  }
}

/**
 * Aulas Agendadas - Usando adminSupabase
 * Campos reais: numero, titulo, status, data_programada (não tem 'ativo')
 */
export async function getAulasAgendadas(limit = 10) {
  try {
    const { data, error } = await adminSupabase
      .from('aulas')
      .select('*')
      .order('data_programada', { ascending: true })
      .limit(limit)

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Erro ao buscar aulas agendadas:', error)
    return []
  }
}
