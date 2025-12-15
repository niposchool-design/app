import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../../../lib/supabase/client'
import { ROUTES } from '../../../lib/constants/routes'

interface AulaForm {
  numero: number
  titulo: string
  categoria: string
  nivel: string
  duracao: number
  responsavel: string
  descricao: string
  objetivos: string[]
  materiais: string[]
  atividades: string[]
  vocabulario: string[]
  reflexao: string
}

export function AulaEditPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState<AulaForm>({
    numero: 0,
    titulo: '',
    categoria: '',
    nivel: '',
    duracao: 45,
    responsavel: '',
    descricao: '',
    objetivos: [],
    materiais: [],
    atividades: [],
    vocabulario: [],
    reflexao: ''
  })

  // Campos temporários para adicionar itens às listas
  const [newObjetivo, setNewObjetivo] = useState('')
  const [newMaterial, setNewMaterial] = useState('')
  const [newAtividade, setNewAtividade] = useState('')
  const [newVocabulario, setNewVocabulario] = useState('')

  useEffect(() => {
    if (id) {
      loadAula(parseInt(id))
    }
  }, [id])

  const loadAula = async (aulaId: number) => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('aulas')
        .select('*')
        .eq('id', aulaId)
        .single()

      if (error) throw error

      setForm({
        numero: data.numero,
        titulo: data.titulo,
        categoria: data.categoria,
        nivel: data.nivel,
        duracao: data.duracao,
        responsavel: data.responsavel,
        descricao: data.descricao || '',
        objetivos: data.objetivos || [],
        materiais: data.materiais || [],
        atividades: data.atividades || [],
        vocabulario: data.vocabulario || [],
        reflexao: data.reflexao || ''
      })
    } catch (error) {
      console.error('Erro ao carregar aula:', error)
      alert('Erro ao carregar aula')
      navigate(ROUTES.ADMIN_AULAS)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!form.titulo || !form.categoria || !form.nivel) {
      alert('Preencha todos os campos obrigatórios')
      return
    }

    try {
      setSaving(true)

      const { error } = await supabase
        .from('aulas')
        .update(form)
        .eq('id', parseInt(id!))

      if (error) throw error

      alert('Aula atualizada com sucesso!')
      navigate(`${ROUTES.ADMIN_AULAS}/${id}`)
    } catch (error) {
      console.error('Erro ao salvar aula:', error)
      alert('Erro ao salvar aula')
    } finally {
      setSaving(false)
    }
  }

  const addItem = (field: keyof Pick<AulaForm, 'objetivos' | 'materiais' | 'atividades' | 'vocabulario'>, value: string) => {
    if (!value.trim()) return
    setForm({
      ...form,
      [field]: [...form[field], value.trim()]
    })
  }

  const removeItem = (field: keyof Pick<AulaForm, 'objetivos' | 'materiais' | 'atividades' | 'vocabulario'>, index: number) => {
    setForm({
      ...form,
      [field]: form[field].filter((_, i) => i !== index)
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando aula...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate(`${ROUTES.ADMIN_AULAS}/${id}`)}
            className="text-gray-600 hover:text-gray-800 flex items-center gap-2 mb-4"
          >
            ← Cancelar edição
          </button>
          <h1 className="text-3xl font-bold text-gray-800">✏️ Editar Aula #{form.numero}</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações Básicas */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">📋 Informações Básicas</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Número da Aula *
                </label>
                <input
                  type="number"
                  value={form.numero}
                  onChange={(e) => setForm({ ...form, numero: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duração (minutos) *
                </label>
                <input
                  type="number"
                  value={form.duracao}
                  onChange={(e) => setForm({ ...form, duracao: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categoria *
                </label>
                <select
                  value={form.categoria}
                  onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="introducao">Introdução</option>
                  <option value="ritmo">Ritmo</option>
                  <option value="melodia">Melodia</option>
                  <option value="harmonia">Harmonia</option>
                  <option value="instrumentos">Instrumentos</option>
                  <option value="ensemble">Ensemble</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nível *
                </label>
                <select
                  value={form.nivel}
                  onChange={(e) => setForm({ ...form, nivel: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="iniciante">Iniciante</option>
                  <option value="intermediario">Intermediário</option>
                  <option value="avancado">Avançado</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Responsável *
                </label>
                <input
                  type="text"
                  value={form.responsavel}
                  onChange={(e) => setForm({ ...form, responsavel: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  required
                  placeholder="Nome do professor responsável"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título *
                </label>
                <input
                  type="text"
                  value={form.titulo}
                  onChange={(e) => setForm({ ...form, titulo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  required
                  placeholder="Ex: Descobrindo os Sons do Mundo"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descrição
                </label>
                <textarea
                  value={form.descricao}
                  onChange={(e) => setForm({ ...form, descricao: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  rows={3}
                  placeholder="Breve descrição da aula..."
                />
              </div>
            </div>
          </div>

          {/* Objetivos */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">🎯 Objetivos</h2>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newObjetivo}
                onChange={(e) => setNewObjetivo(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addItem('objetivos', newObjetivo)
                    setNewObjetivo('')
                  }
                }}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                placeholder="Digite um objetivo e pressione Enter"
              />
              <button
                type="button"
                onClick={() => {
                  addItem('objetivos', newObjetivo)
                  setNewObjetivo('')
                }}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                + Adicionar
              </button>
            </div>
            <ul className="space-y-2">
              {form.objetivos.map((obj, index) => (
                <li key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                  <span className="flex-1">{obj}</span>
                  <button
                    type="button"
                    onClick={() => removeItem('objetivos', index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    🗑️
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Materiais */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">📦 Materiais</h2>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newMaterial}
                onChange={(e) => setNewMaterial(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addItem('materiais', newMaterial)
                    setNewMaterial('')
                  }
                }}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                placeholder="Digite um material e pressione Enter"
              />
              <button
                type="button"
                onClick={() => {
                  addItem('materiais', newMaterial)
                  setNewMaterial('')
                }}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                + Adicionar
              </button>
            </div>
            <ul className="space-y-2">
              {form.materiais.map((mat, index) => (
                <li key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                  <span className="flex-1">{mat}</span>
                  <button
                    type="button"
                    onClick={() => removeItem('materiais', index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    🗑️
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Atividades */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">🎨 Atividades</h2>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newAtividade}
                onChange={(e) => setNewAtividade(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addItem('atividades', newAtividade)
                    setNewAtividade('')
                  }
                }}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                placeholder="Digite uma atividade e pressione Enter"
              />
              <button
                type="button"
                onClick={() => {
                  addItem('atividades', newAtividade)
                  setNewAtividade('')
                }}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                + Adicionar
              </button>
            </div>
            <ul className="space-y-2">
              {form.atividades.map((ativ, index) => (
                <li key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                  <span className="font-bold text-orange-600 mr-2">{index + 1}.</span>
                  <span className="flex-1">{ativ}</span>
                  <button
                    type="button"
                    onClick={() => removeItem('atividades', index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    🗑️
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Vocabulário */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">📚 Vocabulário Musical</h2>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newVocabulario}
                onChange={(e) => setNewVocabulario(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addItem('vocabulario', newVocabulario)
                    setNewVocabulario('')
                  }
                }}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                placeholder="Digite um termo e pressione Enter"
              />
              <button
                type="button"
                onClick={() => {
                  addItem('vocabulario', newVocabulario)
                  setNewVocabulario('')
                }}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                + Adicionar
              </button>
            </div>
            <ul className="space-y-2">
              {form.vocabulario.map((vocab, index) => (
                <li key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                  <span className="flex-1">{vocab}</span>
                  <button
                    type="button"
                    onClick={() => removeItem('vocabulario', index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    🗑️
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Reflexão */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">💭 Reflexão Pedagógica</h2>
            <textarea
              value={form.reflexao}
              onChange={(e) => setForm({ ...form, reflexao: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              rows={5}
              placeholder="Escreva uma reflexão sobre os objetivos pedagógicos desta aula..."
            />
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate(`${ROUTES.ADMIN_AULAS}/${id}`)}
              className="flex-1 px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition font-semibold"
            >
              ❌ Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-semibold disabled:opacity-50"
            >
              {saving ? '⏳ Salvando...' : '💾 Salvar Alterações'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
