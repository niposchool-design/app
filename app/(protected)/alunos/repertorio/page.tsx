import { getRepertorio } from '@/src/lib/supabase/queries/repertorio';
import RepertorioClient from './_components/RepertorioClient';

export default async function RepertorioPage() {
    const repertorio = await getRepertorio();

    return (
        <RepertorioClient initialRepertorio={repertorio || []} />
    );
}
