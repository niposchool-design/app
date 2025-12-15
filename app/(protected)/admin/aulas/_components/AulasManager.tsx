'use client';

import { useState, useEffect } from 'react';
import { Aula } from '@/src/lib/types/aulas';
import { updateAula } from '@/src/lib/supabase/mutations/aulas';
import { Columns, List, Calendar as CalendarIcon, Plus, MoreHorizontal, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface AulasManagerProps {
    aulasIniciais: Aula[];
    allowedViews?: ViewMode[];
    readOnly?: boolean;
}

type ViewMode = 'kanban' | 'list' | 'calendar';

export function AulasManager({ aulasIniciais, allowedViews = ['kanban', 'list', 'calendar'], readOnly = false }: AulasManagerProps) {
    const [view, setView] = useState<ViewMode>(allowedViews[0]);
    const [aulas, setAulas] = useState<Aula[]>(aulasIniciais);
    const router = useRouter();

    useEffect(() => {
        setAulas(aulasIniciais);
    }, [aulasIniciais]);

    const handleStatusChange = async (aulaId: string, newStatus: string) => {
        // Optimistic update
        const previousAulas = [...aulas];
        setAulas(current => current.map(a =>
            a.id === aulaId ? { ...a, status: newStatus } : a
        ));

        try {
            await updateAula(aulaId, { status: newStatus });
            router.refresh();
        } catch (error) {
            console.error("Falha ao atualizar status", error);
            // Revert on error
            setAulas(previousAulas);
            alert("Erro ao mover aula. Tente novamente.");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Gestão de Aulas</h1>
                    <p className="text-gray-600 mt-1">Gerencie o fluxo de aulas do Método Alpha</p>
                </div>

                <div className="flex items-center gap-4">
                    {/* View Toggles */}
                    <div className="flex bg-gray-100 p-1 rounded-lg">
                        {allowedViews.includes('kanban') && (
                            <button
                                onClick={() => setView('kanban')}
                                className={`p-2 rounded-md transition-all ${view === 'kanban' ? 'bg-white shadow-sm text-red-600' : 'text-gray-500 hover:text-gray-700'}`}
                                title="Visualização Kanban"
                            >
                                <Columns size={18} />
                            </button>
                        )}
                        {allowedViews.includes('list') && (
                            <button
                                onClick={() => setView('list')}
                                className={`p-2 rounded-md transition-all ${view === 'list' ? 'bg-white shadow-sm text-red-600' : 'text-gray-500 hover:text-gray-700'}`}
                                title="Visualização em Lista"
                            >
                                <List size={18} />
                            </button>
                        )}
                        {allowedViews.includes('calendar') && (
                            <button
                                onClick={() => setView('calendar')}
                                className={`p-2 rounded-md transition-all ${view === 'calendar' ? 'bg-white shadow-sm text-red-600' : 'text-gray-500 hover:text-gray-700'}`}
                                title="Visualização em Calendário"
                            >
                                <CalendarIcon size={18} />
                            </button>
                        )}
                    </div>

                    {!readOnly && (
                        <Link
                            href="/admin/aulas/nova"
                            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
                        >
                            <Plus className="w-5 h-5" />
                            Nova Aula
                        </Link>
                    )}
                </div>
            </div>

            <div className="mt-6">
                {view === 'kanban' && <AulasKanbanView aulas={aulas} onStatusChange={handleStatusChange} />}
                {view === 'list' && <AulasListView aulas={aulas} />}
                {view === 'calendar' && <AulasCalendarView aulas={aulas} />}
            </div>
        </div>
    );
}

// Sub-componentes

interface KanbanViewProps {
    aulas: Aula[];
    onStatusChange: (id: string, status: string) => void;
}

function AulasKanbanView({ aulas, onStatusChange }: KanbanViewProps) {
    // Definindo colunas com os status EXATOS do banco de dados (StatusAula)
    const columns = [
        { id: 'A Fazer', title: 'A Fazer', color: 'bg-gray-100 text-gray-700', border: 'border-t-gray-400' },
        { id: 'Em Preparação', title: 'Em Preparação', color: 'bg-blue-50 text-blue-700', border: 'border-t-blue-500' },
        { id: 'Revisão', title: 'Revisão', color: 'bg-yellow-50 text-yellow-700', border: 'border-t-yellow-500' },
        { id: 'Concluída', title: 'Concluída', color: 'bg-green-50 text-green-700', border: 'border-t-green-500' },
        { id: 'Cancelada', title: 'Cancelada', color: 'bg-red-50 text-red-700', border: 'border-t-red-500' },
    ];

    return (
        <div className="flex gap-6 overflow-x-auto pb-4 items-start h-[calc(100vh-250px)]">
            {columns.map(col => (
                <div key={col.id} className="min-w-[280px] w-[320px] flex flex-col h-full bg-gray-50/50 rounded-xl p-4 border border-gray-200">
                    <div className={`flex items-center justify-between mb-4 pb-2 border-b border-gray-100 ${col.border} border-t-4 pt-2 rounded-t-sm`}>
                        <h3 className="font-bold text-gray-700 text-sm uppercase tracking-wide">{col.title}</h3>
                        <span className="text-xs font-bold text-gray-400 bg-white px-2 py-1 rounded shadow-sm border border-gray-100">
                            {aulas.filter(a => (a.status || 'A Fazer') === col.id).length}
                        </span>
                    </div>

                    <div className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                        {aulas.filter(a => (a.status || 'A Fazer') === col.id).map(aula => (
                            <div key={aula.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all group relative">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                                        {aula.numero}
                                    </div>
                                    <div className="relative group/actions">
                                        <button className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded">
                                            <MoreHorizontal size={16} />
                                        </button>
                                        <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-lg shadow-xl border border-gray-100 hidden group-hover/actions:block z-20 p-1">
                                            <div className="text-xs font-semibold text-gray-400 px-3 py-1 uppercase tracking-wider">Mover para:</div>
                                            {columns.filter(c => c.id !== col.id).map(targetCol => (
                                                <button
                                                    key={targetCol.id}
                                                    onClick={() => onStatusChange(aula.id, targetCol.id)}
                                                    className="w-full text-left px-3 py-2 text-xs hover:bg-gray-50 rounded text-gray-700 font-medium"
                                                >
                                                    {targetCol.title}
                                                </button>
                                            ))}
                                            <div className="h-px bg-gray-100 my-1"></div>
                                            <Link href={`/admin/aulas/editar/${aula.id}`} className="block w-full text-left px-3 py-2 text-xs hover:bg-gray-50 rounded text-gray-700 font-medium">
                                                Editar Aula
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <Link href={`/admin/aulas/${aula.id}`} className="block">
                                    <h4 className="font-semibold text-gray-900 mb-1 hover:text-blue-600 transition-colors line-clamp-2 text-sm">{aula.titulo}</h4>
                                    <p className="text-xs text-gray-500 line-clamp-3 mb-3">{aula.objetivo_didatico || 'Sem descrição.'}</p>
                                </Link>

                                {aula.data_programada && (
                                    <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-50 mt-2">
                                        <div className="flex items-center" title="Data Programada">
                                            <CalendarIcon size={12} className="mr-1 text-gray-400" />
                                            {new Date(aula.data_programada).toLocaleDateString()}
                                        </div>
                                        <Link href={`/admin/aulas/${aula.id}`} className="text-blue-500 hover:text-blue-700 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                                            Ver <ArrowRight size={10} />
                                        </Link>
                                    </div>
                                )}
                            </div>
                        ))}
                        {aulas.filter(a => (a.status || 'A Fazer') === col.id).length === 0 && (
                            <div className="text-center py-12 text-gray-300 text-sm border-2 border-dashed border-gray-100 rounded-lg">
                                Vazio
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

function AulasListView({ aulas }: { aulas: Aula[] }) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-50 text-gray-900 font-semibold border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 w-20">#</th>
                            <th className="px-6 py-4">Título</th>
                            <th className="px-6 py-4">Objetivo</th>
                            <th className="px-6 py-4">Data</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {aulas.map((aula) => (
                            <tr key={aula.id} className="hover:bg-gray-50 transition-colors group">
                                <td className="px-6 py-4 font-medium text-gray-900">{aula.numero}</td>
                                <td className="px-6 py-4 font-medium text-gray-900 hover:text-purple-600">
                                    <Link href={`/admin/aulas/${aula.id}`}>
                                        {aula.titulo}
                                    </Link>
                                </td>
                                <td className="px-6 py-4 max-w-xs">
                                    <div className="text-xs text-gray-500 truncate" title={aula.objetivo_didatico}>{aula.objetivo_didatico}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {aula.data_programada ? new Date(aula.data_programada).toLocaleDateString() : <span className="text-gray-300">-</span>}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                    ${aula.status === 'Em Preparação' ? 'bg-blue-50 text-blue-700 border-blue-100' : ''}
                    ${aula.status === 'Concluída' ? 'bg-green-50 text-green-700 border-green-100' : ''}
                    ${aula.status === 'A Fazer' ? 'bg-gray-100 text-gray-700 border-gray-200' : ''}
                    ${aula.status === 'Revisão' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : ''}
                    ${aula.status === 'Cancelada' ? 'bg-red-50 text-red-700 border-red-100' : ''}
                  `}>
                                        {aula.status || 'A Fazer'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Link href={`/admin/aulas/editar/${aula.id}`} className="text-blue-600 hover:text-blue-800 font-medium hover:underline">Editar</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function AulasCalendarView({ aulas }: { aulas: Aula[] }) {
    // Ordenar com segurança (evitar crash se data for nula)
    const sortedAulas = [...aulas].filter(a => a.data_programada).sort((a, b) => {
        const timeA = new Date(a.data_programada!).getTime();
        const timeB = new Date(b.data_programada!).getTime();
        return timeA - timeB;
    });

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="grid grid-cols-7 gap-y-4 gap-x-2">
                {/* Header Dias da Semana (Visual Only for now) */}
                {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map(d => (
                    <div key={d} className="text-gray-400 text-xs font-bold uppercase text-center">{d}</div>
                ))}

                {/* Placeholder Simples de Cards em Grid representando dias - Apenas visual */}
                {Array.from({ length: 30 }).map((_, i) => (
                    <div key={i} className="min-h-[80px] bg-gray-50/50 border border-gray-100 rounded-lg p-1 relative flex flex-col items-center justify-center opacity-70">
                        <span className="text-[10px] text-gray-300 absolute top-1 right-2">{i + 1}</span>
                    </div>
                ))}
            </div>

            <div className="mt-8">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <CalendarIcon size={18} className="text-purple-600" />
                    Próximas Aulas Agendadas
                </h3>
                {sortedAulas.length === 0 ? (
                    <div className="text-gray-500 italic p-4 bg-gray-50 rounded border border-gray-200">
                        Nenhuma aula com data programada encontrada.
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-3">
                        {sortedAulas.map(aula => (
                            <Link key={aula.id} href={`/admin/aulas/${aula.id}`} className="group bg-white pl-3 pr-4 py-2 rounded-lg shadow-sm border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all flex items-center gap-3">
                                <div className="bg-purple-50 text-purple-700 font-bold text-xs px-2 py-1 rounded">
                                    {new Date(aula.data_programada!).getDate()}/{new Date(aula.data_programada!).getMonth() + 1}
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-medium text-gray-900 text-sm group-hover:text-purple-700">{aula.titulo}</span>
                                    <span className="text-[10px] text-gray-500">{aula.status}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
