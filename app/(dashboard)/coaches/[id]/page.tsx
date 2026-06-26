import type { Metadata } from 'next'
import { notFound }      from 'next/navigation'
import Image             from 'next/image'
import Link              from 'next/link'
import { getProfileById } from '@/services/coach-profile.service'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const profile = await getProfileById(id).catch(() => null)
  if (!profile) return { title: 'Coach Not Found' }

  return {
    title:       `${profile.display_name} — CircleChess Coach`,
    description: profile.website_summary ?? profile.short_bio ?? undefined,
    openGraph: {
      title:       `${profile.display_name} — CircleChess Chess Coach`,
      description: profile.website_summary ?? profile.short_bio ?? undefined,
      images:      profile.primary_photo_url ? [profile.primary_photo_url] : [],
    },
  }
}

export default async function PublicCoachProfilePage({ params }: Props) {
  const { id } = await params
  const profile = await getProfileById(id).catch(() => null)

  if (!profile || !profile.is_public || profile.profile_status !== 'published') {
    notFound()
  }

  const rating = profile.fide_rating
    ? { label: 'FIDE', value: profile.fide_rating }
    : profile.rapid_rating
    ? { label: 'Rapid', value: profile.rapid_rating }
    : null

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-2">
      {/* Back link */}
      <Link href="/coaches" className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
        ← All Coaches
      </Link>

      {/* Hero section */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {/* Banner gradient */}
        <div className="h-28 bg-gradient-to-r from-indigo-900 via-indigo-700 to-purple-700" />

        <div className="px-6 pb-6">
          {/* Photo overlapping banner */}
          <div className="-mt-14 mb-4">
            {profile.primary_photo_url ? (
              <Image
                src={profile.primary_photo_url}
                alt={profile.display_name ?? 'Coach photo'}
                width={112}
                height={112}
                className="w-28 h-28 rounded-full object-cover object-top border-4 border-white shadow-lg"
                priority
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 border-4 border-white shadow-lg flex items-center justify-center text-white text-4xl font-bold">
                {(profile.display_name ?? 'C').charAt(0)}
              </div>
            )}
          </div>

          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{profile.display_name}</h1>
              {profile.title && (
                <p className="text-indigo-600 font-semibold mt-0.5">{profile.title}</p>
              )}
              {profile.headline && (
                <p className="text-gray-500 mt-1 text-sm">{profile.headline}</p>
              )}
            </div>

            {/* Rating badge */}
            {rating && (
              <div className="text-center flex-shrink-0">
                <div className="bg-indigo-900 text-white rounded-xl px-4 py-2">
                  <p className="text-xs text-indigo-200">{rating.label}</p>
                  <p className="text-2xl font-bold">{rating.value}</p>
                </div>
              </div>
            )}
          </div>

          {/* Meta chips */}
          <div className="flex flex-wrap gap-2 mt-4">
            {profile.location && (
              <span className="text-sm text-gray-600 flex items-center gap-1">
                📍 {profile.location}
              </span>
            )}
            {profile.years_coaching && (
              <span className="text-sm text-gray-600">
                🎓 {profile.years_coaching} years coaching
              </span>
            )}
            {profile.languages?.slice(0, 3).map(lang => (
              <span key={lang} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                {lang}
              </span>
            ))}
          </div>

          {/* Specializations */}
          {profile.specializations?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {profile.specializations.map(s => (
                <span key={s} className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-medium">
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Short bio */}
      {profile.short_bio && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-gray-700 text-base leading-relaxed">{profile.short_bio}</p>
        </div>
      )}

      {/* Key highlights */}
      {profile.key_highlights?.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-bold text-gray-900 mb-4">Highlights</h2>
          <ul className="space-y-2">
            {profile.key_highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                {h}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Full biography */}
      {profile.full_bio && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-bold text-gray-900 mb-4">About</h2>
          <div className="prose prose-sm max-w-none text-gray-700">
            {profile.full_bio.split('\n\n').map((para, i) => (
              <p key={i} className="mb-3 leading-relaxed">{para}</p>
            ))}
          </div>
        </div>
      )}

      {/* Two-column: philosophy + parent intro */}
      <div className="grid md:grid-cols-2 gap-6">
        {profile.coaching_philosophy && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-bold text-gray-900 mb-3">Coaching Philosophy</h2>
            <p className="text-sm text-gray-700 leading-relaxed">{profile.coaching_philosophy}</p>
          </div>
        )}
        {profile.parent_intro && (
          <div className="bg-indigo-50 rounded-xl border border-indigo-100 p-6">
            <h2 className="font-bold text-indigo-900 mb-3">👨‍👩‍👧 For Parents</h2>
            <p className="text-sm text-indigo-900 leading-relaxed">{profile.parent_intro}</p>
          </div>
        )}
      </div>

      {/* Certifications & Tournaments */}
      {(profile.certifications?.length > 0 || profile.tournaments?.length > 0) && (
        <div className="grid md:grid-cols-2 gap-6">
          {profile.certifications?.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-bold text-gray-900 mb-4">Certifications</h2>
              <ul className="space-y-3">
                {(profile.certifications as { name: string; issuer: string; year?: number }[]).map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <div>
                      <p className="font-medium text-gray-800">{c.name}</p>
                      <p className="text-gray-500 text-xs">{c.issuer}{c.year ? ` · ${c.year}` : ''}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {profile.tournaments?.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-bold text-gray-900 mb-4">Notable Results</h2>
              <ul className="space-y-3">
                {(profile.tournaments as { name: string; result: string; year?: number }[]).map((t, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-amber-500 mt-0.5">🏆</span>
                    <div>
                      <p className="font-medium text-gray-800">{t.result}</p>
                      <p className="text-gray-500 text-xs">{t.name}{t.year ? ` · ${t.year}` : ''}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Online profiles */}
      {(profile.lichess_username || profile.chess_com_username) && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-bold text-gray-900 mb-4">Online Profiles</h2>
          <div className="flex gap-4">
            {profile.lichess_username && (
              <a
                href={`https://lichess.org/@/${profile.lichess_username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-700 hover:text-indigo-600 transition-colors"
              >
                <span className="font-bold text-lg">♟</span>
                lichess.org/{profile.lichess_username}
              </a>
            )}
            {profile.chess_com_username && (
              <a
                href={`https://chess.com/member/${profile.chess_com_username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-700 hover:text-green-600 transition-colors"
              >
                <span className="font-bold text-lg">♞</span>
                chess.com/{profile.chess_com_username}
              </a>
            )}
          </div>
        </div>
      )}

      {/* Print-for-PDF hint */}
      <p className="text-xs text-center text-gray-400">
        Save as PDF: use your browser&apos;s Print function (Ctrl/⌘+P) and select &quot;Save as PDF&quot;
      </p>
    </div>
  )
}
