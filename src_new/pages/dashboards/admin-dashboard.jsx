import React from 'react';
import { useSimpleAuth as useAuth } from '@new/contexts/simple-auth-context';

/**
 * AdminDashboard - Dashboard do Administrador
 * Localização: src_new/pages/dashboards/admin-dashboard.jsx
 */
const AdminDashboard = () => {
  const { user, logout } = useAuth();

  const stats = [
    { label: 'Total de Alunos', value: '156', color: 'blue' },
    { label: 'Professores Ativos', value: '12', color: 'green' },
    { label: 'Cursos Disponíveis', value: '8', color: 'purple' },
    { label: 'Aulas Este Mês', value: '324', color: 'orange' }
  ];

  const recentActivities = [
    'Novo aluno matriculado: João Silva',
    'Professor Maria atualizou currículo',
    'Relatório mensal gerado',
    'Backup do sistema concluído'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Dashboard Administrativo
              </h1>
              <p className="text-sm text-gray-600">
                Bem-vindo, {user?.name}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                👨‍💼 Administrador
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
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className={`flex-shrink-0 w-8 h-8 bg-${stat.color}-500 rounded-lg flex items-center justify-center`}>
                  <span className="text-white font-bold">{stat.value[0]}</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Ações Rápidas
            </h2>
            <div className="space-y-3">
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                👥 Gerenciar Usuários
              </button>
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                📊 Relatórios Gerenciais
              </button>
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                ⚙️ Configurações do Sistema
              </button>
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                💰 Gestão Financeira
              </button>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Atividades Recentes
            </h2>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-700">{activity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Status do Sistema
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">✅</div>
              <p className="text-sm text-gray-600 mt-2">Servidor Online</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">💾</div>
              <p className="text-sm text-gray-600 mt-2">Backup Atualizado</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">🔒</div>
              <p className="text-sm text-gray-600 mt-2">Segurança OK</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;