'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Star, Award, TrendingUp, Calendar, Zap } from 'lucide-react';
import { UserProgress, UserPointsLog, UserAchievement, Achievement } from '@/src/types/gamification';

interface GamificationPanelProps {
  progress: UserProgress | null;
  pointsHistory: UserPointsLog[];
  achievements: (UserAchievement & { achievement: Achievement })[];
  nextLevelProgress?: {
    progress: number;
    pointsNeeded: number;
    pointsRemaining: number;
    nextLevel?: any;
  };
}

export function GamificationPanel({
  progress,
  pointsHistory,
  achievements,
  nextLevelProgress,
}: GamificationPanelProps) {
  if (!progress) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            Carregando dados de gamificação...
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6">
      {/* Perfil Principal */}
      <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Trophy className="w-6 h-6 text-purple-600" />
                Nível {progress.level}
              </CardTitle>
              <CardDescription>
                {progress.total_points.toLocaleString()} pontos totais
              </CardDescription>
            </div>
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white bg-purple-600"
            >
              {progress.level}
            </div>
          </div>
        </CardHeader>
        {nextLevelProgress && nextLevelProgress.nextLevel && (
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progresso para Nível {progress.level + 1}</span>
                <span className="font-medium">
                  {nextLevelProgress.pointsRemaining} pontos restantes
                </span>
              </div>
              <Progress value={nextLevelProgress.progress} className="h-3" />
            </div>
          </CardContent>
        )}
      </Card>

      {/* Estatísticas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Total de Pontos</CardTitle>
              <Zap className="w-4 h-4 text-yellow-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{progress.total_points.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {pointsHistory.length} registros
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Conquistas</CardTitle>
              <Award className="w-4 h-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{progress.achievements_unlocked}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Desbloqueadas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Aulas Completas</CardTitle>
              <Star className="w-4 h-4 text-amber-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{progress.lessons_completed}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Total completadas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Sequência</CardTitle>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{progress.current_streak}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Dias consecutivos
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Conquistas Desbloqueadas */}
      {achievements.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Conquistas Desbloqueadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {achievements.slice(0, 8).map((userAchievement) => (
                <div
                  key={userAchievement.id}
                  className="flex flex-col items-center p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
                  style={{ borderColor: userAchievement.achievement.badge_color || '#e5e7eb' }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-2"
                    style={{ backgroundColor: userAchievement.achievement.badge_color || '#6B7280' }}
                  >
                    {userAchievement.achievement.badge_icon || '🏆'}
                  </div>
                  <p className="text-sm font-medium text-center">{userAchievement.achievement.name}</p>
                  <p className="text-xs text-muted-foreground text-center mt-1">
                    {new Date(userAchievement.earned_at).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Histórico de Pontos */}
      {pointsHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Histórico de Pontos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {pointsHistory.slice(0, 10).map((log) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between p-3 rounded-lg border bg-card"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <div>
                      <p className="font-medium">{log.reason}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {log.aula_id && (
                          <Badge variant="outline" className="text-xs">
                            Aula {log.aula_id}
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground">
                          {new Date(log.created_at).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-green-600">
                    +{log.points}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
