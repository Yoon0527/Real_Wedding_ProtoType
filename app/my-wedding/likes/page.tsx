import { Heart } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { LoungeFeed } from '@/components/lounge-feed'
import { PageHeader, EmptyState } from '@/components/my-wedding-ui'
import { likedPortfolios } from '@/lib/my-wedding-data'

export default function LikesPage() {
  const items = likedPortfolios

  return (
    <AppShell>
      <PageHeader
        title="❤️ 좋아요"
        count={items.length}
        description="마음에 들어 좋아요한 플래너 포트폴리오를 모아봤어요."
      />

      {items.length === 0 ? (
        <EmptyState
          icon={<Heart className="size-7" />}
          title="아직 좋아요한 포트폴리오가 없어요"
          description="마음에 드는 플래너 포트폴리오에 좋아요를 눌러보세요. 이곳에 모아드릴게요."
        />
      ) : (
        <LoungeFeed items={items} />
      )}
    </AppShell>
  )
}
