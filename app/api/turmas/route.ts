import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from('turmas')
            .select(`
                *,
                professor:profiles!turmas_professor_id_fkey(id, full_name),
                instrumento:instrumentos(id, nome)
            `)
            .order('criado_em', { ascending: false });

        if (error) {
            console.error('Erro ao buscar turmas:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data || []);
    } catch (error) {
        console.error('Erro na API turmas:', error);
        return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
    }
}
