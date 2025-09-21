import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../shared/contexts/AuthContext';
import { OrientalForm, OrientalInput } from '../../../shared/components/oriental/OrientalAdvanced';
import { 
  User, 
  Calendar, 
  Music, 
  Settings,
  Bell,
  Volume2,
  Palette,
  ChevronLeft,
  ChevronRight,
  CheckCircle
} from 'lucide-react';

const CompleteProfileOriental = () => {
  const { user, userProfile, updateProfile, loading } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    full_name: '',
    dob: '',
    instrument: '',
    user_level: 'beginner',
    theme_preference: 'light',
    notification_enabled: true,
    sound_enabled: true
  });

  const [formState, setFormState] = useState({
    isSubmitting: false,
    error: null,
    currentStep: 1,
    totalSteps: 3
  });

  // Instrumentos disponíveis
  const instrumentos = [
    { id: 'violao', name: 'Violão', emoji: '🎸' },
    { id: 'piano', name: 'Piano', emoji: '🎹' },
    { id: 'bateria', name: 'Bateria', emoji: '🥁' },
    { id: 'baixo', name: 'Baixo', emoji: '🎸' },
    { id: 'flauta', name: 'Flauta', emoji: '🪈' },
    { id: 'saxofone', name: 'Saxofone', emoji: '🎷' },
    { id: 'violino', name: 'Violino', emoji: '🎻' },
    { id: 'canto', name: 'Canto', emoji: '🎤' },
    { id: 'outro', name: 'Outro', emoji: '🎵' }
  ];

  // Níveis de usuário
  const userLevels = [
    { id: 'beginner', name: 'Iniciante', emoji: '🌱', description: 'Começando a jornada musical' },
    { id: 'intermediate', name: 'Intermediário', emoji: '🌿', description: 'Já domino o básico' },
    { id: 'advanced', name: 'Avançado', emoji: '🌳', description: 'Experiência sólida em música' },
    { id: 'professional', name: 'Profissional', emoji: '🎯', description: 'Músico experiente/professor' }
  ];

  // Carregar dados existentes do perfil
  useEffect(() => {
    if (userProfile) {
      setFormData({
        full_name: userProfile.full_name || '',
        dob: userProfile.dob || '',
        instrument: userProfile.instrument || '',
        user_level: userProfile.user_level || 'beginner',
        theme_preference: userProfile.theme_preference || 'light',
        notification_enabled: userProfile.notification_enabled ?? true,
        sound_enabled: userProfile.sound_enabled ?? true
      });
    }
  }, [userProfile]);

  // Redirecionar se já logado e perfil completo
  useEffect(() => {
    if (user && userProfile && isProfileComplete(userProfile)) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, userProfile, navigate]);

  // Verificar se perfil está completo
  const isProfileComplete = (profile) => {
    return profile?.full_name && 
           profile?.dob && 
           profile?.instrument && 
           profile?.user_level;
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formState.error) {
      setFormState(prev => ({ ...prev, error: null }));
    }
  };

  // Handle instrument selection
  const handleInstrumentSelect = (instrumentId) => {
    setFormData(prev => ({ ...prev, instrument: instrumentId }));
  };

  // Handle level selection
  const handleLevelSelect = (levelId) => {
    setFormData(prev => ({ ...prev, user_level: levelId }));
  };

  // Validação por etapa
  const validateStep = (step) => {
    switch (step) {
      case 1:
        if (!formData.full_name.trim()) {
          return 'Por favor, informe seu nome completo';
        }
        if (!formData.dob) {
          return 'Por favor, informe sua data de nascimento';
        }
        break;
      case 2:
        if (!formData.instrument) {
          return 'Por favor, selecione seu instrumento principal';
        }
        if (!formData.user_level) {
          return 'Por favor, selecione seu nível musical';
        }
        break;
    }
    return null;
  };

  // Próximo passo
  const nextStep = () => {
    const stepError = validateStep(formState.currentStep);
    if (stepError) {
      setFormState(prev => ({ ...prev, error: stepError }));
      return;
    }

    setFormState(prev => ({
      ...prev,
      currentStep: prev.currentStep + 1,
      error: null
    }));
  };

  // Passo anterior
  const previousStep = () => {
    setFormState(prev => ({
      ...prev,
      currentStep: prev.currentStep - 1,
      error: null
    }));
  };

  // Submit final
  const handleSubmit = async () => {
    const stepError = validateStep(formState.currentStep);
    if (stepError) {
      setFormState(prev => ({ ...prev, error: stepError }));
      return;
    }

    try {
      setFormState(prev => ({ ...prev, isSubmitting: true, error: null }));
      
      await updateProfile({
        full_name: formData.full_name.trim(),
        dob: formData.dob,
        instrument: formData.instrument,
        user_level: formData.user_level,
        theme_preference: formData.theme_preference,
        notification_enabled: formData.notification_enabled,
        sound_enabled: formData.sound_enabled
      });

      // Sucesso - redirecionar
      navigate('/dashboard', { replace: true });
      
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      setFormState(prev => ({
        ...prev,
        error: 'Erro ao salvar perfil. Tente novamente.',
        isSubmitting: false
      }));
    }
  };

  // Renderizar seleção de instrumentos
  const renderInstrumentSelection = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 text-center mb-6">
        🎵 Selecione seu instrumento principal
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {instrumentos.map((inst) => (
          <div
            key={inst.id}
            onClick={() => handleInstrumentSelect(inst.id)}
            className={`
              p-4 rounded-xl border-2 cursor-pointer transition-all duration-300
              hover:scale-105 hover:shadow-lg
              ${formData.instrument === inst.id
                ? 'border-pink-400 bg-pink-50 shadow-lg scale-105'
                : 'border-gray-200 bg-white hover:border-pink-200'
              }
            `}
          >
            <div className="text-center">
              <div className="text-3xl mb-2">{inst.emoji}</div>
              <div className="font-medium text-gray-800">{inst.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Renderizar seleção de nível
  const renderLevelSelection = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 text-center mb-6">
        📊 Qual seu nível musical?
      </h3>
      <div className="space-y-3">
        {userLevels.map((level) => (
          <div
            key={level.id}
            onClick={() => handleLevelSelect(level.id)}
            className={`
              p-4 rounded-xl border-2 cursor-pointer transition-all duration-300
              hover:scale-105 hover:shadow-lg
              ${formData.user_level === level.id
                ? 'border-purple-400 bg-purple-50 shadow-lg scale-105'
                : 'border-gray-200 bg-white hover:border-purple-200'
              }
            `}
          >
            <div className="flex items-center gap-4">
              <div className="text-2xl">{level.emoji}</div>
              <div className="flex-1">
                <div className="font-semibold text-gray-800">{level.name}</div>
                <div className="text-sm text-gray-600">{level.description}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Progress Indicator
  const ProgressIndicator = () => (
    <div className="mb-8">
      <div className="flex items-center justify-center mb-4">
        <div className="flex items-center space-x-4">
          {[1, 2, 3].map((step) => (
            <React.Fragment key={step}>
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold
                ${formState.currentStep === step
                  ? 'bg-pink-500 text-white'
                  : formState.currentStep > step
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-400'
                }
              `}>
                {formState.currentStep > step ? '✓' : step}
              </div>
              {step < 3 && (
                <div className={`
                  w-16 h-1 rounded
                  ${formState.currentStep > step ? 'bg-green-400' : 'bg-gray-200'}
                `}></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      <p className="text-center text-gray-600">
        {formState.currentStep === 1 && 'Dados Pessoais'}
        {formState.currentStep === 2 && 'Informações Musicais'}
        {formState.currentStep === 3 && 'Preferências'}
      </p>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <ProgressIndicator />

        {/* Etapa 1: Dados Pessoais */}
        {formState.currentStep === 1 && (
          <OrientalForm
            title="Complete seu Perfil"
            subtitle="Etapa 1: Vamos conhecer você melhor"
            level="student"
            campos={[
              {
                name: 'full_name',
                label: 'Nome Completo',
                type: 'text',
                value: formData.full_name,
                onChange: (value) => handleInputChange('full_name', value),
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
              }
            ]}
            acoes={[
              {
                label: 'Próximo',
                type: 'primary',
                onClick: nextStep,
                icon: <ChevronRight className="w-4 h-4" />
              }
            ]}
            errors={formState.error ? { submit: formState.error } : {}}
          />
        )}

        {/* Etapa 2: Informações Musicais */}
        {formState.currentStep === 2 && (
          <div className="space-y-8">
            {/* Seleção de Instrumento */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-pink-200">
              {renderInstrumentSelection()}
            </div>

            {/* Seleção de Nível */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-200">
              {renderLevelSelection()}
            </div>

            {/* Botões de Navegação */}
            <div className="flex justify-between">
              <button
                onClick={previousStep}
                className="
                  px-6 py-3 bg-white border-2 border-gray-300 text-gray-600 
                  rounded-xl hover:bg-gray-50 hover:border-gray-400
                  transition-all duration-200 hover:scale-105
                  flex items-center gap-2
                "
              >
                <ChevronLeft className="w-4 h-4" />
                Voltar
              </button>

              <button
                onClick={nextStep}
                disabled={!formData.instrument || !formData.user_level}
                className="
                  px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 
                  text-white rounded-xl hover:from-pink-600 hover:to-red-600
                  transition-all duration-200 hover:scale-105
                  flex items-center gap-2 shadow-lg
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                "
              >
                Próximo
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {formState.error && (
              <div className="text-center text-red-600 bg-red-50 border border-red-200 rounded-xl p-4">
                {formState.error}
              </div>
            )}
          </div>
        )}

        {/* Etapa 3: Preferências */}
        {formState.currentStep === 3 && (
          <OrientalForm
            title="Quase Pronto!"
            subtitle="Etapa 3: Configure suas preferências"
            level="student"
            campos={[
              {
                name: 'theme_preference',
                label: 'Tema do App',
                type: 'select',
                value: formData.theme_preference,
                onChange: (value) => handleInputChange('theme_preference', value),
                options: [
                  { value: 'light', label: '☀️ Claro' },
                  { value: 'dark', label: '🌙 Escuro' },
                  { value: 'auto', label: '🔄 Automático' }
                ],
                icon: <Palette className="w-5 h-5" />
              }
            ]}
            acoes={[
              {
                label: 'Voltar',
                type: 'secondary',
                onClick: previousStep,
                icon: <ChevronLeft className="w-4 h-4" />
              },
              {
                label: 'Finalizar Perfil',
                type: 'primary',
                onClick: handleSubmit,
                loading: formState.isSubmitting,
                icon: <CheckCircle className="w-4 h-4" />
              }
            ]}
            errors={formState.error ? { submit: formState.error } : {}}
          />
        )}

        {/* Configurações Adicionais para Etapa 3 */}
        {formState.currentStep === 3 && (
          <div className="mt-6 bg-white rounded-2xl p-6 shadow-lg border-2 border-green-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-green-600" />
              Notificações e Som
            </h3>
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.notification_enabled}
                  onChange={(e) => handleInputChange('notification_enabled', e.target.checked)}
                  className="
                    w-5 h-5 text-green-600 bg-white border-2 border-green-300 
                    rounded focus:ring-green-500 focus:ring-2
                  "
                />
                <Bell className="w-5 h-5 text-green-600" />
                <span className="text-gray-700 font-medium">
                  Receber notificações de aulas e atividades
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.sound_enabled}
                  onChange={(e) => handleInputChange('sound_enabled', e.target.checked)}
                  className="
                    w-5 h-5 text-purple-600 bg-white border-2 border-purple-300 
                    rounded focus:ring-purple-500 focus:ring-2
                  "
                />
                <Volume2 className="w-5 h-5 text-purple-600" />
                <span className="text-gray-700 font-medium">
                  Habilitar sons e efeitos sonoros
                </span>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompleteProfileOriental;