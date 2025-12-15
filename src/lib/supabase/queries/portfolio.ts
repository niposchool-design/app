import { createClient } from '../client';

// ========================================
// TIPOS
// ========================================

export interface ObraPortfolio {
    id: string;
    usuario_id: string;
    titulo: string;
    instrumento: string;
    tipo: 'japonesa' | 'ocidental' | 'fusao';
    duracao?: string;
    nivel?: string;
    nota?: number;
    data_gravacao: string;
    plays?: number;
    arquivo_url: string;
    thumbnail?: string;
    descricao?: string;
    tecnicas?: string[];
    avaliacao_professor?: AvaliacaoObra;
    conquistasDesbloqueadas?: ConquistaDesbloqueada[];
    created_at?: string;
    updated_at?: string;
}

export interface AvaliacaoObra {
    nota: number;
    comentario: string;
    professor: string;
    professor_id: string;
    data: string;
}

export interface ConquistaDesbloqueada {
    id: string;
    nome: string;
    icone: string;
}

// ========================================
// QUERIES - PORTFOLIO
// ========================================

/**
 * Busca todas as obras do portfólio do aluno
 */
export async function getObrasPortfolio(usuarioId: string) {
    try {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from('portfolio_obras')
            .select('*')
            .eq('usuario_id', usuarioId)
            .order('data_gravacao', { ascending: false });

        if (error) throw error;
        return data as ObraPortfolio[];
    } catch (error) {
        console.error('Erro ao buscar obras do portfólio:', error);
        return [];
    }
}

/**
 * Busca uma obra específica do portfólio
 */
export async function getObraById(obraId: string) {
    try {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from('portfolio_obras')
            .select('*')
            .eq('id', obraId)
            .single();

        if (error) throw error;
        return data as ObraPortfolio;
    } catch (error) {
        console.error('Erro ao buscar obra:', error);
        return null;
    }
}

/**
 * Busca obras por tipo (japonesa, ocidental, fusão)
 */
export async function getObrasPorTipo(
    usuarioId: string,
    tipo: 'japonesa' | 'ocidental' | 'fusao'
) {
    try {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from('portfolio_obras')
            .select('*')
            .eq('usuario_id', usuarioId)
            .eq('tipo', tipo)
            .order('data_gravacao', { ascending: false });

        if (error) throw error;
        return data as ObraPortfolio[];
    } catch (error) {
        console.error('Erro ao buscar obras por tipo:', error);
        return [];
    }
}

/**
 * Busca obras por instrumento
 */
export async function getObrasPorInstrumento(usuarioId: string, instrumento: string) {
    try {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from('portfolio_obras')
            .select('*')
            .eq('usuario_id', usuarioId)
            .eq('instrumento', instrumento)
            .order('data_gravacao', { ascending: false });

        if (error) throw error;
        return data as ObraPortfolio[];
    } catch (error) {
        console.error('Erro ao buscar obras por instrumento:', error);
        return [];
    }
}

/**
 * Cria nova obra no portfólio
 */
export async function criarObraPortfolio(obra: Partial<ObraPortfolio>) {
    try {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from('portfolio_obras')
            .insert(obra)
            .select()
            .single();

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Erro ao criar obra no portfólio:', error);
        return { success: false, error };
    }
}

/**
 * Atualiza uma obra do portfólio
 */
export async function atualizarObraPortfolio(
    obraId: string,
    updates: Partial<ObraPortfolio>
) {
    try {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from('portfolio_obras')
            .update(updates)
            .eq('id', obraId)
            .select()
            .single();

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Erro ao atualizar obra:', error);
        return { success: false, error };
    }
}

/**
 * Deleta uma obra do portfólio
 */
export async function deletarObraPortfolio(obraId: string) {
    try {
        const supabase = await createClient();

        // TODO: Deletar arquivo do Storage também
        const { error } = await supabase
            .from('portfolio_obras')
            .delete()
            .eq('id', obraId);

        if (error) throw error;
        return { success: true };
    } catch (error) {
        console.error('Erro ao deletar obra:', error);
        return { success: false, error };
    }
}

/**
 * Incrementa contador de plays de uma obra
 */
export async function incrementarPlays(obraId: string) {
    try {
        const supabase = await createClient();

        const { error } = await supabase.rpc('incrementar_plays_obra', {
            obra_id: obraId
        });

        if (error) throw error;
        return { success: true };
    } catch (error) {
        console.error('Erro ao incrementar plays:', error);
        return { success: false, error };
    }
}

/**
 * Adiciona avaliação do professor à obra
 */
export async function avaliarObra(
    obraId: string,
    avaliacao: AvaliacaoObra
) {
    try {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from('portfolio_obras')
            .update({
                avaliacao_professor: avaliacao,
                nota: avaliacao.nota
            })
            .eq('id', obraId)
            .select()
            .single();

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Erro ao avaliar obra:', error);
        return { success: false, error };
    }
}

/**
 * Busca estatísticas do portfólio do aluno
 */
export async function getEstatisticasPortfolio(usuarioId: string) {
    try {
        const obras = await getObrasPortfolio(usuarioId);

        const stats = {
            totalObras: obras.length,
            totalPlays: obras.reduce((acc, obra) => acc + (obra.plays || 0), 0),
            mediaNota: obras.length > 0
                ? obras.reduce((acc, obra) => acc + (obra.nota || 0), 0) / obras.length
                : 0,
            obrasPorTipo: {
                japonesa: obras.filter(o => o.tipo === 'japonesa').length,
                ocidental: obras.filter(o => o.tipo === 'ocidental').length,
                fusao: obras.filter(o => o.tipo === 'fusao').length
            },
            instrumentos: Array.from(new Set(obras.map(o => o.instrumento))),
            ultimaGravacao: obras.length > 0 ? obras[0].data_gravacao : null
        };

        return stats;
    } catch (error) {
        console.error('Erro ao buscar estatísticas do portfólio:', error);
        return null;
    }
}

/**
 * Busca obras mais tocadas
 */
export async function getObrasMaisTocadas(usuarioId: string, limit = 5) {
    try {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from('portfolio_obras')
            .select('*')
            .eq('usuario_id', usuarioId)
            .order('plays', { ascending: false })
            .limit(limit);

        if (error) throw error;
        return data as ObraPortfolio[];
    } catch (error) {
        console.error('Erro ao buscar obras mais tocadas:', error);
        return [];
    }
}

/**
 * Busca obras com melhores notas
 */
export async function getObrasMelhoresNotas(usuarioId: string, limit = 5) {
    try {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from('portfolio_obras')
            .select('*')
            .eq('usuario_id', usuarioId)
            .not('nota', 'is', null)
            .order('nota', { ascending: false })
            .limit(limit);

        if (error) throw error;
        return data as ObraPortfolio[];
    } catch (error) {
        console.error('Erro ao buscar obras com melhores notas:', error);
        return [];
    }
}

/**
 * Upload de arquivo de obra para Supabase Storage
 */
export async function uploadArquivoObra(
    usuarioId: string,
    arquivo: File
): Promise<{ success: boolean; url?: string; error?: any }> {
    try {
        const supabase = await createClient();
        
        const filename = `${usuarioId}/${Date.now()}-${arquivo.name}`;
        
        const { data, error } = await supabase.storage
            .from('portfolio')
            .upload(filename, arquivo, {
                cacheControl: '3600',
                upsert: false
            });

        if (error) throw error;

        const { data: { publicUrl } } = supabase.storage
            .from('portfolio')
            .getPublicUrl(filename);

        return { success: true, url: publicUrl };
    } catch (error) {
        console.error('Erro ao fazer upload do arquivo:', error);
        return { success: false, error };
    }
}

/**
 * Deleta arquivo do Storage
 */
export async function deletarArquivoObra(arquivoUrl: string) {
    try {
        const supabase = await createClient();
        
        // Extrair o path do arquivo da URL
        const path = arquivoUrl.split('/portfolio/')[1];
        
        const { error } = await supabase.storage
            .from('portfolio')
            .remove([path]);

        if (error) throw error;
        return { success: true };
    } catch (error) {
        console.error('Erro ao deletar arquivo:', error);
        return { success: false, error };
    }
}
