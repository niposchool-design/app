
import { Play, Star, Trophy, Target } from 'lucide-react'
import { getTodasAulas } from '@/src/lib/supabase/queries/aulas';
import Link from 'next/link';

export default async function StudentDashboard() {
  const aulas = await getTodasAulas();

  // Simulação de próxima aula (pegar a primeira da lista ou uma random para demo se vazia)
  const proximaAula = aulas.length > 0 ? aulas[0] : {
    titulo: 'Introdução ao Hiragana',
    descricao_curta: 'Aprenda os fundamentos da escrita japonesa e comece a ler suas primeiras palavras.',
    id: '#'
  };

  return (
    <>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Konnichiwa, Aluno-san! 🎌
        </h1>
        <p className="text-gray-600">
          Sua jornada de aprendizado continua. O esforço de hoje é a maestria de amanhã.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-red-100 hover:shadow-md transition-all group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-50 rounded-xl group-hover:bg-red-100 transition-colors">
              <Star className="w-6 h-6 text-red-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">Level 3</span>
          </div>
          <h3 className="text-gray-600 font-medium">Nível Atual</h3>
          <div className="w-full bg-gray-100 h-2 rounded-full mt-3 overflow-hidden">
            <div className="bg-red-500 h-full rounded-full w-[70%]"></div>
          </div>
          <p className="text-xs text-gray-500 mt-2">700/1000 XP para o próximo nível</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-red-100 hover:shadow-md transition-all group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-50 rounded-xl group-hover:bg-orange-100 transition-colors">
              <Trophy className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">12</span>
          </div>
          <h3 className="text-gray-600 font-medium">Conquistas Desbloqueadas</h3>
          <p className="text-xs text-gray-500 mt-2">Você é um guerreiro dedicado!</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-red-100 hover:shadow-md transition-all group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-pink-50 rounded-xl group-hover:bg-pink-100 transition-colors">
              <Target className="w-6 h-6 text-pink-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">5 dias</span>
          </div>
          <h3 className="text-gray-600 font-medium">Sequência de Estudos</h3>
          <p className="text-xs text-gray-500 mt-2">Mantenha o ritmo!</p>
        </div>
      </div>

      {/* Next Lesson Card */}
      <Link href={`/alunos/aulas/${proximaAula.id !== '#' ? proximaAula.numero : ''}`} className="block">
        <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden group cursor-pointer transform hover:scale-[1.01] transition-all">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full -ml-10 -mb-10 blur-2xl"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-sm font-medium mb-3">
                Próxima Aula
              </div>
              <h2 className="text-3xl font-bold mb-2">{proximaAula.titulo}</h2>
              <p className="text-red-100 max-w-lg line-clamp-2">
                {proximaAula.descricao_curta || proximaAula.objetivo_didatico || 'Continue sua jornada de aprendizado.'}
              </p>
            </div>

            <button className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-red-50 transition-colors flex items-center gap-2 group-hover:gap-3">
              <Play className="w-5 h-5 fill-current" />
              Continuar
            </button>
          </div>
        </div>
      </Link>
    </>
  )
}
