-- =============================================
-- VERIFICAR E CRIAR TABELA PROFILES
-- =============================================

-- 1. Verificar se a tabela profiles existe
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT FROM pg_tables 
        WHERE schemaname = 'public' 
        AND tablename = 'profiles'
    ) THEN
        RAISE NOTICE 'Tabela profiles NÃO existe. Criando...';
        
        -- 2. Criar tabela profiles
        CREATE TABLE public.profiles (
            id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
            email TEXT,
            full_name TEXT,
            avatar_url TEXT,
            role TEXT CHECK (role IN ('admin', 'professor', 'aluno')),
            matricula TEXT UNIQUE,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW()
        );

        -- 3. Criar índices
        CREATE INDEX idx_profiles_role ON public.profiles(role);
        CREATE INDEX idx_profiles_email ON public.profiles(email);
        CREATE INDEX idx_profiles_matricula ON public.profiles(matricula);

        -- 4. Habilitar RLS
        ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

        -- 5. Política para usuários autenticados lerem qualquer perfil
        CREATE POLICY "Usuários autenticados podem ler profiles"
            ON public.profiles
            FOR SELECT
            TO authenticated
            USING (true);

        -- 6. Política para usuários atualizarem apenas seu próprio perfil
        CREATE POLICY "Usuários podem atualizar próprio perfil"
            ON public.profiles
            FOR UPDATE
            TO authenticated
            USING (auth.uid() = id)
            WITH CHECK (auth.uid() = id);

        -- 7. Política para admins gerenciarem todos os perfis
        CREATE POLICY "Admins podem gerenciar todos os profiles"
            ON public.profiles
            FOR ALL
            TO authenticated
            USING (
                EXISTS (
                    SELECT 1 FROM public.profiles
                    WHERE id = auth.uid()
                    AND role = 'admin'
                )
            );

        -- 8. Trigger para atualizar updated_at
        CREATE OR REPLACE FUNCTION update_updated_at_column()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW.updated_at = NOW();
            RETURN NEW;
        END;
        $$ language 'plpgsql';

        CREATE TRIGGER update_profiles_updated_at
            BEFORE UPDATE ON public.profiles
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();

        -- 9. Função para criar perfil automaticamente no signup
        CREATE OR REPLACE FUNCTION public.handle_new_user()
        RETURNS TRIGGER AS $$
        BEGIN
            INSERT INTO public.profiles (id, email, full_name, role)
            VALUES (
                NEW.id,
                NEW.email,
                COALESCE(NEW.raw_user_meta_data->>'full_name', 'Usuário'),
                COALESCE(NEW.raw_user_meta_data->>'role', 'aluno')
            );
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql SECURITY DEFINER;

        -- 10. Trigger para criar perfil ao criar usuário
        DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
        CREATE TRIGGER on_auth_user_created
            AFTER INSERT ON auth.users
            FOR EACH ROW
            EXECUTE FUNCTION public.handle_new_user();

        RAISE NOTICE 'Tabela profiles criada com sucesso!';
    ELSE
        RAISE NOTICE 'Tabela profiles já existe.';
    END IF;
END
$$;

-- =============================================
-- VERIFICAR DADOS
-- =============================================

-- Contar perfis por role
SELECT 
    role,
    COUNT(*) as total
FROM public.profiles
GROUP BY role
ORDER BY role;

-- Verificar se há perfis
SELECT COUNT(*) as total_profiles FROM public.profiles;

-- =============================================
-- CRIAR PERFIS DE TESTE (OPCIONAL)
-- =============================================

-- Descomente para criar perfis de teste se a tabela estiver vazia
/*
DO $$
DECLARE
    profile_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO profile_count FROM public.profiles;
    
    IF profile_count = 0 THEN
        RAISE NOTICE 'Criando perfis de teste...';
        
        -- Inserir perfis de teste (ajuste os UUIDs conforme necessário)
        -- Nota: Estes são apenas exemplos, use UUIDs reais do auth.users
        
        RAISE NOTICE 'Para criar perfis de teste, você precisa de usuários autenticados primeiro.';
        RAISE NOTICE 'Use o Supabase Auth para criar usuários e os perfis serão criados automaticamente.';
    END IF;
END
$$;
*/

-- =============================================
-- VERIFICAR POLÍTICAS RLS
-- =============================================

SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies
WHERE tablename = 'profiles'
ORDER BY policyname;

-- =============================================
-- TESTE DE CONEXÃO
-- =============================================

-- Verificar se a tabela é acessível
SELECT 
    table_schema,
    table_name,
    table_type
FROM information_schema.tables
WHERE table_name = 'profiles';
