# CircleChess Student Success Platform — Setup Guide

## Prerequisites
- Node.js 20+
- A Supabase project (free tier works)
- (Optional) Vercel account for deployment

## 1. Install dependencies
```bash
npm install
```

## 2. Configure environment
```bash
cp .env.local.example .env.local
# Edit .env.local with your Supabase URL and anon key
```

## 3. Set up the database
In your Supabase project → SQL Editor, run these in order:
```
supabase/migrations/001_initial_schema.sql
supabase/migrations/002_seed_data.sql
supabase/migrations/003_automation_triggers.sql
```

## 4. Create demo users (Supabase Auth)
In Supabase Dashboard → Authentication → Users, create:
- student@demo.com / demo1234 (user_metadata: { role: "student" })
- coach@demo.com / demo1234 (user_metadata: { role: "coach" })
- admin@demo.com / demo1234 (user_metadata: { role: "admin" })

Then in SQL editor, insert their profiles:
```sql
-- Run after creating users above
-- Get user IDs from auth.users and insert into profiles table
```

## 5. Deploy Edge Functions (optional)
```bash
supabase functions deploy generate-daily-tasks
supabase functions deploy check-achievements
supabase functions deploy send-notifications
```

Schedule in Supabase Dashboard → Edge Functions → Schedules:
- generate-daily-tasks: `0 0 * * *` (midnight UTC)
- send-notifications: `0 9 * * *` (9am UTC)

## 6. Run development server
```bash
npm run dev
```

Open http://localhost:3000

## 7. Deploy to Vercel
```bash
vercel --prod
```
Add environment variables in Vercel dashboard.

## Role Flow
- `/` → redirects to `/{role}` based on JWT metadata
- `/student` → Student Dashboard
- `/coach` → Coach Dashboard  
- `/admin` → Admin Dashboard

## Architecture Summary
- **Next.js 15 App Router** with server components for fast data loading
- **Supabase** for auth, database (PostgreSQL), realtime subscriptions, and storage
- **RLS policies** protect all data — each role only sees what it should
- **Edge Functions** run automation: daily tasks (midnight), achievement checks, overdue notifications
- **Realtime subscriptions** update student dashboards instantly when coaches post feedback
- **shadcn/ui + Tailwind** for the UI — mobile-first, works on phones
