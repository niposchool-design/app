import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Trophy, 
  Star, 
  Medal, 
  Award,
  Crown,
  ArrowLeft,
  Lock,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../../../shared/contexts/AuthContext';
import { useAchievements } from '../hooks/useAchievements';
import NipoHeader from '../../../shared/components/UI/NipoHeader';
import { 
  NipoBackground, 
  NipoContainer, 
  NipoSection,
  NipoLoading
} from '../../../shared/components/UI/NipoUI';

const ConquistasPage = () => {
  const { userProfile } = useAuth();
  const navigate = useNavigate();
  const { loading, getAchievementStats } = useAchievements();
  const [achievements, setAchievements] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    // Conquistas simuladas baseadas no sistema de gamificação
    const mockAchievements = [
      {
        id: 1,
        title: 'Primeiro Passo',
        description: 'Complete sua primeira aula',
        icon: Star,
        category: 'inicio',
        earned: true,
        earnedDate: '2024-03-15',
        points: 10,
        rarity: 'comum',
        color: 'from-blue-400 to-blue-600'
      },
      {
        id: 2,
        title: 'Dedicação Semanal',
        description: 'Estude por 7 dias consecutivos',
        icon: Trophy,
        category: 'frequencia',
        earned: true,
        earnedDate: '2024-03-20',
        points: 50,
        rarity: 'raro',
        color: 'from-green-400 to-green-600'
      },
      {
        id: 3,
        title: 'Mestre do Ritmo',
        description: 'Domine 10 exercícios rítmicos',
        icon: Medal,
        category: 'habilidade',
        earned: false,
        progress: 6,
        total: 10,
        points: 100,
        rarity: 'épico',
        color: 'from-purple-400 to-purple-600'
      },
      {
        id: 4,
        title: 'Explorador Cultural',
        description: 'Estude 3 metodologias diferentes',
        icon: Award,
        category: 'conhecimento',
        earned: true,
        earnedDate: '2024-03-25',
        points: 75,
        rarity: 'raro',
        color: 'from-orange-400 to-orange-600'
      },
      {
        id: 5,
        title: 'Virtuoso',
        description: 'Alcance 95% de precisão em 20 exercícios',
        icon: Crown,
        category: 'habilidade',
        earned: false,
        progress: 12,
        total: 20,
        points: 250,
        rarity: 'lendário',
        color: 'from-yellow-400 to-yellow-600'
      },
      {
        id: 6,
        title: 'Mentor Musical',
        description: 'Ajude 5 colegas nas dúvidas',
        icon: Trophy,
        category: 'social',
        earned: false,
        progress: 2,
        total: 5,
        points: 150,
        rarity: 'épico',
        color: 'from-pink-400 to-pink-600'
      },
      {
        id: 7,
        title: 'Descobridor',
        description: 'Use o QR Scanner pela primeira vez',
        icon: Star,
        category: 'tecnologia',
        earned: true,
        earnedDate: '2024-03-10',
        points: 25,
        rarity: 'comum',
        color: 'from-indigo-400 to-indigo-600'
      },
      {
        id: 8,
        title: 'Colecionador',
        description: 'Obtenha 10 conquistas',
        icon: Medal,
        category: 'colecao',
        earned: false,
        progress: 4,
        total: 10,
        points: 200,
        rarity: 'épico',
        color: 'from-red-400 to-red-600'
      }
    ];
    
    setAchievements(mockAchievements);
  }, []);

  const categories = [
    { id: 'all', label: 'Todas', count: achievements.length },
    { id: 'inicio', label: 'Início', count: achievements.filter(a => a.category === 'inicio').length },
    { id: 'frequencia', label: 'Frequência', count: achievements.filter(a => a.category === 'frequencia').length },
    { id: 'habilidade', label: 'Habilidade', count: achievements.filter(a => a.category === 'habilidade').length },
    { id: 'conhecimento', label: 'Conhecimento', count: achievements.filter(a => a.category === 'conhecimento').length },
    { id: 'social', label: 'Social', count: achievements.filter(a => a.category === 'social').length },
    { id: 'tecnologia', label: 'Tecnologia', count: achievements.filter(a => a.category === 'tecnologia').length },
    { id: 'colecao', label: 'Coleção', count: achievements.filter(a => a.category === 'colecao').length }
  ];

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements.filter(a => a.category === selectedCategory);

  const earnedCount = achievements.filter(a => a.earned).length;
  const totalPoints = achievements.filter(a => a.earned).reduce((sum, a) => sum + a.points, 0);

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'comum': return 'text-gray-600 bg-gray-100';
      case 'raro': return 'text-blue-600 bg-blue-100';
      case 'épico': return 'text-purple-600 bg-purple-100';
      case 'lendário': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRarityEmoji = (rarity) => {
    switch (rarity) {
      case 'comum': return '⚪';
      case 'raro': return '🔵';
      case 'épico': return '🟣';
      case 'lendário': return '🟡';
      default: return '⚪';
    }
  };

  if (loading) {
    return (
      <NipoBackground>
        <NipoLoading text="Carregando conquistas..." />
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
                <Trophy className="w-8 h-8 text-yellow-500" />
                Suas Conquistas
              </h1>
              <p className="text-gray-600 mt-1">
                Acompanhe seu progresso e desbloqueie novas medalhas
              </p>
            </div>
          </div>
        </NipoSection>

        {/* Stats Overview */}
        <NipoSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-xl p-6 text-white">
              <div className="flex items-center gap-3">
                <Trophy className="w-8 h-8" />
                <div>
                  <p className="text-3xl font-bold">{earnedCount}</p>
                  <p className="text-yellow-100">Conquistas Desbloqueadas</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-400 to-purple-600 rounded-xl p-6 text-white">
              <div className="flex items-center gap-3">
                <Star className="w-8 h-8" />
                <div>
                  <p className="text-3xl font-bold">{totalPoints}</p>
                  <p className="text-purple-100">Pontos Conquistados</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-xl p-6 text-white">
              <div className="flex items-center gap-3">
                <Medal className="w-8 h-8" />
                <div>
                  <p className="text-3xl font-bold">{Math.round((earnedCount / achievements.length) * 100)}%</p>
                  <p className="text-green-100">Progresso Total</p>
                </div>
              </div>
            </div>
          </div>
        </NipoSection>

        {/* Category Filter */}
        <NipoSection>
          <div className="bg-white rounded-xl p-4 shadow-md mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-red-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.label} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </NipoSection>

        {/* Achievements Grid */}
        <NipoSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAchievements.map((achievement) => {
              const IconComponent = achievement.icon;
              
              return (
                <div
                  key={achievement.id}
                  className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden ${
                    achievement.earned ? 'ring-2 ring-yellow-300' : 'opacity-75'
                  }`}
                >
                  {/* Header */}
                  <div className={`h-16 bg-gradient-to-r ${achievement.color} relative`}>
                    <div className="absolute inset-0 bg-black bg-opacity-10"></div>
                    <div className="absolute top-3 right-3">
                      {achievement.earned ? (
                        <CheckCircle className="w-6 h-6 text-white" />
                      ) : (
                        <Lock className="w-6 h-6 text-white opacity-60" />
                      )}
                    </div>
                    <div className="absolute bottom-2 left-4 flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(achievement.rarity)}`}>
                        {getRarityEmoji(achievement.rarity)} {achievement.rarity}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`p-3 rounded-full ${achievement.earned ? 'bg-yellow-100' : 'bg-gray-100'}`}>
                        <IconComponent className={`w-6 h-6 ${achievement.earned ? 'text-yellow-600' : 'text-gray-400'}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-lg font-bold mb-1 ${achievement.earned ? 'text-gray-800' : 'text-gray-500'}`}>
                          {achievement.title}
                        </h3>
                        <p className={`text-sm ${achievement.earned ? 'text-gray-600' : 'text-gray-400'}`}>
                          {achievement.description}
                        </p>
                      </div>
                    </div>

                    {/* Progress or Date */}
                    {achievement.earned ? (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-green-600 font-medium">
                          Conquistado em {new Date(achievement.earnedDate).toLocaleDateString('pt-BR')}
                        </span>
                        <span className="text-lg font-bold text-yellow-600">
                          +{achievement.points} pts
                        </span>
                      </div>
                    ) : achievement.progress !== undefined ? (
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">
                            Progresso: {achievement.progress}/{achievement.total}
                          </span>
                          <span className="text-sm font-medium text-gray-800">
                            {Math.round((achievement.progress / achievement.total) * 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`bg-gradient-to-r ${achievement.color} h-2 rounded-full transition-all duration-300`}
                            style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <span className="text-gray-500 text-sm">
                          🔒 Requisitos não atendidos
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </NipoSection>

        {/* Motivational Section */}
        <NipoSection>
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-2">
              🌟 Continue Conquistando!
            </h2>
            <p className="mb-6 opacity-90">
              Cada conquista representa um passo importante na sua jornada musical
            </p>
            <div className="flex justify-center gap-4">
              <button 
                onClick={() => navigate('/modulos')}
                className="bg-white text-indigo-600 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors duration-200"
              >
                Estudar Mais
              </button>
              <button 
                onClick={() => navigate('/alunos/progresso')}
                className="border-2 border-white text-white px-6 py-3 rounded-full font-medium hover:bg-white hover:text-indigo-600 transition-colors duration-200"
              >
                Ver Progresso
              </button>
            </div>
          </div>
        </NipoSection>
      </NipoContainer>
    </NipoBackground>
  );
};

export default ConquistasPage;