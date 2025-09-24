import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Music, Play, MessageCircle, Users, Award,
  Clock, TrendingUp, Search, Calendar, Target, Heart, 
  Lightbulb, Volume2, FileText, Headphones, Mic,
  Star, Trophy
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/shared/lib/supabase/supabaseClient';
import { useAuth } from '@/shared/contexts/AuthContext';
import { instrumentsService } from '@/features/instrumentos/services/instrumentsService';

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
  const [instrumentos, setInstrumentos] = useState([]);
  const [resumoAprendizado, setResumoAprendizado] = useState({
    instrumentoAtual: null,
    progressoGeral: 0,
    proximas_aulas: [],
    duvidas_pendentes: 0,
    repertorio_disponivel: 0,
    videos_nao_vistos: 0
  });
  const [atividades, setAtividades] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    carregarDados();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const carregarDados = async () => {
    try {
      setLoading(true);
      
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        await Promise.all([
          carregarInstrumentos(),
          carregarResumoAprendizado(session.user.id),
          carregarAtividades(session.user.id)
        ]);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const carregarInstrumentos = async () => {
    try {
      const response = await instrumentsService.getAllInstruments();
      if (response.success) {
        setInstrumentos(response.data);
      }
    } catch (error) {
      console.error('Erro ao carregar instrumentos:', error);
    }
  };

  const carregarResumoAprendizado = async (userId) => {
    try {
      // Carregar progresso geral
      const { data: progressoData } = await supabase
        .from('progresso_estudos')
        .select('*')
        .eq('aluno_id', userId)
        .eq('ativo', true);

      // Carregar próximas aulas
      const { data: aulasData } = await supabase
        .from('aulas')
        .select('*')
        .gte('data_programada', new Date().toISOString())
        .order('data_programada')
        .limit(3);

      // Carregar dúvidas pendentes
      const { data: duvidasData } = await supabase
        .from('duvidas_alunos')
        .select('id')
        .eq('aluno_id', userId)
        .in('status', ['aberta', 'em_analise']);

      // Carregar repertório disponível
      const { data: repertorioData } = await supabase
        .from('repertorio')
        .select('id')
        .eq('publico', true);

      const progressoMedio = progressoData?.length > 0 
        ? progressoData.reduce((acc, p) => acc + p.porcentagem_conclusao, 0) / progressoData.length
        : 0;

      setResumoAprendizado({
        instrumentoAtual: progressoData?.find(p => p.tipo_estudo === 'instrumento'),
        progressoGeral: Math.round(progressoMedio),
        proximas_aulas: aulasData || [],
        duvidas_pendentes: duvidasData?.length || 0,
        repertorio_disponivel: instrumentos.length || repertorioData?.length || 0,
        videos_nao_vistos: 5
      });
    } catch (error) {
      console.error('Erro ao carregar resumo:', error);
    }
  };

  const carregarAtividades = async () => {
    // Simulação de atividades recentes - usar dados reais conforme implementação
    setAtividades([
      {
        id: 1,
        tipo: 'video',
        titulo: 'Técnica de respiração para cantores',
        categoria: 'Vocal',
        duracao: '12 min',
        visualizado: false,
        emoji: '🎤'
      },
      {
        id: 2,
        tipo: 'exercicio',
        titulo: 'Escalas maiores - Exercício 1',
        categoria: 'Teoria Musical',
        duracao: '8 min',
        visualizado: true,
        emoji: '🎼'
      },
      {
        id: 3,
        tipo: 'repertorio',
        titulo: 'Amazing Grace - Versão simplificada',
        categoria: 'Repertório',
        duracao: '15 min',
        visualizado: false,
        emoji: '🎵'
      }
    ]);
  };

  if (loading) {
    return (
      <NipoBackground>
        <NipoLoading text="Carregando Centro de Estudos..." />
      </NipoBackground>
    );
  }

  return (
    <NipoBackground>
      {/* Navigation */}
      <NipoHeader isLoading={loading} />

      <NipoContainer>
        {/* Welcome Section */}
        <NipoSection>
          <NipoGreeting 
            userName={userProfile?.full_name}
            greeting="Centro de Estudos"
            className="text-center"
          />
          <div className="text-center mb-6">
            <p className="text-lg text-gray-600 mb-4">
              Seu espaço completo de aprendizado musical
            </p>
            <div className="flex justify-center">
              <NipoProgressRing 
                progress={resumoAprendizado.progressoGeral} 
                size={100}
                strokeWidth={5}
              />
            </div>
            <p className="text-sm text-gray-600 mt-2 font-medium">PROGRESSO GERAL</p>
          </div>
        </NipoSection>

        {/* Stats Grid */}
        <NipoSection>
          <NipoGrid type="stats">
            <NipoStatsCard 
              icon={BookOpen}
              value={resumoAprendizado.proximas_aulas.length}
              label="Próximas Aulas"
              color="blue"
            />
            <NipoStatsCard 
              icon={MessageCircle}
              value={resumoAprendizado.duvidas_pendentes}
              label="Dúvidas"
              color="yellow"
            />
            <NipoStatsCard 
              icon={Play}
              value={resumoAprendizado.videos_nao_vistos}
              label="Vídeos Novos"
              color="red"
            />
            <NipoStatsCard 
              icon={Music}
              value={resumoAprendizado.repertorio_disponivel}
              label="Repertório"
              color="green"
            />
          </NipoGrid>
        </NipoSection>

        {/* Seções de Estudo */}
        <NipoSection>
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <BookOpen className="w-6 h-6 text-red-500 mr-2" />
            Áreas de Estudo
          </h2>
          
          <NipoGrid type="actions">
            <NipoActionCard
              emoji="🎼"
              title="Teoria Musical"
              subtitle="Escalas, acordes e fundamentos"
              onClick={() => navigate('/alunos/teoria-musical')}
            />

            <NipoActionCard
              emoji="🎵"
              title="Repertório"
              subtitle="Músicas e partituras disponíveis"
              onClick={() => navigate('/alunos/repertorio')}
            />

            <NipoActionCard
              emoji="🎤"
              title="Técnica Vocal"
              subtitle="Exercícios e metodologias"
              onClick={() => navigate('/alunos/tecnica-vocal')}
            />

            <NipoActionCard
              emoji="🎹"
              title="Instrumentos"
              subtitle={`${instrumentos.length} instrumentos disponíveis`}
              onClick={() => navigate('/alunos/instrumentos')}
            />

            <NipoActionCard
              emoji="👥"
              title="Aulas em Grupo"
              subtitle="Atividades colaborativas"
              onClick={() => navigate('/alunos/aulas-grupo')}
            />

            <NipoActionCard
              emoji="📚"
              title="Biblioteca"
              subtitle="Materiais de apoio e documentos"
              onClick={() => navigate('/alunos/biblioteca')}
            />
          </NipoGrid>
        </NipoSection>

        {/* Atividades Recentes */}
        <NipoSection>
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Clock className="w-6 h-6 text-blue-500 mr-2" />
            Atividades Recentes
          </h2>
          
          <div className="space-y-4">
            {atividades.map((atividade) => (
              <NipoCard key={atividade.id} className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{atividade.emoji}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{atividade.titulo}</h3>
                    <p className="text-sm text-gray-600">{atividade.categoria} • {atividade.duracao}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {atividade.visualizado && (
                    <span className="text-green-500 text-xs bg-green-100 px-2 py-1 rounded-full">
                      ✓ Concluído
                    </span>
                  )}
                  <NipoButton size="small" variant="outline">
                    {atividade.visualizado ? 'Revisar' : 'Iniciar'}
                  </NipoButton>
                </div>
              </NipoCard>
            ))}
          </div>
        </NipoSection>

        {/* Quick Actions */}
        <NipoSection>
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Target className="w-6 h-6 text-green-500 mr-2" />
            Ações Rápidas
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <NipoQuickAction
              emoji="❓"
              label="Fazer Pergunta"
              onClick={() => navigate('/alunos/duvidas')}
            />
            
            <NipoQuickAction
              emoji="📅"
              label="Agendar Aula"
              onClick={() => navigate('/alunos/agenda')}
            />
            
            <NipoQuickAction
              emoji="🎯"
              label="Metas"
              onClick={() => navigate('/alunos/metas')}
            />
            
            <NipoQuickAction
              emoji="📊"
              label="Progresso"
              onClick={() => navigate('/alunos/progresso')}
            />
          </div>
        </NipoSection>

        {/* Metodologias Disponíveis */}
        <NipoSection>
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Lightbulb className="w-6 h-6 text-yellow-500 mr-2" />
            Metodologias Educacionais
          </h2>
          
          <NipoGrid type="actions">
            <NipoActionCard
              emoji="🎭"
              title="Orff Schulwerk"
              subtitle="Aprendizado através do movimento e criatividade"
              onClick={() => navigate('/alunos/metodologia/orff')}
            />

            <NipoActionCard
              emoji="🎎"
              title="Método Suzuki"
              subtitle="Aprendizado natural como uma língua materna"
              onClick={() => navigate('/alunos/metodologia/suzuki')}
            />

            <NipoActionCard
              emoji="🎪"
              title="Musical Futures"
              subtitle="Aprendizado informal e colaborativo"
              onClick={() => navigate('/alunos/metodologia/musical-futures')}
            />

            <NipoActionCard
              emoji="🎨"
              title="Kodály"
              subtitle="Desenvolvimento da musicalidade interior"
              onClick={() => navigate('/alunos/metodologia/kodaly')}
            />
          </NipoGrid>
        </NipoSection>

        {/* Instrumentos Populares */}
        {instrumentos.length > 0 && (
          <NipoSection>
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Music className="w-6 h-6 text-red-500 mr-2" />
              Instrumentos Populares
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {instrumentos.slice(0, 6).map((instrumento) => (
                <NipoCard key={instrumento.id} className="p-4 hover:shadow-lg transition-all cursor-pointer">
                  <div 
                    onClick={() => navigate(`/alunos/instrumento/${instrumento.id}`)}
                    className="text-center"
                  >
                    <div className="text-3xl mb-2">
                      {instrumento.emoji || '🎵'}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {instrumento.nome}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {instrumento.categoria || 'Instrumento'}
                    </p>
                    {instrumento.stats && (
                      <div className="text-xs text-gray-500">
                        {instrumento.stats.total_alunos} alunos estudando
                      </div>
                    )}
                  </div>
                </NipoCard>
              ))}
            </div>

            {instrumentos.length > 6 && (
              <div className="text-center mt-4">
                <NipoButton 
                  variant="outline"
                  onClick={() => navigate('/alunos/instrumentos')}
                >
                  Ver Todos os Instrumentos ({instrumentos.length})
                </NipoButton>
              </div>
            )}
          </NipoSection>
        )}
      </NipoContainer>
      
      {/* Floating Musical Notes */}
      <div className="fixed top-1/4 left-4 text-blue-200 text-2xl animate-bounce opacity-30 pointer-events-none">
        📚
      </div>
      <div className="fixed top-1/3 right-8 text-blue-200 text-xl animate-bounce opacity-30 pointer-events-none" style={{animationDelay: '1s'}}>
        🎓
      </div>
      <div className="fixed bottom-1/3 left-8 text-blue-200 text-lg animate-bounce opacity-30 pointer-events-none" style={{animationDelay: '2s'}}>
        ✨
      </div>
    </NipoBackground>
  );
};

export default CentroEstudos;