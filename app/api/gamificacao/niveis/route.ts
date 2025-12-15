import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('niveis')
      .select('*')
      .order('nivel_numero', { ascending: true });

    if (error) {
      console.error('Erro ao buscar níveis:', error);
      return NextResponse.json(
        { error: 'Erro ao buscar níveis', details: error },
        { status: 500 }
      );
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Erro ao carregar níveis:', error);
    return NextResponse.json(
      { error: 'Erro interno ao carregar níveis' },
      { status: 500 }
    );
  }
}
