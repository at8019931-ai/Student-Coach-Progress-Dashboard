// ─────────────────────────────────────────────────────────────────────────────
// Coach photo processor
// Downloads from Google Drive, optionally resizes/compresses via sharp,
// and saves to the public directory.
// ─────────────────────────────────────────────────────────────────────────────

import path from 'path'
import fs from 'fs/promises'
import { downloadDrivePhoto, savePhotoLocally } from '@/lib/google/drive'
import type { PhotoMetadata } from '@/types/coach-profiles'

const TARGET_WIDTH  = 800   // px — suitable for profile photos
const TARGET_HEIGHT = 800
const JPEG_QUALITY  = 85

// ─── Process a photo from Drive ───────────────────────────────────────────────
export interface ProcessPhotoResult {
  publicUrl:    string
  metadata:     PhotoMetadata
  error?:       string
}

export async function processCoachPhoto(
  driveFileId: string,
  coachId:     string,
): Promise<ProcessPhotoResult> {
  try {
    // 1. Download from Google Drive
    const download = await downloadDrivePhoto(driveFileId)

    // 2. Compress/resize via sharp if available
    let processedBuffer = download.buffer
    let finalExt        = path.extname(download.filename) || '.jpg'

    try {
      // Dynamic import so the app still works if sharp isn't installed
      const sharp = (await import('sharp')).default
      processedBuffer = await sharp(download.buffer)
        .resize(TARGET_WIDTH, TARGET_HEIGHT, {
          fit:        'cover',
          position:   'top',         // crop from top so face is preserved
          withoutEnlargement: true,
        })
        .jpeg({ quality: JPEG_QUALITY, progressive: true })
        .toBuffer()
      finalExt = '.jpg'
    } catch {
      // sharp not installed — use original buffer as-is
    }

    // 3. Save to public directory
    const filename  = `coach_${coachId}${finalExt}`
    const publicUrl = await savePhotoLocally(processedBuffer, filename, coachId)

    const metadata: PhotoMetadata = {
      original_filename: download.filename,
      size_bytes:        processedBuffer.length,
      processed_at:      new Date().toISOString(),
    }

    return { publicUrl, metadata }
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err)
    console.error(`[ImageProcessor] Failed to process photo for coach ${coachId}:`, error)
    return {
      publicUrl: '/images/coach-placeholder.png',
      metadata:  { error, processed_at: new Date().toISOString() },
      error,
    }
  }
}

// ─── Delete a coach photo from public directory ───────────────────────────────
export async function deleteCoachPhoto(publicUrl: string): Promise<void> {
  if (!publicUrl || publicUrl.includes('placeholder')) return

  const filePath = path.join(process.cwd(), 'public', publicUrl.replace(/^\//, ''))
  try {
    await fs.unlink(filePath)
  } catch {
    // File may already be deleted — not an error
  }
}

// ─── Generate a placeholder avatar SVG URL ───────────────────────────────────
export function getPlaceholderAvatar(name: string): string {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map(n => n.charAt(0).toUpperCase())
    .join('')

  // Use a deterministic color from the name
  const hue = [...name].reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360
  const color = `hsl(${hue}, 60%, 45%)`

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
    <rect width="200" height="200" fill="${color}"/>
    <text x="100" y="120" font-family="sans-serif" font-size="80" fill="white" text-anchor="middle">${initials}</text>
  </svg>`

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
}
