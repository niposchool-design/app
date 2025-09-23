import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, Target, Calendar, Award, Clock, BookOpen, 
  Music, Users, Star, BarChart3, Activity, CheckCircle2,
  ChevronRight, Trophy, Flame, Zap, Heart
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/shared/lib/supabase/supabaseClient';
import { AlunoPageLayout } from '@/shared/components/layout';

const ProgressoAluno = () => {
  const [usuario, setUsuario] = useState(null);
  const [progresso, setProgresso] = useState({
    geral: 0,
    modulos: [],
    metas: [],
    conquistas: [],
    atividades_recentes: [],
    estatisticas: {}
  });
  const [loading, setLoading] = useState(true);
  const [periodoSelecionado, setPeriodoSelecionado] = useState('mes');

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      setLoading(true);
      
      // Carregar usuário
      const { data: { session } } = await supabase.auth.getSession();
      setUsuario(session?.user);

      if (session?.user) {
        await carregarProgressoDetalhado(session.user.id);
      }
    } catch (error) {
      console.error('Erro ao carregar progresso:', error);
    } finally {
      setLoading(false);
    }
  };

  const carregarProgressoDetalhado = async (userId) => {
    try {
      // Carregar progresso por módulo
      const { data: progressoData } = await supabase
        .from('progresso_estudos')
        .select(`
          *,
          modulo:modulos(id, nome, cor, icone)
        `)
        .eq('aluno_id', userId)
        .eq('ativo', true);

      // Simular dados para demonstração
      const progressoDemo = {
        geral: 68,
        modulos: [
          {
            id: 1,
            nome: 'Instrumentos',
            icone: Music,
            cor: 'blue',
            progresso: 75,
            total_atividades: 20,
            atividades_concluidas: 15,
            tempo_dedicado: '12h 30m',
            ultima_atividade: new Date(2024, 1, 15),
            proxima_meta: 'Completar técnicas de respiração'
          },
          {
            id: 2,
            nome: 'Metodologias',
            icone: BookOpen,
            cor: 'purple', 
            progresso: 45,
            total_atividades: 16,
            atividades_concluidas: 7,
            tempo_dedicado: '8h 15m',
            ultima_atividade: new Date(2024, 1, 12),
            proxima_meta: 'Estudar método Suzuki'
          },
          {
            id: 3,
            nome: 'Rítmica',
            icone: Users,
            cor: 'green',
            progresso: 88,
            total_atividades: 12,
            atividades_concluidas: 11,
            tempo_dedicado: '6h 45m',
            ultima_atividade: new Date(2024, 1, 18),
            proxima_meta: 'Exercícios avançados de coordenação'
          },
          {
            id: 4,
            nome: 'Teoria Musical',
            icone: BookOpen,
            cor: 'indigo',
            progresso: 62,
            total_atividades: 18,
            atividades_concluidas: 11,
            tempo_dedicado: '9h 20m',
            ultima_atividade: new Date(2024, 1, 10),
            proxima_meta: 'Harmonização básica'
          }
        ],
        metas: [
          {
            id: 1,
            titulo: 'Completar Módulo de Rítmica',
            descricao: 'Finalizar todas as atividades do módulo de rítmica corporal',
            progresso: 92,
            prazo: new Date(2024, 2, 1),
            status: 'em_andamento'
          },
          {
            id: 2,
            titulo: 'Dominar Flauta Doce',
            descricao: 'Aprender todas as técnicas básicas da flauta doce',
            progresso: 78,
            prazo: new Date(2024, 2, 15),
            status: 'em_andamento'
          },
          {
            id: 3,
            titulo: 'Estudar Método Orff',
            descricao: 'Compreender os fundamentos da metodologia Orff',
            progresso: 34,
            prazo: new Date(2024, 3, 1),
            status: 'em_andamento'
          }
        ],
        conquistas: [
          {
            id: 1,
            nome: 'Primeiro Passo',
            descricao: 'Completou sua primeira atividade',
            icone: '🎵',
            data_conquista: new Date(2024, 0, 5),
            raridade: 'comum'
          },
          {
            id: 2,
            nome: 'Ritmo na Veia',
            descricao: 'Completou 10 exercícios de rítmica',
            icone: '🥁',
            data_conquista: new Date(2024, 0, 20),
            raridade: 'raro'
          },
          {
            id: 3,
            nome: 'Estudioso',
            descricao: 'Dedicou mais de 20 horas aos estudos',
            icone: '📚',
            data_conquista: new Date(2024, 1, 1),
            raridade: 'épico'
          },
          {
            id: 4,
            nome: 'Questionador',
            descricao: 'Fez sua primeira pergunta aos professores',
            icone: '❓',
            data_conquista: new Date(2024, 1, 8),
            raridade: 'comum'
          }
        ],
        atividades_recentes: [
          {
            id: 1,
            tipo: 'video',
            titulo: 'Assistiu: Técnicas de Respiração para Flauta',
            modulo: 'Instrumentos',
            data: new Date(2024, 1, 18),
            pontos: 10
          },
          {
            id: 2,
            tipo: 'exercicio',
            titulo: 'Completou: Exercícios Rítmicos #5',
            modulo: 'Rítmica',
            data: new Date(2024, 1, 17),
            pontos: 25
          },
          {
            id: 3,
            tipo: 'pergunta',
            titulo: 'Fez pergunta: Como melhorar a embocadura?',
            modulo: 'Instrumentos',
            data: new Date(2024, 1, 15),
            pontos: 5
          },
          {
            id: 4,
            tipo: 'leitura',
            titulo: 'Leu: História do Método Suzuki',
            modulo: 'Metodologias',
            data: new Date(2024, 1, 12),
            pontos: 15
          }
        ],
        estatisticas: {
          tempo_total_estudos: '37h 10m',
          dias_consecutivos: 7,
          pontos_totais: 450,
          posicao_ranking: 12,
          media_semanal: '5h 20m',
          atividades_concluidas: 44,
          perguntas_feitas: 8,
          videos_assistidos: 23
        }
      };

      setProgresso(progressoData?.length > 0 ? processarProgresso(progressoData) : progressoDemo);
    } catch (error) {
      console.error('Erro ao carregar progresso:', error);
    }
  };

  const processarProgresso = (data) => {
    // Processar dados reais do banco quando disponível
    return data;
  };

  const getCorProgresso = (percentual) => {
    if (percentual >= 80) return 'bg-green-500';
    if (percentual >= 60) return 'bg-blue-500';
    if (percentual >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getIconeAtividade = (tipo) => {
    switch (tipo) {
      case 'video':
        return '📹';
      case 'exercicio':
        return '✏️';
      case 'pergunta':
        return '❓';
      case 'leitura':
        return '📖';
      default:
        return '📝';
    }
  };

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  const formatarDataRelativa = (data) => {
    const agora = new Date();
    const diff = agora - new Date(data);
    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (dias === 0) return 'Hoje';
    if (dias === 1) return 'Ontem';
    if (dias < 7) return `${dias} dias atrás`;
    return formatarData(data);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Cabeçalho */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-800">Meu Progresso</h1>
              <p className="text-lg text-gray-600 mt-1">
                Acompanhe sua evolução no Nipo School, {usuario?.user_metadata?.nome || 'Estudante'}!
              </p>
            </div>
          </div>

          {/* Estatísticas Gerais */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
              <div className="flex items-center gap-3">
                <Target className="h-8 w-8" />
                <div>
                  <p className="text-blue-100">Progresso Geral</p>
                  <p className="text-3xl font-bold">{progresso.geral}%</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-100">
              <div className="flex items-center gap-3">
                <Flame className="h-6 w-6 text-green-500" />
                <div>
                  <p className="text-sm text-gray-600">Sequência</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {progresso.estatisticas.dias_consecutivos} dias
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-purple-100">
              <div className="flex items-center gap-3">
                <Clock className="h-6 w-6 text-purple-500" />
                <div>
                  <p className="text-sm text-gray-600">Tempo Total</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {progresso.estatisticas.tempo_total_estudos}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-orange-100">
              <div className="flex items-center gap-3">
                <Star className="h-6 w-6 text-orange-500" />
                <div>
                  <p className="text-sm text-gray-600">Pontos</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {progresso.estatisticas.pontos_totais}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progresso por Módulos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Progresso por Módulo</h2>
            <div className="space-y-4">
              {progresso.modulos.map(modulo => {
                const IconeModulo = modulo.icone;
                return (
                  <div key={modulo.id} className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 bg-${modulo.cor}-100 rounded-lg`}>
                          <IconeModulo className={`h-6 w-6 text-${modulo.cor}-600`} />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-800">{modulo.nome}</h3>
                          <p className="text-sm text-gray-600">
                            {modulo.atividades_concluidas}/{modulo.total_atividades} atividades
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-800">{modulo.progresso}%</p>
                        <p className="text-xs text-gray-500">{modulo.tempo_dedicado}</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getCorProgresso(modulo.progresso)}`}
                          style={{ width: `${modulo.progresso}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <p className="text-gray-600">
                        Próxima meta: <span className="font-medium">{modulo.proxima_meta}</span>
                      </p>
                      <p className="text-gray-500">
                        {formatarDataRelativa(modulo.ultima_atividade)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Metas e Conquistas */}
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Metas Ativas</h2>
              <div className="space-y-4">
                {progresso.metas.map(meta => (
                  <div key={meta.id} className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-lg text-gray-800">{meta.titulo}</h3>
                      <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                        {meta.progresso}%
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{meta.descricao}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div 
                        className="h-2 rounded-full bg-blue-500"
                        style={{ width: `${meta.progresso}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500">
                      Prazo: {formatarData(meta.prazo)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Últimas Conquistas */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Últimas Conquistas</h2>
              <div className="grid grid-cols-2 gap-4">
                {progresso.conquistas.slice(0, 4).map(conquista => (
                  <div key={conquista.id} className="bg-white rounded-xl shadow-lg p-4 text-center">
                    <div className="text-3xl mb-2">{conquista.icone}</div>
                    <h4 className="font-bold text-gray-800 text-sm mb-1">{conquista.nome}</h4>
                    <p className="text-xs text-gray-600 mb-2">{conquista.descricao}</p>
                    <span className={`text-xs px-2 py-1 rounded ${
                      conquista.raridade === 'épico' ? 'bg-purple-100 text-purple-700' :
                      conquista.raridade === 'raro' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {conquista.raridade}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Atividades Recentes */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Atividades Recentes</h2>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="space-y-4">
              {progresso.atividades_recentes.map(atividade => (
                <div key={atividade.id} className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="text-2xl">{getIconeAtividade(atividade.tipo)}</div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">{atividade.titulo}</h4>
                    <p className="text-sm text-gray-600">{atividade.modulo}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">+{atividade.pontos} pts</p>
                    <p className="text-xs text-gray-500">{formatarDataRelativa(atividade.data)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Estatísticas Detalhadas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="h-6 w-6 text-blue-500" />
              <h3 className="font-bold text-gray-800">Performance Semanal</h3>
            </div>
            <p className="text-3xl font-bold text-gray-800 mb-2">
              {progresso.estatisticas.media_semanal}
            </p>
            <p className="text-sm text-gray-600">Média de estudos por semana</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="h-6 w-6 text-yellow-500" />
              <h3 className="font-bold text-gray-800">Ranking</h3>
            </div>
            <p className="text-3xl font-bold text-gray-800 mb-2">
              #{progresso.estatisticas.posicao_ranking}
            </p>
            <p className="text-sm text-gray-600">Posição no ranking geral</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="h-6 w-6 text-green-500" />
              <h3 className="font-bold text-gray-800">Engajamento</h3>
            </div>
            <p className="text-3xl font-bold text-gray-800 mb-2">
              {progresso.estatisticas.atividades_concluidas}
            </p>
            <p className="text-sm text-gray-600">Atividades concluídas</p>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/alunos/conquistas"
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-colors font-medium"
          >
            <Award className="h-5 w-5" />
            Ver Todas as Conquistas
          </Link>
          <Link
            to="/alunos/centro-estudos"
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-colors font-medium"
          >
            Voltar ao Centro de Estudos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProgressoAluno;