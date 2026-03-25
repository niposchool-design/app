# Guia do Administrador — Nipo School

## 1. Primeiro Acesso

1. Acesse o sistema pelo link fornecido (ex: `https://niposchool.vercel.app`)
2. Faça login com email e senha fornecidos pelo desenvolvedor
3. Você será redirecionado para o **Dashboard**

## 2. Configuração Inicial

### 2.1 Dados da Escola
- Acesse **Configurações → Escola**
- Preencha: nome, endereço, telefone, logo
- Configure as unidades (sedes)

### 2.2 Criação de Usuários
- Acesse **Configurações → Usuários**
- Clique **Convidar Usuário** ou **Criar Aluno/Professor**
- Para convite: informe email + role → o usuário recebe link de acesso
- Para criação direta: informe nome, email, senha, instrumento

### 2.3 Roles e Permissões
- Acesse **Configurações → Roles e Permissões**
- 3 roles padrão: `student`, `teacher`, `admin`
- Para cada role, configure:
  - **Permissões**: quais ações o role pode executar
  - **Navegação**: quais páginas aparecem no menu lateral

### 2.4 Matrículas
- Acesse **Configurações → Matrículas**
- Crie turmas (Cursos) com professor, instrumento, nível e horário
- Matricule alunos nas turmas

## 3. Gestão do Conteúdo

### 3.1 Aulas
- Acesse **Aulas** para listar por módulo
- Crie novas aulas com título, objetivo, atividades e materiais
- Publique quando pronto (status: draft → published)
- Marque as metodologias pedagógicas utilizadas (Orff, Suzuki, Kodály, etc.)

### 3.2 Geração de Material IA
- Acesse **Configurações → Conteúdo IA**
- Selecione aulas e clique **Gerar Material**
- O sistema cria automaticamente: material de apoio + exercícios
- Monitore custos em **Configurações → Superadmin**

### 3.3 Biblioteca Acadêmica
- Acesse **Acadêmico → Biblioteca**
- 24 capítulos de currículo pré-carregados
- Pode adicionar novos itens se necessário

## 4. Novas Páginas e Funcionalidades

### 4.1 Sistema de Notificações
- Notificações in-app aparecem no ícone de sino para todos os usuários
- Tipos: sistema, conquista, feedback, avisos
- Notificações são criadas automaticamente (conquistas, avaliações) ou via RPC

### 4.2 QR Code Scanner
- Página **Escanear QR** disponível no menu "Ferramentas"
- Alunos e professores podem escanear QR codes para presença, materiais, etc.

### 4.3 Relatório para a Família
- Página **Relatório Família** disponível no menu "Meu Espaço"
- Alunos veem um resumo completo do progresso com opção de imprimir
- Inclui: aulas concluídas, frequência, conquistas, práticas e nível

### 4.4 Reflexão Semanal
- Página **Reflexão Semanal** disponível no menu "Meu Espaço"
- Alunos registram progresso, dificuldades, metas e ideias semanalmente
- Reflexões são salvas no portfólio como tipo "reflexão" (+15 pts)

### 4.5 Sistema de Gamificação Atualizado
- Pontuação alinhada ao currículo pedagógico:
  - Aula concluída: **+50 pts** (era 10)
  - Portfólio completo: **+100 pts** (era 20)
  - Desafio concluído: **+15 pts**
  - Prática diária: **+5 pts**
  - Reflexão semanal: **+15 pts**
- 8 níveis com temática japonesa (Semente Musical 🌱 até Mestre Alpha 🎌)
- Navegação de itens no menu já configurada para todas as novas páginas

## 5. Monitoramento

### 5.1 Superadmin Dashboard
- Acesse **Configurações → Superadmin**
- Visualize: requisições IA, custos, erros, latência
- Alertas automáticos para anomalias

### 5.2 Qualidade de Dados
- Acesse **Configurações → Qualidade de Dados**
- Veja campos obrigatórios faltando em perfis, aulas, submissões

## 6. Feature Flags
- Módulos podem ser ligados/desligados por fase do piloto
- Flags configurados no banco de dados (`feature_flags`)
- Contate o desenvolvedor para ativar/desativar módulos

## 7. Suporte
- Problemas técnicos: contate Junior (junior.sax@gmail.com)
- Bugs: registre em https://github.com/[repo]/issues
