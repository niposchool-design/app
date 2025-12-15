// 🎓 SERVIÇO DE TURMAS - NIPO SCHOOL  
// ================================================
// Service para gestão completa de turmas e matrículas

import { supabase } from '@/lib/supabase/client'
import { Database } from '@/lib/supabase/database.types'
import { CommonErrors } from '@/lib/constants/errors'

type TurmaRow = Database['public']['Tables']['turmas']['Row']
type TurmaInsert = Database['public']['Tables']['turmas']['Insert']
type TurmaUpdate = Database['public']['Tables']['turmas']['Update']

type TurmaAlunoRow = Database['public']['Tables']['turma_alunos']['Row']
type TurmaAlunoInsert = Database['public']['Tables']['turma_alunos']['Insert']

export class TurmasService {
  // 📋 LISTAR TODAS AS TURMAS ATIVAS
  // =========================================
  static async getAllTurmas(): Promise<TurmaRow[]> {
    try {
      const { data, error } = await supabase
        .from('turmas')
        .select('*')
        .eq('ativo', true)
        .order('nome', { ascending: true })

      if (error) throw new Error(`Erro ao buscar turmas: ${error.message}`)
      return data || []
    } catch (error) {
      console.error('Erro no getAllTurmas:', error)
      throw CommonErrors.NETWORK_ERROR
    }
  }

  // 🔍 BUSCAR TURMA POR ID
  // =========================================
  static async getTurmaById(id: string): Promise<TurmaRow | null> {
    try {
      const { data, error } = await supabase
        .from('turmas')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        if (error.code === 'PGRST116') return null // Não encontrado
        throw new Error(`Erro ao buscar turma: ${error.message}`)
      }

      return data
    } catch (error) {
      console.error('Erro no getTurmaById:', error)
      throw error instanceof Error ? error : CommonErrors.NETWORK_ERROR
    }
  }

  // 👨‍🏫 BUSCAR TURMAS DO PROFESSOR
  // =========================================
  static async getTurmasProfessor(professorId: string): Promise<TurmaRow[]> {
    try {
      const { data, error } = await supabase
        .from('turmas')
        .select('*')
        .eq('professor_id', professorId)
        .eq('ativo', true)
        .order('nome', { ascending: true })

      if (error) throw new Error(`Erro ao buscar turmas do professor: ${error.message}`)
      return data || []
    } catch (error) {
      console.error('Erro no getTurmasProfessor:', error)
      throw CommonErrors.NETWORK_ERROR
    }
  }

  // 🎯 CRIAR NOVA TURMA (versão simplificada)
  // =========================================
  static async criarTurma(data: {
    nome: string
    descricao?: string
    professor_id: string
    data_inicio: string
    data_fim?: string
  }): Promise<TurmaRow> {
    try {
      const turmaData: TurmaInsert = {
        nome: data.nome,
        descricao: data.descricao,
        professor_id: data.professor_id,
        data_inicio: data.data_inicio,
        data_fim: data.data_fim,
        ativo: true,
        created_at: new Date().toISOString()
      }

      const { data: result, error } = await supabase
        .from('turmas')
        .insert(turmaData)
        .select()
        .single()

      if (error) throw new Error(`Erro ao criar turma: ${error.message}`)
      return result
    } catch (error) {
      console.error('Erro no criarTurma:', error)
      throw error instanceof Error ? error : CommonErrors.VALIDATION_ERROR
    }
  }

  // ✏️ ATUALIZAR TURMA
  // =========================================
  static async atualizarTurma(id: string, updates: Partial<TurmaUpdate>): Promise<TurmaRow> {
    try {
      const { data, error } = await supabase
        .from('turmas')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw new Error(`Erro ao atualizar turma: ${error.message}`)
      return data
    } catch (error) {
      console.error('Erro no atualizarTurma:', error)
      throw error instanceof Error ? error : CommonErrors.VALIDATION_ERROR
    }
  }

  // 👥 MATRICULAR ALUNO NA TURMA (versão simplificada)
  // =========================================
  static async matricularAluno(turmaId: string, alunoId: string): Promise<TurmaAlunoRow> {
    try {
      // Verificar se aluno já está matriculado
      const { data: existeMatricula } = await supabase
        .from('turma_alunos')
        .select('id')
        .eq('turma_id', turmaId)
        .eq('aluno_id', alunoId)
        .eq('status', 'ativo')
        .single()

      if (existeMatricula) {
        throw new Error('Aluno já matriculado nesta turma')
      }

      // Criar matrícula
      const matriculaData: TurmaAlunoInsert = {
        turma_id: turmaId,
        aluno_id: alunoId,
        data_ingresso: new Date().toISOString(),
        status: 'ativo'
      }

      const { data: matricula, error: matriculaError } = await supabase
        .from('turma_alunos')
        .insert(matriculaData)
        .select()
        .single()

      if (matriculaError) throw new Error(`Erro ao matricular: ${matriculaError.message}`)
      return matricula
    } catch (error) {
      console.error('Erro no matricularAluno:', error)
      throw error instanceof Error ? error : CommonErrors.VALIDATION_ERROR
    }
  }

  // 👋 DESMATRICULAR ALUNO (versão simplificada)
  // =========================================
  static async desmatricularAluno(turmaId: string, alunoId: string): Promise<void> {
    try {
      // Alterar status para inativo
      const { error } = await supabase
        .from('turma_alunos')
        .update({ status: 'inativo' })
        .eq('turma_id', turmaId)
        .eq('aluno_id', alunoId)

      if (error) throw new Error(`Erro ao desmatricular: ${error.message}`)
    } catch (error) {
      console.error('Erro no desmatricularAluno:', error)
      throw error instanceof Error ? error : CommonErrors.VALIDATION_ERROR
    }
  }

  // 📊 LISTAR ALUNOS DA TURMA (versão básica)
  // =========================================
  static async getAlunosTurma(turmaId: string): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('turma_alunos')
        .select('*')
        .eq('turma_id', turmaId)
        .eq('status', 'ativo')
        .order('data_ingresso', { ascending: true })

      if (error) throw new Error(`Erro ao buscar alunos: ${error.message}`)
      return data || []
    } catch (error) {
      console.error('Erro no getAlunosTurma:', error)
      throw CommonErrors.NETWORK_ERROR
    }
  }

  // 🎒 BUSCAR TURMAS DO ALUNO (versão básica)
  // =========================================
  static async getTurmasAluno(alunoId: string): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('turma_alunos')
        .select('*')
        .eq('aluno_id', alunoId)
        .eq('status', 'ativo')
        .order('data_ingresso', { ascending: false })

      if (error) throw new Error(`Erro ao buscar turmas do aluno: ${error.message}`)
      return data || []
    } catch (error) {
      console.error('Erro no getTurmasAluno:', error)
      throw CommonErrors.NETWORK_ERROR
    }
  }

  // 📈 ATUALIZAR STATUS DA MATRÍCULA
  // =========================================
  static async atualizarStatusMatricula(
    turmaId: string,
    alunoId: string,
    novoStatus: 'ativo' | 'inativo' | 'concluido'
  ): Promise<TurmaAlunoRow> {
    try {
      const { data, error } = await supabase
        .from('turma_alunos')
        .update({ status: novoStatus })
        .eq('turma_id', turmaId)
        .eq('aluno_id', alunoId)
        .select()
        .single()

      if (error) throw new Error(`Erro ao atualizar status: ${error.message}`)
      return data
    } catch (error) {
      console.error('Erro no atualizarStatusMatricula:', error)
      throw error instanceof Error ? error : CommonErrors.VALIDATION_ERROR
    }
  }

  // 📊 ESTATÍSTICAS BÁSICAS
  // =========================================
  static async getEstatisticasBasicas(): Promise<{
    totalTurmas: number
    totalMatriculas: number
  }> {
    try {
      const { count: totalTurmas } = await supabase
        .from('turmas')
        .select('*', { count: 'exact', head: true })
        .eq('ativo', true)

      const { count: totalMatriculas } = await supabase
        .from('turma_alunos')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'ativo')

      return {
        totalTurmas: totalTurmas || 0,
        totalMatriculas: totalMatriculas || 0
      }
    } catch (error) {
      console.error('Erro no getEstatisticasBasicas:', error)
      throw CommonErrors.NETWORK_ERROR
    }
  }
}