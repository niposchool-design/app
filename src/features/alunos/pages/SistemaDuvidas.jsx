import React, { useState, useMemo } from 'react';
import { 
  MessageCircle, Send, Plus, Search, Filter, Clock,
  CheckCircle, AlertCircle, User, BookOpen, ChevronDown,
  ChevronRight, Star, ThumbsUp, Eye, Calendar, Share2, Info
} from 'lucide-react';
import { useDuvidas } from '@/shared/hooks';
import { AdvancedAlunoLayout } from '@/shared/components/layout/AdvancedAlunoLayout';
import { StandardCard, CardGrid, CardSection } from '@/shared/components/cards/StandardCard';

const SistemaDuvidas = () => {
  const [filtros, setFiltros] = useState({
    modulo: 'todos',
    status: 'todas',
    busca: ''
  });
  const [activeTab, setActiveTab] = useState('todas');
  const [duvidaSelecionada, setDuvidaSelecionada] = useState(null);

  // Usar hook personalizado para dados das dúvidas
  const { 
    duvidas, 
    loading, 
    refreshDuvidas
  } = useDuvidas();

  // Aplicar filtros
  const duvidasFiltradas = useMemo(() => {
    let resultado = duvidas;

    // Filtro de módulo
    if (filtros.modulo && filtros.modulo !== 'todos') {
      resultado = resultado?.filter(d => d.modulo === filtros.modulo);
    }

    // Filtro de status
    if (filtros.status && filtros.status !== 'todas') {
      resultado = resultado?.filter(d => d.status === filtros.status);
    }

    // Filtro de busca
    if (filtros.busca.trim()) {
      resultado = resultado?.filter(d => 
        d.titulo?.toLowerCase().includes(filtros.busca.toLowerCase()) ||
        d.conteudo?.toLowerCase().includes(filtros.busca.toLowerCase())
      );
    }

    return resultado;
  }, [duvidas, filtros]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFiltros(prev => ({ ...prev, status: tab }));
  };

  const handleSearch = (term) => {
    setFiltros(prev => ({ ...prev, busca: term }));
  };

  // Stats para o hero
  const statsCards = [
    { icon: MessageCircle, value: duvidas?.length || 0, label: 'Dúvidas', color: 'blue' },
    { icon: CheckCircle, value: duvidas?.filter(d => d.status === 'resolvida')?.length || 0, label: 'Resolvidas', color: 'green' },
    { icon: AlertCircle, value: duvidas?.filter(d => d.status === 'pendente')?.length || 0, label: 'Pendentes', color: 'orange' },
    { icon: Eye, value: duvidas?.filter(d => d.visualizacoes > 0)?.length || 0, label: 'Visualizadas', color: 'purple' }
  ];

  // Tabs de navegação
  const tabs = [
    { id: 'todas', label: 'Todas', icon: MessageCircle, count: duvidas?.length || 0 },
    { id: 'pendente', label: 'Pendentes', icon: AlertCircle, count: duvidas?.filter(d => d.status === 'pendente')?.length || 0 },
    { id: 'resolvida', label: 'Resolvidas', icon: CheckCircle, count: duvidas?.filter(d => d.status === 'resolvida')?.length || 0 },
    { id: 'minhas', label: 'Minhas Dúvidas', icon: User, count: duvidas?.filter(d => d.minha_duvida)?.length || 0 }
  ];

  // Conteúdo do hero
  const heroContent = (
    <div>
      <h3 className="text-xl font-semibold text-white mb-2">
        Sistema de Dúvidas
      </h3>
      <p className="text-blue-100 mb-4">
        Tire suas dúvidas, ajude outros alunos e participe da comunidade de aprendizagem.
      </p>
      
      {/* Busca integrada no hero */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar dúvidas..."
            value={filtros.busca}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/90 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-white/50 focus:border-transparent placeholder-gray-500"
          />
        </div>
        <button className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl transition-colors flex items-center gap-2 font-medium">
          <Plus className="w-5 h-5" />
          Nova Dúvida
        </button>
      </div>
    </div>
  );

  const getStatusIcon = (status) => {
    const icones = {
      'pendente': AlertCircle,
      'resolvida': CheckCircle,
      'em_andamento': Clock
    };
    return icones[status] || MessageCircle;
  };

  return (
    <AdvancedAlunoLayout
      title="Sistema de Dúvidas"
      subtitle="Tire suas dúvidas e participe da comunidade"
      icon={MessageCircle}
      heroContent={heroContent}
      statsCards={statsCards}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={handleTabChange}
      onRefresh={refreshDuvidas}
      loading={loading}
      customTheme="sistema-duvidas"
    >
      {/* Filtros adicionais */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 mb-8 animate-fade-in">
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={filtros.modulo}
            onChange={(e) => setFiltros(prev => ({ ...prev, modulo: e.target.value }))}
            className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="todos">Todos os módulos</option>
            <option value="teoria">Teoria Musical</option>
            <option value="pratica">Prática Instrumental</option>
            <option value="historia">História da Música</option>
            <option value="tecnica">Técnica</option>
          </select>
          
          <select
            value={filtros.status}
            onChange={(e) => setFiltros(prev => ({ ...prev, status: e.target.value }))}
            className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="todas">Todos os status</option>
            <option value="pendente">Pendentes</option>
            <option value="resolvida">Resolvidas</option>
            <option value="em_andamento">Em andamento</option>
          </select>

          <select className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="recent">Mais recentes</option>
            <option value="popular">Mais populares</option>
            <option value="unanswered">Sem resposta</option>
          </select>
        </div>
      </div>

      {/* Conteúdo principal */}
      <CardSection
        title="Dúvidas da Comunidade"
        subtitle={`${duvidasFiltradas?.length || 0} dúvidas encontradas`}
        loading={loading}
        actions={[
          {
            label: 'Nova Dúvida',
            icon: Plus,
            onClick: () => console.log('Criar nova dúvida')
          }
        ]}
        emptyState={
          <div className="text-center py-12 bg-white/50 backdrop-blur-sm rounded-2xl">
            <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhuma dúvida encontrada</h3>
            <p className="text-gray-500">Seja o primeiro a fazer uma pergunta!</p>
            <button className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
              Criar Primeira Dúvida
            </button>
          </div>
        }
      >
        {!loading && duvidasFiltradas && duvidasFiltradas.length > 0 && (
          <CardGrid>
            {duvidasFiltradas.map((duvida, index) => {
              const StatusIcon = getStatusIcon(duvida.status);
              return (
                <StandardCard
                  key={duvida.id || index}
                  title={duvida.titulo || `Dúvida ${index + 1}`}
                  description={duvida.conteudo || duvida.descricao || 'Descrição não disponível'}
                  type="lesson"
                  badge={duvida.modulo || duvida.status}
                  author={duvida.autor_nome || duvida.usuario}
                  date={duvida.data_criacao}
                  actions={[
                    {
                      icon: StatusIcon,
                      label: `Status: ${duvida.status}`,
                      onClick: () => console.log('Ver status', duvida)
                    },
                    {
                      icon: Eye,
                      label: `${duvida.visualizacoes || 0} visualizações`,
                      onClick: () => console.log('Visualizar', duvida)
                    },
                    {
                      icon: ThumbsUp,
                      label: `${duvida.likes || 0} likes`,
                      onClick: () => console.log('Like', duvida)
                    },
                    {
                      icon: Info,
                      label: 'Ver detalhes',
                      onClick: () => setDuvidaSelecionada(duvida)
                    },
                    {
                      icon: Share2,
                      label: 'Compartilhar',
                      onClick: () => console.log('Compartilhar', duvida)
                    }
                  ]}
                  onClick={() => setDuvidaSelecionada(duvida)}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                />
              );
            })}
          </CardGrid>
        )}
      </CardSection>

      {/* Modal de detalhes */}
      {duvidaSelecionada && (
        <ModalDetalhesDuvida
          duvida={duvidaSelecionada}
          onClose={() => setDuvidaSelecionada(null)}
        />
      )}
    </AdvancedAlunoLayout>
  );
};

// Modal de detalhes da dúvida
const ModalDetalhesDuvida = ({ duvida, onClose }) => {
  const StatusIcon = duvida.status === 'resolvida' ? CheckCircle : AlertCircle;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <StatusIcon className={`w-6 h-6 ${duvida.status === 'resolvida' ? 'text-green-500' : 'text-orange-500'}`} />
              <h2 className="text-2xl font-bold text-gray-800">{duvida.titulo}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-6">
            {/* Informações da dúvida */}
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{duvida.autor_nome || 'Usuário'}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{duvida.data_criacao || 'Data não informada'}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{duvida.visualizacoes || 0} visualizações</span>
              </div>
            </div>

            {/* Conteúdo da dúvida */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Descrição</h3>
              <p className="text-gray-700 leading-relaxed">{duvida.conteudo || duvida.descricao}</p>
            </div>

            {/* Status e categoria */}
            <div className="flex gap-4">
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                duvida.status === 'resolvida' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-orange-100 text-orange-800'
              }`}>
                {duvida.status === 'resolvida' ? 'Resolvida' : 'Pendente'}
              </div>
              {duvida.modulo && (
                <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                  {duvida.modulo}
                </div>
              )}
            </div>

            {/* Botões de ação */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                <Send className="w-4 h-4" />
                Responder
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
                <ThumbsUp className="w-4 h-4" />
                Curtir ({duvida.likes || 0})
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
                <Share2 className="w-4 h-4" />
                Compartilhar
              </button>
            </div>

            {/* Seção de respostas (placeholder) */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-semibold text-gray-800 mb-4">Respostas ({duvida.num_respostas || 0})</h3>
              {duvida.status === 'resolvida' ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-green-700 font-medium mb-2">
                    <CheckCircle className="w-5 h-5" />
                    Dúvida Resolvida
                  </div>
                  <p className="text-green-600 text-sm">Esta dúvida foi marcada como resolvida pelo autor.</p>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <MessageCircle className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                  <p>Ainda não há respostas para esta dúvida.</p>
                  <p className="text-sm">Seja o primeiro a ajudar!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SistemaDuvidas;