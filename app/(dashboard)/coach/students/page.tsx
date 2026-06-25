import { cn } from '@/lib/utils'
import { fetchCoachStudentData, groupByCoach, detectLevel } from '@/lib/cc-explorer'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Students — Coach' }
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

export default async function CoachStudentsPage() {
  const rawData = await fetchCoachStudentData().catch(() => [])
  const coaches = groupByCoach(rawData)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">All Students by Coach</h1>
        <p className="text-sm text-gray-500 mt-0.5">{coaches.length} coaches · live from CircleChess</p>
      </div>

      {coaches.map(coach => (
        <div key={coach.coach_name} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-600 shrink-0">
              {coach.coach_name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-bold text-gray-900">{coach.coach_name}</p>
              <p className="text-xs text-gray-400">{coach.student_count} students · {coach.batch_count} batches</p>
            </div>
          </div>
          <div className="divide-y divide-gray-50">
            {rawData
              .filter(r => r.coach_name.trim() === coach.coach_name)
              .filter((r, i, arr) => arr.findIndex(x =>
                x.student_name.trim().toLowerCase() === r.student_name.trim().toLowerCase() &&
                x.batch_name === r.batch_name
              ) === i)
              .map(r => {
                const level = detectLevel(r.batch_name)
                return (
                  <div key={`${r.student_id}-${r.batch_name}`} className="flex items-center gap-3 px-6 py-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                      {r.student_name.trim().charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{r.student_name.trim()}</p>
                      <p className="text-xs text-gray-400">{r.batch_name}</p>
                    </div>
                    <span className={cn('text-[10px] font-semibold px-1.5 py-0.5 rounded-full shrink-0', LEVEL_COLORS[level])}>
                      {level.replace('Foundation', 'F')}
                    </span>
                  </div>
                )
              })}
          </div>
        </div>
      ))}
    </div>
  )
}
