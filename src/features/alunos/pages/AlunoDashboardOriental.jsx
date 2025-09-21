import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../../shared/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../shared/lib/supabase/supabaseClient';

// Sistema Oriental Unificado
import {
  OrientalContainer,
  OrientalNavigation,
  OrientalStatCard,
  OrientalActionButton,
  OrientalWelcomeHeader,
  OrientalGrid
} from '../../../shared/components/oriental/OrientalComponents';

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
  LogOut
} from 'lucide-react';

const AlunoDashboardOriental = () => {
  const { user, userProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [greeting, setGreeting] = useState('');
  
  // Estados gamificados para alunos
  const [playerStats, setPlayerStats] = useState({
    level: 1,
    xp: 0,
    xpToNext: 100,
    totalAulas: 0,
    aulasCompletas: 0,
    streak: 0,
    conquistas: 0,
    instrumentoPrincipal: 'Violino',
    progressoGeral: 0
  });

  const [achievementsRecentes, setAchievementsRecentes] = useState([]);
  const [proximasAulas, setProximasAulas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Inicialização
  useEffect(() => {
    setMounted(true);
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('おはよう');
    else if (hour < 18) setGreeting('こんにちは');
    else setGreeting('こんばんは');
  }, []);

  const loadPlayerData = useCallback(async () => {
    try {
      setLoading(true);

      const alunoId = userProfile?.id;
      
      // Buscar dados do progresso do aluno
      const [
        { data: achievements },
        { data: aulas },
        { data: progresso }
      ] = await Promise.all([
        supabase.from('achievements_progress').select('*').eq('user_id', alunoId),
        supabase.from('aulas').select('*', { count: 'exact' }),
        supabase.from('user_progress').select('*').eq('user_id', alunoId)
      ]);

      // Simular dados gamificados realistas
      const level = Math.floor(Math.random() * 5) + 1; // Level 1-5
      const xp = Math.floor(Math.random() * 300) + 50; // 50-350 XP
      const xpToNext = level * 100; // XP necessário para próximo level
      const aulasCompletas = Math.floor(Math.random() * 15) + 5; // 5-20 aulas
      const totalAulasDisponiveis = aulas?.length || 30;
      const streak = Math.floor(Math.random() * 7) + 1; // Sequência de 1-7 dias
      const conquistas = achievements?.length || Math.floor(Math.random() * 8) + 2;
      const progressoGeral = Math.floor((aulasCompletas / totalAulasDisponiveis) * 100);

      setPlayerStats({
        level,
        xp,
        xpToNext,
        totalAulas: totalAulasDisponiveis,
        aulasCompletas,
        streak,
        conquistas,
        instrumentoPrincipal: 'Violino',
        progressoGeral
      });

      // Achievements recentes (gamificação)
      setAchievementsRecentes([
        { id: 1, name: 'Primeira Música', icon: '🎵', description: 'Tocou a primeira música completa!', xp: 50 },
        { id: 2, name: 'Dedicado', icon: '📚', description: '7 dias seguidos de prática', xp: 100 },
        { id: 3, name: 'Estrela Nascente', icon: '⭐', description: 'Nota perfeita em 5 exercícios', xp: 75 }
      ]);

      // Próximas aulas (personalizadas)
      setProximasAulas([
        { id: 1, titulo: 'Escalas Básicas', duracao: '15 min', dificuldade: 'Fácil', xp: 25 },
        { id: 2, titulo: 'Melodia Popular', duracao: '20 min', dificuldade: 'Médio', xp: 40 },
        { id: 3, titulo: 'Técnica de Arco', duracao: '18 min', dificuldade: 'Fácil', xp: 30 }
      ]);

    } catch (error) {
      console.error('Erro ao carregar dados do aluno:', error);
      
      // Fallback com dados de demonstração
      setPlayerStats({
        level: 2,
        xp: 150,
        xpToNext: 200,
        totalAulas: 30,
        aulasCompletas: 8,
        streak: 3,
        conquistas: 5,
        instrumentoPrincipal: 'Violino',
        progressoGeral: 27
      });
      
    } finally {
      setLoading(false);
    }
  }, [userProfile]);

  useEffect(() => {
    if (mounted && userProfile?.id) {
      loadPlayerData();
    }
  }, [mounted, userProfile, loadPlayerData]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  if (!mounted || loading) {
    return (
      <OrientalContainer level="student">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
              <span className="text-white text-3xl">学</span>
            </div>
            <p className="text-gray-600 text-lg">Carregando sua jornada musical...</p>
            <div className="mt-4 flex items-center justify-center space-x-1">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        </div>
      </OrientalContainer>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <OrientalContainer level="student">
        {/* Navegação Oriental Minimalista */}
        <OrientalNavigation 
          user={user} 
          level="student" 
        />

        {/* Conteúdo Principal Ultra-Leve */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        
        {/* Header de Boas Vindas Gamificado */}
        <OrientalWelcomeHeader 
          user={userProfile} 
          greeting={greeting} 
          level="student" 
        />

        {/* Player Level & XP - Destaque Principal */}
        <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-3xl p-8 mb-8 border border-orange-200 relative overflow-hidden">
          {/* Elementos decorativos */}
          <div className="absolute top-4 right-4 text-6xl opacity-10">🎵</div>
          <div className="absolute bottom-4 left-4 text-4xl opacity-10">🌸</div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Level {playerStats.level}</h2>
                  <p className="text-gray-600">{playerStats.instrumentoPrincipal} • {playerStats.xp} XP</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-3xl font-bold text-orange-600">{playerStats.progressoGeral}%</div>
                <p className="text-sm text-gray-600">Progresso Geral</p>
              </div>
            </div>

            {/* Barra de XP */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Próximo Level</span>
                <span>{playerStats.xp}/{playerStats.xpToNext} XP</span>
              </div>
              <div className="w-full bg-white/60 rounded-full h-3 shadow-inner">
                <div 
                  className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full transition-all duration-500 shadow-sm"
                  style={{ width: `${(playerStats.xp / playerStats.xpToNext) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Streak Counter */}
            <div className="flex items-center space-x-2 text-orange-600">
              <Zap className="w-5 h-5" />
              <span className="font-bold">{playerStats.streak} dias de sequência!</span>
              <span className="text-2xl">🔥</span>
            </div>
          </div>
        </div>

        {/* Stats Principais - Grid Leve para Alunos */}
        <OrientalGrid level="student" className="mb-8">
          <OrientalStatCard
            title="Aulas Completas"
            value={`${playerStats.aulasCompletas}/${playerStats.totalAulas}`}
            icon={Play}
            level="student"
          />
          <OrientalStatCard
            title="Conquistas"
            value={playerStats.conquistas}
            icon={Trophy}
            level="student"
          />
          <OrientalStatCard
            title="Sequência"
            value={`${playerStats.streak} dias`}
            icon={Target}
            level="student"
          />
          <OrientalStatCard
            title="Nível"
            value={playerStats.level}
            icon={Crown}
            level="student"
          />
        </OrientalGrid>

        {/* Próximas Aulas - Cards Grandes e Atrativos */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Play className="w-6 h-6 mr-2 text-orange-500" />
            Continue Aprendendo
          </h3>
          
          <div className="space-y-4">
            {proximasAulas.map((aula) => (
              <div key={aula.id} className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-orange-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{aula.titulo}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{aula.duracao}</span>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        aula.dificuldade === 'Fácil' ? 'bg-green-100 text-green-700' : 
                        aula.dificuldade === 'Médio' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {aula.dificuldade}
                      </div>
                      <div className="flex items-center space-x-1 text-orange-600">
                        <Star className="w-4 h-4" />
                        <span>{aula.xp} XP</span>
                      </div>
                    </div>
                  </div>
                  
                  <OrientalActionButton level="student" size="large">
                    <Play className="w-5 h-5 mr-2" />
                    Começar
                  </OrientalActionButton>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conquistas Recentes */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Award className="w-6 h-6 mr-2 text-yellow-500" />
            Suas Conquistas
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {achievementsRecentes.map((achievement) => (
              <div key={achievement.id} className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200 text-center">
                <div className="text-4xl mb-3">{achievement.icon}</div>
                <h4 className="font-bold text-gray-900 mb-2">{achievement.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                <div className="flex items-center justify-center space-x-1 text-orange-600">
                  <Sparkles className="w-4 h-4" />
                  <span className="font-bold">+{achievement.xp} XP</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ações Principais - Grandes e Intuitivas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <OrientalActionButton 
            level="student" 
            className="w-full flex flex-col items-center p-8 space-y-4 text-lg"
          >
            <Music className="w-12 h-12" />
            <span className="font-bold">Praticar Instrumento</span>
            <span className="text-sm opacity-80">Exercícios diários</span>
          </OrientalActionButton>

          <OrientalActionButton 
            level="student" 
            variant="secondary"
            className="w-full flex flex-col items-center p-8 space-y-4 text-lg"
          >
            <BookOpen className="w-12 h-12" />
            <span className="font-bold">Biblioteca Musical</span>
            <span className="text-sm opacity-80">Teorias e partituras</span>
          </OrientalActionButton>
        </div>

        {/* Motivação Diária */}
        <div className="bg-gradient-to-r from-pink-50 to-orange-50 rounded-3xl p-6 border border-pink-200 mb-8 text-center">
          <div className="text-6xl mb-4">🌸</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Dica do Dia</h3>
          <p className="text-gray-700 mb-4">
            "A música é a linguagem universal da alma. Continue praticando e sua evolução será incrível!"
          </p>
          <p className="text-sm text-orange-600 font-medium">
            Você está indo muito bem! 🎓
          </p>
        </div>

        {/* Botão de Logout Discreto */}
        <div className="text-center">
          <OrientalActionButton 
            level="student" 
            variant="ghost" 
            onClick={handleLogout}
            className="text-gray-500 hover:text-gray-700"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </OrientalActionButton>
        </div>

        {/* Footer Leve */}
        <footer className="text-center py-8 mt-8">
          <div className="mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <span className="text-white text-sm font-bold">学</span>
            </div>
          </div>
          <p className="text-gray-600 font-medium mb-1">
            Nipo School &copy; 2025
          </p>
          <p className="text-orange-500 text-sm font-bold">
            🎵 "Sua jornada musical continua"
          </p>
        </footer>
      </div>
    </OrientalContainer>
    </div>
  );
};

export default AlunoDashboardOriental;