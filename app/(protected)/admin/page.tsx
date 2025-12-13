
import { Users, TrendingUp, Shield, Activity, GraduationCap, School, Music, FileText } from 'lucide-react'
import { getAdminStats } from '@/src/lib/supabase/queries/dashboard';

export default async function AdminDashboard() {
  const stats = await getAdminStats();

  return (
    <>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Painel Administrativo 🏯
        </h1>
        <p className="text-gray-600">
          Visão holística e controle do ecossistema Nipo School.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Alunos */}
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-purple-100 hover:shadow-md transition-all group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-50 rounded-xl group-hover:bg-purple-100 transition-colors">
              <GraduationCap className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center gap-1">
              Ativos
            </span>
          </div>
          <h3 className="text-gray-600 font-medium text-sm">Total de Alunos</h3>
          <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalAlunos}</p>
        </div>

        {/* Professores */}
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-indigo-100 hover:shadow-md transition-all group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-indigo-50 rounded-xl group-hover:bg-indigo-100 transition-colors">
              <Shield className="w-6 h-6 text-indigo-600" />
            </div>
            <span className="text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
              Docentes
            </span>
          </div>
          <h3 className="text-gray-600 font-medium text-sm">Professores</h3>
          <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalProfessores}</p>
        </div>

        {/* Turmas */}
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-blue-100 hover:shadow-md transition-all group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
              <School className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
              Ativas
            </span>
          </div>
          <h3 className="text-gray-600 font-medium text-sm">Turmas</h3>
          <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalTurmas}</p>
        </div>

        {/* Aulas */}
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-pink-100 hover:shadow-md transition-all group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-pink-50 rounded-xl group-hover:bg-pink-100 transition-colors">
              <Activity className="w-6 h-6 text-pink-600" />
            </div>
          </div>
          <h3 className="text-gray-600 font-medium text-sm">Aulas Criadas</h3>
          <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalAulas}</p>
        </div>

        {/* Instrumentos */}
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-red-100 hover:shadow-md transition-all group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-50 rounded-xl group-hover:bg-red-100 transition-colors">
              <Music className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <h3 className="text-gray-600 font-medium text-sm">Instrumentos</h3>
          <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalInstrumentos}</p>
        </div>

        {/* Repertório */}
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-orange-100 hover:shadow-md transition-all group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-50 rounded-xl group-hover:bg-orange-100 transition-colors">
              <FileText className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <h3 className="text-gray-600 font-medium text-sm">Repertório Musical</h3>
          <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalRepertorio}</p>
        </div>
      </div>

      {/* System Health */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-900 mb-4">Status do Sistema</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Servidor API</span>
              <span className="text-green-600 font-medium">Online</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div className="bg-green-500 h-full rounded-full w-[100%]"></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Banco de Dados (Supabase)</span>
              <span className="text-green-600 font-medium">Conectado</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div className="bg-green-600 h-full rounded-full w-[100%]"></div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
