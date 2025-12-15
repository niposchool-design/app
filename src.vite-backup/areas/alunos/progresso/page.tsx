// 📈 PROGRESSO PAGE - NIPO SCHOOL
import { useState, useEffect } from 'react'
import { TrendingUp, Target, Trophy, Clock, Star, Award } from 'lucide-react'
import { OrientalContainer } from '../../../components/oriental/OrientalContainer'
import { NipoCard } from '../../../components/ui/NipoCard'
import { ProgressBar } from '../components/ProgressBar'
import { useAuth } from '../../../contexts/AuthContext'
import { useAlunoStats } from '../hooks/useAlunoStats'

export const ProgressoPage = () => {
  const { user } = useAuth()
  const { stats, loading } = useAlunoStats(user?.id)

  // Dados mockados para demonstração
  const progressoInstrumentos = [
    { nome: 'Piano', progresso: 75, nivel: 'Intermediário' },
    { nome: 'Violino', progresso: 45, nivel: 'Básico' },
    { nome: 'Flauta', progresso: 30, nivel: 'Iniciante' }
  ]

  const conquistas = [
    { nome: 'Primeira Semana', data: '2024-01-15', pontos: 50 },
    { nome: 'Prática Diária', data: '2024-01-20', pontos: 100 },
    { nome: 'Aluno Dedicado', data: '2024-02-01', pontos: 150 }
  ]

  const metas = [
    { titulo: 'Completar 10 lições', atual: 7, total: 10, cor: 'blue' },
    { titulo: 'Praticar 5 horas', atual: 3.5, total: 5, cor: 'green' },
    { titulo: 'Obter 3 conquistas', atual: 2, total: 3, cor: 'purple' }
  ]

  return (
    <OrientalContainer title="Meu Progresso" icon={TrendingUp}>
      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <NipoCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Lições Completadas</p>
              <p className="text-3xl font-bold text-[#8B4513]">{stats?.totalLessons || 24}</p>
            </div>
            <Target className="text-[#8B4513]" size={40} />
          </div>
        </NipoCard>

        <NipoCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Horas Praticadas</p>
              <p className="text-3xl font-bold text-green-600">{stats?.practiceHours || 18}</p>
            </div>
            <Clock className="text-green-600" size={40} />
          </div>
        </NipoCard>

        <NipoCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Conquistas</p>
              <p className="text-3xl font-bold text-yellow-600">{conquistas.length}</p>
            </div>
            <Trophy className="text-yellow-600" size={40} />
          </div>
        </NipoCard>

        <NipoCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Nível Atual</p>
              <p className="text-3xl font-bold text-purple-600">{stats?.level || 3}</p>
            </div>
            <Award className="text-purple-600" size={40} />
          </div>
        </NipoCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progresso por Instrumento */}
        <NipoCard className="p-6">
          <h2 className="text-xl font-bold text-[#8B4513] mb-6 flex items-center">
            <Target size={24} className="mr-2" />
            Progresso por Instrumento
          </h2>
          <div className="space-y-6">
            {progressoInstrumentos.map(item => (
              <div key={item.nome}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900">{item.nome}</span>
                  <span className="text-sm text-gray-600">{item.nivel}</span>
                </div>
                <ProgressBar
                  progress={item.progresso}
                  color="blue"
                  size="lg"
                />
              </div>
            ))}
          </div>
        </NipoCard>

        {/* Metas Semanais */}
        <NipoCard className="p-6">
          <h2 className="text-xl font-bold text-[#8B4513] mb-6 flex items-center">
            <Star size={24} className="mr-2" />
            Metas Semanais
          </h2>
          <div className="space-y-6">
            {metas.map((meta, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900">{meta.titulo}</span>
                  <span className="text-sm text-gray-600">
                    {meta.atual} / {meta.total}
                  </span>
                </div>
                <ProgressBar
                  progress={(meta.atual / meta.total) * 100}
                  color={meta.cor as any}
                  size="lg"
                />
              </div>
            ))}
          </div>
        </NipoCard>

        {/* Conquistas Recentes */}
        <NipoCard className="p-6">
          <h2 className="text-xl font-bold text-[#8B4513] mb-6 flex items-center">
            <Trophy size={24} className="mr-2" />
            Conquistas Recentes
          </h2>
          <div className="space-y-3">
            {conquistas.map((conquista, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center">
                  <Award className="text-yellow-600 mr-3" size={24} />
                  <div>
                    <p className="font-medium text-gray-900">{conquista.nome}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(conquista.data).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
                <span className="text-yellow-600 font-bold">+{conquista.pontos}</span>
              </div>
            ))}
          </div>
        </NipoCard>

        {/* Atividade Recente */}
        <NipoCard className="p-6">
          <h2 className="text-xl font-bold text-[#8B4513] mb-6 flex items-center">
            <Clock size={24} className="mr-2" />
            Atividade Recente
          </h2>
          <div className="space-y-3">
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="font-medium text-gray-900">Lição completada</p>
              <p className="text-sm text-gray-600">Piano Básico - Aula 7</p>
              <p className="text-xs text-gray-500">Há 2 horas</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <p className="font-medium text-gray-900">Prática registrada</p>
              <p className="text-sm text-gray-600">45 minutos de violino</p>
              <p className="text-xs text-gray-500">Ontem</p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4">
              <p className="font-medium text-gray-900">Conquista desbloqueada</p>
              <p className="text-sm text-gray-600">Aluno Dedicado</p>
              <p className="text-xs text-gray-500">Há 3 dias</p>
            </div>
          </div>
        </NipoCard>
      </div>
    </OrientalContainer>
  )
}

export default ProgressoPage
