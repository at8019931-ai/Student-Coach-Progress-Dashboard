// ─────────────────────────────────────────────────────────────────────────────
// GET /api/coach-profiles/[id]/export?format=json|html
//
// Export a coach profile in different formats.
// PDF export is handled client-side via the HTML page's print stylesheet.
// ─────────────────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server'
import { getProfileById, generateProfileHTML } from '@/services/coach-profile.service'

export const runtime = 'nodejs'

type Params = { params: Promise<{ id: string }> }

export async function GET(req: NextRequest, { params }: Params) {
  const { id }   = await params
  const format   = new URL(req.url).searchParams.get('format') ?? 'json'

  const profile = await getProfileById(id)
  if (!profile) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  if (format === 'html') {
    const html = generateProfileHTML(profile)
    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Disposition': `inline; filename="${profile.display_name ?? 'coach'}-profile.html"`,
      },
    })
  }

  if (format === 'json') {
    const exportData = {
      name:               profile.display_name,
      title:              profile.title,
      headline:           profile.headline,
      location:           profile.location,
      ratings: {
        fide:   profile.fide_rating,
        rapid:  profile.rapid_rating,
        blitz:  profile.blitz_rating,
        peak:   profile.peak_rating,
      },
      experience: {
        yearsCoaching: profile.years_coaching,
        yearsPlaying:  profile.years_playing,
      },
      content: {
        shortBio:           profile.short_bio,
        fullBio:            profile.full_bio,
        coachingPhilosophy: profile.coaching_philosophy,
        keyHighlights:      profile.key_highlights,
        parentIntro:        profile.parent_intro,
        websiteSummary:     profile.website_summary,
      },
      specializations: profile.specializations,
      languages:       profile.languages,
      certifications:  profile.certifications,
      tournaments:     profile.tournaments,
      achievements:    profile.achievements,
      photoUrl:        profile.primary_photo_url,
      exportedAt:      new Date().toISOString(),
    }

    return new NextResponse(JSON.stringify(exportData, null, 2), {
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="${profile.display_name ?? 'coach'}-profile.json"`,
      },
    })
  }

  return NextResponse.json({ error: `Unsupported format: ${format}` }, { status: 400 })
}
