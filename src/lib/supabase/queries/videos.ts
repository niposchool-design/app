
import { createClient } from '@/lib/supabase/server';
import { VideoProfessor, CategoriaVideo } from '@/lib/types/videos';

export async function getCategoriasVideos(): Promise<CategoriaVideo[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('categorias_videos')
        .select('*');

    if (error) {
        console.error('Erro ao buscar categorias de vídeos:', error);
        return [];
    }

    return data as CategoriaVideo[];
}

export async function getVideos(filtros?: { search?: string; categoria?: string; modulo?: string }): Promise<VideoProfessor[]> {
    const supabase = await createClient();

    let query = supabase
        .from('videos_professores')
        .select(`
      *,
      categoria:categorias_videos(*)
    `)
        .eq('ativo', true);

    if (filtros?.categoria) {
        query = query.eq('categoria_id', filtros.categoria);
    }

    if (filtros?.modulo) {
        query = query.eq('modulo', filtros.modulo);
    }

    if (filtros?.search) {
        query = query.ilike('titulo', `%${filtros.search}%`);
    }

    // Ordenar por data de criação desc
    query = query.order('criado_em', { ascending: false });

    const { data, error } = await query;

    if (error) {
        console.error('Erro ao buscar vídeos:', error);
        return [];
    }

    return data as VideoProfessor[];
}
