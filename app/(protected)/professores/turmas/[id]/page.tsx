
import { getTurmaById, getAlunosTurma } from '@/src/lib/supabase/queries/users_turmas';
import { ArrowLeft, User, Mail, Calendar, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PageProps {
    params: {
        id: string;
    };
}

export default async function DetalhesTurmaPage({ params }: PageProps) {
    const turma = await getTurmaById(params.id);

    if (!turma) {
        notFound();
    }

    const matriculas = await getAlunosTurma(params.id);

    return (
        <div className="p-6 lg:p-8 space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-4">
                <Link href="/professores/turmas" className="flex items-center text-sm text-gray-500 hover:text-gray-900 transition-colors bg-white w-fit px-3 py-1.5 rounded-lg shadow-sm border border-gray-200">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar para Turmas
                </Link>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between md:items-center gap-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{turma.nome}</h1>
                        <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                            <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                                <Calendar className="w-4 h-4" />
                                {turma.horario_padrao}
                            </span>
                            <span className="bg-gray-100 px-2 py-1 rounded">
                                Sala: {turma.sala}
                            </span>
                            <span className="bg-gray-100 px-2 py-1 rounded capitalize">
                                Nível: {turma.nivel}
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors shadow-sm">
                            Lançar Frequência
                        </button>
                        <button className="px-4 py-2 bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-50 rounded-lg font-medium transition-colors shadow-sm">
                            Lançar Notas
                        </button>
                    </div>
                </div>
            </div>

            {/* Lista de Alunos */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900">Alunos Matriculados</h2>
                    <span className="text-sm text-gray-500">{matriculas.length} alunos</span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-gray-900 font-semibold border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4">Nome do Aluno</th>
                                <th className="px-6 py-4">Matrícula</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Frequência</th>
                                <th className="px-6 py-4">Nota Atual</th>
                                <th className="px-6 py-4 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {matriculas.length > 0 ? (
                                matriculas.map((matricula) => (
                                    <tr key={matricula.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs ring-2 ring-white shadow-sm overflow-hidden">
                                                    {matricula.aluno?.avatar_url ? (
                                                        <img src={matricula.aluno.avatar_url} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        matricula.aluno?.full_name?.charAt(0) || 'A'
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900">{matricula.aluno?.full_name || 'Desconhecido'}</div>
                                                    <div className="text-xs text-gray-500">{matricula.aluno?.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-mono text-xs">{matricula.aluno?.matricula || '-'}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium capitalize
                        ${matricula.status === 'ativo' ? 'bg-green-100 text-green-800' : ''}
                        ${matricula.status === 'trancado' ? 'bg-yellow-100 text-yellow-800' : ''}
                        ${matricula.status === 'reprovado' ? 'bg-red-100 text-red-800' : ''}
                      `}>
                                                {matricula.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-16 bg-gray-200 rounded-full h-2">
                                                    <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${matricula.frequencia_porcentagem || 0}%` }}></div>
                                                </div>
                                                <span className="text-xs font-medium">{matricula.frequencia_porcentagem || 0}%</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            {matricula.nota_final !== undefined ? matricula.nota_final : '-'}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-indigo-600 hover:text-indigo-900 font-medium text-xs">
                                                Detalhes
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                        <User className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                                        <p>Nenhum aluno matriculado nesta turma.</p>
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
