import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Save, X, Plus, Trash2, Calendar, DollarSign,
  Package, FileText, AlertCircle, CheckCircle, Upload,
  Settings, Star, Target, Music
} from 'lucide-react';
import NipoHeader from '@/shared/components/UI/NipoHeader';
import { supabase } from '@/shared/lib/supabase';

const AdminInstrumentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  // Estados do formulário
  const [formData, setFormData] = useState({
    nome: '',
    categoria: '',
    marca: '',
    modelo: '',
    numero_serie: '',
    descricao: '',
    observacoes: '',
    valor: '',
    ano_fabricacao: '',
    estado_conservacao: 'novo',
    localizacao: '',
    data_aquisicao: '',
    ativo: true,
    disponivel: true,
    status: 'disponivel'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Opções para os selects
  const categorias = [
    { id: 'corda', nome: 'Instrumentos de Corda' },
    { id: 'sopro', nome: 'Instrumentos de Sopro' },
    { id: 'percussao', nome: 'Instrumentos de Percussão' },
    { id: 'teclado', nome: 'Instrumentos de Teclado' },
    { id: 'vocal', nome: 'Técnica Vocal' },
    { id: 'teoria', nome: 'Teoria Musical' },
    { id: 'outros', nome: 'Outros Instrumentos' }
  ];

  const estadosConservacao = [
    { value: 'novo', label: 'Novo' },
    { value: 'excelente', label: 'Excelente' },
    { value: 'bom', label: 'Bom' },
    { value: 'regular', label: 'Regular' },
    { value: 'ruim', label: 'Ruim' },
    { value: 'pecas', label: 'Para Peças' }
  ];

  const statusOptions = [
    { value: 'disponivel', label: 'Disponível' },
    { value: 'em_uso', label: 'Em Uso' },
    { value: 'manutencao', label: 'Manutenção' },
    { value: 'emprestado', label: 'Emprestado' },
    { value: 'danificado', label: 'Danificado' }
  ];

  // Carregar dados do instrumento se estiver editando
  useEffect(() => {
    if (isEditing) {
      fetchInstrumento();
    }
  }, [id, isEditing]);

  const fetchInstrumento = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('instrumentos')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (!data) throw new Error('Instrumento não encontrado');

      // Preencher o formulário com os dados existentes
      setFormData({
        nome: data.nome || '',
        categoria: data.categoria || '',
        marca: data.marca || '',
        modelo: data.modelo || '',
        numero_serie: data.numero_serie || '',
        descricao: data.descricao || '',
        observacoes: data.observacoes || '',
        valor: data.valor || '',
        ano_fabricacao: data.ano_fabricacao || '',
        estado_conservacao: data.estado_conservacao || 'novo',
        localizacao: data.localizacao || '',
        data_aquisicao: data.data_aquisicao ? data.data_aquisicao.split('T')[0] : '',
        ativo: data.ativo !== false,
        disponivel: data.disponivel !== false,
        status: data.status || 'disponivel'
      });

    } catch (err) {
      console.error('Erro ao carregar instrumento:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Limpar mensagens quando o usuário começar a digitar
    if (error) setError(null);
    if (successMessage) setSuccessMessage(null);
  };

  const validateForm = () => {
    const errors = [];

    if (!formData.nome.trim()) {
      errors.push('Nome é obrigatório');
    }

    if (!formData.categoria) {
      errors.push('Categoria é obrigatória');
    }

    if (formData.valor && isNaN(parseFloat(formData.valor))) {
      errors.push('Valor deve ser um número válido');
    }

    if (formData.ano_fabricacao && (isNaN(parseInt(formData.ano_fabricacao)) || formData.ano_fabricacao < 1800 || formData.ano_fabricacao > new Date().getFullYear())) {
      errors.push('Ano de fabricação deve ser válido');
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setError(validationErrors.join(', '));
      return;
    }

    try {
      setIsSaving(true);
      setError(null);
      setSuccessMessage(null);

      // Preparar dados para envio
      const dataToSave = {
        nome: formData.nome.trim(),
        categoria: formData.categoria,
        marca: formData.marca.trim() || null,
        modelo: formData.modelo.trim() || null,
        numero_serie: formData.numero_serie.trim() || null,
        descricao: formData.descricao.trim() || null,
        observacoes: formData.observacoes.trim() || null,
        valor: formData.valor ? parseFloat(formData.valor) : null,
        ano_fabricacao: formData.ano_fabricacao ? parseInt(formData.ano_fabricacao) : null,
        estado_conservacao: formData.estado_conservacao,
        localizacao: formData.localizacao.trim() || null,
        data_aquisicao: formData.data_aquisicao || null,
        ativo: formData.ativo,
        disponivel: formData.disponivel,
        status: formData.status
      };

      let result;

      if (isEditing) {
        // Atualizar instrumento existente
        result = await supabase
          .from('instrumentos')
          .update({
            ...dataToSave,
            updated_at: new Date().toISOString()
          })
          .eq('id', id)
          .select()
          .single();
      } else {
        // Criar novo instrumento
        result = await supabase
          .from('instrumentos')
          .insert([dataToSave])
          .select()
          .single();
      }

      if (result.error) throw result.error;

      setSuccessMessage(
        isEditing 
          ? 'Instrumento atualizado com sucesso!'
          : 'Instrumento criado com sucesso!'
      );

      // Redirecionar após um breve delay para mostrar a mensagem
      setTimeout(() => {
        navigate('/admin/instrumentos');
      }, 1500);

    } catch (err) {
      console.error('Erro ao salvar instrumento:', err);
      setError('Erro ao salvar instrumento: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (confirm('Tem certeza que deseja cancelar? As alterações não salvas serão perdidas.')) {
      navigate('/admin/instrumentos');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Music className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Carregando Formulário</h3>
          <p className="text-gray-600">Obtendo dados do instrumento...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NipoHeader />
      
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/admin/instrumentos')}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {isEditing ? 'Editar Instrumento' : 'Novo Instrumento'}
              </h1>
              <p className="text-gray-600">
                {isEditing ? 'Atualize as informações do instrumento' : 'Cadastre um novo instrumento no sistema'}
              </p>
            </div>
          </div>
        </div>

        {/* Mensagens de erro e sucesso */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-green-700">{successMessage}</span>
          </div>
        )}

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
              <Package className="w-5 h-5" />
              <span>Informações Básicas</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nome */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Instrumento *
                </label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ex: Violão Clássico Yamaha"
                  required
                />
              </div>

              {/* Categoria */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoria *
                </label>
                <select
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  {categorias.map(categoria => (
                    <option key={categoria.id} value={categoria.id}>
                      {categoria.nome}
                    </option>
                  ))}
                </select>
              </div>

              {/* Marca */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Marca
                </label>
                <input
                  type="text"
                  name="marca"
                  value={formData.marca}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ex: Yamaha, Gibson, Fender"
                />
              </div>

              {/* Modelo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Modelo
                </label>
                <input
                  type="text"
                  name="modelo"
                  value={formData.modelo}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ex: C40, Les Paul, Stratocaster"
                />
              </div>

              {/* Número de Série */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número de Série
                </label>
                <input
                  type="text"
                  name="numero_serie"
                  value={formData.numero_serie}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ex: 123456789"
                />
              </div>

              {/* Valor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valor (R$)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    step="0.01"
                    name="valor"
                    value={formData.valor}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0,00"
                  />
                </div>
              </div>

              {/* Ano de Fabricação */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ano de Fabricação
                </label>
                <input
                  type="number"
                  name="ano_fabricacao"
                  value={formData.ano_fabricacao}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ex: 2020"
                  min="1800"
                  max={new Date().getFullYear()}
                />
              </div>

              {/* Estado de Conservação */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado de Conservação
                </label>
                <select
                  name="estado_conservacao"
                  value={formData.estado_conservacao}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {estadosConservacao.map(estado => (
                    <option key={estado.value} value={estado.value}>
                      {estado.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Localização */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Localização
                </label>
                <input
                  type="text"
                  name="localizacao"
                  value={formData.localizacao}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ex: Sala 101, Estoque Principal"
                />
              </div>

              {/* Data de Aquisição */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data de Aquisição
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="date"
                    name="data_aquisicao"
                    value={formData.data_aquisicao}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {statusOptions.map(status => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Descrição */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição
                </label>
                <textarea
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Descrição detalhada do instrumento, características especiais, etc."
                />
              </div>

              {/* Observações */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Observações
                </label>
                <textarea
                  name="observacoes"
                  value={formData.observacoes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Observações importantes, problemas conhecidos, histórico de manutenção, etc."
                />
              </div>

              {/* Checkboxes */}
              <div className="md:col-span-2">
                <div className="flex flex-wrap gap-6">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="ativo"
                      checked={formData.ativo}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Instrumento Ativo</span>
                  </label>

                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="disponivel"
                      checked={formData.disponivel}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Disponível para Uso</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Botões de ação */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 rounded-b-lg">
            <div className="flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>Cancelar</span>
              </button>
              
              <button
                type="submit"
                disabled={isSaving}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isSaving ? (
                  <>
                    <Settings className="w-4 h-4 animate-spin" />
                    <span>Salvando...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>{isEditing ? 'Atualizar' : 'Criar'} Instrumento</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminInstrumentForm;