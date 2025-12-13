import { Suspense } from 'react'
import { 
  User, 
  Mail, 
  Shield, 
  Calendar, 
  Edit, 
  Camera,
  MapPin,
  Phone,
  Music,
  Star
} from 'lucide-react'
import { getCurrentProfile } from '@/src/lib/supabase/queries/users_turmas'
import { getConquistasUsuario } from '@/src/lib/supabase/queries/gamification'

export const metadata = {
  title: 'Meu Perfil | Nipo School',
  description: 'Gerencie suas informações pessoais',
}

async function PerfilContent() {
  const [perfil, conquistas] = await Promise.all([
    getCurrentProfile(),
    getConquistasUsuario()
  ])

  if (!perfil) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Perfil não encontrado</h2>
        <p className="text-gray-600">Não foi possível carregar suas informações.</p>
      </div>
    )
  }

  const totalPontos = conquistas.reduce((acc, curr) => acc + (curr.achievement.pontos_recompensa || 0), 0)

  return (
    <div className="space-y-8">
      {/* Header com Capa e Avatar */}
      <div className="relative mb-24">
        {/* Capa */}
        <div className="h-64 w-full bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl shadow-lg overflow-hidden relative">
          <div className="absolute inset-0 bg-pattern-asanoha opacity-10"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        </div>

        {/* Avatar e Info Principal */}
        <div className="absolute -bottom-16 left-8 md:left-12 flex items-end gap-6">
          <div className="relative group">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white bg-white shadow-xl overflow-hidden flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
              {perfil.avatar_url ? (
                <img src={perfil.avatar_url} alt={perfil.full_name || 'Avatar'} className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl font-bold text-gray-400">
                  {perfil.full_name?.charAt(0).toUpperCase() || 'U'}
                </span>
              )}
            </div>
            <button className="absolute bottom-2 right-2 p-2 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-colors" title="Alterar foto">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">{perfil.full_name}</h1>
            <div className="flex items-center gap-2 text-gray-600">
              <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold uppercase tracking-wider">
                {perfil.role}
              </span>
              <span className="text-sm flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                {totalPontos} XP
              </span>
            </div>
          </div>
        </div>

        {/* Botão Editar (Desktop) */}
        <div className="absolute bottom-4 right-8 hidden md:block">
          <button className="flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-xl font-bold shadow-lg hover:bg-gray-50 transition-colors">
            <Edit className="w-4 h-4" />
            Editar Perfil
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8">
        {/* Coluna Esquerda - Informações */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-red-600" />
              Informações Pessoais
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Nome Completo</label>
                <div className="p-3 bg-gray-50 rounded-xl text-gray-700 font-medium border border-gray-100">
                  {perfil.full_name}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email</label>
                <div className="p-3 bg-gray-50 rounded-xl text-gray-700 font-medium border border-gray-100 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  {perfil.email}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Telefone</label>
                <div className="p-3 bg-gray-50 rounded-xl text-gray-700 font-medium border border-gray-100 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  (11) 99999-9999 <span className="text-xs text-gray-400 italic">(Não cadastrado)</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Localização</label>
                <div className="p-3 bg-gray-50 rounded-xl text-gray-700 font-medium border border-gray-100 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  São Paulo, SP <span className="text-xs text-gray-400 italic">(Não cadastrado)</span>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Music className="w-5 h-5 text-red-600" />
              Interesses Musicais
            </h2>
            <div className="flex flex-wrap gap-3">
              {['Piano', 'Teoria Musical', 'História da Música', 'Composição'].map((tag) => (
                <span key={tag} className="px-4 py-2 bg-red-50 text-red-700 rounded-xl font-medium text-sm border border-red-100">
                  {tag}
                </span>
              ))}
              <button className="px-4 py-2 border border-dashed border-gray-300 text-gray-400 rounded-xl font-medium text-sm hover:border-red-300 hover:text-red-500 transition-colors">
                + Adicionar
              </button>
            </div>
          </section>
        </div>

        {/* Coluna Direita - Stats e Meta */}
        <div className="space-y-6">
          <div className="bg-gray-900 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600 rounded-full -mr-10 -mt-10 blur-3xl opacity-20"></div>
            
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-red-400" />
              Dados da Conta
            </h3>
            
            <div className="space-y-4 relative z-10">
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-gray-400 text-sm">Membro desde</span>
                <span className="font-medium text-white">
                  {new Date(perfil.created_at).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-gray-400 text-sm">Status</span>
                <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-bold uppercase">
                  Ativo
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-400 text-sm">Último acesso</span>
                <span className="font-medium text-white">Hoje</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-6 border border-orange-100">
            <h3 className="font-bold text-orange-900 mb-2">Jornada Alpha</h3>
            <p className="text-sm text-orange-800/80 mb-4">
              Você está progredindo bem! Continue praticando para desbloquear novas insígnias.
            </p>
            <div className="w-full bg-white rounded-full h-2 mb-2 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 h-full w-[65%]"></div>
            </div>
            <div className="flex justify-between text-xs font-medium text-orange-700">
              <span>Nível 3</span>
              <span>650/1000 XP</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PerfilPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    }>
      <PerfilContent />
    </Suspense>
  )
}
