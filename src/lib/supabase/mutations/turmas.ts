
import { supabase } from '@/lib/supabase/client';
import { Turma } from '@/src/lib/types/users_turmas';

// Criar nova turma
export async function criarTurma(dados: Partial<Turma>) {
    // @ts-ignore
    const { data, error } = await (supabase as any)
        .from('turmas')
        .insert([dados])
        .select()
        .single();

    if (error) {
        console.error('Erro ao criar turma:', error);
        throw error;
    }

    return data;
}

// Atualizar turma existente
export async function atualizarTurma(id: string, dados: Partial<Turma>) {
    // @ts-ignore
    const { data, error } = await (supabase as any)
        .from('turmas')
        .update(dados)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Erro ao atualizar turma:', error);
        throw error;
    }

    return data;
}

// Excluir turma (ou inativar, dependendo da regra de negócio. Aqui vamos deletar fisicamente por enquanto)
export async function deletarTurma(id: string) {
    // @ts-ignore
    const { error } = await (supabase as any)
        .from('turmas')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Erro ao deletar turma:', error);
        throw error;
    }
}
