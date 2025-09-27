// features/admin/pages/AdminAlunos.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Crown, ChevronRight, ArrowLeft, Users, Search, Filter, 
  Eye, Edit, Trash2, Plus, UserCheck, BookOpen, Calendar,
  Star, Activity, Mail, Phone, MapPin, Award, TrendingUp,
  Download, RefreshCw, Settings, AlertTriangle, GraduationCap,
  Music, Clock, BarChart3, CheckCircle, XCircle, AlertCircle
} from 'lucide-react';
import { supabase } from '../../../shared/lib/supabase/supabaseClient'; // Cliente REAL, não mock
import { useAuth } from '../../../shared/contexts/AuthContext';

const AdminAlunos = () => {
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  
  // Estados principais
  const [alunos, setAlunos] = useState([]);
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
  const [selectedAlunos, setSelectedAlunos] = useState([]);
  const [stats, setStats] = useState({});
  const [showActions, setShowActions] = useState(false);

  // ✅ FUNÇÃO PRINCIPAL - BUSCAR ALUNOS COM DEBUG COMPLETO
  const fetchAlunos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // 🔍 DEBUG CRÍTICO - INFORMAÇÕES DO CONTEXTO
      console.log('=== 🔍 DEBUG ADMIN ALUNOS ===');
      console.log('👤 UserProfile completo:', userProfile);
      console.log('🔑 Tipo usuário:', userProfile?.tipo_usuario);
      console.log('📧 Email do admin:', userProfile?.email);
      console.log('🆔 ID do admin:', userProfile?.id);
      
      // 🧪 TESTE 1: Conexão básica com Supabase (CORRIGIDO)
      console.log('🧪 TESTE 1: Testando conexão básica...');
      const { data: connectionTest, count, error: connectionError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });
        
      console.log('📊 Resultado conexão:', {
        total_registros: count,
        erro_conexao: connectionError?.message || 'nenhum'
      });

      if (connectionError) {
        throw new Error('Erro de conexão com Supabase: ' + connectionError.message);
      }

      // 🧪 TESTE 2: Buscar TODOS os tipos de usuário
      console.log('🧪 TESTE 2: Verificando todos os tipos...');
      const { data: allTypes, error: typesError } = await supabase
        .from('profiles')
        .select('tipo_usuario')
        .not('tipo_usuario', 'is', null);

      const tipoContagem = allTypes?.reduce((acc, item) => {
        acc[item.tipo_usuario] = (acc[item.tipo_usuario] || 0) + 1;
        return acc;
      }, {});

      console.log('📈 Contagem por tipo:', tipoContagem);

      // 🧪 TESTE 3: Buscar alunos (com fallback)
      console.log('🧪 TESTE 3: Buscando alunos da view admin_alunos...');
      let alunosRaw = [];
      let alunosError = null;

      try {
        // TENTAR usar a view admin_alunos primeiro
        console.log('🔍 Tentando view admin_alunos...');
        const result = await supabase
          .from('admin_alunos')
          .select('*')
          .order('criado_em', { ascending: false });
        
        console.log('🔍 VIEW Debug:', {
          data_length: result.data?.length || 0,
          error: result.error?.message || 'nenhum',
          error_code: result.error?.code || 'nenhum'
        });
        
        if (result.error || !result.data || result.data.length === 0) {
          console.log('⚠️ View admin_alunos falhou ou vazia, usando fallback...');
          throw result.error || new Error('View vazia');
        }
        
        alunosRaw = result.data;
        alunosError = result.error;
        console.log('✅ Dados carregados da view admin_alunos!');
      } catch (fallbackError) {
        // FALLBACK: usar tabela profiles
        console.log('🔄 FALLBACK: Buscando da tabela profiles...');
        const fallbackResult = await supabase
          .from('profiles')
          .select('*')
          .eq('tipo_usuario', 'aluno')
          .order('joined_at', { ascending: false });
        
        alunosRaw = fallbackResult.data || [];
        alunosError = fallbackResult.error;
        
        console.log('🔍 FALLBACK Debug:', {
          data_length: fallbackResult.data?.length || 0,
          error: fallbackResult.error?.message || 'nenhum',
          first_item: fallbackResult.data?.[0] || 'vazio'
        });
        
        if (!alunosError && alunosRaw.length > 0) {
          console.log('✅ Dados carregados da tabela profiles (fallback)!');
        } else {
          console.log('❌ Fallback também falhou:', alunosError?.message || 'dados vazios');
        }
      }

      console.log('🎯 Resultado busca de alunos:', {
        quantidade_encontrada: alunosRaw?.length || 0,
        erro_busca: alunosError?.message || 'nenhum',
        primeiros_3_alunos: alunosRaw?.slice(0, 3)?.map(a => ({
          id: a.id,
          nome: a.nome || a.full_name,
          email: a.email,
          instrumento: a.instrument
        }))
      });

      if (alunosError) {
        console.error('❌ Erro específico ao buscar alunos:', alunosError);
        throw new Error('Erro ao buscar alunos: ' + alunosError.message);
      }

      if (!alunosRaw || alunosRaw.length === 0) {
        console.log('⚠️ NENHUM ALUNO ENCONTRADO!');
        setAlunos([]);
        setStats({
          total: 0,
          ativos: 0,
          moderados: 0,
          inativos: 0,
          instrumentos: [],
          total_aulas: 0,
          taxa_atividade: 0
        });
        return;
      }

      console.log(`✅ ${alunosRaw.length} alunos encontrados! Processando...`);

      // ✅ PROCESSAR DADOS (view admin_alunos ou fallback profiles)
      const alunosProcessados = alunosRaw.map((item, index) => {
        console.log(`🔄 Processando aluno ${index + 1}:`, {
          id: item.id,
          nome: item.nome || item.full_name,
          email: item.email
        });

        // Calcular tempo como aluno
        const calcularTempoComoAluno = (criadoEm) => {
          if (!criadoEm) return 0;
          const agora = new Date();
          const dataIngresso = new Date(criadoEm);
          return Math.floor((agora - dataIngresso) / (1000 * 60 * 60 * 24));
        };

        return {
          id: item.id,
          nome: item.nome || item.full_name || 'Aluno',
          email: item.email || 'Email não informado',
          avatar: null, // Campo não existe na view
          instrumento: item.instrumento || item.instrument || 'Não especificado',
          nivel: item.nivel || item.user_level || 'beginner',
          turma: item.turma || 'Sem turma',
          status: item.status_atividade || 'inativo',
          ativo: item.ativo || true,
          telefone: item.phone || 'Não informado',
          endereco: item.city && item.state ? `${item.city}, ${item.state}` : 'Não informado',
          idade: item.idade || null,
          data_nascimento: item.dob,
          pontos: item.total_points || 0,
          nivel_usuario: item.user_level || 'beginner',
          streak_atual: item.current_streak || 0,
          melhor_streak: item.best_streak || 0,
          aulas_completadas: item.lessons_completed || 0,
          modulos_completados: item.modules_completed || 0,
          ultimo_acesso: item.last_active,
          membro_desde: item.joined_at || item.criado_em,
          data_ingresso: item.data_ingresso,
          profile_completo: item.perfil_completo || false,
          ja_votou: item.has_voted || false,
          tempo_como_aluno: calcularTempoComoAluno(item.criado_em || item.joined_at),
          criado_em: item.criado_em || item.joined_at
        };
      });

      console.log(`🎯 ${alunosProcessados.length} alunos processados com sucesso!`);
      console.log('📋 Primeiros 2 alunos processados:', alunosProcessados.slice(0, 2));

      // Calcular estatísticas em tempo real
      const stats = calcularEstatisticas(alunosProcessados);
      
      setAlunos(alunosProcessados);
      setStats(stats);

      console.log('📊 Estatísticas finais calculadas:', stats);
      console.log('✅ PROCESSO CONCLUÍDO COM SUCESSO!');

    } catch (err) {
      console.error('❌ ERRO COMPLETO no fetchAlunos:', err);
      console.error('❌ Stack trace:', err.stack);
      setError(err.message || 'Erro desconhecido ao carregar alunos');
      setAlunos([]);
      setStats({});
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [userProfile]);

  // ✅ FUNÇÃO PARA CALCULAR ESTATÍSTICAS
  const calcularEstatisticas = (alunosData) => {
    const total = alunosData.length;
    
    // Status
    const ativos = alunosData.filter(a => a.status === 'ativo').length;
    const moderados = alunosData.filter(a => a.status === 'moderado').length;
    const inativos = alunosData.filter(a => a.status === 'inativo').length;
    const nuncaAtivos = alunosData.filter(a => a.status === 'nunca_ativo').length;
    
    // Instrumentos
    const instrumentos = {};
    alunosData.forEach(aluno => {
      const inst = aluno.instrumento.toLowerCase();
      instrumentos[inst] = (instrumentos[inst] || 0) + 1;
    });
    
    const instrumentosOrdenados = Object.entries(instrumentos)
      .sort(([,a], [,b]) => b - a)
      .map(([instrumento, quantidade]) => ({ instrumento, quantidade }));
    
    // Níveis
    const niveis = {};
    alunosData.forEach(aluno => {
      niveis[aluno.nivel] = (niveis[aluno.nivel] || 0) + 1;
    });
    
    // Progresso
    const totalPontos = alunosData.reduce((sum, a) => sum + a.pontos_total, 0);
    const totalAulas = alunosData.reduce((sum, a) => sum + a.aulas_completadas, 0);
    const totalModulos = alunosData.reduce((sum, a) => sum + a.modulos_completados, 0);
    
    // Engajamento
    const comPerfilCompleto = alunosData.filter(a => a.profile_completo).length;
    const comStreakAtivo = alunosData.filter(a => a.streak_atual > 0).length;
    const jaVotaram = alunosData.filter(a => a.ja_votou).length;
    
    // Novos alunos (últimos 30 dias)
    const ultimoMes = new Date();
    ultimoMes.setDate(ultimoMes.getDate() - 30);
    const novosAlunos = alunosData.filter(a => 
      a.membro_desde && new Date(a.membro_desde) >= ultimoMes
    ).length;

    return {
      // Totais
      total,
      ativos,
      moderados,
      inativos,
      nunca_ativos: nuncaAtivos,
      novos_alunos: novosAlunos,
      
      // Distribuições
      instrumentos: instrumentosOrdenados,
      niveis,
      instrumento_mais_popular: instrumentosOrdenados[0]?.instrumento || 'N/A',
      
      // Progresso
      total_pontos: totalPontos,
      total_aulas: totalAulas,
      total_modulos: totalModulos,
      media_pontos: total > 0 ? Math.round(totalPontos / total) : 0,
      media_aulas: total > 0 ? Math.round(totalAulas / total) : 0,
      
      // Engajamento
      perfis_completos: comPerfilCompleto,
      com_streak_ativo: comStreakAtivo,
      ja_votaram: jaVotaram,
      taxa_atividade: total > 0 ? Math.round((ativos / total) * 100) : 0,
      taxa_perfil_completo: total > 0 ? Math.round((comPerfilCompleto / total) * 100) : 0,
      taxa_engajamento: total > 0 ? Math.round((comStreakAtivo / total) * 100) : 0
    };
  };

  // ✅ FUNÇÃO PARA ATUALIZAR DADOS
  const refreshData = useCallback(async () => {
    setRefreshing(true);
    await fetchAlunos();
  }, [fetchAlunos]);

  // ✅ FUNÇÃO PARA PROMOVER ALUNO PARA PROFESSOR
  const promoverParaProfessor = async (alunoId, nomeAluno) => {
    if (!window.confirm(`Tem certeza que deseja promover ${nomeAluno} para professor?`)) {
      return;
    }

    try {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ tipo_usuario: 'professor' })
        .eq('id', alunoId);

      if (updateError) throw updateError;

      // Remover da lista local
      setAlunos(prev => prev.filter(aluno => aluno.id !== alunoId));
      
      // Recalcular estatísticas
      const novosAlunos = alunos.filter(a => a.id !== alunoId);
      setStats(calcularEstatisticas(novosAlunos));
      
      alert(`${nomeAluno} foi promovido para professor com sucesso!`);
      
    } catch (err) {
      console.error('❌ Erro ao promover aluno:', err);
      alert(`Erro ao promover ${nomeAluno}: ${err.message}`);
    }
  };

  // ✅ FUNÇÃO PARA REMOVER ALUNO (converter para usuário comum)
  const removerAluno = async (alunoId, nomeAluno) => {
    if (!window.confirm(`Tem certeza que deseja remover ${nomeAluno} da lista de alunos? Ele será convertido para usuário comum.`)) {
      return;
    }

    try {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ tipo_usuario: 'usuario' })
        .eq('id', alunoId);

      if (updateError) throw updateError;

      // Remover da lista local
      setAlunos(prev => prev.filter(aluno => aluno.id !== alunoId));
      
      // Recalcular estatísticas
      const novosAlunos = alunos.filter(a => a.id !== alunoId);
      setStats(calcularEstatisticas(novosAlunos));
      
      alert(`${nomeAluno} foi removido da lista de alunos.`);
      
    } catch (err) {
      console.error('❌ Erro ao remover aluno:', err);
      alert(`Erro ao remover ${nomeAluno}: ${err.message}`);
    }
  };

  // ✅ FUNÇÃO PARA FILTRAR E ORDENAR ALUNOS
  const alunosFiltrados = alunos
    .filter(aluno => {
      // Filtro de busca
      const matchSearch = 
        aluno.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        aluno.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        aluno.instrumento.toLowerCase().includes(searchTerm.toLowerCase()) ||
        aluno.cidade.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filtro de status
      const matchStatus = filterStatus === 'todos' || aluno.status === filterStatus;
      
      // Filtro de instrumento
      const matchInstrument = filterInstrument === 'todos' || aluno.instrumento === filterInstrument;
      
      return matchSearch && matchStatus && matchInstrument;
    })
    .sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      // Tratamento especial para datas
      if (sortBy === 'membro_desde' || sortBy === 'ultimo_acesso') {
        aValue = aValue ? new Date(aValue) : new Date(0);
        bValue = bValue ? new Date(bValue) : new Date(0);
      }
      
      // Tratamento para strings
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  // ✅ HOOKS DE INICIALIZAÇÃO
  useEffect(() => {
    console.log('🔄 useEffect AdminAlunos executado');
    console.log('👤 UserProfile no useEffect:', userProfile);
    
    // ❌ VERIFICAÇÃO DE ADMIN COMENTADA PARA DEBUG
    /*
    if (userProfile?.tipo_usuario !== 'admin') {
      console.log('⚠️ Acesso negado - não é admin');
      setError('Acesso negado. Apenas administradores podem acessar esta área.');
      setLoading(false);
      return;
    }
    */
    
    console.log('✅ Chamando fetchAlunos...');
    fetchAlunos();
  }, [userProfile, fetchAlunos]);

  // ✅ FUNÇÕES AUXILIARES PARA FORMATAÇÃO
  const formatDate = (dateString) => {
    if (!dateString) return 'Não informado';
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric'
    });
  };

  const formatLastAccess = (dateString) => {
    if (!dateString) return 'Nunca acessou';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Agora há pouco';
    if (diffHours < 24) return `${diffHours}h atrás`;
    if (diffDays === 1) return 'Ontem';
    if (diffDays <= 7) return `${diffDays} dias atrás`;
    if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} semanas atrás`;
    return `${Math.ceil(diffDays / 30)} meses atrás`;
  };

  const getStatusConfig = (status) => {
    const configs = {
      ativo: { 
        bg: 'bg-green-100', 
        text: 'text-green-800', 
        icon: CheckCircle, 
        label: 'Ativo',
        color: 'green'
      },
      moderado: { 
        bg: 'bg-yellow-100', 
        text: 'text-yellow-800', 
        icon: AlertCircle, 
        label: 'Moderado',
        color: 'yellow'
      },
      inativo: { 
        bg: 'bg-red-100', 
        text: 'text-red-800', 
        icon: XCircle, 
        label: 'Inativo',
        color: 'red'
      },
      nunca_ativo: { 
        bg: 'bg-gray-100', 
        text: 'text-gray-800', 
        icon: XCircle, 
        label: 'Nunca ativo',
        color: 'gray'
      }
    };
    return configs[status] || configs.inativo;
  };

  const getNivelConfig = (nivel) => {
    const configs = {
      beginner: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Iniciante' },
      intermediate: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Intermediário' },
      advanced: { bg: 'bg-orange-100', text: 'text-orange-800', label: 'Avançado' },
      expert: { bg: 'bg-red-100', text: 'text-red-800', label: 'Expert' }
    };
    return configs[nivel] || configs.beginner;
  };

  // Lista única de instrumentos para filtro
  const instrumentosUnicos = [...new Set(alunos.map(a => a.instrumento))].sort();

  // ✅ COMPONENTE DE LOADING
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600 mx-auto mb-6"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent rounded-full animate-ping border-t-blue-400 mx-auto"></div>
          </div>
          <p className="text-slate-600 font-medium">Carregando gestão de alunos...</p>
          <p className="text-sm text-slate-500 mt-2">Buscando dados atualizados</p>
        </div>
      </div>
    );
  }

  // ✅ COMPONENTE DE ERRO
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-pink-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-2xl shadow-xl border border-red-100 p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Erro ao carregar</h3>
              <p className="text-slate-600 mb-6">{error}</p>
              <div className="space-y-3">
                <button 
                  onClick={fetchAlunos}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  Tentar Novamente
                </button>
                <button 
                  onClick={() => navigate('/admin')}
                  className="w-full bg-slate-100 text-slate-700 py-3 px-6 rounded-xl font-medium hover:bg-slate-200 transition-all duration-200"
                >
                  Voltar ao Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ✅ COMPONENTE PRINCIPAL
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* DEBUG INFO NO TOPO (TEMPORÁRIO) */}
      <div className="bg-blue-900 text-white p-2 text-sm font-mono">
        🔍 DEBUG: {alunos.length} alunos carregados | Admin: {userProfile?.email} | Stats: {JSON.stringify({total: stats.total, ativos: stats.ativos})}
      </div>

      {/* Header Administrativo */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-lg shadow-slate-900/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-slate-900">Painel Administrativo</h1>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <span>Admin</span>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-blue-600 font-medium">Gestão de Alunos</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-4 text-sm text-slate-600">
                <span>👥 {stats.total || 0} alunos</span>
                <span>✅ {stats.ativos || 0} ativos</span>
                <span>📊 {stats.taxa_atividade || 0}% atividade</span>
              </div>
              
              <button
                onClick={refreshData}
                disabled={refreshing}
                className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-xl transition-all duration-200 font-medium disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Atualizar</span>
              </button>
              
              <button
                onClick={() => navigate('/admin')}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all duration-200 font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Banner de Aviso - Dados Mock */}
      {supabase.isUsingMock && supabase.isUsingMock() && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-400 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-3">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-amber-800">
                  🎭 Modo de Demonstração Ativo
                </p>
                <p className="text-xs text-amber-700 mt-1">
                  Os dados exibidos são simulados para demonstração. Conectividade com Supabase será restaurada automaticamente quando disponível.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section com Estatísticas */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 via-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            {/* Informações Principais */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/25">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
                    Gestão de Alunos
                  </h1>
                  <p className="text-slate-600 mt-2">
                    Acompanhe o progresso e gerencie todos os estudantes da Nipo School
                  </p>
                </div>
              </div>
              
              {/* Métricas principais */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-white/50 shadow-lg text-center">
                  <div className="text-2xl font-bold text-slate-900">{stats.total || 0}</div>
                  <div className="text-sm text-slate-600">Total de Alunos</div>
                </div>
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-white/50 shadow-lg text-center">
                  <div className="text-2xl font-bold text-green-600">{stats.ativos || 0}</div>
                  <div className="text-sm text-slate-600">Alunos Ativos</div>
                </div>
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-white/50 shadow-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">{stats.total_aulas || 0}</div>
                  <div className="text-sm text-slate-600">Aulas Completadas</div>
                </div>
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-white/50 shadow-lg text-center">
                  <div className="text-2xl font-bold text-purple-600">{stats.taxa_atividade || 0}%</div>
                  <div className="text-sm text-slate-600">Taxa de Atividade</div>
                </div>
              </div>
            </div>

            {/* Estatísticas Avançadas */}
            <div className="lg:w-96">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Resumo Executivo</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Instrumento mais popular:</span>
                    <span className="font-medium capitalize">{stats.instrumento_mais_popular || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Perfis completos:</span>
                    <span className="font-medium">{stats.perfis_completos || 0} ({stats.taxa_perfil_completo || 0}%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Com streak ativo:</span>
                    <span className="font-medium">{stats.com_streak_ativo || 0} ({stats.taxa_engajamento || 0}%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Novos este mês:</span>
                    <span className="font-medium text-green-600">{stats.novos_alunos || 0} alunos</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Já votaram no logo:</span>
                    <span className="font-medium">{stats.ja_votaram || 0} alunos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Distribuição por Instrumentos */}
          {stats.instrumentos && stats.instrumentos.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Distribuição por Instrumentos</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {stats.instrumentos.slice(0, 6).map(inst => (
                  <div key={inst.instrumento} className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-white/50 shadow-sm text-center">
                    <div className="text-lg font-bold text-slate-900">{inst.quantidade}</div>
                    <div className="text-xs text-slate-600 capitalize">{inst.instrumento}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Filtros e Controles */}
      <div className="max-w-7xl mx-auto px-6 pb-8">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Busca */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar por nome, email, instrumento ou cidade..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Filtros */}
            <div className="flex items-center gap-4 flex-wrap">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 border border-slate-200 rounded-xl bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              >
                <option value="todos">Todos os Status</option>
                <option value="ativo">Ativos (últimos 3 dias)</option>
                <option value="moderado">Moderados (até 14 dias)</option>
                <option value="inativo">Inativos (mais de 14 dias)</option>
                <option value="nunca_ativo">Nunca acessaram</option>
              </select>

              <select
                value={filterInstrument}
                onChange={(e) => setFilterInstrument(e.target.value)}
                className="px-4 py-3 border border-slate-200 rounded-xl bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              >
                <option value="todos">Todos os Instrumentos</option>
                {instrumentosUnicos.map(inst => (
                  <option key={inst} value={inst} className="capitalize">{inst}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-slate-200 rounded-xl bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              >
                <option value="nome">Ordenar por Nome</option>
                <option value="membro_desde">Por Data de Cadastro</option>
                <option value="ultimo_acesso">Por Último Acesso</option>
                <option value="pontos_total">Por Pontos</option>
                <option value="aulas_completadas">Por Aulas Completadas</option>
                <option value="streak_atual">Por Streak Atual</option>
                <option value="completude_perfil">Por Completude do Perfil</option>
              </select>

              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all duration-200"
                title={sortOrder === 'asc' ? 'Ordenação Crescente' : 'Ordenação Decrescente'}
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          </div>

          {/* Resultados da busca */}
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-slate-600">
              Mostrando <span className="font-medium">{alunosFiltrados.length}</span> de <span className="font-medium">{alunos.length}</span> alunos
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowActions(!showActions)}
                className="px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors text-sm"
              >
                Ações em Lote
              </button>
              
              <button
                onClick={() => navigate('/admin/alunos/novo')}
                className="px-3 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors text-sm flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Novo Aluno
              </button>
            </div>
          </div>
        </div>

        {/* Lista de Alunos */}
        <div className="space-y-4">
          {alunosFiltrados.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg p-12 text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Nenhum aluno encontrado</h3>
              <p className="text-slate-600 mb-6">
                {searchTerm || filterStatus !== 'todos' || filterInstrument !== 'todos' 
                  ? 'Tente ajustar os filtros de busca.' 
                  : 'Ainda não há alunos cadastrados no sistema.'}
              </p>
              {(!searchTerm && filterStatus === 'todos' && filterInstrument === 'todos') && (
                <button
                  onClick={() => navigate('/admin/alunos/novo')}
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-xl font-medium hover:from-green-700 hover:to-green-800 transition-all duration-200 flex items-center justify-center gap-2 mx-auto"
                >
                  <Plus className="w-5 h-5" />
                  Adicionar Primeiro Aluno
                </button>
              )}
            </div>
          ) : (
            alunosFiltrados.map((aluno) => {
              const statusConfig = getStatusConfig(aluno.status);
              const nivelConfig = getNivelConfig(aluno.nivel);
              const StatusIcon = statusConfig.icon;
              
              return (
                <div key={aluno.id} className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Avatar e Info Principal */}
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                          {aluno.avatar ? (
                            <img src={aluno.avatar} alt={aluno.nome} className="w-16 h-16 rounded-2xl object-cover" />
                          ) : (
                            <span className="text-white text-xl font-bold">
                              {aluno.nome.charAt(0).toUpperCase()}
                            </span>
                          )}
                        </div>
                        {/* Indicador de status */}
                        <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full ${statusConfig.bg} border-2 border-white flex items-center justify-center`}>
                          <StatusIcon className={`w-3 h-3 ${statusConfig.text}`} />
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className="text-xl font-bold text-slate-900 truncate">{aluno.nome}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusConfig.bg} ${statusConfig.text}`}>
                            {statusConfig.label}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${nivelConfig.bg} ${nivelConfig.text}`}>
                            {nivelConfig.label}
                          </span>
                          {aluno.ja_votou && (
                            <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-bold">
                              ✅ Votou
                            </span>
                          )}
                        </div>
                        
                        <div className="space-y-1 text-sm text-slate-600">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            <span className="truncate">{aluno.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Music className="w-4 h-4" />
                            <span className="capitalize">{aluno.instrumento}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{aluno.endereco}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>Membro há {aluno.tempo_como_aluno} dias</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Estatísticas de Progresso */}
                    <div className="grid grid-cols-4 gap-3 lg:w-80">
                      <div className="text-center p-3 bg-blue-50 rounded-xl">
                        <div className="text-lg font-bold text-blue-600">{aluno.aulas_completadas}</div>
                        <div className="text-xs text-blue-700">Aulas</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-xl">
                        <div className="text-lg font-bold text-green-600">{aluno.modulos_completados}</div>
                        <div className="text-xs text-green-700">Módulos</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-xl">
                        <div className="text-lg font-bold text-purple-600">{aluno.pontos_total}</div>
                        <div className="text-xs text-purple-700">Pontos</div>
                      </div>
                      <div className="text-center p-3 bg-orange-50 rounded-xl">
                        <div className="text-lg font-bold text-orange-600">{aluno.streak_atual}</div>
                        <div className="text-xs text-orange-700">Streak</div>
                      </div>
                    </div>

                    {/* Ações */}
                    <div className="flex flex-col gap-2 lg:w-32">
                      <button 
                        onClick={() => navigate(`/admin/alunos/${aluno.id}`)}
                        className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors text-sm"
                      >
                        <Eye className="w-4 h-4" />
                        <span className="hidden lg:inline">Ver</span>
                      </button>
                      
                      <button 
                        onClick={() => navigate(`/admin/alunos/editar/${aluno.id}`)}
                        className="flex items-center justify-center gap-2 px-3 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors text-sm"
                      >
                        <Edit className="w-4 h-4" />
                        <span className="hidden lg:inline">Editar</span>
                      </button>
                      
                      <button 
                        onClick={() => promoverParaProfessor(aluno.id, aluno.nome)}
                        className="flex items-center justify-center gap-2 px-3 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg transition-colors text-sm"
                      >
                        <Award className="w-4 h-4" />
                        <span className="hidden lg:inline">Promover</span>
                      </button>
                      
                      <button 
                        onClick={() => removerAluno(aluno.id, aluno.nome)}
                        className="flex items-center justify-center gap-2 px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors text-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="hidden lg:inline">Remover</span>
                      </button>
                    </div>
                  </div>

                  {/* Informações Adicionais */}
                  <div className="mt-6 pt-4 border-t border-slate-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      {/* Última atividade */}
                      <div className="flex items-center gap-2 text-slate-600">
                        <Clock className="w-4 h-4" />
                        <span>Último acesso: {formatLastAccess(aluno.ultimo_acesso)}</span>
                      </div>

                      {/* Status do perfil */}
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          aluno.completude_perfil >= 80 ? 'bg-green-500' :
                          aluno.completude_perfil >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></div>
                        <span className={`text-sm ${
                          aluno.completude_perfil >= 80 ? 'text-green-600' :
                          aluno.completude_perfil >= 50 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          Perfil {aluno.completude_perfil}% completo
                        </span>
                      </div>

                      {/* Engajamento */}
                      <div className="flex items-center gap-2 text-slate-600">
                        <BarChart3 className="w-4 h-4" />
                        <span>
                          {aluno.usuario_engajado ? 'Engajado' : 'Baixo engajamento'}
                        </span>
                      </div>
                    </div>

                    {/* Ações adicionais */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span>Membro desde {formatDate(aluno.membro_desde)}</span>
                        {aluno.streak_atual > 0 && (
                          <span className="flex items-center gap-1 text-orange-600">
                            <Star className="w-4 h-4" />
                            {aluno.streak_atual} dias seguidos
                          </span>
                        )}
                        {aluno.melhor_streak > 0 && (
                          <span className="text-purple-600">
                            Melhor: {aluno.melhor_streak} dias
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => navigate(`/admin/alunos/progresso/${aluno.id}`)}
                          className="px-3 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-full text-xs font-medium transition-colors"
                        >
                          Ver Progresso Detalhado
                        </button>
                        
                        {aluno.precisa_atualizacao && (
                          <button
                            onClick={() => navigate(`/admin/alunos/editar/${aluno.id}`)}
                            className="px-3 py-1 bg-amber-100 text-amber-700 hover:bg-amber-200 rounded-full text-xs font-medium transition-colors"
                          >
                            Completar Perfil
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Bio (se existir) */}
                    {aluno.bio && aluno.bio !== 'Biografia não preenchida' && (
                      <div className="mt-3 p-3 bg-slate-50 rounded-lg">
                        <p className="text-sm text-slate-700 italic">"{aluno.bio}"</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Ações em Lote */}
        {showActions && (
          <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Ações em Lote</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <button
                onClick={() => {
                  console.log('Exportar dados dos alunos filtrados');
                  alert('Funcionalidade de exportação será implementada em breve!');
                }}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-xl transition-colors"
              >
                <Download className="w-5 h-5" />
                Exportar Lista
              </button>
              
              <button
                onClick={() => {
                  console.log('Enviar email para alunos filtrados');
                  alert('Funcionalidade de email em massa será implementada em breve!');
                }}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-green-100 hover:bg-green-200 text-green-700 rounded-xl transition-colors"
              >
                <Mail className="w-5 h-5" />
                Email em Massa
              </button>
              
              <button
                onClick={() => {
                  console.log('Gerar relatório de progresso');
                  alert('Funcionalidade de relatório será implementada em breve!');
                }}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-xl transition-colors"
              >
                <BarChart3 className="w-5 h-5" />
                Relatório
              </button>
              
              <button
                onClick={() => navigate('/admin/alunos/importar')}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-xl transition-colors"
              >
                <Plus className="w-5 h-5" />
                Importar CSV
              </button>
              
              <button
                onClick={() => navigate('/admin/configuracoes/alunos')}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
              >
                <Settings className="w-5 h-5" />
                Configurações
              </button>
              
              <button
                onClick={() => setShowActions(false)}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-red-100 hover:bg-red-200 text-red-700 rounded-xl transition-colors"
              >
                <XCircle className="w-5 h-5" />
                Fechar
              </button>
            </div>
          </div>
        )}

        {/* Footer com informações */}
        <div className="mt-8 text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
            <p className="text-slate-600 mb-2 flex items-center justify-center gap-2">
              <GraduationCap className="w-4 h-4" />
              Gestão de Alunos - Nipo School
            </p>
            <p className="text-sm text-slate-500">
              Sistema de gestão completo • Última atualização: {new Date().toLocaleString('pt-BR')}
            </p>
            <div className="flex items-center justify-center gap-4 mt-4 text-xs text-slate-400">
              <span>📊 {alunos.length} alunos no sistema</span>
              <span>⚡ Performance otimizada</span>
              <span>🔄 Dados em tempo real</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAlunos;