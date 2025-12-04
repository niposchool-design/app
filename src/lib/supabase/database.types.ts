/**
 * 🏗️ DATABASE TYPES - NIPO SCHOOL
 * 
 * Types TypeScript gerados conforme documento backend
 * Total: 117 tabelas + views conforme mapeamento completo
 */

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
      // ===========================================
      // 🏛️ TABELAS PRINCIPAIS (CORE)
      // ===========================================
      
      profiles: {
        Row: {
          id: string
          email: string | null
          full_name: string | null
          nome: string | null
          dob: string | null
          instrument: string | null
          voted_logo: string | null
          has_voted: boolean | null
          avatar_url: string | null
          church_name: string | null
          user_level: "beginner" | "intermediate" | "advanced" | null
          points: number | null
          badges: string[] | null
          achievements: string[] | null
          progress: Json | null
          preferences: Json | null
          social_links: Json | null
          bio: string | null
          location: string | null
          phone: string | null
          emergency_contact: string | null
          medical_info: string | null
          dietary_restrictions: string | null
          accessibility_needs: string | null
          created_at: string
          updated_at: string | null
          last_login: string | null
          is_active: boolean | null
          tipo_usuario: "aluno" | "professor" | "pastor" | "admin" | null
        }
        Insert: {
          id: string
          email?: string | null
          full_name?: string | null
          nome?: string | null
          dob?: string | null
          instrument?: string | null
          voted_logo?: string | null
          has_voted?: boolean | null
          avatar_url?: string | null
          church_name?: string | null
          user_level?: "beginner" | "intermediate" | "advanced" | null
          points?: number | null
          badges?: string[] | null
          achievements?: string[] | null
          progress?: Json | null
          preferences?: Json | null
          social_links?: Json | null
          bio?: string | null
          location?: string | null
          phone?: string | null
          emergency_contact?: string | null
          medical_info?: string | null
          dietary_restrictions?: string | null
          accessibility_needs?: string | null
          created_at?: string
          updated_at?: string | null
          last_login?: string | null
          is_active?: boolean | null
          tipo_usuario?: "aluno" | "professor" | "pastor" | "admin" | null
        }
        Update: {
          id?: string
          email?: string | null
          full_name?: string | null
          nome?: string | null
          dob?: string | null
          instrument?: string | null
          voted_logo?: string | null
          has_voted?: boolean | null
          avatar_url?: string | null
          church_name?: string | null
          user_level?: "beginner" | "intermediate" | "advanced" | null
          points?: number | null
          badges?: string[] | null
          achievements?: string[] | null
          progress?: Json | null
          preferences?: Json | null
          social_links?: Json | null
          bio?: string | null
          location?: string | null
          phone?: string | null
          emergency_contact?: string | null
          medical_info?: string | null
          dietary_restrictions?: string | null
          accessibility_needs?: string | null
          created_at?: string
          updated_at?: string | null
          last_login?: string | null
          is_active?: boolean | null
          tipo_usuario?: "aluno" | "professor" | "pastor" | "admin" | null
        }
        Relationships: []
      }

      // ===========================================
      // 🏆 SISTEMA DE CONQUISTAS
      // ===========================================
      
      achievements: {
        Row: {
          id: string
          nome: string
          descricao: string
          icone: string
          categoria: string
          pontos_recompensa: number
          raridade: "comum" | "raro" | "epico" | "lendario"
          visivel: boolean
          created_at: string
        }
        Insert: {
          id?: string
          nome: string
          descricao: string
          icone?: string
          categoria: string
          pontos_recompensa?: number
          raridade?: "comum" | "raro" | "epico" | "lendario"
          visivel?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          nome?: string
          descricao?: string
          icone?: string
          categoria?: string
          pontos_recompensa?: number
          raridade?: "comum" | "raro" | "epico" | "lendario"
          visivel?: boolean
          created_at?: string
        }
        Relationships: []
      }

      user_achievements: {
        Row: {
          id: string
          user_id: string
          achievement_id: string
          unlocked_at: string
          progress_data: Json | null
        }
        Insert: {
          id?: string
          user_id: string
          achievement_id: string
          unlocked_at?: string
          progress_data?: Json | null
        }
        Update: {
          id?: string
          user_id?: string
          achievement_id?: string
          unlocked_at?: string
          progress_data?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          }
        ]
      }

      // ===========================================
      // 🎯 SISTEMA DE DESAFIOS
      // ===========================================
      
      alpha_desafios: {
        Row: {
          id: string
          titulo: string
          descricao: string
          tipo: string
          nivel: "facil" | "medio" | "dificil"
          pontos: number
          ativo: boolean
          created_at: string
        }
        Insert: {
          id?: string
          titulo: string
          descricao: string
          tipo: string
          nivel?: "facil" | "medio" | "dificil"
          pontos?: number
          ativo?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          titulo?: string
          descricao?: string
          tipo?: string
          nivel?: "facil" | "medio" | "dificil"
          pontos?: number
          ativo?: boolean
          created_at?: string
        }
        Relationships: []
      }

      desafio_submissions: {
        Row: {
          id: string
          user_id: string
          desafio_id: string
          submission_data: Json
          status: "pendente" | "aprovado" | "rejeitado"
          feedback: string | null
          submitted_at: string
          reviewed_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          desafio_id: string
          submission_data: Json
          status?: "pendente" | "aprovado" | "rejeitado"
          feedback?: string | null
          submitted_at?: string
          reviewed_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          desafio_id?: string
          submission_data?: Json
          status?: "pendente" | "aprovado" | "rejeitado"
          feedback?: string | null
          submitted_at?: string
          reviewed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "desafio_submissions_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "desafio_submissions_desafio_id_fkey"
            columns: ["desafio_id"]
            referencedRelation: "alpha_desafios"
            referencedColumns: ["id"]
          }
        ]
      }

      // ===========================================
      // 📂 SISTEMA DE PORTFÓLIOS
      // ===========================================
      
      portfolios: {
        Row: {
          id: string
          user_id: string
          titulo: string
          descricao: string
          tipo: string
          status: "rascunho" | "submetido" | "em_avaliacao" | "avaliado"
          nota_final: number
          feedback: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          titulo: string
          descricao?: string
          tipo: string
          status?: "rascunho" | "submetido" | "em_avaliacao" | "avaliado"
          nota_final?: number
          feedback?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          titulo?: string
          descricao?: string
          tipo?: string
          status?: "rascunho" | "submetido" | "em_avaliacao" | "avaliado"
          nota_final?: number
          feedback?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "portfolios_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }

      portfolio_items: {
        Row: {
          id: string
          portfolio_id: string
          titulo: string
          descricao: string | null
          tipo: "arquivo" | "video" | "audio" | "texto"
          conteudo_url: string | null
          conteudo_texto: string | null
          ordem: number
          created_at: string
        }
        Insert: {
          id?: string
          portfolio_id: string
          titulo: string
          descricao?: string | null
          tipo: "arquivo" | "video" | "audio" | "texto"
          conteudo_url?: string | null
          conteudo_texto?: string | null
          ordem?: number
          created_at?: string
        }
        Update: {
          id?: string
          portfolio_id?: string
          titulo?: string
          descricao?: string | null
          tipo?: "arquivo" | "video" | "audio" | "texto"
          conteudo_url?: string | null
          conteudo_texto?: string | null
          ordem?: number
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "portfolio_items_portfolio_id_fkey"
            columns: ["portfolio_id"]
            referencedRelation: "portfolios"
            referencedColumns: ["id"]
          }
        ]
      }

      // ===========================================
      // 🎵 SISTEMA DE INSTRUMENTOS
      // ===========================================
      
      instrumentos: {
        Row: {
          id: string
          nome: string
          categoria: string
          descricao: string | null
          nivel_dificuldade: "iniciante" | "intermediario" | "avancado"
          imagem_url: string | null
          video_intro_url: string | null
          recursos_aprendizado: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          nome: string
          categoria: string
          descricao?: string | null
          nivel_dificuldade?: "iniciante" | "intermediario" | "avancado"
          imagem_url?: string | null
          video_intro_url?: string | null
          recursos_aprendizado?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          nome?: string
          categoria?: string
          descricao?: string | null
          nivel_dificuldade?: "iniciante" | "intermediario" | "avancado"
          imagem_url?: string | null
          video_intro_url?: string | null
          recursos_aprendizado?: Json | null
          created_at?: string
        }
        Relationships: []
      }

      instrumentos_alunos: {
        Row: {
          id: string
          aluno_id: string
          instrumento_id: string
          data_inicio: string
          progresso_porcentagem: number
          tempo_pratica_minutos: number
          nivel_atual: string
          tecnicas_dominadas: string[]
          observacoes: string | null
          ultima_pratica: string
          atualizado_em: string
        }
        Insert: {
          id?: string
          aluno_id: string
          instrumento_id: string
          data_inicio?: string
          progresso_porcentagem?: number
          tempo_pratica_minutos?: number
          nivel_atual?: string
          tecnicas_dominadas?: string[]
          observacoes?: string | null
          ultima_pratica: string
          atualizado_em?: string
        }
        Update: {
          id?: string
          aluno_id?: string
          instrumento_id?: string
          data_inicio?: string
          progresso_porcentagem?: number
          tempo_pratica_minutos?: number
          nivel_atual?: string
          tecnicas_dominadas?: string[]
          observacoes?: string | null
          ultima_pratica?: string
          atualizado_em?: string
        }
        Relationships: [
          {
            foreignKeyName: "instrumentos_alunos_aluno_id_fkey"
            columns: ["aluno_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "instrumentos_alunos_instrumento_id_fkey"
            columns: ["instrumento_id"]
            referencedRelation: "instrumentos"
            referencedColumns: ["id"]
          }
        ]
      }

      // ===========================================
      // 👥 SISTEMA DE TURMAS
      // ===========================================
      
      turmas: {
        Row: {
          id: string
          nome: string
          descricao: string | null
          professor_id: string
          data_inicio: string
          data_fim: string | null
          ativo: boolean
          created_at: string
        }
        Insert: {
          id?: string
          nome: string
          descricao?: string | null
          professor_id: string
          data_inicio: string
          data_fim?: string | null
          ativo?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          nome?: string
          descricao?: string | null
          professor_id?: string
          data_inicio?: string
          data_fim?: string | null
          ativo?: boolean
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "turmas_professor_id_fkey"
            columns: ["professor_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }

      turma_alunos: {
        Row: {
          id: string
          turma_id: string
          aluno_id: string
          data_ingresso: string
          status: "ativo" | "inativo" | "concluido"
          notas: Json | null
        }
        Insert: {
          id?: string
          turma_id: string
          aluno_id: string
          data_ingresso?: string
          status?: "ativo" | "inativo" | "concluido"
          notas?: Json | null
        }
        Update: {
          id?: string
          turma_id?: string
          aluno_id?: string
          data_ingresso?: string
          status?: "ativo" | "inativo" | "concluido"
          notas?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "turma_alunos_turma_id_fkey"
            columns: ["turma_id"]
            referencedRelation: "turmas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "turma_alunos_aluno_id_fkey"
            columns: ["aluno_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }

      // ===========================================
      // 📚 SISTEMA DE AULAS E CONTEÚDO
      // ===========================================
      
      aulas: {
        Row: {
          id: string
          titulo: string
          descricao: string | null
          professor_id: string
          turma_id: string | null
          data_aula: string
          duracao_minutos: number
          tipo: "teorica" | "pratica" | "avaliacao"
          conteudo: Json | null
          recursos: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          titulo: string
          descricao?: string | null
          professor_id: string
          turma_id?: string | null
          data_aula: string
          duracao_minutos?: number
          tipo?: "teorica" | "pratica" | "avaliacao"
          conteudo?: Json | null
          recursos?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          titulo?: string
          descricao?: string | null
          professor_id?: string
          turma_id?: string | null
          data_aula?: string
          duracao_minutos?: number
          tipo?: "teorica" | "pratica" | "avaliacao"
          conteudo?: Json | null
          recursos?: Json | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "aulas_professor_id_fkey"
            columns: ["professor_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "aulas_turma_id_fkey"
            columns: ["turma_id"]
            referencedRelation: "turmas"
            referencedColumns: ["id"]
          }
        ]
      }

      // ===========================================
      // 🔔 SISTEMA DE NOTIFICAÇÕES
      // ===========================================
      
      notificacoes: {
        Row: {
          id: string
          user_id: string
          titulo: string
          mensagem: string
          tipo: "info" | "sucesso" | "aviso" | "erro"
          lida: boolean
          data_envio: string
          data_leitura: string | null
          metadata: Json | null
        }
        Insert: {
          id?: string
          user_id: string
          titulo: string
          mensagem: string
          tipo?: "info" | "sucesso" | "aviso" | "erro"
          lida?: boolean
          data_envio?: string
          data_leitura?: string | null
          metadata?: Json | null
        }
        Update: {
          id?: string
          user_id?: string
          titulo?: string
          mensagem?: string
          tipo?: "info" | "sucesso" | "aviso" | "erro"
          lida?: boolean
          data_envio?: string
          data_leitura?: string | null
          metadata?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "notificacoes_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }

      // 📊 SISTEMA DE LOGS E ATIVIDADES
      // ===========================================
      
      user_activity_log: {
        Row: {
          id: string
          user_id: string
          activity_type: string
          points: number
          description: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          activity_type: string
          points?: number
          description?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          activity_type?: string
          points?: number
          description?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_activity_log_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }

      weekly_challenges: {
        Row: {
          id: string
          title: string
          description: string
          points: number
          active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          points?: number
          active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          points?: number
          active?: boolean
          created_at?: string
        }
        Relationships: []
      }

      categorias_instrumentos: {
        Row: {
          id: string
          nome: string
          descricao: string
          ativo: boolean
          created_at: string
        }
        Insert: {
          id?: string
          nome: string
          descricao?: string
          ativo?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          nome?: string
          descricao?: string
          ativo?: boolean
          created_at?: string
        }
        Relationships: []
      }

      user_points_log: {
        Row: {
          id: string
          user_id: string
          points: number
          reason: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          points: number
          reason?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          points?: number
          reason?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_points_log_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }

      audit_activities: {
        Row: {
          id: string
          user_id: string
          action: string
          resource: string
          details: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          action: string
          resource: string
          details?: Json
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          action?: string
          resource?: string
          details?: Json
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_activities_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }

      // 🎼 MÓDULO HISTÓRIA DA MÚSICA
      // ===========================================
      
      historia_periodos: {
        Row: {
          id: string
          nome: string
          periodo_inicio: number | null
          periodo_fim: number | null
          descricao_curta: string | null
          descricao_completa: string | null
          contexto_historico: string | null
          caracteristicas_principais: Json | null
          imagem_capa_url: string | null
          cor_tematica: string | null
          ordem_cronologica: number | null
          ativo: boolean
          created_at: string
        }
        Insert: {
          id?: string
          nome: string
          periodo_inicio?: number | null
          periodo_fim?: number | null
          descricao_curta?: string | null
          descricao_completa?: string | null
          contexto_historico?: string | null
          caracteristicas_principais?: Json | null
          imagem_capa_url?: string | null
          cor_tematica?: string | null
          ordem_cronologica?: number | null
          ativo?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          nome?: string
          periodo_inicio?: number | null
          periodo_fim?: number | null
          descricao_curta?: string | null
          descricao_completa?: string | null
          contexto_historico?: string | null
          caracteristicas_principais?: Json | null
          imagem_capa_url?: string | null
          cor_tematica?: string | null
          ordem_cronologica?: number | null
          ativo?: boolean
          created_at?: string
        }
        Relationships: []
      }

      historia_compositores: {
        Row: {
          id: string
          nome_completo: string
          nome_artistico: string | null
          data_nascimento: string | null
          data_falecimento: string | null
          pais_nascimento: string | null
          cidade_nascimento: string | null
          periodo_id: string | null
          biografia_curta: string | null
          biografia_completa: string | null
          principais_obras: string[] | null
          estilo_musical: string | null
          instrumentos_tocados: string[] | null
          curiosidades: Json | null
          foto_url: string | null
          audio_assinatura_url: string | null
          nivel_importancia: number
          tags: string[] | null
          ativo: boolean
          created_at: string
        }
        Insert: {
          id?: string
          nome_completo: string
          nome_artistico?: string | null
          data_nascimento?: string | null
          data_falecimento?: string | null
          pais_nascimento?: string | null
          cidade_nascimento?: string | null
          periodo_id?: string | null
          biografia_curta?: string | null
          biografia_completa?: string | null
          principais_obras?: string[] | null
          estilo_musical?: string | null
          instrumentos_tocados?: string[] | null
          curiosidades?: Json | null
          foto_url?: string | null
          audio_assinatura_url?: string | null
          nivel_importancia?: number
          tags?: string[] | null
          ativo?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          nome_completo?: string
          nome_artistico?: string | null
          data_nascimento?: string | null
          data_falecimento?: string | null
          pais_nascimento?: string | null
          cidade_nascimento?: string | null
          periodo_id?: string | null
          biografia_curta?: string | null
          biografia_completa?: string | null
          principais_obras?: string[] | null
          estilo_musical?: string | null
          instrumentos_tocados?: string[] | null
          curiosidades?: Json | null
          foto_url?: string | null
          audio_assinatura_url?: string | null
          nivel_importancia?: number
          tags?: string[] | null
          ativo?: boolean
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "historia_compositores_periodo_id_fkey"
            columns: ["periodo_id"]
            referencedRelation: "historia_periodos"
            referencedColumns: ["id"]
          }
        ]
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
          duracao_minutos: number | null
          instrumentacao: string[] | null
          tonalidade: string | null
          opus_numero: string | null
          descricao: string | null
          contexto_criacao: string | null
          estrutura_formal: Json | null
          analise_musical: string | null
          significado_historico: string | null
          audio_url: string | null
          partitura_url: string | null
          video_performance_url: string | null
          nivel_dificuldade: number | null
          popularidade: number
          tags: string[] | null
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
          duracao_minutos?: number | null
          instrumentacao?: string[] | null
          tonalidade?: string | null
          opus_numero?: string | null
          descricao?: string | null
          contexto_criacao?: string | null
          estrutura_formal?: Json | null
          analise_musical?: string | null
          significado_historico?: string | null
          audio_url?: string | null
          partitura_url?: string | null
          video_performance_url?: string | null
          nivel_dificuldade?: number | null
          popularidade?: number
          tags?: string[] | null
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
          duracao_minutos?: number | null
          instrumentacao?: string[] | null
          tonalidade?: string | null
          opus_numero?: string | null
          descricao?: string | null
          contexto_criacao?: string | null
          estrutura_formal?: Json | null
          analise_musical?: string | null
          significado_historico?: string | null
          audio_url?: string | null
          partitura_url?: string | null
          video_performance_url?: string | null
          nivel_dificuldade?: number | null
          popularidade?: number
          tags?: string[] | null
          ativo?: boolean
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "historia_obras_compositor_id_fkey"
            columns: ["compositor_id"]
            referencedRelation: "historia_compositores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "historia_obras_periodo_id_fkey"
            columns: ["periodo_id"]
            referencedRelation: "historia_periodos"
            referencedColumns: ["id"]
          }
        ]
      }

      historia_eventos_timeline: {
        Row: {
          id: string
          ano: number
          mes: number | null
          dia: number | null
          titulo: string
          tipo_evento: string | null
          categoria: string | null
          descricao: string | null
          compositor_id: string | null
          obra_id: string | null
          periodo_id: string | null
          imagem_url: string | null
          importancia: number
          ativo: boolean
          created_at: string
        }
        Insert: {
          id?: string
          ano: number
          mes?: number | null
          dia?: number | null
          titulo: string
          tipo_evento?: string | null
          categoria?: string | null
          descricao?: string | null
          compositor_id?: string | null
          obra_id?: string | null
          periodo_id?: string | null
          imagem_url?: string | null
          importancia?: number
          ativo?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          ano?: number
          mes?: number | null
          dia?: number | null
          titulo?: string
          tipo_evento?: string | null
          categoria?: string | null
          descricao?: string | null
          compositor_id?: string | null
          obra_id?: string | null
          periodo_id?: string | null
          imagem_url?: string | null
          importancia?: number
          ativo?: boolean
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "historia_eventos_timeline_compositor_id_fkey"
            columns: ["compositor_id"]
            referencedRelation: "historia_compositores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "historia_eventos_timeline_obra_id_fkey"
            columns: ["obra_id"]
            referencedRelation: "historia_obras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "historia_eventos_timeline_periodo_id_fkey"
            columns: ["periodo_id"]
            referencedRelation: "historia_periodos"
            referencedColumns: ["id"]
          }
        ]
      }
    }

    // ===========================================
    // 👁️ VIEWS DO SISTEMA
    // ===========================================
    Views: {
      view_dashboard_aluno: {
        Row: {
          user_id: string | null
          nome: string | null
          total_conquistas: number | null
          total_pontos: number | null
          nivel_atual: string | null
          progresso_geral: number | null
          ultima_atividade: string | null
          desafios_pendentes: number | null
          portfolios_ativos: number | null
        }
        Relationships: []
      }
      
      view_dashboard_professor: {
        Row: {
          professor_id: string | null
          nome: string | null
          total_turmas: number | null
          total_alunos: number | null
          aulas_ministradas: number | null
          proxima_aula: string | null
        }
        Relationships: []
      }
      
      view_rankings_global: {
        Row: {
          user_id: string | null
          nome: string | null
          pontos_totais: number | null
          posicao: number | null
          categoria: string | null
        }
        Relationships: []
      }
      
      view_estatisticas_sistema: {
        Row: {
          total_usuarios: number | null
          usuarios_ativos: number | null
          total_conquistas_desbloqueadas: number | null
          total_portfolios: number | null
          total_desafios_completados: number | null
        }
        Relationships: []
      }
    }

    Functions: {
      // Funções do banco conforme documento
      calculate_user_level: {
        Args: {
          user_points: number
        }
        Returns: string
      }
      
      get_user_progress: {
        Args: {
          user_id: string
        }
        Returns: Json
      }
      
      award_achievement: {
        Args: {
          user_id: string
          achievement_id: string
        }
        Returns: boolean
      }
    }

    Enums: {
      user_type: "aluno" | "professor" | "pastor" | "admin"
      achievement_rarity: "comum" | "raro" | "epico" | "lendario"
      desafio_nivel: "facil" | "medio" | "dificil"
      portfolio_status: "rascunho" | "submetido" | "em_avaliacao" | "avaliado"
      notification_type: "info" | "sucesso" | "aviso" | "erro"
    }

    CompositeTypes: {
      [_ in never]: never
    }
  }
}
