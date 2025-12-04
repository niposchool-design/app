import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import type { Database } from '@/lib/supabase/database.types'

// Tipos específicos para o hook baseados na estrutura real do banco
export interface Desafio {
  id: string
  titulo: string
  descricao: string
  tipo: string
  nivel: 'facil' | 'medio' | 'dificil'
  pontos: number
  ativo: boolean
  created_at: string
}

export interface SubmissaoDesafio {
  id: string
  user_id: string
  desafio_id: string
  submission_data: any
  status: 'pendente' | 'aprovado' | 'rejeitado'
  feedback: string | null
  submitted_at: string
  reviewed_at: string | null
  score?: number
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
  const buscarDesafios = async (nivel?: string) => {
    try {
      setLoading(true)
      let query = supabase
        .from('alpha_desafios')
        .select('*')
        .eq('ativo', true)

      if (nivel) {
        query = query.eq('nivel', nivel as any)
      }

      const { data, error } = await query.order('created_at', { ascending: false })

      if (error) throw error
      setDesafios(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar desafios')
    } finally {
      setLoading(false)
    }
  }

  // Buscar submissões do usuário
  const buscarSubmissoes = async () => {
    if (!userId) return

    try {
      const { data, error } = await supabase
        .from('desafio_submissions')
        .select(`
          *,
          alpha_desafios!inner (
            titulo,
            tipo,
            pontos
          )
        `)
        .eq('user_id', userId)
        .order('submitted_at', { ascending: false })

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
        .from('desafio_submissions')
        .insert([
          {
            user_id: userId,
            desafio_id: desafioId,
            submission_data: submissionData,
            status: 'pendente'
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
      const submissoes = await supabase
        .from('desafio_submissions')
        .select(`
          *,
          alpha_desafios!inner (pontos)
        `)
        .eq('user_id', userId)

      if (submissoes.error) throw submissoes.error

      const data = submissoes.data || []

      return {
        submetidos: data.length,
        avaliados: data.filter(s => s.status === 'aprovado' || s.status === 'rejeitado').length,
        aprovados: data.filter(s => s.status === 'aprovado').length,
        pontosGanhos: data.reduce((total, s) => {
          return total + (s.status === 'aprovado' ? (s as any).alpha_desafios?.pontos || 0 : 0)
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
    buscarSubmissoes,
    submeterDesafio,
    obterEstatisticas,
    verificarSubmissao
  }
}