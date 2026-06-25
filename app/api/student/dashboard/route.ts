import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getStudentDashboardData } from '@/lib/cc-queries'

export async function GET() {
  // Authenticate via Supabase session
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Get player_id from user metadata or profile
  const playerId = user.user_metadata?.player_id as string | undefined

  if (!playerId) {
    return NextResponse.json({ error: 'player_id not linked to this account' }, { status: 404 })
  }

  // Query CircleChess DB (server-side only — credentials never reach browser)
  const data = await getStudentDashboardData(playerId)

  if (!data) {
    return NextResponse.json({ error: 'Player not found' }, { status: 404 })
  }

  return NextResponse.json(data)
}
