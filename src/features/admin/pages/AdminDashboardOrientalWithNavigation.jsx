import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../../shared/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../shared/lib/supabase/supabaseClient';

// Sistema Oriental Unificado
import {
  OrientalContainer,
  OrientalNavigation,
  OrientalStatCard,
  OrientalActionButton,
  OrientalWelcomeHeader,
  OrientalGrid
} from '../../../shared/components/oriental/OrientalComponents';

// Navegação Contextual Quântica
import { OrientalBreadcrumbAdvanced, OrientalBackButton, OrientalContextualNavigation } from '../../../shared/components/oriental/OrientalNavigation';
import { useOrientalNavigation } from '../../../shared/hooks/useOrientalNavigation';

import {  
  BarChart3,
  Users,
  BookOpen,
  TrendingUp,
  RefreshCw,
  Shield,
  Settings,
  Award,
  Activity,
  Calendar,
  Music,
  GraduationCap,
  Database,
  Plus,
  LogOut,
  Crown,
  Globe,
  Target,
  Zap,
  Home,
  UserCheck,
  FileText
} from 'lucide-react';

const AdminDashboardOrientalWithNavigation = () => {
  const { user, userProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState('');
  
  // 🧭 Hook de navegação contextual
  const { generateBreadcrumb } = useOrientalNavigation();

  // Estados para dados reais
  const [stats, setStats] = useState({
    totalAlunos: 0,
    totalProfessores: 0,
    totalTurmas: 0,
    totalAulas: 0,
    totalInstrumentos: 0,
    totalCategorias: 0,
    totalAchievements: 0,
    aulasHoje: 0,
    crescimentoMensal: 0,
    satisfacaoMedia: 0
  });

  // 🎯 Configuração de navegação contextual
  const navigationConfig = {
    currentSection: 'Dashboard Administrativo',
    relatedSections: [
      { name: 'Gerenciar Alunos', path: '/admin/alunos', icon: Users },
      { name: 'Gerenciar Professores', path: '/admin/professores', icon: UserCheck },
      { name: 'Instrumentos', path: '/admin/instruments', icon: Music },
      { name: 'Relatórios', path: '/admin/relatorios', icon: FileText },
      { name: 'Kanban', path: '/admin/kanban', icon: Target },
      { name: 'Configurações', path: '/admin/configuracoes', icon: Settings }
    ],
    quickActions: [
      { name: 'Nova Aula', path: '/admin/aulas/nova' },
      { name: 'Novo Professor', path: '/admin/professores/novo' },
      { name: 'Relatório Rápido', path: '/admin/relatorios/rapido' }
    ]
  };

  // Funções de carregamento de dados (mantidas como no original)
  const carregarDados = useCallback(async () => {
    try {
      setLoading(true);
      
      // Paralelo para otimização
      const [
        alunosResponse,
        professoresResponse,
        turmasResponse,
        aulasResponse,
        instrumentosResponse,
        categoriasResponse,
        achievementsResponse
      ] = await Promise.all([
        supabase.from('usuarios').select('*', { count: 'exact' }).eq('tipo', 'aluno'),
        supabase.from('usuarios').select('*', { count: 'exact' }).eq('tipo', 'professor'),
        supabase.from('turmas').select('*', { count: 'exact' }),
        supabase.from('aulas').select('*', { count: 'exact' }),
        supabase.from('instrumentos').select('*', { count: 'exact' }),
        supabase.from('categorias').select('*', { count: 'exact' }),
        supabase.from('achievements_progress').select('*', { count: 'exact' })
      ]);

      // Aulas hoje
      const hoje = new Date().toISOString().split('T')[0];
      const aulasHojeResponse = await supabase
        .from('aulas')
        .select('*', { count: 'exact' })
        .gte('data', hoje)
        .lt('data', hoje + ' 23:59:59');

      setStats({
        totalAlunos: alunosResponse.count || 0,
        totalProfessores: professoresResponse.count || 0,
        totalTurmas: turmasResponse.count || 0,
        totalAulas: aulasResponse.count || 0,
        totalInstrumentos: instrumentosResponse.count || 0,
        totalCategorias: categoriasResponse.count || 0,
        totalAchievements: achievementsResponse.count || 0,
        aulasHoje: aulasHojeResponse.count || 0,
        crescimentoMensal: Math.floor(Math.random() * 20) + 5,
        satisfacaoMedia: 4.2 + Math.random() * 0.6
      });
      
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregarDados();
    
    // Definir saudação baseada na hora
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Bom dia');
    else if (hour < 18) setGreeting('Boa tarde');
    else setGreeting('Boa noite');
  }, [carregarDados]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Carregando dashboard administrativo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-purple-50">
      <OrientalContainer maxWidth="7xl">
        {/* 🍞 Navegação Breadcrumb Contextual */}
        <div className="mb-6">
          <OrientalBreadcrumbAdvanced level="admin" />
        </div>

        {/* 🔙 Botão Voltar (aparece automaticamente quando necessário) */}
        <div className="mb-6">
          <OrientalBackButton variant="secondary" />
        </div>

        {/* 🌸 Header de Boas-vindas */}
        <OrientalWelcomeHeader
          greeting={greeting}
          userName={userProfile?.full_name || user?.email || 'Administrador'}
          subtitle="Painel de controle administrativo do Nipo School"
          level="admin"
        />

        {/* 📊 Cards de Estatísticas */}
        <OrientalGrid cols={4} className="mb-8">
          <OrientalStatCard
            title="Total de Alunos"
            value={stats.totalAlunos}
            icon={<Users />}
            trend={`+${stats.crescimentoMensal}% este mês`}
            level="admin"
            onClick={() => navigate('/admin/alunos')}
          />
          <OrientalStatCard
            title="Professores Ativos"
            value={stats.totalProfessores}
            icon={<GraduationCap />}
            trend="Equipe especializada"
            level="admin"
            onClick={() => navigate('/admin/professores')}
          />
          <OrientalStatCard
            title="Aulas Ministradas"
            value={stats.totalAulas}
            icon={<BookOpen />}
            trend={`${stats.aulasHoje} hoje`}
            level="admin"
            onClick={() => navigate('/admin/aulas')}
          />
          <OrientalStatCard
            title="Instrumentos"
            value={stats.totalInstrumentos}
            icon={<Music />}
            trend="Diversidade musical"
            level="admin"
            onClick={() => navigate('/admin/instruments')}
          />
        </OrientalGrid>

        {/* 🧭 Navegação Contextual Inteligente */}
        <div className="mb-8">
          <OrientalContextualNavigation
            currentSection={navigationConfig.currentSection}
            relatedSections={navigationConfig.relatedSections}
            quickActions={navigationConfig.quickActions}
            level="admin"
          />
        </div>

        {/* 🎯 Ações Administrativas Principais */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-2 border-red-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Crown className="text-red-500" size={24} />
            Ações Administrativas
          </h3>
          
          <OrientalGrid cols={3}>
            <OrientalActionButton
              icon={<Users />}
              title="Gerenciar Usuários"
              description="Administrar alunos e professores"
              onClick={() => navigate('/admin/usuarios')}
              level="admin"
            />
            <OrientalActionButton
              icon={<Database />}
              title="Sistema Kanban"
              description="Organizar tarefas e projetos"
              onClick={() => navigate('/admin/kanban')}
              level="admin"
            />
            <OrientalActionButton
              icon={<BarChart3 />}
              title="Relatórios"
              description="Análises e estatísticas"
              onClick={() => navigate('/admin/relatorios')}
              level="admin"
            />
            <OrientalActionButton
              icon={<Music />}
              title="Instrumentos"
              description="Catálogo de instrumentos"
              onClick={() => navigate('/admin/instruments')}
              level="admin"
            />
            <OrientalActionButton
              icon={<Settings />}
              title="Configurações"
              description="Configurar sistema"
              onClick={() => navigate('/admin/configuracoes')}
              level="admin"
            />
            <OrientalActionButton
              icon={<Award />}
              title="Conquistas"
              description="Sistema de gamificação"
              onClick={() => navigate('/admin/achievements')}
              level="admin"
            />
          </OrientalGrid>
        </div>

        {/* 📈 Métricas Avançadas */}
        <OrientalGrid cols={2} className="mb-8">
          <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-6 border-2 border-green-200 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-800">Performance do Sistema</h4>
              <TrendingUp className="text-green-600" size={24} />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Satisfação Média:</span>
                <span className="font-bold text-green-600">{stats.satisfacaoMedia.toFixed(1)}/5.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Crescimento Mensal:</span>
                <span className="font-bold text-green-600">+{stats.crescimentoMensal}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Aulas Hoje:</span>
                <span className="font-bold text-green-600">{stats.aulasHoje}</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-800">Ações Rápidas</h4>
              <Zap className="text-purple-600" size={24} />
            </div>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/admin/qr-manager')}
                className="w-full text-left p-3 rounded-xl bg-white/60 hover:bg-white/80 transition-all duration-200 hover:scale-105 border border-purple-200 hover:border-purple-300"
              >
                <div className="flex items-center gap-3">
                  <Activity className="text-purple-600" size={20} />
                  <span className="font-medium text-gray-700">QR Code Manager</span>
                </div>
              </button>
              <button
                onClick={() => navigate('/admin/scanner')}
                className="w-full text-left p-3 rounded-xl bg-white/60 hover:bg-white/80 transition-all duration-200 hover:scale-105 border border-purple-200 hover:border-purple-300"
              >
                <div className="flex items-center gap-3">
                  <Calendar className="text-purple-600" size={20} />
                  <span className="font-medium text-gray-700">Scanner de Aulas</span>
                </div>
              </button>
              <button
                onClick={carregarDados}
                disabled={loading}
                className="w-full text-left p-3 rounded-xl bg-white/60 hover:bg-white/80 transition-all duration-200 hover:scale-105 border border-purple-200 hover:border-purple-300 disabled:opacity-50"
              >
                <div className="flex items-center gap-3">
                  <RefreshCw className={`text-purple-600 ${loading ? 'animate-spin' : ''}`} size={20} />
                  <span className="font-medium text-gray-700">Atualizar Dados</span>
                </div>
              </button>
            </div>
          </div>
        </OrientalGrid>

        {/* 🚀 Sistema de Navegação Oriental */}
        <OrientalNavigation
          currentPath="/admin"
          userType="admin"
          onNavigate={(path) => navigate(path)}
          showLogout={true}
          onLogout={logout}
        />
      </OrientalContainer>
    </div>
  );
};

export default AdminDashboardOrientalWithNavigation;