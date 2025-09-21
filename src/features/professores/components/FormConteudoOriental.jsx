import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../../shared/contexts/AuthContext';
import { professoresService } from '../services/professoresService';
import { OrientalForm, OrientalInput } from '../../../shared/components/oriental/OrientalAdvanced';
import {
  Eye,
  Save,
  X,
  Upload,
  Image,
  Video,
  FileText,
  Tag,
  Settings,
  AlertCircle,
  CheckCircle,
  Loader
} from 'lucide-react';

const FormConteudoOriental = ({ conteudoParaEditar = null, onSalvar, onCancelar }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [preview, setPreview] = useState(false);
  
  // Estado do formulário
  const [formData, setFormData] = useState({
    titulo: '',
    tipo: 'sacada',
    categoria_id: '', 
    descricao: '',
    conteudo: '',
    url_video: '',
    tags: '',
    nivel: 'iniciante',
    visivel: true,
    destaque: false
  });

  // Estado para uploads
  const [arquivos, setArquivos] = useState({
    arquivo_principal: null,
    imagem_capa: null
  });

  const [errors, setErrors] = useState({});

  // Carregar categorias
  const carregarCategorias = useCallback(async () => {
    try {
      console.log('🔍 Carregando categorias...');
      const response = await professoresService.getCategorias();
      console.log('📦 Categorias carregadas:', response);
      setCategorias(response || []);
    } catch (error) {
      console.error('❌ Erro ao carregar categorias:', error);
      setCategorias([]);
    }
  }, []);

  // Carregar dados do conteúdo para edição
  const carregarConteudo = useCallback(async () => {
    if (!conteudoParaEditar?.id) return;

    try {
      setLoading(true);
      const conteudo = await professoresService.getConteudo(conteudoParaEditar.id);
      
      if (conteudo) {
        setFormData({
          titulo: conteudo.titulo || '',
          tipo: conteudo.tipo || 'sacada',
          categoria_id: conteudo.categoria_id || '',
          descricao: conteudo.descricao || '',
          conteudo: conteudo.conteudo || '',
          url_video: conteudo.url_video || '',
          tags: conteudo.tags || '',
          nivel: conteudo.nivel || 'iniciante',
          visivel: conteudo.visivel ?? true,
          destaque: conteudo.destaque ?? false
        });
      }
    } catch (error) {
      console.error('❌ Erro ao carregar conteúdo:', error);
    } finally {
      setLoading(false);
    }
  }, [conteudoParaEditar]);

  useEffect(() => {
    carregarCategorias();
    carregarConteudo();
  }, [carregarCategorias, carregarConteudo]);

  // Função para atualizar campo do formulário
  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Validação do formulário
  const validarFormulario = () => {
    const newErrors = {};

    if (!formData.titulo.trim()) {
      newErrors.titulo = 'Título é obrigatório';
    }

    if (!formData.categoria_id) {
      newErrors.categoria_id = 'Categoria é obrigatória';
    }

    if (!formData.descricao.trim()) {
      newErrors.descricao = 'Descrição é obrigatória';
    }

    if (!formData.conteudo.trim()) {
      newErrors.conteudo = 'Conteúdo é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submissão do formulário
  const handleSubmit = async (formDataToSubmit) => {
    if (!validarFormulario()) return;

    try {
      setLoading(true);

      const dadosParaEnviar = new FormData();
      
      // Adicionar campos de texto
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== '') {
          dadosParaEnviar.append(key, formData[key]);
        }
      });

      // Adicionar arquivos
      if (arquivos.arquivo_principal) {
        dadosParaEnviar.append('arquivo_principal', arquivos.arquivo_principal);
      }
      if (arquivos.imagem_capa) {
        dadosParaEnviar.append('imagem_capa', arquivos.imagem_capa);
      }

      let response;
      if (conteudoParaEditar?.id) {
        response = await professoresService.updateConteudo(conteudoParaEditar.id, dadosParaEnviar);
      } else {
        response = await professoresService.createConteudo(dadosParaEnviar);
      }

      if (onSalvar) {
        await onSalvar(response);
      }

    } catch (error) {
      console.error('❌ Erro ao salvar conteúdo:', error);
      setErrors({ 
        submit: 'Erro ao salvar conteúdo. Tente novamente.' 
      });
    } finally {
      setLoading(false);
    }
  };

  // Manipular upload de arquivos
  const handleFileChange = (tipo, file) => {
    setArquivos(prev => ({ ...prev, [tipo]: file }));
  };

  // Campos do formulário Oriental
  const campos = [
    {
      name: 'titulo',
      label: 'Título do Conteúdo',
      type: 'text',
      value: formData.titulo,
      onChange: (value) => updateField('titulo', value),
      placeholder: 'Ex: Como tocar acordes básicos',
      required: true,
      error: errors.titulo,
      icon: <FileText className="w-5 h-5" />
    },
    {
      name: 'tipo',
      label: 'Tipo de Conteúdo',
      type: 'select',
      value: formData.tipo,
      onChange: (value) => updateField('tipo', value),
      options: [
        { value: 'sacada', label: '💡 Sacada' },
        { value: 'video', label: '🎥 Vídeo' },
        { value: 'exercicio', label: '📝 Exercício' },
        { value: 'partitura', label: '🎵 Partitura' },
        { value: 'teoria', label: '📚 Teoria' },
        { value: 'tecnica', label: '⚡ Técnica' }
      ],
      required: true,
      error: errors.tipo,
      icon: <Tag className="w-5 h-5" />
    },
    {
      name: 'categoria_id',
      label: 'Categoria',
      type: 'select',
      value: formData.categoria_id,
      onChange: (value) => updateField('categoria_id', value),
      options: categorias.map(cat => ({
        value: cat.id,
        label: cat.nome
      })),
      required: true,
      error: errors.categoria_id,
      placeholder: 'Selecione uma categoria',
      icon: <Settings className="w-5 h-5" />
    },
    {
      name: 'nivel',
      label: 'Nível de Dificuldade',
      type: 'select',
      value: formData.nivel,
      onChange: (value) => updateField('nivel', value),
      options: [
        { value: 'iniciante', label: '🌱 Iniciante' },
        { value: 'intermediario', label: '🌿 Intermediário' },
        { value: 'avancado', label: '🌳 Avançado' },
        { value: 'expert', label: '🎯 Expert' }
      ],
      required: true,
      error: errors.nivel,
      icon: <Tag className="w-5 h-5" />
    },
    {
      name: 'descricao',
      label: 'Descrição',
      type: 'textarea',
      value: formData.descricao,
      onChange: (value) => updateField('descricao', value),
      placeholder: 'Descreva brevemente o conteúdo...',
      required: true,
      error: errors.descricao,
      rows: 3
    },
    {
      name: 'conteudo',
      label: 'Conteúdo Principal',
      type: 'textarea',
      value: formData.conteudo,
      onChange: (value) => updateField('conteudo', value),
      placeholder: 'Digite o conteúdo completo aqui...',
      required: true,
      error: errors.conteudo,
      rows: 6
    },
    {
      name: 'url_video',
      label: 'URL do Vídeo (opcional)',
      type: 'url',
      value: formData.url_video,
      onChange: (value) => updateField('url_video', value),
      placeholder: 'https://youtube.com/watch?v=...',
      error: errors.url_video,
      icon: <Video className="w-5 h-5" />
    },
    {
      name: 'tags',
      label: 'Tags (separadas por vírgula)',
      type: 'text',
      value: formData.tags,
      onChange: (value) => updateField('tags', value),
      placeholder: 'violão, acordes, iniciante, música',
      error: errors.tags,
      icon: <Tag className="w-5 h-5" />
    }
  ];

  // Ações do formulário
  const acoes = [
    {
      label: 'Cancelar',
      type: 'secondary',
      onClick: onCancelar,
      icon: <X className="w-4 h-4" />
    },
    {
      label: preview ? 'Voltar à Edição' : 'Visualizar',
      type: 'tertiary',
      onClick: () => setPreview(!preview),
      icon: <Eye className="w-4 h-4" />
    },
    {
      label: conteudoParaEditar ? 'Atualizar Conteúdo' : 'Salvar Conteúdo',
      type: 'primary',
      onClick: handleSubmit,
      loading: loading,
      icon: <Save className="w-4 h-4" />
    }
  ];

  if (preview) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-pink-50 to-red-50 rounded-2xl p-8 shadow-lg border-2 border-pink-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              📖 Prévia do Conteúdo
            </h2>
            <button
              onClick={() => setPreview(false)}
              className="
                px-4 py-2 bg-white border-2 border-pink-300 
                text-pink-600 rounded-xl hover:bg-pink-50
                transition-all duration-200 hover:scale-105
                flex items-center gap-2
              "
            >
              <X className="w-4 h-4" />
              Fechar Prévia
            </button>
          </div>
          
          <article className="prose prose-pink max-w-none">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {formData.titulo || 'Título do Conteúdo'}
            </h1>
            
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">
                {formData.tipo}
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                {formData.nivel}
              </span>
            </div>
            
            <div className="bg-white rounded-xl p-6 mb-6 border border-pink-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                📝 Descrição
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {formData.descricao || 'Descrição do conteúdo...'}
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-pink-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                📖 Conteúdo Principal
              </h3>
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {formData.conteudo || 'Conteúdo principal...'}
              </div>
            </div>
            
            {formData.url_video && (
              <div className="bg-white rounded-xl p-6 mt-6 border border-pink-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  🎥 Vídeo
                </h3>
                <a 
                  href={formData.url_video} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-pink-600 hover:text-pink-700 underline"
                >
                  {formData.url_video}
                </a>
              </div>
            )}
            
            {formData.tags && (
              <div className="bg-white rounded-xl p-6 mt-6 border border-pink-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  🏷️ Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.split(',').map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm"
                    >
                      #{tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Upload de Arquivos */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upload de Imagem de Capa */}
        <div className="bg-gradient-to-br from-pink-50 to-red-50 rounded-2xl p-6 border-2 border-pink-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Image className="w-5 h-5 text-pink-600" />
            Imagem de Capa
          </h3>
          <div className="border-2 border-dashed border-pink-300 rounded-xl p-6 text-center">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange('imagem_capa', e.target.files[0])}
              className="hidden"
              id="imagem-capa"
            />
            <label htmlFor="imagem-capa" className="cursor-pointer">
              <Upload className="w-8 h-8 text-pink-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">
                Clique para selecionar uma imagem
              </p>
              {arquivos.imagem_capa && (
                <p className="text-sm text-pink-600 mt-2 font-medium">
                  ✓ {arquivos.imagem_capa.name}
                </p>
              )}
            </label>
          </div>
        </div>

        {/* Upload de Arquivo Principal */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-600" />
            Arquivo Principal
          </h3>
          <div className="border-2 border-dashed border-purple-300 rounded-xl p-6 text-center">
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={(e) => handleFileChange('arquivo_principal', e.target.files[0])}
              className="hidden"
              id="arquivo-principal"
            />
            <label htmlFor="arquivo-principal" className="cursor-pointer">
              <Upload className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">
                PDF, DOC, TXT
              </p>
              {arquivos.arquivo_principal && (
                <p className="text-sm text-purple-600 mt-2 font-medium">
                  ✓ {arquivos.arquivo_principal.name}
                </p>
              )}
            </label>
          </div>
        </div>
      </div>

      {/* Formulário Oriental */}
      <OrientalForm
        title={conteudoParaEditar ? 'Editar Conteúdo' : 'Novo Conteúdo'}
        subtitle="Crie conteúdos pedagógicos de qualidade para seus alunos"
        level="teacher"
        campos={campos}
        acoes={acoes}
        loading={loading}
        errors={errors}
      />

      {/* Opções Adicionais */}
      <div className="mt-8 bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-6 border-2 border-green-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5 text-green-600" />
          Configurações de Publicação
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.visivel}
              onChange={(e) => updateField('visivel', e.target.checked)}
              className="
                w-5 h-5 text-green-600 bg-white border-2 border-green-300 
                rounded focus:ring-green-500 focus:ring-2
              "
            />
            <span className="text-gray-700 font-medium">
              👁️ Conteúdo visível para alunos
            </span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.destaque}
              onChange={(e) => updateField('destaque', e.target.checked)}
              className="
                w-5 h-5 text-pink-600 bg-white border-2 border-pink-300 
                rounded focus:ring-pink-500 focus:ring-2
              "
            />
            <span className="text-gray-700 font-medium">
              ⭐ Destacar conteúdo
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default FormConteudoOriental;