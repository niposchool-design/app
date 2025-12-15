'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { 
  UserProgress,
  UserPointsLog,
  UserAchievement,
  Achievement
} from '@/src/types/gamification';

export function useGamification() {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [pointsHistory, setPointsHistory] = useState<UserPointsLog[]>([]);
  const [achievements, setAchievements] = useState<(UserAchievement & { achievement: Achievement })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadGamificationData();
  }, []);

  async function loadGamificationData() {
    try {
      setLoading(true);
      const supabase = createClient();
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError('Usuário não autenticado');
        return;
      }

      // Busca progresso do usuário
      const { data: progressData } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (progressData) {
        setProgress(progressData as UserProgress);
      }

      // Busca histórico de pontos
      const { data: pointsData } = await supabase
        .from('user_points_log')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20);

      if (pointsData) {
        setPointsHistory(pointsData as UserPointsLog[]);
      }

      // Busca achievements do usuário com JOIN
      const { data: achievementsData } = await supabase
        .from('user_achievements')
        .select(`
          *,
          achievement:achievements(*)
        `)
        .eq('user_id', user.id)
        .order('earned_at', { ascending: false });

      if (achievementsData) {
        setAchievements(achievementsData as any);
      }

      setError(null);
    } catch (err: any) {
      console.error('Erro ao carregar dados de gamificação:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function refresh() {
    await loadGamificationData();
  }

  return {
    progress,
    pointsHistory,
    achievements,
    loading,
    error,
    refresh,
  };
}
