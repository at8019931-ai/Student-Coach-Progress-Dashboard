'use client'

import { useState, useEffect, useCallback } from 'react'
import Link   from 'next/link'
import Image  from 'next/image'
import { ProfileRow } from './ProfileCard'
import type { AdminDashboardStats, CoachProfileWithMeta, AdminNotification } from '@/types/coach-profiles'

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, color, icon }: { label: string; value: number | string; color: string; icon: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-2xl">{icon}</span>
        <span className={`text-3xl font-bold ${color}`}>{value}</span>
      </div>
      <p className="text-sm text-gray-600 font-medium">{label}</p>
    </div>
  )
}

// ─── Notification bell ────────────────────────────────────────────────────────
function NotificationPanel() {
  const [notifs, setNotifs] = useState<AdminNotification[]>([])
  const [open,   setOpen]   = useState(false)

  const load = useCallback(async () => {
    const r = await fetch('/api/admin/notifications?limit=10')
    const j = await r.json()
    setNotifs(j.notifications ?? [])
  }, [])

  useEffect(() => { load() }, [load])

  const markRead = async (id?: string) => {
    await fetch(`/api/admin/notifications${id ? `?id=${id}` : ''}`, { method: 'PATCH' })
    load()
  }

  const typeIcon: Record<string, string> = {
    profile_created:    '🆕',
    profile_updated:    '✏️',
    generation_failed:  '❌',
    photo_missing:      '🖼️',
    profile_published:  '✅',
    duplicate_detected: '⚠️',
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        🔔
        {notifs.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {notifs.length > 9 ? '9+' : notifs.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-10 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <h3 className="font-semibold text-sm">Notifications</h3>
            {notifs.length > 0 && (
              <button onClick={() => markRead()} className="text-xs text-indigo-600 hover:underline">
                Mark all read
              </button>
            )}
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notifs.length === 0 ? (
              <p className="text-center text-sm text-gray-400 py-6">All caught up!</p>
            ) : notifs.map(n => (
              <div key={n.id} className="px-4 py-3 hover:bg-gray-50 border-b border-gray-50 last:border-0">
                <div className="flex items-start gap-2">
                  <span className="text-lg mt-0.5">{typeIcon[n.type] ?? '📌'}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800">{n.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{n.message}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(n.created_at).toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' })}
                    </p>
                  </div>
                  <button onClick={() => markRead(n.id)} className="text-gray-300 hover:text-gray-500 text-xs mt-1">✕</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Profile editor sidebar (quick actions) ───────────────────────────────────
function QuickActions({ profile, onRefresh }: { profile: CoachProfileWithMeta; onRefresh: () => void }) {
  const [generating, setGenerating] = useState(false)
  const [msg,        setMsg]        = useState('')

  const generate = async () => {
    setGenerating(true)
    setMsg('Generating AI profile…')
    try {
      const r = await fetch(`/api/coach-profiles/${profile.id}/generate`, { method: 'POST' })
      if (r.ok) { setMsg('AI profile generated ✓'); onRefresh() }
      else      { setMsg('Generation failed — check logs') }
    } catch {
      setMsg('Network error')
    } finally {
      setGenerating(false)
    }
  }

  const setStatus = async (status: string) => {
    await fetch(`/api/coach-profiles/${profile.id}`, {
      method:  'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ profile_status: status }),
    })
    onRefresh()
  }

  return (
    <div className="space-y-2">
      <button
        onClick={generate}
        disabled={generating}
        className="w-full text-sm bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 disabled:opacity-50 transition-colors"
      >
        {generating ? '⏳ Generating…' : '🤖 (Re)generate AI Profile'}
      </button>

      {profile.profile_status !== 'published' && (
        <button
          onClick={() => setStatus('published')}
          className="w-full text-sm bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700 transition-colors"
        >
          ✅ Publish Profile
        </button>
      )}
      {profile.profile_status === 'published' && (
        <button
          onClick={() => setStatus('draft')}
          className="w-full text-sm border border-gray-300 text-gray-700 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors"
        >
          Unpublish
        </button>
      )}

      <div className="flex gap-2">
        <a
          href={`/api/coach-profiles/${profile.id}/export?format=json`}
          className="flex-1 text-center text-xs border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors"
          download
        >
          JSON
        </a>
        <a
          href={`/api/coach-profiles/${profile.id}/export?format=html`}
          target="_blank"
          className="flex-1 text-center text-xs border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors"
        >
          HTML
        </a>
      </div>

      {msg && <p className="text-xs text-center text-gray-500 mt-1">{msg}</p>}
    </div>
  )
}

// ─── Main dashboard component ─────────────────────────────────────────────────
interface Props {
  initialStats:    AdminDashboardStats
  initialProfiles: CoachProfileWithMeta[]
}

export default function AdminCoachDashboard({ initialStats, initialProfiles }: Props) {
  const [stats,    setStats]    = useState(initialStats)
  const [profiles, setProfiles] = useState(initialProfiles)
  const [filter,   setFilter]   = useState<string>('')
  const [selected, setSelected] = useState<CoachProfileWithMeta | null>(null)
  const [loading,  setLoading]  = useState(false)

  const refresh = useCallback(async () => {
    setLoading(true)
    const [statsRes, profilesRes] = await Promise.all([
      fetch('/api/coach-profiles?stats=true'),
      fetch('/api/coach-profiles?limit=100'),
    ])
    const [s, p] = await Promise.all([statsRes.json(), profilesRes.json()])
    setStats(s)
    setProfiles(p.profiles ?? [])
    setLoading(false)
  }, [])

  const filtered = profiles.filter(p => {
    if (!filter) return true
    const q = filter.toLowerCase()
    return (
      (p.display_name ?? '').toLowerCase().includes(q) ||
      (p.coach_email  ?? '').toLowerCase().includes(q) ||
      (p.title        ?? '').toLowerCase().includes(q)
    )
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Coach Profiles</h1>
          <p className="text-sm text-gray-500 mt-1">Manage automated coach profile generation</p>
        </div>
        <div className="flex items-center gap-3">
          <NotificationPanel />
          <button
            onClick={refresh}
            disabled={loading}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors"
          >
            {loading ? '⏳' : '↻'} Refresh
          </button>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <StatCard label="Total Profiles"   value={stats.total}          color="text-gray-900"   icon="👥" />
        <StatCard label="Published"        value={stats.published}      color="text-green-600"  icon="✅" />
        <StatCard label="Pending Review"   value={stats.pending_review} color="text-yellow-600" icon="⏳" />
        <StatCard label="Draft"            value={stats.draft}          color="text-gray-500"   icon="✏️" />
        <StatCard label="Missing Photo"    value={stats.missing_photo}  color="text-red-500"    icon="🖼️" />
        <StatCard label="Needs AI"         value={stats.needs_ai}       color="text-indigo-600" icon="🤖" />
        <StatCard label="Notifications"    value={stats.unread_notifications} color="text-orange-500" icon="🔔" />
      </div>

      {/* Main content */}
      <div className="flex gap-6">
        {/* Profile list */}
        <div className="flex-1 bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b flex items-center gap-3">
            <input
              type="search"
              placeholder="Search by name, email or title…"
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <span className="text-xs text-gray-400 whitespace-nowrap">{filtered.length} profiles</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
                <tr>
                  <th className="px-4 py-3 text-left">Coach</th>
                  <th className="px-4 py-3 text-left">Title</th>
                  <th className="px-4 py-3 text-left">Rating</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">AI</th>
                  <th className="px-4 py-3 text-left">Updated</th>
                  <th className="px-4 py-3 text-left"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-sm text-gray-400">
                      No profiles found
                    </td>
                  </tr>
                ) : filtered.map(p => (
                  <tr
                    key={p.id}
                    className={`hover:bg-gray-50 cursor-pointer transition-colors ${selected?.id === p.id ? 'bg-indigo-50' : ''}`}
                    onClick={() => setSelected(p)}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        {p.primary_photo_url ? (
                          <Image
                            src={p.primary_photo_url}
                            alt=""
                            width={36}
                            height={36}
                            className="w-9 h-9 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">
                            {(p.display_name ?? 'C').charAt(0)}
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-sm text-gray-900">{p.display_name ?? '—'}</p>
                          <p className="text-xs text-gray-400">{p.coach_email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{p.title ?? '—'}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{p.fide_rating ?? p.rapid_rating ?? '—'}</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        p.profile_status === 'published'      ? 'bg-green-100 text-green-700'  :
                        p.profile_status === 'pending_review' ? 'bg-yellow-100 text-yellow-700':
                        p.profile_status === 'archived'       ? 'bg-red-100 text-red-600'      :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {p.profile_status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-xs text-gray-400">
                      {p.ai_generated_at ? '✓' : '⏳'}
                    </td>
                    <td className="py-3 px-4 text-xs text-gray-400">
                      {new Date(p.updated_at).toLocaleDateString('en-GB')}
                    </td>
                    <td className="py-3 px-4">
                      <Link
                        href={`/admin/coaches/${p.id}`}
                        className="text-xs text-indigo-600 hover:underline font-medium"
                        onClick={e => e.stopPropagation()}
                      >
                        Edit →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar — quick actions for selected profile */}
        {selected && (
          <div className="w-72 flex-shrink-0 space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sm">Quick Actions</h3>
                <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600">✕</button>
              </div>
              <p className="text-sm font-medium text-gray-800 mb-4">
                {selected.display_name ?? 'Unnamed Coach'}
              </p>
              <QuickActions
                profile={selected}
                onRefresh={() => {
                  refresh()
                  setSelected(null)
                }}
              />
            </div>

            {/* Profile preview */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-semibold text-sm mb-3">Content Preview</h3>
              {selected.short_bio ? (
                <p className="text-xs text-gray-600 leading-relaxed">{selected.short_bio}</p>
              ) : (
                <p className="text-xs text-gray-400 italic">No AI content yet — click Generate above</p>
              )}
              {selected.key_highlights?.length > 0 && (
                <ul className="mt-3 space-y-1">
                  {selected.key_highlights.slice(0, 3).map((h, i) => (
                    <li key={i} className="text-xs text-gray-600 flex gap-2">
                      <span className="text-indigo-400">•</span>{h}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
