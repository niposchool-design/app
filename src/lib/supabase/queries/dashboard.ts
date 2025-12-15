
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
    ] = await Promise.all([
        supabase.from('profiles' as any).select('*', { count: 'exact', head: true }).eq('tipo_usuario', 'aluno'),
        supabase.from('profiles' as any).select('*', { count: 'exact', head: true }).eq('tipo_usuario', 'professor'),
        supabase.from('turmas' as any).select('*', { count: 'exact', head: true }).eq('ativo', true),
        supabase.from('instrumentos' as any).select('*', { count: 'exact', head: true }).eq('ativo', true),
        supabase.from('aulas' as any).select('*', { count: 'exact', head: true }),
    ]);

    return {
        totalAlunos: totalAlunos || 0,
        totalProfessores: totalProfessores || 0,
        totalTurmas: totalTurmas || 0,
        totalInstrumentos: totalInstrumentos || 0,
        totalAulas: totalAulas || 0,
        totalRepertorio: 0,
    };
}

export interface ActivityItem {
    id: string;
    type: 'user' | 'turma' | 'instrumento';
    description: string;
    created_at: string;
    metadata?: any;
}

export async function getRecentActivity(): Promise<ActivityItem[]> {
    const supabase = await createClient();

    // Fetch recent profiles (Alunos/Professores)
    const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name, role, created_at')
        .order('created_at', { ascending: false })
        .limit(3);

    // Fetch recent turmas
    const { data: turmas } = await supabase
        .from('turmas')
        .select('id, nome, created_at')
        .order('created_at', { ascending: false })
        .limit(3);

    // Combine and sort
    const activities: ActivityItem[] = [];

    profiles?.forEach((p: any) => {
        activities.push({
            id: p.id,
            type: 'user',
            description: `Novo ${p.role === 'aluno' ? 'Aluno' : 'Professor'}: ${p.full_name}`,
            created_at: p.created_at
        });
    });

    turmas?.forEach((t: any) => {
        activities.push({
            id: t.id,
            type: 'turma',
            description: `Nova Turma: ${t.nome}`,
            created_at: t.created_at
        });
    });

    return activities.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 5);
}
