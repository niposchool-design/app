import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Trophy, 
  Flame,
  Music,
  Award,
  Heart,
  Camera,
  Star
} from 'lucide-react';
import { useAuth } from '../../../shared/contexts/AuthContext';
import { useModules } from '../../modulos/hooks/useModules';
import { useAchievements } from '../../gamificacao/hooks/useAchievements';
import { useProgress } from '../../alunos/hooks/useAlunoProgress';
import { useDevotionals } from '../../devocional/hooks/useDevotionals';
import { supabase } from '../../../shared/lib/supabase/supabaseClient';

// Componentes padronizados Nipo School
import NipoHeader from '../../../shared/components/UI/NipoHeader';
import { 
  NipoBackground, 
  NipoContainer, 
  NipoSection,
  NipoGrid,
  NipoStatsCard,
  NipoFooter,
  NipoLoading
} from '../../../shared/components/UI/NipoUI';
import { 
  NipoGreeting, 
  NipoActionCard,
  NipoProgressRing
} from '../../../shared/components/UI/NipoAdvanced';

const AlunoDashboard = () => {
  const { userProfile } = useAuth();
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [greeting, setGreeting] = useState('');
  
  // Estados para votação 
  const [_votingData, _setVotingData] = useState([]);
  const [_userVotedLogo, _setUserVotedLogo] = useState(null);

  // Hooks do Supabase
  const { loading: modulesLoading, getModuleStats } = useModules();
  const { loading: achievementsLoading, getAchievementStats } = useAchievements();
  const { loading: progressLoading, getProgressStats } = useProgress();
  const { loading: devotionalsLoading, getTodayDevotional } = useDevotionals();

  // Buscar dados de votação
  const fetchVotingData = async () => {
    try {
      const { data: votosData, error: votosError } = await supabase
        .from('view_placar_logos')
        .select('*') 
        .order('votos', { ascending: false });

      if (votosError) throw votosError;
      
      _setVotingData(votosData || []);
      
      if (userProfile?.voted_logo) {
        const logoVotado = votosData?.find(logo => logo.id === userProfile.voted_logo);
        _setUserVotedLogo(logoVotado);
      }
    } catch (error) {
      console.error('Erro ao carregar dados de votação:', error);
    }
  };

  // Inicialização
  useEffect(() => {
    setMounted(true);
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('おはよう');
    else if (hour < 18) setGreeting('こんにちは');
    else setGreeting('こんばんは');
    
    if (userProfile) {
      fetchVotingData();
    }
  }, [userProfile]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!mounted) {
    return (
      <NipoBackground>
        <NipoLoading text="Carregando Nipo School..." />
      </NipoBackground>
    );
  }

  // Calcular estatísticas
  const moduleStats = getModuleStats();
  const achievementStats = getAchievementStats();
  const progressStats = getProgressStats();
  const todayDevotional = getTodayDevotional();

  const isLoading = modulesLoading || achievementsLoading || progressLoading || devotionalsLoading;

  return (
    <NipoBackground>
      {/* Navigation */}
      <NipoHeader isLoading={isLoading} />

      <NipoContainer>
        {/* Welcome Section */}
        <NipoSection>
          <NipoGreeting 
            userName={userProfile?.full_name}
            greeting={greeting}
          />
        </NipoSection>

        {/* Progress Circle */}
        <NipoSection>
          <div className="flex justify-center">
            <div className="text-center">
              <NipoProgressRing 
                progress={isLoading ? 0 : moduleStats.averageProgress} 
                size={120}
                strokeWidth={6}
              />
              <p className="text-sm text-gray-600 mt-2 font-medium">PROGRESSO GERAL</p>
            </div>
          </div>
        </NipoSection>

        {/* Stats Grid */}
        <NipoSection>
          <NipoGrid type="stats">
            <NipoStatsCard 
              icon={Star}
              value={isLoading ? '...' : (userProfile?.total_points || 0)}
              label="Pontos"
              color="yellow"
            />
            <NipoStatsCard 
              icon={Flame}
              value={isLoading ? '...' : (userProfile?.current_streak || 0)}
              label="Sequência"
              color="red"
            />
            <NipoStatsCard 
              icon={BookOpen}
              value={isLoading ? '...' : progressStats.completedLessons}
              label="Aulas"
              color="blue"
            />
            <NipoStatsCard 
              icon={Trophy}
              value={isLoading ? '...' : achievementStats.earned}
              label="Conquistas"
              color="green"
            />
          </NipoGrid>
        </NipoSection>

        {/* Action Buttons Grid */}
        <NipoSection>
          <NipoGrid type="actions">
            {/* Scanner QR Code */}
            <NipoActionCard
              emoji="📱"
              title="Registrar Presença"
              subtitle="Escaneie o QR Code da aula"
              onClick={() => navigate('/scanner')}
            />

            {/* Centro de Estudos */}
            <NipoActionCard
              emoji="🌸"
              title="Centro de Estudos"
              subtitle="Bibliotecas, vídeos e metodologias"
              onClick={() => navigate('/alunos/centro-estudos')}
            />

            {/* Meu Instrumento */}
            <NipoActionCard
              icon={Music}
              title="Meu Instrumento"
              subtitle={userProfile?.instrument ? `Página do ${userProfile.instrument}` : 'Explore instrumentos'}
              onClick={() => navigate('/alunos/meu-instrumento')}
            />

            {/* Módulos */}
            <NipoActionCard
              icon={BookOpen}
              title="Módulos"
              subtitle={isLoading ? 'Carregando...' : `${moduleStats.total} módulos disponíveis`}
              onClick={() => navigate('/modulos')}
            />

            {/* Conquistas */}
            <NipoActionCard
              icon={Award}
              title="Conquistas"
              subtitle={isLoading ? 'Carregando...' : `${achievementStats.earned} conquistadas`}
              onClick={() => navigate('/conquistas')}
            />

            {/* Devocional */}
            <NipoActionCard
              icon={Heart}
              title="Devocional"
              subtitle={isLoading ? 'Carregando...' : (todayDevotional ? 'Novo conteúdo disponível' : 'Reflexões diárias')}
              onClick={() => navigate('/devocional')}
            />
          </NipoGrid>
        </NipoSection>

        {/* Footer */}
        <NipoFooter />
      </NipoContainer>
      
      {/* Floating Musical Notes */}
      <div className="fixed top-1/4 left-4 text-red-200 text-2xl animate-bounce opacity-30 pointer-events-none">
        🎵
      </div>
      <div className="fixed top-1/3 right-8 text-red-200 text-xl animate-bounce opacity-30 pointer-events-none" style={{animationDelay: '1s'}}>
        🎶
      </div>
      <div className="fixed bottom-1/3 left-8 text-red-200 text-lg animate-bounce opacity-30 pointer-events-none" style={{animationDelay: '2s'}}>
        🎼
      </div>
    </NipoBackground>
  );
};

export default AlunoDashboard;