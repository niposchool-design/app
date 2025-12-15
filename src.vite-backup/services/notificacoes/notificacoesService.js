// 🔔 SERVIÇO DE NOTIFICAÇÕES - NIPO SCHOOL
// ================================================
// Service para gestão completa de notificações
import { supabase } from '@/lib/supabase/client';
import { CommonErrors } from '@/lib/constants/errors';
export class NotificacoesService {
    // 📋 LISTAR NOTIFICAÇÕES DO USUÁRIO
    // =========================================
    static async getNotificacoesUsuario(userId, limit = 20) {
        try {
            const { data, error } = await supabase
                .from('notificacoes')
                .select('*')
                .eq('user_id', userId)
                .order('data_envio', { ascending: false })
                .limit(limit);
            if (error)
                throw new Error(`Erro ao buscar notificações: ${error.message}`);
            return data || [];
        }
        catch (error) {
            console.error('Erro no getNotificacoesUsuario:', error);
            throw CommonErrors.NETWORK_ERROR;
        }
    }
    // 📬 CRIAR NOVA NOTIFICAÇÃO
    // =========================================
    static async criarNotificacao(data) {
        try {
            const notificacaoData = {
                user_id: data.user_id,
                titulo: data.titulo,
                mensagem: data.mensagem,
                tipo: data.tipo,
                lida: false,
                data_envio: new Date().toISOString(),
                metadata: data.metadata || null
            };
            const { data: result, error } = await supabase
                .from('notificacoes')
                .insert(notificacaoData)
                .select()
                .single();
            if (error)
                throw new Error(`Erro ao criar notificação: ${error.message}`);
            return result;
        }
        catch (error) {
            console.error('Erro no criarNotificacao:', error);
            throw error instanceof Error ? error : CommonErrors.VALIDATION_ERROR;
        }
    }
    // ✅ MARCAR COMO LIDA
    // =========================================
    static async marcarComoLida(notificacaoId) {
        try {
            const { data, error } = await supabase
                .from('notificacoes')
                .update({
                lida: true,
                data_leitura: new Date().toISOString()
            })
                .eq('id', notificacaoId)
                .select()
                .single();
            if (error)
                throw new Error(`Erro ao marcar como lida: ${error.message}`);
            return data;
        }
        catch (error) {
            console.error('Erro no marcarComoLida:', error);
            throw error instanceof Error ? error : CommonErrors.VALIDATION_ERROR;
        }
    }
    // ✅ MARCAR TODAS COMO LIDAS
    // =========================================
    static async marcarTodasComoLidas(userId) {
        try {
            const { error } = await supabase
                .from('notificacoes')
                .update({
                lida: true,
                data_leitura: new Date().toISOString()
            })
                .eq('user_id', userId)
                .eq('lida', false);
            if (error)
                throw new Error(`Erro ao marcar todas como lidas: ${error.message}`);
        }
        catch (error) {
            console.error('Erro no marcarTodasComoLidas:', error);
            throw error instanceof Error ? error : CommonErrors.VALIDATION_ERROR;
        }
    }
    // 🗑️ DELETAR NOTIFICAÇÃO
    // =========================================
    static async deletarNotificacao(notificacaoId) {
        try {
            const { error } = await supabase
                .from('notificacoes')
                .delete()
                .eq('id', notificacaoId);
            if (error)
                throw new Error(`Erro ao deletar notificação: ${error.message}`);
        }
        catch (error) {
            console.error('Erro no deletarNotificacao:', error);
            throw error instanceof Error ? error : CommonErrors.VALIDATION_ERROR;
        }
    }
    // 📊 CONTAR NOTIFICAÇÕES NÃO LIDAS
    // =========================================
    static async contarNaoLidas(userId) {
        try {
            const { count, error } = await supabase
                .from('notificacoes')
                .select('*', { count: 'exact', head: true })
                .eq('user_id', userId)
                .eq('lida', false);
            if (error)
                throw new Error(`Erro ao contar não lidas: ${error.message}`);
            return count || 0;
        }
        catch (error) {
            console.error('Erro no contarNaoLidas:', error);
            throw CommonErrors.NETWORK_ERROR;
        }
    }
    // 🔍 BUSCAR POR TIPO
    // =========================================
    static async buscarPorTipo(userId, tipo) {
        try {
            const { data, error } = await supabase
                .from('notificacoes')
                .select('*')
                .eq('user_id', userId)
                .eq('tipo', tipo)
                .order('data_envio', { ascending: false });
            if (error)
                throw new Error(`Erro ao buscar por tipo: ${error.message}`);
            return data || [];
        }
        catch (error) {
            console.error('Erro no buscarPorTipo:', error);
            throw CommonErrors.NETWORK_ERROR;
        }
    }
    // 📢 NOTIFICAÇÕES EM MASSA
    // =========================================
    static async enviarNotificacaoMassa(data) {
        try {
            const notificacoes = data.user_ids.map(userId => ({
                user_id: userId,
                titulo: data.titulo,
                mensagem: data.mensagem,
                tipo: data.tipo,
                lida: false,
                data_envio: new Date().toISOString(),
                metadata: data.metadata || null
            }));
            const { data: result, error } = await supabase
                .from('notificacoes')
                .insert(notificacoes)
                .select();
            if (error)
                throw new Error(`Erro no envio em massa: ${error.message}`);
            return result || [];
        }
        catch (error) {
            console.error('Erro no enviarNotificacaoMassa:', error);
            throw error instanceof Error ? error : CommonErrors.VALIDATION_ERROR;
        }
    }
    // 🧹 LIMPAR NOTIFICAÇÕES ANTIGAS
    // =========================================
    static async limparNotificacoesAntigas(userId, diasAntigos = 30) {
        try {
            const dataLimite = new Date();
            dataLimite.setDate(dataLimite.getDate() - diasAntigos);
            const { error } = await supabase
                .from('notificacoes')
                .delete()
                .eq('user_id', userId)
                .eq('lida', true)
                .lt('data_envio', dataLimite.toISOString());
            if (error)
                throw new Error(`Erro ao limpar notificações: ${error.message}`);
        }
        catch (error) {
            console.error('Erro no limparNotificacoesAntigas:', error);
            throw error instanceof Error ? error : CommonErrors.VALIDATION_ERROR;
        }
    }
    // 📊 ESTATÍSTICAS DAS NOTIFICAÇÕES
    // =========================================
    static async getEstatisticasNotificacoes(userId) {
        try {
            // Total de notificações
            const { count: total } = await supabase
                .from('notificacoes')
                .select('*', { count: 'exact', head: true })
                .eq('user_id', userId);
            // Não lidas
            const { count: naoLidas } = await supabase
                .from('notificacoes')
                .select('*', { count: 'exact', head: true })
                .eq('user_id', userId)
                .eq('lida', false);
            // Por tipo
            const { data: notificacoes } = await supabase
                .from('notificacoes')
                .select('tipo')
                .eq('user_id', userId);
            const porTipo = {};
            notificacoes?.forEach(notif => {
                porTipo[notif.tipo] = (porTipo[notif.tipo] || 0) + 1;
            });
            // Última leitura
            const { data: ultimaLida } = await supabase
                .from('notificacoes')
                .select('data_leitura')
                .eq('user_id', userId)
                .not('data_leitura', 'is', null)
                .order('data_leitura', { ascending: false })
                .limit(1)
                .single();
            return {
                total: total || 0,
                naoLidas: naoLidas || 0,
                porTipo,
                ultimaLeitura: ultimaLida?.data_leitura || null
            };
        }
        catch (error) {
            console.error('Erro no getEstatisticasNotificacoes:', error);
            throw CommonErrors.NETWORK_ERROR;
        }
    }
    // 🎯 NOTIFICAÇÕES DE CONQUISTAS
    // =========================================
    static async notificarConquista(userId, nomeConquista) {
        return this.criarNotificacao({
            user_id: userId,
            titulo: '🏆 Nova Conquista!',
            mensagem: `Parabéns! Você desbloqueou: ${nomeConquista}`,
            tipo: 'sucesso',
            metadata: { tipo: 'conquista', conquista: nomeConquista }
        });
    }
    // 📚 NOTIFICAÇÕES DE AULAS
    // =========================================
    static async notificarProximaAula(userId, nomeAula, horario) {
        return this.criarNotificacao({
            user_id: userId,
            titulo: '📚 Próxima Aula',
            mensagem: `Sua aula "${nomeAula}" começa às ${horario}`,
            tipo: 'info',
            metadata: { tipo: 'aula', aula: nomeAula, horario }
        });
    }
    // 🎯 NOTIFICAÇÕES DE DESAFIOS
    // =========================================
    static async notificarNovoDesafio(userId, nomeDesafio) {
        return this.criarNotificacao({
            user_id: userId,
            titulo: '🎯 Novo Desafio!',
            mensagem: `Um novo desafio está disponível: ${nomeDesafio}`,
            tipo: 'info',
            metadata: { tipo: 'desafio', desafio: nomeDesafio }
        });
    }
}
