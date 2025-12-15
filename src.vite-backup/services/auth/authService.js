/**
 * 🔐 AUTH SERVICE - NIPO SCHOOL
 *
 * Service de autenticação conforme documento backend
 * Gerencia login, registro, perfis e sessões
 */
import { supabase } from '../../lib/supabase/client';
export class AuthService {
    // ===========================================
    // 🔑 AUTENTICAÇÃO BÁSICA
    // ===========================================
    /**
     * Login com email e senha
     */
    async signIn(email, password) {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });
            if (error)
                throw error;
            return { user: data.user, session: data.session, error: null };
        }
        catch (error) {
            console.error('Erro no login:', error);
            return { user: null, session: null, error: error.message };
        }
    }
    /**
     * Registro de novo usuário
     */
    async signUp(email, password, fullName, userType) {
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                        tipo_usuario: userType
                    }
                }
            });
            if (error)
                throw error;
            // Criar perfil inicial
            if (data.user) {
                await this.createInitialProfile(data.user.id, {
                    email,
                    full_name: fullName,
                    nome: fullName,
                    tipo_usuario: userType,
                    is_active: true,
                    points: 0,
                    user_level: 'beginner'
                });
            }
            return { user: data.user, session: data.session, error: null };
        }
        catch (error) {
            console.error('Erro no registro:', error);
            return { user: null, session: null, error: error.message };
        }
    }
    /**
     * Logout
     */
    async signOut() {
        try {
            const { error } = await supabase.auth.signOut();
            if (error)
                throw error;
            return { error: null };
        }
        catch (error) {
            console.error('Erro no logout:', error);
            return { error: error.message };
        }
    }
    /**
     * Reset de senha
     */
    async resetPassword(email) {
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/auth/reset-password`
            });
            if (error)
                throw error;
            return { error: null };
        }
        catch (error) {
            console.error('Erro no reset de senha:', error);
            return { error: error.message };
        }
    }
    // ===========================================
    // 👤 GERENCIAMENTO DE PERFIS
    // ===========================================
    /**
     * Criar perfil inicial
     */
    async createInitialProfile(userId, profileData) {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .insert({
                id: userId,
                ...profileData,
                created_at: new Date().toISOString()
            })
                .select()
                .single();
            if (error)
                throw error;
            return data;
        }
        catch (error) {
            console.error('Erro ao criar perfil:', error);
            throw error;
        }
    }
    /**
     * Buscar perfil do usuário
     */
    async getProfile(userId) {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();
            if (error)
                throw error;
            return data;
        }
        catch (error) {
            console.error('Erro ao buscar perfil:', error);
            return null;
        }
    }
    /**
     * Atualizar perfil
     */
    async updateProfile(userId, updates) {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .update({
                ...updates,
                updated_at: new Date().toISOString()
            })
                .eq('id', userId)
                .select()
                .single();
            if (error)
                throw error;
            return { data, error: null };
        }
        catch (error) {
            console.error('Erro ao atualizar perfil:', error);
            return { data: null, error: error.message };
        }
    }
    /**
     * Atualizar último login
     */
    async updateLastLogin(userId) {
        try {
            await supabase
                .from('profiles')
                .update({
                last_login: new Date().toISOString(),
                updated_at: new Date().toISOString()
            })
                .eq('id', userId);
        }
        catch (error) {
            console.error('Erro ao atualizar último login:', error);
        }
    }
    // ===========================================
    // 🔍 SESSÃO E ESTADO
    // ===========================================
    /**
     * Obter sessão atual
     */
    async getCurrentSession() {
        try {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (error)
                throw error;
            return session;
        }
        catch (error) {
            console.error('Erro ao obter sessão:', error);
            return null;
        }
    }
    /**
     * Obter usuário atual
     */
    async getCurrentUser() {
        try {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error)
                throw error;
            return user;
        }
        catch (error) {
            console.error('Erro ao obter usuário:', error);
            return null;
        }
    }
    /**
     * Verificar se está autenticado
     */
    async isAuthenticated() {
        const session = await this.getCurrentSession();
        return !!session;
    }
    // ===========================================
    // 📊 ESTATÍSTICAS E ANALYTICS
    // ===========================================
    /**
     * Registrar atividade do usuário
     */
    async logUserActivity(userId, activity, metadata) {
        try {
            // Implementar log de atividades se necessário
            console.log(`Atividade registrada: ${userId} - ${activity}`, metadata);
        }
        catch (error) {
            console.error('Erro ao registrar atividade:', error);
        }
    }
    /**
     * Obter estatísticas do usuário
     */
    async getUserStats(userId) {
        try {
            const profile = await this.getProfile(userId);
            if (!profile)
                return null;
            return {
                points: profile.points || 0,
                level: profile.user_level || 'beginner',
                achievements: profile.achievements || [],
                badges: profile.badges || [],
                lastLogin: profile.last_login,
                createdAt: profile.created_at
            };
        }
        catch (error) {
            console.error('Erro ao obter estatísticas:', error);
            return null;
        }
    }
}
// Singleton instance
export const authService = new AuthService();
export default authService;
