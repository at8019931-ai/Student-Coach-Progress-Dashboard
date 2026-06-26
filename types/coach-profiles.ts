// ─────────────────────────────────────────────────────────────────────────────
// Coach Profile Automation System — TypeScript types
// Mirrors the shape produced by migration 004_coach_profiles.sql
// ─────────────────────────────────────────────────────────────────────────────

export type ProfileStatus = 'draft' | 'pending_review' | 'published' | 'archived'
export type ChangeSource   = 'form_submission' | 'manual_edit' | 'ai_generation' | 'admin_action'

// ─── Core profile row ─────────────────────────────────────────────────────────
export interface CoachProfile {
  id: string
  coach_id: string

  // Display
  display_name:    string | null
  title:           string | null
  headline:        string | null
  location:        string | null

  // Ratings
  fide_rating:       number | null
  rapid_rating:      number | null
  blitz_rating:      number | null
  peak_rating:       number | null
  fide_id:           string | null
  lichess_username:  string | null
  chess_com_username:string | null

  // Experience
  years_coaching: number | null
  years_playing:  number | null

  // AI-generated content
  short_bio:           string | null
  full_bio:            string | null
  coaching_philosophy: string | null
  key_highlights:      string[]
  parent_intro:        string | null
  website_summary:     string | null

  // Metadata arrays
  specializations: string[]
  languages:       string[]
  certifications:  Certification[]
  tournaments:     Tournament[]
  achievements:    CoachAchievement[]
  teaching_formats:TeachingFormat[]

  // Photo
  primary_photo_url: string | null
  photo_drive_id:    string | null
  photo_metadata:    PhotoMetadata

  // Lifecycle
  profile_status: ProfileStatus
  is_public:      boolean
  published_at:   string | null

  // Form linkage
  form_submission_id: string | null
  raw_form_data:      Record<string, unknown>

  // AI audit
  ai_generated_at:     string | null
  ai_model_used:       string | null
  ai_generation_count: number

  // Timestamps
  created_at: string
  updated_at: string
}

// ─── Nested JSON types ────────────────────────────────────────────────────────
export interface Certification {
  name:         string
  issuer:       string
  year:         number | null
  description?: string
}

export interface Tournament {
  name:     string
  year:     number | null
  result:   string        // "1st place", "Runner-up", "Top 10", etc.
  location?: string
}

export interface CoachAchievement {
  title:       string
  description: string
  year?:       number | null
}

export interface TeachingFormat {
  format: 'group' | 'individual' | 'online' | 'hybrid' | 'camp'
  details?: string
}

export interface PhotoMetadata {
  original_filename?: string
  drive_url?:         string
  width?:             number
  height?:            number
  size_bytes?:        number
  processed_at?:      string
  error?:             string
}

// ─── Version history ─────────────────────────────────────────────────────────
export interface CoachProfileVersion {
  id:               string
  coach_profile_id: string
  version_number:   number
  changed_fields:   string[]
  snapshot_before:  Partial<CoachProfile>
  snapshot_after:   Partial<CoachProfile>
  changed_by:       string | null
  change_source:    ChangeSource
  change_summary:   string | null
  created_at:       string
}

// ─── Form submission ──────────────────────────────────────────────────────────
export interface FormSubmission {
  id:               string
  submission_id:    string
  form_type:        string
  raw_data:         RawFormData
  processed:        boolean
  coach_profile_id: string | null
  error_message:    string | null
  retry_count:      number
  processed_at:     string | null
  created_at:       string
}

// Shape of data arriving from Google Forms via Apps Script webhook
export interface RawFormData {
  submissionId:        string
  timestamp:           string
  // Personal
  fullName:            string
  email:               string
  phone?:              string
  location?:           string
  // Profile
  title?:              string
  headline?:           string
  bio?:                string
  coachingPhilosophy?: string
  // Ratings
  fideRating?:         string
  rapidRating?:        string
  blitzRating?:        string
  peakRating?:         string
  fideId?:             string
  lichessUsername?:    string
  chessComUsername?:   string
  // Experience
  yearsCoaching?:      string
  yearsPlaying?:       string
  // Metadata (comma-separated strings)
  specializations?:    string
  languages?:          string
  teachingFormats?:    string
  // Achievements (free-text JSON or multi-line)
  certifications?:     string
  tournaments?:        string
  achievements?:       string
  // Photo
  photoDriveId?:       string   // Google Drive file ID from the Form upload field
  photoDriveUrl?:      string
  // Extra fields
  [key: string]: unknown
}

// ─── Admin notification ───────────────────────────────────────────────────────
export type NotificationEventType =
  | 'profile_created'
  | 'profile_updated'
  | 'generation_failed'
  | 'photo_missing'
  | 'photo_processed'
  | 'profile_published'
  | 'duplicate_detected'

export interface AdminNotification {
  id:               string
  type:             NotificationEventType
  coach_profile_id: string | null
  title:            string
  message:          string
  metadata:         Record<string, unknown>
  is_read:          boolean
  created_at:       string
}

// ─── AI generation ────────────────────────────────────────────────────────────
export interface AIGenerationInput {
  fullName:           string
  title?:             string | null
  location?:          string | null
  yearsCoaching?:     number | null
  yearsPlaying?:      number | null
  fideRating?:        number | null
  rapidRating?:       number | null
  blitzRating?:       number | null
  peakRating?:        number | null
  fideId?:            string | null
  lichessUsername?:   string | null
  chessComUsername?:  string | null
  specializations:    string[]
  languages:          string[]
  certifications:     Certification[]
  tournaments:        Tournament[]
  achievements:       CoachAchievement[]
  teachingFormats:    TeachingFormat[]
  rawBio?:            string | null
  rawPhilosophy?:     string | null
}

export interface AIGeneratedContent {
  short_bio:           string
  full_bio:            string
  coaching_philosophy: string
  key_highlights:      string[]
  parent_intro:        string
  website_summary:     string
}

// ─── API response shapes ─────────────────────────────────────────────────────
export interface CoachProfileWithMeta extends CoachProfile {
  // Joined from the coaches + profiles tables
  coach_email?:        string | null
  coach_display_name?: string | null
  coach_is_active?:    boolean
  version_count?:      number
}

export interface AdminDashboardStats {
  total:           number
  published:       number
  draft:           number
  pending_review:  number
  missing_photo:   number
  needs_ai:        number
  recent_updates:  CoachProfileWithMeta[]
  unread_notifications: number
}

// ─── Webhook payload from Google Apps Script ─────────────────────────────────
export interface WebhookPayload {
  secret:     string
  event:      'form_submission' | 'form_edit'
  data:       RawFormData
  spreadsheet_id?: string
  row_number?:     number
}

// ─── Export formats ───────────────────────────────────────────────────────────
export type ExportFormat = 'json' | 'html' | 'pdf'

export interface ExportOptions {
  format:    ExportFormat
  includePhoto?: boolean
  includeRawData?: boolean
}
