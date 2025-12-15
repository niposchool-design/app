'use server'

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function atualizarAluno(id: string, dados: { full_name?: string, email?: string, matricula?: string, nivel_atual?: string }) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('profiles')
        .update(dados)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Erro ao atualizar aluno:', error);
        throw new Error(error.message);
    }

    revalidatePath('/admin/alunos');
    revalidatePath(`/admin/alunos/${id}`);
    return data;
}

// Em teoria não deletamos profiles facilmente por causa de Auth, mas podemos inativar se tiver flag
// Como não vi flag 'ativo' em profiles, vou deixar sem delete por enquanto ou criar um soft delete se houver coluna
