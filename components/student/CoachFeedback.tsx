import { formatDate } from '@/lib/utils'
import type { Feedback } from '@/types/database'

interface CoachFeedbackProps {
  feedback: Feedback | null
}

export default function CoachFeedback({ feedback }: CoachFeedbackProps) {
  if (!feedback) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h3 className="font-bold text-gray-900 mb-3">Coach Feedback</h3>
        <p className="text-center py-6 text-sm text-gray-400">
          No feedback yet. Keep attending classes! 💬
        </p>
      </div>
    )
  }

  const coachName = feedback.coach?.profile?.full_name ?? 'Your Coach'

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900">Coach Feedback</h3>
        <span className="text-xs text-gray-400">{formatDate(feedback.created_at)}</span>
      </div>

      <div className="p-4 bg-primary/[0.04] border border-primary/10 rounded-xl mb-4">
        <p className="text-sm text-gray-700 leading-relaxed">{feedback.content}</p>
        <p className="text-xs text-primary font-medium mt-3">— {coachName}</p>
      </div>

      {feedback.strengths?.length > 0 && (
        <div className="mb-3">
          <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Strengths</p>
          <div className="flex flex-wrap gap-1.5">
            {feedback.strengths.map((s, i) => (
              <span key={i} className="px-2.5 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full border border-green-100">
                ✓ {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {feedback.improvements?.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Areas to Improve</p>
          <div className="flex flex-wrap gap-1.5">
            {feedback.improvements.map((s, i) => (
              <span key={i} className="px-2.5 py-1 bg-red-50 text-red-600 text-xs font-medium rounded-full border border-red-100">
                → {s}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
