
import { createClient } from '@/lib/supabase/server';
import { Instrumento, CategoriaInstrumento } from '@/lib/types/instrumentos';

export async function getCategoriasInstrumentos(): Promise<CategoriaInstrumento[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('categorias_instrumentos')
        .select('*')
        .order('ordem_exibicao', { ascending: true });

    if (error) {
        console.error('Erro ao buscar categorias:', error);
        return [];
    }

    return data as CategoriaInstrumento[];
}

export async function getInstrumentos(filtros?: { categoria_id?: string; search?: string }): Promise<Instrumento[]> {
    const supabase = await createClient();

    let query = supabase
        .from('biblioteca_instrumentos')
        .select(`
      *,
      categoria:categorias_instrumentos(*)
    `)
        .eq('ativo', true);

    if (filtros?.categoria_id) {
        query = query.eq('categoria_id', filtros.categoria_id);
    }

    if (filtros?.search) {
        query = query.ilike('nome', `%${filtros.search}%`);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Erro ao buscar instrumentos:', error);
        return [];
    }

    return data as Instrumento[];
}

export async function getInstrumentoById(id: string): Promise<Instrumento | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('biblioteca_instrumentos')
        .select(`
      *,
      categoria:categorias_instrumentos(*)
    `)
        .eq('id', id)
        .single();

    if (error) {
        console.error('Erro ao buscar instrumento:', error);
        return null;
    }

    return data as Instrumento[];
}
