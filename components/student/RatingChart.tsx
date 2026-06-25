'use client'

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from 'recharts'
import { format } from 'date-fns'
import type { RatingHistory } from '@/types/database'

interface RatingChartProps {
  history: RatingHistory[]
  joiningRating: number
}

export default function RatingChart({ history, joiningRating }: RatingChartProps) {
  const data = history.map(h => ({
    date: format(new Date(h.recorded_at), 'MMM d'),
    rating: h.rating,
  }))

  const minRating = Math.min(...history.map(h => h.rating), joiningRating) - 50
  const maxRating = Math.max(...history.map(h => h.rating)) + 50

  if (history.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h3 className="font-bold text-gray-900 mb-3">Rating Progress</h3>
        <div className="flex items-center justify-center h-40 text-gray-400 text-sm">
          No rating data yet 📈
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900">Rating Progress</h3>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <span className="w-3 h-0.5 bg-primary rounded-full inline-block" />
            Rating
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-0.5 bg-amber-400 border-dashed border-t inline-block" />
            Start
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={160}>
        <LineChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10, fill: '#9ca3af' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[minRating, maxRating]}
            tick={{ fontSize: 10, fill: '#9ca3af' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              background: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              fontSize: '12px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
            }}
            formatter={(value) => [Number(value), 'Rating']}
          />
          <ReferenceLine
            y={joiningRating}
            stroke="#f59e0b"
            strokeDasharray="4 3"
            strokeWidth={1.5}
            label={{ value: 'Start', position: 'right', fontSize: 9, fill: '#f59e0b' }}
          />
          <Line
            type="monotone"
            dataKey="rating"
            stroke="#7c3aed"
            strokeWidth={2.5}
            dot={{ fill: '#7c3aed', r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5, fill: '#7c3aed' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
