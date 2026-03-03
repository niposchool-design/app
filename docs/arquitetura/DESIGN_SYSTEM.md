# Design System - Nipo School

**Ultima atualizacao:** 2026-03-02

Este documento descreve apenas diretrizes ativas do app atual.

---

## Direcao visual

- Linguagem: limpa, acolhedora, foco educacional.
- Base: Tailwind + componentes React.
- Icones: `lucide-react` e `@heroicons/react`.
- Layout principal protegido: `OrientalDashboardLayout`.

---

## Tokens e estilos

- Cores e utilitarios globais em `app/globals.css` e `tailwind.config.ts`.
- Componentes reutilizaveis em `components/`.
- Evitar criar novo padrao visual sem necessidade de produto.

---

## Regra de evolucao

1. Mudanca visual relevante deve manter consistencia entre desktop/mobile.
2. Mudanca de componente compartilhado exige revisao nas telas protegidas principais.
3. Atualizar este documento apenas com comportamento em producao.

---

## Nota

Exemplos de estrutura antiga (`features/*`) devem ser considerados historicos.
