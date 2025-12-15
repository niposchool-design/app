// src/hooks/useAchievements.ts
// Hook para sistema de gamificação e conquistas
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserAchievements, addAchievement, getUserTotalPoints, getAchievementsByType } from '../lib/supabase/queries/achievements';
import { CommonErrors } from '../utils/error-handler';
import { useCurrentUser } from './useAuth';
/**
 * Hook para obter conquistas do usuário
 */
export const useUserAchievements = () => {
    const { data: user } = useCurrentUser();
    return useQuery({
        queryKey: ['achievements', user?.id],
        queryFn: async () => {
            if (!user?.id)
                throw CommonErrors.AUTH_REQUIRED;
            return getUserAchievements(user.id);
        },
        enabled: !!user?.id,
        staleTime: 2 * 60 * 1000 // 2 minutos
    });
};
/**
 * Hook para obter total de pontos do usuário
 */
export const useUserPoints = () => {
    const { data: user } = useCurrentUser();
    return useQuery({
        queryKey: ['achievements', user?.id, 'points'],
        queryFn: async () => {
            if (!user?.id)
                throw CommonErrors.AUTH_REQUIRED;
            return getUserTotalPoints(user.id);
        },
        enabled: !!user?.id,
        staleTime: 2 * 60 * 1000
    });
};
/**
 * Hook para obter conquistas por tipo
 */
export const useAchievementsByType = (type) => {
    const { data: user } = useCurrentUser();
    return useQuery({
        queryKey: ['achievements', user?.id, 'type', type],
        queryFn: async () => {
            if (!user?.id)
                throw CommonErrors.AUTH_REQUIRED;
            return getAchievementsByType(user.id, type);
        },
        enabled: !!user?.id,
        staleTime: 5 * 60 * 1000
    });
};
/**
 * Hook para adicionar nova conquista
 */
export const useAddAchievement = () => {
    const queryClient = useQueryClient();
    const { data: user } = useCurrentUser();
    return useMutation({
        mutationFn: async (achievementData) => {
            if (!user?.id)
                throw CommonErrors.AUTH_REQUIRED;
            return addAchievement({
                user_id: user.id,
                achievement_type: achievementData.achievement_type,
                points: achievementData.points,
                metadata: achievementData.metadata || null
            });
        },
        onSuccess: () => {
            // Invalidar todas as queries de achievements do usuário
            queryClient.invalidateQueries({ queryKey: ['achievements', user?.id] });
        },
        onError: (error) => {
            handleError(error);
        }
    });
};
/**
 * Hook para verificar se usuário tem conquista específica
 */
export const useHasAchievement = (achievementType) => {
    const { data: achievements, isLoading } = useUserAchievements();
    const hasAchievement = achievements?.some(achievement => achievement.achievement_type === achievementType) || false;
    return {
        hasAchievement,
        isLoading
    };
};
/**
 * Hook para obter estatísticas de gamificação
 */
export const useGamificationStats = () => {
    const { data: achievements } = useUserAchievements();
    const { data: totalPoints } = useUserPoints();
    const stats = {
        totalPoints: totalPoints || 0,
        totalAchievements: achievements?.length || 0,
        badges: achievements?.filter(a => a.achievement_type === 'badge').length || 0,
        trophies: achievements?.filter(a => a.achievement_type === 'trophy').length || 0,
        certificates: achievements?.filter(a => a.achievement_type === 'certificate').length || 0
    };
    return {
        data: stats,
        isLoading: !achievements
    };
};
