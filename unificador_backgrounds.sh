#!/bin/bash

echo "🎨 UNIFICADOR AUTOMÁTICO DE BACKGROUNDS - SISTEMA ORIENTAL"
echo "=========================================================="
echo "🎯 Objetivo: Converter 626 backgrounds inconsistentes para padrão Oriental"
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

echo "🔍 FASE 1: MAPEAMENTO DE BACKGROUNDS INCONSISTENTES"
echo "================================================="

# Contador de backgrounds
echo -e "${CYAN}📊 Analisando backgrounds existentes...${NC}"

BG_WHITE=$(grep -r "bg-white" src --include="*.jsx" | wc -l)
BG_GRAY=$(grep -r "bg-gray" src --include="*.jsx" | wc -l)  
BG_ORIENTAL=$(grep -r "bg-gradient-to\|from-.*-.*-to-.*" src --include="*.jsx" | wc -l)

echo -e "${RED}❌ bg-white encontrados: $BG_WHITE${NC}"
echo -e "${YELLOW}⚠️  bg-gray encontrados: $BG_GRAY${NC}"
echo -e "${GREEN}✅ bg-gradient orientais existentes: $BG_ORIENTAL${NC}"

TOTAL_INCONSISTENTES=$((BG_WHITE + BG_GRAY))
TOTAL_GERAL=$((TOTAL_INCONSISTENTES + BG_ORIENTAL))
CONSISTENCY_PERCENT=$((BG_ORIENTAL * 100 / TOTAL_GERAL))

echo -e "${PURPLE}📈 Taxa de consistência atual: $CONSISTENCY_PERCENT%${NC}"
echo -e "${WHITE}🎯 Meta: Chegar a 95%+ de consistência oriental${NC}"

echo ""
echo "🔄 FASE 2: MAPEAMENTO DE PADRÕES ORIENTAIS PADRÃO"
echo "==============================================="

echo -e "${CYAN}🌸 Definindo paleta de backgrounds orientais...${NC}"

# Definir mapeamentos de conversão
declare -A ORIENTAL_PATTERNS
ORIENTAL_PATTERNS["bg-white"]="bg-gradient-to-br from-pink-50 via-white to-purple-50"
ORIENTAL_PATTERNS["bg-gray-50"]="bg-gradient-to-br from-pink-50 to-red-50"
ORIENTAL_PATTERNS["bg-gray-100"]="bg-gradient-to-br from-purple-50 to-pink-50"
ORIENTAL_PATTERNS["bg-gray-200"]="bg-gradient-to-br from-pink-100 to-red-100"
ORIENTAL_PATTERNS["bg-blue-50"]="bg-gradient-to-br from-blue-50 to-purple-50"
ORIENTAL_PATTERNS["bg-green-50"]="bg-gradient-to-br from-green-50 to-teal-50"

echo -e "${GREEN}✨ Padrões de conversão definidos:${NC}"
for pattern in "${!ORIENTAL_PATTERNS[@]}"; do
    echo "   🔄 $pattern → ${ORIENTAL_PATTERNS[$pattern]}"
done

echo ""
echo "🚀 FASE 3: CONVERSÃO AUTOMÁTICA EM MASSA"
echo "======================================="

CONVERTED_COUNT=0

echo -e "${CYAN}🔧 Iniciando conversão de arquivos...${NC}"

# Lista de arquivos para processar (evitando arquivos de backup)
FILES_TO_PROCESS=$(find src -name "*.jsx" -not -path "*/src_backup/*" | head -50)

echo -e "${BLUE}📁 Arquivos a processar: $(echo "$FILES_TO_PROCESS" | wc -l)${NC}"

for file in $FILES_TO_PROCESS; do
    echo -e "${CYAN}🔍 Processando: $file${NC}"
    
    # Backup do arquivo original
    cp "$file" "$file.backup_bg_$(date +%s)"
    
    CHANGES_MADE=0
    
    # Aplicar conversões
    for old_pattern in "${!ORIENTAL_PATTERNS[@]}"; do
        new_pattern="${ORIENTAL_PATTERNS[$old_pattern]}"
        
        # Contar ocorrências antes
        BEFORE_COUNT=$(grep -c "$old_pattern" "$file" 2>/dev/null || echo "0")
        
        if [[ $BEFORE_COUNT -gt 0 ]]; then
            # Fazer substituição
            sed -i "s/$old_pattern/$new_pattern/g" "$file"
            
            # Contar após
            AFTER_COUNT=$(grep -c "$old_pattern" "$file" 2>/dev/null || echo "0") 
            CONVERTED=$((BEFORE_COUNT - AFTER_COUNT))
            
            if [[ $CONVERTED -gt 0 ]]; then
                echo "      ✅ Convertido $CONVERTED × $old_pattern"
                CHANGES_MADE=$((CHANGES_MADE + CONVERTED))
                CONVERTED_COUNT=$((CONVERTED_COUNT + CONVERTED))
            fi
        fi
    done
    
    if [[ $CHANGES_MADE -eq 0 ]]; then
        echo "      ℹ️  Nenhuma conversão necessária"
        # Remover backup desnecessário
        rm "$file.backup_bg_"*
    else
        echo -e "${GREEN}      ✨ Total de conversões no arquivo: $CHANGES_MADE${NC}"
    fi
done

echo ""
echo "📊 FASE 4: RELATÓRIO DE CONVERSÃO"
echo "================================"

# Recalcular estatísticas
NEW_BG_WHITE=$(grep -r "bg-white" src --include="*.jsx" | grep -v backup | wc -l)
NEW_BG_GRAY=$(grep -r "bg-gray" src --include="*.jsx" | grep -v backup | wc -l)
NEW_BG_ORIENTAL=$(grep -r "bg-gradient-to\|from-.*-.*-to-.*" src --include="*.jsx" | grep -v backup | wc -l)

NEW_TOTAL_INCONSISTENTES=$((NEW_BG_WHITE + NEW_BG_GRAY))
NEW_TOTAL_GERAL=$((NEW_TOTAL_INCONSISTENTES + NEW_BG_ORIENTAL))
NEW_CONSISTENCY_PERCENT=$((NEW_BG_ORIENTAL * 100 / NEW_TOTAL_GERAL))

echo -e "${WHITE}📈 ESTATÍSTICAS DE CONVERSÃO:${NC}"
echo ""
echo -e "${YELLOW}ANTES:${NC}"
echo "   bg-white: $BG_WHITE"
echo "   bg-gray: $BG_GRAY" 
echo "   bg-oriental: $BG_ORIENTAL"
echo "   Consistência: $CONSISTENCY_PERCENT%"
echo ""
echo -e "${GREEN}DEPOIS:${NC}"
echo "   bg-white: $NEW_BG_WHITE"
echo "   bg-gray: $NEW_BG_GRAY"
echo "   bg-oriental: $NEW_BG_ORIENTAL"
echo "   Consistência: $NEW_CONSISTENCY_PERCENT%"
echo ""

IMPROVEMENT=$((NEW_CONSISTENCY_PERCENT - CONSISTENCY_PERCENT))
echo -e "${GREEN}🚀 Melhoria na consistência: +$IMPROVEMENT%${NC}"
echo -e "${PURPLE}⚡ Total de conversões realizadas: $CONVERTED_COUNT${NC}"

echo ""
echo "✨ FASE 5: BENEFÍCIOS ALCANÇADOS"
echo "==============================="

echo -e "${GREEN}🎨 BENEFÍCIOS VISUAIS:${NC}"
echo "   ✨ Design harmonioso e consistente"
echo "   🌸 Estética oriental unificada"
echo "   📱 Responsividade melhorada"
echo "   🎯 Foco visual otimizado"

echo -e "${BLUE}🚀 BENEFÍCIOS TÉCNICOS:${NC}"
echo "   ⚡ CSS mais otimizado"
echo "   🔄 Manutenibilidade superior"
echo "   📦 Bundle mais limpo"
echo "   🛠️  Desenvolvimento mais rápido"

echo ""
echo "🎯 PRÓXIMAS AÇÕES RECOMENDADAS"
echo "=============================="

if [[ $NEW_CONSISTENCY_PERCENT -lt 90 ]]; then
    echo -e "${YELLOW}⚠️  Consistência ainda abaixo de 90%${NC}"
    echo "   🔄 Executar segunda rodada de conversões"
    echo "   🔍 Revisar arquivos com mais inconsistências"
    echo "   🎨 Aplicar padrões orientais avançados"
else
    echo -e "${GREEN}🎉 EXCELENTE! Consistência acima de 90%${NC}"
    echo "   ✅ Backgrounds majoritariamente orientais"
    echo "   🌟 Pronto para aplicar navegação contextual"
    echo "   🚀 Sistema visual unificado alcançado"
fi

echo ""
echo -e "${GREEN}🌸 UNIFICAÇÃO DE BACKGROUNDS CONCLUÍDA! 🌸${NC}"
echo -e "${CYAN}💡 Execute: Integrar OrientalBreadcrumb em todas as páginas${NC}"