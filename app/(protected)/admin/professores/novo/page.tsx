
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { ProfessorInviteForm } from '../_components/ProfessorInviteForm';

export default function NovoProfessorPage() {
    return (
        <div className="p-6 lg:p-8 space-y-6">
            <Link
                href="/admin/professores"
                className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 transition-colors mb-4 group"
            >
                <div className="bg-white p-2 rounded-lg border border-gray-200 shadow-sm group-hover:bg-gray-50 mr-2 transition-colors">
                    <ChevronLeft className="w-4 h-4" />
                </div>
                <span className="font-medium">Voltar para Lista de Professores</span>
            </Link>

            <ProfessorInviteForm />
        </div>
    );
}
