import { cn } from '@/lib/utils'
import { fetchCoachStudentData, groupByCoach, detectLevel } from '@/lib/cc-explorer'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Batches — Admin' }
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

export default async function ClassesPage() {
  const coachData = await fetchCoachStudentData().catch(() => [])
  const coaches = groupByCoach(coachData)

  // Flatten all batches with coach info
  const allBatches = coaches.flatMap(c =>
    c.batches.map(b => ({ ...b, coach_name: c.coach_name, level: detectLevel(b.batch_name) }))
  ).sort((a, b) => b.student_count - a.student_count)

  const totalBatches = allBatches.length
  const totalStudents = new Set(coachData.map(r => r.student_name.trim().toLowerCase())).size

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Batches</h1>
        <p className="text-sm text-gray-500 mt-0.5">{totalBatches} batches · {totalStudents} students · live from CircleChess</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="grid grid-cols-4 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase">
          <div className="col-span-2">Batch</div>
          <div>Coach</div>
          <div className="text-right">Students</div>
        </div>

        <div className="divide-y divide-gray-50">
          {allBatches.map(b => (
            <div key={`${b.coach_name}-${b.batch_name}`} className="grid grid-cols-4 gap-4 px-6 py-3 items-center">
              <div className="col-span-2 flex items-center gap-3">
                <span className={cn('text-[10px] font-semibold px-1.5 py-0.5 rounded-full shrink-0', LEVEL_COLORS[b.level])}>
                  {b.level.replace('Foundation', 'F')}
                </span>
                <p className="text-sm font-medium text-gray-900">{b.batch_name}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600 shrink-0">
                  {b.coach_name.charAt(0).toUpperCase()}
                </div>
                <p className="text-sm text-gray-600 truncate">{b.coach_name}</p>
              </div>
              <p className="text-right text-sm font-semibold text-gray-700">{b.student_count}</p>
            </div>
          ))}
          {!allBatches.length && (
            <p className="px-6 py-12 text-center text-sm text-gray-400">No batch data available</p>
          )}
        </div>
      </div>
    </div>
  )
}
