// src/pages/auth/SignUpPage.tsx
// Página de cadastro completa

import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../../contexts/AuthContext';
import { ROUTES } from '../../../../lib/constants/routes';
import { NipoCard, NipoCardBody } from '../../../../components/shared/NipoCard';
import { NipoButton } from '../../../../components/shared/NipoButton';
import { NipoInput } from '../../../../components/shared/NipoInput';
import { Mail, Lock, User, UserCheck } from 'lucide-react';

export const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [userType, setUserType] = useState<'aluno' | 'professor'>('aluno');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    // Validações
    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      setLoading(false);
      return;
    }

    try {
      const result = await signUp(email, password, fullName, userType);
      
      if (result.error) {
        setError(result.error);
        setLoading(false);
        return;
      }
      
      setSuccess(true);
      
      // Aguardar 2 segundos e redirecionar para login
      setTimeout(() => {
        navigate(ROUTES.LOGIN);
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4">
      <div className="max-w-md w-full">
        <NipoCard>
          <NipoCardBody className="p-8">
            <div className="text-center mb-8">
              <div className="text-5xl mb-2">🎌</div>
              <h1 className="text-3xl font-bold text-gray-900">Nipo School</h1>
              <p className="text-gray-600 mt-2">Crie sua conta gratuita</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <NipoInput
                  label="Nome Completo"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Seu nome"
                  leftIcon={<User className="w-5 h-5" />}
                  required
                />
              </div>

              <div>
                <NipoInput
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  leftIcon={<Mail className="w-5 h-5" />}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Conta
                </label>
                <select
                  value={userType}
                  onChange={(e) => setUserType(e.target.value as 'aluno' | 'professor')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="aluno">Aluno</option>
                  <option value="professor">Professor</option>
                </select>
              </div>

              <div>
                <NipoInput
                  label="Senha"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  leftIcon={<Lock className="w-5 h-5" />}
                  required
                />
              </div>

              <div>
                <NipoInput
                  label="Confirmar Senha"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  leftIcon={<Lock className="w-5 h-5" />}
                  required
                />
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm">
                  ✅ Conta criada com sucesso! Redirecionando...
                </div>
              )}

              <NipoButton
                type="submit"
                variant="primary"
                size="lg"
                disabled={loading || success}
                className="w-full"
              >
                {loading ? 'Criando conta...' : 'Criar Conta'}
              </NipoButton>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Já tem uma conta?{' '}
                <Link
                  to={ROUTES.LOGIN}
                  className="text-indigo-600 hover:underline font-medium"
                >
                  Faça login
                </Link>
              </p>
            </div>

            <div className="mt-6 text-center">
              <Link
                to={ROUTES.HOME}
                className="text-sm text-gray-500 hover:underline"
              >
                ← Voltar para home
              </Link>
            </div>
          </NipoCardBody>
        </NipoCard>
      </div>
    </div>
  );
};
