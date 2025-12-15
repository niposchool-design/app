import { getCurrentProfile, getMatriculasAluno } from '@/src/lib/supabase/queries/users_turmas';
import PerfilClient from './_components/PerfilClient';

export default async function PerfilPage() {
    const profile = await getCurrentProfile();

    // Buscar matrículas reais
    const matriculas = await getMatriculasAluno(profile.id);

    const usuario = {
        nome: profile.nome || profile.nome_completo || 'Aluno',
        email: profile.email || '',
        avatar: '👤',
        nivel: profile.nivel || 1,
        xp: profile.xp || 0,
        dataInscricao: profile.created_at ? new Date(profile.created_at).toLocaleDateString('pt-BR') : '',
        bio: profile.bio || 'Apaixonado por música tradicional japonesa.',
        matricula: profile.matricula,
    };

    // TODO: Podemos futuramente inferir instrumentos das turmas ou manter separado
    const instrumentos = [
        { nome: 'Koto', nivel: 'Intermediário', progresso: 65, icone: '🎵' },
        { nome: 'Shamisen', nivel: 'Iniciante', progresso: 40, icone: '🎸' },
        { nome: 'Shakuhachi', nivel: 'Iniciante', progresso: 25, icone: '🎋' },
    ];

    const metas = [
        { meta: 'Dominar Sakura Sakura no Koto', prazo: '31 Dez 2024', progresso: 80 },
        { meta: 'Completar 50 aulas', prazo: '15 Jan 2025', progresso: 60 },
        { meta: 'Participar do Show Final', prazo: '20 Dez 2024', progresso: 90 },
    ];

    const estatisticas = [
        { label: 'Aulas Completas', valor: matriculas?.length ? matriculas.length * 4 : 32, icone: 'Library' }, // Exemplo: 4 aulas por turma
        { label: 'Horas de Prática', valor: 48, icone: 'Stopwatch' },
        { label: 'Conquistas', valor: 15, icone: 'Trophy' },
        { label: 'Sequência', valor: 7, icone: 'Flame' },
    ];

    const atividadeRecente = [
        { acao: 'Completou "Introdução ao Koto"', data: '2 horas atrás', icone: '✅' },
        { acao: 'Conquistou "Primeira Semana"', data: '1 dia atrás', icone: '🏆' },
        { acao: 'Praticou Sakura Sakura', data: '2 dias atrás', icone: '🎵' },
        { acao: 'Participou do desafio semanal', data: '3 dias atrás', icone: '⚔️' },
    ];

    return (
        <PerfilClient
            usuario={usuario}
            instrumentos={instrumentos}
            matriculas={matriculas || []}
            metas={metas}
            estatisticas={estatisticas}
            atividadeRecente={atividadeRecente}
        />
    );
}
