'use client'

import { useState } from 'react'
import { AppShell } from '@/components/app-shell'
import { MyPageView } from '@/components/views/mypage-view'
import { PostFormView } from '@/components/views/post-form-view'

export default function MyPagePage() {
  const [composing, setComposing] = useState(false)

  return (
    <AppShell>
      {composing ? (
        <PostFormView onBack={() => setComposing(false)} />
      ) : (
        <MyPageView
          onNavigate={(v) => {
            if (v === 'post-form') setComposing(true)
          }}
        />
      )}
    </AppShell>
  )
}
