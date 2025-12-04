/**
 * 🗾 JAPANESE LOCALIZATION - Sistema i18n Japonês
 * 
 * Configuração multilingual PT-BR / JP com filosofia japonesa
 */

export interface TranslationKeys {
  // 🏠 Navigation
  nav: {
    home: string
    about: string
    contact: string
    login: string
    signup: string
    logout: string
  }
  
  // 🎓 Dashboard
  dashboard: {
    welcome: string
    welcomeBack: string
    totalPoints: string
    achievements: string
    streak: string
    lessons: string
    continue: string
    progress: string
  }
  
  // 🎌 Philosophy
  philosophy: {
    kaizen: {
      title: string
      quote: string
      meaning: string
    }
    wabiSabi: {
      title: string
      quote: string
      meaning: string
    }
    zen: {
      title: string
      quote: string
      meaning: string
    }
  }
  
  // 📱 QR System
  qr: {
    generateTitle: string
    scanTitle: string
    scanning: string
    confirmed: string
    registeredAt: string
    pointCamera: string
    keepFocused: string
  }
  
  // 🔴 Collaboration
  collaboration: {
    realTime: string
    participants: string
    controls: string
    muted: string
    active: string
    video: string
    chat: string
    typeMessage: string
    send: string
    synchronization: string
    start: string
    stop: string
  }
  
  // ⚡ Actions
  actions: {
    save: string
    cancel: string
    delete: string
    edit: string
    create: string
    update: string
    submit: string
    loading: string
    error: string
    success: string
  }
  
  // 🎵 Music
  music: {
    instrument: string
    lesson: string
    practice: string
    performance: string
    composition: string
    rhythm: string
    melody: string
    harmony: string
  }
}

// 🇧🇷 Português Brasileiro
export const ptBR: TranslationKeys = {
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
}

// 🇯🇵 Japonês
export const ja: TranslationKeys = {
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
}

// 🌐 Language Context
export type Language = 'pt-BR' | 'ja'

export const translations = {
  'pt-BR': ptBR,
  'ja': ja
}

// 🎌 Utility Functions
export const getTranslation = (lang: Language, key: string): string => {
  const keys = key.split('.')
  let translation: any = translations[lang]
  
  for (const k of keys) {
    translation = translation?.[k]
  }
  
  return translation || key
}

export const formatJapaneseGreeting = (name: string, lang: Language): string => {
  if (lang === 'ja') {
    return `こんにちは、${name}さん！`
  }
  return `こんにちは, ${name}!`
}