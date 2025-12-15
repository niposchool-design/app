
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Database } from '@/lib/supabase/database.types';
import { criarMidia, atualizarMidia, deletarMidia, criarSom, atualizarSom, deletarSom } from '@/src/lib/supabase/mutations/instrumentos';
import { Plus, Trash2, Edit2, Save, Video, Music, Image as ImageIcon, Volume2 } from 'lucide-react';

type Midia = Database['public']['Tables']['instrumento_midias']['Row'];
type Som = Database['public']['Tables']['instrumento_sons']['Row'];

interface MidiasTabProps {
    instrumentoId: string;
    midias: Midia[];
    sons: Som[];
}

export function MidiasTab({ instrumentoId, midias, sons }: MidiasTabProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // --- State Mídia ---
    const [editingMidiaId, setEditingMidiaId] = useState<string | null>(null);
    const [isCreatingMidia, setIsCreatingMidia] = useState(false);
    const [midiaForm, setMidiaForm] = useState({
        instrumento_id: instrumentoId,
        titulo: '',
        tipo: 'imagem',
        url: '',
        thumbnail_url: ''
    });

    // --- State Sons ---
    const [editingSomId, setEditingSomId] = useState<string | null>(null);
    const [isCreatingSom, setIsCreatingSom] = useState(false);
    const [somForm, setSomForm] = useState({
        instrumento_id: instrumentoId,
        titulo: '',
        descricao: '',
        audio_url: '',
        tipo: 'padrao'
    });

    // --- Handlers Mídia ---
    const handleSaveMidia = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editingMidiaId) {
                await atualizarMidia(editingMidiaId, midiaForm);
            } else {
                await criarMidia(midiaForm);
            }
            router.refresh();
            setEditingMidiaId(null);
            setIsCreatingMidia(false);
            setMidiaForm({ ...midiaForm, titulo: '', url: '', thumbnail_url: '' });
        } catch (err) {
            console.error(err);
            alert('Erro ao salvar mídia');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteMidia = async (id: string) => {
        if (!confirm('Excluir mídia?')) return;
        setLoading(true);
        await deletarMidia(id);
        router.refresh();
        setLoading(false);
    };

    // --- Handlers Sons ---
    const handleSaveSom = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editingSomId) {
                await atualizarSom(editingSomId, somForm);
            } else {
                await criarSom(somForm);
            }
            router.refresh();
            setEditingSomId(null);
            setIsCreatingSom(false);
            setSomForm({ ...somForm, titulo: '', descricao: '', audio_url: '' });
        } catch (err) {
            console.error(err);
            alert('Erro ao salvar som');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteSom = async (id: string) => {
        if (!confirm('Excluir som?')) return;
        setLoading(true);
        await deletarSom(id);
        router.refresh();
        setLoading(false);
    };

    return (
        <div className="space-y-12">
            {/* Seção Mídias (Fotos/Vídeos) */}
            <div className="space-y-6">
                <div className="flex justify-between items-center border-b pb-4">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                        <Video size={20} />
                        Galeria de Mídia (Fotos/Vídeos)
                    </h3>
                    <button
                        onClick={() => setIsCreatingMidia(true)}
                        disabled={isCreatingMidia || !!editingMidiaId}
                        className="text-sm bg-red-50 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-100 disabled:opacity-50 flex items-center gap-1"
                    >
                        <Plus size={16} /> Adicionar
                    </button>
                </div>

                {(isCreatingMidia || editingMidiaId) && (
                    <form onSubmit={handleSaveMidia} className="bg-gray-50 p-4 rounded-lg flex flex-col gap-3 border">
                        <div className="grid grid-cols-2 gap-3">
                            <input
                                placeholder="Título"
                                className="border p-2 rounded text-sm"
                                value={midiaForm.titulo}
                                onChange={e => setMidiaForm({ ...midiaForm, titulo: e.target.value })}
                                required
                            />
                            <select
                                className="border p-2 rounded text-sm"
                                value={midiaForm.tipo}
                                onChange={e => setMidiaForm({ ...midiaForm, tipo: e.target.value })}
                            >
                                <option value="imagem">Imagem</option>
                                <option value="video">Vídeo</option>
                            </select>
                            <input
                                placeholder="URL do Arquivo"
                                className="border p-2 rounded text-sm col-span-2 font-mono"
                                value={midiaForm.url}
                                onChange={e => setMidiaForm({ ...midiaForm, url: e.target.value })}
                                required
                            />
                            <input
                                placeholder="Thumbnail URL (Opcional)"
                                className="border p-2 rounded text-sm col-span-2 font-mono"
                                value={midiaForm.thumbnail_url || ''}
                                onChange={e => setMidiaForm({ ...midiaForm, thumbnail_url: e.target.value })}
                            />
                        </div>
                        <div className="flex justify-end gap-2 mt-2">
                            <button type="button" onClick={() => { setIsCreatingMidia(false); setEditingMidiaId(null); }} className="text-sm text-gray-500">Cancelar</button>
                            <button type="submit" disabled={loading} className="bg-red-600 text-white px-3 py-1 rounded text-sm">Salvar</button>
                        </div>
                    </form>
                )}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {midias.map(item => (
                        <div key={item.id} className="relative group border rounded-lg overflow-hidden bg-gray-100">
                            <div className="aspect-video bg-gray-200 flex items-center justify-center">
                                {item.tipo === 'imagem' ? (
                                    <img src={item.url} className="w-full h-full object-cover" />
                                ) : (
                                    <Video className="text-gray-400" />
                                )}
                            </div>
                            <div className="p-2 bg-white">
                                <p className="text-sm font-medium truncate">{item.titulo}</p>
                                <p className="text-xs text-gray-500 capitalize">{item.tipo}</p>
                            </div>
                            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => { setMidiaForm(item as any); setEditingMidiaId(item.id); setIsCreatingMidia(false); }} className="bg-white p-1 rounded shadow text-blue-600"><Edit2 size={12} /></button>
                                <button onClick={() => handleDeleteMidia(item.id)} className="bg-white p-1 rounded shadow text-red-600"><Trash2 size={12} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Seção Sons (Amostras de Áudio) */}
            <div className="space-y-6">
                <div className="flex justify-between items-center border-b pb-4">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                        <Volume2 size={20} />
                        Amostras de Som (Áudio)
                    </h3>
                    <button
                        onClick={() => setIsCreatingSom(true)}
                        disabled={isCreatingSom || !!editingSomId}
                        className="text-sm bg-red-50 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-100 disabled:opacity-50 flex items-center gap-1"
                    >
                        <Plus size={16} /> Adicionar
                    </button>
                </div>

                {(isCreatingSom || editingSomId) && (
                    <form onSubmit={handleSaveSom} className="bg-gray-50 p-4 rounded-lg flex flex-col gap-3 border">
                        <div className="grid grid-cols-2 gap-3">
                            <input
                                placeholder="Título"
                                className="border p-2 rounded text-sm"
                                value={somForm.titulo}
                                onChange={e => setSomForm({ ...somForm, titulo: e.target.value })}
                                required
                            />
                            <input
                                placeholder="Tipo (Ex: Corda Solta, Acorde)"
                                className="border p-2 rounded text-sm"
                                value={somForm.tipo || ''}
                                onChange={e => setSomForm({ ...somForm, tipo: e.target.value })}
                            />
                            <input
                                placeholder="URL do Áudio (MP3/WAV)"
                                className="border p-2 rounded text-sm col-span-2 font-mono"
                                value={somForm.audio_url}
                                onChange={e => setSomForm({ ...somForm, audio_url: e.target.value })}
                                required
                            />
                            <textarea
                                placeholder="Descrição (Opcional)"
                                className="border p-2 rounded text-sm col-span-2"
                                rows={2}
                                value={somForm.descricao || ''}
                                onChange={e => setSomForm({ ...somForm, descricao: e.target.value })}
                            />
                        </div>
                        <div className="flex justify-end gap-2 mt-2">
                            <button type="button" onClick={() => { setIsCreatingSom(false); setEditingSomId(null); }} className="text-sm text-gray-500">Cancelar</button>
                            <button type="submit" disabled={loading} className="bg-red-600 text-white px-3 py-1 rounded text-sm">Salvar</button>
                        </div>
                    </form>
                )}

                <div className="space-y-2">
                    {sons.map(item => (
                        <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg bg-white hover:border-red-200 group">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center text-red-500">
                                    <Music size={20} />
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900">{item.titulo}</h4>
                                    <p className="text-xs text-gray-500">{item.descricao || item.tipo}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <audio controls src={item.audio_url} className="h-8 w-48" />
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => { setSomForm(item as any); setEditingSomId(item.id); setIsCreatingSom(false); }} className="p-1 text-blue-600 hover:bg-blue-50 rounded"><Edit2 size={16} /></button>
                                    <button onClick={() => handleDeleteSom(item.id)} className="p-1 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {sons.length === 0 && !isCreatingSom && (
                        <p className="text-gray-400 text-center py-4 text-sm">Nenhum áudio cadastrado.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
