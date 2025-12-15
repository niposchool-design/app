import { getTodasAulas, getProgressoGeralAluno } from '@/src/lib/supabase/queries/aulas';
import { getCurrentProfile } from '@/src/lib/supabase/queries/users_turmas';
import AulasClient from './_components/AulasClient';

export default async function AulasPage() {
    const profile = await getCurrentProfile();
    const aulasData = await getTodasAulas();

    // Se tiver perfil, busca progresso
    let progresso: any = null;
    if (profile?.id) {
        progresso = await getProgressoGeralAluno(profile.id);
    }

    // Mapear aulas com status de progresso
    const aulasMapeadas = (aulasData || []).map((aula, idx) => ({
        id: aula.id,
        numero: aula.numero,
        titulo: aula.titulo,
        descricao: aula.resumo_atividades || '',
        duracao_estimada: 45, // Assuming default or mapping field if available
        nivel_dificuldade: aula.nivel || 'Iniciante',
        status: progresso?.aulas_concluidas?.includes(aula.id) ? 'concluida' as const :
            idx === 0 ? 'em-andamento' as const :
                'bloqueada' as const,
    }));

    return (
        <AulasClient aulas={aulasMapeadas} />
    );
}
