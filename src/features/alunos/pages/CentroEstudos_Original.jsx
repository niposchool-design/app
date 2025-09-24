import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Music, Play, MessageCircle, Users, Award,
  Clock, TrendingUp, ChevronRight, Search, Bell, Star,
  Calendar, Target, Heart, Lightbulb, Volume2, FileText
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/shared/lib/supabase/supabaseClient';

const CentroEstudos = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
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
  }, []);

  const carregarDados = async () => {
    try {
      setLoading(true);
      
      // Carregar usuário
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user);

      if (session?.user) {
        await Promise.all([
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

      // Calcular médias e estatísticas
      const progressoMedio = progressoData?.length > 0 
        ? progressoData.reduce((acc, p) => acc + p.porcentagem_conclusao, 0) / progressoData.length
        : 0;

      setResumoAprendizado({
        instrumentoAtual: progressoData?.find(p => p.tipo_estudo === 'instrumento'),
        progressoGeral: Math.round(progressoMedio),
        proximas_aulas: aulasData || [],
        duvidas_pendentes: duvidasData?.length || 0,
        repertorio_disponivel: repertorioData?.length || 0,
        videos_nao_vistos: 5 // Placeholder - implementar lógica real
      });
    } catch (error) {
      console.error('Erro ao carregar resumo:', error);
    }
  };

  const carregarAtividades = async (userId) => {
    // Simulação de atividades recentes
    setAtividades([
      {
        tipo: 'aula',
        titulo: 'Próxima aula: Técnicas de Violão',
        data: new Date(Date.now() + 86400000), // amanhã
        icone: Calendar,
        cor: 'text-blue-600 bg-blue-50'
      },
      {
        tipo: 'repertorio',
        titulo: 'Nova música liberada: Sakura',
        data: new Date(Date.now() - 3600000), // 1 hora atrás
        icone: Music,
        cor: 'text-green-600 bg-green-50'
      },
      {
        tipo: 'video',
        titulo: 'Novo vídeo: Postura para Instrumentos',
        data: new Date(Date.now() - 7200000), // 2 horas atrás
        icone: Play,
        cor: 'text-purple-600 bg-purple-50'
      }
    ]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-600 border-t-transparent"></div>
          </div>
        </div>
      </div>
    );
  }

  const modulos = [
    {
      titulo: 'Biblioteca de Instrumentos',
      descricao: 'Explore instrumentos musicais do mundo com histórias, sons e curiosidades',
      icone: Music,
      cor: 'from-blue-500 to-blue-600',
      link: '/alunos/biblioteca-instrumentos',
      stats: '50+ instrumentos'
    },
    {
      titulo: 'Repertório Musical',
      descricao: 'Partituras, cifras e playbacks liberados pelos seus professores',
      icone: FileText,
      cor: 'from-green-500 to-green-600',
      link: '/alunos/biblioteca-repertorio',
      stats: `${resumoAprendizado.repertorio_disponivel} disponíveis`
    },
    {
      titulo: 'Metodologias de Ensino',
      descricao: 'Conheça as abordagens pedagógicas que inspiram o Nipo School',
      icone: BookOpen,
      cor: 'from-purple-500 to-purple-600',
      link: '/alunos/metodologias-ensino',
      stats: '8+ metodologias'
    },
    {
      titulo: 'Biblioteca de Vídeos',
      descricao: 'Vídeos exclusivos gravados pelos professores organizados por módulo',
      icone: Play,
      cor: 'from-red-500 to-red-600',
      link: '/alunos/biblioteca-videos',
      stats: `${resumoAprendizado.videos_nao_vistos} novos`
    },
    {
      titulo: 'Tire suas Dúvidas',
      descricao: 'Faça perguntas aos professores organizadas por módulo de estudo',
      icone: MessageCircle,
      cor: 'from-orange-500 to-orange-600',
      link: '/alunos/duvidas',
      stats: resumoAprendizado.duvidas_pendentes > 0 ? `${resumoAprendizado.duvidas_pendentes} pendentes` : 'Disponível'
    },
    {
      titulo: 'Meu Instrumento',
      descricao: 'Acompanhe seu progresso e gerencie seu instrumento pessoal',
      icone: Award,
      cor: 'from-yellow-500 to-yellow-600',
      link: '/alunos/meu-instrumento',
      stats: resumoAprendizado.instrumentoAtual ? `${resumoAprendizado.progressoGeral}% concluído` : 'Começar'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho de boas-vindas */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                Centro de Estudos 🌸
              </h1>
              <p className="text-lg text-gray-600">
                Bem-vindo de volta, {user?.user_metadata?.nome || 'Estudante'}!
                Continue sua jornada musical no Nipo School.
              </p>
            </div>
            
            {resumoAprendizado.duvidas_pendentes > 0 && (
              <div className="flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-800 rounded-lg">
                <Bell className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {resumoAprendizado.duvidas_pendentes} dúvida(s) pendente(s)
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Resumo do progresso */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-red-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Progresso Geral</p>
                <p className="text-2xl font-bold text-gray-800">{resumoAprendizado.progressoGeral}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Próximas Aulas</p>
                <p className="text-2xl font-bold text-gray-800">{resumoAprendizado.proximas_aulas.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Music className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Repertório</p>
                <p className="text-2xl font-bold text-gray-800">{resumoAprendizado.repertorio_disponivel}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-purple-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Play className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Vídeos Novos</p>
                <p className="text-2xl font-bold text-gray-800">{resumoAprendizado.videos_nao_vistos}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Módulos principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {modulos.map((modulo, index) => {
            const IconeModulo = modulo.icone;
            return (
              <Link
                key={index}
                to={modulo.link}
                className="group bg-white rounded-xl shadow-lg border-2 border-gray-100 hover:border-red-300 transition-all duration-300 overflow-hidden"
              >
                <div className={`h-2 bg-gradient-to-r ${modulo.cor}`}></div>
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`p-3 bg-gradient-to-r ${modulo.cor} rounded-lg`}>
                      <IconeModulo className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-800 mb-1 group-hover:text-red-600 transition-colors">
                        {modulo.titulo}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {modulo.descricao}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded">
                      {modulo.stats}
                    </span>
                    <div className="flex items-center text-red-600 group-hover:text-red-700">
                      <span className="text-sm font-medium">Explorar</span>
                      <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Atividades recentes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Timeline de atividades */}
          <div className="bg-white rounded-xl shadow-lg border-2 border-red-100 p-6">
            <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-red-600" />
              Atividades Recentes
            </h3>
            
            <div className="space-y-4">
              {atividades.map((atividade, index) => {
                const IconeAtividade = atividade.icone;
                return (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className={`p-2 rounded-lg ${atividade.cor}`}>
                      <IconeAtividade className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{atividade.titulo}</p>
                      <p className="text-xs text-gray-500">
                        {atividade.data.toLocaleDateString('pt-BR')} às {atividade.data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Próximas aulas */}
          <div className="bg-white rounded-xl shadow-lg border-2 border-blue-100 p-6">
            <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              Próximas Aulas
            </h3>
            
            {resumoAprendizado.proximas_aulas.length > 0 ? (
              <div className="space-y-3">
                {resumoAprendizado.proximas_aulas.map((aula, index) => (
                  <div key={index} className="p-3 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-800">{aula.titulo}</h4>
                    <p className="text-sm text-gray-600">{aula.modulo}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(aula.data_programada).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                ))}
                
                <Link
                  to="/alunos/aulas"
                  className="block text-center py-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  Ver todas as aulas
                </Link>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Nenhuma aula programada</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 text-white">
          <h3 className="font-bold text-xl mb-4">Ações Rápidas</h3>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/alunos/duvidas/nova"
              className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="font-medium">Fazer Pergunta</span>
            </Link>
            
            <Link
              to="/alunos/biblioteca-repertorio?filter=liberado"
              className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
            >
              <Music className="h-4 w-4" />
              <span className="font-medium">Ver Repertório</span>
            </Link>
            
            <Link
              to="/alunos/progresso"
              className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
            >
              <TrendingUp className="h-4 w-4" />
              <span className="font-medium">Meu Progresso</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CentroEstudos;