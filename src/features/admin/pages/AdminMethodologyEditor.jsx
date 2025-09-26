import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  BookOpen, 
  Clock, 
  Users, 
  Globe,
  AlertCircle
} from 'lucide-react';
import NipoHeader from '../../../shared/components/UI/NipoHeader';

const AdminMethodologyEditor = () => {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [methodology, setMethodology] = useState(null);
  const [editData, setEditData] = useState({
    title: '',
    subtitle: '',
    description: '',
    keyFeatures: [],
    targetAudience: '',
    duration: '',
    difficulty: '',
    status: 'published'
  });

  // Removido o mapeamento desnecessário - admin não navega para área do aluno

  useEffect(() => {
    // Simular carregamento dos dados
    const mockData = {
      1: {
        title: 'Orff Schulwerk',
        subtitle: 'Música Elementar através do Movimento',
        description: 'Metodologia alemã baseada em movimento, ritmo e improvisação usando instrumentos de percussão.',
        keyFeatures: [
          'Educação musical elementar',
          'Integração música-movimento-linguagem', 
          'Instrumentarium Orff',
          'Improvisação e criatividade'
        ],
        targetAudience: 'Crianças pequenas até adultos',
        duration: '4-6 semanas de estudo',
        difficulty: 'Fundamental',
        status: 'published'
      },
      2: {
        title: 'Método Suzuki',
        subtitle: 'Educação do Talento pela Língua Materna',
        description: 'Abordagem japonesa que ensina música da mesma forma que as crianças aprendem sua língua materna.',
        keyFeatures: [
          'Aprendizagem pela escuta',
          'Envolvimento dos pais',
          'Início precoce',
          'Repertório padronizado'
        ],
        targetAudience: 'Crianças pequenas até adultos',
        duration: '6-8 semanas de estudo',
        difficulty: 'Fundamental a Avançado',
        status: 'published'
      }
    };

    setTimeout(() => {
      const data = mockData[parseInt(chapterId)];
      if (data) {
        setMethodology(data);
        setEditData(data);
      }
      setLoading(false);
    }, 500);
  }, [chapterId]);

  const handleSave = () => {
    // Aqui seria implementada a lógica de salvamento
    console.log('Salvando dados:', editData);
    alert('Dados salvos com sucesso! (simulação)');
  };

  const handlePreview = () => {
    // Preview administrativo, não navegação para área do aluno
    alert('Preview administrativo será implementado aqui - versão para revisão do admin.');
    // TODO: Implementar preview administrativo próprio
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando editor...</p>
        </div>
      </div>
    );
  }

  if (!methodology) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">Metodologia não encontrada ou não editável</p>
          <button 
            onClick={() => navigate('/admin/curriculum')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Voltar ao Currículo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <NipoHeader />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Cabeçalho */}
        <div className="mb-8">
          <button 
            onClick={() => navigate('/admin/curriculum')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Currículo Admin
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Editar Metodologia - Capítulo {chapterId}
              </h1>
              <p className="text-gray-600 mt-1">
                Gerenciar informações da metodologia
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={handlePreview}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Eye className="w-4 h-4" />
                Visualizar
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                Salvar
              </button>
            </div>
          </div>
        </div>

        {/* Formulário de Edição */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="space-y-6">
            {/* Título */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título da Metodologia
              </label>
              <input
                type="text"
                value={editData.title}
                onChange={(e) => setEditData({...editData, title: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nome da metodologia"
              />
            </div>

            {/* Subtítulo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subtítulo
              </label>
              <input
                type="text"
                value={editData.subtitle}
                onChange={(e) => setEditData({...editData, subtitle: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Descrição breve da abordagem"
              />
            </div>

            {/* Descrição */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição
              </label>
              <textarea
                value={editData.description}
                onChange={(e) => setEditData({...editData, description: e.target.value})}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Descrição detalhada da metodologia"
              />
            </div>

            {/* Grade de Informações */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Público-alvo
                </label>
                <input
                  type="text"
                  value={editData.targetAudience}
                  onChange={(e) => setEditData({...editData, targetAudience: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duração
                </label>
                <input
                  type="text"
                  value={editData.duration}
                  onChange={(e) => setEditData({...editData, duration: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dificuldade
                </label>
                <select
                  value={editData.difficulty}
                  onChange={(e) => setEditData({...editData, difficulty: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Fundamental">Fundamental</option>
                  <option value="Intermediário">Intermediário</option>
                  <option value="Avançado">Avançado</option>
                  <option value="Fundamental a Avançado">Fundamental a Avançado</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={editData.status}
                  onChange={(e) => setEditData({...editData, status: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="published">Publicado</option>
                  <option value="draft">Rascunho</option>
                  <option value="locked">Bloqueado</option>
                </select>
              </div>
            </div>

            {/* Características Principais */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Características Principais
              </label>
              <div className="space-y-2">
                {editData.keyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => {
                        const newFeatures = [...editData.keyFeatures];
                        newFeatures[index] = e.target.value;
                        setEditData({...editData, keyFeatures: newFeatures});
                      }}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={() => {
                        const newFeatures = editData.keyFeatures.filter((_, i) => i !== index);
                        setEditData({...editData, keyFeatures: newFeatures});
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    setEditData({
                      ...editData, 
                      keyFeatures: [...editData.keyFeatures, '']
                    });
                  }}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  + Adicionar Característica
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMethodologyEditor;