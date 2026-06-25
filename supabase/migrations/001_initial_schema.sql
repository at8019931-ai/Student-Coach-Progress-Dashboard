-- ============================================================
-- CircleChess Student Success Platform — PostgreSQL Schema
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─────────────────────────────────────────
-- ENUMS
-- ─────────────────────────────────────────
CREATE TYPE user_role AS ENUM ('student', 'coach', 'admin', 'parent');
CREATE TYPE student_level AS ENUM ('beginner', 'intermediate', 'advanced');
CREATE TYPE class_type AS ENUM ('group', 'individual', 'tournament');
CREATE TYPE class_status AS ENUM ('scheduled', 'completed', 'cancelled');
CREATE TYPE attendance_status AS ENUM ('present', 'absent', 'late');
CREATE TYPE assignment_status AS ENUM ('pending', 'submitted', 'graded', 'overdue');
CREATE TYPE task_type AS ENUM ('class', 'puzzles', 'games', 'analysis', 'lesson', 'assignment');
CREATE TYPE notification_type AS ENUM ('achievement', 'feedback', 'class', 'assignment', 'goal', 'system');
CREATE TYPE achievement_trigger AS ENUM ('rating', 'puzzles', 'classes', 'games', 'attendance', 'custom');
CREATE TYPE lesson_status AS ENUM ('todo', 'in_progress', 'completed');

-- ─────────────────────────────────────────
-- PROFILES (extends Supabase auth.users)
-- ─────────────────────────────────────────
CREATE TABLE profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email       TEXT UNIQUE NOT NULL,
  full_name   TEXT NOT NULL,
  role        user_role NOT NULL DEFAULT 'student',
  avatar_url  TEXT,
  phone       TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_profiles_role ON profiles(role);

-- ─────────────────────────────────────────
-- COACHES
-- ─────────────────────────────────────────
CREATE TABLE coaches (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id          UUID NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
  specialization   TEXT,
  bio              TEXT,
  max_students     INT NOT NULL DEFAULT 20,
  is_active        BOOLEAN NOT NULL DEFAULT true,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_coaches_user_id ON coaches(user_id);

-- ─────────────────────────────────────────
-- STUDENTS
-- ─────────────────────────────────────────
CREATE TABLE students (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id          UUID NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
  coach_id         UUID REFERENCES coaches(id) ON DELETE SET NULL,
  joining_rating   INT NOT NULL DEFAULT 0,
  current_rating   INT NOT NULL DEFAULT 0,
  level            student_level NOT NULL DEFAULT 'beginner',
  join_date        DATE NOT NULL DEFAULT CURRENT_DATE,
  is_active        BOOLEAN NOT NULL DEFAULT true,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_students_coach_id ON students(coach_id);
CREATE INDEX idx_students_level ON students(level);
CREATE INDEX idx_students_user_id ON students(user_id);

-- ─────────────────────────────────────────
-- CLASSES
-- ─────────────────────────────────────────
CREATE TABLE classes (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  coach_id         UUID NOT NULL REFERENCES coaches(id) ON DELETE CASCADE,
  title            TEXT NOT NULL,
  description      TEXT,
  class_type       class_type NOT NULL DEFAULT 'group',
  scheduled_at     TIMESTAMPTZ NOT NULL,
  duration_mins    INT NOT NULL DEFAULT 60,
  join_url         TEXT,
  recording_url    TEXT,
  status           class_status NOT NULL DEFAULT 'scheduled',
  max_students     INT,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_classes_coach_id ON classes(coach_id);
CREATE INDEX idx_classes_scheduled_at ON classes(scheduled_at);
CREATE INDEX idx_classes_status ON classes(status);

-- Junction: which students are enrolled in which classes
CREATE TABLE class_enrollments (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  class_id    UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  student_id  UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(class_id, student_id)
);

CREATE INDEX idx_enrollments_student_id ON class_enrollments(student_id);

-- ─────────────────────────────────────────
-- ATTENDANCE
-- ─────────────────────────────────────────
CREATE TABLE attendance (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id  UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  class_id    UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  status      attendance_status NOT NULL DEFAULT 'absent',
  marked_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  notes       TEXT,
  UNIQUE(student_id, class_id)
);

CREATE INDEX idx_attendance_student_id ON attendance(student_id);
CREATE INDEX idx_attendance_class_id ON attendance(class_id);

-- ─────────────────────────────────────────
-- ASSIGNMENTS
-- ─────────────────────────────────────────
CREATE TABLE assignments (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  coach_id       UUID NOT NULL REFERENCES coaches(id) ON DELETE CASCADE,
  -- null = assigned to all students of this coach at given level
  student_id     UUID REFERENCES students(id) ON DELETE CASCADE,
  title          TEXT NOT NULL,
  description    TEXT,
  due_date       DATE NOT NULL,
  level_target   student_level,
  attachment_url TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_assignments_coach_id ON assignments(coach_id);
CREATE INDEX idx_assignments_student_id ON assignments(student_id);
CREATE INDEX idx_assignments_due_date ON assignments(due_date);

-- ─────────────────────────────────────────
-- SUBMISSIONS
-- ─────────────────────────────────────────
CREATE TABLE submissions (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  assignment_id   UUID NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
  student_id      UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  status          assignment_status NOT NULL DEFAULT 'pending',
  content         TEXT,
  file_url        TEXT,
  grade           INT CHECK (grade BETWEEN 0 AND 100),
  coach_notes     TEXT,
  submitted_at    TIMESTAMPTZ,
  graded_at       TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(assignment_id, student_id)
);

CREATE INDEX idx_submissions_student_id ON submissions(student_id);
CREATE INDEX idx_submissions_status ON submissions(status);

-- ─────────────────────────────────────────
-- DAILY TASKS
-- ─────────────────────────────────────────
CREATE TABLE daily_tasks (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id       UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  task_date        DATE NOT NULL DEFAULT CURRENT_DATE,
  task_type        task_type NOT NULL,
  title            TEXT NOT NULL,
  description      TEXT,
  target_count     INT NOT NULL DEFAULT 1,
  completed_count  INT NOT NULL DEFAULT 0,
  is_completed     BOOLEAN NOT NULL DEFAULT false,
  completed_at     TIMESTAMPTZ,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(student_id, task_date, task_type)
);

CREATE INDEX idx_daily_tasks_student_date ON daily_tasks(student_id, task_date);

-- ─────────────────────────────────────────
-- MONTHLY GOALS (coach sets per student)
-- ─────────────────────────────────────────
CREATE TABLE monthly_goals (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id        UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  coach_id          UUID NOT NULL REFERENCES coaches(id) ON DELETE CASCADE,
  month             DATE NOT NULL, -- stored as first day of month
  target_rating     INT,
  target_puzzles    INT,
  target_classes    INT,
  target_games      INT,
  notes             TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(student_id, month)
);

CREATE INDEX idx_goals_student_month ON monthly_goals(student_id, month);

-- ─────────────────────────────────────────
-- ACHIEVEMENTS CATALOG
-- ─────────────────────────────────────────
CREATE TABLE achievements (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name            TEXT NOT NULL UNIQUE,
  description     TEXT NOT NULL,
  badge_icon      TEXT NOT NULL DEFAULT '🏆',
  badge_color     TEXT NOT NULL DEFAULT '#f59e0b',
  trigger_type    achievement_trigger NOT NULL,
  trigger_value   INT,
  points          INT NOT NULL DEFAULT 10,
  is_active       BOOLEAN NOT NULL DEFAULT true,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─────────────────────────────────────────
-- STUDENT ACHIEVEMENTS (earned)
-- ─────────────────────────────────────────
CREATE TABLE student_achievements (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id      UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  achievement_id  UUID NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
  earned_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(student_id, achievement_id)
);

CREATE INDEX idx_student_achievements_student ON student_achievements(student_id);

-- ─────────────────────────────────────────
-- FEEDBACK (coach → student)
-- ─────────────────────────────────────────
CREATE TABLE feedback (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  coach_id     UUID NOT NULL REFERENCES coaches(id) ON DELETE CASCADE,
  student_id   UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  content      TEXT NOT NULL,
  strengths    TEXT[] DEFAULT '{}',
  improvements TEXT[] DEFAULT '{}',
  class_id     UUID REFERENCES classes(id) ON DELETE SET NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_feedback_student_id ON feedback(student_id);
CREATE INDEX idx_feedback_created_at ON feedback(created_at DESC);

-- ─────────────────────────────────────────
-- RATING HISTORY
-- ─────────────────────────────────────────
CREATE TABLE rating_history (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id   UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  rating       INT NOT NULL,
  recorded_at  DATE NOT NULL DEFAULT CURRENT_DATE,
  source       TEXT NOT NULL DEFAULT 'manual', -- manual | lichess
  notes        TEXT
);

CREATE INDEX idx_rating_student_date ON rating_history(student_id, recorded_at DESC);

-- ─────────────────────────────────────────
-- LESSONS / CURRICULUM (roadmap topics)
-- ─────────────────────────────────────────
CREATE TABLE lessons (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title            TEXT NOT NULL,
  description      TEXT,
  level            student_level NOT NULL,
  sequence_order   INT NOT NULL,
  prerequisite_id  UUID REFERENCES lessons(id) ON DELETE SET NULL,
  resource_url     TEXT,
  estimated_mins   INT DEFAULT 30,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(level, sequence_order)
);

CREATE INDEX idx_lessons_level_order ON lessons(level, sequence_order);

-- ─────────────────────────────────────────
-- STUDENT LESSONS (progress through roadmap)
-- ─────────────────────────────────────────
CREATE TABLE student_lessons (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id  UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  lesson_id   UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  status      lesson_status NOT NULL DEFAULT 'todo',
  started_at  TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  UNIQUE(student_id, lesson_id)
);

CREATE INDEX idx_student_lessons_student ON student_lessons(student_id);

-- ─────────────────────────────────────────
-- NOTIFICATIONS
-- ─────────────────────────────────────────
CREATE TABLE notifications (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type        notification_type NOT NULL,
  title       TEXT NOT NULL,
  message     TEXT NOT NULL,
  link        TEXT,
  is_read     BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_notifications_user_id ON notifications(user_id, is_read, created_at DESC);

-- ─────────────────────────────────────────
-- PARENTS (Phase 2)
-- ─────────────────────────────────────────
CREATE TABLE parents (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
  student_id  UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  relation    TEXT NOT NULL DEFAULT 'parent',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_parents_student_id ON parents(student_id);

-- ─────────────────────────────────────────
-- UTILITY: auto-update updated_at
-- ─────────────────────────────────────────
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_students_updated_at
  BEFORE UPDATE ON students
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_goals_updated_at
  BEFORE UPDATE ON monthly_goals
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ─────────────────────────────────────────
-- ROW LEVEL SECURITY
-- ─────────────────────────────────────────
ALTER TABLE profiles            ENABLE ROW LEVEL SECURITY;
ALTER TABLE students            ENABLE ROW LEVEL SECURITY;
ALTER TABLE coaches             ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes             ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_enrollments   ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance          ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments         ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions         ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_tasks         ENABLE ROW LEVEL SECURITY;
ALTER TABLE monthly_goals       ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements        ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback            ENABLE ROW LEVEL SECURITY;
ALTER TABLE rating_history      ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons             ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_lessons     ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications       ENABLE ROW LEVEL SECURITY;

-- Helper: get role from JWT metadata
CREATE OR REPLACE FUNCTION auth_role()
RETURNS user_role LANGUAGE sql STABLE AS $$
  SELECT (raw_user_meta_data->>'role')::user_role
  FROM auth.users WHERE id = auth.uid()
$$;

-- Helper: get student id for current user
CREATE OR REPLACE FUNCTION my_student_id()
RETURNS UUID LANGUAGE sql STABLE AS $$
  SELECT id FROM students WHERE user_id = auth.uid() LIMIT 1
$$;

-- Helper: get coach id for current user
CREATE OR REPLACE FUNCTION my_coach_id()
RETURNS UUID LANGUAGE sql STABLE AS $$
  SELECT id FROM coaches WHERE user_id = auth.uid() LIMIT 1
$$;

-- PROFILES policies
CREATE POLICY "profiles_self_read"   ON profiles FOR SELECT USING (id = auth.uid() OR auth_role() IN ('admin','coach'));
CREATE POLICY "profiles_self_update" ON profiles FOR UPDATE USING (id = auth.uid());
CREATE POLICY "profiles_admin_all"   ON profiles FOR ALL USING (auth_role() = 'admin');

-- STUDENTS policies
CREATE POLICY "students_self_read"    ON students FOR SELECT USING (user_id = auth.uid() OR auth_role() IN ('admin','coach'));
CREATE POLICY "students_coach_update" ON students FOR UPDATE USING (coach_id = my_coach_id() OR auth_role() = 'admin');
CREATE POLICY "students_admin_insert" ON students FOR INSERT WITH CHECK (auth_role() = 'admin');

-- COACHES policies
CREATE POLICY "coaches_read_all"   ON coaches FOR SELECT USING (true);
CREATE POLICY "coaches_admin_all"  ON coaches FOR ALL USING (auth_role() = 'admin');
CREATE POLICY "coaches_self_update" ON coaches FOR UPDATE USING (user_id = auth.uid());

-- DAILY TASKS policies
CREATE POLICY "tasks_student_read"   ON daily_tasks FOR SELECT USING (student_id = my_student_id() OR auth_role() IN ('admin','coach'));
CREATE POLICY "tasks_student_update" ON daily_tasks FOR UPDATE USING (student_id = my_student_id());
CREATE POLICY "tasks_system_insert"  ON daily_tasks FOR INSERT WITH CHECK (auth_role() IN ('admin') OR auth.uid() IS NOT NULL);

-- ASSIGNMENTS policies
CREATE POLICY "assignments_coach_read"   ON assignments FOR SELECT USING (coach_id = my_coach_id() OR student_id = my_student_id() OR auth_role() = 'admin');
CREATE POLICY "assignments_coach_write"  ON assignments FOR INSERT WITH CHECK (coach_id = my_coach_id() OR auth_role() = 'admin');
CREATE POLICY "assignments_coach_update" ON assignments FOR UPDATE USING (coach_id = my_coach_id() OR auth_role() = 'admin');

-- SUBMISSIONS policies
CREATE POLICY "submissions_student_read"   ON submissions FOR SELECT USING (student_id = my_student_id() OR auth_role() IN ('admin','coach'));
CREATE POLICY "submissions_student_insert" ON submissions FOR INSERT WITH CHECK (student_id = my_student_id());
CREATE POLICY "submissions_student_update" ON submissions FOR UPDATE USING (student_id = my_student_id() OR auth_role() IN ('admin','coach'));

-- MONTHLY GOALS policies
CREATE POLICY "goals_student_read"  ON monthly_goals FOR SELECT USING (student_id = my_student_id() OR auth_role() IN ('admin','coach'));
CREATE POLICY "goals_coach_write"   ON monthly_goals FOR INSERT WITH CHECK (coach_id = my_coach_id() OR auth_role() = 'admin');
CREATE POLICY "goals_coach_update"  ON monthly_goals FOR UPDATE USING (coach_id = my_coach_id() OR auth_role() = 'admin');

-- FEEDBACK policies
CREATE POLICY "feedback_read"   ON feedback FOR SELECT USING (student_id = my_student_id() OR coach_id = my_coach_id() OR auth_role() = 'admin');
CREATE POLICY "feedback_coach_write" ON feedback FOR INSERT WITH CHECK (coach_id = my_coach_id() OR auth_role() = 'admin');

-- ACHIEVEMENTS policies
CREATE POLICY "achievements_read_all"  ON achievements FOR SELECT USING (true);
CREATE POLICY "achievements_admin_all" ON achievements FOR ALL USING (auth_role() = 'admin');

-- STUDENT ACHIEVEMENTS policies
CREATE POLICY "student_achievements_read"   ON student_achievements FOR SELECT USING (student_id = my_student_id() OR auth_role() IN ('admin','coach'));
CREATE POLICY "student_achievements_insert" ON student_achievements FOR INSERT WITH CHECK (auth_role() IN ('admin','coach') OR auth.uid() IS NOT NULL);

-- ATTENDANCE policies
CREATE POLICY "attendance_read"   ON attendance FOR SELECT USING (student_id = my_student_id() OR auth_role() IN ('admin','coach'));
CREATE POLICY "attendance_coach_write" ON attendance FOR INSERT WITH CHECK (auth_role() IN ('admin','coach'));
CREATE POLICY "attendance_coach_update" ON attendance FOR UPDATE USING (auth_role() IN ('admin','coach'));

-- RATING HISTORY policies
CREATE POLICY "rating_student_read"  ON rating_history FOR SELECT USING (student_id = my_student_id() OR auth_role() IN ('admin','coach'));
CREATE POLICY "rating_coach_write"   ON rating_history FOR INSERT WITH CHECK (auth_role() IN ('admin','coach'));

-- NOTIFICATIONS policies
CREATE POLICY "notifications_own"    ON notifications FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "notifications_update" ON notifications FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "notifications_insert" ON notifications FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- LESSONS policies
CREATE POLICY "lessons_read_all"   ON lessons FOR SELECT USING (true);
CREATE POLICY "lessons_admin_write" ON lessons FOR ALL USING (auth_role() = 'admin');

-- STUDENT LESSONS policies
CREATE POLICY "student_lessons_read"   ON student_lessons FOR SELECT USING (student_id = my_student_id() OR auth_role() IN ('admin','coach'));
CREATE POLICY "student_lessons_write"  ON student_lessons FOR ALL USING (student_id = my_student_id() OR auth_role() IN ('admin','coach'));

-- CLASSES policies
CREATE POLICY "classes_read_all"    ON classes FOR SELECT USING (true);
CREATE POLICY "classes_coach_write" ON classes FOR INSERT WITH CHECK (coach_id = my_coach_id() OR auth_role() = 'admin');
CREATE POLICY "classes_coach_update" ON classes FOR UPDATE USING (coach_id = my_coach_id() OR auth_role() = 'admin');

-- CLASS ENROLLMENTS policies
CREATE POLICY "enrollments_read"  ON class_enrollments FOR SELECT USING (student_id = my_student_id() OR auth_role() IN ('admin','coach'));
CREATE POLICY "enrollments_write" ON class_enrollments FOR ALL USING (auth_role() IN ('admin','coach'));
