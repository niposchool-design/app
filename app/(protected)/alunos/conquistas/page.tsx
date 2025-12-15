import { getAchievements } from '@/src/lib/supabase/queries/gamificacao';
import ConquistasClient from './_components/ConquistasClient';

export default async function ConquistasPage() {
    const data = await getAchievements();
    const mapped = (data || []).map(a => ({
        id: a.id,
        titulo: a.titulo || a.nome || 'Conquista',
        descricao: a.descricao || '',
        icone: a.icone || '🏆',
        raridade: (a.raridade?.toLowerCase() || 'comum') as 'comum' | 'raro' | 'epico' | 'lendario',
        pontos: a.pontos || a.pontos_xp || 0,
        desbloqueada: a.desbloqueada || false,
        data_desbloqueio: a.data_desbloqueio || undefined,
        progresso: a.progresso_atual || undefined,
        meta: a.meta || undefined,
    }));

    return (
        <ConquistasClient conquistas={mapped} />
    );
}
