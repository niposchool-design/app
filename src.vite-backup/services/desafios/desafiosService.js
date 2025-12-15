/**
 * 🎯 DESAFIOS SERVICE - NIPO SCHOOL
 *
 * Service de desafios conforme documento backend
 * Gerencia criação, submissão e avaliação de desafios
 */
import { supabase } from '../../lib/supabase/client';
export class DesafiosService {
    // ===========================================
    // 🎯 GERENCIAMENTO DE DESAFIOS
    // ===========================================
    /**
     * Buscar todos os desafios ativos
     */
    async getActiveDesafios() {
        try {
            const { data, error } = await supabase
                .from('alpha_desafios')
                .select('*')
                .eq('ativo', true)
                .order('created_at', { ascending: false });
            if (error)
                throw error;
            return data || [];
        }
        catch (error) {
            console.error('Erro ao buscar desafios ativos:', error);
            return [];
        }
    }
    /**
     * Buscar desafios por nível
     */
    async getDesafiosByNivel(nivel) {
        try {
            const { data, error } = await supabase
                .from('alpha_desafios')
                .select('*')
                .eq('nivel', nivel)
                .eq('ativo', true)
                .order('pontos', { ascending: false });
            if (error)
                throw error;
            return data || [];
        }
        catch (error) {
            console.error('Erro ao buscar desafios por nível:', error);
            return [];
        }
    }
    /**
     * Buscar desafio por ID
     */
    async getDesafioById(desafioId) {
        try {
            const { data, error } = await supabase
                .from('alpha_desafios')
                .select('*')
                .eq('id', desafioId)
                .single();
            if (error)
                throw error;
            return data;
        }
        catch (error) {
            console.error('Erro ao buscar desafio:', error);
            return null;
        }
    }
    /**
     * Criar novo desafio (admin/professor)
     */
    async createDesafio(desafioData) {
        try {
            const { data, error } = await supabase
                .from('alpha_desafios')
                .insert({
                ...desafioData,
                ativo: true,
                created_at: new Date().toISOString()
            })
                .select()
                .single();
            if (error)
                throw error;
            return data;
        }
        catch (error) {
            console.error('Erro ao criar desafio:', error);
            return null;
        }
    }
    /**
     * Atualizar desafio
     */
    async updateDesafio(desafioId, updates) {
        try {
            const { data, error } = await supabase
                .from('alpha_desafios')
                .update(updates)
                .eq('id', desafioId)
                .select()
                .single();
            if (error)
                throw error;
            return data;
        }
        catch (error) {
            console.error('Erro ao atualizar desafio:', error);
            return null;
        }
    }
    /**
     * Desativar desafio
     */
    async deactivateDesafio(desafioId) {
        try {
            const { error } = await supabase
                .from('alpha_desafios')
                .update({ ativo: false })
                .eq('id', desafioId);
            if (error)
                throw error;
            return true;
        }
        catch (error) {
            console.error('Erro ao desativar desafio:', error);
            return false;
        }
    }
    // ===========================================
    // 📝 SUBMISSÕES DE DESAFIOS
    // ===========================================
    /**
     * Submeter resposta para desafio
     */
    async submitDesafio(userId, desafioId, submissionData) {
        try {
            // Verificar se já existe submissão para este desafio
            const { data: existingSubmission } = await supabase
                .from('desafio_submissions')
                .select('id')
                .eq('user_id', userId)
                .eq('desafio_id', desafioId)
                .single();
            if (existingSubmission) {
                throw new Error('Já existe uma submissão para este desafio');
            }
            const { data, error } = await supabase
                .from('desafio_submissions')
                .insert({
                user_id: userId,
                desafio_id: desafioId,
                submission_data: submissionData,
                status: 'pendente',
                submitted_at: new Date().toISOString()
            })
                .select()
                .single();
            if (error)
                throw error;
            return data;
        }
        catch (error) {
            console.error('Erro ao submeter desafio:', error);
            return null;
        }
    }
    /**
     * Buscar submissões do usuário
     */
    async getUserSubmissions(userId) {
        try {
            const { data, error } = await supabase
                .from('desafio_submissions')
                .select(`
          *,
          alpha_desafios(*)
        `)
                .eq('user_id', userId)
                .order('submitted_at', { ascending: false });
            if (error)
                throw error;
            return data || [];
        }
        catch (error) {
            console.error('Erro ao buscar submissões do usuário:', error);
            return [];
        }
    }
    /**
     * Buscar submissão específica
     */
    async getSubmission(userId, desafioId) {
        try {
            const { data, error } = await supabase
                .from('desafio_submissions')
                .select('*')
                .eq('user_id', userId)
                .eq('desafio_id', desafioId)
                .single();
            if (error)
                throw error;
            return data;
        }
        catch (error) {
            console.error('Erro ao buscar submissão:', error);
            return null;
        }
    }
    /**
     * Verificar se usuário já submeteu desafio
     */
    async hasUserSubmitted(userId, desafioId) {
        try {
            const submission = await this.getSubmission(userId, desafioId);
            return !!submission;
        }
        catch (error) {
            console.error('Erro ao verificar submissão:', error);
            return false;
        }
    }
    // ===========================================
    // ✅ AVALIAÇÃO DE SUBMISSÕES
    // ===========================================
    /**
     * Aprovar submissão
     */
    async approveSubmission(submissionId, feedback) {
        try {
            const { data: submission, error: fetchError } = await supabase
                .from('desafio_submissions')
                .select(`
          *,
          alpha_desafios(pontos)
        `)
                .eq('id', submissionId)
                .single();
            if (fetchError)
                throw fetchError;
            // Atualizar status da submissão
            const { error: updateError } = await supabase
                .from('desafio_submissions')
                .update({
                status: 'aprovado',
                feedback: feedback || null,
                reviewed_at: new Date().toISOString()
            })
                .eq('id', submissionId);
            if (updateError)
                throw updateError;
            // Adicionar pontos ao usuário
            if (submission.alpha_desafios?.pontos) {
                await this.addPointsToUser(submission.user_id, submission.alpha_desafios.pontos);
            }
            return true;
        }
        catch (error) {
            console.error('Erro ao aprovar submissão:', error);
            return false;
        }
    }
    /**
     * Rejeitar submissão
     */
    async rejectSubmission(submissionId, feedback) {
        try {
            const { error } = await supabase
                .from('desafio_submissions')
                .update({
                status: 'rejeitado',
                feedback: feedback,
                reviewed_at: new Date().toISOString()
            })
                .eq('id', submissionId);
            if (error)
                throw error;
            return true;
        }
        catch (error) {
            console.error('Erro ao rejeitar submissão:', error);
            return false;
        }
    }
    /**
     * Buscar submissões pendentes para avaliação
     */
    async getPendingSubmissions() {
        try {
            const { data, error } = await supabase
                .from('desafio_submissions')
                .select(`
          *,
          alpha_desafios(*),
          profiles(nome, email)
        `)
                .eq('status', 'pendente')
                .order('submitted_at', { ascending: true });
            if (error)
                throw error;
            return data || [];
        }
        catch (error) {
            console.error('Erro ao buscar submissões pendentes:', error);
            return [];
        }
    }
    // ===========================================
    // 🏆 PONTUAÇÃO E ACHIEVEMENTS
    // ===========================================
    /**
     * Adicionar pontos ao usuário
     */
    async addPointsToUser(userId, points) {
        try {
            // Buscar pontos atuais
            const { data: profile } = await supabase
                .from('profiles')
                .select('points')
                .eq('id', userId)
                .single();
            const currentPoints = profile?.points || 0;
            const newPoints = currentPoints + points;
            // Atualizar pontos
            await supabase
                .from('profiles')
                .update({
                points: newPoints,
                updated_at: new Date().toISOString()
            })
                .eq('id', userId);
        }
        catch (error) {
            console.error('Erro ao adicionar pontos:', error);
        }
    }
    // ===========================================
    // 📊 ESTATÍSTICAS E RELATÓRIOS
    // ===========================================
    /**
     * Obter estatísticas de desafios do usuário
     */
    async getUserDesafioStats(userId) {
        try {
            const submissions = await this.getUserSubmissions(userId);
            const stats = {
                totalSubmetidos: submissions.length,
                aprovados: submissions.filter(s => s.status === 'aprovado').length,
                rejeitados: submissions.filter(s => s.status === 'rejeitado').length,
                pendentes: submissions.filter(s => s.status === 'pendente').length,
                pontosGanhos: 0,
                porNivel: {
                    facil: 0,
                    medio: 0,
                    dificil: 0
                }
            };
            submissions.forEach((s) => {
                if (s.status === 'aprovado' && s.alpha_desafios?.pontos) {
                    stats.pontosGanhos += s.alpha_desafios.pontos;
                }
                if (s.alpha_desafios?.nivel) {
                    stats.porNivel[s.alpha_desafios.nivel]++;
                }
            });
            return stats;
        }
        catch (error) {
            console.error('Erro ao obter estatísticas de desafios:', error);
            return null;
        }
    }
    /**
     * Obter estatísticas gerais dos desafios
     */
    async getDesafiosStats() {
        try {
            const { data: desafios } = await supabase
                .from('alpha_desafios')
                .select('*');
            const { data: submissions } = await supabase
                .from('desafio_submissions')
                .select('*');
            return {
                totalDesafios: desafios?.length || 0,
                desafiosAtivos: desafios?.filter(d => d.ativo).length || 0,
                totalSubmissoes: submissions?.length || 0,
                submissoesPendentes: submissions?.filter(s => s.status === 'pendente').length || 0,
                submissoesAprovadas: submissions?.filter(s => s.status === 'aprovado').length || 0
            };
        }
        catch (error) {
            console.error('Erro ao obter estatísticas gerais:', error);
            return null;
        }
    }
}
// Singleton instance
export const desafiosService = new DesafiosService();
export default desafiosService;
