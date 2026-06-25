'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { cn, getInitials } from '@/lib/utils'
import type { Notification } from '@/types/database'

const DEV_ROLES = [
  { key: 'admin',   label: 'Admin',   icon: '🛡️' },
  { key: 'coach',   label: 'Coach',   icon: '🏅' },
  { key: 'student', label: 'Student', icon: '🎓' },
] as const

interface NavbarProps {
  userName: string
  role: string
  notifications?: Notification[]
  unreadCount?: number
}

export default function Navbar({ userName, role, notifications = [], unreadCount = 0 }: NavbarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [showNotifs, setShowNotifs] = useState(false)
  const [showUser, setShowUser] = useState(false)
  const [showRoles, setShowRoles] = useState(false)

  // In dev, derive active role from URL so the switcher always reflects where you are
  const activeRole = process.env.NODE_ENV === 'development'
    ? (DEV_ROLES.find(r => pathname.startsWith(`/${r.key}`))?.key ?? role)
    : role

  const activeRoleMeta = DEV_ROLES.find(r => r.key === activeRole)

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-100 px-4 md:px-6 py-3 flex items-center justify-between">
      {/* Mobile logo */}
      <div className="flex md:hidden items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-white text-lg">♟</div>
        <span className="font-bold text-gray-900">CircleChess</span>
      </div>

      <div className="hidden md:block" />

      <div className="flex items-center gap-3">
        {/* Dev role switcher */}
        {process.env.NODE_ENV === 'development' && (
          <div className="relative">
            <button
              onClick={() => { setShowRoles(!showRoles); setShowNotifs(false); setShowUser(false) }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 hover:bg-amber-100 transition text-xs font-semibold text-amber-700"
            >
              <span>{activeRoleMeta?.icon}</span>
              <span className="capitalize">{activeRole}</span>
              <span className="ml-0.5 text-amber-400">▾</span>
            </button>
            {showRoles && (
              <div className="absolute right-0 top-11 w-44 bg-white border border-gray-100 rounded-2xl shadow-xl shadow-gray-200/60 z-50 overflow-hidden">
                <p className="px-3 pt-2.5 pb-1 text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Dev — Switch Role</p>
                {DEV_ROLES.map(({ key, label, icon }) => (
                  <button
                    key={key}
                    onClick={() => { setShowRoles(false); router.push(`/${key}`); router.refresh() }}
                    className={cn(
                      'w-full flex items-center gap-2.5 px-3 py-2.5 text-sm transition',
                      key === activeRole
                        ? 'bg-amber-50 text-amber-700 font-semibold'
                        : 'text-gray-700 hover:bg-gray-50'
                    )}
                  >
                    <span>{icon}</span>
                    <span>{label}</span>
                    {key === activeRole && <span className="ml-auto text-amber-500 text-xs">✓</span>}
                  </button>
                ))}
                <div className="mx-3 my-2 pt-2 border-t border-gray-100 text-[10px] text-gray-400 text-center">
                  dev only · hidden in prod
                </div>
              </div>
            )}
          </div>
        )}

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setShowNotifs(!showNotifs); setShowUser(false) }}
            className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 transition text-lg"
            aria-label="Notifications"
          >
            🔔
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {showNotifs && (
            <div className="absolute right-0 top-12 w-80 bg-white border border-gray-100 rounded-2xl shadow-xl shadow-gray-200/60 z-50">
              <div className="px-4 py-3 border-b border-gray-100 font-semibold text-sm text-gray-900">
                Notifications
              </div>
              <div className="max-h-72 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="px-4 py-6 text-center text-sm text-gray-400">All caught up! 🎉</p>
                ) : (
                  notifications.slice(0, 8).map(n => (
                    <div key={n.id} className={cn(
                      'px-4 py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition',
                      !n.is_read && 'bg-primary/[0.03]'
                    )}>
                      <p className="text-sm font-medium text-gray-900">{n.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{n.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => { setShowUser(!showUser); setShowNotifs(false) }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-gray-100 transition"
          >
            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
              {getInitials(userName)}
            </div>
            <span className="hidden md:block text-sm font-medium text-gray-700">{userName.split(' ')[0]}</span>
          </button>

          {showUser && (
            <div className="absolute right-0 top-12 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl shadow-gray-200/60 z-50 py-1">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-900">{userName}</p>
                <p className="text-xs text-gray-400 capitalize">{role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
