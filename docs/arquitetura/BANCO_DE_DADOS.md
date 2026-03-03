# Banco de Dados - Nipo School

**Ultima atualizacao:** 2026-03-03
**Fonte:** `database/schema` + `database/migrations`

---

## Modelo atual

### Schemas usados pela aplicacao

- `iam`: identidade, tenant, roles, permissoes e navegacao.
- `core`: dados de dominio (aulas, desafios, portfolio, feed, etc).
- `internal`: funcoes auxiliares para RLS e JWT claims.
- `public`: views passthrough para consumo via PostgREST/Supabase client.

### Controle de acesso

- RLS habilitado nas tabelas relevantes.
- Leitura/escrita da aplicacao acontece majoritariamente por views `public.*`.
- Isolamento por tenant em JWT claims + politicas RLS.

---

## Estrutura de referencia

- `database/schema/00..16`: base estrutural (DDL, funcoes, views, seeds base).
- `database/migrations/*.sql`: evolucoes incrementais em ordem sequencial.

As migrations sao **solucoes sequenciais**: a migration mais nova aplicada em ambiente e a verdade operacional.

---

## Estado de migrations

- Total atual: `71` arquivos `.sql`
- Ultima migration: `063_index_improvements.sql`

Bloco academico:

- `055a-d` library + curriculum + navigation
- `056` fix academic labels

Bloco pilot readiness (057-063):

- `057` CHECK constraints em tabelas criticas (grades, counters, durations)
- `058` RPC `rpc_data_completeness_report`
- `059` Tabelas `ai_usage_log`, `ai_quotas` + RPC `rpc_check_ai_quota`
- `060` Tabela `audit_events` para rastreabilidade administrativa
- `061` Navegacao superadmin e data quality
- `062` Tabela `feature_flags` com seed de flags do piloto
- `063` Indices compostos para queries criticas

---

## Boas praticas para novas migrations

1. Criar migration numerada e idempotente sempre que possivel.
2. Nao reescrever migrations antigas ja aplicadas em producao.
3. Quando houver ajuste corretivo, adicionar nova migration (patch), nao editar historico.
4. Incluir `NOTIFY pgrst, 'reload schema';` quando impactar views/rotas de API.
5. Atualizar este documento e `docs/implementacao/MIGRACOES.md`.

---

## Observacoes importantes

- IDs fixos de role (seed) sao usados em varias migrations; manter consistencia com `database/schema/09_seed.sql`.
- Se uma migration corretiva ficar redundante em ambientes novos, manter mesmo assim para preservar cadeia historica.
