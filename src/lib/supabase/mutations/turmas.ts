'use server'

import { createClient } from '@/lib/supabase/server';
import { Turma } from '@/src/lib/types/users_turmas';
import { revalidatePath } from 'next/cache';

// Criar nova turma
export async function criarTurma(dados: Partial<Turma>) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('turmas')
        .insert([dados] as any)
        .select()
        .single();

    if (error) {
        console.error('Erro ao criar turma:', error);
        throw new Error(error.message);
    }

    revalidatePath('/admin/turmas');
    return data;
}

// Atualizar turma existente
export async function atualizarTurma(id: string, dados: Partial<Turma>) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('turmas')
        .update(dados as any)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Erro ao atualizar turma:', error);
        throw new Error(error.message);
    }

    revalidatePath('/admin/turmas');
    revalidatePath(`/admin/turmas/${id}`);
    revalidatePath(`/admin/turmas/editar/${id}`);
    return data;
}

// Excluir turma
export async function deletarTurma(id: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('turmas')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Erro ao deletar turma:', error);
        throw new Error(error.message);
    }

    revalidatePath('/admin/turmas');
}
