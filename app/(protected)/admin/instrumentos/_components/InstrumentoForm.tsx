'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { InstrumentoFull } from '@/src/lib/supabase/queries/instrumentos';
import { criarInstrumento, atualizarInstrumento } from '@/src/lib/supabase/mutations/instrumentos';
import { Save, Music, Info, Upload, List as ListIcon, Trash2, Plus } from 'lucide-react';
import clsx from 'clsx';
import { Database } from '@/lib/supabase/database.types';
import { CuriosidadesTab } from './tabs/CuriosidadesTab';
import { MidiasTab } from './tabs/MidiasTab';
import { TecnicasTab } from './tabs/TecnicasTab';

type InstrumentoInsert = Database['public']['Tables']['instrumentos']['Insert'];

interface InstrumentoFormProps {
    initialData?: InstrumentoFull | null;
}

export function InstrumentoForm({ initialData }: InstrumentoFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<'geral' | 'curiosidades' | 'midia' | 'tecnicas'>('geral');

    // Main Form State
    const [formData, setFormData] = useState<InstrumentoInsert>({
        nome: initialData?.nome || '',
        familia: initialData?.familia || '',
        categoria: initialData?.categoria || '',
        descricao: initialData?.descricao || '',
        // origem: initialData?.origem || '', // Removed as it might not be in DB
        imagem_url: initialData?.imagem_url || '',
        video_destaque_url: initialData?.video_destaque_url || '',
        audio_exemplo_url: initialData?.audio_exemplo_url || '',
        popularidade: initialData?.popularidade || 0,
        ordem: initialData?.ordem || 0,
        ativo: initialData?.ativo ?? true,
    });

    const isEditing = !!initialData?.id;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            // @ts-ignore
            setFormData(prev => ({ ...prev, [name]: e.target.checked }));
        } else if (type === 'number') {
            setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isEditing && initialData?.id) {
                await atualizarInstrumento(initialData.id, formData);
                alert('Instrumento atualizado com sucesso!');
            } else {
                const novo = await criarInstrumento(formData);
                if (novo?.id) {
                    // Redirect to edit mode to enable tabs
                    router.push(`/admin/instrumentos/${novo.id}`);
                }
            }
            router.refresh();
        } catch (error) {
            console.error(error);
            alert('Erro ao salvar instrumento.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Tabs */}
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    {[
                        { id: 'geral', name: 'Visão Geral', icon: Info },
                        { id: 'curiosidades', name: 'Curiosidades', icon: Save, disabled: !isEditing },
                        { id: 'midia', name: 'Mídia & Sons', icon: Upload, disabled: !isEditing },
                        { id: 'tecnicas', name: 'Técnicas', icon: ListIcon, disabled: !isEditing },
                    ].map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => !tab.disabled && setActiveTab(tab.id as any)}
                                disabled={tab.disabled}
                                className={clsx(
                                    activeTab === tab.id
                                        ? 'border-red-500 text-red-600'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                    'group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed'
                                )}
                            >
                                <Icon className={clsx(
                                    activeTab === tab.id ? 'text-red-500' : 'text-gray-400 group-hover:text-gray-500',
                                    '-ml-0.5 mr-2 h-5 w-5'
                                )} />
                                {tab.name}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Content */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                {activeTab === 'geral' && (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Nome <span className="text-red-500">*</span></label>
                                <input
                                    required
                                    name="nome"
                                    value={formData.nome || ''}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Família</label>
                                <select
                                    name="familia"
                                    value={formData.familia || ''}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none bg-white"
                                >
                                    <option value="">Selecione...</option>
                                    <option value="cordas">Cordas</option>
                                    <option value="sopro">Sopro</option>
                                    <option value="percussao">Percussão</option>
                                    <option value="teclas">Teclas</option>
                                    <option value="eletronico">Eletrônico</option>
                                    <option value="vocal">Vocal</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Categoria</label>
                                <input
                                    name="categoria"
                                    value={formData.categoria || ''}
                                    onChange={handleChange}
                                    placeholder="Ex: Popular, Clássico, etc."
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Ordem de Exibição</label>
                                <input
                                    type="number"
                                    name="ordem"
                                    value={formData.ordem || 0}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                                />
                            </div>

                            <div className="col-span-full">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                                <textarea
                                    name="descricao"
                                    value={formData.descricao || ''}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                                />
                            </div>

                            <div className="col-span-full space-y-4">
                                <h3 className="font-semibold text-gray-900 border-b pb-2">Links Principais</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">URL da Imagem</label>
                                        <input
                                            name="imagem_url"
                                            value={formData.imagem_url || ''}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none font-mono text-xs"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">Vídeo Destaque (Youtube)</label>
                                        <input
                                            name="video_destaque_url"
                                            value={formData.video_destaque_url || ''}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none font-mono text-xs"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">Áudio Exemplo</label>
                                        <input
                                            name="audio_exemplo_url"
                                            value={formData.audio_exemplo_url || ''}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none font-mono text-xs"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 pt-4">
                            <input
                                type="checkbox"
                                id="ativo"
                                name="ativo"
                                checked={formData.ativo ?? true}
                                onChange={handleChange}
                                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                            />
                            <label htmlFor="ativo" className="text-sm font-medium text-gray-700">
                                Instrumento Ativo
                            </label>
                        </div>

                        <div className="flex justify-between pt-6 border-t">
                            {isEditing && (
                                <button
                                    type="button"
                                    onClick={async () => {
                                        if (!initialData?.id || !confirm('Tem certeza que deseja excluir este instrumento? Esta ação não pode ser desfeita.')) return;
                                        setLoading(true);
                                        try {
                                            await import('@/src/lib/supabase/mutations/instrumentos').then(m => m.deletarInstrumento(initialData.id));
                                            router.push('/admin/instrumentos');
                                            router.refresh();
                                        } catch (error) {
                                            console.error(error);
                                            alert('Erro ao excluir instrumento.');
                                            setLoading(false);
                                        }
                                    }}
                                    disabled={loading}
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50 font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Excluir Instrumento
                                </button>
                            )}
                            <div className={clsx("flex justify-end gap-2", !isEditing && "w-full")}>
                                <button
                                    type="button"
                                    onClick={() => router.back()}
                                    className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition-colors flex items-center gap-2"
                                >
                                    {loading && <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />}
                                    Salvar Alterações
                                </button>
                            </div>
                        </div>
                    </form>
                )}

                {activeTab === 'curiosidades' && initialData && (
                    <CuriosidadesTab
                        instrumentoId={initialData.id}
                        curiosidades={initialData.curiosidades_lista || []}
                    />
                )}

                {activeTab === 'midia' && initialData && (
                    <MidiasTab
                        instrumentoId={initialData.id}
                        midias={initialData.midias || []}
                        sons={initialData.sons || []}
                    />
                )}

                {activeTab === 'tecnicas' && initialData && (
                    <TecnicasTab
                        instrumentoId={initialData.id}
                        tecnicas={initialData.tecnicas || []}
                    />
                )}
            </div>
        </div>
    );
}

