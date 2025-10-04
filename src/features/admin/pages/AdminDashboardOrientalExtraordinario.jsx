import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/working-auth-context';
import { useNavigate } from 'react-router-dom';

// 🎌 Importar nosso sistema de componentes orientais
import {
  AdminDashboardKit,
  OrientalMainLayout,
  OrientalSection,
  OrientalWrapper,
  Button,
  Card,
  OrientalGrid,
  OrientalFlex,
  useOrientalTheme
} from '../../../shared/components';

import {
  Users,
  BookOpen,
  TrendingUp,
  BarChart3,
  Shield,
  Settings,
  Award,
  Clock,
  Target,
  Zap,
  Globe,
  Database,
  UserCheck,
  Eye,
  Crown,
  Activity,
  Calendar,
  Music,
  GraduationCap,
  Plus,
  Filter,
  Search,
  QrCode,
  FileText,
  Download
} from 'lucide-react';

/**
 * 🎌 AdminDashboard Oriental Extraordinário
 * Usando nosso sistema de componentes padronizados
 */
const AdminDashboardOrientalExtraordinario = () => {
  const { userProfile, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useOrientalTheme('admin');
  
  // Estados para dados do dashboard
  const [dashboardData, setDashboardData] = useState({
    loading: true,
    stats: {},
    recentActivity: [],
    systemHealth: {},
    quickActions: []
  });

  // Desestruturar componentes do kit admin
  const { 
    Container, 
    Navigation, 
    StatsGrid, 
    StatCard, 
    ActionCard 
  } = AdminDashboardKit;

  // Dados estatísticos orientais para admin
  const adminStats = [
    {
      icon: <Users />,
      value: '234',
      label: 'Total de Usuários',
      color: 'blue',
      trend: 'up',
      trendValue: '+12 esta semana'
    },
    {
      icon: <TrendingUp />,
      value: '89%',
      label: 'Taxa de Engajamento',
      color: 'emerald',
      trend: 'up',
      trendValue: '+5% este mês'
    },
    {
      icon: <BookOpen />,
      value: '156',
      label: 'Aulas Ativas',
      color: 'amber',
      trend: 'up',
      trendValue: '+23 novas'
    },
    {
      icon: <Crown />,
      value: '98.5%',
      label: 'Uptime do Sistema',
      color: 'red',
      trend: 'up',
      trendValue: '99.9% meta'
    }
  ];

  // Ações rápidas administrativas
  const quickActions = [
    {
      icon: <UserCheck />,
      title: 'Gerenciar Usuários',
      description: 'Administrar contas e permissões',
      color: 'blue',
      action: () => navigate('/admin/users')
    },
    {
      icon: <BarChart3 />,
      title: 'Relatórios Avançados',
      description: 'Analytics e métricas detalhadas',
      color: 'emerald',
      action: () => navigate('/admin/reports')
    },
    {
      icon: <Settings />,
      title: 'Configurações do Sistema',
      description: 'Ajustes globais e preferências',
      color: 'amber',
      action: () => navigate('/admin/settings')
    },
    {
      icon: <QrCode />,
      title: 'Gerador QR Code',
      description: 'Criar códigos para presença',
      color: 'red',
      action: () => navigate('/admin/qr-generator')
    },
    {
      icon: <Database />,
      title: 'Backup & Restore',
      description: 'Gerenciar dados do sistema',
      color: 'purple',
      action: () => console.log('Backup iniciado')
    },
    {
      icon: <Globe />,
      title: 'Monitoramento',
      description: 'Status em tempo real',
      color: 'blue',
      action: () => navigate('/admin/monitoring')
    }
  ];

  // Atividade recente do sistema
  const recentActivity = [
    {
      type: 'user_registered',
      user: 'Maria Silva',
      action: 'se registrou como aluna',
      time: '5 min atrás',
      icon: <Users className="w-4 h-4 text-blue-500" />
    },
    {
      type: 'lesson_completed',
      user: 'João Santos',
      action: 'completou aula de Violino',
      time: '12 min atrás',
      icon: <BookOpen className="w-4 h-4 text-emerald-500" />
    },
    {
      type: 'teacher_created',
      user: 'Prof. Yamamoto',
      action: 'criou nova aula de Koto',
      time: '1 hora atrás',
      icon: <Music className="w-4 h-4 text-amber-500" />
    },
    {
      type: 'achievement_earned',
      user: 'Ana Costa',
      action: 'conquistou medalha de Dedicação',
      time: '2 horas atrás',
      icon: <Award className="w-4 h-4 text-red-500" />
    },
    {
      type: 'system_update',
      user: 'Sistema',
      action: 'atualizou biblioteca de instrumentos',
      time: '3 horas atrás',
      icon: <Settings className="w-4 h-4 text-purple-500" />
    }
  ];

  // Alertas e notificações administrativas
  const systemAlerts = [
    {
      type: 'info',
      title: 'Backup Agendado',
      message: 'Backup automático será executado às 02:00',
      priority: 'low'
    },
    {
      type: 'warning',
      title: 'Espaço em Disco',
      message: 'Servidor com 85% de utilização',
      priority: 'medium'
    },
    {
      type: 'success',
      title: 'Migração Concluída',
      message: 'Todas as aulas foram migradas com sucesso',
      priority: 'low'
    }
  ];

  const handleLogout = async () => {
    if (window.confirm('Tem certeza que deseja sair da área administrativa?')) {
      try {
        await logout();
        navigate('/', { replace: true });
      } catch (error) {
        console.error('Erro ao fazer logout:', error);
      }
    }
  };

  // Carregar dados do dashboard
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Simular carregamento de dados
        setTimeout(() => {
          setDashboardData({
            loading: false,
            stats: adminStats,
            recentActivity,
            systemHealth: { status: 'healthy', uptime: '98.5%' },
            quickActions
          });
        }, 1000);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setDashboardData(prev => ({ ...prev, loading: false }));
      }
    };

    loadDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (dashboardData.loading) {
    return (
      <Container {...theme.container}>
        <Navigation 
          title="Carregando Painel Administrativo..."
          user={userProfile}
          onLogout={handleLogout}
          {...theme.navigation}
        />
        <OrientalMainLayout>
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando dados administrativos...</p>
          </div>
        </OrientalMainLayout>
      </Container>
    );
  }

  return (
    <Container {...theme.container}>
      {/* Navegação Oriental Admin */}
      <Navigation
        title="Painel Administrativo"
        user={userProfile}
        onLogout={handleLogout}
        menuItems={[
          { label: 'Usuários', onClick: () => navigate('/admin/users') },
          { label: 'Relatórios', onClick: () => navigate('/admin/reports') },
          { label: 'Sistema', onClick: () => navigate('/admin/system') }
        ]}
        {...theme.navigation}
      />

      <OrientalMainLayout>
        {/* Cabeçalho de Boas-vindas Oriental */}
        <OrientalSection spacing="normal" className="mb-8">
          <OrientalWrapper>
            <div className="text-center py-8">
              <h1 className="text-3xl font-light text-gray-900 mb-3">
                🎌 Bem-vindo, Administrador
              </h1>
              <p className="text-gray-600 mb-4">
                Gerencie todo o sistema educacional musical do Nipo School
              </p>
              <div className="flex justify-center space-x-3">
                <Button variant="oriental" size="sm" icon={<Eye />}>
                  Visão Geral
                </Button>
                <Button variant="outline" size="sm" icon={<FileText />}>
                  Relatórios
                </Button>
                <Button variant="ghost" size="sm" icon={<Settings />}>
                  Configurações
                </Button>
              </div>
            </div>
          </OrientalWrapper>
        </OrientalSection>

        {/* Grid de Estatísticas Principais */}
        <OrientalSection spacing="normal" className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              📊 Métricas do Sistema
            </h2>
            <Button variant="ghost" size="sm" icon={<Download />}>
              Exportar Dados
            </Button>
          </div>
          
          <StatsGrid layout="dashboard">
            {adminStats.map((stat, index) => (
              <StatCard
                key={index}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
                color={stat.color}
                trend={stat.trend}
                trendValue={stat.trendValue}
              />
            ))}
          </StatsGrid>
        </OrientalSection>

        {/* Ações Rápidas Administrativas */}
        <OrientalSection spacing="normal" className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            ⚡ Ações Administrativas
          </h2>
          
          <OrientalGrid columns="auto-fit" gap="lg">
            {quickActions.map((action, index) => (
              <ActionCard
                key={index}
                icon={action.icon}
                title={action.title}
                description={action.description}
                color={action.color}
                onClick={action.action}
              />
            ))}
          </OrientalGrid>
        </OrientalSection>

        {/* Layout de duas colunas */}
        <OrientalGrid columns={2} gap="lg" className="mb-8">
          
          {/* Atividade Recente */}
          <Card variant="oriental">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  📋 Atividade Recente
                </h3>
                <Button variant="ghost" size="sm">
                  Ver Todas
                </Button>
              </div>
              
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {activity.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Alertas do Sistema */}
          <Card variant="oriental">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  🚨 Alertas do Sistema
                </h3>
                <Button variant="ghost" size="sm">
                  Configurar
                </Button>
              </div>
              
              <div className="space-y-3">
                {systemAlerts.map((alert, index) => (
                  <div 
                    key={index} 
                    className={`p-3 rounded-lg border-l-4 ${
                      alert.type === 'warning' ? 'bg-amber-50 border-amber-400' :
                      alert.type === 'success' ? 'bg-emerald-50 border-emerald-400' :
                      'bg-blue-50 border-blue-400'
                    }`}
                  >
                    <h4 className="text-sm font-medium text-gray-900">
                      {alert.title}
                    </h4>
                    <p className="text-xs text-gray-600 mt-1">
                      {alert.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </OrientalGrid>

        {/* Seção de Performance do Sistema */}
        <OrientalSection spacing="normal" className="mb-8">
          <Card variant="oriental">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                ⚡ Performance do Sistema
              </h3>
              
              <OrientalGrid columns={4} gap="md">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-2 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Activity className="w-8 h-8 text-emerald-600" />
                  </div>
                  <p className="text-2xl font-bold text-emerald-600">98.5%</p>
                  <p className="text-xs text-gray-600">Uptime</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-2 bg-blue-100 rounded-full flex items-center justify-center">
                    <Clock className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="text-2xl font-bold text-blue-600">1.2s</p>
                  <p className="text-xs text-gray-600">Tempo Resposta</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-2 bg-amber-100 rounded-full flex items-center justify-center">
                    <Database className="w-8 h-8 text-amber-600" />
                  </div>
                  <p className="text-2xl font-bold text-amber-600">2.3GB</p>
                  <p className="text-xs text-gray-600">Uso de Dados</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-2 bg-red-100 rounded-full flex items-center justify-center">
                    <Shield className="w-8 h-8 text-red-600" />
                  </div>
                  <p className="text-2xl font-bold text-red-600">100%</p>
                  <p className="text-xs text-gray-600">Segurança</p>
                </div>
              </OrientalGrid>
            </div>
          </Card>
        </OrientalSection>

        {/* Footer Oriental */}
        <div className="text-center py-8 border-t border-red-100">
          <p className="text-sm text-gray-500 mb-2">
            🎌 Nipo School - Painel Administrativo Oriental
          </p>
          <p className="text-xs text-gray-400">
            Sistema construído com componentes orientais padronizados • Design Tokens • React + Tailwind
          </p>
        </div>
      </OrientalMainLayout>
    </Container>
  );
};

export default AdminDashboardOrientalExtraordinario;