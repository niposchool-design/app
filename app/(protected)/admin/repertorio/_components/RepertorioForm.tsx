'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createRepertorio, updateRepertorio, deleteRepertorio, RepertorioInsert } from '@/src/lib/supabase/mutations/repertorio'
import { Database } from '@/lib/supabase/database.types'
import { ChevronLeft, Save, Upload, Music, Link as LinkIcon, FileText, Video, Mic2, Trash2, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

type Repertorio = Database['public']['Tables']['repertorio']['Row']

interface RepertorioFormProps {
    initialData?: Repertorio
    categorias: { id: string; nome: string }[]
}

export function RepertorioForm({ initialData, categorias }: RepertorioFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState<Partial<RepertorioInsert>>(
        initialData ? {
            titulo: initialData.titulo,
            compositor: initialData.compositor,
            categoria_id: initialData.categoria_id,
            nivel_dificuldade: initialData.nivel_dificuldade,
            duracao_estimada: initialData.duracao_estimada || undefined,
            observacoes: initialData.observacoes || undefined,
            partitura_url: initialData.partitura_url || undefined,
            playback_url: initialData.playback_url || undefined,
            video_tutorial_url: initialData.video_tutorial_url || undefined,
            ativo: initialData.ativo || true,
            publico: initialData.publico || true,
            requer_aprovacao_professor: initialData.requer_aprovacao_professor || false,
        } : {
            titulo: '',
            compositor: '',
            categoria_id: '',
            nivel_dificuldade: 'iniciante',
            ativo: true,
            publico: true,
            requer_aprovacao_professor: false
        }
    )

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked
            setFormData(prev => ({ ...prev, [name]: checked }))
        } else if (type === 'number') {
            setFormData(prev => ({ ...prev, [name]: value ? Number(value) : undefined }))
        } else {
            setFormData(prev => ({ ...prev, [name]: value }))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            if (initialData?.id) {
                await updateRepertorio(initialData.id, formData)
            } else {
                await createRepertorio(formData as RepertorioInsert)
            }

            router.push('/admin/repertorio')
            router.refresh()
        } catch (error) {
            console.error('Erro ao salvar repertório:', error)
            alert('Erro ao salvar. Verifique o console.')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        if (!initialData?.id || !confirm('Tem certeza que deseja excluir esta música?')) return;

        setLoading(true);
        try {
            await deleteRepertorio(initialData.id);
            router.push('/admin/repertorio');
            router.refresh();
        } catch (error) {
            console.error('Erro ao excluir:', error);
            alert('Erro ao excluir.');
            setLoading(false);
        }
    };

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            onSubmit={handleSubmit}
            className="space-y-8 max-w-5xl mx-auto"
        >
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/repertorio"
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5 text-gray-500" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {initialData ? 'Editar Música' : 'Nova Música'}
                        </h1>
                        <p className="text-sm text-gray-500">
                            {initialData ? 'Atualize os dados da obra musical' : 'Adicione uma nova obra ao acervo'}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {initialData && (
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Excluir Música"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    )}
                    <Link href="/admin/repertorio" className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                        Cancelar
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 disabled:opacity-50 shadow-md shadow-purple-200"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        {loading ? 'Salvando...' : 'Salvar Música'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-6"
                    >
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                            <Music className="w-5 h-5 text-purple-500" />
                            Informações Principais
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Título da Obra</label>
                                <input
                                    type="text"
                                    name="titulo"
                                    required
                                    value={formData.titulo || ''}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                                    placeholder="Ex: Minueto em G"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Compositor</label>
                                <input
                                    type="text"
                                    name="compositor"
                                    value={formData.compositor || ''}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                                    placeholder="Ex: J.S. Bach"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
                                <select
                                    name="categoria_id"
                                    value={formData.categoria_id || ''}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none bg-white"
                                >
                                    <option value="">Selecione...</option>
                                    {categorias.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.nome}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Nível de Dificuldade</label>
                                <select
                                    name="nivel_dificuldade"
                                    value={formData.nivel_dificuldade || ''}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none bg-white"
                                >
                                    <option value="iniciante">Iniciante</option>
                                    <option value="intermediário">Intermediário</option>
                                    <option value="avançado">Avançado</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Duração Estimada (min)</label>
                                <input
                                    type="number"
                                    name="duracao_estimada"
                                    value={formData.duracao_estimada || ''}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Observações / Descrição</label>
                            <textarea
                                name="observacoes"
                                rows={4}
                                value={formData.observacoes || ''}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none resize-none"
                            ></textarea>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-6"
                    >
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                            <LinkIcon className="w-5 h-5 text-purple-500" />
                            Links e Recursos
                        </h3>
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                    <FileText className="w-4 h-4 text-gray-400" /> URL da Partitura (PDF)
                                </label>
                                <input
                                    type="url"
                                    name="partitura_url"
                                    value={formData.partitura_url || ''}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none font-mono text-sm"
                                    placeholder="https://..."
                                />
                            </div>
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                    <Mic2 className="w-4 h-4 text-gray-400" /> URL do Playback/Áudio
                                </label>
                                <input
                                    type="url"
                                    name="playback_url"
                                    value={formData.playback_url || ''}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none font-mono text-sm"
                                    placeholder="https://..."
                                />
                            </div>
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                    <Video className="w-4 h-4 text-gray-400" /> URL do Vídeo Tutorial
                                </label>
                                <input
                                    type="url"
                                    name="video_tutorial_url"
                                    value={formData.video_tutorial_url || ''}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none font-mono text-sm"
                                    placeholder="https://..."
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Sidebar Settings */}
                <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-6"
                    >
                        <h3 className="text-sm font-bold uppercase text-gray-500 tracking-wider">Configurações</h3>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-gray-700">Ativo no Sistema</label>
                                <input
                                    type="checkbox"
                                    name="ativo"
                                    checked={formData.ativo || false}
                                    onChange={handleChange}
                                    className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-gray-700">Visível ao Público</label>
                                <input
                                    type="checkbox"
                                    name="publico"
                                    checked={formData.publico || false}
                                    onChange={handleChange}
                                    className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-gray-700">Requer Aprovação</label>
                                <input
                                    type="checkbox"
                                    name="requer_aprovacao_professor"
                                    checked={formData.requer_aprovacao_professor || false}
                                    onChange={handleChange}
                                    className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-100"
                    >
                        <h4 className="font-medium text-purple-900 mb-2">Dica Admin</h4>
                        <p className="text-sm text-purple-700/80">
                            Músicas marcadas como "Requer Aprovação" só podem ser iniciadas pelos alunos após liberação do professor na área de turmas.
                        </p>
                    </motion.div>
                </div>
            </div>
        </motion.form>
    )
}
