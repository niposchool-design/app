/**
 * Area Guard - Protege áreas inteiras baseado no role do usuário
 */

import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import type { UserRole } from '../lib/constants';

interface AreaGuardProps {
  allowedRole: UserRole;
}

export function AreaGuard({ allowedRole }: AreaGuardProps) {
  const { user, profile, loading } = useAuth();
  // Usar user.role como fonte primária (já vem do profile no AuthContext)
  const role = user?.role || (profile?.tipo_usuario as UserRole | null);

  console.log('🛡️ AreaGuard DETALHADO:', {
    allowedRole,
    currentRole: role,
    hasUser: !!user,
    loading,
    profile: profile,
    user: user,
    profileTipoUsuario: profile?.tipo_usuario,
    userRole: user?.role,
    roleUsado: role,
  });

  // Aguardar carregamento
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verificando permissões...</p>
        </div>
      </div>
    );
  }

  // Não autenticado
  if (!user) {
    console.warn('⚠️ AreaGuard: Usuário não autenticado, redirecionando para login');
    return <Navigate to="/login" replace />;
  }

  // Role não corresponde
  if (role !== allowedRole) {
    console.warn('⚠️ AreaGuard: Role não permitida', {
      required: allowedRole,
      current: role,
    });

    // Redirecionar para a área correta
    const correctPath = {
      admin: '/admin/dashboard',
      professor: '/professores/dashboard',
      aluno: '/alunos/dashboard',
    }[role || 'aluno'];

    return <Navigate to={correctPath} replace />;
  }

  console.log('✅ AreaGuard: Acesso permitido para área:', allowedRole);

  // Renderizar rotas filhas
  return <Outlet />;
}

export default AreaGuard;
