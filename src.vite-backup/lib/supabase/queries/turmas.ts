// src/lib/supabase/queries/turmas.ts
import { supabase } from '../client'
import type { Database } from '../database.types'

type Turma = Database['public']['Tables']['turmas']['Row']
type TurmaInsert = Database['public']['Tables']['turmas']['Insert']
type TurmaUpdate = Database['public']['Tables']['turmas']['Update']

export const turmasQueries = {
  // Buscar todas as turmas
  getAll: async (): Promise<Turma[]> => {
    const { data, error } = await supabase
      .from('turmas')
      .select(`
        *,
        professor:professores(
          id,
          nome,
          usuario:usuarios(email)
        )
      `)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  // Buscar turmas do professor
  getByProfessor: async (professorId: string): Promise<Turma[]> => {
    const { data, error } = await supabase
      .from('turmas')
      .select(`
        *,
        matriculas(count),
        professor:professores(
          id,
          nome
        )
      `)
      .eq('professor_id', professorId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  // Buscar turma específica com alunos
  getById: async (turmaId: string): Promise<Turma> => {
    const { data, error } = await supabase
      .from('turmas')
      .select(`
        *,
        professor:professores(
          id,
          nome,
          usuario:usuarios(email)
        ),
        matriculas(
          id,
          status,
          aluno:alunos(
            id,
            usuario:usuarios(
              id,
              nome,
              email
            )
          )
        )
      `)
      .eq('id', turmaId)
      .single()

    if (error) throw error
    return data
  },

  // Criar turma
  create: async (turmaData: TurmaInsert): Promise<Turma> => {
    const { data, error } = await supabase
      .from('turmas')
      .insert(turmaData)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Atualizar turma
  update: async (turmaId: string, updates: TurmaUpdate): Promise<Turma> => {
    const { data, error } = await supabase
      .from('turmas')
      .update(updates)
      .eq('id', turmaId)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Excluir turma
  delete: async (turmaId: string): Promise<void> => {
    const { error } = await supabase
      .from('turmas')
      .delete()
      .eq('id', turmaId)

    if (error) throw error
  },

  // Turmas que o aluno está matriculado
  getByAluno: async (alunoId: string): Promise<Turma[]> => {
    const { data, error } = await supabase
      .from('turmas')
      .select(`
        *,
        professor:professores(
          id,
          nome
        ),
        matriculas!inner(
          id,
          status
        )
      `)
      .eq('matriculas.aluno_id', alunoId)
      .eq('matriculas.status', 'ativa')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },
}