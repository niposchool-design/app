import { useQuery } from '@tanstack/react-query';
import { AchievementsService, PortfoliosService } from '../services';
import { supabase } from '../lib/supabase/client';
// Hook para buscar perfil por ID
export function useProfile(userId) {
    return useQuery({
        queryKey: ['profile', userId],
        queryFn: async () => {
            if (!userId)
                return null;
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();
            if (error)
                throw error;
            return data;
        },
        enabled: !!userId,
    });
}
// Hook para buscar top usuários
export function useTopUsers(limit = 10) {
    return useQuery({
        queryKey: ['topUsers', limit],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .order('total_points', { ascending: false })
                .limit(limit);
            if (error)
                throw error;
            return data;
        },
    });
}
// Hook para buscar achievements
export function useAchievements() {
    return useQuery({
        queryKey: ['achievements'],
        queryFn: () => new AchievementsService().getAllAchievements(),
    });
}
// Hook para buscar achievements do usuário
export function useUserAchievements(userId) {
    return useQuery({
        queryKey: ['userAchievements', userId],
        queryFn: () => userId ? new AchievementsService().getUserAchievements(userId) : null,
        enabled: !!userId,
    });
}
// Hook para buscar progresso de achievements
export function useAchievementProgress(userId) {
    return useQuery({
        queryKey: ['achievementProgress', userId],
        queryFn: () => userId ? new AchievementsService().getUserAchievementStats(userId) : null,
        enabled: !!userId,
    });
}
// Hook para buscar portfólios do usuário
export function useUserPortfolios(userId) {
    return useQuery({
        queryKey: ['userPortfolios', userId],
        queryFn: () => userId ? new PortfoliosService().getUserPortfolios(userId) : null,
        enabled: !!userId,
    });
}
// Hook para buscar instrumentos
// TODO: Implementar instrumentosService
export function useInstruments() {
    return useQuery({
        queryKey: ['instruments'],
        queryFn: () => [], // instrumentService.getAll() - implementar depois
    });
}
// Hook para buscar instrumentos disponíveis
export function useAvailableInstruments() {
    return useQuery({
        queryKey: ['availableInstruments'],
        queryFn: () => [], // instrumentService.getAvailable() - implementar depois
    });
}
// Hook para buscar turmas
// TODO: Implementar turmasService  
export function useTurmas() {
    return useQuery({
        queryKey: ['turmas'],
        queryFn: () => [], // turmaService.getAll() - implementar depois
    });
}
// Hook para buscar matrículas de uma turma
export function useTurmaMatriculas(turmaId) {
    return useQuery({
        queryKey: ['turmaMatriculas', turmaId],
        queryFn: () => turmaId ? [] : null, // turmaService.getMatriculas(turmaId) - implementar depois
        enabled: !!turmaId,
    });
}
