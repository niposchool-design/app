import { createClient } from '@/lib/supabase/server';
import { 
  UserProgress,
  UserPointsLog,
  UserAchievement
} from '@/src/types/gamification';
import { calcularNivel } from '../queries/gamificacao-real';

// ===== FUNÇÕES DE ESCRITA (MUTATIONS) =====

/**
 * Cria ou obtém o perfil de progresso do usuário
 */
export async function createOrGetUserProgress(userId: string): Promise<UserProgress> {
  const supabase = await createClient();

  const { data: existing } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (existing) {
    return existing as UserProgress;
  }

  const { data, error } = await supabase
    .from('user_progress')
    .insert({
      user_id: userId,
      total_points: 0,
      level: 1,
      badges_earned: 0,
      current_streak: 0,
      longest_streak: 0,
      lessons_completed: 0,
      achievements_unlocked: 0,
    })
    .select()
    .single();

  if (error) {
    console.error('Erro ao criar progresso do usuário:', error);
    throw error;
  }

  return data as UserProgress;
}

/**
 * Adiciona pontos ao usuário
 */
export async function addUserPoints(params: {
  userId: string;
  points: number;
  reason: string;
  aulaId?: string;
}): Promise<{ success: boolean; newProgress?: UserProgress; error?: string }> {
  const supabase = await createClient();
  const { userId, points, reason, aulaId } = params;

  try {
    // 1. Garante que o perfil existe
    await createOrGetUserProgress(userId);

    // 2. Adiciona o registro de pontos
    const { error: logError } = await supabase
      .from('user_points_log')
      .insert({
        user_id: userId,
        points,
        reason,
        aula_id: aulaId,
      });

    if (logError) throw logError;

    // 3. Atualiza o total de pontos do perfil
    const { data: currentProgress } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (!currentProgress) throw new Error('Perfil não encontrado');

    const newTotalPoints = currentProgress.total_points + points;
    const newLevel = calcularNivel(newTotalPoints);

    const { data: updatedProgress, error: updateError } = await supabase
      .from('user_progress')
      .update({
        total_points: newTotalPoints,
        level: newLevel.nivel,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId)
      .select()
      .single();

    if (updateError) throw updateError;

    return {
      success: true,
      newProgress: updatedProgress as UserProgress,
    };
  } catch (error: any) {
    console.error('Erro ao adicionar pontos:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Concede um achievement ao usuário
 */
export async function grantAchievement(params: {
  userId: string;
  achievementId: string;
}): Promise<{ success: boolean; userAchievement?: UserAchievement; error?: string }> {
  const supabase = await createClient();
  const { userId, achievementId } = params;

  try {
    // Verifica se o usuário já tem esse achievement
    const { data: existing } = await supabase
      .from('user_achievements')
      .select('*')
      .eq('user_id', userId)
      .eq('achievement_id', achievementId)
      .single();

    if (existing) {
      return {
        success: false,
        error: 'Usuário já possui este achievement',
      };
    }

    // Busca o achievement para obter os pontos
    const { data: achievement } = await supabase
      .from('achievements')
      .select('*')
      .eq('id', achievementId)
      .single();

    if (!achievement) {
      return {
        success: false,
        error: 'Achievement não encontrado',
      };
    }

    // Insere o novo achievement
    const { data, error } = await supabase
      .from('user_achievements')
      .insert({
        user_id: userId,
        achievement_id: achievementId,
        earned_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

    // Atualiza contador de achievements no progresso
    await supabase.rpc('increment_achievements_unlocked', { user_uuid: userId });

    // Adiciona pontos bônus se houver
    if (achievement.points_reward && achievement.points_reward > 0) {
      await addUserPoints({
        userId,
        points: achievement.points_reward,
        reason: `Achievement conquistado: ${achievement.name}`,
      });
    }

    return {
      success: true,
      userAchievement: data as UserAchievement,
    };
  } catch (error: any) {
    console.error('Erro ao conceder achievement:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Incrementa o contador de aulas completas
 */
export async function incrementLessonsCompleted(userId: string) {
  const supabase = await createClient();
  
  await createOrGetUserProgress(userId);
  
  const { data: progress } = await supabase
    .from('user_progress')
    .select('lessons_completed')
    .eq('user_id', userId)
    .single();

  if (progress) {
    await supabase
      .from('user_progress')
      .update({
        lessons_completed: progress.lessons_completed + 1,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId);
  }
}

// ===== FUNÇÕES DE AÇÕES ESPECÍFICAS =====

/**
 * Pontos por completar uma aula
 */
export async function pointsForCompletedLesson(userId: string, aulaId: string) {
  const result = await addUserPoints({
    userId,
    points: 50,
    reason: 'Aula concluída',
    aulaId,
  });
  
  if (result.success) {
    await incrementLessonsCompleted(userId);
  }
  
  return result;
}

/**
 * Pontos por submeter uma evidência
 */
export async function pointsForSubmittedEvidence(userId: string, evidenceId: string) {
  return addUserPoints({
    userId,
    points: 30,
    reason: 'Evidência submetida',
  });
}

/**
 * Pontos por completar autoavaliação
 */
export async function pointsForCompletedSelfAssessment(userId: string) {
  return addUserPoints({
    userId,
    points: 20,
    reason: 'Autoavaliação concluída',
  });
}

/**
 * Pontos por completar portfólio
 */
export async function pointsForCompletedPortfolio(userId: string, portfolioId: string) {
  return addUserPoints({
    userId,
    points: 100,
    reason: 'Portfólio concluído',
  });
}
