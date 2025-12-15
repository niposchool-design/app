
import { getAchievementById } from '@/src/lib/supabase/queries/gamificacao';
import { AchievementForm } from '../../_components/AchievementForm';
import { notFound } from 'next/navigation';

export default async function EditarConquistaPage({ params }: { params: { id: string } }) {
    const achievement = await getAchievementById(params.id);

    if (!achievement) {
        return notFound();
    }

    return (
        <div className="p-6 lg:p-8">
            <AchievementForm initialData={achievement} />
        </div>
    );
}
