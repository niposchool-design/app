import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('conquistas')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar conquistas:', error);
      return NextResponse.json(
        { error: 'Erro ao buscar conquistas', details: error },
        { status: 500 }
      );
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Erro ao carregar conquistas:', error);
    return NextResponse.json(
      { error: 'Erro interno ao carregar conquistas' },
      { status: 500 }
    );
  }
}
