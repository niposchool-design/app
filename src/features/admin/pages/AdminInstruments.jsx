import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Music, Zap, Target, Mic, Volume2, Headphones,
  Edit, Eye, Share2, Search, Star, Package,
  DollarSign, AlertTriangle, Plus, Settings,
  ArrowLeft, Filter, Clock, Users, Loader2
} from 'lucide-react';
import { useInstrumentosReal } from '../../../shared/hooks/useInstrumentosReal';
import NipoHeader from '../../../shared/components/UI/NipoHeader';

const AdminInstruments = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [selectedStatus, setSelectedStatus] = useState('todos');

  // Buscar dados reais do banco
  const { 
    instrumentos: instrumentosData, 
    categorias: categoriasData, 
    stats: statsData,
    isLoading, 
    error,
    refreshData 
  } = useInstrumentosReal();

  // Mapeamento de ícones para categorias
  const getCategoryIcon = (categoryId) => {
    const iconMap = {
      'cordas': Zap,
      'teclas': Target,
      'sopro': Mic,
      'percussao': Volume2,
      'eletronicos': Headphones,
      'default': Music
    };
    return iconMap[categoryId] || iconMap.default;
  };

  // Mapeamento de cores para categorias
  const getCategoryColor = (categoryId) => {
    const colorMap = {
      'cordas': 'bg-gradient-to-br from-blue-500 to-indigo-600',
      'teclas': 'bg-gradient-to-br from-purple-500 to-pink-600',
      'sopro': 'bg-gradient-to-br from-yellow-500 to-orange-600',
      'percussao': 'bg-gradient-to-br from-red-500 to-rose-600',
      'eletronicos': 'bg-gradient-to-br from-green-500 to-teal-600',
      'default': 'bg-gradient-to-br from-gray-500 to-gray-600'
    };
    return colorMap[categoryId] || colorMap.default;
  };

  // Mapeamento de emojis para categorias
  const getCategoryEmoji = (categoryId) => {
    const emojiMap = {
      'cordas': '�',
      'teclas': '🎹',
      'sopro': '🎺',
      'percussao': '🥁',
      'eletronicos': '🎧',
      'default': '🎵'
    };
    return emojiMap[categoryId] || emojiMap.default;
  };

  // Transformar dados das categorias do banco para o formato necessário
  const categories = categoriasData.map(categoria => ({
    id: categoria.id,
    title: `Instrumentos de ${categoria.nome}`,
    icon: getCategoryIcon(categoria.id),
    color: getCategoryColor(categoria.id),
    description: `Categoria: ${categoria.nome}`,
    instrumentsCount: categoria.count,
    emoji: getCategoryEmoji(categoria.id)
  }));

  // Transformar dados dos instrumentos do banco para o formato necessário
  const instruments = instrumentosData.map(instrumento => {
    // Determinar status baseado na disponibilidade
    const status = instrumento.disponivel_escola ? 
      (instrumento.stats?.total_turmas > 0 ? 'Em Uso' : 'Disponível') : 
      'Indisponível';

    // Determinar condição baseada em dados do banco (usar um campo ou lógica específica)
    const condition = 'Bom'; // Pode ser mapeado de algum campo específico se existir

    return {
      id: instrumento.id,
      name: instrumento.nome || 'Nome não definido',
      category: instrumento.categoria || 'outros',
      status: status,
      icon: getCategoryIcon(instrumento.categoria),
      students: instrumento.total_alunos || 0,
      teachers: instrumento.total_professores || 0,
      location: instrumento.localizacao || 'Não especificado', // Se houver campo de localização
      value: instrumento.valor_estimado || 0, // Se houver campo de valor
      condition: condition,
      description: instrumento.descricao || '',
      nivel_dificuldade: instrumento.nivel_dificuldade || 'iniciante',
      turmas_ativas: instrumento.stats?.total_turmas || 0,
      instrumentos_fisicos: instrumento.stats?.instrumentos_fisicos_count || 0,
      midias: instrumento.stats?.total_midias || 0,
      tecnicas: instrumento.stats?.total_tecnicas || 0,
      audio_url: instrumento.audio_exemplo_url,
      image_url: instrumento.imagem_url
    };
  });

  // Filtrar instrumentos
  const filteredInstruments = instruments.filter(instrument => {
    const matchesSearch = instrument.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         instrument.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'todos' || instrument.category === selectedCategory;
    const matchesStatus = selectedStatus === 'todos' || instrument.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Função para visualizar instrumento
  const viewInstrument = (instrumentId) => {
    navigate(`/admin/instruments/view/${instrumentId}`);
  };

  // Função para editar instrumento
  const editInstrument = (instrumentId) => {
    navigate(`/admin/instruments/edit/${instrumentId}`);
  };

  // Função para compartilhar instrumento
  const shareInstrument = (instrumentId) => {
    // Lógica de compartilhamento
    alert(`Compartilhar informações do instrumento ${instrumentId}`);
  };

  // Função para obter cor do status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Disponível':
        return 'bg-green-100 text-green-800';
      case 'Em Manutenção':
        return 'bg-yellow-100 text-yellow-800';
      case 'Reservado':
        return 'bg-blue-100 text-blue-800';
      case 'Indisponível':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Função para obter cor da condição
  const getConditionColor = (condition) => {
    switch (condition) {
      case 'Excelente':
        return 'bg-emerald-100 text-emerald-800';
      case 'Muito Bom':
        return 'bg-green-100 text-green-800';
      case 'Bom':
        return 'bg-yellow-100 text-yellow-800';
      case 'Regular':
        return 'bg-orange-100 text-orange-800';
      case 'Ruim':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Calcular estatísticas usando dados reais
  const stats = {
    total: statsData.totalInstruments || 0,
    disponivel: instruments.filter(inst => inst.status === 'Disponível' || inst.status === 'Em Uso').length,
    manutencao: instruments.filter(inst => inst.status === 'Em Manutenção').length,
    totalStudents: statsData.totalAlunos || 0,
    totalValue: instruments.reduce((acc, inst) => acc + (inst.value || 0), 0),
    categorias: categories.length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NipoHeader />
      
      {/* Loading State */}
      {isLoading && (
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-4" />
            <p className="text-gray-600">Carregando instrumentos...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <p className="text-red-800 font-medium">Erro ao carregar dados</p>
            </div>
            <p className="text-red-600 text-sm mt-1">{error}</p>
            <button
              onClick={refreshData}
              className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      {!isLoading && !error && (
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
                  Gestão de Instrumentos
                </h1>
                <p className="text-gray-600 text-sm sm:text-base">
                  Sistema completo de instrumentos musicais organizados por categoria
                </p>
              </div>
            </div>
            
            <button
              onClick={() => navigate('/admin/instruments/create')}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm font-medium">Novo Instrumento</span>
            </button>
          </div>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center">
                <Music className="w-5 h-5 text-blue-600" />
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
                <Package className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Disponível</p>
                <p className="text-xl font-bold text-gray-800">{stats.disponivel}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-yellow-100 w-10 h-10 rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Manutenção</p>
                <p className="text-xl font-bold text-gray-800">{stats.manutencao}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 w-10 h-10 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Estudantes</p>
                <p className="text-xl font-bold text-gray-800">{stats.totalStudents}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-emerald-100 w-10 h-10 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Valor Total</p>
                <p className="text-lg font-bold text-gray-800">R$ {stats.totalValue.toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-100 w-10 h-10 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-indigo-600" />
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
          <h2 className="text-lg font-bold text-gray-800 mb-4">Categorias de Instrumentos</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {categories.map((category) => {
              const IconComponent = category.icon;
              const categoryInstruments = instruments.filter(inst => inst.category === category.id);
              
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
                        {categoryInstruments.length} instr.
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
                placeholder="Buscar instrumentos por nome ou localização..."
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
                <option value="cordas">Instrumentos de Corda</option>
                <option value="teclas">Instrumentos de Tecla</option>
                <option value="sopro">Instrumentos de Sopro</option>
                <option value="percussao">Instrumentos de Percussão</option>
                <option value="eletronicos">Instrumentos Eletrônicos</option>
              </select>
              
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="todos">Todos os Status</option>
                <option value="Disponível">Disponível</option>
                <option value="Em Manutenção">Em Manutenção</option>
                <option value="Reservado">Reservado</option>
                <option value="Indisponível">Indisponível</option>
              </select>
            </div>
          </div>
        </div>

        {/* Grid de Instrumentos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredInstruments.map((instrument) => {
            const IconComponent = instrument.icon;
            const categoryInfo = categories.find(cat => cat.id === instrument.category);
            
            return (
              <div key={instrument.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`${categoryInfo?.color || 'bg-gray-500'} w-10 h-10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs text-gray-500 font-medium">{categoryInfo?.emoji} {categoryInfo?.title}</div>
                      <div className="flex items-center space-x-1">
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(instrument.status)}`}>
                          {instrument.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <h3 className="font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors text-sm sm:text-base line-clamp-2">
                  {instrument.name}
                </h3>
                
                <p className="text-sm text-gray-600 mb-3">
                  📍 {instrument.location}
                </p>
                
                <div className="flex flex-col space-y-2 mb-4 text-xs text-gray-500">
                  <div className="flex justify-between">
                    <span>Estudantes:</span>
                    <span className="font-medium">{instrument.students}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Professores:</span>
                    <span className="font-medium">{instrument.teachers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Valor:</span>
                    <span className="font-medium">R$ {instrument.value.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${getConditionColor(instrument.condition)} self-start`}>
                    {instrument.condition}
                  </span>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => viewInstrument(instrument.id)}
                      className="flex items-center space-x-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs"
                    >
                      <Eye className="w-3 h-3" />
                      <span className="hidden sm:inline">Ver</span>
                    </button>
                    
                    <button
                      onClick={() => editInstrument(instrument.id)}
                      className="flex items-center space-x-1 px-3 py-1.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-xs"
                    >
                      <Edit className="w-3 h-3" />
                    </button>
                    
                    <button
                      onClick={() => shareInstrument(instrument.id)}
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
        
        {filteredInstruments.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Music className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Nenhum instrumento encontrado</h3>
            <p className="text-gray-500">Tente ajustar os filtros de busca</p>
          </div>
        )}
        </div>
      )}
    </div>
  );
};

export default AdminInstruments;
