import { getProgressoGeralAluno, getEstatisticasProgresso } from '@/src/lib/supabase/queries/aulas';
import { getCurrentProfile } from '@/src/lib/supabase/queries/users_turmas';
import ProgressoClient from './_components/ProgressoClient';

export default async function ProgressoPage() {
    const profile = await getCurrentProfile();
    const progressoGeral = await getProgressoGeralAluno(profile.id);
    const estatisticas = await getEstatisticasProgresso(profile.id);

    // progressoGeral retorna array, precisamos calcular totais
    const aulasConcluidasCount = Array.isArray(progressoGeral)
        ? progressoGeral.filter(p => p.status === 'concluida').length
        : 0;

    const tempoTotal = Array.isArray(progressoGeral)
        ? progressoGeral.reduce((acc, p) => acc + (p.tempo_pratica || 0), 0)
        : 0;

    const stats = {
        licoesCompletadas: aulasConcluidasCount,
        horasPraticadas: Math.round(tempoTotal / 60),
        conquistasTotal: 0,
        nivelAtual: profile.nivel || 1,
        pontosXP: profile.xp || 0,
        sequenciaAtual: (estatisticas as any)?.dias_consecutivos || 0,
    };

    const instrumentosJaponeses = [
        { nome: 'Koto', progresso: 65, nivel: 'Intermediário', cor: 'red', horas: 12 },
        { nome: 'Shamisen', progresso: 40, nivel: 'Básico', cor: 'orange', horas: 8 },
        { nome: 'Shakuhachi', progresso: 25, nivel: 'Iniciante', cor: 'yellow', horas: 5 },
    ];

    const metasSemanais = [
        { titulo: 'Completar 10 lições', atual: 7, total: 10, cor: 'bg-red-500', icone: 'BookOpen' },
        { titulo: 'Praticar 5 horas', atual: 3.5, total: 5, cor: 'bg-orange-500', icone: 'Clock' },
        { titulo: 'Obter 3 conquistas', atual: 2, total: 3, cor: 'bg-yellow-500', icone: 'Trophy' },
    ];

    const conquistasRecentes = [
        { nome: 'Primeira Aula Koto', data: '2025-01-15', pontos: 50, icone: '🎵', cor: 'red' },
        { nome: 'Prática Diária', data: '2025-01-20', pontos: 100, icone: '🔥', cor: 'orange' },
        { nome: 'Mestre da Teoria', data: '2025-02-01', pontos: 150, icone: '🎼', cor: 'yellow' },
        { nome: 'Sequência de 5 Dias', data: '2025-02-10', pontos: 200, icone: '⭐', cor: 'pink' },
    ];

    return (
        <ProgressoClient
            stats={stats}
            instrumentosJaponeses={instrumentosJaponeses}
            metasSemanais={metasSemanais}
            conquistasRecentes={conquistasRecentes}
        />
    );
}
