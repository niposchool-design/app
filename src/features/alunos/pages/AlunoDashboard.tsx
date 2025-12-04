// 🎌 ALUNO DASHBOARD - Sistema Oriental Unificado
// Implementação gamificada baseada na documentação oficial

import React from 'react';
import { 
  BookOpen, 
  Music, 
  Trophy, 
  Calendar,
  Star,
  Target,
  Clock,
  Users,
  TrendingUp,
  Award,
  Zap
} from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { OrientalContainer } from '../../../components/oriental/OrientalContainer';
import { NipoCard, NipoGrid, NipoGamifiedCard, NipoStatCard } from '../../../components/ui/NipoCard';
import { GAMIFICATION } from '../../../lib/constants/design';

// Mock data baseado no sistema de gamificação
const mockStudentData = {
  name: 'Akira Tanaka',
  level: 3,
  xp: 450,
  nextLevelXp: 700,
  weeklyGoal: 5,
  completedLessons: 3,
  instruments: ['Piano', 'Violino'],
  upcomingClass: 'Piano Básico - Hoje às 14:00',
  achievements: ['Primeira Semana', 'Aluno Dedicado', 'Prática Diária'],
  stats: {
    totalLessons: 24,
    practiceHours: 18,
    classmates: 12,
    assignments: 8
  }
};

export const AlunoDashboard: React.FC = () => {
  const { user } = useAuth();
  const { name, level, xp, nextLevelXp, weeklyGoal, completedLessons } = mockStudentData;
  const progress = (xp / nextLevelXp) * 100;
  const levelTitle = GAMIFICATION.levels.titles[level];
  const userName = user?.email?.split('@')[0] || name;

  return (
    <OrientalContainer 
      role="student"
      showPhilosophy
      title="Centro de Estudos"
      subtitle={`こんにちは, ${userName}! 🎌`}
    >
      <NipoGrid role="student">
        {/* Card Principal - Level e XP */}
        <NipoGamifiedCard
          role="student"
          title={`Nível ${level} - ${levelTitle.pt}`}
          value={`${xp} XP`}
          subtitle={`${levelTitle.jp} • Próximo nível: ${nextLevelXp} XP`}
          icon={<Star className="w-16 h-16 text-yellow-500" />}
        >
          <div className="space-y-4">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progresso para Nível {level + 1}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Meta Semanal */}
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-700">Meta Semanal</p>
                  <p className="text-lg font-semibold text-green-800">
                    {completedLessons}/{weeklyGoal} aulas
                  </p>
                </div>
                <Target className="w-8 h-8 text-green-600" />
              </div>
            </div>

            {/* XP Boost */}
            <div className="bg-yellow-50 rounded-lg p-3 text-center">
              <Zap className="w-6 h-6 text-yellow-600 mx-auto mb-1" />
              <p className="text-xs text-yellow-700">Complete mais uma aula para +25 XP!</p>
            </div>
          </div>
        </NipoGamifiedCard>

        {/* Próximas Aulas */}
        <NipoCard
          role="student"
          title="Próximas Aulas"
          subtitle="Sua jornada musical continua"
          icon={<Calendar className="w-16 h-16 text-blue-500" />}
        >
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="font-medium text-blue-800">Piano Básico</p>
              <div className="flex items-center gap-2 text-sm text-blue-600 mt-1">
                <Clock className="w-4 h-4" />
                <span>Hoje às 14:00</span>
              </div>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-3">
              <p className="font-medium text-purple-800">Teoria Musical</p>
              <div className="flex items-center gap-2 text-sm text-purple-600 mt-1">
                <Clock className="w-4 h-4" />
                <span>Amanhã às 10:00</span>
              </div>
            </div>
            
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors text-sm">
              Ver Cronograma Completo
            </button>
          </div>
        </NipoCard>

        {/* Instrumentos */}
        <NipoCard
          role="student"
          title="Meus Instrumentos"
          icon={<Music className="w-16 h-16 text-purple-500" />}
        >
          <div className="space-y-3">
            {mockStudentData.instruments.map((instrument, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Music className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <span className="text-purple-700 font-medium">{instrument}</span>
                  <div className="text-xs text-purple-600">Nível {index + 2}</div>
                </div>
                <TrendingUp className="w-4 h-4 text-purple-500" />
              </div>
            ))}
            
            <button className="w-full mt-3 text-purple-600 border border-purple-200 py-2 px-4 rounded-lg hover:bg-purple-50 transition-colors text-sm">
              + Adicionar Instrumento
            </button>
          </div>
        </NipoCard>

        {/* Conquistas */}
        <NipoCard
          role="student"
          title="Conquistas Recentes"
          icon={<Trophy className="w-16 h-16 text-yellow-500" />}
        >
          <div className="space-y-2">
            {mockStudentData.achievements.slice(0, 3).map((achievement, index) => (
              <div key={index} className="flex items-center gap-3 p-2 bg-yellow-50 rounded-lg">
                <Award className="w-6 h-6 text-yellow-600" />
                <span className="text-yellow-700 font-medium text-sm">{achievement}</span>
              </div>
            ))}
            
            <div className="text-center mt-4">
              <button className="text-yellow-600 hover:text-yellow-700 text-sm">
                Ver Todas ({mockStudentData.achievements.length})
              </button>
            </div>
          </div>
        </NipoCard>
      </NipoGrid>

      {/* Stats Row */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">📊 Suas Estatísticas</h3>
        
        <NipoGrid role="student">
          <NipoStatCard
            role="student"
            title="Aulas Concluídas"
            value={mockStudentData.stats.totalLessons}
            subtitle="Total de aulas"
            icon={<BookOpen className="w-12 h-12 text-blue-500" />}
          />
          
          <NipoStatCard
            role="student"
            title="Horas de Prática"
            value={`${mockStudentData.stats.practiceHours}h`}
            subtitle="Tempo praticando"
            icon={<Clock className="w-12 h-12 text-green-500" />}
          />
          
          <NipoStatCard
            role="student"
            title="Colegas de Turma"
            value={mockStudentData.stats.classmates}
            subtitle="Amigos musicais"
            icon={<Users className="w-12 h-12 text-purple-500" />}
          />
          
          <NipoStatCard
            role="student"
            title="Atividades"
            value={mockStudentData.stats.assignments}
            subtitle="Tarefas completas"
            icon={<Target className="w-12 h-12 text-yellow-500" />}
          />
        </NipoGrid>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">⚡ Ações Rápidas</h3>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group hover:scale-105">
            <BookOpen className="w-8 h-8 text-blue-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-gray-700">Minhas Aulas</span>
          </button>
          
          <button className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group hover:scale-105">
            <Music className="w-8 h-8 text-purple-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-gray-700">Praticar</span>
          </button>
          
          <button className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group hover:scale-105">
            <Calendar className="w-8 h-8 text-green-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-gray-700">Cronograma</span>
          </button>
          
          <button className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group hover:scale-105">
            <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-gray-700">Ranking</span>
          </button>
        </div>
      </div>

      {/* Motivational Quote */}
      <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 text-center">
        <div className="text-2xl mb-2">🎌</div>
        <p className="text-green-800 font-medium mb-1">継続は力なり</p>
        <p className="text-green-600 text-sm italic">A continuidade é força - Continue praticando!</p>
      </div>
    </OrientalContainer>
  );
};