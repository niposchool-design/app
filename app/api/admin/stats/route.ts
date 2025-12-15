import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const supabase = await createClient() as any;

        const [
            { count: totalAlunos },
            { count: totalProfessores },
            { count: totalTurmas },
            { count: totalInstrumentos },
            { count: totalAulas },
        ] = await Promise.all([
            supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('tipo_usuario', 'aluno'),
            supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('tipo_usuario', 'professor'),
            supabase.from('turmas').select('*', { count: 'exact', head: true }).eq('ativo', true),
            supabase.from('instrumentos').select('*', { count: 'exact', head: true }).eq('ativo', true),
            supabase.from('aulas').select('*', { count: 'exact', head: true }),
        ]);

        return NextResponse.json({
            totalAlunos: totalAlunos || 0,
            totalProfessores: totalProfessores || 0,
            totalTurmas: totalTurmas || 0,
            totalInstrumentos: totalInstrumentos || 0,
            totalAulas: totalAulas || 0,
            totalRepertorio: 0,
        });
    } catch (error) {
        console.error('Erro ao buscar stats:', error);
        return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
    }
}
