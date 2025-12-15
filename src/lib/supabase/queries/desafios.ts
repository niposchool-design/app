import { createClient } from '../client';

// ========================================
// TIPOS
// ========================================

export interface Desafio {
    id: string;
    titulo: string;
    descricao: string;
    descricao_completa?: string;
    dificuldade: 'facil' | 'medio' | 'dificil';
    pontos: number;
    prazo: string;
    status: 'ativo' | 'concluido' | 'expirado';
    categoria: string;
    participantes?: number;
    requisitos?: string[];
    passos?: string[];
    recompensas?: string[];
    created_at?: string;
    updated_at?: string;
}

export interface DesafioParticipacao {
    id: string;
    desafio_id: string;
    usuario_id: string;
    status: 'pendente' | 'submetido' | 'aprovado' | 'reprovado';
    arquivo_url?: string;
    comentario?: string;
    nota?: number;
    feedback_professor?: string;
    submitted_at?: string;
    avaliado_at?: string;
}

// ========================================
// QUERIES - DESAFIOS
// ========================================

/**
 * Busca todos os desafios ativos
 */
export async function getDesafiosAtivos() {
    try {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from('desafios')
            .select('*')
            .eq('status', 'ativo')
            .gte('prazo', new Date().toISOString())
            .order('prazo', { ascending: true });

        if (error) throw error;
        return data as Desafio[];
    } catch (error) {
        console.error('Erro ao buscar desafios ativos:', error);
        return [];
    }
}

/**
 * Busca um desafio específico por ID
 */
export async function getDesafioById(desafioId: string) {
    try {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from('desafios')
            .select('*')
            .eq('id', desafioId)
            .single();

        if (error) throw error;
        return data as Desafio;
    } catch (error) {
        console.error('Erro ao buscar desafio:', error);
        return null;
    }
}

/**
 * Busca desafios por categoria
 */
export async function getDesafiosPorCategoria(categoria: string) {
    try {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from('desafios')
            .select('*')
            .eq('categoria', categoria)
            .eq('status', 'ativo')
            .order('prazo', { ascending: true });

        if (error) throw error;
        return data as Desafio[];
    } catch (error) {
        console.error('Erro ao buscar desafios por categoria:', error);
        return [];
    }
}

/**
 * Busca os desafios do aluno (participando ou concluídos)
 */
export async function getDesafiosAluno(usuarioId: string) {
    try {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from('desafios_participantes')
            .select(`
                *,
                desafio:desafios (*)
            `)
            .eq('usuario_id', usuarioId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Erro ao buscar desafios do aluno:', error);
        return [];
    }
}

/**
 * Registra participação em um desafio
 */
export async function participarDesafio(desafioId: string, usuarioId: string) {
    try {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from('desafios_participantes')
            .insert({
                desafio_id: desafioId,
                usuario_id: usuarioId,
                status: 'pendente'
            })
            .select()
            .single();

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Erro ao participar do desafio:', error);
        return { success: false, error };
    }
}

/**
 * Submete um desafio com arquivo
 */
export async function submeterDesafio(
    participacaoId: string,
    arquivoUrl: string,
    comentario?: string
) {
    try {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from('desafios_participantes')
            .update({
                status: 'submetido',
                arquivo_url: arquivoUrl,
                comentario,
                submitted_at: new Date().toISOString()
            })
            .eq('id', participacaoId)
            .select()
            .single();

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Erro ao submeter desafio:', error);
        return { success: false, error };
    }
}

/**
 * Conta número de participantes de um desafio
 */
export async function contarParticipantesDesafio(desafioId: string) {
    try {
        const supabase = await createClient();

        const { count, error } = await supabase
            .from('desafios_participantes')
            .select('*', { count: 'exact', head: true })
            .eq('desafio_id', desafioId);

        if (error) throw error;
        return count || 0;
    } catch (error) {
        console.error('Erro ao contar participantes:', error);
        return 0;
    }
}

/**
 * Verifica se o aluno já está participando de um desafio
 */
export async function verificarParticipacao(desafioId: string, usuarioId: string) {
    try {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from('desafios_participantes')
            .select('*')
            .eq('desafio_id', desafioId)
            .eq('usuario_id', usuarioId)
            .maybeSingle();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Erro ao verificar participação:', error);
        return null;
    }
}

/**
 * Busca desafios concluídos pelo aluno
 */
export async function getDesafiosConcluidos(usuarioId: string) {
    try {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from('desafios_participantes')
            .select(`
                *,
                desafio:desafios (*)
            `)
            .eq('usuario_id', usuarioId)
            .eq('status', 'aprovado')
            .order('avaliado_at', { ascending: false });

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Erro ao buscar desafios concluídos:', error);
        return [];
    }
}

/**
 * Calcula pontos totais ganhos em desafios
 */
export async function calcularPontosDesafios(usuarioId: string) {
    try {
        const desafiosConcluidos = await getDesafiosConcluidos(usuarioId);
        const pontos = desafiosConcluidos.reduce((total, participacao: any) => {
            return total + (participacao.desafio?.pontos || 0);
        }, 0);
        return pontos;
    } catch (error) {
        console.error('Erro ao calcular pontos de desafios:', error);
        return 0;
    }
}
