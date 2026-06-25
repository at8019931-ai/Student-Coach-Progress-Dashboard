'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function SetupRequired() {
  const router = useRouter()
  const [status, setStatus] = useState<'setting-up' | 'done' | 'error'>('setting-up')

  useEffect(() => {
    async function setup() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }

      const { error } = await supabase.rpc('setup_my_profile')
      if (error) { setStatus('error'); return }

      const role = user.user_metadata?.role ?? 'student'
      setStatus('done')
      router.push(`/${role}`)
    }
    setup()
  }, [router])

  if (status === 'error') return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="text-4xl mb-4">❌</div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">Setup Failed</h1>
        <p className="text-gray-500 mb-6">Could not create your profile. Contact your admin.</p>
        <a href="/login" className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition">
          Back to Login
        </a>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="text-4xl mb-4 animate-pulse">♟</div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">Setting up your profile…</h1>
        <p className="text-gray-500">This only happens once.</p>
      </div>
    </div>
  )
}
