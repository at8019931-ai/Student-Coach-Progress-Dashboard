import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getStudentByUserId, getStudentRoadmap } from '@/services/student.service'
import LearningRoadmap from '@/components/student/LearningRoadmap'
import { levelLabel, levelColor, cn } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Learning Roadmap' }
export const dynamic = 'force-dynamic'

export default async function RoadmapPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const student = await getStudentByUserId(user.id)
  if (!student) redirect('/setup-required')

  const roadmap = await getStudentRoadmap(student.id, student.level)
  const completed = roadmap.filter(r => r.status === 'completed').length
  const inProgress = roadmap.filter(r => r.status === 'in_progress').length

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Learning Roadmap</h1>
          <p className="text-sm text-gray-500 mt-0.5">Your personalised chess curriculum</p>
        </div>
        <span className={cn('px-3 py-1 rounded-full text-sm font-semibold', levelColor(student.level))}>
          {levelLabel(student.level)}
        </span>
      </div>

      {/* Progress summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Completed', value: completed, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'In Progress', value: inProgress, color: 'text-primary', bg: 'bg-primary/5' },
          { label: 'Remaining', value: roadmap.length - completed - inProgress, color: 'text-gray-500', bg: 'bg-gray-50' },
        ].map(s => (
          <div key={s.label} className={cn('rounded-2xl border border-gray-100 p-4 text-center', s.bg)}>
            <p className={cn('text-3xl font-bold', s.color)}>{s.value}</p>
            <p className="text-sm text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="max-w-2xl">
        <LearningRoadmap roadmap={roadmap} />
      </div>
    </div>
  )
}
