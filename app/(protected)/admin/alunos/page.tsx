
import { getProfiles } from '@/src/lib/supabase/queries/users_turmas';
import { GraduationCap, Search, Filter, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

export default async function AdminAlunosPage() {
  const alunos = await getProfiles('aluno');

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Alunos</h1>
          <p className="text-gray-600 mt-1">Gestão de matrículas e estudantes</p>
        </div>
        {/* Placeholder count */}
        <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium shadow-sm">
          Total: <span className="text-red-600 font-bold">{alunos.length}</span> alunos
        </div>
      </div>

      {/* Filtros e Busca */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar aluno..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none shadow-sm"
          />
        </div>
        <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-white bg-gray-50 flex items-center gap-2 shadow-sm">
          <Filter className="w-4 h-4" />
          Filtros
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-900 font-semibold border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Nome</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Matrícula</th>
                <th className="px-6 py-4">Nível</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {alunos.length > 0 ? (
                alunos.map((aluno) => (
                  <tr key={aluno.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold overflow-hidden">
                          {aluno.avatar_url ? (
                            <img src={aluno.avatar_url} alt="" className="w-full h-full object-cover" />
                          ) : (
                            aluno.full_name?.charAt(0) || 'A'
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{aluno.full_name || 'Desconhecido'}</div>
                          <div className="text-xs text-gray-500 md:hidden">{aluno.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">{aluno.email}</td>
                    <td className="px-6 py-4 font-mono text-xs">{aluno.matricula || '-'}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded bg-blue-50 text-blue-700 text-xs font-medium">
                        {aluno.nivel_atual || 'Iniciante'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                      Ativo
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    <GraduationCap className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                    <p>Nenhum aluno encontrado.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
