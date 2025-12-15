// 📝 PORTFOLIO CREATE PAGE - NIPO SCHOOL
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, FolderOpen } from 'lucide-react'
import { OrientalContainer } from '../../../components/oriental/OrientalContainer'
import { NipoCard } from '../../../components/ui/NipoCard'
import { NipoButton } from '../../../components/ui/NipoButton'
import { supabase } from '../../../lib/supabase/client'
import { useAuth } from '../../../contexts/AuthContext'

export const PortfolioCreatePage = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    tipo: 'projeto' as 'projeto' | 'pesquisa' | 'performance' | 'outro',
    visibilidade: 'privado' as 'privado' | 'turma' | 'publico'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user?.id) return

    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('aluno_portfolios')
        .insert([{
          aluno_id: user.id,
          titulo: formData.titulo,
          descricao: formData.descricao,
          tipo: formData.tipo,
          status: 'em_andamento',
          visibilidade: formData.visibilidade
        }])
        .select()
        .single()

      if (error) throw error
      
      navigate(`/alunos/portfolio/${data.id}`)
    } catch (err) {
      console.error('Erro ao criar portfólio:', err)
      alert('Erro ao criar portfólio. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <OrientalContainer title="Novo Portfólio" icon={FolderOpen}>
      <NipoButton
        variant="ghost"
        onClick={() => navigate('/alunos/portfolio')}
        className="mb-6"
      >
        <ArrowLeft size={20} className="mr-2" />
        Voltar
      </NipoButton>

      <NipoCard className="p-6 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Título */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título *
            </label>
            <input
              type="text"
              required
              value={formData.titulo}
              onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
              placeholder="Ex: Projeto Final de Piano"
            />
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descrição *
            </label>
            <textarea
              required
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
              placeholder="Descreva seu portfólio..."
            />
          </div>

          {/* Tipo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo *
            </label>
            <select
              value={formData.tipo}
              onChange={(e) => setFormData({ ...formData, tipo: e.target.value as any })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
            >
              <option value="projeto">Projeto</option>
              <option value="pesquisa">Pesquisa</option>
              <option value="performance">Performance</option>
              <option value="outro">Outro</option>
            </select>
          </div>

          {/* Visibilidade */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Visibilidade *
            </label>
            <select
              value={formData.visibilidade}
              onChange={(e) => setFormData({ ...formData, visibilidade: e.target.value as any })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
            >
              <option value="privado">Privado (só você)</option>
              <option value="turma">Turma (professores e colegas)</option>
              <option value="publico">Público (todos)</option>
            </select>
          </div>

          {/* Botões */}
          <div className="flex gap-4">
            <NipoButton
              type="button"
              variant="outline"
              onClick={() => navigate('/alunos/portfolio')}
              className="flex-1"
            >
              Cancelar
            </NipoButton>
            <NipoButton
              type="submit"
              disabled={loading}
              className="flex-1"
            >
              <Save size={20} className="mr-2" />
              {loading ? 'Criando...' : 'Criar Portfólio'}
            </NipoButton>
          </div>
        </form>
      </NipoCard>
    </OrientalContainer>
  )
}
