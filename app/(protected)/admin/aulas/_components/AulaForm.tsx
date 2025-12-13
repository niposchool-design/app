
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createAula, updateAula } from '@/src/lib/supabase/mutations/aulas';
import { Loader2, Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
// import { Aula } from '@/types/aulas'; // Descomentar se tiver os tipos importados corretamente

// Tipagem inline para agilizar se o arquivo de tipos não estiver acessível
interface AulaData {
    id?: string;
    numero: number;
    titulo: string;
    data_programada: string;
    objetivo_didatico: string;
    resumo_atividades: string;
    nivel: string;
    formato: string;
    status: string;
}

interface AulaFormProps {
    initialData?: AulaData;
    isEditing?: boolean;
}

export function AulaForm({ initialData, isEditing = false }: AulaFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState<AulaData>({
        numero: initialData?.numero || 0,
        titulo: initialData?.titulo || '',
        data_programada: initialData?.data_programada ? new Date(initialData.data_programada).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        objetivo_didatico: initialData?.objetivo_didatico || '',
        resumo_atividades: initialData?.resumo_atividades || '',
        nivel: initialData?.nivel || 'iniciante',
        formato: initialData?.formato || 'presencial',
        status: initialData?.status || 'rascunho',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isEditing && initialData?.id) {
                await updateAula(initialData.id, formData);
            } else {
                await createAula(formData);
            }

            router.push('/admin/aulas');
            router.refresh(); // Atualiza a lista na página anterior
        } catch (err) {
            console.error(err);
            setError('Erro ao salvar a aula. Verifique os dados e tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm border border-red-100">
                    {error}
                </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
                <h2 className="text-lg font-semibold text-gray-900 border-b pb-4">
                    Informações Básicas
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Número */}
                    <div>
                        <label htmlFor="numero" className="block text-sm font-medium text-gray-700 mb-1">
                            Número da Aula
                        </label>
                        <input
                            type="number"
                            id="numero"
                            name="numero"
                            required
                            min="0"
                            value={formData.numero}
                            onChange={handleChange}
                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                        />
                    </div>

                    {/* Data */}
                    <div>
                        <label htmlFor="data_programada" className="block text-sm font-medium text-gray-700 mb-1">
                            Data Programada
                        </label>
                        <input
                            type="date"
                            id="data_programada"
                            name="data_programada"
                            required
                            value={formData.data_programada}
                            onChange={handleChange}
                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                        />
                    </div>

                    {/* Título (Full Width) */}
                    <div className="md:col-span-2">
                        <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-1">
                            Título da Aula
                        </label>
                        <input
                            type="text"
                            id="titulo"
                            name="titulo"
                            required
                            placeholder="Ex: Introdução ao Ritmo e Pulsação"
                            value={formData.titulo}
                            onChange={handleChange}
                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                        />
                    </div>

                    {/* Status */}
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                            Status
                        </label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                        >
                            <option value="rascunho">Rascunho</option>
                            <option value="agendada">Agendada</option>
                            <option value="concluida">Concluída</option>
                            <option value="cancelada">Cancelada</option>
                        </select>
                    </div>

                    {/* Formato */}
                    <div>
                        <label htmlFor="formato" className="block text-sm font-medium text-gray-700 mb-1">
                            Formato
                        </label>
                        <select
                            id="formato"
                            name="formato"
                            value={formData.formato}
                            onChange={handleChange}
                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                        >
                            <option value="presencial">Presencial</option>
                            <option value="online">Online</option>
                            <option value="hibrido">Híbrido</option>
                        </select>
                    </div>
                </div>

                {/* Conteúdo Pedagógico */}
                <div className="space-y-4 pt-4 border-t">
                    <h3 className="text-md font-medium text-gray-900">Conteúdo Pedagógico</h3>

                    <div>
                        <label htmlFor="objetivo_didatico" className="block text-sm font-medium text-gray-700 mb-1">
                            Objetivo Didático
                        </label>
                        <textarea
                            id="objetivo_didatico"
                            name="objetivo_didatico"
                            rows={3}
                            placeholder="O que o aluno deve aprender nesta aula?"
                            value={formData.objetivo_didatico}
                            onChange={handleChange}
                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="resumo_atividades" className="block text-sm font-medium text-gray-700 mb-1">
                            Resumo de Atividades
                        </label>
                        <textarea
                            id="resumo_atividades"
                            name="resumo_atividades"
                            rows={4}
                            placeholder="Descreva brevemente as atividades planejadas..."
                            value={formData.resumo_atividades}
                            onChange={handleChange}
                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                        />
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-end gap-3">
                <Link
                    href="/admin/aulas"
                    className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                >
                    Cancelar
                </Link>
                <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Salvando...
                        </>
                    ) : (
                        <>
                            <Save className="w-5 h-5" />
                            Salvar Aula
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
