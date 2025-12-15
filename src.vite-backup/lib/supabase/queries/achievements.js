// src/lib/supabase/queries/achievements.ts
// Queries relacionadas a conquistas e gamificação
import { supabase } from '../client';
/**
 * Listar conquistas do usuário
 */
export const getUserAchievements = async (userId) => {
    const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
    if (error)
        throw error;
    return data || [];
};
/**
 * Adicionar nova conquista
 */
export const addAchievement = async (achievement) => {
    const { data, error } = await supabase
        .from('achievements')
        .insert(achievement)
        .select()
        .single();
    if (error)
        throw error;
    return data;
};
/**
 * Calcular total de pontos do usuário
 */
export const getUserTotalPoints = async (userId) => {
    const achievements = await getUserAchievements(userId);
    return achievements.reduce((total, achievement) => total + achievement.points, 0);
};
/**
 * Listar conquistas por tipo
 */
export const getAchievementsByType = async (userId, achievementType) => {
    const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .eq('user_id', userId)
        .eq('achievement_type', achievementType)
        .order('created_at', { ascending: false });
    if (error)
        throw error;
    return data || [];
};
