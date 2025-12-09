import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import type { Database } from './lib/supabase/database.types'

// Rotas públicas que não precisam de autenticação
const publicRoutes = ['/', '/login']

// Mapeamento de roles para suas áreas
const roleToArea: Record<string, string> = {
  admin: '/admin',
  professor: '/professores',
  aluno: '/alunos'
}

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()
  const path = request.nextUrl.pathname

  console.log('🔒 Middleware:', { path, hasSession: !!session })

  // Se não tem sessão e está tentando acessar rota protegida
  if (!session && !publicRoutes.includes(path)) {
    console.log('❌ Sem sessão, redirecionando para /login')
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Se tem sessão
  if (session) {
    // Buscar role do usuário
    // @ts-ignore
    const { data: userRole } = await supabase
      .from('user_roles')
      .select('role_type, is_active')
      .eq('user_id', session.user.id)
      .eq('is_active', true)
      .single()

    let role = userRole?.role_type

    // Fallback para profiles
    if (!role) {
      // @ts-ignore
      const { data: profile } = await supabase
        .from('profiles')
        .select('tipo_usuario')
        .eq('id', session.user.id)
        .single()
      
      // @ts-ignore
      role = profile?.tipo_usuario || 'aluno'
    }

    const userArea = roleToArea[role] || '/alunos'
    console.log('✅ Sessão válida:', { role, userArea, path })

    // Se está na página de login OU raiz, redirecionar para área correta
    if (path === '/login' || path === '/') {
      console.log('🔄 Redirecionando para:', userArea)
      return NextResponse.redirect(new URL(userArea, request.url))
    }

    // Redirecionar rotas antigas do Vite para Next.js
    if (path === '/admin/dashboard') {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
    if (path === '/professores/dashboard') {
      return NextResponse.redirect(new URL('/professores', request.url))
    }
    if (path === '/alunos/dashboard') {
      return NextResponse.redirect(new URL('/alunos', request.url))
    }

    // Se está tentando acessar área de outro role
    if (path.startsWith('/admin') && role !== 'admin') {
      return NextResponse.redirect(new URL(userArea, request.url))
    }

    if (path.startsWith('/professores') && role !== 'professor') {
      return NextResponse.redirect(new URL(userArea, request.url))
    }

    if (path.startsWith('/alunos') && role !== 'aluno') {
      return NextResponse.redirect(new URL(userArea, request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
