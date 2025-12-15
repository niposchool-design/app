'use server'

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { AchievementRow } from '../queries/gamificacao';

export type AchievementInsert = Omit<AchievementRow, 'id' | 'created_at'>;
export type AchievementUpdate = Partial<AchievementInsert>;

export async function createAchievement(formData: AchievementInsert) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('achievements')
        .insert([formData])
        .select()
        .single();

    if (error) {
        console.error('Erro ao criar achievement:', error);
        throw new Error(error.message);
    }

    revalidatePath('/admin/gamificacao');
    return data;
}

export async function updateAchievement(id: string, formData: AchievementUpdate) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('achievements')
        .update(formData)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Erro ao atualizar achievement:', error);
        throw new Error(error.message);
    }

    revalidatePath('/admin/gamificacao');
    revalidatePath(`/admin/gamificacao/editar/${id}`);
    return data;
}

export async function deleteAchievement(id: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('achievements')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Erro ao deletar achievement:', error);
        throw new Error(error.message);
    }

    revalidatePath('/admin/gamificacao');
}
