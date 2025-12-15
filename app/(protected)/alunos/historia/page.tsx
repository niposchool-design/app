import { getAllPeriodos } from '@/src/lib/supabase/queries/historia';
import HistoriaClient from './_components/HistoriaClient';

export default async function HistoriaPage() {
  const periodos = await getAllPeriodos();

  return (
    <HistoriaClient initialPeriodos={periodos || []} />
  );
}
