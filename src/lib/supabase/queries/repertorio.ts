
import { createClient } from '@/lib/supabase/server';
import { Repertorio, CategoriaRepertorio } from '@/lib/types/repertorio';

export async function getCategoriasRepertorio(): Promise<CategoriaRepertorio[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('categorias_repertorio')
        .select('*')
        .order('ordem_exibicao', { ascending: true });

    if (error) {
        console.error('Erro ao buscar categorias de repertório:', error);
        return [];
    }

    return data as CategoriaRepertorio[];
}

export async function getRepertorio(filtros?: { categoria_id?: string; search?: string; nivel?: string }): Promise<Repertorio[]> {
    const supabase = await createClient();

    let query = supabase
        .from('repertorio')
        .select(`
      *,
      categoria:categorias_repertorio(*)
    `)
        .eq('ativo', true);

    if (filtros?.categoria_id) {
        query = query.eq('categoria_id', filtros.categoria_id);
    }

    if (filtros?.nivel) {
        query = query.eq('nivel_dificuldade', filtros.nivel);
    }

    if (filtros?.search) {
        query = query.or(`titulo.ilike.%${filtros.search}%,compositor.ilike.%${filtros.search}%`);
    }

    // Ordenar por título
    query = query.order('titulo');

    const { data, error } = await query;

    if (error) {
        console.error('Erro ao buscar repertório:', error);
        return [];
    }

    return data as Repertorio[];
}

export async function getRepertorioById(id: string): Promise<Repertorio | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('repertorio')
        .select(`
      *,
      categoria:categorias_repertorio(*)
    `)
        .eq('id', id)
        .single();

    if (error) {
        console.error('Erro ao buscar música:', error);
        return null;
    }

    return data as Repertorio;
}
