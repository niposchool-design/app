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
 * AdminTeachers - Gestão de professores modernizada
 * Migrado de: src/features/admin/pages/AdminProfessores.jsx
 * Nova localização: src_new/pages/admin/teachers.jsx
 */
const AdminTeachers = () => {
  const navigate = useNavigate();
  const { userProfile, isAdmin } = useAuth();
  
  // Estados principais
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  
  // Estados de filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [filterSpecialty, setFilterSpecialty] = useState('todos');
  const [sortBy, setSortBy] = useState('nome');
  const [sortOrder, setSortOrder] = useState('asc');
  
  // Estados de interface
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [stats, setStats] = useState({});
  const [showFilters, setShowFilters] = useState(false);

  // ✅ FUNÇÃO PRINCIPAL - BUSCAR PROFESSORES
  const fetchTeachers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('👨‍🏫 AdminTeachers: Carregando professores...');

      const result = await adminApi.getUsers({ role: 'teacher' });
      
      if (result.success) {
        const processedTeachers = result.data.map(item => ({
          id: item.id,
          nome: item.nome || item.full_name || 'Professor',
          email: item.email || 'Email não informado',
          avatar: item.avatar_url,
          instrumento: item.instrument || 'Não especificado',
          especialidade: item.specialty || item.especialidades?.join(', ') || 'Geral',
          formacao: item.education || item.formacao || 'Não informado',
          biografia: item.bio || item.biografia || 'Não informado',
          status: item.status || 'ativo',
          ativo: item.ativo ?? true,
          telefone: item.phone || 'Não informado',
          endereco: item.city && item.state ? `${item.city}, ${item.state}` : 'Não informado',
          total_conteudos: item.total_contents || 0,
          total_visualizacoes: item.total_views || 0,
          total_downloads: item.total_downloads || 0,
          media_visualizacoes: item.avg_views || 0,
          ultimo_acesso: item.last_active,
          membro_desde: item.joined_at || item.created_at,
          profile_completo: !!(item.nome && item.specialty),
          pontos: item.total_points || 0,
          nivel_usuario: item.user_level || 'intermediate',
          criado_em: item.created_at,
          total_turmas: item.total_classes || 0,
          total_alunos: item.total_students || 0,
          anos_experiencia: item.years_experience || 0
        }));

        const calculatedStats = calculateStats(processedTeachers);
        
        setTeachers(processedTeachers);
        setStats(calculatedStats);

        console.log(`✅ ${processedTeachers.length} professores carregados`);
      } else {
        throw new Error(result.error);
      }

    } catch (err) {
      console.error('❌ Erro ao carregar professores:', err);
      setError(err.message || 'Erro ao carregar professores');
      setTeachers([]);
      setStats({});
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // ✅ CALCULAR ESTATÍSTICAS
  const calculateStats = (teachersData) => {
    const total = teachersData.length;
    
    // Status
    const ativos = teachersData.filter(t => t.status === 'ativo').length;
    const inativos = teachersData.filter(t => t.status === 'inativo').length;
    
    // Especialidades
    const especialidades = {};
    teachersData.forEach(teacher => {
      const esp = teacher.especialidade.toLowerCase();
      especialidades[esp] = (especialidades[esp] || 0) + 1;
    });
    
    const especialidadesTop = Object.entries(especialidades)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);
    
    // Conteúdo
    const totalConteudos = teachersData.reduce((sum, t) => sum + t.total_conteudos, 0);
    const totalVisualizacoes = teachersData.reduce((sum, t) => sum + t.total_visualizacoes, 0);
    const mediaConteudos = total > 0 ? Math.round(totalConteudos / total) : 0;
    
    // Turmas e alunos
    const totalTurmas = teachersData.reduce((sum, t) => sum + t.total_turmas, 0);
    const totalAlunos = teachersData.reduce((sum, t) => sum + t.total_alunos, 0);
    
    return {
      total,
      ativos,
      inativos,
      especialidades: especialidadesTop,
      total_conteudos: totalConteudos,
      total_visualizacoes: totalVisualizacoes,
      media_conteudos: mediaConteudos,
      total_turmas: totalTurmas,
      total_alunos: totalAlunos,
      taxa_atividade: total > 0 ? Math.round((ativos / total) * 100) : 0
    };
  };

  // ✅ FILTRAR E ORDENAR PROFESSORES
  const filteredTeachers = teachers
    .filter(teacher => {
      // Filtro de busca
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          teacher.nome.toLowerCase().includes(searchLower) ||
          teacher.email.toLowerCase().includes(searchLower) ||
          teacher.especialidade.toLowerCase().includes(searchLower)
        );
      }
      return true;
    })
    .filter(teacher => {
      // Filtro de status
      if (filterStatus !== 'todos') {
        return teacher.status === filterStatus;
      }
      return true;
    })
    .filter(teacher => {
      // Filtro de especialidade
      if (filterSpecialty !== 'todos') {
        return teacher.especialidade.toLowerCase().includes(filterSpecialty.toLowerCase());
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
    await fetchTeachers();
  };

  const handleSelectTeacher = (teacherId) => {
    setSelectedTeachers(prev => 
      prev.includes(teacherId) 
        ? prev.filter(id => id !== teacherId)
        : [...prev, teacherId]
    );
  };

  const handleViewTeacher = (teacherId) => {
    navigate(`/admin/professores/${teacherId}`);
  };

  const handleEditTeacher = (teacherId) => {
    navigate(`/admin/professores/${teacherId}/editar`);
  };

  const toggleTeacherStatus = async (teacherId) => {
    try {
      const teacher = teachers.find(t => t.id === teacherId);
      const newStatus = teacher.status === 'ativo' ? 'inativo' : 'ativo';
      
      // Atualizar localmente (implementar API call quando necessário)
      setTeachers(prev => prev.map(t => 
        t.id === teacherId 
          ? { ...t, status: newStatus, ativo: newStatus === 'ativo' }
          : t
      ));

      console.log(`Status do professor ${teacherId} alterado para: ${newStatus}`);
    } catch (err) {
      console.error('Erro ao alterar status:', err);
    }
  };

  // ✅ CARREGAR DADOS
  useEffect(() => {
    if (isAdmin) {
      fetchTeachers();
    } else {
      navigate('/dashboard');
    }
  }, [isAdmin, navigate, fetchTeachers]);

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

  // ✅ COMPONENTE DE CARD DE PROFESSOR
  const TeacherCard = ({ teacher }) => (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            {teacher.avatar ? (
              <img 
                src={teacher.avatar} 
                alt={teacher.nome}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <GraduationCap className="w-6 h-6 text-red-600" />
            )}
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900">{teacher.nome}</h3>
            <p className="text-sm text-gray-600">{teacher.email}</p>
            <div className="flex items-center space-x-4 mt-1">
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {teacher.especialidade}
              </span>
              <span className={`text-xs px-2 py-1 rounded ${
                teacher.status === 'ativo' 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {teacher.status}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleViewTeacher(teacher.id)}
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleEditTeacher(teacher.id)}
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleTeacherStatus(teacher.id)}
          >
            {teacher.status === 'ativo' ? (
              <XCircle className="w-4 h-4 text-red-500" />
            ) : (
              <CheckCircle className="w-4 h-4 text-green-500" />
            )}
          </Button>
        </div>
      </div>
      
      {/* Informações do professor */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Turmas</p>
            <p className="font-medium">{teacher.total_turmas}</p>
          </div>
          <div>
            <p className="text-gray-600">Alunos</p>
            <p className="font-medium">{teacher.total_alunos}</p>
          </div>
          <div>
            <p className="text-gray-600">Conteúdos</p>
            <p className="font-medium">{teacher.total_conteudos}</p>
          </div>
          <div>
            <p className="text-gray-600">Visualizações</p>
            <p className="font-medium">{formatNumber(teacher.total_visualizacoes)}</p>
          </div>
        </div>
        
        {teacher.formacao && teacher.formacao !== 'Não informado' && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-600">Formação</p>
            <p className="text-sm text-gray-900">{teacher.formacao}</p>
          </div>
        )}
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
            <span className="ml-2 text-lg">Carregando professores...</span>
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
                <GraduationCap className="w-8 h-8 text-red-500 mr-3" />
                Gestão de Professores
              </h1>
              <p className="text-gray-600 mt-1">
                Gerencie todos os professores da plataforma
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
              Novo Professor
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
            title="Total de Professores"
            value={formatNumber(stats.total || 0)}
            subtitle={`${stats.ativos || 0} ativos`}
            icon={GraduationCap}
            color="blue"
          />
          <StatCard
            title="Taxa de Atividade"
            value={`${stats.taxa_atividade || 0}%`}
            subtitle="Professores ativos"
            icon={Activity}
            color="green"
          />
          <StatCard
            title="Total de Turmas"
            value={formatNumber(stats.total_turmas || 0)}
            subtitle={`${stats.total_alunos || 0} alunos`}
            icon={BookOpen}
            color="purple"
          />
          <StatCard
            title="Conteúdos Criados"
            value={formatNumber(stats.total_conteudos || 0)}
            subtitle={`Média: ${stats.media_conteudos || 0} por professor`}
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
                placeholder="Nome, email ou especialidade..."
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
                    <option value="total_turmas">Total de turmas</option>
                    <option value="total_conteudos">Total de conteúdos</option>
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

        {/* Lista de Professores */}
        <div className="grid gap-6">
          {filteredTeachers.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTeachers.map(teacher => (
                <TeacherCard key={teacher.id} teacher={teacher} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <GraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum professor encontrado
              </h3>
              <p className="text-gray-600">
                {searchTerm || filterStatus !== 'todos' 
                  ? 'Tente ajustar os filtros de busca'
                  : 'Adicione professores para começar'
                }
              </p>
            </div>
          )}
        </div>

        {/* Status da Nova Estrutura */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="text-green-800 font-semibold mb-2">
            ✅ FASE 4 - AdminTeachers Migrado
          </h3>
          <div className="text-green-700 text-sm grid md:grid-cols-3 gap-4">
            <div>✅ useAuth hook</div>
            <div>✅ adminApi.getUsers()</div>
            <div>✅ Interface moderna</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTeachers;