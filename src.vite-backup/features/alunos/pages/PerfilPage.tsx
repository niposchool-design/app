// 👤 PERFIL PAGE - NIPO SCHOOL
import { useState, useEffect } from 'react'
import { User, Mail, Phone, Calendar, Edit, Save, X, Camera } from 'lucide-react'
import { OrientalContainer } from '../../../components/oriental/OrientalContainer'
import { NipoCard } from '../../../components/ui/NipoCard'
import { NipoButton } from '../../../components/ui/NipoButton'
import { useAuth } from '../../../contexts/AuthContext'
import { supabase } from '../../../lib/supabase/client'

export const PerfilPage = () => {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [perfil, setPerfil] = useState({
    nome_completo: '',
    email: user?.email || '',
    telefone: '',
    data_nascimento: '',
    bio: '',
    avatar_url: ''
  })

  useEffect(() => {
    buscarPerfil()
  }, [user?.id])

  const buscarPerfil = async () => {
    if (!user?.id) return

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error && error.code !== 'PGRST116') throw error
      if (data) {
        setPerfil({
          nome_completo: data.nome_completo || '',
          email: user.email || '',
          telefone: data.telefone || '',
          data_nascimento: data.data_nascimento || '',
          bio: data.bio || '',
          avatar_url: data.avatar_url || ''
        })
      }
    } catch (err) {
      console.error('Erro ao buscar perfil:', err)
    }
  }

  const handleSave = async () => {
    if (!user?.id) return

    try {
      setLoading(true)
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...perfil,
          updated_at: new Date().toISOString()
        })

      if (error) throw error
      setIsEditing(false)
    } catch (err) {
      console.error('Erro ao salvar perfil:', err)
      alert('Erro ao salvar perfil. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <OrientalContainer title="Meu Perfil" icon={User}>
      <div className="max-w-4xl mx-auto">
        <NipoCard className="p-6">
          {/* Header com Avatar */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#8B4513] to-[#D2691E] flex items-center justify-center text-white text-3xl font-bold">
                  {perfil.nome_completo ? perfil.nome_completo.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase()}
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100">
                    <Camera size={16} className="text-gray-600" />
                  </button>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#8B4513]">
                  {perfil.nome_completo || 'Nome não definido'}
                </h2>
                <p className="text-gray-600">{perfil.email}</p>
              </div>
            </div>

            {!isEditing ? (
              <NipoButton onClick={() => setIsEditing(true)}>
                <Edit size={20} className="mr-2" />
                Editar Perfil
              </NipoButton>
            ) : (
              <div className="flex gap-2">
                <NipoButton
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false)
                    buscarPerfil()
                  }}
                >
                  <X size={20} className="mr-2" />
                  Cancelar
                </NipoButton>
                <NipoButton onClick={handleSave} disabled={loading}>
                  <Save size={20} className="mr-2" />
                  {loading ? 'Salvando...' : 'Salvar'}
                </NipoButton>
              </div>
            )}
          </div>

          {/* Formulário */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome Completo
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={perfil.nome_completo}
                  onChange={(e) => setPerfil({ ...perfil, nome_completo: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                  placeholder="Digite seu nome completo"
                />
              ) : (
                <p className="text-gray-900 py-2">{perfil.nome_completo || '-'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="flex items-center text-gray-600">
                <Mail size={20} className="mr-2" />
                <span>{perfil.email}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefone
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={perfil.telefone}
                  onChange={(e) => setPerfil({ ...perfil, telefone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                  placeholder="(11) 99999-9999"
                />
              ) : (
                <div className="flex items-center text-gray-900 py-2">
                  <Phone size={20} className="mr-2 text-gray-600" />
                  <span>{perfil.telefone || '-'}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data de Nascimento
              </label>
              {isEditing ? (
                <input
                  type="date"
                  value={perfil.data_nascimento}
                  onChange={(e) => setPerfil({ ...perfil, data_nascimento: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                />
              ) : (
                <div className="flex items-center text-gray-900 py-2">
                  <Calendar size={20} className="mr-2 text-gray-600" />
                  <span>
                    {perfil.data_nascimento 
                      ? new Date(perfil.data_nascimento).toLocaleDateString('pt-BR')
                      : '-'}
                  </span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sobre Mim
              </label>
              {isEditing ? (
                <textarea
                  value={perfil.bio}
                  onChange={(e) => setPerfil({ ...perfil, bio: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                  placeholder="Conte um pouco sobre você..."
                />
              ) : (
                <p className="text-gray-900 whitespace-pre-wrap py-2">{perfil.bio || '-'}</p>
              )}
            </div>
          </div>
        </NipoCard>

        <NipoCard className="p-6 mt-6">
          <h3 className="text-lg font-bold text-[#8B4513] mb-4">Informações da Conta</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">ID do Usuário:</span>
              <span className="text-gray-900 font-mono">{user?.id?.slice(0, 8)}...</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tipo de Conta:</span>
              <span className="text-gray-900">Aluno</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Membro desde:</span>
              <span className="text-gray-900">
                {user?.created_at 
                  ? new Date(user.created_at).toLocaleDateString('pt-BR')
                  : '-'}
              </span>
            </div>
          </div>
        </NipoCard>
      </div>
    </OrientalContainer>
  )
}
