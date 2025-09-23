import React, { useState, useMemo } from 'react';
import { 
  BookOpen, Users, Music, Heart, Star, Play, Eye, ChevronRight,
  Lightbulb, Target, Clock, Award, Book, ExternalLink, Search,
  Filter, Grid, List, Globe, Calendar, Share2, Info, Download
} from 'lucide-react';
import { useMetodologias } from '@/shared/hooks';
import { AdvancedAlunoLayout } from '@/shared/components/layout/AdvancedAlunoLayout';
import { StandardCard, CardGrid, CardSection } from '@/shared/components/cards/StandardCard';

const MetodologiasEnsino = () => {
  const [filtros, setFiltros] = useState({
    busca: '',
    faixaEtaria: 'todas',
    aplicacao: 'todas',
    origem: 'todas'
  });
  const [activeTab, setActiveTab] = useState('todas');
  const [metodologiaSelecionada, setMetodologiaSelecionada] = useState(null);

  // Usar hook personalizado para dados das metodologias
  const { 
    metodologias, 
    loading, 
    refreshMetodologias
  } = useMetodologias();

  // Aplicar filtros
  const metodologiasFiltradas = useMemo(() => {
    let resultado = metodologias;

    // Filtro de faixa etária
    if (filtros.faixaEtaria && filtros.faixaEtaria !== 'todas') {
      resultado = resultado?.filter(m => m.faixa_etaria === filtros.faixaEtaria);
    }

    // Filtro de aplicação
    if (filtros.aplicacao && filtros.aplicacao !== 'todas') {
      if (filtros.aplicacao === 'aplicadas') {
        resultado = resultado?.filter(m => m.aplicada_escola);
      } else if (filtros.aplicacao === 'nao_aplicadas') {
        resultado = resultado?.filter(m => !m.aplicada_escola);
      }
    }

    // Filtro de origem
    if (filtros.origem && filtros.origem !== 'todas') {
      resultado = resultado?.filter(m => m.origem === filtros.origem);
    }

    // Filtro de busca
    if (filtros.busca.trim()) {
      resultado = resultado?.filter(m => 
        m.nome?.toLowerCase().includes(filtros.busca.toLowerCase()) ||
        m.criador?.toLowerCase().includes(filtros.busca.toLowerCase()) ||
        m.descricao?.toLowerCase().includes(filtros.busca.toLowerCase())
      );
    }

    return resultado;
  }, [metodologias, filtros]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFiltros(prev => ({ ...prev, aplicacao: tab }));
  };

  const handleSearch = (term) => {
    setFiltros(prev => ({ ...prev, busca: term }));
  };

  // Stats para o hero
  const statsCards = [
    { icon: BookOpen, value: metodologias?.length || 0, label: 'Metodologias', color: 'purple' },
    { icon: Target, value: metodologias?.filter(m => m.aplicada_escola)?.length || 0, label: 'Aplicadas', color: 'green' },
    { icon: Globe, value: new Set(metodologias?.map(m => m.origem)).size || 0, label: 'Países', color: 'blue' },
    { icon: Users, value: metodologias?.filter(m => m.faixa_etaria)?.length || 0, label: 'Com Faixa Etária', color: 'orange' }
  ];

  // Tabs de navegação
  const tabs = [
    { id: 'todas', label: 'Todas', icon: BookOpen, count: metodologias?.length || 0 },
    { id: 'aplicadas', label: 'Aplicadas na Escola', icon: Target, count: metodologias?.filter(m => m.aplicada_escola)?.length || 0 },
    { id: 'nao_aplicadas', label: 'Outras Metodologias', icon: Book, count: metodologias?.filter(m => !m.aplicada_escola)?.length || 0 },
    { id: 'infantil', label: 'Educação Infantil', icon: Heart, count: metodologias?.filter(m => m.faixa_etaria?.includes('infantil'))?.length || 0 }
  ];

  // Conteúdo do hero
  const heroContent = (
    <div>
      <h3 className="text-xl font-semibold text-white mb-2">
        Metodologias de Ensino Musical
      </h3>
      <p className="text-purple-100 mb-4">
        Conheça as principais metodologias pedagógicas para o ensino musical e sua aplicação.
      </p>
      
      {/* Busca integrada no hero */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar metodologias..."
          value={filtros.busca}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white/90 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-white/50 focus:border-transparent placeholder-gray-500"
        />
      </div>
    </div>
  );

  const getMetodologiaIcon = (metodologia) => {
    const icones = {
      'suzuki': Music,
      'orff': Users,
      'kodaly': BookOpen,
      'dalcroze': Music,
      'gordon': Lightbulb
    };
    const nomeSimplificado = metodologia.nome?.toLowerCase().split(' ')[0];
    return icones[nomeSimplificado] || BookOpen;
  };

  return (
    <AdvancedAlunoLayout
      title="Metodologias de Ensino"
      subtitle="Descubra as principais abordagens pedagógicas musicais"
      icon={BookOpen}
      heroContent={heroContent}
      statsCards={statsCards}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={handleTabChange}
      onRefresh={refreshMetodologias}
      loading={loading}
      customTheme="metodologias-ensino"
    >
      {/* Filtros adicionais */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 mb-8 animate-fade-in">
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={filtros.faixaEtaria}
            onChange={(e) => setFiltros(prev => ({ ...prev, faixaEtaria: e.target.value }))}
            className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="todas">Todas as idades</option>
            <option value="infantil">Educação Infantil</option>
            <option value="fundamental">Ensino Fundamental</option>
            <option value="adulto">Adultos</option>
            <option value="todas_idades">Todas as Idades</option>
          </select>
          
          <select
            value={filtros.origem}
            onChange={(e) => setFiltros(prev => ({ ...prev, origem: e.target.value }))}
            className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="todas">Todos os países</option>
            <option value="Japão">Japão</option>
            <option value="Alemanha">Alemanha</option>
            <option value="Hungria">Hungria</option>
            <option value="Suíça">Suíça</option>
            <option value="Estados Unidos">Estados Unidos</option>
            <option value="Reino Unido">Reino Unido</option>
          </select>

          <select className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent">
            <option value="alphabetical">Ordem Alfabética</option>
            <option value="chronological">Ordem Cronológica</option>
            <option value="popularity">Popularidade</option>
            <option value="applied">Aplicadas Primeiro</option>
          </select>
        </div>
      </div>

      {/* Conteúdo principal */}
      <CardSection
        title="Metodologias Disponíveis"
        subtitle={`${metodologiasFiltradas?.length || 0} metodologias encontradas`}
        loading={loading}
        emptyState={
          <div className="text-center py-12 bg-white/50 backdrop-blur-sm rounded-2xl">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhuma metodologia encontrada</h3>
            <p className="text-gray-500">Tente ajustar os filtros ou fazer uma nova busca.</p>
          </div>
        }
      >
        {!loading && metodologiasFiltradas && metodologiasFiltradas.length > 0 && (
          <CardGrid>
            {metodologiasFiltradas.map((metodologia, index) => {
              const MetodologiaIcon = getMetodologiaIcon(metodologia);
              return (
                <StandardCard
                  key={metodologia.id || index}
                  title={metodologia.nome || `Metodologia ${index + 1}`}
                  description={metodologia.descricao || metodologia.resumo || `Criada por ${metodologia.criador || 'Autor desconhecido'}`}
                  type="lesson"
                  badge={metodologia.aplicada_escola ? 'Aplicada na Escola' : metodologia.origem}
                  author={metodologia.criador}
                  difficulty={metodologia.faixa_etaria}
                  actions={[
                    {
                      icon: MetodologiaIcon,
                      label: 'Metodologia',
                      onClick: () => console.log('Ver metodologia', metodologia)
                    },
                    {
                      icon: metodologia.aplicada_escola ? Target : Globe,
                      label: metodologia.aplicada_escola ? 'Aplicada na escola' : metodologia.origem,
                      onClick: () => console.log('Ver aplicação', metodologia)
                    },
                    {
                      icon: Users,
                      label: metodologia.faixa_etaria || 'Faixa etária',
                      onClick: () => console.log('Ver faixa etária', metodologia)
                    },
                    {
                      icon: Info,
                      label: 'Ver detalhes',
                      onClick: () => setMetodologiaSelecionada(metodologia)
                    },
                    {
                      icon: Heart,
                      label: 'Favoritar',
                      onClick: () => console.log('Favoritar', metodologia)
                    },
                    {
                      icon: Share2,
                      label: 'Compartilhar',
                      onClick: () => console.log('Compartilhar', metodologia)
                    }
                  ]}
                  onClick={() => setMetodologiaSelecionada(metodologia)}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                />
              );
            })}
          </CardGrid>
        )}
      </CardSection>

      {/* Modal de detalhes */}
      {metodologiaSelecionada && (
        <ModalDetalhesMetodologia
          metodologia={metodologiaSelecionada}
          onClose={() => setMetodologiaSelecionada(null)}
        />
      )}
    </AdvancedAlunoLayout>
  );
};

// Modal de detalhes da metodologia
const ModalDetalhesMetodologia = ({ metodologia, onClose }) => {
  const MetodologiaIcon = metodologia.nome?.toLowerCase().includes('suzuki') ? Music : BookOpen;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MetodologiaIcon className="w-8 h-8 text-purple-500" />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{metodologia.nome}</h2>
                <p className="text-gray-600">Por {metodologia.criador}</p>
              </div>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Informações principais */}
            <div className="md:col-span-2 space-y-6">
              {/* Descrição */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Descrição</h3>
                <p className="text-gray-700 leading-relaxed">
                  {metodologia.descricao || metodologia.resumo || 'Descrição não disponível para esta metodologia.'}
                </p>
              </div>

              {/* Princípios fundamentais */}
              {metodologia.principios_fundamentais && (
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Princípios Fundamentais</h3>
                  <p className="text-gray-700 leading-relaxed">{metodologia.principios_fundamentais}</p>
                </div>
              )}

              {/* Aplicação prática */}
              {metodologia.aplicacao_pratica && (
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Aplicação Prática</h3>
                  <p className="text-gray-700 leading-relaxed">{metodologia.aplicacao_pratica}</p>
                </div>
              )}

              {/* Vantagens e limitações */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {metodologia.vantagens && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-medium text-green-800 mb-2">Vantagens</h4>
                    <p className="text-green-700 text-sm">{metodologia.vantagens}</p>
                  </div>
                )}
                
                {metodologia.limitacoes && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <h4 className="font-medium text-amber-800 mb-2">Limitações</h4>
                    <p className="text-amber-700 text-sm">{metodologia.limitacoes}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar com informações */}
            <div className="space-y-4">
              {/* Status na escola */}
              <div className={`p-4 rounded-lg border ${
                metodologia.aplicada_escola 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <Target className={`w-5 h-5 ${metodologia.aplicada_escola ? 'text-green-600' : 'text-gray-400'}`} />
                  <span className={`font-medium ${metodologia.aplicada_escola ? 'text-green-800' : 'text-gray-600'}`}>
                    Status na Escola
                  </span>
                </div>
                <p className={`text-sm ${metodologia.aplicada_escola ? 'text-green-700' : 'text-gray-600'}`}>
                  {metodologia.aplicada_escola ? 'Aplicada atualmente' : 'Não aplicada'}
                </p>
              </div>

              {/* Informações básicas */}
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">Origem</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Globe className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-800">{metodologia.origem || 'Não informado'}</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Faixa Etária</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-800">{metodologia.faixa_etaria || 'Não especificada'}</span>
                  </div>
                </div>

                {metodologia.data_criacao && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Criação</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-800">{metodologia.data_criacao}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Botões de ação */}
              <div className="space-y-2 pt-4 border-t border-gray-200">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors">
                  <ExternalLink className="w-4 h-4" />
                  Saiba Mais
                </button>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
                  <Download className="w-4 h-4" />
                  Material de Apoio
                </button>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
                  <Share2 className="w-4 h-4" />
                  Compartilhar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetodologiasEnsino;