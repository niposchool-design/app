// src/lib/supabase/queries/admin.ts
import { supabase } from '../client';
export const adminQueries = {
    // Buscar todos os usuários
    getAllUsers: async () => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .order('created_at', { ascending: false });
        if (error)
            throw error;
        return data;
    },
    // Buscar usuários por tipo
    getUsersByType: async (tipoUsuario) => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('tipo_usuario', tipoUsuario)
            .order('created_at', { ascending: false });
        if (error)
            throw error;
        return data;
    },
    // Estatísticas do dashboard admin
    getDashboardStats: async () => {
        // Total de usuários por tipo
        const { data: profiles } = await supabase
            .from('profiles')
            .select('tipo_usuario');
        // Total de pontos distribuídos
        const { data: pointsLog } = await supabase
            .from('user_points_log')
            .select('points');
        // Conquistas desbloqueadas
        const { data: achievements } = await supabase
            .from('user_achievements')
            .select('id');
        // Portfólios criados
        const { data: portfolios } = await supabase
            .from('portfolios')
            .select('id');
        // Usuários ativos (últimos 7 dias)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const { data: activeUsers } = await supabase
            .from('profiles')
            .select('id')
            .gte('last_active', sevenDaysAgo.toISOString());
        return {
            totalUsers: profiles?.length || 0,
            usersByType: {
                alunos: profiles?.filter(p => p.tipo_usuario === 'aluno').length || 0,
                professores: profiles?.filter(p => p.tipo_usuario === 'professor').length || 0,
                admins: profiles?.filter(p => p.tipo_usuario === 'admin').length || 0,
            },
            totalPointsDistributed: pointsLog?.reduce((sum, log) => sum + (log.points || 0), 0) || 0,
            totalAchievements: achievements?.length || 0,
            totalPortfolios: portfolios?.length || 0,
            activeUsers: activeUsers?.length || 0,
        };
    },
    // Log de auditoria
    getAuditLog: async (limit = 50) => {
        const { data, error } = await supabase
            .from('audit_activities')
            .select(`
        *,
        user:profiles(nome, email)
      `)
            .order('created_at', { ascending: false })
            .limit(limit);
        if (error)
            throw error;
        return data;
    },
    // Criar usuário (admin)
    createUser: async (userData) => {
        // Esta função precisaria criar tanto em auth.users quanto em profiles
        // Por enquanto, apenas profiles
        const { data, error } = await supabase
            .from('profiles')
            .insert(userData)
            .select()
            .single();
        if (error)
            throw error;
        return data;
    },
    // Atualizar status de usuário
    updateUserStatus: async (userId, ativo) => {
        const { data, error } = await supabase
            .from('profiles')
            .update({ ativo })
            .eq('id', userId)
            .select()
            .single();
        if (error)
            throw error;
        return data;
    },
};
