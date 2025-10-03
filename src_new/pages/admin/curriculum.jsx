import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen, Users, Compass, Target, Clock, CheckCircle, 
  Edit, Eye, Share2, Search, Star, Award, 
  Lightbulb, Heart, Briefcase, Settings, TrendingUp, 
  Crown, Lock, ChevronRight, Zap, Globe, GraduationCap,
  BarChart3, FileText, Code, Wrench, Network, Filter,
  ArrowLeft, RefreshCw, Plus
} from 'lucide-react';

// ✅ NOVA ESTRUTURA - Imports limpos
import { useAuth } from '@new/hooks';
import { formatDate, formatNumber } from '@new/lib/utils';
import { Header } from '@new/components/layout';
import { Button, Input } from '@new/components/ui';

/**
 * AdminCurriculum - Gestão de currículo modernizada
 * Migrado de: src/features/admin/pages/AdminCurriculum.jsx
 * Nova localização: src_new/pages/admin/curriculum.jsx
 */
const AdminCurriculum = () => {
  const navigate = useNavigate();
  const { userProfile, isAdmin } = useAuth();
  
  // Estados principais
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Estados de filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [selectedStatus, setSelectedStatus] = useState('todos');
  
  // ✅ CATEGORIAS DO CURRÍCULO
  const categories = [
    {
      id: 'fundamentos',
      title: 'Fundamentos & Princípios',
      icon: Crown,
      color: 'purple',
      description: 'Base filosófica e metodológica que orienta todo o currículo',
      chaptersCount: 1,
      chapters: [0]
    },
    {
      id: 'metodologias',
      title: 'Metodologias Mundiais',
      icon: Globe,
      color: 'blue',
      description: 'Principais abordagens pedagógicas musicais internacionais',
      chaptersCount: 9,
      chapters: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    },
    {
      id: 'tecnologia',
      title: 'Inovação & Tecnologia',
      icon: Zap,
      color: 'orange',
      description: 'Integração de tecnologias digitais no ensino musical',
      chaptersCount: 2,
      chapters: [10, 11]
    },
    {
      id: 'implementacao',
      title: 'Implementação & Prática',
      icon: Settings,
      color: 'green',
      description: 'Ferramentas práticas para aplicação curricular',
      chaptersCount: 6,
      chapters: [12, 13, 14, 15, 16, 17]
    },
    {
      id: 'expansao',
      title: 'Expansão & Comunidade',
      icon: Network,
      color: 'pink',
      description: 'Estratégias de expansão e engajamento comunitário',
      chaptersCount: 2,
      chapters: [18, 19]
    }
  ];

  // ✅ MAPEAMENTO DE CAPÍTULOS
  const chapters = [
    { id: 0, title: 'Princípios Alpha', category: 'fundamentos', status: 'published', progress: 100 },
    { id: 1, title: 'Orff Schulwerk', category: 'metodologias', status: 'published', progress: 100 },
    { id: 2, title: 'Método Suzuki', category: 'metodologias', status: 'published', progress: 100 },
    { id: 3, title: 'Método Kodály', category: 'metodologias', status: 'published', progress: 100 },
    { id: 4, title: 'Musical Futures', category: 'metodologias', status: 'published', progress: 100 },
    { id: 5, title: 'Dalcroze Euritmia', category: 'metodologias', status: 'published', progress: 100 },
    { id: 6, title: 'Gordon Music Learning Theory', category: 'metodologias', status: 'published', progress: 100 },
    { id: 7, title: 'Waldorf Steiner', category: 'metodologias', status: 'draft', progress: 75 },
    { id: 8, title: 'Berklee Contemporânea', category: 'metodologias', status: 'draft', progress: 60 },
    { id: 9, title: 'Lincoln Center', category: 'metodologias', status: 'draft', progress: 40 },
    { id: 10, title: 'PRESTO Project', category: 'tecnologia', status: 'published', progress: 100 },
    { id: 11, title: 'Experiências Brasileiras', category: 'tecnologia', status: 'published', progress: 100 },
    { id: 12, title: 'Referenciais Internacionais', category: 'implementacao', status: 'published', progress: 100 },
    { id: 13, title: 'Proposta Curricular', category: 'implementacao', status: 'published', progress: 100 },
    { id: 14, title: 'Modelos de Sequência Didática', category: 'implementacao', status: 'published', progress: 100 },
    { id: 15, title: 'Avaliação & Portfolio', category: 'implementacao', status: 'published', progress: 100 },
    { id: 16, title: 'Documentos Institucionais', category: 'implementacao', status: 'published', progress: 100 },
    { id: 17, title: 'Capacitação Docente', category: 'implementacao', status: 'published', progress: 100 },
    { id: 18, title: 'Adaptação ONGs e Igrejas', category: 'expansao', status: 'published', progress: 100 },
    { id: 19, title: 'Comunicação & Engajamento', category: 'expansao', status: 'published', progress: 100 }
  ];

  // ✅ FILTRAR CAPÍTULOS
  const filteredCategories = categories.filter(category => {
    if (selectedCategory !== 'todos' && category.id !== selectedCategory) {
      return false;
    }
    if (searchTerm) {
      return category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
             category.description.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });

  const filteredChapters = chapters.filter(chapter => {
    if (selectedCategory !== 'todos' && chapter.category !== selectedCategory) {
      return false;
    }
    if (selectedStatus !== 'todos' && chapter.status !== selectedStatus) {
      return false;
    }
    if (searchTerm) {
      return chapter.title.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });

  // ✅ ESTATÍSTICAS
  const stats = {
    total_chapters: chapters.length,
    published: chapters.filter(c => c.status === 'published').length,
    draft: chapters.filter(c => c.status === 'draft').length,
    categories: categories.length,
    average_progress: Math.round(chapters.reduce((sum, c) => sum + c.progress, 0) / chapters.length)
  };

  // ✅ HANDLERS
  const handleViewChapter = (chapterId) => {
    navigate(`/admin/curriculum/chapter/${chapterId}`);
  };

  const handleEditChapter = (chapterId) => {
    navigate(`/admin/curriculum/chapter/${chapterId}/edit`);
  };

  const handleViewCategory = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  // ✅ COMPONENTE DE CARD DE ESTATÍSTICA
  const StatCard = ({ title, value, subtitle, icon: Icon, color = 'blue' }) => (
    <div className="bg-white rounded-lg shadow p-6 border-l-4 border-l-red-500">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-full bg-${color}-100`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  // ✅ COMPONENTE DE CARD DE CATEGORIA
  const CategoryCard = ({ category }) => (
    <div 
      className="bg-white rounded-lg shadow border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => handleViewCategory(category.id)}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-lg bg-${category.color}-100`}>
            <category.icon className={`w-6 h-6 text-${category.color}-600`} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{category.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{category.description}</p>
            <div className="mt-2">
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                {category.chaptersCount} capítulos
              </span>
            </div>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </div>
    </div>
  );

  // ✅ COMPONENTE DE CARD DE CAPÍTULO
  const ChapterCard = ({ chapter }) => (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">
            Capítulo {chapter.id}: {chapter.title}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Categoria: {categories.find(c => c.id === chapter.category)?.title}
          </p>
          
          {/* Status e Progresso */}
          <div className="flex items-center space-x-4 mt-3">
            <span className={`text-xs px-2 py-1 rounded ${
              chapter.status === 'published' 
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {chapter.status === 'published' ? 'Publicado' : 'Rascunho'}
            </span>
            
            <div className="flex items-center space-x-2">
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-red-500 h-2 rounded-full" 
                  style={{ width: `${chapter.progress}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-600">{chapter.progress}%</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleViewChapter(chapter.id)}
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleEditChapter(chapter.id)}
          >
            <Edit className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  // ✅ VERIFICAR AUTORIZAÇÃO
  useEffect(() => {
    if (!isAdmin) {
      navigate('/dashboard');
    }
  }, [isAdmin, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/admin/dashboard')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <BookOpen className="w-8 h-8 text-red-500 mr-3" />
                Gestão de Currículo
              </h1>
              <p className="text-gray-600 mt-1">
                Gerencie o currículo educacional da Nipo School
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Atualizar
            </Button>
            <Button variant="primary">
              <Plus className="w-4 h-4 mr-2" />
              Novo Capítulo
            </Button>
          </div>
        </div>

        {/* Erro */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="text-red-800">
              <strong>Erro:</strong> {error}
            </div>
          </div>
        )}

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total de Capítulos"
            value={formatNumber(stats.total_chapters)}
            subtitle={`${stats.published} publicados`}
            icon={BookOpen}
            color="blue"
          />
          <StatCard
            title="Progresso Médio"
            value={`${stats.average_progress}%`}
            subtitle="Conclusão geral"
            icon={TrendingUp}
            color="green"
          />
          <StatCard
            title="Categorias"
            value={formatNumber(stats.categories)}
            subtitle="Áreas temáticas"
            icon={Network}
            color="purple"
          />
          <StatCard
            title="Em Rascunho"
            value={formatNumber(stats.draft)}
            subtitle="Pendentes de publicação"
            icon={Edit}
            color="orange"
          />
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Buscar
              </label>
              <Input
                placeholder="Título ou descrição..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categoria
              </label>
              <select
                className="w-full rounded-md border-gray-300 shadow-sm"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="todos">Todas as categorias</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.title}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                className="w-full rounded-md border-gray-300 shadow-sm"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="todos">Todos</option>
                <option value="published">Publicados</option>
                <option value="draft">Rascunhos</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('todos');
                  setSelectedStatus('todos');
                }}
              >
                Limpar Filtros
              </Button>
            </div>
          </div>
        </div>

        {/* Categorias */}
        {selectedCategory === 'todos' && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Categorias do Currículo
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map(category => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        )}

        {/* Lista de Capítulos */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {selectedCategory !== 'todos' 
                ? `Capítulos - ${categories.find(c => c.id === selectedCategory)?.title}`
                : 'Todos os Capítulos'
              }
            </h2>
            <span className="text-sm text-gray-600">
              {filteredChapters.length} capítulos encontrados
            </span>
          </div>
          
          {filteredChapters.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredChapters.map(chapter => (
                <ChapterCard key={chapter.id} chapter={chapter} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum capítulo encontrado
              </h3>
              <p className="text-gray-600">
                Tente ajustar os filtros de busca
              </p>
            </div>
          )}
        </div>

        {/* Status da Nova Estrutura */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="text-green-800 font-semibold mb-2">
            ✅ FASE 4 - AdminCurriculum Migrado
          </h3>
          <div className="text-green-700 text-sm grid md:grid-cols-3 gap-4">
            <div>✅ useAuth hook</div>
            <div>✅ Interface categorizada</div>
            <div>✅ Gestão de capítulos</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCurriculum;