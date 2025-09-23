import React, { useState, useEffect } from 'react';
import { 
  Send, BookOpen, AlertTriangle, CheckCircle, X,
  ChevronDown, FileText, Image as ImageIcon, Paperclip
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/shared/lib/supabase/supabaseClient';

const NovaPergunta = () => {
  const [formData, setFormData] = useState({
    titulo: '',
    pergunta: '',
    modulo_id: '',
    prioridade: 'normal',
    tags: '',
    anexos: []
  });
  const [modulos, setModulos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      // Carregar usuário
      const { data: { session } } = await supabase.auth.getSession();
      setUsuario(session?.user);

      // Carregar módulos disponíveis
      const { data: modulosData } = await supabase
        .from('modulos')
        .select('*')
        .eq('ativo', true)
        .order('nome');

      // Simular módulos se não existirem no banco
      const modulosDemo = [
        { id: 1, nome: 'Instrumentos', cor: 'blue', icone: 'Music' },
        { id: 2, nome: 'Metodologias', cor: 'purple', icone: 'BookOpen' },
        { id: 3, nome: 'Rítmica', cor: 'green', icone: 'Users' },
        { id: 4, nome: 'História', cor: 'orange', icone: 'BookOpen' },
        { id: 5, nome: 'Teoria Musical', cor: 'indigo', icone: 'FileText' }
      ];

      setModulos(modulosData?.length > 0 ? modulosData : modulosDemo);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validarFormulario = () => {
    const newErrors = {};

    if (!formData.titulo.trim()) {
      newErrors.titulo = 'Título é obrigatório';
    } else if (formData.titulo.length < 10) {
      newErrors.titulo = 'Título deve ter pelo menos 10 caracteres';
    }

    if (!formData.pergunta.trim()) {
      newErrors.pergunta = 'Pergunta é obrigatória';
    } else if (formData.pergunta.length < 20) {
      newErrors.pergunta = 'Pergunta deve ter pelo menos 20 caracteres';
    }

    if (!formData.modulo_id) {
      newErrors.modulo_id = 'Selecione um módulo';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validarFormulario()) return;

    try {
      setLoading(true);

      // Processar tags
      const tags = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      const duvidaData = {
        aluno_id: usuario.id,
        modulo_id: formData.modulo_id,
        titulo: formData.titulo.trim(),
        pergunta: formData.pergunta.trim(),
        prioridade: formData.prioridade,
        tags: tags,
        status: 'aberta',
        data_criacao: new Date().toISOString()
      };

      // Inserir no banco (simulado por enquanto)
      console.log('Dados da dúvida:', duvidaData);
      
      // Simular inserção no banco
      const { error } = await supabase
        .from('duvidas_alunos')
        .insert([duvidaData]);

      if (error) throw error;

      // Mostrar mensagem de sucesso e redirecionar
      alert('Sua pergunta foi enviada com sucesso! Os professores serão notificados.');
      navigate('/alunos/duvidas');
    } catch (error) {
      console.error('Erro ao enviar pergunta:', error);
      alert('Erro ao enviar pergunta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const moduloSelecionado = modulos.find(m => m.id.toString() === formData.modulo_id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Cabeçalho */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg">
              <Send className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-800">Nova Pergunta</h1>
              <p className="text-lg text-gray-600 mt-1">
                Faça uma pergunta aos professores do Nipo School
              </p>
            </div>
          </div>

          {/* Dicas */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-blue-800 mb-2">Dicas para uma boa pergunta:</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Seja específico e claro no título</li>
                  <li>• Detalhe bem sua dúvida na descrição</li>
                  <li>• Escolha o módulo correto</li>
                  <li>• Use tags para facilitar a busca</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
          {/* Título da Pergunta */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título da Pergunta *
            </label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleInputChange}
              placeholder="Ex: Como fazer a embocadura correta na flauta doce?"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                errors.titulo ? 'border-red-500' : 'border-gray-300'
              }`}
              maxLength={100}
            />
            {errors.titulo && (
              <p className="text-red-500 text-sm mt-1">{errors.titulo}</p>
            )}
            <p className="text-gray-500 text-xs mt-1">
              {formData.titulo.length}/100 caracteres
            </p>
          </div>

          {/* Módulo */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Módulo *
            </label>
            <div className="relative">
              <select
                name="modulo_id"
                value={formData.modulo_id}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none ${
                  errors.modulo_id ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Selecione um módulo</option>
                {modulos.map(modulo => (
                  <option key={modulo.id} value={modulo.id}>
                    {modulo.nome}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
            {errors.modulo_id && (
              <p className="text-red-500 text-sm mt-1">{errors.modulo_id}</p>
            )}
            {moduloSelecionado && (
              <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                <BookOpen className="h-4 w-4" />
                <span>Módulo selecionado: <strong>{moduloSelecionado.nome}</strong></span>
              </div>
            )}
          </div>

          {/* Pergunta Detalhada */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sua Pergunta *
            </label>
            <textarea
              name="pergunta"
              value={formData.pergunta}
              onChange={handleInputChange}
              placeholder="Descreva sua dúvida com detalhes. Quanto mais informações você fornecer, melhor será a resposta do professor..."
              rows={6}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none ${
                errors.pergunta ? 'border-red-500' : 'border-gray-300'
              }`}
              maxLength={1000}
            />
            {errors.pergunta && (
              <p className="text-red-500 text-sm mt-1">{errors.pergunta}</p>
            )}
            <p className="text-gray-500 text-xs mt-1">
              {formData.pergunta.length}/1000 caracteres
            </p>
          </div>

          {/* Prioridade */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prioridade
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="prioridade"
                  value="baixa"
                  checked={formData.prioridade === 'baixa'}
                  onChange={handleInputChange}
                  className="mr-2 text-orange-500 focus:ring-orange-500"
                />
                <span className="text-gray-700">Baixa</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="prioridade"
                  value="normal"
                  checked={formData.prioridade === 'normal'}
                  onChange={handleInputChange}
                  className="mr-2 text-orange-500 focus:ring-orange-500"
                />
                <span className="text-gray-700">Normal</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="prioridade"
                  value="alta"
                  checked={formData.prioridade === 'alta'}
                  onChange={handleInputChange}
                  className="mr-2 text-orange-500 focus:ring-orange-500"
                />
                <span className="text-gray-700">Alta</span>
              </label>
            </div>
          </div>

          {/* Tags */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags (opcional)
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              placeholder="Ex: flauta, respiração, técnica (separadas por vírgula)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <p className="text-gray-500 text-xs mt-1">
              Use tags para facilitar a busca. Separe as tags por vírgula.
            </p>
          </div>

          {/* Botões */}
          <div className="flex gap-4">
            <Link
              to="/alunos/duvidas"
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-center font-medium"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Enviar Pergunta
                </>
              )}
            </button>
          </div>
        </form>

        {/* Informações Adicionais */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-green-800 mb-1">O que acontece depois?</h3>
              <p className="text-sm text-green-700">
                Sua pergunta será enviada para os professores especializados no módulo selecionado. 
                Você receberá uma notificação quando a pergunta for respondida. 
                Normalmente as respostas chegam em até 24 horas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NovaPergunta;