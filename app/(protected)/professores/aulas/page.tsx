
import { getTodasAulas } from '@/src/lib/supabase/queries/aulas';
import { AulasManager } from '../../admin/aulas/_components/AulasManager';

export default async function ProfessorAulasPage() {
    const aulas = await getTodasAulas();

    return (
        <div className="p-6 lg:p-8">
            {/* Reutilizando AulasManager mas apenas com Lista e Calendário, e modo ReadOnly (se aplicável ao design, mas o prof pode editar se for o caso. Vou assumir gestão parcial) */}
            <AulasManager
                aulasIniciais={aulas}
                allowedViews={['list', 'calendar']}
                readOnly={true} // Professores veem a lista mestre, mas talvez não editem a estrutura do curso aqui, só em "Minhas Turmas"
            />
        </div>
    );
}
