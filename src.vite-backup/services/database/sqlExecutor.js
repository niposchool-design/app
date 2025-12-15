/**
 * 🛠️ SERVIÇO DE EXECUÇÃO SQL - NIPO SCHOOL
 *
 * Utilitários para gerenciar dados no Supabase e testar funcionalidades
 */
import { supabase } from '../../lib/supabase/client';
/**
 * Verifica se as tabelas principais existem através de consultas diretas
 */
export async function checkTablesExist() {
    const tablesToCheck = [
        'profiles',
        'categorias_instrumentos',
        'biblioteca_instrumentos',
        'turmas',
        'matriculas'
    ];
    const results = {};
    let successCount = 0;
    try {
        for (const table of tablesToCheck) {
            try {
                // Tenta fazer uma consulta simples para verificar se a tabela existe
                const { error } = await supabase
                    .from(table)
                    .select('count')
                    .limit(1);
                results[table] = !error;
                if (!error)
                    successCount++;
            }
            catch (err) {
                results[table] = false;
            }
        }
        return {
            success: successCount === tablesToCheck.length,
            message: `${successCount}/${tablesToCheck.length} tabelas encontradas`,
            data: results
        };
    }
    catch (error) {
        return {
            success: false,
            message: 'Erro ao verificar tabelas',
            error: String(error)
        };
    }
}
/**
 * Verifica se há dados nas tabelas principais
 */
export async function checkDataExists() {
    const tablesToCheck = [
        'categorias_instrumentos',
        'instrumentos' // Usando o nome correto da tabela
    ];
    const results = {};
    let totalRecords = 0;
    let errors = [];
    try {
        for (const table of tablesToCheck) {
            try {
                const { count, error } = await supabase
                    .from(table)
                    .select('*', { count: 'exact', head: true });
                if (error) {
                    errors.push(`${table}: ${error.message}`);
                    results[table] = 0;
                }
                else {
                    results[table] = count || 0;
                    totalRecords += count || 0;
                }
            }
            catch (err) {
                errors.push(`${table}: ${String(err)}`);
                results[table] = 0;
            }
        }
        return {
            success: errors.length === 0,
            message: errors.length === 0
                ? `${totalRecords} registros encontrados`
                : `Erros: ${errors.join(', ')}`,
            data: results,
            error: errors.length > 0 ? errors.join('; ') : undefined
        };
    }
    catch (error) {
        return {
            success: false,
            message: 'Erro ao verificar dados',
            error: String(error)
        };
    }
}
/**
 * Cria categorias de instrumentos básicas
 */
export async function createBasicCategories() {
    const startTime = Date.now();
    try {
        const { data, error } = await supabase
            .from('categorias_instrumentos')
            .upsert([
            {
                nome: 'Cordas',
                descricao: 'Instrumentos de corda tradicionais e modernos',
                icone: 'Music',
                ordem_exibicao: 1
            },
            {
                nome: 'Percussão',
                descricao: 'Instrumentos de percussão japoneses e ocidentais',
                icone: 'Drum',
                ordem_exibicao: 2
            },
            {
                nome: 'Sopro',
                descricao: 'Instrumentos de sopro e flautas',
                icone: 'Wind',
                ordem_exibicao: 3
            },
            {
                nome: 'Tradicionais',
                descricao: 'Instrumentos exclusivamente japoneses',
                icone: 'Cherry',
                ordem_exibicao: 4
            }
        ], {
            onConflict: 'nome'
        })
            .select();
        const duration = Date.now() - startTime;
        if (error) {
            return {
                success: false,
                message: `Erro ao criar categorias: ${error.message}`,
                error: error.message,
                duration
            };
        }
        return {
            success: true,
            message: `${data?.length || 0} categorias criadas/atualizadas`,
            data,
            duration
        };
    }
    catch (error) {
        const duration = Date.now() - startTime;
        return {
            success: false,
            message: `Falha ao criar categorias: ${error}`,
            error: String(error),
            duration
        };
    }
}
/**
 * Cria instrumentos básicos
 */
export async function createBasicInstruments() {
    const startTime = Date.now();
    try {
        // Primeiro buscar IDs das categorias
        const { data: categorias, error: categoriasError } = await supabase
            .from('categorias_instrumentos')
            .select('id, nome');
        if (categoriasError) {
            return {
                success: false,
                message: `Erro ao buscar categorias: ${categoriasError.message}`,
                error: categoriasError.message
            };
        }
        if (!categorias || categorias.length === 0) {
            return {
                success: false,
                message: 'Nenhuma categoria encontrada. Crie categorias primeiro.',
                error: 'No categories found'
            };
        }
        // Criar mapa de categorias
        const catMap = categorias.reduce((acc, cat) => {
            acc[cat.nome] = cat.id;
            return acc;
        }, {});
        // Instrumentos básicos - ajustados para o schema atual
        const instrumentos = [
            {
                nome: 'Shamisen',
                categoria: catMap['Tradicionais'] || 'Tradicionais',
                descricao: 'Instrumento de três cordas tradicional japonês do século XVI.',
                nivel_dificuldade: 'intermediario'
            },
            {
                nome: 'Violão Clássico',
                categoria: catMap['Cordas'] || 'Cordas',
                descricao: 'Instrumento de cordas beliscadas, evolução da guitarra barroca.',
                nivel_dificuldade: 'iniciante'
            },
            {
                nome: 'Taiko',
                categoria: catMap['Tradicionais'] || 'Tradicionais',
                descricao: 'Tambores tradicionais japoneses com mais de 1.400 anos de história.',
                nivel_dificuldade: 'intermediario'
            }
        ];
        const { data, error } = await supabase
            .from('instrumentos')
            .upsert(instrumentos, {
            onConflict: 'nome'
        })
            .select();
        const duration = Date.now() - startTime;
        if (error) {
            return {
                success: false,
                message: `Erro ao criar instrumentos: ${error.message}`,
                error: error.message,
                duration
            };
        }
        return {
            success: true,
            message: `${data?.length || 0} instrumentos criados/atualizados`,
            data,
            duration
        };
    }
    catch (error) {
        const duration = Date.now() - startTime;
        return {
            success: false,
            message: `Falha ao criar instrumentos: ${error}`,
            error: String(error),
            duration
        };
    }
}
/**
 * Setup básico do banco (sem SQL direto)
 */
export async function setupBasicDatabase() {
    console.log('🌸 Iniciando setup básico do banco Nipo School...');
    const results = [];
    // 1. Verificar tabelas
    console.log('📋 Verificando tabelas...');
    const tablesResult = await checkTablesExist();
    results.push(tablesResult);
    if (!tablesResult.success) {
        console.log('❌ Tabelas não encontradas. Verifique se o schema foi criado no Supabase.');
        return results;
    }
    // 2. Criar categorias
    console.log('🎯 Criando categorias básicas...');
    const categoriesResult = await createBasicCategories();
    results.push(categoriesResult);
    // 3. Criar instrumentos
    console.log('🎵 Criando instrumentos básicos...');
    const instrumentsResult = await createBasicInstruments();
    results.push(instrumentsResult);
    // 4. Verificar dados
    console.log('📊 Verificando dados criados...');
    const dataResult = await checkDataExists();
    results.push(dataResult);
    console.log('🎊 Setup básico finalizado!');
    return results;
}
/**
 * Limpa dados de teste (cuidado!)
 */
export async function clearTestData() {
    try {
        const { error: instrError } = await supabase
            .from('instrumentos')
            .delete()
            .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all
        const { error: catError } = await supabase
            .from('categorias_instrumentos')
            .delete()
            .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all
        if (instrError || catError) {
            return {
                success: false,
                message: 'Erro ao limpar dados',
                error: (instrError?.message || catError?.message)
            };
        }
        return {
            success: true,
            message: 'Dados de teste removidos com sucesso'
        };
    }
    catch (error) {
        return {
            success: false,
            message: 'Falha ao limpar dados',
            error: String(error)
        };
    }
}
export default {
    checkTablesExist,
    checkDataExists,
    createBasicCategories,
    createBasicInstruments,
    setupBasicDatabase,
    clearTestData
};
