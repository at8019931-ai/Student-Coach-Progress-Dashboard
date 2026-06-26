import type { Metadata } from 'next'
import { notFound }      from 'next/navigation'
import Image             from 'next/image'
import Link              from 'next/link'
import {
  getProfileById,
  getProfileVersions,
} from '@/services/coach-profile.service'
import ProfileEditor from '@/components/coach-profile/ProfileEditor'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const profile = await getProfileById(id).catch(() => null)
  return { title: `${profile?.display_name ?? 'Coach'} — Edit Profile` }
}

export default async function AdminCoachDetailPage({ params }: Props) {
  const { id } = await params
  const [profile, versions] = await Promise.all([
    getProfileById(id).catch(() => null),
    getProfileVersions(id).catch(() => []),
  ])

  if (!profile) notFound()

  const rating = profile.fide_rating
    ? `FIDE ${profile.fide_rating}`
    : profile.rapid_rating
    ? `Rapid ${profile.rapid_rating}`
    : null

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link href="/admin" className="hover:text-gray-700">Admin</Link>
        <span>/</span>
        <Link href="/admin/coaches" className="hover:text-gray-700">Coach Profiles</Link>
        <span>/</span>
        <span className="text-gray-900">{profile.display_name ?? 'Edit'}</span>
      </div>

      {/* Profile header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 flex gap-6 items-start">
        {profile.primary_photo_url ? (
          <Image
            src={profile.primary_photo_url}
            alt={profile.display_name ?? ''}
            width={100}
            height={100}
            className="w-24 h-24 rounded-full object-cover object-top flex-shrink-0"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
            {(profile.display_name ?? 'C').charAt(0)}
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">{profile.display_name ?? 'Unnamed Coach'}</h1>
              {profile.title && <p className="text-indigo-600 font-medium">{profile.title}</p>}
              <p className="text-sm text-gray-500 mt-1">{profile.coach_email}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                profile.profile_status === 'published'      ? 'bg-green-100 text-green-700'  :
                profile.profile_status === 'pending_review' ? 'bg-yellow-100 text-yellow-700':
                'bg-gray-100 text-gray-600'
              }`}>
                {profile.profile_status.replace('_', ' ')}
              </span>
              {profile.is_public && (
                <Link
                  href={`/coaches/${profile.id}`}
                  target="_blank"
                  className="text-xs text-indigo-600 hover:underline"
                >
                  View public →
                </Link>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mt-3 text-sm text-gray-600">
            {rating && <span>📊 {rating}</span>}
            {profile.location && <span>📍 {profile.location}</span>}
            {profile.years_coaching && <span>🎓 {profile.years_coaching}y coaching</span>}
            <span>🔄 v{versions.length} versions</span>
            {profile.ai_generated_at && (
              <span>🤖 AI: {new Date(profile.ai_generated_at).toLocaleDateString('en-GB')}</span>
            )}
          </div>
        </div>
      </div>

      {/* Editable profile */}
      <ProfileEditor profile={profile} />

      {/* Version history */}
      {versions.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="font-semibold">Version History</h2>
            <p className="text-xs text-gray-400 mt-0.5">{versions.length} snapshots recorded</p>
          </div>
          <div className="divide-y divide-gray-100">
            {versions.slice(0, 10).map(v => (
              <div key={v.id} className="px-4 py-3 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    v{v.version_number} — {v.change_summary ?? v.change_source.replace('_', ' ')}
                  </p>
                  {v.changed_fields.length > 0 && (
                    <p className="text-xs text-gray-400 mt-0.5">
                      Changed: {v.changed_fields.slice(0, 5).join(', ')}
                      {v.changed_fields.length > 5 && ` +${v.changed_fields.length - 5} more`}
                    </p>
                  )}
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs text-gray-400">
                    {new Date(v.created_at).toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' })}
                  </p>
                  {v.changed_by && (
                    <p className="text-xs text-gray-400">{v.changed_by}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
