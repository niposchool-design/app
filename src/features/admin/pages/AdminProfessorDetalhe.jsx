// features/admin/pages/AdminProfessorDetalhe.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin,
  GraduationCap, 
  BookOpen, 
  Users,
  Activity,
  Clock,
  Award,
  TrendingUp,
  Edit3,
  Save,
  X,
  AlertCircle,
  CheckCircle,
  Star,
  Heart,
  Target,
  Briefcase,
  Coffee
} from 'lucide-react';
import { supabase } from '../../../shared/lib/supabase/supabaseClient';
import { useAuth } from '../../../shared/contexts/AuthContext';

const AdminProfessorDetalhe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  const [professor, setProfessor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [estatisticas, setEstatisticas] = useState({
    total_alunos: 0,
    total_turmas: 0,
    total_conteudos: 0,
    total_visualizacoes: 0,
    aulas_ministradas: 0
  });

  // Buscar dados do professor
  const fetchProfessorDetalhes = async () => {
    try {
      setLoading(true);
      setError(null);

      // Buscar dados do professor usando view admin_professores ou fallback
      let professorData = null;
      
      try {
        console.log('🔍 Buscando na view admin_professores...');
        const { data: viewData, error: viewError } = await supabase
          .from('admin_professores')
          .select('*')
          .eq('id', id)
          .single();
        
        if (!viewError && viewData) {
          professorData = viewData;
        }
      } catch (err) {
        console.log('⚠️ View falhou, usando fallback...');
      }
      
      // Fallback: buscar da tabela profiles
      if (!professorData) {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select(`
            *,
            professores (
              formacao,
              biografia,
              especialidades,
              ativo
            )
          `)
          .eq('id', id)
          .eq('tipo_usuario', 'professor')
          .single();

        if (profileError) throw profileError;
        professorData = profileData;
      }

      if (!professorData) {
        throw new Error('Professor não encontrado');
      }

      // Processar dados do professor
      const processedProfessor = {
        id: professorData.id,
        nome: professorData.nome || professorData.full_name || 'Nome não informado',
        email: professorData.email,
        telefone: professorData.phone || 'Não informado',
        cidade: professorData.city || 'Não informada',
        estado: professorData.state || 'Não informado',
        data_nascimento: professorData.dob,
        formacao: professorData.formacao || 'Não informada',
        biografia: professorData.biografia || professorData.bio || 'Não informada',
        especialidades: professorData.especialidades || [],
        status: professorData.status_atividade || 'ativo',
        data_ingresso: professorData.criado_em || professorData.joined_at,
        ultimo_acesso: professorData.last_active,
        avatar_url: professorData.avatar_url,
        // Estatísticas
        total_pontos: professorData.total_points || 0,
        nivel_usuario: professorData.user_level || 'intermediate',
        total_alunos: professorData.total_alunos || 0,
        total_turmas: professorData.total_turmas || 0,
        total_conteudos: professorData.total_conteudos || 0,
        ativo: professorData.ativo !== false
      };

      setProfessor(processedProfessor);
      setFormData(processedProfessor);

      // Buscar estatísticas adicionais
      await fetchEstatisticasAdicionais(id);

    } catch (err) {
      console.error('❌ Erro ao buscar detalhes do professor:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Buscar estatísticas adicionais
  const fetchEstatisticasAdicionais = async (professorId) => {
    try {
      // Buscar conteúdos criados (se existir tabela professores_conteudos)
      let totalConteudos = 0;
      let totalVisualizacoes = 0;
      
      try {
        const { data: conteudosData } = await supabase
          .from('professores_conteudos')
          .select('id, visualizacoes')
          .eq('professor_id', professorId);

        if (conteudosData) {
          totalConteudos = conteudosData.length;
          totalVisualizacoes = conteudosData.reduce((sum, item) => sum + (item.visualizacoes || 0), 0);
        }
      } catch (err) {
        console.log('ℹ️ Tabela professores_conteudos não encontrada');
      }

      // Buscar alunos ativos do professor (se existir relacionamento)
      let totalAlunos = 0;
      try {
        const { data: alunosData } = await supabase
          .from('alunos')
          .select('id')
          .eq('professor_id', professorId)
          .eq('ativo', true);

        totalAlunos = alunosData?.length || 0;
      } catch (err) {
        console.log('ℹ️ Relacionamento professor-aluno não encontrado');
      }

      setEstatisticas(prev => ({
        ...prev,
        total_conteudos: totalConteudos,
        total_visualizacoes: totalVisualizacoes,
        total_alunos: totalAlunos
      }));

    } catch (err) {
      console.error('⚠️ Erro ao buscar estatísticas adicionais:', err);
    }
  };

  // Salvar alterações
  const salvarAlteracoes = async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.nome,
          phone: formData.telefone,
          city: formData.cidade,
          state: formData.estado,
          bio: formData.biografia,
          user_level: formData.nivel_usuario
        })
        .eq('id', id);

      if (error) throw error;

      // Atualizar dados complementares na tabela professores (se existir)
      try {
        await supabase
          .from('professores')
          .update({
            formacao: formData.formacao,
            biografia: formData.biografia,
            especialidades: formData.especialidades
          })
          .eq('id', id);
      } catch (err) {
        console.log('ℹ️ Tabela professores não encontrada ou não atualizada');
      }

      setProfessor(prev => ({ ...prev, ...formData }));
      setEditMode(false);
      alert('✅ Dados atualizados com sucesso!');

    } catch (err) {
      console.error('❌ Erro ao salvar:', err);
      alert('❌ Erro ao salvar: ' + err.message);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProfessorDetalhes();
    }
  }, [id]);

  // Formatadores
  const formatarData = (data) => {
    if (!data) return 'Não informado';
    return new Date(data).toLocaleDateString('pt-BR');
  };

  const calcularIdade = (dataNascimento) => {
    if (!dataNascimento) return 'Não informado';
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    const idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      return idade - 1;
    }
    return idade;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ativo': return 'bg-green-100 text-green-800';
      case 'inativo': return 'bg-red-100 text-red-800';
      case 'suspenso': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getNivelColor = (nivel) => {
    switch (nivel) {
      case 'beginner': return 'bg-blue-100 text-blue-800';
      case 'intermediate': return 'bg-purple-100 text-purple-800';
      case 'advanced': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando detalhes do professor...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-red-800 mb-2">Erro</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/admin/professores')}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Voltar para Lista
          </button>
        </div>
      </div>
    );
  }

  if (!professor) {
    return (
      <div className="p-6">
        <div className="text-center text-gray-600">
          <User className="w-16 h-16 mx-auto mb-4" />
          <p>Professor não encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/admin/professores')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Detalhes do Professor
                </h1>
                <p className="text-sm text-gray-500">
                  Informações completas e estatísticas
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {editMode ? (
                <>
                  <button
                    onClick={salvarAlteracoes}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Salvar
                  </button>
                  <button
                    onClick={() => {
                      setEditMode(false);
                      setFormData(professor);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Cancelar
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditMode(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  Editar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Coluna Principal - Informações Pessoais */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Card Principal */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-start gap-6 mb-6">
                <div className="relative">
                  {professor.avatar_url ? (
                    <img
                      src={professor.avatar_url}
                      alt={professor.nome}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                      <GraduationCap className="w-12 h-12 text-white" />
                    </div>
                  )}
                  <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center border-2 border-white ${
                    professor.ativo ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                    {professor.ativo ? (
                      <CheckCircle className="w-4 h-4 text-white" />
                    ) : (
                      <X className="w-4 h-4 text-white" />
                    )}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {editMode ? (
                      <input
                        type="text"
                        value={formData.nome}
                        onChange={(e) => setFormData({...formData, nome: e.target.value})}
                        className="text-2xl font-bold text-gray-900 border-b-2 border-blue-500 bg-transparent focus:outline-none"
                      />
                    ) : (
                      <h2 className="text-2xl font-bold text-gray-900">{professor.nome}</h2>
                    )}
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(professor.status)}`}>
                      {professor.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Mail className="w-4 h-4" />
                    <span>{professor.email}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <GraduationCap className="w-4 h-4" />
                    <span>{professor.formacao}</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getNivelColor(professor.nivel_usuario)}`}>
                      {professor.nivel_usuario}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Professor desde {formatarData(professor.data_ingresso)}</span>
                  </div>
                </div>
              </div>

              {/* Informações Detalhadas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações Pessoais</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <div className="flex-1">
                        <span className="text-sm text-gray-500">Telefone</span>
                        {editMode ? (
                          <input
                            type="tel"
                            value={formData.telefone}
                            onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                            className="block w-full mt-1 border-b border-gray-300 bg-transparent focus:border-blue-500 focus:outline-none"
                          />
                        ) : (
                          <p className="text-gray-900">{professor.telefone}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <div className="flex-1">
                        <span className="text-sm text-gray-500">Localização</span>
                        {editMode ? (
                          <div className="grid grid-cols-2 gap-2 mt-1">
                            <input
                              type="text"
                              placeholder="Cidade"
                              value={formData.cidade}
                              onChange={(e) => setFormData({...formData, cidade: e.target.value})}
                              className="border-b border-gray-300 bg-transparent focus:border-blue-500 focus:outline-none"
                            />
                            <input
                              type="text"
                              placeholder="Estado"
                              value={formData.estado}
                              onChange={(e) => setFormData({...formData, estado: e.target.value})}
                              className="border-b border-gray-300 bg-transparent focus:border-blue-500 focus:outline-none"
                            />
                          </div>
                        ) : (
                          <p className="text-gray-900">
                            {professor.cidade && professor.estado 
                              ? `${professor.cidade}, ${professor.estado}` 
                              : 'Não informado'
                            }
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <User className="w-4 h-4 text-gray-400" />
                      <div className="flex-1">
                        <span className="text-sm text-gray-500">Idade</span>
                        <p className="text-gray-900">{calcularIdade(professor.data_nascimento)} anos</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações Acadêmicas</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Briefcase className="w-4 h-4 text-gray-400" />
                      <div className="flex-1">
                        <span className="text-sm text-gray-500">Formação</span>
                        {editMode ? (
                          <input
                            type="text"
                            value={formData.formacao}
                            onChange={(e) => setFormData({...formData, formacao: e.target.value})}
                            className="block w-full mt-1 border-b border-gray-300 bg-transparent focus:border-blue-500 focus:outline-none"
                            placeholder="Ex: Bacharelado em Música"
                          />
                        ) : (
                          <p className="text-gray-900">{professor.formacao}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Target className="w-4 h-4 text-gray-400" />
                      <div className="flex-1">
                        <span className="text-sm text-gray-500">Nível</span>
                        {editMode ? (
                          <select
                            value={formData.nivel_usuario}
                            onChange={(e) => setFormData({...formData, nivel_usuario: e.target.value})}
                            className="block w-full mt-1 border-b border-gray-300 bg-transparent focus:border-blue-500 focus:outline-none"
                          >
                            <option value="intermediate">Intermediário</option>
                            <option value="advanced">Avançado</option>
                            <option value="expert">Especialista</option>
                          </select>
                        ) : (
                          <p className="text-gray-900 capitalize">
                            {professor.nivel_usuario === 'intermediate' ? 'Intermediário' : 
                             professor.nivel_usuario === 'advanced' ? 'Avançado' : 
                             professor.nivel_usuario === 'expert' ? 'Especialista' : 
                             professor.nivel_usuario}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Star className="w-4 h-4 text-gray-400" />
                      <div className="flex-1">
                        <span className="text-sm text-gray-500">Especialidades</span>
                        {editMode ? (
                          <input
                            type="text"
                            value={Array.isArray(formData.especialidades) ? formData.especialidades.join(', ') : formData.especialidades || ''}
                            onChange={(e) => setFormData({...formData, especialidades: e.target.value.split(', ').filter(s => s.trim())})}
                            className="block w-full mt-1 border-b border-gray-300 bg-transparent focus:border-blue-500 focus:outline-none"
                            placeholder="Ex: Violão, Teoria Musical, Regência"
                          />
                        ) : (
                          <p className="text-gray-900">
                            {Array.isArray(professor.especialidades) && professor.especialidades.length > 0
                              ? professor.especialidades.join(', ')
                              : 'Não informado'
                            }
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Biografia */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Biografia</h3>
                {editMode ? (
                  <textarea
                    value={formData.biografia}
                    onChange={(e) => setFormData({...formData, biografia: e.target.value})}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="Conte um pouco sobre a experiência e trajetória do professor..."
                  />
                ) : (
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                    {professor.biografia || 'Nenhuma biografia informada'}
                  </p>
                )}
              </div>
            </div>

            {/* Card de Atividade Recente */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Atividade Recente</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>Último acesso: {formatarData(professor.ultimo_acesso) || 'Nunca acessou'}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Activity className="w-4 h-4" />
                  <span>Status: {professor.ativo ? '✅ Ativo' : '❌ Inativo'}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Coffee className="w-4 h-4" />
                  <span>Engajamento: {professor.ultimo_acesso ? '🟢 Regular' : '⚪ Baixo'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Estatísticas */}
          <div className="space-y-6">
            
            {/* Card de Estatísticas Gerais */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Estatísticas
              </h3>
              
              <div className="space-y-4">
                <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">{professor.total_pontos}</div>
                  <div className="text-sm text-gray-600">Pontos Totais</div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-xl font-bold text-green-600">{estatisticas.total_alunos}</div>
                    <div className="text-xs text-gray-600">Alunos</div>
                    <Users className="w-4 h-4 text-green-500 mx-auto mt-1" />
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-xl font-bold text-purple-600">{professor.total_turmas}</div>
                    <div className="text-xs text-gray-600">Turmas</div>
                    <BookOpen className="w-4 h-4 text-purple-500 mx-auto mt-1" />
                  </div>
                </div>
              </div>
            </div>

            {/* Card de Conteúdos */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-orange-600" />
                Conteúdos
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Conteúdos Criados</span>
                  <span className="font-semibold text-gray-900">{estatisticas.total_conteudos}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total de Visualizações</span>
                  <span className="font-semibold text-gray-900">{estatisticas.total_visualizacoes}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Média por Conteúdo</span>
                  <span className="font-semibold text-gray-900">
                    {estatisticas.total_conteudos > 0 
                      ? Math.round(estatisticas.total_visualizacoes / estatisticas.total_conteudos)
                      : 0
                    }
                  </span>
                </div>
                
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 flex items-center gap-1">
                      <Heart className="w-4 h-4 text-red-500" />
                      Engajamento
                    </span>
                    <span className="font-semibold text-green-600">
                      {estatisticas.total_visualizacoes > 100 ? '🔥 Alto' : 
                       estatisticas.total_visualizacoes > 50 ? '📈 Médio' : 
                       '📊 Baixo'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card de Especialidades */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-600" />
                Áreas de Atuação
              </h3>
              
              {Array.isArray(professor.especialidades) && professor.especialidades.length > 0 ? (
                <div className="space-y-2">
                  {professor.especialidades.map((especialidade, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                      <Star className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm font-medium text-gray-700">{especialidade}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-4">
                  <Award className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm">Especialidades não informadas</p>
                  <p className="text-xs text-gray-400">Configure no modo edição</p>
                </div>
              )}
            </div>

            {/* Card de Performance */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-600" />
                Performance
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Nível de Atividade</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    professor.ultimo_acesso ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {professor.ultimo_acesso ? 'Ativo' : 'Inativo'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Qualidade do Perfil</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    professor.biografia && professor.formacao 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {professor.biografia && professor.formacao ? 'Completo' : 'Incompleto'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfessorDetalhe;