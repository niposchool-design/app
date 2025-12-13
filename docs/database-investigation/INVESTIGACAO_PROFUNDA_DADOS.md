# 🕵️ Investigação Profunda de Dados - Nipo School

Este documento serve para mapearmos quais tabelas "avançadas" do banco de dados possuem conteúdo real cadastrado. O objetivo é identificar quais funcionalidades podemos "acender" no frontend imediatamente.

Por favor, execute as queries abaixo no SQL Editor do Supabase e registre o resultado (ou apenas se tem dados ou não).

---

## 1. 🎵 Módulo Instrumentos (A Joia da Coroa)
O frontend atual mostra apenas nome e foto. O banco suporta muito mais.

### 1.1 Curiosidades e História
Verificar se temos fatos interessantes cadastrados para os instrumentos.
```sql
-- Quantas curiosidades temos cadastradas no total?
SELECT count(*) FROM instrumento_curiosidades;

-- Exemplo de conteúdo (para ver a estrutura)
SELECT * FROM instrumento_curiosidades LIMIT 3;
```
**Resultado:**
*(Cole aqui ou descreva)*

### 1.2 Mídia Rica (Vídeos, 3D, Áudio)
Verificar se temos links de vídeos ou modelos 3D.
```sql
-- Temos mídias cadastradas?
SELECT count(*) FROM instrumento_midias;

-- Quais tipos de mídia temos? (video, audio, model3d?)
SELECT DISTINCT tipo FROM instrumento_midias;
```
**Resultado:**
*(Cole aqui ou descreva)*

### 1.3 Sons e Variações
Verificar se temos samples de áudio para o player.
```sql
SELECT count(*) FROM instrumento_sons;
SELECT count(*) FROM instrumento_sons_variacoes;
```
**Resultado:**
*(Cole aqui ou descreva)*

### 1.4 Técnicas e Quiz
Verificar se temos conteúdo educativo sobre o instrumento.
```sql
SELECT count(*) FROM instrumento_tecnicas;
SELECT count(*) FROM instrumento_quiz;
```
**Resultado:**
*(Cole aqui ou descreva)*

---

## 2. 📚 Módulo Aulas (Método Alpha)
O frontend mostra apenas a lista. O banco suporta uma sala de aula completa.

### 2.1 Materiais e Atividades
```sql
-- Temos materiais (PDFs, MP3s) atrelados às aulas?
SELECT count(*) FROM aula_materiais;

-- Temos atividades ou exercícios cadastrados?
SELECT count(*) FROM aula_atividades;
```
**Resultado:**
*(Cole aqui ou descreva)*

### 2.2 Desafios e Gamificação da Aula
```sql
-- Existem desafios cadastrados para as aulas?
SELECT count(*) FROM aula_desafios;

-- Temos critérios de avaliação definidos?
SELECT count(*) FROM aula_criterios_avaliacao;
```
**Resultado:**
*(Cole aqui ou descreva)*

---

## 3. 💬 Comunidade e Fórum
Funcionalidade inexistente no frontend atual.

```sql
-- O fórum tem perguntas reais?
SELECT count(*) FROM forum_perguntas;

-- Tem respostas?
SELECT count(*) FROM forum_respostas;
```
**Resultado:**
*(Cole aqui ou descreva)*

---

## 4. 🏆 Gamificação Global
```sql
-- Temos conquistas (badges) cadastradas no sistema?
SELECT count(*) FROM achievements;

-- Alunos já ganharam conquistas?
SELECT count(*) FROM user_achievements;
```
**Resultado:**
*(Cole aqui ou descreva)*

---

## 5. 🔍 Auditoria Rápida de Tabelas Vazias
Query para listar todas as tabelas e contagem de linhas (pode demorar um pouco dependendo do banco, mas é muito útil).

```sql
SELECT 
  schemaname, 
  relname as tabela, 
  n_live_tup as linhas_estimadas 
FROM pg_stat_user_tables 
WHERE schemaname = 'public' 
ORDER BY n_live_tup DESC;
```
**Resultado:**
*(Cole aqui a lista das tabelas mais populosas)*
