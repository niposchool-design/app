'use client';

import { useEffect, useState } from 'react';
import { Trophy, Plus } from 'lucide-react';
import Link from 'next/link';
import AdminPageLayout from '../_components/AdminPageLayout';
import { GamificacaoClient } from './_components/GamificacaoClient';

export default function AdminGamificacaoPage() {
    const [niveis, setNiveis] = useState([]);
    const [conquistas, setConquistas] = useState([]);
    const [desafios, setDesafios] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const [niveisRes, conquistasRes, desafiosRes] = await Promise.all([
                    fetch('/api/gamificacao/niveis'),
                    fetch('/api/gamificacao/conquistas'),
                    fetch('/api/gamificacao/desafios')
                ]);
                
                setNiveis(await niveisRes.json());
                setConquistas(await conquistasRes.json());
                setDesafios(await desafiosRes.json());
            } catch (error) {
                console.error('Erro ao carregar gamificação:', error);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    if (loading) {
        return (
            <AdminPageLayout title="Sistema de Gamificação" icon={Trophy}>
                <div className="admin-card p-8 text-center">
                    <p className="text-slate-600">Carregando...</p>
                </div>
            </AdminPageLayout>
        );
    }

    return (
        <AdminPageLayout
            title="Sistema de Gamificação"
            subtitle="Gerencie badges, desafios, rankings e sistema de níveis"
            icon={Trophy}
            badge={`${conquistas.length} conquistas`}
            actions={
                <Link href="/admin/gamificacao/nova-conquista" className="admin-btn-primary flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Nova Conquista
                </Link>
            }
        >
            <GamificacaoClient
                niveis={niveis}
                conquistas={conquistas}
                desafios={desafios}
            />
        </AdminPageLayout>
    );
}
