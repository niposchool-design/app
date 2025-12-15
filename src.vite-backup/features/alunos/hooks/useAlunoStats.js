import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../../contexts/AuthContext';
import { supabase } from '../../../lib/supabase/client';
import { CommonErrors } from '../../../lib/constants/errors';
export function useAlunoStats() {
    const { user } = useAuth();
    return useQuery({
        queryKey: ['aluno-stats', user?.id],
        queryFn: async () => {
            if (!user?.id)
                throw CommonErrors.AUTH_REQUIRED;
            // Buscar estatísticas do aluno
            const [achievementsRes, pointsRes, portfoliosRes, challengesRes, instrumentsRes] = await Promise.all([
                // Conquistas
                supabase
                    .from('user_achievements')
                    .select('*')
                    .eq('user_id', user.id),
                // Pontos totais
                supabase
                    .from('profiles')
                    .select('total_points, current_streak, study_time_minutes, level')
                    .eq('id', user.id)
                    .single(),
                // Portfólios
                supabase
                    .from('portfolios')
                    .select('id')
                    .eq('user_id', user.id),
                // Desafios completados
                supabase
                    .from('desafio_submissions')
                    .select('id')
                    .eq('user_id', user.id)
                    .eq('status', 'aprovado'),
                // Instrumentos favoritos
                supabase
                    .from('instrumentos_alunos')
                    .select('id')
                    .eq('aluno_id', user.id)
            ]);
            const profile = pointsRes.data || {};
            const achievements = achievementsRes.data || [];
            const portfolios = portfoliosRes.data || [];
            const challenges = challengesRes.data || [];
            const instruments = instrumentsRes.data || [];
            // Calcular progresso do próximo nível
            const currentLevel = profile.level || 'iniciante';
            const nextLevelProgress = Math.min(((profile.total_points || 0) % 1000) / 1000 * 100, 100);
            return {
                totalAchievements: achievements.length,
                totalPoints: profile.total_points || 0,
                currentStreak: profile.current_streak || 0,
                portfoliosCount: portfolios.length,
                completedChallenges: challenges.length,
                favoriteInstruments: instruments.length,
                studyTimeMinutes: profile.study_time_minutes || 0,
                level: currentLevel,
                nextLevelProgress
            };
        },
        enabled: !!user?.id,
    });
}
