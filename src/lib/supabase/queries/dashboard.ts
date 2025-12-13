
import { createClient } from '@/lib/supabase/server';

export interface AdminStats {
    totalAlunos: number;
    totalProfessores: number;
    totalTurmas: number;
    totalInstrumentos: number;
    totalAulas: number;
    totalRepertorio: number;
}

export async function getAdminStats(): Promise<AdminStats> {
    const supabase = await createClient() as any;

    const [
        { count: totalAlunos },
        { count: totalProfessores },
        { count: totalTurmas },
        { count: totalInstrumentos },
        { count: totalAulas },
        { count: totalRepertorio },
    ] = await Promise.all([
        supabase.from('profiles' as any).select('*', { count: 'exact', head: true }).eq('role', 'aluno'),
        supabase.from('profiles' as any).select('*', { count: 'exact', head: true }).eq('role', 'professor'),
        supabase.from('turmas' as any).select('*', { count: 'exact', head: true }).eq('ativo', true),
        supabase.from('biblioteca_instrumentos' as any).select('*', { count: 'exact', head: true }).eq('ativo', true),
        supabase.from('aulas' as any).select('*', { count: 'exact', head: true }), // Aulas não tem 'ativo' explicitamente na query simples mas podemos considerar todas
        supabase.from('repertorio' as any).select('*', { count: 'exact', head: true }).eq('ativo', true),
    ]);

    return {
        totalAlunos: totalAlunos || 0,
        totalProfessores: totalProfessores || 0,
        totalTurmas: totalTurmas || 0,
        totalInstrumentos: totalInstrumentos || 0,
        totalAulas: totalAulas || 0,
        totalRepertorio: totalRepertorio || 0,
    };
}
