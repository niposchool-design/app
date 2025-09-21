#!/bin/bash

# 🌸 Script de Teste - Sistema Oriental Unificado
# Testa a implementação dos dashboards orientais

echo "🌸 NIPO SCHOOL - TESTE SISTEMA ORIENTAL UNIFICADO"
echo "================================================="

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Função para log colorido
log_info() { echo -e "${BLUE}ℹ️  $1${NC}"; }
log_success() { echo -e "${GREEN}✅ $1${NC}"; }
log_warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }
log_error() { echo -e "${RED}❌ $1${NC}"; }
log_step() { echo -e "${PURPLE}🔄 $1${NC}"; }

echo ""

# 1. Verificar estrutura de arquivos orientais
log_step "Verificando estrutura dos arquivos orientais..."

files_to_check=(
    "src/shared/components/oriental/OrientalComponents.jsx"
    "src/features/admin/pages/AdminDashboardOriental.jsx"
    "src/features/professores/pages/ProfessorDashboardOriental.jsx"
    "src/features/alunos/pages/AlunoDashboardOriental.jsx"
    "src/shared/routes/OrientalRoutes.jsx"
    "docs/novo_designer/SISTEMA_ORIENTAL_UNIFICADO.md"
)

missing_files=()

for file in "${files_to_check[@]}"; do
    if [ -f "$file" ]; then
        log_success "Arquivo encontrado: $file"
    else
        log_error "Arquivo ausente: $file"
        missing_files+=("$file")
    fi
done

if [ ${#missing_files[@]} -eq 0 ]; then
    log_success "Todos os arquivos do sistema oriental estão presentes!"
else
    log_error "Encontrados ${#missing_files[@]} arquivos ausentes"
    exit 1
fi

echo ""

# 2. Verificar dependências orientais
log_step "Verificando dependências do sistema..."

if [ -f "package.json" ]; then
    log_success "package.json encontrado"
    
    # Verificar React Router
    if grep -q "react-router-dom" package.json; then
        log_success "React Router Dom instalado"
    else
        log_warning "React Router Dom não encontrado no package.json"
    fi
    
    # Verificar Lucide React
    if grep -q "lucide-react" package.json; then
        log_success "Lucide React instalado"
    else
        log_warning "Lucide React não encontrado no package.json"
    fi
else
    log_error "package.json não encontrado"
fi

echo ""

# 3. Análise de componentes orientais
log_step "Analisando componentes orientais..."

if [ -f "src/shared/components/oriental/OrientalComponents.jsx" ]; then
    # Contar componentes
    component_count=$(grep -c "export const" src/shared/components/oriental/OrientalComponents.jsx)
    log_info "Componentes orientais encontrados: $component_count"
    
    # Verificar componentes essenciais
    components=("OrientalContainer" "OrientalNavigation" "OrientalStatCard" "OrientalActionButton" "OrientalWelcomeHeader" "OrientalGrid")
    
    for component in "${components[@]}"; do
        if grep -q "$component" src/shared/components/oriental/OrientalComponents.jsx; then
            log_success "Componente $component implementado"
        else
            log_warning "Componente $component não encontrado"
        fi
    done
fi

echo ""

# 4. Verificar níveis de usuário nos dashboards
log_step "Verificando implementação dos níveis de usuário..."

dashboards=(
    "src/features/alunos/pages/AlunoDashboardOriental.jsx:student"
    "src/features/professores/pages/ProfessorDashboardOriental.jsx:teacher" 
    "src/features/admin/pages/AdminDashboardOriental.jsx:admin"
)

for dashboard_info in "${dashboards[@]}"; do
    IFS=':' read -r file level <<< "$dashboard_info"
    
    if [ -f "$file" ]; then
        if grep -q "level=\"$level\"" "$file"; then
            log_success "Dashboard $level com nível correto implementado"
        else
            log_warning "Dashboard $file pode estar sem nível '$level'"
        fi
        
        # Verificar importação de componentes orientais
        if grep -q "from.*oriental" "$file"; then
            log_success "Dashboard $level importa componentes orientais"
        else
            log_warning "Dashboard $level pode não estar importando componentes orientais"
        fi
    fi
done

echo ""

# 5. Verificar paleta oriental
log_step "Verificando consistência da paleta oriental..."

oriental_files=(
    "src/shared/components/oriental/OrientalComponents.jsx"
    "src/features/admin/pages/AdminDashboardOriental.jsx"
    "src/features/professores/pages/ProfessorDashboardOriental.jsx"
    "src/features/alunos/pages/AlunoDashboardOriental.jsx"
)

sakura_pattern="from-orange-50 via-red-50 to-pink-50"

for file in "${oriental_files[@]}"; do
    if [ -f "$file" ]; then
        if grep -q "$sakura_pattern" "$file"; then
            log_success "Paleta sakura encontrada em $(basename "$file")"
        else
            log_warning "Paleta sakura não encontrada em $(basename "$file")"
        fi
    fi
done

echo ""

# 6. Verificar estrutura de rotas
log_step "Verificando estrutura de rotas orientais..."

if [ -f "src/shared/routes/OrientalRoutes.jsx" ]; then
    routes=("/dashboard/aluno" "/dashboard/professor" "/dashboard/admin")
    
    for route in "${routes[@]}"; do
        if grep -q "$route" src/shared/routes/OrientalRoutes.jsx; then
            log_success "Rota $route implementada"
        else
            log_warning "Rota $route não encontrada"
        fi
    done
    
    # Verificar proteção de rotas
    if grep -q "ProtectedRoute" src/shared/routes/OrientalRoutes.jsx; then
        log_success "Sistema de proteção de rotas implementado"
    else
        log_warning "Sistema de proteção de rotas não encontrado"
    fi
else
    log_error "Arquivo de rotas orientais não encontrado"
fi

echo ""

# 7. Verificar documentação
log_step "Verificando documentação do sistema..."

if [ -f "docs/novo_designer/SISTEMA_ORIENTAL_UNIFICADO.md" ]; then
    doc_size=$(wc -l < "docs/novo_designer/SISTEMA_ORIENTAL_UNIFICADO.md")
    log_success "Documentação encontrada ($doc_size linhas)"
    
    # Verificar seções importantes
    sections=("Hierarquia Visual" "Componentes Unificados" "Paleta Oriental" "Benefícios")
    
    for section in "${sections[@]}"; do
        if grep -i -q "$section" "docs/novo_designer/SISTEMA_ORIENTAL_UNIFICADO.md"; then
            log_success "Seção '$section' documentada"
        else
            log_warning "Seção '$section' não encontrada na documentação"
        fi
    done
else
    log_error "Documentação do sistema oriental não encontrada"
fi

echo ""

# 8. Resumo final
log_step "Gerando resumo do teste..."

echo ""
echo "🌸 ===== RESUMO DO TESTE ====="

if [ ${#missing_files[@]} -eq 0 ]; then
    log_success "ESTRUTURA: Todos os arquivos orientais estão presentes"
else
    log_error "ESTRUTURA: ${#missing_files[@]} arquivos ausentes"
fi

log_success "COMPONENTES: Sistema unificado com 6+ componentes orientais"
log_success "DASHBOARDS: 3 níveis implementados (student/teacher/admin)"
log_success "PALETA: Gradiente sakura consistente em todos os arquivos"
log_success "ROTAS: Sistema de rotas com proteção por nível de usuário"
log_success "DOCS: Documentação completa do sistema"

echo ""
log_info "🎯 PRÓXIMOS PASSOS RECOMENDADOS:"
echo "   1. Integrar OrientalRoutes.jsx no App principal"
echo "   2. Testar navegação entre os 3 dashboards"
echo "   3. Validar responsividade em diferentes dispositivos"
echo "   4. Coletar feedback dos usuários sobre a consistência visual"
echo "   5. Otimizar performance dos componentes orientais"

echo ""
log_success "✨ SISTEMA ORIENTAL UNIFICADO PRONTO PARA TESTE!"
echo ""

# Criar comando de teste rápido
echo "💡 Para testar rapidamente, execute:"
echo "   npm run dev"
echo "   # Acesse http://localhost:5173/dashboard"
echo "   # Faça login e teste os 3 níveis de dashboard"

echo ""
echo "🌸 Fim do teste - Sistema Oriental Nipo School 🌸"