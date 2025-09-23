import React, { useState, useMemo } from 'react';
import { 
  Music, Download, Play, Pause, FileText, Eye, Clock, 
  Star, Users, Volume2, BookOpen, Heart, Award, Lock, CheckCircle,
  Search, Filter, Grid, List, Calendar, Share2, Info
} from 'lucide-react';
import { useRepertorio } from '@/shared/hooks';
import { AdvancedAlunoLayout } from '@/shared/components/layout/AdvancedAlunoLayout';
import { StandardCard, CardGrid, CardSection } from '@/shared/components/cards/StandardCard';

const BibliotecaRepertorio = () => {
  // Estados locais para UI
  const [audioAtual, setAudioAtual] = useState(null);
  const [tocando, setTocando] = useState(false);
  const [filtros, setFiltros] = useState({
    categoria: 'todas',
    nivel: 'todos',
    busca: '',
    status: 'todos',
    instrumentos: 'todos'
  });
  const [activeTab, setActiveTab] = useState('todas');
  const [musicaSelecionada, setMusicaSelecionada] = useState(null);

  // Usar hook personalizado para dados do repertório
  const { 
    repertorio, 
    categorias, 
    loading, 
    filtrarRepertorio,
    refreshRepertorio
  } = useRepertorio();

  // Aplicar filtros usando o hook
  const repertorioFiltrado = useMemo(() => {
    let resultado = repertorio;

    // Filtro de categoria
    if (filtros.categoria && filtros.categoria !== 'todas') {
      resultado = filtrarRepertorio.categoria(resultado, filtros.categoria);
    }

    // Filtro de nível
    if (filtros.nivel && filtros.nivel !== 'todos') {
      resultado = filtrarRepertorio.nivel(resultado, filtros.nivel);
    }

    // Filtro de busca
    if (filtros.busca.trim()) {
      resultado = filtrarRepertorio.busca(resultado, filtros.busca.trim());
    }

    return resultado;
  }, [repertorio, filtros, filtrarRepertorio]);

  // Verificar se música está liberada
  const musicaLiberada = (musica) => {
    return musica?.liberado !== false;
  };

  // Controle de áudio
  const toggleAudio = (audioUrl) => {
    if (audioAtual && audioAtual.src === audioUrl) {
      if (tocando) {
        audioAtual.pause();
        setTocando(false);
      } else {
        audioAtual.play();
        setTocando(true);
      }
    } else {
      if (audioAtual) {
        audioAtual.pause();
      }
      const novoAudio = new Audio(audioUrl);
      novoAudio.addEventListener('ended', () => {
        setTocando(false);
        setAudioAtual(null);
      });
      novoAudio.play();
      setAudioAtual(novoAudio);
      setTocando(true);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFiltros(prev => ({ ...prev, categoria: tab }));
  };

  const handleSearch = (term) => {
    setFiltros(prev => ({ ...prev, busca: term }));
  };

  // Stats para o hero
  const statsCards = [
    { icon: Music, value: repertorio?.length || 0, label: 'Músicas', color: 'green' },
    { icon: Play, value: repertorio?.filter(m => m.audio_url)?.length || 0, label: 'Com Áudio', color: 'blue' },
    { icon: FileText, value: repertorio?.filter(m => m.partitura_url)?.length || 0, label: 'Partituras', color: 'purple' },
    { icon: Award, value: categorias?.length || 0, label: 'Categorias', color: 'orange' }
  ];

  // Tabs de navegação
  const tabs = [
    { id: 'todas', label: 'Todas', icon: Music, count: repertorio?.length || 0 },
    { id: 'classica', label: 'Clássica', icon: Music, count: repertorio?.filter(m => m.genero === 'classica')?.length || 0 },
    { id: 'popular', label: 'Popular', icon: Music, count: repertorio?.filter(m => m.genero === 'popular')?.length || 0 },
    { id: 'folclorica', label: 'Folclórica', icon: Music, count: repertorio?.filter(m => m.genero === 'folclorica')?.length || 0 },
    { id: 'infantil', label: 'Infantil', icon: Heart, count: repertorio?.filter(m => m.genero === 'infantil')?.length || 0 }
  ];

  // Conteúdo do hero
  const heroContent = (
    <div>
      <h3 className="text-xl font-semibold text-white mb-2">
        Descubra nosso repertório musical
      </h3>
      <p className="text-green-100 mb-4">
        Explore partituras, áudios e materiais educativos para o seu aprendizado.
      </p>
      
      {/* Busca integrada no hero */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar músicas..."
          value={filtros.busca}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white/90 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-white/50 focus:border-transparent placeholder-gray-500"
        />
      </div>
    </div>
  );

  return (
    <AdvancedAlunoLayout
      title="Biblioteca de Repertório"
      subtitle="Explore partituras, áudios e materiais musicais"
      icon={BookOpen}
      heroContent={heroContent}
      statsCards={statsCards}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={handleTabChange}
      onRefresh={refreshRepertorio}
      loading={loading}
      customTheme="biblioteca-repertorio"
    >
      {/* Filtros adicionais */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 mb-8 animate-fade-in">
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={filtros.nivel}
            onChange={(e) => setFiltros(prev => ({ ...prev, nivel: e.target.value }))}
            className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="todos">Todas as dificuldades</option>
            <option value="iniciante">Iniciante</option>
            <option value="intermediario">Intermediário</option>
            <option value="avancado">Avançado</option>
          </select>
          
          <select
            value={filtros.instrumentos}
            onChange={(e) => setFiltros(prev => ({ ...prev, instrumentos: e.target.value }))}
            className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="todos">Todos os instrumentos</option>
            <option value="piano">Piano</option>
            <option value="violao">Violão</option>
            <option value="flauta">Flauta</option>
            <option value="violino">Violino</option>
          </select>

          <select className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent">
            <option value="recent">Mais recentes</option>
            <option value="popular">Mais populares</option>
            <option value="name">Por nome</option>
            <option value="composer">Por compositor</option>
          </select>
        </div>
      </div>

      {/* Conteúdo principal */}
      <CardSection
        title="Repertório Musical"
        subtitle={`${repertorioFiltrado?.length || 0} músicas encontradas`}
        loading={loading}
        emptyState={
          <div className="text-center py-12 bg-white/50 backdrop-blur-sm rounded-2xl">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhuma música encontrada</h3>
            <p className="text-gray-500">Tente ajustar os filtros ou fazer uma nova busca.</p>
          </div>
        }
      >
        {!loading && repertorioFiltrado && repertorioFiltrado.length > 0 && (
          <CardGrid>
            {repertorioFiltrado.map((musica, index) => (
              <StandardCard
                key={musica.id || index}
                title={musica.titulo || musica.nome || `Música ${index + 1}`}
                description={musica.descricao || `${musica.compositor ? `Por ${musica.compositor}` : 'Autor desconhecido'}`}
                type="audio"
                thumbnail={musica.capa_url}
                badge={musica.genero || 'Música'}
                author={musica.compositor}
                difficulty={musica.nivel_dificuldade}
                duration={musica.duracao}
                actions={[
                  ...(musica.audio_url && musicaLiberada(musica) ? [{
                    icon: tocando && audioAtual?.src === musica.audio_url ? Pause : Play,
                    label: 'Reproduzir',
                    onClick: () => toggleAudio(musica.audio_url)
                  }] : []),
                  ...(musica.partitura_url && musicaLiberada(musica) ? [{
                    icon: FileText,
                    label: 'Ver partitura',
                    onClick: () => window.open(musica.partitura_url, '_blank')
                  }] : []),
                  ...(musica.audio_url && musicaLiberada(musica) ? [{
                    icon: Download,
                    label: 'Download',
                    onClick: () => window.open(musica.audio_url, '_blank')
                  }] : []),
                  {
                    icon: Info,
                    label: 'Ver detalhes',
                    onClick: () => setMusicaSelecionada(musica)
                  },
                  {
                    icon: Heart,
                    label: 'Favoritar',
                    onClick: () => console.log('Favoritar', musica)
                  },
                  {
                    icon: Share2,
                    label: 'Compartilhar',
                    onClick: () => console.log('Compartilhar', musica)
                  }
                ]}
                onClick={() => setMusicaSelecionada(musica)}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              />
            ))}
          </CardGrid>
        )}
      </CardSection>

      {/* Modal de detalhes */}
      {musicaSelecionada && (
        <ModalDetalhesMusica
          musica={musicaSelecionada}
          onClose={() => setMusicaSelecionada(null)}
          onPlay={(url) => toggleAudio(url)}
          isPlaying={tocando && audioAtual?.src === musicaSelecionada.audio_url}
        />
      )}
    </AdvancedAlunoLayout>
  );
};

// Modal de detalhes da música
const ModalDetalhesMusica = ({ musica, onClose, onPlay, isPlaying }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">{musica.titulo || musica.nome}</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            ✕
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Capa da música */}
          <div className="aspect-square bg-gradient-to-br from-green-50 to-green-100 rounded-2xl flex items-center justify-center overflow-hidden">
            {musica.capa_url ? (
              <img src={musica.capa_url} alt={musica.titulo} className="w-full h-full object-cover" />
            ) : (
              <Music className="h-32 w-32 text-green-300" />
            )}
            
            {/* Controle de reprodução sobreposto */}
            {musica.audio_url && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity">
                <button
                  onClick={() => onPlay(musica.audio_url)}
                  className="p-6 bg-white/90 rounded-full hover:bg-white transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8 text-green-600" />
                  ) : (
                    <Play className="w-8 h-8 text-green-600" />
                  )}
                </button>
              </div>
            )}
          </div>
          
          {/* Informações da música */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Informações</h3>
              <div className="space-y-2 text-sm text-gray-600">
                {musica.compositor && (
                  <p><span className="font-medium">Compositor:</span> {musica.compositor}</p>
                )}
                {musica.genero && (
                  <p><span className="font-medium">Gênero:</span> {musica.genero}</p>
                )}
                {musica.nivel_dificuldade && (
                  <p><span className="font-medium">Dificuldade:</span> {musica.nivel_dificuldade}</p>
                )}
                {musica.duracao && (
                  <p><span className="font-medium">Duração:</span> {musica.duracao}</p>
                )}
              </div>
            </div>
            
            {musica.descricao && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Descrição</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{musica.descricao}</p>
              </div>
            )}

            {/* Botões de ação */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
              {musica.audio_url && (
                <button
                  onClick={() => onPlay(musica.audio_url)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isPlaying ? 'Pausar' : 'Reproduzir'}
                </button>
              )}
              
              {musica.partitura_url && (
                <button
                  onClick={() => window.open(musica.partitura_url, '_blank')}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  Ver Partitura
                </button>
              )}
              
              {musica.audio_url && (
                <button
                  onClick={() => window.open(musica.audio_url, '_blank')}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default BibliotecaRepertorio;