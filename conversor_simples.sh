#!/bin/bash

echo "🎨 CONVERSOR SIMPLES DE BACKGROUNDS V2"
echo "======================================"

# Arquivo de teste para verificação
TEST_FILE="src/features/admin/pages/AdminDashboard.jsx"

if [[ -f "$TEST_FILE" ]]; then
    echo "📁 Processando arquivo de teste: $TEST_FILE"
    
    # Backup
    cp "$TEST_FILE" "${TEST_FILE}.backup_$(date +%s)"
    
    # Conversões diretas mais seguras
    sed -i 's/bg-white/bg-gradient-to-br from-pink-50 via-white to-purple-50/g' "$TEST_FILE"
    sed -i 's/bg-gray-50/bg-gradient-to-br from-pink-50 to-red-50/g' "$TEST_FILE"
    
    echo "✅ Conversões aplicadas em $TEST_FILE"
    
    # Verificar resultado
    ORIENTAL_COUNT=$(grep -c "bg-gradient-to-br" "$TEST_FILE" || echo "0")
    echo "🌸 Backgrounds orientais no arquivo: $ORIENTAL_COUNT"
else
    echo "❌ Arquivo de teste não encontrado: $TEST_FILE"
fi

echo ""
echo "🎯 Para aplicar em todos os arquivos, execute:"
echo "   find src -name '*.jsx' -exec sed -i 's/bg-white/bg-gradient-to-br from-pink-50 via-white to-purple-50/g' {} \;"