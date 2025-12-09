import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

const supabaseUrl = 'https://gfjqhnrvccfvfzxypgkd.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmanFobnJ2Y2NmdmZ6eHlwZ2tkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMzI0NzI0NCwiZXhwIjoyMDQ4ODIzMjQ0fQ.vZLWvOd0y3wbLWvCIqPAKkNjfDHi9kcZWTXKdOp-sEw';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

console.log('🏆 Criando tabela user_badges...\n');

// Executar comandos SQL manualmente
async function criarTabelaUserBadges() {
  try {
    // 1. Criar tabela
    const { error: error1 } = await supabase.rpc('exec_sql', {
      sql_query: `
        CREATE TABLE IF NOT EXISTS public.user_badges (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
          badge_id UUID NOT NULL REFERENCES alpha_badges(id) ON DELETE CASCADE,
          obtido_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          progresso INTEGER DEFAULT 100,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          UNIQUE(user_id, badge_id)
        );
      `
    });
    
    if (error1) throw error1;
    console.log('✅ Tabela user_badges criada');
    
    // 2. Criar índices
    await supabase.rpc('exec_sql', {
      sql_query: `
        CREATE INDEX IF NOT EXISTS idx_user_badges_user_id ON public.user_badges(user_id);
        CREATE INDEX IF NOT EXISTS idx_user_badges_badge_id ON public.user_badges(badge_id);
        CREATE INDEX IF NOT EXISTS idx_user_badges_obtido_em ON public.user_badges(obtido_em DESC);
      `
    });
    console.log('✅ Índices criados');
    
    // 3. Habilitar RLS
    await supabase.rpc('exec_sql', {
      sql_query: `ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;`
    });
    console.log('✅ RLS habilitado');
    
    // 4. Criar policies
    await supabase.rpc('exec_sql', {
      sql_query: `
        DROP POLICY IF EXISTS "Badges visíveis para todos" ON public.user_badges;
        CREATE POLICY "Badges visíveis para todos"
          ON public.user_badges
          FOR SELECT
          USING (true);
        
        DROP POLICY IF EXISTS "Usuários podem criar próprios badges" ON public.user_badges;
        CREATE POLICY "Usuários podem criar próprios badges"
          ON public.user_badges
          FOR INSERT
          TO authenticated
          WITH CHECK (auth.uid() = user_id);
      `
    });
    console.log('✅ Policies criadas');
    
    // 5. Verificar se tabela existe
    const { data, error } = await supabase
      .from('user_badges')
      .select('id')
      .limit(1);
    
    if (error) {
      console.log('⚠️  Tabela criada mas precisa de grants:', error.message);
      
      // Dar permissões
      await supabase.rpc('exec_sql', {
        sql_query: `
          GRANT SELECT ON public.user_badges TO anon, authenticated;
          GRANT INSERT ON public.user_badges TO authenticated;
        `
      });
      console.log('✅ Permissões concedidas');
    } else {
      console.log('✅ Tabela user_badges funcionando!');
    }
    
    console.log('\n✅ Setup completo da tabela user_badges!');
    
  } catch (err) {
    console.error('❌ Erro:', err.message);
  }
}

criarTabelaUserBadges();
