/**
 * Script de teste de conexão com Supabase
 * Execute: node --env-file=.env.local -r esbuild-register scripts/test-supabase-connection.ts
 * OU: npx tsx scripts/test-supabase-connection.ts
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Carregar .env.local manualmente
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

console.log('🔍 Testando conexão com Supabase...\n');
console.log('📋 Configuração:');
console.log('URL:', SUPABASE_URL || '❌ AUSENTE');
console.log('Key:', SUPABASE_ANON_KEY ? `${SUPABASE_ANON_KEY.substring(0, 30)}...` : '❌ AUSENTE');
console.log('');

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('❌ Variáveis de ambiente não configuradas!');
    console.error('Verifique seu arquivo .env.local');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        persistSession: false,
        autoRefreshToken: false,
    }
});

async function testConnection() {
    try {
        console.log('═══════════════════════════════════════════════════════');
        console.log('1️⃣  TESTE DE SAÚDE GERAL');
        console.log('═══════════════════════════════════════════════════════\n');
        
        // Teste básico de conectividade
        const healthTest = await fetch(`${SUPABASE_URL}/rest/v1/`, {
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
            }
        });
        
        console.log('Status HTTP:', healthTest.status);
        console.log('Conectividade:', healthTest.ok ? '✅ OK' : '❌ FALHOU');
        console.log('');

        console.log('═══════════════════════════════════════════════════════');
        console.log('2️⃣  LISTANDO TODAS AS TABELAS DISPONÍVEIS');
        console.log('═══════════════════════════════════════════════════════\n');
        
        const tables = [
            'profiles',
            'turmas', 
            'aulas',
            'biblioteca_instrumentos',
            'repertorio',
            'matriculas',
            'instrumento_aluno'
        ];
        
        for (const table of tables) {
            const { count, error } = await supabase
                .from(table)
                .select('*', { count: 'exact', head: true });
            
            if (error) {
                console.log(`❌ ${table.padEnd(25)} | Erro: ${error.message || error.code || 'desconhecido'}`);
                if (error.code) console.log(`   Código: ${error.code}`);
                if (error.details) console.log(`   Detalhes: ${error.details}`);
                if (error.hint) console.log(`   Dica: ${error.hint}`);
            } else {
                console.log(`✅ ${table.padEnd(25)} | ${count || 0} registros`);
            }
        }
        console.log('');

        console.log('═══════════════════════════════════════════════════════');
        console.log('3️⃣  TESTE DETALHADO: TABELA PROFILES');
        console.log('═══════════════════════════════════════════════════════\n');
        
        console.log('Tentando SELECT COUNT...');
        const { count, error: countError } = await supabase
            .from('profiles')
            .select('*', { count: 'exact', head: true });

        if (countError) {
            console.log('❌ Erro no COUNT:');
            console.log('   Mensagem:', countError.message || 'N/A');
            console.log('   Código:', countError.code || 'N/A');
            console.log('   Detalhes:', countError.details || 'N/A');
            console.log('   Hint:', countError.hint || 'N/A');
            console.log('   JSON:', JSON.stringify(countError, null, 2));
            console.log('');
            console.log('⚠️  A tabela profiles provavelmente NÃO EXISTE!');
            console.log('');
            console.log('📝 SOLUÇÃO:');
            console.log('   1. Acesse: https://app.supabase.com');
            console.log('   2. Vá em SQL Editor');
            console.log('   3. Execute: sql_scripts/FIX_PROFILES_TABLE.sql');
            console.log('');
            return;
        }

        console.log(`✅ Tabela existe! Total de registros: ${count || 0}`);
        console.log('');

        if ((count || 0) === 0) {
            console.log('⚠️  Tabela está VAZIA! Nenhum perfil cadastrado.');
            console.log('');
            console.log('📝 SOLUÇÃO:');
            console.log('   1. Criar usuário no Supabase Auth');
            console.log('   2. Ou inserir manualmente:');
            console.log('');
            console.log('   INSERT INTO profiles (id, email, full_name, role)');
            console.log('   VALUES (');
            console.log('     gen_random_uuid(),');
            console.log('     \'admin@example.com\',');
            console.log('     \'Admin Teste\',');
            console.log('     \'admin\'');
            console.log('   );');
            console.log('');
            return;
        }

        console.log('Buscando primeiros 3 registros...');
        const { data: profiles, error: selectError } = await supabase
            .from('profiles')
            .select('*')
            .limit(3);

        if (selectError) {
            console.log('❌ Erro no SELECT:');
            console.log('   Mensagem:', selectError.message);
            console.log('   Código:', selectError.code);
            console.log('   Pode ser problema de RLS (Row Level Security)');
            console.log('');
            return;
        }

        console.log(`✅ ${profiles?.length || 0} perfis retornados:`);
        profiles?.forEach((p, i) => {
            console.log(`\n   [${i + 1}]`);
            console.log(`   ID:        ${p.id?.substring(0, 8)}...`);
            console.log(`   Email:     ${p.email || 'N/A'}`);
            console.log(`   Nome:      ${p.full_name || 'N/A'}`);
            console.log(`   Role:      ${p.role || 'N/A'}`);
        });
        console.log('');

        console.log('═══════════════════════════════════════════════════════');
        console.log('4️⃣  TESTE DE FILTRO POR ROLE');
        console.log('═══════════════════════════════════════════════════════\n');

        const roles = ['admin', 'professor', 'aluno'];
        for (const role of roles) {
            const { count, error } = await supabase
                .from('profiles')
                .select('*', { count: 'exact', head: true })
                .eq('role', role);

            if (error) {
                console.log(`❌ ${role.padEnd(10)}: Erro - ${error.message}`);
            } else {
                console.log(`✅ ${role.padEnd(10)}: ${count || 0} registros`);
            }
        }
        console.log('');

        console.log('═══════════════════════════════════════════════════════');
        console.log('🎉  TESTE COMPLETO!');
        console.log('═══════════════════════════════════════════════════════');
        
    } catch (error) {
        console.error('\n💥 EXCEÇÃO INESPERADA:', error);
        if (error instanceof Error) {
            console.error('   Stack:', error.stack);
        }
    }
}

testConnection();
