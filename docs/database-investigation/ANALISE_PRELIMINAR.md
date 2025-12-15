# Análise Estrutural do Banco de Dados

## 1. Campo `criado_em` na tabela `profiles`
Com base na análise do arquivo `database.types.ts` e comparações com outras tabelas padrão do Supabase:
- A tabela `profiles` utiliza o campo **`created_at`** e NÃO `criado_em`.
- O erro reportado ocorre devido a essa discrepância de nomenclatura.
- **Ação Recomendada:** Utilizar `created_at` em todas as consultas referentes à tabela `profiles`.

## 2. Inconsistência de Nomenclatura
Foi identificada uma mistura de convenções de nomenclatura para campos de data de criação nas tabelas do sistema:
- **`created_at`** (Inglês): Utilizado em `profiles`, `achievements`, `aula_feedback`, `instrumentos` (campo `created_at` no type, mas `criado_em` pode existir no DB se houve alteração manual, porém o type indica inglês).
- **`criado_em`** (Português): Utilizado em `admins`, `alunos`, `aula_feedbacks` (plural), `repertorio`.

Essa inconsistência exige verificação cuidadosa caso a caso. Recomenda-se padronizar para `created_at` em novas tabelas ou manter um mapa de referência.

## 3. Tabelas Identificadas vs. Tipos TypeScript
As seguintes tabelas foram confirmadas na estrutura do banco (via `banco_completo_queries.sql`), mas estão **ausentes** ou desatualizadas no arquivo `lib/supabase/database.types.ts`:
- `instrumento_performances`
- `instrumento_quiz`
- `instrumentos_relacionados`

Isso causará erros de tipo no TypeScript (`Property ... does not exist on type ...`) ao tentar acessar essas tabelas via cliente Supabase.
**Ação Recomendada:** Atualizar os tipos locais manualmente ou rodar a introspecção do Supabase (`supabase gen types`) para sincronizar o arquivo `database.types.ts`.

## 4. Estrutura Estimada das Tabelas Faltantes
Com base nos índices e chaves estrangeiras, podemos inferir parcialmente a estrutura:

### `instrumento_performances`
- `id` (PK)
- `instrumento_id` (FK -> instrumentos)
- `artista` (Inferido por índice)
- Prováveis campos adicionais: `titulo`, `video_url`, `descricao`, `created_at`/`criado_em`.

### `instrumento_quiz`
- `id` (PK)
- `instrumento_id` (FK -> instrumentos)
- `tipo_pergunta` (Inferido por índice)
- Prováveis campos adicionais: `pergunta`, `resposta_correta`, `opcoes` (JSON?), `created_at`/`criado_em`.

### `instrumentos_relacionados`
- `id` (PK)
- `instrumento_id` (FK -> instrumentos)
- `relacionado_id` (FK -> instrumentos)
- `tipo_relacao` (Inferido por índice)

## 5. Próximos Passos
1. Corrigir as queries que falharam usando `created_at` para `profiles`.
2. Criar definições de tipos manuais (ex: `types/database-override.ts`) para as tabelas faltantes se não for possível atualizar `database.types.ts` automaticamente.
3. Executar queries específicas (`SELECT * FROM tabela LIMIT 1`) para confirmar as colunas exatas das tabelas faltantes.
