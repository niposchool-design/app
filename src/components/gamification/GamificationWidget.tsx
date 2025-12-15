'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy, Star, Award, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { UserProgress } from '@/src/types/gamification';

interface GamificationWidgetProps {
  progress: UserProgress | null;
  nextLevelProgress?: {
    progress: number;
    pointsRemaining: number;
    nextLevel?: any;
  };
}

export function GamificationWidget({
  progress,
  nextLevelProgress,
}: GamificationWidgetProps) {
  if (!progress) {
    return null;
  }

  return (
    <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Trophy className="w-5 h-5 text-purple-600" />
          Seu Progresso
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Nível Atual */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Nível Atual</p>
            <p className="text-xl font-bold text-purple-600">
              Nível {progress.level}
            </p>
          </div>
          <div 
            className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold text-white bg-purple-600"
          >
            {progress.level}
          </div>
        </div>

        {/* Progresso para Próximo Nível */}
        {nextLevelProgress && nextLevelProgress.nextLevel && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                Próximo Nível
              </span>
              <span className="font-medium">
                {nextLevelProgress.pointsRemaining} pts
              </span>
            </div>
            <Progress value={nextLevelProgress.progress} className="h-2" />
          </div>
        )}

        {/* Estatísticas Rápidas */}
        <div className="grid grid-cols-3 gap-2 pt-2">
          <div className="text-center p-2 rounded-lg bg-card border">
            <p className="text-2xl font-bold">{progress.total_points}</p>
            <p className="text-xs text-muted-foreground">Pontos</p>
          </div>
          <div className="text-center p-2 rounded-lg bg-card border">
            <p className="text-2xl font-bold">{progress.achievements_unlocked}</p>
            <p className="text-xs text-muted-foreground">Conquistas</p>
          </div>
          <div className="text-center p-2 rounded-lg bg-card border">
            <p className="text-2xl font-bold">{progress.lessons_completed}</p>
            <p className="text-xs text-muted-foreground">Aulas</p>
          </div>
        </div>

        {/* Botão Ver Mais */}
        <Button asChild variant="outline" className="w-full">
          <Link href="/alunos/gamificacao" className="flex items-center justify-center gap-2">
            Ver Detalhes
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
