import { NextResponse } from 'next/server';
import { getInstrumentos } from '@/src/lib/supabase/queries/instrumentos';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const instrumentos = await getInstrumentos();
        return NextResponse.json(instrumentos || []);
    } catch (error) {
        console.error('Erro ao buscar instrumentos:', error);
        return NextResponse.json([], { status: 500 });
    }
}
