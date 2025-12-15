// 🎌 NIPO SCHOOL - DESIGN SYSTEM CONSTANTS
// Implementação completa baseada na documentação oficial
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
        sakura: '#ffb7c5', // Cherry blossom pink
        matcha: '#84cc16', // Matcha green
        indigo: '#6366f1', // Indigo blue
        gold: '#f59e0b', // Gold accent
        charcoal: '#2c3e50', // Charcoal gray
        ivory: '#fef9e7', // Ivory white
        vermillion: '#e74c3c', // Vermillion red
    },
};
/**
 * 🎭 ROLE CONFIGURATIONS - Sistema Oriental Unificado
 */
export const ROLE_CONFIG = {
    admin: {
        color: BRAND_COLORS.roles.admin,
        gradient: 'from-purple-500 to-purple-600',
        shadowColor: 'rgba(139, 92, 246, 0.25)',
        japanese: {
            character: '師', // Shi - Master/Admin
            title: '管理者', // Kanrisha - Administrator  
            subtitle: '優秀なチームが優秀な結果を生む', // Excellence in teams creates excellent results
        },
        permissions: ['all'],
        dashboardStyle: 'executive',
        density: 'high', // 3-4 colunas - máxima informação
        cardSize: 'compact', // Cards pequenos e informativos
        philosophy: 'Controle total e elegante',
    },
    professor: {
        color: BRAND_COLORS.roles.professor,
        gradient: 'from-blue-500 to-blue-600',
        shadowColor: 'rgba(14, 165, 233, 0.25)',
        japanese: {
            character: '先', // Sen - Teacher/Professor
            title: '先生', // Sensei - Teacher
            subtitle: '教えることは学ぶこと', // Teaching is learning
        },
        permissions: ['teach', 'grade', 'create_content'],
        dashboardStyle: 'educational',
        density: 'medium', // 2-3 colunas - funcional e pedagógico
        cardSize: 'balanced', // Cards médios e funcionais
        philosophy: 'Ensino eficiente e organizado',
    },
    student: {
        color: BRAND_COLORS.roles.student,
        gradient: 'from-green-500 to-green-600',
        shadowColor: 'rgba(16, 185, 129, 0.25)',
        japanese: {
            character: '学', // Gaku - Study/Student
            title: '学生', // Gakusei - Student
            subtitle: '音楽は心の糧である', // Music is food for the soul
        },
        permissions: ['learn', 'submit', 'participate'],
        dashboardStyle: 'gamified',
        density: 'low', // 1-2 colunas - ultra-leve e gamificado
        cardSize: 'large', // Cards grandes e motivacionais
        philosophy: 'Aprendizado divertido e motivacional',
    },
};
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
        xpRequirements: [0, 100, 250, 450, 700, 1000, 1350, 1750, 2200, 2700],
        titles: {
            1: { pt: 'Iniciante', jp: '初心者' }, // Shoshinsha
            2: { pt: 'Aprendiz', jp: '見習い' }, // Minarai
            3: { pt: 'Estudioso', jp: '学習者' }, // Gakushusha
            4: { pt: 'Dedicado', jp: '熱心' }, // Nesshin
            5: { pt: 'Talentoso', jp: '才能' }, // Sainou
            6: { pt: 'Habilidoso', jp: '上手' }, // Jouzu
            7: { pt: 'Experiente', jp: '熟練' }, // Jukuren
            8: { pt: 'Mestre', jp: '達人' }, // Tatsujin
            9: { pt: 'Sábio', jp: '賢者' }, // Kenja
            10: { pt: 'Lenda', jp: '伝説' }, // Densetsu
        },
    },
};
/**
 * 🌸 DESIGN UTILITIES - Sistema Oriental Adaptativo
 */
export const DESIGN_UTILS = {
    // Backgrounds orientais por nível de usuário
    backgrounds: {
        student: 'bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50',
        professor: 'bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50',
        admin: 'bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50',
    },
    // Grid density por usuário (Sistema Oriental Unificado)
    gridCols: {
        student: 'grid-cols-1 lg:grid-cols-2', // Baixa densidade - gamificação
        professor: 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3', // Média densidade - funcional
        admin: 'grid-cols-1 lg:grid-cols-3 xl:grid-cols-4', // Alta densidade - informacional
    },
    // Tamanhos de card por densidade (Filosofia Japonesa)
    cardSizes: {
        student: 'p-8', // Grandes e espaçosos - wabi-sabi
        professor: 'p-6', // Médios e funcionais - zen
        admin: 'p-4', // Compactos e informativos - kaizen
    },
    // Gaps por densidade
    gridGaps: {
        student: 'gap-8', // Respiro visual para aprendizado
        professor: 'gap-6', // Organização pedagógica
        admin: 'gap-4', // Máxima eficiência
    },
    // Icon sizes por papel
    iconSizes: {
        student: { card: 'w-16 h-16', stat: 'w-12 h-12', action: 'w-8 h-8' },
        professor: { card: 'w-12 h-12', stat: 'w-8 h-8', action: 'w-6 h-6' },
        admin: { card: 'w-8 h-8', stat: 'w-6 h-6', action: 'w-5 h-5' },
    },
    // Text sizes por contexto
    textSizes: {
        student: { title: 'text-2xl', value: 'text-4xl', subtitle: 'text-base' },
        professor: { title: 'text-xl', value: 'text-3xl', subtitle: 'text-sm' },
        admin: { title: 'text-lg', value: 'text-2xl', subtitle: 'text-xs' },
    }
};
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
            text: '音楽は心の糧である',
            romaji: 'Ongaku wa kokoro no kate de aru',
            translation: 'A música é o alimento da alma',
            context: 'learning',
        },
    ],
};
