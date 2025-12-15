/**
 * 🧪 NIPO TESTING UTILITIES - Utilitários de Teste Japonês
 *
 * Helpers para testes com filosofia zen
 * (Configurado para uso futuro quando testing libs forem instaladas)
 */
// 🎨 Mock Theme Context
export const mockThemeContext = {
    isDark: false,
    currentRole: 'student',
    zenMode: false,
    toggleDark: () => { },
    setRole: () => { },
    toggleZen: () => { },
    getRoleColors: () => ({
        primary: 'bg-sakura-500',
        secondary: 'bg-sakura-100',
        text: 'text-sakura-700'
    })
};
// 📱 Mock Mobile Utilities
export const mockMobile = () => {
    Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
    });
    Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: 667,
    });
};
// 🖥️ Mock Desktop Utilities
export const mockDesktop = () => {
    Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1920,
    });
    Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: 1080,
    });
};
// 📊 Dashboard Test Utilities
export const mockDashboardData = {
    student: {
        full_name: 'Yuki Tanaka',
        total_points: 1250,
        current_streak: 7,
        total_achievements: 12,
        lessons_completed: 25,
        modules_completed: 3
    },
    professor: {
        name: 'Hiroshi Sensei',
        totalTurmas: 5,
        totalAlunos: 48,
        submissoesPendentes: 12,
        aulasSemana: 8
    },
    admin: {
        totalUsuarios: 156,
        totalProfessores: 12,
        totalAlunos: 134,
        totalInstrumentos: 23
    }
};
// 🎵 QR System Test Mocks
export const mockQRData = {
    aulaId: 'test-aula-123',
    qrCode: 'nipo-school-presence-test-123-456789',
    studentsPresent: 8,
    totalStudents: 15,
    isActive: true,
    timeRemaining: 180
};
// 🔴 Real-time Test Mocks
export const mockCollaborationData = {
    sessionId: 'test-session-123',
    participants: [
        {
            id: '1',
            name: 'Tanaka Sensei',
            role: 'professor',
            isOnline: true,
            instrument: 'Koto',
            isMuted: false,
            hasVideo: true
        },
        {
            id: '2',
            name: 'Yuki Sato',
            role: 'aluno',
            isOnline: true,
            instrument: 'Shamisen',
            isMuted: true,
            hasVideo: false
        }
    ],
    musicSync: {
        currentMeasure: 0,
        tempo: 120,
        isPlaying: false,
        currentPiece: 'Sakura Sakura - Arranjo Ensemble'
    }
};
