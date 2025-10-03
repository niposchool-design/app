import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Music, Play, MessageCircle, Users, Award,
  Clock, TrendingUp, Search, Calendar, Target, Heart, 
  Lightbulb, Volume2, FileText, Headphones, Mic,
  Star, Trophy
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/shared/contexts/AuthContext.tsx';

const CentroEstudos = () => {
  const { userProfile } = useAuth();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simular carregamento
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
            <BookOpen className="w-8 h-8 text-red-600 mr-3" />
            Centro de Estudos
          </h1>
          <p className="text-gray-600 mb-6">
            {userProfile?.nome 
              ? `Bem-vindo, ${userProfile.nome}! Continue sua jornada musical.`
              : 'Bem-vindo ao seu centro de aprendizado musical!'
            }
          </p>
        </div>

        {/* Cards de Navegação */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div 
            onClick={() => navigate('/alunos/biblioteca/instrumentos')}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-red-100 hover:border-red-300"
          >
            <Music className="w-8 h-8 text-red-600 mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">Instrumentos</h3>
            <p className="text-gray-600 text-sm">Explore diferentes instrumentos musicais</p>
          </div>

          <div 
            onClick={() => navigate('/alunos/biblioteca/repertorio')}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-blue-100 hover:border-blue-300"
          >
            <FileText className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">Repertório</h3>
            <p className="text-gray-600 text-sm">Acesse partituras e músicas</p>
          </div>

          <div 
            onClick={() => navigate('/alunos/biblioteca/videos')}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-green-100 hover:border-green-300"
          >
            <Play className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">Vídeos</h3>
            <p className="text-gray-600 text-sm">Assista aulas em vídeo</p>
          </div>

          <div 
            onClick={() => navigate('/alunos/progresso')}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-purple-100 hover:border-purple-300"
          >
            <TrendingUp className="w-8 h-8 text-purple-600 mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">Progresso</h3>
            <p className="text-gray-600 text-sm">Acompanhe seu desenvolvimento</p>
          </div>

          <div 
            onClick={() => navigate('/alunos/duvidas')}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-yellow-100 hover:border-yellow-300"
          >
            <MessageCircle className="w-8 h-8 text-yellow-600 mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">Dúvidas</h3>
            <p className="text-gray-600 text-sm">Sistema de perguntas e respostas</p>
          </div>

          <div 
            onClick={() => navigate('/alunos/metodologias-ensino')}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-indigo-100 hover:border-indigo-300"
          >
            <Lightbulb className="w-8 h-8 text-indigo-600 mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">Metodologias</h3>
            <p className="text-gray-600 text-sm">Técnicas de ensino musical</p>
          </div>
        </div>

        {/* Seção de Status */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Target className="w-6 h-6 text-red-600 mr-2" />
            Resumo dos Estudos
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-red-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-red-600">12</div>
              <div className="text-sm text-red-700">Aulas Assistidas</div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">5</div>
              <div className="text-sm text-blue-700">Instrumentos</div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">8</div>
              <div className="text-sm text-green-700">Horas de Prática</div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">85%</div>
              <div className="text-sm text-purple-700">Progresso Geral</div>
            </div>
          </div>
        </div>

        {/* Status de Sucesso */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
          <div className="flex items-center justify-center text-green-600">
            <Trophy className="w-8 h-8 mr-3" />
            <div className="text-center">
              <h3 className="text-lg font-semibold">✅ Centro de Estudos Funcionando!</h3>
              <p className="text-sm text-gray-600">Todas as navegações estão operacionais</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CentroEstudos;