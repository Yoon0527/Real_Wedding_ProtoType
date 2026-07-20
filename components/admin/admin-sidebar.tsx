'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  ReceiptText,
  BadgeCheck,
  ShieldAlert,
  ArrowLeft,
} from 'lucide-react'

const adminNav = [
  { icon: LayoutDashboard, label: '대시보드', href: '/admin', exact: true },
  { icon: Users, label: '회원 관리', href: '/admin/users' },
  { icon: ReceiptText, label: '영수증 인증 심사', href: '/admin/receipts' },
  { icon: BadgeCheck, label: '플래너 승인', href: '/admin/planners' },
  { icon: ShieldAlert, label: '콘텐츠 모더레이션', href: '/admin/reports' },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex w-60 shrink-0 flex-col gap-6 overflow-y-auto no-scrollbar border-r border-border bg-sidebar px-4 py-6">
      <Link href="/admin" className="flex flex-col gap-1 px-2">
        <span className="text-xl font-semibold leading-none text-foreground">
          리얼웨딩
        </span>
        <span className="text-[11px] font-medium tracking-wider text-primary">
          ADMIN CONSOLE
        </span>
      </Link>

      <div className="h-px w-full bg-border/70" />

      <nav className="flex flex-col gap-0.5">
        {adminNav.map((m) => {
          const active = m.exact
            ? pathname === m.href
            : pathname.startsWith(m.href)
          return (
            <Link
              key={m.href}
              href={m.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                active
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-accent'
              }`}
            >
              <m.icon className="size-4" />
              {m.label}
            </Link>
          )
        })}
      </nav>

      <Link
        href="/"
        className="mt-auto flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        서비스로 돌아가기
      </Link>
    </aside>
  )
}
