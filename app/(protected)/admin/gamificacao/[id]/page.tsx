
import { getAchievementById } from '@/src/lib/supabase/queries/gamificacao';
import { AchievementForm } from '../_components/AchievementForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function EditAchievementPage({ params }: PageProps) {
    const { id } = await params;

    // Fetch data
    const achievement = await getAchievementById(id);

    if (!achievement) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8 animate-fade-in">
            <div className="flex items-center gap-4">
                <Link href="/admin/gamificacao" className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                    <ArrowLeft size={24} />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Editar Conquista</h1>
                    <p className="text-gray-600">Ajuste os detalhes e critérios desta medalha.</p>
                </div>
            </div>

            <AchievementForm initialData={achievement} />
        </div>
    );
}
