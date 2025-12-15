
import { createClient } from '@/lib/supabase/server';
import { Database } from '@/lib/supabase/database.types';

export type Periodo = Database['public']['Tables']['historia_periodos']['Row'];
export type Compositor = Database['public']['Tables']['historia_compositores']['Row'];
export type Obra = Database['public']['Tables']['historia_obras']['Row'];

export async function getAllPeriodos() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('historia_periodos')
        .select(`
            *,
            compositores:historia_compositores(count),
            obras:historia_obras(count)
        `)
        .order('ordem_cronologica', { ascending: true });

    if (error) {
        console.error('Erro ao buscar períodos:', error);
        return [];
    }

    return data;
}

export async function getPeriodoById(id: string) {
    const supabase = await createClient();

    const { data: periodo, error } = await supabase
        .from('historia_periodos')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error(`Erro ao buscar período ${id}:`, error);
        return null;
    }

    // Fetch Compositores
    const { data: compositores } = await supabase
        .from('historia_compositores')
        .select('*')
        .eq('periodo_id', id)
        .order('nivel_importancia', { ascending: false });

    // Fetch Obras
    const { data: obras } = await supabase
        .from('historia_obras')
        .select(`
        *,
        compositor:historia_compositores(nome_completo, nome_artistico)
    `)
        .eq('periodo_id', id)
        .order('popularidade', { ascending: false });

    return {
        ...periodo,
        compositores: compositores || [],
        obras: obras || []
    };
}
