import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Calendar, 
  Book, 
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Share2,
  Sun,
  Moon,
  Sunset
} from 'lucide-react';
import { useAuth } from '../../../shared/contexts/AuthContext';
import { useDevotionals } from '../hooks/useDevotionals';
import NipoHeader from '../../../shared/components/UI/NipoHeader';
import { 
  NipoBackground, 
  NipoContainer, 
  NipoSection,
  NipoLoading
} from '../../../shared/components/UI/NipoUI';

const DevocionalPage = () => {
  const { userProfile } = useAuth();
  const navigate = useNavigate();
  const { devotionals, loading, getTodayDevotional, markAsRead } = useDevotionals();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [devotional, setDevotional] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    // Usar dados reais do banco de dados
    if (devotionals.length > 0) {
      const todayDevotional = getTodayDevotional();
      if (todayDevotional) {
        setDevotional(todayDevotional);
        setIsBookmarked(todayDevotional.is_favorite || false);
      } else {
        // Fallback para primeiro devocional disponível
        setDevotional(devotionals[0]);
        setIsBookmarked(devotionals[0]?.is_favorite || false);
      }
    } else if (!loading) {
      // Fallback para dados simulados se não houver devocionais
      const mockDevotional = {
        id: 'mock-1',
        date: currentDate.toISOString().split('T')[0],
        title: 'A Melodia da Gratidão',
        bible_verse: 'Cantai ao Senhor com ações de graças; entoai louvores com harpa ao nosso Deus.',
        bible_reference: 'Salmos 147:7',
        content: `A música tem o poder único de expressar aquilo que as palavras sozinhas não conseguem transmitir. Quando cantamos ou tocamos com gratidão no coração, nossa música se torna uma ponte entre o terreno e o celestial.

Hoje, ao praticar seu instrumento ou estudar música, lembre-se de que cada nota pode ser uma oração, cada melodia pode ser um louvor. A disciplina musical que desenvolvemos reflete nossa dedicação não apenas à arte, mas também ao crescimento pessoal e espiritual.

Assim como cada instrumento tem sua função única em uma orquestra, cada pessoa tem seu papel especial no grande concerto da vida. Sua música, seja ela qual for, é importante e valiosa.

Que possamos hoje encontrar motivos para sermos gratos e expressar essa gratidão através da música que criamos e compartilhamos.`,
        reflection: 'Como posso usar minha música para expressar gratidão hoje?',
        prayer: 'Senhor, que minha música seja sempre um reflexo da gratidão que sinto em meu coração. Ajuda-me a ver cada lição, cada prática, cada apresentação como uma oportunidade de crescer e de servir. Amém.',
        musicTheme: '🎵 Tema Musical',
        musicContent: 'Experimente tocar ou cantar uma música que expresse gratidão. Observe como isso afeta seu coração e sua perspectiva do dia.',
        category: 'gratidao',
        readTime: '3 min',
        is_read: false,
        is_favorite: false
      };
      
      setDevotional(mockDevotional);
    }
  }, [devotionals, loading, getTodayDevotional, currentDate]);

  // Marcar como lido ao abrir
  useEffect(() => {
    if (devotional && devotional.id !== 'mock-1' && !devotional.is_read && userProfile) {
      markAsRead(devotional.id);
    }
  }, [devotional, userProfile, markAsRead]);

  // Função para favoritar/desfavoritar
  const toggleBookmark = async () => {
    if (devotional && devotional.id !== 'mock-1') {
      try {
        // Atualizar no banco de dados através do hook
        await markAsRead(devotional.id, { is_favorite: !isBookmarked });
        setIsBookmarked(!isBookmarked);
      } catch (error) {
        console.error('Erro ao atualizar favorito:', error);
      }
    } else {
      // Para dados simulados
      setIsBookmarked(!isBookmarked);
    }
  };

  // Função para navegar para próximo/anterior
  const navigateDevotional = (direction) => {
    if (devotionals.length > 0) {
      const currentIndex = devotionals.findIndex(d => d.id === devotional.id);
      let nextIndex;
      
      if (direction === 'next') {
        nextIndex = currentIndex < devotionals.length - 1 ? currentIndex + 1 : 0;
      } else {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : devotionals.length - 1;
      }
      
      if (nextIndex >= 0) {
        const nextDevotional = devotionals[nextIndex];
        setDevotional(nextDevotional);
        setIsBookmarked(nextDevotional.is_favorite || false);
      }
    }
  };

  const getTimeOfDayIcon = () => {
    const hour = new Date().getHours();
    if (hour < 12) return Sun;
    if (hour < 18) return Sun;
    if (hour < 20) return Sunset;
    return Moon;
  };

  const getTimeOfDayGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia! ☀️';
    if (hour < 18) return 'Boa tarde! 🌤️';
    return 'Boa noite! 🌙';
  };

  const navigateDate = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + direction);
    setCurrentDate(newDate);
  };

  const isToday = () => {
    const today = new Date();
    return currentDate.toDateString() === today.toDateString();
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const TimeIcon = getTimeOfDayIcon();

  if (loading) {
    return (
      <NipoBackground>
        <NipoLoading text="Carregando devocional..." />
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
                <Heart className="w-8 h-8 text-red-500" />
                Devocional Diário
              </h1>
              <p className="text-gray-600 mt-1">
                {getTimeOfDayGreeting()} Reflexões para sua jornada musical
              </p>
            </div>
          </div>
        </NipoSection>

        {/* Date Navigation */}
        <NipoSection>
          <div className="bg-white rounded-xl p-4 shadow-md mb-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigateDate(-1)}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              
              <div className="text-center">
                <div className="flex items-center gap-2 text-lg font-bold text-gray-800">
                  <Calendar className="w-5 h-5 text-red-500" />
                  {formatDate(currentDate)}
                </div>
                {isToday() && (
                  <span className="inline-block px-3 py-1 bg-red-100 text-red-600 text-sm rounded-full mt-1">
                    Hoje
                  </span>
                )}
              </div>
              
              <button
                onClick={() => navigateDate(1)}
                disabled={isToday()}
                className={`p-2 rounded-full transition-colors duration-200 ${
                  isToday() 
                    ? 'bg-gray-50 text-gray-300 cursor-not-allowed' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </NipoSection>

        {devotional && (
          <>
            {/* Main Devotional Card */}
            <NipoSection>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-red-500 to-pink-600 p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <TimeIcon className="w-8 h-8" />
                      <div>
                        <h2 className="text-2xl font-bold">{devotional.title}</h2>
                        <p className="text-red-100">Tempo de leitura: {devotional.readTime}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={toggleBookmark}
                        className={`p-2 rounded-full transition-colors duration-200 ${
                          isBookmarked ? 'bg-yellow-400 text-yellow-800' : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                        }`}
                      >
                        <Bookmark className="w-5 h-5" />
                      </button>
                      <button className="p-2 rounded-full bg-white bg-opacity-20 text-white hover:bg-opacity-30 transition-colors duration-200">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Verse */}
                  <div className="bg-white bg-opacity-10 rounded-lg p-4">
                    <p className="text-lg italic text-center mb-2">
                      "{devotional.bible_verse}"
                    </p>
                    <p className="text-center text-red-100 font-medium">
                      {devotional.bible_reference}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  {/* Main Content */}
                  <div className="prose prose-gray max-w-none">
                    {devotional.content.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-gray-700 leading-relaxed mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Musical Theme */}
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <Book className="w-5 h-5 text-purple-600" />
                      {devotional.musicTheme}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {devotional.musicContent}
                    </p>
                  </div>

                  {/* Reflection */}
                  <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-lg p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-3">
                      💭 Reflexão do Dia
                    </h3>
                    <p className="text-gray-700 italic">
                      {devotional.reflection}
                    </p>
                  </div>

                  {/* Prayer */}
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-3">
                      🙏 Oração
                    </h3>
                    <p className="text-gray-700 italic leading-relaxed">
                      {devotional.prayer}
                    </p>
                  </div>
                </div>
              </div>
            </NipoSection>

            {/* Action Buttons */}
            <NipoSection>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  onClick={() => navigate('/alunos/centro-estudos')}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-200 text-center group"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-200 transition-colors duration-200">
                    <Book className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">Centro de Estudos</h3>
                  <p className="text-gray-600 text-sm">
                    Continue sua jornada de aprendizado musical
                  </p>
                </button>

                <button 
                  onClick={() => navigate('/alunos/progresso')}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-200 text-center group"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-green-200 transition-colors duration-200">
                    <Heart className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">Meu Progresso</h3>
                  <p className="text-gray-600 text-sm">
                    Veja como você está crescendo musicalmente
                  </p>
                </button>
              </div>
            </NipoSection>
          </>
        )}

        {/* Quote of the Day */}
        <NipoSection>
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-8 text-center text-white">
            <h2 className="text-xl font-bold mb-4">
              ✨ Pensamento do Dia
            </h2>
            <p className="text-lg italic mb-2">
              "A música é a linguagem universal da humanidade"
            </p>
            <p className="text-indigo-100">
              - Henry Wadsworth Longfellow
            </p>
          </div>
        </NipoSection>
      </NipoContainer>
    </NipoBackground>
  );
};

export default DevocionalPage;