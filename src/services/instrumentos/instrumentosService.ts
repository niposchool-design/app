// 🎼 SERVIÇO DE INSTRUMENTOS - NIPO SCHOOL
// ================================================
// Service para gestão completa do catálogo de instrumentos

import { supabase } from '@/lib/supabase/client'
import { Database } from '@/lib/supabase/database.types'
import { CommonErrors } from '@/lib/constants/errors'

type InstrumentoRow = Database['public']['Tables']['instrumentos']['Row']
type InstrumentoInsert = Database['public']['Tables']['instrumentos']['Insert']
type InstrumentoUpdate = Database['public']['Tables']['instrumentos']['Update']

type InstrumentoAlunoRow = Database['public']['Tables']['instrumentos_alunos']['Row']
type InstrumentoAlunoInsert = Database['public']['Tables']['instrumentos_alunos']['Insert']

export class InstrumentosService {
  // 📋 LISTAR TODOS OS INSTRUMENTOS ATIVOS
  // =========================================
  static async getAllInstrumentos(): Promise<InstrumentoRow[]> {
    try {
      const { data, error } = await supabase
        .from('instrumentos')
        .select('*')
        .order('nome', { ascending: true })

      if (error) throw new Error(`Erro ao buscar instrumentos: ${error.message}`)
      return data || []
    } catch (error) {
      console.error('Erro no getAllInstrumentos:', error)
      throw CommonErrors.NETWORK_ERROR
    }
  }

  // 🔍 BUSCAR INSTRUMENTO POR ID
  // =========================================
  static async getInstrumentoById(id: string): Promise<InstrumentoRow | null> {
    try {
      const { data, error } = await supabase
        .from('instrumentos')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        if (error.code === 'PGRST116') return null // Não encontrado
        throw new Error(`Erro ao buscar instrumento: ${error.message}`)
      }

      return data
    } catch (error) {
      console.error('Erro no getInstrumentoById:', error)
      throw error instanceof Error ? error : CommonErrors.NETWORK_ERROR
    }
  }

  // 📂 LISTAR POR CATEGORIA
  // =========================================
  static async getInstrumentosByCategoria(categoria: string): Promise<InstrumentoRow[]> {
    try {
      const { data, error } = await supabase
        .from('instrumentos')
        .select('*')
        .eq('categoria', categoria)
        .order('nome', { ascending: true })

      if (error) throw new Error(`Erro ao buscar instrumentos por categoria: ${error.message}`)
      return data || []
    } catch (error) {
      console.error('Erro no getInstrumentosByCategoria:', error)
      throw CommonErrors.NETWORK_ERROR
    }
  }

  // 📊 LISTAR POR NÍVEL DE DIFICULDADE
  // =========================================
  static async getInstrumentosByNivel(nivel: 'iniciante' | 'intermediario' | 'avancado'): Promise<InstrumentoRow[]> {
    try {
      const { data, error } = await supabase
        .from('instrumentos')
        .select('*')
        .eq('nivel_dificuldade', nivel)
        .order('nome', { ascending: true })

      if (error) throw new Error(`Erro ao buscar instrumentos por nível: ${error.message}`)
      return data || []
    } catch (error) {
      console.error('Erro no getInstrumentosByNivel:', error)
      throw CommonErrors.NETWORK_ERROR
    }
  }

  // 🎯 ASSOCIAR INSTRUMENTO AO ALUNO
  // =========================================
  static async associarInstrumentoAluno(data: {
    aluno_id: string
    instrumento_id: string
    nivel_atual?: string
    observacoes?: string
  }): Promise<InstrumentoAlunoRow> {
    try {
      const instrumentoAlunoData: InstrumentoAlunoInsert = {
        aluno_id: data.aluno_id,
        instrumento_id: data.instrumento_id,
        data_inicio: new Date().toISOString(),
        progresso_porcentagem: 0,
        tempo_pratica_minutos: 0,
        nivel_atual: data.nivel_atual || 'iniciante',
        tecnicas_dominadas: [],
        observacoes: data.observacoes || '',
        ultima_pratica: new Date().toISOString(),
        atualizado_em: new Date().toISOString()
      }

      const { data: result, error } = await supabase
        .from('instrumentos_alunos')
        .insert(instrumentoAlunoData)
        .select()
        .single()

      if (error) throw new Error(`Erro ao associar instrumento: ${error.message}`)
      return result
    } catch (error) {
      console.error('Erro no associarInstrumentoAluno:', error)
      throw error instanceof Error ? error : CommonErrors.VALIDATION_ERROR
    }
  }

  // 📈 ATUALIZAR PROGRESSO DO ALUNO
  // =========================================
  static async atualizarProgressoAluno(
    alunoId: string,
    instrumentoId: string,
    updates: {
      progresso_porcentagem?: number
      tempo_pratica_minutos?: number
      nivel_atual?: string
      tecnicas_dominadas?: string[]
      observacoes?: string
    }
  ): Promise<InstrumentoAlunoRow> {
    try {
      const updateData = {
        ...updates,
        ultima_pratica: new Date().toISOString(),
        atualizado_em: new Date().toISOString()
      }

      const { data, error } = await supabase
        .from('instrumentos_alunos')
        .update(updateData)
        .eq('aluno_id', alunoId)
        .eq('instrumento_id', instrumentoId)
        .select()
        .single()

      if (error) throw new Error(`Erro ao atualizar progresso: ${error.message}`)
      return data
    } catch (error) {
      console.error('Erro no atualizarProgressoAluno:', error)
      throw error instanceof Error ? error : CommonErrors.VALIDATION_ERROR
    }
  }

  // 🎵 BUSCAR INSTRUMENTOS DO ALUNO
  // =========================================
  static async getInstrumentosAluno(alunoId: string): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('instrumentos_alunos')
        .select(`
          *,
          instrumentos (*)
        `)
        .eq('aluno_id', alunoId)
        .order('data_inicio', { ascending: false })

      if (error) throw new Error(`Erro ao buscar instrumentos do aluno: ${error.message}`)
      return data || []
    } catch (error) {
      console.error('Erro no getInstrumentosAluno:', error)
      throw CommonErrors.NETWORK_ERROR
    }
  }

  // 📊 ESTATÍSTICAS DO CATÁLOGO
  // =========================================
  static async getEstatisticasCatalogo(): Promise<{
    totalInstrumentos: number
    porCategoria: Record<string, number>
    porNivel: Record<string, number>
    maisPopulares: InstrumentoRow[]
  }> {
    try {
      // Total de instrumentos
      const { count: totalInstrumentos } = await supabase
        .from('instrumentos')
        .select('*', { count: 'exact', head: true })

      // Instrumentos por categoria
      const { data: instrumentos } = await supabase
        .from('instrumentos')
        .select('categoria, nivel_dificuldade')

      const porCategoria: Record<string, number> = {}
      const porNivel: Record<string, number> = {}

      instrumentos?.forEach(inst => {
        porCategoria[inst.categoria] = (porCategoria[inst.categoria] || 0) + 1
        porNivel[inst.nivel_dificuldade] = (porNivel[inst.nivel_dificuldade] || 0) + 1
      })

      // Instrumentos mais populares (baseado em associações)
      const { data: populares } = await supabase
        .from('instrumentos')
        .select(`
          *,
          instrumentos_alunos(count)
        `)
        .limit(5)

      return {
        totalInstrumentos: totalInstrumentos || 0,
        porCategoria,
        porNivel,
        maisPopulares: populares || []
      }
    } catch (error) {
      console.error('Erro no getEstatisticasCatalogo:', error)
      throw CommonErrors.NETWORK_ERROR
    }
  }

  // 🔍 BUSCAR INSTRUMENTOS (com filtros)
  // =========================================
  static async buscarInstrumentos(filtros: {
    termo?: string
    categoria?: string
    nivel?: string
    limit?: number
  }): Promise<InstrumentoRow[]> {
    try {
      let query = supabase
        .from('instrumentos')
        .select('*')

      if (filtros.termo) {
        query = query.ilike('nome', `%${filtros.termo}%`)
      }

      if (filtros.categoria) {
        query = query.eq('categoria', filtros.categoria)
      }

      if (filtros.nivel) {
        query = query.eq('nivel_dificuldade', filtros.nivel as any)
      }

      if (filtros.limit) {
        query = query.limit(filtros.limit)
      }

      query = query.order('nome', { ascending: true })

      const { data, error } = await query

      if (error) throw new Error(`Erro na busca: ${error.message}`)
      return data || []
    } catch (error) {
      console.error('Erro no buscarInstrumentos:', error)
      throw CommonErrors.NETWORK_ERROR
    }
  }
}