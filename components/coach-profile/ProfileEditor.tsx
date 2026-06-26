'use client'

import { useState } from 'react'
import type { CoachProfileWithMeta } from '@/types/coach-profiles'

interface Props {
  profile: CoachProfileWithMeta
}

type Tab = 'content' | 'details' | 'actions'

export default function ProfileEditor({ profile }: Props) {
  const [tab,       setTab]       = useState<Tab>('content')
  const [saving,    setSaving]    = useState(false)
  const [generating,setGenerating]= useState(false)
  const [feedback,  setFeedback]  = useState('')
  const [fields,    setFields]    = useState({
    display_name:        profile.display_name        ?? '',
    title:               profile.title               ?? '',
    headline:            profile.headline             ?? '',
    location:            profile.location             ?? '',
    short_bio:           profile.short_bio            ?? '',
    full_bio:            profile.full_bio             ?? '',
    coaching_philosophy: profile.coaching_philosophy  ?? '',
    parent_intro:        profile.parent_intro         ?? '',
    website_summary:     profile.website_summary      ?? '',
    key_highlights:      (profile.key_highlights ?? []).join('\n'),
    fide_rating:         String(profile.fide_rating   ?? ''),
    rapid_rating:        String(profile.rapid_rating  ?? ''),
    blitz_rating:        String(profile.blitz_rating  ?? ''),
    years_coaching:      String(profile.years_coaching ?? ''),
    years_playing:       String(profile.years_playing  ?? ''),
    specializations:     (profile.specializations ?? []).join(', '),
    languages:           (profile.languages ?? []).join(', '),
    lichess_username:    profile.lichess_username     ?? '',
    chess_com_username:  profile.chess_com_username   ?? '',
  })

  const update = (key: keyof typeof fields, value: string) =>
    setFields(f => ({ ...f, [key]: value }))

  const save = async () => {
    setSaving(true)
    setFeedback('')
    try {
      const body: Record<string, unknown> = {
        ...fields,
        key_highlights:  fields.key_highlights.split('\n').map(s => s.trim()).filter(Boolean),
        specializations: fields.specializations.split(',').map(s => s.trim()).filter(Boolean),
        languages:       fields.languages.split(',').map(s => s.trim()).filter(Boolean),
        fide_rating:     fields.fide_rating  ? Number(fields.fide_rating)  : null,
        rapid_rating:    fields.rapid_rating ? Number(fields.rapid_rating) : null,
        blitz_rating:    fields.blitz_rating ? Number(fields.blitz_rating) : null,
        years_coaching:  fields.years_coaching ? Number(fields.years_coaching) : null,
        years_playing:   fields.years_playing  ? Number(fields.years_playing)  : null,
      }

      const r = await fetch(`/api/coach-profiles/${profile.id}`, {
        method:  'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(body),
      })

      if (r.ok) setFeedback('✅ Saved successfully')
      else      setFeedback('❌ Save failed — check console')
    } catch {
      setFeedback('❌ Network error')
    } finally {
      setSaving(false)
    }
  }

  const generate = async () => {
    setGenerating(true)
    setFeedback('⏳ Generating AI profile…')
    try {
      const r = await fetch(`/api/coach-profiles/${profile.id}/generate`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ changedBy: 'admin-editor' }),
      })
      if (r.ok) {
        const { generated } = await r.json()
        setFields(f => ({
          ...f,
          short_bio:           generated.short_bio           ?? f.short_bio,
          full_bio:            generated.full_bio            ?? f.full_bio,
          coaching_philosophy: generated.coaching_philosophy ?? f.coaching_philosophy,
          parent_intro:        generated.parent_intro        ?? f.parent_intro,
          website_summary:     generated.website_summary     ?? f.website_summary,
          key_highlights:      (generated.key_highlights ?? []).join('\n'),
        }))
        setFeedback('✅ AI content generated — review below then Save')
      } else {
        setFeedback('❌ AI generation failed')
      }
    } catch {
      setFeedback('❌ Network error')
    } finally {
      setGenerating(false)
    }
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'content', label: 'AI Content'  },
    { id: 'details', label: 'Profile Data'},
    { id: 'actions', label: 'Actions'     },
  ]

  const inputClass = "w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
  const labelClass = "block text-xs font-medium text-gray-600 mb-1"

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-5 py-3 text-sm font-medium transition-colors ${
              tab === t.id
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="p-6">
        {/* Content tab */}
        {tab === 'content' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">AI-generated content — edit freely before publishing</p>
              <button
                onClick={generate}
                disabled={generating}
                className="text-sm bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 disabled:opacity-50 transition-colors"
              >
                {generating ? '⏳ Generating…' : '🤖 Regenerate'}
              </button>
            </div>

            <div>
              <label className={labelClass}>Short Bio (2–3 sentences)</label>
              <textarea rows={3} className={inputClass} value={fields.short_bio}
                onChange={e => update('short_bio', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Full Biography</label>
              <textarea rows={8} className={inputClass} value={fields.full_bio}
                onChange={e => update('full_bio', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Coaching Philosophy</label>
              <textarea rows={4} className={inputClass} value={fields.coaching_philosophy}
                onChange={e => update('coaching_philosophy', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Key Highlights (one per line)</label>
              <textarea rows={5} className={inputClass} value={fields.key_highlights}
                onChange={e => update('key_highlights', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Parent Introduction</label>
              <textarea rows={3} className={inputClass} value={fields.parent_intro}
                onChange={e => update('parent_intro', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Website Summary (SEO)</label>
              <textarea rows={2} className={inputClass} value={fields.website_summary}
                onChange={e => update('website_summary', e.target.value)} />
            </div>
          </div>
        )}

        {/* Details tab */}
        {tab === 'details' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Display Name</label>
              <input className={inputClass} value={fields.display_name}
                onChange={e => update('display_name', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Title / Designation</label>
              <input className={inputClass} value={fields.title}
                onChange={e => update('title', e.target.value)} />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Headline (one-liner)</label>
              <input className={inputClass} value={fields.headline}
                onChange={e => update('headline', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Location</label>
              <input className={inputClass} value={fields.location}
                onChange={e => update('location', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>FIDE Rating</label>
              <input type="number" className={inputClass} value={fields.fide_rating}
                onChange={e => update('fide_rating', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Rapid Rating</label>
              <input type="number" className={inputClass} value={fields.rapid_rating}
                onChange={e => update('rapid_rating', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Blitz Rating</label>
              <input type="number" className={inputClass} value={fields.blitz_rating}
                onChange={e => update('blitz_rating', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Years Coaching</label>
              <input type="number" className={inputClass} value={fields.years_coaching}
                onChange={e => update('years_coaching', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Years Playing</label>
              <input type="number" className={inputClass} value={fields.years_playing}
                onChange={e => update('years_playing', e.target.value)} />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Specializations (comma-separated)</label>
              <input className={inputClass} value={fields.specializations}
                onChange={e => update('specializations', e.target.value)} />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Languages (comma-separated)</label>
              <input className={inputClass} value={fields.languages}
                onChange={e => update('languages', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Lichess Username</label>
              <input className={inputClass} value={fields.lichess_username}
                onChange={e => update('lichess_username', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Chess.com Username</label>
              <input className={inputClass} value={fields.chess_com_username}
                onChange={e => update('chess_com_username', e.target.value)} />
            </div>
          </div>
        )}

        {/* Actions tab */}
        {tab === 'actions' && (
          <div className="space-y-4 max-w-sm">
            <div>
              <h3 className="font-medium text-sm mb-3">Export Profile</h3>
              <div className="flex gap-3">
                <a
                  href={`/api/coach-profiles/${profile.id}/export?format=json`}
                  download
                  className="flex-1 text-center text-sm border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors"
                >
                  Download JSON
                </a>
                <a
                  href={`/api/coach-profiles/${profile.id}/export?format=html`}
                  target="_blank"
                  className="flex-1 text-center text-sm border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors"
                >
                  Preview HTML
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-sm mb-3">Profile Status</h3>
              <div className="space-y-2">
                {(['draft', 'pending_review', 'published', 'archived'] as const).map(s => (
                  <button
                    key={s}
                    disabled={profile.profile_status === s}
                    onClick={async () => {
                      await fetch(`/api/coach-profiles/${profile.id}`, {
                        method:  'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body:    JSON.stringify({ profile_status: s }),
                      })
                      setFeedback(`✅ Status changed to ${s}`)
                    }}
                    className={`w-full text-sm rounded-lg px-4 py-2 transition-colors text-left ${
                      profile.profile_status === s
                        ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 font-medium'
                        : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {profile.profile_status === s ? '✓ ' : ''}{s.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Save bar */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t">
          {feedback ? (
            <p className="text-sm text-gray-600">{feedback}</p>
          ) : <span />}
          {(tab === 'content' || tab === 'details') && (
            <button
              onClick={save}
              disabled={saving}
              className="text-sm bg-gray-900 text-white rounded-lg px-5 py-2 hover:bg-gray-800 disabled:opacity-50 transition-colors"
            >
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
