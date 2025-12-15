/**
 * ✅ AVALIAÇÕES PAGE - Área dos Professores
 * 
 * Lista de submissões de alunos pendentes de avaliação
 * Permite avaliar trabalhos, dar feedback e atribuir notas
 */

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  FileText, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  Eye,
  Star,
  Filter
} from 'lucide-react'
import { NipoCard, NipoCardBody, NipoCardStat } from '../../../components/shared/NipoCard'
import { NipoButton } from '../../../components/shared/NipoButton'

interface Submissao {
  id: string
  aluno: {
    nome: string
    avatar?: string
  }
  desafio: string
  tipo: 'portfolio' | 'desafio'
  data_submissao: string
  urgencia: 'alta' | 'media' | 'baixa'
  status: 'pendente' | 'em_avaliacao' | 'avaliado'
}

export const AvaliacoesPage: React.FC = () => {
  const [filtro, setFiltro] = useState<'todos' | 'pendente' | 'em_avaliacao' | 'avaliado'>('pendente')

  // Mock data
  const submissoes: Submissao[] = [
    {
      id: '1',
      aluno: { nome: 'Yuki Tanaka' },
      desafio: 'Técnicas de Shamisen - Nível 1',
      tipo: 'desafio',
      data_submissao: '2024-12-03T10:00:00',
      urgencia: 'alta',
      status: 'pendente'
    },
    {
      id: '2',
      aluno: { nome: 'Kenji Suzuki' },
      desafio: 'História do Koto',
      tipo: 'portfolio',
      data_submissao: '2024-12-02T14:30:00',
      urgencia: 'media',
      status: 'pendente'
    },
    {
      id: '3',
      aluno: { nome: 'Sakura Yamamoto' },
      desafio: 'Composição Musical',
      tipo: 'portfolio',
      data_submissao: '2024-12-01T16:00:00',
      urgencia: 'baixa',
      status: 'em_avaliacao'
    }
  ]

  const getUrgenciaColor = (urgencia: Submissao['urgencia']) => {
    switch (urgencia) {
      case 'alta':
        return 'bg-red-100 text-red-800'
      case 'media':
        return 'bg-yellow-100 text-yellow-800'
      case 'baixa':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getUrgenciaIcon = (urgencia: Submissao['urgencia']) => {
    switch (urgencia) {
      case 'alta':
        return <AlertTriangle className="w-4 h-4" />
      case 'media':
        return <Clock className="w-4 h-4" />
      case 'baixa':
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: Submissao['status']) => {
    switch (status) {
      case 'pendente':
        return 'bg-orange-100 text-orange-800'
      case 'em_avaliacao':
        return 'bg-blue-100 text-blue-800'
      case 'avaliado':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: Submissao['status']) => {
    switch (status) {
      case 'pendente':
        return 'Pendente'
      case 'em_avaliacao':
        return 'Em Avaliação'
      case 'avaliado':
        return 'Avaliado'
      default:
        return status
    }
  }

  const getTempoDecorrido = (data: string) => {
    const diff = Date.now() - new Date(data).getTime()
    const dias = Math.floor(diff / (1000 * 60 * 60 * 24))
    const horas = Math.floor(diff / (1000 * 60 * 60))
    
    if (dias > 0) return `${dias} dia${dias > 1 ? 's' : ''} atrás`
    if (horas > 0) return `${horas} hora${horas > 1 ? 's' : ''} atrás`
    return 'Agora mesmo'
  }

  const submissoesFiltradas = filtro === 'todos' 
    ? submissoes 
    : submissoes.filter(s => s.status === filtro)

  const stats = {
    pendentes: submissoes.filter(s => s.status === 'pendente').length,
    emAvaliacao: submissoes.filter(s => s.status === 'em_avaliacao').length,
    avaliados: submissoes.filter(s => s.status === 'avaliado').length,
    urgentes: submissoes.filter(s => s.urgencia === 'alta').length
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sakura-50 to-cherry-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            ✅ Avaliações Pendentes
          </h1>
          <p className="text-gray-600 mt-1">
            Avalie submissões de alunos e forneça feedback construtivo
          </p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <NipoCardStat
            label="Pendentes"
            value={stats.pendentes.toString()}
            icon={<Clock className="w-6 h-6" />}
            trend="neutral"
          />
          <NipoCardStat
            label="Em Avaliação"
            value={stats.emAvaliacao.toString()}
            icon={<FileText className="w-6 h-6" />}
            trend="neutral"
          />
          <NipoCardStat
            label="Avaliados Hoje"
            value={stats.avaliados.toString()}
            icon={<CheckCircle className="w-6 h-6" />}
            trend="up"
            trendValue="+5 hoje"
          />
          <NipoCardStat
            label="Urgentes"
            value={stats.urgentes.toString()}
            icon={<AlertTriangle className="w-6 h-6" />}
            trend="down"
            trendValue="-2 desde ontem"
          />
        </div>

        {/* Filtros */}
        <NipoCard>
          <NipoCardBody>
            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-gray-600" />
              <div className="flex gap-2">
                {[
                  { value: 'todos', label: 'Todos' },
                  { value: 'pendente', label: 'Pendentes' },
                  { value: 'em_avaliacao', label: 'Em Avaliação' },
                  { value: 'avaliado', label: 'Avaliados' }
                ].map((f) => (
                  <button
                    key={f.value}
                    onClick={() => setFiltro(f.value as any)}
                    className={`
                      px-4 py-2 rounded-lg font-medium text-sm transition-colors
                      ${filtro === f.value
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                    `}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </NipoCardBody>
        </NipoCard>

        {/* Lista de Submissões */}
        <div className="space-y-4">
          {submissoesFiltradas.length === 0 ? (
            <NipoCard>
              <NipoCardBody>
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Nenhuma submissão para avaliar
                  </h3>
                  <p className="text-gray-600">
                    {filtro === 'pendente' 
                      ? 'Ótimo trabalho! Você está em dia com as avaliações.'
                      : 'Nenhuma submissão encontrada neste filtro.'}
                  </p>
                </div>
              </NipoCardBody>
            </NipoCard>
          ) : (
            submissoesFiltradas.map((submissao) => (
              <NipoCard key={submissao.id}>
                <NipoCardBody>
                  <div className="flex items-start justify-between gap-4">
                    
                    {/* Informações */}
                    <div className="flex items-start gap-4 flex-1">
                      {/* Avatar */}
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                        {submissao.aluno.nome.charAt(0)}
                      </div>

                      {/* Detalhes */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {submissao.aluno.nome}
                          </h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded flex items-center gap-1 ${getStatusColor(submissao.status)}`}>
                            {getStatusLabel(submissao.status)}
                          </span>
                          <span className={`px-2 py-1 text-xs font-medium rounded flex items-center gap-1 ${getUrgenciaColor(submissao.urgencia)}`}>
                            {getUrgenciaIcon(submissao.urgencia)}
                            {submissao.urgencia}
                          </span>
                        </div>

                        <p className="text-gray-700 font-medium mb-1">
                          {submissao.desafio}
                        </p>

                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {getTempoDecorrido(submissao.data_submissao)}
                          </span>
                          <span>•</span>
                          <span className="capitalize">{submissao.tipo}</span>
                        </div>
                      </div>
                    </div>

                    {/* Ações */}
                    <div className="flex items-center gap-2">
                      <Link to={`/professores/avaliacoes/${submissao.id}`}>
                        <NipoButton variant="primary">
                          <Eye className="w-4 h-4 mr-2" />
                          Avaliar
                        </NipoButton>
                      </Link>
                    </div>

                  </div>
                </NipoCardBody>
              </NipoCard>
            ))
          )}
        </div>

      </div>
    </div>
  )
}

export default AvaliacoesPage
