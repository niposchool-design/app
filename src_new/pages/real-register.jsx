import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User, 
  Calendar,
  Music,
  UserPlus,
  ArrowLeft, 
  ChevronRight,
  GraduationCap,
  BookOpen
} from 'lucide-react';
import { useAuth } from '@new/contexts/real-auth-context';

/**
 * RealRegisterForm - Formulário de cadastro com Supabase real
 * Localização: src_new/pages/real-register.jsx
 */
const RealRegisterForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    dob: '',
    instrument: '',
    tipo_usuario: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  // Tipos de usuário com ícones e descrições
  const userTypes = [
    {
      value: 'aluno',
      label: 'Aluno',
      icon: GraduationCap,
      emoji: '🎓',
      description: 'Aprender música, fazer aulas e acompanhar progresso',
      color: 'blue'
    },
    {
      value: 'professor',
      label: 'Professor',
      icon: BookOpen,
      emoji: '👨‍🏫',
      description: 'Ensinar, criar conteúdos e acompanhar alunos',
      color: 'green'
    }
  ];

  const instruments = [
    { value: 'teclado', label: '🎹 Teclado', emoji: '🎹' },
    { value: 'piano', label: '🎹 Piano', emoji: '🎹' },
    { value: 'bateria', label: '🥁 Bateria', emoji: '🥁' },
    { value: 'violao', label: '🎸 Violão', emoji: '🎸' },
    { value: 'guitarra', label: '🎸 Guitarra', emoji: '🎸' },
    { value: 'baixo', label: '🎸 Baixo', emoji: '🎸' },
    { value: 'voz', label: '🎤 Canto / Voz', emoji: '🎤' },
    { value: 'saxofone', label: '🎷 Saxofone', emoji: '🎷' },
    { value: 'clarinete', label: '🎶 Clarinete', emoji: '🎶' },
    { value: 'oboe', label: '🎶 Oboé', emoji: '🎶' },
    { value: 'fagote', label: '🎶 Fagote', emoji: '🎶' },
    { value: 'flauta', label: '🎶 Flauta', emoji: '🎶' },
    { value: 'trompete', label: '🎺 Trompete', emoji: '🎺' },
    { value: 'trombone', label: '🎺 Trombone', emoji: '🎺' },
    { value: 'tuba', label: '🎺 Tuba', emoji: '🎺' }, 
    { value: 'euphonium', label: '🎺 Eufônio', emoji: '🎺' },
    { value: 'violino', label: '🎻 Violino', emoji: '🎻' },
    { value: 'viola', label: '🎻 Viola Clássica', emoji: '🎻' },
    { value: 'violoncelo', label: '🎻 Violoncelo', emoji: '🎻' },
    { value: 'contrabaixo_acustico', label: '🎻 Contrabaixo Acústico', emoji: '🎻' },
    { value: 'percussao', label: '🥁 Percussão Erudita', emoji: '🥁' },
    { value: 'teoria', label: '📘 Teoria Musical', emoji: '📘' },
    { value: 'outro', label: '🎵 Outro', emoji: '🎵' }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUserTypeSelect = (type) => {
    setFormData({
      ...formData,
      tipo_usuario: type
    });
  };

  const validateStep1 = () => {
    if (!formData.email) return 'Email é obrigatório';
    if (!formData.email.includes('@')) return 'Email inválido';
    if (!formData.password) return 'Senha é obrigatória';
    if (formData.password.length < 6) return 'Senha deve ter pelo menos 6 caracteres';
    if (formData.password !== formData.confirmPassword) return 'Senhas não coincidem';
    return null;
  };

  const validateStep2 = () => {
    if (!formData.fullName) return 'Nome completo é obrigatório';
    if (formData.fullName.length < 3) return 'Nome deve ter pelo menos 3 caracteres';
    if (!formData.dob) return 'Data de nascimento é obrigatória';
    if (!formData.instrument) return 'Selecione seu instrumento principal';
    if (!formData.tipo_usuario) return 'Selecione seu tipo de usuário';
    return null;
  };

  const handleNextStep = () => {
    const error = validateStep1();
    if (error) {
      setError(error);
      return;
    }
    setError('');
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const validationError = validateStep2();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      console.log('🚀 Iniciando cadastro...', {
        email: formData.email,
        fullName: formData.fullName,
        tipo_usuario: formData.tipo_usuario,
        instrument: formData.instrument,
        dob: formData.dob
      });

      const result = await signup(formData.email, formData.password, {
        fullName: formData.fullName,
        dob: formData.dob,
        instrument: formData.instrument,
        tipo_usuario: formData.tipo_usuario
      });

      if (result.success) {
        // Mensagem personalizada baseada no tipo de usuário
        const userType = userTypes.find(type => type.value === formData.tipo_usuario);
        const welcomeMessage = formData.tipo_usuario === 'aluno' 
          ? 'Bem-vindo à sua jornada musical!' 
          : `Bem-vindo à equipe como ${userType?.label}!`;

        // Detectar provedor de email para link direto
        const emailDomain = formData.email.split('@')[1].toLowerCase();
        const emailProviders = {
          'gmail.com': 'https://mail.google.com',
          'hotmail.com': 'https://outlook.live.com',
          'outlook.com': 'https://outlook.live.com',
          'yahoo.com': 'https://mail.yahoo.com',
          'icloud.com': 'https://www.icloud.com/mail',
          'uol.com.br': 'https://email.uol.com.br',
          'bol.com.br': 'https://email.bol.uol.com.br',
          'terra.com.br': 'https://webmail.terra.com.br'
        };

        const emailProviderUrl = emailProviders[emailDomain];

        alert(`🎉 ${welcomeMessage}

✅ Sua conta foi criada com sucesso!

📧 IMPORTANTE: Verifique seu email
Enviamos um link de confirmação para: ${formData.email}

🔍 Não encontrou o email?
• Verifique sua caixa de spam/lixo eletrônico
• Aguarde alguns minutos (pode demorar)
• O email vem de noreply@mail.app.supabase.io

${emailProviderUrl ? '🚀 Abra sua caixa de entrada para confirmar!' : ''}`);

        navigate('/login');
      } else {
        setError(result.error || 'Erro no cadastro');
      }
    } catch (error) {
      console.error('❌ Erro inesperado:', error);
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 bg-red-600 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl text-white">🎵</span>
          </div>
          <h1 className="text-3xl font-bold text-red-600 mb-2">
            Nipo School
          </h1>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Criar nova conta
          </h2>
          <p className="text-gray-600">
            Sistema Oriental de Ensino Musical
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
              1
            </div>
            <div className={`h-1 w-16 ${step >= 2 ? 'bg-red-600' : 'bg-gray-200'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
              2
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-600 mt-2">
            <span>Conta</span>
            <span>Perfil</span>
          </div>
        </div>

        <form onSubmit={step === 1 ? (e) => { e.preventDefault(); handleNextStep(); } : handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm mb-6">
              <div className="flex items-center">
                <span className="mr-2">⚠️</span>
                {error}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">📧 Informações da Conta</h3>
              
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="seu@email.com"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Senha
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="••••••••"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    disabled={loading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirmar Senha
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="••••••••"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    disabled={loading}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                Próximo
                <ChevronRight className="h-4 w-4 ml-2" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">👤 Informações Pessoais</h3>
              
              {/* Nome completo */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome Completo
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Seu nome completo"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Data de nascimento */}
              <div>
                <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
                  Data de Nascimento
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="dob"
                    name="dob"
                    type="date"
                    value={formData.dob}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Tipo de usuário */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Tipo de Usuário
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {userTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => handleUserTypeSelect(type.value)}
                      className={`p-4 border rounded-lg text-left hover:shadow-md transition-all ${
                        formData.tipo_usuario === type.value
                          ? 'border-red-500 bg-red-50 ring-2 ring-red-500'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      disabled={loading}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{type.emoji}</span>
                        <div>
                          <h4 className="font-medium text-gray-900">{type.label}</h4>
                          <p className="text-sm text-gray-600">{type.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Instrumento */}
              <div>
                <label htmlFor="instrument" className="block text-sm font-medium text-gray-700 mb-1">
                  Instrumento Principal
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Music className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    id="instrument"
                    name="instrument"
                    value={formData.instrument}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    disabled={loading}
                  >
                    <option value="">Selecione seu instrumento</option>
                    {instruments.map((instrument) => (
                      <option key={instrument.value} value={instrument.value}>
                        {instrument.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
                  disabled={loading}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-2/3 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Criando conta...
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Criar Conta
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Links */}
          <div className="mt-6 text-center space-y-2">
            <div>
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-sm text-red-600 hover:text-red-800 font-medium"
              >
                Já tem conta? Faça login
              </button>
            </div>
            
            <div>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                ← Voltar ao início
              </button>
            </div>
          </div>
        </form>

        {/* System Info */}
        <div className="text-center text-xs text-gray-500 mt-6">
          <p>Sistema com autenticação real via Supabase</p>
          <p>Confirmação de email obrigatória</p>
        </div>
      </div>
    </div>
  );
};

export default RealRegisterForm;