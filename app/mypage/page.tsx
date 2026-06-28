'use client'

import { AppShell } from '@/components/app-shell'
import { MyPageView } from '@/components/views/mypage-view'

export default function MyPagePage() {
  return (
    <AppShell>
      <MyPageView onNavigate={() => {}} />
    </AppShell>
  )
}
