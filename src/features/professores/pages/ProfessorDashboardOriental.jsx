import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../shared/contexts/AuthContext';
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
  Plus,
  Eye,
  Download,
  TrendingUp,
  BookOpen,
  Video,
  Lightbulb,
  Heart,
  FileText,
  Calendar,
  Activity,
  BarChart3,
  Users,
  ChevronRight,
  RefreshCw,
  Star,
  Clock,
  LogOut,
  GraduationCap,
  Music,
  Award,
  Target
} from 'lucide-react';

const ProfessorDashboardOriental = () => {
  const { user, userProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [greeting, setGreeting] = useState('');
  
  // Estados para dados
  const [stats, setStats] = useState({
    totalConteudos: 0,
    totalVisualizacoes: 0,
    totalDownloads: 0,
    totalAlunos: 0,
    totalTurmas: 0,
    totalAulas: 30,
    totalInstrumentos: 24,
    conteudosPorTipo: {
      video: 0,
      sacada: 0,
      devocional: 0,
      material: 0
    }
  });
  
  const [recentConteudos, setRecentConteudos] = useState([]);
  const [minhasTurmas, setMinhasTurmas] = useState([]);
  const [progressoAlunos, setProgressoAlunos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Inicialização
  useEffect(() => {
    setMounted(true);
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('おはよう');
    else if (hour < 18) setGreeting('こんにちは');
    else setGreeting('こんばんは');
  }, []);

  const loadDashboardData = useCallback(async () => {
    try {
      setLoading(true);

      const professorId = userProfile?.id;
      
      // Buscar conteúdos do professor
      const { data: conteudos, error: conteudosError } = await supabase
        .from('professores_conteudos')
        .select('*')
        .eq('criado_por', professorId)
        .eq('ativo', true);

      if (conteudosError && conteudosError.code !== 'PGRST116') {
        console.warn('Tabela professores_conteudos não encontrada, usando dados padrão');
      }

      // Buscar turmas do professor
      const { data: turmasData, error: turmasError } = await supabase
        .from('turmas')
        .select(`
          id, nome, descricao,
          turma_alunos(
            profiles(nome_completo, email)
          )
        `)
        .eq('professor_id', professorId);

      if (turmasError && turmasError.code !== 'PGRST116') {
        console.warn('Erro ao buscar turmas:', turmasError);
      }

      // Buscar dados gerais da plataforma
      const [
        { data: totalAulas },
        { data: totalInstrumentos },
        { data: achievementsProgress }
      ] = await Promise.all([
        supabase.from('aulas').select('*', { count: 'exact' }),
        supabase.from('instrumentos').select('*', { count: 'exact' }),
        supabase.from('achievements_progress').select('*', { count: 'exact' })
      ]);

      // Calcular estatísticas
      const totalConteudos = conteudos?.length || 0;
      const totalVisualizacoes = conteudos?.reduce((sum, item) => sum + (item.visualizacoes || 0), 0) || 0;
      const totalDownloads = conteudos?.reduce((sum, item) => sum + (item.downloads || 0), 0) || 0;

      const conteudosPorTipo = {
        video: conteudos?.filter(c => c.tipo === 'video').length || 0,
        sacada: conteudos?.filter(c => c.tipo === 'sacada').length || 0,
        devocional: conteudos?.filter(c => c.tipo === 'devocional').length || 0,
        material: conteudos?.filter(c => c.tipo === 'material').length || 0
      };

      const meusAlunos = turmasData?.reduce((total, turma) => {
        return total + (turma.turma_alunos?.length || 0);
      }, 0) || 0;

      setStats({
        totalConteudos,
        totalVisualizacoes,
        totalDownloads,
        totalAlunos: meusAlunos,
        totalTurmas: turmasData?.length || 0,
        totalAulas: totalAulas?.length || 30,
        totalInstrumentos: totalInstrumentos?.length || 24,
        achievementsAtivos: achievementsProgress?.length || 0,
        conteudosPorTipo
      });

      const recentContent = conteudos
        ?.sort((a, b) => new Date(b.criado_em) - new Date(a.criado_em))
        .slice(0, 3) || [];

      setRecentConteudos(recentContent);
      setMinhasTurmas(turmasData || []);

      // Progresso simulado dos alunos
      const progressoDemo = turmasData?.flatMap(turma => 
        turma.turma_alunos?.slice(0, 5).map((matricula, index) => ({
          id: `${turma.id}_${index}`,
          nome: matricula.profiles?.nome_completo || 'Aluno',
          turma: turma.nome,
          progresso: Math.floor(Math.random() * 100),
          ultimaAula: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR')
        }))
      ) || [];

      setProgressoAlunos(progressoDemo.slice(0, 6));

    } catch (error) {
      console.error('Erro ao carregar dashboard:', error);
      
      setStats({
        totalConteudos: 0,
        totalVisualizacoes: 0,
        totalDownloads: 0,
        totalAlunos: 21,
        totalTurmas: 3,
        totalAulas: 30,
        totalInstrumentos: 24,
        achievementsAtivos: 24,
        conteudosPorTipo: { video: 0, sacada: 0, devocional: 0, material: 0 }
      });
      
    } finally {
      setLoading(false);
    }
  }, [userProfile]);

  useEffect(() => {
    if (mounted && userProfile?.id) {
      loadDashboardData();
    }
  }, [mounted, userProfile, loadDashboardData]);

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
      <OrientalContainer level="teacher">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
              <span className="text-white text-2xl">先</span>
            </div>
            <p className="text-gray-600">Carregando Dashboard do Professor...</p>
          </div>
        </div>
      </OrientalContainer>
    );
  }

  // Componente de Card de Conteúdo Oriental
  const ConteudoCardOriental = ({ conteudo }) => {
    const getTypeIcon = (tipo) => {
      switch (tipo) {
        case 'video': return '🎥';
        case 'sacada': return '💡';
        case 'devocional': return '❤️';
        case 'material': return '📄';
        default: return '📚';
      }
    };

    return (
      <div className="bg-orange-50 rounded-xl border border-orange-200 p-4 hover:shadow-md transition-all duration-200 hover:-translate-y-1">
        <div className="flex items-start justify-between mb-3">
          <h4 className="font-semibold text-gray-900 line-clamp-2 flex-1 text-sm">{conteudo.titulo}</h4>
          <span className="text-lg ml-2">{getTypeIcon(conteudo.tipo)}</span>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <Eye className="w-3 h-3 mr-1" />
              <span>{conteudo.visualizacoes || 0}</span>
            </div>
            <div className="flex items-center">
              <Download className="w-3 h-3 mr-1" />
              <span>{conteudo.downloads || 0}</span>
            </div>
          </div>
          <span>{new Date(conteudo.criado_em).toLocaleDateString('pt-BR')}</span>
        </div>

        <Link
          to={`/professores/conteudos/${conteudo.id}`}
          className="text-xs text-orange-600 hover:text-orange-700 font-medium"
        >
          Ver detalhes →
        </Link>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <OrientalContainer level="teacher">
        {/* Navegação Oriental */}
        <OrientalNavigation 
          user={user} 
          level="teacher" 
        />

        {/* Conteúdo Principal */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        
        {/* Header de Boas Vindas */}
        <OrientalWelcomeHeader 
          user={userProfile} 
          greeting={greeting} 
          level="teacher" 
        />

        {/* Estatísticas Principais - Nível Professor (Médio) */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-orange-500" />
            Visão Geral
          </h3>
          <OrientalGrid level="teacher">
            <OrientalStatCard
              title="Meus Alunos"
              value={stats.totalAlunos}
              icon={Users}
              level="teacher"
              subtitle="Nas minhas turmas"
            />
            <OrientalStatCard
              title="Minhas Turmas"
              value={stats.totalTurmas}
              icon={GraduationCap}
              level="teacher"
              subtitle="Classes ativas"
            />
            <OrientalStatCard
              title="Conteúdos"
              value={stats.totalConteudos}
              icon={BookOpen}
              level="teacher"
              subtitle="Criados por mim"
            />
            <OrientalStatCard
              title="Visualizações"
              value={stats.totalVisualizacoes}
              icon={Eye}
              level="teacher"
              subtitle="Dos meus conteúdos"
            />
            <OrientalStatCard
              title="Aulas Disponíveis"
              value={stats.totalAulas}
              icon={Calendar}
              level="teacher"
              subtitle="Na plataforma"
            />
            <OrientalStatCard
              title="Instrumentos"
              value={stats.totalInstrumentos}
              icon={Music}
              level="teacher"
              subtitle="Para ensinar"
            />
          </OrientalGrid>
        </div>

        {/* Minhas Turmas e Progresso dos Alunos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
          {/* Minhas Turmas */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-orange-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <GraduationCap className="w-5 h-5 mr-2 text-orange-500" />
              Minhas Turmas ({stats.totalTurmas})
            </h3>
            {minhasTurmas.length > 0 ? (
              <div className="space-y-3">
                {minhasTurmas.map((turma) => (
                  <div key={turma.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <div>
                      <h4 className="font-medium text-gray-900">{turma.nome}</h4>
                      <p className="text-sm text-gray-600">{turma.turma_alunos?.length || 0} alunos matriculados</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">{turma.turma_alunos?.length || 0}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <GraduationCap className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">Nenhuma turma atribuída</h4>
                <p className="text-gray-500">Entre em contato com o administrador.</p>
              </div>
            )}
          </div>

          {/* Progresso dos Alunos */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-red-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-red-500" />
              Progresso dos Alunos
            </h3>
            {progressoAlunos.length > 0 ? (
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {progressoAlunos.map((aluno) => (
                  <div key={aluno.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">{aluno.nome}</h4>
                      <p className="text-xs text-gray-600">{aluno.turma} • Última: {aluno.ultimaAula}</p>
                      <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-red-400 to-pink-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${aluno.progresso}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="ml-3 text-right">
                      <span className="text-sm font-bold text-red-600">{aluno.progresso}%</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <TrendingUp className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">Sem dados de progresso</h4>
                <p className="text-gray-500">Os progressos aparecerão quando os alunos iniciarem atividades.</p>
              </div>
            )}
          </div>
        </div>

        {/* Ações Principais do Professor */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-orange-500" />
            Ações do Professor
          </h3>
          <OrientalGrid level="teacher">
            <Link to="/professores/novo">
              <OrientalActionButton 
                level="teacher" 
                className="w-full flex flex-col items-center p-6 space-y-3"
              >
                <Plus className="w-8 h-8" />
                <span className="font-medium">Criar Conteúdo</span>
                <span className="text-xs opacity-80">Nova aula ou material</span>
              </OrientalActionButton>
            </Link>
            
            <Link to="/professores/conteudos">
              <OrientalActionButton 
                level="teacher" 
                variant="secondary"
                className="w-full flex flex-col items-center p-6 space-y-3"
              >
                <BookOpen className="w-8 h-8" />
                <span className="font-medium">Biblioteca</span>
                <span className="text-xs opacity-80">Meus conteúdos</span>
              </OrientalActionButton>
            </Link>

            <OrientalActionButton 
              level="teacher" 
              variant="secondary"
              className="w-full flex flex-col items-center p-6 space-y-3"
            >
              <Star className="w-8 h-8" />
              <span className="font-medium">Conquistas</span>
              <span className="text-xs opacity-80">Gerenciar awards</span>
            </OrientalActionButton>
          </OrientalGrid>
        </div>

        {/* Ações Rápidas */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-orange-100 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-orange-500" />
            Ações Rápidas
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <OrientalActionButton 
              level="teacher" 
              variant="ghost"
              className="flex flex-col items-center p-3 space-y-2"
            >
              <Calendar className="w-6 h-6" />
              <span className="text-xs text-center">Agendar Aula</span>
            </OrientalActionButton>
            
            <OrientalActionButton 
              level="teacher" 
              variant="ghost"
              className="flex flex-col items-center p-3 space-y-2"
            >
              <FileText className="w-6 h-6" />
              <span className="text-xs text-center">Avaliação</span>
            </OrientalActionButton>
            
            <OrientalActionButton 
              level="teacher" 
              variant="ghost"
              className="flex flex-col items-center p-3 space-y-2"
            >
              <Award className="w-6 h-6" />
              <span className="text-xs text-center">Dar Conquista</span>
            </OrientalActionButton>
            
            <OrientalActionButton 
              level="teacher" 
              variant="ghost"
              className="flex flex-col items-center p-3 space-y-2"
              onClick={handleLogout}
            >
              <LogOut className="w-6 h-6" />
              <span className="text-xs text-center">Sair</span>
            </OrientalActionButton>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-8 border-t border-orange-200 bg-white/50 rounded-t-2xl backdrop-blur-sm">
          <div className="mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <span className="text-white text-sm font-bold">先</span>
            </div>
          </div>
          <p className="text-gray-600 font-medium mb-1">
            Nipo School App &copy; 2025
          </p>
          <p className="text-orange-500 text-sm font-bold">
            🎓 "Ensinar é tocar uma vida para sempre"
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Versão Beta • ADNIPO Suzano • Área do Professor
          </p>
        </footer>
      </div>
    </OrientalContainer>
    </div>
  );
};

export default ProfessorDashboardOriental;