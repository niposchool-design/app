# Nipo Wa — Guia do Agente (Design System do Nipo School)

> **Leia ANTES de criar ou alterar qualquer UI do Nipo School.** ~5 min.
> Fonte de verdade dos tokens: [`nipo-wa.tokens.json`](./nipo-wa.tokens.json) · CSS: [`nipo-wa.css`](./nipo-wa.css) · Tailwind: `tailwind.config.ts`.
> Nipo Wa é exceção institucional ao Clearix Lens (R-014) — identidade pedagógica japonesa própria.

## 1. Essência da marca
**Disciplina japonesa, alma brasileira.** Vermelho japonês + **nota musical em origami** (papel dobrado) + fundo ivory/washi + iconografia oriental contida. Tom: caloroso, encorajador, adequado a crianças/adolescentes (7-17), PT-BR 100%.

## 2. As 6 regras inegociáveis
1. **Primary = vermelho `#dc2626`** (red-600). NUNCA usar roxo como cor da marca — roxo é só o papel **admin**.
2. **Sistema de 4 papéis** (cada um = cor + padrão japonês + conceito):
   | Papel | Cor | Padrão | Conceito |
   |---|---|---|---|
   | Aluno | vermelho `#dc2626` | Asanoha 麻の葉 | crescimento/vigor |
   | Professor | azul `#0284c7` | Seigaiha 青海波 | sabedoria/ciclos |
   | Admin | roxo `#7c3aed` | Sayagata 紗綾形 | estrutura/nobreza |
   | Família | âmbar `#d97706` | Kikkō 亀甲 | longevidade/proteção |

   Theming: setar `data-role="..."` no shell → componentes usam `var(--role-primary)`/`--role-bg` ou classes `bg-student/teacher/admin/family`.
3. **Tipografia:** Inter (UI) + JetBrains Mono **só** para dados tabulares (BPM, pontos, datas, tempo de prática — classe `.nw-tabular`). Nenhuma 3ª fonte.
4. **Tokens, nunca hardcode.** Use as escalas do Tailwind (`bg-student`, `text-admin-dark`, `sakura`) ou os CSS vars `--nw-*`/`--role-*`. Hex solto = proibido.
5. **PT-BR + tom humano** em tudo, inclusive erros (sem jargão técnico). Linguagem adequada à idade.
6. **WCAG AA mínimo** (AAA em dado sensível/nota). `focus-visible` sempre. Respeitar `prefers-color-scheme: dark` (vars já adaptadas).

## 3. Vocabulário gráfico japonês (canônico)
- 4 padrões geométricos por papel: `.bg-pattern-asanoha` (aluno), `.bg-pattern-seigaiha` (prof), `.bg-pattern-sayagata` (admin), `.bg-pattern-kikko` (família).
- 6 ilustrações em `public/`: `enso-brush`, `bamboo-pattern`, `koi-fish`, `lantern-japanese`, `torii-ornate`, `paisagem` — usar com moderação (auth/landing/vazios).
- Accent **sakura `#FF6B9D`** para detalhes decorativos (cherry blossom), nunca como action-primary.

## 4. Helpers prontos (`nipo-wa.css`)
`.nw-card`, `.nw-btn-primary` (usa cor do papel ativo), `.nw-badge`, `.nw-tabular`. As 13 classes `.admin-*` legadas seguem válidas; simétricos `.student-*/.teacher-*/.family-*` migram para o theming por `data-role`.

## 5. Checklist antes de marcar UI pronta
- [ ] Cor da marca = vermelho (não roxo); roxo só em contexto admin
- [ ] Papel correto aplicado (cor + padrão) via `data-role`/classes
- [ ] Tokens (sem hex hardcoded); dados numéricos em `.nw-tabular`
- [ ] PT-BR + tom humano; erros amigáveis
- [ ] `focus-visible`, contraste AA, estados loading/erro/vazio
- [ ] Validado no navegador (R-005)

## 6. Mudanças no DS
Alterar token/decisão = atualizar `nipo-wa.tokens.json` (source) + propagar p/ `nipo-wa.css` e `tailwind.config.ts` no mesmo turno + bump de versão. Decisão de marca não-óbvia = ADR no cockpit.

## 7. LOGO — VERDADE TRAVADA (inegociável)
**O logo é o ORIGAMI:** um **tsuru/pássaro de origami em linhas vermelhas dobradas (`#dc2626`), cuja cauda forma a nota musical**, + wordmark "NIPO SCHOOL". Origami = papel dobrado → casa com a estética "Paper & Ink"/washi. Use dobras/facetas de papel como linguagem decorativa (badges, ícones, ilustrações), NUNCA pinceladas/brush.

**Arquivos canônicos** (em `app/public/`, vindos do pacote oficial `cockpit/nipo_school_design/assets/logo/...`):
- `logo-full.png` — logo completo (origami + wordmark), colorido — fundos claros (login, hero).
- `logo-icon.png` — só a marca origami — usos pequenos (header, favicon).
- `logo-white.png` — logo completo branco — fundos escuros (rodapé).
- `logo.png` — também é o origami (master), mas em código prefira `logo-full.png` (o path `/logo.png` ficou com cache antigo localmente).

**ERRADO (não usar):** o logo de **círculo vermelho sólido com nota branca** (era o `logo.png` antigo, salvo como `logo-circulo-antigo.bak.png`); o `logo.svg`/`logo-icon.svg` (1.6MB, bitmap do círculo antigo); e o logo enso+torii que o Stitch gerou. Stitch é referência de TELAS, não de logo.

## 8. Componentes-assinatura (refinados via Stitch v1.1)
- **Enso Badge** (`.nw-enso`): círculo da cor do papel com nota musical branca — usar em conquistas e no gatilho "Iniciar Prática".
- **Progress pincelada** (`.nw-progress`): barra arredondada grossa, cor do papel (parece traço de pincel).
- **Input** (`.nw-input`): borda 2px que vira a cor do papel no foco; foco visível 3px (`.nw-focusable`).
- **Divisor com padrão** (`.nw-divider`): faixa fina do padrão japonês do papel em vez de linha simples.
- **Elevação tonal "Paper & Ink":** hierarquia por TOM (superfícies `--nw-surface-container-*`) + sombra difusa suave (`--nw-shadow-soft`), não sombras pesadas. Base ivory washi `--nw-surface-paper`.

## 9. Escala tipográfica
display 40/800 · h1 32/700 · h2 24/700 · h3 20/600 · body 16/400 · sm 14 · caption 12. Headings com `letter-spacing` apertado (-0.02em). Dados numéricos em JetBrains Mono (`data-display` 20/600, `data-label` 12/500 +0.05em).

## 10. Vínculo pedagógico (Eixo Alpha — `docs/curriculum/Capitulo0--PrincipioAlpha.md`)
O design serve os 8 pilares Alpha. Priorize na UI: **celebração constante** (medalhas, Enso, sakura desabrochando ao concluir), **desafios semanais** e **mural/portfólio** em destaque, **peer learning/comunidade** acessível, **protagonismo do aluno** (tom caloroso, encorajador), **cultura nipo-brasileira** (padrões + sumi-ê). Celebrar progresso não é enfeite — é metodologia.
