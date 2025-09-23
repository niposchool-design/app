import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// --- ÍCONES ---
import {
  Music, Users, GraduationCap, BookOpen, Activity, ChevronLeft,
  RefreshCw, Settings, BarChart3, Target, Trophy, Star, Crown,
  ArrowLeft, Home, Volume2, Image, Clock, Brain, Search, Link,
  Play, Pause, Download, Eye, Heart, Share, Filter, Tag, MapPin,
  X, Headphones, Radio, Timer, Award, ArrowRight, AlertTriangle
} from 'lucide-react';

// --- CONTEXTOS E HOOKS ---
// import { useAuth } from '@/shared/contexts/AuthContext';

// --- LAYOUTS ---
import { AdvancedAlunoLayout } from '@/shared/components/layout/AdvancedAlunoLayout';

// --- SERVIÇOS ---
import { instrumentsService } from '@/features/instrumentos/services/instrumentsService';
import { instrumentDetailService } from '@/features/instrumentos/services/instrumentDetailService';

// ============================================================================
// 1. COMPONENTES UTILITÁRIOS 
// ============================================================================

// eslint-disable-next-line react/prop-types
const StatCard = ({ icon: IconComponent, value, label, color, delay = 0 }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      let current = 0;
      const increment = value / 30;
      const counter = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(counter);
        } else {
          setCount(Math.floor(current));
        }
      }, 50);
      return () => clearInterval(counter);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <div className={`bg-white/90 backdrop-blur-sm rounded-xl p-6 border-l-4 border-${color}-500 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-xl group`}>
      <IconComponent className={`w-8 h-8 text-${color}-500 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`} />
      <p className="text-3xl font-bold text-gray-900 tabular-nums">{count}</p>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );
};

const ProgressRing = ({ progress, size = 60, color = "purple" }) => {
  const circumference = 2 * Math.PI * 20;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle cx={size/2} cy={size/2} r="20" stroke="currentColor" 
                strokeWidth="4" fill="transparent" className="text-gray-200"/>
        <circle cx={size/2} cy={size/2} r="20" stroke="currentColor" 
                strokeWidth="4" fill="transparent" strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset} 
                className={`text-${color}-500 transition-all duration-1000 ease-out`}
                style={{ transitionDelay: '300ms' }} />
      </svg>
      <span className="absolute text-sm font-semibold text-gray-700">{progress}%</span>
    </div>
  );
};

const WaveformVisualizer = ({ isActive }) => (
  <div className="flex items-center justify-center gap-1 h-8">
    {[...Array(12)].map((_, i) => (
      <div key={i} 
           className={`w-1 bg-purple-500 rounded-full transition-all duration-300 ${
             isActive ? 'animate-pulse' : ''
           }`}
           style={{ 
             height: isActive ? `${Math.random() * 20 + 10}px` : '4px',
             animationDelay: `${i * 100}ms`,
             animationDuration: '800ms'
           }} />
    ))}
  </div>
);

// ============================================================================
// 2. MODAL DE MÍDIA
// ============================================================================

const MidiaModal = ({ midia, onClose }) => {
  if (!midia) return null;

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
         onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl transform scale-100 transition-all duration-300"
           onClick={e => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{midia.titulo}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{midia.categoria}</span>
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">{midia.nivel}</span>
              </div>
            </div>
            <button onClick={onClose} 
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-4 flex items-center justify-center">
            {midia.tipo === 'imagem' && <Image className="w-16 h-16 text-gray-400" />}
            {midia.tipo === 'video' && <Play className="w-16 h-16 text-gray-400" />}
            {midia.tipo === 'audio' && <Volume2 className="w-16 h-16 text-gray-400" />}
            {midia.tipo === '3d' && <Search className="w-16 h-16 text-gray-400" />}
          </div>
          
          <p className="text-gray-600 mb-4">{midia.descricao}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Eye className="w-4 h-4" />
              <span>{midia.visualizacoes || 0} visualizações</span>
            </div>
            {midia.url && (
              <a href={midia.url} target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                <Download className="w-4 h-4" />
                Abrir Original
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 3. COMPONENTES INTERNOS 
// ============================================================================

const SonsPlayer = ({ instrumento, sons, audioAtivo, setAudioAtivo }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = (som) => {
    setAudioAtivo(som.id);
    setIsPlaying(true);
    
    // Simular duração
    setTimeout(() => {
      setIsPlaying(false);
      setAudioAtivo(null);
    }, 3000);
  };

  const stopAudio = () => {
    setIsPlaying(false);
    setAudioAtivo(null);
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-purple-100 animate-fade-in">
      <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
        <Volume2 className="w-5 h-5 text-purple-500" />
        Sons do {instrumento?.nome} ({sons.length})
      </h3>

      {/* Player Control */}
      <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-100">
        <div className="flex items-center gap-4 mb-3">
          <Headphones className="w-5 h-5 text-purple-500" />
          <span className="text-sm font-medium text-gray-700">
            {isPlaying ? 'Reproduzindo...' : 'Clique em um som para ouvir'}
          </span>
          {isPlaying && (
            <button onClick={stopAudio} 
                    className="ml-auto px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors">
              <Pause className="w-4 h-4" />
            </button>
          )}
        </div>
        
        <WaveformVisualizer isActive={isPlaying} />
      </div>
      
      {/* Grid de sons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sons.map((som, index) => (
          <div key={som.id} 
               className="group border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:border-purple-300 cursor-pointer hover:-translate-y-1"
               onClick={() => playAudio(som)}
               style={{ animationDelay: `${index * 100}ms` }}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  audioAtivo === som.id 
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white scale-110' 
                    : 'bg-purple-100 text-purple-600 group-hover:bg-purple-200 group-hover:scale-105'
                }`}>
                  {audioAtivo === som.id && isPlaying ? 
                    <Radio className="w-5 h-5 animate-pulse" /> : 
                    <Play className="w-5 h-5" />
                  }
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{som.nota_musical}</h4>
                  <p className="text-xs text-gray-500">{som.tecnica}</p>
                </div>
              </div>
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">
                {som.dinamica}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">{som.artista_performer}</span>
              <div className={`opacity-0 group-hover:opacity-100 transition-all duration-300 ${
                audioAtivo === som.id ? 'opacity-100' : ''
              }`}>
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                  <Play className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const GaleriaMidias = ({ midias, filtroMidia, setFiltroMidia }) => {
  const [modalMidia, setModalMidia] = useState(null);
  const midiasFiltered = filtroMidia === 'todos' ? midias : midias.filter(midia => midia.tipo === filtroMidia);

  return (
    <>
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-purple-100 animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Image className="w-5 h-5 text-blue-500" />
            Galeria de Mídias ({midias.length})
          </h3>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select value={filtroMidia} onChange={(e) => setFiltroMidia(e.target.value)} 
                    className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all">
              <option value="todos">Todos</option>
              <option value="imagem">Imagens</option>
              <option value="video">Vídeos</option>
              <option value="audio">Áudios</option>
              <option value="3d">3D</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {midiasFiltered.map((midia, index) => (
            <div key={midia.id} 
                 className="group border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-2 bg-white"
                 onClick={() => setModalMidia(midia)}
                 style={{ animationDelay: `${index * 150}ms` }}>
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
                <div className="group-hover:scale-110 transition-transform duration-300">
                  {midia.tipo === 'imagem' && <Image className="w-12 h-12 text-gray-400" />}
                  {midia.tipo === 'video' && <Play className="w-12 h-12 text-gray-400" />}
                  {midia.tipo === 'audio' && <Volume2 className="w-12 h-12 text-gray-400" />}
                  {midia.tipo === '3d' && <Search className="w-12 h-12 text-gray-400" />}
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                      <Eye className="w-6 h-6 text-gray-700" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <h4 className="font-medium text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">{midia.titulo}</h4>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{midia.descricao}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">{midia.categoria}</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">{midia.nivel}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Eye className="w-3 h-3" /> 
                    {midia.visualizacoes || 0}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <MidiaModal midia={modalMidia} onClose={() => setModalMidia(null)} />
    </>
  );
};

const HistoriaInstrumento = ({ instrumento, curiosidades }) => (
  <div className="space-y-6 animate-fade-in">
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-purple-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
        <Clock className="w-5 h-5 text-amber-500" />
        História do {instrumento?.nome}
      </h3>
      
      {instrumento?.historia && (
        <div className="prose prose-gray max-w-none mb-6">
          <p className="text-gray-700 leading-relaxed text-lg">{instrumento.historia}</p>
        </div>
      )}

      {instrumento && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 pt-6 border-t border-gray-200">
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-medium text-gray-900 mb-1">Origem</h4>
            <p className="text-sm text-gray-600">{instrumento.origem}</p>
          </div>
          
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
              <Tag className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-medium text-gray-900 mb-1">Família</h4>
            <p className="text-sm text-gray-600">{instrumento.familia_instrumental}</p>
          </div>
          
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-medium text-gray-900 mb-1">Dificuldade</h4>
            <p className="text-sm text-gray-600 capitalize">{instrumento.dificuldade_aprendizado}</p>
          </div>
        </div>
      )}
    </div>

    {curiosidades && curiosidades.length > 0 && (
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-purple-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" />
          Curiosidades ({curiosidades.length})
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {curiosidades.map((cur, index) => (
            <div key={cur.id} 
                 className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:border-yellow-300 group"
                 style={{ animationDelay: `${index * 200}ms` }}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                  💡
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">{cur.titulo}</h4>
                  <p className="text-sm text-gray-600 mb-3 leading-relaxed">{cur.conteudo}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-medium">
                      {cur.categoria}
                    </span>
                    {cur.fonte && (
                      <span className="text-xs text-gray-500">Fonte: {cur.fonte}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

const TecnicasInstrumento = ({ tecnicas }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroNivel, setFiltroNivel] = useState('todos');
  
  const tecnicasFiltered = tecnicas.filter(tecnica => {
    const matchSearch = searchTerm === '' || 
      tecnica.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tecnica.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchNivel = filtroNivel === 'todos' || tecnica.nivel === filtroNivel;
    return matchSearch && matchNivel;
  });

  const tecnicasAgrupadas = tecnicasFiltered.reduce((grupos, tecnica) => {
    const grupo = tecnica.grupo_tecnico || 'Outras';
    if (!grupos[grupo]) grupos[grupo] = [];
    grupos[grupo].push(tecnica);
    return grupos;
  }, {});

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-purple-100 animate-fade-in">
      <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
        <Target className="w-5 h-5 text-green-500" />
        Técnicas de Aprendizado ({tecnicasFiltered.length})
      </h3>

      {/* Busca e filtros */}
      <div className="mb-6 flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Buscar técnicas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
          />
        </div>
        <select value={filtroNivel} onChange={(e) => setFiltroNivel(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 transition-all">
          <option value="todos">Todos os níveis</option>
          <option value="iniciante">Iniciante</option>
          <option value="intermediario">Intermediário</option>
          <option value="avancado">Avançado</option>
        </select>
      </div>

      <div className="space-y-8">
        {Object.entries(tecnicasAgrupadas).map(([grupo, tecnicasGrupo]) => (
          <div key={grupo}>
            <h4 className="font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              {grupo}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tecnicasGrupo
                .sort((a, b) => (a.ordem_aprendizado || 0) - (b.ordem_aprendizado || 0))
                .map((tecnica, index) => (
                <div key={tecnica.id} 
                     className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:border-green-300 group"
                     style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex items-start justify-between mb-3">
                    <h5 className="font-medium text-gray-900 group-hover:text-green-600 transition-colors">{tecnica.nome}</h5>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      tecnica.nivel === 'iniciante' ? 'bg-green-100 text-green-700' :
                      tecnica.nivel === 'intermediario' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {tecnica.nivel}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">{tecnica.descricao}</p>
                  
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-500">
                        ⏱️ {tecnica.tempo_pratica_recomendado || 0} min/dia
                      </span>
                      {tecnica.tipo_tecnica && (
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded font-medium">
                          {tecnica.tipo_tecnica}
                        </span>
                      )}
                    </div>
                    <ProgressRing progress={Math.min((tecnica.ordem_aprendizado || 1) * 10, 100)} size={30} color="green" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProfessoresInstrumento = ({ professores }) => (
  <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-purple-100 animate-fade-in">
    <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
      <GraduationCap className="w-5 h-5 text-indigo-500" />
      Professores Especializados ({professores.length})
    </h3>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {professores.map((prof, index) => (
        <div key={prof.id} 
             className="border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:border-indigo-300 group hover:-translate-y-1"
             style={{ animationDelay: `${index * 150}ms` }}>
          <div className="text-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">{prof.nome_completo}</h4>
            <p className="text-sm text-gray-600">{prof.email}</p>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Experiência</span>
              <span className="font-medium text-gray-900">{prof.anos_experiencia || 0} anos</span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Especialização</span>
              <span className="font-medium text-gray-900 capitalize">{prof.especializacao || 'Geral'}</span>
            </div>
            
            {prof.biografia && (
              <p className="text-xs text-gray-600 line-clamp-3 mt-3 pt-3 border-t border-gray-200">
                {prof.biografia}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ============================================================================
// 4. COMPONENTE PRINCIPAL
// ============================================================================

export const DetalheInstrumento = () => {
  const { instrumentoId } = useParams();
  const navigate = useNavigate();
  
  // Estados principais
  const [instrumento, setInstrumento] = useState(null);
  const [detalhes, setDetalhes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('resumo');
  
  // Estados para interação
  const [audioAtivo, setAudioAtivo] = useState(null);
  const [filtroMidia, setFiltroMidia] = useState('todos');

  const carregarDados = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🎯 ID recebido na página:', instrumentoId);
      console.log('🎯 Tipo do ID:', typeof instrumentoId);
      console.log('🎯 ID é válido?', Boolean(instrumentoId));
      
      // Carregar dados do instrumento usando o mesmo método do admin
      const [instrumentoData, detalhesData] = await Promise.all([
        instrumentsService.getById(instrumentoId),
        instrumentDetailService.getInstrumentoCompleto(instrumentoId)
      ]);

      if (!instrumentoData) {
        setError('Instrumento não encontrado');
        return;
      }

      setInstrumento(instrumentoData);
      
      if (detalhesData.success) {
        const dadosCompletos = detalhesData.data;
        
        // Configurar detalhes com todos os dados relacionados
        const detalhesFormatados = {
          sons: dadosCompletos.sons || [],
          midias: dadosCompletos.midias || [],
          tecnicas: dadosCompletos.tecnicas || [],
          curiosidades: dadosCompletos.curiosidades || [],
          professores: dadosCompletos.professores || [],
          performances: dadosCompletos.performances || [],
          quiz: dadosCompletos.quiz || []
        };
        
        setDetalhes(detalhesFormatados);
        
        console.log('✅ Dados carregados:', {
          instrumento: instrumentoData?.nome,
          sons: detalhesFormatados.sons.length,
          midias: detalhesFormatados.midias.length,
          curiosidades: detalhesFormatados.curiosidades.length,
          tecnicas: detalhesFormatados.tecnicas.length,
          professores: detalhesFormatados.professores.length
        });
        
      } else {
        throw new Error(detalhesData.error || 'Erro ao carregar dados do instrumento');
      }
      
    } catch (err) {
      console.error('❌ Erro ao carregar dados do instrumento:', err);
      setError('Erro ao carregar dados do instrumento');
    } finally {
      setLoading(false);
    }
  }, [instrumentoId]);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  if (loading) {
    return (
      <AdvancedAlunoLayout>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <div className="container mx-auto px-4 py-8 space-y-6">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>
                ))}
              </div>
              <div className="h-64 bg-gray-200 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </AdvancedAlunoLayout>
    );
  }

  if (error) {
    return (
      <AdvancedAlunoLayout>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <div className="container mx-auto px-4 py-8">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
              <div className="text-red-500 mb-4">
                <AlertTriangle className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-red-900 mb-2">Erro ao Carregar</h3>
              <p className="text-red-700 mb-4">{error}</p>
              <button 
                onClick={carregarDados}
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Tentar Novamente
              </button>
            </div>
          </div>
        </div>
      </AdvancedAlunoLayout>
    );
  }

  if (!instrumento) {
    return (
      <AdvancedAlunoLayout>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Instrumento não encontrado</h2>
              <button 
                onClick={() => navigate('/alunos/instrumentos')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar aos Instrumentos
              </button>
            </div>
          </div>
        </div>
      </AdvancedAlunoLayout>
    );
  }

  const tabs = [
    { id: 'resumo', label: 'Resumo', icon: Home },
    { id: 'historia', label: 'História', icon: Clock },
    { id: 'sons', label: 'Sons', icon: Volume2 },
    { id: 'midias', label: 'Mídias', icon: Image },
    { id: 'tecnicas', label: 'Técnicas', icon: Target },
    { id: 'professores', label: 'Professores', icon: GraduationCap }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'historia':
        return <HistoriaInstrumento instrumento={instrumento} curiosidades={detalhes?.curiosidades || []} />;
      case 'sons':
        return <SonsPlayer instrumento={instrumento} sons={detalhes?.sons || []} audioAtivo={audioAtivo} setAudioAtivo={setAudioAtivo} />;
      case 'midias':
        return <GaleriaMidias midias={detalhes?.midias || []} filtroMidia={filtroMidia} setFiltroMidia={setFiltroMidia} />;
      case 'tecnicas':
        return <TecnicasInstrumento tecnicas={detalhes?.tecnicas || []} />;
      case 'professores':
        return <ProfessoresInstrumento professores={detalhes?.professores || []} />;
      default:
        return (
          <div className="space-y-6">
            {/* Cards de estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatCard 
                icon={Volume2} 
                value={detalhes?.sons?.length || 0} 
                label="Sons Disponíveis" 
                color="purple"
                delay={0}
              />
              <StatCard 
                icon={Image} 
                value={detalhes?.midias?.length || 0} 
                label="Mídias" 
                color="blue"
                delay={200}
              />
              <StatCard 
                icon={Star} 
                value={detalhes?.curiosidades?.length || 0} 
                label="Curiosidades" 
                color="yellow"
                delay={400}
              />
              <StatCard 
                icon={GraduationCap} 
                value={detalhes?.professores?.length || 0} 
                label="Professores" 
                color="indigo"
                delay={600}
              />
            </div>

            {/* Informações do instrumento */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-purple-100 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{instrumento.nome}</h2>
                    <p className="text-gray-600 leading-relaxed text-lg">{instrumento.descricao}</p>
                  </div>
                  
                  {instrumento.historia && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-purple-500" />
                        História
                      </h3>
                      <p className="text-gray-700 leading-relaxed">{instrumento.historia.slice(0, 300)}...</p>
                      <button 
                        onClick={() => setActiveTab('historia')}
                        className="inline-flex items-center gap-2 mt-3 text-purple-600 hover:text-purple-700 font-medium"
                      >
                        Ler mais <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-100">
                    <h3 className="font-semibold text-gray-900 mb-4">Características</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Família</span>
                        <span className="text-sm font-medium text-gray-900">{instrumento.familia_instrumental}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Origem</span>
                        <span className="text-sm font-medium text-gray-900">{instrumento.origem}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Dificuldade</span>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          instrumento.dificuldade_aprendizado === 'facil' ? 'bg-green-100 text-green-700' :
                          instrumento.dificuldade_aprendizado === 'medio' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {instrumento.dificuldade_aprendizado}
                        </span>
                      </div>
                      {instrumento.idade_recomendada_inicio && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Idade Recomendada</span>
                          <span className="text-sm font-medium text-gray-900">{instrumento.idade_recomendada_inicio}+ anos</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
                    <h3 className="font-semibold text-gray-900 mb-4">Progresso de Aprendizado</h3>
                    <div className="text-center">
                      <ProgressRing progress={75} size={80} color="blue" />
                      <p className="text-sm text-gray-600 mt-3">Continue aprendendo!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <AdvancedAlunoLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8 space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <button 
              onClick={() => navigate('/alunos/instrumentos')}
              className="p-2 hover:bg-white/80 rounded-full transition-colors border border-gray-200 shadow-sm"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <nav className="text-sm text-gray-600">
              <span>Instrumentos</span> 
              <ChevronLeft className="w-4 h-4 inline mx-2 rotate-180" />
              <span className="text-gray-900 font-medium">{instrumento?.nome}</span>
            </nav>
          </div>

          {/* Tabs */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-2 border border-gray-200">
            <div className="flex flex-wrap gap-2">
              {tabs.map(tab => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg transform scale-105'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Conteúdo */}
          {renderTabContent()}
        </div>
      </div>
    </AdvancedAlunoLayout>
  );
};

export default DetalheInstrumento;