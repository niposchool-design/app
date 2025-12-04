// 🎼 BARREL EXPORTS - HISTÓRIA DA MÚSICA SERVICE
// ===============================================
// Exports centralizados para o módulo de História da Música

export { HistoriaMusicaService } from './historiaMusicaService'
export * from './types'

// Re-exports específicos mais usados
export type {
  PeriodoHistorico,
  CompositorMusica,
  ObraMusical,
  EventoTimeline,
  CompositorDetalhado,
  ObraDetalhada,
  EventoTimelineDetalhado,
  PeriodoDetalhado,
  FiltroCompositores,
  FiltroObras,
  FiltroTimeline,
  EstatisticasHistoria,
  RecomendacoesPeriodo,
  PlaylistPeriodo,
  StatusAudio,
  UseHistoriaMusicaReturn,
  UseAudioPlayerReturn
} from './types'