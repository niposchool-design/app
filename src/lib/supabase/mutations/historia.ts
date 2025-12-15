'use server'

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function criarPeriodo(formData: any) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('historia_periodos')
        .insert([formData])
        .select()
        .single();

    if (error) {
        console.error('Erro ao criar período:', error);
        throw new Error(error.message);
    }

    revalidatePath('/admin/historia');
    return data;
}

export async function atualizarPeriodo(id: string, formData: any) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('historia_periodos')
        .update(formData)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath('/admin/historia');
    revalidatePath(`/admin/historia/periodos/${id}`);
    return data;
}

export async function deletarPeriodo(id: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('historia_periodos')
        .delete()
        .eq('id', id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath('/admin/historia');
}
