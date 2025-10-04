import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/working-auth-context';

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
  OrientalNavigation,
  OrientalMainLayout,
  useOrientalTheme
} from '../../../shared/components';

import {
  Play,
  Pause,
  Download,
  BookOpen,
  Video,
  Headphones,
  FileText,
  Star,
  Clock,
  Users,
  Heart,
  Share,
  ArrowLeft,
  CheckCircle,
  PlayCircle,
  Volume2,
  Award,
  Target,
  Zap
} from 'lucide-react';

/**
 * 🎌 Página Individual do Instrumento Oriental
 * Detalhes completos de um instrumento específico
 */
const InstrumentoOrientalDetalhes = () => {
  const { instrumentId } = useParams();
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  const theme = useOrientalTheme('student');

  // Estado do instrumento
  const [instrumentData, setInstrumentData] = useState({
    loading: true,
    currentLesson: 1,
    isPlaying: false,
    completedLessons: [],
    bookmarked: false,
    enrolled: false
  });

  // Dados do instrumento (simulado - viria do Supabase)
  const instrumentDetails = {
    violin: {
      id: 'violin',
      name: 'Violino Oriental',
      category: 'cordas',
      difficulty: 'Intermediário',
      icon: '🎻',
      color: 'blue',
      description: 'Mergulhe na arte do violino com técnicas orientais refinadas, combinando tradição clássica com filosofia zen.',
      methodology: 'Método Suzuki + Técnicas Zen',
      duration: '3-6 meses',
      totalLessons: 45,
      videoCount: 28,
      audioCount: 15,
      pdfCount: 12,
      students: 234,
      rating: 4.8,
      masterTeacher: 'Sensei Yamamoto',
      price: 'Incluído no plano',
      features: [
        'Postura Oriental tradicional',
        'Técnicas de respiração zen',
        'Escalas tradicionais japonesas',
        'Exercícios de mindfulness musical',
        'Repertório clássico e oriental'
      ],
      curriculum: [
        {
          module: 1,
          title: 'Fundamentos e Postura',
          lessons: 8,
          duration: '2 semanas',
          topics: ['Postura Oriental', 'Segurando o Arco', 'Primeiros Sons', 'Respiração Zen']
        },
        {
          module: 2,
          title: 'Escalas e Técnicas Básicas',
          lessons: 10,
          duration: '3 semanas',
          topics: ['Escalas Maiores', 'Técnicas de Arco', 'Afinação', 'Ritmo Base']
        },
        {
          module: 3,
          title: 'Melodias Tradicionais',
          lessons: 12,
          duration: '4 semanas',
          topics: ['Melodias Japonesas', 'Dinâmica Musical', 'Expressão', 'Improviso']
        },
        {
          module: 4,
          title: 'Repertório Avançado',
          lessons: 15,
          duration: '5 semanas',
          topics: ['Peças Clássicas', 'Técnicas Avançadas', 'Performance', 'Master Class']
        }
      ],
      recentLessons: [
        {
          id: 1,
          title: 'Introdução ao Violino Oriental',
          duration: '12 min',
          type: 'video',
          completed: true,
          preview: true
        },
        {
          id: 2,
          title: 'Postura e Respiração Zen',
          duration: '15 min',
          type: 'video',
          completed: true,
          preview: false
        },
        {
          id: 3,
          title: 'Primeiros Sons no Violino',
          duration: '18 min',
          type: 'video',
          completed: false,
          preview: false
        },
        {
          id: 4,
          title: 'Exercícios de Arco Básicos',
          duration: '14 min',
          type: 'video',
          completed: false,
          preview: false
        }
      ],
      resources: [
        {
          id: 1,
          title: 'Guia de Postura Oriental',
          type: 'pdf',
          size: '2.4 MB',
          downloads: 156
        },
        {
          id: 2,
          title: 'Áudio: Escalas para Prática',
          type: 'audio',
          size: '8.7 MB',
          downloads: 89
        },
        {
          id: 3,
          title: 'Partituras Tradicionais',
          type: 'pdf',
          size: '5.1 MB',
          downloads: 234
        }
      ]
    }
  };

  const instrument = instrumentDetails[instrumentId] || instrumentDetails.violin;

  // Estatísticas do progresso
  const progressStats = [
    {
      icon: <Target />,
      value: `${instrumentData.completedLessons.length}`,
      label: 'Aulas Concluídas',
      color: 'blue',
      trend: 'up',
      trendValue: `de ${instrument.totalLessons}`
    },
    {
      icon: <Clock />,
      value: '24h',
      label: 'Tempo de Estudo',
      color: 'emerald',
      trend: 'up',
      trendValue: 'esta semana'
    },
    {
      icon: <Award />,
      value: '85%',
      label: 'Taxa de Acerto',
      color: 'amber',
      trend: 'up',
      trendValue: 'melhorando'
    },
    {
      icon: <Zap />,
      value: '7',
      label: 'Sequência de Dias',
      color: 'red',
      trend: 'up',
      trendValue: 'recorde!'
    }
  ];

  const handleStartLesson = (lesson) => {
    console.log(`Iniciando aula: ${lesson.title}`);
    setInstrumentData(prev => ({ ...prev, currentLesson: lesson.id, isPlaying: true }));
  };

  const handleEnroll = () => {
    setInstrumentData(prev => ({ ...prev, enrolled: true }));
    console.log(`Matriculado em: ${instrument.name}`);
  };

  const handleDownloadResource = (resource) => {
    console.log(`Baixando: ${resource.title}`);
  };

  const toggleBookmark = () => {
    setInstrumentData(prev => ({ ...prev, bookmarked: !prev.bookmarked }));
  };

  // Calcular progresso
  const progressPercentage = (instrumentData.completedLessons.length / instrument.totalLessons) * 100;

  useEffect(() => {
    const loadInstrumentData = async () => {
      try {
        // Simular carregamento
        setTimeout(() => {
          setInstrumentData(prev => ({ 
            ...prev, 
            loading: false,
            completedLessons: [1, 2], // Aulas já concluídas
            enrolled: true
          }));
        }, 800);
      } catch (error) {
        console.error('Erro ao carregar instrumento:', error);
        setInstrumentData(prev => ({ ...prev, loading: false }));
      }
    };

    loadInstrumentData();
  }, [instrumentId]);

  if (instrumentData.loading) {
    return (
      <OrientalContainer {...theme.container}>
        <OrientalNavigation 
          title="Carregando instrumento..."
          user={userProfile}
          {...theme.navigation}
        />
        <OrientalMainLayout>
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Preparando sua experiência musical...</p>
          </div>
        </OrientalMainLayout>
      </OrientalContainer>
    );
  }

  return (
    <OrientalContainer {...theme.container}>
      {/* Navegação com Breadcrumb */}
      <OrientalNavigation
        title={instrument.name}
        user={userProfile}
        onBack={() => navigate('/study-center')}
        menuItems={[
          { label: 'Aulas', onClick: () => console.log('Aulas') },
          { label: 'Recursos', onClick: () => console.log('Recursos') },
          { label: 'Progresso', onClick: () => console.log('Progresso') }
        ]}
        {...theme.navigation}
      />

      <OrientalMainLayout>
        {/* Cabeçalho do Instrumento */}
        <OrientalSection spacing="comfortable" className="mb-8">
          <Card variant="oriental">
            <div className="p-8">
              <OrientalFlex align="start" gap="lg">
                {/* Info Principal */}
                <div className="flex-1">
                  <OrientalFlex align="center" gap="md" className="mb-4">
                    <span className="text-5xl">{instrument.icon}</span>
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900">{instrument.name}</h1>
                      <p className="text-lg text-gray-600">{instrument.methodology}</p>
                    </div>
                  </OrientalFlex>

                  <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                    {instrument.description}
                  </p>

                  {/* Badges */}
                  <OrientalFlex gap="sm" className="mb-6">
                    <span className={`px-3 py-1 rounded-full text-sm bg-${instrument.color}-100 text-${instrument.color}-600`}>
                      {instrument.difficulty}
                    </span>
                    <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-600">
                      {instrument.duration}
                    </span>
                    <span className="px-3 py-1 rounded-full text-sm bg-amber-100 text-amber-600">
                      ⭐ {instrument.rating}/5.0
                    </span>
                  </OrientalFlex>

                  {/* Ações Principais */}
                  <OrientalFlex gap="md">
                    {instrumentData.enrolled ? (
                      <Button variant="oriental" size="lg" onClick={() => handleStartLesson(instrument.recentLessons[0])}>
                        <PlayCircle className="w-5 h-5 mr-2" />
                        Continuar Estudando
                      </Button>
                    ) : (
                      <Button variant="oriental" size="lg" onClick={handleEnroll}>
                        🎵 Começar Curso
                      </Button>
                    )}
                    <Button variant="outline" onClick={toggleBookmark}>
                      <Heart className={`w-5 h-5 ${instrumentData.bookmarked ? 'text-red-500' : ''}`} />
                    </Button>
                    <Button variant="outline">
                      <Share className="w-5 h-5" />
                    </Button>
                  </OrientalFlex>
                </div>

                {/* Stats Card */}
                <Card variant="glassmorphism" className="w-80">
                  <div className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Informações do Curso</h3>
                    <OrientalStack spacing="md">
                      <OrientalFlex justify="between">
                        <span className="text-gray-600">Professor:</span>
                        <span className="font-medium">{instrument.masterTeacher}</span>
                      </OrientalFlex>
                      <OrientalFlex justify="between">
                        <span className="text-gray-600">Total de Aulas:</span>
                        <span className="font-medium">{instrument.totalLessons}</span>
                      </OrientalFlex>
                      <OrientalFlex justify="between">
                        <span className="text-gray-600">Estudantes:</span>
                        <span className="font-medium">{instrument.students}</span>
                      </OrientalFlex>
                      <OrientalFlex justify="between">
                        <span className="text-gray-600">Recursos:</span>
                        <span className="font-medium">
                          📹{instrument.videoCount} 🎵{instrument.audioCount} 📄{instrument.pdfCount}
                        </span>
                      </OrientalFlex>
                      <OrientalFlex justify="between">
                        <span className="text-gray-600">Preço:</span>
                        <span className="font-medium text-emerald-600">{instrument.price}</span>
                      </OrientalFlex>
                    </OrientalStack>
                  </div>
                </Card>
              </OrientalFlex>
            </div>
          </Card>
        </OrientalSection>

        {/* Progresso do Estudante */}
        {instrumentData.enrolled && (
          <OrientalSection spacing="normal" className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
              📊 Seu Progresso
            </h2>
            
            <OrientalGrid columns="auto-fit" gap="lg" className="mb-6">
              {progressStats.map((stat, index) => (
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

            {/* Barra de Progresso */}
            <Card variant="glassmorphism">
              <div className="p-6">
                <OrientalFlex justify="between" align="center" className="mb-3">
                  <span className="font-medium text-gray-900">Progresso Geral</span>
                  <span className="text-lg font-bold text-blue-600">{Math.round(progressPercentage)}%</span>
                </OrientalFlex>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-emerald-500 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {instrumentData.completedLessons.length} de {instrument.totalLessons} aulas concluídas
                </p>
              </div>
            </Card>
          </OrientalSection>
        )}

        {/* Currículo do Curso */}
        <OrientalSection spacing="normal" className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            📚 Currículo do Curso
          </h2>
          
          <OrientalGrid columns={2} gap="lg">
            {instrument.curriculum.map((module) => (
              <Card key={module.module} variant="oriental">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Módulo {module.module}: {module.title}
                  </h3>
                  <OrientalFlex justify="between" className="mb-4 text-sm text-gray-600">
                    <span>{module.lessons} aulas</span>
                    <span>{module.duration}</span>
                  </OrientalFlex>
                  <OrientalStack spacing="xs">
                    {module.topics.map((topic, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 mr-2 text-emerald-500" />
                        {topic}
                      </div>
                    ))}
                  </OrientalStack>
                </div>
              </Card>
            ))}
          </OrientalGrid>
        </OrientalSection>

        {/* Aulas Recentes */}
        <OrientalSection spacing="normal" className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            🎬 Próximas Aulas
          </h2>
          
          <OrientalGrid columns={2} gap="lg">
            {instrument.recentLessons.map((lesson) => (
              <Card key={lesson.id} variant="oriental" className="hover:scale-105 transition-transform">
                <div className="p-6">
                  <OrientalFlex justify="between" align="start" className="mb-3">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">{lesson.title}</h4>
                      <OrientalFlex align="center" gap="sm" className="text-sm text-gray-600">
                        <Video className="w-4 h-4" />
                        <span>{lesson.duration}</span>
                        {lesson.preview && (
                          <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">
                            Preview
                          </span>
                        )}
                      </OrientalFlex>
                    </div>
                    {lesson.completed && (
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                    )}
                  </OrientalFlex>
                  
                  <Button 
                    variant={lesson.completed ? 'outline' : 'oriental'} 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleStartLesson(lesson)}
                    disabled={!instrumentData.enrolled && !lesson.preview}
                  >
                    {lesson.completed ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Revisar
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        {lesson.preview ? 'Preview' : 'Assistir'}
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            ))}
          </OrientalGrid>
        </OrientalSection>

        {/* Recursos para Download */}
        <OrientalSection spacing="normal" className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            📁 Recursos para Download
          </h2>
          
          <OrientalGrid columns={3} gap="lg">
            {instrument.resources.map((resource) => (
              <Card key={resource.id} variant="glassmorphism">
                <div className="p-6">
                  <OrientalFlex align="center" gap="sm" className="mb-3">
                    {resource.type === 'pdf' && <FileText className="w-5 h-5 text-red-500" />}
                    {resource.type === 'audio' && <Headphones className="w-5 h-5 text-blue-500" />}
                    {resource.type === 'video' && <Video className="w-5 h-5 text-emerald-500" />}
                    <h4 className="font-medium text-gray-900 flex-1">{resource.title}</h4>
                  </OrientalFlex>
                  
                  <OrientalFlex justify="between" className="mb-4 text-sm text-gray-600">
                    <span>{resource.size}</span>
                    <span>{resource.downloads} downloads</span>
                  </OrientalFlex>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleDownloadResource(resource)}
                    disabled={!instrumentData.enrolled}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </Card>
            ))}
          </OrientalGrid>
        </OrientalSection>

        {/* Features do Instrumento */}
        <OrientalSection spacing="normal" className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            ✨ O que você vai aprender
          </h2>
          
          <Card variant="glassmorphism">
            <div className="p-8">
              <OrientalGrid columns={2} gap="lg">
                {instrument.features.map((feature, index) => (
                  <OrientalFlex key={index} align="center" gap="sm">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </OrientalFlex>
                ))}
              </OrientalGrid>
            </div>
          </Card>
        </OrientalSection>

        {/* Call to Action */}
        {!instrumentData.enrolled && (
          <OrientalSection spacing="normal" className="mb-8">
            <Card variant="oriental" className="text-center">
              <div className="py-12 px-8">
                <div className="text-4xl mb-4">{instrument.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Pronto para começar sua jornada musical?
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Junte-se a {instrument.students} estudantes que já estão explorando a arte do {instrument.name.toLowerCase()}.
                </p>
                <Button variant="oriental" size="lg" onClick={handleEnroll}>
                  🎵 Começar Agora - {instrument.price}
                </Button>
              </div>
            </Card>
          </OrientalSection>
        )}

        {/* Footer */}
        <div className="text-center py-8 border-t border-blue-100">
          <p className="text-sm text-gray-500 mb-2">
            🎌 {instrument.name} • Nipo School Centro de Estudos
          </p>
          <p className="text-xs text-gray-400">
            Metodologia oriental com {instrument.masterTeacher} • {instrument.totalLessons} aulas • {instrument.students} estudantes
          </p>
        </div>
      </OrientalMainLayout>
    </OrientalContainer>
  );
};

export default InstrumentoOrientalDetalhes;