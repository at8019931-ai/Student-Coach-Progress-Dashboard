import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { cn, levelColor, levelLabel, formatDate } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'User Management — Admin' }
export const dynamic = 'force-dynamic'

export default async function UsersPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  if (user.user_metadata?.role !== 'admin' && process.env.NODE_ENV !== 'development') redirect('/student')

  const [
    { data: students },
    { data: coaches },
  ] = await Promise.all([
    supabase.from('students')
      .select('*, profile:profiles!students_user_id_fkey(full_name, email, avatar_url), coach:coaches(*, profile:profiles!coaches_user_id_fkey(full_name))')
      .order('created_at', { ascending: false }),
    supabase.from('coaches')
      .select('*, profile:profiles!coaches_user_id_fkey(full_name, email)')
      .order('created_at', { ascending: false }),
  ])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          {students?.length ?? 0} students · {coaches?.length ?? 0} coaches
        </p>
      </div>

      {/* Coaches */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-3">Coaches</h2>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="grid grid-cols-3 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase">
            <div className="col-span-2">Name</div>
            <div>Specialization</div>
          </div>
          <div className="divide-y divide-gray-50">
            {coaches?.map(c => (
              <div key={c.id} className="grid grid-cols-3 gap-4 px-6 py-4 items-center">
                <div className="col-span-2 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-600">
                    {(c as any).profile?.full_name?.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{(c as any).profile?.full_name}</p>
                    <p className="text-xs text-gray-400">{(c as any).profile?.email}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{c.specialization ?? '—'}</p>
              </div>
            ))}
            {!coaches?.length && (
              <p className="px-6 py-8 text-center text-sm text-gray-400">No coaches yet</p>
            )}
          </div>
        </div>
      </section>

      {/* Students */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-3">Students</h2>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="grid grid-cols-5 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase">
            <div className="col-span-2">Student</div>
            <div>Level</div>
            <div>Coach</div>
            <div>Rating</div>
          </div>
          <div className="divide-y divide-gray-50">
            {students?.map(s => (
              <div key={s.id} className="grid grid-cols-5 gap-4 px-6 py-4 items-center">
                <div className="col-span-2 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary shrink-0">
                    {(s as any).profile?.full_name?.charAt(0) ?? 'S'}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{(s as any).profile?.full_name}</p>
                    <p className="text-xs text-gray-400">{(s as any).profile?.email}</p>
                  </div>
                </div>
                <span className={cn('px-2.5 py-0.5 rounded-full text-xs font-semibold w-fit', levelColor(s.level))}>
                  {levelLabel(s.level)}
                </span>
                <p className="text-sm text-gray-600">
                  {(s as any).coach?.profile?.full_name ?? '—'}
                </p>
                <div>
                  <p className="font-bold text-gray-900">{s.current_rating}</p>
                  <p className="text-xs text-green-600">+{s.current_rating - s.joining_rating}</p>
                </div>
              </div>
            ))}
            {!students?.length && (
              <p className="px-6 py-8 text-center text-sm text-gray-400">No students yet</p>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
