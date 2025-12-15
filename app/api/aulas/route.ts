import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from('aulas')
            .select(`
                *,
                modulo:modulos(id, nome),
                responsavel:profiles!aulas_responsavel_id_fkey(id, full_name)
            `)
            .order('data_programada', { ascending: false });

        if (error) {
            console.error('Erro ao buscar aulas:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data || []);
    } catch (error) {
        console.error('Erro na API aulas:', error);
        return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
    }
}
