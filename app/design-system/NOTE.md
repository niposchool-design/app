# ⚠️ Artefato de PILOTO — não é a fonte de verdade

Estes arquivos (`foundation.css`, `nipo.theme.css`, `tailwind.foundation.js`) são **cópias** de
`D:\projetos\Cockpit\design_system\` feitas para o **piloto de adoção** (ADR-0034 Fase 3),
em branch `experiment/design-system-pilot`.

- **Fonte de verdade:** `Cockpit/design_system/` (foundation + brands/nipo).
- **Por que cópia:** o `@import`/preset cross-project pra fora da raiz do app é frágil no Next.
  Para o piloto, copiar garante um branch rodável. **Em produção, a distribuição correta é
  um pacote de tokens ou um build step que sincroniza** — não cópia manual (gera drift).
- **Decisão de distribuição** (pacote npm interno vs symlink vs script de cópia) fica para a
  promoção da adoção, depois do dono validar este piloto rodando.

Se este branch for descartado, esta pasta some junto.
