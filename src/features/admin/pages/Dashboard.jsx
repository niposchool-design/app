import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/working-auth-context';
import { useNavigate } from 'react-router-dom';

// 🎌 MIGRAÇÃO COMPLETA PARA SISTEMA ORIENTAL ENTERPRISE
import {
  AdminDashboardKit,
  OrientalMainLayout,
  OrientalSection,
  OrientalWrapper,
  OrientalFlex,
  OrientalStack,
  Button,
  Card,
  OrientalGrid,
  useOrientalTheme,
  DesignTokens
} from '../../../shared/components';

import {
  Users,
  GraduationCap,
  BookOpen,
  Music,
  TrendingUp,
  Calendar,
  Settings,
  BarChart3,
  Shield,
  Database,
  Activity,
  Bell,
  Plus,
  Eye,
  Edit,
  Download,
  UserCheck,
  AlertCircle
} from 'lucide-react';

/**
 * 🎌 Dashboard Administrativo - MIGRADO PARA ORIENTAL ENTERPRISE
 * 
 * Dashboard principal de administração utilizando sistema de componentes orientais.
 * Migrado do layout tradicional para design system empresarial oriental.
 */
const AdminDashboard = () => {
  const { userProfile, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useOrientalTheme('admin');
  
  // Desestruturar componentes do kit administrativo
  const { 
    Container, 
    Navigation, 
    StatsGrid, 
    StatCard, 
    ActionCard,
    MainLayout
  } = AdminDashboardKit;

  // Estado administrativo
  const [adminData, setAdminData] = useState({
    loading: true,
    totalStudents: 245,
    totalTeachers: 18,
    todayLessons: 32,
    totalInstruments: 15,
    systemHealth: 98.5,
    activeUsers: 189,
    pendingApprovals: 6,
    newRegistrations: 12
  });

  // Estatísticas administrativas migradas para oriental
  const adminStats = [
    {
      icon: <Users />,
      value: `${adminData.totalStudents}`,
      label: 'Alunos Ativos',
      color: 'blue',
      trend: 'up',
      trendValue: '+12 esta semana'
    },
    {
      icon: <GraduationCap />,
      value: `${adminData.totalTeachers}`,
      label: 'Professores',
      color: 'emerald',
      trend: 'up',
      trendValue: '+2 novos'
    },
    {
      icon: <BookOpen />,
      value: `${adminData.todayLessons}`,
      label: 'Aulas Hoje',
      color: 'amber',
      trend: 'stable',
      trendValue: 'programadas'
    },
    {
      icon: <Music />,
      value: `${adminData.totalInstruments}`,
      label: 'Instrumentos',
      color: 'red',
      trend: 'up',
      trendValue: '+1 novo'
    }
  ];

  // Ações administrativas rápidas migradas
  const quickActions = [
    {
      icon: <Users />,
      title: 'Gerenciar Alunos',
      description: 'Visualizar, adicionar e editar alunos',
      color: 'blue',
      action: () => navigate('/admin/students')
    },
    {
      icon: <GraduationCap />,
      title: 'Gerenciar Professores',
      description: 'Administrar equipe docente',
      color: 'emerald',
      action: () => navigate('/admin/teachers')
    },
    {
      icon: <Music />,
      title: 'Biblioteca de Instrumentos',
      description: 'Catalogar e organizar instrumentos',
      color: 'amber',
      action: () => navigate('/admin/instruments')
    },
    {
      icon: <BarChart3 />,
      title: 'Relatórios e Analytics',
      description: 'Análises e métricas do sistema',
      color: 'red',
      action: () => navigate('/admin/reports')
    },
    {
      icon: <Settings />,
      title: 'Configurações do Sistema',
      description: 'Ajustes e configurações gerais',
      color: 'gray',
      action: () => navigate('/admin/settings')
    },
    {
      icon: <Shield />,
      title: 'Segurança e Backup',
      description: 'Monitoramento e segurança',
      color: 'purple',
      action: () => navigate('/admin/security')
    }
  ];

  // Atividades recentes migradas
  const recentActivities = [
    {
      id: 1,
      type: 'student_registered',
      message: 'Novo aluno: Ana Silva se inscreveu em Violino',
      time: '2 minutos atrás',
      icon: <UserCheck className="w-4 h-4 text-green-500" />
    },
    {
      id: 2,
      type: 'lesson_completed',
      message: '15 aulas foram concluídas hoje',
      time: '1 hora atrás',
      icon: <BookOpen className="w-4 h-4 text-blue-500" />
    },
    {
      id: 3,
      type: 'teacher_approval',
      message: 'Professor João Santos precisa de aprovação',
      time: '3 horas atrás',
      icon: <AlertCircle className="w-4 h-4 text-amber-500" />
    },
    {
      id: 4,
      type: 'system_backup',
      message: 'Backup automático realizado com sucesso',
      time: '6 horas atrás',
      icon: <Database className="w-4 h-4 text-gray-500" />
    }
  ];

  const handleLogout = async () => {
    if (window.confirm('Tem certeza que deseja sair do sistema administrativo? 🎌')) {
      try {
        await logout();
        navigate('/', { replace: true });
      } catch (error) {
        console.error('Erro ao fazer logout:', error);
      }
    }
  };

  // Carregar dados administrativos
  useEffect(() => {
    const loadAdminData = async () => {
      try {
        // Simular carregamento
        setTimeout(() => {
          setAdminData(prev => ({ ...prev, loading: false }));
        }, 700);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setAdminData(prev => ({ ...prev, loading: false }));
      }
    };

    loadAdminData();
  }, []);

  if (adminData.loading) {
    return (
      <Container {...theme.container}>
        <Navigation 
          title="Carregando painel administrativo..."
          user={userProfile}
          onLogout={handleLogout}
          {...theme.navigation}
        />
        <MainLayout>
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Preparando sistema administrativo oriental...</p>
          </div>
        </MainLayout>
      </Container>
    );
  }

  return (
    <Container {...theme.container}>
      {/* Navegação Oriental Administrativa */}
      <Navigation
        title="Painel Administrativo"
        user={userProfile}
        onLogout={handleLogout}
        menuItems={[
          { label: 'Usuários', onClick: () => navigate('/admin/users') },
          { label: 'Sistema', onClick: () => navigate('/admin/system') },
          { label: 'Relatórios', onClick: () => navigate('/admin/reports') }
        ]}
        {...theme.navigation}
      />

      <MainLayout>
        {/* Cabeçalho Oriental Administrativo */}
        <OrientalSection spacing="comfortable" className="mb-8">
          <OrientalWrapper className="text-center relative overflow-hidden">
            {/* Elementos flutuantes administrativos */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-4 left-4 text-red-200 text-2xl animate-bounce" style={{ animationDelay: '0s' }}>🛡️</div>
              <div className="absolute top-8 right-8 text-orange-200 text-xl animate-bounce" style={{ animationDelay: '1s' }}>📊</div>
              <div className="absolute bottom-8 left-12 text-amber-200 text-lg animate-bounce" style={{ animationDelay: '2s' }}>⚙️</div>
              <div className="absolute bottom-4 right-4 text-red-200 text-xl animate-bounce" style={{ animationDelay: '3s' }}>👑</div>
            </div>

            <div className="relative z-10 py-12">
              <div className="text-4xl mb-4">🎌</div>
              <h1 className="text-2xl font-light text-gray-900 mb-2">
                {DesignTokens.oriental.greetings.morning}, {userProfile?.full_name || 'Administrador'}!
              </h1>
              <p className="text-gray-600 mb-4">
                Sistema de Gestão Oriental • Nipo School Administration
              </p>
              <div className="flex justify-center items-center space-x-8 text-sm text-gray-600">
                <span>👥 {adminData.totalStudents} estudantes</span>
                <span>🎓 {adminData.totalTeachers} professores</span>
                <span>📚 {adminData.todayLessons} aulas hoje</span>
                <span>🟢 {adminData.systemHealth}% uptime</span>
              </div>
            </div>
          </OrientalWrapper>
        </OrientalSection>

        {/* Grid de Estatísticas Administrativas */}
        <OrientalSection spacing="normal" className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            📈 Visão Geral do Sistema
          </h2>
          
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

        {/* Ações Administrativas Rápidas */}
        <OrientalSection spacing="normal" className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            ⚡ Ferramentas Administrativas
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

        {/* Layout de duas colunas - Atividades e Sistema */}
        <OrientalGrid columns={2} gap="lg" className="mb-8">
          
          {/* Atividades Recentes */}
          <Card variant="oriental">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                🔔 Atividades Recentes
                <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                  {recentActivities.length} novas
                </span>
              </h3>
              
              <OrientalStack spacing="sm">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="border border-gray-100 rounded-xl p-3 hover:bg-gray-50 transition-colors">
                    <OrientalFlex align="center" gap="sm">
                      <div className="flex-shrink-0">{activity.icon}</div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{activity.message}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </OrientalFlex>
                  </div>
                ))}
              </OrientalStack>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Button variant="outline" size="sm" className="w-full">
                  Ver Todas as Atividades
                </Button>
              </div>
            </div>
          </Card>

          {/* Status do Sistema */}
          <Card variant="oriental">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                ⚙️ Status do Sistema
                <span className="ml-2 text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                  Operacional
                </span>
              </h3>
              
              <OrientalStack spacing="md">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Performance</span>
                    <span className="text-sm font-medium text-green-600">98.5%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '98.5%' }}></div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Usuários Ativos</span>
                    <span className="text-sm font-medium text-blue-600">{adminData.activeUsers}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '76%' }}></div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Armazenamento</span>
                    <span className="text-sm font-medium text-amber-600">67%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: '67%' }}></div>
                  </div>
                </div>
              </OrientalStack>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <OrientalFlex gap="sm">
                  <Button variant="outline" size="sm" className="flex-1">
                    Monitoramento
                  </Button>
                  <Button variant="oriental" size="sm" className="flex-1">
                    Backup
                  </Button>
                </OrientalFlex>
              </div>
            </div>
          </Card>
        </OrientalGrid>

        {/* Alertas e Notificações */}
        <OrientalSection spacing="normal" className="mb-8">
          <Card variant="glassmorphism" className="border-l-4 border-l-amber-400">
            <div className="p-6">
              <OrientalFlex align="start" gap="md">
                <div className="flex-shrink-0">
                  <Bell className="w-6 h-6 text-amber-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Ação Necessária
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Você tem {adminData.pendingApprovals} solicitações pendentes de aprovação e {adminData.newRegistrations} novos registros para revisar.
                  </p>
                  <OrientalFlex gap="sm">
                    <Button variant="oriental" size="sm">
                      Revisar Solicitações
                    </Button>
                    <Button variant="outline" size="sm">
                      Ver Registros
                    </Button>
                  </OrientalFlex>
                </div>
              </OrientalFlex>
            </div>
          </Card>
        </OrientalSection>

        {/* Footer Administrativo */}
        <div className="text-center py-8 border-t border-red-100">
          <p className="text-sm text-gray-500 mb-2">
            🎌 Sistema Administrativo Nipo School - Gestão Oriental Empresarial
          </p>
          <p className="text-xs text-gray-400">
            Dashboard migrado para sistema oriental enterprise • Monitoramento em tempo real
          </p>
        </div>
      </MainLayout>
    </Container>
  );
};

export default AdminDashboard;