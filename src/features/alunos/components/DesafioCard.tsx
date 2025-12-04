/**
 * 🎯 DESAFIO CARD - NIPO SCHOOL
 * 
 * Componente para exibir cards de desafios conforme blueprint
 */

import React from 'react'
import { Calendar, Clock, Star, Trophy, CheckCircle } from 'lucide-react'

interface Desafio {
  id: string
  titulo: string
  descricao: string
  tipo: string
  nivel: 'facil' | 'medio' | 'dificil'
  pontos: number
  created_at: string
}

interface DesafioCardProps {
  desafio: Desafio
  isCompleted?: boolean
  isSubmitted?: boolean
  onSubmit?: (desafioId: string) => void
  onView?: (desafioId: string) => void
  className?: string
}

export function DesafioCard({ 
  desafio, 
  isCompleted = false,
  isSubmitted = false,
  onSubmit, 
  onView,
  className = '' 
}: DesafioCardProps) {
  const nivelColors = {
    facil: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-700',
      badge: 'bg-green-100 text-green-800'
    },
    medio: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200', 
      text: 'text-yellow-700',
      badge: 'bg-yellow-100 text-yellow-800'
    },
    dificil: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-700',
      badge: 'bg-red-100 text-red-800'
    }
  }

  const nivelLabels = {
    facil: 'Fácil',
    medio: 'Médio',
    dificil: 'Difícil'
  }

  const colors = nivelColors[desafio.nivel]

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  return (
    <div className={`
      bg-white rounded-lg border-2 transition-all duration-200 hover:shadow-lg
      ${colors.bg} ${colors.border}
      ${isCompleted ? 'ring-2 ring-green-400' : ''}
      ${className}
    `}>
      <div className="p-6">
        {/* Cabeçalho */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
                {desafio.titulo}
              </h3>
              {isCompleted && (
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              )}
            </div>
            
            <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors.badge}`}>
                {nivelLabels[desafio.nivel]}
              </span>
              
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="font-medium">{desafio.pontos} pts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Descrição */}
        <p className="text-gray-700 mb-4 line-clamp-3">
          {desafio.descricao}
        </p>

        {/* Metadados */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>Criado em {formatDate(desafio.created_at)}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Trophy className="w-4 h-4" />
            <span>{desafio.tipo}</span>
          </div>
        </div>

        {/* Ações */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <button
            onClick={() => onView?.(desafio.id)}
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            Ver Detalhes
          </button>

          {!isCompleted && !isSubmitted && (
            <button
              onClick={() => onSubmit?.(desafio.id)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              Submeter
            </button>
          )}

          {isSubmitted && !isCompleted && (
            <span className="text-yellow-600 font-medium">
              Aguardando Avaliação
            </span>
          )}

          {isCompleted && (
            <span className="text-green-600 font-medium flex items-center gap-1">
              <CheckCircle className="w-4 h-4" />
              Concluído
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default DesafioCard