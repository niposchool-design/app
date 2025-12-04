import React from 'react'
import { 
  Users, 
  FileText, 
  Calendar, 
  BookOpen, 
  Clock, 
  CheckCircle, 
  Music,
  Award,
  Star,
  TrendingUp
} from 'lucide-react'
import { NipoCard, NipoCardBody, NipoCardStat } from '../../../components/shared/NipoCard'
import { NipoButton } from '../../../components/shared/NipoButton'

export const ProfessorDashboard: React.FC = () => {
  const stats = {
    totalTurmas: 5,
    totalAlunos: 48,
    submissoesPendentes: 12,
    aulasSemana: 8
  }

  const submissoesPendentes = [
    { 
      id: 1, 
      aluno: 'Yuki Tanaka', 
      desafio: 'Técnicas de Shamisen', 
      tempo: '2 dias atrás',
      urgencia: 'alta'
    },
    { 
      id: 2, 
      aluno: 'Kenji Suzuki', 
      desafio: 'História do Koto', 
      tempo: '3 dias atrás',
      urgencia: 'media'
    }
  ]

  const getUrgenciaColor = (urgencia: string) => {
    switch (urgencia) {
      case 'alta': return 'bg-red-100 text-red-800'
      case 'media': return 'bg-yellow-100 text-yellow-800'
      case 'baixa': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sakura-50 to-cherry-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            👨‍🏫 <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Dashboard do Sensei
            </span>
          </h1>
          <p className="text-gray-600">
            先生 (Sensei) - Portal do educador musical japonês
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <NipoCardStat
            label="Minhas Turmas"
            value={stats.totalTurmas.toString()}
            icon={<Users className="w-6 h-6" />}
            trend="neutral"
          />
          <NipoCardStat
            label="Total de Alunos"
            value={stats.totalAlunos.toString()}
            icon={<Users className="w-6 h-6" />}
            trend="up"
            trendValue="+3 este mês"
          />
          <NipoCardStat
            label="Avaliações Pendentes"
            value={stats.submissoesPendentes.toString()}
            icon={<FileText className="w-6 h-6" />}
            trend="down"
            trendValue="-2 desde ontem"
          />
          <NipoCardStat
            label="Aulas Esta Semana"
            value={stats.aulasSemana.toString()}
            icon={<Calendar className="w-6 h-6" />}
            trend="neutral"
          />
        </div>

        <NipoCard title="📝 Avaliações Pendentes">
          <NipoCardBody>
            <div className="space-y-4">
              {submissoesPendentes.map((submissao) => (
                <div key={submissao.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{submissao.aluno}</h4>
                      <p className="text-sm text-gray-600">{submissao.desafio}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{submissao.tempo}</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${getUrgenciaColor(submissao.urgencia)}`}>
                          {submissao.urgencia}
                        </span>
                      </div>
                    </div>
                  </div>
                  <NipoButton size="sm">
                    Avaliar
                  </NipoButton>
                </div>
              ))}
            </div>
          </NipoCardBody>
        </NipoCard>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <NipoCard className="hover:shadow-lg transition-shadow cursor-pointer">
            <NipoCardBody>
              <div className="text-center">
                <Music className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Minhas Turmas</h3>
                <p className="text-sm text-gray-600 mb-3">Gerenciar alunos e atividades</p>
                <NipoButton size="sm" fullWidth>
                  Acessar
                </NipoButton>
              </div>
            </NipoCardBody>
          </NipoCard>

          <NipoCard className="hover:shadow-lg transition-shadow cursor-pointer">
            <NipoCardBody>
              <div className="text-center">
                <BookOpen className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Materiais</h3>
                <p className="text-sm text-gray-600 mb-3">Criar e organizar conteúdos</p>
                <NipoButton size="sm" fullWidth variant="outline">
                  Gerenciar
                </NipoButton>
              </div>
            </NipoCardBody>
          </NipoCard>

          <NipoCard className="hover:shadow-lg transition-shadow cursor-pointer">
            <NipoCardBody>
              <div className="text-center">
                <Award className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Conquistas</h3>
                <p className="text-sm text-gray-600 mb-3">Definir metas e prêmios</p>
                <NipoButton size="sm" fullWidth variant="outline">
                  Configurar
                </NipoButton>
              </div>
            </NipoCardBody>
          </NipoCard>

          <NipoCard className="hover:shadow-lg transition-shadow cursor-pointer">
            <NipoCardBody>
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-purple-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Relatórios</h3>
                <p className="text-sm text-gray-600 mb-3">Acompanhar progresso</p>
                <NipoButton size="sm" fullWidth variant="outline">
                  Visualizar
                </NipoButton>
              </div>
            </NipoCardBody>
          </NipoCard>
        </div>

        <div className="text-center p-6 bg-gradient-to-r from-blue-100 to-teal-100 rounded-2xl">
          <p className="text-gray-700 italic">
            "先生 (Sensei) - Aquele que nasceu antes, guia o caminho com sabedoria e paciência"
          </p>
        </div>

      </div>
    </div>
  )
}