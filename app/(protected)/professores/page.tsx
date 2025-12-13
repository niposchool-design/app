'use client'

import { Users, BookOpen, CheckCircle, Calendar } from 'lucide-react'

export default function TeacherDashboard() {
  return (
    <>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Sensei, Ohayou Gozaimasu! 🌊
        </h1>
        <p className="text-gray-600">
          Guiar os outros é o caminho mais nobre de aprendizado.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-blue-100 hover:shadow-md transition-all group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">45</span>
          </div>
          <h3 className="text-gray-600 font-medium">Alunos Ativos</h3>
        </div>

        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-blue-100 hover:shadow-md transition-all group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-cyan-50 rounded-xl group-hover:bg-cyan-100 transition-colors">
              <BookOpen className="w-6 h-6 text-cyan-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">8</span>
          </div>
          <h3 className="text-gray-600 font-medium">Turmas</h3>
        </div>

        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-blue-100 hover:shadow-md transition-all group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-indigo-50 rounded-xl group-hover:bg-indigo-100 transition-colors">
              <CheckCircle className="w-6 h-6 text-indigo-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">12</span>
          </div>
          <h3 className="text-gray-600 font-medium">Correções Pendentes</h3>
        </div>

        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-blue-100 hover:shadow-md transition-all group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-sky-50 rounded-xl group-hover:bg-sky-100 transition-colors">
              <Calendar className="w-6 h-6 text-sky-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">3</span>
          </div>
          <h3 className="text-gray-600 font-medium">Aulas Hoje</h3>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Classes */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            Próximas Aulas
          </h2>
          
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-100 cursor-pointer">
                <div className="flex-shrink-0 w-16 text-center">
                  <div className="text-sm font-bold text-blue-600">14:00</div>
                  <div className="text-xs text-gray-500">Hoje</div>
                </div>
                <div className="w-1 h-12 bg-blue-200 rounded-full"></div>
                <div className="flex-grow">
                  <h3 className="font-bold text-gray-900">Japonês Básico I - Turma A</h3>
                  <p className="text-sm text-gray-500">Sala Virtual 3 • 15 Alunos confirmados</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  Iniciar
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Reviews */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-blue-600" />
            Para Corrigir
          </h2>
          
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-4 rounded-xl bg-gray-50 hover:bg-white hover:shadow-md transition-all border border-gray-100 cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-700 rounded-md">
                    Hiragana
                  </span>
                  <span className="text-xs text-gray-400">2h atrás</span>
                </div>
                <h3 className="font-medium text-gray-900 mb-1">Exercício de Caligrafia</h3>
                <p className="text-sm text-gray-500">Tanaka Yuki</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
