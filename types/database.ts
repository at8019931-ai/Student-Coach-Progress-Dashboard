export type UserRole = 'student' | 'coach' | 'admin' | 'parent'
export type StudentLevel = 'beginner' | 'intermediate' | 'advanced'
export type ClassType = 'group' | 'individual' | 'tournament'
export type ClassStatus = 'scheduled' | 'completed' | 'cancelled'
export type AttendanceStatus = 'present' | 'absent' | 'late'
export type AssignmentStatus = 'pending' | 'submitted' | 'graded' | 'overdue'
export type TaskType = 'class' | 'puzzles' | 'games' | 'analysis' | 'lesson' | 'assignment'
export type NotificationType = 'achievement' | 'feedback' | 'class' | 'assignment' | 'goal' | 'system'
export type AchievementTrigger = 'rating' | 'puzzles' | 'classes' | 'games' | 'attendance' | 'custom'
export type LessonStatus = 'todo' | 'in_progress' | 'completed'

export interface Profile {
  id: string
  email: string
  full_name: string
  role: UserRole
  avatar_url: string | null
  phone: string | null
  created_at: string
  updated_at: string
}

export interface Coach {
  id: string
  user_id: string
  specialization: string | null
  bio: string | null
  max_students: number
  is_active: boolean
  created_at: string
  // joined
  profile?: Profile
}

export interface Student {
  id: string
  user_id: string
  coach_id: string | null
  joining_rating: number
  current_rating: number
  level: StudentLevel
  join_date: string
  is_active: boolean
  created_at: string
  updated_at: string
  // joined
  profile?: Profile
  coach?: Coach & { profile?: Profile }
}

export interface Class {
  id: string
  coach_id: string
  title: string
  description: string | null
  class_type: ClassType
  scheduled_at: string
  duration_mins: number
  join_url: string | null
  recording_url: string | null
  status: ClassStatus
  max_students: number | null
  created_at: string
  // joined
  coach?: Coach & { profile?: Profile }
}

export interface Attendance {
  id: string
  student_id: string
  class_id: string
  status: AttendanceStatus
  marked_at: string
  notes: string | null
  // joined
  class?: Class
}

export interface Assignment {
  id: string
  coach_id: string
  student_id: string | null
  title: string
  description: string | null
  due_date: string
  level_target: StudentLevel | null
  attachment_url: string | null
  created_at: string
  // joined
  submission?: Submission
}

export interface Submission {
  id: string
  assignment_id: string
  student_id: string
  status: AssignmentStatus
  content: string | null
  file_url: string | null
  grade: number | null
  coach_notes: string | null
  submitted_at: string | null
  graded_at: string | null
  created_at: string
}

export interface DailyTask {
  id: string
  student_id: string
  task_date: string
  task_type: TaskType
  title: string
  description: string | null
  target_count: number
  completed_count: number
  is_completed: boolean
  completed_at: string | null
  created_at: string
}

export interface MonthlyGoal {
  id: string
  student_id: string
  coach_id: string
  month: string
  target_rating: number | null
  target_puzzles: number | null
  target_classes: number | null
  target_games: number | null
  notes: string | null
  created_at: string
  updated_at: string
}

export interface Achievement {
  id: string
  name: string
  description: string
  badge_icon: string
  badge_color: string
  trigger_type: AchievementTrigger
  trigger_value: number | null
  points: number
  is_active: boolean
  created_at: string
}

export interface StudentAchievement {
  id: string
  student_id: string
  achievement_id: string
  earned_at: string
  achievement?: Achievement
}

export interface Feedback {
  id: string
  coach_id: string
  student_id: string
  content: string
  strengths: string[]
  improvements: string[]
  class_id: string | null
  created_at: string
  coach?: Coach & { profile?: Profile }
}

export interface RatingHistory {
  id: string
  student_id: string
  rating: number
  recorded_at: string
  source: string
  notes: string | null
}

export interface Lesson {
  id: string
  title: string
  description: string | null
  level: StudentLevel
  sequence_order: number
  prerequisite_id: string | null
  resource_url: string | null
  estimated_mins: number
  created_at: string
}

export interface StudentLesson {
  id: string
  student_id: string
  lesson_id: string
  status: LessonStatus
  started_at: string | null
  completed_at: string | null
  lesson?: Lesson
}

export interface Notification {
  id: string
  user_id: string
  type: NotificationType
  title: string
  message: string
  link: string | null
  is_read: boolean
  created_at: string
}

// ── Computed / view types ──────────────────────────────────

export interface StudentDashboard {
  student: Student
  todayTasks: DailyTask[]
  upcomingClasses: Class[]
  currentGoal: MonthlyGoal | null
  goalProgress: GoalProgress | null
  recentFeedback: Feedback | null
  achievements: StudentAchievement[]
  roadmap: StudentLesson[]
  ratingHistory: RatingHistory[]
  attendancePct: number
  pendingAssignments: Assignment[]
}

export interface GoalProgress {
  rating: { current: number; target: number; pct: number }
  puzzles: { current: number; target: number; pct: number }
  classes: { current: number; target: number; pct: number }
  games: { current: number; target: number; pct: number }
}

export interface CoachStudentSummary {
  student: Student
  attendancePct: number
  taskCompletionPct: number
  lastActivity: string | null
  needsAttention: boolean
}
