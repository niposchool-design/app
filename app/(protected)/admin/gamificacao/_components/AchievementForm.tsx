'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AchievementInsert, createAchievement, updateAchievement, deleteAchievement } from '@/src/lib/supabase/mutations/gamificacao';
import { AchievementRow } from '@/src/lib/supabase/queries/gamificacao';
import { ChevronLeft, Save, Trash2, Trophy, Loader2, HelpCircle } from 'lucide-react';
import Link from 'next/link';

interface AchievementFormProps {
    initialData?: AchievementRow;
}

export function AchievementForm({ initialData }: AchievementFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<Partial<AchievementRow>>({
        name: initialData?.name || '',
        description: initialData?.description || '',
        category: initialData?.category || 'geral',
        points_reward: initialData?.points_reward || 10,
        icon_url: initialData?.icon_url || '',
        requirements: initialData?.requirements || {}
    });

    const isEditing = !!initialData;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        if (!formData.name || !formData.description) {
            alert('Preencha os campos obrigatórios.');
            return;
        }

        setLoading(true);
        try {
            const payload = {
                ...formData,
                points_reward: Number(formData.points_reward)
            } as any; // Type assertion temporária devido a tipos parciais

            if (isEditing && initialData) {
                await updateAchievement(initialData.id, payload);
                alert('Conquista atualizada!');
            } else {
                await createAchievement(payload);
                alert('Conquista criada!');
            }
            router.push('/admin/gamificacao');
            router.refresh();
        } catch (error) {
            console.error(error);
            alert('Erro ao salvar.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!initialData || !confirm('Tem certeza que deseja excluir esta conquista? Isso não pode ser desfeito.')) return;

        setLoading(true);
        try {
            await deleteAchievement(initialData.id);
            router.push('/admin/gamificacao');
            router.refresh();
        } catch (error) {
            console.error(error);
            alert('Erro ao excluir.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <Link href="/admin/gamificacao" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 transition-colors">
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Voltar para Gamificação
                </Link>
                {isEditing && (
                    <button
                        onClick={handleDelete}
                        className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center gap-1"
                    >
                        <Trash2 size={16} />
                        Excluir Conquista
                    </button>
                )}
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row">
                {/* Preview Card */}
                <div className="bg-gray-50 p-8 md:w-1/3 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-200">
                    <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-6">Pré-visualização</h3>

                    <div className="bg-white p-6 rounded-xl shadow-lg border border-purple-100 flex flex-col items-center text-center w-full max-w-[240px] transform transition-transform hover:scale-105 duration-300">
                        <div className="w-20 h-20 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-full flex items-center justify-center text-yellow-600 mb-4 shadow-inner">
                            {formData.icon_url ? (
                                <img src={formData.icon_url} alt="" className="w-12 h-12 object-contain" />
                            ) : (
                                <Trophy size={40} />
                            )}
                        </div>
                        <h3 className="font-bold text-gray-900 text-lg leading-tight mb-2">
                            {formData.name || 'Nome da Conquista'}
                        </h3>
                        <p className="text-xs text-gray-500 line-clamp-3 mb-3">
                            {formData.description || 'Descrição da conquista aparecerá aqui.'}
                        </p>
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
                            +{formData.points_reward || 0} XP
                        </span>
                    </div>

                    <p className="text-xs text-gray-400 mt-8 text-center px-4">
                        É assim que o cartão aparecerá para os alunos.
                    </p>
                </div>

                {/* Form Fields */}
                <div className="p-8 md:w-2/3 space-y-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">
                            {isEditing ? 'Editar Conquista' : 'Nova Conquista'}
                        </h1>
                        <p className="text-gray-500 text-sm">Configure os detalhes da medalha/badge.</p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Conquista *</label>
                            <input
                                name="name"
                                value={formData.name || ''}
                                onChange={handleChange}
                                placeholder="Ex: Mestre do Ritmo"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition-shadow"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Descrição *</label>
                            <textarea
                                name="description"
                                value={formData.description || ''}
                                onChange={handleChange}
                                rows={3}
                                placeholder="O que o aluno precisa fazer para ganhar?"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition-shadow resize-none"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">XP Recompensa</label>
                                <input
                                    type="number"
                                    name="points_reward"
                                    value={formData.points_reward}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition-shadow"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                                <select
                                    name="category"
                                    value={formData.category || 'geral'}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition-shadow bg-white"
                                >
                                    <option value="geral">Geral</option>
                                    <option value="tecnica">Técnica</option>
                                    <option value="teoria">Teoria</option>
                                    <option value="repertorio">Repertório</option>
                                    <option value="evento">Eventos</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center justify-between">
                                <span>URL do Ícone (Opcional)</span>
                                <span className="text-xs text-gray-400 font-normal">Recomendado: Imagem PNG transparente</span>
                            </label>
                            <input
                                name="icon_url"
                                value={formData.icon_url || ''}
                                onChange={handleChange}
                                placeholder="https://..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition-shadow text-sm"
                            />
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                        <Link
                            href="/admin/gamificacao"
                            className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                        >
                            Cancelar
                        </Link>
                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="px-6 py-2.5 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center gap-2"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save size={18} />}
                            Salvar Conquista
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
