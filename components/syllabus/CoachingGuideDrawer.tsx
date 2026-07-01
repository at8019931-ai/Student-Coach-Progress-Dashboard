'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface Props {
  level: string
  session: number
  topic: string
  isTest?: boolean
}

// ─── Simple markdown → React ─────────────────────────────────────────────────
function renderSection(text: string) {
  const lines = text.split('\n')
  const elements: React.ReactNode[] = []
  let listItems: string[] = []
  let key = 0

  const flushList = () => {
    if (listItems.length) {
      elements.push(
        <ul key={key++} className="ml-4 mt-1 space-y-1 list-disc list-outside text-gray-700">
          {listItems.map((li, i) => (
            <li key={i} className="text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: boldify(li) }} />
          ))}
        </ul>
      )
      listItems = []
    }
  }

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) { flushList(); continue }

    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      listItems.push(trimmed.slice(2))
    } else if (/^\d+\.\s/.test(trimmed)) {
      listItems.push(trimmed.replace(/^\d+\.\s/, ''))
    } else if (trimmed.startsWith('####')) {
      flushList()
      elements.push(<p key={key++} className="text-xs font-bold text-gray-500 uppercase tracking-wide mt-3 mb-1">{trimmed.slice(4).trim()}</p>)
    } else {
      flushList()
      elements.push(
        <p key={key++} className="text-sm text-gray-700 leading-relaxed mt-1"
          dangerouslySetInnerHTML={{ __html: boldify(trimmed) }} />
      )
    }
  }
  flushList()
  return elements
}

function boldify(text: string) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.+?)`/g, '<code class="bg-gray-100 text-xs px-1 rounded">$1</code>')
}

function parseGuide(raw: string): { title: string; body: string }[] {
  const sections: { title: string; body: string }[] = []
  const parts = raw.split(/^###\s+/m)
  for (const part of parts) {
    if (!part.trim()) continue
    const nlIdx = part.indexOf('\n')
    const title = nlIdx === -1 ? part.trim() : part.slice(0, nlIdx).trim()
    const body  = nlIdx === -1 ? '' : part.slice(nlIdx + 1).trim()
    sections.push({ title, body })
  }
  return sections
}

// ─── Section colour accents ───────────────────────────────────────────────────
const SECTION_COLORS = [
  'border-l-violet-400', 'border-l-sky-400',    'border-l-emerald-400',
  'border-l-amber-400',  'border-l-rose-400',    'border-l-indigo-400',
  'border-l-teal-400',   'border-l-orange-400',  'border-l-pink-400',
  'border-l-lime-400',   'border-l-cyan-400',    'border-l-purple-400',
  'border-l-red-400',    'border-l-green-400',   'border-l-blue-400',
  'border-l-yellow-400', 'border-l-fuchsia-400', 'border-l-slate-400',
]

// ─── Drawer ───────────────────────────────────────────────────────────────────
export default function CoachingGuideDrawer({ level, session, topic, isTest }: Props) {
  const [open, setOpen]           = useState(false)
  const [content, setContent]     = useState<string | null>(null)
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState<string | null>(null)
  const [streaming, setStreaming] = useState(false)
  const abortRef = useRef<AbortController | null>(null)

  const cacheKey = `coaching-guide:${level}:${session}`

  const load = useCallback(async () => {
    // Try localStorage cache first
    try {
      const cached = localStorage.getItem(cacheKey)
      if (cached) { setContent(cached); return }
    } catch { /* localStorage may be unavailable */ }

    setLoading(true)
    setStreaming(true)
    setError(null)
    setContent('')

    const ctrl = new AbortController()
    abortRef.current = ctrl

    try {
      const res = await fetch(
        `/api/coaching-guide?level=${encodeURIComponent(level)}&session=${session}&topic=${encodeURIComponent(topic)}`,
        { signal: ctrl.signal }
      )

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: `HTTP ${res.status}` }))
        throw new Error(err.error ?? `HTTP ${res.status}`)
      }

      const reader = res.body!.getReader()
      const decoder = new TextDecoder()
      let full = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        full += decoder.decode(value, { stream: true })
        setContent(full)
      }

      // Cache completed guide
      try { localStorage.setItem(cacheKey, full) } catch { /* quota exceeded */ }
    } catch (err: unknown) {
      if (err instanceof Error && err.name !== 'AbortError') {
        setError(err.message)
      }
    } finally {
      setLoading(false)
      setStreaming(false)
    }
  }, [level, session, topic, cacheKey])

  const openDrawer = () => {
    setOpen(true)
    if (!content) load()
  }

  const closeDrawer = () => {
    setOpen(false)
    abortRef.current?.abort()
  }

  // Keyboard close
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeDrawer() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open])

  const sections = content ? parseGuide(content) : []

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={openDrawer}
        title="Open Coaching Guide"
        className={cn(
          'shrink-0 w-6 h-6 rounded flex items-center justify-center text-[10px] transition',
          isTest
            ? 'bg-amber-100 text-amber-600 hover:bg-amber-200'
            : 'bg-primary/10 text-primary hover:bg-primary/20'
        )}
      >
        📖
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={closeDrawer}
        />
      )}

      {/* Drawer */}
      <div className={cn(
        'fixed top-0 right-0 h-full w-full max-w-2xl bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300',
        open ? 'translate-x-0' : 'translate-x-full'
      )}>
        {/* Drawer header */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-gray-100 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{level}</span>
              <span className="text-xs text-gray-400">Session {session} of 24</span>
              {isTest && <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">★ Test</span>}
            </div>
            <h2 className="text-base font-bold text-gray-900 leading-snug max-w-md">{topic}</h2>
            <p className="text-xs text-gray-400 mt-0.5">Coaching Guide · AI Generated</p>
          </div>
          <div className="flex items-center gap-2 shrink-0 ml-4">
            {content && !streaming && (
              <button
                onClick={() => { try { localStorage.removeItem(cacheKey) } catch {} setContent(null); load() }}
                className="text-xs text-gray-400 hover:text-gray-600 px-2 py-1 rounded hover:bg-gray-100 transition"
                title="Regenerate"
              >
                ↺ Refresh
              </button>
            )}
            <button
              onClick={closeDrawer}
              className="w-8 h-8 rounded-xl hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-700 transition"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="text-sm font-semibold text-red-700 mb-1">Generation failed</p>
              <p className="text-xs text-red-600">{error}</p>
              {error.includes('OPENAI_API_KEY') && (
                <p className="text-xs text-red-500 mt-2">
                  Add <code className="bg-red-100 px-1 rounded">OPENAI_API_KEY</code> to your Vercel environment variables to enable AI coaching guides.
                </p>
              )}
              <button
                onClick={() => { setError(null); load() }}
                className="mt-3 text-xs font-semibold text-red-700 hover:text-red-900"
              >
                Try again
              </button>
            </div>
          )}

          {/* Loading skeleton */}
          {loading && !content && (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="space-y-2 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                  <div className="h-3 bg-gray-100 rounded w-full" />
                  <div className="h-3 bg-gray-100 rounded w-5/6" />
                  <div className="h-3 bg-gray-100 rounded w-4/6" />
                </div>
              ))}
              <p className="text-xs text-gray-400 text-center pt-2">Generating coaching guide — takes 15–20 seconds…</p>
            </div>
          )}

          {/* Sections */}
          {sections.map(({ title, body }, idx) => (
            <div key={idx} className={cn('border-l-4 pl-4 py-1 rounded-r-lg', SECTION_COLORS[idx % SECTION_COLORS.length])}>
              <h3 className="text-sm font-bold text-gray-900 mb-2">{title}</h3>
              <div>{renderSection(body)}</div>
            </div>
          ))}

          {/* Streaming indicator */}
          {streaming && content && (
            <div className="flex items-center gap-2 text-xs text-gray-400 py-2">
              <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              <span className="ml-1">Generating…</span>
            </div>
          )}

          {/* Done indicator */}
          {!streaming && content && sections.length > 0 && (
            <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
              <p className="text-xs text-gray-400">{sections.length} sections · Cached locally</p>
              <p className="text-xs text-gray-300">CircleChess Coaching Engine</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
