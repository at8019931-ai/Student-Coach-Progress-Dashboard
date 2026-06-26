# Coach Profile Automation System — Setup Guide

## What this system does

1. Coach fills out a **Google Form** with their details, ratings, and achievements  
2. Google Apps Script POSTs the response to your Next.js **webhook**  
3. The webhook validates data, downloads their **photo from Google Drive**, and runs **Claude AI** to write a professional bio, coaching philosophy, key highlights, and parent intro  
4. An admin reviews and **publishes** the profile  
5. The profile appears at `/coaches/[id]` with a print-to-PDF option  

---

## Step 1 — Install packages

```bash
npm install @anthropic-ai/sdk googleapis sharp
# or with pnpm:
pnpm add @anthropic-ai/sdk googleapis sharp
```

---

## Step 2 — Run the database migration

```bash
psql $CC_DATABASE_URL -f supabase/migrations/004_coach_profiles.sql
```

Or paste the contents into your DB admin tool (Neon, Supabase, Railway, etc.).

---

## Step 3 — Set environment variables

Copy `.env.local.example` to `.env.local` and fill in all values:

| Variable | Where to get it |
|---|---|
| `CC_DATABASE_URL` | Your PostgreSQL connection string |
| `ANTHROPIC_API_KEY` | [console.anthropic.com](https://console.anthropic.com) |
| `GOOGLE_CLIENT_EMAIL` | Google Cloud → Service Account → email field |
| `GOOGLE_PRIVATE_KEY` | Google Cloud → Service Account → JSON key → `private_key` |
| `GOOGLE_FORMS_SPREADSHEET_ID` | The Sheet linked to your Form (from URL) |
| `GOOGLE_DRIVE_FOLDER_ID` | The shared Drive folder where coaches upload photos |
| `WEBHOOK_SECRET` | Any long random string: `openssl rand -hex 32` |

---

## Step 4 — Set up Google Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project (or use existing)
3. Enable these APIs:
   - **Google Drive API**
   - **Google Sheets API**
4. Create a **Service Account**:
   - IAM & Admin → Service Accounts → Create
   - Grant no project roles (leave blank)
   - Create a JSON key → download it
5. Copy `client_email` → `GOOGLE_CLIENT_EMAIL`
6. Copy `private_key` → `GOOGLE_PRIVATE_KEY` (keep the `\n` characters)

### Share the Google Sheet and Drive folder with the service account

- **Google Sheet**: Open the Sheet → Share → paste the service account email → Viewer
- **Google Drive folder**: Right-click folder → Share → paste service account email → Viewer

---

## Step 5 — Install the Google Apps Script trigger

1. Open your Google Form → click the **Responses** tab → click the green Sheets icon to open the linked Sheet
2. In the Sheet: **Extensions → Apps Script**
3. Delete existing code, paste the contents of `docs/google-apps-script-trigger.js`
4. Update `CONFIG.WEBHOOK_URL` to your deployed app URL (e.g. `https://your-app.vercel.app/api/webhooks/google-forms`)
5. Update `CONFIG.WEBHOOK_SECRET` to match `WEBHOOK_SECRET` in `.env.local`
6. Update `CONFIG.COLUMN_MAP` keys to match your exact Google Form question text
7. **Save** → **Run → testWebhook** once (grant permissions when prompted)
8. Set up the trigger:
   - Triggers (clock icon) → Add Trigger
   - Function: `onFormSubmit`  
   - Event source: From spreadsheet  
   - Event type: On form submit  
   - Save

---

## Step 6 — Access the admin dashboard

Navigate to `/admin/coaches` in your app.

From there you can:
- See all coach profiles and their status
- Click a profile → edit any field manually
- Click **🤖 Regenerate** to re-run AI generation
- Click **✅ Publish** to make a profile public
- Export any profile as JSON or HTML

---

## API Reference

| Endpoint | Method | Description |
|---|---|---|
| `/api/webhooks/google-forms` | POST | Google Apps Script webhook receiver |
| `/api/coach-profiles` | GET | List all profiles (`?status=draft\|published&stats=true`) |
| `/api/coach-profiles` | POST | Manually submit a profile |
| `/api/coach-profiles/[id]` | GET | Fetch a single profile |
| `/api/coach-profiles/[id]` | PATCH | Update fields |
| `/api/coach-profiles/[id]` | DELETE | Archive a profile |
| `/api/coach-profiles/[id]/generate` | POST | Trigger AI generation |
| `/api/coach-profiles/[id]/export` | GET | Export (`?format=json\|html`) |
| `/api/admin/notifications` | GET | List unread admin notifications |
| `/api/admin/notifications` | PATCH | Mark notifications as read |

---

## File Structure

```
lib/
  google/
    drive.ts          — Download photos from Google Drive
    sheets.ts         — Read form responses from Google Sheets
  ai/
    profile-generator.ts  — Claude Opus 4.8 profile generation
  coach-profiles/
    validator.ts      — Zod validation for form data
    image-processor.ts    — Photo resize + save
services/
  coach-profile.service.ts  — Main orchestration
app/
  api/
    webhooks/google-forms/route.ts  — Webhook receiver
    coach-profiles/
      route.ts                      — List / create
      [id]/route.ts                 — Get / update / archive
      [id]/generate/route.ts        — Trigger AI
      [id]/export/route.ts          — Export JSON / HTML
    admin/notifications/route.ts    — Admin notifications
  (dashboard)/
    admin/coaches/
      page.tsx                      — Admin dashboard
      [id]/page.tsx                 — Profile edit page
    coaches/[id]/page.tsx           — Public profile page
components/coach-profile/
  AdminDashboard.tsx    — Main admin UI
  ProfileCard.tsx       — Card and table row components
  ProfileEditor.tsx     — Editable profile form
types/
  coach-profiles.ts     — All TypeScript types
docs/
  google-apps-script-trigger.js  — Copy into Apps Script
  COACH_PROFILES_SETUP.md        — This file
supabase/migrations/
  004_coach_profiles.sql         — DB schema
```

---

## Troubleshooting

**Webhook returns 401**  
→ `WEBHOOK_SECRET` in Apps Script doesn't match `.env.local`

**Photo download fails**  
→ Service account email is not shared on the Drive folder  
→ Photo field in the Form is not a File Upload question  

**AI generation fails with 500**  
→ Check `ANTHROPIC_API_KEY` is set correctly  
→ Check the profile exists in the DB  

**`uuid_generate_v4` error on migration**  
→ Run `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";` first  

**TypeScript: Cannot find module `@anthropic-ai/sdk`**  
→ Run `npm install @anthropic-ai/sdk` 

**TypeScript: Cannot find module `googleapis`**  
→ Run `npm install googleapis`
