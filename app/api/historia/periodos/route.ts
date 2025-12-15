import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('historia_periodos')
      .select(`
        *,
        compositores:historia_compositores(count),
        obras:historia_obras(count)
      `)
      .order('ordem_cronologica', { ascending: true });

    if (error) {
      console.error('Erro ao buscar períodos:', error);
      return NextResponse.json(
        { error: 'Erro ao buscar períodos', details: error },
        { status: 500 }
      );
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Erro ao carregar períodos:', error);
    return NextResponse.json(
      { error: 'Erro interno ao carregar períodos' },
      { status: 500 }
    );
  }
}
