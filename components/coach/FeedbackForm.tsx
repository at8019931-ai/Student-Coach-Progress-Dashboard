'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

interface FeedbackFormProps {
  studentId: string
  coachId: string
}

export default function FeedbackForm({ studentId, coachId }: FeedbackFormProps) {
  const router = useRouter()
  const [content, setContent] = useState('')
  const [strengthInput, setStrengthInput] = useState('')
  const [improvementInput, setImprovementInput] = useState('')
  const [strengths, setStrengths] = useState<string[]>([])
  const [improvements, setImprovements] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  function addTag(list: string[], setList: (l: string[]) => void, input: string, setInput: (s: string) => void) {
    const trimmed = input.trim()
    if (trimmed && !list.includes(trimmed)) {
      setList([...list, trimmed])
    }
    setInput('')
  }

  function removeTag(list: string[], setList: (l: string[]) => void, tag: string) {
    setList(list.filter(t => t !== tag))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!content.trim()) return
    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.from('feedback').insert({
      coach_id: coachId,
      student_id: studentId,
      content,
      strengths,
      improvements,
    })

    if (!error) {
      // create notification
      const { data: student } = await supabase
        .from('students').select('user_id').eq('id', studentId).single()
      if (student) {
        await supabase.from('notifications').insert({
          user_id: student.user_id,
          type: 'feedback',
          title: 'Your coach left new feedback!',
          message: content.slice(0, 100),
          link: '/student/assignments',
        })
      }
      setSuccess(true)
      setContent('')
      setStrengths([])
      setImprovements([])
      setTimeout(() => { setSuccess(false); router.refresh() }, 2000)
    }
    setLoading(false)
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <h3 className="font-bold text-gray-900 mb-4">Add Feedback</h3>

      {success ? (
        <div className="p-4 bg-green-50 border border-green-100 rounded-xl text-sm text-green-700 text-center">
          ✓ Feedback saved and student notified!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Write your feedback here…"
            required
            rows={3}
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm resize-none"
          />

          {/* Strengths */}
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">Strengths</label>
            <div className="flex gap-2 mb-1.5">
              <input
                value={strengthInput}
                onChange={e => setStrengthInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag(strengths, setStrengths, strengthInput, setStrengthInput))}
                placeholder="e.g. Tactical awareness"
                className="flex-1 px-3 py-1.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 text-xs"
              />
              <button
                type="button"
                onClick={() => addTag(strengths, setStrengths, strengthInput, setStrengthInput)}
                className="px-3 py-1.5 bg-green-100 text-green-700 rounded-xl text-xs font-medium hover:bg-green-200 transition"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-1">
              {strengths.map(s => (
                <span key={s} className="px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded-full border border-green-100 cursor-pointer hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition"
                  onClick={() => removeTag(strengths, setStrengths, s)}>
                  ✓ {s} ×
                </span>
              ))}
            </div>
          </div>

          {/* Improvements */}
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">Areas to Improve</label>
            <div className="flex gap-2 mb-1.5">
              <input
                value={improvementInput}
                onChange={e => setImprovementInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag(improvements, setImprovements, improvementInput, setImprovementInput))}
                placeholder="e.g. Endgames"
                className="flex-1 px-3 py-1.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 text-xs"
              />
              <button
                type="button"
                onClick={() => addTag(improvements, setImprovements, improvementInput, setImprovementInput)}
                className="px-3 py-1.5 bg-red-50 text-red-600 rounded-xl text-xs font-medium hover:bg-red-100 transition"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-1">
              {improvements.map(s => (
                <span key={s} className="px-2 py-0.5 bg-red-50 text-red-600 text-xs rounded-full border border-red-100 cursor-pointer hover:bg-green-50 hover:text-green-700 hover:border-green-100 transition"
                  onClick={() => removeTag(improvements, setImprovements, s)}>
                  → {s} ×
                </span>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !content.trim()}
            className={cn(
              'w-full py-2.5 rounded-xl text-sm font-semibold transition-all',
              'bg-primary text-white shadow-sm shadow-primary/20',
              'hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed'
            )}
          >
            {loading ? 'Saving…' : 'Save Feedback'}
          </button>
        </form>
      )}
    </div>
  )
}
