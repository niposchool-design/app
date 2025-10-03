import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Edit, 
  Share, 
  Users, 
  Music, 
  Clock, 
  Target,
  TrendingUp,
  Settings,
  Eye,
  AlertCircle,
  CheckCircle,
  Activity,
  Sparkles,
  Volume2,
  Package,
  DollarSign,
  MapPin,
  Play,
  Pause,
  Download,
  Heart,
  Star,
  Loader2,
  Image,
  BookOpen,
  Award,
  HelpCircle,
  Link,
  Calendar,
  Globe,
  FileText,
  Mic,
  Camera,
  Square
} from 'lucide-react';
import NipoHeader from '@/shared/components/UI/NipoHeader';
import { supabase } from '@/shared/lib/supabase';

const AdminInstrumentView = () => {
  const { instrumentId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [instrumentData, setInstrumentData] = useState(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState(null);

  // Funções para ações administrativas
  const handleShare = () => {
    const url = `${window.location.origin}/alunos/instrumento/${instrumentId}`;
    navigator.clipboard.writeText(url);
    alert('Link copiado para a área de transferência!');
  };

  const refreshData = () => {
    setLoading(true);
    window.location.reload();
  };

  // Buscar dados completos do banco usando o serviço especializado
  useEffect(() => {
    const fetchInstrumentData = async () => {
      if (!instrumentId) return;
      
      setLoading(true);
      setError(null);

      try {
        const resultado = await instrumentDetailService.getInstrumentoCompleto(instrumentId);
        
        if (resultado.success) {
          setInstrumentData(resultado.data);
        } else {
          setError(resultado.error);
        }
      } catch (err) {
        setError('Erro inesperado ao carregar o instrumento.');
        console.error('Erro ao buscar instrumento:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInstrumentData();
  }, [instrumentId]);

  // Extrair dados do objeto completo
  const instrument = instrumentData?.instrumentoDetalhado;
  const sons = instrumentData?.sons || [];
  const midias = instrumentData?.midias || [];
  const tecnicas = instrumentData?.tecnicas || [];
  const curiosidades = instrumentData?.curiosidades || [];
  const performances = instrumentData?.performances || [];
  const quiz = instrumentData?.quiz || [];
  const relacionados = instrumentData?.relacionados || [];
  const professores = instrumentData?.professores || [];

  // Mapeamento de ícones para categorias
  const getCategoryIcon = (categoryId) => {
    const iconMap = {
      'cordas': '🎸',
      'teclas': '🎹',
      'sopro': '🎺',
      'percussao': '🥁',
      'eletronicos': '🎧',
      'default': '🎵'
    };
    return iconMap[categoryId] || iconMap.default;
  };

  // Função para reproduzir áudio
  const playAudio = (audioUrl) => {
    if (audioElement) {
      audioElement.pause();
      setAudioElement(null);
      setAudioPlaying(false);
    }

    const audio = new Audio(audioUrl);
    audio.onended = () => setAudioPlaying(false);
    setAudioElement(audio);
    audio.play();
    setAudioPlaying(true);
  };

  // Estados de carregamento e erro
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NipoHeader />
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-4" />
            <p className="text-gray-600">Carregando detalhes do instrumento...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !instrument) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NipoHeader />
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <h3 className="text-red-800 font-medium">
                {error ? 'Erro ao carregar dados' : 'Instrumento não encontrado'}
              </h3>
            </div>
            {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
            <div className="flex space-x-3">
              <button
                onClick={() => navigate('/admin/instruments')}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Voltar à Lista
              </button>
              {error && (
                <button
                  onClick={refreshData}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Tentar Novamente
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Determinar status do instrumento
  const getInstrumentStatus = () => {
    if (!instrument) return 'Carregando...';
    if (instrument.disponivel_escola) {
      // Contar turmas ativas usando os dados reais
      const turmasAtivas = instrument.total_turmas || 0;
      return turmasAtivas > 0 ? 'Em Uso' : 'Disponível';
    }
    return 'Indisponível';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Disponível':
        return 'text-green-600 bg-green-100';
      case 'Em Uso':
        return 'text-blue-600 bg-blue-100';
      case 'Indisponível':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const status = getInstrumentStatus();

  return (
    <div className="min-h-screen bg-gray-50">
      <NipoHeader />
      
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Cabeçalho */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/admin/instruments')}
                className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Voltar</span>
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white text-2xl">
                  {getCategoryIcon(instrument.categoria)}
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                    {instrument?.nome || 'Nome não disponível'}
                  </h1>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(status)}`}>
                      {status}
                    </span>
                    <span className="text-sm text-gray-600">
                      Categoria: {instrument?.categoria?.charAt(0).toUpperCase() + instrument?.categoria?.slice(1) || 'Não especificada'}
                    </span>
                    {instrument?.origem && (
                      <>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm text-gray-600">
                          Origem: {instrument.origem}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate(`/admin/instruments/edit/${instrumentId}`)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Edit className="w-4 h-4" />
                <span className="text-sm font-medium">Editar</span>
              </button>
              
              <button
                onClick={handleShare}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Share className="w-4 h-4" />
                <span className="text-sm font-medium">Compartilhar</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna Principal */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Cards de Estatísticas Expandidas - Dados Reais */}
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-100 w-10 h-10 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Alunos</p>
                    <p className="text-xl font-bold text-gray-800">{instrument?.total_alunos || 0}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Professores</p>
                    <p className="text-xl font-bold text-gray-800">{professores.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 w-10 h-10 rounded-lg flex items-center justify-center">
                    <Activity className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Turmas</p>
                    <p className="text-xl font-bold text-gray-800">{instrument?.total_turmas || 0}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-orange-100 w-10 h-10 rounded-lg flex items-center justify-center">
                    <Volume2 className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Sons</p>
                    <p className="text-xl font-bold text-gray-800">{sons.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-pink-100 w-10 h-10 rounded-lg flex items-center justify-center">
                    <Image className="w-5 h-5 text-pink-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Mídias</p>
                    <p className="text-xl font-bold text-gray-800">{midias.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-yellow-100 w-10 h-10 rounded-lg flex items-center justify-center">
                    <Star className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Curiosidades</p>
                    <p className="text-xl font-bold text-gray-800">{curiosidades.length}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Descrição e Informações Básicas */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-4">
                <Music className="w-5 h-5 text-gray-500" />
                Sobre o {instrument?.nome}
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Descrição</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {instrument?.descricao || `O ${instrument?.nome} é um instrumento da família ${instrument?.categoria}, conhecido por sua versatilidade e sonoridade única.`}
                  </p>
                </div>
                
                {instrument?.historia && (
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">História</h3>
                    <p className="text-gray-600 leading-relaxed">{instrument.historia}</p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-sm text-gray-600">Categoria</p>
                  <p className="font-semibold text-gray-800 capitalize">{instrument?.categoria || 'N/A'}</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Globe className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-600">Origem</p>
                  <p className="font-semibold text-gray-800">{instrument?.origem || 'Não informada'}</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <p className="text-sm text-gray-600">Dificuldade</p>
                  <p className="font-semibold text-gray-800 capitalize">{instrument?.dificuldade_aprendizado || 'Intermediária'}</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="w-6 h-6 text-yellow-600" />
                  </div>
                  <p className="text-sm text-gray-600">Disponível</p>
                  <p className="font-semibold text-gray-800">{instrument?.disponivel_escola ? 'Sim' : 'Não'}</p>
                </div>
              </div>
            </div>

            {/* Sons de Exemplo */}
            {sons.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-4">
                  <Volume2 className="w-5 h-5 text-gray-500" />
                  Sons de Exemplo ({sons.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sons.map((som, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4 border">
                      <h3 className="font-semibold text-gray-800 mb-2">
                        {som.titulo || `Som ${index + 1}`}
                      </h3>
                      {som.nota_musical && (
                        <p className="text-sm text-gray-600 mb-2">Nota: {som.nota_musical}</p>
                      )}
                      {som.descricao && (
                        <p className="text-sm text-gray-600 mb-3">{som.descricao}</p>
                      )}
                      <div className="flex space-x-2">
                        {som.audio_url && (
                          <button
                            onClick={() => playAudio(som.audio_url)}
                            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors text-sm ${
                              audioPlaying 
                                ? 'bg-red-600 text-white hover:bg-red-700' 
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                          >
                            {audioPlaying ? (
                              <>
                                <Square className="w-3 h-3" />
                                <span>Parar</span>
                              </>
                            ) : (
                              <>
                                <Play className="w-3 h-3" />
                                <span>Tocar</span>
                              </>
                            )}
                          </button>
                        )}
                        {som.audio_url && (
                          <a
                            href={som.audio_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                          >
                            <Download className="w-3 h-3" />
                            <span>Baixar</span>
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Mídias - Imagens e Vídeos */}
            {midias.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-4">
                  <Image className="w-5 h-5 text-gray-500" />
                  Mídias ({midias.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {midias.map((midia, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4 border">
                      <h3 className="font-semibold text-gray-800 mb-2">
                        {midia.titulo || `Mídia ${index + 1}`}
                      </h3>
                      {midia.descricao && (
                        <p className="text-sm text-gray-600 mb-3">{midia.descricao}</p>
                      )}
                      {midia.url && (
                        <div className="aspect-video bg-gray-200 rounded-lg mb-3 overflow-hidden">
                          {midia.tipo === 'imagem' ? (
                            <img
                              src={midia.url}
                              alt={midia.titulo}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <video
                              src={midia.url}
                              controls
                              className="w-full h-full"
                            />
                          )}
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {midia.tipo || 'Mídia'}
                        </span>
                        {midia.url && (
                          <a
                            href={midia.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:text-blue-800"
                          >
                            Abrir
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Técnicas de Ensino */}
            {tecnicas.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-4">
                  <Sparkles className="w-5 h-5 text-gray-500" />
                  Técnicas de Ensino ({tecnicas.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {tecnicas.map((tecnica, index) => (
                    <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h3 className="font-semibold text-blue-800 mb-2">
                        {tecnica.titulo || tecnica.nome || `Técnica ${index + 1}`}
                      </h3>
                      {tecnica.descricao && (
                        <p className="text-blue-700 text-sm mb-2">{tecnica.descricao}</p>
                      )}
                      {tecnica.ordem_aprendizado && (
                        <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">
                          Ordem: {tecnica.ordem_aprendizado}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Performances */}
            {performances.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-4">
                  <Music className="w-5 h-5 text-gray-500" />
                  Performances ({performances.length})
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {performances.map((performance, index) => (
                    <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
                      <h3 className="font-semibold text-purple-800 mb-2">
                        {performance.titulo || `Performance ${index + 1}`}
                      </h3>
                      {performance.descricao && (
                        <p className="text-purple-700 text-sm mb-2">{performance.descricao}</p>
                      )}
                      {performance.artista && (
                        <p className="text-sm text-purple-600">Artista: {performance.artista}</p>
                      )}
                      {performance.video_url && (
                        <a
                          href={performance.video_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-2 mt-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                        >
                          <Play className="w-3 h-3" />
                          <span>Assistir</span>
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quiz */}
            {quiz.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-4">
                  <HelpCircle className="w-5 h-5 text-gray-500" />
                  Quiz - Teste seus Conhecimentos ({quiz.length} perguntas)
                </h2>
                <div className="space-y-4">
                  {quiz.map((pergunta, index) => (
                    <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h3 className="font-semibold text-green-800 mb-2">
                        {index + 1}. {pergunta.pergunta}
                      </h3>
                      <div className="space-y-2">
                        {pergunta.opcoes && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {Object.entries(pergunta.opcoes).map(([key, opcao]) => (
                              <div key={key} className={`p-2 rounded text-sm ${
                                key === pergunta.resposta_correta 
                                  ? 'bg-green-200 text-green-800 font-semibold' 
                                  : 'bg-white text-gray-700'
                              }`}>
                                {key.toUpperCase()}) {opcao}
                              </div>
                            ))}
                          </div>
                        )}
                        {pergunta.explicacao && (
                          <p className="text-green-700 text-sm mt-2">
                            <strong>Explicação:</strong> {pergunta.explicacao}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Curiosidades */}
            {curiosidades.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-4">
                  <Star className="w-5 h-5 text-gray-500" />
                  Curiosidades ({curiosidades.length})
                </h2>
                <div className="space-y-4">
                  {curiosidades.map((curiosidade, index) => (
                    <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h3 className="font-semibold text-yellow-800 mb-2">
                        {curiosidade.titulo || `Curiosidade ${index + 1}`}
                      </h3>
                      <p className="text-yellow-700 text-sm">{curiosidade.descricao}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Instrumentos Relacionados */}
            {relacionados.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-4">
                  <Link className="w-5 h-5 text-gray-500" />
                  Instrumentos Relacionados ({relacionados.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {relacionados.map((relacionado, index) => (
                    <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-800 mb-2">
                        {relacionado.nome_instrumento_relacionado}
                      </h3>
                      {relacionado.motivo_relacao && (
                        <p className="text-gray-600 text-sm">{relacionado.motivo_relacao}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Professores */}
            {professores.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-4">
                  <Users className="w-5 h-5 text-gray-500" />
                  Professores Especializados ({professores.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {professores.map((professor, index) => (
                    <div key={index} className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                      <h3 className="font-semibold text-indigo-800 mb-2">
                        {professor.nome_completo}
                      </h3>
                      {professor.especializacao && (
                        <p className="text-indigo-700 text-sm mb-1">
                          Especialização: {professor.especializacao}
                        </p>
                      )}
                      {professor.anos_experiencia && (
                        <p className="text-indigo-600 text-sm mb-2">
                          Experiência: {professor.anos_experiencia} anos
                        </p>
                      )}
                      {professor.biografia && (
                        <p className="text-indigo-700 text-sm">{professor.biografia}</p>
                      )}
                      {professor.email && (
                        <a
                          href={`mailto:${professor.email}`}
                          className="inline-flex items-center space-x-2 mt-2 text-indigo-600 hover:text-indigo-800 text-sm"
                        >
                          <span>Contato</span>
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Informações Administrativas Completas */}
          <div className="space-y-6">
            
            {/* Informações Básicas */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-4">
                <Eye className="w-5 h-5 text-gray-500" />
                Informações Gerais
              </h2>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Nome Completo</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {instrument?.nome || 'Não informado'}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 mb-1">Categoria</p>
                  <p className="text-lg font-semibold text-gray-800 capitalize">
                    {instrument?.categoria || 'Não especificada'}
                  </p>
                </div>

                {instrument?.origem && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">País de Origem</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {instrument.origem}
                    </p>
                  </div>
                )}
                
                <div>
                  <p className="text-sm text-gray-600 mb-1">Nível de Dificuldade</p>
                  <p className="text-lg font-semibold text-gray-800 capitalize">
                    {instrument?.dificuldade_aprendizado || 'Não especificado'}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 mb-1">Disponível na Escola</p>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium ${
                    instrument?.disponivel_escola 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {instrument?.disponivel_escola ? (
                      <>
                        <CheckCircle className="w-3 h-3" />
                        Disponível
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-3 h-3" />
                        Não Disponível
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Estatísticas de Conteúdo */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-4">
                <TrendingUp className="w-5 h-5 text-gray-500" />
                Conteúdo Disponível
              </h2>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div className="flex items-center space-x-2">
                    <Volume2 className="w-4 h-4 text-orange-500" />
                    <span className="text-sm text-gray-600">Sons de Exemplo</span>
                  </div>
                  <span className="font-semibold text-gray-800">{sons.length}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div className="flex items-center space-x-2">
                    <Image className="w-4 h-4 text-pink-500" />
                    <span className="text-sm text-gray-600">Mídias (Fotos/Vídeos)</span>
                  </div>
                  <span className="font-semibold text-gray-800">{midias.length}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-600">Técnicas de Ensino</span>
                  </div>
                  <span className="font-semibold text-gray-800">{tecnicas.length}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-gray-600">Curiosidades</span>
                  </div>
                  <span className="font-semibold text-gray-800">{curiosidades.length}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div className="flex items-center space-x-2">
                    <Music className="w-4 h-4 text-purple-500" />
                    <span className="text-sm text-gray-600">Performances</span>
                  </div>
                  <span className="font-semibold text-gray-800">{performances.length}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <div className="flex items-center space-x-2">
                    <HelpCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Quiz (Perguntas)</span>
                  </div>
                  <span className="font-semibold text-gray-800">{quiz.length}</span>
                </div>
              </div>
            </div>

            {/* Estatísticas de Uso */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-4">
                <Activity className="w-5 h-5 text-gray-500" />
                Estatísticas de Uso
              </h2>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Total de Professores</span>
                  <span className="font-semibold text-gray-800">{professores.length}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Total de Alunos</span>
                  <span className="font-semibold text-gray-800">{instrument?.total_alunos || 0}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Turmas Ativas</span>
                  <span className="font-semibold text-gray-800">{instrument?.total_turmas || 0}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-gray-600">Instrumentos Relacionados</span>
                  <span className="font-semibold text-gray-800">{relacionados.length}</span>
                </div>
              </div>
            </div>

            {/* Imagem Principal */}
            {midias.length > 0 && midias[0]?.url && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-4">
                  <Camera className="w-5 h-5 text-gray-500" />
                  Imagem Principal
                </h2>
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={midias[0].url}
                    alt={midias[0].titulo || instrument?.nome}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
                {midias[0].titulo && (
                  <p className="text-sm text-gray-600 mt-2 text-center">
                    {midias[0].titulo}
                  </p>
                )}
              </div>
            )}

            {/* Informações Técnicas do Sistema */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-4">
                <Settings className="w-5 h-5 text-gray-500" />
                Informações do Sistema
              </h2>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">ID no Banco</p>
                  <p className="text-xs font-bold text-gray-800 font-mono">
                    {instrument?.id || 'N/A'}
                  </p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Status no Sistema</p>
                  <span className="inline-flex items-center gap-1 text-green-600 font-medium text-sm">
                    <CheckCircle className="w-3 h-3" />
                    {instrument?.ativo ? 'Ativo' : 'Inativo'}
                  </span>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Criado em</p>
                  <p className="text-sm font-medium text-gray-800">
                    {instrument?.created_at ? 
                      new Date(instrument.created_at).toLocaleDateString('pt-BR') : 
                      'Não disponível'
                    }
                  </p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Última Atualização</p>
                  <p className="text-sm font-medium text-gray-800">
                    {instrument?.updated_at ? 
                      new Date(instrument.updated_at).toLocaleDateString('pt-BR') : 
                      'Não disponível'
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Ações Administrativas */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-4">
                <Settings className="w-5 h-5 text-gray-500" />
                Ações Rápidas
              </h2>
              
              <div className="space-y-3">
                <button
                  onClick={() => navigate(`/admin/instruments/edit/${instrumentId}`)}
                  className="w-full flex items-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  <span>Editar Instrumento</span>
                </button>
                
                <button
                  onClick={handleShare}
                  className="w-full flex items-center space-x-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Share className="w-4 h-4" />
                  <span>Compartilhar Link</span>
                </button>
                
                <button
                  onClick={refreshData}
                  className="w-full flex items-center space-x-2 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>Atualizar Dados</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminInstrumentView;