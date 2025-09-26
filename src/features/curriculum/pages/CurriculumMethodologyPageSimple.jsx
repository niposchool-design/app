import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  BookOpen, 
  Clock, 
  Users, 
  Award,
  Download,
  Share2,
  Loader,
  Eye,
  Globe,
  Heart,
  Star,
  Play,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import NipoHeader from '../../../shared/components/UI/NipoHeader';
import MarkdownRenderer from '../components/MarkdownRenderer';

const CurriculumMethodologyPage = () => {
  const { methodId } = useParams();
  const navigate = useNavigate();
  const [methodology, setMethodology] = useState(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [loading, setLoading] = useState(true);

  // Mapeamento dos métodos com metadata
  const methodologies = {
    'orff-schulwerk': {
      id: 1,
      title: 'Orff Schulwerk',
      subtitle: 'Música Elementar através do Movimento',
      country: 'Alemanha',
      author: 'Carl Orff',
      year: '1924-1980',
      level: 'Fundamental',
      duration: '4-6 semanas de estudo',
      color: 'from-blue-500 to-blue-700',
      lightColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      icon: '🎵',
      description: 'Metodologia alemã baseada em movimento, ritmo e improvisação usando instrumentos de percussão.',
      keyFeatures: [
        'Educação musical elementar',
        'Integração música-movimento-linguagem',
        'Instrumentarium Orff',
        'Improvisação e criatividade'
      ],
      targetAudience: 'Crianças pequenas até adultos',
      fileName: 'Capítulo1—Orff_Schulwerk.md'
    },
    'metodo-suzuki': {
      id: 2,
      title: 'Método Suzuki',
      subtitle: 'Educação do Talento pela Língua Materna',
      country: 'Japão',
      author: 'Shinichi Suzuki',
      year: '1898-1998',
      level: 'Fundamental a Avançado',
      duration: '6-8 semanas de estudo',
      color: 'from-purple-500 to-purple-700',
      lightColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      icon: '🎻',
      description: 'Abordagem japonesa que ensina música da mesma forma que as crianças aprendem sua língua materna.',
      keyFeatures: [
        'Aprendizagem pela escuta',
        'Envolvimento dos pais',
        'Início precoce',
        'Repertório padronizado'
      ],
      targetAudience: 'Crianças pequenas até adultos',
      fileName: 'Capítulo2—Metodo_Suzuki.md'
    },
    'metodo-kodaly': {
      id: 3,
      title: 'Método Kodály',
      subtitle: 'Desenvolvimento Auditivo através do Canto',
      country: 'Hungria',
      author: 'Zoltán Kodály',
      year: '1882-1967',
      level: 'Fundamental',
      duration: '4-5 semanas de estudo',
      color: 'from-green-500 to-green-700',
      lightColor: 'bg-green-50',
      borderColor: 'border-green-200',
      icon: '🎼',
      description: 'Metodologia húngara focada no desenvolvimento auditivo através do canto e solfejo.',
      keyFeatures: [
        'Educação vocal como base',
        'Sistema de solfejo relativo',
        'Música folclórica nacional',
        'Leitura musical progressiva'
      ],
      targetAudience: 'Crianças e jovens',
      fileName: 'Capítulo3—Metodo_Kodály.md'
    },
    'musical-futures': {
      id: 4,
      title: 'Musical Futures',
      subtitle: 'Aprendizagem Musical Informal',
      country: 'Inglaterra',
      author: 'Paul Hamlyn Foundation',
      year: '2003-presente',
      level: 'Intermediário',
      duration: '3-4 semanas de estudo',
      color: 'from-orange-500 to-orange-700',
      lightColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      icon: '🎸',
      description: 'Abordagem inglesa de aprendizado musical informal, baseada em práticas de músicos populares.',
      keyFeatures: [
        'Aprendizagem por imitação',
        'Uso de tecnologia',
        'Escolha de repertório pelos alunos',
        'Desenvolvimento da criatividade'
      ],
      targetAudience: 'Adolescentes e jovens adultos',
      fileName: 'Capítulo4—Musical_Futures.md'
    },
    'dalcroze-euritmia': {
      id: 5,
      title: 'Dalcroze Euritmia',
      subtitle: 'Música através do Movimento Corporal',
      country: 'Suíça',
      author: 'Émile Jaques-Dalcroze',
      year: '1865-1950',
      level: 'Fundamental a Avançado',
      duration: '5-6 semanas de estudo',
      color: 'from-pink-500 to-pink-700',
      lightColor: 'bg-pink-50',
      borderColor: 'border-pink-200',
      icon: '💃',
      description: 'Método suíço que integra música, movimento e expressão corporal para o aprendizado musical.',
      keyFeatures: [
        'Euritimia (movimento expressivo)',
        'Solfejo',
        'Improvisação',
        'Expressão corporal'
      ],
      targetAudience: 'Todas as idades',
      fileName: 'Capítulo5—Dalcroze_Euritmia.md'
    },
    'gordon-music-learning-theory': {
      id: 6,
      title: 'Gordon Music Learning Theory',
      subtitle: 'Teoria da Aprendizagem Musical Auditiva',
      country: 'Estados Unidos',
      author: 'Edwin Gordon',
      year: '1927-2015',
      level: 'Fundamental a Avançado',
      duration: '6-7 semanas de estudo',
      color: 'from-indigo-500 to-indigo-700',
      lightColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      icon: '👂',
      description: 'Teoria americana de aprendizagem musical baseada na audiação - pensar musicalmente.',
      keyFeatures: [
        'Conceito de audiação',
        'Padrões tonais e rítmicos',
        'Desenvolvimento sequencial',
        'Improvisação musical'
      ],
      targetAudience: 'Bebês até adultos',
      fileName: 'Capítulo6—Gordon_Music_Learning_Theory.md'
    },
    'waldorf-steiner': {
      id: 7,
      title: 'Waldorf Steiner',
      subtitle: 'Pedagogia Antroposófica Musical',
      country: 'Alemanha',
      author: 'Rudolf Steiner',
      year: '1861-1925',
      level: 'Fundamental',
      duration: '5-6 semanas de estudo',
      color: 'from-emerald-500 to-emerald-700',
      lightColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      icon: '🌱',
      description: 'Pedagogia alemã que integra música com desenvolvimento integral da criança baseado na antroposofia.',
      keyFeatures: [
        'Desenvolvimento por etapas evolutivas',
        'Integração com outras artes',
        'Instrumentos adequados à idade',
        'Educação holística'
      ],
      targetAudience: 'Crianças e adolescentes',
      fileName: 'Capítulo7—Waldorf_Steiner.md'
    },
    'berklee-contemporanea': {
      id: 8,
      title: 'Berklee Contemporânea',
      subtitle: 'Metodologia de Música Popular e Jazz',
      country: 'Estados Unidos',
      author: 'Berklee College of Music',
      year: '1945-presente',
      level: 'Intermediário a Avançado',
      duration: '6-8 semanas de estudo',
      color: 'from-amber-500 to-amber-700',
      lightColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      icon: '🎷',
      description: 'Abordagem americana contemporânea focada em música popular, jazz e tecnologia musical.',
      keyFeatures: [
        'Harmonia funcional moderna',
        'Improvisação e composição',
        'Tecnologia musical',
        'Performance em conjunto'
      ],
      targetAudience: 'Adolescentes e adultos',
      fileName: 'Capítulo8—Berklee_Abordagem_Contemporanea.md'
    },
    'lincoln-center': {
      id: 9,
      title: 'Lincoln Center Education',
      subtitle: 'Educação Artística Integrada',
      country: 'Estados Unidos',
      author: 'Lincoln Center',
      year: '1969-presente',
      level: 'Fundamental a Avançado',
      duration: '4-6 semanas de estudo',
      color: 'from-slate-500 to-slate-700',
      lightColor: 'bg-slate-50',
      borderColor: 'border-slate-200',
      icon: '🏛️',
      description: 'Metodologia americana de educação artística integrada desenvolvida pelo Lincoln Center.',
      keyFeatures: [
        'Integração artística',
        'Aprendizagem baseada em obras',
        'Conexões interdisciplinares',
        'Experiências estéticas'
      ],
      targetAudience: 'Estudantes de todas as idades',
      fileName: 'Capítulo9—LincolnCenterEducation.md'
    },
    'presto-project': {
      id: 10,
      title: 'PRESTO Project',
      subtitle: 'Ensino Digital e Inovação Musical',
      country: 'Europa',
      author: 'União Europeia',
      year: '2010-presente',
      level: 'Intermediário',
      duration: '3-5 semanas de estudo',
      color: 'from-cyan-500 to-cyan-700',
      lightColor: 'bg-cyan-50',
      borderColor: 'border-cyan-200',
      icon: '💻',
      description: 'Projeto europeu de ensino digital e inovação musical para o século XXI.',
      keyFeatures: [
        'Tecnologias digitais',
        'Metodologias inovadoras',
        'Colaboração internacional',
        'Aprendizagem online'
      ],
      targetAudience: 'Professores e estudantes',
      fileName: 'Capítulo10—PRESTO_Project_e_Ensino_Digital.md'
    },
    'experiencias-brasileiras': {
      id: 11,
      title: 'Experiências Brasileiras',
      subtitle: 'Metodologias Inovadoras do Brasil',
      country: 'Brasil',
      author: 'Diversos educadores brasileiros',
      year: '1970-presente',
      level: 'Todos os níveis',
      duration: '6-8 semanas de estudo',
      color: 'from-green-500 to-yellow-500',
      lightColor: 'bg-green-50',
      borderColor: 'border-green-200',
      icon: '🇧🇷',
      description: 'Compilação de experiências e metodologias inovadoras desenvolvidas no Brasil.',
      keyFeatures: [
        'Cultura musical brasileira',
        'Metodologias adaptadas',
        'Experiências regionais',
        'Inovação pedagógica'
      ],
      targetAudience: 'Educadores e estudantes brasileiros',
      fileName: 'Capítulo11—Experiencias_Brasileiras_Inovadoras.md'
    }
    // Todas as metodologias agora estão incluídas
  };

  const currentMethodology = methodologies[methodId];

  useEffect(() => {
    if (!currentMethodology) {
      navigate('/modulos');
      return;
    }

    setMethodology(currentMethodology);
    setLoading(false);
  }, [methodId, navigate, currentMethodology]);

  // Seções padrão
  const sections = [
    { title: 'Introdução', icon: BookOpen },
    { title: 'História & Fundamentos', icon: Globe },
    { title: 'Princípios Pedagógicos', icon: Award },
    { title: 'Aplicação Prática', icon: Play },
    { title: 'Contexto Brasileiro', icon: Heart },
    { title: 'Recursos & Bibliografia', icon: Download }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Carregando metodologia...</p>
        </div>
      </div>
    );
  }

  if (!methodology) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Metodologia não encontrada</p>
          <button 
            onClick={() => navigate('/modulos')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Voltar aos Módulos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <NipoHeader />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Cabeçalho */}
        <div className="mb-8">
          <button 
            onClick={() => navigate('/modulos')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar aos Módulos
          </button>
          
          <div className={`bg-gradient-to-r ${methodology.color} rounded-2xl p-8 text-white mb-8`}>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl">{methodology.icon}</span>
              <div>
                <h1 className="text-4xl font-bold">{methodology.title}</h1>
                <p className="text-xl opacity-90">{methodology.subtitle}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="opacity-80">País</p>
                <p className="font-semibold">{methodology.country}</p>
              </div>
              <div>
                <p className="opacity-80">Criador</p>
                <p className="font-semibold">{methodology.author}</p>
              </div>
              <div>
                <p className="opacity-80">Período</p>
                <p className="font-semibold">{methodology.year}</p>
              </div>
              <div>
                <p className="opacity-80">Nível</p>
                <p className="font-semibold">{methodology.level}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Grade Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Navegação das Seções */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h2 className="flex items-center gap-2 text-lg font-bold text-gray-800 mb-4">
                <BookOpen className="w-5 h-5 text-blue-500" />
                Conteúdo
              </h2>
              <div className="space-y-2">
                {sections.map((section, index) => {
                  const IconComponent = section.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => setCurrentSection(index)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all ${
                        currentSection === index
                          ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span className="text-sm font-medium">{section.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Conteúdo Principal */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="prose prose-gray max-w-none">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  {sections[currentSection]?.title || 'Carregando...'}
                </h2>
                
                {/* Conteúdo da seção */}
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Este é o conteúdo da seção "{sections[currentSection]?.title}" da metodologia {methodology.title}.
                  </p>
                  
                  <p>
                    <strong>Descrição:</strong> {methodology.description}
                  </p>

                  <div>
                    <strong>Características principais:</strong>
                    <ul className="mt-2 ml-4">
                      {methodology.keyFeatures.map((feature, index) => (
                        <li key={index} className="mb-1">• {feature}</li>
                      ))}
                    </ul>
                  </div>

                  <p>
                    <strong>Público-alvo:</strong> {methodology.targetAudience}
                  </p>

                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
                    <p className="text-sm text-yellow-800">
                      <strong>💡 Em desenvolvimento:</strong> O conteúdo completo dos arquivos MD será 
                      integrado dinamicamente nesta página, proporcionando uma experiência rica e 
                      interativa para o estudo das metodologias.
                    </p>
                  </div>
                </div>

                {/* Navegação entre seções */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                    disabled={currentSection === 0}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      currentSection === 0
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Seção Anterior
                  </button>

                  <span className="text-sm text-gray-500">
                    {currentSection + 1} de {sections.length}
                  </span>

                  <button
                    onClick={() => setCurrentSection(Math.min(sections.length - 1, currentSection + 1))}
                    disabled={currentSection === sections.length - 1}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      currentSection === sections.length - 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                    }`}
                  >
                    Próxima Seção
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navegação entre metodologias */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => navigate('/modulos')}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar aos Módulos
          </button>
        </div>
      </div>
    </div>
  );
};

export default CurriculumMethodologyPage;