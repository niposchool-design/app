import { getInstrumentos } from '@/src/lib/supabase/queries/instrumentos';
import InstrumentosClient from './_components/InstrumentosClient';

export default async function InstrumentosPage() {
    const instrumentos = await getInstrumentos({ includeInactive: false });

    return (
        <InstrumentosClient instrumentos={instrumentos || []} />
    );
}
