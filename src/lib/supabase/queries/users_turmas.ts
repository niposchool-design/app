
import { createClient } from '@/lib/supabase/server';
import { UserProfile, Turma, Matricula } from '@/lib/types/users_turmas';

// === PROFILES ===

export async function getProfiles(role?: 'admin' | 'professor' | 'aluno'): Promise<UserProfile[]> {
    const supabase = await createClient();

    let query = supabase.from('profiles').select('*');

    if (role) {
        query = query.eq('role', role);
    }

    query = query.order('full_name');

    const { data, error } = await query;

    if (error) {
        console.error('Erro ao buscar perfis:', error);
        return [];
    }

    return data as UserProfile[];
}

export async function getCurrentProfile(): Promise<UserProfile | null> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return null;

    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    if (error) {
        console.error('Erro ao buscar perfil atual:', error);
        return null;
    }

    return data as UserProfile;
}

// === TURMAS ===

export async function getTurmas(professorId?: string): Promise<Turma[]> {
    const supabase = await createClient();

    let query = supabase
        .from('turmas')
        .select(`
      *,
      professor:profiles!professor_id(*),
      matriculas(count)
    `)
        .eq('ativo', true);

    if (professorId) {
        query = query.eq('professor_id', professorId);
    }

    query = query.order('nome');

    const { data, error } = await query;

    if (error) {
        console.error('Erro ao buscar turmas:', error);
        return [];
    }

    // Mapear count para qtd_alunos
    return data.map((t: any) => ({
        ...t,
        qtd_alunos: t.matriculas?.[0]?.count || 0
    })) as Turma[];
}

export async function getTurmaById(id: string): Promise<Turma | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('turmas')
        .select(`
      *,
      professor:profiles!professor_id(*)
    `)
        .eq('id', id)
        .single();

    if (error) {
        console.error('Erro ao buscar turma:', error);
        return null;
    }

    return data as Turma;
}

// === MATRÍCULAS ===

export async function getAlunosTurma(turmaId: string): Promise<Matricula[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('matriculas')
        .select(`
      *,
      aluno:profiles!aluno_id(*)
    `)
        .eq('turma_id', turmaId)
        .order('aluno(full_name)'); // Ordenação complexa pode precisar de ajuste na query pura, mas Supabase aceita paths

    if (error) {
        console.error('Erro ao buscar alunos da turma:', error);
        return [];
    }

    return data as Matricula[];
}
