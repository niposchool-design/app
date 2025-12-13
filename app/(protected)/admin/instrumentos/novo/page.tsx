
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { criarInstrumento } from '@/src/lib/supabase/mutations/instrumentos';
import { ArrowLeft, Save, Upload, Info, Music } from 'lucide-react';
import Link from 'next/link';
import { getCategoriasInstrumentos } from '@/src/lib/supabase/queries/instrumentos'; // Precisa ser client-safe ou fetched via server component wrapper

// Mock de categorias se a query não rodar no client direto (mas router handler é melhor)
// Para simplificar, vou passar as categorias como prop se fosse server component, mas aqui é page. 
// Como é 'use client', vou buscar via useEffect ou assumir estático. 
// Melhor: Transformar em Server Component que renderiza um Client Form.

import { Instrumento } from '@/src/lib/types/instrumentos';

export default function NovoInstrumentoPage() {
    // Vamos fazer o form direto aqui
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<Partial<Instrumento>>({
        nome: '',
        categoria_id: '',
        historia: '',
        origem: '',
        nivel_dificuldade: 'iniciante',
        imagem_url: '',
        curiosidades: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await criarInstrumento(formData);
            router.push('/admin/instrumentos');
            router.refresh();
        } catch (error) {
            alert('Erro ao criar instrumento. Verifique o console.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/admin/instrumentos" className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                    <ArrowLeft size={24} />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Novo Instrumento</h1>
                    <p className="text-gray-600">Adicione um novo instrumento à biblioteca da escola.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-4">
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            <Info size={20} className="text-red-500" />
                            Informações Básicas
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Nome do Instrumento</label>
                                <input
                                    required
                                    name="nome"
                                    value={formData.nome}
                                    onChange={handleChange}
                                    placeholder="Ex: Shamisen"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition-shadow"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Categoria (ID por enquanto)</label>
                                <input
                                    name="categoria_id" // TODO: Select dinâmico
                                    value={formData.categoria_id}
                                    onChange={handleChange}
                                    placeholder="UUID da categoria..."
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition-shadow font-mono text-sm"
                                />
                                <p className="text-xs text-gray-400">Em breve: Dropdown automático</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Descrição Curta</label>
                            <textarea
                                name="historia"
                                value={formData.historia || ''}
                                onChange={handleChange}
                                rows={3}
                                placeholder="Breve resumo sobre o instrumento..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition-shadow"
                            />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-4">
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            <Music size={20} className="text-red-500" />
                            Detalhes Técnicos
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Origem</label>
                                <input
                                    name="origem"
                                    value={formData.origem}
                                    onChange={handleChange}
                                    placeholder="Ex: Japão (Século XVI)"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition-shadow"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Nível de Dificuldade</label>
                                <select
                                    name="nivel_dificuldade"
                                    value={formData.nivel_dificuldade}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition-shadow bg-white"
                                >
                                    <option value="iniciante">Iniciante</option>
                                    <option value="intermediário">Intermediário</option>
                                    <option value="avançado">Avançado</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Curiosidades & História</label>
                            <textarea
                                name="curiosidades"
                                value={formData.curiosidades}
                                onChange={handleChange}
                                rows={5}
                                placeholder="Detalhes históricos, fatos interessantes..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition-shadow"
                            />
                        </div>
                    </div>
                </div>

                {/* Sidebar / Media */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-4">
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            <Upload size={20} className="text-red-500" />
                            Mídia
                        </h2>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">URL da Imagem</label>
                            <input
                                name="imagem_url"
                                value={formData.imagem_url}
                                onChange={handleChange}
                                placeholder="https://..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition-shadow"
                            />
                        </div>

                        {/* Preview Image */}
                        <div className="aspect-square bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden relative">
                            {formData.imagem_url ? (
                                <img src={formData.imagem_url} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="text-center text-gray-400">
                                    <Upload className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                    <span className="text-xs">Preview da Imagem</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-red-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        ) : (
                            <>
                                <Save size={20} />
                                Salvar Instrumento
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
