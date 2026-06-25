import { cn } from '@/lib/utils'
import { fetchCoachStudentData, groupByCoach, fetchAllStudentProgress, deduplicateStudents, detectLevel } from '@/lib/cc-explorer'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Users — Admin' }
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

export default async function UsersPage() {
  const [rawStudents, coachData] = await Promise.all([
    fetchAllStudentProgress().catch(() => []),
    fetchCoachStudentData().catch(() => []),
  ])

  const students = deduplicateStudents(rawStudents)
  const coaches = groupByCoach(coachData)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          {students.length} students · {coaches.length} coaches · live from CircleChess
        </p>
      </div>

      {/* Coaches */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-3">Coaches ({coaches.length})</h2>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="grid grid-cols-3 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase">
            <div className="col-span-2">Name</div>
            <div className="text-right">Students · Batches</div>
          </div>
          <div className="divide-y divide-gray-50">
            {coaches.map(c => (
              <div key={c.coach_name} className="grid grid-cols-3 gap-4 px-6 py-3 items-center">
                <div className="col-span-2 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-600 shrink-0">
                    {c.coach_name.charAt(0).toUpperCase()}
                  </div>
                  <p className="font-medium text-gray-900">{c.coach_name}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-blue-600">{c.student_count}</span>
                  <span className="text-gray-400 text-xs mx-1">·</span>
                  <span className="text-sm text-gray-500">{c.batch_count} batches</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Students */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-3">Students ({students.length})</h2>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="grid grid-cols-5 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase">
            <div className="col-span-2">Student</div>
            <div>Level</div>
            <div className="text-right">Rating</div>
            <div className="text-right">Total Pts</div>
          </div>
          <div className="divide-y divide-gray-50">
            {students.map(s => {
              const level = detectLevel(s.league_name)
              return (
                <div key={s.player_id} className="grid grid-cols-5 gap-4 px-6 py-3 items-center">
                  <div className="col-span-2 flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary shrink-0">
                      {s.student_name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 truncate">{s.student_name}</p>
                      <p className="text-xs text-gray-400">#{s.player_id}</p>
                    </div>
                  </div>
                  <span className={cn('px-2 py-0.5 rounded-full text-xs font-semibold w-fit', LEVEL_COLORS[level])}>
                    {level.replace('Foundation', 'F')}
                  </span>
                  <p className="text-right font-bold text-amber-500">{s.rating ?? '—'}</p>
                  <p className="text-right text-sm text-gray-700">{Number(s.total_points).toFixed(0)}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
