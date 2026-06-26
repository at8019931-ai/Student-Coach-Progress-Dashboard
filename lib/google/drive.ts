// ─────────────────────────────────────────────────────────────────────────────
// Google Drive integration — download and manage coach photos
//
// Requires environment variables:
//   GOOGLE_CLIENT_EMAIL   — service account email
//   GOOGLE_PRIVATE_KEY    — service account private key (with \n as newlines)
//   GOOGLE_DRIVE_FOLDER_ID — the shared Drive folder where coaches upload photos
// ─────────────────────────────────────────────────────────────────────────────

import { google } from 'googleapis'
import { Readable } from 'stream'
import path from 'path'
import fs from 'fs/promises'

// ─── Auth ─────────────────────────────────────────────────────────────────────
function getDriveClient() {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')

  if (!process.env.GOOGLE_CLIENT_EMAIL || !privateKey) {
    throw new Error('Missing GOOGLE_CLIENT_EMAIL or GOOGLE_PRIVATE_KEY env vars')
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key:  privateKey,
    },
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  })

  return google.drive({ version: 'v3', auth })
}

// ─── File metadata ────────────────────────────────────────────────────────────
export interface DriveFileInfo {
  id:           string
  name:         string
  mimeType:     string
  size:         number
  webViewLink:  string | null
  createdTime:  string | null
}

export async function getDriveFileInfo(fileId: string): Promise<DriveFileInfo | null> {
  try {
    const drive = getDriveClient()
    const { data } = await drive.files.get({
      fileId,
      fields: 'id,name,mimeType,size,webViewLink,createdTime',
    })

    return {
      id:          data.id ?? fileId,
      name:        data.name ?? 'unknown',
      mimeType:    data.mimeType ?? 'application/octet-stream',
      size:        Number(data.size ?? 0),
      webViewLink: data.webViewLink ?? null,
      createdTime: data.createdTime ?? null,
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error(`[Drive] Failed to get file info for ${fileId}:`, message)
    return null
  }
}

// ─── Download photo ───────────────────────────────────────────────────────────
const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
])

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10 MB

export interface DownloadResult {
  buffer:   Buffer
  mimeType: string
  filename: string
  size:     number
}

export async function downloadDrivePhoto(fileId: string): Promise<DownloadResult> {
  const drive = getDriveClient()

  // Fetch metadata first to validate type and size
  const info = await getDriveFileInfo(fileId)
  if (!info) throw new Error(`Drive file not found: ${fileId}`)

  if (!ALLOWED_MIME_TYPES.has(info.mimeType)) {
    throw new Error(`Unsupported file type: ${info.mimeType}. Must be JPEG, PNG, WebP, or GIF.`)
  }

  if (info.size > MAX_FILE_SIZE) {
    throw new Error(`File too large: ${(info.size / 1024 / 1024).toFixed(1)} MB (max 10 MB)`)
  }

  const response = await drive.files.get(
    { fileId, alt: 'media' },
    { responseType: 'stream' },
  )

  const chunks: Buffer[] = []
  await new Promise<void>((resolve, reject) => {
    const stream = response.data as Readable
    stream.on('data', (chunk: Buffer) => chunks.push(chunk))
    stream.on('end', resolve)
    stream.on('error', reject)
  })

  const buffer = Buffer.concat(chunks)

  return {
    buffer,
    mimeType: info.mimeType,
    filename: info.name,
    size:     buffer.length,
  }
}

// ─── Save photo to public directory ──────────────────────────────────────────
const PUBLIC_PHOTOS_DIR = path.join(process.cwd(), 'public', 'coach-photos')

export async function savePhotoLocally(
  buffer: Buffer,
  filename: string,
  coachId: string,
): Promise<string> {
  await fs.mkdir(PUBLIC_PHOTOS_DIR, { recursive: true })

  const ext      = path.extname(filename) || '.jpg'
  const safeName = `coach_${coachId}${ext}`
  const filePath = path.join(PUBLIC_PHOTOS_DIR, safeName)

  await fs.writeFile(filePath, buffer)

  // Return the public URL path
  return `/coach-photos/${safeName}`
}

// ─── List photos in a Drive folder ───────────────────────────────────────────
export async function listFolderPhotos(folderId?: string): Promise<DriveFileInfo[]> {
  const drive    = getDriveClient()
  const targetId = folderId ?? process.env.GOOGLE_DRIVE_FOLDER_ID

  if (!targetId) throw new Error('Missing GOOGLE_DRIVE_FOLDER_ID env var')

  const { data } = await drive.files.list({
    q: `'${targetId}' in parents and mimeType contains 'image/' and trashed = false`,
    fields: 'files(id,name,mimeType,size,webViewLink,createdTime)',
    pageSize: 100,
  })

  return (data.files ?? []).map(f => ({
    id:          f.id ?? '',
    name:        f.name ?? '',
    mimeType:    f.mimeType ?? '',
    size:        Number(f.size ?? 0),
    webViewLink: f.webViewLink ?? null,
    createdTime: f.createdTime ?? null,
  }))
}
