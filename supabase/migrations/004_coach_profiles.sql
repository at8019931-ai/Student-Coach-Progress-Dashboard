-- ─────────────────────────────────────────────────────────────────────────────
-- Migration 004: Coach Profile Automation System
-- Extends the existing coaches table with full profile data, version history,
-- photo management, form submissions log, and admin notifications.
-- ─────────────────────────────────────────────────────────────────────────────

-- Profile status enum
DO $$ BEGIN
  CREATE TYPE profile_status AS ENUM ('draft', 'pending_review', 'published', 'archived');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Change source enum (tracks what triggered a version snapshot)
DO $$ BEGIN
  CREATE TYPE change_source AS ENUM ('form_submission', 'manual_edit', 'ai_generation', 'admin_action');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ─── Extended coach profile ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS coach_profiles (
  id                   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  coach_id             UUID NOT NULL UNIQUE REFERENCES coaches(id) ON DELETE CASCADE,

  -- Display information
  display_name         TEXT,
  title                TEXT,                  -- "FIDE Master", "National Master", etc.
  headline             TEXT,                  -- one-line tagline shown on cards
  location             TEXT,

  -- Ratings
  fide_rating          INTEGER,
  rapid_rating         INTEGER,
  blitz_rating         INTEGER,
  peak_rating          INTEGER,
  fide_id              TEXT,
  lichess_username     TEXT,
  chess_com_username   TEXT,

  -- Experience
  years_coaching       INTEGER,
  years_playing        INTEGER,

  -- AI-generated profile content (never hallucinated — based only on form data)
  short_bio            TEXT,                  -- 2–3 sentence overview
  full_bio             TEXT,                  -- comprehensive biography
  coaching_philosophy  TEXT,                  -- teaching approach paragraph
  key_highlights       TEXT[]  DEFAULT '{}',  -- 4–6 bullet points
  parent_intro         TEXT,                  -- parent-facing introduction
  website_summary      TEXT,                  -- SEO-optimised blurb

  -- Specialisations (e.g. "Opening Theory", "Endgame Technique")
  specializations      TEXT[]  DEFAULT '{}',

  -- Languages the coach teaches in
  languages            TEXT[]  DEFAULT '{}',

  -- Structured metadata (JSON arrays)
  certifications       JSONB   NOT NULL DEFAULT '[]',
  tournaments          JSONB   NOT NULL DEFAULT '[]',
  achievements         JSONB   NOT NULL DEFAULT '[]',
  teaching_formats     JSONB   NOT NULL DEFAULT '[]',  -- group / individual / online / hybrid

  -- Photo management
  primary_photo_url    TEXT,
  photo_drive_id       TEXT,                  -- Google Drive file ID
  photo_metadata       JSONB   NOT NULL DEFAULT '{}',

  -- Profile lifecycle
  profile_status       profile_status NOT NULL DEFAULT 'draft',
  is_public            BOOLEAN        NOT NULL DEFAULT false,
  published_at         TIMESTAMPTZ,

  -- Google Form source link
  form_submission_id   TEXT UNIQUE,
  raw_form_data        JSONB NOT NULL DEFAULT '{}',

  -- AI generation audit
  ai_generated_at      TIMESTAMPTZ,
  ai_model_used        TEXT,
  ai_generation_count  INTEGER NOT NULL DEFAULT 0,

  -- Standard timestamps
  created_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_coach_profiles_coach_id      ON coach_profiles(coach_id);
CREATE INDEX IF NOT EXISTS idx_coach_profiles_status        ON coach_profiles(profile_status);
CREATE INDEX IF NOT EXISTS idx_coach_profiles_is_public     ON coach_profiles(is_public);
CREATE INDEX IF NOT EXISTS idx_coach_profiles_form_sub      ON coach_profiles(form_submission_id);

-- ─── Version history ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS coach_profile_versions (
  id                 UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  coach_profile_id   UUID NOT NULL REFERENCES coach_profiles(id) ON DELETE CASCADE,
  version_number     INTEGER NOT NULL,
  changed_fields     TEXT[]  NOT NULL DEFAULT '{}',
  snapshot_before    JSONB   NOT NULL,          -- full row before the change
  snapshot_after     JSONB   NOT NULL,          -- full row after the change
  changed_by         TEXT,                      -- email / "system" / "webhook"
  change_source      change_source NOT NULL DEFAULT 'manual_edit',
  change_summary     TEXT,                      -- human-readable description
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now(),

  UNIQUE (coach_profile_id, version_number)
);

CREATE INDEX IF NOT EXISTS idx_cpv_profile_id ON coach_profile_versions(coach_profile_id);

-- ─── Google Form submissions log ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS form_submissions (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  submission_id     TEXT NOT NULL UNIQUE,        -- unique key from the Google Sheet row
  form_type         TEXT NOT NULL DEFAULT 'coach_profile',
  raw_data          JSONB NOT NULL,
  processed         BOOLEAN NOT NULL DEFAULT false,
  coach_profile_id  UUID REFERENCES coach_profiles(id) ON DELETE SET NULL,
  error_message     TEXT,
  retry_count       INTEGER NOT NULL DEFAULT 0,
  processed_at      TIMESTAMPTZ,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_form_submissions_processed ON form_submissions(processed);
CREATE INDEX IF NOT EXISTS idx_form_submissions_type      ON form_submissions(form_type);

-- ─── Admin notifications ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS admin_notifications (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type              TEXT NOT NULL,              -- 'profile_created' | 'profile_updated' | 'generation_failed' | 'photo_missing'
  coach_profile_id  UUID REFERENCES coach_profiles(id) ON DELETE CASCADE,
  title             TEXT NOT NULL,
  message           TEXT NOT NULL,
  metadata          JSONB NOT NULL DEFAULT '{}',
  is_read           BOOLEAN NOT NULL DEFAULT false,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_admin_notifications_read    ON admin_notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_admin_notifications_type    ON admin_notifications(type);
CREATE INDEX IF NOT EXISTS idx_admin_notifications_profile ON admin_notifications(coach_profile_id);

-- ─── Auto-update updated_at ──────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_coach_profile_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_coach_profiles_updated_at ON coach_profiles;
CREATE TRIGGER trg_coach_profiles_updated_at
  BEFORE UPDATE ON coach_profiles
  FOR EACH ROW EXECUTE FUNCTION update_coach_profile_updated_at();

-- ─── Auto-create version snapshot on update ──────────────────────────────────
CREATE OR REPLACE FUNCTION create_coach_profile_version()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
DECLARE
  v_next_version INTEGER;
  v_changed      TEXT[] := '{}';
  v_key          TEXT;
  v_before       JSONB;
  v_after        JSONB;
BEGIN
  -- Only snapshot meaningful field changes (skip timestamps and counters)
  v_before := to_jsonb(OLD) - ARRAY['updated_at','ai_generation_count'];
  v_after  := to_jsonb(NEW) - ARRAY['updated_at','ai_generation_count'];

  IF v_before = v_after THEN
    RETURN NEW;
  END IF;

  -- Collect changed fields
  FOR v_key IN SELECT jsonb_object_keys(v_after) LOOP
    IF (v_before->v_key) IS DISTINCT FROM (v_after->v_key) THEN
      v_changed := array_append(v_changed, v_key);
    END IF;
  END LOOP;

  -- Get next version number
  SELECT COALESCE(MAX(version_number), 0) + 1
    INTO v_next_version
    FROM coach_profile_versions
   WHERE coach_profile_id = NEW.id;

  INSERT INTO coach_profile_versions
    (coach_profile_id, version_number, changed_fields, snapshot_before, snapshot_after)
  VALUES
    (NEW.id, v_next_version, v_changed, to_jsonb(OLD), to_jsonb(NEW));

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_coach_profile_versioning ON coach_profiles;
CREATE TRIGGER trg_coach_profile_versioning
  AFTER UPDATE ON coach_profiles
  FOR EACH ROW EXECUTE FUNCTION create_coach_profile_version();

-- ─── Convenience view: public profiles with coach & user info ─────────────────
CREATE OR REPLACE VIEW public_coach_profiles AS
SELECT
  cp.*,
  c.user_id,
  c.specialization       AS coach_specialization,
  c.max_students,
  c.is_active            AS coach_is_active
FROM coach_profiles cp
JOIN coaches c ON c.id = cp.coach_id
WHERE cp.is_public = true
  AND cp.profile_status = 'published';

-- ─── Seed: create draft profiles for existing coaches with no profile yet ─────
INSERT INTO coach_profiles (coach_id)
SELECT id FROM coaches
WHERE id NOT IN (SELECT coach_id FROM coach_profiles)
ON CONFLICT DO NOTHING;
