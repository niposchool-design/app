'use client';

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    onItemsPerPageChange?: (itemsPerPage: number) => void;
    itemsPerPageOptions?: number[];
}

/**
 * Componente de paginação profissional e funcional
 * Usado em tabelas e listas para navegação entre páginas
 */
export function Pagination({
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    onPageChange,
    onItemsPerPageChange,
    itemsPerPageOptions = [10, 25, 50, 100],
}: PaginationProps) {
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    const canGoPrevious = currentPage > 1;
    const canGoNext = currentPage < totalPages;

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    // Gera array de páginas para exibir
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisible = 7;

        if (totalPages <= maxVisible) {
            // Mostra todas as páginas se forem poucas
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Lógica para páginas com reticências
            if (currentPage <= 4) {
                for (let i = 1; i <= 5; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 3) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
            }
        }

        return pages;
    };

    return (
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/30">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Informações de itens */}
                <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
                    <span>
                        Exibindo <span className="text-slate-900 font-semibold">{startItem}</span> a{' '}
                        <span className="text-slate-900 font-semibold">{endItem}</span> de{' '}
                        <span className="text-slate-900 font-semibold">{totalItems}</span> registros
                    </span>

                    {/* Seletor de itens por página */}
                    {onItemsPerPageChange && (
                        <div className="flex items-center gap-2">
                            <span className="text-slate-500">|</span>
                            <label className="flex items-center gap-2">
                                <span>Por página:</span>
                                <select
                                    value={itemsPerPage}
                                    onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                                    className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                >
                                    {itemsPerPageOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>
                    )}
                </div>

                {/* Controles de navegação */}
                <div className="flex items-center gap-2">
                    {/* Primeira página */}
                    <button
                        onClick={() => handlePageChange(1)}
                        disabled={!canGoPrevious}
                        className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        title="Primeira página"
                    >
                        <ChevronsLeft className="w-4 h-4 text-slate-600" />
                    </button>

                    {/* Página anterior */}
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={!canGoPrevious}
                        className="px-3 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-medium text-slate-700 transition-colors"
                    >
                        <span className="hidden sm:inline">Anterior</span>
                        <ChevronLeft className="w-4 h-4 sm:hidden" />
                    </button>

                    {/* Números das páginas */}
                    <div className="hidden md:flex items-center gap-1">
                        {getPageNumbers().map((page, index) => {
                            if (page === '...') {
                                return (
                                    <span key={`ellipsis-${index}`} className="px-3 py-2 text-slate-400 text-xs">
                                        ...
                                    </span>
                                );
                            }

                            const pageNum = page as number;
                            const isActive = pageNum === currentPage;

                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => handlePageChange(pageNum)}
                                    className={`min-w-[36px] px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                                        isActive
                                            ? 'bg-purple-600 text-white shadow-sm'
                                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                                    }`}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}
                    </div>

                    {/* Indicador de página mobile */}
                    <div className="md:hidden px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700">
                        {currentPage} / {totalPages}
                    </div>

                    {/* Próxima página */}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={!canGoNext}
                        className="px-3 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-medium text-slate-700 transition-colors"
                    >
                        <span className="hidden sm:inline">Próxima</span>
                        <ChevronRight className="w-4 h-4 sm:hidden" />
                    </button>

                    {/* Última página */}
                    <button
                        onClick={() => handlePageChange(totalPages)}
                        disabled={!canGoNext}
                        className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        title="Última página"
                    >
                        <ChevronsRight className="w-4 h-4 text-slate-600" />
                    </button>
                </div>
            </div>
        </div>
    );
}

/**
 * Hook customizado para gerenciar estado de paginação
 */
export function usePagination(totalItems: number, initialItemsPerPage: number = 10) {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Reset para página 1 quando itemsPerPage mudar
    const handleItemsPerPageChange = (newItemsPerPage: number) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1);
    };

    // Retorna items paginados
    const getPaginatedItems = <T,>(items: T[]): T[] => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return items.slice(startIndex, endIndex);
    };

    return {
        currentPage,
        setCurrentPage,
        itemsPerPage,
        setItemsPerPage: handleItemsPerPageChange,
        totalPages,
        getPaginatedItems,
    };
}

// Adicionar import do useState
import { useState } from 'react';
