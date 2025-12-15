'use client';

import {
    Users,
    TrendingUp,
    Shield,
    Activity,
    GraduationCap,
    School,
    Music,
    UserPlus,
    CheckCircle,
    Database,
    ChevronRight,
    ArrowUpRight,
    LayoutDashboard,
    Clock,
    Calendar,
    Settings,
    BarChart3,
    PieChart,
    Award,
    AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface AdminDashboardClientProps {
    stats: {
        totalAlunos: number;
        totalProfessores: number;
        totalTurmas: number;
        totalInstrumentos: number;
    };
    activityLogs: any[];
}

export default function AdminDashboardClient({ stats, activityLogs }: AdminDashboardClientProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    // Stagger animation variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 15 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/20 to-slate-100">
            {/* Background Pattern - Profissional e Discreto */}
            <div className="fixed inset-0 opacity-[0.015] pointer-events-none" style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, rgba(124,58,237,0.08) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(109,40,217,0.06) 0%, transparent 50%)`
            }}></div>

            <div className="relative max-w-[1600px] mx-auto space-y-6 p-6 lg:p-8">

                {/* Executive Header - Minimalista e Sofisticado */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950 text-white p-8 shadow-2xl border border-purple-800/20"
                >
                    {/* Elementos sutis de fundo */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -ml-16 -mb-16"></div>

                    <div className="relative z-10">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <span className="px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-400/20 text-purple-200 text-xs font-semibold tracking-wide uppercase backdrop-blur-sm">
                                        Executive Dashboard
                                    </span>
                                    <span className="flex items-center gap-1.5 text-emerald-300 text-xs font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-400/20">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                        Online
                                    </span>
                                </div>
                                <h1 className="text-4xl font-semibold text-white tracking-tight">
                                    Painel Administrativo
                                </h1>
                                <p className="text-purple-200/80 max-w-2xl text-base leading-relaxed">
                                    Visão estratégica completa e gestão centralizada da instituição.
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <Link href="/admin/alunos/novo" className="px-5 py-2.5 bg-white text-purple-900 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl hover:bg-purple-50 transition-all flex items-center gap-2">
                                    <UserPlus className="w-4 h-4" />
                                    Novo Aluno
                                </Link>
                                <Link href="/admin/turmas/nova" className="px-5 py-2.5 bg-purple-600 text-white rounded-xl text-sm font-semibold shadow-lg shadow-purple-900/30 hover:bg-purple-500 transition-all flex items-center gap-2">
                                    <School className="w-4 h-4" />
                                    Nova Turma
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* KPIs Executivos - Grid Profissional */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
                >
                    {/* KPI 1: Alunos - Design Corporativo */}
                    <motion.div variants={item} className="group bg-white rounded-xl p-6 shadow-sm border border-slate-200/80 hover:shadow-lg hover:border-purple-200 transition-all duration-300">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-2.5 bg-purple-50 rounded-lg text-purple-600">
                                <GraduationCap className="w-5 h-5" strokeWidth={2} />
                            </div>
                            <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                                <ArrowUpRight className="w-3 h-3" /> 5%
                            </span>
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900 mb-1 tracking-tight">{stats.totalAlunos}</h3>
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Alunos Ativos</p>
                        <div className="mt-4 pt-4 border-t border-slate-100">
                            <Link href="/admin/alunos" className="text-xs font-medium text-purple-600 hover:text-purple-700 flex items-center gap-1">
                                Ver detalhes <ChevronRight className="w-3 h-3" />
                            </Link>
                        </div>
                    </motion.div>

                    {/* KPI 2: Professores */}
                    <motion.div variants={item} className="group bg-white rounded-xl p-6 shadow-sm border border-slate-200/80 hover:shadow-lg hover:border-purple-200 transition-all duration-300">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-2.5 bg-indigo-50 rounded-lg text-indigo-600">
                                <Shield className="w-5 h-5" strokeWidth={2} />
                            </div>
                            <span className="flex items-center gap-1 text-xs font-medium text-slate-500 bg-slate-50 px-2 py-1 rounded-md">
                                <CheckCircle className="w-3 h-3" /> Ativos
                            </span>
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900 mb-1 tracking-tight">{stats.totalProfessores}</h3>
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Professores Cadastrados</p>
                        <div className="mt-4 pt-4 border-t border-slate-100">
                            <Link href="/admin/professores" className="text-xs font-medium text-purple-600 hover:text-purple-700 flex items-center gap-1">
                                Ver detalhes <ChevronRight className="w-3 h-3" />
                            </Link>
                        </div>
                    </motion.div>

                    {/* KPI 3: Turmas */}
                    <motion.div variants={item} className="group bg-white rounded-xl p-6 shadow-sm border border-slate-200/80 hover:shadow-lg hover:border-purple-200 transition-all duration-300">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-2.5 bg-violet-50 rounded-lg text-violet-600">
                                <School className="w-5 h-5" strokeWidth={2} />
                            </div>
                            <span className="flex items-center gap-1 text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                                <CheckCircle className="w-3 h-3" /> Em Curso
                            </span>
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900 mb-1 tracking-tight">{stats.totalTurmas}</h3>
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Turmas Regulares</p>
                        <div className="mt-4 pt-4 border-t border-slate-100">
                            <Link href="/admin/turmas" className="text-xs font-medium text-purple-600 hover:text-purple-700 flex items-center gap-1">
                                Ver detalhes <ChevronRight className="w-3 h-3" />
                            </Link>
                        </div>
                    </motion.div>

                    {/* KPI 4: Instrumentos */}
                    <motion.div variants={item} className="group bg-white rounded-xl p-6 shadow-sm border border-slate-200/80 hover:shadow-lg hover:border-purple-200 transition-all duration-300">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-2.5 bg-fuchsia-50 rounded-lg text-fuchsia-600">
                                <Music className="w-5 h-5" strokeWidth={2} />
                            </div>
                            <span className="flex items-center gap-1 text-xs font-medium text-slate-500 bg-slate-50 px-2 py-1 rounded-md">
                                <Database className="w-3 h-3" /> Acervo
                            </span>
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900 mb-1 tracking-tight">{stats.totalInstrumentos}</h3>
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Instrumentos Disponíveis</p>
                        <div className="mt-4 pt-4 border-t border-slate-100">
                            <Link href="/admin/instrumentos" className="text-xs font-medium text-purple-600 hover:text-purple-700 flex items-center gap-1">
                                Ver detalhes <ChevronRight className="w-3 h-3" />
                            </Link>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Layout de 3 Colunas - Profissional */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Activity Feed - 2 colunas */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200/80 overflow-hidden"
                    >
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                                    <Activity className="w-4 h-4" strokeWidth={2} />
                                </div>
                                <div>
                                    <h2 className="text-base font-semibold text-slate-900">Atividade do Sistema</h2>
                                    <p className="text-xs text-slate-500 font-medium">Últimas 24 horas</p>
                                </div>
                            </div>
                            <Link href="/admin/database" className="text-xs font-medium text-purple-600 hover:bg-purple-50 px-3 py-1.5 rounded-lg transition-colors">
                                Ver Histórico Completo
                            </Link>
                        </div>

                        <div className="divide-y divide-slate-100 max-h-[420px] overflow-y-auto">
                            {activityLogs.length > 0 ? (
                                activityLogs.map((log) => (
                                    <div key={log.id} className="px-6 py-3.5 hover:bg-slate-50/80 transition-all flex items-start gap-3 group">
                                        <div className={`mt-0.5 p-2 rounded-lg shrink-0 ${log.type === 'user' ? 'bg-emerald-50 text-emerald-600' :
                                            log.type === 'turma' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-600'
                                            }`}>
                                            {log.type === 'user' ? <UserPlus className="w-4 h-4" strokeWidth={2} /> :
                                                log.type === 'turma' ? <School className="w-4 h-4" strokeWidth={2} /> : <Database className="w-4 h-4" strokeWidth={2} />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-slate-700 font-medium text-sm leading-relaxed">
                                                {log.description}
                                            </p>
                                            <div className="flex items-center gap-2 mt-1.5">
                                                <span className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                                                    <Clock className="w-3 h-3" />
                                                    {new Date(log.created_at).toLocaleString('pt-BR', {
                                                        day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
                                                    })}
                                                </span>
                                                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 bg-slate-50 px-2 py-0.5 rounded">
                                                    {log.type}
                                                </span>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-purple-400 group-hover:translate-x-0.5 transition-all self-center" strokeWidth={2} />
                                    </div>
                                ))
                            ) : (
                                <div className="p-12 text-center">
                                    <div className="bg-slate-50 inline-flex p-4 rounded-full mb-3 text-slate-300">
                                        <Activity className="w-8 h-8" />
                                    </div>
                                    <p className="text-slate-500 font-medium text-sm">Nenhuma atividade recente</p>
                                    <p className="text-slate-400 text-xs mt-1">As ações do sistema aparecerão aqui</p>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Sidebar - Ações Rápidas e Insights */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-5"
                    >
                        {/* Painel de Acesso Rápido - Executivo */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-5">
                            <div className="flex items-center gap-2 mb-4">
                                <BarChart3 className="w-4 h-4 text-purple-600" strokeWidth={2} />
                                <h3 className="text-slate-900 font-semibold text-sm">Acesso Rápido</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-2.5">
                                <Link href="/admin/alunos" className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg bg-slate-50 hover:bg-purple-50 hover:border-purple-200 border border-transparent transition-all group">
                                    <div className="p-2 bg-white rounded-lg shadow-sm text-slate-600 group-hover:text-purple-600 transition-colors">
                                        <Users className="w-4 h-4" strokeWidth={2} />
                                    </div>
                                    <span className="text-xs font-medium text-slate-600 group-hover:text-purple-700">Alunos</span>
                                </Link>
                                <Link href="/admin/turmas" className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg bg-slate-50 hover:bg-purple-50 hover:border-purple-200 border border-transparent transition-all group">
                                    <div className="p-2 bg-white rounded-lg shadow-sm text-slate-600 group-hover:text-purple-600 transition-colors">
                                        <School className="w-4 h-4" strokeWidth={2} />
                                    </div>
                                    <span className="text-xs font-medium text-slate-600 group-hover:text-purple-700">Turmas</span>
                                </Link>
                                <Link href="/admin/professores" className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg bg-slate-50 hover:bg-purple-50 hover:border-purple-200 border border-transparent transition-all group">
                                    <div className="p-2 bg-white rounded-lg shadow-sm text-slate-600 group-hover:text-purple-600 transition-colors">
                                        <Shield className="w-4 h-4" strokeWidth={2} />
                                    </div>
                                    <span className="text-xs font-medium text-slate-600 group-hover:text-purple-700">Corpo Docente</span>
                                </Link>
                                <Link href="/admin/configuracoes" className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg bg-slate-50 hover:bg-purple-50 hover:border-purple-200 border border-transparent transition-all group">
                                    <div className="p-2 bg-white rounded-lg shadow-sm text-slate-600 group-hover:text-purple-600 transition-colors">
                                        <Settings className="w-4 h-4" strokeWidth={2} />
                                    </div>
                                    <span className="text-xs font-medium text-slate-600 group-hover:text-purple-700">Configurações</span>
                                </Link>
                            </div>
                        </div>

                        {/* Card de Insights/Alertas - Executivo Limpo */}
                        <div className="bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950 rounded-xl shadow-lg px-5 py-6 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl -mr-12 -mt-12"></div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-3 text-purple-200">
                                    <PieChart className="w-4 h-4" strokeWidth={2} />
                                    <span className="text-xs font-semibold uppercase tracking-wider">Insights</span>
                                </div>
                                <h3 className="text-lg font-semibold mb-1.5">Desempenho Geral</h3>
                                <p className="text-purple-200/80 text-xs leading-relaxed mb-4">
                                    Taxa de retenção de alunos acima da média do setor
                                </p>

                                <div className="flex items-center gap-2 mb-4">
                                    <div className="flex-1 bg-purple-800/30 h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-gradient-to-r from-purple-400 to-pink-400 h-full rounded-full" style={{ width: '87%' }}></div>
                                    </div>
                                    <span className="text-sm font-bold">87%</span>
                                </div>

                                <button className="w-full py-2.5 bg-white/10 hover:bg-white/15 backdrop-blur-sm rounded-lg text-xs font-semibold border border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2">
                                    Ver Relatório Completo <ArrowUpRight className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>

                        {/* Notificações/Alertas Importantes */}
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                            <div className="flex items-start gap-3">
                                <div className="p-1.5 bg-amber-100 rounded-lg text-amber-600">
                                    <AlertCircle className="w-4 h-4" strokeWidth={2} />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-semibold text-amber-900 mb-1">Ação Necessária</h4>
                                    <p className="text-xs text-amber-700 leading-relaxed mb-2">
                                        3 alunos com pagamentos pendentes este mês
                                    </p>
                                    <Link href="/admin/financeiro" className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1">
                                        Revisar <ChevronRight className="w-3 h-3" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

            </div>
        </div>
    );
}
