import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/working-auth-context';
import { useNavigate } from 'react-router-dom';

// 🎌 MIGRAÇÃO COMPLETA PARA SISTEMA ORIENTAL ENTERPRISE
import {
  TeacherDashboardKit,
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
  BookOpen,
  Calendar,
  TrendingUp,
  Clock,
  Plus,
  Eye,
  Edit,
  MessageSquare,
  BarChart3,
  FileText,
  Music,
  Award,
  CheckCircle,
  AlertCircle,
  GraduationCap,
  Target,
  Heart
} from 'lucide-react';

/**
 * 🎌 Dashboard do Professor - MIGRADO PARA ORIENTAL ENTERPRISE
 * 
 * Dashboard principal dos professores utilizando sistema de componentes orientais.
 * Migrado do layout tradicional para design system empresarial oriental pedagógico.
 */
const TeacherDashboard = () => {
  const { userProfile, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useOrientalTheme('teacher');
  
  // Desestruturar componentes do kit professor
  const { 
    Container, 
    Navigation, 
    StatsGrid, 
    StatCard, 
    ActionCard,
    MainLayout
  } = TeacherDashboardKit;

  // Estado do professor migrado
  const [teacherData, setTeacherData] = useState({
    loading: true,
    activeClasses: 3,
    totalStudents: 28,
    todayLessons: 5,
    weekLessons: 15,
    averageProgress: 78,
    pendingReviews: 4,
    newMessages: 2,
    completionRate: 89,
    specialization: 'Piano e Teclado',
    experience: '2 anos'
  });

  // Estatísticas do professor migradas para oriental
  const teacherStats = [
    {
      icon: <Users />,
      value: `${teacherData.totalStudents}`,
      label: 'Estudantes',
      color: 'blue',
      trend: 'up',
      trendValue: '+3 novos'
    },
    {
      icon: <BookOpen />,
      value: `${teacherData.todayLessons}`,
      label: 'Aulas Hoje',
      color: 'emerald',
      trend: 'stable',
      trendValue: 'programadas'
    },
    {
      icon: <TrendingUp />,
      value: `${teacherData.averageProgress}%`,
      label: 'Progresso Médio',
      color: 'amber',
      trend: 'up',
      trendValue: '+8% semana'
    },
    {
      icon: <Award />,
      value: `${teacherData.completionRate}%`,
      label: 'Taxa Conclusão',
      color: 'red',
      trend: 'up',
      trendValue: 'excelente!'
    }
  ];

  // Ações do professor migradas
  const teacherActions = [
    {
      icon: <Plus />,
      title: 'Nova Aula',
      description: 'Criar conteúdo de aula personalizado',
      color: 'blue',
      action: () => navigate('/teachers/create-lesson')
    },
    {
      icon: <Users />,
      title: 'Gerenciar Turmas',
      description: 'Acompanhar progresso dos alunos',
      color: 'emerald',
      action: () => navigate('/teachers/classes')
    },
    {
      icon: <BarChart3 />,
      title: 'Relatórios',
      description: 'Análises pedagógicas detalhadas',
      color: 'amber',
      action: () => navigate('/teachers/reports')
    },
    {
      icon: <MessageSquare />,
      title: 'Comunicação',
      description: 'Mensagens e feedback dos alunos',
      color: 'red',
      action: () => navigate('/teachers/messages')
    }
  ];

  // Turmas ativas migradas
  const activeClasses = [
    {
      id: 1,
      name: 'Piano Iniciante A',
      students: 12,
      progress: 72,
      nextLesson: 'Hoje, 14:00',
      lastActivity: 'Escalas básicas praticadas',
      color: 'blue'
    },
    {
      id: 2,
      name: 'Teclado Intermediário',
      students: 8,
      progress: 85,
      nextLesson: 'Amanhã, 10:00',
      lastActivity: 'Acordes avançados',
      color: 'emerald'
    },
    {
      id: 3,
      name: 'Piano Avançado',
      students: 8,
      progress: 91,
      nextLesson: 'Sexta, 16:00',
      lastActivity: 'Peças clássicas',
      color: 'amber'
    }
  ];

  // Próximas aulas migradas
  const upcomingLessons = [
    {
      id: 1,
      class: 'Piano Iniciante A',
      topic: 'Postura e Técnica Básica',
      time: 'Hoje, 14:00',
      duration: '45 min',
      students: 12,
      prepared: true
    },
    {
      id: 2,
      class: 'Teclado Intermediário',
      topic: 'Acordes Sustenidos',
      time: 'Hoje, 16:00',
      duration: '60 min',
      students: 8,
      prepared: true
    },
    {
      id: 3,
      class: 'Piano Avançado',
      topic: 'Interpretação Musical',
      time: 'Amanhã, 10:00',
      duration: '60 min',
      students: 8,
      prepared: false
    }
  ];

  // Estudantes em destaque migrados
  const topStudents = [
    {
      id: 1,
      name: 'Ana Silva',
      class: 'Piano Iniciante A',
      progress: 95,
      lastActivity: '1h atrás',
      achievement: 'Primeira Música Completa'
    },
    {
      id: 2,
      name: 'João Santos',
      class: 'Teclado Intermediário',
      progress: 88,
      lastActivity: '3h atrás',
      achievement: 'Mestre dos Acordes'
    }
  ];

  const handleLogout = async () => {
    if (window.confirm('Tem certeza que deseja sair da área pedagógica? 🎌')) {
      try {
        await logout();
        navigate('/', { replace: true });
      } catch (error) {
        console.error('Erro ao fazer logout:', error);
      }
    }
  };

  const handleClassManagement = (classId) => {
    console.log(`Gerenciando turma: ${classId}`);
    navigate(`/teachers/class/${classId}`);
  };

  const handleLessonPrep = (lessonId) => {
    console.log(`Preparando aula: ${lessonId}`);
    navigate(`/teachers/lesson-prep/${lessonId}`);
  };

  // Carregar dados do professor
  useEffect(() => {
    const loadTeacherData = async () => {
      try {
        // Simular carregamento
        setTimeout(() => {
          setTeacherData(prev => ({ ...prev, loading: false }));
        }, 750);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setTeacherData(prev => ({ ...prev, loading: false }));
      }
    };

    loadTeacherData();
  }, []);

  if (teacherData.loading) {
    return (
      <Container {...theme.container}>
        <Navigation 
          title="Carregando área pedagógica..."
          user={userProfile}
          onLogout={handleLogout}
          {...theme.navigation}
        />
        <MainLayout>
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Preparando sua área pedagógica oriental...</p>
          </div>
        </MainLayout>
      </Container>
    );
  }

  return (
    <Container {...theme.container}>
      {/* Navegação Oriental Professor */}
      <Navigation
        title="Painel do Professor"
        user={userProfile}
        onLogout={handleLogout}
        menuItems={[
          { label: 'Turmas', onClick: () => navigate('/teachers/classes') },
          { label: 'Conteúdo', onClick: () => navigate('/teachers/content') },
          { label: 'Relatórios', onClick: () => navigate('/teachers/reports') }
        ]}
        {...theme.navigation}
      />

      <MainLayout>
        {/* Cabeçalho Oriental Professor */}
        <OrientalSection spacing="comfortable" className="mb-8">
          <OrientalWrapper className="text-center relative overflow-hidden">
            {/* Elementos flutuantes pedagógicos */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-4 left-4 text-blue-200 text-2xl animate-bounce" style={{ animationDelay: '0s' }}>🎼</div>
              <div className="absolute top-8 right-8 text-emerald-200 text-xl animate-bounce" style={{ animationDelay: '1s' }}>📚</div>
              <div className="absolute bottom-8 left-12 text-amber-200 text-lg animate-bounce" style={{ animationDelay: '2s' }}>🎓</div>
              <div className="absolute bottom-4 right-4 text-blue-200 text-xl animate-bounce" style={{ animationDelay: '3s' }}>⭐</div>
            </div>

            <div className="relative z-10 py-12">
              <div className="text-4xl mb-4">🎌</div>
              <h1 className="text-2xl font-light text-gray-900 mb-2">
                {DesignTokens.oriental.greetings.morning}, {userProfile?.full_name || 'Sensei'}!
              </h1>
              <p className="text-gray-600 mb-4">
                {teacherData.specialization} • {teacherData.experience} experiência
              </p>
              <div className="flex justify-center items-center space-x-8 text-sm text-gray-600">
                <span>🏫 {teacherData.activeClasses} turmas</span>
                <span>👥 {teacherData.totalStudents} estudantes</span>
                <span>📅 {teacherData.todayLessons} aulas hoje</span>
                <span>📊 {teacherData.averageProgress}% progresso</span>
              </div>
            </div>
          </OrientalWrapper>
        </OrientalSection>

        {/* Grid de Estatísticas Pedagógicas */}
        <OrientalSection spacing="normal" className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            📈 Visão Geral Pedagógica
          </h2>
          
          <StatsGrid layout="dashboard">
            {teacherStats.map((stat, index) => (
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

        {/* Ações Pedagógicas Rápidas */}
        <OrientalSection spacing="normal" className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            🛠️ Ferramentas Pedagógicas
          </h2>
          
          <OrientalGrid columns="auto-fit" gap="lg">
            {teacherActions.map((action, index) => (
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

        {/* Layout de duas colunas - Turmas e Próximas Aulas */}
        <OrientalGrid columns={2} gap="lg" className="mb-8">
          
          {/* Minhas Turmas */}
          <Card variant="oriental">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                🏫 Minhas Turmas
                <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                  {activeClasses.length} ativas
                </span>
              </h3>
              
              <OrientalStack spacing="md">
                {activeClasses.map((classItem) => (
                  <div key={classItem.id} className="border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition-colors">
                    <OrientalFlex justify="between" align="start" className="mb-3">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900 mb-1">{classItem.name}</h4>
                        <p className="text-xs text-gray-600 mb-2">
                          {classItem.students} estudantes • Próxima: {classItem.nextLesson}
                        </p>
                        <p className="text-xs text-gray-500">{classItem.lastActivity}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-600 mb-1">Progresso</div>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full bg-${classItem.color}-500`}
                            style={{ width: `${classItem.progress}%` }}
                          ></div>
                        </div>
                        <div className="text-xs font-medium mt-1">{classItem.progress}%</div>
                      </div>
                    </OrientalFlex>
                    <Button 
                      variant="oriental" 
                      size="sm" 
                      className="w-full"
                      onClick={() => handleClassManagement(classItem.id)}
                    >
                      Gerenciar Turma
                    </Button>
                  </div>
                ))}
              </OrientalStack>
            </div>
          </Card>

          {/* Próximas Aulas */}
          <Card variant="oriental">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                📅 Próximas Aulas
                <span className="ml-2 text-xs bg-emerald-100 text-emerald-600 px-2 py-1 rounded-full">
                  {upcomingLessons.length} agendadas
                </span>
              </h3>
              
              <OrientalStack spacing="sm">
                {upcomingLessons.map((lesson) => (
                  <div key={lesson.id} className="border border-gray-100 rounded-xl p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">{lesson.class}</h4>
                        <p className="text-sm text-blue-600">{lesson.topic}</p>
                        <div className="flex items-center text-xs text-gray-600 mt-1">
                          <Clock className="w-3 h-3 mr-1" />
                          {lesson.time} • {lesson.duration} • {lesson.students} alunos
                        </div>
                      </div>
                      <div>
                        {lesson.prepared ? (
                          <CheckCircle className="w-5 h-5 text-emerald-500" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-amber-500" />
                        )}
                      </div>
                    </div>
                    <Button 
                      variant={lesson.prepared ? 'oriental' : 'outline'} 
                      size="xs" 
                      className="w-full"
                      onClick={() => handleLessonPrep(lesson.id)}
                    >
                      {lesson.prepared ? 'Iniciar Aula' : 'Preparar Conteúdo'}
                    </Button>
                  </div>
                ))}
              </OrientalStack>
            </div>
          </Card>
        </OrientalGrid>

        {/* Estudantes em Destaque */}
        <OrientalSection spacing="normal" className="mb-8">
          <Card variant="oriental">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                ⭐ Estudantes em Destaque
                <span className="ml-2 text-xs bg-amber-100 text-amber-600 px-2 py-1 rounded-full">
                  Top performers
                </span>
              </h3>
              
              <OrientalGrid columns={2} gap="md">
                {topStudents.map((student) => (
                  <div key={student.id} className="border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition-colors">
                    <OrientalFlex align="center" gap="sm">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-emerald-100 rounded-full flex items-center justify-center">
                        <GraduationCap className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">{student.name}</h4>
                        <p className="text-xs text-gray-600">{student.class}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-emerald-600 font-medium">{student.progress}%</span>
                          <span className="text-xs text-gray-500">{student.lastActivity}</span>
                        </div>
                        <span className="inline-block text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded mt-1">
                          {student.achievement}
                        </span>
                      </div>
                    </OrientalFlex>
                  </div>
                ))}
              </OrientalGrid>
            </div>
          </Card>
        </OrientalSection>

        {/* Inspiração Pedagógica Oriental */}
        <OrientalSection spacing="normal" className="mb-8">
          <Card variant="glassmorphism" className="text-center">
            <div className="py-8 px-6">
              <div className="text-4xl mb-4">🌸</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                "Ensinar é aprender duas vezes"
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Filosofia pedagógica oriental - Cada aluno é uma jornada única de descoberta musical
              </p>
              <OrientalFlex justify="center" gap="sm">
                <Button variant="outline" size="sm">
                  Metodologia Oriental
                </Button>
                <Button variant="oriental" size="sm">
                  Recursos Pedagógicos
                </Button>
              </OrientalFlex>
            </div>
          </Card>
        </OrientalSection>

        {/* Footer do Professor */}
        <div className="text-center py-8 border-t border-blue-100">
          <p className="text-sm text-gray-500 mb-2">
            🎌 Sua área pedagógica - Nipo School Teacher Dashboard
          </p>
          <p className="text-xs text-gray-400">
            Dashboard migrado para sistema oriental enterprise • Dados pedagógicos sincronizados
          </p>
        </div>
      </MainLayout>
    </Container>
  );
};

export default TeacherDashboard;