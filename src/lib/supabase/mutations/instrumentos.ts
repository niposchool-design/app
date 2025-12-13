
import { supabase } from '@/lib/supabase/client';
import { Instrumento } from '@/src/lib/types/instrumentos';

export async function criarInstrumento(dados: Partial<Instrumento>) {
    // @ts-ignore
    const { data, error } = await supabase
        .from('biblioteca_instrumentos')
        .insert([dados])
        .select()
        .single();

    if (error) {
        console.error('Erro ao criar instrumento:', error);
        throw error;
    }

    return data;
}

export async function atualizarInstrumento(id: string, dados: Partial<Instrumento>) {
    // @ts-ignore
    const { data, error } = await supabase
        .from('biblioteca_instrumentos')
        .update(dados)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Erro ao atualizar instrumento:', error);
        throw error;
    }

    return data;
}
