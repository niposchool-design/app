import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, ArrowLeft, Settings, Users, BookOpen, Music, 
  GraduationCap, BarChart3, Zap, Crown, RefreshCw, Eye,
  CheckCircle, AlertTriangle, Info
} from 'lucide-react';

// ✅ NOVA ESTRUTURA - Imports
import { useAuth } from '@new/hooks';
import { Header } from '@new/components/layout';
import { Button } from '@new/components/ui';

/**
 * StructureBridge - Página de transição entre estruturas
 * Localização: src_new/pages/structure-bridge.jsx
 */
const StructureBridge = () => {
  const navigate = useNavigate();
  const { userProfile, isAdmin } = useAuth();

  const newStructurePages = [
    {
      id: 'dashboard',
      title: 'Dashboard Admin',
      description: 'Dashboard modernizado com estatísticas em tempo real',
      icon: BarChart3,
      color: 'blue',
      path: '/admin-new',
      status: 'ready'
    },
    {
      id: 'students',
      title: 'Gestão de Estudantes',
      description: 'Interface moderna para gerenciar estudantes',
      icon: Users,
      color: 'green',
      path: '/admin-new/students',
      status: 'ready'
    },
    {
      id: 'teachers',
      title: 'Gestão de Professores',
      description: 'Painel completo para gerenciar professores',
      icon: GraduationCap,
      color: 'purple',
      path: '/admin-new/teachers',
      status: 'ready'
    },
    {
      id: 'instruments',
      title: 'Catálogo de Instrumentos',
      description: 'Gestão visual de instrumentos com categorias',
      icon: Music,
      color: 'orange',
      path: '/admin-new/instruments',
      status: 'ready'
    },
    {
      id: 'curriculum',
      title: 'Gestão de Currículo',
      description: 'Interface organizada para gerenciar currículo',
      icon: BookOpen,
      color: 'red',
      path: '/admin-new/curriculum',
      status: 'ready'
    }
  ];

  const legacyPages = [
    {
      id: 'legacy-admin',
      title: 'Admin Legacy (Todas as páginas)',
      description: 'Acesso a todas as páginas administrativas originais',
      icon: Settings,
      color: 'gray',
      path: '/admin-legacy',
      status: 'legacy'
    },
    {
      id: 'alunos',
      title: 'Módulo Alunos Legacy',
      description: 'Sistema original de gestão de alunos',
      icon: Users,
      color: 'gray',
      path: '/alunos',
      status: 'legacy'
    },
    {
      id: 'professores',
      title: 'Módulo Professores Legacy',
      description: 'Sistema original de gestão de professores',
      icon: GraduationCap,
      color: 'gray',
      path: '/professores',
      status: 'legacy'
    }
  ];

  const PageCard = ({ page }) => {
    const isReady = page.status === 'ready';
    
    return (
      <div className={`bg-white rounded-lg shadow border-2 p-6 hover:shadow-md transition-all ${
        isReady ? 'border-green-200 hover:border-green-300' : 'border-gray-200 hover:border-gray-300'
      }`}>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-lg ${
              isReady ? `bg-${page.color}-100` : 'bg-gray-100'
            }`}>
              <page.icon className={`w-6 h-6 ${
                isReady ? `text-${page.color}-600` : 'text-gray-600'
              }`} />
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 flex items-center">
                {page.title}
                {isReady && (
                  <CheckCircle className="w-4 h-4 text-green-500 ml-2" />
                )}
              </h3>
              <p className="text-sm text-gray-600 mt-1">{page.description}</p>
              
              <div className="mt-2">
                <span className={`text-xs px-2 py-1 rounded ${
                  isReady 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {isReady ? '✅ Nova Estrutura' : '🔄 Legacy'}
                </span>
              </div>
            </div>
          </div>
          
          <Button
            variant={isReady ? 'primary' : 'outline'}
            size="sm"
            onClick={() => navigate(page.path)}
          >
            {isReady ? <ArrowRight className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    );
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto py-12 px-4">
          <div className="text-center">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Acesso Restrito
            </h1>
            <p className="text-gray-600 mb-6">
              Esta página é exclusiva para administradores.
            </p>
            <Button onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Dashboard
            </Button>
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
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Crown className="w-8 h-8 text-red-500 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">
              Bridge - Integração de Estruturas
            </h1>
          </div>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Navegue entre a nova estrutura modernizada e o sistema legacy. 
            As páginas da nova estrutura oferecem melhor performance, 
            design moderno e código organizado.
          </p>
        </div>

        {/* Status da Migração */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <Info className="w-5 h-5 text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold text-blue-900">
              Status da Migração - FASE 4 Completa
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">5/5</div>
              <div className="text-green-700">Páginas Admin</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">100%</div>
              <div className="text-blue-700">Componentes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">100%</div>
              <div className="text-purple-700">Hooks & APIs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">0</div>
              <div className="text-orange-700">Breaking Changes</div>
            </div>
          </div>
        </div>

        {/* Nova Estrutura */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
              <Zap className="w-6 h-6 text-green-500 mr-3" />
              Nova Estrutura (Recomendado)
            </h2>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm text-green-700 font-medium">
                Totalmente Funcional
              </span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newStructurePages.map(page => (
              <PageCard key={page.id} page={page} />
            ))}
          </div>
        </div>

        {/* Estrutura Legacy */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
              <RefreshCw className="w-6 h-6 text-gray-500 mr-3" />
              Estrutura Legacy (Compatibilidade)
            </h2>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              <span className="text-sm text-yellow-700 font-medium">
                Para Transição
              </span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {legacyPages.map(page => (
              <PageCard key={page.id} page={page} />
            ))}
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Ações Rápidas
          </h3>
          <div className="flex flex-wrap gap-4">
            <Button
              variant="primary"
              onClick={() => navigate('/admin-new')}
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              Ir para Nova Estrutura
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/admin-legacy')}
            >
              <Eye className="w-4 h-4 mr-2" />
              Ver Sistema Legacy
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/test-new')}
            >
              <Settings className="w-4 h-4 mr-2" />
              Página de Testes
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Dashboard Principal
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StructureBridge;