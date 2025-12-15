
'use server'

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export type RepertorioInsert = {
    titulo: string;
    compositor: string;
    categoria_id: string;
    nivel_dificuldade: string;
    duracao_estimada?: number;
    observacoes?: string;
    partitura_url?: string;
    playback_url?: string;
    video_tutorial_url?: string;
    ativo?: boolean;
    publico?: boolean;
    requer_aprovacao_professor?: boolean;
};

export type RepertorioUpdate = Partial<RepertorioInsert>;

export async function createRepertorio(music: RepertorioInsert) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('repertorio')
        .insert(music as any)
        .select()
        .single();

    if (error) {
        throw new Error(`Erro ao criar música: ${error.message}`);
    }

    revalidatePath('/admin/repertorio');
    return data;
}

export async function updateRepertorio(id: string, music: RepertorioUpdate) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('repertorio')
        .update(music as any)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        throw new Error(`Erro ao atualizar música: ${error.message}`);
    }

    revalidatePath('/admin/repertorio');
    revalidatePath(`/admin/repertorio/editar/${id}`);
    return data;
}

export async function deleteRepertorio(id: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('repertorio')
        .delete()
        .eq('id', id);

    if (error) {
        throw new Error(`Erro ao excluir música: ${error.message}`);
    }

    revalidatePath('/admin/repertorio');
    return true;
}
