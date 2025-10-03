# 📁 Estrutura Nova Arquitetura - Nipo School

```
src_new/
├── app/                    # 🎯 Core da aplicação
│   ├── providers/         # Context providers (AuthProvider, etc.)
│   ├── router/            # Sistema de rotas modular
│   └── config/            # Configurações da aplicação
│
├── pages/                 # 📄 Páginas principais (uma pasta = uma rota)
│   ├── auth/             # Páginas de autenticação
│   ├── admin/            # Páginas administrativas
│   ├── student/          # Páginas dos estudantes
│   ├── teacher/          # Páginas dos professores
│   └── public/           # Páginas públicas
│
├── components/           # 🧩 Componentes reutilizáveis
│   ├── ui/              # Componentes básicos (Button, Input, Modal)
│   ├── forms/           # Componentes de formulário
│   ├── layout/          # Componentes de layout (Header, Sidebar)
│   └── common/          # Componentes comuns (Loading, ErrorBoundary)
│
├── hooks/               # 🎣 Custom hooks
├── services/            # 🔌 APIs e serviços
│   └── api/            # Serviços de API organizados
├── lib/                 # 📚 Bibliotecas e utilitários
│   ├── supabase/       # Cliente Supabase
│   └── utils/          # Funções utilitárias
├── styles/              # 🎨 Estilos globais
└── assets/              # 📦 Recursos estáticos
    ├── images/
    └── icons/
```

## ✅ Estrutura Criada

Data: 30 de setembro de 2025
Status: FASE 1 - Infraestrutura Base
Próximo: Configurar aliases duplos