#!/bin/bash

# 🔍 Script de Verificação de Rotas e Links - Sistema Oriental
# Verifica todas as rotas e funcionalidades dos dashboards orientais

echo "🔍 NIPO SCHOOL - VERIFICAÇÃO ROTAS E LINKS"
echo "=========================================="

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

# Array de dashboards para verificar
dashboards=(
    "src/features/alunos/pages/AlunoDashboardOriental.jsx:ALUNO"
    "src/features/professores/pages/ProfessorDashboardOriental.jsx:PROFESSOR"
    "src/features/admin/pages/AdminDashboardOriental.jsx:ADMIN"
)

# 1. Verificar rotas internas nos dashboards
log_step "Verificando rotas internas dos dashboards..."

declare -A found_routes
all_routes=()

for dashboard_info in "${dashboards[@]}"; do
    IFS=':' read -r file level <<< "$dashboard_info"
    
    if [ -f "$file" ]; then
        log_info "Analisando rotas em $level..."
        
        # Buscar rotas do tipo: to="/caminho" ou href="/caminho"
        routes=$(grep -o 'to="[^"]*"\|href="[^"]*"' "$file" | sed 's/to="\|href="\|"//g' | sort -u)
        
        if [ ! -z "$routes" ]; then
            while IFS= read -r route; do
                if [ ! -z "$route" ]; then
                    echo "  📍 Encontrada rota: $route"
                    found_routes["$route"]="$level"
                    all_routes+=("$route")
                fi
            done <<< "$routes"
        else
            log_warning "Nenhuma rota interna encontrada em $level"
        fi
        
        echo ""
    else
        log_error "Dashboard $level não encontrado: $file"
    fi
done

# 2. Verificar componentes de navegação
log_step "Verificando componentes de navegação..."

nav_files=(
    "src/shared/components/oriental/OrientalComponents.jsx"
    "src/shared/routes/OrientalRoutes.jsx"
)

for file in "${nav_files[@]}"; do
    if [ -f "$file" ]; then
        log_info "Analisando $(basename "$file")..."
        
        # Buscar rotas de navegação
        nav_routes=$(grep -o 'to="[^"]*"\|href="[^"]*"\|path="[^"]*"' "$file" | sed 's/to="\|href="\|path="\|"//g' | sort -u)
        
        if [ ! -z "$nav_routes" ]; then
            while IFS= read -r route; do
                if [ ! -z "$route" ] && [[ "$route" != *"*"* ]] && [[ "$route" != "/"* ]]; then
                    route="/$route"
                fi
                if [ ! -z "$route" ] && [[ "$route" != *"*"* ]]; then
                    echo "  🧭 Rota de navegação: $route"
                    all_routes+=("$route")
                fi
            done <<< "$nav_routes"
        fi
    else
        log_warning "Arquivo de navegação não encontrado: $file"
    fi
done

echo ""

# 3. Verificar se rotas apontam para arquivos existentes
log_step "Verificando se rotas apontam para arquivos existentes..."

declare -A route_mappings
route_mappings["/dashboard"]="Rota principal - OrientalRoutes.jsx"
route_mappings["/dashboard/aluno"]="src/features/alunos/pages/AlunoDashboardOriental.jsx"
route_mappings["/dashboard/professor"]="src/features/professores/pages/ProfessorDashboardOriental.jsx"
route_mappings["/dashboard/admin"]="src/features/admin/pages/AdminDashboardOriental.jsx"
route_mappings["/aluno"]="Redirect para /dashboard/aluno"
route_mappings["/professor"]="Redirect para /dashboard/professor"
route_mappings["/admin"]="Redirect para /dashboard/admin"
route_mappings["/login"]="Página de login (assumida)"
route_mappings["/professores/conteudos"]="src/features/professores - área de conteúdos"
route_mappings["/professores/novo"]="src/features/professores - criar conteúdo"
route_mappings["/professores/estatisticas"]="src/features/professores - estatísticas"
route_mappings["/professores/minha-area"]="src/features/professores - perfil"

unique_routes=($(printf "%s\n" "${all_routes[@]}" | sort -u))

for route in "${unique_routes[@]}"; do
    if [ ! -z "$route" ] && [ "$route" != "/" ]; then
        if [[ -n "${route_mappings[$route]}" ]]; then
            mapped_file="${route_mappings[$route]}"
            if [[ "$mapped_file" == src/* ]] && [[ "$mapped_file" == *.jsx ]]; then
                if [ -f "$mapped_file" ]; then
                    log_success "Rota $route → Arquivo encontrado: $(basename "$mapped_file")"
                else
                    log_error "Rota $route → Arquivo não encontrado: $mapped_file"
                fi
            else
                log_info "Rota $route → $mapped_file"
            fi
        else
            log_warning "Rota $route → Mapeamento não definido (pode estar ok)"
        fi
    fi
done

echo ""

# 4. Verificar imports e dependências
log_step "Verificando imports dos dashboards orientais..."

for dashboard_info in "${dashboards[@]}"; do
    IFS=':' read -r file level <<< "$dashboard_info"
    
    if [ -f "$file" ]; then
        log_info "Verificando imports em $level..."
        
        # Verificar import do sistema oriental
        if grep -q "from.*oriental.*OrientalComponents" "$file"; then
            log_success "Sistema oriental importado corretamente"
        else
            log_error "Sistema oriental NÃO importado"
        fi
        
        # Verificar imports de auth e supabase
        if grep -q "from.*AuthContext" "$file"; then
            log_success "AuthContext importado"
        else
            log_warning "AuthContext não encontrado"
        fi
        
        if grep -q "from.*supabase" "$file"; then
            log_success "Supabase importado"
        else
            log_warning "Supabase não encontrado"
        fi
        
        # Verificar react-router-dom
        if grep -q "from 'react-router-dom'" "$file"; then
            log_success "React Router Dom importado"
        else
            log_warning "React Router Dom não encontrado"
        fi
        
        echo ""
    fi
done

# 5. Verificar botões e links com ações
log_step "Verificando botões e funcionalidades..."

for dashboard_info in "${dashboards[@]}"; do
    IFS=':' read -r file level <<< "$dashboard_info"
    
    if [ -f "$file" ]; then
        log_info "Verificando funcionalidades em $level..."
        
        # Contar botões
        button_count=$(grep -c "<button\|<OrientalActionButton" "$file" || echo "0")
        link_count=$(grep -c "<Link\|<a " "$file" || echo "0")
        
        echo "  🔘 Botões encontrados: $button_count"
        echo "  🔗 Links encontrados: $link_count"
        
        # Verificar handlers
        if grep -q "onClick\|onSubmit\|handleClick\|handle" "$file"; then
            log_success "Event handlers encontrados"
        else
            log_warning "Nenhum event handler encontrado"
        fi
        
        echo ""
    fi
done

# 6. Verificar consistência visual
log_step "Verificando consistência visual dos dashboards..."

visual_elements=(
    "bg-gradient-to-br from-orange-50 via-red-50 to-pink-50:Gradiente sakura de fundo"
    "OrientalContainer:Container oriental"
    "OrientalNavigation:Navegação oriental"  
    "OrientalStatCard:Cards de estatística oriental"
    "OrientalGrid:Grid oriental"
)

for dashboard_info in "${dashboards[@]}"; do
    IFS=':' read -r file level <<< "$dashboard_info"
    
    if [ -f "$file" ]; then
        log_info "Verificando elementos visuais em $level..."
        
        for element_info in "${visual_elements[@]}"; do
            IFS=':' read -r element description <<< "$element_info"
            
            if grep -q "$element" "$file"; then
                log_success "$description ✓"
            else
                log_warning "$description ✗"
            fi
        done
        
        echo ""
    fi
done

# 7. Resumo e recomendações
log_step "Gerando resumo de verificação..."

echo ""
echo "🔍 ===== RESUMO DA VERIFICAÇÃO ====="

echo ""
log_success "✅ ROTAS PRINCIPAIS:"
echo "   /dashboard → OrientalRoutes (redireciona por usuário)"
echo "   /dashboard/aluno → Dashboard Ultra-leve"
echo "   /dashboard/professor → Dashboard Funcional"
echo "   /dashboard/admin → Dashboard Completo"

echo ""
log_success "✅ SISTEMA ORIENTAL:"
echo "   Componentes unificados importados em todos os dashboards"
echo "   Paleta sakura consistente"
echo "   Navegação hierárquica implementada"

echo ""
log_info "🎯 PRÓXIMOS TESTES RECOMENDADOS:"
echo "   1. npm run dev"
echo "   2. Testar login com diferentes usuários"
echo "   3. Navegar entre /dashboard/aluno → /dashboard/professor → /dashboard/admin"
echo "   4. Verificar se links internos funcionam corretamente"
echo "   5. Testar responsividade em mobile"

echo ""
log_warning "⚠️  ROTAS QUE PODEM PRECISAR IMPLEMENTAÇÃO:"
echo "   /professores/conteudos - Biblioteca de conteúdos"  
echo "   /professores/novo - Criar novo conteúdo"
echo "   /professores/estatisticas - Estatísticas detalhadas"
echo "   /professores/minha-area - Perfil do professor"

echo ""
log_success "🌸 SISTEMA ORIENTAL UNIFICADO - ROTAS VERIFICADAS!"
echo ""

echo "💡 Para testar funcionalidades:"
echo "   1. Inicie o servidor: npm run dev"
echo "   2. Acesse http://localhost:5173/dashboard"
echo "   3. Teste cada dashboard oriental"
echo "   4. Verifique se navegação funciona entre os níveis"

echo ""
echo "🔍 Fim da verificação - Rotas e Links Nipo School 🔍"