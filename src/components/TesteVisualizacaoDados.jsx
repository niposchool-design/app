import React, { useState, useEffect } from 'react';
import { testarDadosProfessoresEAlunos } from '../utils/testeDadosBanco';

const TesteVisualizacaoDados = () => {
  const [dadosTeste, setDadosTeste] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mostrarDetalhes, setMostrarDetalhes] = useState(false);

  const executarTeste = async () => {
    setLoading(true);
    console.log('🚀 Executando teste via componente...');
    
    try {
      const resultado = await testarDadosProfessoresEAlunos();
      setDadosTeste(resultado);
    } catch (error) {
      console.error('Erro ao executar teste:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    executarTeste();
  }, []);

  const formatarData = (dataString) => {
    if (!dataString) return 'Nunca acessou';
    return new Date(dataString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calcularStatusAtividade = (lastActive) => {
    if (!lastActive) return { status: 'nunca_ativo', cor: 'bg-gray-400', texto: 'Nunca acessou' };
    
    const agora = new Date();
    const ultimoAcesso = new Date(lastActive);
    const diasSemAcesso = (agora - ultimoAcesso) / (1000 * 60 * 60 * 24);
    
    if (diasSemAcesso <= 7) return { status: 'ativo', cor: 'bg-green-500', texto: 'Ativo' };
    if (diasSemAcesso <= 30) return { status: 'moderado', cor: 'bg-yellow-500', texto: 'Moderadamente ativo' };
    return { status: 'inativo', cor: 'bg-red-500', texto: 'Inativo' };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Testando conexão e carregando dados do banco...</p>
            <p className="text-sm text-gray-500">Abra o console (F12) para ver detalhes completos</p>
          </div>
        </div>
      </div>
    );
  }

  if (!dadosTeste) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Erro ao carregar dados</h2>
            <p className="text-gray-600">Verifique o console para mais detalhes</p>
            <button 
              onClick={executarTeste}
              className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Tentar Novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { dadosCompletos } = dadosTeste;
  const { professores = [], alunos = [] } = dadosCompletos || {};

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            🧪 Teste de Dados do Banco - Nipo School
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800">Total de Usuários</h3>
              <p className="text-2xl font-bold text-blue-600">{dadosTeste.totalUsuarios}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800">Professores</h3>
              <p className="text-2xl font-bold text-green-600">{dadosTeste.totalProfessores}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-800">Alunos</h3>
              <p className="text-2xl font-bold text-purple-600">{dadosTeste.totalAlunos}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-semibold text-yellow-800">Console</h3>
              <p className="text-sm text-yellow-700">Abra F12 para ver detalhes completos</p>
            </div>
          </div>
          
          <div className="mt-6 flex gap-4">
            <button
              onClick={() => setMostrarDetalhes(!mostrarDetalhes)}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              {mostrarDetalhes ? 'Ocultar Detalhes' : 'Mostrar Detalhes'}
            </button>
            <button
              onClick={executarTeste}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              🔄 Atualizar Dados
            </button>
          </div>
        </div>

        {mostrarDetalhes && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Professores */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                👨‍🏫 Professores ({professores.length})
              </h2>
              
              {professores.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>Nenhum professor encontrado no banco</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {professores.map((professor) => {
                    const status = calcularStatusAtividade(professor.last_active);
                    
                    return (
                      <div key={professor.id} className="border rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                              {(professor.nome || professor.full_name || 'P').charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-800">
                                {professor.nome || professor.full_name || 'Nome não informado'}
                              </h3>
                              <p className="text-sm text-gray-600">{professor.email}</p>
                            </div>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full text-white ${status.cor}`}>
                            {status.texto}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-gray-500">🎵 Instrumento:</span>
                            <p className="font-medium">{professor.instrument || 'Não informado'}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">📱 Telefone:</span>
                            <p className="font-medium">{professor.phone || 'Não informado'}</p>
                          </div>
                          <div className="col-span-2">
                            <span className="text-gray-500">📍 Localização:</span>
                            <p className="font-medium">
                              {professor.city && professor.state 
                                ? `${professor.city}, ${professor.state}` 
                                : 'Não informado'
                              }
                            </p>
                          </div>
                          <div className="col-span-2">
                            <span className="text-gray-500">🕐 Último acesso:</span>
                            <p className="font-medium">{formatarData(professor.last_active)}</p>
                          </div>
                        </div>
                        
                        {professor.bio && (
                          <div className="mt-2">
                            <span className="text-gray-500 text-sm">📝 Bio:</span>
                            <p className="text-sm text-gray-700 mt-1">
                              {professor.bio.length > 100 
                                ? professor.bio.substring(0, 100) + '...' 
                                : professor.bio
                              }
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Alunos */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                🎓 Alunos ({alunos.length})
              </h2>
              
              {alunos.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>Nenhum aluno encontrado no banco</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {alunos.map((aluno) => {
                    const status = calcularStatusAtividade(aluno.last_active);
                    
                    return (
                      <div key={aluno.id} className="border rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                              {(aluno.nome || aluno.full_name || 'A').charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-800">
                                {aluno.nome || aluno.full_name || 'Nome não informado'}
                              </h3>
                              <p className="text-sm text-gray-600">{aluno.email}</p>
                            </div>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full text-white ${status.cor}`}>
                            {status.texto}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-gray-500">🎵 Instrumento:</span>
                            <p className="font-medium">{aluno.instrument || 'Não escolhido'}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">🏆 Pontos:</span>
                            <p className="font-medium">{aluno.total_points || 0}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">📚 Aulas:</span>
                            <p className="font-medium">{aluno.lessons_completed || 0} concluídas</p>
                          </div>
                          <div>
                            <span className="text-gray-500">📖 Módulos:</span>
                            <p className="font-medium">{aluno.modules_completed || 0} concluídos</p>
                          </div>
                          <div className="col-span-2">
                            <span className="text-gray-500">🔥 Sequência atual:</span>
                            <p className="font-medium">{aluno.current_streak || 0} dias</p>
                          </div>
                          <div className="col-span-2">
                            <span className="text-gray-500">🕐 Último acesso:</span>
                            <p className="font-medium">{formatarData(aluno.last_active)}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
        
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-blue-800 mb-2">💡 Instruções para análise completa:</h3>
          <ul className="text-blue-700 text-sm space-y-1">
            <li>• Abra as Ferramentas do Desenvolvedor (F12)</li>
            <li>• Vá para a aba "Console"</li>
            <li>• Você verá logs detalhados com estatísticas completas</li>
            <li>• Inclui contagem por instrumentos, status de atividade, completude de perfis</li>
            <li>• Dados estão sendo buscados em tempo real do Supabase</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TesteVisualizacaoDados;