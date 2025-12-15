-- ============================================
-- 🎮 SISTEMA DE GAMIFICAÇÃO COMPLETO - NIPO SCHOOL
-- Script de criação das tabelas de gamificação
-- ============================================

-- ===== EXTENSÕES =====
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===== TABELA: gamification_usuarios =====
-- Perfil de gamificação de cada usuário
CREATE TABLE IF NOT EXISTS public.gamification_usuarios (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    usuario_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    total_pontos INTEGER DEFAULT 0 CHECK (total_pontos >= 0),
    nivel_atual INTEGER DEFAULT 1 CHECK (nivel_atual >= 1 AND nivel_atual <= 10),
    nome_nivel VARCHAR(50) DEFAULT 'Iniciante',
    cor_nivel VARCHAR(20) DEFAULT '#9CA3AF',
    data_criacao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    data_atualizacao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(usuario_id)
);

COMMENT ON TABLE public.gamification_usuarios IS 'Perfil de gamificação dos usuários';
COMMENT ON COLUMN public.gamification_usuarios.total_pontos IS 'Total acumulado de pontos do usuário';
COMMENT ON COLUMN public.gamification_usuarios.nivel_atual IS 'Nível atual do usuário (1-10)';
COMMENT ON COLUMN public.gamification_usuarios.nome_nivel IS 'Nome do nível (Iniciante, Aprendiz, etc.)';

-- ===== TABELA: gamification_pontos =====
-- Histórico de pontos conquistados
CREATE TABLE IF NOT EXISTS public.gamification_pontos (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    usuario_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    pontos INTEGER NOT NULL CHECK (pontos > 0),
    fonte VARCHAR(50) NOT NULL CHECK (fonte IN ('alpha', 'portfolio', 'evidencia', 'autoavaliacao', 'badge')),
    descricao TEXT NOT NULL,
    metadata JSONB DEFAULT '{}',
    data_conquista TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE public.gamification_pontos IS 'Histórico de pontos conquistados pelos usuários';
COMMENT ON COLUMN public.gamification_pontos.fonte IS 'Origem dos pontos: alpha, portfolio, evidencia, autoavaliacao, badge';
COMMENT ON COLUMN public.gamification_pontos.metadata IS 'Dados adicionais em JSON (IDs relacionados, etc.)';

-- ===== TABELA: gamification_badges =====
-- Badges conquistados pelos usuários
CREATE TABLE IF NOT EXISTS public.gamification_badges (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    usuario_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    tipo_badge VARCHAR(50) NOT NULL,
    nome_badge VARCHAR(100) NOT NULL,
    descricao TEXT,
    icone VARCHAR(50),
    cor VARCHAR(20),
    metadata JSONB DEFAULT '{}',
    data_conquista TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(usuario_id, tipo_badge)
);

COMMENT ON TABLE public.gamification_badges IS 'Badges conquistados pelos usuários';
COMMENT ON COLUMN public.gamification_badges.tipo_badge IS 'Identificador único do tipo de badge';
COMMENT ON COLUMN public.gamification_badges.icone IS 'Emoji ou código do ícone do badge';

-- ===== TABELA: gamification_conquistas =====
-- Conquistas e marcos especiais
CREATE TABLE IF NOT EXISTS public.gamification_conquistas (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    usuario_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    tipo_conquista VARCHAR(50) NOT NULL,
    nome_conquista VARCHAR(100) NOT NULL,
    descricao TEXT,
    valor_conquista INTEGER,
    metadata JSONB DEFAULT '{}',
    data_conquista TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE public.gamification_conquistas IS 'Conquistas e marcos alcançados pelos usuários';
COMMENT ON COLUMN public.gamification_conquistas.tipo_conquista IS 'Tipo da conquista (pontos_100, aulas_10, etc.)';
COMMENT ON COLUMN public.gamification_conquistas.valor_conquista IS 'Valor numérico relacionado (pontos, quantidade, etc.)';

-- ===== ÍNDICES PARA PERFORMANCE =====
CREATE INDEX IF NOT EXISTS idx_gamification_usuarios_total_pontos 
    ON public.gamification_usuarios(total_pontos DESC);

CREATE INDEX IF NOT EXISTS idx_gamification_usuarios_usuario_id 
    ON public.gamification_usuarios(usuario_id);

CREATE INDEX IF NOT EXISTS idx_gamification_pontos_usuario 
    ON public.gamification_pontos(usuario_id);

CREATE INDEX IF NOT EXISTS idx_gamification_pontos_data 
    ON public.gamification_pontos(data_conquista DESC);

CREATE INDEX IF NOT EXISTS idx_gamification_pontos_fonte 
    ON public.gamification_pontos(fonte);

CREATE INDEX IF NOT EXISTS idx_gamification_badges_usuario 
    ON public.gamification_badges(usuario_id);

CREATE INDEX IF NOT EXISTS idx_gamification_badges_tipo 
    ON public.gamification_badges(tipo_badge);

CREATE INDEX IF NOT EXISTS idx_gamification_conquistas_usuario 
    ON public.gamification_conquistas(usuario_id);

CREATE INDEX IF NOT EXISTS idx_gamification_conquistas_tipo 
    ON public.gamification_conquistas(tipo_conquista);

-- ===== RLS (ROW LEVEL SECURITY) =====
ALTER TABLE public.gamification_usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gamification_pontos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gamification_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gamification_conquistas ENABLE ROW LEVEL SECURITY;

-- Políticas para gamification_usuarios
DROP POLICY IF EXISTS "Usuários podem ver seu próprio perfil de gamificação" ON public.gamification_usuarios;
CREATE POLICY "Usuários podem ver seu próprio perfil de gamificação" 
    ON public.gamification_usuarios
    FOR SELECT 
    USING (auth.uid() = usuario_id);

DROP POLICY IF EXISTS "Usuários podem inserir seu próprio perfil" ON public.gamification_usuarios;
CREATE POLICY "Usuários podem inserir seu próprio perfil" 
    ON public.gamification_usuarios
    FOR INSERT 
    WITH CHECK (auth.uid() = usuario_id);

DROP POLICY IF EXISTS "Usuários podem atualizar seu próprio perfil" ON public.gamification_usuarios;
CREATE POLICY "Usuários podem atualizar seu próprio perfil" 
    ON public.gamification_usuarios
    FOR UPDATE 
    USING (auth.uid() = usuario_id);

DROP POLICY IF EXISTS "Sistema pode inserir perfis via service role" ON public.gamification_usuarios;
CREATE POLICY "Sistema pode inserir perfis via service role" 
    ON public.gamification_usuarios
    FOR ALL
    USING (auth.jwt() ->> 'role' = 'service_role');

-- Políticas para gamification_pontos
DROP POLICY IF EXISTS "Usuários podem ver seus próprios pontos" ON public.gamification_pontos;
CREATE POLICY "Usuários podem ver seus próprios pontos" 
    ON public.gamification_pontos
    FOR SELECT 
    USING (auth.uid() = usuario_id);

DROP POLICY IF EXISTS "Sistema pode inserir pontos" ON public.gamification_pontos;
CREATE POLICY "Sistema pode inserir pontos" 
    ON public.gamification_pontos
    FOR INSERT 
    WITH CHECK (true);

-- Políticas para gamification_badges
DROP POLICY IF EXISTS "Usuários podem ver seus próprios badges" ON public.gamification_badges;
CREATE POLICY "Usuários podem ver seus próprios badges" 
    ON public.gamification_badges
    FOR SELECT 
    USING (auth.uid() = usuario_id);

DROP POLICY IF EXISTS "Sistema pode inserir badges" ON public.gamification_badges;
CREATE POLICY "Sistema pode inserir badges" 
    ON public.gamification_badges
    FOR INSERT 
    WITH CHECK (true);

-- Políticas para gamification_conquistas
DROP POLICY IF EXISTS "Usuários podem ver suas próprias conquistas" ON public.gamification_conquistas;
CREATE POLICY "Usuários podem ver suas próprias conquistas" 
    ON public.gamification_conquistas
    FOR SELECT 
    USING (auth.uid() = usuario_id);

DROP POLICY IF EXISTS "Sistema pode inserir conquistas" ON public.gamification_conquistas;
CREATE POLICY "Sistema pode inserir conquistas" 
    ON public.gamification_conquistas
    FOR INSERT 
    WITH CHECK (true);

-- ===== FUNÇÕES AUXILIARES =====

-- Função para atualizar data_atualizacao automaticamente
CREATE OR REPLACE FUNCTION public.atualizar_data_atualizacao_gamification()
RETURNS TRIGGER AS $$
BEGIN
    NEW.data_atualizacao = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar automaticamente
DROP TRIGGER IF EXISTS trigger_atualizar_gamification_usuarios ON public.gamification_usuarios;
CREATE TRIGGER trigger_atualizar_gamification_usuarios
    BEFORE UPDATE ON public.gamification_usuarios
    FOR EACH ROW
    EXECUTE FUNCTION public.atualizar_data_atualizacao_gamification();

-- ===== DADOS INICIAIS =====

-- Exemplos de badges que podem ser concedidos
-- (Não inseridos automaticamente, apenas referência)

/*
EXEMPLOS DE BADGES:
- primeira_aula: Primeira Aula Concluída
- semana_perfeita: Semana Perfeita (7 dias consecutivos)
- mestre_instrumento: Mestre de um Instrumento
- portfolio_completo: Portfólio Completo
- colaborador_ativo: Colaborador Ativo no Fórum
- explorador: Explorou 5 Instrumentos Diferentes
*/

/*
EXEMPLOS DE CONQUISTAS AUTOMÁTICAS:
- pontos_100: Primeiros Passos (100 pontos)
- pontos_500: Caminhante Dedicado (500 pontos)
- pontos_1000: Mil Pontos de Luz (1000 pontos)
- pontos_2500: Estrela Brilhante (2500 pontos)
- pontos_5000: Mestre dos Pontos (5000 pontos)
- aulas_10: Completou 10 Aulas
- aulas_50: Completou 50 Aulas
- evidencias_20: Submeteu 20 Evidências
*/

-- ===== FIM DO SCRIPT =====

-- Verificação final
DO $$ 
BEGIN
    RAISE NOTICE '✅ Tabelas de gamificação criadas com sucesso!';
    RAISE NOTICE '📊 Tabelas: gamification_usuarios, gamification_pontos, gamification_badges, gamification_conquistas';
    RAISE NOTICE '🔒 RLS habilitado em todas as tabelas';
    RAISE NOTICE '📈 Índices criados para otimização';
END $$;
