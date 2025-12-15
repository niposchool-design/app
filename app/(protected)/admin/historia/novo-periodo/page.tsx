'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { criarPeriodo } from '@/src/lib/supabase/mutations/historia';
import Link from 'next/link';
import { ChevronLeft, Save, Loader2 } from 'lucide-react';

export default function NovoPeriodoPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        nome: '',
        descricao: '',
        data_inicio: '',
        data_fim: '',
        cor_tematica: '#e5e7eb',
        imagem_capa: '',
        ordem_cronologica: 0,
        ativo: true
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await criarPeriodo({
                ...formData,
                ordem_cronologica: Number(formData.ordem_cronologica)
            });
            alert('Período criado com sucesso!');
            router.push('/admin/historia');
        } catch (error) {
            console.error(error);
            alert('Erro ao criar período.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 lg:p-8 space-y-6">
            <Link href="/admin/historia" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 transition-colors">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Voltar
            </Link>

            <div>
                <h1 className="text-2xl font-bold text-gray-900">Novo Período Histórico</h1>
                <p className="text-gray-600">Adicione um novo período à linha do tempo musical.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Período *</label>
                    <input
                        required
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        placeholder="Ex: Barroco, Clássico, Era Meiji"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                    <textarea
                        rows={4}
                        name="descricao"
                        value={formData.descricao}
                        onChange={handleChange}
                        placeholder="Breve resumo sobre o período..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ano Início *</label>
                        <input
                            required
                            name="data_inicio"
                            value={formData.data_inicio}
                            onChange={handleChange}
                            placeholder="Ex: 1600"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ano Fim</label>
                        <input
                            name="data_fim"
                            value={formData.data_fim}
                            onChange={handleChange}
                            placeholder="Ex: 1750 (deixe vazio se atual)"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cor Temática</label>
                        <div className="flex gap-2">
                            <input
                                type="color"
                                name="cor_tematica"
                                value={formData.cor_tematica}
                                onChange={handleChange}
                                className="h-10 w-10 p-0 border-0 rounded cursor-pointer"
                            />
                            <input
                                type="text"
                                name="cor_tematica"
                                value={formData.cor_tematica}
                                onChange={handleChange}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none uppercase"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ordem Cronológica</label>
                        <input
                            type="number"
                            name="ordem_cronologica"
                            value={formData.ordem_cronologica}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">URL Imagem de Capa</label>
                    <input
                        name="imagem_capa"
                        value={formData.imagem_capa}
                        onChange={handleChange}
                        placeholder="https://..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                    />
                </div>

                <div className="flex items-center gap-2 pt-2">
                    <input
                        type="checkbox"
                        id="ativo"
                        checked={formData.ativo}
                        onChange={(e) => setFormData(prev => ({ ...prev, ativo: e.target.checked }))}
                        className="w-4 h-4 text-red-600 rounded"
                    />
                    <label htmlFor="ativo" className="text-sm font-medium text-gray-700">Período Ativo (visível para alunos)</label>
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                    <Link href="/admin/historia" className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                        Cancelar
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 flex items-center gap-2"
                    >
                        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                        Salvar Período
                    </button>
                </div>
            </form>
        </div>
    );
}
