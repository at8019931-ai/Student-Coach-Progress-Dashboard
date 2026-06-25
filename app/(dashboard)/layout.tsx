import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Sidebar from '@/components/layout/Sidebar'
import Navbar from '@/components/layout/Navbar'
import type { UserRole } from '@/types/database'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, role, avatar_url')
    .eq('id', user.id)
    .single()

  const { data: notifications } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(20)

  const unreadCount = notifications?.filter(n => !n.is_read).length ?? 0
  const role = (profile?.role ?? user.user_metadata?.role ?? 'student') as UserRole
  const userName = profile?.full_name ?? user.email ?? 'User'

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role={role} userName={userName} avatarUrl={profile?.avatar_url} />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar
          userName={userName}
          role={role}
          notifications={notifications ?? []}
          unreadCount={unreadCount}
        />
        <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  )
}
