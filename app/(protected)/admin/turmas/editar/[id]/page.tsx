'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Users, Music, Clock, Calendar } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'

export default function EditarTurmaPage() {
    const params = useParams()
    const id = params?.id as string
    const router = useRouter()

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
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
        if (id) loadData()
    }, [id])

    async function loadData() {
        try {
            // Carregar turma
            const { data: turma, error } = await supabase
                .from('turmas')
                .select('*')
                .eq('id', id)
                .single()

            if (error) throw error
            if (turma) {
                setFormData({
                    nome: turma.nome,
                    professor_id: turma.professor_id || '',
                    instrumento_id: turma.instrumento_id || '',
                    capacidade: turma.capacidade,
                    horario: turma.horario || '',
                    data_inicio: turma.data_inicio || '',
                    data_fim: turma.data_fim || '',
                    ativo: turma.ativo
                })
            }

            // Carregar professores
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

        } catch (error) {
            console.error('Erro ao carregar dados:', error)
            alert('Erro ao carregar turma.')
        } finally {
            setLoading(false)
        }
    }

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
        setSaving(true)

        try {
            await import('@/src/lib/supabase/mutations/turmas').then(m => m.atualizarTurma(id, {
                ...formData,
                professor_id: formData.professor_id || null, // Tratar vazio como null
                instrumento_id: formData.instrumento_id || null,
                capacidade: Number(formData.capacidade),
                ativo: formData.ativo
            } as any))

            alert('Turma atualizada com sucesso!')
            router.push(`/admin/turmas/${id}`)
            router.refresh()
        } catch (error) {
            console.error('Erro ao atualizar turma:', error)
            alert('Erro ao atualizar turma.')
        } finally {
            setSaving(false)
        }
    }

    if (loading) return <div className="p-8 text-center text-gray-500">Carregando...</div>

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Editar Turma</h1>
                    <p className="text-gray-600">Atualize os dados da turma.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
                {/* Campos iguais ao Nova Turma */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Turma *</label>
                    <input
                        required
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                    <option key={p.id} value={p.id}>{p.full_name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Instrumento</label>
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
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Capacidade</label>
                        <input
                            type="number"
                            name="capacidade"
                            value={formData.capacidade}
                            onChange={handleChange}
                            min={1}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Horário (Descrição)</label>
                        <div className="relative">
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                name="horario"
                                value={formData.horario}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Data Fim</label>
                        <input
                            type="date"
                            name="data_fim"
                            value={formData.data_fim}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="ativo"
                        name="ativo"
                        checked={formData.ativo}
                        onChange={handleCheckbox}
                        className="w-4 h-4 text-red-600 rounded"
                    />
                    <label htmlFor="ativo" className="text-sm font-medium text-gray-700">Turma Ativa</label>
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                    <Link href={`/admin/turmas/${id}`} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                        Cancelar
                    </Link>
                    <button
                        type="submit"
                        disabled={saving}
                        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50"
                    >
                        {saving ? 'Salvando...' : 'Atualizar Turma'}
                    </button>
                </div>

            </form>
        </div>
    )
}
