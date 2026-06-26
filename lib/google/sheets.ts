// ─────────────────────────────────────────────────────────────────────────────
// Google Sheets integration — read coach profile form responses
//
// Google Forms writes responses to a linked Google Sheet.
// This module reads that sheet to backfill or re-sync submissions.
//
// Requires:
//   GOOGLE_CLIENT_EMAIL          — service account email
//   GOOGLE_PRIVATE_KEY           — service account private key
//   GOOGLE_FORMS_SPREADSHEET_ID  — Sheet ID linked to the Google Form
// ─────────────────────────────────────────────────────────────────────────────

import { google } from 'googleapis'
import type { RawFormData } from '@/types/coach-profiles'

// ─── Auth ─────────────────────────────────────────────────────────────────────
function getSheetsClient() {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')

  if (!process.env.GOOGLE_CLIENT_EMAIL || !privateKey) {
    throw new Error('Missing GOOGLE_CLIENT_EMAIL or GOOGLE_PRIVATE_KEY env vars')
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key:  privateKey,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  })

  return google.sheets({ version: 'v4', auth })
}

// ─── Read all rows ────────────────────────────────────────────────────────────
export interface SheetRow {
  rowIndex:   number   // 1-based row in the sheet (row 1 = headers)
  timestamp:  string
  values:     Record<string, string>
  rawData:    RawFormData
}

export async function readFormResponses(
  spreadsheetId?: string,
  sheetName = 'Form Responses 1',
): Promise<SheetRow[]> {
  const sheets   = getSheetsClient()
  const targetId = spreadsheetId ?? process.env.GOOGLE_FORMS_SPREADSHEET_ID

  if (!targetId) throw new Error('Missing GOOGLE_FORMS_SPREADSHEET_ID env var')

  const { data } = await sheets.spreadsheets.values.get({
    spreadsheetId: targetId,
    range:         `'${sheetName}'!A:ZZ`,
  })

  const rows = data.values ?? []
  if (rows.length < 2) return []    // only header row or empty

  const headers = rows[0].map((h: string) => String(h).trim())
  const results: SheetRow[] = []

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i]
    const values: Record<string, string> = {}

    headers.forEach((header, j) => {
      values[header] = String(row[j] ?? '').trim()
    })

    const rowIndex = i + 1  // sheet row number (1-based, row 1 = headers)
    const rawData  = mapSheetRowToFormData(values, rowIndex, targetId)

    results.push({
      rowIndex,
      timestamp: values['Timestamp'] ?? new Date().toISOString(),
      values,
      rawData,
    })
  }

  return results
}

// ─── Map sheet columns to RawFormData ────────────────────────────────────────
// Column names match the Google Form question labels.
// Update this mapping to match your actual Form question text.
function mapSheetRowToFormData(
  values: Record<string, string>,
  rowIndex: number,
  spreadsheetId: string,
): RawFormData {
  const submissionId = `sheet_${spreadsheetId}_row_${rowIndex}`

  const get = (key: string) => values[key]?.trim() || undefined

  return {
    submissionId,
    timestamp:           values['Timestamp'] ?? new Date().toISOString(),

    // Personal
    fullName:            get('Full Name') ?? get('Name') ?? 'Unknown',
    email:               get('Email Address') ?? get('Email') ?? '',
    phone:               get('Phone Number') ?? get('Phone'),
    location:            get('Location') ?? get('City'),

    // Profile
    title:               get('Title / Designation') ?? get('Title'),
    headline:            get('One-Line Tagline') ?? get('Headline'),
    bio:                 get('Short Bio') ?? get('Bio'),
    coachingPhilosophy:  get('Coaching Philosophy'),

    // Ratings
    fideRating:          get('FIDE Classical Rating') ?? get('FIDE Rating'),
    rapidRating:         get('Rapid Rating'),
    blitzRating:         get('Blitz Rating'),
    peakRating:          get('Peak Rating'),
    fideId:              get('FIDE ID'),
    lichessUsername:     get('Lichess Username'),
    chessComUsername:    get('Chess.com Username'),

    // Experience
    yearsCoaching:       get('Years of Coaching Experience') ?? get('Years Coaching'),
    yearsPlaying:        get('Years Playing Chess') ?? get('Years Playing'),

    // Arrays (comma-separated in the form)
    specializations:     get('Specializations') ?? get('Areas of Specialization'),
    languages:           get('Languages Spoken') ?? get('Languages'),
    teachingFormats:     get('Teaching Formats') ?? get('Format'),

    // Achievements (free-text)
    certifications:      get('Certifications'),
    tournaments:         get('Notable Tournaments / Results'),
    achievements:        get('Key Achievements'),

    // Photo
    photoDriveId:        extractDriveId(get('Profile Photo') ?? get('Photo')),
    photoDriveUrl:       get('Profile Photo') ?? get('Photo'),
  }
}

// ─── Extract Drive file ID from a Drive URL ───────────────────────────────────
function extractDriveId(urlOrId?: string): string | undefined {
  if (!urlOrId) return undefined
  // Already a bare ID (no slashes)
  if (!urlOrId.includes('/')) return urlOrId
  // https://drive.google.com/open?id=FILE_ID
  const openMatch = urlOrId.match(/[?&]id=([a-zA-Z0-9_-]+)/)
  if (openMatch) return openMatch[1]
  // https://drive.google.com/file/d/FILE_ID/view
  const fileMatch = urlOrId.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)
  if (fileMatch) return fileMatch[1]
  return undefined
}

// ─── Fetch a single row by index ─────────────────────────────────────────────
export async function readSingleRow(
  rowIndex: number,
  spreadsheetId?: string,
  sheetName = 'Form Responses 1',
): Promise<SheetRow | null> {
  const all = await readFormResponses(spreadsheetId, sheetName)
  return all.find(r => r.rowIndex === rowIndex) ?? null
}
