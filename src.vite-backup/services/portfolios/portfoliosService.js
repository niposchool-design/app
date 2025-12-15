/**
 * 📂 PORTFOLIOS SERVICE - NIPO SCHOOL
 *
 * Service de portfólios conforme documento backend
 * Gerencia criação, edição e avaliação de portfólios
 */
import { supabase } from '../../lib/supabase/client';
export class PortfoliosService {
    // ===========================================
    // 📁 GERENCIAMENTO DE PORTFÓLIOS
    // ===========================================
    /**
     * Criar novo portfólio
     */
    async createPortfolio(userId, portfolioData) {
        try {
            const { data, error } = await supabase
                .from('portfolios')
                .insert({
                user_id: userId,
                ...portfolioData,
                status: 'rascunho',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            })
                .select()
                .single();
            if (error)
                throw error;
            return data;
        }
        catch (error) {
            console.error('Erro ao criar portfólio:', error);
            return null;
        }
    }
    /**
     * Buscar portfólios do usuário
     */
    async getUserPortfolios(userId) {
        try {
            const { data, error } = await supabase
                .from('portfolios')
                .select('*')
                .eq('user_id', userId)
                .order('updated_at', { ascending: false });
            if (error)
                throw error;
            return data || [];
        }
        catch (error) {
            console.error('Erro ao buscar portfólios do usuário:', error);
            return [];
        }
    }
    /**
     * Buscar portfólio por ID
     */
    async getPortfolioById(portfolioId) {
        try {
            const { data, error } = await supabase
                .from('portfolios')
                .select('*')
                .eq('id', portfolioId)
                .single();
            if (error)
                throw error;
            return data;
        }
        catch (error) {
            console.error('Erro ao buscar portfólio:', error);
            return null;
        }
    }
    /**
     * Atualizar portfólio
     */
    async updatePortfolio(portfolioId, updates) {
        try {
            const { data, error } = await supabase
                .from('portfolios')
                .update({
                ...updates,
                updated_at: new Date().toISOString()
            })
                .eq('id', portfolioId)
                .select()
                .single();
            if (error)
                throw error;
            return data;
        }
        catch (error) {
            console.error('Erro ao atualizar portfólio:', error);
            return null;
        }
    }
    /**
     * Deletar portfólio
     */
    async deletePortfolio(portfolioId) {
        try {
            // Primeiro deletar os itens do portfólio
            await supabase
                .from('portfolio_items')
                .delete()
                .eq('portfolio_id', portfolioId);
            // Depois deletar o portfólio
            const { error } = await supabase
                .from('portfolios')
                .delete()
                .eq('id', portfolioId);
            if (error)
                throw error;
            return true;
        }
        catch (error) {
            console.error('Erro ao deletar portfólio:', error);
            return false;
        }
    }
    // ===========================================
    // 📄 GERENCIAMENTO DE ITENS
    // ===========================================
    /**
     * Adicionar item ao portfólio
     */
    async addPortfolioItem(portfolioId, itemData) {
        try {
            // Buscar próxima ordem
            const { data: lastItem } = await supabase
                .from('portfolio_items')
                .select('ordem')
                .eq('portfolio_id', portfolioId)
                .order('ordem', { ascending: false })
                .limit(1)
                .single();
            const nextOrder = (lastItem?.ordem || 0) + 1;
            const { data, error } = await supabase
                .from('portfolio_items')
                .insert({
                portfolio_id: portfolioId,
                ...itemData,
                ordem: nextOrder,
                created_at: new Date().toISOString()
            })
                .select()
                .single();
            if (error)
                throw error;
            // Atualizar timestamp do portfólio
            await this.updatePortfolio(portfolioId, {});
            return data;
        }
        catch (error) {
            console.error('Erro ao adicionar item ao portfólio:', error);
            return null;
        }
    }
    /**
     * Buscar itens do portfólio
     */
    async getPortfolioItems(portfolioId) {
        try {
            const { data, error } = await supabase
                .from('portfolio_items')
                .select('*')
                .eq('portfolio_id', portfolioId)
                .order('ordem', { ascending: true });
            if (error)
                throw error;
            return data || [];
        }
        catch (error) {
            console.error('Erro ao buscar itens do portfólio:', error);
            return [];
        }
    }
    /**
     * Reordenar itens do portfólio
     */
    async reorderPortfolioItems(portfolioId, itemsOrder) {
        try {
            for (const item of itemsOrder) {
                await supabase
                    .from('portfolio_items')
                    .update({ ordem: item.ordem })
                    .eq('id', item.id);
            }
            // Atualizar timestamp do portfólio
            await this.updatePortfolio(portfolioId, {});
            return true;
        }
        catch (error) {
            console.error('Erro ao reordenar itens:', error);
            return false;
        }
    }
    /**
     * Deletar item do portfólio
     */
    async deletePortfolioItem(itemId) {
        try {
            // Buscar informações do item para atualizar o portfólio
            const { data: item } = await supabase
                .from('portfolio_items')
                .select('portfolio_id')
                .eq('id', itemId)
                .single();
            if (!item)
                return false;
            const { error } = await supabase
                .from('portfolio_items')
                .delete()
                .eq('id', itemId);
            if (error)
                throw error;
            // Atualizar timestamp do portfólio
            await this.updatePortfolio(item.portfolio_id, {});
            return true;
        }
        catch (error) {
            console.error('Erro ao deletar item:', error);
            return false;
        }
    }
    // ===========================================
    // 🎯 SUBMISSÃO E AVALIAÇÃO
    // ===========================================
    /**
     * Submeter portfólio para avaliação
     */
    async submitPortfolio(portfolioId) {
        try {
            const { error } = await supabase
                .from('portfolios')
                .update({
                status: 'submetido',
                updated_at: new Date().toISOString()
            })
                .eq('id', portfolioId);
            if (error)
                throw error;
            return true;
        }
        catch (error) {
            console.error('Erro ao submeter portfólio:', error);
            return false;
        }
    }
    /**
     * Avaliar portfólio (professor/admin)
     */
    async evaluatePortfolio(portfolioId, nota, feedback) {
        try {
            const { error } = await supabase
                .from('portfolios')
                .update({
                status: 'avaliado',
                nota_final: nota,
                feedback: feedback,
                updated_at: new Date().toISOString()
            })
                .eq('id', portfolioId);
            if (error)
                throw error;
            return true;
        }
        catch (error) {
            console.error('Erro ao avaliar portfólio:', error);
            return false;
        }
    }
    // ===========================================
    // 📊 ESTATÍSTICAS E RELATÓRIOS
    // ===========================================
    /**
     * Obter estatísticas de portfólios do usuário
     */
    async getUserPortfolioStats(userId) {
        try {
            const portfolios = await this.getUserPortfolios(userId);
            const stats = {
                total: portfolios.length,
                rascunhos: portfolios.filter(p => p.status === 'rascunho').length,
                submetidos: portfolios.filter(p => p.status === 'submetido').length,
                emAvaliacao: portfolios.filter(p => p.status === 'em_avaliacao').length,
                avaliados: portfolios.filter(p => p.status === 'avaliado').length,
                mediaNotas: 0,
                porTipo: {}
            };
            // Calcular média das notas
            const avaliadosComNota = portfolios.filter(p => p.status === 'avaliado' && p.nota_final > 0);
            if (avaliadosComNota.length > 0) {
                stats.mediaNotas = avaliadosComNota.reduce((sum, p) => sum + p.nota_final, 0) / avaliadosComNota.length;
            }
            // Agrupar por tipo
            portfolios.forEach(p => {
                stats.porTipo[p.tipo] = (stats.porTipo[p.tipo] || 0) + 1;
            });
            return stats;
        }
        catch (error) {
            console.error('Erro ao obter estatísticas de portfólios:', error);
            return null;
        }
    }
    /**
     * Buscar portfólios públicos
     */
    async getPublicPortfolios(limit = 10) {
        try {
            const { data, error } = await supabase
                .from('portfolios')
                .select(`
          *,
          profiles(nome, avatar_url)
        `)
                .eq('status', 'avaliado')
                .gte('nota_final', 8) // Apenas portfólios com nota alta
                .order('updated_at', { ascending: false })
                .limit(limit);
            if (error)
                throw error;
            return data || [];
        }
        catch (error) {
            console.error('Erro ao buscar portfólios públicos:', error);
            return [];
        }
    }
    /**
     * Buscar portfólios para avaliação (professor/admin)
     */
    async getPortfoliosForReview() {
        try {
            const { data, error } = await supabase
                .from('portfolios')
                .select(`
          *,
          profiles(nome, email)
        `)
                .in('status', ['submetido', 'em_avaliacao'])
                .order('updated_at', { ascending: true });
            if (error)
                throw error;
            return data || [];
        }
        catch (error) {
            console.error('Erro ao buscar portfólios para avaliação:', error);
            return [];
        }
    }
}
// Singleton instance
export const portfoliosService = new PortfoliosService();
export default portfoliosService;
