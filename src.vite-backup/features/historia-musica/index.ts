// 🎼 EXPORTS CENTRALIZADOS - FEATURE HISTÓRIA DA MÚSICA
// ===================================================
// Barrel exports para facilitar importação dos componentes

// Hooks
export { useHistoriaMusica } from './hooks/useHistoriaMusica'
export { useAudioPlayer } from './hooks/useAudioPlayer'

// Páginas principais
export { default as HistoriaMusicaHome } from './pages/HistoriaMusicaHome'

// Tipos re-exportados para conveniência
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
  StatusAudio,
  UseHistoriaMusicaReturn,
  UseAudioPlayerReturn
} from '@/services'