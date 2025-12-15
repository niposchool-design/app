
import { createClient } from '@/lib/supabase/server';
import { Database } from '@/lib/supabase/database.types';

export type AchievementRow = Database['public']['Tables']['achievements']['Row'];

export async function getAchievements() {
    const supabase = await createClient();

    // Admin view: fetch all, ordered by category and name
    const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .order('category')
        .order('name');

    if (error) {
        console.error('Erro ao buscar achievements:', error);
        return [];
    }

    return data as AchievementRow[];
}

export async function getAchievementById(id: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Erro ao buscar achievement:', error);
        return null;
    }

    return data as AchievementRow;
}

export const getConquistas = getAchievements;

export async function getNiveis() {
    // Mock configuration for now as no table exists
    return [
        { id: '1', numero: 1, titulo: 'Faixa Branca', xp_minimo: 0 },
        { id: '2', numero: 2, titulo: 'Faixa Amarela', xp_minimo: 100 },
        { id: '3', numero: 3, titulo: 'Faixa Laranja', xp_minimo: 300 },
        { id: '4', numero: 4, titulo: 'Faixa Verde', xp_minimo: 600 },
        { id: '5', numero: 5, titulo: 'Faixa Azul', xp_minimo: 1000 },
    ];
}

export async function getDesafios() {
    const supabase = await createClient();
    // Assuming 'aula_desafios' or similar table, but for now returning empty or fetching from a generic table if exists.
    // We will just return empty for now until we define the Desafios table in types.
    return [];
}
