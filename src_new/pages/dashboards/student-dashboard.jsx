import React from 'react';
import { useSimpleAuth as useAuth } from '@new/contexts/simple-auth-context';

/**
 * StudentDashboard - Dashboard do Aluno
 * Localização: src_new/pages/dashboards/student-dashboard.jsx
 */
const StudentDashboard = () => {
  const { user, logout } = useAuth();

  const myCourses = [
    { 
      name: 'Violino Básico', 
      teacher: 'Professor Silva', 
      progress: 75,
      nextClass: 'Hoje 14:00',
      status: 'Em andamento'
    }
  ];

  const assignments = [
    { task: 'Praticar escala de Dó maior', due: 'Amanhã', status: 'pending' },
    { task: 'Estudar partitura Ode to Joy', due: 'Esta semana', status: 'completed' },
    { task: 'Exercícios de arcada', due: '2 dias', status: 'pending' }
  ];

  const achievements = [
    { title: 'Primeira apresentação', date: '15/09/2025', icon: '🎭' },
    { title: 'Escala perfeita', date: '20/09/2025', icon: '🎵' },
    { title: '30 dias consecutivos', date: '25/09/2025', icon: '📅' }
  ];

  const practiceLog = [
    { date: '01/10', duration: '45 min', quality: 'Excelente' },
    { date: '30/09', duration: '30 min', quality: 'Bom' },
    { date: '29/09', duration: '60 min', quality: 'Excelente' },
    { date: '28/09', duration: '20 min', quality: 'Regular' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Meu Painel de Estudos
              </h1>
              <p className="text-sm text-gray-600">
                Bem-vindo, {user?.name}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                👨‍🎓 Aluno
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
        {/* Course Progress */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Meu Curso Atual
          </h2>
          {myCourses.map((course, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-medium text-gray-900">{course.name}</h3>
                  <p className="text-sm text-gray-600">Professor: {course.teacher}</p>
                  <p className="text-sm text-blue-600">Próxima aula: {course.nextClass}</p>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  course.status === 'Em andamento' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {course.status}
                </span>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progresso do curso</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
                  Acessar Aula
                </button>
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-50">
                  Material de Apoio
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Assignments */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Tarefas e Exercícios
            </h2>
            <div className="space-y-3">
              {assignments.map((assignment, index) => (
                <div key={index} className={`p-4 rounded-lg border ${
                  assignment.status === 'completed' ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        checked={assignment.status === 'completed'}
                        className="mr-3"
                        readOnly
                      />
                      <div>
                        <p className={`font-medium ${
                          assignment.status === 'completed' ? 'text-green-900 line-through' : 'text-gray-900'
                        }`}>
                          {assignment.task}
                        </p>
                        <p className="text-sm text-gray-600">Prazo: {assignment.due}</p>
                      </div>
                    </div>
                    {assignment.status === 'completed' && (
                      <span className="text-green-600">✓</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Practice Log */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Registro de Prática
            </h2>
            <div className="space-y-3">
              {practiceLog.map((session, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{session.date}</p>
                    <p className="text-sm text-gray-600">{session.duration}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    session.quality === 'Excelente' ? 'bg-green-100 text-green-800' :
                    session.quality === 'Bom' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {session.quality}
                  </span>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
              Registrar Nova Prática
            </button>
          </div>
        </div>

        {/* Achievements and Quick Actions */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Achievements */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Conquistas Recentes
            </h2>
            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <span className="text-2xl mr-3">{achievement.icon}</span>
                  <div>
                    <p className="font-medium text-gray-900">{achievement.title}</p>
                    <p className="text-sm text-gray-600">{achievement.date}</p>
                  </div>
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
                🎵 Iniciar Prática Guiada
              </button>
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                📚 Biblioteca de Partituras
              </button>
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                🎯 Definir Meta de Prática
              </button>
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                💬 Falar com Professor
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;