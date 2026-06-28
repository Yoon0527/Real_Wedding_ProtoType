import type { ReactNode } from 'react'
import { LeftSidebar } from '@/components/left-sidebar'
import { TopHeader } from '@/components/top-header'
import { RightSidebar } from '@/components/right-sidebar'

export function AppShell({
  children,
  withRightSidebar = false,
}: {
  children: ReactNode
  withRightSidebar?: boolean
}) {
  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      <LeftSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopHeader />
        <main className="flex-1 overflow-y-auto no-scrollbar px-4 py-5 md:px-6">
          <div className="mx-auto flex max-w-6xl flex-col gap-6">{children}</div>
        </main>
      </div>

      {withRightSidebar && <RightSidebar />}
    </div>
  )
}
