import { createClient } from '@/lib/supabase/server';
import { cache } from 'react';
import { 
  UserProgress,
  UserPointsLog,
  UserAchievement,
  Achievement
} from '@/src/types/gamification';

// ===== FUNÇÕES DE LEITURA =====

/**
 * Retorna o perfil de progresso do usuário atual
 */
export const getUserProgress = cache(async (): Promise<UserProgress | null> => {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;

  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (error) {
    console.error('Erro ao buscar progresso do usuário:', error);
    return null;
  }

  return data as UserProgress;
});

/**
 * Retorna todos os pontos conquistados pelo usuário
 */
export const getUserPointsHistory = cache(async (limit = 50): Promise<UserPointsLog[]> => {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return [];

  const { data, error } = await supabase
    .from('user_points_log')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Erro ao buscar histórico de pontos:', error);
    return [];
  }

  return data as UserPointsLog[];
});

/**
 * Retorna todos os achievements conquistados pelo usuário
 */
export const getUserAchievements = cache(async (): Promise<UserAchievement[]> => {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return [];

  const { data, error } = await supabase
    .from('user_achievements')
    .select(`
      *,
      achievement:achievements(*)
    `)
    .eq('user_id', user.id)
    .order('earned_at', { ascending: false });

  if (error) {
    console.error('Erro ao buscar achievements do usuário:', error);
    return [];
  }

  return data as UserAchievement[];
});

/**
 * Retorna todos os achievements disponíveis
 */
export const getAllAchievements = cache(async (): Promise<Achievement[]> => {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('achievements')
    .select('*')
    .eq('is_active', true)
    .order('category, name');

  if (error) {
    console.error('Erro ao buscar achievements:', error);
    return [];
  }

  return data as Achievement[];
});

/**
 * Retorna estatísticas completas de gamificação do usuário
 */
export const getGamificationStats = cache(async () => {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return {
      progress: null,
      recentHistory: [],
      achievements: [],
    };
  }

  const progress = await getUserProgress();
  const recentHistory = await getUserPointsHistory();
  const achievements = await getUserAchievements();

  return {
    progress,
    recentHistory,
    achievements,
  };
});

// ===== CONFIGURAÇÃO DE NÍVEIS =====

export const NIVEIS_CONFIGURACAO = [
  { nivel: 1, nome: 'Iniciante', pontosMinimos: 0, cor: '#9CA3AF' },
  { nivel: 2, nome: 'Aprendiz', pontosMinimos: 100, cor: '#84CC16' },
  { nivel: 3, nome: 'Praticante', pontosMinimos: 250, cor: '#22D3EE' },
  { nivel: 4, nome: 'Experiente', pontosMinimos: 500, cor: '#A78BFA' },
  { nivel: 5, nome: 'Mestre', pontosMinimos: 1000, cor: '#F59E0B' },
  { nivel: 6, nome: 'Grande Mestre', pontosMinimos: 2000, cor: '#EF4444' },
  { nivel: 7, nome: 'Lenda', pontosMinimos: 5000, cor: '#EC4899' },
];

/**
 * Calcula o nível baseado no total de pontos
 */
export function calcularNivel(totalPontos: number) {
  for (let i = NIVEIS_CONFIGURACAO.length - 1; i >= 0; i--) {
    if (totalPontos >= NIVEIS_CONFIGURACAO[i].pontosMinimos) {
      return NIVEIS_CONFIGURACAO[i];
    }
  }
  return NIVEIS_CONFIGURACAO[0];
}

/**
 * Calcula o progresso para o próximo nível
 */
export function calcularProgressoProximoNivel(totalPontos: number) {
  const nivelAtual = calcularNivel(totalPontos);
  const proximoNivel = NIVEIS_CONFIGURACAO.find(n => n.nivel === nivelAtual.nivel + 1);
  
  if (!proximoNivel) {
    return { progresso: 100, pontosNecessarios: 0, pontosRestantes: 0 };
  }
  
  const pontosNoNivelAtual = totalPontos - nivelAtual.pontosMinimos;
  const pontosParaProximoNivel = proximoNivel.pontosMinimos - nivelAtual.pontosMinimos;
  const progresso = Math.min((pontosNoNivelAtual / pontosParaProximoNivel) * 100, 100);
  
  return {
    progresso,
    pontosNecessarios: pontosParaProximoNivel,
    pontosRestantes: proximoNivel.pontosMinimos - totalPontos,
    proximoNivel,
  };
}

/**
 * Alias em inglês para calcularProgressoProximoNivel
 */
export function calculateNextLevelProgress(totalPoints: number) {
  const currentLevel = calcularNivel(totalPoints);
  const nextLevel = NIVEIS_CONFIGURACAO.find(n => n.nivel === currentLevel.nivel + 1);
  
  if (!nextLevel) {
    return { progress: 100, pointsNeeded: 0, pointsRemaining: 0 };
  }
  
  const pointsInCurrentLevel = totalPoints - currentLevel.pontosMinimos;
  const pointsForNextLevel = nextLevel.pontosMinimos - currentLevel.pontosMinimos;
  const progress = Math.min((pointsInCurrentLevel / pointsForNextLevel) * 100, 100);
  
  return {
    progress,
    pointsNeeded: pointsForNextLevel,
    pointsRemaining: nextLevel.pontosMinimos - totalPoints,
    nextLevel,
  };
}
