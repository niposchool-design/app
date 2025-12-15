/**
 * 🎮 HOOK DE GAMIFICAÇÃO - NIPO SCHOOL
 *
 * Funcionalidades centrais do sistema de gamificação
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../../contexts/AuthContext';
import { supabase } from '../../../lib/supabase/client';
import { CommonErrors } from '../../../lib/constants/errors';
export function useGamification() {
    const { user } = useAuth();
    return useQuery({
        queryKey: ['gamification', user?.id],
        queryFn: async () => {
            if (!user?.id)
                throw CommonErrors.AUTH_REQUIRED;
            // Buscar dados de gamificação
            const [profileRes, achievementsRes, activityRes] = await Promise.all([
                // Perfil com dados de gamificação
                supabase
                    .from('profiles')
                    .select('level, total_points, current_streak, weekly_goal')
                    .eq('id', user.id)
                    .single(),
                // Total de conquistas
                supabase
                    .from('user_achievements')
                    .select('id')
                    .eq('user_id', user.id),
                // Atividades da semana
                supabase
                    .from('user_activity_log')
                    .select('points')
                    .eq('user_id', user.id)
                    .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
            ]);
            const profile = profileRes.data || {};
            const achievements = achievementsRes.data || [];
            const weeklyActivity = activityRes.data || [];
            const weeklyPoints = weeklyActivity.reduce((sum, activity) => sum + (activity.points || 0), 0);
            return {
                level: profile.level || 'iniciante',
                totalPoints: profile.total_points || 0,
                currentStreak: profile.current_streak || 0,
                totalAchievements: achievements.length,
                weeklyGoal: profile.weekly_goal || 100,
                weeklyProgress: weeklyPoints,
                monthlyRanking: 0 // TODO: Implementar ranking
            };
        },
        enabled: !!user?.id,
    });
}
export function useUpdateStreak() {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            if (!user?.id)
                throw CommonErrors.AUTH_REQUIRED;
            // Atualizar streak do usuário
            const { data, error } = await supabase.rpc('update_user_streak', {
                user_id: user.id
            });
            if (error)
                throw CommonErrors.SUPABASE_ERROR(error.message);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['gamification', user?.id] });
            queryClient.invalidateQueries({ queryKey: ['aluno-stats', user?.id] });
        },
    });
}
export function useAddPoints() {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ points, reason }) => {
            if (!user?.id)
                throw CommonErrors.AUTH_REQUIRED;
            // Adicionar pontos e registrar na atividade
            const [pointsRes, activityRes] = await Promise.all([
                supabase.rpc('add_user_points', {
                    user_id: user.id,
                    points_to_add: points
                }),
                supabase
                    .from('user_activity_log')
                    .insert({
                    user_id: user.id,
                    activity_type: 'points_earned',
                    points,
                    description: reason,
                    created_at: new Date().toISOString()
                })
            ]);
            if (pointsRes.error)
                throw CommonErrors.SUPABASE_ERROR(pointsRes.error.message);
            if (activityRes.error)
                throw CommonErrors.SUPABASE_ERROR(activityRes.error.message);
            return pointsRes.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['gamification', user?.id] });
            queryClient.invalidateQueries({ queryKey: ['aluno-stats', user?.id] });
        },
    });
}
export function useWeeklyChallenge() {
    const { user } = useAuth();
    return useQuery({
        queryKey: ['weekly-challenge', user?.id],
        queryFn: async () => {
            if (!user?.id)
                throw CommonErrors.AUTH_REQUIRED;
            // Buscar desafio semanal ativo
            const { data, error } = await supabase
                .from('weekly_challenges')
                .select(`
          *,
          user_weekly_progress!inner (
            progress,
            completed
          )
        `)
                .eq('user_weekly_progress.user_id', user.id)
                .eq('active', true)
                .single();
            if (error && error.code !== 'PGRST116') {
                throw CommonErrors.SUPABASE_ERROR(error.message);
            }
            return data;
        },
        enabled: !!user?.id,
    });
}
