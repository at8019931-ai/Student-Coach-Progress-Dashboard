-- ============================================================
-- CircleChess — Automation Triggers
-- ============================================================

-- Trigger: call check-achievements edge function when rating updated
CREATE OR REPLACE FUNCTION trigger_check_achievements()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  -- Fire and forget via pg_net (if installed) or use cron
  -- In production, call the edge function via Supabase webhooks
  PERFORM net.http_post(
    url := current_setting('app.supabase_url') || '/functions/v1/check-achievements',
    headers := jsonb_build_object(
      'Authorization', 'Bearer ' || current_setting('app.service_role_key'),
      'Content-Type', 'application/json'
    ),
    body := jsonb_build_object('student_id', NEW.student_id::text)
  );
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- Silently fail — don't block the main operation
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_rating_achievement_check
  AFTER INSERT ON rating_history
  FOR EACH ROW EXECUTE FUNCTION trigger_check_achievements();

-- ─────────────────────────────────────────
-- Supabase Cron Jobs (use pg_cron extension)
-- ─────────────────────────────────────────

-- Enable cron (if not already enabled in project settings)
-- SELECT cron.schedule(
--   'generate-daily-tasks',
--   '0 0 * * *',   -- midnight UTC
--   $$
--   SELECT net.http_post(
--     url := current_setting('app.supabase_url') || '/functions/v1/generate-daily-tasks',
--     headers := '{"Authorization": "Bearer SERVICE_ROLE_KEY", "Content-Type": "application/json"}'::jsonb,
--     body := '{}'::jsonb
--   )
--   $$
-- );

-- SELECT cron.schedule(
--   'send-overdue-notifications',
--   '0 9 * * *',   -- 9am UTC
--   $$
--   SELECT net.http_post(
--     url := current_setting('app.supabase_url') || '/functions/v1/send-notifications',
--     headers := '{"Authorization": "Bearer SERVICE_ROLE_KEY", "Content-Type": "application/json"}'::jsonb,
--     body := '{}'::jsonb
--   )
--   $$
-- );

-- ─────────────────────────────────────────
-- Computed view: student attendance percentage
-- ─────────────────────────────────────────
CREATE OR REPLACE VIEW student_attendance_summary AS
SELECT
  s.id AS student_id,
  s.user_id,
  COUNT(a.id) AS total_classes,
  COUNT(CASE WHEN a.status = 'present' THEN 1 END) AS present_count,
  CASE
    WHEN COUNT(a.id) = 0 THEN 0
    ELSE ROUND((COUNT(CASE WHEN a.status = 'present' THEN 1 END) * 100.0) / COUNT(a.id))
  END AS attendance_pct
FROM students s
LEFT JOIN attendance a ON a.student_id = s.id
GROUP BY s.id, s.user_id;

-- ─────────────────────────────────────────
-- Computed view: monthly goal progress
-- ─────────────────────────────────────────
CREATE OR REPLACE VIEW monthly_goal_progress AS
SELECT
  mg.id AS goal_id,
  mg.student_id,
  mg.month,
  mg.target_rating,
  mg.target_puzzles,
  mg.target_classes,
  mg.target_games,
  s.current_rating,
  -- Puzzles this month
  (
    SELECT COALESCE(SUM(dt.completed_count), 0)
    FROM daily_tasks dt
    WHERE dt.student_id = mg.student_id
      AND dt.task_type = 'puzzles'
      AND dt.task_date >= mg.month
      AND dt.task_date < (mg.month + INTERVAL '1 month')::DATE
      AND dt.is_completed = true
  ) AS puzzles_done,
  -- Classes attended total
  (
    SELECT COUNT(*) FROM attendance a
    WHERE a.student_id = mg.student_id AND a.status = 'present'
  ) AS classes_attended
FROM monthly_goals mg
JOIN students s ON s.id = mg.student_id;
