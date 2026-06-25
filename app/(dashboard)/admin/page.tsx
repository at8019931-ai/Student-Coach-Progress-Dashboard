import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { fetchCoachStudentData, groupByCoach, fetchAllStudentProgress, deduplicateStudents } from '@/lib/cc-explorer'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Admin Dashboard' }
export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const role = user.user_metadata?.role
  if (role !== 'admin' && process.env.NODE_ENV !== 'development') redirect(`/${role ?? 'student'}`)

  // CC data + Supabase in parallel
  const [
    { count: pendingSubmissions },
    { count: activeClasses },
    rawCCStudents,
    coachStudentData,
  ] = await Promise.all([
    supabase.from('submissions').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('classes').select('*', { count: 'exact', head: true }).eq('status', 'scheduled'),
    fetchAllStudentProgress().catch(() => []),
    fetchCoachStudentData().catch(() => []),
  ])

  const ccStudents = deduplicateStudents(rawCCStudents)
  const coaches = groupByCoach(coachStudentData)

  const stats = [
    { label: 'Total Students', value: ccStudents.length,   icon: '👥', color: 'text-primary',     href: '/admin/analytics' },
    { label: 'Total Coaches',  value: coaches.length,      icon: '🏅', color: 'text-blue-600',    href: '/coach' },
    { label: 'Active Classes', value: activeClasses ?? 0,  icon: '📅', color: 'text-green-600',   href: '/admin/classes' },
    { label: 'Pending Reviews',value: pendingSubmissions ?? 0, icon: '📋', color: 'text-amber-500', href: '/admin/analytics' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-sm text-gray-500 mt-0.5">CircleChess Academy Overview</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(s => (
          <Link key={s.label} href={s.href}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition group">
            <p className="text-2xl mb-2">{s.icon}</p>
            <p className={cn('text-3xl font-bold', s.color)}>{s.value}</p>
            <p className="text-sm text-gray-500 mt-1 group-hover:text-gray-700 transition">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent students from CC data */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-900">Recent Students</h2>
            <Link href="/admin/analytics" className="text-sm text-primary hover:underline">View all →</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {ccStudents.slice(0, 6).map(s => (
              <div key={s.player_id} className="flex items-center gap-3 px-6 py-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary shrink-0">
                  {s.student_name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{s.student_name}</p>
                  <p className="text-xs text-gray-400">{s.league_name ?? '—'}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-gray-700">{s.rating ?? '—'}</p>
                  <p className="text-xs text-gray-400">{Number(s.total_points).toFixed(0)} pts</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coaches from CC data */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-900">Coaches</h2>
            <Link href="/coach" className="text-sm text-primary hover:underline">View all →</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {coaches.slice(0, 8).map(c => (
              <div key={c.coach_name} className="flex items-center gap-3 px-6 py-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-600 shrink-0">
                  {c.coach_name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{c.coach_name}</p>
                  <p className="text-xs text-gray-400">{c.batch_count} batches</p>
                </div>
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full shrink-0">
                  {c.student_count} students
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Add Student',   icon: '👤', href: '/admin/users?action=add-student' },
            { label: 'Add Coach',     icon: '🏅', href: '/admin/users?action=add-coach' },
            { label: 'Schedule Class',icon: '📅', href: '/admin/classes?action=create' },
            { label: 'View Analytics',icon: '📊', href: '/admin/analytics' },
          ].map(a => (
            <Link
              key={a.label}
              href={a.href}
              className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-xl hover:bg-primary/5 hover:border-primary/20 border border-gray-100 transition text-center"
            >
              <span className="text-2xl">{a.icon}</span>
              <span className="text-xs font-medium text-gray-700">{a.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
