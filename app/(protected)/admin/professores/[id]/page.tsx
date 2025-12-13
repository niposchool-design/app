
import { getProfiles, getTurmas } from '@/src/lib/supabase/queries/users_turmas';
import { ArrowLeft, Mail, Phone, Calendar, Users, Briefcase } from 'lucide-react';
import Link from 'next/link';

// Simular fetch de um único profile reaproveitando getProfiles por enquanto ou criando getProfileById
// Vou criar uma funcao rapida aqui para não mexer em queries globais agora se nao precisar
import { createClient } from '@/lib/supabase/server';

async function getProfile(id: string) {
    const supabase = await createClient() as any;
    const { data } = await supabase.from('profiles').select('*').eq('id', id).single();
    return data;
}

interface PageProps {
    params: {
        id: string;
    };
}

export default async function DetalhesProfessorPage({ params }: PageProps) {
    const professor = await getProfile(params.id);
    const turmas = await getTurmas(params.id); // Turmas desse professor

    if (!professor) {
        return <div>Professor não encontrado.</div>;
    }

    return (
        <div className="max-w-5xl mx-auto p-6 lg:p-8 space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/admin/professores" className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Perfil do Professor</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cartão de Perfil */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 text-center">
                        <div className="w-32 h-32 mx-auto bg-gray-100 rounded-full mb-4 overflow-hidden border-4 border-white shadow-md">
                            {professor.avatar_url ? (
                                <img src={professor.avatar_url} alt={professor.full_name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-gray-300">
                                    {professor.full_name?.charAt(0)}
                                </div>
                            )}
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">{professor.full_name}</h2>
                        <p className="text-red-600 font-medium">Docente Nipo School</p>

                        <div className="mt-6 space-y-3 text-left">
                            <div className="flex items-center gap-3 text-gray-600 p-3 bg-gray-50 rounded-lg">
                                <Mail size={18} />
                                <span className="text-sm truncate">{professor.email}</span>
                            </div>
                            {professor.telefone && (
                                <div className="flex items-center gap-3 text-gray-600 p-3 bg-gray-50 rounded-lg">
                                    <Phone size={18} />
                                    <span className="text-sm">{professor.telefone}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-3 text-gray-600 p-3 bg-gray-50 rounded-lg">
                                <Calendar size={18} />
                                <span className="text-sm">Cadastrado em {new Date(professor.criado_em).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Detalhes e Turmas */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <Briefcase className="text-red-600" size={20} />
                            Turmas Atribuídas
                        </h3>

                        <div className="space-y-4">
                            {turmas.length > 0 ? (
                                turmas.map(turma => (
                                    <div key={turma.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-red-100 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-white rounded-lg shadow-sm text-red-600">
                                                <Users size={20} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900">{turma.nome}</h4>
                                                <p className="text-xs text-gray-500">{turma.horario_padrao}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="block text-sm font-bold text-gray-900">{turma.qtd_alunos || 0} alunos</span>
                                            <span className={`text-xs px-2 py-0.5 rounded ${turma.ativo ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                                                {turma.ativo ? 'Ativa' : 'Inativa'}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center py-8">Nenhuma turma atribuída a este professor.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
