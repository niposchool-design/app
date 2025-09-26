import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen, Users, Compass, Target, Clock, CheckCircle, 
  Edit, Eye, Share2, Search, Star, Award, 
  Lightbulb, Heart, Briefcase, Settings, TrendingUp, 
  Crown, Lock, ChevronRight, Zap, Globe, GraduationCap,
  BarChart3, FileText, Code, Wrench, Network, Filter,
  ArrowLeft
} from 'lucide-react';
import NipoHeader from '../../../shared/components/UI/NipoHeader';

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

  // Calcular estatísticas
  const stats = {
    total: chapters.length,
    documentados: chapters.filter(ch => ch.status === 'Documentado').length,
    fundacionais: chapters.filter(ch => ch.status === 'Fundacional').length,
    totalAulas: chapters.reduce((acc, ch) => acc + ch.lessons, 0),
    categorias: categories.length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NipoHeader />
      
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Cabeçalho */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <button
                onClick={() => navigate('/admin')}
                className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors self-start"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Dashboard</span>
              </button>
              
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">
                  Currículo Nipo School
                </h1>
                <p className="text-gray-600 text-sm sm:text-base">
                  Sistema completo de educação musical organizados em categorias
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-xl font-bold text-gray-800">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 w-10 h-10 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Documentados</p>
                <p className="text-xl font-bold text-gray-800">{stats.documentados}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 w-10 h-10 rounded-lg flex items-center justify-center">
                <Crown className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Fundacional</p>
                <p className="text-xl font-bold text-gray-800">{stats.fundacionais}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-orange-100 w-10 h-10 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Aulas</p>
                <p className="text-xl font-bold text-gray-800">{stats.totalAulas}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-100 w-10 h-10 rounded-lg flex items-center justify-center">
                <Network className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Categorias</p>
                <p className="text-xl font-bold text-gray-800">{stats.categorias}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Ações Rápidas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {categories.map((category) => {
              const IconComponent = category.icon;
              const categoryChapters = chapters.filter(ch => ch.category === category.id);
              
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(selectedCategory === category.id ? 'todos' : category.id)}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 hover:shadow-md ${
                    selectedCategory === category.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className={`${category.color} w-12 h-12 rounded-xl flex items-center justify-center`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-800 leading-tight">
                        {category.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {categoryChapters.length} cap.
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filtros e Busca */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-8">
          <div className="flex flex-col space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar capítulos por título ou conteúdo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="todos">Todas as Categorias</option>
                <option value="fundamentos">Fundamentos & Princípios</option>
                <option value="metodologias">Metodologias Mundiais</option>
                <option value="tecnologia">Inovação & Tecnologia</option>
                <option value="implementacao">Implementação & Prática</option>
                <option value="expansao">Expansão & Comunidade</option>
              </select>
              
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="todos">Todos os Status</option>
                <option value="Fundacional">Fundacional</option>
                <option value="Documentado">Documentado</option>
                <option value="Em Desenvolvimento">Em Desenvolvimento</option>
              </select>
            </div>
          </div>
        </div>

        {/* Grid de Capítulos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredChapters.map((chapter) => {
            const IconComponent = chapter.icon;
            const categoryInfo = categories.find(cat => cat.id === chapter.category);
            
            return (
              <div key={chapter.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`${categoryInfo?.color || 'bg-gray-500'} w-10 h-10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs text-gray-500 font-medium">Capítulo {chapter.id}</div>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(chapter.status)}
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(chapter.status)}`}>
                          {chapter.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <h3 className="font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors text-sm sm:text-base line-clamp-2">
                  {chapter.title}
                </h3>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {chapter.subtitle}
                </p>
                
                <p className="text-xs text-gray-500 mb-4 line-clamp-2">
                  {chapter.description}
                </p>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(chapter.difficulty)} self-start`}>
                    {chapter.difficulty}
                  </span>
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{chapter.duration}</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <BookOpen className="w-3 h-3" />
                    <span>{chapter.lessons} aulas</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => viewMethodology(chapter.id)}
                      className="flex items-center space-x-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs flex-1 sm:flex-none justify-center"
                    >
                      <Eye className="w-3 h-3" />
                      <span className="hidden sm:inline">Ver</span>
                    </button>
                    
                    <button
                      onClick={() => editMethodology(chapter.id)}
                      className="flex items-center space-x-1 px-3 py-1.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-xs justify-center"
                    >
                      <Edit className="w-3 h-3" />
                    </button>
                    
                    <button
                      onClick={() => shareMethodology(chapter.id)}
                      className="flex items-center space-x-1 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs justify-center"
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