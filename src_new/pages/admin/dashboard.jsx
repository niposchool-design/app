import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart3, Users, BookOpen, TrendingUp, RefreshCw, Settings,
  UserCheck, Crown, Activity, Calendar, Award, Music, GraduationCap,
  Bell, Target, Zap, Database, ChevronRight, Plus, Eye
} from 'lucide-react';

// ✅ NOVA ESTRUTURA - Imports limpos
import { useAuth } from '@new/hooks';
import { adminApi } from '@new/services/api';
import { formatDate, formatCurrency, formatNumber } from '@new/lib/utils';
import { USER_ROLES, STATUS } from '@new/lib/utils/constants';
import { Header } from '@new/components/layout';
import { Button } from '@new/components/ui';

/**
 * AdminDashboard - Dashboard administrativo moderno
 * Migrado de: src/features/admin/pages/AdminDashboard.jsx
 * Nova localização: src_new/pages/admin/dashboard.jsx
 */
const AdminDashboard = () => {
  const { userProfile, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  // Estados
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Carregar estatísticas
  const loadStats = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await adminApi.getGeneralStats();
      
      if (result.success) {
        setStats(result.data);
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      console.error('Erro ao carregar estatísticas:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Refresh manual
  const handleRefresh = async () => {
    setRefreshing(true);
    await loadStats();
    setRefreshing(false);
  };

  // Navegação rápida
  const quickNavigation = [
    {
      title: 'Alunos',
      description: 'Gerenciar estudantes',
      icon: Users,
      count: stats.students?.total || 0,
      color: 'blue',
      path: '/admin/alunos'
    },
    {
      title: 'Professores',
      description: 'Gerenciar educadores',
      icon: GraduationCap,
      count: stats.teachers?.total || 0,
      color: 'green',
      path: '/admin/professores'
    },
    {
      title: 'Instrumentos',
      description: 'Catálogo musical',
      icon: Music,
      count: stats.instruments?.total || 0,
      color: 'purple',
      path: '/admin/instruments'
    },
    {
      title: 'Turmas',
      description: 'Classes ativas',
      icon: BookOpen,
      count: stats.classes?.active || 0,
      color: 'orange',
      path: '/admin/turmas'
    }
  ];

  // Carregar dados ao montar
  useEffect(() => {
    if (isAdmin) {
      loadStats();
    } else {
      navigate('/dashboard');
    }
  }, [isAdmin, navigate]);

  // Componente de Card de Estatística
  const StatCard = ({ title, value, subtitle, icon: Icon, color = 'blue', trend }) => (
    <div className="bg-white rounded-lg shadow p-6 border-l-4 border-l-red-500">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-full bg-${color}-100`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
      {trend && (
        <div className="mt-2 flex items-center">
          <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
          <span className="text-sm text-green-600">{trend}</span>
        </div>
      )}
    </div>
  );

  // Componente de Card de Navegação Rápida
  const QuickNavCard = ({ title, description, icon: Icon, count, color, path }) => (
    <div 
      className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow cursor-pointer border border-gray-200"
      onClick={() => navigate(path)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg bg-${color}-100`}>
            <Icon className={`w-5 h-5 text-${color}-600`} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold text-gray-900">{count}</span>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header isLoading={true} />
        <div className="max-w-7xl mx-auto py-6 px-4">
          <div className="flex items-center justify-center h-64">
            <RefreshCw className="w-8 h-8 text-red-500 animate-spin" />
            <span className="ml-2 text-lg">Carregando dashboard...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Crown className="w-8 h-8 text-red-500 mr-3" />
              Dashboard Administrativo
            </h1>
            <p className="text-gray-600 mt-1">
              Bem-vindo, {userProfile?.nome || 'Administrador'}!
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              onClick={handleRefresh}
              loading={refreshing}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Atualizar
            </Button>
            <Button variant="primary">
              <Plus className="w-4 h-4 mr-2" />
              Novo
            </Button>
          </div>
        </div>

        {/* Erro */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="text-red-800">
              <strong>Erro:</strong> {error}
            </div>
          </div>
        )}

        {/* Estatísticas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total de Alunos"
            value={formatNumber(stats.students?.total || 0)}
            subtitle={`${stats.students?.active || 0} ativos`}
            icon={Users}
            color="blue"
          />
          <StatCard
            title="Professores"
            value={formatNumber(stats.teachers?.total || 0)}
            subtitle={`${stats.teachers?.active || 0} ativos`}
            icon={GraduationCap}
            color="green"
          />
          <StatCard
            title="Instrumentos"
            value={formatNumber(stats.instruments?.total || 0)}
            subtitle={`${stats.instruments?.available || 0} disponíveis`}
            icon={Music}
            color="purple"
          />
          <StatCard
            title="Turmas Ativas"
            value={formatNumber(stats.classes?.active || 0)}
            subtitle={`de ${stats.classes?.total || 0} totais`}
            icon={BookOpen}
            color="orange"
          />
        </div>

        {/* Navegação Rápida */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Acesso Rápido
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickNavigation.map((item) => (
              <QuickNavCard key={item.path} {...item} />
            ))}
          </div>
        </div>

        {/* Ações Administrativas */}
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Gestão de Sistema */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              Gestão do Sistema
            </h3>
            <div className="space-y-3">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => navigate('/admin/curriculum')}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Gerenciar Currículo
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => navigate('/admin/qr-manager')}
              >
                <Target className="w-4 h-4 mr-2" />
                QR Code Manager
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => navigate('/admin/kanban')}
              >
                <Activity className="w-4 h-4 mr-2" />
                Kanban de Aulas
              </Button>
            </div>
          </div>

          {/* Estatísticas Rápidas */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Visão Geral
            </h3>
            <div className="space-y-3">
              {stats.lastUpdated && (
                <div className="text-sm text-gray-600">
                  <strong>Última atualização:</strong><br />
                  {formatDate(stats.lastUpdated)}
                </div>
              )}
              <div className="pt-2 border-t">
                <div className="flex justify-between text-sm">
                  <span>Taxa de ocupação:</span>
                  <span className="font-semibold">
                    {stats.classes?.total > 0 
                      ? Math.round((stats.classes.active / stats.classes.total) * 100)
                      : 0}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status da Nova Estrutura */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="text-green-800 font-semibold mb-2">
            ✅ FASE 4 - Nova Estrutura Ativa
          </h3>
          <div className="text-green-700 text-sm grid md:grid-cols-3 gap-4">
            <div>✅ Hooks modernos</div>
            <div>✅ Services organizados</div>
            <div>✅ Componentes limpos</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;