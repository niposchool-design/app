/**
 * 🗾 JAPANESE LOCALIZATION - Sistema i18n Japonês
 *
 * Configuração multilingual PT-BR / JP com filosofia japonesa
 */
// 🇧🇷 Português Brasileiro
export const ptBR = {
    nav: {
        home: 'Início',
        about: 'Sobre',
        contact: 'Contato',
        login: 'Entrar',
        signup: 'Cadastrar',
        logout: 'Sair'
    },
    dashboard: {
        welcome: 'Bem-vindo',
        welcomeBack: 'Bem-vindo de volta',
        totalPoints: 'Total de Pontos',
        achievements: 'Conquistas',
        streak: 'Sequência',
        lessons: 'Aulas',
        continue: 'Continue sua jornada musical',
        progress: 'Progresso'
    },
    philosophy: {
        kaizen: {
            title: 'Kaizen',
            quote: 'Melhoria contínua, passo a passo',
            meaning: 'Pequenos progressos diários levam a grandes transformações'
        },
        wabiSabi: {
            title: 'Wabi-Sabi',
            quote: 'Beleza na imperfeição',
            meaning: 'Encontre harmonia nos pequenos defeitos e na simplicidade'
        },
        zen: {
            title: 'Zen',
            quote: 'Mente clara, coração tranquilo',
            meaning: 'O aprendizado flui naturalmente quando a mente está serena'
        }
    },
    qr: {
        generateTitle: 'Sistema de Presença QR',
        scanTitle: 'Confirmar Presença',
        scanning: 'Escaneando...',
        confirmed: 'Presença Confirmada!',
        registeredAt: 'Registrado às',
        pointCamera: 'Aponte a câmera para o QR code exibido pelo professor',
        keepFocused: 'Mantenha a câmera focada no QR code'
    },
    collaboration: {
        realTime: 'Colaboração em Tempo Real',
        participants: 'Participantes',
        controls: 'Controles',
        muted: 'Mudo',
        active: 'Ativo',
        video: 'Vídeo',
        chat: 'Chat da Sessão',
        typeMessage: 'Digite sua mensagem...',
        send: 'Enviar',
        synchronization: 'Sincronização',
        start: 'Iniciar',
        stop: 'Parar'
    },
    actions: {
        save: 'Salvar',
        cancel: 'Cancelar',
        delete: 'Excluir',
        edit: 'Editar',
        create: 'Criar',
        update: 'Atualizar',
        submit: 'Enviar',
        loading: 'Carregando...',
        error: 'Erro',
        success: 'Sucesso'
    },
    music: {
        instrument: 'Instrumento',
        lesson: 'Aula',
        practice: 'Prática',
        performance: 'Performance',
        composition: 'Composição',
        rhythm: 'Ritmo',
        melody: 'Melodia',
        harmony: 'Harmonia'
    }
};
// 🇯🇵 Japonês
export const ja = {
    nav: {
        home: 'ホーム',
        about: '概要',
        contact: '連絡先',
        login: 'ログイン',
        signup: '登録',
        logout: 'ログアウト'
    },
    dashboard: {
        welcome: 'いらっしゃいませ',
        welcomeBack: 'おかえりなさい',
        totalPoints: '総ポイント',
        achievements: '実績',
        streak: '連続',
        lessons: 'レッスン',
        continue: '音楽の旅を続けましょう',
        progress: '進歩'
    },
    philosophy: {
        kaizen: {
            title: '改善',
            quote: '継続的改善、一歩ずつ',
            meaning: '毎日の小さな進歩が大きな変化をもたらします'
        },
        wabiSabi: {
            title: '侘寂',
            quote: '不完全の中の美',
            meaning: '小さな欠点とシンプルさの中に調和を見つけましょう'
        },
        zen: {
            title: '禅',
            quote: '明晰な心、穏やかな心',
            meaning: '心が穏やかなとき、学習は自然に流れます'
        }
    },
    qr: {
        generateTitle: '出席QRシステム',
        scanTitle: '出席確認',
        scanning: 'スキャン中...',
        confirmed: '出席確認済み！',
        registeredAt: '記録時刻',
        pointCamera: '先生が表示するQRコードにカメラを向けてください',
        keepFocused: 'QRコードにカメラの焦点を合わせ続けてください'
    },
    collaboration: {
        realTime: 'リアルタイムコラボレーション',
        participants: '参加者',
        controls: 'コントロール',
        muted: 'ミュート',
        active: 'アクティブ',
        video: 'ビデオ',
        chat: 'セッションチャット',
        typeMessage: 'メッセージを入力...',
        send: '送信',
        synchronization: '同期',
        start: '開始',
        stop: '停止'
    },
    actions: {
        save: '保存',
        cancel: 'キャンセル',
        delete: '削除',
        edit: '編集',
        create: '作成',
        update: '更新',
        submit: '送信',
        loading: '読み込み中...',
        error: 'エラー',
        success: '成功'
    },
    music: {
        instrument: '楽器',
        lesson: 'レッスン',
        practice: '練習',
        performance: '演奏',
        composition: '作曲',
        rhythm: 'リズム',
        melody: 'メロディー',
        harmony: 'ハーモニー'
    }
};
export const translations = {
    'pt-BR': ptBR,
    'ja': ja
};
// 🎌 Utility Functions
export const getTranslation = (lang, key) => {
    const keys = key.split('.');
    let translation = translations[lang];
    for (const k of keys) {
        translation = translation?.[k];
    }
    return translation || key;
};
export const formatJapaneseGreeting = (name, lang) => {
    if (lang === 'ja') {
        return `こんにちは、${name}さん！`;
    }
    return `こんにちは, ${name}!`;
};
