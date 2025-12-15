// src/lib/supabase/queries/turmas.ts
import { supabase } from '../client';
export const turmasQueries = {
    // Buscar todas as turmas
    getAll: async () => {
        const { data, error } = await supabase
            .from('turmas')
            .select(`
        *,
        professor:professores(
          id,
          nome,
          usuario:usuarios(email)
        )
      `)
            .order('created_at', { ascending: false });
        if (error)
            throw error;
        return data;
    },
    // Buscar turmas do professor
    getByProfessor: async (professorId) => {
        const { data, error } = await supabase
            .from('turmas')
            .select(`
        *,
        matriculas(count),
        professor:professores(
          id,
          nome
        )
      `)
            .eq('professor_id', professorId)
            .order('created_at', { ascending: false });
        if (error)
            throw error;
        return data;
    },
    // Buscar turma específica com alunos
    getById: async (turmaId) => {
        const { data, error } = await supabase
            .from('turmas')
            .select(`
        *,
        professor:professores(
          id,
          nome,
          usuario:usuarios(email)
        ),
        matriculas(
          id,
          status,
          aluno:alunos(
            id,
            usuario:usuarios(
              id,
              nome,
              email
            )
          )
        )
      `)
            .eq('id', turmaId)
            .single();
        if (error)
            throw error;
        return data;
    },
    // Criar turma
    create: async (turmaData) => {
        const { data, error } = await supabase
            .from('turmas')
            .insert(turmaData)
            .select()
            .single();
        if (error)
            throw error;
        return data;
    },
    // Atualizar turma
    update: async (turmaId, updates) => {
        const { data, error } = await supabase
            .from('turmas')
            .update(updates)
            .eq('id', turmaId)
            .select()
            .single();
        if (error)
            throw error;
        return data;
    },
    // Excluir turma
    delete: async (turmaId) => {
        const { error } = await supabase
            .from('turmas')
            .delete()
            .eq('id', turmaId);
        if (error)
            throw error;
    },
    // Turmas que o aluno está matriculado
    getByAluno: async (alunoId) => {
        const { data, error } = await supabase
            .from('turmas')
            .select(`
        *,
        professor:professores(
          id,
          nome
        ),
        matriculas!inner(
          id,
          status
        )
      `)
            .eq('matriculas.aluno_id', alunoId)
            .eq('matriculas.status', 'ativa')
            .order('created_at', { ascending: false });
        if (error)
            throw error;
        return data;
    },
};
