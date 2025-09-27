// Script SIMPLES para testar no CONSOLE DO NAVEGADOR (F12)
// Execute na página http://localhost:3000

console.log('🔍 ======= TESTE SIMPLES DE CONEXÃO =======');
console.log('📅 Data/Hora:', new Date().toLocaleString('pt-BR'));

// Teste 1: Verificar se conseguimos acessar recursos locais
console.log('\n🧪 TESTE 1: Verificando ambiente...');
console.log('✅ Window disponível:', typeof window !== 'undefined');
console.log('✅ Fetch disponível:', typeof fetch !== 'undefined');

// Teste 2: Tentar conexão direta via fetch sem bibliotecas
console.log('\n🔗 TESTE 2: Tentando conexão direta com Supabase...');

const testarConexaoSimples = async () => {
  try {
    const url = 'https://ywvjccrdvfzgrrqzlxha.supabase.co/rest/v1/profiles';
    const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3dmpjY3JkdmZ6Z3JycXpseGhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU5MTcwNzcsImV4cCI6MjA0MTQ5MzA3N30.iRNWIoKQ4bOm7_FZ93w7HWAhVwGrABR8CpWoSz3Qx_I';
    
    console.log('🔄 Fazendo requisição para:', url);
    
    const response = await fetch(url + '?select=id,email,nome,tipo_usuario&limit=5', {
      method: 'GET',
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('📊 Status da resposta:', response.status);
    console.log('📋 Headers da resposta:', [...response.headers.entries()]);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ SUCESSO! Dados recebidos:');
      console.log('📊 Quantidade:', data.length);
      console.log('📋 Primeiros dados:', data.slice(0, 3));
      
      // Contar por tipo
      const tipos = data.reduce((acc, user) => {
        acc[user.tipo_usuario || 'undefined'] = (acc[user.tipo_usuario || 'undefined'] || 0) + 1;
        return acc;
      }, {});
      console.log('📈 Por tipo:', tipos);
      
      return data;
    } else {
      console.error('❌ Erro HTTP:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('📝 Detalhes:', errorText);
      return null;
    }
    
  } catch (error) {
    console.error('💥 ERRO de rede/conexão:');
    console.error('🔍 Tipo:', error.name);
    console.error('📝 Mensagem:', error.message);
    console.error('📋 Stack:', error.stack);
    
    // Vamos testar se é problema de DNS
    console.log('\n🔍 DIAGNÓSTICO:');
    
    try {
      // Testar resolução DNS
      await fetch('https://httpbin.org/get', { method: 'HEAD' });
      console.log('✅ Internet funciona (httpbin.org acessível)');
    } catch (e) {
      console.log('❌ Problema de internet geral');
    }
    
    try {
      // Testar Supabase básico
      await fetch('https://ywvjccrdvfzgrrqzlxha.supabase.co', { method: 'HEAD' });
      console.log('✅ Supabase hostname resolve');
    } catch (e) {
      console.log('❌ Supabase hostname não resolve:', e.message);
    }
    
    return null;
  }
};

// Teste 3: Verificar se existe contexto Supabase na aplicação
console.log('\n🔍 TESTE 3: Procurando Supabase no contexto da aplicação...');
if (window.supabase) {
  console.log('✅ window.supabase encontrado:', window.supabase);
} else {
  console.log('❌ window.supabase não encontrado');
}

// Verificar se existem módulos carregados
const modules = Object.keys(window).filter(key => key.includes('supabase') || key.includes('Supabase'));
if (modules.length > 0) {
  console.log('🔍 Módulos relacionados ao Supabase:', modules);
} else {
  console.log('❌ Nenhum módulo Supabase encontrado no window');
}

// Executar teste de conexão
console.log('\n🚀 Executando teste de conexão...');
testarConexaoSimples().then(resultado => {
  if (resultado) {
    console.log('\n🎉 SUCESSO! Conseguimos acessar os dados!');
    console.log('💡 A conexão com o Supabase está funcionando');
    console.log('📊 Use este método para acessar mais dados');
  } else {
    console.log('\n❌ FALHA na conexão');
    console.log('💡 Possíveis soluções:');
    console.log('   1. Verificar se o projeto Supabase está ativo');
    console.log('   2. Testar em rede diferente');
    console.log('   3. Verificar firewall/antivirus');
    console.log('   4. Usar VPN se necessário');
  }
});

// Teste 4: Alternativa - tentar usar API local do projeto
console.log('\n🏠 TESTE 4: Tentando acessar dados via API local...');

const testarAPILocal = async () => {
  try {
    // Tentar acessar endpoint local que pode estar usando Supabase
    const response = await fetch('/api/users', { method: 'GET' });
    if (response.ok) {
      const data = await response.json();
      console.log('✅ API local funcionando:', data);
      return data;
    } else {
      console.log('❌ API local não encontrada (normal se não existir)');
    }
  } catch (error) {
    console.log('❌ Sem API local:', error.message);
  }
  return null;
};

testarAPILocal();