# Migracoes - Nipo School

**Ultima atualizacao:** 2026-03-03

---

## Politica oficial de migrations

As migrations SQL sao incrementais e sequenciais.

- A migration mais nova aplicada no banco representa a correcao mais recente.
- Nao editar migrations antigas ja aplicadas em ambiente real.
- Correcao nova deve entrar como nova migration numerada.

---

## Estrutura

- `database/schema/`: base estrutural consolidada.
- `database/migrations/`: evolucao incremental do schema e dados.

---

## Estado atual

- Total de migrations `.sql`: 71
- Ultima migration: `063_index_improvements.sql`

### Sequencia academica recente

1. `055a_library_structure.sql` - estrutura e RLS da biblioteca
2. `055b_seed_methodologies.sql` - seed capitulos de metodologias
3. `055c_seed_curriculum.sql` - seed capitulos complementares
4. `055d_academic_navigation.sql` - navegacao academica por role
5. `056_fix_academic_labels.sql` - patch de labels PT-BR

### Bloco Pilot Readiness (057-063)

1. `057_data_quality_constraints.sql` - CHECK constraints em tabelas criticas
2. `058_data_completeness_rpc.sql` - RPC de metricas de completude por tenant
3. `059_ai_usage_logging.sql` - Tabelas `ai_usage_log`, `ai_quotas` e RPC `rpc_check_ai_quota`
4. `060_audit_events.sql` - Tabela `audit_events` para rastreabilidade
5. `061_superadmin_navigation.sql` - Navegacao superadmin e qualidade de dados
6. `062_feature_flags.sql` - Feature flags por tenant + seed do piloto
7. `063_index_improvements.sql` - Indices compostos para queries criticas

---

## Fluxo para criar nova migration

1. Identificar necessidade funcional ou corretiva.
2. Criar novo arquivo com proximo numero.
3. Implementar SQL idempotente quando possivel.
4. Validar em ambiente de dev.
5. Registrar impacto neste documento e em `ESTADO_ATUAL.md`.

---

## Checklist de validacao

- [ ] Ordem numerica correta
- [ ] Sem quebra de compatibilidade
- [ ] Sem dependencia oculta de dados nao seedados
- [ ] Permissoes e RLS conferidas
- [ ] `NOTIFY pgrst` quando necessario
- [ ] Documentacao atualizada

---

## Nota operacional

Migrations de patch podem ficar no-op em ambientes novos, e isso e aceitavel. O objetivo principal e manter trilha historica segura para todos os ambientes.
