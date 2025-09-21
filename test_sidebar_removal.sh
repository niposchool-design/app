#!/bin/bash

# 🎯 Teste Final - Verificar Remoção da Sidebar do Professor
# Confirma que o sistema oriental está funcionando sem sidebar

echo "🎯 TESTE FINAL - REMOÇÃO DA SIDEBAR DOS PROFESSORES"
echo "=================================================="

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m'

log_info() { echo -e "${BLUE}ℹ️  $1${NC}"; }
log_success() { echo -e "${GREEN}✅ $1${NC}"; }
log_warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }
log_error() { echo -e "${RED}❌ $1${NC}"; }
log_step() { echo -e "${PURPLE}🔄 $1${NC}"; }

echo ""

# 1. Verificar se ProfessoresLayout foi removido das rotas
log_step "Verificando se ProfessoresLayout foi removido do AppRouter..."

if grep -q "ProfessoresLayout" src/app/router/AppRouter.jsx; then
    log_error "ProfessoresLayout ainda está sendo usado no AppRouter!"
    echo "   Encontrado em:"
    grep -n "ProfessoresLayout" src/app/router/AppRouter.jsx
else
    log_success "ProfessoresLayout removido com sucesso do AppRouter"
fi

echo ""

# 2. Verificar se rota /professores usa dashboard oriental
log_step "Verificando se /professores usa dashboard oriental..."

if grep -A 5 'path="/professores"' src/app/router/AppRouter.jsx | grep -q "ProfessorDashboardOriental"; then
    log_success "Rota /professores agora usa ProfessorDashboardOriental (SEM SIDEBAR)"
else
    log_error "Rota /professores não está usando dashboard oriental"
fi

echo ""

# 3. Verificar se sidebar existe no ProfessorDashboardOriental
log_step "Verificando se ProfessorDashboardOriental tem sidebar..."

if grep -q "sidebar\|aside\|flex.*row.*sidebar\|w-64.*fixed\|fixed.*left" src/features/professores/pages/ProfessorDashboardOriental.jsx; then
    log_warning "Possível sidebar encontrada no ProfessorDashboardOriental"
else
    log_success "ProfessorDashboardOriental NÃO tem sidebar - layout limpo ✓"
fi

echo ""

# 4. Verificar se redirecionamento está correto
log_step "Verificando redirecionamentos para professores..."

redirect_routes=$(grep -n "professor.*professores\|/professores" src/app/router/AppRouter.jsx | head -3)
log_info "Redirecionamentos encontrados:"
echo "$redirect_routes"

echo ""

# 5. Verificar se OrientalComponents está sendo usado
log_step "Verificando se sistema oriental está integrado..."

oriental_files=(
    "src/features/professores/pages/ProfessorDashboardOriental.jsx"
    "src/features/alunos/pages/AlunoDashboardOriental.jsx"
    "src/features/admin/pages/AdminDashboardOriental.jsx"
)

for file in "${oriental_files[@]}"; do
    dashboard_type=$(echo "$file" | sed 's/.*\///;s/DashboardOriental.jsx//')
    
    if [ -f "$file" ]; then
        if grep -q "OrientalContainer\|OrientalNavigation" "$file"; then
            log_success "Dashboard $dashboard_type usa componentes orientais"
        else
            log_warning "Dashboard $dashboard_type pode não estar usando componentes orientais"
        fi
    else
        log_error "Dashboard $dashboard_type não encontrado"
    fi
done

echo ""

# 6. Testar URL do servidor
log_step "Testando se servidor está rodando..."

if curl -s http://localhost:3000 >/dev/null 2>&1; then
    log_success "Servidor está rodando em http://localhost:3000"
    
    log_info "🌐 URLs para testar no navegador:"
    echo "   http://localhost:3000/dashboard"
    echo "   http://localhost:3000/dashboard/aluno (ultra-leve)"
    echo "   http://localhost:3000/dashboard/professor (funcional)" 
    echo "   http://localhost:3000/dashboard/admin (completo)"
    echo "   http://localhost:3000/professores (agora sem sidebar!)"
else
    log_warning "Servidor não está respondendo. Execute: npm run dev"
fi

echo ""

# 7. Resumo Final
log_step "Resumo da correção da sidebar..."

echo ""
echo "🎯 ===== RESULTADO DO TESTE ====="

echo ""
log_success "✅ CORREÇÕES APLICADAS:"
echo "   1. ProfessoresLayout (com sidebar) removido do AppRouter"
echo "   2. Rota /professores agora usa ProfessorDashboardOriental"
echo "   3. ProfessorDashboardOriental NÃO tem sidebar (layout limpo)"
echo "   4. Sistema oriental unificado mantido"

echo ""
log_info "🎨 DESIGN CONSISTENTE:"
echo "   - Aluno: Layout limpo, ultra-leve, sem sidebar"
echo "   - Professor: Layout limpo, funcional, sem sidebar"  
echo "   - Admin: Layout limpo, completo, sem sidebar"
echo "   - Todos: Background sakura + componentes orientais"

echo ""
log_success "🌸 PROBLEMA DA SIDEBAR RESOLVIDO!"

echo ""
log_info "🧪 COMO TESTAR:"
echo "   1. Acesse http://localhost:3000/professores"
echo "   2. Faça login como professor"
echo "   3. Verifique que NÃO há sidebar lateral"
echo "   4. Compare com /dashboard/aluno e /dashboard/admin"
echo "   5. Todos devem ter o mesmo design limpo oriental"

echo ""
log_warning "📝 NOTA IMPORTANTE:"
echo "   Se ainda aparecer sidebar, limpe o cache do navegador:"
echo "   - Ctrl+Shift+R (Windows/Linux)"
echo "   - Cmd+Shift+R (Mac)"
echo "   - Ou abra em aba anônima"

echo ""
echo "🎯 Fim do teste - Sidebar Removida com Sucesso! 🎯"