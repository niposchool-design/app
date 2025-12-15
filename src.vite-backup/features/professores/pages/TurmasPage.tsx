/**
 * 👥 TURMAS PAGE - Área dos Professores
 * 
 * Visualização de todas as turmas do professor
 * Com lista de alunos e estatísticas
 */

import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Users, 
  Calendar, 
  Clock, 
  TrendingUp,
  Eye,
  BarChart3
} from 'lucide-react'
import { NipoCard, NipoCardBody, NipoCardStat } from '../../../components/shared/NipoCard'
import { NipoButton } from '../../../components/shared/NipoButton'

interface Turma {
  id: string
  nome: string
  instrumento: string
  nivel: string
  total_alunos: number
  dia_semana: string
  horario: string
  status: 'ativa' | 'concluida' | 'pausada'
}

export const TurmasPage: React.FC = () => {
  // Mock data - substituir por dados reais
  const turmas: Turma[] = [
    {
      id: '1',
      nome: 'Shamisen Iniciante - Turma A',
      instrumento: 'Shamisen',
      nivel: 'Iniciante',
      total_alunos: 12,
      dia_semana: 'Segunda',
      horario: '14:00 - 16:00',
      status: 'ativa'
    },
    {
      id: '2',
      nome: 'Koto Intermediário',
      instrumento: 'Koto',
      nivel: 'Intermediário',
      total_alunos: 8,
      dia_semana: 'Quarta',
      horario: '16:00 - 18:00',
      status: 'ativa'
    },
    {
      id: '3',
      nome: 'Taiko Avançado',
      instrumento: 'Taiko',
      nivel: 'Avançado',
      total_alunos: 6,
      dia_semana: 'Sexta',
      horario: '18:00 - 20:00',
      status: 'ativa'
    }
  ]

  const getStatusColor = (status: Turma['status']) => {
    switch (status) {
      case 'ativa':
        return 'bg-green-100 text-green-800'
      case 'concluida':
        return 'bg-gray-100 text-gray-800'
      case 'pausada':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: Turma['status']) => {
    switch (status) {
      case 'ativa':
        return 'Ativa'
      case 'concluida':
        return 'Concluída'
      case 'pausada':
        return 'Pausada'
      default:
        return status
    }
  }

  const totalAlunos = turmas.reduce((acc, t) => acc + t.total_alunos, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-sakura-50 to-cherry-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            👥 Minhas Turmas
          </h1>
          <p className="text-gray-600 mt-1">
            Gerencie suas turmas e acompanhe o progresso dos alunos
          </p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <NipoCardStat
            label="Total de Turmas"
            value={turmas.length.toString()}
            icon={<Users className="w-6 h-6" />}
            trend="neutral"
          />
          <NipoCardStat
            label="Total de Alunos"
            value={totalAlunos.toString()}
            icon={<Users className="w-6 h-6" />}
            trend="up"
            trendValue="+3 este mês"
          />
          <NipoCardStat
            label="Turmas Ativas"
            value={turmas.filter(t => t.status === 'ativa').length.toString()}
            icon={<TrendingUp className="w-6 h-6" />}
            trend="neutral"
          />
          <NipoCardStat
            label="Média por Turma"
            value={Math.round(totalAlunos / turmas.length).toString()}
            icon={<BarChart3 className="w-6 h-6" />}
            trend="neutral"
          />
        </div>

        {/* Lista de Turmas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {turmas.map((turma) => (
            <NipoCard key={turma.id}>
              <NipoCardBody>
                <div className="space-y-4">
                  
                  {/* Header da Turma */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {turma.nome}
                        </h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(turma.status)}`}>
                          {getStatusLabel(turma.status)}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {turma.total_alunos} alunos
                        </span>
                        <span>•</span>
                        <span>{turma.nivel}</span>
                      </div>
                    </div>
                  </div>

                  {/* Informações */}
                  <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Instrumento</p>
                      <p className="text-sm font-medium text-gray-900">{turma.instrumento}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Dia da Semana</p>
                      <p className="text-sm font-medium text-gray-900 flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {turma.dia_semana}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-gray-600 mb-1">Horário</p>
                      <p className="text-sm font-medium text-gray-900 flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {turma.horario}
                      </p>
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="flex items-center gap-2">
                    <Link to={`/professores/turmas/${turma.id}`} className="flex-1">
                      <NipoButton variant="secondary" className="w-full">
                        <Eye className="w-4 h-4 mr-2" />
                        Ver Detalhes
                      </NipoButton>
                    </Link>
                    <Link to={`/professores/turmas/${turma.id}/alunos`} className="flex-1">
                      <NipoButton variant="primary" className="w-full">
                        <Users className="w-4 h-4 mr-2" />
                        Ver Alunos
                      </NipoButton>
                    </Link>
                  </div>

                </div>
              </NipoCardBody>
            </NipoCard>
          ))}
        </div>

        {/* Empty State */}
        {turmas.length === 0 && (
          <NipoCard>
            <NipoCardBody>
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Nenhuma turma encontrada
                </h3>
                <p className="text-gray-600">
                  Entre em contato com a administração para ser alocado em turmas
                </p>
              </div>
            </NipoCardBody>
          </NipoCard>
        )}

      </div>
    </div>
  )
}

export default TurmasPage
