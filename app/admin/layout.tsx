import type { ReactNode } from 'react'
import { AdminSidebar } from '@/components/admin/admin-sidebar'

/**
 * 관리자 전용 레이아웃.
 * 소비자용 AppShell(LeftSidebar/TopHeader)은 의도적으로 사용하지 않습니다.
 *
 * ⚠️ 접근 제어 미구현 — 현재 /admin 은 누구나 접근 가능합니다.
 * 실제 배포 전 미들웨어 또는 세션 기반 권한 체크가 반드시 필요합니다.
 */
export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto no-scrollbar px-4 py-6 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-6">{children}</div>
      </main>
    </div>
  )
}
