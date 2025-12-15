// 🎓 SERVIÇO DE TURMAS - NIPO SCHOOL  
// ================================================
// Service para gestão completa de turmas e matrículas
import { supabase } from '@/lib/supabase/client';
import { CommonErrors } from '@/lib/constants/errors';
export class TurmasService {
    // 📋 LISTAR TODAS AS TURMAS ATIVAS
    // =========================================
    static async getAllTurmas() {
        try {
            const { data, error } = await supabase
                .from('turmas')
                .select('*')
                .eq('ativo', true)
                .order('nome', { ascending: true });
            if (error)
                throw new Error(`Erro ao buscar turmas: ${error.message}`);
            return data || [];
        }
        catch (error) {
            console.error('Erro no getAllTurmas:', error);
            throw CommonErrors.NETWORK_ERROR;
        }
    }
    // 🔍 BUSCAR TURMA POR ID
    // =========================================
    static async getTurmaById(id) {
        try {
            const { data, error } = await supabase
                .from('turmas')
                .select('*')
                .eq('id', id)
                .single();
            if (error) {
                if (error.code === 'PGRST116')
                    return null; // Não encontrado
                throw new Error(`Erro ao buscar turma: ${error.message}`);
            }
            return data;
        }
        catch (error) {
            console.error('Erro no getTurmaById:', error);
            throw error instanceof Error ? error : CommonErrors.NETWORK_ERROR;
        }
    }
    // 👨‍🏫 BUSCAR TURMAS DO PROFESSOR
    // =========================================
    static async getTurmasProfessor(professorId) {
        try {
            const { data, error } = await supabase
                .from('turmas')
                .select('*')
                .eq('professor_id', professorId)
                .eq('ativo', true)
                .order('nome', { ascending: true });
            if (error)
                throw new Error(`Erro ao buscar turmas do professor: ${error.message}`);
            return data || [];
        }
        catch (error) {
            console.error('Erro no getTurmasProfessor:', error);
            throw CommonErrors.NETWORK_ERROR;
        }
    }
    // 🎯 CRIAR NOVA TURMA (versão simplificada)
    // =========================================
    static async criarTurma(data) {
        try {
            const turmaData = {
                nome: data.nome,
                descricao: data.descricao,
                professor_id: data.professor_id,
                data_inicio: data.data_inicio,
                data_fim: data.data_fim,
                ativo: true,
                created_at: new Date().toISOString()
            };
            const { data: result, error } = await supabase
                .from('turmas')
                .insert(turmaData)
                .select()
                .single();
            if (error)
                throw new Error(`Erro ao criar turma: ${error.message}`);
            return result;
        }
        catch (error) {
            console.error('Erro no criarTurma:', error);
            throw error instanceof Error ? error : CommonErrors.VALIDATION_ERROR;
        }
    }
    // ✏️ ATUALIZAR TURMA
    // =========================================
    static async atualizarTurma(id, updates) {
        try {
            const { data, error } = await supabase
                .from('turmas')
                .update(updates)
                .eq('id', id)
                .select()
                .single();
            if (error)
                throw new Error(`Erro ao atualizar turma: ${error.message}`);
            return data;
        }
        catch (error) {
            console.error('Erro no atualizarTurma:', error);
            throw error instanceof Error ? error : CommonErrors.VALIDATION_ERROR;
        }
    }
    // 👥 MATRICULAR ALUNO NA TURMA (versão simplificada)
    // =========================================
    static async matricularAluno(turmaId, alunoId) {
        try {
            // Verificar se aluno já está matriculado
            const { data: existeMatricula } = await supabase
                .from('turma_alunos')
                .select('id')
                .eq('turma_id', turmaId)
                .eq('aluno_id', alunoId)
                .eq('status', 'ativo')
                .single();
            if (existeMatricula) {
                throw new Error('Aluno já matriculado nesta turma');
            }
            // Criar matrícula
            const matriculaData = {
                turma_id: turmaId,
                aluno_id: alunoId,
                data_ingresso: new Date().toISOString(),
                status: 'ativo'
            };
            const { data: matricula, error: matriculaError } = await supabase
                .from('turma_alunos')
                .insert(matriculaData)
                .select()
                .single();
            if (matriculaError)
                throw new Error(`Erro ao matricular: ${matriculaError.message}`);
            return matricula;
        }
        catch (error) {
            console.error('Erro no matricularAluno:', error);
            throw error instanceof Error ? error : CommonErrors.VALIDATION_ERROR;
        }
    }
    // 👋 DESMATRICULAR ALUNO (versão simplificada)
    // =========================================
    static async desmatricularAluno(turmaId, alunoId) {
        try {
            // Alterar status para inativo
            const { error } = await supabase
                .from('turma_alunos')
                .update({ status: 'inativo' })
                .eq('turma_id', turmaId)
                .eq('aluno_id', alunoId);
            if (error)
                throw new Error(`Erro ao desmatricular: ${error.message}`);
        }
        catch (error) {
            console.error('Erro no desmatricularAluno:', error);
            throw error instanceof Error ? error : CommonErrors.VALIDATION_ERROR;
        }
    }
    // 📊 LISTAR ALUNOS DA TURMA (versão básica)
    // =========================================
    static async getAlunosTurma(turmaId) {
        try {
            const { data, error } = await supabase
                .from('turma_alunos')
                .select('*')
                .eq('turma_id', turmaId)
                .eq('status', 'ativo')
                .order('data_ingresso', { ascending: true });
            if (error)
                throw new Error(`Erro ao buscar alunos: ${error.message}`);
            return data || [];
        }
        catch (error) {
            console.error('Erro no getAlunosTurma:', error);
            throw CommonErrors.NETWORK_ERROR;
        }
    }
    // 🎒 BUSCAR TURMAS DO ALUNO (versão básica)
    // =========================================
    static async getTurmasAluno(alunoId) {
        try {
            const { data, error } = await supabase
                .from('turma_alunos')
                .select('*')
                .eq('aluno_id', alunoId)
                .eq('status', 'ativo')
                .order('data_ingresso', { ascending: false });
            if (error)
                throw new Error(`Erro ao buscar turmas do aluno: ${error.message}`);
            return data || [];
        }
        catch (error) {
            console.error('Erro no getTurmasAluno:', error);
            throw CommonErrors.NETWORK_ERROR;
        }
    }
    // 📈 ATUALIZAR STATUS DA MATRÍCULA
    // =========================================
    static async atualizarStatusMatricula(turmaId, alunoId, novoStatus) {
        try {
            const { data, error } = await supabase
                .from('turma_alunos')
                .update({ status: novoStatus })
                .eq('turma_id', turmaId)
                .eq('aluno_id', alunoId)
                .select()
                .single();
            if (error)
                throw new Error(`Erro ao atualizar status: ${error.message}`);
            return data;
        }
        catch (error) {
            console.error('Erro no atualizarStatusMatricula:', error);
            throw error instanceof Error ? error : CommonErrors.VALIDATION_ERROR;
        }
    }
    // 📊 ESTATÍSTICAS BÁSICAS
    // =========================================
    static async getEstatisticasBasicas() {
        try {
            const { count: totalTurmas } = await supabase
                .from('turmas')
                .select('*', { count: 'exact', head: true })
                .eq('ativo', true);
            const { count: totalMatriculas } = await supabase
                .from('turma_alunos')
                .select('*', { count: 'exact', head: true })
                .eq('status', 'ativo');
            return {
                totalTurmas: totalTurmas || 0,
                totalMatriculas: totalMatriculas || 0
            };
        }
        catch (error) {
            console.error('Erro no getEstatisticasBasicas:', error);
            throw CommonErrors.NETWORK_ERROR;
        }
    }
}
