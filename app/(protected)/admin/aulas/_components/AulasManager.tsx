
'use client';

import { useState } from 'react';
import { Aula } from '@/src/lib/types/aulas';
import { Columns, List, Calendar as CalendarIcon, Plus } from 'lucide-react';
import Link from 'next/link';

interface AulasManagerProps {
    aulasIniciais: Aula[];
    allowedViews?: ViewMode[];
    readOnly?: boolean;
}

type ViewMode = 'kanban' | 'list' | 'calendar';

export function AulasManager({ aulasIniciais, allowedViews = ['kanban', 'list', 'calendar'], readOnly = false }: AulasManagerProps) {
    const [view, setView] = useState<ViewMode>(allowedViews[0]);
    const [aulas] = useState<Aula[]>(aulasIniciais);

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
                {view === 'kanban' && <AulasKanbanView aulas={aulas} />}
                {view === 'list' && <AulasListView aulas={aulas} />}
                {view === 'calendar' && <AulasCalendarView aulas={aulas} />}
            </div>
        </div>
    );
}

// Sub-componentes (podem ser extraídos depois se crescerem)

function AulasKanbanView({ aulas }: { aulas: Aula[] }) {
    const columns = [
        { id: 'rascunho', title: 'Rascunho', color: 'bg-gray-100 text-gray-700' },
        { id: 'agendada', title: 'Agendada', color: 'bg-blue-100 text-blue-700' },
        { id: 'concluida', title: 'Concluída', color: 'bg-green-100 text-green-700' },
        { id: 'cancelada', title: 'Cancelada', color: 'bg-red-100 text-red-700' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto pb-4">
            {columns.map(col => (
                <div key={col.id} className="min-w-[280px] flex flex-col h-full bg-gray-50 rounded-xl p-4 border border-gray-200/50">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-700">{col.title}</h3>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${col.color}`}>
                            {aulas.filter(a => (a.status || 'rascunho') === col.id).length}
                        </span>
                    </div>

                    <div className="space-y-3 flex-1">
                        {aulas.filter(a => (a.status || 'rascunho') === col.id).map(aula => (
                            <div key={aula.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-pointer">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                                        {aula.numero}
                                    </div>
                                    <Link href={`/admin/aulas/${aula.id}`} className="text-gray-400 hover:text-blue-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                                    </Link>
                                </div>
                                <h4 className="font-semibold text-gray-900 mb-1">{aula.titulo}</h4>
                                <p className="text-xs text-gray-500 line-clamp-2 mb-2">{aula.objetivo_didatico}</p>

                                {aula.data_programada && (
                                    <div className="flex items-center text-xs text-gray-500 mt-2">
                                        <CalendarIcon size={12} className="mr-1" />
                                        {new Date(aula.data_programada).toLocaleDateString()}
                                    </div>
                                )}
                            </div>
                        ))}
                        {aulas.filter(a => (a.status || 'rascunho') === col.id).length === 0 && (
                            <div className="text-center py-6 text-gray-400 text-sm border-2 border-dashed border-gray-200 rounded-lg">
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
                            <th className="px-6 py-4">Data</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {aulas.map((aula) => (
                            <tr key={aula.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900">{aula.numero}</td>
                                <td className="px-6 py-4">
                                    <div className="font-medium text-gray-900">{aula.titulo}</div>
                                </td>
                                <td className="px-6 py-4">
                                    {aula.data_programada ? new Date(aula.data_programada).toLocaleDateString() : '-'}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize
                    ${aula.status === 'agendada' ? 'bg-blue-50 text-blue-700 border-blue-100' : ''}
                    ${aula.status === 'concluida' ? 'bg-green-50 text-green-700 border-green-100' : ''}
                    ${aula.status === 'rascunho' ? 'bg-gray-100 text-gray-700 border-gray-200' : ''}
                    ${aula.status === 'cancelada' ? 'bg-red-50 text-red-700 border-red-100' : ''}
                  `}>
                                        {aula.status || 'Rascunho'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Link href={`/admin/aulas/${aula.id}`} className="text-blue-600 hover:text-blue-800 font-medium">Editar</Link>
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
    // Simplificação: Listar aulas agrupadas por mês/data futura
    const sortedAulas = [...aulas].sort((a, b) => new Date(a.data_programada || '').getTime() - new Date(b.data_programada || '').getTime());

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                {/* Header Dias da Semana (Visual Only for now) */}
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(d => (
                    <div key={d} className="text-gray-400 text-xs font-semibold uppercase text-center py-2">{d}</div>
                ))}

                {/* Placeholder Simples de Cards em Grid representando dias */}
                {Array.from({ length: 30 }).map((_, i) => (
                    <div key={i} className="min-h-[100px] bg-gray-50 border border-gray-100 rounded-lg p-2 relative group hover:border-blue-200 transition-colors">
                        <span className="text-xs text-gray-400 absolute top-2 right-2">{i + 1}</span>
                        {/* Renderizar aula se houver neste dia (logica ficticia para demo visual) */}
                    </div>
                ))}
            </div>
            <div className="mt-8 text-center bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-yellow-800 text-sm">
                <p>Visualização de calendário completa será implementada com biblioteca dedicada (ex: react-calendar) nas próximas iterações.</p>
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                    {sortedAulas.filter(a => a.data_programada).map(aula => (
                        <div key={aula.id} className="bg-white px-3 py-1 rounded shadow-sm border border-gray-200 text-xs">
                            <span className="font-bold">{new Date(aula.data_programada!).toLocaleDateString()}</span> - {aula.titulo}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
