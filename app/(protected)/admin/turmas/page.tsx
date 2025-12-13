
import { getTurmas } from '@/src/lib/supabase/queries/users_turmas';
import { School, Users, Calendar, Clock, Plus } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

// Precisamos de uma query para pegar TODAS as turmas, nao apenas as de um professor.
// Vou criar query ad-hoc aqui ou ajustar a existente. 
// users_turmas tem getTurmas mas pede professorId.
// Vou fazer fetch direto aqui para ser rapido.

async function getAllTurmas() {
    const supabase = await createClient() as any;
    const { data, error } = await supabase
        .from('turmas')
        .select('*')
        .order('nome');

    if (error) return [];
    return data;
}

export default async function AdminTurmasPage() {
    const turmas = await getAllTurmas();

    return (
        <div className="p-6 lg:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Gestão de Turmas</h1>
                    <p className="text-gray-600 mt-1">Acompanhe as turmas ativas e horários.</p>
                </div>
                <Link href="/admin/turmas/nova" className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors shadow-sm">
                    <Plus className="w-5 h-5" />
                    Nova Turma
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {turmas.length > 0 ? (
                    turmas.map(turma => (
                        <div key={turma.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow group">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-red-50 rounded-xl group-hover:bg-red-100 transition-colors">
                                    <School className="w-6 h-6 text-red-600" />
                                </div>
                                <span className={`px-2 py-1 rounded-md text-xs font-semibold ${turma.ativo ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                    {turma.ativo ? 'ATIVA' : 'INATIVA'}
                                </span>
                            </div>

                            <h3 className="text-lg font-bold text-gray-900 mb-1">{turma.nome}</h3>
                            <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                                <Clock size={14} />
                                <span>{turma.horario_padrao || 'Horário a definir'}</span>
                            </div>

                            <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-sm">
                                <div className="flex items-center gap-1 text-gray-600">
                                    <Users size={16} />
                                    <span>{turma.qtd_alunos || 0} alunos</span>
                                </div>
                                <button className="text-red-600 font-medium hover:text-red-700">Ver Detalhes</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-2xl border border-dashed border-gray-300">
                        Nenhuma turma encontrada.
                    </div>
                )}
            </div>
        </div>
    )
}
