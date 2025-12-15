// 🎼 TIPOS PARA HISTÓRIA DA MÚSICA - NIPO SCHOOL
// ===============================================
// Tipos e interfaces para o módulo de História da Música

import { Database } from '@/lib/supabase/database.types'

// Tipos base das tabelas
export type PeriodoHistorico = Database['public']['Tables']['historia_periodos']['Row']
export type CompositorMusica = Database['public']['Tables']['historia_compositores']['Row']
export type ObraMusical = Database['public']['Tables']['historia_obras']['Row']
export type EventoTimeline = Database['public']['Tables']['historia_eventos_timeline']['Row']

// Tipos para inserção
export type PeriodoInsert = Database['public']['Tables']['historia_periodos']['Insert']
export type CompositorInsert = Database['public']['Tables']['historia_compositores']['Insert']
export type ObraInsert = Database['public']['Tables']['historia_obras']['Insert']
export type EventoInsert = Database['public']['Tables']['historia_eventos_timeline']['Insert']

// Tipos para atualização
export type PeriodoUpdate = Database['public']['Tables']['historia_periodos']['Update']
export type CompositorUpdate = Database['public']['Tables']['historia_compositores']['Update']
export type ObraUpdate = Database['public']['Tables']['historia_obras']['Update']
export type EventoUpdate = Database['public']['Tables']['historia_eventos_timeline']['Update']

// ========================================
// 📅 INTERFACES ESTENDIDAS E DETALHADAS
// ========================================

export interface CompositorDetalhado extends CompositorMusica {
  periodo?: PeriodoHistorico
  obras?: ObraMusical[]
  totalObras?: number
  obrasPopulares?: ObraMusical[]
}

export interface ObraDetalhada extends ObraMusical {
  compositor?: CompositorMusica
  periodo?: PeriodoHistorico
  popularidadeTexto?: string
  duracaoFormatada?: string
}

export interface EventoTimelineDetalhado extends EventoTimeline {
  compositor?: CompositorMusica
  obra?: ObraMusical
  periodo?: PeriodoHistorico
  dataFormatada?: string
  iconeCategoria?: string
}

export interface PeriodoDetalhado extends PeriodoHistorico {
  totalCompositores?: number
  totalObras?: number
  compositoresDestaque?: CompositorMusica[]
  obrasPopulares?: ObraMusical[]
  eventosImportantes?: EventoTimeline[]
}

// ========================================
// 🔍 INTERFACES PARA FILTROS E BUSCA
// ========================================

export interface FiltroCompositores {
  periodoId?: string
  paisNascimento?: string
  nivelImportancia?: number
  dataInicio?: string
  dataFim?: string
  limit?: number
}

export interface FiltroObras {
  compositorId?: string
  periodoId?: string
  tipoObra?: 'sinfonia' | 'concerto' | 'sonata' | 'fuga' | 'preludio' | 'valsa' | 'nocturno' | 'etude' | 'rondo' | 'variacao' | 'suite' | 'outro'
  genero?: string
  nivelDificuldade?: 1 | 2 | 3 | 4 | 5
  temAudio?: boolean
  popularidadeMinima?: number
  limit?: number
}

export interface FiltroTimeline {
  anoInicio?: number
  anoFim?: number
  categoria?: 'nascimento' | 'falecimento' | 'composicao' | 'estreia' | 'publicacao' | 'evento_historico' | 'movimento_artistico' | 'inovacao_tecnica' | 'outro'
  importanciaMinima?: number
  periodoId?: string
  compositorId?: string
  limit?: number
}

export interface ParametrosBusca {
  termo: string
  tipos?: ('periodos' | 'compositores' | 'obras')[]
  limite?: number
  filtros?: {
    periodo?: string
    categoria?: string
    nivelImportancia?: number
  }
}

// ========================================
// 📊 INTERFACES PARA ESTATÍSTICAS
// ========================================

export interface EstatisticasHistoria {
  totalPeriodos: number
  totalCompositores: number
  totalObras: number
  eventosPrincipais: number
  periodoMaisPopular: string
  compositorMaisObras: string
  obraMaisPopular: string
  distribuicaoPorPeriodo: {
    periodo: string
    compositores: number
    obras: number
  }[]
  timeline: {
    ano: number
    eventos: number
  }[]
}

export interface RecomendacoesPeriodo {
  compositoresDestaque: CompositorMusica[]
  obrasEssenciais: ObraDetalhada[]
  eventosCruciais: EventoTimelineDetalhado[]
  curiosidades: string[]
  recursosExtras: {
    tipo: 'audio' | 'video' | 'artigo' | 'imagem'
    titulo: string
    url: string
    descricao?: string
  }[]
}

// ========================================
// 🎵 INTERFACES PARA FUNCIONALIDADES DE ÁUDIO
// ========================================

export interface PlaylistPeriodo {
  id: string
  nome: string
  periodoId: string
  periodo: PeriodoHistorico
  obras: ObraDetalhada[]
  duracaoTotal: number
  popularidade: number
  criadoEm: string
}

export interface StatusAudio {
  obraAtual?: ObraDetalhada
  isPlaying: boolean
  posicao: number
  duracao: number
  volume: number
  playlist: ObraDetalhada[]
  indiceAtual: number
  modoRepeticao: 'none' | 'single' | 'playlist'
  aleatorio: boolean
}

// ========================================
// 🎯 INTERFACES PARA COMPONENTES DE UI
// ========================================

export interface PropsTimelineInterativa {
  eventos: EventoTimelineDetalhado[]
  anoInicio?: number
  anoFim?: number
  filtroCategoria?: string
  onEventoSelecionado?: (evento: EventoTimelineDetalhado) => void
  highlightEvento?: string
  modoVisualizacao?: 'linear' | 'circular' | 'grade'
}

export interface PropsCardCompositor {
  compositor: CompositorDetalhado
  mostrarObras?: boolean
  tamanho?: 'pequeno' | 'medio' | 'grande'
  onClicar?: (compositor: CompositorDetalhado) => void
  destacado?: boolean
}

export interface PropsPlayerObra {
  obra: ObraDetalhada
  autoPlay?: boolean
  mostrarControles?: boolean
  onFinalizacao?: () => void
  onPopularidadeIncremento?: () => void
}

// ========================================
// 🎨 INTERFACES PARA PERSONALIZAÇÃO VISUAL
// ========================================

export interface TemaVisualPeriodo {
  corPrimaria: string
  corSecundaria: string
  corTexto: string
  corFundo: string
  gradiente: string
  fonte: string
  icone: string
  padraoDecoracoes: string
}

export interface ConfiguracaoExibicao {
  mostrarImagens: boolean
  mostrarAudio: boolean
  mostrarDatas: boolean
  mostrarPopularidade: boolean
  formatoData: 'completa' | 'ano' | 'seculo'
  ordenacao: 'cronologica' | 'popularidade' | 'alfabetica'
  itensPerPagina: number
  modoVisualizacao: 'lista' | 'grade' | 'timeline'
}

// ========================================
// ⚡ TIPOS AUXILIARES
// ========================================

export type CategoriaEvento = EventoTimeline['categoria']
export type TipoObra = ObraMusical['tipo_obra']
export type NivelDificuldade = 1 | 2 | 3 | 4 | 5
export type NivelImportancia = 1 | 2 | 3 | 4 | 5

export type ResultadoBusca = {
  periodos: PeriodoHistorico[]
  compositores: CompositorDetalhado[]
  obras: ObraDetalhada[]
  total: number
  tempoResposta: number
}

export type StatusCarregamento = 'idle' | 'carregando' | 'sucesso' | 'erro'

// ========================================
// 🎯 INTERFACES PARA HOOKS PERSONALIZADOS
// ========================================

export interface UseHistoriaMusicaReturn {
  // Estado
  periodos: PeriodoHistorico[]
  compositores: CompositorDetalhado[]
  obras: ObraDetalhada[]
  eventos: EventoTimelineDetalhado[]
  estatisticas: EstatisticasHistoria | null
  
  // Status
  carregando: boolean
  erro: string | null
  cache: number
  
  // Ações
  carregarPeriodos: () => Promise<void>
  carregarCompositores: (filtros?: FiltroCompositores) => Promise<void>
  carregarObras: (filtros?: FiltroObras) => Promise<void>
  carregarTimeline: (filtros?: FiltroTimeline) => Promise<void>
  carregarEstatisticas: () => Promise<void>
  buscarConteudo: (termo: string) => Promise<ResultadoBusca>
  
  // Limpeza
  limparDados: () => void
  resetarErro: () => void
  limparCache: (chaves?: string[]) => void
}

export interface UseAudioPlayerReturn {
  // Estado do player
  status: StatusAudio
  
  // Controles
  play: (obra?: ObraDetalhada) => void
  pause: () => void
  stop: () => void
  anterior: () => void
  proximo: () => void
  
  // Configurações
  definirVolume: (volume: number) => void
  definirPosicao: (posicao: number) => void
  alternarModoAleatorio: () => void
  alternarModoRepeticao: () => void
  
  // Playlist
  adicionarPlaylist: (obras: ObraDetalhada[]) => void
  removerDaPlaylist: (indice: number) => void
  limparPlaylist: () => void
}

// ========================================
// 🎓 TIPOS PARA RECURSOS EDUCACIONAIS
// ========================================

export interface QuizPergunta {
  id: string
  pergunta: string
  opcoes: string[]
  respostaCorreta: number
  explicacao: string
  dificuldade: NivelDificuldade
  categoria: 'periodo' | 'compositor' | 'obra' | 'historia_geral'
  recursos?: {
    audioUrl?: string
    imagemUrl?: string
    textoComplementar?: string
  }
}

export interface AtividadeEducativa {
  id: string
  titulo: string
  descricao: string
  tipo: 'quiz' | 'timeline_interativa' | 'comparacao_obras' | 'identificacao_audio' | 'linha_tempo'
  nivelDificuldade: NivelDificuldade
  tempoEstimado: number
  pontuacaoMaxima: number
  prerequisitos?: string[]
  recursos: {
    perguntas?: QuizPergunta[]
    obras?: ObraDetalhada[]
    compositores?: CompositorDetalhado[]
    periodos?: PeriodoDetalhado[]
  }
}