'use client';

import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    subtitle?: string;
    color?: 'purple' | 'indigo' | 'emerald' | 'orange' | 'blue' | 'fuchsia';
}

const colorClasses = {
    purple: {
        bg: 'bg-purple-50',
        text: 'text-purple-600',
        border: 'border-purple-100',
        gradient: 'from-purple-500/10'
    },
    indigo: {
        bg: 'bg-indigo-50',
        text: 'text-indigo-600',
        border: 'border-indigo-100',
        gradient: 'from-indigo-500/10'
    },
    emerald: {
        bg: 'bg-emerald-50',
        text: 'text-emerald-600',
        border: 'border-emerald-100',
        gradient: 'from-emerald-500/10'
    },
    orange: {
        bg: 'bg-orange-50',
        text: 'text-orange-600',
        border: 'border-orange-100',
        gradient: 'from-orange-500/10'
    },
    blue: {
        bg: 'bg-blue-50',
        text: 'text-blue-600',
        border: 'border-blue-100',
        gradient: 'from-blue-500/10'
    },
    fuchsia: {
        bg: 'bg-fuchsia-50',
        text: 'text-fuchsia-600',
        border: 'border-fuchsia-100',
        gradient: 'from-fuchsia-500/10'
    }
};

/**
 * Card de estatísticas executivo para métricas e KPIs
 * Uso: Exibir métricas importantes com visual profissional
 */
export function StatsCard({
    title,
    value,
    icon: Icon,
    trend,
    subtitle,
    color = 'purple'
}: StatsCardProps) {
    const colors = colorClasses[color];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group bg-white rounded-xl p-6 shadow-sm border border-slate-200/80 hover:shadow-lg hover:border-purple-200 transition-all duration-300 relative overflow-hidden"
        >
            {/* Gradiente decorativo sutil */}
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colors.gradient} to-transparent rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110 pointer-events-none`}></div>

            <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                    <div className={`p-2.5 ${colors.bg} rounded-lg ${colors.text} shadow-sm border ${colors.border}`}>
                        <Icon className="w-5 h-5" strokeWidth={2} />
                    </div>
                    {trend && (
                        <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold ${
                            trend.isPositive
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-red-50 text-red-700 border border-red-200'
                        }`}>
                            <span>{trend.isPositive ? '↑' : '↓'}</span>
                            <span>{Math.abs(trend.value)}%</span>
                        </div>
                    )}
                </div>

                <div className="mb-2">
                    <h3 className="text-3xl font-bold text-slate-900 tracking-tight mb-1">
                        {value}
                    </h3>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                        {title}
                    </p>
                </div>

                {subtitle && (
                    <div className="pt-3 border-t border-slate-100">
                        <p className="text-xs text-slate-600">
                            {subtitle}
                        </p>
                    </div>
                )}
            </div>
        </motion.div>
    );
}

/**
 * Grid de Stats Cards para dashboard
 */
interface StatsGridProps {
    children: React.ReactNode;
    cols?: 2 | 3 | 4;
}

export function StatsGrid({ children, cols = 4 }: StatsGridProps) {
    const colsClass = {
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
