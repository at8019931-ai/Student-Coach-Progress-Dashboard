import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { cn, formatDateTime } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Classes — Admin' }
export const dynamic = 'force-dynamic'

const statusColor: Record<string, string> = {
  scheduled: 'bg-blue-50 text-blue-700',
  completed: 'bg-green-50 text-green-700',
  cancelled: 'bg-red-50 text-red-600',
}

const typeLabel: Record<string, string> = {
  group: 'Group',
  individual: 'Private',
  tournament: 'Tournament',
}

export default async function ClassesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  if (user.user_metadata?.role !== 'admin' && process.env.NODE_ENV !== 'development') redirect('/student')

  const { data: classes } = await supabase
    .from('classes')
    .select('*, coach:coaches(*, profile:profiles!coaches_user_id_fkey(full_name))')
    .order('scheduled_at', { ascending: false })
    .limit(50)

  const scheduled = classes?.filter(c => c.status === 'scheduled').length ?? 0
  const completed = classes?.filter(c => c.status === 'completed').length ?? 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Classes</h1>
        <p className="text-sm text-gray-500 mt-0.5">{scheduled} upcoming · {completed} completed</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="grid grid-cols-5 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase">
          <div className="col-span-2">Class</div>
          <div>Coach</div>
          <div>Type</div>
          <div>Status</div>
        </div>

        <div className="divide-y divide-gray-50">
          {classes?.map(cls => (
            <div key={cls.id} className="grid grid-cols-5 gap-4 px-6 py-4 items-center">
              <div className="col-span-2">
                <p className="font-medium text-gray-900">{cls.title}</p>
                <p className="text-xs text-gray-400">{formatDateTime(cls.scheduled_at)} · {cls.duration_mins} min</p>
              </div>
              <p className="text-sm text-gray-600">{(cls as any).coach?.profile?.full_name ?? '—'}</p>
              <span className="text-xs font-medium text-gray-600">{typeLabel[cls.class_type] ?? cls.class_type}</span>
              <span className={cn('text-xs font-semibold px-2.5 py-0.5 rounded-full w-fit', statusColor[cls.status])}>
                {cls.status}
              </span>
            </div>
          ))}
          {!classes?.length && (
            <p className="px-6 py-12 text-center text-sm text-gray-400">No classes scheduled yet</p>
          )}
        </div>
      </div>
    </div>
  )
}
