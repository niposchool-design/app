'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/app/providers/AuthProvider'
import {
  getPlayerLevel,
  getLevelProgress,
  getNextLevel,
  GAMIFICATION_LEVELS,
} from '@/lib/gamification/levels'
import {
  Users,
  TrendingUp,
  Calendar,
  Music,
  Award,
  BookOpen,
  CheckCircle2,
  Star,
  Printer,
} from 'lucide-react'

interface StudentReport {
  profile: any
  totalPoints: number
  lessonsCompleted: number
  totalLessons: number
  attendance: { present: number; total: number }
  achievements: any[]
  recentActivities: any[]
  practiceStreak: number
  practiceSessions: number
}

export default function FamilyReportPage() {
  const { user } = useAuth()
  const [report, setReport] = useState<StudentReport | null>(null)
  const [loading, setLoading] = useState(true)
  const [studentId, setStudentId] = useState<string | null>(null)

  useEffect(() => {
    if (!user?.id) return
    setStudentId(user.id)
  }, [user])

  useEffect(() => {
    if (!studentId) return

    async function loadReport() {
      setLoading(true)
      const supabase = createClient()

      // Fetch data in parallel
      const [profileRes, pointsRes, lessonsRes, attendanceRes, achievementsRes, practiceRes] =
        await Promise.all([
          supabase
            .from('profiles')
            .select('full_name, avatar_url, email, created_at')
            .eq('id', studentId)
            .single(),
          supabase
            .from('v_points_log')
            .select('points')
            .eq('user_id', studentId),
          supabase
            .from('v_lesson_completions')
            .select('id, completed_at')
            .eq('student_id', studentId),
          supabase
            .from('attendance')
            .select('is_present')
            .eq('student_id', studentId),
          supabase
            .from('v_user_achievements')
            .select('*')
            .eq('user_id', studentId)
            .eq('is_completed', true)
            .order('completed_at', { ascending: false })
            .limit(10),
          supabase
            .from('practice_sessions')
            .select('id, duration_minutes, created_at')
            .eq('user_id', studentId)
            .order('created_at', { ascending: false })
            .limit(30),
        ])

      const totalPoints = (pointsRes.data || []).reduce(
        (sum: number, p: any) => sum + (p.points || 0),
        0
      )

      const attendanceData = attendanceRes.data || []
      const presentCount = attendanceData.filter((a: any) => a.is_present).length

      setReport({
        profile: profileRes.data,
        totalPoints,
        lessonsCompleted: lessonsRes.data?.length || 0,
        totalLessons: 69, // Total modules across 2 years
        attendance: { present: presentCount, total: attendanceData.length },
        achievements: achievementsRes.data || [],
        recentActivities: [],
        practiceStreak: 0, // Calculated from practice data
        practiceSessions: practiceRes.data?.length || 0,
      })

      setLoading(false)
    }

    loadReport()
  }, [studentId])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-3 border-gray-200 border-t-gray-600 rounded-full animate-spin mx-auto" />
          <p className="text-sm text-gray-500">Gerando relatório...</p>
        </div>
      </div>
    )
  }

  if (!report) {
    return (
      <div className="text-center py-16 text-gray-500">
        Não foi possível carregar os dados do aluno.
      </div>
    )
  }

  const level = getPlayerLevel(report.totalPoints)
  const progress = getLevelProgress(report.totalPoints)
  const nextLevel = getNextLevel(report.totalPoints)
  const attendanceRate =
    report.attendance.total > 0
      ? Math.round((report.attendance.present / report.attendance.total) * 100)
      : 0
  const lessonProgress = Math.round((report.lessonsCompleted / report.totalLessons) * 100)

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Users className="w-6 h-6 text-gray-700" />
            Relatório para a Família
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Acompanhamento do progresso do aluno
          </p>
        </div>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-gray-800 transition-colors print:hidden"
        >
          <Printer className="w-4 h-4" />
          Imprimir
        </button>
      </div>

      {/* Student Card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${level.gradient} flex items-center justify-center shadow-lg`}>
            <span className="text-3xl">{level.emoji}</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {report.profile?.full_name || 'Aluno'}
            </h2>
            <p className="text-sm text-gray-500">
              {level.kanji} — Nível {level.level}: {level.name}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {report.totalPoints.toLocaleString('pt-BR')} pontos totais
            </p>
          </div>
        </div>

        {/* Level Progress */}
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-xs text-gray-500">
            <span>{level.name}</span>
            <span>{nextLevel ? nextLevel.name : 'Nível máximo!'}</span>
          </div>
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${level.gradient} transition-all`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard
          icon={<BookOpen className="w-5 h-5 text-blue-600" />}
          label="Aulas Concluídas"
          value={`${report.lessonsCompleted}`}
          detail={`${lessonProgress}% do curso`}
          color="blue"
        />
        <StatCard
          icon={<Calendar className="w-5 h-5 text-green-600" />}
          label="Frequência"
          value={`${attendanceRate}%`}
          detail={`${report.attendance.present}/${report.attendance.total} aulas`}
          color="green"
        />
        <StatCard
          icon={<Award className="w-5 h-5 text-amber-600" />}
          label="Conquistas"
          value={`${report.achievements.length}`}
          detail="badges ganhos"
          color="amber"
        />
        <StatCard
          icon={<Music className="w-5 h-5 text-purple-600" />}
          label="Práticas"
          value={`${report.practiceSessions}`}
          detail="sessões registradas"
          color="purple"
        />
      </div>

      {/* Achievements */}
      {report.achievements.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500" />
            Conquistas Recentes
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {report.achievements.slice(0, 6).map((a: any) => (
              <div
                key={a.id || a.achievement_id}
                className="flex items-center gap-2 p-3 rounded-xl bg-amber-50 border border-amber-100"
              >
                <span className="text-xl">{a.badge_icon || '🏆'}</span>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">
                    {a.name || a.title}
                  </p>
                  <p className="text-[10px] text-gray-500">
                    +{a.points_reward || 0} pts
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Level Roadmap */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-500" />
          Jornada Musical
        </h3>
        <div className="space-y-3">
          {GAMIFICATION_LEVELS.map(l => {
            const isCompleted = report.totalPoints >= l.maxPoints
            const isCurrent = l.level === level.level
            return (
              <div
                key={l.level}
                className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                  isCurrent
                    ? 'bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200'
                    : isCompleted
                    ? 'bg-green-50/50'
                    : 'opacity-50'
                }`}
              >
                <span className="text-xl w-8 text-center">{l.emoji}</span>
                <div className="flex-1">
                  <p className={`text-sm font-bold ${isCurrent ? 'text-gray-900' : 'text-gray-600'}`}>
                    {l.name}
                  </p>
                  <p className="text-[10px] text-gray-400">
                    {l.kanji} — {l.meaning} • {l.minPoints.toLocaleString('pt-BR')}+ pts
                  </p>
                </div>
                {isCompleted && <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />}
                {isCurrent && (
                  <div className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full flex-shrink-0">
                    ATUAL
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Print Footer */}
      <div className="text-center text-xs text-gray-400 py-4 print:block hidden">
        Relatório gerado em{' '}
        {new Date().toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        })}{' '}
        — Nipo School
      </div>
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
  detail,
  color: _color,
}: {
  icon: React.ReactNode
  label: string
  value: string
  detail: string
  color: string
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-2">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-xs text-gray-500 font-medium">{label}</span>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-400">{detail}</p>
    </div>
  )
}
