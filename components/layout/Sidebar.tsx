'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface NavItem { label: string; href: string; icon: string }

const navBySection: Record<string, NavItem[]> = {
  admin: [
    { label: 'Dashboard',  href: '/admin',           icon: '🏠' },
    { label: 'Users',      href: '/admin/users',     icon: '👥' },
    { label: 'Classes',    href: '/admin/classes',   icon: '📅' },
    { label: 'Analytics',  href: '/admin/analytics', icon: '📊' },
  ],
  coach: [
    { label: 'Dashboard',  href: '/coach',            icon: '🏠' },
    { label: 'Students',   href: '/coach/students',   icon: '👥' },
    { label: 'Assignments',href: '/coach/assignments', icon: '📋' },
  ],
  student: [
    { label: 'Dashboard',  href: '/student',              icon: '🏠' },
    { label: 'Assignments',href: '/student/assignments',  icon: '📋' },
    { label: 'Roadmap',    href: '/student/roadmap',      icon: '🗺️' },
    { label: 'Achievements',href: '/student/achievements',icon: '🏆' },
  ],
}

export default function Sidebar() {
  const pathname = usePathname()
  const section = pathname.startsWith('/admin') ? 'admin' : pathname.startsWith('/coach') ? 'coach' : 'student'
  const navItems = navBySection[section]

  return (
    <aside className="hidden md:flex flex-col w-60 shrink-0 bg-white border-r border-gray-100 min-h-screen">
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
        <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white text-xl shadow-sm">♟</div>
        <span className="font-bold text-gray-900 text-lg">CircleChess</span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map(item => {
          const active = ['/admin', '/coach', '/student'].includes(item.href)
            ? pathname === item.href
            : pathname.startsWith(item.href)
          return (
            <Link key={item.href} href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                active ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="px-4 py-4 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">C</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">CircleChess</p>
            <p className="text-xs text-gray-400 capitalize">{section}</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
