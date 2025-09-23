import React, { useState, useMemo } from 'react';
import { 
  Play, Clock, Users, BookOpen, Filter, Search, 
  ChevronDown, ChevronRight, Eye, Calendar, Star,
  Volume2, Download, Heart, Share2, Info, PlayCircle
} from 'lucide-react';
import { useVideos } from '@/shared/hooks';
import { AdvancedAlunoLayout } from '@/shared/components/layout/AdvancedAlunoLayout';
import { StandardCard, CardGrid, CardSection } from '@/shared/components/cards/StandardCard';

const BibliotecaVideos = () => {
  const [filtros, setFiltros] = useState({
    modulo: 'todos',
    duracao: 'todas',
    nivel: 'todos',
    busca: ''
  });
  const [activeTab, setActiveTab] = useState('todos');
  const [videoSelecionado, setVideoSelecionado] = useState(null);
  const [ordemBusca, setOrdemBusca] = useState('recente');

  // Usar hook personalizado para dados dos vídeos
  const { 
    videos, 
    loading, 
    calcularEstatisticas,
    refreshVideos
  } = useVideos();

  // Aplicar filtros
  const videosFiltrados = useMemo(() => {
    let resultado = videos;

    // Filtro de módulo
    if (filtros.modulo && filtros.modulo !== 'todos') {
      resultado = resultado?.filter(v => v.modulo === filtros.modulo);
    }

    // Filtro de nível
    if (filtros.nivel && filtros.nivel !== 'todos') {
      resultado = resultado?.filter(v => v.nivel === filtros.nivel);
    }

    // Filtro de duração
    if (filtros.duracao && filtros.duracao !== 'todas') {
      resultado = resultado?.filter(v => {
        const duracao = parseInt(v.duracao_minutos) || 0;
        switch (filtros.duracao) {
          case 'curta': return duracao <= 10;
          case 'media': return duracao > 10 && duracao <= 30;
          case 'longa': return duracao > 30;
          default: return true;
        }
      });
    }

    // Filtro de busca
    if (filtros.busca.trim()) {
      resultado = resultado?.filter(v => 
        v.titulo?.toLowerCase().includes(filtros.busca.toLowerCase()) ||
        v.descricao?.toLowerCase().includes(filtros.busca.toLowerCase()) ||
        v.instrutor?.toLowerCase().includes(filtros.busca.toLowerCase())
      );
    }

    // Ordenação
    return resultado?.sort((a, b) => {
      switch (ordemBusca) {
        case 'alfabetica':
          return a.titulo?.localeCompare(b.titulo) || 0;
        case 'popular':
          return (b.visualizacoes || 0) - (a.visualizacoes || 0);
        case 'duracao':
          return (parseInt(a.duracao_minutos) || 0) - (parseInt(b.duracao_minutos) || 0);
        default:
          return new Date(b.data_criacao || 0) - new Date(a.data_criacao || 0);
      }
    });
  }, [videos, filtros, ordemBusca]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFiltros(prev => ({ ...prev, modulo: tab }));
  };

  const handleSearch = (term) => {
    setFiltros(prev => ({ ...prev, busca: term }));
  };

  // Estatísticas para o hero
  const stats = calcularEstatisticas ? calcularEstatisticas(videos) : {};
  const statsCards = [
    { icon: Play, value: videos?.length || 0, label: 'Vídeos', color: 'red' },
    { icon: Clock, value: stats.duracaoTotal || 0, label: 'Minutos', color: 'blue' },
    { icon: Eye, value: stats.totalVisualizacoes || 0, label: 'Visualizações', color: 'green' },
    { icon: BookOpen, value: stats.totalModulos || 0, label: 'Módulos', color: 'purple' }
  ];

  // Tabs de navegação
  const tabs = [
    { id: 'todos', label: 'Todos', icon: Play, count: videos?.length || 0 },
    { id: 'teoria', label: 'Teoria', icon: BookOpen, count: videos?.filter(v => v.modulo === 'teoria')?.length || 0 },
    { id: 'pratica', label: 'Prática', icon: PlayCircle, count: videos?.filter(v => v.modulo === 'pratica')?.length || 0 },
    { id: 'tecnica', label: 'Técnica', icon: Star, count: videos?.filter(v => v.modulo === 'tecnica')?.length || 0 }
  ];

  // Conteúdo do hero
  const heroContent = (
    <div>
      <h3 className="text-xl font-semibold text-white mb-2">
        Biblioteca de Vídeo-Aulas
      </h3>
      <p className="text-red-100 mb-4">
        Acesse nossa coleção completa de vídeo-aulas organizadas por módulos e níveis.
      </p>
      
      {/* Busca integrada no hero */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar vídeo-aulas..."
          value={filtros.busca}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white/90 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-white/50 focus:border-transparent placeholder-gray-500"
        />
      </div>
    </div>
  );

  const formatarDuracao = (minutos) => {
    if (!minutos) return 'N/A';
    const min = parseInt(minutos);
    if (min < 60) return `${min} min`;
    const horas = Math.floor(min / 60);
    const minutosRestantes = min % 60;
    return `${horas}h ${minutosRestantes}min`;
  };

  return (
    <AdvancedAlunoLayout
      title="Biblioteca de Vídeos"
      subtitle="Vídeo-aulas organizadas para seu aprendizado"
      icon={Play}
      heroContent={heroContent}
      statsCards={statsCards}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={handleTabChange}
      onRefresh={refreshVideos}
      loading={loading}
      customTheme="biblioteca-videos"
    >
      {/* Filtros adicionais */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 mb-8 animate-fade-in">
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={filtros.nivel}
            onChange={(e) => setFiltros(prev => ({ ...prev, nivel: e.target.value }))}
            className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="todos">Todos os níveis</option>
            <option value="iniciante">Iniciante</option>
            <option value="intermediario">Intermediário</option>
            <option value="avancado">Avançado</option>
          </select>
          
          <select
            value={filtros.duracao}
            onChange={(e) => setFiltros(prev => ({ ...prev, duracao: e.target.value }))}
            className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="todas">Todas as durações</option>
            <option value="curta">Curta (até 10min)</option>
            <option value="media">Média (10-30min)</option>
            <option value="longa">Longa (+30min)</option>
          </select>

          <select
            value={ordemBusca}
            onChange={(e) => setOrdemBusca(e.target.value)}
            className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="recente">Mais recentes</option>
            <option value="popular">Mais visualizados</option>
            <option value="alfabetica">Ordem alfabética</option>
            <option value="duracao">Por duração</option>
          </select>
        </div>
      </div>

      {/* Conteúdo principal */}
      <CardSection
        title="Vídeo-aulas Disponíveis"
        subtitle={`${videosFiltrados?.length || 0} vídeos encontrados`}
        loading={loading}
        emptyState={
          <div className="text-center py-12 bg-white/50 backdrop-blur-sm rounded-2xl">
            <Play className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum vídeo encontrado</h3>
            <p className="text-gray-500">Tente ajustar os filtros ou fazer uma nova busca.</p>
          </div>
        }
      >
        {!loading && videosFiltrados && videosFiltrados.length > 0 && (
          <CardGrid>
            {videosFiltrados.map((video, index) => (
              <StandardCard
                key={video.id || index}
                title={video.titulo || `Vídeo ${index + 1}`}
                description={video.descricao || 'Descrição não disponível'}
                type="video"
                thumbnail={video.thumbnail_url || video.miniatura_url}
                badge={video.modulo || 'Vídeo-aula'}
                author={video.instrutor || video.professor}
                duration={formatarDuracao(video.duracao_minutos)}
                difficulty={video.nivel}
                actions={[
                  {
                    icon: Play,
                    label: 'Reproduzir',
                    onClick: () => setVideoSelecionado(video)
                  },
                  {
                    icon: Eye,
                    label: `${video.visualizacoes || 0} views`,
                    onClick: () => console.log('Visualizações', video)
                  },
                  {
                    icon: Clock,
                    label: formatarDuracao(video.duracao_minutos),
                    onClick: () => console.log('Duração', video)
                  },
                  {
                    icon: Info,
                    label: 'Ver detalhes',
                    onClick: () => setVideoSelecionado(video)
                  },
                  {
                    icon: Heart,
                    label: 'Favoritar',
                    onClick: () => console.log('Favoritar', video)
                  },
                  {
                    icon: Share2,
                    label: 'Compartilhar',
                    onClick: () => console.log('Compartilhar', video)
                  }
                ]}
                onClick={() => setVideoSelecionado(video)}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              />
            ))}
          </CardGrid>
        )}
      </CardSection>

      {/* Modal do vídeo */}
      {videoSelecionado && (
        <ModalVideo
          video={videoSelecionado}
          onClose={() => setVideoSelecionado(null)}
        />
      )}
    </AdvancedAlunoLayout>
  );
};

// Modal do vídeo
const ModalVideo = ({ video, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Play className="w-6 h-6 text-red-500" />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{video.titulo}</h2>
                <p className="text-gray-600">Por {video.instrutor || 'Instrutor'}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Player de vídeo */}
            <div className="lg:col-span-2">
              <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden">
                {video.url_video || video.video_url ? (
                  <iframe
                    src={video.url_video || video.video_url}
                    title={video.titulo}
                    className="w-full h-full"
                    frameBorder="0"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-500 to-pink-600">
                    <div className="text-center text-white">
                      <Play className="w-16 h-16 mx-auto mb-4 opacity-80" />
                      <p className="text-xl font-semibold">Vídeo não disponível</p>
                      <p className="text-red-200">URL do vídeo não encontrada</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Descrição do vídeo */}
              <div className="mt-6">
                <h3 className="font-semibold text-gray-800 mb-3">Sobre este vídeo</h3>
                <p className="text-gray-700 leading-relaxed">
                  {video.descricao || 'Descrição não disponível para este vídeo.'}
                </p>
              </div>
            </div>

            {/* Sidebar com informações */}
            <div className="space-y-6">
              {/* Estatísticas */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Eye className="w-5 h-5 text-gray-500" />
                  <div>
                    <div className="font-medium text-gray-800">{video.visualizacoes || 0}</div>
                    <div className="text-sm text-gray-600">Visualizações</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <div>
                    <div className="font-medium text-gray-800">{video.duracao_minutos || 'N/A'} min</div>
                    <div className="text-sm text-gray-600">Duração</div>
                  </div>
                </div>
                
                {video.nivel && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Star className="w-5 h-5 text-gray-500" />
                    <div>
                      <div className="font-medium text-gray-800">{video.nivel}</div>
                      <div className="text-sm text-gray-600">Nível</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Botões de ação */}
              <div className="space-y-2">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors">
                  <Heart className="w-4 h-4" />
                  Adicionar aos Favoritos
                </button>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                  <Download className="w-4 h-4" />
                  Download para Offline
                </button>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
                  <Share2 className="w-4 h-4" />
                  Compartilhar Vídeo
                </button>
              </div>

              {/* Tags/Categorias */}
              {video.tags && (
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {video.tags.split(',').map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BibliotecaVideos;