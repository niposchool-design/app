
import { supabase } from '@/lib/supabase/client';
import { Conquista, Nivel, Desafio } from '@/src/lib/types/gamificacao';

// --- CONQUISTAS ---

export async function criarConquista(dados: Partial<Conquista>) {
    // @ts-ignore
    const { data, error } = await (supabase as any)
        .from('gamificacao_conquistas') // Assumindo nome da tabela, ajustar se necessário
        .insert([dados])
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function getConquistas() {
    // @ts-ignore
    const { data, error } = await (supabase as any)
        .from('gamificacao_conquistas')
        .select('*')
        .order('xp_recompensa', { ascending: true });

    if (error) return []; // Retornar vazio se erro (ou tabela não existir ainda)
    return data;
}

// --- NÍVEIS ---

export async function criarNivel(dados: Partial<Nivel>) {
    // @ts-ignore
    const { data, error } = await (supabase as any)
        .from('gamificacao_niveis')
        .insert([dados])
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function getNiveis() {
    // @ts-ignore
    const { data, error } = await (supabase as any)
        .from('gamificacao_niveis')
        .select('*')
        .order('numero', { ascending: true });

    if (error) return [];
    return data;
}

// --- DESAFIOS ---

export async function criarDesafio(dados: Partial<Desafio>) {
    // @ts-ignore
    const { data, error } = await (supabase as any)
        .from('gamificacao_desafios')
        .insert([dados])
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function getDesafios() {
    // @ts-ignore
    const { data, error } = await (supabase as any)
        .from('gamificacao_desafios')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) return [];
    return data;
}
