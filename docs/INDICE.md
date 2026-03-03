# Indice da Documentacao - Nipo School

> Ultima atualizacao: 2026-03-02
> Regra: documentacao deve refletir o estado atual do codigo em `app/`, `lib/` e `database/`.

---

## Ordem recomendada de leitura

1. `docs/arquitetura/ESTADO_ATUAL.md`
2. `docs/arquitetura/ROTAS_E_NAVEGACAO.md`
3. `docs/arquitetura/BANCO_DE_DADOS.md`
4. `docs/arquitetura/AUTH_E_SEGURANCA.md`
5. `docs/implementacao/STATUS_GERAL.md`
6. `docs/implementacao/MIGRACOES.md`

---

## Estrutura das pastas

- `arquitetura/`: visao tecnica atual do sistema.
- `implementacao/`: status pratico e historico de entregas.
- `backend/`, `design/`, `pedagogia/`, `aulas/`, `portfolio/`: material de apoio por dominio.
- `curriculum/`: conteudo pedagogico base.
- `_arquivo/`: historico e referencias antigas (nao usar como fonte primaria).

---

## Convencoes de manutencao

- Ao alterar rotas, atualizar `ROTAS_E_NAVEGACAO.md`.
- Ao alterar schema/migrations, atualizar `BANCO_DE_DADOS.md` e `MIGRACOES.md`.
- Ao alterar stack/arquitetura, atualizar `ESTADO_ATUAL.md` e `STATUS_GERAL.md`.
- Documentos que descrevem arquitetura antiga devem ser removidos ou movidos para `_arquivo/`.
