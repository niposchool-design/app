#!/bin/bash

echo "📊 CONSULTA RÁPIDA - DADOS DO BANCO NIPO SCHOOL"
echo "=============================================="
echo "🔍 Verificando tabelas e dados principais..."
echo ""

# Verificar se temos arquivo de configuração do Supabase
if [[ -f ".env" ]] || [[ -f ".env.local" ]]; then
    echo "✅ Arquivo de configuração encontrado"
else
    echo "⚠️  Arquivo .env não encontrado"
fi

# Verificar estrutura de arquivos do banco
echo ""
echo "📁 ESTRUTURA DO SISTEMA:"
echo "========================"

# Verificar arquivos de configuração do banco
echo "🔧 Configuração:"
if [[ -f "src/shared/lib/supabase/supabaseClient.js" ]]; then
    echo "   ✅ Cliente Supabase configurado"
else
    echo "   ❌ Cliente Supabase não encontrado"
fi

# Verificar serviços
echo ""
echo "🚀 Serviços:"
SERVICES_DIR="src/shared/services"
if [[ -d "$SERVICES_DIR" ]]; then
    echo "   📁 Diretório de serviços encontrado:"
    for service in $(find "$SERVICES_DIR" -name "*.js" 2>/dev/null | head -5); do
        SERVICE_NAME=$(basename "$service" .js)
        echo "      ✅ $SERVICE_NAME"
    done
else
    echo "   ❌ Diretório de serviços não encontrado"
fi

# Verificar contextos de autenticação
echo ""
echo "🔐 Autenticação:"
AUTH_CONTEXT="src/shared/contexts/AuthContext.jsx"
if [[ -f "$AUTH_CONTEXT" ]]; then
    echo "   ✅ Contexto de autenticação configurado"
    
    # Verificar métodos principais
    SUPABASE_METHODS=$(grep -o "supabase\.[a-zA-Z]*" "$AUTH_CONTEXT" | sort | uniq | head -5)
    echo "   📋 Métodos Supabase em uso:"
    for method in $SUPABASE_METHODS; do
        echo "      🔸 $method"
    done
else
    echo "   ❌ Contexto de autenticação não encontrado"
fi

echo ""
echo "🗄️ TABELAS IDENTIFICADAS NO CÓDIGO:"
echo "=================================="

# Procurar por referências de tabelas no código
TABLES_FOUND=$(grep -r "\.from(" src --include="*.js" --include="*.jsx" | \
               grep -o "from('[^']*'" | \
               sed "s/from('//g" | \
               sed "s/'//g" | \
               sort | uniq | head -15)

echo "📋 Tabelas encontradas no código:"
for table in $TABLES_FOUND; do
    echo "   🗃️  $table"
done

echo ""
echo "📊 CONSULTAS MAIS COMUNS:"
echo "======================="

# Encontrar tipos de consultas mais usadas
SELECT_QUERIES=$(grep -r "\.select(" src --include="*.js" --include="*.jsx" | wc -l)
INSERT_QUERIES=$(grep -r "\.insert(" src --include="*.js" --include="*.jsx" | wc -l)
UPDATE_QUERIES=$(grep -r "\.update(" src --include="*.js" --include="*.jsx" | wc -l)
DELETE_QUERIES=$(grep -r "\.delete(" src --include="*.js" --include="*.jsx" | wc -l)

echo "   📈 SELECT: $SELECT_QUERIES consultas"
echo "   ➕ INSERT: $INSERT_QUERIES operações"  
echo "   ✏️  UPDATE: $UPDATE_QUERIES operações"
echo "   🗑️  DELETE: $DELETE_QUERIES operações"

echo ""
echo "🔗 OPERAÇÕES DE RELACIONAMENTO:"
echo "============================="

# Procurar por joins e relacionamentos
JOINS=$(grep -r "\.join(" src --include="*.js" --include="*.jsx" | wc -l)
EQ_FILTERS=$(grep -r "\.eq(" src --include="*.js" --include="*.jsx" | wc -l)
FILTERS=$(grep -r "\.filter(" src --include="*.js" --include="*.jsx" | wc -l)

echo "   🔗 JOINs: $JOINS"
echo "   🎯 Filtros .eq(): $EQ_FILTERS"
echo "   📝 Filtros customizados: $FILTERS"

echo ""
echo "🌐 AUTENTICAÇÃO E SEGURANÇA:"
echo "========================="

# Verificar recursos de auth
AUTH_METHODS=$(grep -r "supabase\.auth\." src --include="*.js" --include="*.jsx" | \
               grep -o "supabase\.auth\.[a-zA-Z]*" | \
               sort | uniq | head -10)

echo "🔐 Métodos de autenticação encontrados:"
for method in $AUTH_METHODS; do
    echo "   🔸 $method"
done

echo ""
echo "📱 PÁGINAS COM ACESSO AO BANCO:"
echo "============================="

# Encontrar páginas que fazem consultas ao banco
PAGES_WITH_DB=$(find src -name "*.jsx" -exec grep -l "supabase\.from\|supabase\.auth" {} \; | head -10)

echo "📄 Páginas que acessam o banco:"
for page in $PAGES_WITH_DB; do
    PAGE_NAME=$(basename "$page" .jsx)
    echo "   📄 $PAGE_NAME"
done

echo ""
echo "🎯 PARA VER DADOS EM TEMPO REAL:"
echo "==============================="
echo "   🌐 Acesse: http://localhost:5173/admin/banco-dados"
echo "   📊 Dashboard com dados ao vivo do banco"
echo "   🔄 Atualização automática dos dados"
echo ""
echo "🌸 Consulta concluída - Nipo School Database Status! 🌸"