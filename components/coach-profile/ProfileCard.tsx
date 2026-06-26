'use client'

import Image from 'next/image'
import Link  from 'next/link'
import type { CoachProfileWithMeta } from '@/types/coach-profiles'

interface Props {
  profile:    CoachProfileWithMeta
  showStatus?: boolean
  onClick?:   () => void
}

const statusColors: Record<string, string> = {
  draft:          'bg-gray-100 text-gray-600',
  pending_review: 'bg-yellow-100 text-yellow-700',
  published:      'bg-green-100 text-green-700',
  archived:       'bg-red-100 text-red-600',
}

export function ProfileCard({ profile, showStatus = false, onClick }: Props) {
  const rating = profile.fide_rating
    ? `FIDE ${profile.fide_rating}`
    : profile.rapid_rating
    ? `Rapid ${profile.rapid_rating}`
    : null

  return (
    <div
      className="bg-white rounded-xl border border-gray-200 p-5 flex gap-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      {/* Photo */}
      <div className="flex-shrink-0">
        {profile.primary_photo_url ? (
          <Image
            src={profile.primary_photo_url}
            alt={profile.display_name ?? 'Coach'}
            width={72}
            height={72}
            className="w-[72px] h-[72px] rounded-full object-cover object-top"
          />
        ) : (
          <div className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
            {(profile.display_name ?? 'C').charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-gray-900 truncate">
              {profile.display_name ?? profile.coach_display_name ?? 'Unnamed Coach'}
            </h3>
            {profile.title && (
              <p className="text-sm text-indigo-600 font-medium">{profile.title}</p>
            )}
          </div>
          {showStatus && (
            <span className={`text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap ${statusColors[profile.profile_status] ?? statusColors.draft}`}>
              {profile.profile_status.replace('_', ' ')}
            </span>
          )}
        </div>

        {profile.headline && (
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{profile.headline}</p>
        )}

        <div className="flex flex-wrap gap-2 mt-2">
          {rating && (
            <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
              {rating}
            </span>
          )}
          {profile.location && (
            <span className="text-xs text-gray-500">📍 {profile.location}</span>
          )}
          {profile.years_coaching && (
            <span className="text-xs text-gray-500">
              {profile.years_coaching}y coaching
            </span>
          )}
        </div>

        {profile.specializations?.slice(0, 2).map(s => (
          <span key={s} className="inline-block mt-1 mr-1 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
            {s}
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── Compact list row (for admin tables) ──────────────────────────────────────
export function ProfileRow({ profile }: { profile: CoachProfileWithMeta }) {
  const rating = profile.fide_rating ?? profile.rapid_rating ?? '—'

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="py-3 px-4">
        <div className="flex items-center gap-3">
          {profile.primary_photo_url ? (
            <Image
              src={profile.primary_photo_url}
              alt=""
              width={36}
              height={36}
              className="w-9 h-9 rounded-full object-cover"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">
              {(profile.display_name ?? 'C').charAt(0)}
            </div>
          )}
          <div>
            <p className="font-medium text-sm text-gray-900">{profile.display_name ?? '—'}</p>
            <p className="text-xs text-gray-400">{profile.coach_email}</p>
          </div>
        </div>
      </td>
      <td className="py-3 px-4 text-sm text-gray-600">{profile.title ?? '—'}</td>
      <td className="py-3 px-4 text-sm text-gray-600">{rating}</td>
      <td className="py-3 px-4">
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[profile.profile_status] ?? statusColors.draft}`}>
          {profile.profile_status.replace('_', ' ')}
        </span>
      </td>
      <td className="py-3 px-4 text-xs text-gray-400">
        {profile.ai_generated_at ? '✓ AI' : '⏳ Pending'}
      </td>
      <td className="py-3 px-4 text-xs text-gray-400">
        {new Date(profile.updated_at).toLocaleDateString('en-GB')}
      </td>
      <td className="py-3 px-4">
        <Link
          href={`/admin/coaches/${profile.id}`}
          className="text-xs text-indigo-600 hover:underline font-medium"
          onClick={e => e.stopPropagation()}
        >
          Edit →
        </Link>
      </td>
    </tr>
  )
}
