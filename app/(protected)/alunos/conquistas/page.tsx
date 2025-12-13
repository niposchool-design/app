import { Suspense } from 'react'
import { 
  Trophy, 
  Medal, 
  Star, 
  Crown, 
  Target, 
  Zap, 
  Award, 
  Lock,
  Sparkles
} from 'lucide-react'
import { getConquistasUsuario, getTodasConquistas } from '@/src/lib/supabase/queries/gamification'

export const metadata = {
  title: 'Minhas Conquistas | Nipo School',
  description: 'Acompanhe seu progresso e conquistas no Nipo School',
}

async function ConquistasContent() {
  const [conquistasUsuario, todasConquistas] = await Promise.all([
    getConquistasUsuario(),
    getTodasConquistas()
  ])

  const totalPontos = conquistasUsuario.reduce((acc, curr) => acc + (curr.achievement.pontos_recompensa || 0), 0)
  const totalDesbloqueadas = conquistasUsuario.length
  const totalDisponiveis = todasConquistas.length
  const progressoGeral = totalDisponiveis > 0 ? Math.round((totalDesbloqueadas / totalDisponiveis) * 100) : 0

  // Map de ícones
  const IconMap: Record<string, any> = {
    'trophy': Trophy,
    'medal': Medal,
    'star': Star,
    'crown': Crown,
    'target': Target,
    'zap': Zap,
    'award': Award,
  }

  // Map de cores por raridade
  const RarityColors: Record<string, string> = {
    'comum': 'bg-slate-100 text-slate-600 border-slate-200',
    'raro': 'bg-blue-50 text-blue-600 border-blue-200',
    'epico': 'bg-purple-50 text-purple-600 border-purple-200',
    'lendario': 'bg-amber-50 text-amber-600 border-amber-200',
  }

  const RarityBadges: Record<string, string> = {
    'comum': 'bg-slate-200 text-slate-700',
    'raro': 'bg-blue-200 text-blue-800',
    'epico': 'bg-purple-200 text-purple-800',
    'lendario': 'bg-amber-200 text-amber-800',
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
              <Trophy className="w-8 h-8 text-yellow-300" />
              Galeria de Conquistas
            </h1>
            <p className="text-red-100 text-lg">
              Sua jornada de honra e dedicação registrada em cada medalha.
            </p>
          </div>

          <div className="flex gap-4">
            <div className="bg-black/20 backdrop-blur-sm p-4 rounded-2xl border border-white/10 text-center min-w-[120px]">
              <div className="text-3xl font-bold text-yellow-300">{totalPontos}</div>
              <div className="text-xs text-red-100 uppercase tracking-wider font-medium">Pontos de Honra</div>
            </div>
            <div className="bg-black/20 backdrop-blur-sm p-4 rounded-2xl border border-white/10 text-center min-w-[120px]">
              <div className="text-3xl font-bold text-white">{totalDesbloqueadas}/{totalDisponiveis}</div>
              <div className="text-xs text-red-100 uppercase tracking-wider font-medium">Conquistas</div>
            </div>
          </div>
        </div>

        {/* Barra de Progresso Geral */}
        <div className="mt-8 bg-black/20 rounded-full h-4 overflow-hidden backdrop-blur-sm border border-white/10">
          <div 
            className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-1000 ease-out relative"
            style={{ width: `${progressoGeral}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
          </div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-red-100 font-medium">
          <span>Iniciado</span>
          <span>{progressoGeral}% Completo</span>
          <span>Mestre</span>
        </div>
      </div>

      {/* Grid de Conquistas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {todasConquistas.map((conquista) => {
          const desbloqueada = conquistasUsuario.find(c => c.achievement_id === conquista.id)
          const Icon = IconMap[conquista.icone] || Award
          const rarityStyle = RarityColors[conquista.raridade] || RarityColors['comum']
          const badgeStyle = RarityBadges[conquista.raridade] || RarityBadges['comum']

          return (
            <div 
              key={conquista.id}
              className={`relative group rounded-2xl p-6 border transition-all duration-300 ${
                desbloqueada 
                  ? `bg-white shadow-sm hover:shadow-md ${rarityStyle}` 
                  : 'bg-gray-50 border-gray-200 opacity-70 hover:opacity-100'
              }`}
            >
              {/* Badge de Raridade */}
              <div className={`absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${desbloqueada ? badgeStyle : 'bg-gray-200 text-gray-500'}`}>
                {conquista.raridade}
              </div>

              <div className="flex items-start gap-4">
                <div className={`p-4 rounded-2xl ${
                  desbloqueada 
                    ? 'bg-white shadow-inner' 
                    : 'bg-gray-200 grayscale'
                }`}>
                  {desbloqueada ? (
                    <Icon className={`w-8 h-8 ${
                      conquista.raridade === 'lendario' ? 'text-amber-500' :
                      conquista.raridade === 'epico' ? 'text-purple-500' :
                      conquista.raridade === 'raro' ? 'text-blue-500' :
                      'text-slate-500'
                    }`} />
                  ) : (
                    <Lock className="w-8 h-8 text-gray-400" />
                  )}
                </div>

                <div className="flex-1">
                  <h3 className={`font-bold text-lg mb-1 ${desbloqueada ? 'text-gray-900' : 'text-gray-500'}`}>
                    {conquista.nome}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-3">
                    {conquista.descricao}
                  </p>
                  
                  {desbloqueada ? (
                    <div className="flex items-center gap-2 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-lg inline-block">
                      <Sparkles className="w-3 h-3" />
                      Desbloqueada em {new Date(desbloqueada.earned_at).toLocaleDateString('pt-BR')}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-xs font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded-lg inline-block">
                      <Target className="w-3 h-3" />
                      {conquista.condicao_meta ? `Meta: ${conquista.condicao_meta}` : 'Bloqueada'}
                    </div>
                  )}
                </div>
              </div>

              {/* Pontos */}
              <div className={`mt-4 pt-4 border-t ${desbloqueada ? 'border-black/5' : 'border-gray-200'} flex justify-between items-center`}>
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Recompensa</span>
                <span className={`font-bold ${desbloqueada ? 'text-yellow-600' : 'text-gray-400'}`}>
                  +{conquista.pontos_recompensa} XP
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function ConquistasPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    }>
      <ConquistasContent />
    </Suspense>
  )
}
