import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getStudentDashboardData } from '@/lib/cc-queries'
import CCDashboard from '@/components/student/CCDashboard'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Student Dashboard' }
export const dynamic = 'force-dynamic'

export default async function StudentDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const playerId = user.user_metadata?.player_id as string | undefined

  if (!playerId) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-center">
        <div>
          <p className="text-4xl mb-4">🔗</p>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Player ID not linked</h2>
          <p className="text-gray-500 max-w-sm">
            Ask your admin to link your CircleChess player ID to this account.
          </p>
        </div>
      </div>
    )
  }

  const data = await getStudentDashboardData(playerId)

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-center">
        <div>
          <p className="text-4xl mb-4">❌</p>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Player not found</h2>
          <p className="text-gray-500">No active player found for ID <strong>{playerId}</strong>.</p>
        </div>
      </div>
    )
  }

  return <CCDashboard data={data} />
}
