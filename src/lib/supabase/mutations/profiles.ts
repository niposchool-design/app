'use server'

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateProfile(id: string, data: { full_name?: string, email?: string, telefone?: string }) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('profiles')
        // @ts-ignore
        .update(data as any)
        .eq('id', id);

    if (error) {
        console.error('Erro ao atualizar perfil:', error);
        throw new Error(error.message);
    }

    revalidatePath('/admin');
    revalidatePath(`/admin/professores/${id}`);
    revalidatePath(`/admin/alunos/${id}`); // Generic path revalidation
}
