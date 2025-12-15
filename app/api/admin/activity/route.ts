import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const supabase = await createClient();

        // Fetch recent profiles (Alunos/Professores)
        const { data: profiles } = await supabase
            .from('profiles')
            .select('id, full_name, tipo_usuario, joined_at')
            .order('joined_at', { ascending: false })
            .limit(5);

        // Fetch recent turmas
        const { data: turmas } = await supabase
            .from('turmas')
            .select('id, nome, criado_em')
            .order('criado_em', { ascending: false })
            .limit(5);

        const activities = [
            ...(profiles || []).map((p: any) => ({
                id: p.id,
                type: 'user' as const,
                description: `${p.full_name || 'Usuário'} se cadastrou como ${p.tipo_usuario || 'usuário'}`,
                created_at: p.joined_at || new Date().toISOString(),
            })),
            ...(turmas || []).map((t: any) => ({
                id: t.id,
                type: 'turma' as const,
                description: `Nova turma criada: ${t.nome}`,
                created_at: t.criado_em || new Date().toISOString(),
            })),
        ];

        // Sort by date and limit to 10
        activities.sort((a, b) => 
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );

        return NextResponse.json(activities.slice(0, 10));
    } catch (error) {
        console.error('Erro ao buscar atividades:', error);
        return NextResponse.json([], { status: 200 });
    }
}
