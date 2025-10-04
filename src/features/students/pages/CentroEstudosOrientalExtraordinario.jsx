import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/working-auth-context';
import { useNavigate } from 'react-router-dom';

// 🎌 Sistema de Componentes Orientais Enterprise
import {
  OrientalContainer,
  OrientalSection,
  OrientalWrapper,
  OrientalFlex,
  OrientalStack,
  OrientalGrid,
  Button,
  Card,
  StatCard,
  ActionCard,
  OrientalNavigation,
  OrientalMainLayout,
  useOrientalTheme,
  DesignTokens
} from '../../../shared/components';

import {
  BookOpen,
  Music,
  Headphones,
  Video,
  Download,
  Star,
  Clock,
  Users,
  PlayCircle,
  FileText,
  Award,
  Search,
  Filter,
  Heart,
  Share,
  Bookmark,
  Volume2,
  Mic,
  Music2,
  Library,
  GraduationCap,
  Target,
  Zap,
  Crown,
  Sparkles
} from 'lucide-react';

/**
 * 🎌 Centro de Estudos Oriental Extraordinário
 * Biblioteca completa de instrumentos, metodologias e recursos educacionais
 */
const CentroEstudosOrientalExtraordinario = () => {
  const { userProfile } = useAuth();
  const navigate = useNavigate();
  const theme = useOrientalTheme('student');

  // Estado do centro de estudos
  const [studyCenter, setStudyCenter] = useState({
    loading: true,
    activeFilter: 'todos',
    searchTerm: '',
    favoriteInstruments: ['violin', 'piano'],
    completedLessons: 12,
    bookmarkedResources: 8
  });

  // Biblioteca de Instrumentos Orientais
  const instrumentLibrary = [
    {
      id: 'violin',
      name: 'Violino',
      category: 'cordas',
      difficulty: 'Intermediário',
      lessons: 45,
      duration: '3-6 meses',
      icon: '🎻',
      color: 'blue',
      description: 'Instrumento clássico de cordas com técnicas orientais refinadas',
      methodology: 'Método Suzuki + Técnicas Zen',
      features: ['Postura Oriental', 'Respiração Zen', 'Escalas Tradicionais'],
      popularity: 92,
      students: 234,
      masterClass: true,
      videoCount: 28,
      audioCount: 15,
      pdfCount: 12
    },
    {
      id: 'piano',
      name: 'Piano',
      category: 'teclas',
      difficulty: 'Iniciante',
      lessons: 52,
      duration: '2-4 meses',
      icon: '🎹',
      color: 'emerald',
      description: 'Piano com metodologia oriental e melodias tradicionais japonesas',
      methodology: 'Método Orff + Harmonia Oriental',
      features: ['Melodias Japonesas', 'Harmonia Zen', 'Técnica Mindful'],
      popularity: 96,
      students: 345,
      masterClass: true,
      videoCount: 35,
      audioCount: 22,
      pdfCount: 18
    },
    {
      id: 'flauta',
      name: 'Flauta Oriental',
      category: 'sopro',
      difficulty: 'Avançado',
      lessons: 38,
      duration: '4-8 meses',
      icon: '🪈',
      color: 'amber',
      description: 'Flauta tradicional com técnicas de respiração zen e melodias orientais',
      methodology: 'Técnicas Zen + Respiração Mindful',
      features: ['Respiração Zen', 'Melodias Tradicionais', 'Meditação Musical'],
      popularity: 89,
      students: 156,
      masterClass: true,
      videoCount: 24,
      audioCount: 18,
      pdfCount: 14
    },
    {
      id: 'violao',
      name: 'Violão Popular',
      category: 'cordas',
      difficulty: 'Iniciante',
      lessons: 32,
      duration: '1-3 meses',
      icon: '🎸',
      color: 'red',
      description: 'Violão popular com influências orientais e acordes zen',
      methodology: 'Popular + Harmonia Oriental',
      features: ['Acordes Simples', 'Ritmos Orientais', 'Improvisação Zen'],
      popularity: 85,
      students: 289,
      masterClass: false,
      videoCount: 20,
      audioCount: 12,
      pdfCount: 8
    },
    {
      id: 'bateria',
      name: 'Bateria Rítmica',
      category: 'percussao',
      difficulty: 'Intermediário',
      lessons: 28,
      duration: '3-5 meses',
      icon: '🥁',
      color: 'purple',
      description: 'Bateria com ritmos orientais e técnicas de coordenação zen',
      methodology: 'Ritmos Orientais + Coordenação Zen',
      features: ['Ritmos Tradicionais', 'Coordenação Mindful', 'Improvisação'],
      popularity: 78,
      students: 167,
      masterClass: true,
      videoCount: 18,
      audioCount: 14,
      pdfCount: 6
    },
    {
      id: 'saxofone',
      name: 'Saxofone Jazz',
      category: 'sopro',
      difficulty: 'Avançado',
      lessons: 42,
      duration: '5-8 meses',
      icon: '🎷',
      color: 'indigo',
      description: 'Saxofone jazz com influências orientais e improvisação zen',
      methodology: 'Jazz + Filosofia Oriental',
      features: ['Improvisação Zen', 'Escalas Orientais', 'Expressão Mindful'],
      popularity: 82,
      students: 134,
      masterClass: true,
      videoCount: 22,
      audioCount: 16,
      pdfCount: 10
    }
  ];

  // Metodologias Orientais
  const methodologies = [
    {
      id: 'suzuki-zen',
      name: 'Método Suzuki Zen',
      description: 'Integração da filosofia zen com o método Suzuki tradicional',
      icon: '🧘',
      color: 'blue',
      principles: ['Repetição Mindful', 'Escuta Ativa', 'Progresso Natural'],
      instruments: ['Violino', 'Piano', 'Flauta'],
      difficulty: 'Todos os níveis',
      masterTeacher: 'Sensei Yamamoto'
    },
    {
      id: 'orff-oriental',
      name: 'Orff Schulwerk Oriental',
      description: 'Método Orff adaptado com elementos da cultura oriental',
      icon: '🎼',
      color: 'emerald',
      principles: ['Improvisação', 'Movimento Corporal', 'Criatividade'],
      instruments: ['Piano', 'Percussão', 'Flauta'],
      difficulty: 'Iniciante a Intermediário',
      masterTeacher: 'Mestre Tanaka'
    },
    {
      id: 'mindful-music',
      name: 'Música Mindful',
      description: 'Abordagem contemplativa para o aprendizado musical',
      icon: '🌸',
      color: 'amber',
      principles: ['Presença Plena', 'Respiração Consciente', 'Expressão Autêntica'],
      instruments: ['Todos os instrumentos'],
      difficulty: 'Todos os níveis',
      masterTeacher: 'Sensei Sakura'
    }
  ];

  // Recursos Educacionais
  const educationalResources = [
    {
      id: 'video-library',
      title: 'Biblioteca de Vídeos',
      description: 'Mais de 200 vídeos instrucionais em alta qualidade',
      icon: <Video />,
      count: 247,
      type: 'video',
      color: 'red',
      premium: false
    },
    {
      id: 'audio-exercises',
      title: 'Exercícios em Áudio',
      description: 'Práticas guiadas e exercícios de escuta ativa',
      icon: <Headphones />,
      count: 156,
      type: 'audio',
      color: 'blue',
      premium: false
    },
    {
      id: 'sheet-music',
      title: 'Partituras Orientais',
      description: 'Coleção de partituras tradicionais e contemporâneas',
      icon: <FileText />,
      count: 89,
      type: 'pdf',
      color: 'emerald',
      premium: true
    },
    {
      id: 'masterclasses',
      title: 'Master Classes',
      description: 'Aulas exclusivas com mestres orientais',
      icon: <Crown />,
      count: 24,
      type: 'premium',
      color: 'amber',
      premium: true
    }
  ];

  // Estatísticas do Centro
  const centerStats = [
    {
      icon: <Library />,
      value: instrumentLibrary.length.toString(),
      label: 'Instrumentos',
      color: 'blue',
      trend: 'up',
      trendValue: '+2 novos'
    },
    {
      icon: <BookOpen />,
      value: '247',
      label: 'Recursos Totais',
      color: 'emerald',
      trend: 'up',
      trendValue: '+15 esta semana'
    },
    {
      icon: <Users />,
      value: '1.2K',
      label: 'Estudantes Ativos',
      color: 'amber',
      trend: 'up',
      trendValue: '+23 hoje'
    },
    {
      icon: <Award />,
      value: methodologies.length.toString(),
      label: 'Metodologias',
      color: 'red',
      trend: 'stable',
      trendValue: 'certificadas'
    }
  ];

  // Filtros
  const filters = [
    { id: 'todos', label: 'Todos', count: instrumentLibrary.length },
    { id: 'cordas', label: 'Cordas', count: instrumentLibrary.filter(i => i.category === 'cordas').length },
    { id: 'teclas', label: 'Teclas', count: instrumentLibrary.filter(i => i.category === 'teclas').length },
    { id: 'sopro', label: 'Sopro', count: instrumentLibrary.filter(i => i.category === 'sopro').length },
    { id: 'percussao', label: 'Percussão', count: instrumentLibrary.filter(i => i.category === 'percussao').length }
  ];

  // Filtrar instrumentos
  const filteredInstruments = instrumentLibrary.filter(instrument => {
    const matchesFilter = studyCenter.activeFilter === 'todos' || instrument.category === studyCenter.activeFilter;
    const matchesSearch = instrument.name.toLowerCase().includes(studyCenter.searchTerm.toLowerCase()) ||
                         instrument.description.toLowerCase().includes(studyCenter.searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleInstrumentSelect = (instrument) => {
    console.log(`Selecionando instrumento: ${instrument.name}`);
    navigate(`/study-center/instrument/${instrument.id}`);
  };

  const handleMethodologySelect = (methodology) => {
    console.log(`Selecionando metodologia: ${methodology.name}`);
    navigate(`/study-center/methodology/${methodology.id}`);
  };

  const handleResourceAccess = (resource) => {
    console.log(`Acessando recurso: ${resource.title}`);
    navigate(`/study-center/resource/${resource.id}`);
  };

  const toggleFavorite = (instrumentId) => {
    setStudyCenter(prev => ({
      ...prev,
      favoriteInstruments: prev.favoriteInstruments.includes(instrumentId)
        ? prev.favoriteInstruments.filter(id => id !== instrumentId)
        : [...prev.favoriteInstruments, instrumentId]
    }));
  };

  // Carregar dados do centro
  useEffect(() => {
    const loadStudyCenter = async () => {
      try {
        setTimeout(() => {
          setStudyCenter(prev => ({ ...prev, loading: false }));
        }, 1000);
      } catch (error) {
        console.error('Erro ao carregar centro de estudos:', error);
        setStudyCenter(prev => ({ ...prev, loading: false }));
      }
    };

    loadStudyCenter();
  }, []);

  if (studyCenter.loading) {
    return (
      <OrientalContainer {...theme.container}>
        <OrientalNavigation 
          title="Carregando Centro de Estudos..."
          user={userProfile}
          {...theme.navigation}
        />
        <OrientalMainLayout>
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Preparando sua biblioteca musical oriental...</p>
          </div>
        </OrientalMainLayout>
      </OrientalContainer>
    );
  }

  return (
    <OrientalContainer {...theme.container}>
      {/* Navegação Oriental Centro de Estudos */}
      <OrientalNavigation
        title="Centro de Estudos Oriental"
        user={userProfile}
        menuItems={[
          { label: 'Instrumentos', onClick: () => setStudyCenter(prev => ({ ...prev, activeFilter: 'todos' })) },
          { label: 'Metodologias', onClick: () => navigate('/study-center/methodologies') },
          { label: 'Recursos', onClick: () => navigate('/study-center/resources') }
        ]}
        {...theme.navigation}
      />

      <OrientalMainLayout>
        {/* Cabeçalho Oriental do Centro */}
        <OrientalSection spacing="comfortable" className="mb-8">
          <OrientalWrapper className="text-center relative overflow-hidden">
            {/* Elementos flutuantes do centro */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-4 left-4 text-blue-200 text-2xl animate-bounce" style={{ animationDelay: '0s' }}>🎼</div>
              <div className="absolute top-8 right-8 text-emerald-200 text-xl animate-bounce" style={{ animationDelay: '1s' }}>📚</div>
              <div className="absolute bottom-8 left-12 text-amber-200 text-lg animate-bounce" style={{ animationDelay: '2s' }}>🎌</div>
              <div className="absolute bottom-4 right-4 text-red-200 text-xl animate-bounce" style={{ animationDelay: '3s' }}>⭐</div>
            </div>

            <div className="relative z-10 py-12">
              <div className="text-4xl mb-4">🏛️</div>
              <h1 className="text-3xl font-light text-gray-900 mb-2">
                Centro de Estudos Oriental
              </h1>
              <p className="text-gray-600 mb-6">
                Sua biblioteca completa de instrumentos, metodologias e recursos musicais orientais
              </p>
              
              {/* Barra de Pesquisa Oriental */}
              <div className="max-w-md mx-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Buscar instrumentos, metodologias..."
                    value={studyCenter.searchTerm}
                    onChange={(e) => setStudyCenter(prev => ({ ...prev, searchTerm: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
                  />
                </div>
              </div>
            </div>
          </OrientalWrapper>
        </OrientalSection>

        {/* Estatísticas do Centro */}
        <OrientalSection spacing="normal" className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            📊 Visão Geral do Centro
          </h2>
          
          <OrientalGrid columns="auto-fit" gap="lg">
            {centerStats.map((stat, index) => (
              <StatCard
                key={index}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
                color={stat.color}
                trend={stat.trend}
                trendValue={stat.trendValue}
              />
            ))}
          </OrientalGrid>
        </OrientalSection>

        {/* Filtros de Categoria */}
        <OrientalSection spacing="normal" className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
            🎭 Categorias de Instrumentos
          </h2>
          
          <OrientalFlex justify="center" wrap className="gap-3">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={studyCenter.activeFilter === filter.id ? 'oriental' : 'outline'}
                size="sm"
                onClick={() => setStudyCenter(prev => ({ ...prev, activeFilter: filter.id }))}
                className="flex items-center gap-2"
              >
                {filter.label}
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                  {filter.count}
                </span>
              </Button>
            ))}
          </OrientalFlex>
        </OrientalSection>

        {/* Biblioteca de Instrumentos */}
        <OrientalSection spacing="normal" className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            🎵 Biblioteca de Instrumentos
          </h2>
          
          <OrientalGrid columns="auto-fit" gap="lg">
            {filteredInstruments.map((instrument) => (
              <Card key={instrument.id} variant="oriental" className="hover:scale-105 transition-transform duration-300">
                <div className="p-6">
                  {/* Cabeçalho do Instrumento */}
                  <OrientalFlex justify="between" align="start" className="mb-4">
                    <div className="flex items-center">
                      <span className="text-3xl mr-3">{instrument.icon}</span>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{instrument.name}</h3>
                        <p className="text-sm text-gray-600">{instrument.methodology}</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => toggleFavorite(instrument.id)}
                      className={studyCenter.favoriteInstruments.includes(instrument.id) ? 'text-red-500' : ''}
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </OrientalFlex>

                  {/* Descrição */}
                  <p className="text-sm text-gray-600 mb-4">{instrument.description}</p>

                  {/* Features */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {instrument.features.map((feature, index) => (
                        <span 
                          key={index}
                          className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Estatísticas */}
                  <OrientalGrid columns={2} gap="sm" className="mb-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-1" />
                      {instrument.lessons} aulas
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {instrument.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {instrument.students} alunos
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      {instrument.popularity}% satisfação
                    </div>
                  </OrientalGrid>

                  {/* Recursos Disponíveis */}
                  <OrientalFlex justify="between" align="center" className="mb-4 text-xs text-gray-500">
                    <span>📹 {instrument.videoCount} vídeos</span>
                    <span>🎵 {instrument.audioCount} áudios</span>
                    <span>📄 {instrument.pdfCount} PDFs</span>
                  </OrientalFlex>

                  {/* Badges */}
                  <OrientalFlex justify="between" align="center" className="mb-4">
                    <span className={`text-xs px-2 py-1 rounded bg-${instrument.color}-100 text-${instrument.color}-600`}>
                      {instrument.difficulty}
                    </span>
                    {instrument.masterClass && (
                      <span className="text-xs bg-amber-100 text-amber-600 px-2 py-1 rounded flex items-center">
                        <Crown className="w-3 h-3 mr-1" />
                        Master Class
                      </span>
                    )}
                  </OrientalFlex>

                  {/* Ações */}
                  <OrientalFlex gap="sm">
                    <Button 
                      variant="oriental" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleInstrumentSelect(instrument)}
                    >
                      <PlayCircle className="w-4 h-4 mr-1" />
                      Começar
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate(`/study-center/preview/${instrument.id}`)}
                    >
                      <Star className="w-4 h-4" />
                    </Button>
                  </OrientalFlex>
                </div>
              </Card>
            ))}
          </OrientalGrid>
        </OrientalSection>

        {/* Metodologias Orientais */}
        <OrientalSection spacing="normal" className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            🧘 Metodologias Orientais
          </h2>
          
          <OrientalGrid columns={3} gap="lg">
            {methodologies.map((methodology) => (
              <Card key={methodology.id} variant="glassmorphism">
                <div className="p-6 text-center">
                  <div className="text-4xl mb-4">{methodology.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{methodology.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{methodology.description}</p>
                  
                  <div className="text-xs text-gray-500 mb-4">
                    <p><strong>Mestre:</strong> {methodology.masterTeacher}</p>
                    <p><strong>Nível:</strong> {methodology.difficulty}</p>
                  </div>

                  <div className="mb-4">
                    {methodology.principles.map((principle, index) => (
                      <span 
                        key={index}
                        className="inline-block text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded m-1"
                      >
                        {principle}
                      </span>
                    ))}
                  </div>

                  <Button 
                    variant="oriental" 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleMethodologySelect(methodology)}
                  >
                    Explorar Metodologia
                  </Button>
                </div>
              </Card>
            ))}
          </OrientalGrid>
        </OrientalSection>

        {/* Recursos Educacionais */}
        <OrientalSection spacing="normal" className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            📚 Recursos Educacionais
          </h2>
          
          <OrientalGrid columns="auto-fit" gap="lg">
            {educationalResources.map((resource) => (
              <ActionCard
                key={resource.id}
                icon={resource.icon}
                title={resource.title}
                description={resource.description}
                color={resource.color}
                onClick={() => handleResourceAccess(resource)}
                className="relative"
              >
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    {resource.count} itens
                  </span>
                  {resource.premium && (
                    <span className="text-xs bg-amber-100 text-amber-600 px-2 py-1 rounded">
                      Premium
                    </span>
                  )}
                </div>
              </ActionCard>
            ))}
          </OrientalGrid>
        </OrientalSection>

        {/* Inspiração Oriental */}
        <OrientalSection spacing="normal" className="mb-8">
          <Card variant="glassmorphism" className="text-center">
            <div className="py-8 px-6">
              <div className="text-4xl mb-4">🌸</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                "A música é a linguagem universal que conecta corações"
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Descubra seu instrumento e mergulhe na filosofia musical oriental
              </p>
              <OrientalFlex justify="center" gap="sm">
                <Button variant="outline" size="sm">
                  📖 Filosofia Musical
                </Button>
                <Button variant="oriental" size="sm">
                  🎌 Começar Jornada
                </Button>
              </OrientalFlex>
            </div>
          </Card>
        </OrientalSection>

        {/* Footer do Centro */}
        <div className="text-center py-8 border-t border-blue-100">
          <p className="text-sm text-gray-500 mb-2">
            🎌 Centro de Estudos Oriental • Nipo School
          </p>
          <p className="text-xs text-gray-400">
            Sua biblioteca musical oriental completa • {instrumentLibrary.length} instrumentos • {methodologies.length} metodologias
          </p>
        </div>
      </OrientalMainLayout>
    </OrientalContainer>
  );
};

export default CentroEstudosOrientalExtraordinario;