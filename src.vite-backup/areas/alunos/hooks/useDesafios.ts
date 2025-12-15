import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import type { Database } from '@/lib/supabase/database.types'

// Tipos específicos para o hook baseados na estrutura real do banco
export interface Desafio {
  id: string
  titulo: string
  descricao: string
  tipo_desafio: string
  dificuldade: 'facil' | 'medio' | 'dificil'
  pontos_max: number
  ativo: boolean
  criado_em: string
  metodologia_id?: string
}

export interface SubmissaoDesafio {
  id: string
  user_id: string
  desafio_id: string
  titulo: string
  descricao?: string
  evidencia_url?: string
  evidencia_tipo: 'audio' | 'video' | 'texto'
  auto_avaliacao?: any
  status: 'pendente' | 'avaliando' | 'aprovado' | 'revisao' | 'rejeitado'
  pontos_obtidos: number
  feedback_professor?: string
  data_submissao: string
  data_avaliacao?: string
}

interface EstatsDesafios {
  submetidos: number
  avaliados: number
  aprovados: number
  pontosGanhos: number
}

export const useDesafios = (userId?: string) => {
  const [desafios, setDesafios] = useState<Desafio[]>([])
  const [submissoes, setSubmissoes] = useState<SubmissaoDesafio[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Buscar desafios disponíveis
  const buscarDesafios = async (dificuldade?: string) => {
    try {
      setLoading(true)
      console.log('🔍 useDesafios: Buscando desafios...', { dificuldade })
      
      let query = supabase
        .from('alpha_desafios')
        .select('*')
        .eq('ativo', true)

      if (dificuldade) {
        query = query.eq('dificuldade', dificuldade)
      }

      const { data, error } = await query.order('criado_em', { ascending: false })

      if (error) {
        console.error('❌ Erro ao buscar desafios:', error)
        throw error
      }
      
      console.log('✅ Desafios carregados:', data?.length || 0)
      setDesafios(data || [])
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro ao buscar desafios'
      console.error('❌ useDesafios error:', errorMsg)
      setError(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  // Buscar submissões do usuário
  const buscarSubmissoes = async () => {
    if (!userId) return

    try {
      const { data, error } = await supabase
        .from('alpha_submissoes')
        .select(`
          *,
          alpha_desafios!inner (
            titulo,
            tipo_desafio,
            pontos_max
          )
        `)
        .eq('user_id', userId)
        .order('data_submissao', { ascending: false })

      if (error) throw error
      setSubmissoes(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar submissões')
    }
  }

  // Submeter desafio
  const submeterDesafio = async (desafioId: string, submissionData: any) => {
    if (!userId) throw new Error('Usuário não autenticado')

    try {
      const { data, error } = await supabase
        .from('alpha_submissoes')
        .insert([
          {
            user_id: userId,
            desafio_id: desafioId,
            titulo: submissionData.titulo,
            descricao: submissionData.descricao,
            evidencia_url: submissionData.evidencia_url,
            evidencia_tipo: submissionData.evidencia_tipo,
            auto_avaliacao: submissionData.auto_avaliacao,
            status: 'pendente',
            pontos_obtidos: 0
          }
        ])
        .select()

      if (error) throw error
      
      // Atualizar submissões locais
      await buscarSubmissoes()
      
      return data[0]
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Erro ao submeter desafio')
    }
  }

  // Obter estatísticas dos desafios do usuário
  const obterEstatisticas = async (): Promise<EstatsDesafios> => {
    if (!userId) {
      return { submetidos: 0, avaliados: 0, aprovados: 0, pontosGanhos: 0 }
    }

    try {
      const { data, error } = await supabase
        .from('alpha_submissoes')
        .select('status, pontos_obtidos')
        .eq('user_id', userId)

      if (error) throw error

      const submissoes = data || []

      return {
        submetidos: submissoes.length,
        avaliados: submissoes.filter(s => s.status === 'aprovado' || s.status === 'rejeitado').length,
        aprovados: submissoes.filter(s => s.status === 'aprovado').length,
        pontosGanhos: submissoes.reduce((total, s) => {
          return total + (s.status === 'aprovado' ? s.pontos_obtidos : 0)
        }, 0)
      }
    } catch (err) {
      console.error('Erro ao obter estatísticas:', err)
      return { submetidos: 0, avaliados: 0, aprovados: 0, pontosGanhos: 0 }
    }
  }

  // Verificar se usuário já submeteu um desafio específico
  const verificarSubmissao = (desafioId: string): SubmissaoDesafio | undefined => {
    return submissoes.find(s => s.desafio_id === desafioId)
  }

  // Buscar desafio por ID
  const buscarDesafioPorId = async (desafioId: string) => {
    try {
      const { data, error } = await supabase
        .from('alpha_desafios')
        .select('*')
        .eq('id', desafioId)
        .single()

      if (error) throw error
      return data
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Erro ao buscar desafio')
    }
  }

  // Carregar dados iniciais
  useEffect(() => {
    buscarDesafios()
    if (userId) {
      buscarSubmissoes()
    }
  }, [userId])

  return {
    desafios,
    submissoes,
    loading,
    error,
    buscarDesafios,
    buscarDesafioPorId,
    buscarSubmissoes,
    submeterDesafio,
    obterEstatisticas,
    verificarSubmissao
  }
}