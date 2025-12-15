'use client';

import AdminDashboardClient from './_components/AdminDashboardClient';
import { useEffect, useState } from 'react';
import { AdminStats, ActivityItem } from '@/src/lib/supabase/queries/dashboard';

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [activityLogs, setActivityLogs] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [statsRes, activityRes] = await Promise.all([
          fetch('/api/admin/stats'),
          fetch('/api/admin/activity')
        ]);
        
        const statsData = await statsRes.json();
        const activityData = await activityRes.json();
        
        setStats(statsData);
        setActivityLogs(activityData);
      } catch (error) {
        console.error('Erro ao carregar dashboard:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading || !stats) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-slate-600">Carregando dashboard...</p>
      </div>
    );
  }

  return <AdminDashboardClient stats={stats} activityLogs={activityLogs} />;
}
