// 📋 NIPO SCHOOL - DESIGN SYSTEM CONSTANTS
// Caminho: src/lib/constants.ts

/**
 * 🎨 BRAND COLORS
 */
export const BRAND_COLORS = {
  primary: {
    50: '#fef2f2',
    100: '#fde8e8',
    200: '#fbd5d5',
    300: '#f8b4b4',
    400: '#f87171',
    500: '#ef4444', // Main brand color
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  
  // Role-based colors
  roles: {
    admin: '#8b5cf6',
    professor: '#0ea5e9',
    student: '#10b981',
  },
  
  // Japanese-inspired palette
  japanese: {
    sakura: '#ffb7c5',    // Cherry blossom pink
    matcha: '#c5d11f',    // Matcha green
    indigo: '#4c566a',    // Indigo blue
    gold: '#f7ca18',      // Gold accent
    charcoal: '#2c3e50',  // Charcoal gray
    ivory: '#fef9e7',     // Ivory white
    vermillion: '#e74c3c', // Vermillion red
  },
} as const;

/**
 * 🎭 ROLE CONFIGURATIONS
 */
export const ROLE_CONFIG = {
  admin: {
    color: BRAND_COLORS.roles.admin,
    gradient: 'from-purple-500 to-purple-600',
    shadowColor: 'rgba(139, 92, 246, 0.25)',
    japanese: '管理者', // Kanrisha - Administrator
    permissions: ['all'],
    dashboardStyle: 'executive',
  },
  professor: {
    color: BRAND_COLORS.roles.professor,
    gradient: 'from-blue-500 to-blue-600',
    shadowColor: 'rgba(14, 165, 233, 0.25)',
    japanese: '先生', // Sensei - Teacher
    permissions: ['teach', 'grade', 'create_content'],
    dashboardStyle: 'educational',
  },
  student: {
    color: BRAND_COLORS.roles.student,
    gradient: 'from-green-500 to-green-600',
    shadowColor: 'rgba(16, 185, 129, 0.25)',
    japanese: '学生', // Gakusei - Student
    permissions: ['learn', 'submit', 'participate'],
    dashboardStyle: 'gamified',
  },
} as const;

/**
 * 📏 SPACING SYSTEM (8px base grid)
 */
export const SPACING = {
  micro: '2px',   // 0.125rem
  xs: '4px',      // 0.25rem
  sm: '8px',      // 0.5rem
  md: '12px',     // 0.75rem
  base: '16px',   // 1rem
  lg: '24px',     // 1.5rem
  xl: '32px',     // 2rem
  '2xl': '48px',  // 3rem
  '3xl': '64px',  // 4rem
  '4xl': '96px',  // 6rem
} as const;

/**
 * 📐 BORDER RADIUS
 */
export const RADIUS = {
  none: '0px',
  sm: '6px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '20px',
  '3xl': '24px',
  pill: '999px',
  circle: '50%',
} as const;

/**
 * 🌫️ SHADOWS
 */
export const SHADOWS = {
  sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
  md: '0 4px 12px rgba(0, 0, 0, 0.15)',
  lg: '0 8px 24px rgba(0, 0, 0, 0.15)',
  xl: '0 12px 32px rgba(0, 0, 0, 0.2)',
  brand: '0 4px 14px rgba(239, 68, 68, 0.25)',
  glow: '0 0 20px rgba(239, 68, 68, 0.3)',
} as const;

/**
 * ⏱️ ANIMATION TIMING
 */
export const ANIMATION = {
  duration: {
    instant: '0ms',
    fast: '150ms',
    normal: '250ms',
    slow: '350ms',
    slower: '500ms',
  },
  easing: {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'cubic-bezier(0.4, 0.0, 1, 1)',
    easeOut: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    zen: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', // Smooth zen motion
  },
} as const;

/**
 * 📝 TYPOGRAPHY
 */
export const TYPOGRAPHY = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    japanese: ['Noto Sans JP', 'Inter', 'system-ui', 'sans-serif'],
    display: ['Noto Sans JP', 'Inter', 'system-ui', 'sans-serif'],
  },
  fontSize: {
    xs: '12px',   // 0.75rem
    sm: '14px',   // 0.875rem
    base: '16px', // 1rem
    lg: '18px',   // 1.125rem
    xl: '20px',   // 1.25rem
    '2xl': '24px', // 1.5rem
    '3xl': '32px', // 2rem
    '4xl': '40px', // 2.5rem
    '5xl': '48px', // 3rem
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    tight: '1.2',
    snug: '1.4',
    normal: '1.6',
    relaxed: '1.8',
  },
} as const;

/**
 * 📱 BREAKPOINTS
 */
export const BREAKPOINTS = {
  xs: '375px',   // Mobile small
  sm: '640px',   // Mobile large
  md: '768px',   // Tablet
  lg: '1024px',  // Desktop small
  xl: '1280px',  // Desktop large
  '2xl': '1536px', // Desktop extra large
} as const;

/**
 * 🎯 Z-INDEX LAYERS
 */
export const Z_INDEX = {
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
  toast: 1080,
  max: 9999,
} as const;

/**
 * 🎮 GAMIFICATION SETTINGS
 */
export const GAMIFICATION = {
  points: {
    attendance: 10,
    assignmentComplete: 25,
    quizComplete: 15,
    practiceSession: 5,
    helpClassmate: 20,
    creativeContent: 30,
    perfectWeek: 100,
    monthlyGoal: 250,
  },
  
  levels: {
    // XP required for each level (exponential curve)
    xpRequirements: [
      0,     // Level 1
      100,   // Level 2
      250,   // Level 3
      450,   // Level 4
      700,   // Level 5
      1000,  // Level 6
      1350,  // Level 7
      1750,  // Level 8
      2200,  // Level 9
      2700,  // Level 10
    ],
    
    titles: {
      1: { pt: 'Iniciante', jp: '初心者' }, // Shoshinsha
      2: { pt: 'Aprendiz', jp: '見習い' },  // Minarai
      3: { pt: 'Estudioso', jp: '学習者' }, // Gakushusha
      4: { pt: 'Dedicado', jp: '熱心' },   // Nesshin
      5: { pt: 'Talentoso', jp: '才能' },  // Sainou
      6: { pt: 'Habilidoso', jp: '上手' }, // Jouzu
      7: { pt: 'Experiente', jp: '熟練' }, // Jukuren
      8: { pt: 'Mestre', jp: '達人' },     // Tatsujin
      9: { pt: 'Sábio', jp: '賢者' },      // Kenja
      10: { pt: 'Lenda', jp: '伝説' },     // Densetsu
    },
  },
  
  achievements: {
    rarity: {
      common: { threshold: 80, color: '#6b7280' },    // 80%+ completion
      rare: { threshold: 50, color: '#3b82f6' },      // 50-79% completion
      epic: { threshold: 20, color: '#8b5cf6' },      // 20-49% completion
      legendary: { threshold: 5, color: '#f59e0b' },  // <20% completion
    },
    
    types: {
      streaks: ['7day_streak', '30day_streak', '100day_streak'],
      performance: ['perfect_score', 'improvement_rate', 'consistency'],
      social: ['helper', 'collaborator', 'mentor'],
      creative: ['content_creator', 'innovator', 'artist'],
    },
  },
} as const;

/**
 * 🎵 MUSICAL ELEMENTS
 */
export const MUSICAL = {
  notes: ['do', 're', 'mi', 'fa', 'sol', 'la', 'si'],
  
  instruments: {
    piano: { icon: '🎹', category: 'keyboard' },
    guitar: { icon: '🎸', category: 'string' },
    violin: { icon: '🎻', category: 'string' },
    flute: { icon: '🪈', category: 'wind' },
    drums: { icon: '🥁', category: 'percussion' },
    saxophone: { icon: '🎷', category: 'wind' },
  },
  
  sounds: {
    notification: '/sounds/zen-notification.mp3',
    success: '/sounds/achievement-unlock.mp3',
    levelUp: '/sounds/level-up.mp3',
    qrScan: '/sounds/qr-scan.mp3',
  },
} as const;

/**
 * 🎌 JAPANESE PHILOSOPHY
 */
export const PHILOSOPHY = {
  concepts: {
    kaizen: {
      meaning: 'Melhoria contínua',
      application: 'Small, consistent improvements',
      color: BRAND_COLORS.japanese.matcha,
    },
    wabisabi: {
      meaning: 'Beleza na imperfeição',
      application: 'Embracing natural variations',
      color: BRAND_COLORS.japanese.charcoal,
    },
    zen: {
      meaning: 'Simplicidade focada',
      application: 'Minimal, purposeful design',
      color: BRAND_COLORS.japanese.indigo,
    },
    monozukuri: {
      meaning: 'Arte de fazer coisas',
      application: 'Craftsmanship in every detail',
      color: BRAND_COLORS.japanese.gold,
    },
    omotenashi: {
      meaning: 'Hospitalidade genuína',
      application: 'Anticipating user needs',
      color: BRAND_COLORS.japanese.sakura,
    },
  },
  
  quotes: [
    {
      text: '千里の道も一歩から',
      romaji: 'Senri no michi mo ippo kara',
      translation: 'Uma jornada de mil milhas começa com um único passo',
      context: 'motivation',
    },
    {
      text: '継続は力なり',
      romaji: 'Keizoku wa chikara nari',
      translation: 'Continuidade é força',
      context: 'persistence',
    },
    {
      text: '石の上にも三年',
      romaji: 'Ishi no ue ni mo san nen',
      translation: 'Três anos até mesmo sobre uma pedra',
      context: 'patience',
    },
    {
      text: '七転び八起き',
      romaji: 'Nana korobi ya oki',
      translation: 'Caia sete vezes, levante-se oito',
      context: 'resilience',
    },
  ],
} as const;

/**
 * 📱 QR CODE SETTINGS
 */
export const QR_CODE = {
  sizes: {
    sm: 128,
    md: 192,
    lg: 256,
    xl: 320,
  },
  
  colors: {
    foreground: '#1a1a1a',
    background: '#ffffff',
    branded: BRAND_COLORS.primary[500],
  },
  
  settings: {
    errorCorrectionLevel: 'M',
    margin: 4,
    width: 256,
  },
  
  expiration: {
    attendance: 15 * 60 * 1000, // 15 minutes
    assignment: 24 * 60 * 60 * 1000, // 24 hours
    event: 60 * 60 * 1000, // 1 hour
  },
} as const;

/**
 * 🔔 NOTIFICATION SETTINGS
 */
export const NOTIFICATIONS = {
  types: {
    success: {
      icon: '✅',
      color: BRAND_COLORS.roles.student,
      duration: 4000,
    },
    error: {
      icon: '❌',
      color: BRAND_COLORS.primary[500],
      duration: 6000,
    },
    warning: {
      icon: '⚠️',
      color: '#f59e0b',
      duration: 5000,
    },
    info: {
      icon: 'ℹ️',
      color: BRAND_COLORS.roles.professor,
      duration: 4000,
    },
    achievement: {
      icon: '🏆',
      color: BRAND_COLORS.japanese.gold,
      duration: 6000,
      sound: true,
    },
  },
  
  positions: [
    'top-left',
    'top-center',
    'top-right',
    'bottom-left',
    'bottom-center',
    'bottom-right',
  ],
  
  maxVisible: 5,
  stackSpacing: 8,
} as const;

/**
 * 📊 ANALYTICS EVENTS
 */
export const ANALYTICS = {
  events: {
    // User actions
    login: 'user_login',
    logout: 'user_logout',
    signup: 'user_signup',
    
    // Learning actions
    lessonStart: 'lesson_start',
    lessonComplete: 'lesson_complete',
    quizSubmit: 'quiz_submit',
    assignmentSubmit: 'assignment_submit',
    
    // Engagement
    qrScan: 'qr_scan',
    achievementUnlock: 'achievement_unlock',
    levelUp: 'level_up',
    streakUpdate: 'streak_update',
    
    // Content creation
    contentCreate: 'content_create',
    contentShare: 'content_share',
    contentLike: 'content_like',
    
    // System
    errorOccurred: 'error_occurred',
    pageView: 'page_view',
    sessionDuration: 'session_duration',
  },
  
  properties: {
    userId: 'user_id',
    userRole: 'user_role',
    sessionId: 'session_id',
    timestamp: 'timestamp',
    platform: 'platform',
    version: 'app_version',
  },
} as const;

/**
 * 🎨 COMPONENT VARIANTS
 */
export const COMPONENT_VARIANTS = {
  button: {
    size: ['xs', 'sm', 'md', 'lg', 'xl'],
    variant: ['primary', 'secondary', 'ghost', 'outline', 'destructive'],
    state: ['default', 'hover', 'active', 'disabled', 'loading'],
  },
  
  card: {
    variant: ['default', 'interactive', 'stats', 'achievement', 'glass'],
    padding: ['sm', 'md', 'lg'],
    shadow: ['none', 'sm', 'md', 'lg'],
  },
  
  input: {
    size: ['sm', 'md', 'lg'],
    variant: ['default', 'filled', 'outline'],
    state: ['default', 'focus', 'error', 'success', 'disabled'],
  },
  
  modal: {
    size: ['xs', 'sm', 'md', 'lg', 'xl', 'full'],
    variant: ['default', 'centered', 'drawer'],
  },
} as const;

/**
 * 🌐 LOCALE SETTINGS
 */
export const LOCALE = {
  default: 'pt-BR',
  supported: ['pt-BR', 'ja-JP', 'en-US'],
  
  currency: {
    'pt-BR': 'BRL',
    'ja-JP': 'JPY',
    'en-US': 'USD',
  },
  
  dateFormat: {
    'pt-BR': 'dd/MM/yyyy',
    'ja-JP': 'yyyy年MM月dd日',
    'en-US': 'MM/dd/yyyy',
  },
} as const;

/**
 * ⚙️ APP CONFIGURATION
 */
export const APP_CONFIG = {
  name: 'Nipo School',
  version: '2.0.0',
  description: 'Sistema de ensino musical com filosofia japonesa',
  
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
    timeout: 30000,
    retries: 3,
  },
  
  storage: {
    prefix: 'nipo_',
    keys: {
      theme: 'theme',
      role: 'role',
      language: 'language',
      preferences: 'preferences',
      achievements: 'achievements',
    },
  },
  
  features: {
    darkMode: true,
    notifications: true,
    analytics: true,
    offline: true,
    qrCode: true,
    gamification: true,
    musicPlayer: true,
  },
  
  limits: {
    fileUpload: 10 * 1024 * 1024, // 10MB
    imageUpload: 5 * 1024 * 1024,  // 5MB
    sessionTimeout: 30 * 60 * 1000, // 30 minutes
    maxNotifications: 50,
  },
} as const;

/**
 * 🎭 EXPORT TYPES
 */
export type Role = keyof typeof ROLE_CONFIG;
export type ThemeColor = keyof typeof BRAND_COLORS.primary;
export type AnimationDuration = keyof typeof ANIMATION.duration;
export type AnimationEasing = keyof typeof ANIMATION.easing;
export type Breakpoint = keyof typeof BREAKPOINTS;
export type ZIndex = keyof typeof Z_INDEX;
export type NotificationType = keyof typeof NOTIFICATIONS.types;
export type AchievementRarity = keyof typeof GAMIFICATION.achievements.rarity;
export type PhilosophyConcept = keyof typeof PHILOSOPHY.concepts;