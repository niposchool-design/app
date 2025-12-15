export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      instrumentos: {
        Row: {
          id: string
          nome: string
          familia: string | null
          categoria: string | null
          descricao: string | null
          imagem_url: string | null
          video_destaque_url: string | null
          audio_exemplo_url: string | null
          popularidade: number | null
          ordem: number | null
          ativo: boolean | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          nome: string
          familia?: string | null
          categoria?: string | null
          descricao?: string | null
          imagem_url?: string | null
          video_destaque_url?: string | null
          audio_exemplo_url?: string | null
          popularidade?: number | null
          ordem?: number | null
          ativo?: boolean | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          nome?: string
          familia?: string | null
          categoria?: string | null
          descricao?: string | null
          imagem_url?: string | null
          video_destaque_url?: string | null
          audio_exemplo_url?: string | null
          popularidade?: number | null
          ordem?: number | null
          ativo?: boolean | null
          created_at?: string
          updated_at?: string | null
        }
      }
      instrumento_curiosidades: {
        Row: {
          id: string
          instrumento_id: string
          titulo: string
          descricao: string
          imagem_url: string | null
          ordem: number | null
          created_at: string
        }
        Insert: {
          id?: string
          instrumento_id: string
          titulo: string
          descricao: string
          imagem_url?: string | null
          ordem?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          instrumento_id?: string
          titulo?: string
          descricao?: string
          imagem_url?: string | null
          ordem?: number | null
          created_at?: string
        }
      }
      instrumento_midias: {
        Row: {
          id: string
          instrumento_id: string
          titulo: string
          tipo: string
          url: string
          thumbnail_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          instrumento_id: string
          titulo: string
          tipo: string
          url: string
          thumbnail_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          instrumento_id?: string
          titulo?: string
          tipo?: string
          url?: string
          thumbnail_url?: string | null
          created_at?: string
        }
      }
      instrumento_sons: {
        Row: {
          id: string
          instrumento_id: string
          titulo: string
          descricao: string | null
          audio_url: string
          tipo: string | null
          created_at: string
        }
        Insert: {
          id?: string
          instrumento_id: string
          titulo: string
          descricao?: string | null
          audio_url: string
          tipo?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          instrumento_id?: string
          titulo?: string
          descricao?: string | null
          audio_url?: string
          tipo?: string | null
          created_at?: string
        }
      }
      instrumento_tecnicas: {
        Row: {
          id: string
          instrumento_id: string
          nome: string
          descricao: string | null
          dificuldade: string | null
          video_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          instrumento_id: string
          nome: string
          descricao?: string | null
          dificuldade?: string | null
          video_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          instrumento_id?: string
          nome?: string
          descricao?: string | null
          dificuldade?: string | null
          video_url?: string | null
          created_at?: string
        }
      }
      instrumento_performances: {
        Row: {
          id: string
          instrumento_id: string
          artista: string | null
          titulo: string | null
          video_url: string | null
          descricao: string | null
          created_at: string
        }
        Insert: {
          id?: string
          instrumento_id: string
          artista?: string | null
          titulo?: string | null
          video_url?: string | null
          descricao?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          instrumento_id?: string
          artista?: string | null
          titulo?: string | null
          video_url?: string | null
          descricao?: string | null
          created_at?: string
        }
      }
      instrumento_quiz: {
        Row: {
          id: string
          instrumento_id: string
          tipo_pergunta: string | null
          pergunta: string | null
          resposta_correta: string | null
          opcoes: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          instrumento_id: string
          tipo_pergunta?: string | null
          pergunta?: string | null
          resposta_correta?: string | null
          opcoes?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          instrumento_id?: string
          tipo_pergunta?: string | null
          pergunta?: string | null
          resposta_correta?: string | null
          opcoes?: Json | null
          created_at?: string
        }
      }
      instrumentos_relacionados: {
        Row: {
          id: string
          instrumento_id: string
          relacionado_id: string
          tipo_relacao: string | null
          created_at: string
        }
        Insert: {
          id?: string
          instrumento_id: string
          relacionado_id: string
          tipo_relacao?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          instrumento_id?: string
          relacionado_id?: string
          tipo_relacao?: string | null
          created_at?: string
        }
      }
      qr_codes: {
        Row: {
          id: string
          tipo: string
          referencia_id: string
          codigo: string
          ativo: boolean
          created_at: string
        }
        Insert: {
          id?: string
          tipo: string
          referencia_id: string
          codigo: string
          ativo?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          tipo?: string
          referencia_id?: string
          codigo?: string
          ativo?: boolean
          created_at?: string
        }
      }
      historia_periodos: {
        Row: {
          id: string
          nome: string
          descricao: string | null
          data_inicio: number | null
          data_fim: number | null
          cor_tematica: string | null
          imagem_capa: string | null
          ordem_cronologica: number
          ativo: boolean
          created_at: string
        }
        Insert: {
          id?: string
          nome: string
          descricao?: string | null
          data_inicio?: number | null
          data_fim?: number | null
          cor_tematica?: string | null
          imagem_capa?: string | null
          ordem_cronologica?: number
          ativo?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          nome?: string
          descricao?: string | null
          data_inicio?: number | null
          data_fim?: number | null
          cor_tematica?: string | null
          imagem_capa?: string | null
          ordem_cronologica?: number
          ativo?: boolean
          created_at?: string
        }
      }
      historia_compositores: {
        Row: {
          id: string
          nome_completo: string
          nome_artistico: string | null
          periodo_id: string | null
          pais_nascimento: string | null
          data_nascimento: string | null
          data_falecimento: string | null
          biografia: string | null
          foto_url: string | null
          nivel_importancia: number
          ativo: boolean
          created_at: string
        }
        Insert: {
          id?: string
          nome_completo: string
          nome_artistico?: string | null
          periodo_id?: string | null
          pais_nascimento?: string | null
          data_nascimento?: string | null
          data_falecimento?: string | null
          biografia?: string | null
          foto_url?: string | null
          nivel_importancia?: number
          ativo?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          nome_completo?: string
          nome_artistico?: string | null
          periodo_id?: string | null
          pais_nascimento?: string | null
          data_nascimento?: string | null
          data_falecimento?: string | null
          biografia?: string | null
          foto_url?: string | null
          nivel_importancia?: number
          ativo?: boolean
          created_at?: string
        }
      }
      historia_obras: {
        Row: {
          id: string
          titulo: string
          titulo_original: string | null
          compositor_id: string | null
          periodo_id: string | null
          ano_composicao: number | null
          tipo_obra: string | null
          genero: string | null
          nivel_dificuldade: number | null
          popularidade: number
          audio_url: string | null
          video_url: string | null
          partitura_url: string | null
          ativo: boolean
          created_at: string
        }
        Insert: {
          id?: string
          titulo: string
          titulo_original?: string | null
          compositor_id?: string | null
          periodo_id?: string | null
          ano_composicao?: number | null
          tipo_obra?: string | null
          genero?: string | null
          nivel_dificuldade?: number | null
          popularidade?: number
          audio_url?: string | null
          video_url?: string | null
          partitura_url?: string | null
          ativo?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          titulo?: string
          titulo_original?: string | null
          compositor_id?: string | null
          periodo_id?: string | null
          ano_composicao?: number | null
          tipo_obra?: string | null
          genero?: string | null
          nivel_dificuldade?: number | null
          popularidade?: number
          audio_url?: string | null
          video_url?: string | null
          partitura_url?: string | null
          ativo?: boolean
          created_at?: string
        }
      }
      historia_eventos_timeline: {
        Row: {
          id: string
          titulo: string
          descricao: string | null
          ano: number
          mes: number | null
          dia: number | null
          categoria: string | null
          importancia: number
          periodo_id: string | null
          compositor_id: string | null
          obra_id: string | null
          imagem_url: string | null
          ativo: boolean
          created_at: string
        }
        Insert: {
          id?: string
          titulo: string
          descricao?: string | null
          ano: number
          mes?: number | null
          dia?: number | null
          categoria?: string | null
          importancia?: number
          periodo_id?: string | null
          compositor_id?: string | null
          obra_id?: string | null
          imagem_url?: string | null
          ativo?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          titulo?: string
          descricao?: string | null
          ano?: number
          mes?: number | null
          dia?: number | null
          categoria?: string | null
          importancia?: number
          periodo_id?: string | null
          compositor_id?: string | null
          obra_id?: string | null
          imagem_url?: string | null
          ativo?: boolean
          created_at?: string
        }
      }
      qr_scans: {
        Row: {
          id: string
          qr_code_id: string
          user_id: string | null
          scanned_at: string
        }
        Insert: {
          id?: string
          qr_code_id: string
          user_id?: string | null
          scanned_at?: string
        }
        Update: {
          id?: string
          qr_code_id?: string
          user_id?: string | null
          scanned_at?: string
        }
      }
      turmas: {
        Row: {
          id: string
          nome: string
          descricao: string | null
          professor_id: string | null
          instrumento_id: string | null
          capacidade: number
          horario: string | null
          data_inicio: string | null
          data_fim: string | null
          ativo: boolean
          created_at: string
        }
        Insert: {
          id?: string
          nome: string
          descricao?: string | null
          professor_id?: string | null
          instrumento_id?: string | null
          capacidade?: number
          horario?: string | null
          data_inicio?: string | null
          data_fim?: string | null
          ativo?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          nome?: string
          descricao?: string | null
          professor_id?: string | null
          instrumento_id?: string | null
          capacidade?: number
          horario?: string | null
          data_inicio?: string | null
          data_fim?: string | null
          ativo?: boolean
          created_at?: string
        }
      }
      matriculas: {
        Row: {
          id: string
          turma_id: string
          aluno_id: string
          status: 'ativa' | 'pendente' | 'concluida' | 'cancelada'
          data_matricula: string
          created_at: string
        }
        Insert: {
          id?: string
          turma_id: string
          aluno_id: string
          status?: 'ativa' | 'pendente' | 'concluida' | 'cancelada'
          data_matricula?: string
          created_at?: string
        }
        Update: {
          id?: string
          turma_id?: string
          aluno_id?: string
          status?: 'ativa' | 'pendente' | 'concluida' | 'cancelada'
          data_matricula?: string
          created_at?: string
        }
      }
      achievements: {
        Row: {
          id: string
          name: string
          description: string | null
          badge_icon: string | null
          badge_color: string | null
          points_reward: number | null
          category: string | null
          requirement_type: string | null
          requirement_value: number | null
          is_active: boolean | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          badge_icon?: string | null
          badge_color?: string | null
          points_reward?: number | null
          category?: string | null
          requirement_type?: string | null
          requirement_value?: number | null
          is_active?: boolean | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          badge_icon?: string | null
          badge_color?: string | null
          points_reward?: number | null
          category?: string | null
          requirement_type?: string | null
          requirement_value?: number | null
          is_active?: boolean | null
          created_at?: string
        }
      }
      achievements_progress: {
        Row: {
          id: string
          user_id: string | null
          achievement_id: string | null
          current_progress: number | null
          target_progress: number
          is_completed: boolean | null
          completed_at: string | null
          metadata: Json | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          achievement_id?: string | null
          current_progress?: number | null
          target_progress: number
          is_completed?: boolean | null
          completed_at?: string | null
          metadata?: Json | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          achievement_id?: string | null
          current_progress?: number | null
          target_progress?: number
          is_completed?: boolean | null
          completed_at?: string | null
          metadata?: Json | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      profiles: {
        Row: {
          id: string
          email: string | null
          full_name: string | null
          avatar_url: string | null
          role: string | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id: string
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
          role?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
          role?: string | null
          created_at?: string
          updated_at?: string | null
        }
      }
      aulas: {
        Row: {
          id: string
          titulo: string
          descricao: string | null
          data_inicio: string | null
          duracao_minutos: number | null
          status: string | null
          responsavel_id: string | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          titulo: string
          descricao?: string | null
          data_inicio?: string | null
          duracao_minutos?: number | null
          status?: string | null
          responsavel_id?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          titulo?: string
          descricao?: string | null
          data_inicio?: string | null
          duracao_minutos?: number | null
          status?: string | null
          responsavel_id?: string | null
          created_at?: string
          updated_at?: string | null
        }
      }
      repertorio: {
        Row: {
          id: string
          titulo: string
          categoria_id: string | null
          compositor: string | null
          arranjo_por: string | null
          tonalidade: string | null
          andamento: string | null
          duracao_estimada: number | null
          nivel_dificuldade: 'iniciante' | 'intermediário' | 'avançado' | null
          instrumentos_necessarios: Json | null
          numero_minimo_participantes: number | null
          partitura_url: string | null
          cifra_url: string | null
          letra_url: string | null
          playback_url: string | null
          video_tutorial_url: string | null
          publico: boolean | null
          requer_aprovacao_professor: boolean | null
          tags: Json | null
          observacoes: string | null
          ativo: boolean | null
          criado_em: string | null
        }
        Insert: {
          id?: string
          titulo: string
          categoria_id?: string | null
          compositor?: string | null
          arranjo_por?: string | null
          tonalidade?: string | null
          andamento?: string | null
          duracao_estimada?: number | null
          nivel_dificuldade?: 'iniciante' | 'intermediário' | 'avançado' | null
          instrumentos_necessarios?: Json | null
          numero_minimo_participantes?: number | null
          partitura_url?: string | null
          cifra_url?: string | null
          letra_url?: string | null
          playback_url?: string | null
          video_tutorial_url?: string | null
          publico?: boolean | null
          requer_aprovacao_professor?: boolean | null
          tags?: Json | null
          observacoes?: string | null
          ativo?: boolean | null
          criado_em?: string | null
        }
        Update: {
          id?: string
          titulo?: string
          categoria_id?: string | null
          compositor?: string | null
          arranjo_por?: string | null
          tonalidade?: string | null
          andamento?: string | null
          duracao_estimada?: number | null
          nivel_dificuldade?: 'iniciante' | 'intermediário' | 'avançado' | null
          instrumentos_necessarios?: Json | null
          numero_minimo_participantes?: number | null
          partitura_url?: string | null
          cifra_url?: string | null
          letra_url?: string | null
          playback_url?: string | null
          video_tutorial_url?: string | null
          publico?: boolean | null
          requer_aprovacao_professor?: boolean | null
          tags?: Json | null
          observacoes?: string | null
          ativo?: boolean | null
          criado_em?: string | null
        }
      }
    }
    Views: {
      view_user_gamification: {
        Row: {
          user_id: string
          email: string
          full_name: string
          total_points: number
          completed_achievements: number
          current_level: number
        }
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
