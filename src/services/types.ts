// 🎯 TIPOS DOS SERVICES - NIPO SCHOOL
// ================================================
// Tipos TypeScript compartilhados entre services

// Tipos de Autenticação
export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupData {
  email: string
  password: string
  fullName: string
  userType?: 'aluno' | 'professor' | 'admin'
}

export interface UserProfile {
  id: string
  email: string
  fullName: string
  avatarUrl?: string
  userType: 'aluno' | 'professor' | 'admin'
  createdAt: string
}

export interface SessionData {
  user: UserProfile
  accessToken: string
  refreshToken: string
  expiresAt: number
}

// Tipos de Conquistas
export interface Achievement {
  id: string
  nome: string
  descricao: string
  icone: string
  categoria: string
  pontosRecompensa: number
  raridade: 'comum' | 'raro' | 'epico' | 'lendario'
  visivel: boolean
  createdAt: string
}

export interface UserAchievement {
  id: string
  userId: string
  achievementId: string
  unlockedAt: string
  achievement?: Achievement
}

export interface AchievementStats {
  total: number
  unlocked: number
  totalPoints: number
  byCategory: Record<string, number>
  byRarity: Record<string, number>
}

// Tipos de Portfólios
export interface Portfolio {
  id: string
  userId: string
  titulo: string
  descricao: string
  tipo: string
  status: 'rascunho' | 'submetido' | 'em_avaliacao' | 'avaliado'
  notaFinal?: number
  feedback?: string
  createdAt: string
  updatedAt: string
}

export interface PortfolioItem {
  id: string
  portfolioId: string
  titulo: string
  descricao: string
  tipo: string
  conteudo: any
  ordem: number
  createdAt: string
}

export interface PortfolioSubmission {
  id: string
  portfolioId: string
  submittedAt: string
  evaluatedAt?: string
  feedback?: string
  nota?: number
}

// Tipos de Desafios
export interface Desafio {
  id: string
  titulo: string
  descricao: string
  tipo: string
  nivel: 'facil' | 'medio' | 'dificil'
  pontos: number
  ativo: boolean
  createdAt: string
}

export interface DesafioSubmission {
  id: string
  userId: string
  desafioId: string
  submissionData: any
  status: 'pendente' | 'aprovado' | 'rejeitado'
  feedback?: string
  submittedAt: string
  reviewedAt?: string
}

export interface DesafioStats {
  total: number
  submetidos: number
  aprovados: number
  pontosGanhos: number
}

// Tipos de Instrumentos
export interface Instrumento {
  id: string
  nome: string
  categoria: string
  descricao: string
  nivelDificuldade: 'iniciante' | 'intermediario' | 'avancado'
  imagemUrl: string
  videoIntroUrl: string
  recursosAprendizado: any
  createdAt: string
}

export interface InstrumentoAluno {
  id: string
  alunoId: string
  instrumentoId: string
  dataInicio: string
  progressoPorcentagem: number
  tempoPraticaMinutos: number
  nivelAtual: string
  tecnicasDominadas: string[]
  observacoes: string
  ultimaPratica: string
  atualizadoEm: string
}

// Tipos de Turmas
export interface Turma {
  id: string
  nome: string
  descricao: string
  professorId: string
  dataInicio: string
  dataFim?: string
  ativo: boolean
  createdAt: string
}

export interface TurmaAluno {
  id: string
  turmaId: string
  alunoId: string
  dataIngresso: string
  status: 'ativo' | 'inativo' | 'concluido'
  notas?: any
}

// Tipos de Notificações
export interface Notificacao {
  id: string
  userId: string
  titulo: string
  mensagem: string
  tipo: 'info' | 'sucesso' | 'aviso' | 'erro'
  lida: boolean
  dataEnvio: string
  dataLeitura?: string
  metadata?: any
}

// Tipos de Resposta da API
export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

// Tipos de Filtros
export interface BaseFilter {
  limit?: number
  offset?: number
  orderBy?: string
  orderDirection?: 'asc' | 'desc'
}

export interface DesafioFilter extends BaseFilter {
  nivel?: 'facil' | 'medio' | 'dificil'
  tipo?: string
  ativo?: boolean
}

export interface PortfolioFilter extends BaseFilter {
  status?: 'rascunho' | 'submetido' | 'em_avaliacao' | 'avaliado'
  tipo?: string
}

export interface InstrumentoFilter extends BaseFilter {
  categoria?: string
  nivel?: 'iniciante' | 'intermediario' | 'avancado'
  termo?: string
}