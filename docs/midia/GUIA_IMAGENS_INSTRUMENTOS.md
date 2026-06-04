---
created: 2026-05-30
tags: [niposchool, midia, instrumentos, ai-imagens, producao]
type: producao
status: em-andamento
---

# Guia de Produção — Imagens dos Instrumentos (AI)

Geração de imagens próprias (estilo coeso "Nipo Wa") para os 69 instrumentos.
Trabalho **família por família**, com **foto principal** + **galeria de detalhes**.

## Convenções (imagens vivem no Supabase Storage, NÃO no public/)

- **Onde moram de verdade:** bucket público **`instruments`** do Supabase Storage.
  `image_url`/`thumbnail_url` apontam para `https://<ref>.supabase.co/storage/v1/object/public/instruments/<arquivo>`.
- **Staging local:** `public/instrumentos/` é só área temporária (gitignorada) — você salva o PNG ali, eu otimizo, subo pro Storage e apago o local.
- **Foto principal (header do detalhe):** `<slug>.webp` → `image_url`.
- **Macro (card da lista):** `<slug>-lista.webp` → `thumbnail_url`.
- **Formato:** PNG do gerador → eu converto pra WebP (~1500px, q82, dezenas de KB).
- **Pipeline:** salvar PNG (nome da coluna 3 serve) → `optimize-instrumentos.mjs` → `migrate-instruments-to-storage.mjs` (sobe + atualiza banco) → limpa local.
- **Gerar 1 instrumento por vez** (nunca colagem — colagem embaralha anatomia).
- A foto principal (colorida) é recortada em quadrado e 3:1 nas telas; o macro é a thumbnail da lista.

## Prompt mestre — FOTO PRINCIPAL (trocar `{INSTRUMENTO}`)
```
Studio product photograph of a single {INSTRUMENTO}, the complete instrument
centered in frame with generous empty space around it, on a seamless warm
ivory paper background (#FBF7F0). Soft diffused overhead light, subtle gentle
shadow beneath, eye-level, color-accurate, photorealistic, high detail.
No people, no text, no extra props. Clean minimal Japanese aesthetic.
Subject kept inside the central square area; background extends evenly to the
sides so the image crops cleanly to both square and 3:1. Aspect ratio 3:2.
```

## Prompt mestre — DETALHE (trocar `{INSTRUMENTO}` e `{DETALHE}`)
```
Macro close-up photograph of the {DETALHE} of a {INSTRUMENTO}, same seamless
warm ivory background (#FBF7F0), soft diffused light, shallow depth of field,
photorealistic, high detail, no people, no text. Aspect ratio 3:2.
```

## Cor de fundo por família (Nipo Wa) — gradiente da foto PRINCIPAL
A foto principal usa fundo **colorido por família** (descontraído + organizado). Trocar a cláusula de fundo no prompt mestre:
| Família | Cláusula de fundo (substituir o `#FBF7F0`) |
|---|---|
| Metais | `vibrant soft coral-to-amber gradient background` |
| Madeiras | `warm honey amber gradient background` |
| Cordas | `warm Nipo red gradient background (#dc2626)` |
| Teclados | `soft purple gradient background (#7c3aed)` |
| Percussão | `bright blue gradient background (#0284c7)` |
| Percussão melódica | `turquoise/teal gradient background` |
| Sopro livre | `jade green gradient background` |
| Eletrônicos | `magenta-to-neon-purple gradient background` |
| Voz/Canto | `soft sakura pink gradient background (#FF6B9D)` |

> A **galeria de detalhes** (macro close-ups) mantém o fundo com bokeh quente/colorido e ângulo dinâmico (não precisa seguir a cor da família).

## Casos especiais
- **Teoria Musical** e **Outro**: não são instrumentos → PULAR (ou ilustração conceitual depois).
- **Canto**: usar microfone vintage de estúdio OU ilustração de ondas sonoras (decidir).

---

## Fichas por família (slug = nome do arquivo)

### Metais / Sopros de metal (batch 1) — 4
| Instrumento | slug | detalhes sugeridos |
|---|---|---|
| Trompete | `trompete` | pistões, campana, bocal |
| Trombone | `trombone` | vara, campana, bocal |
| Tuba | `tuba` | válvulas, campana grande, tubulação |
| Eufônio | `eufonio` | pistões, campana, bocal |

### Madeiras — 14
Saxofone `saxofone` · Clarinete `clarinete` · Oboé `oboe` · Fagote `fagote` · Flauta `flauta` · Flauta Doce `flauta-doce` · Piccolo `piccolo` · Clarinete Baixo `clarinete-baixo` · Corne Inglês `corne-ingles` · Contrafagote `contrafagote` · Saxofone Alto `saxofone-alto` · Saxofone Tenor `saxofone-tenor` · Saxofone Soprano `saxofone-soprano` · Saxofone Barítono `saxofone-baritono`

### Cordas (friccionadas/dedilhadas/cordofones) — 11
Violino `violino` · Viola Clássica `viola-classica` · Violoncelo `violoncelo` · Contrabaixo Acústico `contrabaixo-acustico` · Violão `violao` · Guitarra `guitarra` · Baixo `baixo` · Sitar `sitar` · Koto `koto` · Alaúde `alaude` · Balalaica `balalaica` · Dulcimer Apalachiano `dulcimer-apalachiano`

### Teclados (incl. cordofones percutidos) — 7
Piano `piano` · Teclado `teclado` · Cravo `cravo` · Clavicórdio `clavicordio` · Celesta `celesta` · Acordeão `acordeao` · Melódica `melodica`

### Percussão de mão/membrana/metal/raspagem/fricção/corda — 14
Bateria `bateria` · Percussão Erudita `percussao-erudita` · Djembe `djembe` · Congas `congas` · Bongôs `bongos` · Cajón `cajon` · Tabla `tabla` · Zabumba `zabumba` · Alfaia `alfaia` · Triângulo `triangulo` · Agogô `agogo` · Reco-Reco `reco-reco` · Cuíca `cuica` · Berimbau `berimbau`

### Percussão melódica — 5
Hang Drum `hang-drum` · Steel Drum `steel-drum` · Marimba `marimba` · Glockenspiel `glockenspiel` · Vibrafone `vibrafone`

### Sopro livre — 5
Didgeridoo `didgeridoo` · Flauta de Pã `flauta-de-pa` · Ocarina `ocarina` · Shakuhachi `shakuhachi` · Gaita de Foles `gaita-de-foles`

### Palheta livre / harmônica — 1
Harmônica (Gaita) `harmonica`

### Eletrônicos — 4
Theremin `theremin` · Sintetizador `sintetizador` · Drum Machine `drum-machine` · Sampler `sampler`

### Voz / a definir — 3
Canto `canto` (ver caso especial) · Teoria Musical (PULAR) · Outro (PULAR)

---

## Progresso
- [ ] Batch 1 — Metais (trompete, trombone, tuba, eufônio)
- [ ] Madeiras
- [ ] Cordas
- [ ] Teclados
- [ ] Percussão
- [ ] Percussão melódica
- [ ] Sopro livre
- [ ] Eletrônicos
- [ ] Voz/a definir
