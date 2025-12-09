'use client'

/**
 * 🔴 ADMIN DASHBOARD - Next.js 14
 */

import { useEffect, useState } from 'react'
import { Users, GraduationCap, Calendar, TrendingUp, Music, Award } from 'lucide-react'
import { getAdminDashboardStats } from '@/lib/supabase/queries/admin'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalAlunos: 0,
    totalProfessores: 0,
    totalAulas: 0,
    aulasHoje: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadStats() {
      console.log('🚀 [AdminDashboard] Carregando estatísticas...')
      try {
        const data = await getAdminDashboardStats()
        console.log('✅ [AdminDashboard] Dados recebidos:', data)
        setStats(data)
        setError(null)
      } catch (error) {
        console.error('❌ [AdminDashboard] Erro ao carregar estatísticas:', error)
        setError('Erro ao carregar dados do dashboard')
      } finally {
        setLoading(false)
      }
    }
    loadStats()
  }, [])

  const statsCards = [
    { name: 'Total de Alunos', value: loading ? '...' : stats.totalAlunos.toString(), icon: GraduationCap, color: 'bg-blue-500' },
    { name: 'Total de Professores', value: loading ? '...' : stats.totalProfessores.toString(), icon: Users, color: 'bg-green-500' },
    { name: 'Aulas Hoje', value: loading ? '...' : stats.aulasHoje.toString(), icon: Calendar, color: 'bg-purple-500' },
    { name: 'Total de Aulas', value: loading ? '...' : stats.totalAulas.toString(), icon: TrendingUp, color: 'bg-orange-500' },
    { name: 'Instrumentos', value: '15', icon: Music, color: 'bg-red-500' },
    { name: 'Conquistas', value: '342', icon: Award, color: 'bg-yellow-500' },
  ]

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Administrativo</h1>
        <p className="text-gray-600 mt-2">Visão geral do sistema Nipo School</p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 font-semibold">⚠️ {error}</p>
          <p className="text-red-600 text-sm mt-1">Verifique o console do navegador (F12) para mais detalhes</p>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">{statsCards.map((stat) => {
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

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors">
            <p className="font-semibold text-gray-700">Nova Aula</p>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors">
            <p className="font-semibold text-gray-700">Novo Aluno</p>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors">
            <p className="font-semibold text-gray-700">Novo Professor</p>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors">
            <p className="font-semibold text-gray-700">Gerar QR Code</p>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Atividades Recentes</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Prof. Tanaka</span> registrou presença em 
              <span className="font-semibold"> Shamisen Básico</span>
            </p>
            <span className="ml-auto text-xs text-gray-500">2min atrás</span>
          </div>
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Aluno Yuki</span> completou o módulo 
              <span className="font-semibold"> Koto - Nível 1</span>
            </p>
            <span className="ml-auto text-xs text-gray-500">15min atrás</span>
          </div>
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Nova turma</span> criada: 
              <span className="font-semibold"> Taiko Intermediário</span>
            </p>
            <span className="ml-auto text-xs text-gray-500">1h atrás</span>
          </div>
        </div>
      </div>
    </div>
  )
}
