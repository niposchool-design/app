import React, { useState } from 'react'
import {
  Trophy,
  Lock,
  CheckCircle,
  Star,
  ArrowLeft,
  Filter,
  Search
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { NipoCard, NipoCardBody, NipoCardStat } from '../../../components/shared/NipoCard'
import { NipoButton } from '../../../components/shared/NipoButton'
import { NipoInput } from '../../../components/shared/NipoInput'

type Achievement = {
  id: string
  titulo: string
  descricao: string
  icone: string
  categoria: 'iniciante' | 'intermediario' | 'avancado' | 'social' | 'especial'
  pontos: number
  progresso: number
  meta: number
  atual: number
  desbloqueado: boolean
  data_desbloqueio?: string
  raridade: 'comum' | 'raro' | 'epico' | 'lendario'
}

export function ConquistasPage() {
  const [filtroStatus, setFiltroStatus] = useState<'todas' | 'desbloqueadas' | 'bloqueadas'>('todas')
  const [filtroCategoria, setFiltroCategoria] = useState<string>('todas')
  const [busca, setBusca] = useState('')

  const conquistas: Achievement[] = [
    {
      id: '1',
      titulo: 'Primeiro Passo',
      descricao: 'Complete seu primeiro desafio',
      icone: '���',
      categoria: 'iniciante',
      pontos: 10,
      progresso: 100,
      meta: 1,
      atual: 1,
      desbloqueado: true,
      data_desbloqueio: '2025-10-01',
      raridade: 'comum'
    },
    {
      id: '2',
      titulo: 'Sequência de 7 Dias',
      descricao: 'Acesse a plataforma por 7 dias seguidos',
      icone: '���',
      categoria: 'social',
      pontos: 50,
      progresso: 57,
      meta: 7,
      atual: 4,
      desbloqueado: false,
      raridade: 'raro'
    },
    {
      id: '3',
      titulo: 'Mestre do Piano',
      descricao: 'Complete 10 desafios de piano',
      icone: '���',
      categoria: 'intermediario',
      pontos: 100,
      progresso: 30,
      meta: 10,
      atual: 3,
      desbloqueado: false,
      raridade: 'epico'
    },
    {
      id: '4',
      titulo: 'Prodígio Musical',
      descricao: 'Atinja 1000 pontos totais',
      icone: '���',
      categoria: 'especial',
      pontos: 200,
      progresso: 15,
      meta: 1000,
      atual: 150,
      desbloqueado: false,
      raridade: 'lendario'
    },
    {
      id: '5',
      titulo: 'Compositor Iniciante',
      descricao: 'Crie sua primeira composição',
      icone: '���',
      categoria: 'iniciante',
      pontos: 25,
      progresso: 0,
      meta: 1,
      atual: 0,
      desbloqueado: false,
      raridade: 'comum'
    }
  ]

  const conquistasFiltradas = conquistas.filter((conquista) => {
    const matchStatus =
      filtroStatus === 'todas' ||
      (filtroStatus === 'desbloqueadas' && conquista.desbloqueado) ||
      (filtroStatus === 'bloqueadas' && !conquista.desbloqueado)

    const matchCategoria =
      filtroCategoria === 'todas' || conquista.categoria === filtroCategoria

    const matchBusca =
      busca === '' ||
      conquista.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      conquista.descricao.toLowerCase().includes(busca.toLowerCase())

    return matchStatus && matchCategoria && matchBusca
  })

  const totalConquistas = conquistas.length
  const desbloqueadas = conquistas.filter((c) => c.desbloqueado).length
  const pontosGanhos = conquistas
    .filter((c) => c.desbloqueado)
    .reduce((acc, c) => acc + c.pontos, 0)
  const percentualCompleto = Math.round((desbloqueadas / totalConquistas) * 100)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <div>
          <Link
            to="/aluno"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Dashboard
          </Link>

          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl shadow-xl p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Trophy className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Conquistas</h1>
                <p className="text-yellow-100">Continue desbloqueando novas conquistas!</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <NipoCardStat
                label="Desbloqueadas"
                value={`${desbloqueadas}/${totalConquistas}`}
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white"
              />
              <NipoCardStat
                label="Progresso"
                value={`${percentualCompleto}%`}
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white"
              />
              <NipoCardStat
                label="Pontos Ganhos"
                value={pontosGanhos}
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white"
              />
              <NipoCardStat
                label="Próxima"
                value={`${conquistas.find((c) => !c.desbloqueado)?.progresso || 0}%`}
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white"
              />
            </div>
          </div>
        </div>

        <NipoCard>
          <NipoCardBody>
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">Filtros</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <NipoInput
                type="text"
                placeholder="Buscar conquista..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                leftIcon={<Search className="w-5 h-5" />}
              />

              <select
                value={filtroStatus}
                onChange={(e) => setFiltroStatus(e.target.value as 'todas' | 'desbloqueadas' | 'bloqueadas')}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none cursor-pointer"
              >
                <option value="todas">Todas as conquistas</option>
                <option value="desbloqueadas">Desbloqueadas</option>
                <option value="bloqueadas">Bloqueadas</option>
              </select>

              <select
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none cursor-pointer"
              >
                <option value="todas">Todas as categorias</option>
                <option value="iniciante">Iniciante</option>
                <option value="intermediario">Intermediário</option>
                <option value="avancado">Avançado</option>
                <option value="social">Social</option>
                <option value="especial">Especial</option>
              </select>
            </div>
          </NipoCardBody>
        </NipoCard>

        {conquistasFiltradas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {conquistasFiltradas.map((conquista) => (
              <ConquistaCard key={conquista.id} conquista={conquista} />
            ))}
          </div>
        ) : (
          <NipoCard>
            <NipoCardBody className="text-center py-12">
              <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhuma conquista encontrada</h3>
              <p className="text-gray-600">Tente ajustar os filtros ou limpar a busca</p>
            </NipoCardBody>
          </NipoCard>
        )}
      </div>
    </div>
  )
}

function ConquistaCard({ conquista }: { conquista: Achievement }) {
  const raridadeConfig = {
    comum: { bg: 'from-gray-100 to-gray-200', text: 'text-gray-700', border: 'border-gray-300' },
    raro: { bg: 'from-blue-100 to-blue-200', text: 'text-blue-700', border: 'border-blue-300' },
    epico: { bg: 'from-purple-100 to-purple-200', text: 'text-purple-700', border: 'border-purple-300' },
    lendario: { bg: 'from-yellow-100 to-orange-200', text: 'text-orange-700', border: 'border-orange-300' }
  }

  const config = raridadeConfig[conquista.raridade]

  return (
    <div
      className={`bg-gradient-to-br ${config.bg} rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border-2 ${config.border} ${
        conquista.desbloqueado ? '' : 'opacity-60'
      }`}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div
            className={`w-16 h-16 rounded-xl flex items-center justify-center text-4xl ${
              conquista.desbloqueado ? 'bg-white shadow-md' : 'bg-white/50'
            }`}
          >
            {conquista.desbloqueado ? conquista.icone : <Lock className="w-8 h-8 text-gray-400" />}
          </div>
          <div className="flex flex-col items-end gap-1">
            {conquista.desbloqueado && (
              <div className="bg-green-500 text-white rounded-full p-1.5">
                <CheckCircle className="w-4 h-4" />
              </div>
            )}
            <span className={`text-xs font-medium ${config.text} uppercase tracking-wide`}>
              {conquista.raridade}
            </span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2">{conquista.titulo}</h3>
        <p className="text-sm text-gray-700 mb-4">{conquista.descricao}</p>

        {!conquista.desbloqueado && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-gray-700 font-medium">Progresso</span>
              <span className="text-gray-900 font-bold">{conquista.progresso}%</span>
            </div>
            <div className="w-full bg-white/50 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${conquista.progresso}%` }}
              />
            </div>
            <p className="text-xs text-gray-600 mt-1">{conquista.atual}/{conquista.meta}</p>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-gray-300/50">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-600" />
            <span className="text-sm font-bold text-gray-900">{conquista.pontos} pts</span>
          </div>
          {conquista.desbloqueado && conquista.data_desbloqueio && (
            <span className="text-xs text-gray-600">
              {new Date(conquista.data_desbloqueio).toLocaleDateString('pt-BR')}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
