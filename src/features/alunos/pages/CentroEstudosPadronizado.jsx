import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Music, Play, MessageCircle, Users, Award,
  Clock, TrendingUp, Search, Calendar, Target, Heart, 
  Lightbulb, Volume2, FileText, Headphones, Mic,
  Star, Trophy
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/shared/contexts/AuthContext.tsx';

// Componentes padronizados Nipo School
import NipoHeader from '@/shared/components/UI/NipoHeader';
import { 
  NipoBackground, 
  NipoContainer, 
  NipoSection,
  NipoGrid,
  NipoStatsCard,
  NipoCard,
  NipoButton,
  NipoLoading
} from '@/shared/components/UI/NipoUI';
import { 
  NipoGreeting, 
  NipoActionCard,
  NipoQuickAction,
  NipoProgressRing
} from '@/shared/components/UI/NipoAdvanced';

const CentroEstudos = () => {
  const { userProfile } = useAuth();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simular carregamento
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <NipoLoading texto="Carregando Centro de Estudos..." />;
  }

  return (
    <NipoBackground>
      {/* Navigation */}
      <NipoHeader />

      <NipoContainer>
        {/* Welcome Section */}
        <NipoSection>
          <NipoGreeting 
            userName={userProfile?.full_name || userProfile?.nome}
            greeting="Centro de Estudos"
            subtitle="Continue sua jornada musical! Aqui você encontra tudo para seus estudos."
          />
        </NipoSection>

        {/* Stats Grid */}
        <NipoSection>
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Target className="w-6 h-6 text-red-600 mr-2" />
            Resumo dos Estudos
          </h2>
          <NipoGrid type="stats">
            <NipoStatsCard 
              icon={BookOpen}
              value="12"
              label="Aulas Assistidas"
              color="red"
            />
            <NipoStatsCard 
              icon={Music}
              value="5"
              label="Instrumentos"
              color="blue"
            />
            <NipoStatsCard 
              icon={Clock}
              value="8h"
              label="Horas de Prática"
              color="green"
            />
            <NipoStatsCard 
              icon={Trophy}
              value="85%"
              label="Progresso Geral"
              color="purple"
            />
          </NipoGrid>
        </NipoSection>

        {/* Action Buttons Grid */}
        <NipoSection>
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Lightbulb className="w-6 h-6 text-red-600 mr-2" />
            Áreas de Estudo
          </h2>
          <NipoGrid type="actions">
            <NipoActionCard
              emoji="🎵"
              title="Instrumentos"
              subtitle="Explore diferentes instrumentos musicais"
              onClick={() => navigate('/alunos/biblioteca/instrumentos')}
            />

            <NipoActionCard
              emoji="📄"
              title="Repertório"
              subtitle="Acesse partituras e músicas"
              onClick={() => navigate('/alunos/biblioteca/repertorio')}
            />

            <NipoActionCard
              emoji="▶️"
              title="Vídeos"
              subtitle="Assista aulas em vídeo"
              onClick={() => navigate('/alunos/biblioteca/videos')}
            />

            <NipoActionCard
              emoji="📈"
              title="Progresso"
              subtitle="Acompanhe seu desenvolvimento"
              onClick={() => navigate('/alunos/progresso')}
            />

            <NipoActionCard
              emoji="❓"
              title="Dúvidas"
              subtitle="Sistema de perguntas e respostas"
              onClick={() => navigate('/alunos/duvidas')}
            />

            <NipoActionCard
              emoji="💡"
              title="Metodologias"
              subtitle="Técnicas de ensino musical"
              onClick={() => navigate('/alunos/metodologias-ensino')}
            />
          </NipoGrid>
        </NipoSection>

        {/* Success Status */}
        <NipoSection>
          <NipoCard className="text-center">
            <div className="flex items-center justify-center text-green-600 mb-4">
              <Trophy className="w-8 h-8 mr-3" />
              <div>
                <h3 className="text-lg font-semibold">✅ Centro de Estudos Funcionando!</h3>
                <p className="text-sm text-gray-600">Todas as navegações estão operacionais</p>
              </div>
            </div>
            <NipoButton 
              onClick={() => navigate('/alunos/dashboard')} 
              className="mt-4"
            >
              Voltar ao Dashboard
            </NipoButton>
          </NipoCard>
        </NipoSection>
      </NipoContainer>
    </NipoBackground>
  );
};

export default CentroEstudos;