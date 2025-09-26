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
import { useCurriculumContent, parseMarkdownSections } from '../hooks/useCurriculumContent';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { 
  NipoBackground, 
  NipoContainer, 
  NipoSection,
  NipoLoading
} from '../../../shared/components/UI/NipoUI';

const CurriculumMethodologyPage = () => {
  const { methodId } = useParams();
  const navigate = useNavigate();
  const [methodology, setMethodology] = useState(null);
  const [currentSection, setCurrentSection] = useState(0);
  
  // Hook para carregar conteúdo do arquivo MD
  const { content, loading, error } = useCurriculumContent(methodId);

  // Mapeamento dos métodos com metadata
  const methodologies = {
    'orff-schulwerk': {
      id: 1,
      title: 'Orff Schulwerk',
      subtitle: 'Música Elementar e Experiência Corporal',
      country: 'Alemanha',
      author: 'Carl Orff & Gunild Keetman',
      year: '1920-1950',
      level: 'Todos os níveis',
      duration: '3-4 semanas de estudo',
      color: 'from-blue-500 to-blue-700',
      lightColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      icon: '🎵',
      description: 'Metodologia alemã baseada em movimento, ritmo e improvisação musical através da experimentação corporal.',
      keyFeatures: [
        'Música como experiência corporal',
        'Improvisação e criação coletiva',
        'Instrumentação elementar acessível',
        'Integração de música, dança e teatro'
      ],
      targetAudience: 'Crianças, jovens e adultos iniciantes',
      fileName: 'Capítulo1—Orff_Schulwerk.md'
    },
    'metodo-suzuki': {
      id: 2,
      title: 'Método Suzuki',
      subtitle: 'Aprendizagem Musical pela Língua Materna',
      country: 'Japão',
      author: 'Shinichi Suzuki',
      year: '1940-1960',
      level: 'Iniciante a Avançado',
      duration: '4-5 semanas de estudo',
      color: 'from-red-500 to-red-700',
      lightColor: 'bg-red-50',
      borderColor: 'border-red-200',
      icon: '🎻',
      description: 'Abordagem japonesa que ensina música como língua materna: escuta, imitação, repetição e ambiente familiar.',
      keyFeatures: [
        'Aprendizagem pelo ouvido primeiro',
        'Envolvimento ativo dos pais',
        'Repertório progressivo estruturado',
        'Início precoce (3-4 anos)'
      ],
      targetAudience: 'Crianças desde 3 anos, com apoio familiar',
      fileName: 'Capítulo2—Metodo_Suzuki.md'
    },
    'metodo-kodaly': {
      id: 3,
      title: 'Método Kodály',
      subtitle: 'Desenvolvimento Auditivo e Folclore Nacional',
      country: 'Hungria',
      author: 'Zoltán Kodály',
      year: '1920-1960',
      level: 'Fundamental a Intermediário',
      duration: '3-4 semanas de estudo',
      color: 'from-green-500 to-green-700',
      lightColor: 'bg-green-50',
      borderColor: 'border-green-200',
      icon: '🎼',
      description: 'Metodologia húngara focada no desenvolvimento auditivo através do folclore nacional e técnicas de solmização.',
      keyFeatures: [
        'Desenvolvimento da audição interior',
        'Uso de folclore nacional',
        'Sistema de solmização móvel',
        'Leitura musical avançada'
      ],
      targetAudience: 'Crianças e jovens em formação musical',
      fileName: 'Capítulo3—Metodo_Kodály.md'
    },
    'musical-futures': {
      id: 4,
      title: 'Musical Futures',
      subtitle: 'Aprendizagem Musical Informal e Contemporânea',
      country: 'Inglaterra',
      author: 'Paul Hallam & Lucy Green',
      year: '2000-presente',
      level: 'Jovens e Adultos',
      duration: '2-3 semanas de estudo',
      color: 'from-purple-500 to-purple-700',
      lightColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      icon: '🎸',
      description: 'Abordagem inglesa de aprendizado musical informal, baseada em práticas de músicos populares.',
      keyFeatures: [
        'Aprendizagem por imitação e prática',
        'Uso de tecnologia e gravações',
        'Escolha de repertório pelos alunos',
        'Desenvolvimento da criatividade'
      ],
      targetAudience: 'Adolescentes e jovens adultos',
      fileName: 'Capítulo4—Musical_Futures.md'
    },
    'dalcroze-euritmia': {
      id: 5,
      title: 'Dalcroze Euritmia',
      subtitle: 'Música, Movimento e Expressão Corporal',
      country: 'Suíça',
      author: 'Émile Jaques-Dalcroze',
      year: '1900-1920',
      level: 'Todos os níveis',
      duration: '3-4 semanas de estudo',
      color: 'from-pink-500 to-pink-700',
      lightColor: 'bg-pink-50',
      borderColor: 'border-pink-200',
      icon: '💃',
      description: 'Método suíço que integra música, movimento e expressão corporal para desenvolver musicalidade.',
      keyFeatures: [
        'Movimento corporal expressivo',
        'Desenvolvimento do ritmo interno',
        'Improvisação musical e corporal',
        'Conexão mente-corpo-música'
      ],
      targetAudience: 'Todas as idades, especialmente performers',
      fileName: 'Capítulo5—Dalcroze_Euritmia.md'
    },
    'gordon-music-learning-theory': {
      id: 6,
      title: 'Gordon Music Learning Theory',
      subtitle: 'Audiação e Aprendizagem Musical Sequencial',
      country: 'Estados Unidos',
      author: 'Edwin Gordon',
      year: '1970-2000',
      level: 'Fundamental a Avançado',
      duration: '4-5 semanas de estudo',
      color: 'from-indigo-500 to-indigo-700',
      lightColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      icon: '👂',
      description: 'Teoria americana focada no desenvolvimento da "audiação" - capacidade de pensar musicalmente.',
      keyFeatures: [
        'Desenvolvimento da audiação',
        'Sequência de aprendizagem estruturada',
        'Padrões tonais e rítmicos',
        'Avaliação do potencial musical'
      ],
      targetAudience: 'Crianças pequenas até adultos',
      fileName: 'Capítulo6—Gordon_Music_Learning_Theory.md'
    },
    'waldorf-steiner': {
      id: 7,
      title: 'Waldorf Steiner',
      subtitle: 'Pedagogia Antroposófica na Educação Musical',
      country: 'Alemanha',
      author: 'Rudolf Steiner',
      year: '1919-presente',
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
      targetAudience: 'Jovens e adultos',
      fileName: 'Capítulo8—Berklee_Abordagem_Contemporanea.md'
    },
    'lincoln-center': {
      id: 9,
      title: 'Lincoln Center Education',
      subtitle: 'Educação Artística Integrada',
      country: 'Estados Unidos',
      author: 'Lincoln Center Institute',
      year: '1975-presente',
      level: 'Todos os níveis',
      duration: '4-5 semanas de estudo',
      color: 'from-slate-500 to-slate-700',
      lightColor: 'bg-slate-50',
      borderColor: 'border-slate-200',
      icon: '🏛️',
      description: 'Metodologia americana que integra múltiplas artes na educação através da experiência estética.',
      keyFeatures: [
        'Integração interdisciplinar',
        'Experiência estética direta',
        'Pensamento criativo',
        'Conexão com comunidade'
      ],
      targetAudience: 'Estudantes de todas as idades',
      fileName: 'Capítulo9—LincolnCenterEducation.md'
    },
    'presto-project': {
      id: 10,
      title: 'PRESTO Project',
      subtitle: 'Ensino Digital e Inovação Musical',
      country: 'Europa (Projeto Internacional)',
      author: 'Consórcio Europeu PRESTO',
      year: '2018-presente',
      level: 'Intermediário',
      duration: '3-4 semanas de estudo',
      color: 'from-cyan-500 to-cyan-700',
      lightColor: 'bg-cyan-50',
      borderColor: 'border-cyan-200',
      icon: '💻',
      description: 'Projeto europeu focado na integração de tecnologia digital no ensino musical.',
      keyFeatures: [
        'Tecnologias digitais educativas',
        'Aprendizagem colaborativa online',
        'Recursos multimedia interativos',
        'Metodologias híbridas'
      ],
      targetAudience: 'Educadores e estudantes digitais',
      fileName: 'Capítulo10—PRESTO_Project_e_Ensino_Digital.md'
    },
    'experiencias-brasileiras': {
      id: 11,
      title: 'Experiências Brasileiras',
      subtitle: 'Inovações Educacionais Musicais do Brasil',
      country: 'Brasil',
      author: 'Diversos Educadores Brasileiros',
      year: '1930-presente',
      level: 'Todos os níveis',
      duration: '5-6 semanas de estudo',
      color: 'from-green-500 to-yellow-500',
      lightColor: 'bg-green-50',
      borderColor: 'border-green-200',
      icon: '🇧🇷',
      description: 'Conjunto de experiências e metodologias inovadoras desenvolvidas no contexto brasileiro.',
      keyFeatures: [
        'Diversidade cultural brasileira',
        'Adaptação ao contexto local',
        'Projetos sociais musicais',
        'Integração com educação formal'
      ],
      targetAudience: 'Toda a comunidade educacional',
      fileName: 'Capítulo11—Experiencias_Brasileiras_Inovadoras.md'
    }
  };

  const currentMethodology = methodologies[methodId];

  // Parsing das seções do conteúdo MD
  const sections = content ? parseMarkdownSections(content) : [];

  useEffect(() => {
    if (!currentMethodology) {
      navigate('/curriculum');
      return;
    }

    setMethodology(currentMethodology);
  }, [methodId, navigate, currentMethodology]);

  // Navegação entre métodos
  const methodIds = Object.keys(methodologies);
  const currentIndex = methodIds.indexOf(methodId);
  const previousMethod = currentIndex > 0 ? methodIds[currentIndex - 1] : null;
  const nextMethod = currentIndex < methodIds.length - 1 ? methodIds[currentIndex + 1] : null;

  // Ícones padrão para as seções se não houver conteúdo MD
  const defaultSections = [
    { title: 'Introdução', icon: BookOpen },
    { title: 'História & Fundamentos', icon: Globe },
    { title: 'Princípios Pedagógicos', icon: Award },
    { title: 'Aplicação Prática', icon: Play },
    { title: 'Críticas & Desafios', icon: Eye },
    { title: 'Contexto Brasileiro', icon: Heart },
    { title: 'Recursos & Bibliografia', icon: Download }
  ];

  // Usar seções do MD ou seções padrão
  const displaySections = sections.length > 0 ? sections.map((section, index) => ({
    ...section,
    icon: defaultSections[index]?.icon || BookOpen
  })) : defaultSections;

  if (loading) {
    return (
      <NipoBackground>
        <NipoLoading text="Carregando metodologia..." />
      </NipoBackground>
    );
  }

  if (!methodology) {
    return (
      <NipoBackground>
        <NipoContainer>
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Metodologia não encontrada
            </h1>
            <button
              onClick={() => navigate('/curriculum')}
              className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
            >
              Voltar ao Currículo
            </button>
          </div>
        </NipoContainer>
      </NipoBackground>
    );
  }

  return (
    <NipoBackground>
      <NipoHeader />
      
      <NipoContainer>
        {/* Breadcrumb */}
        <NipoSection>
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <button
              onClick={() => navigate('/curriculum')}
              className="hover:text-red-600 transition-colors"
            >
              Currículo
            </button>
            <ChevronRight className="w-4 h-4" />
            <button
              onClick={() => navigate('/curriculum#metodologias')}
              className="hover:text-red-600 transition-colors"
            >
              Metodologias Mundiais
            </button>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-800 font-medium">{methodology.title}</span>
          </div>
        </NipoSection>

        {/* Header da Metodologia */}
        <NipoSection>
          <div className={`bg-gradient-to-r ${methodology.color} rounded-2xl p-8 text-white relative overflow-hidden`}>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl">{methodology.icon}</span>
                <div>
                  <h1 className="text-4xl font-bold mb-2">{methodology.title}</h1>
                  <p className="text-xl opacity-90">{methodology.subtitle}</p>
                </div>
              </div>
              
              <p className="text-lg opacity-90 mb-6 max-w-3xl">
                {methodology.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white bg-opacity-20 rounded-lg p-3">
                  <Globe className="w-5 h-5 mb-2" />
                  <p className="text-sm opacity-80">País</p>
                  <p className="font-semibold">{methodology.country}</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-lg p-3">
                  <Users className="w-5 h-5 mb-2" />
                  <p className="text-sm opacity-80">Autor</p>
                  <p className="font-semibold">{methodology.author}</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-lg p-3">
                  <Clock className="w-5 h-5 mb-2" />
                  <p className="text-sm opacity-80">Período</p>
                  <p className="font-semibold">{methodology.year}</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-lg p-3">
                  <Award className="w-5 h-5 mb-2" />
                  <p className="text-sm opacity-80">Nível</p>
                  <p className="font-semibold">{methodology.level}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="bg-white text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Baixar PDF
                </button>
                <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-gray-800 transition-colors flex items-center gap-2">
                  <Share2 className="w-5 h-5" />
                  Compartilhar
                </button>
              </div>
            </div>

            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
              <div className="w-full h-full bg-white rounded-full transform translate-x-20 -translate-y-20"></div>
            </div>
          </div>
        </NipoSection>

        {/* Características Principais */}
        <NipoSection>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <Star className="w-6 h-6 text-yellow-500" />
              Características Principais
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {methodology.keyFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${methodology.color} mt-2`}></div>
                  <p className="text-gray-700">{feature}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Público-alvo:</strong> {methodology.targetAudience}
              </p>
              <p className="text-sm text-blue-800 mt-1">
                <strong>Tempo de estudo recomendado:</strong> {methodology.duration}
              </p>
            </div>
          </div>
        </NipoSection>

        {/* Índice de Conteúdo */}
        <NipoSection>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-blue-500" />
              Conteúdo do Capítulo
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {displaySections.map((section, index) => {
                const IconComponent = section.icon;
                return (
                  <button
                    key={index}
                    onClick={() => setCurrentSection(index)}
                    className={`flex items-center gap-3 p-4 rounded-lg text-left transition-all ${
                      currentSection === index
                        ? `${methodology.lightColor} ${methodology.borderColor} border-2`
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <IconComponent className={`w-5 h-5 ${
                      currentSection === index ? 'text-blue-600' : 'text-gray-500'
                    }`} />
                    <div>
                      <p className={`font-medium ${
                        currentSection === index ? 'text-blue-800' : 'text-gray-800'
                      }`}>
                        {index + 1}. {section.title}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </NipoSection>

        {/* Conteúdo Principal */}
        <NipoSection>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="prose prose-gray max-w-none">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {displaySections[currentSection]?.title || 'Carregando...'}
              </h2>
              
              {/* Conteúdo do MD ou simulado */}
              <div className="space-y-4 text-gray-700 leading-relaxed">
                {sections.length > 0 && sections[currentSection] ? (
                  <MarkdownRenderer content={sections[currentSection].content} />
                ) : error ? (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-700">Erro ao carregar o conteúdo: {error}</p>
                  </div>
                ) : (
                  <p>
                    Este é o conteúdo da seção "{displaySections[currentSection]?.title}" da metodologia {methodology.title}. 
                    O conteúdo real seria carregado do arquivo {methodology.fileName} localizado em docs/curriculum/.
                  </p>
                )}
                <p>
                  Cada seção contém análise aprofundada, exemplos práticos, referências acadêmicas e 
                  adaptações para o contexto brasileiro. O material foi desenvolvido com base em 
                  pesquisa acadêmica rigorosa e experiência prática em sala de aula.
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
                  {currentSection + 1} de {displaySections.length}
                </span>

                <button
                  onClick={() => setCurrentSection(Math.min(displaySections.length - 1, currentSection + 1))}
                  disabled={currentSection === displaySections.length - 1}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    currentSection === displaySections.length - 1
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
        </NipoSection>

        {/* Navegação entre métodos */}
        <NipoSection>
          <div className="flex justify-between items-center">
            {previousMethod ? (
              <button
                onClick={() => navigate(`/curriculum/metodologia/${previousMethod}`)}
                className="flex items-center gap-3 bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
                <div className="text-left">
                  <p className="text-sm text-gray-600">Anterior</p>
                  <p className="font-semibold text-gray-800">
                    {methodologies[previousMethod].title}
                  </p>
                </div>
              </button>
            ) : <div></div>}

            {nextMethod ? (
              <button
                onClick={() => navigate(`/curriculum/metodologia/${nextMethod}`)}
                className="flex items-center gap-3 bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all"
              >
                <div className="text-right">
                  <p className="text-sm text-gray-600">Próximo</p>
                  <p className="font-semibold text-gray-800">
                    {methodologies[nextMethod].title}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            ) : <div></div>}
          </div>
        </NipoSection>
      </NipoContainer>
    </NipoBackground>
  );
};

export default CurriculumMethodologyPage;