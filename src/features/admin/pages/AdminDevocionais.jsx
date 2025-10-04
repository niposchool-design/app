import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Calendar, Eye, Trash2, Star, Users, Book, Target, Search, Filter } from 'lucide-react';
import NipoHeader from '../../../shared/components/UI/NipoHeader';
import { NipoSection, NipoButton } from '../../../shared/components/UI/NipoUI';
import { useDevotionals } from '../../devocional/hooks/useDevotionals';
import { useAuth } from '../../../contexts/working-auth-context';
import { supabase } from '../../../shared/lib/supabase/supabaseClient';

const AdminDevocionais = () => {
  const { devotionals, loading, refreshDevotionals } = useDevotionals();
  const { userProfile } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedDevotional, setSelectedDevotional] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    drafts: 0,
    totalReads: 0,
    favorites: 0
  });

  // Dados do formulário de criação/edição
  const [formData, setFormData] = useState({
    title: '',
    bible_verse: '',
    bible_reference: '',
    content: '',
    reflection: '',
    prayer: '',
    music_theme: '',
    music_content: '',
    category: 'inspiracao',
    published_date: new Date().toISOString().split('T')[0],
    is_active: true
  });

  useEffect(() => {
    if (devotionals.length > 0) {
      calculateStats();
    }
  }, [devotionals, calculateStats]);

  const calculateStats = useCallback(async () => {
    try {
      // Contar total de leituras e favoritos
      const { data: readStats } = await supabase
        .from('user_devotional_progress')
        .select('devotional_id, is_read, is_favorite');

      const totalReads = readStats?.filter(r => r.is_read).length || 0;
      const favorites = readStats?.filter(r => r.is_favorite).length || 0;

      setStats({
        total: devotionals.length,
        published: devotionals.filter(d => d.is_active).length,
        drafts: devotionals.filter(d => !d.is_active).length,
        totalReads,
        favorites
      });
    } catch (error) {
      console.error('Erro ao calcular estatísticas:', error);
    }
  }, [devotionals]);

  const handleCreateDevotional = async () => {
    try {
      const { error } = await supabase
        .from('devotional_content')
        .insert([{
          ...formData,
          created_by: userProfile.id
        }]);

      if (error) throw error;

      setShowCreateModal(false);
      setFormData({
        title: '',
        bible_verse: '',
        bible_reference: '',
        content: '',
        reflection: '',
        prayer: '',
        music_theme: '',
        music_content: '',
        category: 'inspiracao',
        published_date: new Date().toISOString().split('T')[0],
        is_active: true
      });
      refreshDevotionals();
    } catch (error) {
      console.error('Erro ao criar devocional:', error);
    }
  };

  const handleDeleteDevotional = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este devocional?')) {
      try {
        const { error } = await supabase
          .from('devotional_content')
          .delete()
          .eq('id', id);

        if (error) throw error;
        refreshDevotionals();
      } catch (error) {
        console.error('Erro ao excluir devocional:', error);
      }
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const { error } = await supabase
        .from('devotional_content')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      refreshDevotionals();
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  const filteredDevotionals = devotionals.filter(devotional => {
    const matchesSearch = devotional.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         devotional.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || devotional.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { value: 'all', label: 'Todas as Categorias' },
    { value: 'inspiracao', label: 'Inspiração' },
    { value: 'gratidao', label: 'Gratidão' },
    { value: 'perseveranca', label: 'Perseverança' },
    { value: 'humildade', label: 'Humildade' },
    { value: 'servico', label: 'Serviço' },
    { value: 'fe', label: 'Fé' },
    { value: 'musica', label: 'Música' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50">
      <NipoHeader 
        title="Gestão de Devocionais" 
        subtitle="Administre os devocionais semanais da plataforma"
        icon={Book}
      />

      {/* Cards de Estatísticas */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2">
              <Book className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
                <p className="text-xs text-gray-600">Total</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold text-green-600">{stats.published}</p>
                <p className="text-xs text-gray-600">Publicados</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-2xl font-bold text-orange-600">{stats.drafts}</p>
                <p className="text-xs text-gray-600">Rascunhos</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-2xl font-bold text-purple-600">{stats.totalReads}</p>
                <p className="text-xs text-gray-600">Leituras</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold text-yellow-600">{stats.favorites}</p>
                <p className="text-xs text-gray-600">Favoritos</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros e Busca */}
        <NipoSection>
          <div className="bg-white rounded-lg p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Busca */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar devocionais..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              {/* Filtro por categoria */}
              <div className="relative">
                <Filter className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="pl-9 pr-8 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Botão Novo Devocional */}
              <NipoButton 
                variant="primary" 
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2 whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                Novo Devocional
              </NipoButton>
            </div>
          </div>
        </NipoSection>

        {/* Lista de Devocionais */}
        <NipoSection>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Título
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Categoria
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredDevotionals.map((devotional) => (
                    <tr key={devotional.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {devotional.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {devotional.bible_reference}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                          {devotional.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {new Date(devotional.published_date).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleToggleStatus(devotional.id, devotional.is_active)}
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            devotional.is_active
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {devotional.is_active ? 'Publicado' : 'Rascunho'}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedDevotional(devotional)}
                            className="text-indigo-600 hover:text-indigo-900 flex items-center gap-1"
                          >
                            <Eye className="w-4 h-4" />
                            Ver
                          </button>
                          <button
                            onClick={() => handleDeleteDevotional(devotional.id)}
                            className="text-red-600 hover:text-red-900 flex items-center gap-1"
                          >
                            <Trash2 className="w-4 h-4" />
                            Excluir
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredDevotionals.length === 0 && (
              <div className="text-center py-12">
                <Book className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Nenhum devocional encontrado</p>
              </div>
            )}
          </div>
        </NipoSection>
      </div>

      {/* Modal de Criação */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Novo Devocional</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Título do devocional"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Versículo Bíblico *
                  </label>
                  <textarea
                    value={formData.bible_verse}
                    onChange={(e) => setFormData({...formData, bible_verse: e.target.value})}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Texto do versículo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Referência *
                  </label>
                  <input
                    type="text"
                    value={formData.bible_reference}
                    onChange={(e) => setFormData({...formData, bible_reference: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Ex: João 3:16"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Conteúdo Principal *
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Conteúdo do devocional"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reflexão
                  </label>
                  <textarea
                    value={formData.reflection}
                    onChange={(e) => setFormData({...formData, reflection: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Pergunta ou reflexão para o dia"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Oração
                  </label>
                  <textarea
                    value={formData.prayer}
                    onChange={(e) => setFormData({...formData, prayer: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Oração relacionada ao tema"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tema Musical
                  </label>
                  <input
                    type="text"
                    value={formData.music_theme}
                    onChange={(e) => setFormData({...formData, music_theme: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Título do tema musical"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Categoria
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    {categories.slice(1).map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Conteúdo Musical
                </label>
                <textarea
                  value={formData.music_content}
                  onChange={(e) => setFormData({...formData, music_content: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Sugestão de atividade musical"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data de Publicação
                  </label>
                  <input
                    type="date"
                    value={formData.published_date}
                    onChange={(e) => setFormData({...formData, published_date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                <div className="flex items-center mt-6">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                    className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
                  />
                  <label htmlFor="is_active" className="ml-2 text-sm font-medium text-gray-700">
                    Publicar imediatamente
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <NipoButton
                variant="outline"
                onClick={() => setShowCreateModal(false)}
              >
                Cancelar
              </NipoButton>
              <NipoButton
                variant="primary"
                onClick={handleCreateDevotional}
                disabled={!formData.title || !formData.bible_verse || !formData.content}
              >
                Criar Devocional
              </NipoButton>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Visualização */}
      {selectedDevotional && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">{selectedDevotional.title}</h2>
              <button
                onClick={() => setSelectedDevotional(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="italic text-lg text-center mb-2">
                  "{selectedDevotional.bible_verse}"
                </p>
                <p className="text-center font-medium text-red-600">
                  {selectedDevotional.bible_reference}
                </p>
              </div>

              <div className="prose prose-gray max-w-none">
                {selectedDevotional.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>

              {selectedDevotional.music_theme && (
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-bold text-purple-800 mb-2">
                    🎵 {selectedDevotional.music_theme}
                  </h3>
                  <p className="text-gray-700">{selectedDevotional.music_content}</p>
                </div>
              )}

              {selectedDevotional.reflection && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-bold text-green-800 mb-2">💭 Reflexão</h3>
                  <p className="italic text-gray-700">{selectedDevotional.reflection}</p>
                </div>
              )}

              {selectedDevotional.prayer && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-bold text-blue-800 mb-2">🙏 Oração</h3>
                  <p className="text-gray-700">{selectedDevotional.prayer}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDevocionais;