import type { Metadata } from 'next'
import { listProfiles, getAdminDashboardStats } from '@/services/coach-profile.service'
import AdminCoachDashboard from '@/components/coach-profile/AdminDashboard'

export const metadata: Metadata = { title: 'Coach Profiles — Admin' }
export const dynamic = 'force-dynamic'

export default async function AdminCoachesPage() {
  const [stats, profiles] = await Promise.all([
    getAdminDashboardStats().catch(() => null),
    listProfiles(undefined, 100, 0).catch(() => []),
  ])

  const defaultStats = {
    total: 0, published: 0, draft: 0, pending_review: 0,
    missing_photo: 0, needs_ai: 0, recent_updates: [], unread_notifications: 0,
  }

  return (
    <AdminCoachDashboard
      initialStats={stats ?? defaultStats}
      initialProfiles={profiles}
    />
  )
}
