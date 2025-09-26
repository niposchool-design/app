// features/turmas/pages/AdminTurmas.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Crown, ChevronRight, ArrowLeft, Users, Search, Filter, 
  Eye, Edit, Trash2, Plus, UserCheck, BookOpen, Calendar,
  Star, Activity, Mail, Phone, MapPin, Award, TrendingUp,
  Download, RefreshCw, Settings, AlertTriangle, Clock,
  Music, GraduationCap, Target, BarChart3, CheckCircle
} from 'lucide-react';
import { useTurmas } from '../hooks/useTurmas';
import { turmasService } from '../services/turmasService';
import { useAuth } from '../../../shared/contexts/AuthContext';

const AdminTurmas = () => {
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  
  // Estados principais usando o hook personalizado
  const { turmas, loading, error, fetchTurmas } = useTurmas();
  const [refreshing, setRefreshing] = useState(false);
  
  // Estados de filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todas');
  const [filterInstrument, setFilterInstrument] = useState('todos');
  const [sortBy, setSortBy] = useState('nome');
  const [sortOrder, setSortOrder] = useState('asc');
  
  // Estados de interface
  const [selectedTurmas, setSelectedTurmas] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    ativas: 0,
    inativas: 0,
    totalAlunos: 0
  });

  // Calcular estatísticas
  useEffect(() => {
    if (turmas.length > 0) {
      const ativas = turmas.filter(t => t.status === 'ativa').length;
      const inativas = turmas.filter(t => t.status === 'inativa').length;
      const totalAlunos = turmas.reduce((sum, t) => sum + (t.total_alunos || 0), 0);
      
      setStats({
        total: turmas.length,
        ativas,
        inativas,
        totalAlunos
      });
    }
  }, [turmas]);

  // Filtrar turmas
  const turmasFiltradas = turmas.filter(turma => {
    const matchSearch = !searchTerm || 
      turma.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      turma.professor?.profiles?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      turma.instrumento?.nome?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchStatus = filterStatus === 'todas' || turma.status === filterStatus;
    const matchInstrument = filterInstrument === 'todos' || turma.instrumento_id === filterInstrument;
    
    return matchSearch && matchStatus && matchInstrument;
  });

  // Ordenar turmas
  const turmasOrdenadas = [...turmasFiltradas].sort((a, b) => {
    let valueA, valueB;
    
    switch (sortBy) {
      case 'nome':
        valueA = a.nome || '';
        valueB = b.nome || '';
        break;
      case 'professor':
        valueA = a.professor?.profiles?.full_name || '';
        valueB = b.professor?.profiles?.full_name || '';
        break;
      case 'instrumento':
        valueA = a.instrumento?.nome || '';
        valueB = b.instrumento?.nome || '';
        break;
      case 'alunos':
        valueA = a.total_alunos || 0;
        valueB = b.total_alunos || 0;
        break;
      case 'data':
        valueA = new Date(a.created_at || 0);
        valueB = new Date(b.created_at || 0);
        break;
      default:
        valueA = a.nome || '';
        valueB = b.nome || '';
    }
    
    if (sortOrder === 'asc') {
      return valueA > valueB ? 1 : -1;
    } else {
      return valueA < valueB ? 1 : -1;
    }
  });

  // Refresh manual
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchTurmas();
    setRefreshing(false);
  };

  // Status badge
  const StatusBadge = ({ status }) => {
    const configs = {
      ativa: { bg: 'bg-green-100', text: 'text-green-800', label: 'Ativa' },
      inativa: { bg: 'bg-red-100', text: 'text-red-800', label: 'Inativa' },
      pausada: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pausada' }
    };
    
    const config = configs[status] || configs.inativa;
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  // Card de estatísticas
  const StatCard = ({ title, value, subtitle, icon: IconComponent, color, onClick }) => (
    <div 
      className={`bg-white/90 backdrop-blur-sm rounded-xl p-6 border-l-4 ${color} hover:shadow-lg transition-all duration-200 ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className="flex-shrink-0">
          <IconComponent className="h-8 w-8 text-gray-400" />
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
            <Users className="h-8 w-8 text-white" />
          </div>
          <p className="text-gray-600">Carregando turmas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-red-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Navegação */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/admin')}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              
              <div className="flex items-center space-x-2">
                <Crown className="h-6 w-6 text-red-600" />
                <span className="text-gray-400">•</span>
                <button 
                  onClick={() => navigate('/admin')}
                  className="text-gray-600 hover:text-red-600 transition-colors"
                >
                  Admin
                </button>
                <ChevronRight className="h-4 w-4 text-gray-400" />
                <span className="font-semibold text-gray-900">Gestão de Turmas</span>
              </div>
            </div>

            {/* Ações do header */}
            <div className="flex items-center space-x-3">
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`h-5 w-5 ${refreshing ? 'animate-spin' : ''}`} />
              </button>
              
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Nova Turma</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total de Turmas"
            value={stats.total}
            subtitle={`${stats.ativas} ativas de ${stats.total} cadastradas`}
            icon={Users}
            color="border-blue-500"
          />
          
          <StatCard
            title="Turmas Ativas"
            value={stats.ativas}
            subtitle={`${Math.round((stats.ativas / stats.total) * 100 || 0)}% do total`}
            icon={CheckCircle}
            color="border-green-500"
          />
          
          <StatCard
            title="Total de Alunos"
            value={stats.totalAlunos}
            subtitle="Matriculados em turmas"
            icon={GraduationCap}
            color="border-purple-500"
          />
          
          <StatCard
            title="Média por Turma"
            value={Math.round(stats.totalAlunos / stats.total || 0)}
            subtitle="Alunos por turma"
            icon={BarChart3}
            color="border-orange-500"
          />
        </div>

        {/* Filtros e Busca */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 mb-6 border border-red-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Busca */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar turmas, professores..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>

            {/* Filtros */}
            <div className="flex flex-wrap gap-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="todas">Todos os Status</option>
                <option value="ativa">Ativas</option>
                <option value="inativa">Inativas</option>
                <option value="pausada">Pausadas</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="nome">Ordenar por Nome</option>
                <option value="professor">Ordenar por Professor</option>
                <option value="instrumento">Ordenar por Instrumento</option>
                <option value="alunos">Ordenar por Nº Alunos</option>
                <option value="data">Ordenar por Data</option>
              </select>

              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          </div>
        </div>

        {/* Lista de Turmas */}
        {error ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-red-800 mb-2">Erro ao carregar turmas</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={handleRefresh}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Tentar Novamente
            </button>
          </div>
        ) : turmasOrdenadas.length === 0 ? (
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-12 text-center border border-gray-200">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {searchTerm || filterStatus !== 'todas' ? 'Nenhuma turma encontrada' : 'Nenhuma turma cadastrada'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterStatus !== 'todas' 
                ? 'Tente ajustar os filtros de busca' 
                : 'Comece criando sua primeira turma'}
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2 mx-auto"
            >
              <Plus className="h-4 w-4" />
              <span>Criar Primeira Turma</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {turmasOrdenadas.map((turma) => (
              <div key={turma.id} className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200">
                {/* Header da turma */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {turma.nome || 'Turma sem nome'}
                    </h3>
                    <p className="text-sm text-gray-600 flex items-center">
                      <Music className="h-4 w-4 mr-1" />
                      {turma.instrumento?.nome || 'Instrumento não definido'}
                    </p>
                  </div>
                  <StatusBadge status={turma.status} />
                </div>

                {/* Informações da turma */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    <span>{turma.professor?.profiles?.full_name || 'Professor não definido'}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{turma.total_alunos || 0} aluno(s)</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{turma.horario || 'Horário não definido'}</span>
                  </div>
                </div>

                {/* Ações */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                      <Edit className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                    Ver Detalhes
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTurmas;