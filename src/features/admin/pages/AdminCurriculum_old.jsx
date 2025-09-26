import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen, Users, Compass, Target, Clock, CheckCircle, 
  Edit, Eye, Share2, Search, Star, Award, 
  Lightbulb, Heart, Briefcase, Settings, TrendingUp, 
  Crown, Lock, ChevronRight, Zap, Globe, GraduationCap,
  BarChart3, FileText, Code, Wrench, Network, Filter
} from 'lucide-react';
import NipoHeader from '../../../shared/components/Header/NipoHeader';

const AdminCurriculum = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [selectedStatus, setSelectedStatus] = useState('todos');

  // Categorias organizadas para cards informativos
  const categories = [
    {
      id: 'fundamentos',
      title: 'Fundamentos & Princípios',
      icon: Crown,
      color: 'bg-gradient-to-br from-purple-500 to-indigo-600',
      description: 'Base filosófica e metodológica que orienta todo o currículo',
      chaptersCount: 1,
      chapters: [0]
    },
    {
      id: 'metodologias',
      title: 'Metodologias Mundiais',
      icon: Globe,
      color: 'bg-gradient-to-br from-blue-500 to-cyan-600',
      description: 'Principais abordagens pedagógicas musicais internacionais',
      chaptersCount: 9,
      chapters: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    },
    {
      id: 'tecnologia',
      title: 'Inovação & Tecnologia',
      icon: Zap,
      color: 'bg-gradient-to-br from-orange-500 to-red-600',
      description: 'Integração de tecnologias digitais no ensino musical',
      chaptersCount: 2,
      chapters: [10, 11]
    },
    {
      id: 'implementacao',
      title: 'Implementação & Prática',
      icon: Settings,
      color: 'bg-gradient-to-br from-green-500 to-emerald-600',
      description: 'Ferramentas práticas para aplicação curricular',
      chaptersCount: 6,
      chapters: [12, 13, 14, 15, 16, 17]
    },
    {
      id: 'expansao',
      title: 'Expansão & Comunidade',
      icon: Network,
      color: 'bg-gradient-to-br from-pink-500 to-rose-600',
      description: 'Estratégias de expansão e engajamento comunitário',
      chaptersCount: 2,
      chapters: [18, 19]
    }
  ];

  // Mapear capítulos que possuem conteúdo completo documentado
  const methodologyMapping = {
    0: 'principios-alpha',
    1: 'orff-schulwerk',
    2: 'metodo-suzuki', 
    3: 'metodo-kodaly',
    4: 'musical-futures',
    5: 'dalcroze-euritmia',
    6: 'gordon-music-learning-theory',
    7: 'waldorf-steiner',
    8: 'berklee-contemporanea',
    9: 'lincoln-center',
    10: 'presto-project',
    11: 'experiencias-brasileiras',
    12: 'referenciais-internacionais',
    13: 'proposta-curricular',
    14: 'modelos-sequencia-didatica',
    15: 'avaliacao-portfolio',
    16: 'documentos-institucionais',
    17: 'capacitacao-docente',
    18: 'adaptacao-ongs-igrejas',
    19: 'comunicacao-engajamento'
  };

  // Navegar para visualização específica do capítulo
  const viewMethodology = (chapterId) => {
    const slug = methodologyMapping[chapterId];
    if (slug) {
      navigate(`/admin/curriculum/view/${chapterId}`);
    } else {
      alert(`Capítulo ${chapterId} não possui sistema de visualização ainda.`);
    }
  };

  // Dados completos dos capítulos
  const chapters = [
    {
      id: 0,
      title: 'Princípios Alpha',
      subtitle: 'Base Filosófica e Pedagógica',
      description: 'Fundamentos da Alpha School adaptados para o contexto brasileiro',
      status: 'Fundacional',
      category: 'fundamentos',
      icon: Crown,
      lessons: 8,
      duration: '2-3 semanas',
      difficulty: 'Fundamental'
    },
    {
      id: 1,
      title: 'Orff Schulwerk',
      subtitle: 'Pedagogia Musical Ativa',
      description: 'Método baseado em ritmo, movimento e improvisação',
      status: 'Documentado',
      category: 'metodologias',
      icon: BookOpen,
      lessons: 12,
      duration: '4-6 semanas',
      difficulty: 'Fundamental'
    },
    {
      id: 2,
      title: 'Método Suzuki',
      subtitle: 'Educação do Talento',
      description: 'Aprendizagem musical através da imitação e repetição',
      status: 'Documentado',
      category: 'metodologias',
      icon: Heart,
      lessons: 15,
      duration: '6-8 semanas',
      difficulty: 'Fundamental a Avançado'
    },
    {
      id: 3,
      title: 'Método Kodály',
      subtitle: 'Educação Musical Húngara',
      description: 'Desenvolvimento da literacia musical através do canto',
      status: 'Documentado',
      category: 'metodologias',
      icon: Star,
      lessons: 14,
      duration: '5-7 semanas',
      difficulty: 'Fundamental a Avançado'
    },
    {
      id: 4,
      title: 'Musical Futures',
      subtitle: 'Aprendizagem Informal',
      description: 'Pedagogia baseada em práticas musicais informais',
      status: 'Documentado',
      category: 'metodologias',
      icon: Users,
      lessons: 10,
      duration: '4-6 semanas',
      difficulty: 'Intermediário'
    },
    {
      id: 5,
      title: 'Dalcroze Euritmia',
      subtitle: 'Movimento e Música',
      description: 'Educação musical através do movimento corporal',
      status: 'Documentado',
      category: 'metodologias',
      icon: Target,
      lessons: 11,
      duration: '5-6 semanas',
      difficulty: 'Fundamental a Intermediário'
    },
    {
      id: 6,
      title: 'Gordon Music Learning Theory',
      subtitle: 'Teoria da Aprendizagem Musical',
      description: 'Desenvolvimento da audiação e compreensão musical',
      status: 'Documentado',
      category: 'metodologias',
      icon: Lightbulb,
      lessons: 13,
      duration: '6-7 semanas',
      difficulty: 'Intermediário a Avançado'
    },
    {
      id: 7,
      title: 'Waldorf/Steiner',
      subtitle: 'Pedagogia Antroposófica',
      description: 'Educação musical integrada ao desenvolvimento humano',
      status: 'Documentado',
      category: 'metodologias',
      icon: GraduationCap,
      lessons: 12,
      duration: '5-7 semanas',
      difficulty: 'Fundamental a Intermediário'
    },
    {
      id: 8,
      title: 'Berklee Abordagem Contemporânea',
      subtitle: 'Música Popular e Jazz',
      description: 'Metodologia contemporânea focada em música popular',
      status: 'Documentado',
      category: 'metodologias',
      icon: Award,
      lessons: 14,
      duration: '6-8 semanas',
      difficulty: 'Intermediário a Avançado'
    },
    {
      id: 9,
      title: 'Lincoln Center Education',
      subtitle: 'Educação Artística Integrada',
      description: 'Abordagem integrada das artes na educação',
      status: 'Documentado',
      category: 'metodologias',
      icon: Compass,
      lessons: 10,
      duration: '4-6 semanas',
      difficulty: 'Intermediário'
    },
    {
      id: 10,
      title: 'PRESTO Project e Ensino Digital',
      subtitle: 'Tecnologia Educacional',
      description: 'Integração de tecnologias digitais no ensino musical',
      status: 'Documentado',
      category: 'tecnologia',
      icon: Zap,
      lessons: 16,
      duration: '7-9 semanas',
      difficulty: 'Intermediário a Avançado'
    },
    {
      id: 11,
      title: 'Experiências Brasileiras Inovadoras',
      subtitle: 'Pedagogias Nacionais',
      description: 'Métodos e experiências desenvolvidas no Brasil',
      status: 'Documentado',
      category: 'tecnologia',
      icon: Globe,
      lessons: 14,
      duration: '6-7 semanas',
      difficulty: 'Intermediário'
    },
    {
      id: 12,
      title: 'Referenciais Internacionais e Propostas de Futuro',
      subtitle: 'Tendências Globais',
      description: 'Análise de tendências e propostas futuras em educação musical',
      status: 'Documentado',
      category: 'implementacao',
      icon: TrendingUp,
      lessons: 13,
      duration: '5-7 semanas',
      difficulty: 'Avançado'
    },
    {
      id: 13,
      title: 'Proposta Curricular Recomendada e Roadmap',
      subtitle: 'Implementação Curricular',
      description: 'Diretrizes curriculares e plano de implementação',
      status: 'Documentado',
      category: 'implementacao',
      icon: BarChart3,
      lessons: 18,
      duration: '8-10 semanas',
      difficulty: 'Avançado'
    },
    {
      id: 14,
      title: 'Modelos de Sequência Didática',
      subtitle: 'Exemplos Práticos e Materiais Prontos',
      description: 'Templates estruturados para implementação imediata',
      status: 'Documentado',
      category: 'implementacao',
      icon: FileText,
      lessons: 16,
      duration: '6-8 semanas',
      difficulty: 'Intermediário'
    },
    {
      id: 15,
      title: 'Avaliação, Portfolio e Impacto',
      subtitle: 'Sistemas de Mensuração',
      description: 'Metodologias para avaliação e mensuração de impacto',
      status: 'Documentado',
      category: 'implementacao',
      icon: CheckCircle,
      lessons: 14,
      duration: '5-7 semanas',
      difficulty: 'Intermediário a Avançado'
    },
    {
      id: 16,
      title: 'Documentos Institucionais',
      subtitle: 'Fichas e Modelos para Editais',
      description: 'Documentos técnicos e modelos para projetos institucionais',
      status: 'Documentado',
      category: 'implementacao',
      icon: Briefcase,
      lessons: 16,
      duration: '6-7 semanas',
      difficulty: 'Intermediário a Avançado'
    },
    {
      id: 17,
      title: 'Capacitação Docente',
      subtitle: 'Formação e Formação Continuada',
      description: 'Programa de capacitação para professores de música',
      status: 'Documentado',
      category: 'implementacao',
      icon: GraduationCap,
      lessons: 24,
      duration: '10-12 semanas',
      difficulty: 'Intermediário a Avançado'
    },
    {
      id: 18,
      title: 'Adaptação para ONGs, Igrejas e Espaços Alternativos',
      subtitle: 'Contextos Diversos',
      description: 'Manual de adaptação para espaços alternativos',
      status: 'Documentado',
      category: 'expansao',
      icon: Network,
      lessons: 14,
      duration: '6-7 semanas',
      difficulty: 'Intermediário'
    },
    {
      id: 19,
      title: 'Plano de Comunicação e Engajamento da Comunidade',
      subtitle: 'Estratégias de Comunicação',
      description: 'Estratégias de comunicação e engajamento comunitário',
      status: 'Documentado',
      category: 'expansao',
      icon: Users,
      lessons: 12,
      duration: '5-6 semanas',
      difficulty: 'Intermediário'
    }
  ];

  // Função para editar metodologia
  const editMethodology = (chapterId) => {
    if (methodologyMapping[chapterId]) {
      navigate(`/admin/curriculum/edit/${chapterId}`);
    } else {
      alert(`Edição não disponível para o Capítulo ${chapterId} ainda.`);
    }
  };

  // Função para compartilhar metodologia
  const shareMethodology = (chapterId) => {
    const adminUrl = `${window.location.origin}/admin/curriculum/view/${chapterId}`;
    navigator.clipboard.writeText(adminUrl);
    alert('Link administrativo copiado para a área de transferência!');
  };

  // Filtros
  const filteredChapters = chapters.filter(chapter => {
    const matchesSearch = chapter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         chapter.subtitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'todos' || chapter.category === selectedCategory;
    const matchesStatus = selectedStatus === 'todos' || chapter.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Funções auxiliares
  const getStatusColor = (status) => {
    switch(status) {
      case 'Fundacional': return 'bg-purple-100 text-purple-800 border border-purple-200';
      case 'Documentado': return 'bg-green-100 text-green-800 border border-green-200';
      case 'Em Desenvolvimento': return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Fundamental': return 'bg-blue-100 text-blue-800';
      case 'Fundamental a Avançado': return 'bg-indigo-100 text-indigo-800';
      case 'Fundamental a Intermediário': return 'bg-cyan-100 text-cyan-800';
      case 'Intermediário': return 'bg-orange-100 text-orange-800';
      case 'Intermediário a Avançado': return 'bg-red-100 text-red-800';
      case 'Avançado': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Fundacional': return <Crown className="w-3 h-3 text-purple-500" />;
      case 'Documentado': return <CheckCircle className="w-3 h-3 text-green-500" />;
      case 'Em Desenvolvimento': return <Clock className="w-3 h-3 text-yellow-500" />;
      default: return <Clock className="w-3 h-3 text-gray-400" />;
    }
  };

  // Cards informativos das categorias
  const categoryCards = [
    {
      id: 'fundamentos',
      title: 'Fundamentos & Princípios',
      description: 'Base teórica e metodológica da educação musical',
      icon: BookOpen,
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      chapters: 1,
      keyFeatures: ['Alpha School Base', 'Princípios Fundamentais']
    },
    {
      id: 'metodologias',
      title: 'Metodologias Mundiais',
      description: 'Abordagens consagradas internacionalmente',
      icon: Globe,
      color: 'bg-green-500',
      lightColor: 'bg-green-50',
      borderColor: 'border-green-200',
      chapters: 9,
      keyFeatures: ['Orff-Schulwerk', 'Suzuki', 'Kodály', 'Musical Futures']
    },
    {
      id: 'inovacao',
      title: 'Inovação & Tecnologia',
      description: 'Tecnologias digitais e experiências brasileiras',
      icon: Zap,
      color: 'bg-purple-500',
      lightColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      chapters: 2,
      keyFeatures: ['PRESTO Project', 'Inovações BR']
    },
    {
      id: 'implementacao',
      title: 'Implementação & Prática',
      description: 'Aplicação prática e modelos didáticos',
      icon: Settings,
      color: 'bg-orange-500',
      lightColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      chapters: 6,
      keyFeatures: ['Currículo Recomendado', 'Sequências Didáticas']
    },
    {
      id: 'expansao',
      title: 'Expansão & Comunidade',
      description: 'Adaptação para contextos diversos',
      icon: Network,
      color: 'bg-pink-500',
      lightColor: 'bg-pink-50',
      borderColor: 'border-pink-200',
      chapters: 2,
      keyFeatures: ['ONGs & Igrejas', 'Engajamento']
    }
  ];

  // Dados do currículo
  const curriculumData = {
    chapters: [
      // FUNDAMENTOS & PRINCÍPIOS
      {
        id: 0,
        title: 'Princípio Alpha',
        subtitle: 'Base Conceitual da Nipo School',
        category: 'fundamentos',
        status: 'published',
        difficulty: 'fundamental',
        duration: '2 semanas',
        icon: Crown,
        description: 'Fundamentos teóricos e metodológicos da Alpha School adaptados',
        tags: ['Base', 'Conceitual', 'Fundamentos'],
        keyPoints: ['Conceitos Base', 'Metodologia', 'Adaptação', 'Princípios']
      },
      
      // METODOLOGIAS MUNDIAIS
      {
        id: 1,
        title: 'Orff Schulwerk',
        subtitle: 'Música, Movimento e Fala Integrados',
        category: 'metodologias',
        status: 'published',
        difficulty: 'fundamental',
        duration: '4 semanas',
        icon: Users,
        description: 'Abordagem alemã integrando música, movimento e linguagem através de instrumentos Orff',
        tags: ['Alemanha', 'Instrumental', 'Integrado'],
        keyPoints: ['Instrumentos Orff', 'Movimento', 'Improvisação', 'Ensemble']
      },
      {
        id: 2,
        title: 'Método Suzuki',
        subtitle: 'Talento e Língua Materna Musical',
        category: 'metodologias',
        status: 'published',
        difficulty: 'fundamental',
        duration: '4 semanas',
        icon: Heart,
        description: 'Método japonês baseado na filosofia da língua materna e desenvolvimento do potencial',
        tags: ['Japão', 'Língua Materna', 'Potencial'],
        keyPoints: ['Talent Education', 'Imitação', 'Repetição', 'Ambiente']
      },
      {
        id: 3,
        title: 'Método Kodály',
        subtitle: 'Folclore Nacional e Leitura Musical',
        category: 'metodologias',
        status: 'published',
        difficulty: 'intermediario',
        duration: '4 semanas',
        icon: BookOpen,
        description: 'Abordagem húngara enfatizando o canto, folclore nacional e leitura musical',
        tags: ['Hungria', 'Folclore', 'Leitura'],
        keyPoints: ['Folclore', 'Solfejo', 'Manossolfa', 'Nacionalismo']
      },
      {
        id: 4,
        title: 'Musical Futures',
        subtitle: 'Aprendizado Informal e Autonomia',
        category: 'metodologias',
        status: 'published',
        difficulty: 'intermediario',
        duration: '3 semanas',
        icon: Star,
        description: 'Abordagem britânica promovendo aprendizado informal e protagonismo estudantil',
        tags: ['Reino Unido', 'Informal', 'Autonomia'],
        keyPoints: ['Informal', 'Autonomia', 'Colaboração', 'Tecnologia']
      },
      {
        id: 5,
        title: 'Dalcroze Euritmia',
        subtitle: 'Movimento e Expressão Corporal',
        category: 'metodologias',
        status: 'published',
        difficulty: 'intermediario',
        duration: '3 semanas',
        icon: Compass,
        description: 'Educação musical através do movimento consciente e expressão corporal',
        tags: ['Suíça', 'Movimento', 'Expressão'],
        keyPoints: ['Euritmia', 'Solfejo', 'Improvisação', 'Movimento']
      },
      {
        id: 6,
        title: 'Gordon Music Learning Theory',
        subtitle: 'Audiação e Desenvolvimento Musical',
        category: 'metodologias',
        status: 'published',
        difficulty: 'avancado',
        duration: '4 semanas',
        icon: Target,
        description: 'Desenvolvimento da audiação como base para compreensão musical',
        tags: ['EUA', 'Cognição', 'Audiação'],
        keyPoints: ['Audiação', 'Sequenciamento', 'Padrões', 'Sintaxe Musical']
      },
      {
        id: 7,
        title: 'Waldorf Steiner',
        subtitle: 'Desenvolvimento Integral e Pentatônico',
        category: 'metodologias',
        status: 'published',
        difficulty: 'intermediario',
        duration: '3 semanas',
        icon: Lightbulb,
        description: 'Música integrada ao desenvolvimento humano e escalas pentatônicas',
        tags: ['Alemanha', 'Integral', 'Pentatônico'],
        keyPoints: ['Pentatônico', 'Desenvolvimento', 'Flauta', 'Seasonal']
      },
      {
        id: 8,
        title: 'Berklee Contemporânea',
        subtitle: 'Abordagem Profissional Moderna',
        category: 'metodologias',
        status: 'published',
        difficulty: 'avancado',
        duration: '4 semanas',
        icon: Star,
        description: 'Ensino contemporâneo focado na indústria musical e performance',
        tags: ['EUA', 'Profissional', 'Contemporâneo'],
        keyPoints: ['Indústria', 'Performance', 'Tecnologia', 'Networking']
      },
      {
        id: 9,
        title: 'Lincoln Center Education',
        subtitle: 'Arte como Conhecimento e Transformação',
        category: 'metodologias',
        status: 'published',
        difficulty: 'avancado',
        duration: '3 semanas',
        icon: Award,
        description: 'Capacitação estética, pensamento crítico e transformação social',
        tags: ['EUA', 'Estética', 'Crítico'],
        keyPoints: ['Estética', 'Crítico', 'Social', 'Capacitação']
      },
      
      // INOVAÇÃO & TECNOLOGIA
      {
        id: 10,
        title: 'PRESTO Project',
        subtitle: 'Ensino Digital e Tecnologia Musical',
        category: 'inovacao',
        status: 'published',
        difficulty: 'avancado',
        duration: '4 semanas',
        icon: Zap,
        description: 'Tecnologias digitais aplicadas ao ensino musical colaborativo',
        tags: ['Digital', 'Tecnologia', 'Colaborativo'],
        keyPoints: ['Digital', 'Colaboração', 'Inovação', 'Acessibilidade']
      },
      {
        id: 11,
        title: 'Experiências Brasileiras Inovadoras',
        subtitle: 'Projetos Nacionais de Referência',
        category: 'inovacao',
        status: 'published',
        difficulty: 'intermediario',
        duration: '3 semanas',
        icon: GraduationCap,
        description: 'Mapeamento de iniciativas brasileiras transformadoras',
        tags: ['Brasil', 'Inovação', 'Social'],
        keyPoints: ['Projetos Sociais', 'Inovação BR', 'Impacto', 'Sustentabilidade']
      },
      
      // IMPLEMENTAÇÃO & PRÁTICA
      {
        id: 12,
        title: 'Referenciais Internacionais',
        subtitle: 'Propostas de Futuro',
        category: 'implementacao',
        status: 'published',
        difficulty: 'avancado',
        duration: '2 semanas',
        icon: Globe,
        description: 'Análise de tendências e propostas internacionais emergentes',
        tags: ['Internacional', 'Futuro', 'Tendências'],
        keyPoints: ['Tendências', 'Futuro', 'Global', 'Emergentes']
      },
      {
        id: 13,
        title: 'Proposta Curricular Recomendada',
        subtitle: 'Roadmap para Implementação',
        category: 'implementacao',
        status: 'published',
        difficulty: 'avancado',
        duration: '4 semanas',
        icon: Briefcase,
        description: 'Estrutura curricular contemporânea, adaptável e inclusiva',
        tags: ['Currículo', 'Implementação', 'Adaptável'],
        keyPoints: ['Ciclos', 'Módulos', 'Avaliação', 'Flexibilidade']
      },
      {
        id: 14,
        title: 'Modelos de Sequência Didática',
        subtitle: 'Exemplos Práticos e Materiais',
        category: 'implementacao',
        status: 'published',
        difficulty: 'intermediario',
        duration: '3 semanas',
        icon: CheckCircle,
        description: 'Modelos prontos para aplicação imediata em sala de aula',
        tags: ['Prático', 'Materiais', 'Sequência'],
        keyPoints: ['Sequências', 'Práticos', 'Materiais', 'Aplicação']
      },
      {
        id: 15,
        title: 'Avaliação, Portfolio e Impacto',
        subtitle: 'Sistemas de Acompanhamento',
        category: 'implementacao',
        status: 'published',
        difficulty: 'avancado',
        duration: '3 semanas',
        icon: TrendingUp,
        description: 'Metodologias de avaliação processual e medição de impacto',
        tags: ['Avaliação', 'Portfolio', 'Impacto'],
        keyPoints: ['Processual', 'Portfolio', 'Métricas', 'Qualitativo']
      },
      {
        id: 16,
        title: 'Documentos Institucionais',
        subtitle: 'Fichas, Projetos e Editais',
        category: 'implementacao',
        status: 'published',
        difficulty: 'intermediario',
        duration: '2 semanas',
        icon: Settings,
        description: 'Materiais institucionais para formalização e captação',
        tags: ['Institucional', 'Editais', 'Projetos'],
        keyPoints: ['Documentos', 'Editais', 'Captação', 'Formalização']
      },
      {
        id: 17,
        title: 'Capacitação Docente',
        subtitle: 'Formação Continuada',
        category: 'implementacao',
        status: 'published',
        difficulty: 'avancado',
        duration: '4 semanas',
        icon: Users,
        description: 'Programas de formação e desenvolvimento de educadores musicais',
        tags: ['Docente', 'Formação', 'Continuada'],
        keyPoints: ['Formação', 'Capacitação', 'Continuada', 'Educadores']
      },
      
      // EXPANSÃO & COMUNIDADE
      {
        id: 18,
        title: 'Adaptação para ONGs',
        subtitle: 'Igrejas e Espaços Alternativos',
        category: 'expansao',
        status: 'published',
        difficulty: 'intermediario',
        duration: '3 semanas',
        icon: Heart,
        description: 'Guia de adaptação para contextos comunitários diversos',
        tags: ['ONGs', 'Igrejas', 'Comunitário'],
        keyPoints: ['Adaptação', 'Comunitário', 'Flexível', 'Acessível']
      },
      {
        id: 19,
        title: 'Comunicação e Engajamento',
        subtitle: 'Plano de Comunidade',
        category: 'expansao',
        status: 'published',
        difficulty: 'intermediario',
        duration: '2 semanas',
        icon: Network,
        description: 'Estratégias de comunicação e engajamento comunitário',
        tags: ['Comunicação', 'Engajamento', 'Comunidade'],
        keyPoints: ['Comunicação', 'Engajamento', 'Redes', 'Comunidade']
      }
    ]
  };

  // Filtros
  const filteredChapters = curriculumData.chapters.filter(chapter => {
    const matchesSearch = chapter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         chapter.subtitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'todos' || chapter.category === selectedCategory;
    const matchesStatus = selectedStatus === 'todos' || chapter.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'fundamental': return 'bg-green-100 text-green-800';
      case 'intermediario': return 'bg-yellow-100 text-yellow-800';
      case 'avancado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'published': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'draft': return <Edit className="w-4 h-4 text-yellow-500" />;
      case 'locked': return <Lock className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <NipoHeader />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/admin')}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
              <span>Voltar ao Admin</span>
            </button>
            <div className="h-6 w-px bg-gray-300"></div>
            <h1 className="text-3xl font-bold text-gray-800">Currículo Administrativo</h1>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <BarChart3 className="w-4 h-4" />
              <span>20 Capítulos • 5 Categorias</span>
            </div>
          </div>
        </div>

        {/* Cards Informativos das Categorias */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Categorias do Currículo</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {categoryCards.map((category) => {
              const IconComponent = category.icon;
              return (
                <div
                  key={category.id}
                  className={`${category.lightColor} border ${category.borderColor} rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`${category.color} w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="font-bold text-gray-800 mb-2 text-sm">
                      {category.title}
                    </h3>
                    
                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                      {category.description}
                    </p>
                    
                    <div className="flex items-center justify-center space-x-4 text-xs text-gray-500 mb-3">
                      <div className="flex items-center space-x-1">
                        <BookOpen className="w-3 h-3" />
                        <span>{category.chapters} Cap.</span>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      {category.keyFeatures.slice(0, 2).map((feature, idx) => (
                        <div key={idx} className="text-xs text-gray-600 bg-white/60 rounded-full px-2 py-1">
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar capítulos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="todos">Todas as Categorias</option>
                <option value="fundamentos">Fundamentos & Princípios</option>
                <option value="metodologias">Metodologias Mundiais</option>
                <option value="inovacao">Inovação & Tecnologia</option>
                <option value="implementacao">Implementação & Prática</option>
                <option value="expansao">Expansão & Comunidade</option>
              </select>
              
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="todos">Todos os Status</option>
                <option value="published">Publicado</option>
                <option value="draft">Rascunho</option>
                <option value="review">Em Revisão</option>
              </select>
            </div>
          </div>
        </div>

        {/* Grid de Capítulos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredChapters.map((chapter) => {
            const IconComponent = chapter.icon;
            const categoryInfo = categoryCards.find(cat => cat.id === chapter.category);
            
            return (
              <div key={chapter.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`${categoryInfo?.color || 'bg-gray-500'} w-10 h-10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 font-medium">Capítulo {chapter.id}</div>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(chapter.status)}
                        <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(chapter.difficulty)}`}>
                          {chapter.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <h3 className="font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {chapter.title}
                </h3>
                
                <p className="text-sm text-gray-600 mb-3">
                  {chapter.subtitle}
                </p>
                
                <p className="text-xs text-gray-500 mb-4 line-clamp-2">
                  {chapter.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {chapter.tags?.map((tag, idx) => (
                    <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{chapter.duration}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => viewMethodology(chapter.id)}
                      className="flex items-center space-x-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Ver</span>
                    </button>
                    
                    <button
                      onClick={() => editMethodology(chapter.id)}
                      className="flex items-center space-x-1 px-3 py-1.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-xs"
                    >
                      <Edit className="w-3 h-3" />
                    </button>
                    
                    <button
                      onClick={() => shareMethodology(chapter.id)}
                      className="flex items-center space-x-1 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs"
                    >
                      <Share2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {filteredChapters.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Nenhum capítulo encontrado</h3>
            <p className="text-gray-500">Tente ajustar os filtros de busca</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCurriculum;