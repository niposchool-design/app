// 💼 PORTFOLIO DETAIL PAGE - NIPO SCHOOL
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Upload, FileText, Trash2, Edit } from 'lucide-react'
import { OrientalContainer } from '../../../components/oriental/OrientalContainer'
import { NipoCard } from '../../../components/ui/NipoCard'
import { NipoButton } from '../../../components/ui/NipoButton'
import { EvidenceUpload } from '../components/EvidenceUpload'
import { supabase } from '../../../lib/supabase/client'

export const PortfolioDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [portfolio, setPortfolio] = useState<any>(null)
  const [evidencias, setEvidencias] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showUpload, setShowUpload] = useState(false)

  useEffect(() => {
    if (id) {
      buscarPortfolio()
      buscarEvidencias()
    }
  }, [id])

  const buscarPortfolio = async () => {
    try {
      const { data, error } = await supabase
        .from('aluno_portfolios')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      setPortfolio(data)
    } catch (err) {
      console.error('Erro ao buscar portfólio:', err)
    } finally {
      setLoading(false)
    }
  }

  const buscarEvidencias = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio_evidencias')
        .select('*')
        .eq('portfolio_id', id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setEvidencias(data || [])
    } catch (err) {
      console.error('Erro ao buscar evidências:', err)
    }
  }

  const handleUploadSuccess = () => {
    setShowUpload(false)
    buscarEvidencias()
  }

  if (loading) return <div className="p-8 text-center">Carregando...</div>
  if (!portfolio) return <div className="p-8 text-center">Portfólio não encontrado</div>

  const statusColors = {
    em_andamento: 'bg-yellow-100 text-yellow-800',
    concluido: 'bg-green-100 text-green-800',
    arquivado: 'bg-gray-100 text-gray-800'
  }

  return (
    <OrientalContainer title={portfolio.titulo} icon={FileText}>
      <NipoButton
        variant="ghost"
        onClick={() => navigate('/alunos/portfolio')}
        className="mb-6"
      >
        <ArrowLeft size={20} className="mr-2" />
        Voltar
      </NipoButton>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conteúdo Principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Informações do Portfólio */}
          <NipoCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[portfolio.status as keyof typeof statusColors]}`}>
                {portfolio.status === 'em_andamento' ? 'Em Andamento' : 
                 portfolio.status === 'concluido' ? 'Concluído' : 'Arquivado'}
              </span>
              <NipoButton variant="outline" size="sm">
                <Edit size={16} className="mr-2" />
                Editar
              </NipoButton>
            </div>
            <p className="text-gray-700 whitespace-pre-wrap">{portfolio.descricao}</p>
          </NipoCard>

          {/* Evidências */}
          <NipoCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[#8B4513]">Evidências ({evidencias.length})</h2>
              <NipoButton
                size="sm"
                onClick={() => setShowUpload(!showUpload)}
              >
                <Upload size={16} className="mr-2" />
                Adicionar
              </NipoButton>
            </div>

            {showUpload && (
              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <EvidenceUpload
                  portfolioId={id!}
                  onSuccess={handleUploadSuccess}
                  onCancel={() => setShowUpload(false)}
                />
              </div>
            )}

            {evidencias.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                Nenhuma evidência adicionada ainda
              </p>
            ) : (
              <div className="space-y-3">
                {evidencias.map(evidencia => (
                  <div key={evidencia.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{evidencia.titulo}</h4>
                      {evidencia.descricao && (
                        <p className="text-sm text-gray-600">{evidencia.descricao}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(evidencia.created_at).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <button className="text-red-600 hover:text-red-800">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </NipoCard>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <NipoCard className="p-6">
            <h3 className="text-lg font-bold text-[#8B4513] mb-4">Detalhes</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Tipo</p>
                <p className="font-medium capitalize">{portfolio.tipo}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Visibilidade</p>
                <p className="font-medium capitalize">{portfolio.visibilidade}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Criado em</p>
                <p className="font-medium">
                  {new Date(portfolio.created_at).toLocaleDateString('pt-BR')}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Última atualização</p>
                <p className="font-medium">
                  {new Date(portfolio.updated_at).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
          </NipoCard>
        </div>
      </div>
    </OrientalContainer>
  )
}

export default PortfolioDetailPage
