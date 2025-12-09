import type { EstatisticasProgresso } from '@/lib/types/aulas';
import { CheckCircle, Clock, Circle, Trophy } from 'lucide-react';

interface StatsCardProps {
  stats: EstatisticasProgresso;
}

export function StatsCard({ stats }: StatsCardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total de Aulas */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
            <Circle className="w-6 h-6 text-blue-600" />
          </div>
          <span className="text-3xl font-bold text-gray-900">{stats.total_aulas}</span>
        </div>
        <h3 className="text-sm font-medium text-gray-600">Total de Aulas</h3>
      </div>

      {/* Aulas Concluídas */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <span className="text-3xl font-bold text-gray-900">{stats.aulas_concluidas}</span>
        </div>
        <h3 className="text-sm font-medium text-gray-600">Concluídas</h3>
        <div className="mt-2">
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-500"
              style={{ width: `${stats.porcentagem_completa}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">{stats.porcentagem_completa}% do curso</p>
        </div>
      </div>

      {/* Em Andamento */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center">
            <Clock className="w-6 h-6 text-yellow-600" />
          </div>
          <span className="text-3xl font-bold text-gray-900">{stats.aulas_em_andamento}</span>
        </div>
        <h3 className="text-sm font-medium text-gray-600">Em Andamento</h3>
      </div>

      {/* Desafios Aprovados */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
            <Trophy className="w-6 h-6 text-purple-600" />
          </div>
          <span className="text-3xl font-bold text-gray-900">{stats.desafios_aprovados}</span>
        </div>
        <h3 className="text-sm font-medium text-gray-600">Desafios Aprovados</h3>
        <p className="text-xs text-gray-500 mt-2">
          {stats.desafios_enviados} enviados
        </p>
      </div>
    </div>
  );
}
