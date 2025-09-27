// 🔧 TESTE CORREÇÃO - Execute no CONSOLE DO NAVEGADOR
// na página http://localhost:3000/admin/alunos

console.log('🔧 ======= TESTE CORREÇÃO .not() =======');

// Teste do método .not() que estava causando erro
const testarMetodoNot = async () => {
    try {
        console.log('🧪 Testando método .not() corrigido...');
        
        // Simular a consulta que estava falhando
        const { data, error } = await window.supabase
            .from('profiles')
            .select('tipo_usuario')
            .not('tipo_usuario', 'is', null);
            
        if (error) {
            console.error('❌ Ainda há erro:', error);
            return false;
        }
        
        console.log('✅ Método .not() funcionando!');
        console.log('📊 Dados encontrados:', data);
        console.log('📈 Quantidade:', data?.length || 0);
        
        // Contar tipos
        const tipos = data?.reduce((acc, item) => {
            acc[item.tipo_usuario] = (acc[item.tipo_usuario] || 0) + 1;
            return acc;
        }, {});
        
        console.log('🎯 Contagem por tipo:', tipos);
        return true;
        
    } catch (error) {
        console.error('💥 Erro no teste:', error);
        return false;
    }
};

// Executar teste
testarMetodoNot().then(sucesso => {
    console.log('🎯 ======= RESULTADO =======');
    if (sucesso) {
        console.log('✅ CORREÇÃO APLICADA COM SUCESSO!');
        console.log('💡 A página admin/alunos deve funcionar agora');
        console.log('🔄 Recarregue a página se ainda houver erro');
    } else {
        console.log('❌ Ainda há problemas - verifique console');
    }
});

console.log('💡 Execute: testarMetodoNot() para repetir o teste');