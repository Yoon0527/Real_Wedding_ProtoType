'use client'

import { useState } from 'react'
import { AppShell } from '@/components/app-shell'
import { CommunityView } from '@/components/views/community-view'
import { PostFormView } from '@/components/views/post-form-view'
import { ReviewDetailView } from '@/components/views/review-detail-view'

type SubView = 'community' | 'post-form' | 'review-detail'

export default function CommunityPage() {
  const [sub, setSub] = useState<SubView>('community')

  return (
    <AppShell>
      {sub === 'community' && (
        <CommunityView onNavigate={(v) => setSub(v as SubView)} />
      )}
      {sub === 'post-form' && (
        <PostFormView onBack={() => setSub('community')} />
      )}
      {sub === 'review-detail' && (
        <ReviewDetailView onBack={() => setSub('community')} />
      )}
    </AppShell>
  )
}
