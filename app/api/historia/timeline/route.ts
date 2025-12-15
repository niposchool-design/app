import { NextResponse } from 'next/server';
import { getTimelineCompleta, getHistoriaStats } from '@/lib/supabase/queries/historia-completo';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const [timeline, stats] = await Promise.all([
      getTimelineCompleta(),
      getHistoriaStats()
    ]);

    return NextResponse.json({
      timeline,
      stats
    });
  } catch (error) {
    console.error('Erro ao carregar timeline:', error);
    return NextResponse.json(
      { error: 'Erro ao carregar dados da timeline' },
      { status: 500 }
    );
  }
}
