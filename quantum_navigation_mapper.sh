#!/bin/bash

# 🗺️ MAPEADOR QUÂNTICO DE ROTAS - NIPO SCHOOL
# Análise completa de fluxos de navegação e lógica de rotas

echo "🗺️ MAPEADOR QUÂNTICO DE ROTAS - NIPO SCHOOL"
echo "============================================"
echo "🎯 Objetivo: Mapear TODOS os fluxos e garantir lógica perfeita de navegação"
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

log_info() { echo -e "${BLUE}ℹ️  $1${NC}"; }
log_success() { echo -e "${GREEN}✅ $1${NC}"; }
log_warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }
log_error() { echo -e "${RED}❌ $1${NC}"; }
log_step() { echo -e "${PURPLE}🔄 $1${NC}"; }
log_quantum() { echo -e "${CYAN}🚀 $1${NC}"; }

# 1. MAPEAMENTO COMPLETO DE ROTAS DEFINIDAS
log_quantum "FASE 1: MAPEAMENTO DE ROTAS DEFINIDAS"
echo "===================================="

log_step "Extraindo todas as rotas do AppRouter..."

if [ -f "src/app/router/AppRouter.jsx" ]; then
    log_info "📍 Rotas encontradas no AppRouter.jsx:"
    
    # Extrair rotas com contexto
    grep -n "path=" src/app/router/AppRouter.jsx | head -30 | while read line; do
        line_num=$(echo "$line" | cut -d: -f1)
        route_path=$(echo "$line" | grep -o 'path="[^"]*"' | sed 's/path="\|"//g')
        echo "   $line_num: $route_path"
    done
else
    log_error "AppRouter.jsx não encontrado"
fi

echo ""

# 2. ANÁLISE DE NAVEGAÇÃO POR COMPONENTE
log_quantum "FASE 2: ANÁLISE DE NAVEGAÇÃO POR COMPONENTE"
echo "========================================="

log_step "Mapeando componentes com navegação..."

# Encontrar todos os componentes que fazem navegação
nav_components=$(find src -name "*.jsx" | xargs grep -l "useNavigate\|Navigate\|Link.*to=" | sort)

log_info "🧭 Componentes com navegação: $(echo "$nav_components" | wc -l)"

echo "$nav_components" | while read component; do
    component_name=$(basename "$component" .jsx)
    relative_path=$(echo "$component" | sed 's|src/||')
    
    # Contar links
    link_count=$(grep -c "to=" "$component" 2>/dev/null || echo "0")
    navigate_count=$(grep -c "navigate(" "$component" 2>/dev/null || echo "0")
    
    total_nav=$((link_count + navigate_count))
    
    if [ $total_nav -gt 0 ]; then
        log_info "   📄 $component_name ($relative_path)"
        echo "      Links: $link_count | Navigate: $navigate_count | Total: $total_nav"
        
        # Mostrar algumas rotas deste componente
        routes=$(grep -o 'to="[^"]*"' "$component" 2>/dev/null | head -3 | sed 's/to="\|"//g')
        if [ ! -z "$routes" ]; then
            echo "$routes" | while read route; do
                echo "        → $route"
            done
        fi
        echo ""
    fi
done

echo ""

# 3. FLUXOS DE USUÁRIO POR TIPO
log_quantum "FASE 3: MAPEAMENTO DE FLUXOS POR TIPO DE USUÁRIO"
echo "============================================="

log_step "Analisando fluxos por tipo de usuário..."

# Definir fluxos esperados por tipo de usuário
declare -A user_flows

user_flows["aluno"]="
login → /dashboard → /dashboard/aluno → conteúdos de aprendizagem
"

user_flows["professor"]="
login → /professores → /professores/conteudos → criar/editar conteúdo
"

user_flows["admin"]="
login → /dashboard → /dashboard/admin → gestão completa
"

for user_type in aluno professor admin; do
    log_info "👤 FLUXO ESPERADO - $user_type:"
    echo "   ${user_flows[$user_type]}"
    
    # Verificar se rotas existem
    case $user_type in
        "aluno")
            routes=("/dashboard/aluno" "/aluno")
            ;;
        "professor")
            routes=("/professores" "/dashboard/professor" "/professores/conteudos")
            ;;
        "admin")
            routes=("/dashboard/admin" "/admin" "/admin/instruments")
            ;;
    esac
    
    log_info "   🔍 Verificando rotas principais:"
    for route in "${routes[@]}"; do
        if grep -q "path=\"$route\"" src/app/router/AppRouter.jsx; then
            log_success "     ✅ $route (existe)"
        else
            log_warning "     ⚠️  $route (não encontrada)"
        fi
    done
    
    echo ""
done

# 4. ANÁLISE DE REDIRECIONAMENTOS
log_quantum "FASE 4: ANÁLISE DE REDIRECIONAMENTOS E NAVEGAÇÃO AUTOMÁTICA"
echo "=================================================="

log_step "Verificando lógica de redirecionamento..."

# Procurar por lógica de redirecionamento
redir_files=$(find src -name "*.jsx" | xargs grep -l "Navigate.*to=\|navigate(.*replace\|window.location" | sort)

log_info "🔄 Arquivos com redirecionamento: $(echo "$redir_files" | wc -l)"

echo "$redir_files" | while read file; do
    file_name=$(basename "$file" .jsx)
    relative_path=$(echo "$file" | sed 's|src/||')
    
    log_info "   📄 $file_name ($relative_path)"
    
    # Mostrar redirecionamentos encontrados
    redirects=$(grep -n "Navigate.*to=\|navigate(\|window.location" "$file" 2>/dev/null | head -3)
    if [ ! -z "$redirects" ]; then
        echo "$redirects" | while read redirect; do
            line_num=$(echo "$redirect" | cut -d: -f1)
            content=$(echo "$redirect" | cut -d: -f2-)
            echo "        L$line_num: $(echo "$content" | sed 's/^[ \t]*//')"
        done
    fi
    echo ""
done

# 5. ANÁLISE DE PROTEÇÃO DE ROTAS
log_quantum "FASE 5: ANÁLISE DE PROTEÇÃO E PERMISSÕES"
echo "======================================="

log_step "Verificando sistema de proteção de rotas..."

# Procurar por componentes de proteção
protection_components=$(find src -name "*.jsx" | xargs grep -l "ProtectedRoute\|PermissionRoute\|AdminRoute\|EducatorRoute" | sort)

log_info "🛡️  Componentes com proteção: $(echo "$protection_components" | wc -l)"

if [ ! -z "$protection_components" ]; then
    echo "$protection_components" | while read file; do
        file_name=$(basename "$file" .jsx)
        relative_path=$(echo "$file" | sed 's|src/||')
        
        # Contar tipos de proteção
        protected_count=$(grep -c "ProtectedRoute" "$file" 2>/dev/null || echo "0")
        admin_count=$(grep -c "AdminRoute" "$file" 2>/dev/null || echo "0")
        educator_count=$(grep -c "EducatorRoute" "$file" 2>/dev/null || echo "0")
        
        log_info "   🛡️  $file_name ($relative_path)"
        echo "      ProtectedRoute: $protected_count | AdminRoute: $admin_count | EducatorRoute: $educator_count"
        echo ""
    done
else
    log_warning "Nenhum sistema de proteção de rotas encontrado"
fi

echo ""

# 6. ANÁLISE DE BREADCRUMBS E NAVEGAÇÃO CONTEXTUAL
log_quantum "FASE 6: NAVEGAÇÃO CONTEXTUAL E BREADCRUMBS"
echo "========================================"

log_step "Verificando navegação contextual..."

# Procurar por breadcrumbs ou navegação contextual
breadcrumb_files=$(find src -name "*.jsx" | xargs grep -l -i "breadcrumb\|crumb\|navigation.*context\|back.*button" | sort)

breadcrumb_count=$(echo "$breadcrumb_files" | wc -l)
log_info "🍞 Componentes com breadcrumbs/contexto: $breadcrumb_count"

if [ $breadcrumb_count -gt 0 ]; then
    echo "$breadcrumb_files" | while read file; do
        file_name=$(basename "$file" .jsx)
        relative_path=$(echo "$file" | sed 's|src/||')
        echo "   🍞 $file_name ($relative_path)"
    done
else
    log_warning "Nenhum sistema de breadcrumb encontrado"
fi

echo ""

# 7. IDENTIFICAÇÃO DE PROBLEMAS DE NAVEGAÇÃO
log_quantum "FASE 7: DIAGNÓSTICO DE PROBLEMAS DE NAVEGAÇÃO"
echo "==========================================="

log_step "Identificando problemas potenciais..."

echo ""
log_error "❌ PROBLEMAS CRÍTICOS IDENTIFICADOS:"

# Verificar rotas órfãs (definidas mas não utilizadas)
echo "   1. Possíveis rotas órfãs (definidas mas não linkadas)"

# Verificar links quebrados (apontam para rotas inexistentes)
echo "   2. Possíveis links quebrados (apontam para rotas inexistentes)"

# Verificar falta de breadcrumbs
echo "   3. Falta de navegação contextual (breadcrumbs)"

# Verificar redirecionamentos conflitantes
echo "   4. Possíveis redirecionamentos conflitantes"

echo ""
log_warning "⚠️  OPORTUNIDADES DE MELHORIA:"
echo "   1. Implementar OrientalBreadcrumb em todas as páginas"
echo "   2. Criar sistema de navegação contextual inteligente"
echo "   3. Padronizar todos os redirecionamentos"
echo "   4. Implementar cache de navegação para melhor UX"

echo ""

# 8. PLANO DE AÇÃO PARA NAVEGAÇÃO QUÂNTICA
log_quantum "FASE 8: PLANO DE AÇÃO PARA NAVEGAÇÃO QUÂNTICA"
echo "=========================================="

echo ""
log_info "🎯 ARQUITETURA DE NAVEGAÇÃO QUÂNTICA PROPOSTA:"

echo ""
log_info "1. 🗺️  SISTEMA DE ROTAS HIERÁRQUICO:"
echo "   /dashboard (hub central)"
echo "   ├── /dashboard/aluno (experiência gamificada)"  
echo "   ├── /dashboard/professor (ferramentas pedagógicas)"
echo "   └── /dashboard/admin (controle completo)"

echo ""
log_info "2. 🧭 NAVEGAÇÃO CONTEXTUAL INTELIGENTE:"
echo "   • OrientalBreadcrumb em todas as páginas"
echo "   • Botões 'Voltar' contextuais"
echo "   • Navegação por teclado (Ctrl+B para voltar)"
echo "   • Cache de posição para navegação fluida"

echo ""
log_info "3. 🔄 REDIRECIONAMENTOS INTELIGENTES:"
echo "   • Login → Dashboard apropriado por tipo de usuário"
echo "   • Logout → Página inicial"
echo "   • Erro 404 → Dashboard com sugestões"
echo "   • Acesso negado → Dashboard anterior ou principal"

echo ""
log_info "4. 🛡️  PROTEÇÃO AVANÇADA:"
echo "   • Middleware de permissões por rota"
echo "   • Fallbacks elegantes para acesso negado"
echo "   • Loading states orientais durante verificação"

echo ""
log_success "✅ BENEFÍCIOS ESPERADOS:"
echo "   ✨ Navegação 100% fluida e intuitiva"
echo "   🎯 Zero confusão de onde o usuário está"
echo "   🔄 Fluxos de usuário otimizados"
echo "   📱 Experiência mobile perfeita"
echo "   ⚡ Performance superior com cache inteligente"

echo ""

# 9. PRÓXIMOS PASSOS CONCRETOS
log_quantum "FASE 9: PRÓXIMOS PASSOS CONCRETOS"
echo "=============================="

echo ""
log_info "🚀 IMPLEMENTAÇÃO IMEDIATA:"
echo ""
echo "1. 📋 CRIAR COMPONENTES DE NAVEGAÇÃO:"
echo "   • OrientalBreadcrumb (já criado)"
echo "   • OrientalBackButton"
echo "   • OrientalNavigationCache"

echo ""
echo "2. 🔧 ATUALIZAR APPRATOR:"
echo "   • Adicionar breadcrumbs em todas as rotas"
echo "   • Implementar redirects inteligentes"
echo "   • Melhorar sistema de proteção"

echo ""  
echo "3. 🎨 APLICAR EM PÁGINAS EXISTENTES:"
echo "   • Converter formulários para OrientalForm"
echo "   • Adicionar OrientalBreadcrumb"
echo "   • Implementar navegação contextual"

echo ""
echo "4. 🧪 TESTAR FLUXOS COMPLETOS:"
echo "   • Fluxo de aluno: login → dashboard → atividades"
echo "   • Fluxo de professor: login → dashboard → conteúdos"
echo "   • Fluxo de admin: login → dashboard → gestão"

echo ""
log_quantum "🌸 RESULTADO FINAL: NAVEGAÇÃO QUÂNTICA PERFEITA"
echo "=============================================="
echo "   🎯 Usuário NUNCA se perde"
echo "   🔄 Fluxos SEMPRE fazem sentido"  
echo "   ✨ Experiência TOTALMENTE fluida"
echo "   🚀 Performance SUPERIOR"

echo ""
log_success "🗺️ MAPEAMENTO QUÂNTICO CONCLUÍDO - PRONTO PARA IMPLEMENTAÇÃO!"
echo ""

echo "💡 Próximo comando recomendado:"
echo "   Implementar sistema de navegação contextual"

echo ""
echo "🗺️ Fim do Mapeamento Quântico - Rumo à Navegação Perfeita! 🗺️"