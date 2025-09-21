// 🛠️ NIPO SCHOOL - UTILITIES LIBRARY
// Caminho: src/lib/utils.ts

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 🎨 UTILITY: Merge Tailwind classes intelligently
 * Combina classes CSS de forma inteligente, resolvendo conflitos
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 🎌 JAPANESE PHILOSOPHY UTILITIES
 */

// 🌱 Kaizen: Continuous Improvement
export const kaizen = {
  /**
   * Calcula progresso com filosofia Kaizen
   * Pequenas melhorias constantes são valorizadas
   */
  calculateProgress: (current: number, target: number, previous?: number) => {
    const progress = (current / target) * 100;
    const improvement = previous ? current - previous : 0;
    
    return {
      percentage: Math.min(progress, 100),
      isImproving: improvement > 0,
      improvement,
      nextMilestone: Math.ceil(target * 0.1), // 10% increments
      encouragement: getKaizenMessage(progress, improvement > 0),
    };
  },
};

// 🍃 Wabi-Sabi: Beauty in Imperfection
export const wabiSabi = {
  /**
   * Adiciona imperfeições propositais para humanizar a interface
   */
  addNaturalVariation: (baseValue: number, variation: number = 0.1) => {
    const randomFactor = (Math.random() - 0.5) * variation;
    return baseValue + (baseValue * randomFactor);
  },
  
  /**
   * Cria delays naturais para animações
   */
  naturalDelay: (index: number, baseDelay: number = 100) => {
    return baseDelay + (index * wabiSabi.addNaturalVariation(50, 0.3));
  },
};

// 🧘 Zen: Focus and Simplicity
export const zen = {
  /**
   * Determina se deve mostrar elementos extras baseado no foco
   */
  shouldShowDetail: (userLevel: 'beginner' | 'intermediate' | 'advanced') => {
    return userLevel !== 'beginner';
  },
  
  /**
   * Calcula respiração zen para animações
   */
  breathingDuration: (intensity: 'calm' | 'normal' | 'energetic') => {
    const durations = { calm: 4000, normal: 3000, energetic: 2000 };
    return durations[intensity];
  },
};

/**
 * 🎵 MUSIC & GAMIFICATION UTILITIES
 */

// 🏆 Achievement System
export const achievements = {
  /**
   * Calcula raridade de conquista baseada na dificuldade
   */
  calculateRarity: (completionRate: number): 'common' | 'rare' | 'epic' | 'legendary' => {
    if (completionRate > 80) return 'common';
    if (completionRate > 50) return 'rare';
    if (completionRate > 20) return 'epic';
    return 'legendary';
  },
  
  /**
   * Gera mensagem motivacional baseada na conquista
   */
  getMotivationalMessage: (type: string, streak?: number) => {
    const messages = {
      login_streak: [
        '継続は力なり (Keizoku wa chikara nari) - Consistência é força!',
        'あなたの努力が実を結んでいます - Seus esforços estão dando frutos!',
        '素晴らしい継続力です - Excelente perseverança!',
      ],
      level_up: [
        '昇段おめでとうございます - Parabéns pela promoção!',
        'あなたは上達しています - Você está progredindo!',
        '次のレベルに向けて頑張って - Continue rumo ao próximo nível!',
      ],
      perfect_attendance: [
        '完璧な出席率です - Frequência perfeita!',
        '規律正しい生活の証です - Prova de uma vida disciplinada!',
      ],
    };
    
    const typeMessages = messages[type as keyof typeof messages] || messages.level_up;
    return typeMessages[Math.floor(Math.random() * typeMessages.length)];
  },
};

// 🎮 Points & Levels
export const gamification = {
  /**
   * Calcula XP necessário para próximo nível (curva progressiva)
   */
  calculateXPForLevel: (level: number) => {
    return Math.floor(100 * Math.pow(1.5, level - 1));
  },
  
  /**
   * Determina nível baseado no XP total
   */
  getLevelFromXP: (totalXP: number) => {
    let level = 1;
    let xpRequired = 100;
    let accumulatedXP = 0;
    
    while (accumulatedXP + xpRequired <= totalXP) {
      accumulatedXP += xpRequired;
      level++;
      xpRequired = gamification.calculateXPForLevel(level);
    }
    
    return {
      currentLevel: level,
      currentXP: totalXP - accumulatedXP,
      nextLevelXP: xpRequired,
      progress: ((totalXP - accumulatedXP) / xpRequired) * 100,
    };
  },
  
  /**
   * Calcula pontos baseado no tipo de ação
   */
  calculatePoints: (action: string, quality?: 'poor' | 'good' | 'excellent') => {
    const basePoints = {
      attendance: 10,
      assignment_complete: 25,
      quiz_complete: 15,
      practice_session: 5,
      help_classmate: 20,
      creative_content: 30,
    };
    
    const multipliers = { poor: 0.5, good: 1, excellent: 1.5 };
    const base = basePoints[action as keyof typeof basePoints] || 5;
    const multiplier = quality ? multipliers[quality] : 1;
    
    return Math.floor(base * multiplier);
  },
};

/**
 * 🎨 VISUAL & ANIMATION UTILITIES
 */

// 🌈 Color Utilities
export const colors = {
  /**
   * Converte hex para HSL
   */
  hexToHsl: (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    
    return { h: h * 360, s: s * 100, l: l * 100 };
  },
  
  /**
   * Gera cor baseada no role do usuário
   */
  getRoleColor: (role: 'admin' | 'professor' | 'student') => {
    const roleColors = {
      admin: '#8b5cf6',
      professor: '#0ea5e9',
      student: '#10b981',
    };
    return roleColors[role];
  },
  
  /**
   * Gera gradiente baseado na raridade
   */
  getRarityGradient: (rarity: 'common' | 'rare' | 'epic' | 'legendary') => {
    const gradients = {
      common: 'from-gray-400 to-gray-600',
      rare: 'from-blue-400 to-blue-600',
      epic: 'from-purple-400 to-purple-600',
      legendary: 'from-yellow-400 to-orange-600',
    };
    return gradients[rarity];
  },
};

// 🎬 Animation Utilities
export const animations = {
  /**
   * Gera delay escalonado para animações em lista
   */
  staggerDelay: (index: number, baseDelay: number = 100) => {
    return wabiSabi.naturalDelay(index, baseDelay);
  },
  
  /**
   * Calcula duração baseada na distância
   */
  distanceBasedDuration: (distance: number, baseSpeed: number = 1000) => {
    return Math.max(200, Math.min(1000, distance * baseSpeed));
  },
  
  /**
   * Gera bounce timing para celebrações
   */
  celebrationTiming: (intensity: 'subtle' | 'normal' | 'explosive') => {
    const timings = {
      subtle: { duration: 600, bounce: 'ease-out' },
      normal: { duration: 1000, bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' },
      explosive: { duration: 1500, bounce: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' },
    };
    return timings[intensity];
  },
};

/**
 * 📱 RESPONSIVE & DEVICE UTILITIES
 */

// 📱 Device Detection
export const device = {
  /**
   * Detecta se é dispositivo touch
   */
  isTouchDevice: () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  },
  
  /**
   * Detecta orientação do dispositivo
   */
  getOrientation: () => {
    return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
  },
  
  /**
   * Calcula tamanho de fonte baseado no dispositivo
   */
  getResponsiveFontSize: (baseSize: number) => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 640) return baseSize * 0.9;
    if (screenWidth < 1024) return baseSize;
    return baseSize * 1.1;
  },
};

// 📏 Layout Utilities
export const layout = {
  /**
   * Calcula grid columns baseado no espaço disponível
   */
  calculateGridColumns: (containerWidth: number, minItemWidth: number, gap: number = 16) => {
    return Math.floor((containerWidth + gap) / (minItemWidth + gap));
  },
  
  /**
   * Calcula altura de container baseada no aspect ratio
   */
  calculateHeight: (width: number, aspectRatio: string) => {
    const [w, h] = aspectRatio.split('/').map(Number);
    return (width * h) / w;
  },
};

/**
 * 🔧 FORM & VALIDATION UTILITIES
 */

// ✅ Validation
export const validation = {
  /**
   * Valida email
   */
  isValidEmail: (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
  
  /**
   * Valida senha forte
   */
  isStrongPassword: (password: string) => {
    return password.length >= 8 && 
           /[A-Z]/.test(password) && 
           /[a-z]/.test(password) && 
           /[0-9]/.test(password);
  },
  
  /**
   * Valida nome (japonês ou português)
   */
  isValidName: (name: string) => {
    const nameRegex = /^[\p{L}\p{M}\s'-]+$/u;
    return nameRegex.test(name) && name.length >= 2 && name.length <= 50;
  },
};

// 📝 Form Utilities
export const form = {
  /**
   * Formata valor monetário brasileiro
   */
  formatCurrency: (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  },
  
  /**
   * Formata data brasileira
   */
  formatDate: (date: Date | string, format: 'short' | 'long' = 'short') => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('pt-BR', {
      dateStyle: format === 'short' ? 'short' : 'long',
    }).format(d);
  },
  
  /**
   * Formata telefone brasileiro
   */
  formatPhone: (phone: string) => {
    const numbers = phone.replace(/\D/g, '');
    if (numbers.length === 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    if (numbers.length === 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return phone;
  },
};

/**
 * 🎯 PERFORMANCE UTILITIES
 */

// ⚡ Performance
export const performance = {
  /**
   * Debounce function
   */
  debounce: <T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  },
  
  /**
   * Throttle function
   */
  throttle: <T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },
};

/**
 * 🎌 HELPER FUNCTIONS
 */

// Mensagens motivacionais Kaizen
function getKaizenMessage(progress: number, isImproving: boolean): string {
  if (progress >= 100) {
    return '完璧です！(Kanpeki desu!) - Perfeito!';
  }
  
  if (isImproving) {
    return progress > 75 
      ? 'もう少しです！(Mou sukoshi desu!) - Quase lá!'
      : '良い進歩です (Yoi shinpo desu) - Bom progresso!';
  }
  
  return '一歩一歩 (Ippo ippo) - Passo a passo!';
}

// Export default object with all utilities
export default {
  cn,
  kaizen,
  wabiSabi,
  zen,
  achievements,
  gamification,
  colors,
  animations,
  device,
  layout,
  validation,
  form,
  performance,
};