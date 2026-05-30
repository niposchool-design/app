# Prompts para o Google Stitch — Nipo Wa

> Cole cada bloco no [Google Stitch](https://stitch.withgoogle.com). **Comece sempre colando o §0 (preâmbulo de marca) + o prompt da tela.** Salve os outputs em `cockpit/nipo_school_design/stitch_outputs/<versao>/`. Espere 3-5 iterações por tela (aprendizado Clearix Lens). Depois me mande o HTML/PNG que eu consolido no DS e aplico no app.

---

## §0 — Preâmbulo de marca (colar SEMPRE antes da tela)

```
Você é designer de produto do "Nipo School", uma escola de música comunitária nipo-brasileira para crianças e adolescentes (7-17 anos). Design system "Nipo Wa": disciplina japonesa, alma brasileira.

IDENTIDADE:
- Cor primária da MARCA: vermelho japonês #dc2626. NUNCA use roxo como cor de marca.
- Sistema de 4 PAPÉIS, cada um com sua cor e padrão geométrico japonês de fundo (sutil, ~5% opacidade):
  • Aluno = vermelho #dc2626 + padrão Asanoha (folha de cânhamo)
  • Professor = azul #0284c7 + padrão Seigaiha (ondas do mar)
  • Admin = roxo #7c3aed + padrão Sayagata (chaves entrelaçadas)
  • Família = âmbar #d97706 + padrão Kikkō (escamas de tartaruga)
- Accent decorativo: rosa sakura #FF6B9D (só detalhes, nunca botão).
- Tipografia: Inter (interface) + JetBrains Mono (números: pontos, BPM, datas, tempo de prática).
- Estética: cantos arredondados (12-16px), sombras suaves, fundo creme/ivory #fbf7f0 ou cinza-50 (papel washi). Motivo da marca = ORIGAMI (papel dobrado): a nota musical do logo é em origami, dentro de um círculo vermelho. Use dobras/facetas de papel como linguagem decorativa (NÃO pinceladas). MANTER o logo existente (círculo vermelho + nota origami + "NIPO SCHOOL") — não inventar logo novo.
- Idioma: 100% português brasileiro, tom caloroso e encorajador para jovens.
- Acessibilidade: contraste AA, foco visível, estados de carregando/erro/vazio.
Entregue versão DESKTOP e MOBILE.
```

---

## §1 — Dashboard do ALUNO (vermelho / Asanoha)

```
Tela: Dashboard do aluno. Fundo com padrão Asanoha vermelho sutil.
Topo: saudação calorosa ("Olá, Giovanna! 🎵") + sequência de prática (streak) em destaque com número grande em JetBrains Mono.
Cards de KPI: Pontos (mono), Aulas concluídas, Conquistas, Minutos praticados.
Seção "Próximo passo" (Motor Alpha): 1 card grande com a próxima atividade sugerida pela IA + botão vermelho "Começar".
Seção "Minhas aulas de hoje" (lista com progresso) e "Desafios" (cards com dificuldade em estrelas).
Sidebar esquerda com navegação (Dashboard, Aulas, Prática, Portfólio, Desafios, Conquistas, Comunidade). Avatar + nome no rodapé da sidebar.
Botão primário em vermelho #dc2626. Celebrar progresso (medalhas, micro-animações).
```

## §2 — Dashboard do PROFESSOR (azul / Seigaiha)

```
Tela: Dashboard do professor. Fundo com padrão Seigaiha azul sutil. Cor primária azul #0284c7.
KPIs: Minhas turmas, Alunos ativos, Submissões a avaliar (badge), Frequência média.
Seção "Avaliar" (SpeedGrader): fila de portfólios/desafios pendentes com nome do aluno e prazo.
Seção "Minhas turmas": cards com nome, nº de alunos, próxima aula.
Atalhos: Nova aula, Registrar presença, Criar desafio.
Sidebar igual ao aluno mas com itens de professor (Turmas, Avaliar, Agenda, Materiais). Botões em azul.
```

## §3 — Dashboard do ADMIN (roxo / Sayagata) — redesenho do atual

```
Tela: Painel administrativo. Fundo padrão Sayagata roxo sutil. Cor primária roxo #7c3aed.
Header "Painel Administrativo" com badge "Online" e botões "Novo Aluno"/"Nova Turma".
4 KPIs grandes: Alunos ativos, Professores, Turmas ativas, Instrumentos (números em JetBrains Mono).
Seção "Atividade da semana" (posts, minutos de prática, alunos praticando, itens disponíveis).
Seção "Acesso rápido" (Alunos, Turmas, Avaliações, Config) em grade de ícones.
Sidebar completa de gestão. Visual executivo, sofisticado, cartões brancos com borda sutil.
```

## §4 — Aula / Motor Alpha (aluno)

```
Tela: Detalhe de uma aula musical para o aluno (papel vermelho).
Cabeçalho com título da aula, número, módulo e barra de progresso.
Corpo: conteúdo da aula (texto + mídia), seção de exercícios práticos com dificuldade em estrelas, player de áudio/vídeo.
Card "Desafio Alpha" destacado (gerado por IA) com botão "Enviar meu trabalho".
Botão flutuante de concluir aula (+10 pontos, com micro-celebração).
Mostrar disclaimer sutil "avaliação gerada por IA" onde houver feedback automático.
```

## §5 — Enviar Portfólio (aluno)

```
Tela: Formulário de envio de portfólio do aluno (papel vermelho).
Campos: título, tipo de trabalho, descrição (textarea), upload de áudio/vídeo/arquivo com preview e barra de progresso.
Dica amigável sobre o que enviar. Botão "Enviar trabalho" vermelho.
Após envio: card de confirmação caloroso + aviso de que o professor e a IA vão avaliar.
Estados: vazio (nenhum portfólio ainda), enviando, sucesso, erro amigável.
```

## §6 — Login / Auth (institucional)

```
Tela: Login do Nipo School. Layout dividido: à esquerda, ilustração japonesa (torii ou enso em brush sumi-ê) sobre fundo ivory #fbf7f0 com tagline "Disciplina japonesa, alma brasileira."; à direita, formulário.
Logo: círculo vermelho #dc2626 com nota musical em brush branco + wordmark "NIPO SCHOOL".
Form: e-mail, senha, botão vermelho "Entrar", links "Esqueci a senha" e "Criar conta".
Tom acolhedor. Acessível. Versão mobile com a ilustração no topo.
```

---

## Como consolidar depois
Quando tiver os outputs aprovados, me mande (HTML/PNG). Eu: (1) extraio os tokens/padrões reais, (2) atualizo `nipo-wa.tokens.json`/`nipo-wa.css` se algo mudar, (3) construo os componentes React reutilizáveis e aplico o theming por `data-role` nas telas do app, (4) valido no navegador (R-005).
