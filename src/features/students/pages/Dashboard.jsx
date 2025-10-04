import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/working-auth-context';
import { useNavigate } from 'react-router-dom';

// 🎌 MIGRAÇÃO COMPLETA PARA SISTEMA ORIENTAL ENTERPRISE
import {
  StudentDashboardKit,
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
  Play,
  BookOpen,
  Target,
  Star,
  Calendar,
  Music,
  Award,
  TrendingUp,
  Clock,
  Heart,
  Zap,
  Headphones,
  Volume2,
  Camera,
  Mic
} from 'lucide-react';

/**
 * 🎌 Dashboard do Estudante - MIGRADO PARA ORIENTAL ENTERPRISE
 * 
 * Dashboard principal dos estudantes utilizando sistema de componentes orientais.
 * Migrado do layout tradicional para design system empresarial oriental gamificado.
 */
const StudentDashboard = () => {
  const { userProfile, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useOrientalTheme('student');
  
  // Desestruturar componentes do kit estudante
  const { 
    Container, 
    Navigation, 
    StatsGrid, 
    StatCard, 
    ActionCard,
    MainLayout
  } = StudentDashboardKit;

  // Estado do estudante migrado
  const [studentData, setStudentData] = useState({
    loading: true,
    level: 2,
    xp: 420,
    xpToNext: 600,
    completedLessons: 12,
    currentStreak: 5,
    totalPoints: 1420,
    achievements: 4,
    currentInstrument: 'Piano',
    nextLesson: 'Escalas Básicas',
    studyTime: '2h 15min'
  });

  // Estatísticas do estudante migradas para oriental
  const studentStats = [
    {
      icon: <Target />,
      value: `${studentData.totalPoints}`,
      label: 'Pontos XP',
      color: 'amber',
      trend: 'up',
      trendValue: '+85 hoje'
    },
    {
      icon: <Zap />,
      value: `${studentData.currentStreak}`,
      label: 'Sequência',
      color: 'red',
      trend: 'up',
      trendValue: 'dias seguidos'
    },
    {
      icon: <BookOpen />,
      value: `${studentData.completedLessons}`,
      label: 'Aulas Concluídas',
      color: 'blue',
      trend: 'up',
      trendValue: 'de 30 total'
    },
    {
      icon: <Award />,
      value: `${studentData.achievements}`,
      label: 'Conquistas',
      color: 'emerald',
      trend: 'up',
      trendValue: '1 nova!'
    }
  ];

  // Ações do estudante migradas
  const studentActions = [
    {
      icon: <Play />,
      title: 'Continuar Estudando',
      description: 'Retomar a próxima lição',
      color: 'red',
      action: () => navigate('/students/continue-lesson')
    },
    {
      icon: <Music />,
      title: 'Biblioteca Musical',
      description: 'Explorar instrumentos e partituras',
      color: 'blue',
      action: () => navigate('/students/library')
    },
    {
      icon: <Target />,
      title: 'Meu Progresso',
      description: 'Ver estatísticas detalhadas',
      color: 'emerald',
      action: () => navigate('/students/progress')
    },
    {
      icon: <Calendar />,
      title: 'Cronograma',
      description: 'Planejar próximas sessões',
      color: 'amber',
      action: () => navigate('/students/schedule')
    }
  ];

  // Próximas atividades migradas
  const nextActivities = [
    {
      id: 1,
      title: 'Escalas Básicas - Piano',
      type: 'Lição Interativa',
      duration: '15 min',
      xp: 25,
      difficulty: 'Iniciante',
      progress: 0
    },
    {
      id: 2,
      title: 'Exercício de Ritmo',
      type: 'Prática',
      duration: '10 min',
      xp: 15,
      difficulty: 'Fácil',
      progress: 0
    },
    {
      id: 3,
      title: 'Teoria Musical: Notas',
      type: 'Estudo',
      duration: '20 min',
      xp: 30,
      difficulty: 'Iniciante',
      progress: 60
    }
  ];

  // Conquistas recentes migradas
  const recentAchievements = [
    {
      id: 1,
      name: 'Primeira Nota Perfeita',
      description: 'Acertou uma nota com precisão',
      icon: '🎵',
      earned: true,
      rarity: 'comum'
    },
    {
      id: 2,
      name: 'Dedicação Diária',
      description: '5 dias seguidos praticando',
      icon: '🔥',
      earned: true,
      rarity: 'raro'
    },
    {
      id: 3,
      name: 'Explorador Musical',
      description: 'Testou 3 instrumentos diferentes',
      icon: '🎸',
      earned: true,
      rarity: 'épico'
    }
  ];

  const handleLogout = async () => {
    if (window.confirm('Tem certeza que deseja sair? Seu progresso será salvo! 🎌')) {
      try {
        await logout();
        navigate('/', { replace: true });
      } catch (error) {
        console.error('Erro ao fazer logout:', error);
      }
    }
  };

  const handleStartActivity = (activity) => {
    console.log(`Iniciando atividade: ${activity.title}`);
    navigate(`/students/lesson/${activity.id}`);
  };

  // Calcular progressão do nível
  const levelProgress = (studentData.xp / studentData.xpToNext) * 100;

  // Carregar dados do estudante
  useEffect(() => {
    const loadStudentData = async () => {
      try {
        // Simular carregamento
        setTimeout(() => {
          setStudentData(prev => ({ ...prev, loading: false }));
        }, 600);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setStudentData(prev => ({ ...prev, loading: false }));
      }
    };

    loadStudentData();
  }, []);

  if (studentData.loading) {
    return (
      <Container {...theme.container}>
        <Navigation 
          title="Carregando sua jornada musical..."
          user={userProfile}
          onLogout={handleLogout}
          {...theme.navigation}
        />
        <MainLayout>
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Preparando seu painel de estudos oriental...</p>
          </div>
        </MainLayout>
      </Container>
    );
  }

  return (
    <Container {...theme.container}>
      {/* Navegação Oriental Estudante */}
      <Navigation
        title="Meu Painel de Estudos"
        user={userProfile}
        onLogout={handleLogout}
        menuItems={[
          { label: 'Aulas', onClick: () => navigate('/students/lessons') },
          { label: 'Progresso', onClick: () => navigate('/students/progress') },
          { label: 'Biblioteca', onClick: () => navigate('/students/library') }
        ]}
        {...theme.navigation}
      />

      <MainLayout>
        {/* Cabeçalho Oriental Estudante */}
        <OrientalSection spacing="comfortable" className="mb-8">
          <OrientalWrapper className="text-center relative overflow-hidden">
            {/* Elementos flutuantes musicais */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-4 left-4 text-orange-200 text-2xl animate-bounce" style={{ animationDelay: '0s' }}>🎵</div>
              <div className="absolute top-8 right-8 text-red-200 text-xl animate-bounce" style={{ animationDelay: '1s' }}>⭐</div>
              <div className="absolute bottom-8 left-12 text-pink-200 text-lg animate-bounce" style={{ animationDelay: '2s' }}>🎶</div>
              <div className="absolute bottom-4 right-4 text-amber-200 text-xl animate-bounce" style={{ animationDelay: '3s' }}>🌸</div>
            </div>

            <div className="relative z-10 py-12">
              {/* Círculo de Progresso Oriental */}
              <div className="relative w-24 h-24 mx-auto mb-6">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    fill="none" 
                    stroke="#fef2f2" 
                    strokeWidth="6"
                  />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    fill="none" 
                    stroke="url(#studentGradient)" 
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={`${levelProgress * 2.51} 251`}
                    className="transition-all duration-1000 ease-out"
                  />
                  <defs>
                    <linearGradient id="studentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f97316" />
                      <stop offset="100%" stopColor="#ef4444" />
                    </linearGradient>
                  </defs>
                </svg>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-900">
                      {studentData.level}
                    </div>
                    <div className="text-xs text-gray-600">LVL</div>
                  </div>
                </div>
              </div>

              <h1 className="text-2xl font-light text-gray-900 mb-2">
                {DesignTokens.oriental.greetings.afternoon}, {userProfile?.full_name || 'Estudante'}! 
              </h1>
              <p className="text-gray-600 mb-4">
                Continue sua jornada musical • {studentData.currentInstrument}
              </p>
              
              {/* Barra de XP Oriental */}
              <div className="max-w-sm mx-auto">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>{studentData.xp} XP</span>
                  <span>{studentData.xpToNext} XP</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${levelProgress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Próximo nível em {studentData.xpToNext - studentData.xp} XP
                </p>
              </div>
            </div>
          </OrientalWrapper>
        </OrientalSection>

        {/* Grid de Estatísticas Gamificadas */}
        <OrientalSection spacing="normal" className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            📊 Meu Progresso Musical
          </h2>
          
          <StatsGrid layout="dashboard">
            {studentStats.map((stat, index) => (
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

        {/* Ações Rápidas */}
        <OrientalSection spacing="normal" className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            🚀 Continue Aprendendo
          </h2>
          
          <OrientalGrid columns="auto-fit" gap="lg">
            {studentActions.map((action, index) => (
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

        {/* Layout de duas colunas - Atividades e Conquistas */}
        <OrientalGrid columns={2} gap="lg" className="mb-8">
          
          {/* Próximas Atividades */}
          <Card variant="oriental">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                📚 Próximas Atividades
                <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                  {nextActivities.length} disponíveis
                </span>
              </h3>
              
              <OrientalStack spacing="md">
                {nextActivities.map((activity) => (
                  <div key={activity.id} className="border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition-colors">
                    <div className="mb-3">
                      <h4 className="text-sm font-medium text-gray-900 mb-1">{activity.title}</h4>
                      <p className="text-xs text-gray-600">
                        {activity.type} • {activity.duration} • +{activity.xp} XP
                      </p>
                      <span className="inline-block text-xs bg-green-100 text-green-600 px-2 py-1 rounded mt-1">
                        {activity.difficulty}
                      </span>
                    </div>
                    
                    {activity.progress > 0 && (
                      <div className="mb-3">
                        <div className="w-full bg-gray-200 rounded-full h-1">
                          <div 
                            className="bg-blue-500 h-1 rounded-full"
                            style={{ width: `${activity.progress}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{activity.progress}% concluído</p>
                      </div>
                    )}
                    
                    <Button 
                      variant="oriental" 
                      size="sm" 
                      className="w-full"
                      onClick={() => handleStartActivity(activity)}
                    >
                      {activity.progress > 0 ? 'Continuar' : 'Começar'}
                    </Button>
                  </div>
                ))}
              </OrientalStack>
            </div>
          </Card>

          {/* Conquistas Recentes */}
          <Card variant="oriental">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                🏆 Minhas Conquistas
                <span className="ml-2 text-xs bg-emerald-100 text-emerald-600 px-2 py-1 rounded-full">
                  {recentAchievements.length} desbloqueadas
                </span>
              </h3>
              
              <OrientalStack spacing="sm">
                {recentAchievements.map((achievement) => (
                  <div 
                    key={achievement.id} 
                    className="border border-emerald-200 bg-emerald-50 rounded-xl p-3"
                  >
                    <OrientalFlex align="center" gap="sm">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900 flex items-center">
                          {achievement.name}
                          <span className={`ml-2 text-xs px-2 py-1 rounded ${
                            achievement.rarity === 'épico' ? 'bg-purple-100 text-purple-600' :
                            achievement.rarity === 'raro' ? 'bg-blue-100 text-blue-600' :
                            'bg-gray-100 text-gray-600'
                          }`}>
                            {achievement.rarity}
                          </span>
                        </h4>
                        <p className="text-xs text-gray-600">{achievement.description}</p>
                      </div>
                    </OrientalFlex>
                  </div>
                ))}
              </OrientalStack>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Button variant="outline" size="sm" className="w-full">
                  Ver Todas as Conquistas
                </Button>
              </div>
            </div>
          </Card>
        </OrientalGrid>

        {/* Motivação Oriental */}
        <OrientalSection spacing="normal" className="mb-8">
          <Card variant="glassmorphism" className="text-center">
            <div className="py-8 px-6">
              <div className="text-4xl mb-4">🎌</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                "A música é a linguagem universal da alma"
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Continue sua jornada musical no Nipo School - Cada nota é um passo em direção à maestria
              </p>
              <Button variant="oriental" size="lg">
                Próxima Lição
              </Button>
            </div>
          </Card>
        </OrientalSection>

        {/* Footer do Estudante */}
        <div className="text-center py-8 border-t border-orange-100">
          <p className="text-sm text-gray-500 mb-2">
            🎌 Sua jornada musical continua - Nipo School Student Dashboard
          </p>
          <p className="text-xs text-gray-400">
            Dashboard migrado para sistema oriental enterprise • Progresso sincronizado automaticamente
          </p>
        </div>
      </MainLayout>
    </Container>
  );
};

export default StudentDashboard;