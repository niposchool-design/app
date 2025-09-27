// 🔧 TESTE CONECTIVIDADE - Execute no CONSOLE DO NAVEGADOR
// na página http://localhost:3000/admin/professores ou /admin/alunos

console.log('🔧 ======= TESTE CONECTIVIDADE ADMIN =======');

// Teste 1: Verificar se o Supabase está disponível
console.log('🧪 TESTE 1: Verificando cliente Supabase...');
if (typeof window !== 'undefined' && window.supabase) {
    console.log('✅ Cliente Supabase encontrado no window');
    console.log('📡 URL:', window.supabase.supabaseUrl);
} else {
    console.log('❌ Cliente Supabase não encontrado no window');
}

// Teste 2: Importar diretamente se necessário
const testarConexaoAdmin = async () => {
    try {
        console.log('🧪 TESTE 2: Importando módulo Supabase...');
        
        // Simular a importação como fazem as páginas admin
        const { createClient } = await import('@supabase/supabase-js');
        const supabaseUrl = 'https://eehidnwlwrzqzgytbfsd.supabase.co';
        const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVlaGlkbndsd3J6cXpneXRiZnNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyMzA1MjQsImV4cCI6MjA2MzgwNjUyNH0.SawTk_G0H8CYFEQ7h62Wsv35uNqZz0Q5rsLNT5wCcUM';
        
        const supabaseClient = createClient(supabaseUrl, supabaseKey);
        
        console.log('✅ Cliente Supabase criado com sucesso');
        
        // Teste 3: Testar conectividade
        console.log('🧪 TESTE 3: Testando conectividade...');
        
        const { data, error, count } = await supabaseClient
            .from('profiles')
            .select('*', { count: 'exact', head: true });
            
        if (error) {
            console.error('❌ Erro na conectividade:', error);
            return false;
        }
        
        console.log('✅ Conectividade OK - Total registros:', count);
        
        // Teste 4: Buscar professores
        console.log('🧪 TESTE 4: Buscando professores...');
        const { data: professores, error: profError } = await supabaseClient
            .from('profiles')
            .select('*')
            .eq('tipo_usuario', 'professor');
            
        if (profError) {
            console.error('❌ Erro ao buscar professores:', profError);
        } else {
            console.log('👨‍🏫 Professores encontrados:', professores?.length || 0);
            console.log('📋 Dados:', professores);
        }
        
        // Teste 5: Buscar alunos
        console.log('🧪 TESTE 5: Buscando alunos...');
        const { data: alunos, error: alunosError } = await supabaseClient
            .from('profiles')
            .select('*')
            .eq('tipo_usuario', 'aluno');
            
        if (alunosError) {
            console.error('❌ Erro ao buscar alunos:', alunosError);
        } else {
            console.log('🎓 Alunos encontrados:', alunos?.length || 0);
            console.log('📋 Dados:', alunos);
        }
        
        return true;
        
    } catch (err) {
        console.error('💥 Erro geral:', err);
        return false;
    }
};

// Executar teste
testarConexaoAdmin().then(sucesso => {
    console.log('🎯 ======= RESULTADO FINAL =======');
    if (sucesso) {
        console.log('✅ Conectividade funcionando - problema pode estar nas páginas');
    } else {
        console.log('❌ Problema de conectividade detectado');
    }
});

console.log('💡 Execute: testarConexaoAdmin() para repetir o teste');