import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Music, BookOpen, Heart, Volume2, Play, Pause, Info, 
  Star, Clock, Users, Award, Search, Filter, Grid, List, Share2, Download,
  User, Calendar, DollarSign
} from 'lucide-react';
import { useInstrumentosReal } from '@/shared/hooks/useInstrumentosReal';
import { AdvancedAlunoLayout } from '@/shared/components/layout/AdvancedAlunoLayout';
import { StandardCard, CardGrid, CardSection } from '@/shared/components/cards/StandardCard';

const BibliotecaInstrumentos = () => {
  const navigate = useNavigate();
  
  // Estados locais para UI
  const [audioAtual, setAudioAtual] = useState(null);
  const [tocando, setTocando] = useState(false);
  const [filtros, setFiltros] = useState({
    categoria: 'todas',
    nivel: 'todos',
    busca: '',
    disponivel: 'todos'
  });
  const [activeTab, setActiveTab] = useState('todas');
  const [instrumentoSelecionado, setInstrumentoSelecionado] = useState(null);

  // Navegar para página de detalhes do instrumento
  const handleInstrumentoClick = (instrumento) => {
    console.log('🎵 Card principal clicado:', instrumento);
    console.log('🆔 ID do instrumento:', instrumento?.id, typeof instrumento?.id);
    console.log('📋 Instrumento completo:', JSON.stringify(instrumento, null, 2));
    
    if (!instrumento?.id) {
      console.error('❌ ID do instrumento não encontrado!');
      return;
    }
    
    console.log('🎵 Navegando para instrumento:', instrumento);
    navigate(`/alunos/instrumento/${instrumento.id}`);
  };

  // Usar hook personalizado para dados dos instrumentos
  const { 
    instrumentos: instrumentosData, 
    categorias, 
    stats,
    isLoading: loading, 
    error: _error,
    refreshData: refreshInstrumentos
  } = useInstrumentosReal();

  // Aplicar filtros usando dados do hook completo
  const instrumentosFiltrados = useMemo(() => {
    if (!instrumentosData?.length) return [];
    let resultado = instrumentosData;

    // Filtro de categoria
    if (filtros.categoria && filtros.categoria !== 'todas') {
      resultado = resultado.filter(instrumento => 
        instrumento.categoria?.toLowerCase() === filtros.categoria.toLowerCase()
      );
    }

    // Filtro de disponibilidade
    if (filtros.disponivel && filtros.disponivel !== 'todos') {
      resultado = resultado.filter(instrumento => 
        filtros.disponivel === 'sim' ? instrumento.disponivel_escola : !instrumento.disponivel_escola
      );
    }

    // Filtro de busca
    if (filtros.busca.trim()) {
      const termoBusca = filtros.busca.toLowerCase().trim();
      resultado = resultado.filter(instrumento =>
        instrumento.nome?.toLowerCase().includes(termoBusca) ||
        instrumento.descricao?.toLowerCase().includes(termoBusca) ||
        instrumento.categoria?.toLowerCase().includes(termoBusca)
      );
    }

    return resultado;
  }, [instrumentosData, filtros]);

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

  // Stats para o hero usando dados do hook completo
  const statsCards = [
    { icon: Music, value: stats?.totalInstruments || 0, label: 'Instrumentos', color: 'orange' },
    { icon: Play, value: instrumentosData?.filter(i => i.audio_exemplo_url)?.length || 0, label: 'Com Áudio', color: 'blue' },
    { icon: Heart, value: stats?.availableCount || 0, label: 'Disponíveis', color: 'green' },
    { icon: Award, value: categorias?.length || 4, label: 'Categorias', color: 'purple' }
  ];

  // Tabs de navegação usando dados reais
  const tabs = useMemo(() => [
    { id: 'todas', label: 'Todas', icon: Music, count: instrumentosData?.length || 0 },
    { id: 'cordas', label: 'Cordas', icon: Music, count: instrumentosData?.filter(i => i.categoria === 'cordas')?.length || 0 },
    { id: 'sopro', label: 'Sopro', icon: Volume2, count: instrumentosData?.filter(i => i.categoria === 'sopro')?.length || 0 },
    { id: 'percussao', label: 'Percussão', icon: Music, count: instrumentosData?.filter(i => i.categoria === 'percussao')?.length || 0 },
    { id: 'teclado', label: 'Teclado', icon: Music, count: instrumentosData?.filter(i => i.categoria === 'teclado')?.length || 0 }
  ], [instrumentosData]);

  // Conteúdo do hero
  const heroContent = (
    <div>
      <h3 className="text-xl font-semibold text-white mb-2">
        Explore nossa biblioteca de instrumentos
      </h3>
      <p className="text-orange-100 mb-4">
        Descubra diferentes instrumentos, suas características e técnicas de execução.
      </p>
      
      {/* Busca integrada no hero */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar instrumentos..."
          value={filtros.busca}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white/90 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-white/50 focus:border-transparent placeholder-gray-500"
        />
      </div>
    </div>
  );

  return (
    <AdvancedAlunoLayout
      title="Biblioteca de Instrumentos"
      subtitle="Explore e aprenda sobre diferentes instrumentos musicais"
      icon={Music}
      heroContent={heroContent}
      statsCards={statsCards}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={handleTabChange}
      onRefresh={refreshInstrumentos}
      loading={loading}
      customTheme="biblioteca-instrumentos"
    >
      {/* Filtros adicionais */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 mb-8 animate-fade-in">
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={filtros.nivel}
            onChange={(e) => setFiltros(prev => ({ ...prev, nivel: e.target.value }))}
            className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="todos">Todas as dificuldades</option>
            <option value="iniciante">Iniciante</option>
            <option value="intermediario">Intermediário</option>
            <option value="avancado">Avançado</option>
          </select>
          
          <select
            value={filtros.disponivel}
            onChange={(e) => setFiltros(prev => ({ ...prev, disponivel: e.target.value }))}
            className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="todos">Disponibilidade</option>
            <option value="true">Disponível</option>
            <option value="false">Indisponível</option>
          </select>

          <select className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent">
            <option value="recent">Mais recentes</option>
            <option value="popular">Mais populares</option>
            <option value="name">Por nome</option>
          </select>
        </div>
      </div>

      {/* Conteúdo principal */}
      <CardSection
        title="Instrumentos Disponíveis"
        subtitle={`${instrumentosFiltrados?.length || 0} instrumentos encontrados`}
        loading={loading}
        emptyState={
          <div className="text-center py-12 bg-white/50 backdrop-blur-sm rounded-2xl">
            <Music className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum instrumento encontrado</h3>
            <p className="text-gray-500">Tente ajustar os filtros ou fazer uma nova busca.</p>
          </div>
        }
      >
        {!loading && instrumentosFiltrados && instrumentosFiltrados.length > 0 && (
          <CardGrid>
            {instrumentosFiltrados.map((instrumento, index) => (
              <StandardCard
                key={instrumento.id || index}
                title={instrumento.nome || `Instrumento ${index + 1}`}
                description={instrumento.descricao || instrumento.historia || 'Descrição não disponível'}
                type="resource"
                thumbnail={instrumento.imagem_url}
                badge={instrumento.categoria || 'Instrumento'}
                author={instrumento.fabricante}
                difficulty={instrumento.nivel_dificuldade}
                actions={[
                  ...(instrumento.audio_exemplo_url ? [{
                    icon: tocando && audioAtual?.src === instrumento.audio_exemplo_url ? Pause : Volume2,
                    label: 'Ouvir exemplo',
                    onClick: () => toggleAudio(instrumento.audio_exemplo_url)
                  }] : []),
                  ...(instrumento.video_demonstracao_url ? [{
                    icon: Play,
                    label: 'Ver demonstração',
                    onClick: () => window.open(instrumento.video_demonstracao_url, '_blank')
                  }] : []),
                  {
                    icon: Info,
                    label: 'Ver detalhes',
                    onClick: () => {
                      console.log('🔍 Botão Info clicado:', instrumento);
                      handleInstrumentoClick(instrumento);
                    }
                  },
                  {
                    icon: Heart,
                    label: 'Favoritar',
                    onClick: () => console.log('Favoritar', instrumento)
                  },
                  {
                    icon: Share2,
                    label: 'Compartilhar',
                    onClick: () => console.log('Compartilhar', instrumento)
                  }
                ]}
                onClick={() => {
                  console.log('📱 Card principal clicado:', instrumento);
                  handleInstrumentoClick(instrumento);
                }}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              />
            ))}
          </CardGrid>
        )}
      </CardSection>

      {/* Modal de detalhes */}
      {instrumentoSelecionado && (
        <>
          {console.log('🎭 Modal sendo renderizado com:', instrumentoSelecionado)}
          <ModalDetalhesInstrumento
            instrumento={instrumentoSelecionado}
            onClose={() => {
              console.log('❌ Modal fechando...');
              setInstrumentoSelecionado(null);
            }}
          />
        </>
      )}
    </AdvancedAlunoLayout>
  );
};

// Modal de detalhes (componente separado)
const ModalDetalhesInstrumento = ({ instrumento, onClose }) => (
  <div 
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999]"
    onClick={onClose}
  >
    <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20"
         onClick={(e) => e.stopPropagation()}>
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">{instrumento.nome}</h2>
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
          {/* Imagem principal */}
          <div className="aspect-square bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl flex items-center justify-center overflow-hidden">
            {instrumento.imagem_url ? (
              <img src={instrumento.imagem_url} alt={instrumento.nome} className="w-full h-full object-cover" />
            ) : (
              <Music className="h-32 w-32 text-orange-300" />
            )}
          </div>
          
          {/* Informações */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">História</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{instrumento.historia}</p>
            </div>
            
            {instrumento.curiosidades && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Curiosidades</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{instrumento.curiosidades}</p>
              </div>
            )}

            {instrumento.disponivel_escola && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-green-800 text-sm font-medium">✓ Disponível na escola</p>
                {instrumento.pode_emprestar && (
                  <p className="text-green-600 text-xs mt-1">Disponível para empréstimo</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default BibliotecaInstrumentos;