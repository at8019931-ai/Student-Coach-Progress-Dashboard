import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getCoachByUserId } from '@/services/coach.service'
import { getStudentsByCoach } from '@/services/student.service'
import CreateAssignmentForm from '@/components/coach/CreateAssignmentForm'
import { dueDateLabel, cn } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Assignments — Coach' }
export const dynamic = 'force-dynamic'

export default async function CoachAssignmentsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const coach = await getCoachByUserId(user.id)
  if (!coach) redirect('/setup-required')

  const [students, { data: assignments }] = await Promise.all([
    getStudentsByCoach(coach.id),
    supabase
      .from('assignments')
      .select('*, submissions:submissions(status, student_id)')
      .eq('coach_id', coach.id)
      .order('due_date', { ascending: true }),
  ])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Assignments</h1>
        <p className="text-sm text-gray-500 mt-0.5">{assignments?.length ?? 0} total</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-3">
          {assignments?.map(a => {
            const label = dueDateLabel(a.due_date)
            const submitted = a.submissions?.filter((s: any) => s.status !== 'pending').length ?? 0
            const total = a.submissions?.length ?? 0

            return (
              <div key={a.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900">{a.title}</p>
                    {a.description && (
                      <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">{a.description}</p>
                    )}
                    <p className={cn(
                      'text-xs font-medium mt-1.5',
                      label === 'Overdue' ? 'text-red-500' : 'text-gray-400'
                    )}>
                      📅 {label} · {submitted}/{total} submitted
                    </p>
                  </div>
                  <span className={cn(
                    'shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full',
                    a.student_id ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-500'
                  )}>
                    {a.student_id ? 'Individual' : 'All students'}
                  </span>
                </div>
              </div>
            )
          })}

          {(assignments?.length ?? 0) === 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-400">
              <p className="text-4xl mb-3">📋</p>
              <p>No assignments created yet</p>
            </div>
          )}
        </div>

        <div>
          <CreateAssignmentForm coachId={coach.id} students={students} />
        </div>
      </div>
    </div>
  )
}
