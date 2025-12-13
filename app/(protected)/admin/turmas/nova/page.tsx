
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { criarTurma } from '@/src/lib/supabase/mutations/turmas';
import { ArrowLeft, Save, Users, Clock, Calendar, Info } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';

export default function NovaTurmaPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [professores, setProfessores] = useState<any[]>([]);

    const [formData, setFormData] = useState({
        nome: '',
        descricao: '',
        professor_id: '',
        horario_padrao: '',
        capacidade_maxima: 20,
        ativo: true
    });

    // Buscar professores para o select
    useEffect(() => {
        async function fetchProfessores() {
            // @ts-ignore
            const { data } = await supabase.from('profiles').select('id, full_name').eq('role', 'professor');
            if (data) setProfessores(data);
        }
        fetchProfessores();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        // @ts-ignore
        const val = type === 'checkbox' ? e.target.checked : value;

        setFormData(prev => ({ ...prev, [name]: val }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await criarTurma(formData);
            router.push('/admin/turmas');
            router.refresh();
        } catch (error) {
            alert('Erro ao criar turma. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/admin/turmas" className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                    <ArrowLeft size={24} />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Nova Turma</h1>
                    <p className="text-gray-600">Crie uma nova turma e atribua um professor.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Coluna Principal */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-4">
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            <Info size={20} className="text-red-600" />
                            Informações Básicas
                        </h2>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Nome da Turma</label>
                            <input
                                required
                                name="nome"
                                value={formData.nome}
                                onChange={handleChange}
                                placeholder="Ex: Turma de Shamisen - Iniciante A"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition-shadow"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Descrição</label>
                            <textarea
                                name="descricao"
                                value={formData.descricao}
                                onChange={handleChange}
                                rows={3}
                                placeholder="Detalhes sobre o conteúdo ou público-alvo..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition-shadow"
                            />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-4">
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            <Calendar size={20} className="text-red-600" />
                            Agendamento
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Horário Padrão</label>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        name="horario_padrao"
                                        value={formData.horario_padrao}
                                        onChange={handleChange}
                                        placeholder="Ex: Segundas e Quartas, 19:00"
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition-shadow"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Professor Responsável</label>
                                <select
                                    name="professor_id"
                                    value={formData.professor_id}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition-shadow bg-white"
                                >
                                    <option value="">Selecione um professor...</option>
                                    {professores.map(prof => (
                                        <option key={prof.id} value={prof.id}>{prof.full_name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-4">
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            <Users size={20} className="text-red-600" />
                            Configurações
                        </h2>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Capacidade Máxima</label>
                            <input
                                type="number"
                                name="capacidade_maxima"
                                value={formData.capacidade_maxima}
                                onChange={handleChange}
                                min={1}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition-shadow"
                            />
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                            <input
                                type="checkbox"
                                id="ativo"
                                // @ts-ignore
                                checked={formData.ativo}
                                onChange={(e) => setFormData(p => ({ ...p, ativo: e.target.checked }))}
                                className="w-4 h-4 text-red-600 rounded border-gray-300 focus:ring-red-500"
                            />
                            <label htmlFor="ativo" className="text-sm font-medium text-gray-900 cursor-pointer">
                                Turma Ativa
                            </label>
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
                                Criar Turma
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
