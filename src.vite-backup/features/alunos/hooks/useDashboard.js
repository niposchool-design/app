import { useState, useEffect } from 'react';
export function useDashboard() {
    const [dashboard, setDashboard] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setIsLoading(true);
                setError(null);
                // Usar dados mockados completos - 🔧 CORRIGIDOS
                setDashboard({
                    full_name: 'Usuário',
                    totalConquistas: 12,
                    total_points: 2450,
                    total_achievements: 12,
                    achievements_last_week: 3,
                    submissoes_avaliadas: 8,
                    total_submissoes: 12,
                    lessons_completed: 15,
                    modules_completed: 4,
                    total_portfolios: 3,
                    best_streak: 14,
                    desafiosCompletos: 8,
                    portfoliosAtivos: 3,
                    rankingPosicao: 15,
                    proximoNivel: 3000,
                    progresso: 81.6, // Porcentagem para próximo nível
                    current_streak: 7,
                    achievements: [
                        { id: 1, title: 'Primeiro Shamisen', icon: '🎵', date: '2024-01-15' },
                        { id: 2, title: 'Mestre do Koto', icon: '🏆', date: '2024-01-10' },
                        { id: 3, title: 'Sequência 7 dias', icon: '🔥', date: '2024-01-08' }
                    ],
                    recent_activities: [
                        { id: 1, type: 'conquista', title: 'Nova conquista desbloqueada!', time: '2 horas atrás' },
                        { id: 2, type: 'desafio', title: 'Desafio de Shamisen concluído', time: '1 dia atrás' },
                        { id: 3, type: 'portfolio', title: 'Portfolio atualizado', time: '3 dias atrás' }
                    ],
                    next_classes: [
                        { id: 1, title: 'Técnicas Avançadas de Koto', time: 'Hoje, 14:00', instructor: 'Sensei Yamamoto' },
                        { id: 2, title: 'História Musical Japonesa', time: 'Amanhã, 15:30', instructor: 'Prof. Tanaka' }
                    ],
                    weekly_progress: [65, 78, 82, 90, 85, 88, 95] // Progresso dos últimos 7 dias
                });
            }
            catch (err) {
                console.error('Erro ao carregar dashboard:', err);
                setError(err instanceof Error ? err.message : 'Erro ao carregar dashboard');
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchDashboardData();
    }, []);
    return {
        dashboard,
        stats: dashboard, // Compatibilidade com uso anterior
        isLoading,
        error
    };
}
