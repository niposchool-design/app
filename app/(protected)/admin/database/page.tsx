
'use client';

import { useState, useEffect } from 'react';
import { checkDatabaseHealth, TableStatus } from '@/src/lib/supabase/queries/database_diagnostics';
import { Database, CheckCircle, XCircle, AlertTriangle, RefreshCw } from 'lucide-react';

export default function DatabasePage() {
    const [tables, setTables] = useState<TableStatus[]>([]);
    const [loading, setLoading] = useState(true);

    async function runDiagnostics() {
        setLoading(true);
        try {
            const results = await checkDatabaseHealth();
            setTables(results);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        runDiagnostics();
    }, []);

    return (
        <div className="p-6 lg:p-10 space-y-8 animate-fade-in">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                        <Database className="text-blue-600" />
                        Estado do Banco de Dados
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Verificação em tempo real da integridade das tabelas do sistema.
                    </p>
                </div>
                <button
                    onClick={runDiagnostics}
                    disabled={loading}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                >
                    <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                    Atualizar Diagnóstico
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {loading && tables.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">Executando diagnóstico...</div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50 text-gray-700 text-sm font-semibold border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4">Tabela</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Registros</th>
                                    <th className="px-6 py-4">Observações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {tables.map((table) => (
                                    <tr key={table.tableName} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 font-mono text-sm font-medium text-gray-900">
                                            {table.tableName}
                                        </td>
                                        <td className="px-6 py-4">
                                            {table.exists ? (
                                                <span className="flex items-center gap-2 text-green-700 bg-green-50 px-3 py-1 rounded-full text-xs font-bold w-fit">
                                                    <CheckCircle size={14} /> Ativa
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-2 text-red-700 bg-red-50 px-3 py-1 rounded-full text-xs font-bold w-fit">
                                                    <XCircle size={14} /> Ausente / Erro
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 font-mono">
                                            {table.count !== null ? table.count : '-'}
                                        </td>
                                        <td className="px-6 py-4 text-xs text-gray-500 max-w-xs truncate" title={table.error}>
                                            {table.error ? (
                                                <span className="flex items-center gap-1 text-red-500">
                                                    <AlertTriangle size={12} />
                                                    {table.error}
                                                </span>
                                            ) : 'OK'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <div className="bg-blue-50 border border-blue-100 p-6 rounded-xl flex items-start gap-4">
                <Database className="text-blue-600 mt-1 flex-shrink-0" size={24} />
                <div>
                    <h3 className="font-bold text-blue-900 mb-2">Nota Técnica</h3>
                    <p className="text-sm text-blue-800">
                        As tabelas marcadas como "Ausente" podem ainda não ter sido criadas no Supabase.
                        Utilize o Painel SQL do Supabase para rodar os scripts localizados em <code>database/centro_estudos_schema.sql</code> caso necessário.
                        Tabelas de Gamificação (prefixo <code>gamificacao_</code>) ainda não fazem parte do script original e precisam ser criadas manualmente se você desejar ativar essas features.
                    </p>
                </div>
            </div>
        </div>
    );
}
