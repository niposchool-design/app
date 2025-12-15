// Types baseados nas tabelas EXISTENTES do banco

export interface Achievement {
  id: string;
  name: string;
  description: string | null;
  badge_icon: string | null;
  badge_color: string | null;
  points_reward: number;
  category: string | null;
  requirement_type: string | null;
  requirement_value: number | null;
  is_active: boolean;
  created_at: string;
}

export interface UserAchievement {
  id: string;
  user_id: string;
  achievement_id: string;
  earned_at: string;
  achievement?: Achievement;
}

export interface UserPointsLog {
  id: string;
  user_id: string;
  aula_id: string | null;
  points: number;
  reason: string | null;
  created_at: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  total_points: number;
  level: number;
  badges_earned: number;
  current_streak: number;
  longest_streak: number;
  lessons_completed: number;
  achievements_unlocked: number;
  updated_at: string;
  created_at: string;
}

export interface AchievementsProgress {
  id: string;
  user_id: string;
  achievement_id: string;
  current_progress: number;
  target_progress: number;
  is_completed: boolean;
  completed_at: string | null;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}
