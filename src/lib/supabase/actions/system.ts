'use server'

import { createClient } from '@/lib/supabase/server';

export async function checkDatabaseHealth() {
    try {
        const supabase = await createClient();
        const start = Date.now();
        // Tenta buscar 1 registro leve para testar conexão
        const { error, count } = await supabase
            .from('profiles')
            .select('*', { count: 'exact', head: true });

        const latency = Date.now() - start;

        if (error) {
            return { status: 'error', message: error.message, latency };
        }

        return { status: 'ok', message: `Conectado (${count} perfis)`, latency };
    } catch (e: any) {
        return { status: 'error', message: e.toString(), latency: 0 };
    }
}
