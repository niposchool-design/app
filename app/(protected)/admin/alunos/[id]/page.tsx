
import { getProfileById, getMatriculasAluno } from '@/src/lib/supabase/queries/users_turmas';
import { AlunoDetalhes } from '../_components/AlunoDetalhes';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default async function AlunoDetalhesPage({ params }: { params: { id: string } }) {
    const profile = await getProfileById(params.id);

    if (!profile || profile.role !== 'aluno') {
        // Se não for aluno ou não existir
        return notFound();
    }

    const matriculas = await getMatriculasAluno(params.id);

    return (
        <div className="p-6 lg:p-8 space-y-6">
            <Link
                href="/admin/alunos"
                className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 transition-colors mb-4"
            >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Voltar para Lista
            </Link>

            <AlunoDetalhes aluno={profile} matriculas={matriculas} />
        </div>
    )
}
