'use client';

import { Search, Bell, Settings, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function AdminHeader() {
    const [currentDate, setCurrentDate] = useState<string>('');

    useEffect(() => {
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        setCurrentDate(now.toLocaleDateString('pt-BR', options));
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200/80 mb-6"
        >
            {/* Search Bar - Profissional */}
            <div className="relative flex-1 max-w-xl">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" strokeWidth={2} />
                <input
                    type="text"
                    placeholder="Buscar alunos, turmas, relatórios..."
                    className="w-full bg-slate-50 border border-slate-200/50 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-purple-100 focus:border-purple-300 transition-all outline-none"
                />
            </div>

            <div className="flex items-center gap-3">
                <div className="text-right hidden md:block">
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Hoje</p>
                    <p className="text-xs font-medium text-slate-600 capitalize">{currentDate}</p>
                </div>
                <div className="h-8 w-[1px] bg-slate-200 hidden md:block"></div>
                
                {/* Notificações */}
                <button className="relative p-2 hover:bg-slate-50 rounded-lg transition-colors text-slate-500 hover:text-purple-600">
                    <Bell className="w-4 h-4" strokeWidth={2} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-purple-500 rounded-full border-2 border-white"></span>
                </button>

                {/* Configurações */}
                <button className="p-2 hover:bg-slate-50 rounded-lg transition-colors text-slate-500 hover:text-purple-600">
                    <Settings className="w-4 h-4" strokeWidth={2} />
                </button>

                {/* Avatar do Admin */}
                <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center text-white text-xs font-semibold shadow-sm">
                        <User className="w-4 h-4" strokeWidth={2} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
