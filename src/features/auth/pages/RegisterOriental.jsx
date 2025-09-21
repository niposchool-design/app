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
import { useAuth } from '../../../shared/contexts/AuthContext';
import { OrientalForm, OrientalInput } from '../../../shared/components/oriental/OrientalAdvanced';

const RegisterOriental = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    dob: '',
    instrument: '',
    tipo_usuario: ''
  });
  
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

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  const handleUserTypeSelect = (type) => {
    setFormData(prev => ({ ...prev, tipo_usuario: type }));
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
    if (!formData.fullName.trim()) return 'Nome completo é obrigatório';
    if (!formData.dob) return 'Data de nascimento é obrigatória';
    if (!formData.tipo_usuario) return 'Tipo de usuário é obrigatório';
    if (!formData.instrument) return 'Instrumento é obrigatório';
    return null;
  };

  const handleNextStep = () => {
    const stepError = validateStep1();
    if (stepError) {
      setError(stepError);
      return;
    }
    setStep(2);
    setError('');
  };

  const handleSubmit = async () => {
    const stepError = validateStep2();
    if (stepError) {
      setError(stepError);
      return;
    }

    try {
      setLoading(true);
      await signup(formData);
      navigate('/verify-email');
    } catch (error) {
      setError(error.message || 'Erro ao criar conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Renderizar seleção de tipo de usuário
  const renderUserTypeSelection = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 text-center mb-6">
        🎭 Selecione seu tipo de usuário
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {userTypes.map((type) => (
          <div
            key={type.value}
            onClick={() => handleUserTypeSelect(type.value)}
            className={`
              p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300
              hover:scale-105 hover:shadow-lg
              ${formData.tipo_usuario === type.value 
                ? `border-${type.color}-400 bg-${type.color}-50 shadow-lg scale-105` 
                : 'border-gray-200 bg-white hover:border-gray-300'
              }
            `}
          >
            <div className="text-center">
              <div className="text-4xl mb-3">{type.emoji}</div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                {type.label}
              </h4>
              <p className="text-sm text-gray-600">
                {type.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (step === 1) {
    const campos = [
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        value: formData.email,
        onChange: (value) => handleInputChange('email', value),
        placeholder: 'seu.email@exemplo.com',
        required: true,
        icon: <Mail className="w-5 h-5" />
      },
      {
        name: 'password',
        label: 'Senha',
        type: 'password',
        value: formData.password,
        onChange: (value) => handleInputChange('password', value),
        placeholder: 'Mínimo 6 caracteres',
        required: true,
        icon: <Lock className="w-5 h-5" />
      },
      {
        name: 'confirmPassword',
        label: 'Confirmar Senha',
        type: 'password',
        value: formData.confirmPassword,
        onChange: (value) => handleInputChange('confirmPassword', value),
        placeholder: 'Digite novamente sua senha',
        required: true,
        icon: <Lock className="w-5 h-5" />
      }
    ];

    const acoes = [
      {
        label: 'Voltar para Login',
        type: 'secondary',
        onClick: () => navigate('/login'),
        icon: <ArrowLeft className="w-4 h-4" />
      },
      {
        label: 'Próximo',
        type: 'primary',
        onClick: handleNextStep,
        icon: <ChevronRight className="w-4 h-4" />
      }
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-purple-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <div className="w-16 h-1 bg-gray-200 rounded"></div>
                <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center text-sm font-bold">
                  2
                </div>
              </div>
            </div>
            <p className="text-center text-gray-600">Dados de Acesso</p>
          </div>

          <OrientalForm
            title="Criar Conta"
            subtitle="Etapa 1: Configure seus dados de acesso"
            level="student"
            campos={campos}
            acoes={acoes}
            loading={loading}
            errors={error ? { submit: error } : {}}
          />
        </div>
      </div>
    );
  }

  if (step === 2) {
    const campos = [
      {
        name: 'fullName',
        label: 'Nome Completo',
        type: 'text',
        value: formData.fullName,
        onChange: (value) => handleInputChange('fullName', value),
        placeholder: 'Seu nome completo',
        required: true,
        icon: <User className="w-5 h-5" />
      },
      {
        name: 'dob',
        label: 'Data de Nascimento',
        type: 'date',
        value: formData.dob,
        onChange: (value) => handleInputChange('dob', value),
        required: true,
        icon: <Calendar className="w-5 h-5" />
      },
      {
        name: 'instrument',
        label: 'Instrumento Principal',
        type: 'select',
        value: formData.instrument,
        onChange: (value) => handleInputChange('instrument', value),
        options: instruments.map(inst => ({
          value: inst.value,
          label: inst.label
        })),
        placeholder: 'Selecione seu instrumento',
        required: true,
        icon: <Music className="w-5 h-5" />
      }
    ];

    const acoes = [
      {
        label: 'Voltar',
        type: 'secondary',
        onClick: () => setStep(1),
        icon: <ArrowLeft className="w-4 h-4" />
      },
      {
        label: 'Criar Conta',
        type: 'primary',
        onClick: handleSubmit,
        loading: loading,
        icon: <UserPlus className="w-4 h-4" />
      }
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-purple-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold">
                  ✓
                </div>
                <div className="w-16 h-1 bg-pink-400 rounded"></div>
                <div className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center text-sm font-bold">
                  2
                </div>
              </div>
            </div>
            <p className="text-center text-gray-600">Informações Pessoais</p>
          </div>

          {/* Seleção de Tipo de Usuário */}
          <div className="mb-8 bg-white rounded-2xl p-6 shadow-lg border-2 border-pink-200">
            {renderUserTypeSelection()}
          </div>

          <OrientalForm
            title="Finalizar Cadastro"
            subtitle="Etapa 2: Suas informações pessoais e musicais"
            level="student"
            campos={campos}
            acoes={acoes}
            loading={loading}
            errors={error ? { submit: error } : {}}
          />
        </div>
      </div>
    );
  }
};

export default RegisterOriental;