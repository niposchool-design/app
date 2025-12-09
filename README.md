# 🎌 Nipo School - Sistema Oriental de Ensino Musical

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Next.js](https://img.shields.io/badge/Next.js-16.0.8-black)
![React](https://img.shields.io/badge/React-19-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.0-cyan)

## 📋 Sobre o Projeto

**Nipo School** é uma plataforma revolucionária de ensino musical que combina a disciplina e excelência da **pedagogia japonesa** com a criatividade do método **Orff-Schulwerk**, criando uma experiência educacional única e envolvente.

### 🎯 Metodologias Integradas

- 🎭 **Orff Schulwerk** - Aprendizado através do movimento e criatividade
- 🎎 **Método Suzuki** - Aprendizado natural como uma língua materna
- 🎪 **Musical Futures** - Aprendizado informal e colaborativo
- 🎨 **Kodály** - Desenvolvimento da musicalidade interior

## 🚀 Quick Start

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Conta Supabase (para autenticação)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/nipo_school.git

# Entre na pasta
cd nipo_school

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.local.example .env.local
# Edite o .env.local com suas credenciais Supabase

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse: `http://localhost:4000`

## 📁 Estrutura do Projeto

```
nipo_school/
├── 📂 app/                    # Next.js App Router
│   ├── (auth)/                # Rotas de autenticação
│   │   └── login/             # Página de login
│   ├── (protected)/           # Rotas protegidas
│   │   ├── admin/             # Área administrativa
│   │   ├── professores/       # Área dos professores
│   │   └── alunos/            # Área dos alunos
│   ├── providers/             # Context providers
│   ├── layout.tsx             # Layout raiz
│   └── page.tsx               # Página inicial
├── 📂 lib/                    # Bibliotecas e utilitários
│   └── supabase/              # Cliente Supabase
├── 📂 docs/                   # Documentação completa
├── 📂 scripts/                # Scripts de desenvolvimento
├── 📂 public/                 # Assets públicos
└── 📄 middleware.ts           # Middleware de autenticação
```

📖 **[Ver estrutura completa](./ESTRUTURA.md)**

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Servidor de desenvolvimento (localhost:4000)

# Build
npm run build            # Build de produção Next.js
npm run start            # Inicia servidor de produção

# Linting
npm run lint             # Executar ESLint
```

## 🎨 Design System

O projeto segue um **Design System completo** documentado em:
- **[Sistema de Design e Normativas UX/UI](./docs/Nipo_School-Sistema_de_Design_e_Normativas_UX_UI.md)**

### Cores Principais
- 🔴 Vermelho Nipo: `#ef4444`
- 🟠 Laranja: `#f97316`
- ⚪ Cinza Zen: `#64748b`

### Tipografia
- **Principal**: Inter (Google Fonts)
- **Japonesa**: Noto Sans JP

## 📚 Documentação

- 📖 [Documentação Completa](./docs/DOCUMENTACAO_COMPLETA_NIPO_SCHOOL.md)
- 🏗️ [Estrutura do Projeto](./ESTRUTURA.md)
- 🎨 [Design System](./docs/Nipo_School-Sistema_de_Design_e_Normativas_UX_UI.md)
- 📋 [Plano de Desenvolvimento](./docs/plano_completo.md)

## 🔧 Tecnologias

### Frontend
- **React 18.2.0** - Biblioteca UI
- **Vite 5.4.19** - Build tool
- **TailwindCSS 3.4.0** - Estilização
- **React Router** - Roteamento
- **Lucide React** - Ícones

### Backend
- **Supabase** - Database + Auth + Real-time
- **PostgreSQL** - Banco de dados

### DevOps
- **Vercel** - Deploy e hosting
- **GitHub** - Controle de versão

## 🎯 Features Implementadas

### ✅ Fase 1 - Foundation
- [x] Landing page institucional
- [x] Design System completo
- [x] Estrutura base do projeto
- [x] Configuração de ambientes

### 🔄 Fase 2 - Em Desenvolvimento
- [ ] Sistema de autenticação
- [ ] Dashboards por tipo de usuário
- [ ] Módulos educacionais

### 📋 Fase 3 - Planejado
- [ ] Sistema de gamificação
- [ ] Centro de estudos
- [ ] Portfolio de alunos
- [ ] Sistema de conquistas

## 👥 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Contato

**ADNIPO Suzano**
- Website: [niposchool.com](https://niposchool.com)
- Email: contato@niposchool.com

---

⭐ **"Se não for divertido, ninguém aprende. Se não for fácil, ninguém começa."**

*Filosofia Nipo School*

