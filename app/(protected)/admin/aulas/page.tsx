
import { getTodasAulas } from '@/src/lib/supabase/queries/aulas';
import { AulasManager } from './_components/AulasManager';

export default async function AdminAulasPage() {
  const aulas = await getTodasAulas();

  return (
    <div className="p-6 lg:p-8">
      <AulasManager aulasIniciais={aulas} />
    </div>
  );
}
