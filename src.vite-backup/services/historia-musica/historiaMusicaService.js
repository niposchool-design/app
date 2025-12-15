// 🎼 SERVIÇO DE HISTÓRIA DA MÚSICA - NIPO SCHOOL
// ================================================
// Service para gestão completa do módulo de História da Música
import { supabase } from '@/lib/supabase/client';
import { CommonErrors } from '@/lib/constants/errors';
export class HistoriaMusicaService {
    // 📅 PERÍODOS HISTÓRICOS
    // =========================================
    static async getAllPeriodos() {
        try {
            const { data, error } = await supabase
                .from('historia_periodos')
                .select('*')
                .eq('ativo', true)
                .order('ordem_cronologica', { ascending: true });
            if (error)
                throw new Error(`Erro ao buscar períodos: ${error.message}`);
            return data || [];
        }
        catch (error) {
            console.error('Erro no getAllPeriodos:', error);
            throw CommonErrors.NETWORK_ERROR;
        }
    }
    static async getPeriodoById(id) {
        try {
            const { data, error } = await supabase
                .from('historia_periodos')
                .select('*')
                .eq('id', id)
                .eq('ativo', true)
                .single();
            if (error) {
                if (error.code === 'PGRST116')
                    return null;
                throw new Error(`Erro ao buscar período: ${error.message}`);
            }
            return data;
        }
        catch (error) {
            console.error('Erro no getPeriodoById:', error);
            throw error instanceof Error ? error : CommonErrors.NETWORK_ERROR;
        }
    }
    // 🎭 COMPOSITORES
    // =========================================
    static async getAllCompositores(filtros) {
        try {
            let query = supabase
                .from('historia_compositores')
                .select('*')
                .eq('ativo', true);
            if (filtros?.periodoId) {
                query = query.eq('periodo_id', filtros.periodoId);
            }
            if (filtros?.paisNascimento) {
                query = query.eq('pais_nascimento', filtros.paisNascimento);
            }
            if (filtros?.nivelImportancia) {
                query = query.gte('nivel_importancia', filtros.nivelImportancia);
            }
            query = query
                .order('nivel_importancia', { ascending: false })
                .order('data_nascimento', { ascending: true });
            if (filtros?.limit) {
                query = query.limit(filtros.limit);
            }
            const { data, error } = await query;
            if (error)
                throw new Error(`Erro ao buscar compositores: ${error.message}`);
            return data || [];
        }
        catch (error) {
            console.error('Erro no getAllCompositores:', error);
            throw CommonErrors.NETWORK_ERROR;
        }
    }
    static async getCompositorDetalhes(compositorId) {
        try {
            const { data, error } = await supabase
                .from('historia_compositores')
                .select(`
          *,
          periodo:historia_periodos(*),
          obras:historia_obras(
            id,
            titulo,
            ano_composicao,
            tipo_obra,
            audio_url,
            popularidade
          )
        `)
                .eq('id', compositorId)
                .eq('ativo', true)
                .single();
            if (error)
                throw new Error(`Erro ao buscar detalhes do compositor: ${error.message}`);
            return data;
        }
        catch (error) {
            console.error('Erro no getCompositorDetalhes:', error);
            throw error instanceof Error ? error : CommonErrors.NETWORK_ERROR;
        }
    }
    // 🎵 OBRAS MUSICAIS
    // =========================================
    static async getAllObras(filtros) {
        try {
            let query = supabase
                .from('historia_obras')
                .select('*')
                .eq('ativo', true);
            if (filtros?.compositorId) {
                query = query.eq('compositor_id', filtros.compositorId);
            }
            if (filtros?.periodoId) {
                query = query.eq('periodo_id', filtros.periodoId);
            }
            if (filtros?.tipoObra) {
                query = query.eq('tipo_obra', filtros.tipoObra);
            }
            if (filtros?.genero) {
                query = query.eq('genero', filtros.genero);
            }
            if (filtros?.nivelDificuldade) {
                query = query.eq('nivel_dificuldade', filtros.nivelDificuldade);
            }
            query = query
                .order('popularidade', { ascending: false })
                .order('ano_composicao', { ascending: true });
            if (filtros?.limit) {
                query = query.limit(filtros.limit);
            }
            const { data, error } = await query;
            if (error)
                throw new Error(`Erro ao buscar obras: ${error.message}`);
            return data || [];
        }
        catch (error) {
            console.error('Erro no getAllObras:', error);
            throw CommonErrors.NETWORK_ERROR;
        }
    }
    static async getObraDetalhes(obraId) {
        try {
            const { data, error } = await supabase
                .from('historia_obras')
                .select(`
          *,
          compositor:historia_compositores(
            id,
            nome_completo,
            foto_url,
            data_nascimento,
            data_falecimento
          ),
          periodo:historia_periodos(
            id,
            nome,
            cor_tematica
          )
        `)
                .eq('id', obraId)
                .eq('ativo', true)
                .single();
            if (error)
                throw new Error(`Erro ao buscar detalhes da obra: ${error.message}`);
            return data;
        }
        catch (error) {
            console.error('Erro no getObraDetalhes:', error);
            throw error instanceof Error ? error : CommonErrors.NETWORK_ERROR;
        }
    }
    // ⏰ LINHA DO TEMPO
    // =========================================
    static async getEventosTimeline(filtros) {
        try {
            let query = supabase
                .from('historia_eventos_timeline')
                .select(`
          *,
          compositor:historia_compositores(nome_completo, foto_url),
          obra:historia_obras(titulo),
          periodo:historia_periodos(nome, cor_tematica)
        `)
                .eq('ativo', true);
            if (filtros?.anoInicio) {
                query = query.gte('ano', filtros.anoInicio);
            }
            if (filtros?.anoFim) {
                query = query.lte('ano', filtros.anoFim);
            }
            if (filtros?.categoria) {
                query = query.eq('categoria', filtros.categoria);
            }
            if (filtros?.importanciaMinima) {
                query = query.gte('importancia', filtros.importanciaMinima);
            }
            query = query
                .order('ano', { ascending: true })
                .order('mes', { ascending: true })
                .order('dia', { ascending: true });
            if (filtros?.limit) {
                query = query.limit(filtros.limit);
            }
            const { data, error } = await query;
            if (error)
                throw new Error(`Erro ao buscar timeline: ${error.message}`);
            return data || [];
        }
        catch (error) {
            console.error('Erro no getEventosTimeline:', error);
            throw CommonErrors.NETWORK_ERROR;
        }
    }
    // 🔍 BUSCA E EXPLORAÇÃO
    // =========================================
    static async buscarConteudo(termo, tipos) {
        try {
            const results = { periodos: [], compositores: [], obras: [] };
            // Buscar períodos
            if (!tipos || tipos.includes('periodos')) {
                const { data: periodos } = await supabase
                    .from('historia_periodos')
                    .select('*')
                    .ilike('nome', `%${termo}%`)
                    .eq('ativo', true)
                    .limit(5);
                results.periodos = periodos || [];
            }
            // Buscar compositores
            if (!tipos || tipos.includes('compositores')) {
                const { data: compositores } = await supabase
                    .from('historia_compositores')
                    .select('*')
                    .or(`nome_completo.ilike.%${termo}%,nome_artistico.ilike.%${termo}%`)
                    .eq('ativo', true)
                    .limit(10);
                results.compositores = compositores || [];
            }
            // Buscar obras
            if (!tipos || tipos.includes('obras')) {
                const { data: obras } = await supabase
                    .from('historia_obras')
                    .select('*')
                    .or(`titulo.ilike.%${termo}%,titulo_original.ilike.%${termo}%`)
                    .eq('ativo', true)
                    .limit(10);
                results.obras = obras || [];
            }
            return results;
        }
        catch (error) {
            console.error('Erro na buscarConteudo:', error);
            throw CommonErrors.NETWORK_ERROR;
        }
    }
    // 📊 ESTATÍSTICAS E DASHBOARDS
    // =========================================
    static async getEstatisticasGerais() {
        try {
            // Contar totais
            const [{ count: totalPeriodos }, { count: totalCompositores }, { count: totalObras }, { count: eventosPrincipais }] = await Promise.all([
                supabase.from('historia_periodos').select('*', { count: 'exact', head: true }).eq('ativo', true),
                supabase.from('historia_compositores').select('*', { count: 'exact', head: true }).eq('ativo', true),
                supabase.from('historia_obras').select('*', { count: 'exact', head: true }).eq('ativo', true),
                supabase.from('historia_eventos_timeline').select('*', { count: 'exact', head: true }).eq('ativo', true).gte('importancia', 4)
            ]);
            return {
                totalPeriodos: totalPeriodos || 0,
                totalCompositores: totalCompositores || 0,
                totalObras: totalObras || 0,
                eventosPrincipais: eventosPrincipais || 0,
                periodoMaisPopular: 'Barroco', // TODO: calcular dinamicamente
                compositorMaisObras: 'Bach', // TODO: calcular dinamicamente
                obraMaisPopular: 'Ave Maria', // TODO: calcular dinamicamente
                distribuicaoPorPeriodo: [], // TODO: implementar consulta
                timeline: [] // TODO: implementar consulta
            };
        }
        catch (error) {
            console.error('Erro no getEstatisticasGerais:', error);
            throw CommonErrors.NETWORK_ERROR;
        }
    }
    // 🎯 RECOMENDAÇÕES PERSONALIZADAS
    // =========================================
    static async getRecomendacoesPeriodo(periodoId) {
        try {
            const [compositores, obras, eventos] = await Promise.all([
                // Compositores mais importantes do período
                supabase
                    .from('historia_compositores')
                    .select('*')
                    .eq('periodo_id', periodoId)
                    .eq('ativo', true)
                    .gte('nivel_importancia', 3)
                    .order('nivel_importancia', { ascending: false })
                    .limit(6),
                // Obras mais populares do período
                supabase
                    .from('historia_obras')
                    .select('*, compositor:historia_compositores(nome_completo)')
                    .eq('periodo_id', periodoId)
                    .eq('ativo', true)
                    .order('popularidade', { ascending: false })
                    .limit(8),
                // Eventos cruciais do período
                supabase
                    .from('historia_eventos_timeline')
                    .select('*')
                    .eq('periodo_id', periodoId)
                    .eq('ativo', true)
                    .gte('importancia', 3)
                    .order('importancia', { ascending: false })
                    .limit(5)
            ]);
            return {
                compositoresDestaque: compositores.data || [],
                obrasEssenciais: obras.data || [],
                eventosCruciais: eventos.data || []
            };
        }
        catch (error) {
            console.error('Erro no getRecomendacoesPeriodo:', error);
            throw CommonErrors.NETWORK_ERROR;
        }
    }
    // 🎵 FUNCIONALIDADES DE ÁUDIO
    // =========================================
    static async incrementarPopularidadeObra(obraId) {
        try {
            // Buscar popularidade atual e incrementar
            const { data: obra, error: getError } = await supabase
                .from('historia_obras')
                .select('popularidade')
                .eq('id', obraId)
                .single();
            if (getError)
                throw new Error(`Erro ao buscar obra: ${getError.message}`);
            const { error } = await supabase
                .from('historia_obras')
                .update({
                popularidade: (obra?.popularidade || 0) + 1
            })
                .eq('id', obraId);
            if (error)
                throw new Error(`Erro ao incrementar popularidade: ${error.message}`);
        }
        catch (error) {
            console.error('Erro no incrementarPopularidadeObra:', error);
            throw error instanceof Error ? error : CommonErrors.VALIDATION_ERROR;
        }
    }
    static async getPlaylistPeriodo(periodoId, limite = 20) {
        try {
            const { data, error } = await supabase
                .from('historia_obras')
                .select(`
          *,
          compositor:historia_compositores(nome_completo)
        `)
                .eq('periodo_id', periodoId)
                .eq('ativo', true)
                .not('audio_url', 'is', null)
                .order('popularidade', { ascending: false })
                .limit(limite);
            if (error)
                throw new Error(`Erro ao buscar playlist: ${error.message}`);
            return data || [];
        }
        catch (error) {
            console.error('Erro no getPlaylistPeriodo:', error);
            throw CommonErrors.NETWORK_ERROR;
        }
    }
}
