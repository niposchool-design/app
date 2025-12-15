'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronLeft, Mail, User, Phone, Save, CheckCircle, AlertCircle, Loader2, Send } from 'lucide-react';
import Link from 'next/link';

export function ProfessorInviteForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState<'form' | 'success'>('form');
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate server delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // TODO: Integrate with real Supabase Admin Invite logic here
        // await inviteUserByEmail(formData.email, 'professor');

        console.log('Inviting professor:', formData);

        setLoading(false);
        setStep('success');
    };

    if (step === 'success') {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl mx-auto bg-white rounded-3xl p-12 text-center shadow-xl border border-gray-100"
            >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Convite Enviado!</h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    O professor <span className="font-bold text-gray-900">{formData.fullName}</span> receberá um email no endereço <span className="font-bold text-gray-900">{formData.email}</span> com instruções para acessar a plataforma.
                </p>
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={() => {
                            setFormData({ fullName: '', email: '', phone: '' });
                            setStep('form');
                        }}
                        className="px-6 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                        Convidar Outro
                    </button>
                    <Link
                        href="/admin/professores"
                        className="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-colors shadow-lg"
                    >
                        Voltar para Lista
                    </Link>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
        >
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-8 text-white">
                    <h1 className="text-2xl font-bold flex items-center gap-3">
                        <Mail className="text-blue-400" />
                        Convidar Novo Professor
                    </h1>
                    <p className="text-gray-400 mt-2">
                        Envie um convite para um novo membro do corpo docente. Eles poderão definir sua senha no primeiro acesso.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-900 flex items-center gap-2">
                            <User size={16} className="text-gray-400" />
                            Nome Completo
                        </label>
                        <input
                            required
                            type="text"
                            placeholder="Ex: Carlos Silva"
                            value={formData.fullName}
                            onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-400 font-medium"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-900 flex items-center gap-2">
                            <Mail size={16} className="text-gray-400" />
                            Email Corporativo / Pessoal
                        </label>
                        <input
                            required
                            type="email"
                            placeholder="Ex: carlos@niposchool.com"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-400 font-medium"
                        />
                        <p className="text-xs text-gray-400 pl-1">O convite será enviado para este endereço.</p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-900 flex items-center gap-2">
                            <Phone size={16} className="text-gray-400" />
                            Telefone (Opcional)
                        </label>
                        <input
                            type="tel"
                            placeholder="Ex: (11) 99999-9999"
                            value={formData.phone}
                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-400 font-medium"
                        />
                    </div>

                    <div className="pt-6 flex gap-4">
                        <Link
                            href="/admin/professores"
                            className="flex-1 px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-colors text-center"
                        >
                            Cancelar
                        </Link>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-[2] bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                <>
                                    <Send size={18} />
                                    Enviar Convite
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-yellow-50 border border-yellow-100 flex gap-3 text-yellow-800 text-sm">
                <AlertCircle className="shrink-0 w-5 h-5" />
                <p>
                    <strong>Nota:</strong> O professor receberá permissões limitadas até completar o cadastro. VocÊ poderá atribuir turmas a ele imediatamente após o aceite do convite.
                </p>
            </div>
        </motion.div>
    );
}
