
'use client';

import { useState } from 'react';
import {
    Trophy, Star, Target, Plus, Shield, Award, Crown, Zap
} from 'lucide-react';
import Link from 'next/link';
import { Nivel, Conquista, Desafio } from '@/src/lib/types/gamificacao';

interface GamificacaoClientProps {
    niveis: Nivel[];
    conquistas: Conquista[];
    desafios: Desafio[];
}

export function GamificacaoClient({ niveis, conquistas, desafios }: GamificacaoClientProps) {
    const [activeTab, setActiveTab] = useState<'niveis' | 'conquistas' | 'desafios'>('niveis');

    return (
        <div className="p-6 lg:p-10 space-y-8 animate-fade-in">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                    <Crown className="text-yellow-500" />
                    Gestão de Gamificação
                    <span className="ml-3 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-purple-100 text-purple-700 border border-purple-200">
                        Live Data
                    </span>
                </h1>
                <p className="text-gray-600 mt-2">
                    Configure os níveis, conquistas e desafios para engajar os alunos no Método Alpha.
                </p>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200">
                <button
                    onClick={() => setActiveTab('niveis')}
                    className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${activeTab === 'niveis' ? 'border-purple-600 text-purple-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                    <div className="flex items-center gap-2">
                        <Star size={18} />
                        Níveis & XP
                    </div>
                </button>
                <button
                    onClick={() => setActiveTab('conquistas')}
                    className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${activeTab === 'conquistas' ? 'border-purple-600 text-purple-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                    <div className="flex items-center gap-2">
                        <Award size={18} />
                        Conquistas (Badges)
                    </div>
                </button>
                <button
                    onClick={() => setActiveTab('desafios')}
                    className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${activeTab === 'desafios' ? 'border-purple-600 text-purple-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                    <div className="flex items-center gap-2">
                        <Target size={18} />
                        Desafios Alpha
                    </div>
                </button>
            </div>

            {/* Content Area */}
            <div className="min-h-[400px]">
                {/* --- ABA NÍVEIS --- */}
                {activeTab === 'niveis' && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-gray-800">Estrutura de Níveis</h2>
                            <button className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors shadow-sm">
                                <Plus size={18} /> Novo Nível
                            </button>
                        </div>

                        {niveis.length === 0 ? (
                            <EmptyState title="Nenhum nível configurado" desc="Comece criando o Nível 1 (Faixa Branca) para os alunos." />
                        ) : (
                            <div className="grid gap-4">
                                {niveis.map(nivel => (
                                    <div key={nivel.id} className="bg-white p-4 rounded-xl border border-gray-100 flex items-center justify-between shadow-sm">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-lg">
                                                {nivel.numero}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900">{nivel.titulo}</h3>
                                                <p className="text-sm text-gray-500">Requer {nivel.xp_minimo} XP</p>
                                            </div>
                                        </div>
                                        <div className="text-purple-600 font-medium text-sm cursor-pointer hover:underline">Editar</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* --- ABA CONQUISTAS --- */}
                {activeTab === 'conquistas' && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-gray-800">Biblioteca de Conquistas</h2>
                            <Link
                                href="/admin/gamificacao/nova"
                                className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors shadow-sm"
                            >
                                <Plus size={18} /> Nova Conquista
                            </Link>
                        </div>

                        {conquistas.length === 0 ? (
                            <EmptyState title="Nenhuma conquista criada" desc="Crie medalhas para premiar o progresso dos alunos (ex: Primeira Aula)." />
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {conquistas.map(c => (
                                    <div key={c.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center text-center relative group">
                                        <Link
                                            href={`/admin/gamificacao/editar/${c.id}`}
                                            className="absolute top-4 right-4 text-gray-400 hover:text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            Editar
                                        </Link>
                                        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 mb-4">
                                            <Trophy size={32} />
                                        </div>
                                        <h3 className="font-bold text-gray-900">{c.name}</h3>
                                        <p className="text-sm text-gray-500 my-2 line-clamp-2">{c.description}</p>
                                        <span className="text-xs font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                                            +{c.points_reward} XP
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* --- ABA DESAFIOS --- */}
                {activeTab === 'desafios' && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-gray-800">Desafios Alpha Sazonais</h2>
                            <button className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors shadow-sm">
                                <Plus size={18} /> Novo Desafio
                            </button>
                        </div>

                        {desafios.length === 0 ? (
                            <EmptyState title="Sem desafios ativos" desc="Crie desafios temporários para engajar a turma." />
                        ) : (
                            <div className="space-y-4">
                                {desafios.map(d => (
                                    <div key={d.id} className="bg-white p-5 rounded-xl border border-l-4 border-l-red-500 border-gray-100 shadow-sm">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                                                    <Zap size={18} className="text-red-500" />
                                                    {d.titulo}
                                                </h3>
                                                <p className="text-gray-600 mt-1">{d.descricao}</p>
                                            </div>
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${d.ativo ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                                {d.ativo ? 'ATIVO' : 'ENCERRADO'}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

function EmptyState({ title, desc }: { title: string, desc: string }) {
    return (
        <div className="flex flex-col items-center justify-center py-12 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <Shield className="w-12 h-12 text-gray-300 mb-3" />
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            <p className="text-gray-500 max-w-sm">{desc}</p>
        </div>
    )
}
