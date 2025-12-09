import { adminSupabase } from '@/lib/supabase/admin-client'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    console.log('🔍 [DEBUG] Iniciando debug de estatísticas...')

    // 1. Verificar total de registros em profiles
    const profilesAll = await adminSupabase
      .from('profiles')
      .select('*')
      .limit(100)

    console.log('📊 [DEBUG] Profiles (all):', profilesAll)

    // 2. Contar por tipo_usuario
    const profilesCount = await adminSupabase
      .from('profiles')
      .select('tipo_usuario', { count: 'exact', head: true })

    console.log('📊 [DEBUG] Profiles total count:', profilesCount)

    // 3. Buscar alunos
    const alunos = await adminSupabase
      .from('profiles')
      .select('*', { count: 'exact' })
      .eq('tipo_usuario', 'aluno')

    console.log('📊 [DEBUG] Alunos:', alunos)

    // 4. Buscar professores
    const professores = await adminSupabase
      .from('profiles')
      .select('*', { count: 'exact' })
      .eq('tipo_usuario', 'professor')

    console.log('📊 [DEBUG] Professores:', professores)

    // 5. Buscar aulas
    const aulas = await adminSupabase
      .from('aulas')
      .select('*', { count: 'exact' })

    console.log('📊 [DEBUG] Aulas:', aulas)

    // 6. Verificar se existem outras tabelas de usuários
    const authUsers = await adminSupabase.auth.admin.listUsers()
    console.log('📊 [DEBUG] Auth users:', authUsers)

    return NextResponse.json({
      success: true,
      data: {
        profilesAll: {
          count: profilesAll.count,
          data: profilesAll.data,
          error: profilesAll.error,
        },
        profilesCount: {
          count: profilesCount.count,
          error: profilesCount.error,
        },
        alunos: {
          count: alunos.count,
          data: alunos.data?.slice(0, 5), // Primeiros 5
          error: alunos.error,
        },
        professores: {
          count: professores.count,
          data: professores.data?.slice(0, 5),
          error: professores.error,
        },
        aulas: {
          count: aulas.count,
          data: aulas.data?.slice(0, 5),
          error: aulas.error,
        },
        authUsers: {
          total: authUsers.data?.users?.length || 0,
          users: authUsers.data?.users?.slice(0, 5)?.map(u => ({
            id: u.id,
            email: u.email,
            created_at: u.created_at,
          })),
        },
      },
    })
  } catch (error) {
    console.error('❌ [DEBUG] Erro:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erro desconhecido',
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    )
  }
}
