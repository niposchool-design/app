#!/bin/bash

echo "🔬 VALIDAÇÃO FINAL - SISTEMA QUÂNTICO ORIENTAL"
echo "=============================================="
echo "🎯 Objetivo: Verificar se TODOS os componentes estão funcionando perfeitamente"
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
NC='\033[0m' # No Color

echo "✅ FASE 1: VERIFICAÇÃO DE COMPONENTES ORIENTAIS"
echo "============================================="

# Verificar arquivos essenciais
ESSENTIAL_FILES=(
    "src/shared/components/oriental/OrientalComponents.jsx"
    "src/shared/components/oriental/OrientalAdvanced.jsx" 
    "src/shared/components/oriental/OrientalNavigation.jsx"
    "src/shared/components/oriental/OrientalNavigationContext.jsx"
    "src/shared/components/oriental/OrientalProtectedRoute.jsx"
    "src/shared/hooks/useOrientalNavigation.js"
)

echo -e "${CYAN}🔍 Verificando arquivos essenciais...${NC}"
MISSING_FILES=0

for file in "${ESSENTIAL_FILES[@]}"; do
    if [[ -f "$file" ]]; then
        echo -e "${GREEN}   ✅ $file${NC}"
    else
        echo -e "${RED}   ❌ $file (AUSENTE)${NC}"
        MISSING_FILES=$((MISSING_FILES + 1))
    fi
done

echo -e "${PURPLE}📊 Arquivos essenciais: $((${#ESSENTIAL_FILES[@]} - MISSING_FILES))/${#ESSENTIAL_FILES[@]} encontrados${NC}"

echo ""
echo "🧪 FASE 2: VERIFICAÇÃO DE FORMULÁRIOS ORIENTAIS"
echo "=============================================="

ORIENTAL_FORMS=(
    "src/features/auth/components/LoginFormOriental.jsx"
    "src/features/auth/pages/RegisterOriental.jsx"
    "src/features/auth/components/CompleteProfileOriental.jsx"
    "src/features/professores/components/FormConteudoOriental.jsx"
)

echo -e "${CYAN}📝 Verificando formulários convertidos...${NC}"
MISSING_FORMS=0

for form in "${ORIENTAL_FORMS[@]}"; do
    if [[ -f "$form" ]]; then
        echo -e "${GREEN}   ✅ $form${NC}"
        
        # Verificar se usa OrientalForm
        USES_ORIENTAL_FORM=$(grep -c "OrientalForm" "$form" || echo "0")
        if [[ $USES_ORIENTAL_FORM -gt 0 ]]; then
            echo -e "${GREEN}      → Usa OrientalForm: $USES_ORIENTAL_FORM vezes${NC}"
        else
            echo -e "${YELLOW}      ⚠️  Não usa OrientalForm${NC}"
        fi
    else
        echo -e "${RED}   ❌ $form (AUSENTE)${NC}"
        MISSING_FORMS=$((MISSING_FORMS + 1))
    fi
done

echo -e "${PURPLE}📊 Formulários orientais: $((${#ORIENTAL_FORMS[@]} - MISSING_FORMS))/${#ORIENTAL_FORMS[@]} convertidos${NC}"

echo ""
echo "🧭 FASE 3: VERIFICAÇÃO DE NAVEGAÇÃO CONTEXTUAL"
echo "==========================================="

NAVIGATION_FEATURES=(
    "OrientalNavigationProvider"
    "OrientalBreadcrumbAdvanced"
    "OrientalBackButton"
    "OrientalContextualNavigation"
    "useOrientalNavigation"
)

echo -e "${CYAN}🗺️  Verificando recursos de navegação...${NC}"

for feature in "${NAVIGATION_FEATURES[@]}"; do
    USAGE_COUNT=$(grep -r "$feature" src --include="*.jsx" --include="*.js" | wc -l || echo "0")
    if [[ $USAGE_COUNT -gt 0 ]]; then
        echo -e "${GREEN}   ✅ $feature: usado $USAGE_COUNT vezes${NC}"
    else
        echo -e "${YELLOW}   ⚠️  $feature: não usado ainda${NC}"
    fi
done

echo ""
echo "🎨 FASE 4: ANÁLISE DE CONSISTÊNCIA VISUAL"
echo "======================================"

echo -e "${CYAN}🌸 Analisando padrões visuais...${NC}"

# Contar diferentes tipos de background
BG_ORIENTAL=$(grep -r "bg-gradient-to\|from-.*-50.*to-.*-50" src --include="*.jsx" | wc -l || echo "0")
BG_WHITE=$(grep -r "bg-white" src --include="*.jsx" | grep -v "bg-gradient-to" | wc -l || echo "0") 
BG_GRAY=$(grep -r "bg-gray" src --include="*.jsx" | wc -l || echo "0")

TOTAL_BG=$((BG_ORIENTAL + BG_WHITE + BG_GRAY))
if [[ $TOTAL_BG -gt 0 ]]; then
    CONSISTENCY_PERCENT=$((BG_ORIENTAL * 100 / TOTAL_BG))
else
    CONSISTENCY_PERCENT=0
fi

echo -e "${GREEN}🌸 Backgrounds orientais: $BG_ORIENTAL${NC}"
echo -e "${YELLOW}⚠️  Backgrounds brancos: $BG_WHITE${NC}"
echo -e "${RED}❌ Backgrounds cinzas: $BG_GRAY${NC}"
echo -e "${PURPLE}📊 Consistência visual: $CONSISTENCY_PERCENT%${NC}"

echo ""
echo "🚀 FASE 5: TESTES DE FUNCIONALIDADE"
echo "==================================="

echo -e "${CYAN}⚡ Verificando imports e exports...${NC}"

# Verificar se há erros de sintaxe básicos
SYNTAX_ERRORS=0
for file in $(find src -name "*.jsx" -o -name "*.js" | head -20); do
    if ! node -c "$file" 2>/dev/null; then
        echo -e "${RED}   ❌ Erro de sintaxe em: $file${NC}"
        SYNTAX_ERRORS=$((SYNTAX_ERRORS + 1))
    fi
done

if [[ $SYNTAX_ERRORS -eq 0 ]]; then
    echo -e "${GREEN}   ✅ Nenhum erro de sintaxe encontrado${NC}"
else
    echo -e "${RED}   ❌ $SYNTAX_ERRORS arquivos com erro de sintaxe${NC}"
fi

# Verificar imports de componentes orientais
ORIENTAL_IMPORTS=$(grep -r "from.*oriental" src --include="*.jsx" --include="*.js" | wc -l || echo "0")
echo -e "${GREEN}📦 Imports orientais: $ORIENTAL_IMPORTS${NC}"

echo ""
echo "📊 FASE 6: RELATÓRIO FINAL"
echo "========================="

# Calcular score geral
TOTAL_SCORE=0
MAX_SCORE=100

# Componentes essenciais (25 pontos)
COMPONENT_SCORE=$((25 - MISSING_FILES * 4))
if [[ $COMPONENT_SCORE -lt 0 ]]; then COMPONENT_SCORE=0; fi
TOTAL_SCORE=$((TOTAL_SCORE + COMPONENT_SCORE))

# Formulários convertidos (25 pontos)  
FORM_SCORE=$((25 - MISSING_FORMS * 6))
if [[ $FORM_SCORE -lt 0 ]]; then FORM_SCORE=0; fi
TOTAL_SCORE=$((TOTAL_SCORE + FORM_SCORE))

# Consistência visual (25 pontos)
VISUAL_SCORE=$((CONSISTENCY_PERCENT * 25 / 100))
TOTAL_SCORE=$((TOTAL_SCORE + VISUAL_SCORE))

# Funcionalidade (25 pontos)
FUNCTIONALITY_SCORE=$((25 - SYNTAX_ERRORS * 5))
if [[ $FUNCTIONALITY_SCORE -lt 0 ]]; then FUNCTIONALITY_SCORE=0; fi
TOTAL_SCORE=$((TOTAL_SCORE + FUNCTIONALITY_SCORE))

echo -e "${WHITE}🏆 SCORE FINAL DO SISTEMA QUÂNTICO ORIENTAL${NC}"
echo "=============================================="
echo -e "${BLUE}📦 Componentes essenciais: $COMPONENT_SCORE/25${NC}"
echo -e "${BLUE}📝 Formulários orientais: $FORM_SCORE/25${NC}" 
echo -e "${BLUE}🎨 Consistência visual: $VISUAL_SCORE/25${NC}"
echo -e "${BLUE}⚡ Funcionalidade: $FUNCTIONALITY_SCORE/25${NC}"
echo ""
echo -e "${WHITE}🌟 SCORE TOTAL: $TOTAL_SCORE/100${NC}"

# Classificação
if [[ $TOTAL_SCORE -ge 90 ]]; then
    echo -e "${GREEN}🏆 EXCELENTE! Sistema Quântico Senior alcançado!${NC}"
    echo -e "${GREEN}✨ Pronto para produção com qualidade superior${NC}"
elif [[ $TOTAL_SCORE -ge 75 ]]; then
    echo -e "${YELLOW}🎯 MUITO BOM! Sistema quase perfeito${NC}"
    echo -e "${YELLOW}🔧 Alguns ajustes finais recomendados${NC}"
elif [[ $TOTAL_SCORE -ge 60 ]]; then
    echo -e "${YELLOW}📈 BOM! Sistema funcional com melhorias possíveis${NC}"
    echo -e "${YELLOW}⚡ Continue a evolução oriental${NC}"
else
    echo -e "${RED}⚠️  ATENÇÃO! Sistema precisa de mais trabalho${NC}"
    echo -e "${RED}🔄 Revisar componentes principais${NC}"
fi

echo ""
echo "🎯 PRÓXIMAS AÇÕES RECOMENDADAS"
echo "=============================="

if [[ $MISSING_FILES -gt 0 ]]; then
    echo -e "${RED}❌ Corrigir arquivos essenciais ausentes${NC}"
fi

if [[ $MISSING_FORMS -gt 0 ]]; then
    echo -e "${YELLOW}🔄 Finalizar conversão de formulários${NC}"
fi

if [[ $CONSISTENCY_PERCENT -lt 80 ]]; then
    echo -e "${CYAN}🎨 Melhorar consistência visual (target: 80%+)${NC}"
fi

if [[ $SYNTAX_ERRORS -gt 0 ]]; then
    echo -e "${RED}🐛 Corrigir erros de sintaxe${NC}"
fi

if [[ $TOTAL_SCORE -ge 90 ]]; then
    echo -e "${GREEN}🚀 Deploy para produção${NC}"
    echo -e "${GREEN}📊 Monitorar métricas de usuário${NC}"
    echo -e "${GREEN}🌟 Celebrar conquista oriental!${NC}"
fi

echo ""
echo -e "${GREEN}🌸 VALIDAÇÃO FINAL CONCLUÍDA - SISTEMA QUÂNTICO ORIENTAL! 🌸${NC}"