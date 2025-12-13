
import { supabase } from '@/lib/supabase/client';

export type TableStatus = {
    tableName: string;
    exists: boolean;
    count: number | null;
    error?: string;
};

// Lista de tabelas esperadas no sistema
const EXPECTED_TABLES = [
    'profiles',
    'turmas',
    'matriculas',
    'instrumentos', // ou biblioteca_instrumentos dependendo do schema atual
    'repertorio',
    'aulas',
    'gamificacao_niveis',
    'gamificacao_conquistas',
    'gamificacao_desafios'
];

export async function checkDatabaseHealth(): Promise<TableStatus[]> {
    // supabase ja e a instancia
    const results: TableStatus[] = [];

    for (const table of EXPECTED_TABLES) {
        // Tenta fazer um count simples para verificar existência e permissão
        // Usamos 'head: true' para count sem trazer dados, mas se a tabela nao existir da erro 404/PGRST...
        // Na verdade o supa-js retorna error.

        // OBS: 'instrumentos' pode ser 'biblioteca_instrumentos' no schema real.
        // Vou checar nomes alternativos se falhar.

        let currentTable = table;
        // @ts-ignore
        let { count, error } = await (supabase as any).from(currentTable).select('*', { count: 'exact', head: true });

        // Fallback names check
        if (error && table === 'instrumentos') {
            // @ts-ignore
            const retry = await (supabase as any).from('biblioteca_instrumentos').select('*', { count: 'exact', head: true });
            if (!retry.error) {
                currentTable = 'biblioteca_instrumentos';
                count = retry.count;
                error = null;
            }
        }

        if (error) {
            results.push({
                tableName: currentTable,
                exists: false,
                count: null,
                error: error.message
            });
        } else {
            results.push({
                tableName: currentTable,
                exists: true,
                count: count || 0
            });
        }
    }

    return results;
}
