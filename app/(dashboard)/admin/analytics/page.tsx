import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { cn } from '@/lib/utils'
import { fetchAllStudentProgress, deduplicateStudents, detectLevel } from '@/lib/cc-explorer'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Analytics — Admin' }
export const dynamic = 'force-dynamic'

export default async function AnalyticsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  if (user.user_metadata?.role !== 'admin' && process.env.NODE_ENV !== 'development') redirect('/student')

  const [
    { count: presentCount },
    { count: totalAttendance },
    { count: submittedCount },
    { count: pendingCount },
    { data: topStudents },
    rawCCStudents,
  ] = await Promise.all([
    supabase.from('attendance').select('*', { count: 'exact', head: true }).eq('status', 'present'),
    supabase.from('attendance').select('*', { count: 'exact', head: true }),
    supabase.from('submissions').select('*', { count: 'exact', head: true }).neq('status', 'pending'),
    supabase.from('submissions').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('students')
      .select('current_rating, joining_rating, profile:profiles!students_user_id_fkey(full_name)')
      .eq('is_active', true)
      .order('current_rating', { ascending: false })
      .limit(5),
    fetchAllStudentProgress().catch(() => [] as Awaited<ReturnType<typeof fetchAllStudentProgress>>),
  ])

  // Deduplicate: one row per player, highest total_points wins
  const ccStudents = deduplicateStudents(rawCCStudents)
  const totalStudents = ccStudents.length

  const attendancePct = totalAttendance ? Math.round(((presentCount ?? 0) / totalAttendance) * 100) : 0
  const completionPct = (submittedCount ?? 0) + (pendingCount ?? 0) > 0
    ? Math.round(((submittedCount ?? 0) / ((submittedCount ?? 0) + (pendingCount ?? 0))) * 100)
    : 0

  // Level distribution from CC data
  const levelCounts: Record<string, number> = {}
  for (const s of ccStudents) {
    const lv = detectLevel(s.league_name)
    levelCounts[lv] = (levelCounts[lv] ?? 0) + 1
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Academy Analytics</h1>
        <p className="text-sm text-gray-500 mt-0.5">Performance metrics across CircleChess</p>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Students',       value: `${totalStudents}`,       sub: 'active',         icon: '👥', color: 'text-primary' },
          { label: 'Attendance Rate',       value: `${attendancePct}%`,      sub: 'overall',        icon: '📅', color: 'text-green-600' },
          { label: 'Assignment Completion', value: `${completionPct}%`,      sub: 'submitted',      icon: '📋', color: 'text-blue-600' },
          { label: 'Pending Reviews',       value: `${pendingCount ?? 0}`,   sub: 'need grading',   icon: '⏳', color: 'text-amber-500' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-2xl mb-2">{s.icon}</p>
            <p className={cn('text-3xl font-bold', s.color)}>{s.value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{s.sub}</p>
            <p className="text-sm text-gray-600 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Level distribution */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-gray-900 mb-1">Student Level Distribution</h2>
          <p className="text-xs text-gray-400 mb-4">{totalStudents} unique active students</p>
          <div className="space-y-3">
            {[
              { level: 'Foundation 1', color: 'bg-sky-400',     textColor: 'text-sky-700',     bg: 'bg-sky-50' },
              { level: 'Foundation 2', color: 'bg-blue-400',    textColor: 'text-blue-700',    bg: 'bg-blue-50' },
              { level: 'Foundation 3', color: 'bg-indigo-400',  textColor: 'text-indigo-700',  bg: 'bg-indigo-50' },
              { level: 'Foundation 4', color: 'bg-violet-400',  textColor: 'text-violet-700',  bg: 'bg-violet-50' },
              { level: 'Beginner',     color: 'bg-emerald-400', textColor: 'text-emerald-700', bg: 'bg-emerald-50' },
              { level: 'Intermediate', color: 'bg-amber-400',   textColor: 'text-amber-700',   bg: 'bg-amber-50' },
              { level: 'Advanced',     color: 'bg-rose-400',    textColor: 'text-rose-700',    bg: 'bg-rose-50' },
            ].map(({ level, color, textColor, bg }) => {
              const count = levelCounts[level] ?? 0
              const pct = totalStudents ? Math.round((count / totalStudents) * 100) : 0
              return (
                <div key={level}>
                  <div className="flex justify-between items-center mb-1">
                    <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full', bg, textColor)}>
                      {level}
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      {count} <span className="text-gray-400 font-normal text-xs">({pct}%)</span>
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={cn('h-full rounded-full transition-all', color)} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Top students by rating */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-gray-900 mb-4">Top Students by Rating</h2>
          <div className="space-y-3">
            {topStudents?.map((s, i) => {
              const diff = s.current_rating - s.joining_rating
              return (
                <div key={i} className="flex items-center gap-3">
                  <div className={cn(
                    'w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0',
                    i === 0 ? 'bg-amber-100 text-amber-600' :
                    i === 1 ? 'bg-gray-100 text-gray-600' :
                    i === 2 ? 'bg-orange-100 text-orange-600' :
                    'bg-gray-50 text-gray-400'
                  )}>
                    {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}`}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{(s as any).profile?.full_name}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-gray-900">{s.current_rating}</p>
                    <p className={cn('text-xs font-medium', diff >= 0 ? 'text-green-600' : 'text-red-500')}>
                      +{diff}
                    </p>
                  </div>
                </div>
              )
            })}
            {!topStudents?.length && (
              <p className="text-center py-6 text-sm text-gray-400">No student data yet</p>
            )}
          </div>
        </div>
      </div>

      {/* CircleChess Student Progress Data */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="font-bold text-gray-900">Student Progress Data</h2>
            <p className="text-xs text-gray-400 mt-0.5">{ccStudents.length} unique active students · {rawCCStudents.length} total enrolments · live from CircleChess</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Student</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">League</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Class</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Rating</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Total Pts</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">30d Pts</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">W / L</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Win%</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Sessions</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Sub Ends</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {ccStudents.map((s, i) => {
                const endDate = s.subscription_end_date ? new Date(s.subscription_end_date) : null
                const daysLeft = endDate ? Math.ceil((endDate.getTime() - Date.now()) / 86400000) : null
                return (
                  <tr key={`${s.player_id}-${i}`} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900 whitespace-nowrap">{s.student_name}</p>
                      <p className="text-xs text-gray-400">#{s.player_id}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{s.league_name ?? '—'}</td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{s.class_name ?? '—'}</td>
                    <td className="px-4 py-3 text-right font-bold text-amber-500">{s.rating ?? '—'}</td>
                    <td className="px-4 py-3 text-right font-semibold text-gray-900">{Number(s.total_points).toFixed(0)}</td>
                    <td className="px-4 py-3 text-right font-semibold text-green-600">{Number(s.last_30_days_points).toFixed(0)}</td>
                    <td className="px-4 py-3 text-right text-gray-700">
                      <span className="text-green-600">{s.wins}</span>
                      <span className="text-gray-300 mx-1">/</span>
                      <span className="text-red-500">{s.losses}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={cn(
                        'font-semibold',
                        Number(s.win_percentage) >= 60 ? 'text-green-600' :
                        Number(s.win_percentage) >= 40 ? 'text-amber-500' : 'text-gray-400'
                      )}>
                        {s.matches_played > 0 ? `${s.win_percentage}%` : '—'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-gray-700">{s.total_sessions || '—'}</td>
                    <td className="px-4 py-3 text-center">
                      {endDate ? (
                        <span className={cn(
                          'text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap',
                          daysLeft !== null && daysLeft <= 14
                            ? 'bg-red-100 text-red-600'
                            : daysLeft !== null && daysLeft <= 30
                            ? 'bg-amber-100 text-amber-600'
                            : 'bg-green-100 text-green-700'
                        )}>
                          {endDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' })}
                        </span>
                      ) : '—'}
                    </td>
                  </tr>
                )
              })}
              {ccStudents.length === 0 && (
                <tr>
                  <td colSpan={10} className="px-6 py-10 text-center text-sm text-gray-400">
                    No student progress data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
