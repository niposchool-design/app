'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createAchievement, updateAchievement, deleteAchievement } from '@/src/lib/supabase/mutations/gamificacao';
import { Loader2, Save, ArrowLeft, Trophy, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { AchievementRow } from '@/src/lib/supabase/queries/gamificacao';

interface ConquistaFormProps {
    initialData?: AchievementRow;
    isEditing?: boolean;
}

export function ConquistaForm({ initialData, isEditing = false }: ConquistaFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        description: initialData?.description || '',
        badge_icon: initialData?.badge_icon || 'trophy',
        badge_color: initialData?.badge_color || 'yellow',
        points_reward: initialData?.points_reward || 10,
        category: initialData?.category || 'geral',
        requirement_type: initialData?.requirement_type || 'manual', // manual, automatico_aulas, automatico_tempo
        requirement_value: initialData?.requirement_value || 1,
        is_active: initialData?.is_active ?? true,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        let finalValue: any = value;
        if (type === 'number') finalValue = Number(value);
        if (type === 'checkbox') finalValue = (e.target as HTMLInputElement).checked;

        setFormData(prev => ({ ...prev, [name]: finalValue }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isEditing && initialData?.id) {
                await updateAchievement(initialData.id, formData);
            } else {
                await createAchievement(formData);
            }

            // Forçar revalidação e voltar
            router.push('/admin/gamificacao');
            router.refresh();
        } catch (err) {
            console.error(err);
            setError('Erro ao salvar a conquista. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!initialData?.id || !confirm('Tem certeza que deseja excluir esta conquista? Esta ação não pode ser desfeita.')) return;

        setLoading(true);
        try {
            await deleteAchievement(initialData.id);
            router.push('/admin/gamificacao');
            router.refresh();
        } catch (err) {
            console.error(err);
            setError('Erro ao excluir conquista.');
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm border border-red-100">
                    {error}
                </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
                <div className="flex gap-4 items-start">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white bg-${formData.badge_color === 'yellow' ? 'yellow-500' : formData.badge_color === 'purple' ? 'purple-600' : 'blue-500'}`}>
                        <Trophy size={32} />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-gray-900">Preview Visual</h3>
                        <p className="text-sm text-gray-500">Como a medalha aparecerá para o aluno.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Conquista</label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                            placeholder="Ex: Mestre do Ritmo"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={3}
                            className="w-full rounded-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                            placeholder="Descrição que o aluno verá ao ganhar (ou tentar ganhar)..."
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
                                required
                                min="0"
                                className="w-full rounded-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full rounded-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                            >
                                <option value="geral">Geral</option>
                                <option value="academico">Acadêmico</option>
                                <option value="social">Social</option>
                                <option value="evento">Eventos</option>
                            </select>
                        </div>
                    </div>

                    {/* Configurações Avançadas (Cor, Ícone - Simples Select por enquanto) */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Cor do Badge</label>
                            <select
                                name="badge_color"
                                value={formData.badge_color}
                                onChange={handleChange}
                                className="w-full rounded-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                            >
                                <option value="yellow">Dourado (Padrão)</option>
                                <option value="purple">Roxo (Épico)</option>
                                <option value="blue">Azul (Raro)</option>
                                <option value="gray">Prata (Comum)</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                {isEditing && (
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="flex items-center gap-2 text-red-600 hover:text-red-800 px-4 py-2 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
                    >
                        <Trash2 size={18} />
                        Excluir Conquista
                    </button>
                )}

                <div className="flex items-center gap-3 ml-auto">
                    <Link
                        href="/admin/gamificacao"
                        className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                    >
                        Cancelar
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center gap-2 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors shadow-sm disabled:opacity-50"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Salvando...
                            </>
                        ) : (
                            <>
                                <Save className="w-5 h-5" />
                                Salvar Conquista
                            </>
                        )}
                    </button>
                </div>
            </div>
        </form>
    );
}
