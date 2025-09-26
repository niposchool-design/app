import React, { useState } from 'react';
import { CheckCircle, Target, Users, Zap, BookOpen, Heart, Star, ArrowRight, Lightbulb, Globe } from 'lucide-react';

const AlphaPrinciplesDetail = () => {
  const [activeTab, setActiveTab] = useState('pilares');

  const alphaPrinciples = [
    {
      id: 1,
      title: 'Desafios Semanais e Registro Digital',
      description: 'Toda semana, alunos recebem desafios práticos para registrar no app/mural digital. O desafio é explicado na aula, praticado em casa ou no grupo e compartilhado online.',
      practicalExample: 'Criar sons do corpo em casa, registrar no app; roda de imitação na aula presencial.',
      icon: Target,
      color: 'bg-red-500'
    },
    {
      id: 2,
      title: 'Aprendizagem Ativa e Protagonismo',
      description: 'Aluno participa, sugere, lidera exercícios, propõe músicas e forma grupos. Professores atuam como mentores e facilitadores.',
      practicalExample: 'Alunos inventam novos jogos musicais em duplas; votação no app da melhor ideia.',
      icon: Zap,
      color: 'bg-orange-500'
    },
    {
      id: 3,
      title: 'Peer Learning (Aprendizagem entre Pares)',
      description: 'Alunos mais avançados ajudam os iniciantes; todos crescem juntos. Duplas, bandas e mentorias espontâneas são incentivadas.',
      practicalExample: 'Duplas revisam exercícios técnicos; mentoria para postura e afinação entre colegas.',
      icon: Users,
      color: 'bg-yellow-500'
    },
    {
      id: 4,
      title: 'Integração App + Aula Presencial',
      description: 'O app conecta teoria, prática e comunidade. Compartilhamento de vídeos, fotos, conquistas, dúvidas e feedback entre aulas.',
      practicalExample: 'Quizzes gamificados no app; feedback coletivo ao final da aula presencial.',
      icon: BookOpen,
      color: 'bg-green-500'
    },
    {
      id: 5,
      title: 'Projetos e Dinâmicas Coletivas',
      description: 'Gravações em grupo, festivais, apresentações, oficinas temáticas e bandas experimentais são parte central do processo.',
      practicalExample: 'Festival interno envolvendo música, teatro e dança; roda de feedback ampliada.',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      id: 6,
      title: 'Acompanhamento Individualizado',
      description: 'Professores monitoram evolução pelo app, personalizam desafios, dão feedback e envolvem famílias.',
      practicalExample: 'Autoavaliação no app; portfólio digital atualizado semanalmente pelo aluno.',
      icon: Target,
      color: 'bg-indigo-500'
    },
    {
      id: 7,
      title: 'Feedback e Celebração Constante',
      description: 'Cada aula termina com roda de feedback e reconhecimento público. Conquistas são celebradas no mural digital, redes sociais e eventos.',
      practicalExample: 'Campanhas de reconhecimento semanal nas redes sociais; mural com histórias de alunos.',
      icon: CheckCircle,
      color: 'bg-purple-500'
    },
    {
      id: 8,
      title: 'Espiritualidade, Valores e Cultura Alpha',
      description: 'União, respeito, disciplina, alegria e reflexão espiritual permeiam toda a jornada educacional.',
      practicalExample: 'Roda Alpha para fechamento; projetos coletivos que envolvem toda a comunidade.',
      icon: Heart,
      color: 'bg-pink-500'
    }
  ];

  const contextAdaptations = [
    {
      context: 'ONGs e Igrejas',
      description: 'Personalizar desafios e projetos para a cultura local, incluindo repertório, dinâmica e celebração de conquistas.',
      examples: ['Projetos coletivos temáticos', 'Roda Alpha pós-apresentação', 'Mural digital aberto à comunidade']
    },
    {
      context: 'Turmas Multietárias',
      description: 'Usar peer learning para unir gerações, promover projetos coletivos que envolvam toda a comunidade.',
      examples: ['Mentoria entre idades diferentes', 'Projetos intergeracionais', 'Troca de experiências musicais']
    },
    {
      context: 'Famílias e Comunidade',
      description: 'Convidar familiares para participar de desafios, apresentações e rodas Alpha — todos fazem parte do processo!',
      examples: ['Desafios familiares', 'Apresentações conjuntas', 'Envolvimento da comunidade local']
    }
  ];

  const tabs = [
    { id: 'pilares', name: '8 Pilares', icon: Star },
    { id: 'pratica', name: 'Na Prática', icon: Lightbulb },
    { id: 'contextos', name: 'Contextos', icon: Globe }
  ];

  return (
    <div className="space-y-8">
      {/* Navegação por Abas */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-wrap gap-2 mb-6 border-b">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-t-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-indigo-500 text-white border-b-2 border-indigo-500'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* Conteúdo das Abas */}
        {activeTab === 'pilares' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Os 8 Pilares dos Princípios Alpha
            </h2>
            <p className="text-gray-600 text-center mb-8">
              DNA metodológico da Alpha School que permeia todo o currículo da Nipo School
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {alphaPrinciples.map((principle) => {
                const IconComponent = principle.icon;
                return (
                  <div key={principle.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 ${principle.color} text-white rounded-full flex items-center justify-center flex-shrink-0`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-2">
                          {principle.id}. {principle.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-3">
                          {principle.description}
                        </p>
                        <div className="bg-gray-50 rounded-md p-3">
                          <p className="text-xs font-medium text-gray-700 mb-1">Exemplo Prático:</p>
                          <p className="text-xs text-gray-600">{principle.practicalExample}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'pratica' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Como Usar o Eixo Alpha na Prática
            </h2>
            
            {/* Quadro de Consulta */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white mb-8">
              <h3 className="text-xl font-bold mb-4 text-center">Quadro Resumo - Consulte Sempre!</h3>
              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <p className="text-center font-medium mb-2">Ao planejar qualquer módulo, pergunte-se:</p>
                <p className="text-center text-lg font-bold">"Como posso ativar o DNA Alpha aqui?"</p>
                <p className="text-center text-sm mt-2 opacity-90">
                  Use o Capítulo 0 para inspiração, ajuste a prática ao seu grupo, registre, compartilhe e celebre!
                </p>
              </div>
            </div>

            {/* Passos de Implementação */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
                <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  1
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">🎯 Planejamento</h3>
                <p className="text-gray-600 text-sm">
                  Integre os 8 pilares no planejamento de cada aula e módulo do seu curso.
                </p>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  2
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">📱 Tecnologia</h3>
                <p className="text-gray-600 text-sm">
                  Use o app para conectar teoria, prática e comunidade entre as aulas presenciais.
                </p>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                <div className="w-16 h-16 bg-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  3
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">🤝 Comunidade</h3>
                <p className="text-gray-600 text-sm">
                  Promova peer learning e celebre conquistas para fortalecer o senso de pertencimento.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'contextos' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Adaptação para Diferentes Contextos
            </h2>
            <p className="text-gray-600 text-center mb-8">
              O Eixo Alpha é flexível e pode ser adaptado para diferentes realidades e comunidades
            </p>
            
            <div className="space-y-6">
              {contextAdaptations.map((adaptation, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <ArrowRight className="w-5 h-5 text-indigo-500" />
                    {adaptation.context}
                  </h3>
                  <p className="text-gray-600 mb-4">{adaptation.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {adaptation.examples.map((example, exampleIndex) => (
                      <div key={exampleIndex} className="bg-indigo-50 rounded-md p-3">
                        <p className="text-sm text-indigo-700 font-medium">{example}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Espaço para Inovação */}
            <div className="mt-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-3 text-center">💡 Espaço para Inovação</h3>
              <p className="text-center mb-4">
                Professores, coordenadores e alunos são convidados a sugerir novas dinâmicas, 
                adaptações e desafios Alpha.
              </p>
              <p className="text-center text-sm bg-white bg-opacity-10 rounded-lg p-3">
                <strong>O Capítulo 0 é vivo:</strong> pode ser ampliado, atualizado e compartilhado 
                como inspiração para toda a rede Nipo School!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlphaPrinciplesDetail;