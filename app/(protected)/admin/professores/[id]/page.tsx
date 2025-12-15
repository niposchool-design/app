
import { getProfileById, getTurmas } from '@/src/lib/supabase/queries/users_turmas';
import { ProfessorDetalhes } from '../_components/ProfessorDetalhes';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default async function ProfessorDetalhesPage({ params }: { params: { id: string } }) {
    const profile = await getProfileById(params.id);

    if (!profile || profile.role !== 'professor') {
        return notFound();
    }

    // Buscar turmas deste professor
    const turmas = await getTurmas(profile.id);

    return (
        <div className="p-6 lg:p-8 space-y-6">
            <Link
                href="/admin/professores"
                className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 transition-colors mb-4"
            >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Voltar para Lista
            </Link>

            <ProfessorDetalhes professor={profile} turmas={turmas} />
        </div>
    )
}
