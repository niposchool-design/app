'use client';

import { LayoutGrid, List, Table } from 'lucide-react';
import { useState, useEffect } from 'react';

export type ViewMode = 'table' | 'cards' | 'grid';

interface ViewToggleProps {
    currentView: ViewMode;
    onViewChange: (view: ViewMode) => void;
    storageKey?: string;
}

/**
 * Componente de alternância de visualização (Tabela/Cards/Grid)
 * Permite ao usuário escolher como visualizar os dados
 */
export function ViewToggle({ currentView, onViewChange, storageKey = 'admin-view-mode' }: ViewToggleProps) {
    const views: { mode: ViewMode; icon: typeof List; label: string }[] = [
        { mode: 'table', icon: List, label: 'Lista' },
        { mode: 'cards', icon: LayoutGrid, label: 'Cards' },
        { mode: 'grid', icon: Table, label: 'Grade' },
    ];

    const handleViewChange = (mode: ViewMode) => {
        onViewChange(mode);
        if (typeof window !== 'undefined' && storageKey) {
            localStorage.setItem(storageKey, mode);
        }
    };

    return (
        <div className="inline-flex items-center bg-slate-100 rounded-lg p-1 gap-1">
            {views.map(({ mode, icon: Icon, label }) => (
                <button
                    key={mode}
                    onClick={() => handleViewChange(mode)}
                    className={`
                        relative px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200
                        flex items-center gap-1.5
                        ${currentView === mode
                            ? 'bg-white text-purple-600 shadow-sm'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        }
                    `}
                    title={label}
                >
                    <Icon className="w-4 h-4" strokeWidth={2} />
                    <span className="hidden sm:inline">{label}</span>
                </button>
            ))}
        </div>
    );
}

/**
 * Hook personalizado para gerenciar o estado de visualização
 * com persistência em localStorage
 */
export function useViewMode(storageKey: string = 'admin-view-mode', defaultView: ViewMode = 'table') {
    const [viewMode, setViewMode] = useState<ViewMode>(defaultView);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem(storageKey) as ViewMode;
            if (stored && ['table', 'cards', 'grid'].includes(stored)) {
                setViewMode(stored);
            }
        }
    }, [storageKey]);

    return [viewMode, setViewMode] as const;
}
