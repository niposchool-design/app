
import { getProfiles } from '@/src/lib/supabase/queries/users_turmas';
import { UserCheck, Plus, Mail, Phone, Search } from 'lucide-react';
import Link from 'next/link';

export default async function AdminProfessoresPage() {
  const professores = await getProfiles('professor');

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Professores</h1>
          <p className="text-gray-600 mt-1">Gestão do corpo docente</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors shadow-sm opacity-50 cursor-not-allowed">
          <Plus className="w-5 h-5" />
          Novo Professor
        </button>
      </div>

      {/* Filtros e Busca (Visual) */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por nome ou email..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {professores.length > 0 ? (
          professores.map((prof) => (
            <div key={prof.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="w-24 h-24 rounded-full bg-gray-100 mb-4 overflow-hidden border-4 border-white shadow-sm">
                {prof.avatar_url ? (
                  <img src={prof.avatar_url} alt={prof.full_name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100 font-bold text-3xl">
                    {prof.full_name?.charAt(0) || 'P'}
                  </div>
                )}
              </div>

              <h3 className="text-xl font-bold text-gray-900">{prof.full_name || 'Usuário sem nome'}</h3>
              <p className="text-sm text-red-600 font-medium mb-4">Professor de Música</p>

              <div className="w-full space-y-3 text-left bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="truncate">{prof.email}</span>
                </div>
                {prof.telefone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{prof.telefone}</span>
                  </div>
                )}
              </div>

              <div className="mt-6 w-full">
                <Link href={`/admin/professores/${prof.id}`} className="block w-full text-center py-2 px-4 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                  Ver Perfil
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-xl border border-dashed border-gray-200">
            <UserCheck className="w-12 h-12 mx-auto text-gray-300 mb-3" />
            <p>Nenhum professor encontrado.</p>
            <p className="text-xs mt-1">(Verifique se a tabela 'profiles' foi criada e populada)</p>
          </div>
        )}
      </div>
    </div>
  );
}
