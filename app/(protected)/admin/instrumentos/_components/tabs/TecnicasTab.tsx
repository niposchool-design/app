
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Database } from '@/lib/supabase/database.types';
import { criarTecnica, atualizarTecnica, deletarTecnica } from '@/src/lib/supabase/mutations/instrumentos';
import { Plus, Trash2, Edit2, Save, BookOpen, Video } from 'lucide-react';

type Tecnica = Database['public']['Tables']['instrumento_tecnicas']['Row'];
type TecnicaInsert = Database['public']['Tables']['instrumento_tecnicas']['Insert'];

interface TecnicasTabProps {
    instrumentoId: string;
    tecnicas: Tecnica[];
}

export function TecnicasTab({ instrumentoId, tecnicas }: TecnicasTabProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    const emptyForm: TecnicaInsert = {
        instrumento_id: instrumentoId,
        nome: '',
        descricao: '',
        dificuldade: 'iniciante',
        video_url: ''
    };

    const [formData, setFormData] = useState<TecnicaInsert>(emptyForm);

    const handleEdit = (item: Tecnica) => {
        setFormData({
            instrumento_id: item.instrumento_id,
            nome: item.nome,
            descricao: item.descricao,
            dificuldade: item.dificuldade,
            video_url: item.video_url
        });
        setEditingId(item.id);
        setIsCreating(false);
    };

    const handleCreate = () => {
        setFormData(emptyForm);
        setEditingId(null);
        setIsCreating(true);
    };

    const handleCancel = () => {
        setEditingId(null);
        setIsCreating(false);
        setFormData(emptyForm);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (editingId) {
                await atualizarTecnica(editingId, formData);
            } else {
                await criarTecnica(formData);
            }
            router.refresh();
            handleCancel();
        } catch (error) {
            console.error(error);
            alert('Erro ao salvar técnica.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir esta técnica?')) return;
        setLoading(true);
        try {
            await deletarTecnica(id);
            router.refresh();
        } catch (error) {
            console.error(error);
            alert('Erro ao excluir técnica.');
        } finally {
            setLoading(false);
        }
    };

    const getDifficultyColor = (diff: string | null) => {
        switch (diff) {
            case 'iniciante': return 'bg-green-100 text-green-800';
            case 'intermediário': return 'bg-yellow-100 text-yellow-800';
            case 'avançado': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Técnicas e Habilidades</h3>
                <button
                    onClick={handleCreate}
                    disabled={isCreating || !!editingId}
                    className="flex items-center gap-2 text-sm bg-red-50 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-100 disabled:opacity-50"
                >
                    <Plus size={16} />
                    Adicionar Técnica
                </button>
            </div>

            {/* Form Area */}
            {(isCreating || editingId) && (
                <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-lg border border-gray-200 animate-in fade-in slide-in-from-top-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="col-span-1">
                            <label className="block text-xs font-medium text-gray-700 mb-1">Nome da Técnica</label>
                            <input
                                required
                                value={formData.nome}
                                onChange={e => setFormData({ ...formData, nome: e.target.value })}
                                className="w-full text-sm px-3 py-2 border rounded-md"
                                placeholder="Ex: Vibrato"
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-xs font-medium text-gray-700 mb-1">Dificuldade</label>
                            <select
                                value={formData.dificuldade || ''}
                                onChange={e => setFormData({ ...formData, dificuldade: e.target.value })}
                                className="w-full text-sm px-3 py-2 border rounded-md"
                            >
                                <option value="iniciante">Iniciante</option>
                                <option value="intermediário">Intermediário</option>
                                <option value="avançado">Avançado</option>
                            </select>
                        </div>
                        <div className="col-span-2">
                            <label className="block text-xs font-medium text-gray-700 mb-1">Descrição</label>
                            <textarea
                                required
                                rows={3}
                                value={formData.descricao || ''}
                                onChange={e => setFormData({ ...formData, descricao: e.target.value })}
                                className="w-full text-sm px-3 py-2 border rounded-md"
                                placeholder="Explique como funciona..."
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-xs font-medium text-gray-700 mb-1">Vídeo Explicativo URL (Opcional)</label>
                            <input
                                value={formData.video_url || ''}
                                onChange={e => setFormData({ ...formData, video_url: e.target.value })}
                                className="w-full text-sm px-3 py-2 border rounded-md font-mono"
                                placeholder="Youtube, Vimeo..."
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="text-sm px-3 py-1.5 text-gray-600 hover:text-gray-800"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="text-sm px-3 py-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center gap-2"
                        >
                            {loading ? <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <Save size={14} />}
                            Salvar
                        </button>
                    </div>
                </form>
            )}

            {/* List */}
            <div className="space-y-3">
                {tecnicas.map((item) => (
                    <div key={item.id} className="border border-gray-200 rounded-lg p-4 bg-white hover:border-red-200 transition-colors group">
                        <div className="flex justify-between items-start">
                            <div className="flex items-start gap-3">
                                <div className="mt-1 text-red-500">
                                    <BookOpen size={20} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-medium text-gray-900">{item.nome}</h4>
                                        <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${getDifficultyColor(item.dificuldade)}`}>
                                            {item.dificuldade}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1">{item.descricao}</p>
                                    {item.video_url && (
                                        <a href={item.video_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline mt-2">
                                            <Video size={12} />
                                            Ver vídeo explicativo
                                        </a>
                                    )}
                                </div>
                            </div>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleEdit(item)} className="p-1 hover:bg-gray-100 rounded text-blue-600">
                                    <Edit2 size={16} />
                                </button>
                                <button onClick={() => handleDelete(item.id)} className="p-1 hover:bg-gray-100 rounded text-red-600">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {tecnicas.length === 0 && !isCreating && (
                <div className="text-center py-10 text-gray-400">
                    Nenhuma técnica cadastrada.
                </div>
            )}
        </div>
    );
}
