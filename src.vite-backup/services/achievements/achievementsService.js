/**
 * 🏆 ACHIEVEMENTS SERVICE - NIPO SCHOOL
 *
 * Service de conquistas conforme documento backend
 * Gerencia achievements, badges e sistema de pontos
 */
import { supabase } from '../../lib/supabase/client';
export class AchievementsService {
    // ===========================================
    // 🏆 GERENCIAMENTO DE CONQUISTAS
    // ===========================================
    /**
     * Buscar todas as conquistas disponíveis
     */
    async getAllAchievements() {
        try {
            const { data, error } = await supabase
                .from('achievements')
                .select('*')
                .eq('visivel', true)
                .order('categoria', { ascending: true });
            if (error)
                throw error;
            return data || [];
        }
        catch (error) {
            console.error('Erro ao buscar conquistas:', error);
            return [];
        }
    }
    /**
     * Buscar conquistas por categoria
     */
    async getAchievementsByCategory(categoria) {
        try {
            const { data, error } = await supabase
                .from('achievements')
                .select('*')
                .eq('categoria', categoria)
                .eq('visivel', true)
                .order('pontos_recompensa', { ascending: false });
            if (error)
                throw error;
            return data || [];
        }
        catch (error) {
            console.error('Erro ao buscar conquistas por categoria:', error);
            return [];
        }
    }
    /**
     * Buscar conquistas do usuário
     */
    async getUserAchievements(userId) {
        try {
            const { data, error } = await supabase
                .from('user_achievements')
                .select(`
          *,
          achievement:achievements(*)
        `)
                .eq('user_id', userId)
                .order('unlocked_at', { ascending: false });
            if (error)
                throw error;
            return data || [];
        }
        catch (error) {
            console.error('Erro ao buscar conquistas do usuário:', error);
            return [];
        }
    }
    /**
     * Verificar se usuário tem conquista específica
     */
    async hasAchievement(userId, achievementId) {
        try {
            const { data, error } = await supabase
                .from('user_achievements')
                .select('id')
                .eq('user_id', userId)
                .eq('achievement_id', achievementId)
                .single();
            if (error && error.code !== 'PGRST116')
                throw error;
            return !!data;
        }
        catch (error) {
            console.error('Erro ao verificar conquista:', error);
            return false;
        }
    }
    // ===========================================
    // 🎯 DESBLOQUEIO DE CONQUISTAS
    // ===========================================
    /**
     * Desbloquear conquista para usuário
     */
    async unlockAchievement(userId, achievementId, progressData) {
        try {
            // Verificar se já possui a conquista
            const hasIt = await this.hasAchievement(userId, achievementId);
            if (hasIt)
                return true;
            // Buscar informações da conquista
            const { data: achievement } = await supabase
                .from('achievements')
                .select('pontos_recompensa')
                .eq('id', achievementId)
                .single();
            if (!achievement)
                throw new Error('Conquista não encontrada');
            // Registrar conquista do usuário
            const { error: achievementError } = await supabase
                .from('user_achievements')
                .insert({
                user_id: userId,
                achievement_id: achievementId,
                unlocked_at: new Date().toISOString(),
                progress_data: progressData || null
            });
            if (achievementError)
                throw achievementError;
            // Atualizar pontos do usuário
            await this.addPointsToUser(userId, achievement.pontos_recompensa);
            return true;
        }
        catch (error) {
            console.error('Erro ao desbloquear conquista:', error);
            return false;
        }
    }
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
            const { error } = await supabase
                .from('profiles')
                .update({
                points: newPoints,
                updated_at: new Date().toISOString()
            })
                .eq('id', userId);
            if (error)
                throw error;
            // Verificar se deve subir de nível
            await this.checkLevelUp(userId, newPoints);
        }
        catch (error) {
            console.error('Erro ao adicionar pontos:', error);
        }
    }
    /**
     * Verificar e atualizar nível do usuário
     */
    async checkLevelUp(userId, points) {
        try {
            let newLevel = 'beginner';
            if (points >= 10000) {
                newLevel = 'advanced';
            }
            else if (points >= 3000) {
                newLevel = 'intermediate';
            }
            // Atualizar nível se mudou
            await supabase
                .from('profiles')
                .update({
                user_level: newLevel,
                updated_at: new Date().toISOString()
            })
                .eq('id', userId);
            // Verificar conquistas de nível
            await this.checkLevelAchievements(userId, newLevel);
        }
        catch (error) {
            console.error('Erro ao verificar level up:', error);
        }
    }
    /**
     * Verificar conquistas baseadas em nível
     */
    async checkLevelAchievements(userId, level) {
        // Implementar lógica de conquistas automáticas baseadas em nível
        const levelAchievements = {
            intermediate: 'achievement-nivel-intermediario',
            advanced: 'achievement-nivel-avancado'
        };
        if (levelAchievements[level]) {
            await this.unlockAchievement(userId, levelAchievements[level]);
        }
    }
    // ===========================================
    // 📊 ESTATÍSTICAS E RANKINGS
    // ===========================================
    /**
     * Obter estatísticas de conquistas do usuário
     */
    async getUserAchievementStats(userId) {
        try {
            // Buscar conquistas do usuário com join
            const { data: userAchievements, error } = await supabase
                .from('user_achievements')
                .select(`
          *,
          achievements(*)
        `)
                .eq('user_id', userId);
            if (error)
                throw error;
            const allAchievements = await this.getAllAchievements();
            const stats = {
                total: userAchievements?.length || 0,
                totalPossivel: allAchievements.length,
                percentual: Math.round(((userAchievements?.length || 0) / allAchievements.length) * 100),
                porRaridade: {
                    comum: 0,
                    raro: 0,
                    epico: 0,
                    lendario: 0
                },
                pontosTotal: 0
            };
            userAchievements?.forEach((ua) => {
                if (ua.achievements) {
                    stats.porRaridade[ua.achievements.raridade]++;
                    stats.pontosTotal += ua.achievements.pontos_recompensa;
                }
            });
            return stats;
        }
        catch (error) {
            console.error('Erro ao obter estatísticas de conquistas:', error);
            return null;
        }
    }
    /**
     * Obter ranking global de pontos
     */
    async getGlobalRanking(limit = 10) {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('id, nome, points, user_level')
                .not('points', 'is', null)
                .order('points', { ascending: false })
                .limit(limit);
            if (error)
                throw error;
            return data || [];
        }
        catch (error) {
            console.error('Erro ao obter ranking global:', error);
            return [];
        }
    }
    /**
     * Obter posição do usuário no ranking
     */
    async getUserRanking(userId) {
        try {
            const { data: userProfile } = await supabase
                .from('profiles')
                .select('points')
                .eq('id', userId)
                .single();
            if (!userProfile?.points)
                return null;
            const { count } = await supabase
                .from('profiles')
                .select('*', { count: 'exact', head: true })
                .gt('points', userProfile.points);
            return (count || 0) + 1;
        }
        catch (error) {
            console.error('Erro ao obter posição no ranking:', error);
            return null;
        }
    }
    // ===========================================
    // ⚡ TRIGGERS AUTOMÁTICOS
    // ===========================================
    /**
     * Verificar conquistas automáticas baseadas em ações
     */
    async checkAutomaticAchievements(userId, action, data) {
        try {
            // Implementar lógica de conquistas automáticas
            const triggers = {
                'portfolio_created': ['first-portfolio', 'portfolio-master'],
                'desafio_completed': ['first-challenge', 'challenge-warrior'],
                'login_streak': ['daily-warrior', 'weekly-champion'],
                'instrument_mastered': ['musician', 'virtuoso']
            };
            const achievementsToCheck = triggers[action] || [];
            for (const achievementSlug of achievementsToCheck) {
                await this.checkSpecificAchievement(userId, achievementSlug, data);
            }
        }
        catch (error) {
            console.error('Erro ao verificar conquistas automáticas:', error);
        }
    }
    /**
     * Verificar conquista específica com condições
     */
    async checkSpecificAchievement(userId, achievementSlug, data) {
        // Implementar lógica específica para cada tipo de conquista
        // Por exemplo: verificar quantos portfolios o usuário tem, etc.
    }
}
// Singleton instance
export const achievementsService = new AchievementsService();
export default achievementsService;
