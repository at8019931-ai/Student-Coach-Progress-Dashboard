import { fetchCoachStudentData, groupByCoach, detectLevel, fetchAllStudentProgress, deduplicateStudents } from '@/lib/cc-explorer'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Coach Dashboard' }
export const dynamic = 'force-dynamic'

const LEVEL_COLORS: Record<string, string> = {
  'Foundation 1': 'bg-sky-100 text-sky-700',
  'Foundation 2': 'bg-blue-100 text-blue-700',
  'Foundation 3': 'bg-indigo-100 text-indigo-700',
  'Foundation 4': 'bg-violet-100 text-violet-700',
  'Beginner':     'bg-emerald-100 text-emerald-700',
  'Intermediate': 'bg-amber-100 text-amber-700',
  'Advanced':     'bg-rose-100 text-rose-700',
  'Other':        'bg-gray-100 text-gray-500',
}

export default async function CoachDashboard() {
  const [rawData, rawStudents] = await Promise.all([
    fetchCoachStudentData().catch(() => []),
    fetchAllStudentProgress().catch(() => []),
  ])
  const coaches = groupByCoach(rawData)
  const totalCoaches  = coaches.length
  const totalStudents = deduplicateStudents(rawStudents).length
  const totalBatches  = new Set(rawData.map(r => r.batch_name)).size

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Coach Dashboard</h1>
        <p className="text-sm text-gray-500 mt-0.5">All coaches · live from CircleChess</p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Coaches',  value: totalCoaches,  icon: '🏅', color: 'text-blue-600' },
          { label: 'Total Students', value: totalStudents, icon: '👥', color: 'text-primary' },
          { label: 'Active Batches', value: totalBatches,  icon: '📚', color: 'text-green-600' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-2xl mb-2">{s.icon}</p>
            <p className={cn('text-3xl font-bold', s.color)}>{s.value}</p>
            <p className="text-sm text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Coach cards */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {coaches.map(coach => (
          <div key={coach.coach_name} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Coach header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-600 shrink-0">
                {coach.coach_name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900">{coach.coach_name}</p>
                <p className="text-xs text-gray-400">
                  {coach.student_count} students · {coach.batch_count} {coach.batch_count === 1 ? 'batch' : 'batches'}
                </p>
              </div>
            </div>

            {/* Batch list */}
            <div className="divide-y divide-gray-50 max-h-52 overflow-y-auto">
              {coach.batches.map(b => {
                const level = detectLevel(b.batch_name)
                return (
                  <div key={b.batch_name} className="flex items-center justify-between px-5 py-2.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={cn('text-[10px] font-semibold px-1.5 py-0.5 rounded-full shrink-0', LEVEL_COLORS[level] ?? LEVEL_COLORS['Other'])}>
                        {level.replace('Foundation', 'F')}
                      </span>
                      <span className="text-sm text-gray-700 truncate">{b.batch_name}</span>
                    </div>
                    <span className="text-xs font-semibold text-gray-500 shrink-0 ml-2">
                      {b.student_count} {b.student_count === 1 ? 'student' : 'students'}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
