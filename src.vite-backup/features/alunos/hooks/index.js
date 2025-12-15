/**
 * 🎯 HOOKS DA FEATURE ALUNOS - NIPO SCHOOL
 *
 * Exports conforme blueprint estrutura_completa_frontend.md
 */
// Hooks principais conforme blueprint
export { useAlunoStats } from './useAlunoStats';
export { useDesafios } from './useDesafios';
// Hooks existentes (manter por compatibilidade)
export { useDashboard } from './useDashboard';
export { useDashboardAluno } from './useDashboardAluno';
export { useInstrumentos } from './useInstrumentos';
export { useVideos } from './useVideos';
// Re-export hooks de outras features que são usados em alunos
export { useUserAchievements, useUserPoints, useAchievementsByType, useAddAchievement, useHasAchievement, useGamificationStats } from '../../../hooks/useAchievements';
export { usePortfolio, usePortfoliosByType, useCreatePortfolio, useUpdatePortfolio, useDeletePortfolio, usePortfolioStats } from '../../../hooks/usePortfolio';
