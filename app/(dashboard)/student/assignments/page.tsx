import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getStudentByUserId, getStudentAssignments, getAllFeedback } from '@/services/student.service'
import AssignmentCard from '@/components/student/AssignmentCard'
import CoachFeedback from '@/components/student/CoachFeedback'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Assignments' }
export const dynamic = 'force-dynamic'

export default async function AssignmentsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const student = await getStudentByUserId(user.id)
  if (!student) redirect('/setup-required')

  const [assignments, allFeedback] = await Promise.all([
    getStudentAssignments(student.id),
    getAllFeedback(student.id),
  ])

  const pending = assignments.filter(a => !a.submission || a.submission.status === 'pending')
  const submitted = assignments.filter(a => a.submission?.status === 'submitted')
  const graded = assignments.filter(a => a.submission?.status === 'graded')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Assignments</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          {pending.length} pending · {submitted.length} submitted · {graded.length} graded
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          {pending.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Pending</h2>
              <div className="space-y-2">
                {pending.map(a => <AssignmentCard key={a.id} assignment={a} />)}
              </div>
            </section>
          )}

          {submitted.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Submitted</h2>
              <div className="space-y-2">
                {submitted.map(a => <AssignmentCard key={a.id} assignment={a} />)}
              </div>
            </section>
          )}

          {graded.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Graded</h2>
              <div className="space-y-2">
                {graded.map(a => <AssignmentCard key={a.id} assignment={a} />)}
              </div>
            </section>
          )}

          {assignments.length === 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
              <p className="text-4xl mb-3">📋</p>
              <p className="text-gray-500">No assignments yet. Your coach will add some soon!</p>
            </div>
          )}
        </div>

        {/* Feedback history */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Feedback History</h2>
          {allFeedback.slice(0, 5).map(fb => (
            <CoachFeedback key={fb.id} feedback={fb} />
          ))}
          {allFeedback.length === 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center text-sm text-gray-400">
              No feedback yet
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
