import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/working-auth-context';
import { useNavigate } from 'react-router-dom';

// 🎌 Importar nosso sistema de componentes orientais
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
  Award,
  TrendingUp,
  Music,
  Star,
  Calendar,
  BookOpen,
  Target,
  Zap,
  Heart,
  Trophy,
  Crown,
  Sparkles,
  Gift,
  Clock,
  Users,
  Volume2,
  Headphones,
  Camera,
  Mic
} from 'lucide-react';

/**
 * 🎌 StudentDashboard Oriental Extraordinário
 * Dashboard gamificado com progressão visual e elementos orientais
 */
const StudentDashboardOrientalExtraordinario = () => {
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

  // Estado do jogador (gamificação)
  const [playerData, setPlayerData] = useState({
    loading: true,
    level: 3,
    xp: 847,
    xpToNext: 1000,
    totalPoints: 2847,
    streak: 7,
    lessonsCompleted: 23,
    achievements: 8,
    instrument: 'Violino',
    rank: 'Estudante Dedicado',
    nextMilestone: 'Mestre dos Acordes'
  });

  // Conquistas recentes
  const recentAchievements = [
    {
      id: 1,
      name: 'Primeira Música',
      description: 'Tocou a primeira música completa!',
      icon: '🎵',
      xp: 100,
      earned: true,
      rarity: 'comum'
    },
    {
      id: 2,
      name: 'Sequência de Fogo',
      description: '7 dias seguidos praticando',
      icon: '🔥',
      xp: 200,
      earned: true,
      rarity: 'raro'
    },
    {
      id: 3,
      name: 'Nota Perfeita',
      description: 'Acertou todas as notas em uma música',
      icon: '⭐',
      xp: 150,
      earned: true,
      rarity: 'épico'
    },
    {
      id: 4,
      name: 'Mestre do Ritmo',
      description: 'Complete 50 exercícios de ritmo',
      icon: '🎼',
      xp: 300,
      earned: false,
      progress: 34,
      total: 50,
      rarity: 'lendário'
    }
  ];

  // Próximas aulas personalizadas
  const nextLessons = [
    {
      id: 1,
      title: 'Escalas Básicas no Violino',
      duration: '15 min',
      difficulty: 'Iniciante',
      xp: 25,
      icon: '🎻',
      progress: 0,
      category: 'Técnica'
    },
    {
      id: 2,
      title: 'Melodia Tradicional Japonesa',
      duration: '20 min',
      difficulty: 'Intermediário',
      xp: 40,
      icon: '🎌',
      progress: 0,
      category: 'Cultura'
    },
    {
      id: 3,
      title: 'Arco e Postura Correta',
      duration: '12 min',
      difficulty: 'Iniciante',
      xp: 30,
      icon: '🎯',
      progress: 0,
      category: 'Fundamentos'
    }
  ];

  // Estatísticas gamificadas
  const gameStats = [
    {
      icon: <Target />,
      value: `${playerData.totalPoints.toLocaleString()}`,
      label: 'Pontos XP Total',
      color: 'amber',
      trend: 'up',
      trendValue: '+247 hoje'
    },
    {
      icon: <Zap />,
      value: `${playerData.streak}`,
      label: 'Sequência de Dias',
      color: 'red',
      trend: 'up',
      trendValue: 'recorde pessoal!'
    },
    {
      icon: <BookOpen />,
      value: `${playerData.lessonsCompleted}`,
      label: 'Aulas Concluídas',
      color: 'blue',
      trend: 'up',
      trendValue: 'de 50 total'
    },
    {
      icon: <Award />,
      value: `${playerData.achievements}`,
      label: 'Conquistas',
      color: 'emerald',
      trend: 'up',
      trendValue: '2 novas!'
    }
  ];

  // Ações rápidas para estudantes
  const quickActions = [
    {
      icon: <Play />,
      title: 'Continuar Estudando',
      description: 'Retomar última aula',
      color: 'red',
      action: () => navigate('/students/continue-lesson')
    },
    {
      icon: <Music />,
      title: 'Biblioteca de Instrumentos',
      description: 'Explorar novos instrumentos',
      color: 'blue',
      action: () => navigate('/students/instruments')
    },
    {
      icon: <Trophy />,
      title: 'Minhas Conquistas',
      description: 'Ver progresso e medalhas',
      color: 'emerald',
      action: () => navigate('/students/achievements')
    },
    {
      icon: <Calendar />,
      title: 'Cronograma de Estudos',
      description: 'Planejar próximas sessões',
      color: 'amber',
      action: () => navigate('/students/schedule')
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

  const handleStartLesson = (lesson) => {
    console.log(`Iniciando aula: ${lesson.title}`);
    navigate(`/students/lesson/${lesson.id}`);
  };

  // Calcular progressão do nível
  const levelProgress = (playerData.xp / playerData.xpToNext) * 100;

  // Carregar dados do jogador
  useEffect(() => {
    const loadPlayerData = async () => {
      try {
        // Simular carregamento
        setTimeout(() => {
          setPlayerData(prev => ({ ...prev, loading: false }));
        }, 800);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setPlayerData(prev => ({ ...prev, loading: false }));
      }
    };

    loadPlayerData();
  }, []);

  if (playerData.loading) {
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
            <p className="text-gray-600">Preparando sua experiência oriental...</p>
          </div>
        </MainLayout>
      </Container>
    );
  }

  return (
    <Container {...theme.container}>
      {/* Navegação Oriental Estudante */}
      <Navigation
        title="Minha Jornada Musical"
        user={userProfile}
        onLogout={handleLogout}
        menuItems={[
          { label: 'Aulas', onClick: () => navigate('/students/lessons') },
          { label: 'Progresso', onClick: () => navigate('/students/progress') },
          { label: 'Instrumentos', onClick: () => navigate('/students/instruments') }
        ]}
        {...theme.navigation}
      />

      <MainLayout>
        {/* Círculo de Progresso Central Oriental */}
        <OrientalSection spacing="comfortable" className="mb-8">
          <OrientalWrapper className="text-center relative overflow-hidden">
            {/* Elementos flutuantes de fundo */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-4 left-4 text-orange-200 text-2xl animate-bounce" style={{ animationDelay: '0s' }}>🌸</div>
              <div className="absolute top-8 right-8 text-red-200 text-xl animate-bounce" style={{ animationDelay: '1s' }}>🎵</div>
              <div className="absolute bottom-8 left-12 text-pink-200 text-lg animate-bounce" style={{ animationDelay: '2s' }}>⭐</div>
              <div className="absolute bottom-4 right-4 text-amber-200 text-xl animate-bounce" style={{ animationDelay: '3s' }}>🎶</div>
            </div>

            <div className="relative z-10 py-12">
              {/* Círculo de Progresso */}
              <div className="relative w-32 h-32 mx-auto mb-6">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                  {/* Background circle */}
                  <circle 
                    cx="60" 
                    cy="60" 
                    r="50" 
                    fill="none" 
                    stroke="#fef2f2" 
                    strokeWidth="8"
                  />
                  {/* Progress circle */}
                  <circle 
                    cx="60" 
                    cy="60" 
                    r="50" 
                    fill="none" 
                    stroke="url(#gradient)" 
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${levelProgress * 3.14} 314`}
                    className="transition-all duration-1000 ease-out"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f97316" />
                      <stop offset="100%" stopColor="#ef4444" />
                    </linearGradient>
                  </defs>
                </svg>
                
                {/* Level no centro */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">
                      {playerData.level}
                    </div>
                    <div className="text-xs text-gray-600">NÍVEL</div>
                  </div>
                </div>
              </div>

              {/* Informações do Jogador */}
              <h1 className="text-2xl font-light text-gray-900 mb-2">
                {DesignTokens.oriental.greetings.afternoon}, {userProfile?.full_name || 'Estudante'}! 
              </h1>
              <p className="text-gray-600 mb-4">
                {playerData.rank} • {playerData.instrument}
              </p>
              
              {/* Barra de XP */}
              <div className="max-w-md mx-auto">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>{playerData.xp} XP</span>
                  <span>{playerData.xpToNext} XP</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${levelProgress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {playerData.xpToNext - playerData.xp} XP para o próximo nível
                </p>
              </div>
            </div>
          </OrientalWrapper>
        </OrientalSection>

        {/* Grid de Estatísticas Gamificadas */}
        <OrientalSection spacing="normal" className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            📊 Seu Progresso
          </h2>
          
          <StatsGrid layout="dashboard">
            {gameStats.map((stat, index) => (
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
            ⚡ Continue Aprendendo
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
          
          {/* Próximas Aulas */}
          <Card variant="oriental">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                🎓 Próximas Aulas
                <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                  {nextLessons.length} disponíveis
                </span>
              </h3>
              
              <OrientalStack spacing="md">
                {nextLessons.map((lesson) => (
                  <div key={lesson.id} className="border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition-colors">
                    <OrientalFlex justify="between" align="start" className="mb-2">
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          <span className="text-lg mr-2">{lesson.icon}</span>
                          <h4 className="text-sm font-medium text-gray-900">{lesson.title}</h4>
                        </div>
                        <p className="text-xs text-gray-600">
                          {lesson.duration} • {lesson.difficulty} • +{lesson.xp} XP
                        </p>
                        <span className="inline-block text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded mt-1">
                          {lesson.category}
                        </span>
                      </div>
                      <Button 
                        variant="oriental" 
                        size="sm"
                        onClick={() => handleStartLesson(lesson)}
                      >
                        Começar
                      </Button>
                    </OrientalFlex>
                  </div>
                ))}
              </OrientalStack>
            </div>
          </Card>

          {/* Conquistas Recentes */}
          <Card variant="oriental">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                🏆 Conquistas
                <span className="ml-2 text-xs bg-emerald-100 text-emerald-600 px-2 py-1 rounded-full">
                  {recentAchievements.filter(a => a.earned).length} desbloqueadas
                </span>
              </h3>
              
              <OrientalStack spacing="sm">
                {recentAchievements.map((achievement) => (
                  <div 
                    key={achievement.id} 
                    className={`border rounded-xl p-3 transition-colors ${
                      achievement.earned 
                        ? 'border-emerald-200 bg-emerald-50' 
                        : 'border-gray-200 bg-gray-50 opacity-60'
                    }`}
                  >
                    <OrientalFlex align="center" gap="sm">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900 flex items-center">
                          {achievement.name}
                          <span className={`ml-2 text-xs px-2 py-1 rounded ${
                            achievement.rarity === 'lendário' ? 'bg-purple-100 text-purple-600' :
                            achievement.rarity === 'épico' ? 'bg-orange-100 text-orange-600' :
                            achievement.rarity === 'raro' ? 'bg-blue-100 text-blue-600' :
                            'bg-gray-100 text-gray-600'
                          }`}>
                            {achievement.rarity}
                          </span>
                        </h4>
                        <p className="text-xs text-gray-600">{achievement.description}</p>
                        {!achievement.earned && achievement.progress && (
                          <div className="mt-2">
                            <div className="w-full bg-gray-200 rounded-full h-1">
                              <div 
                                className="bg-blue-500 h-1 rounded-full"
                                style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              {achievement.progress}/{achievement.total}
                            </p>
                          </div>
                        )}
                      </div>
                      {achievement.earned && (
                        <div className="text-xs text-emerald-600 font-medium">
                          +{achievement.xp} XP
                        </div>
                      )}
                    </OrientalFlex>
                  </div>
                ))}
              </OrientalStack>
            </div>
          </Card>
        </OrientalGrid>

        {/* Motivação Oriental */}
        <OrientalSection spacing="normal" className="mb-8">
          <Card variant="glassmorphism" className="text-center">
            <div className="py-8 px-6">
              <div className="text-4xl mb-4">🎌</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                "Se não for divertido, ninguém aprende"
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Filosofia Alpha School aplicada ao ensino musical oriental
              </p>
              <Button variant="oriental" size="lg">
                Continuar Jornada Musical
              </Button>
            </div>
          </Card>
        </OrientalSection>

        {/* Footer do Estudante */}
        <div className="text-center py-8 border-t border-orange-100">
          <p className="text-sm text-gray-500 mb-2">
            🎌 Sua jornada musical no Nipo School continua...
          </p>
          <p className="text-xs text-gray-400">
            Dashboard gamificado com componentes orientais • Progresso salvo automaticamente
          </p>
        </div>
      </MainLayout>
    </Container>
  );
};

export default StudentDashboardOrientalExtraordinario;