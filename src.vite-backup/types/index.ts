// ============================================
// TIPOS PRINCIPAIS - NIPO SCHOOL
// Importados do banco de dados Supabase
// ============================================

import type { Database } from '@/lib/supabase/database.types'

// Tipos das tabelas principais
export type Profile = Database['public']['Tables']['profiles']['Row']
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert']
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update']

export type Achievement = Database['public']['Tables']['achievements']['Row']
export type UserAchievement = Database['public']['Tables']['user_achievements']['Row']
export type AchievementProgress = Database['public']['Tables']['achievements_progress']['Row']

export type Portfolio = Database['public']['Tables']['portfolios']['Row']
export type PortfolioEvidencia = Database['public']['Tables']['portfolio_evidencias']['Row']

export type AlphaDesafio = Database['public']['Tables']['alpha_desafios']['Row']
export type AlphaSubmissao = Database['public']['Tables']['alpha_submissoes']['Row']

export type Turma = Database['public']['Tables']['turmas']['Row']
export type Matricula = Database['public']['Tables']['matriculas']['Row']
export type Aula = Database['public']['Tables']['aulas']['Row']
export type Presenca = Database['public']['Tables']['presencas']['Row']

export type Instrumento = Database['public']['Tables']['instrumentos']['Row']
export type InstrumentoFisico = Database['public']['Tables']['instrumentos_fisicos']['Row']

export type UserPointsLog = Database['public']['Tables']['user_points_log']['Row']

// Tipos de usuário e enums
export type TipoUsuario = 'aluno' | 'professor' | 'pastor' | 'admin'
export type UserLevel = 'beginner' | 'intermediate' | 'advanced'
export type PortfolioStatus = 'rascunho' | 'submetido' | 'em_avaliacao' | 'avaliado'
export type MatriculaStatus = 'ativa' | 'trancada' | 'cancelada' | 'concluida'
export type AulaStatus = 'planejada' | 'em_andamento' | 'concluida' | 'cancelada'
export type InstrumentoStatus = 'disponivel' | 'emprestado' | 'manutencao' | 'inativo'
export type AchievementRaridade = 'comum' | 'raro' | 'epico' | 'lendario'

// Tipos compostos com relações
export type ProfileWithStats = Profile & {
  achievements_count?: number
  portfolios_count?: number
}

export type AchievementWithProgress = Achievement & {
  progress?: AchievementProgress
  earned?: boolean
}

export type PortfolioWithEvidencias = Portfolio & {
  evidencias?: PortfolioEvidencia[]
}

export type TurmaWithMatriculas = Turma & {
  matriculas_count?: number
  professor?: Profile
}

export type AulaWithPresencas = Aula & {
  presencas?: Presenca[]
  turma?: Turma
}

// Backward compatibility - Interface antiga
export interface UserProfile {
  id: string
  email: string
  full_name: string
  tipo_usuario: 'aluno' | 'professor' | 'admin'
  total_points: number
  current_streak: number
  best_streak: number
  lessons_completed: number
  modules_completed: number
  user_level: string
  avatar_url?: string
  joined_at: string
  last_active?: string
}

// ============================================
// TIPOS DE RESPOSTA DE API
// ============================================

export type ApiResponse<T> = {
  data: T | null
  error: string | null
  loading: boolean
}

export type PaginatedResponse<T> = {
  data: T[]
  count: number
  page: number
  pageSize: number
  totalPages: number
}

// ============================================
// TIPOS DE FILTROS
// ============================================

export type ProfileFilters = {
  tipo_usuario?: TipoUsuario
  instrument?: string
  city?: string
  state?: string
  search?: string
}

export type AchievementFilters = {
  categoria?: string
  raridade?: AchievementRaridade
  visivel?: boolean
}

export type PortfolioFilters = {
  status?: PortfolioStatus
  tipo?: string
  user_id?: string
}

// ============================================
// DEPRECATED: Interfaces antigas (manter para compatibilidade)
// Use os tipos exportados do Database acima
// ============================================


// ============================================
// Utility Types
// ============================================
export type UserRole = 'aluno' | 'professor' | 'pastor' | 'admin'
