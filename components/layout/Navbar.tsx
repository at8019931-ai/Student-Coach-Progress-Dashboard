'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const DEV_ROLES = [
  { key: 'admin',   label: 'Admin',   icon: '🛡️' },
  { key: 'coach',   label: 'Coach',   icon: '🏅' },
  { key: 'student', label: 'Student', icon: '🎓' },
] as const

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [showUser, setShowUser] = useState(false)
  const [showRoles, setShowRoles] = useState(false)

  const activeRole = DEV_ROLES.find(r => pathname.startsWith(`/${r.key}`))?.key ?? 'admin'
  const activeRoleMeta = DEV_ROLES.find(r => r.key === activeRole)

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-100 px-4 md:px-6 py-3 flex items-center justify-between">
      <div className="flex md:hidden items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-white text-lg">♟</div>
        <span className="font-bold text-gray-900">CircleChess</span>
      </div>

      <div className="hidden md:block" />

      <div className="flex items-center gap-3">
        {/* Role switcher */}
        <div className="relative">
          <button
            onClick={() => { setShowRoles(!showRoles); setShowUser(false) }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 hover:bg-amber-100 transition text-xs font-semibold text-amber-700"
          >
            <span>{activeRoleMeta?.icon}</span>
            <span className="capitalize">{activeRole}</span>
            <span className="ml-0.5 text-amber-400">▾</span>
          </button>
          {showRoles && (
            <div className="absolute right-0 top-11 w-44 bg-white border border-gray-100 rounded-2xl shadow-xl shadow-gray-200/60 z-50 overflow-hidden">
              <p className="px-3 pt-2.5 pb-1 text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Switch View</p>
              {DEV_ROLES.map(({ key, label, icon }) => (
                <button
                  key={key}
                  onClick={() => { setShowRoles(false); router.push(`/${key}`); router.refresh() }}
                  className={cn(
                    'w-full flex items-center gap-2.5 px-3 py-2.5 text-sm transition',
                    key === activeRole ? 'bg-amber-50 text-amber-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'
                  )}
                >
                  <span>{icon}</span>
                  <span>{label}</span>
                  {key === activeRole && <span className="ml-auto text-amber-500 text-xs">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => { setShowUser(!showUser); setShowRoles(false) }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-gray-100 transition"
          >
            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">C</div>
            <span className="hidden md:block text-sm font-medium text-gray-700">Admin</span>
          </button>

          {showUser && (
            <div className="absolute right-0 top-12 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl shadow-gray-200/60 z-50 py-1">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-900">CircleChess</p>
                <p className="text-xs text-gray-400 capitalize">{activeRole}</p>
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
