
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Database } from '@/lib/supabase/database.types';
import { criarCuriosidade, atualizarCuriosidade, deletarCuriosidade } from '@/src/lib/supabase/mutations/instrumentos';
import { Plus, Trash2, Edit2, Save, X, ImageIcon } from 'lucide-react';

type Curiosidade = Database['public']['Tables']['instrumento_curiosidades']['Row'];
type CuriosidadeInsert = Database['public']['Tables']['instrumento_curiosidades']['Insert'];

interface CuriosidadesTabProps {
    instrumentoId: string;
    curiosidades: Curiosidade[];
}

export function CuriosidadesTab({ instrumentoId, curiosidades }: CuriosidadesTabProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    const emptyForm: CuriosidadeInsert = {
        instrumento_id: instrumentoId,
        titulo: '',
        descricao: '',
        imagem_url: '',
        ordem: 0
    };

    const [formData, setFormData] = useState<CuriosidadeInsert>(emptyForm);

    const handleEdit = (item: Curiosidade) => {
        setFormData({
            instrumento_id: item.instrumento_id,
            titulo: item.titulo,
            descricao: item.descricao,
            imagem_url: item.imagem_url,
            ordem: item.ordem
        });
        setEditingId(item.id);
        setIsCreating(false);
    };

    const handleCreate = () => {
        setFormData({ ...emptyForm, ordem: curiosidades.length + 1 });
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
                await atualizarCuriosidade(editingId, formData);
            } else {
                await criarCuriosidade(formData);
            }
            router.refresh();
            handleCancel();
        } catch (error) {
            console.error(error);
            alert('Erro ao salvar curiosidade.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir esta curiosidade?')) return;
        setLoading(true);
        try {
            await deletarCuriosidade(id);
            router.refresh();
        } catch (error) {
            console.error(error);
            alert('Erro ao excluir curiosidade.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Curiosidades e Fatos</h3>
                <button
                    onClick={handleCreate}
                    disabled={isCreating || !!editingId}
                    className="flex items-center gap-2 text-sm bg-red-50 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-100 disabled:opacity-50"
                >
                    <Plus size={16} />
                    Adicionar Curiosidade
                </button>
            </div>

            {/* Form Area */}
            {(isCreating || editingId) && (
                <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-lg border border-gray-200 animate-in fade-in slide-in-from-top-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-xs font-medium text-gray-700 mb-1">Título</label>
                            <input
                                required
                                value={formData.titulo}
                                onChange={e => setFormData({ ...formData, titulo: e.target.value })}
                                className="w-full text-sm px-3 py-2 border rounded-md"
                                placeholder="Ex: Origem do nome"
                            />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-xs font-medium text-gray-700 mb-1">Ordem</label>
                            <input
                                type="number"
                                value={formData.ordem || 0}
                                onChange={e => setFormData({ ...formData, ordem: parseInt(e.target.value) || 0 })}
                                className="w-full text-sm px-3 py-2 border rounded-md"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-xs font-medium text-gray-700 mb-1">Descrição</label>
                            <textarea
                                required
                                rows={3}
                                value={formData.descricao}
                                onChange={e => setFormData({ ...formData, descricao: e.target.value })}
                                className="w-full text-sm px-3 py-2 border rounded-md"
                                placeholder="Detalhes interessantes..."
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-xs font-medium text-gray-700 mb-1">URL da Imagem (Opcional)</label>
                            <input
                                value={formData.imagem_url || ''}
                                onChange={e => setFormData({ ...formData, imagem_url: e.target.value })}
                                className="w-full text-sm px-3 py-2 border rounded-md font-mono"
                                placeholder="https://..."
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {curiosidades.map((item) => (
                    <div key={item.id} className="border border-gray-200 rounded-lg p-4 bg-white flex gap-4 group hover:border-red-200 transition-colors">
                        <div className="w-16 h-16 bg-gray-100 rounded-md flex-shrink-0 overflow-hidden flex items-center justify-center text-gray-400">
                            {item.imagem_url ? (
                                <img src={item.imagem_url} alt="" className="w-full h-full object-cover" />
                            ) : (
                                <ImageIcon size={24} />
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                                <h4 className="font-medium text-gray-900 truncate">{item.titulo}</h4>
                                <div className="flex opacity-0 group-hover:opacity-100 transition-opacity gap-1">
                                    <button onClick={() => handleEdit(item)} className="p-1 hover:bg-gray-100 rounded text-blue-600">
                                        <Edit2 size={14} />
                                    </button>
                                    <button onClick={() => handleDelete(item.id)} className="p-1 hover:bg-gray-100 rounded text-red-600">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                            <p className="text-sm text-gray-500 line-clamp-2 mt-1">{item.descricao}</p>
                            <span className="text-xs text-gray-400 mt-2 block">Ordem: {item.ordem}</span>
                        </div>
                    </div>
                ))}
            </div>

            {curiosidades.length === 0 && !isCreating && (
                <div className="text-center py-10 text-gray-400">
                    Nenhuma curiosidade cadastrada.
                </div>
            )}
        </div>
    );
}
