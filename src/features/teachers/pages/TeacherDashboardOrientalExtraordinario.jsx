import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/working-auth-context';
import { useNavigate } from 'react-router-dom';

// 🎌 Importar nosso sistema de componentes orientais
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
  TrendingUp,
  Award,
  Clock,
  Calendar,
  FileText,
  Music,
  Star,
  Target,
  Brain,
  Heart,
  PlusCircle,
  Eye,
  Edit,
  Send,
  BarChart3,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  UserCheck,
  GraduationCap,
  Violin,
  Piano,
  Mic,
  Headphones,
  Video,
  Download,
  Upload
} from 'lucide-react';

/**
 * 🎌 TeacherDashboard Oriental Extraordinário
 * Dashboard pedagógico com gestão de turmas e análises orientais
 */
const TeacherDashboardOrientalExtraordinario = () => {
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

  // Estado do professor
  const [teacherData, setTeacherData] = useState({
    loading: true,
    activeClasses: 4,
    totalStudents: 38,
    thisWeekLessons: 12,
    completionRate: 87,
    averageProgress: 74,
    pendingAssignments: 6,
    newMessages: 3,
    upcomingLessons: 5,
    totalExperience: '3 anos',
    specialization: 'Instrumentos de Corda',
    certification: 'Método Orff-Schulwerk'
  });

  // Turmas ativas
  const activeClasses = [
    {
      id: 1,
      name: 'Violino Iniciante A',
      students: 12,
      level: 'Iniciante',
      nextLesson: '2025-10-04 09:00',
      progress: 68,
      instrument: '🎻',
      color: 'blue',
      recentActivity: 'Prática de escalas básicas'
    },
    {
      id: 2,
      name: 'Piano Intermediário',
      students: 8,
      level: 'Intermediário',
      nextLesson: '2025-10-04 14:00',
      progress: 82,
      instrument: '🎹',
      color: 'emerald',
      recentActivity: 'Melodias japonesas tradicionais'
    },
    {
      id: 3,
      name: 'Violão Popular',
      students: 10,
      level: 'Iniciante',
      nextLesson: '2025-10-05 10:00',
      progress: 45,
      instrument: '🎸',
      color: 'amber',
      recentActivity: 'Acordes básicos'
    },
    {
      id: 4,
      name: 'Flauta Oriental',
      students: 8,
      level: 'Avançado',
      nextLesson: '2025-10-05 16:00',
      progress: 91,
      instrument: '🪈',
      color: 'red',
      recentActivity: 'Técnicas de respiração zen'
    }
  ];

  // Progresso dos estudantes destacados
  const topStudents = [
    {
      id: 1,
      name: 'Ana Silva',
      class: 'Violino Iniciante A',
      progress: 95,
      streak: 12,
      lastActivity: '2h atrás',
      achievement: 'Primeira Música Completa',
      avatar: '👩‍🎓'
    },
    {
      id: 2,
      name: 'João Santos',
      class: 'Piano Intermediário',
      progress: 89,
      streak: 8,
      lastActivity: '4h atrás',
      achievement: 'Mestre do Ritmo',
      avatar: '👨‍🎓'
    },
    {
      id: 3,
      name: 'Maria Tanaka',
      class: 'Flauta Oriental',
      progress: 98,
      streak: 15,
      lastActivity: '1h atrás',
      achievement: 'Respiração Zen',
      avatar: '👩‍🎓'
    }
  ];

  // Estatísticas pedagógicas
  const teachingStats = [
    {
      icon: <Users />,
      value: `${teacherData.totalStudents}`,
      label: 'Estudantes Ativos',
      color: 'blue',
      trend: 'up',
      trendValue: '+3 esta semana'
    },
    {
      icon: <BookOpen />,
      value: `${teacherData.thisWeekLessons}`,
      label: 'Aulas Esta Semana',
      color: 'emerald',
      trend: 'stable',
      trendValue: 'programadas'
    },
    {
      icon: <TrendingUp />,
      value: `${teacherData.completionRate}%`,
      label: 'Taxa de Conclusão',
      color: 'amber',
      trend: 'up',
      trendValue: '+5% vs mês passado'
    },
    {
      icon: <Award />,
      value: `${teacherData.averageProgress}%`,
      label: 'Progresso Médio',
      color: 'red',
      trend: 'up',
      trendValue: 'turmas engajadas'
    }
  ];

  // Ações rápidas para professores
  const quickActions = [
    {
      icon: <PlusCircle />,
      title: 'Nova Aula',
      description: 'Criar conteúdo de aula',
      color: 'blue',
      action: () => navigate('/teachers/create-lesson')
    },
    {
      icon: <Eye />,
      title: 'Acompanhar Turmas',
      description: 'Ver progresso individual',
      color: 'emerald',
      action: () => navigate('/teachers/class-progress')
    },
    {
      icon: <BarChart3 />,
      title: 'Relatórios',
      description: 'Análises pedagógicas',
      color: 'amber',
      action: () => navigate('/teachers/reports')
    },
    {
      icon: <MessageSquare />,
      title: 'Comunicação',
      description: 'Mensagens e feedback',
      color: 'red',
      action: () => navigate('/teachers/messages')
    }
  ];

  // Próximas aulas agendadas
  const upcomingLessons = [
    {
      id: 1,
      class: 'Violino Iniciante A',
      topic: 'Postura e Arco',
      time: 'Hoje, 09:00',
      duration: '45 min',
      students: 12,
      prepared: true,
      type: 'Presencial'
    },
    {
      id: 2,
      class: 'Piano Intermediário',
      topic: 'Escalas Maiores',
      time: 'Hoje, 14:00',
      duration: '60 min',
      students: 8,
      prepared: true,
      type: 'Híbrido'
    },
    {
      id: 3,
      class: 'Violão Popular',
      topic: 'Acordes Sustenidos',
      time: 'Amanhã, 10:00',
      duration: '45 min',
      students: 10,
      prepared: false,
      type: 'Online'
    }
  ];

  const handleLogout = async () => {
    if (window.confirm('Tem certeza que deseja sair? Suas aulas serão salvas! 🎌')) {
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

  const handleStudentDetail = (studentId) => {
    console.log(`Visualizando estudante: ${studentId}`);
    navigate(`/teachers/student/${studentId}`);
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
        }, 900);
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
            <p className="text-gray-600">Preparando sua área de ensino oriental...</p>
          </div>
        </MainLayout>
      </Container>
    );
  }

  return (
    <Container {...theme.container}>
      {/* Navegação Oriental Professor */}
      <Navigation
        title="Área Pedagógica"
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
              <div className="absolute bottom-4 right-4 text-red-200 text-xl animate-bounce" style={{ animationDelay: '3s' }}>⭐</div>
            </div>

            <div className="relative z-10 py-12">
              <div className="text-4xl mb-4">🎌</div>
              <h1 className="text-2xl font-light text-gray-900 mb-2">
                {DesignTokens.oriental.greetings.morning}, {userProfile?.full_name || 'Sensei'}!
              </h1>
              <p className="text-gray-600 mb-4">
                {teacherData.specialization} • {teacherData.certification}
              </p>
              <div className="flex justify-center items-center space-x-8 text-sm text-gray-600">
                <span>📊 {teacherData.activeClasses} turmas ativas</span>
                <span>👥 {teacherData.totalStudents} estudantes</span>
                <span>⏰ {teacherData.upcomingLessons} próximas aulas</span>
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
            {teachingStats.map((stat, index) => (
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

        {/* Ações Rápidas Pedagógicas */}
        <OrientalSection spacing="normal" className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            ⚡ Ferramentas Pedagógicas
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

        {/* Layout de três colunas */}
        <OrientalGrid columns={3} gap="lg" className="mb-8">
          
          {/* Turmas Ativas */}
          <Card variant="oriental" className="col-span-2">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                🏫 Suas Turmas
                <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                  {activeClasses.length} ativas
                </span>
              </h3>
              
              <OrientalStack spacing="md">
                {activeClasses.map((classItem) => (
                  <div key={classItem.id} className="border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition-colors">
                    <OrientalFlex justify="between" align="start" className="mb-3">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span className="text-2xl mr-3">{classItem.instrument}</span>
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">{classItem.name}</h4>
                            <p className="text-xs text-gray-600">
                              {classItem.students} estudantes • {classItem.level}
                            </p>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mb-2">{classItem.recentActivity}</p>
                        <div className="flex items-center text-xs text-gray-600">
                          <Clock className="w-3 h-3 mr-1" />
                          Próxima: {new Date(classItem.nextLesson).toLocaleDateString('pt-BR', { 
                            day: '2-digit', 
                            month: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-600 mb-2">Progresso</div>
                        <div className="w-16 bg-gray-200 rounded-full h-2 mb-2">
                          <div 
                            className={`h-2 rounded-full bg-${classItem.color}-500`}
                            style={{ width: `${classItem.progress}%` }}
                          ></div>
                        </div>
                        <div className="text-xs font-medium">{classItem.progress}%</div>
                      </div>
                    </OrientalFlex>
                    <OrientalFlex gap="sm" className="mt-3">
                      <Button 
                        variant="outline" 
                        size="xs"
                        onClick={() => handleClassManagement(classItem.id)}
                      >
                        Gerenciar
                      </Button>
                      <Button 
                        variant="oriental" 
                        size="xs"
                        onClick={() => navigate(`/teachers/class/${classItem.id}/lesson`)}
                      >
                        Iniciar Aula
                      </Button>
                    </OrientalFlex>
                  </div>
                ))}
              </OrientalStack>
            </div>
          </Card>

          {/* Estudantes Destacados */}
          <Card variant="oriental">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                ⭐ Destaques
                <span className="ml-2 text-xs bg-emerald-100 text-emerald-600 px-2 py-1 rounded-full">
                  Top 3
                </span>
              </h3>
              
              <OrientalStack spacing="sm">
                {topStudents.map((student, position) => (
                  <div 
                    key={student.id} 
                    className="border border-gray-100 rounded-xl p-3 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => handleStudentDetail(student.id)}
                  >
                    <OrientalFlex align="center" gap="sm">
                      <div className="text-2xl">{student.avatar}</div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900 flex items-center">
                          {student.name}
                          {position === 0 && <span className="ml-1 text-amber-500">🥇</span>}
                          {position === 1 && <span className="ml-1 text-gray-400">🥈</span>}
                          {position === 2 && <span className="ml-1 text-amber-600">🥉</span>}
                        </h4>
                        <p className="text-xs text-gray-600">{student.class}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-emerald-600 font-medium">
                            {student.progress}% • {student.streak} dias
                          </span>
                          <span className="text-xs text-gray-500">{student.lastActivity}</span>
                        </div>
                        <span className="inline-block text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded mt-1">
                          {student.achievement}
                        </span>
                      </div>
                    </OrientalFlex>
                  </div>
                ))}
              </OrientalStack>
            </div>
          </Card>
        </OrientalGrid>

        {/* Próximas Aulas e Planejamento */}
        <OrientalSection spacing="normal" className="mb-8">
          <Card variant="oriental">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                📅 Próximas Aulas
                <span className="ml-2 text-xs bg-amber-100 text-amber-600 px-2 py-1 rounded-full">
                  {upcomingLessons.length} agendadas
                </span>
              </h3>
              
              <OrientalGrid columns={3} gap="md">
                {upcomingLessons.map((lesson) => (
                  <div key={lesson.id} className="border border-gray-100 rounded-xl p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">{lesson.class}</h4>
                        <p className="text-sm text-blue-600 font-medium">{lesson.topic}</p>
                        <div className="flex items-center text-xs text-gray-600 mt-1">
                          <Clock className="w-3 h-3 mr-1" />
                          {lesson.time} • {lesson.duration}
                        </div>
                        <div className="flex items-center text-xs text-gray-600 mt-1">
                          <Users className="w-3 h-3 mr-1" />
                          {lesson.students} estudantes • {lesson.type}
                        </div>
                      </div>
                      <div className="text-right">
                        {lesson.prepared ? (
                          <CheckCircle className="w-5 h-5 text-emerald-500" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-amber-500" />
                        )}
                      </div>
                    </div>
                    <Button 
                      variant={lesson.prepared ? 'oriental' : 'outline'} 
                      size="sm" 
                      className="w-full"
                      onClick={() => handleLessonPrep(lesson.id)}
                    >
                      {lesson.prepared ? 'Iniciar Aula' : 'Preparar Conteúdo'}
                    </Button>
                  </div>
                ))}
              </OrientalGrid>
            </div>
          </Card>
        </OrientalSection>

        {/* Insights Pedagógicos */}
        <OrientalSection spacing="normal" className="mb-8">
          <Card variant="glassmorphism" className="text-center">
            <div className="py-8 px-6">
              <div className="text-4xl mb-4">🌸</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                "O professor é como uma ponte que convida os estudantes a atravessá-la"
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Filosofia oriental aplicada ao ensino musical - Carl Orff e métodos orientais
              </p>
              <OrientalFlex justify="center" gap="sm">
                <Button variant="outline" size="sm">
                  Ver Metodologia
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
            🎌 Sua área pedagógica no Nipo School - Inspirando através da música
          </p>
          <p className="text-xs text-gray-400">
            Dashboard pedagógico com componentes orientais • Dados sincronizados automaticamente
          </p>
        </div>
      </MainLayout>
    </Container>
  );
};

export default TeacherDashboardOrientalExtraordinario;