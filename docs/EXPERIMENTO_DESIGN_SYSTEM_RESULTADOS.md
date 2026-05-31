# Experimento — Adoção do design system DIGIAI (tema Nipo Wa)

**Branch:** `experiment/design-system-pilot` · **Data:** 2026-05-31 · **Base:** ADR-0034 (design system dois níveis), R-018/R-019.
**Status:** preparado pelo agente, **aguardando validação visual do dono** (rodar no navegador e decidir merge/descarte). **Nunca foi feito push.**

## O que é

Primeiro piloto de **adoção** do design system DIGIAI em dois níveis (fundação `--digiai-*` + tema de marca **Nipo Wa**) num app real. Prova que o nipo_school passa a consumir os tokens canônicos sem reescrever nada da identidade — o vermelho ADNIPO sai dos tokens.

## O que mudou (4 pontos, reversível)

1. `app/design-system/` — **cópia de piloto** de `Cockpit/design_system/` (`foundation.css`, `nipo.theme.css`, `tailwind.foundation.js` convertido p/ ESM). Ver `NOTE.md` lá: em produção isso vira pacote/symlink, não cópia.
2. `app/globals.css` — `@import` da fundação + tema Nipo no topo (antes do `@tailwind`).
3. `tailwind.config.ts` — `presets: [foundationPreset]` (utilities semânticas `bg-action-primary`, etc.).
4. `app/ds-demo/page.tsx` — rota de demonstração isolada (não altera páginas existentes).

## Como validar (você roda)

```bash
git checkout experiment/design-system-pilot
npm run dev            # http://localhost:4000
```
- Abra **/ds-demo** (logado, pois o app tem auth) — botões/badges/cards devem render no vermelho ADNIPO; toggle ☀/☾ troca light/dark.
- Confira que as telas existentes (**/login**, dashboards) continuam normais — a adoção é aditiva.

## Verificado pelo agente (computed styles, no app rodando)

| Check | Resultado |
|---|---|
| `/login` (página existente) compila e serve | **200** — não-destrutivo ✅ |
| `--digiai-role-action-primary` (light) | `#dc2626` (vermelho ADNIPO) ✅ |
| utility `bg-action-primary` gerada pelo Tailwind | `rgb(220,38,38)` ✅ |
| dark mode (`data-theme=dark`) action-primary | `#f87171` (red-400, WCAG) ✅ |
| `surface-base` dark | `#0f172a` ✅ |
| estrutura (`px-4`=16px, `rounded-md`=6px) da fundação | ✅ |

> A `/ds-demo` fica atrás de auth; a validação visual completa dela é com você logado. Os tokens já foram confirmados resolvendo no app via computed styles.

## Achados do piloto (valem pra promoção)

1. **Distribuição:** os presets canônicos são **CommonJS** (`module.exports`); o nipo_school é **ESM** (`"type":"module"`) → import como `.js` quebra. Piloto contornou convertendo a cópia p/ `export default`. **Decisão de promoção:** publicar os presets como **ESM** (ou `.cjs`) e distribuir via **pacote de tokens / build step**, não cópia manual (evita drift).
2. **Import cross-project:** alcançar `../../Cockpit/...` de dentro do app é frágil no Next/Turbopack — reforça a opção "pacote", não path relativo pra fora da raiz.
3. **Adoção é aditiva:** presets `extend` o Tailwind; classes default (`gray-*`, `slate-*`) seguem válidas. Por isso `/login` não quebrou.

## Pergunta de Ouro

*Isso fortalece a DIGIAI, o Clearix e a implantação?* **Sim** — prova o modelo de dois níveis (ADR-0034) num app real, valida o tema Nipo Wa, e descobre o mecanismo de distribuição certo antes de espalhar pros 12 apps.

## Recomendação

**Promover o modelo**, mas **não mergear esta branch como está** — ela usa cópia local (piloto). Próximo passo: definir a distribuição (pacote de tokens ESM) e refazer a adoção limpa. Esta branch serve de prova-de-conceito.

## Decisão do dono (dois caminhos)

- **Aprovar a prova-de-conceito (manter pra referência):** `git checkout main` (a branch fica para consulta).
- **Descartar:** `git checkout main && git branch -D experiment/design-system-pilot` (working tree volta exato ao pré-piloto).

> Nada foi commitado na `main`. Nenhum push. O legado `Cockpit/clearix_design/` e os outros apps não foram tocados.
