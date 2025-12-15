'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import {
  addUserPoints,
  grantAchievement,
  pointsForCompletedLesson,
  pointsForSubmittedEvidence,
  pointsForCompletedSelfAssessment,
  pointsForCompletedPortfolio,
  incrementLessonsCompleted,
} from '@/src/lib/supabase/mutations/gamificacao-real';

/**
 * Action para adicionar pontos ao usuário autenticado
 */
export async function addPointsAction(params: {
  points: number;
  reason: string;
  aulaId?: string;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: 'Usuário não autenticado' };
  }

  const result = await addUserPoints({
    userId: user.id,
    ...params,
  });

  revalidatePath('/alunos/gamificacao');
  revalidatePath('/alunos/dashboard');
  
  return result;
}

/**
 * Action para conceder achievement ao usuário autenticado
 */
export async function grantAchievementAction(params: {
  achievementId: string;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: 'Usuário não autenticado' };
  }

  const result = await grantAchievement({
    userId: user.id,
    ...params,
  });

  revalidatePath('/alunos/gamificacao');
  revalidatePath('/alunos/dashboard');
  
  return result;
}

/**
 * Action para dar pontos quando aluno conclui uma aula
 */
export async function awardPointsForCompletedLessonAction(aulaId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: 'Usuário não autenticado' };
  }

  const result = await pointsForCompletedLesson(user.id, aulaId);

  revalidatePath('/alunos/aulas');
  revalidatePath('/alunos/gamificacao');
  
  return result;
}

/**
 * Action para dar pontos quando aluno submete evidência
 */
export async function awardPointsForSubmittedEvidenceAction(evidenciaId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: 'Usuário não autenticado' };
  }

  const result = await pointsForSubmittedEvidence(user.id, evidenciaId);

  revalidatePath('/alunos/portfolio');
  revalidatePath('/alunos/gamificacao');
  
  return result;
}

/**
 * Action para dar pontos quando aluno completa autoavaliação
 */
export async function awardPointsForCompletedSelfAssessmentAction() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: 'Usuário não autenticado' };
  }

  const result = await pointsForCompletedSelfAssessment(user.id);

  revalidatePath('/alunos/portfolio');
  revalidatePath('/alunos/gamificacao');
  
  return result;
}

/**
 * Action para dar pontos quando aluno completa portfólio
 */
export async function awardPointsForCompletedPortfolioAction(portfolioId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: 'Usuário não autenticado' };
  }

  const result = await pointsForCompletedPortfolio(user.id, portfolioId);

  revalidatePath('/alunos/portfolio');
  revalidatePath('/alunos/gamificacao');
  
  return result;
}
