import { LeftSidebar } from '@/components/left-sidebar'
import { TopHeader } from '@/components/top-header'
import { RightSidebar } from '@/components/right-sidebar'
import { HeroBanner } from '@/components/hero-banner'
import { LoungeFeed } from '@/components/lounge-feed'

export default function Page() {
  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      <LeftSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopHeader />
        <main className="flex-1 overflow-y-auto no-scrollbar px-4 py-5 md:px-6">
          <div className="mx-auto flex max-w-6xl flex-col gap-6">
            <HeroBanner />
            <LoungeFeed />
          </div>
        </main>
      </div>

      <RightSidebar />
    </div>
  )
}
