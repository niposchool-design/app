import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const tipoUsuario = searchParams.get('tipo_usuario');

        console.log('🔍 API Profiles - tipo_usuario:', tipoUsuario);

        const supabase = await createClient();

        let query = supabase
            .from('profiles')
            .select('*')
            .order('full_name');

        if (tipoUsuario) {
            query = query.eq('tipo_usuario', tipoUsuario);
        }

        const { data, error } = await query;

        console.log('📊 Resultado:', { dataLength: data?.length, error });

        if (error) {
            console.error('❌ Erro ao buscar profiles:', error);
            return NextResponse.json({ error: error.message, code: error.code }, { status: 500 });
        }

        return NextResponse.json(data || []);
    } catch (error) {
        console.error('💥 Erro na API profiles:', error);
        return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
    }
}
