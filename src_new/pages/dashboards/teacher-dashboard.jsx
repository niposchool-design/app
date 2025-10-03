import React from 'react';
import { useSimpleAuth as useAuth } from '@new/contexts/simple-auth-context';

/**
 * TeacherDashboard - Dashboard do Professor
 * Localização: src_new/pages/dashboards/teacher-dashboard.jsx
 */
const TeacherDashboard = () => {
  const { user, logout } = useAuth();

  const myClasses = [
    { name: 'Violino Básico', students: 8, nextClass: 'Hoje 14:00' },
    { name: 'Piano Intermediário', students: 6, nextClass: 'Amanhã 10:00' },
    { name: 'Teoria Musical', students: 12, nextClass: 'Sex 16:00' }
  ];

  const recentStudents = [
    { name: 'Ana Silva', instrument: 'Violino', progress: 85 },
    { name: 'Carlos Matos', instrument: 'Piano', progress: 72 },
    { name: 'Maria Santos', instrument: 'Violino', progress: 93 },
    { name: 'João Pereira', instrument: 'Piano', progress: 68 }
  ];

  const tasks = [
    'Preparar material para aula de violino',
    'Avaliar trabalhos da turma de piano',
    'Enviar feedback para 3 alunos',
    'Atualizar cronograma do curso'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Dashboard do Professor
              </h1>
              <p className="text-sm text-gray-600">
                Bem-vindo, {user?.name}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                👨‍🏫 Professor
              </span>
              <button
                onClick={logout}
                className="text-gray-600 hover:text-gray-900"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">👥</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total de Alunos</p>
                <p className="text-2xl font-bold text-gray-900">{user?.profile?.students || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">📚</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Turmas Ativas</p>
                <p className="text-2xl font-bold text-gray-900">{myClasses.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">📝</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Tarefas Pendentes</p>
                <p className="text-2xl font-bold text-gray-900">{tasks.length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* My Classes */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Minhas Turmas
            </h2>
            <div className="space-y-4">
              {myClasses.map((cls, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900">{cls.name}</h3>
                    <span className="text-sm text-blue-600">{cls.students} alunos</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Próxima aula: {cls.nextClass}
                  </p>
                  <div className="mt-3 flex space-x-2">
                    <button className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      Ver Turma
                    </button>
                    <button className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      Material
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Students */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Progresso dos Alunos
            </h2>
            <div className="space-y-4">
              {recentStudents.map((student, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium text-gray-900">{student.name}</h3>
                      <p className="text-sm text-gray-600">{student.instrument}</p>
                    </div>
                    <span className={`text-sm font-medium ${
                      student.progress >= 80 ? 'text-green-600' : 
                      student.progress >= 60 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {student.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        student.progress >= 80 ? 'bg-green-500' : 
                        student.progress >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${student.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tasks and Schedule */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tasks */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Tarefas Pendentes
            </h2>
            <div className="space-y-3">
              {tasks.map((task, index) => (
                <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <input type="checkbox" className="mr-3" />
                  <span className="text-sm text-gray-700">{task}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Ações Rápidas
            </h2>
            <div className="space-y-3">
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                📝 Criar Nova Aula
              </button>
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                📊 Ver Relatórios
              </button>
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                💬 Enviar Mensagem
              </button>
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                📅 Agenda de Aulas
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;