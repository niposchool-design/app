// features/admin/pages/AdminAlunoDetalhe.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin,
  Music, 
  Trophy, 
  Target, 
  Activity,
  BookOpen,
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
  Flame
} from 'lucide-react';
import { supabase } from '../../../shared/lib/supabase/supabaseClient';
import { useAuth } from '../../../shared/contexts/AuthContext';

const AdminAlunoDetalhe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  const [aluno, setAluno] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [progressData, setProgressData] = useState({
    aulas_completadas: 0,
    modulos_completados: 0,
    total_pontos: 0,
    streak_atual: 0,
    melhor_streak: 0,
    devocionais_lidos: 0,
    conquistas: []
  });

  // Buscar dados do aluno
  const fetchAlunoDetalhes = async () => {
    try {
      setLoading(true);
      setError(null);

      // Buscar dados do aluno usando view admin_alunos ou fallback
      let alunoData = null;
      
      try {
        console.log('🔍 Buscando na view admin_alunos...');
        const { data: viewData, error: viewError } = await supabase
          .from('admin_alunos')
          .select('*')
          .eq('id', id)
          .single();
        
        if (!viewError && viewData) {
          alunoData = viewData;
        }
      } catch (err) {
        console.log('⚠️ View falhou, usando fallback...');
      }
      
      // Fallback: buscar da tabela profiles
      if (!alunoData) {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select(`
            *,
            alunos (
              instrumento_id,
              nivel,
              turma,
              data_ingresso,
              ativo
            ),
            instrumentos (
              nome,
              categoria
            )
          `)
          .eq('id', id)
          .eq('tipo_usuario', 'aluno')
          .single();

        if (profileError) throw profileError;
        alunoData = profileData;
      }

      if (!alunoData) {
        throw new Error('Aluno não encontrado');
      }

      // Processar dados do aluno
      const processedAluno = {
        id: alunoData.id,
        nome: alunoData.nome || alunoData.full_name || 'Nome não informado',
        email: alunoData.email,
        telefone: alunoData.phone || 'Não informado',
        cidade: alunoData.city || 'Não informada',
        estado: alunoData.state || 'Não informado',
        data_nascimento: alunoData.dob,
        instrumento: alunoData.instrument || alunoData.instrumento || 'Não definido',
        nivel: alunoData.nivel || alunoData.user_level || 'beginner',
        turma: alunoData.turma || 'Sem turma',
        status: alunoData.status_atividade || 'ativo',
        data_ingresso: alunoData.data_ingresso || alunoData.joined_at,
        ultimo_acesso: alunoData.last_active,
        bio: alunoData.bio || 'Não informada',
        avatar_url: alunoData.avatar_url,
        // Progresso e gamificação
        total_pontos: alunoData.total_points || 0,
        nivel_usuario: alunoData.user_level || 'beginner',
        streak_atual: alunoData.current_streak || 0,
        melhor_streak: alunoData.best_streak || 0,
        aulas_completadas: alunoData.lessons_completed || 0,
        modulos_completados: alunoData.modules_completed || 0,
        profile_completo: alunoData.perfil_completo || alunoData.profile_completo || false,
        ativo: alunoData.ativo !== false
      };

      setAluno(processedAluno);
      setFormData(processedAluno);

      // Buscar dados de progresso adicional (devocionais, conquistas)
      await fetchProgressoAdicional(id);

    } catch (err) {
      console.error('❌ Erro ao buscar detalhes do aluno:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Buscar dados adicionais de progresso
  const fetchProgressoAdicional = async (alunoId) => {
    try {
      // Buscar devocionais lidos
      const { data: devocionaisData } = await supabase
        .from('user_devotional_progress')
        .select('*')
        .eq('user_id', alunoId);

      const devocionaisLidos = devocionaisData?.length || 0;

      // Buscar conquistas (se existir tabela de conquistas)
      let conquistas = [];
      try {
        const { data: conquistasData } = await supabase
          .from('user_achievements')
          .select('*')
          .eq('user_id', alunoId);
        
        conquistas = conquistasData || [];
      } catch (err) {
        console.log('ℹ️ Tabela de conquistas não encontrada');
      }

      setProgressData(prev => ({
        ...prev,
        devocionais_lidos: devocionaisLidos,
        conquistas
      }));

    } catch (err) {
      console.error('⚠️ Erro ao buscar progresso adicional:', err);
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
          bio: formData.bio,
          instrument: formData.instrumento,
          user_level: formData.nivel_usuario
        })
        .eq('id', id);

      if (error) throw error;

      // Atualizar dados complementares na tabela alunos (se existir)
      try {
        await supabase
          .from('alunos')
          .update({
            nivel: formData.nivel,
            turma: formData.turma
          })
          .eq('id', id);
      } catch (err) {
        console.log('ℹ️ Tabela alunos não encontrada ou não atualizada');
      }

      setAluno(prev => ({ ...prev, ...formData }));
      setEditMode(false);
      alert('✅ Dados atualizados com sucesso!');

    } catch (err) {
      console.error('❌ Erro ao salvar:', err);
      alert('❌ Erro ao salvar: ' + err.message);
    }
  };

  useEffect(() => {
    if (id) {
      fetchAlunoDetalhes();
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
            <p className="text-gray-600">Carregando detalhes do aluno...</p>
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
            onClick={() => navigate('/admin/alunos')}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Voltar para Lista
          </button>
        </div>
      </div>
    );
  }

  if (!aluno) {
    return (
      <div className="p-6">
        <div className="text-center text-gray-600">
          <User className="w-16 h-16 mx-auto mb-4" />
          <p>Aluno não encontrado</p>
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
                onClick={() => navigate('/admin/alunos')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Detalhes do Aluno
                </h1>
                <p className="text-sm text-gray-500">
                  Informações completas e progresso
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
                      setFormData(aluno);
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
                  {aluno.avatar_url ? (
                    <img
                      src={aluno.avatar_url}
                      alt={aluno.nome}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="w-12 h-12 text-white" />
                    </div>
                  )}
                  <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center border-2 border-white ${
                    aluno.ativo ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                    {aluno.ativo ? (
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
                      <h2 className="text-2xl font-bold text-gray-900">{aluno.nome}</h2>
                    )}
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(aluno.status)}`}>
                      {aluno.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Mail className="w-4 h-4" />
                    <span>{aluno.email}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Music className="w-4 h-4" />
                    <span>{aluno.instrumento}</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getNivelColor(aluno.nivel)}`}>
                      {aluno.nivel}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Membro desde {formatarData(aluno.data_ingresso)}</span>
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
                          <p className="text-gray-900">{aluno.telefone}</p>
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
                            {aluno.cidade && aluno.estado 
                              ? `${aluno.cidade}, ${aluno.estado}` 
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
                        <p className="text-gray-900">{calcularIdade(aluno.data_nascimento)} anos</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações Acadêmicas</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Music className="w-4 h-4 text-gray-400" />
                      <div className="flex-1">
                        <span className="text-sm text-gray-500">Instrumento</span>
                        {editMode ? (
                          <select
                            value={formData.instrumento}
                            onChange={(e) => setFormData({...formData, instrumento: e.target.value})}
                            className="block w-full mt-1 border-b border-gray-300 bg-transparent focus:border-blue-500 focus:outline-none"
                          >
                            <option value="">Selecione...</option>
                            <option value="violao">Violão</option>
                            <option value="guitarra">Guitarra</option>
                            <option value="baixo">Baixo</option>
                            <option value="bateria">Bateria</option>
                            <option value="teclado">Teclado</option>
                            <option value="canto">Canto</option>
                            <option value="saxofone">Saxofone</option>
                            <option value="flauta">Flauta</option>
                          </select>
                        ) : (
                          <p className="text-gray-900 capitalize">{aluno.instrumento}</p>
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
                            <option value="beginner">Iniciante</option>
                            <option value="intermediate">Intermediário</option>
                            <option value="advanced">Avançado</option>
                          </select>
                        ) : (
                          <p className="text-gray-900 capitalize">
                            {aluno.nivel_usuario === 'beginner' ? 'Iniciante' : 
                             aluno.nivel_usuario === 'intermediate' ? 'Intermediário' : 
                             aluno.nivel_usuario === 'advanced' ? 'Avançado' : 
                             aluno.nivel_usuario}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-4 h-4 text-gray-400" />
                      <div className="flex-1">
                        <span className="text-sm text-gray-500">Turma</span>
                        {editMode ? (
                          <input
                            type="text"
                            value={formData.turma}
                            onChange={(e) => setFormData({...formData, turma: e.target.value})}
                            className="block w-full mt-1 border-b border-gray-300 bg-transparent focus:border-blue-500 focus:outline-none"
                          />
                        ) : (
                          <p className="text-gray-900">{aluno.turma}</p>
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
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="Conte um pouco sobre o aluno..."
                  />
                ) : (
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                    {aluno.bio || 'Nenhuma biografia informada'}
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
                  <span>Último acesso: {formatarData(aluno.ultimo_acesso) || 'Nunca acessou'}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Activity className="w-4 h-4" />
                  <span>Profile completo: {aluno.profile_completo ? '✅ Sim' : '❌ Não'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Progresso e Estatísticas */}
          <div className="space-y-6">
            
            {/* Card de Gamificação */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-600" />
                Progresso
              </h3>
              
              <div className="space-y-4">
                <div className="text-center p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                  <div className="text-3xl font-bold text-orange-600">{aluno.total_pontos}</div>
                  <div className="text-sm text-gray-600">Pontos Totais</div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-xl font-bold text-blue-600">{aluno.streak_atual}</div>
                    <div className="text-xs text-gray-600">Streak Atual</div>
                    <Flame className="w-4 h-4 text-orange-500 mx-auto mt-1" />
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-xl font-bold text-purple-600">{aluno.melhor_streak}</div>
                    <div className="text-xs text-gray-600">Melhor Streak</div>
                    <Star className="w-4 h-4 text-yellow-500 mx-auto mt-1" />
                  </div>
                </div>
              </div>
            </div>

            {/* Card de Estatísticas */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Estatísticas
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Aulas Completadas</span>
                  <span className="font-semibold text-gray-900">{aluno.aulas_completadas}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Módulos Completados</span>
                  <span className="font-semibold text-gray-900">{aluno.modulos_completados}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Devocionais Lidos</span>
                  <span className="font-semibold text-gray-900">{progressData.devocionais_lidos}</span>
                </div>
                
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 flex items-center gap-1">
                      <Heart className="w-4 h-4 text-red-500" />
                      Engajamento
                    </span>
                    <span className="font-semibold text-green-600">
                      {aluno.ultimo_acesso ? '🟢 Ativo' : '⚪ Inativo'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card de Conquistas */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-600" />
                Conquistas
              </h3>
              
              {progressData.conquistas.length > 0 ? (
                <div className="space-y-2">
                  {progressData.conquistas.slice(0, 5).map((conquista, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 bg-purple-50 rounded-lg">
                      <Award className="w-4 h-4 text-purple-600" />
                      <span className="text-sm text-gray-700">{conquista.nome || `Conquista #${index + 1}`}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-4">
                  <Award className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm">Ainda sem conquistas</p>
                  <p className="text-xs text-gray-400">Continue praticando!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAlunoDetalhe;