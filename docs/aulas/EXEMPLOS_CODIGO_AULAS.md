# 💻 Exemplos de Código - Sistema de Aulas

## 📚 Uso dos Componentes

### 1. **AulaCard**

```tsx
import { AulaCard } from '@/components/aulas';

// Uso básico
<AulaCard aula={aula} />

// Com progresso
<AulaCard 
  aula={aula}
  progresso={{
    status: 'em_andamento',
    porcentagem_completa: 65
  }}
/>
```

### 2. **MaterialList**

```tsx
import { MaterialList } from '@/components/aulas';

<MaterialList 
  materiais={materiais}
  showObrigatorio={true}
/>
```

### 3. **LevelBadge**

```tsx
import { LevelBadge } from '@/components/aulas';

<LevelBadge nivel="iniciante" />
<LevelBadge nivel="intermediario" size="lg" />
<LevelBadge nivel="avancado" size="sm" showIcon={false} />
```

### 4. **ProgressBar**

```tsx
import { ProgressBar } from '@/components/aulas';

<ProgressBar porcentagem={75} />
<ProgressBar 
  porcentagem={50}
  showLabel={false}
  size="lg"
  color="green"
  animated={true}
/>
```

### 5. **StatsCard**

```tsx
import { StatsCard } from '@/components/aulas';

const stats = {
  total_aulas: 30,
  aulas_concluidas: 12,
  aulas_em_andamento: 3,
  aulas_nao_iniciadas: 15,
  porcentagem_completa: 40,
  desafios_enviados: 10,
  desafios_aprovados: 8
};

<StatsCard stats={stats} />
```

---

## 🔍 Uso das Queries

### 1. **Buscar Aulas por Nível**

```tsx
import { getAulasPorNivel } from '@/lib/supabase/queries/aulas';

// Todas as aulas iniciantes
const aulas = await getAulasPorNivel('iniciante');

// Com filtros
const aulas = await getAulasPorNivel('intermediario', {
  status: 'concluida',
  formato: 'presencial',
  modulo: 'BLOCO 3',
  search: 'repertório'
});
```

### 2. **Buscar Detalhes de Uma Aula**

```tsx
import { getAulaPorNumero } from '@/lib/supabase/queries/aulas';

const aula = await getAulaPorNumero(15);

// Aula completa com materiais, feedbacks, etc.
console.log(aula.materiais);
console.log(aula.checklist);
console.log(aula.feedbacks);
```

### 3. **Verificar Progresso**

```tsx
import { 
  getProgressoAula,
  getProgressoGeralAluno,
  getEstatisticasProgresso 
} from '@/lib/supabase/queries/aulas';

// Progresso em uma aula específica
const progresso = await getProgressoAula(alunoId, aulaId);

// Progresso geral do aluno
const progressoGeral = await getProgressoGeralAluno(alunoId, 'iniciante');

// Estatísticas
const stats = await getEstatisticasProgresso(alunoId, 'intermediario');
```

### 4. **Atualizar Progresso**

```tsx
import { 
  iniciarAula,
  concluirAula,
  atualizarProgressoAula 
} from '@/lib/supabase/queries/aulas';

// Iniciar aula
await iniciarAula(alunoId, aulaId);

// Concluir aula
await concluirAula(alunoId, aulaId, 5); // nota 5

// Atualização customizada
await atualizarProgressoAula(alunoId, aulaId, {
  porcentagem_completa: 50,
  desafio_enviado: true
});
```

---

## 🎨 Tipos TypeScript

### 1. **Interface Aula**

```tsx
import type { Aula, NivelAula } from '@/lib/types/aulas';

const aula: Aula = {
  id: '123',
  numero: 15,
  titulo: 'Semana Criativa',
  data_programada: '2025-09-13',
  objetivo_didatico: 'Experimentação livre',
  nivel: 'avancado',
  status: 'concluida',
  duracao_minutos: 90
};
```

### 2. **Filtros de Busca**

```tsx
import type { FiltrosAulas } from '@/lib/types/aulas';

const filtros: FiltrosAulas = {
  nivel: 'intermediario',
  status: 'a_fazer',
  formato: 'presencial',
  modulo: 'BLOCO 5',
  data_inicio: '2025-08-01',
  data_fim: '2025-09-30',
  search: 'criatividade'
};
```

### 3. **Progresso do Aluno**

```tsx
import type { ProgressoAula } from '@/lib/types/aulas';

const progresso: ProgressoAula = {
  id: '456',
  aluno_id: 'aluno-123',
  aula_id: 'aula-456',
  status: 'em_andamento',
  porcentagem_completa: 65,
  desafio_enviado: true,
  desafio_aprovado: false,
  nota_auto_avaliacao: 4
};
```

---

## 🗺️ Mapeamentos Úteis

### 1. **Aulas por Nível**

```tsx
import { AULAS_POR_NIVEL } from '@/lib/types/aulas';

// Array de números de aulas
const aulasIniciantes = AULAS_POR_NIVEL.iniciante; 
// [0, 1, 2, 3, 4, 5, 6]

const aulasIntermediarias = AULAS_POR_NIVEL.intermediario;
// [7, 8, 9, 10, 11, 12, 21, 23]

const aulasAvancadas = AULAS_POR_NIVEL.avancado;
// [13, 14, 15, 16, 17, 18, 19, 20, 22, 24]

const aulasShowFinal = AULAS_POR_NIVEL.todos;
// [25, 26, 27, 28, 29]
```

### 2. **Blocos Pedagógicos**

```tsx
import { BLOCOS_PEDAGOGICOS } from '@/lib/types/aulas';

const bloco1 = BLOCOS_PEDAGOGICOS['BLOCO 1'];
// { nome: 'Fundação e Iniciação', aulas: [0, 1, 2, 3, 4, 5] }

// Iterar sobre todos os blocos
Object.entries(BLOCOS_PEDAGOGICOS).forEach(([key, bloco]) => {
  console.log(`${key}: ${bloco.nome}`);
  console.log(`Aulas: ${bloco.aulas.join(', ')}`);
});
```

### 3. **Cores por Nível**

```tsx
import { CORES_NIVEL } from '@/lib/types/aulas';

const coresIniciante = CORES_NIVEL.iniciante;
// { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300' }

// Uso em componente
<div className={`${CORES_NIVEL.avancado.bg} ${CORES_NIVEL.avancado.text}`}>
  Avançado
</div>
```

### 4. **Configuração de Status**

```tsx
import { STATUS_CONFIG } from '@/lib/types/aulas';

const statusConcluida = STATUS_CONFIG.concluida;
// { label: 'Concluída', color: 'green' }

// Renderizar badge
<span className={`bg-${STATUS_CONFIG.em_preparacao.color}-100`}>
  {STATUS_CONFIG.em_preparacao.label}
</span>
```

---

## 🚀 Exemplos de Páginas Completas

### 1. **Página Listagem de Aulas**

```tsx
import { getAulasPorNivel, getEstatisticasProgresso } from '@/lib/supabase/queries/aulas';
import { AulaCard, StatsCard } from '@/components/aulas';
import { getUser } from '@/lib/supabase/server';

export default async function AulasPage() {
  const user = await getUser();
  const aulas = await getAulasPorNivel('iniciante');
  const stats = await getEstatisticasProgresso(user?.id || '', 'iniciante');

  return (
    <div className="space-y-8">
      <StatsCard stats={stats} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {aulas.map(aula => (
          <AulaCard key={aula.id} aula={aula} />
        ))}
      </div>
    </div>
  );
}
```

### 2. **Página de Detalhes com Materiais**

```tsx
import { getAulaPorNumero } from '@/lib/supabase/queries/aulas';
import { MaterialList, LevelBadge } from '@/components/aulas';

export default async function AulaDetalhesPage({ 
  params 
}: { 
  params: Promise<{ numero: string }> 
}) {
  const { numero } = await params;
  const aula = await getAulaPorNumero(parseInt(numero));

  if (!aula) return <div>Aula não encontrada</div>;

  return (
    <div>
      <h1>{aula.titulo}</h1>
      <LevelBadge nivel={aula.nivel} />
      
      <div className="mt-8">
        <h2>Materiais de Apoio</h2>
        <MaterialList materiais={aula.materiais || []} />
      </div>
    </div>
  );
}
```

### 3. **Componente Client-Side com Progresso**

```tsx
'use client';

import { useState } from 'react';
import { ProgressBar } from '@/components/aulas';
import { atualizarProgressoAula } from '@/lib/supabase/queries/aulas';

export function AulaProgressTracker({ 
  alunoId, 
  aulaId 
}: { 
  alunoId: string; 
  aulaId: string 
}) {
  const [progresso, setProgresso] = useState(0);

  const handleAvancar = async () => {
    const novoProgresso = Math.min(progresso + 10, 100);
    setProgresso(novoProgresso);
    
    await atualizarProgressoAula(alunoId, aulaId, {
      porcentagem_completa: novoProgresso,
      status: novoProgresso === 100 ? 'concluida' : 'em_andamento'
    });
  };

  return (
    <div>
      <ProgressBar porcentagem={progresso} />
      <button onClick={handleAvancar}>Avançar 10%</button>
    </div>
  );
}
```

---

## 🔄 Fluxo de Dados Completo

```tsx
// 1. Página carrega e busca dados
const aulas = await getAulasPorNivel('iniciante');

// 2. Renderiza cards
aulas.map(aula => <AulaCard aula={aula} />)

// 3. Usuário clica no card
<Link href={`/alunos/aulas/${aula.numero}`}>

// 4. Página de detalhes carrega
const aula = await getAulaPorNumero(numero);

// 5. Usuário inicia a aula
await iniciarAula(alunoId, aula.id);

// 6. Progresso é atualizado
await atualizarProgressoAula(alunoId, aula.id, { 
  porcentagem_completa: 50 
});

// 7. Usuário envia desafio
await atualizarProgressoAula(alunoId, aula.id, { 
  desafio_enviado: true 
});

// 8. Usuário conclui a aula
await concluirAula(alunoId, aula.id, 5);

// 9. Estatísticas são recalculadas
const stats = await getEstatisticasProgresso(alunoId);
```

---

## 📊 Estrutura de Resposta das Queries

### **getAulasPorNivel()**

```json
[
  {
    "id": "uuid-123",
    "numero": 1,
    "titulo": "Som do Corpo e Ritmo Básico",
    "data_programada": "2025-06-07",
    "objetivo_didatico": "Despertar consciência rítmica...",
    "nivel": "iniciante",
    "modulo": "BLOCO 1",
    "metodologia_principal": "Orff Schulwerk",
    "status": "a_fazer",
    "duracao_minutos": 90
  }
]
```

### **getAulaPorNumero()**

```json
{
  "id": "uuid-123",
  "numero": 15,
  "titulo": "Semana Criativa",
  "materiais": [
    {
      "id": "mat-1",
      "tipo": "pdf",
      "titulo": "Guia de Composição",
      "url": "https://...",
      "obrigatorio": true
    }
  ],
  "checklist": [
    {
      "id": "check-1",
      "descricao": "Preparar instrumento",
      "tipo": "pre_aula",
      "concluido": false
    }
  ]
}
```

### **getEstatisticasProgresso()**

```json
{
  "total_aulas": 30,
  "aulas_concluidas": 12,
  "aulas_em_andamento": 3,
  "aulas_nao_iniciadas": 15,
  "porcentagem_completa": 40,
  "desafios_enviados": 10,
  "desafios_aprovados": 8
}
```

---

## 🎯 Casos de Uso Práticos

### **1. Filtrar aulas não concluídas**

```tsx
const aulasAFazer = await getAulasPorNivel('intermediario', {
  status: 'a_fazer'
});
```

### **2. Buscar aulas de um módulo específico**

```tsx
const aulasBlocoCriativo = await getTodasAulas({
  modulo: 'BLOCO 5'
});
```

### **3. Verificar se aluno pode acessar aula**

```tsx
async function podeAcessarAula(alunoId: string, numeroAula: number) {
  // Se aula < 10, pode acessar (iniciante)
  if (numeroAula < 10) return true;
  
  // Verificar se completou aula anterior
  const progresso = await getProgressoAula(alunoId, `aula-${numeroAula - 1}`);
  return progresso?.status === 'concluida';
}
```

### **4. Calcular tempo total de estudo**

```tsx
async function calcularTempoTotal(nivel: NivelAula) {
  const aulas = await getAulasPorNivel(nivel);
  const totalMinutos = aulas.reduce((acc, aula) => 
    acc + (aula.duracao_minutos || 0), 0
  );
  const totalHoras = totalMinutos / 60;
  return totalHoras;
}
```

---

**Arquivo criado para referência rápida de código!** 📚
