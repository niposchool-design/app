// 🎯 SERVICES BARREL - NIPO SCHOOL
// ================================================
// Centralização de todos os services seguindo arquitetura do documento backend

// Services principais conforme documento
export { AuthService } from './auth/authService'
export { AchievementsService } from './achievements/achievementsService'
export { PortfoliosService } from './portfolios/portfoliosService'
export { DesafiosService } from './desafios/desafiosService'

// Services complementares
export { InstrumentosService } from './instrumentos/instrumentosService'
export { TurmasService } from './turmas/turmasService'
export { NotificacoesService } from './notificacoes/notificacoesService'

// Novo service - História da Música
export { HistoriaMusicaService } from './historia-musica/historiaMusicaService'

// Re-exports para compatibilidade
export type { 
  // Tipos de autenticação
  LoginCredentials,
  SignupData,
  UserProfile,
  SessionData,
  
  // Tipos de conquistas
  Achievement,
  UserAchievement,
  AchievementStats,
  
  // Tipos de portfólios
  Portfolio,
  PortfolioItem,
  PortfolioSubmission,
  
  // Tipos de desafios
  Desafio,
  DesafioSubmission,
  DesafioStats
} from './types'

// Re-exports específicos de História da Música
export type {
  PeriodoHistorico,
  CompositorMusica,
  ObraMusical,
  EventoTimeline,
  CompositorDetalhado,
  ObraDetalhada,
  EventoTimelineDetalhado,
  FiltroCompositores,
  FiltroObras,
  FiltroTimeline,
  EstatisticasHistoria,
  ResultadoBusca,
  UseHistoriaMusicaReturn,
  StatusAudio,
  UseAudioPlayerReturn
} from './historia-musica/types'
