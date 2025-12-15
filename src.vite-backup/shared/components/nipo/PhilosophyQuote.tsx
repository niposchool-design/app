import React, { useState, useEffect } from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import { Quote, RotateCcw } from 'lucide-react'

// 🎌 Tipos do PhilosophyQuote
interface PhilosophyQuoteProps {
  philosophy?: 'kaizen' | 'wabi-sabi' | 'zen' | 'all'
  autoRotate?: boolean
  rotateInterval?: number // em segundos
  showAuthor?: boolean
  variant?: 'default' | 'card' | 'banner' | 'minimal'
  className?: string
}

// 🧘 Filosofias japonesas com citações
const philosophyQuotes = {
  kaizen: [
    {
      text: "Melhoria contínua é melhor que perfeição tardia.",
      author: "Filosofia Kaizen",
      japanese: "改善"
    },
    {
      text: "Pequenos passos todos os dias levam a grandes mudanças ao longo do tempo.",
      author: "Provérbio Japonês",
      japanese: "継続は力なり"
    },
    {
      text: "O caminho dos mil quilômetros começa com um único passo.",
      author: "Lao Tzu",
      japanese: "千里の道も一歩から"
    },
    {
      text: "Perfeição é alcançada não quando não há mais nada para adicionar, mas quando não há mais nada para remover.",
      author: "Antoine de Saint-Exupéry",
      japanese: "完璧"
    }
  ],
  'wabi-sabi': [
    {
      text: "A beleza está na imperfeição, impermanência e incompletude.",
      author: "Filosofia Wabi-Sabi",
      japanese: "侘寂"
    },
    {
      text: "Aceite as coisas como elas são, não como você gostaria que fossem.",
      author: "Provérbio Zen",
      japanese: "受容"
    },
    {
      text: "A rachadura é onde a luz entra.",
      author: "Leonard Cohen",
      japanese: "光は隙間から"
    },
    {
      text: "Encontre beleza nas coisas simples e transitórias.",
      author: "Filosofia Japonesa",
      japanese: "簡素"
    }
  ],
  zen: [
    {
      text: "A mente que está ansiosa sobre eventos futuros é infeliz.",
      author: "Sêneca",
      japanese: "禅"
    },
    {
      text: "Você é perfeito como você é, e você pode usar alguma melhoria.",
      author: "Suzuki Roshi",
      japanese: "完全なる不完全"
    },
    {
      text: "O presente é o único momento que temos.",
      author: "Thich Nhat Hanh",
      japanese: "今この瞬間"
    },
    {
      text: "Quando você faz algo, você deve se queimar completamente, como uma boa fogueira, sem deixar rastros.",
      author: "Shunryu Suzuki",
      japanese: "一心不乱"
    }
  ]
}

// 🎲 Função para obter quote aleatória
const getRandomQuote = (philosophy: 'kaizen' | 'wabi-sabi' | 'zen' | 'all') => {
  if (philosophy === 'all') {
    const allQuotes = [...philosophyQuotes.kaizen, ...philosophyQuotes['wabi-sabi'], ...philosophyQuotes.zen]
    return allQuotes[Math.floor(Math.random() * allQuotes.length)]
  }
  
  const quotes = philosophyQuotes[philosophy]
  return quotes[Math.floor(Math.random() * quotes.length)]
}

export function PhilosophyQuote({
  philosophy = 'all',
  autoRotate = true,
  rotateInterval = 10,
  showAuthor = true,
  variant = 'card',
  className = ''
}: PhilosophyQuoteProps) {
  const { isDark } = useTheme()
  const [currentQuote, setCurrentQuote] = useState(() => getRandomQuote(philosophy))
  const [isVisible, setIsVisible] = useState(true)

  // 🔄 Auto rotation effect
  useEffect(() => {
    if (!autoRotate) return

    const interval = setInterval(() => {
      setIsVisible(false)
      
      setTimeout(() => {
        setCurrentQuote(getRandomQuote(philosophy))
        setIsVisible(true)
      }, 300)
    }, rotateInterval * 1000)

    return () => clearInterval(interval)
  }, [autoRotate, rotateInterval, philosophy])

  // 🔄 Manual rotation
  const handleRotate = () => {
    setIsVisible(false)
    
    setTimeout(() => {
      setCurrentQuote(getRandomQuote(philosophy))
      setIsVisible(true)
    }, 300)
  }

  // 🎨 Variant styling
  const getVariantClasses = () => {
    const baseClasses = `transition-all duration-500 ease-in-out ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 transform translate-y-4'}`

    switch (variant) {
      case 'card':
        return `
          ${baseClasses}
          bg-white dark:bg-nipo-zen-800 rounded-zen p-6
          border border-nipo-zen-200 dark:border-nipo-zen-700
          shadow-zen hover:shadow-float
        `

      case 'banner':
        return `
          ${baseClasses}
          bg-gradient-to-r from-nipo-zen-100 to-nipo-zen-200
          dark:from-nipo-zen-800 dark:to-nipo-zen-700
          rounded-zen p-8 text-center
          border border-nipo-zen-200 dark:border-nipo-zen-600
        `

      case 'minimal':
        return `
          ${baseClasses}
          bg-transparent p-4 text-center
        `

      case 'default':
      default:
        return `
          ${baseClasses}
          bg-nipo-zen-50 dark:bg-nipo-zen-800/50 rounded-zen p-6
          border-l-4 border-nipo-primary
        `
    }
  }

  return (
    <div className={`${getVariantClasses()} ${className}`}>
      {/* 📝 Quote Content */}
      <div className="relative">
        {/* 💬 Quote Icon */}
        {variant !== 'minimal' && (
          <div className="absolute -top-2 -left-2">
            <div className="w-8 h-8 bg-nipo-primary rounded-full flex items-center justify-center">
              <Quote className="w-4 h-4 text-white" />
            </div>
          </div>
        )}

        {/* 🌸 Japanese Character */}
        <div className="float-right ml-4 mb-2">
          <span className={`
            text-4xl font-japanese opacity-20
            ${isDark ? 'text-white' : 'text-nipo-zen-700'}
          `}>
            {currentQuote.japanese}
          </span>
        </div>

        {/* 📖 Quote Text */}
        <blockquote className={`
          ${variant === 'banner' ? 'text-lg md:text-xl' : 'text-base'}
          font-zen leading-relaxed italic
          ${isDark ? 'text-nipo-zen-200' : 'text-nipo-zen-800'}
          mb-4
        `}>
          "{currentQuote.text}"
        </blockquote>

        {/* 👤 Author */}
        {showAuthor && (
          <cite className={`
            block text-right text-sm font-zen font-medium
            ${isDark ? 'text-nipo-zen-400' : 'text-nipo-zen-600'}
          `}>
            — {currentQuote.author}
          </cite>
        )}

        {/* 🔄 Rotate Button */}
        <button
          onClick={handleRotate}
          className={`
            absolute bottom-0 right-0 p-2 rounded-full
            transition-all duration-300 hover:scale-110 active:scale-95
            ${variant === 'minimal' 
              ? 'bg-nipo-zen-200 dark:bg-nipo-zen-700 hover:bg-nipo-zen-300 dark:hover:bg-nipo-zen-600' 
              : 'bg-nipo-primary/10 hover:bg-nipo-primary/20'
            }
            ${isDark ? 'text-nipo-zen-300 hover:text-white' : 'text-nipo-zen-600 hover:text-nipo-zen-900'}
          `}
          aria-label="Nova citação"
          title="Nova citação"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

// 🎌 Componentes especializados por filosofia
export function KaizenQuote(props: Omit<PhilosophyQuoteProps, 'philosophy'>) {
  return <PhilosophyQuote {...props} philosophy="kaizen" />
}

export function WabiSabiQuote(props: Omit<PhilosophyQuoteProps, 'philosophy'>) {
  return <PhilosophyQuote {...props} philosophy="wabi-sabi" />
}

export function ZenQuote(props: Omit<PhilosophyQuoteProps, 'philosophy'>) {
  return <PhilosophyQuote {...props} philosophy="zen" />
}

// 🎯 Variants específicos
export function QuoteCard(props: PhilosophyQuoteProps) {
  return <PhilosophyQuote {...props} variant="card" />
}

export function QuoteBanner(props: PhilosophyQuoteProps) {
  return <PhilosophyQuote {...props} variant="banner" />
}

export function MinimalQuote(props: PhilosophyQuoteProps) {
  return <PhilosophyQuote {...props} variant="minimal" />
}