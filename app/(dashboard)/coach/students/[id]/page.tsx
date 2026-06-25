import { redirect, notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getCoachByUserId } from '@/services/coach.service'
import {
  getStudentById, getStudentAssignments, getAllFeedback,
  getStudentAchievements, getRatingHistory, getAttendancePct,
  getStudentRoadmap, getCurrentGoal, getGoalProgress,
} from '@/services/student.service'
import ProfileCard from '@/components/student/ProfileCard'
import RatingChart from '@/components/student/RatingChart'
import LearningRoadmap from '@/components/student/LearningRoadmap'
import AchievementGrid from '@/components/student/AchievementGrid'
import CoachFeedback from '@/components/student/CoachFeedback'
import AssignmentCard from '@/components/student/AssignmentCard'
import MonthlyGoals from '@/components/student/MonthlyGoals'
import FeedbackForm from '@/components/coach/FeedbackForm'
import GoalForm from '@/components/coach/GoalForm'
import { formatDate } from '@/lib/utils'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export default async function StudentProfilePage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const [coach, student] = await Promise.all([
    getCoachByUserId(user.id),
    getStudentById(params.id),
  ])

  if (!coach || !student) notFound()
  if (student.coach_id !== coach.id) notFound() // access guard

  const [
    assignments,
    allFeedback,
    { all: allAchievements, earned },
    ratingHistory,
    attendancePct,
    roadmap,
    currentGoal,
  ] = await Promise.all([
    getStudentAssignments(student.id),
    getAllFeedback(student.id),
    getStudentAchievements(student.id),
    getRatingHistory(student.id),
    getAttendancePct(student.id),
    getStudentRoadmap(student.id, student.level),
    getCurrentGoal(student.id),
  ])

  const goalProgress = currentGoal ? await getGoalProgress(student.id, currentGoal) : null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <a href="/coach/students" className="text-gray-400 hover:text-gray-600 transition">← Back</a>
        <h1 className="text-2xl font-bold text-gray-900">
          {student.profile?.full_name}
        </h1>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="space-y-4">
          <ProfileCard student={student} attendancePct={attendancePct} />
          <MonthlyGoals goal={currentGoal} progress={goalProgress} />
          <GoalForm studentId={student.id} coachId={coach.id} currentGoal={currentGoal} />
        </div>

        {/* Middle column */}
        <div className="space-y-4">
          <RatingChart history={ratingHistory} joiningRating={student.joining_rating} />
          <LearningRoadmap roadmap={roadmap} compact />

          {/* Assignments */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-bold text-gray-900 mb-3">Assignments</h3>
            <div className="space-y-2">
              {assignments.slice(0, 5).map(a => <AssignmentCard key={a.id} assignment={a} />)}
              {assignments.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-4">No assignments yet</p>
              )}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          <FeedbackForm studentId={student.id} coachId={coach.id} />
          <AchievementGrid all={allAchievements} earned={earned} compact />

          {/* Feedback history */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-bold text-gray-900 mb-3">Feedback History</h3>
            <div className="space-y-3">
              {allFeedback.slice(0, 4).map(fb => (
                <CoachFeedback key={fb.id} feedback={fb} />
              ))}
              {allFeedback.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-4">No feedback given yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
