import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Play, 
  Check, 
  Clock, 
  Star,
  ArrowLeft,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../../shared/contexts/AuthContext';
import { useModules } from '../hooks/useModules';
import NipoHeader from '../../../shared/components/UI/NipoHeader';
import { 
  NipoBackground, 
  NipoContainer, 
  NipoSection,
  NipoLoading
} from '../../../shared/components/UI/NipoUI';

const ModulosPage = () => {
  const { userProfile } = useAuth();
  const navigate = useNavigate();
  const { loading, getModuleStats } = useModules();
  const [modules, setModules] = useState([]);

  useEffect(() => {
    // Módulos simulados baseados no currículo japonês
    const mockModules = [
      {
        id: 1,
        title: 'Orff Schulwerk',
        description: 'Metodologia alemã baseada em movimento, ritmo e improvisação',
        lessons: 12,
        completed: 8,
        level: 'Iniciante',
        emoji: '🎵',
        color: 'from-blue-400 to-blue-600',
        slug: 'orff-schulwerk'
      },
      {
        id: 2,
        title: 'Método Suzuki',
        description: 'Abordagem japonesa do aprendizado pela língua materna',
        lessons: 15,
        completed: 5,
        level: 'Iniciante',
        emoji: '🎻',
        color: 'from-purple-400 to-purple-600',
        slug: 'metodo-suzuki'
      },
      {
        id: 3,
        title: 'Método Kodály',
        description: 'Metodologia húngara focada no desenvolvimento auditivo',
        lessons: 10,
        completed: 10,
        level: 'Concluído',
        emoji: '🎼',
        color: 'from-green-400 to-green-600',
        slug: 'metodo-kodaly'
      },
      {
        id: 4,
        title: 'Musical Futures',
        description: 'Abordagem inglesa de aprendizado informal',
        lessons: 8,
        completed: 0,
        level: 'Não iniciado',
        emoji: '🎸',
        color: 'from-orange-400 to-orange-600',
        slug: 'musical-futures'
      },
      {
        id: 5,
        title: 'Dalcroze Euritmia',
        description: 'Método suíço integrando música, movimento e expressão corporal',
        lessons: 14,
        completed: 3,
        level: 'Em progresso',
        emoji: '💃',
        color: 'from-pink-400 to-pink-600',
        slug: 'dalcroze-euritmia'
      },
      {
        id: 6,
        title: 'Gordon Music Learning Theory',
        description: 'Teoria americana de aprendizagem musical auditiva',
        lessons: 11,
        completed: 0,
        level: 'Não iniciado',
        emoji: '👂',
        color: 'from-indigo-400 to-indigo-600',
        slug: 'gordon-music-learning-theory'
      },
      {
        id: 7,
        title: 'Waldorf Steiner',
        description: 'Pedagogia alemã com foco no desenvolvimento integral da criança',
        lessons: 12,
        completed: 0,
        level: 'Não iniciado',
        emoji: '🌱',
        color: 'from-emerald-400 to-emerald-600',
        slug: 'waldorf-steiner'
      },
      {
        id: 8,
        title: 'Berklee Contemporânea',
        description: 'Abordagem americana contemporânea para ensino musical',
        lessons: 15,
        completed: 0,
        level: 'Não iniciado',
        emoji: '🎷',
        color: 'from-amber-400 to-amber-600',
        slug: 'berklee-contemporanea'
      },
      {
        id: 9,
        title: 'Lincoln Center Education',
        description: 'Metodologia americana de educação artística integrada',
        lessons: 10,
        completed: 0,
        level: 'Não iniciado',
        emoji: '🏛️',
        color: 'from-slate-400 to-slate-600',
        slug: 'lincoln-center'
      },
      {
        id: 10,
        title: 'PRESTO Project',
        description: 'Projeto europeu de ensino digital e inovação musical',
        lessons: 8,
        completed: 0,
        level: 'Não iniciado',
        emoji: '💻',
        color: 'from-cyan-400 to-cyan-600',
        slug: 'presto-project'
      },
      {
        id: 11,
        title: 'Experiências Brasileiras',
        description: 'Metodologias e experiências inovadoras do Brasil',
        lessons: 13,
        completed: 0,
        level: 'Não iniciado',
        emoji: '🇧🇷',
        color: 'from-green-500 to-yellow-500',
        slug: 'experiencias-brasileiras'
      }
    ];
    
    setModules(mockModules);
  }, []);

  const stats = getModuleStats();

  const getStatusColor = (level) => {
    switch (level) {
      case 'Concluído': return 'text-green-600 bg-green-100';
      case 'Em progresso': return 'text-blue-600 bg-blue-100';
      case 'Não iniciado': return 'text-gray-600 bg-gray-100';
      default: return 'text-orange-600 bg-orange-100';
    }
  };

  const getProgressPercentage = (completed, total) => {
    return Math.round((completed / total) * 100);
  };

  if (loading) {
    return (
      <NipoBackground>
        <NipoLoading text="Carregando módulos..." />
      </NipoBackground>
    );
  }

  return (
    <NipoBackground>
      <NipoHeader />
      
      <NipoContainer>
        {/* Header */}
        <NipoSection>
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate('/alunos/dashboard')}
              className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-red-500" />
                Módulos de Ensino
              </h1>
              <p className="text-gray-600 mt-1">
                Metodologias mundiais de educação musical
              </p>
            </div>
          </div>
        </NipoSection>

        {/* Stats Overview */}
        <NipoSection>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-full">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{modules.length}</p>
                  <p className="text-sm text-gray-600">Total de Módulos</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 rounded-full">
                  <Check className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">
                    {modules.filter(m => m.level === 'Concluído').length}
                  </p>
                  <p className="text-sm text-gray-600">Concluídos</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-orange-100 rounded-full">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">
                    {modules.filter(m => m.level === 'Em progresso' || m.level === 'Iniciante').length}
                  </p>
                  <p className="text-sm text-gray-600">Em Progresso</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-100 rounded-full">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{stats.averageProgress}%</p>
                  <p className="text-sm text-gray-600">Progresso Médio</p>
                </div>
              </div>
            </div>
          </div>
        </NipoSection>

        {/* Modules Grid */}
        <NipoSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => {
              const progress = getProgressPercentage(module.completed, module.lessons);
              
              return (
                <div
                  key={module.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group"
                  onClick={() => navigate(`/curriculum/metodologia/${module.slug}`)}
                >
                  {/* Header com gradiente */}
                  <div className={`h-20 bg-gradient-to-r ${module.color} relative`}>
                    <div className="absolute inset-0 bg-black bg-opacity-10"></div>
                    <div className="absolute bottom-4 left-6 flex items-center gap-3">
                      <span className="text-3xl">{module.emoji}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(module.level)}`}>
                        {module.level}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-red-600 transition-colors duration-200">
                      {module.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {module.description}
                    </p>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">
                          {module.completed}/{module.lessons} aulas
                        </span>
                        <span className="text-sm font-medium text-gray-800">
                          {progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`bg-gradient-to-r ${module.color} h-2 rounded-full transition-all duration-300`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Action */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Play className="w-4 h-4" />
                        <span>{module.level === 'Concluído' ? 'Revisar' : module.level === 'Não iniciado' ? 'Iniciar' : 'Continuar'}</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors duration-200" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </NipoSection>

        {/* Call to Action */}
        <NipoSection>
          <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-2">
              🌸 Explore o Mundo da Música
            </h2>
            <p className="mb-6 opacity-90">
              Descubra metodologias de ensino de diferentes países e culturas
            </p>
            <button 
              onClick={() => navigate('/alunos/centro-estudos')}
              className="bg-white text-red-600 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors duration-200"
            >
              Ver Centro de Estudos
            </button>
          </div>
        </NipoSection>
      </NipoContainer>
    </NipoBackground>
  );
};

export default ModulosPage;