import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getCoachByUserId } from '@/services/coach.service'
import { getStudentsByCoach } from '@/services/student.service'
import Link from 'next/link'
import { cn, levelColor, levelLabel, formatDate } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'My Students' }
export const dynamic = 'force-dynamic'

export default async function StudentsListPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const coach = await getCoachByUserId(user.id)
  if (!coach) redirect('/setup-required')

  const students = await getStudentsByCoach(coach.id)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Students</h1>
          <p className="text-sm text-gray-500 mt-0.5">{students.length} students</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-5 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wide">
          <div className="col-span-2">Student</div>
          <div>Level</div>
          <div>Rating</div>
          <div>Joined</div>
        </div>

        <div className="divide-y divide-gray-50">
          {students.map(student => {
            const diff = student.current_rating - student.joining_rating
            return (
              <Link
                key={student.id}
                href={`/coach/students/${student.id}`}
                className="grid grid-cols-5 gap-4 px-6 py-4 hover:bg-gray-50 transition items-center"
              >
                {/* Name */}
                <div className="col-span-2 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary shrink-0">
                    {student.profile?.full_name?.charAt(0) ?? 'S'}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{student.profile?.full_name}</p>
                    <p className="text-xs text-gray-400">{student.profile?.email}</p>
                  </div>
                </div>

                {/* Level */}
                <div>
                  <span className={cn('px-2.5 py-0.5 rounded-full text-xs font-semibold', levelColor(student.level))}>
                    {levelLabel(student.level)}
                  </span>
                </div>

                {/* Rating */}
                <div>
                  <p className="font-bold text-gray-900">{student.current_rating}</p>
                  <p className={cn('text-xs font-medium', diff >= 0 ? 'text-green-600' : 'text-red-500')}>
                    {diff >= 0 ? '+' : ''}{diff}
                  </p>
                </div>

                {/* Joined */}
                <div className="text-sm text-gray-400">{formatDate(student.join_date)}</div>
              </Link>
            )
          })}

          {students.length === 0 && (
            <div className="px-6 py-16 text-center text-gray-400">
              <p className="text-4xl mb-3">👥</p>
              <p>No students assigned yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
