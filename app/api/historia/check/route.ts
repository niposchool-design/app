import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createClient()

    // Verificar quantos registros existem em cada tabela
    const [periodos, compositores, obras, generos] = await Promise.all([
      supabase.from('historia_periodos').select('nome, ordem_cronologica', { count: 'exact' }),
      supabase.from('historia_compositores').select('nome_artistico, pais_nascimento', { count: 'exact' }),
      supabase.from('historia_obras').select('titulo, ano_composicao', { count: 'exact' }),
      supabase.from('historia_generos').select('nome, slug', { count: 'exact' })
    ])

    return NextResponse.json({
      periodos: {
        count: periodos.count,
        data: periodos.data
      },
      compositores: {
        count: compositores.count,
        data: compositores.data
      },
      obras: {
        count: obras.count,
        data: obras.data
      },
      generos: {
        count: generos.count,
        data: generos.data
      }
    })
  } catch (error) {
    console.error('Erro ao verificar dados:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
