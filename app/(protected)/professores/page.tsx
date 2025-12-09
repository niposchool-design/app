'use client'

/**
 * 🟢 PROFESSOR DASHBOARD - Next.js 14
 */

import { Users, Calendar, Award, TrendingUp } from 'lucide-react'

export default function ProfessorDashboard() {
  const stats = [
    { name: 'Turmas Ativas', value: '6', icon: Users, color: 'bg-green-500' },
    { name: 'Aulas Hoje', value: '3', icon: Calendar, color: 'bg-blue-500' },
    { name: 'Avaliações Pendentes', value: '12', icon: Award, color: 'bg-orange-500' },
    { name: 'Taxa de Presença', value: '92%', icon: TrendingUp, color: 'bg-purple-500' },
  ]

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard do Professor</h1>
        <p className="text-gray-600 mt-2">Gerencie suas turmas e conteúdos</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.name} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Próximas Aulas</h2>
        <p className="text-gray-500">Suas próximas aulas aparecerão aqui</p>
      </div>
    </div>
  )
}
