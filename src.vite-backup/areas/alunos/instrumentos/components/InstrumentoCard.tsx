/**
 * 🎵 INSTRUMENTO CARD - NIPO SCHOOL
 * 
 * Componente para exibir cards de instrumentos conforme blueprint
 */

import React from 'react'
import { Heart, Music, Clock, Star, Play, Volume2 } from 'lucide-react'

interface Instrumento {
  id: string
  nome: string
  descricao: string
  categoria: string
  origem: string
  dificuldade?: string
  popularidade?: number
  imagem_url?: string
}

interface InstrumentoCardProps {
  instrumento: Instrumento
  isFavorite?: boolean
  isMyInstrument?: boolean
  hasAudio?: boolean
  hasVideo?: boolean
  onToggleFavorite?: (id: string) => void
  onAddToMyInstruments?: (id: string) => void
  onPlayAudio?: (id: string) => void
  onViewDetails?: (id: string) => void
  className?: string
}

export function InstrumentoCard({
  instrumento,
  isFavorite = false,
  isMyInstrument = false,
  hasAudio = false,
  hasVideo = false,
  onToggleFavorite,
  onAddToMyInstruments,
  onPlayAudio,
  onViewDetails,
  className = ''
}: InstrumentoCardProps) {
  const dificuldadeColors = {
    'Fácil': 'text-green-600 bg-green-100',
    'Médio': 'text-yellow-600 bg-yellow-100',
    'Difícil': 'text-red-600 bg-red-100'
  }

  return (
    <div className={`
      bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200
      ${className}
    `}>
      {/* Imagem */}
      <div className="relative aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
        {instrumento.imagem_url ? (
          <img
            src={instrumento.imagem_url}
            alt={instrumento.nome}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Music className="w-12 h-12 text-gray-400" />
          </div>
        )}

        {/* Badges de mídia */}
        <div className="absolute top-2 left-2 flex gap-1">
          {hasAudio && (
            <div className="bg-green-500 text-white p-1 rounded-full">
              <Volume2 className="w-3 h-3" />
            </div>
          )}
          {hasVideo && (
            <div className="bg-blue-500 text-white p-1 rounded-full">
              <Play className="w-3 h-3" />
            </div>
          )}
        </div>

        {/* Favorito */}
        <button
          onClick={() => onToggleFavorite?.(instrumento.id)}
          className={`
            absolute top-2 right-2 p-2 rounded-full transition-colors
            ${isFavorite 
              ? 'bg-red-500 text-white' 
              : 'bg-white/80 text-gray-600 hover:bg-white'
            }
          `}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Conteúdo */}
      <div className="p-4">
        {/* Cabeçalho */}
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
            {instrumento.nome}
          </h3>
          {isMyInstrument && (
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
              Meu
            </span>
          )}
        </div>

        {/* Metadados */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
            {instrumento.categoria}
          </span>
          {instrumento.dificuldade && (
            <span className={`
              text-xs px-2 py-1 rounded font-medium
              ${dificuldadeColors[instrumento.dificuldade as keyof typeof dificuldadeColors] || 'text-gray-600 bg-gray-100'}
            `}>
              {instrumento.dificuldade}
            </span>
          )}
        </div>

        {/* Origem */}
        <p className="text-sm text-gray-600 mb-3">
          Origem: {instrumento.origem}
        </p>

        {/* Descrição */}
        <p className="text-gray-700 text-sm mb-4 line-clamp-2">
          {instrumento.descricao}
        </p>

        {/* Popularidade */}
        {instrumento.popularidade && (
          <div className="flex items-center gap-1 mb-4">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="text-sm text-gray-600">
              {instrumento.popularidade}/5
            </span>
          </div>
        )}

        {/* Ações */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            {hasAudio && (
              <button
                onClick={() => onPlayAudio?.(instrumento.id)}
                className="text-green-600 hover:text-green-700 p-1"
                title="Reproduzir áudio"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            )}
            
            <button
              onClick={() => onViewDetails?.(instrumento.id)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Ver Detalhes
            </button>
          </div>

          {!isMyInstrument && (
            <button
              onClick={() => onAddToMyInstruments?.(instrumento.id)}
              className="bg-blue-500 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-600 transition-colors"
            >
              Adicionar
            </button>
          )}

          {isMyInstrument && (
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>Praticando</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default InstrumentoCard