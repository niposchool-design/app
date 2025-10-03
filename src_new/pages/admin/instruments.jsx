import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Music, Search, Filter, Download, Plus, Edit, Eye, Trash2,
  ArrowLeft, RefreshCw, Settings, Users, BarChart3, Calendar,
  DollarSign, Star, AlertTriangle, CheckCircle, XCircle, 
  Clock, Target, Package, Database, FileText, Activity,
  Volume2, Mic, Headphones, Zap
} from 'lucide-react';

// ✅ NOVA ESTRUTURA - Imports limpos
import { useAuth } from '@new/hooks';
import { instrumentsApi } from '@new/services/api';
import { formatDate, formatNumber, formatCurrency } from '@new/lib/utils';
import { INSTRUMENT_CATEGORIES, DIFFICULTY_LEVELS } from '@new/lib/utils/constants';
import { Header } from '@new/components/layout';
import { Button, Input } from '@new/components/ui';

/**
 * AdminInstruments - Gestão de instrumentos modernizada
 * Migrado de: src/features/admin/pages/AdminInstruments.jsx
 * Nova localização: src_new/pages/admin/instruments.jsx
 */
const AdminInstruments = () => {
  const navigate = useNavigate();
  const { userProfile, isAdmin } = useAuth();
  
  // Estados principais
  const [instruments, setInstruments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  
  // Estados de filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('todas');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [filterDifficulty, setFilterDifficulty] = useState('todos');
  const [sortBy, setSortBy] = useState('nome');
  const [sortOrder, setSortOrder] = useState('asc');
  
  // Estados de interface
  const [selectedInstruments, setSelectedInstruments] = useState([]);
  const [stats, setStats] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('cards'); // 'cards' ou 'table'

  // ✅ MAPEAMENTO DE ÍCONES E CORES PARA CATEGORIAS
  const getCategoryIcon = (category) => {
    const iconMap = {
      'cordas': Music,
      'teclas': Target,
      'sopro': Mic,
      'percussao': Volume2,
      'eletronicos': Headphones,
      'default': Music
    };
    return iconMap[category] || iconMap.default;
  };

  const getCategoryColor = (category) => {
    const colorMap = {
      'cordas': 'blue',
      'teclas': 'purple',
      'sopro': 'yellow',
      'percussao': 'red',
      'eletronicos': 'green',
      'default': 'gray'
    };
    return colorMap[category] || colorMap.default;
  };

  const getCategoryEmoji = (category) => {
    const emojiMap = {
      'cordas': '🎸',
      'teclas': '🎹',
      'sopro': '🎺',
      'percussao': '🥁',
      'eletronicos': '🎧',
      'default': '🎵'
    };
    return emojiMap[category] || emojiMap.default;
  };

  // ✅ FUNÇÃO PRINCIPAL - BUSCAR INSTRUMENTOS
  const fetchInstruments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('🎵 AdminInstruments: Carregando instrumentos...');

      const result = await instrumentsApi.getAll();
      
      if (result.success) {
        const processedInstruments = result.data.map(item => ({
          id: item.id,
          nome: item.nome || 'Instrumento',
          categoria: item.categoria || 'outros',
          descricao: item.descricao || 'Sem descrição',
          nivel_dificuldade: item.nivel_dificuldade || 'iniciante',
          idade_minima: item.idade_minima || 0,
          preco_aula: item.preco_aula || 0,
          disponivel: item.disponivel ?? true,
          imagem_url: item.imagem_url,
          created_at: item.created_at,
          updated_at: item.updated_at,
          
          // Campos calculados
          status: item.disponivel ? 'Disponível' : 'Indisponível',
          icon: getCategoryIcon(item.categoria),
          color: getCategoryColor(item.categoria),
          emoji: getCategoryEmoji(item.categoria),
          
          // Mock de estatísticas (implementar conforme necessário)
          students: 0,
          teachers: 0,
          classes: 0,
          condition: 'Bom'
        }));

        const calculatedStats = calculateStats(processedInstruments);
        const processedCategories = calculateCategories(processedInstruments);
        
        setInstruments(processedInstruments);
        setStats(calculatedStats);
        setCategories(processedCategories);

        console.log(`✅ ${processedInstruments.length} instrumentos carregados`);
      } else {
        throw new Error(result.error);
      }

    } catch (err) {
      console.error('❌ Erro ao carregar instrumentos:', err);
      setError(err.message || 'Erro ao carregar instrumentos');
      setInstruments([]);
      setStats({});
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // ✅ CALCULAR ESTATÍSTICAS
  const calculateStats = (instrumentsData) => {
    const total = instrumentsData.length;
    
    // Status
    const disponiveis = instrumentsData.filter(i => i.disponivel).length;
    const indisponiveis = total - disponiveis;
    
    // Categorias
    const categorias = {};
    instrumentsData.forEach(instrument => {
      const cat = instrument.categoria;
      categorias[cat] = (categorias[cat] || 0) + 1;
    });
    
    const categoriasTop = Object.entries(categorias)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);
    
    // Níveis de dificuldade
    const niveis = {};
    instrumentsData.forEach(instrument => {
      const nivel = instrument.nivel_dificuldade;
      niveis[nivel] = (niveis[nivel] || 0) + 1;
    });
    
    // Valor médio
    const precoMedio = total > 0 
      ? instrumentsData.reduce((sum, i) => sum + (i.preco_aula || 0), 0) / total
      : 0;
    
    return {
      total,
      disponiveis,
      indisponiveis,
      categorias: categoriasTop,
      niveis,
      preco_medio: precoMedio,
      taxa_disponibilidade: total > 0 ? Math.round((disponiveis / total) * 100) : 0
    };
  };

  // ✅ CALCULAR CATEGORIAS
  const calculateCategories = (instrumentsData) => {
    const categorias = {};
    
    instrumentsData.forEach(instrument => {
      const cat = instrument.categoria;
      if (!categorias[cat]) {
        categorias[cat] = {
          id: cat,
          nome: cat.charAt(0).toUpperCase() + cat.slice(1),
          count: 0,
          disponivel: 0,
          icon: getCategoryIcon(cat),
          color: getCategoryColor(cat),
          emoji: getCategoryEmoji(cat)
        };
      }
      categorias[cat].count++;
      if (instrument.disponivel) {
        categorias[cat].disponivel++;
      }
    });
    
    return Object.values(categorias);
  };

  // ✅ FILTRAR E ORDENAR INSTRUMENTOS
  const filteredInstruments = instruments
    .filter(instrument => {
      // Filtro de busca
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          instrument.nome.toLowerCase().includes(searchLower) ||
          instrument.categoria.toLowerCase().includes(searchLower) ||
          instrument.descricao.toLowerCase().includes(searchLower)
        );
      }
      return true;
    })
    .filter(instrument => {
      // Filtro de categoria
      if (filterCategory !== 'todas') {
        return instrument.categoria === filterCategory;
      }
      return true;
    })
    .filter(instrument => {
      // Filtro de status
      if (filterStatus !== 'todos') {
        return filterStatus === 'disponivel' ? instrument.disponivel : !instrument.disponivel;
      }
      return true;
    })
    .filter(instrument => {
      // Filtro de dificuldade
      if (filterDifficulty !== 'todos') {
        return instrument.nivel_dificuldade === filterDifficulty;
      }
      return true;
    })
    .sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

  // ✅ HANDLERS
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchInstruments();
  };

  const handleSelectInstrument = (instrumentId) => {
    setSelectedInstruments(prev => 
      prev.includes(instrumentId) 
        ? prev.filter(id => id !== instrumentId)
        : [...prev, instrumentId]
    );
  };

  const handleViewInstrument = (instrumentId) => {
    navigate(`/admin/instruments/${instrumentId}`);
  };

  const handleEditInstrument = (instrumentId) => {
    navigate(`/admin/instruments/${instrumentId}/editar`);
  };

  const toggleInstrumentStatus = async (instrumentId) => {
    try {
      const instrument = instruments.find(i => i.id === instrumentId);
      const newStatus = !instrument.disponivel;
      
      // Atualizar localmente (implementar API call quando necessário)
      setInstruments(prev => prev.map(i => 
        i.id === instrumentId 
          ? { ...i, disponivel: newStatus, status: newStatus ? 'Disponível' : 'Indisponível' }
          : i
      ));

      console.log(`Status do instrumento ${instrumentId} alterado para: ${newStatus ? 'Disponível' : 'Indisponível'}`);
    } catch (err) {
      console.error('Erro ao alterar status:', err);
    }
  };

  // ✅ CARREGAR DADOS
  useEffect(() => {
    if (isAdmin) {
      fetchInstruments();
    } else {
      navigate('/dashboard');
    }
  }, [isAdmin, navigate, fetchInstruments]);

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
    <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg bg-${category.color}-100`}>
            <category.icon className={`w-5 h-5 text-${category.color}-600`} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              {category.emoji} {category.nome}
            </h3>
            <p className="text-sm text-gray-600">
              {category.count} instrumentos
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-gray-900">{category.disponivel}</p>
          <p className="text-xs text-gray-500">disponíveis</p>
        </div>
      </div>
    </div>
  );

  // ✅ COMPONENTE DE CARD DE INSTRUMENTO
  const InstrumentCard = ({ instrument }) => (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className={`w-12 h-12 bg-${instrument.color}-100 rounded-full flex items-center justify-center`}>
            {instrument.imagem_url ? (
              <img 
                src={instrument.imagem_url} 
                alt={instrument.nome}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <Music className={`w-6 h-6 text-${instrument.color}-600`} />
            )}
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 flex items-center">
              {instrument.emoji} {instrument.nome}
            </h3>
            <p className="text-sm text-gray-600">{instrument.categoria}</p>
            <div className="flex items-center space-x-4 mt-1">
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                {instrument.nivel_dificuldade}
              </span>
              <span className={`text-xs px-2 py-1 rounded ${
                instrument.disponivel 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {instrument.status}
              </span>
              {instrument.preco_aula > 0 && (
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {formatCurrency(instrument.preco_aula)}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleViewInstrument(instrument.id)}
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleEditInstrument(instrument.id)}
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleInstrumentStatus(instrument.id)}
          >
            {instrument.disponivel ? (
              <XCircle className="w-4 h-4 text-red-500" />
            ) : (
              <CheckCircle className="w-4 h-4 text-green-500" />
            )}
          </Button>
        </div>
      </div>
      
      {/* Descrição */}
      {instrument.descricao && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 line-clamp-2">
            {instrument.descricao}
          </p>
        </div>
      )}
      
      {/* Estatísticas */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm font-medium text-gray-900">{instrument.students}</p>
            <p className="text-xs text-gray-600">Alunos</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{instrument.teachers}</p>
            <p className="text-xs text-gray-600">Professores</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{instrument.classes}</p>
            <p className="text-xs text-gray-600">Turmas</p>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header isLoading={true} />
        <div className="max-w-7xl mx-auto py-6 px-4">
          <div className="flex items-center justify-center h-64">
            <RefreshCw className="w-8 h-8 text-red-500 animate-spin" />
            <span className="ml-2 text-lg">Carregando instrumentos...</span>
          </div>
        </div>
      </div>
    );
  }

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
                <Music className="w-8 h-8 text-red-500 mr-3" />
                Gestão de Instrumentos
              </h1>
              <p className="text-gray-600 mt-1">
                Gerencie o catálogo de instrumentos musicais
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              onClick={handleRefresh}
              loading={refreshing}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Atualizar
            </Button>
            <Button variant="primary">
              <Plus className="w-4 h-4 mr-2" />
              Novo Instrumento
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
            title="Total de Instrumentos"
            value={formatNumber(stats.total || 0)}
            subtitle={`${stats.disponiveis || 0} disponíveis`}
            icon={Music}
            color="blue"
          />
          <StatCard
            title="Taxa de Disponibilidade"
            value={`${stats.taxa_disponibilidade || 0}%`}
            subtitle="Instrumentos disponíveis"
            icon={CheckCircle}
            color="green"
          />
          <StatCard
            title="Categorias"
            value={formatNumber(categories.length || 0)}
            subtitle="Diferentes tipos"
            icon={Package}
            color="purple"
          />
          <StatCard
            title="Preço Médio"
            value={formatCurrency(stats.preco_medio || 0)}
            subtitle="Por aula"
            icon={DollarSign}
            color="orange"
          />
        </div>

        {/* Categorias */}
        {categories.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Categorias de Instrumentos
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map(category => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        )}

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
            <Button
              variant="ghost"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4 mr-2" />
              {showFilters ? 'Ocultar' : 'Mostrar'} Filtros
            </Button>
          </div>
          
          <div className="grid md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Buscar
              </label>
              <Input
                placeholder="Nome, categoria..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {showFilters && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Categoria
                  </label>
                  <select
                    className="w-full rounded-md border-gray-300 shadow-sm"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                  >
                    <option value="todas">Todas</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.nome}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    className="w-full rounded-md border-gray-300 shadow-sm"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="todos">Todos</option>
                    <option value="disponivel">Disponível</option>
                    <option value="indisponivel">Indisponível</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ordenar por
                  </label>
                  <select
                    className="w-full rounded-md border-gray-300 shadow-sm"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="nome">Nome</option>
                    <option value="categoria">Categoria</option>
                    <option value="created_at">Data de criação</option>
                    <option value="preco_aula">Preço da aula</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ordem
                  </label>
                  <select
                    className="w-full rounded-md border-gray-300 shadow-sm"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                  >
                    <option value="asc">Crescente</option>
                    <option value="desc">Decrescente</option>
                  </select>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Lista de Instrumentos */}
        <div className="grid gap-6">
          {filteredInstruments.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredInstruments.map(instrument => (
                <InstrumentCard key={instrument.id} instrument={instrument} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Music className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum instrumento encontrado
              </h3>
              <p className="text-gray-600">
                {searchTerm || filterCategory !== 'todas' 
                  ? 'Tente ajustar os filtros de busca'
                  : 'Adicione instrumentos para começar'
                }
              </p>
            </div>
          )}
        </div>

        {/* Status da Nova Estrutura */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="text-green-800 font-semibold mb-2">
            ✅ FASE 4 - AdminInstruments Migrado
          </h3>
          <div className="text-green-700 text-sm grid md:grid-cols-3 gap-4">
            <div>✅ useAuth hook</div>
            <div>✅ instrumentsApi.getAll()</div>
            <div>✅ Interface com categorias</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminInstruments;