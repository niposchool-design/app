'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { School, Users, Music, Clock, Calendar, Plus, Trash2, CheckCircle, XCircle, Search } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'

interface TurmaDetalhes {
    id: string
    nome: string
    professor: { full_name: string } | null
    instrumento: { nome: string } | null
    horario: string
    capacidade: number
    ativo: boolean
    matriculas: any[]
}

export default function TurmaDetalhesPage() {
    const params = useParams()
    const id = params?.id as string
    const router = useRouter()

    const [turma, setTurma] = useState<TurmaDetalhes | null>(null)
    const [alunosDisponiveis, setAlunosDisponiveis] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [showAddModal, setShowAddModal] = useState(false)
    const [searchAluno, setSearchAluno] = useState('')

    useEffect(() => {
        if (id) loadTurma()
    }, [id])

    async function loadTurma() {
        try {
            // Fetch Turma + Professor + Instrumento + Matriculas (com Aluno)
            const { data, error } = await supabase
                .from('turmas')
                .select(`
                    *,
                    professor:profiles!professor_id(full_name),
                    instrumento:instrumentos(nome),
                    matriculas(
                        id,
                        status,
                        data_matricula,
                        aluno:profiles!aluno_id(id, full_name, email, avatar_url)
                    )
                `)
                .eq('id', id)
                .single()

            if (error) throw error
            setTurma(data)
        } catch (error) {
            console.error('Erro ao carregar turma:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (showAddModal) {
            loadAlunosDisponiveis(searchAluno)
        }
    }, [showAddModal, searchAluno])

    async function loadAlunosDisponiveis(term: string = '') {
        let query = supabase
            .from('profiles')
            .select('id, full_name, email')
            .eq('role', 'aluno')
            .not('id', 'in', `(${turma?.matriculas.map(m => m.aluno?.id).filter(Boolean).join(',') || '00000000-0000-0000-0000-000000000000'})`)
            .limit(20)

        if (term) {
            query = query.or(`full_name.ilike.%${term}%,email.ilike.%${term}%`)
        }

        const { data } = await query

        if (data) setAlunosDisponiveis(data)
    }

    const handleOpenAddModal = () => {
        setShowAddModal(true)
    }

    const handleMatricular = async (alunoId: string) => {
        try {
            const { error } = await supabase
                .from('matriculas')
                .insert({
                    turma_id: id,
                    aluno_id: alunoId,
                    status: 'ativa',
                    data_matricula: new Date().toISOString()
                })

            if (error) throw error

            alert('Aluno matriculado com sucesso!')
            setShowAddModal(false)
            loadTurma()
        } catch (error) {
            console.error('Erro ao matricular:', error)
            alert('Erro ao realizar matrícula.')
        }
    }

    const handleRemoverMatricula = async (matriculaId: string) => {
        if (!confirm('Tem certeza que deseja cancelar a matrícula deste aluno?')) return

        try {
            // Soft delete ou update status
            const { error } = await supabase
                .from('matriculas')
                .update({ status: 'cancelada' })
                .eq('id', matriculaId)

            if (error) throw error
            loadTurma()
        } catch (error) {
            console.error('Erro ao cancelar matrícula:', error)
        }
    }

    if (loading) return <div className="p-8 text-center text-gray-500">Carregando turma...</div>
    if (!turma) return <div className="p-8 text-center text-red-500">Turma não encontrada.</div>

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <h1 className="text-3xl font-bold text-gray-900">{turma.nome}</h1>
                        <span className={`px-2 py-1 rounded text-xs font-bold ${turma.ativo ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {turma.ativo ? 'ATIVA' : 'INATIVA'}
                        </span>
                    </div>
                    <p className="text-gray-600">ID: {turma.id}</p>
                </div>
                <div className="flex gap-2">
                    <Link href={`/admin/turmas/editar/${turma.id}`} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 bg-white">
                        Editar Turma
                    </Link>
                    <button onClick={handleOpenAddModal} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium flex items-center gap-2">
                        <Plus size={18} />
                        Matricular Aluno
                    </button>
                </div>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl border border-gray-200">
                    <p className="text-sm text-gray-500 mb-1 flex items-center gap-1"><Users size={14} /> Professor</p>
                    <p className="font-semibold text-gray-900">{turma.professor?.full_name || 'Não definido'}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200">
                    <p className="text-sm text-gray-500 mb-1 flex items-center gap-1"><Music size={14} /> Instrumento</p>
                    <p className="font-semibold text-gray-900">{turma.instrumento?.nome || 'Geral'}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200">
                    <p className="text-sm text-gray-500 mb-1 flex items-center gap-1"><Clock size={14} /> Horário</p>
                    <p className="font-semibold text-gray-900">{turma.horario || 'Não definido'}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200">
                    <p className="text-sm text-gray-500 mb-1 flex items-center gap-1"><Users size={14} /> Lotação</p>
                    <p className="font-semibold text-gray-900">
                        <span className={turma.matriculas.filter(m => m.status === 'ativa').length >= turma.capacidade ? 'text-red-600' : 'text-green-600'}>
                            {turma.matriculas.filter(m => m.status === 'ativa').length}
                        </span>
                        / {turma.capacidade} alunos
                    </p>
                </div>
            </div>

            {/* Lista de Alunos Matriculados */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                    <h3 className="font-bold text-gray-900">Alunos Matriculados</h3>
                </div>

                {turma.matriculas.length > 0 ? (
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-white border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-3 font-medium">Aluno</th>
                                <th className="px-6 py-3 font-medium">Status</th>
                                <th className="px-6 py-3 font-medium">Data Matrícula</th>
                                <th className="px-6 py-3 font-medium text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {turma.matriculas.map(matricula => (
                                <tr key={matricula.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs uppercase">
                                                {matricula.aluno.full_name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{matricula.aluno.full_name}</p>
                                                <p className="text-xs text-gray-400">{matricula.aluno.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${matricula.status === 'ativa' ? 'bg-green-100 text-green-700' :
                                            matricula.status === 'cancelada' ? 'bg-red-100 text-red-700' :
                                                'bg-gray-100 text-gray-600'
                                            }`}>
                                            {matricula.status.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {new Date(matricula.data_matricula).toLocaleDateString('pt-BR')}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {matricula.status === 'ativa' && (
                                            <button
                                                onClick={() => handleRemoverMatricula(matricula.id)}
                                                className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded"
                                                title="Cancelar Matrícula"
                                            >
                                                <XCircle size={18} />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="p-12 text-center text-gray-400">
                        Nenhum aluno matriculado nesta turma ainda.
                    </div>
                )}
            </div>

            {/* Modal Adicionar Aluno */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                            <h3 className="font-bold text-lg">Matricular Aluno</h3>
                            <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                                <XCircle size={24} />
                            </button>
                        </div>

                        <div className="p-4 border-b border-gray-100 bg-gray-50">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    placeholder="Filtrar aluno..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-red-500"
                                    value={searchAluno}
                                    onChange={e => setSearchAluno(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="max-h-80 overflow-y-auto p-2">
                            {alunosDisponiveis
                                .map(aluno => (
                                    <button
                                        key={aluno.id}
                                        onClick={() => handleMatricular(aluno.id)}
                                        className="w-full flex items-center justify-between p-3 hover:bg-red-50 rounded-lg group transition-colors text-left"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-xs">
                                                {aluno.full_name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900 group-hover:text-red-700">{aluno.full_name}</p>
                                                <p className="text-xs text-gray-500">{aluno.email}</p>
                                            </div>
                                        </div>
                                        <Plus className="text-gray-300 group-hover:text-red-600" />
                                    </button>
                                ))}
                            {alunosDisponiveis.length === 0 && (
                                <p className="text-center py-6 text-gray-500 text-sm">Nenhum aluno disponível.</p>
                            )}
                        </div>

                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-right">
                            <button onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-white border border-gray-300 rounded-lg mr-2 hover:bg-gray-50">Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
