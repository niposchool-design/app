
import { createClient } from '@/lib/supabase/server';
import { Database } from '@/lib/supabase/database.types';

type InstrumentoRow = Database['public']['Tables']['instrumentos']['Row'];
export type InstrumentoFull = InstrumentoRow & {
    midias?: Database['public']['Tables']['instrumento_midias']['Row'][];
    sons?: Database['public']['Tables']['instrumento_sons']['Row'][];
    curiosidades_lista?: Database['public']['Tables']['instrumento_curiosidades']['Row'][];
    tecnicas?: Database['public']['Tables']['instrumento_tecnicas']['Row'][];
};

export async function getCategoriasInstrumentos() {
    // Retornamos fixo pois a tabela categorias_instrumentos pode não estar populada ou faltar no dump
    return [
        { id: 'Cordas', nome: 'Cordas' },
        { id: 'Sopro', nome: 'Sopro' },
        { id: 'Percussão', nome: 'Percussão' },
        { id: 'Teclas', nome: 'Teclas' },
        { id: 'Vocal', nome: 'Vocal' },
    ];
}

export async function getInstrumentos(filtros?: { categoria?: string; search?: string, includeInactive?: boolean }) {
    const supabase = await createClient();

    let query = supabase
        .from('instrumentos')
        .select('*')
        .order('nome');

    if (!filtros?.includeInactive) {
        // Por padrão, para usuários finais, apenas ativos.
        // Mas a UI do admin pode passar includeInactive: true
        // query = query.eq('ativo', true); 
        // OBS: Para admin, queremos ver tudo. Deixarei a lógica de filtro
    }

    // Se for explicitamente solicitado apenas ativos (ex: site publico)
    if (filtros?.includeInactive === false) {
        query = query.eq('ativo', true);
    }

    if (filtros?.categoria) {
        query = query.eq('categoria', filtros.categoria);
    }

    if (filtros?.search) {
        query = query.ilike('nome', `%${filtros.search}%`);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Erro ao buscar instrumentos:', error);
        return [];
    }

    return data as any;
}

export async function getInstrumentoById(id: string): Promise<InstrumentoFull | null> {
    const supabase = await createClient();

    // Verificando quais relacionamentos realmente existem no banco
    // Baseado na análise: instrumento_curiosidades, instrumento_midias, instrumento_sons
    const { data, error } = await supabase
        .from('instrumentos')
        .select(`
            *,
            midias:instrumento_midias(*),
            sons:instrumento_sons(*),
            curiosidades_lista:instrumento_curiosidades(*),
            tecnicas:instrumento_tecnicas(*)
        `)
        .eq('id', id)
        .single();

    if (error) {
        console.error('Erro ao buscar instrumento:', error);
        return null;
    }

    return data as any; // Cast necessário pois o tipo retornado pelo join do supapsse é complexo
}
