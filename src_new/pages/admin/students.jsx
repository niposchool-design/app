import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Crown, ChevronRight, ArrowLeft, Users, Search, Filter, 
  Eye, Edit, Trash2, Plus, UserCheck, BookOpen, Calendar,
  Star, Activity, Mail, Phone, MapPin, Award, TrendingUp,
  Download, RefreshCw, Settings, AlertTriangle, GraduationCap,
  Music, Clock, BarChart3, CheckCircle, XCircle, AlertCircle
} from 'lucide-react';

// ✅ NOVA ESTRUTURA - Imports limpos
import { useAuth } from '@new/hooks';
import { adminApi } from '@new/services/api';
import { formatDate, formatNumber } from '@new/lib/utils';
import { USER_ROLES, STATUS } from '@new/lib/utils/constants';
import { Header } from '@new/components/layout';
import { Button, Input } from '@new/components/ui';

/**
 * AdminStudents - Gestão de alunos modernizada
 * Migrado de: src/features/admin/pages/AdminAlunos.jsx
 * Nova localização: src_new/pages/admin/students.jsx
 */
const AdminStudents = () => {
  const navigate = useNavigate();
  const { userProfile, isAdmin } = useAuth();
  
  // Estados principais
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  
  // Estados de filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [filterInstrument, setFilterInstrument] = useState('todos');
  const [sortBy, setSortBy] = useState('nome');
  const [sortOrder, setSortOrder] = useState('asc');
  
  // Estados de interface
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [stats, setStats] = useState({});
  const [showFilters, setShowFilters] = useState(false);

  // ✅ FUNÇÃO PRINCIPAL - BUSCAR ALUNOS
  const fetchStudents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('📚 AdminStudents: Carregando estudantes...');

      const result = await adminApi.getUsers({ role: 'student' });
      
      if (result.success) {
        const processedStudents = result.data.map(item => ({
          id: item.id,
          nome: item.nome || item.full_name || 'Estudante',
          email: item.email || 'Email não informado',
          avatar: item.avatar_url,
          instrumento: item.instrument || 'Não especificado',
          nivel: item.user_level || 'beginner',
          turma: item.turma || 'Sem turma',
          status: item.status || 'ativo',
          ativo: item.ativo ?? true,
          telefone: item.phone || 'Não informado',
          endereco: item.city && item.state ? `${item.city}, ${item.state}` : 'Não informado',
          idade: item.idade,
          data_nascimento: item.dob,
          pontos: item.total_points || 0,
          nivel_usuario: item.user_level || 'beginner',
          streak_atual: item.current_streak || 0,
          melhor_streak: item.best_streak || 0,
          aulas_completadas: item.lessons_completed || 0,
          modulos_completados: item.modules_completed || 0,
          ultimo_acesso: item.last_active,
          membro_desde: item.joined_at || item.created_at,
          profile_completo: item.profile_complete || false,
          criado_em: item.created_at
        }));

        const calculatedStats = calculateStats(processedStudents);
        
        setStudents(processedStudents);
        setStats(calculatedStats);

        console.log(`✅ ${processedStudents.length} estudantes carregados`);
      } else {
        throw new Error(result.error);
      }

    } catch (err) {
      console.error('❌ Erro ao carregar estudantes:', err);
      setError(err.message || 'Erro ao carregar estudantes');
      setStudents([]);
      setStats({});
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // ✅ CALCULAR ESTATÍSTICAS
  const calculateStats = (studentsData) => {
    const total = studentsData.length;
    
    // Status
    const ativos = studentsData.filter(s => s.status === 'ativo').length;
    const inativos = studentsData.filter(s => s.status === 'inativo').length;
    
    // Instrumentos
    const instrumentos = {};
    studentsData.forEach(student => {
      const inst = student.instrumento.toLowerCase();
      instrumentos[inst] = (instrumentos[inst] || 0) + 1;
    });
    
    const instrumentosTop = Object.entries(instrumentos)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);
    
    // Atividade
    const totalAulas = studentsData.reduce((sum, s) => sum + s.aulas_completadas, 0);
    const mediaAulas = total > 0 ? Math.round(totalAulas / total) : 0;
    
    return {
      total,
      ativos,
      inativos,
      instrumentos: instrumentosTop,
      total_aulas: totalAulas,
      media_aulas: mediaAulas,
      taxa_atividade: total > 0 ? Math.round((ativos / total) * 100) : 0
    };
  };

  // ✅ FILTRAR E ORDENAR ESTUDANTES
  const filteredStudents = students
    .filter(student => {
      // Filtro de busca
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          student.nome.toLowerCase().includes(searchLower) ||
          student.email.toLowerCase().includes(searchLower) ||
          student.instrumento.toLowerCase().includes(searchLower)
        );
      }
      return true;
    })
    .filter(student => {
      // Filtro de status
      if (filterStatus !== 'todos') {
        return student.status === filterStatus;
      }
      return true;
    })
    .filter(student => {
      // Filtro de instrumento
      if (filterInstrument !== 'todos') {
        return student.instrumento.toLowerCase() === filterInstrument.toLowerCase();
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
    await fetchStudents();
  };

  const handleSelectStudent = (studentId) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleViewStudent = (studentId) => {
    navigate(`/admin/alunos/${studentId}`);
  };

  const handleEditStudent = (studentId) => {
    navigate(`/admin/alunos/${studentId}/editar`);
  };

  // ✅ CARREGAR DADOS
  useEffect(() => {
    if (isAdmin) {
      fetchStudents();
    } else {
      navigate('/dashboard');
    }
  }, [isAdmin, navigate, fetchStudents]);

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

  // ✅ COMPONENTE DE CARD DE ESTUDANTE
  const StudentCard = ({ student }) => (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            {student.avatar ? (
              <img 
                src={student.avatar} 
                alt={student.nome}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <Users className="w-6 h-6 text-red-600" />
            )}
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900">{student.nome}</h3>
            <p className="text-sm text-gray-600">{student.email}</p>
            <div className="flex items-center space-x-4 mt-1">
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                {student.instrumento}
              </span>
              <span className={`text-xs px-2 py-1 rounded ${
                student.status === 'ativo' 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {student.status}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleViewStudent(student.id)}
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleEditStudent(student.id)}
          >
            <Edit className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      {/* Estatísticas do estudante */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm font-medium text-gray-900">{student.aulas_completadas}</p>
            <p className="text-xs text-gray-600">Aulas</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{student.pontos}</p>
            <p className="text-xs text-gray-600">Pontos</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{student.streak_atual}</p>
            <p className="text-xs text-gray-600">Streak</p>
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
            <span className="ml-2 text-lg">Carregando estudantes...</span>
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
                <Users className="w-8 h-8 text-red-500 mr-3" />
                Gestão de Estudantes
              </h1>
              <p className="text-gray-600 mt-1">
                Gerencie todos os estudantes da plataforma
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
              Novo Estudante
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
            title="Total de Estudantes"
            value={formatNumber(stats.total || 0)}
            subtitle={`${stats.ativos || 0} ativos`}
            icon={Users}
            color="blue"
          />
          <StatCard
            title="Taxa de Atividade"
            value={`${stats.taxa_atividade || 0}%`}
            subtitle="Estudantes ativos"
            icon={Activity}
            color="green"
          />
          <StatCard
            title="Aulas Completadas"
            value={formatNumber(stats.total_aulas || 0)}
            subtitle={`Média: ${stats.media_aulas || 0} por estudante`}
            icon={BookOpen}
            color="purple"
          />
          <StatCard
            title="Instrumentos"
            value={stats.instrumentos?.length || 0}
            subtitle="Diferentes instrumentos"
            icon={Music}
            color="orange"
          />
        </div>

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
          
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Buscar
              </label>
              <Input
                placeholder="Nome, email ou instrumento..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {showFilters && (
              <>
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
                    <option value="ativo">Ativo</option>
                    <option value="inativo">Inativo</option>
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
                    <option value="criado_em">Data de cadastro</option>
                    <option value="ultimo_acesso">Último acesso</option>
                    <option value="aulas_completadas">Aulas completadas</option>
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

        {/* Lista de Estudantes */}
        <div className="grid gap-6">
          {filteredStudents.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStudents.map(student => (
                <StudentCard key={student.id} student={student} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum estudante encontrado
              </h3>
              <p className="text-gray-600">
                {searchTerm || filterStatus !== 'todos' 
                  ? 'Tente ajustar os filtros de busca'
                  : 'Adicione estudantes para começar'
                }
              </p>
            </div>
          )}
        </div>

        {/* Status da Nova Estrutura */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="text-green-800 font-semibold mb-2">
            ✅ FASE 4 - AdminStudents Migrado
          </h3>
          <div className="text-green-700 text-sm grid md:grid-cols-3 gap-4">
            <div>✅ useAuth hook</div>
            <div>✅ adminApi.getUsers()</div>
            <div>✅ Componentes modernos</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStudents;