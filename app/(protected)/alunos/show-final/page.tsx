import { getAulasShowFinal } from '@/src/lib/supabase/queries/aulas';
import ShowFinalClient from './_components/ShowFinalClient';

export default async function ShowFinalPage() {
    const aulas = await getAulasShowFinal();

    return (
        <ShowFinalClient initialRepertorio={aulas || []} />
    );
}
