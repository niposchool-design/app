
import { getTurmas } from '@/src/lib/supabase/queries/users_turmas';
import { Users, Calendar, MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default async function ProfessorTurmasPage() {
    // TODO: Pegar o ID do professor logado da sessão real
    // const { session } = await getServerSession(); const professorId = session.user.id;
    // Por enquanto busca todas as turmas para demo
    const turmas = await getTurmas();

    return (
        <div className="p-6 lg:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Minhas Turmas</h1>
                    <p className="text-gray-600 mt-1">Gerencie seus grupos de alunos e horários</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {turmas.length > 0 ? (
                    turmas.map((turma) => (
                        <Link
                            key={turma.id}
                            href={`/professores/turmas/${turma.id}`}
                            className="group bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-red-200 transition-all"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-red-50 text-red-600 rounded-xl group-hover:bg-red-100 transition-colors">
                                    <Users size={24} />
                                </div>
                                <span className={`px-2 py-1 rounded text-xs font-semibold uppercase
                   ${turma.ativo ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}
                `}>
                                    {turma.ativo ? 'Ativa' : 'Inativa'}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-red-700 transition-colors">
                                {turma.nome}
                            </h3>
                            <p className="text-sm text-gray-500 mb-4">{turma.ano_letivo} • {turma.semestre}º Semestre</p>

                            <div className="space-y-2 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-gray-400" />
                                    <span>{turma.horario_padrao || 'Horário a definir'}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-gray-400" />
                                    <span>{turma.sala || 'Sala a definir'}</span>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-sm">
                                <span className="font-medium text-gray-700">
                                    {turma.qtd_alunos || 0} alunos
                                </span>
                                <span className="flex items-center text-red-600 font-medium group-hover:translate-x-1 transition-transform">
                                    Gerenciar <ArrowRight className="w-4 h-4 ml-1" />
                                </span>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-xl border border-dashed border-gray-200">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Users className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">Nenhuma turma encontrada</h3>
                        <p className="mt-1 text-sm text-gray-500">Você ainda não possui turmas atribuídas.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
