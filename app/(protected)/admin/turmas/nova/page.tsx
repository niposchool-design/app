'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Users, Music, Clock, Calendar, CheckSquare } from 'lucide-react'
import { supabase } from '@/lib/supabase/client' // Usando Client Component para form
import Link from 'next/link'

export default function NovaTurmaPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [professores, setProfessores] = useState<any[]>([])
    const [instrumentos, setInstrumentos] = useState<any[]>([])

    const [formData, setFormData] = useState({
        nome: '',
        professor_id: '',
        instrumento_id: '',
        capacidade: 10,
        horario: '',
        data_inicio: '',
        data_fim: '',
        ativo: true
    })

    useEffect(() => {
        async function loadData() {
            // Carregar professores
            // Assumindo que professores têm role 'professor' na tabela profiles
            // Se não tiver, pegar todos ou ajustar query
            const { data: profs } = await supabase
                .from('profiles')
                .select('id, full_name')
                .eq('role', 'professor')

            if (profs) setProfessores(profs)

            // Carregar instrumentos
            const { data: inst } = await supabase
                .from('instrumentos')
                .select('id, nome')
                .eq('ativo', true)
                .order('nome')

            if (inst) setInstrumentos(inst)
        }
        loadData()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target
        setFormData(prev => ({ ...prev, [name]: checked }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            await import('@/src/lib/supabase/mutations/turmas').then(m => m.criarTurma({
                ...formData,
                professor_id: formData.professor_id || null, // Tratar vazio como null
                instrumento_id: formData.instrumento_id || null,
                capacidade: Number(formData.capacidade),
                ativo: formData.ativo
            } as any))

            alert('Turma criada com sucesso!')
            router.push('/admin/turmas')
            router.refresh()
        } catch (error) {
            console.error('Erro ao criar turma:', error)
            alert('Erro ao criar turma, verifique os dados.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Nova Turma</h1>
                    <p className="text-gray-600">Crie uma nova turma para agrupar alunos.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">

                {/* Nome */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Turma *</label>
                    <input
                        required
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        placeholder="Ex: Violão Iniciante - Terças 19h"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Professor */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Professor Responsável</label>
                        <div className="relative">
                            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <select
                                name="professor_id"
                                value={formData.professor_id}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none bg-white appearance-none"
                            >
                                <option value="">Selecione um professor</option>
                                {professores.map(p => (
                                    <option key={p.id} value={p.id}>{p.full_name || 'Sem nome'}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Instrumento */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Instrumento (Opcional)</label>
                        <div className="relative">
                            <Music className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <select
                                name="instrumento_id"
                                value={formData.instrumento_id}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none bg-white appearance-none"
                            >
                                <option value="">Selecione um instrumento</option>
                                {instrumentos.map(i => (
                                    <option key={i.id} value={i.id}>{i.nome}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Capacidade */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Capacidade (Alunos)</label>
                        <input
                            type="number"
                            name="capacidade"
                            value={formData.capacidade}
                            onChange={handleChange}
                            min={1}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                        />
                    </div>

                    {/* Horário (Texto Livre por enquanto) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Horário (Descrição)</label>
                        <div className="relative">
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                name="horario"
                                value={formData.horario}
                                onChange={handleChange}
                                placeholder="Ex: Terças e Quintas, 19:00 - 20:00"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Data Início */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Data Início</label>
                        <input
                            type="date"
                            name="data_inicio"
                            value={formData.data_inicio}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                        />
                    </div>
                    {/* Data Fim */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Data Fim (Previsão)</label>
                        <input
                            type="date"
                            name="data_fim"
                            value={formData.data_fim}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                        />
                    </div>
                </div>

                {/* Ativo */}
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="ativo"
                        name="ativo"
                        checked={formData.ativo}
                        onChange={handleCheckbox}
                        className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                    />
                    <label htmlFor="ativo" className="text-sm font-medium text-gray-700">Turma Ativa (Aparece para matrículas)</label>
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                    <Link href="/admin/turmas" className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                        Cancelar
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50"
                    >
                        {loading ? 'Salvando...' : 'Criar Turma'}
                    </button>
                </div>

            </form>
        </div>
    )
}
