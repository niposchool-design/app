'use client';

import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface AdminPageLayoutProps {
    title: string;
    subtitle?: string;
    icon?: LucideIcon;
    badge?: string;
    actions?: ReactNode;
    children: ReactNode;
}

/**
 * Layout padrão para páginas admin - Design Executivo/CEO
 * Uso: Envolva o conteúdo das páginas admin para manter consistência visual
 */
export default function AdminPageLayout({
    title,
    subtitle,
    icon: Icon,
    badge,
    actions,
    children
}: AdminPageLayoutProps) {
    return (
        <div className="space-y-6">
            {/* Page Header - Executivo */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200"
            >
                <div className="flex items-start gap-4">
                    {Icon && (
                        <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
                            <Icon className="w-6 h-6" strokeWidth={2} />
                        </div>
                    )}
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
                                {title}
                            </h1>
                            {badge && (
                                <span className="px-2.5 py-1 rounded-lg bg-purple-50 border border-purple-200 text-purple-700 text-xs font-semibold">
                                    {badge}
                                </span>
                            )}
                        </div>
                        {subtitle && (
                            <p className="text-sm text-slate-500 leading-relaxed max-w-2xl">
                                {subtitle}
                            </p>
                        )}
                    </div>
                </div>
                
                {actions && (
                    <div className="flex items-center gap-3">
                        {actions}
                    </div>
                )}
            </motion.div>

            {/* Page Content */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                {children}
            </motion.div>
        </div>
    );
}

/**
 * Card Executivo - Para conteúdo em cards
 */
export function AdminCard({ 
    children, 
    className = '' 
}: { 
    children: ReactNode; 
    className?: string 
}) {
    return (
        <div className={`admin-card p-6 ${className}`}>
            {children}
        </div>
    );
}

/**
 * Section Header - Para dividir seções dentro de páginas
 */
export function AdminSectionHeader({
    icon: Icon,
    title,
    action
}: {
    icon?: LucideIcon;
    title: string;
    action?: ReactNode;
}) {
    return (
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
                {Icon && (
                    <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                        <Icon className="w-4 h-4" strokeWidth={2} />
                    </div>
                )}
                <h2 className="text-base font-semibold text-slate-900">{title}</h2>
            </div>
            {action}
        </div>
    );
}

/**
 * Grid Container - Para layouts em grid responsivos
 */
export function AdminGrid({ 
    children, 
    cols = 3 
}: { 
    children: ReactNode; 
    cols?: 1 | 2 | 3 | 4 
}) {
    const colsClass = {
        1: 'grid-cols-1',
        2: 'md:grid-cols-2',
        3: 'md:grid-cols-2 lg:grid-cols-3',
        4: 'md:grid-cols-2 lg:grid-cols-4'
    };

    return (
        <div className={`grid grid-cols-1 ${colsClass[cols]} gap-5`}>
            {children}
        </div>
    );
}

/**
 * Empty State - Para quando não há dados
 */
export function AdminEmptyState({
    icon: Icon,
    title,
    description,
    action
}: {
    icon: LucideIcon;
    title: string;
    description?: string;
    action?: ReactNode;
}) {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="p-4 bg-slate-50 rounded-full mb-4 text-slate-300">
                <Icon className="w-12 h-12" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
            {description && (
                <p className="text-sm text-slate-500 mb-6 max-w-md">{description}</p>
            )}
            {action}
        </div>
    );
}
