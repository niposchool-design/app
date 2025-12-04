// src/features/alunos/components/PortfolioCard.tsx
import { Calendar, Eye, Lock, Users, Globe } from 'lucide-react'
import { formatDate } from '@/lib/utils/formatters'

interface Portfolio {
  id: string
  titulo: string
  descricao: string
  tipo: 'projeto' | 'pesquisa' | 'performance' | 'outro'
  status: 'em_andamento' | 'concluido' | 'arquivado'
  visibilidade: 'privado' | 'turma' | 'publico'
  created_at: string
  updated_at: string
  evidencias_count?: number
}

interface PortfolioCardProps {
  portfolio: Portfolio
  onClick?: () => void
  showActions?: boolean
}

export function PortfolioCard({ portfolio, onClick, showActions = true }: PortfolioCardProps) {
  const getStatusColor = (status: Portfolio['status']) => {
    switch (status) {
      case 'em_andamento':
        return 'bg-yellow-100 text-yellow-800'
      case 'concluido':
        return 'bg-green-100 text-green-800'
      case 'arquivado':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: Portfolio['status']) => {
    switch (status) {
      case 'em_andamento':
        return 'Em Andamento'
      case 'concluido':
        return 'Concluído'
      case 'arquivado':
        return 'Arquivado'
      default:
        return status
    }
  }

  const getTipoLabel = (tipo: Portfolio['tipo']) => {
    switch (tipo) {
      case 'projeto':
        return 'Projeto'
      case 'pesquisa':
        return 'Pesquisa'
      case 'performance':
        return 'Performance'
      case 'outro':
        return 'Outro'
      default:
        return tipo
    }
  }

  const getVisibilityIcon = (visibilidade: Portfolio['visibilidade']) => {
    switch (visibilidade) {
      case 'privado':
        return <Lock className="w-4 h-4" />
      case 'turma':
        return <Users className="w-4 h-4" />
      case 'publico':
        return <Globe className="w-4 h-4" />
      default:
        return <Lock className="w-4 h-4" />
    }
  }

  return (
    <div 
      className={`
        bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200
        ${onClick ? 'cursor-pointer hover:border-indigo-300' : ''}
      `}
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
            {portfolio.titulo}
          </h3>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span className="capitalize">{getTipoLabel(portfolio.tipo)}</span>
            <span>•</span>
            <div className="flex items-center space-x-1">
              {getVisibilityIcon(portfolio.visibilidade)}
              <span className="capitalize">{portfolio.visibilidade}</span>
            </div>
          </div>
        </div>
        
        <span className={`
          inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
          ${getStatusColor(portfolio.status)}
        `}>
          {getStatusLabel(portfolio.status)}
        </span>
      </div>

      {/* Descrição */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {portfolio.descricao}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>Criado em {formatDate(new Date(portfolio.created_at))}</span>
          </div>
          
          {portfolio.evidencias_count !== undefined && (
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>
                {portfolio.evidencias_count} {portfolio.evidencias_count === 1 ? 'evidência' : 'evidências'}
              </span>
            </div>
          )}
        </div>

        {showActions && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              // Handle edit action
            }}
            className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
          >
            Ver detalhes
          </button>
        )}
      </div>
    </div>
  )
}

export default PortfolioCard