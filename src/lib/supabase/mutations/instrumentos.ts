
import { supabase } from '@/lib/supabase/client';
import { Database } from '@/lib/supabase/database.types';

type InstrumentoInsert = Database['public']['Tables']['instrumentos']['Insert'];
type InstrumentoUpdate = Database['public']['Tables']['instrumentos']['Update'];
type InstrumentoRow = Database['public']['Tables']['instrumentos']['Row'];

// --- Instrumentos ---

export async function criarInstrumento(dados: InstrumentoInsert): Promise<InstrumentoRow | null> {
    const { data, error } = await supabase
        .from('instrumentos')
        .insert([dados])
        .select()
        .single();

    if (error) {
        console.error('Erro ao criar instrumento:', error);
        throw error;
    }

    return data;
}

export async function atualizarInstrumento(id: string, dados: InstrumentoUpdate): Promise<InstrumentoRow | null> {
    const { data, error } = await supabase
        .from('instrumentos')
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

export async function deletarInstrumento(id: string) {
    const { error } = await supabase
        .from('instrumentos')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Erro ao deletar instrumento:', error);
        throw error;
    }
}

// --- Curiosidades ---

type CuriosidadeInsert = Database['public']['Tables']['instrumento_curiosidades']['Insert'];
type CuriosidadeUpdate = Database['public']['Tables']['instrumento_curiosidades']['Update'];

export async function criarCuriosidade(dados: CuriosidadeInsert) {
    const { data, error } = await supabase.from('instrumento_curiosidades').insert([dados]).select().single();
    if (error) throw error;
    return data;
}

export async function atualizarCuriosidade(id: string, dados: CuriosidadeUpdate) {
    const { data, error } = await supabase.from('instrumento_curiosidades').update(dados).eq('id', id).select().single();
    if (error) throw error;
    return data;
}

export async function deletarCuriosidade(id: string) {
    const { error } = await supabase.from('instrumento_curiosidades').delete().eq('id', id);
    if (error) throw error;
}

// --- Mídias ---

type MidiaInsert = Database['public']['Tables']['instrumento_midias']['Insert'];
type MidiaUpdate = Database['public']['Tables']['instrumento_midias']['Update'];

export async function criarMidia(dados: MidiaInsert) {
    const { data, error } = await supabase.from('instrumento_midias').insert([dados]).select().single();
    if (error) throw error;
    return data;
}

export async function atualizarMidia(id: string, dados: MidiaUpdate) {
    const { data, error } = await supabase.from('instrumento_midias').update(dados).eq('id', id).select().single();
    if (error) throw error;
    return data;
}

export async function deletarMidia(id: string) {
    const { error } = await supabase.from('instrumento_midias').delete().eq('id', id);
    if (error) throw error;
}

// --- Sons ---

type SomInsert = Database['public']['Tables']['instrumento_sons']['Insert'];
type SomUpdate = Database['public']['Tables']['instrumento_sons']['Update'];

export async function criarSom(dados: SomInsert) {
    const { data, error } = await supabase.from('instrumento_sons').insert([dados]).select().single();
    if (error) throw error;
    return data;
}

export async function atualizarSom(id: string, dados: SomUpdate) {
    const { data, error } = await supabase.from('instrumento_sons').update(dados).eq('id', id).select().single();
    if (error) throw error;
    return data;
}

export async function deletarSom(id: string) {
    const { error } = await supabase.from('instrumento_sons').delete().eq('id', id);
    if (error) throw error;
}

// --- Técnicas ---

type TecnicaInsert = Database['public']['Tables']['instrumento_tecnicas']['Insert'];
type TecnicaUpdate = Database['public']['Tables']['instrumento_tecnicas']['Update'];

export async function criarTecnica(dados: TecnicaInsert) {
    const { data, error } = await supabase.from('instrumento_tecnicas').insert([dados]).select().single();
    if (error) throw error;
    return data;
}

export async function atualizarTecnica(id: string, dados: TecnicaUpdate) {
    const { data, error } = await supabase.from('instrumento_tecnicas').update(dados).eq('id', id).select().single();
    if (error) throw error;
    return data;
}

export async function deletarTecnica(id: string) {
    const { error } = await supabase.from('instrumento_tecnicas').delete().eq('id', id);
    if (error) throw error;
}
