import React from 'react'
import { 
  Users, 
  Music, 
  Trophy, 
  Activity, 
  Calendar,
  Shield,
  Database,
  BarChart3,
  Clock,
  CheckCircle,
  UserPlus
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { NipoCard, NipoCardBody, NipoCardStat } from '../../../components/shared/NipoCard'
import { NipoButton } from '../../../components/shared/NipoButton'

export const AdminDashboard: React.FC = () => {
  const stats = {
    totalUsuarios: 156,
    totalInstrumentos: 12,
    totalConquistas: 45,
    turmasAtivas: 18,
    aulasMes: 234
  }

  const atividadeRecente = [
    { 
      id: 1, 
      descricao: 'Novo aluno cadastrado: Yuki Tanaka', 
      tempo: '5 min atrás',
      icone: <UserPlus className="w-5 h-5 text-green-600" />
    },
    { 
      id: 2, 
      descricao: 'Nova conquista desbloqueada por 3 alunos', 
      tempo: '1 hora atrás',
      icone: <Trophy className="w-5 h-5 text-yellow-600" />
    }
  ]

  const usuariosRecentes = [
    { 
      id: 1, 
      nome: 'Yuki Tanaka', 
      role: 'Aluno', 
      status: 'Ativo',
      cadastro: '2024-01-15'
    },
    { 
      id: 2, 
      nome: 'Prof. Kenji Suzuki', 
      role: 'Professor', 
      status: 'Ativo',
      cadastro: '2024-01-14'
    }
  ]

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Admin': return 'bg-red-100 text-red-800'
      case 'Professor': return 'bg-blue-100 text-blue-800'
      case 'Aluno': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sakura-50 to-cherry-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🏛️ <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Centro de Controle Admin
            </span>
          </h1>
          <p className="text-gray-600">
            管理 (Kanri) - Gerenciamento completo do sistema Nipo School
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-sm text-gray-600">Sistema Online - Tudo funcionando</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <NipoCardStat
            label="Usuários Totais"
            value={stats.totalUsuarios.toString()}
            icon={<Users className="w-6 h-6" />}
            trend="up"
            trendValue="+12 este mês"
          />
          <NipoCardStat
            label="Instrumentos"
            value={stats.totalInstrumentos.toString()}
            icon={<Music className="w-6 h-6" />}
            trend="neutral"
          />
          <NipoCardStat
            label="Conquistas"
            value={stats.totalConquistas.toString()}
            icon={<Trophy className="w-6 h-6" />}
            trend="up"
            trendValue="+3 esta semana"
          />
          <NipoCardStat
            label="Turmas Ativas"
            value={stats.turmasAtivas.toString()}
            icon={<Activity className="w-6 h-6" />}
            trend="up"
            trendValue="+2 esta semana"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          
          <NipoCard title="📊 Atividade Recente" className="lg:col-span-2">
            <NipoCardBody>
              <div className="space-y-4">
                {atividadeRecente.map((atividade) => (
                  <div key={atividade.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      {atividade.icone}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-medium">{atividade.descricao}</p>
                      <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                        <Clock className="w-3 h-3" />
                        {atividade.tempo}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </NipoCardBody>
          </NipoCard>

          <NipoCard title="⚡ Ações Rápidas">
            <NipoCardBody>
              <div className="space-y-3">
                <NipoButton fullWidth className="justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Gerenciar Usuários
                </NipoButton>
                
                <NipoButton fullWidth variant="outline" className="justify-start">
                  <Music className="w-4 h-4 mr-2" />
                  Instrumentos
                </NipoButton>
                
                <div className="pt-3 border-t border-gray-200">
                  <Link to="/admin/database">
                    <NipoButton fullWidth variant="outline" className="justify-start text-indigo-600">
                      <Database className="w-4 h-4 mr-2" />
                      Admin Banco
                    </NipoButton>
                  </Link>
                </div>
              </div>
            </NipoCardBody>
          </NipoCard>

        </div>

        <NipoCard title="👥 Usuários Recentes">
          <NipoCardBody>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-3 font-medium text-gray-700">Nome</th>
                    <th className="text-left p-3 font-medium text-gray-700">Função</th>
                    <th className="text-left p-3 font-medium text-gray-700">Status</th>
                    <th className="text-left p-3 font-medium text-gray-700">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {usuariosRecentes.map((usuario) => (
                    <tr key={usuario.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-cherry-400 to-sakura-400 rounded-full flex items-center justify-center text-white text-sm font-medium">
                            {usuario.nome.charAt(0)}
                          </div>
                          <span className="font-medium text-gray-900">{usuario.nome}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-1 text-xs rounded-full ${getRoleBadgeColor(usuario.role)}`}>
                          {usuario.role}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-gray-600">{usuario.status}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <NipoButton size="sm" variant="outline">
                          Ver Perfil
                        </NipoButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </NipoCardBody>
        </NipoCard>

        <div className="text-center p-6 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl">
          <p className="text-gray-700 italic">
            "管理 (Kanri) - O verdadeiro controle vem da harmonia entre ordem e flexibilidade"
          </p>
        </div>

      </div>
    </div>
  )
}

export default AdminDashboard