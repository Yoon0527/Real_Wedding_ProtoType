'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  Heart,
  MessageCircle,
  Sparkles,
  Bookmark,
  Clock,
  ClipboardList,
  BadgeCheck,
  ArrowRight,
  User,
  Briefcase,
  Settings,
} from 'lucide-react'

const mainNav = [
  { icon: MessageCircle, label: '팩트 커뮤니티', href: '/community' },
  { icon: Sparkles, label: '플래너 라운지', href: '/' },
  { icon: User, label: '마이페이지', href: '/mypage' },
  { icon: Settings, label: '설정', href: '/settings' },
]

const plannerNav = [
  { icon: MessageCircle, label: '팩트 커뮤니티', href: '/community' },
  { icon: Sparkles, label: '플래너 라운지', href: '/' },
  { icon: Briefcase, label: '플래너 스튜디오', href: '/studio' },
  { icon: User, label: '마이페이지', href: '/mypage' },
  { icon: Settings, label: '설정', href: '/settings' },
]

const myWedding = [
  { icon: Heart, label: '좋아요', href: '/my-wedding/likes' },
  { icon: Bookmark, label: '찜목록', href: '/my-wedding/bookmarks' },
  { icon: Clock, label: '최근 본 게시물', href: '/my-wedding/recent' },
  { icon: ClipboardList, label: '상담내역', href: '/my-wedding/consultations' },
]

function Divider() {
  return <div className="h-px w-full bg-border/70" />
}

export function LeftSidebar() {
  const [plannerMode, setPlannerMode] = useState(false)
  const pathname = usePathname()
  const nav = plannerMode ? plannerNav : mainNav

  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col gap-6 overflow-y-auto no-scrollbar border-r border-border bg-sidebar px-5 py-6">
      {/* Logo */}
      <Link href="/" className="flex flex-col gap-1">
        <span className="text-2xl font-semibold leading-none text-foreground">
          리얼웨딩
        </span>
        <span className="text-[11px] leading-relaxed text-muted-foreground">
          100% 팩트 인증 웨딩 플랫폼
        </span>
      </Link>

      <Divider />

      {/* Main nav */}
      <div className="flex flex-col gap-1.5">
        <h3 className="px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          메뉴
        </h3>
        <nav className="flex flex-col gap-0.5">
          {nav.map((m) => {
            const active = pathname === m.href
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
      </div>

      <Divider />

      {/* My Wedding detail */}
      <div className="flex flex-col gap-1.5">
        <h3 className="px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          MY 웨딩
        </h3>
        <nav className="flex flex-col gap-0.5">
          {myWedding.map((m) => {
            const active = pathname === m.href
            return (
              <Link
                key={m.href}
                href={m.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                  active
                    ? 'bg-accent font-medium text-foreground'
                    : 'text-foreground hover:bg-accent'
                }`}
              >
                <m.icon
                  className={`size-4 ${active ? 'text-primary' : 'text-muted-foreground'}`}
                />
                {m.label}
              </Link>
            )
          })}
        </nav>
      </div>

      <Divider />

      {/* Planner Mode card */}
      <div
        className={`mt-auto flex flex-col gap-3 rounded-2xl border p-4 transition-colors ${
          plannerMode ? 'border-primary/30 bg-primary/5' : 'border-border bg-card'
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold text-foreground">
              {plannerMode ? '플래너 모드' : '플래너 모드 전환'}
            </span>
            {plannerMode && (
              <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                <BadgeCheck className="size-3" />
                인증 플래너
              </span>
            )}
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={plannerMode}
            aria-label="플래너 모드 전환"
            onClick={() => setPlannerMode((v) => !v)}
            className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
              plannerMode ? 'bg-primary' : 'bg-muted-foreground/30'
            }`}
          >
            <span
              className={`absolute top-0.5 size-5 rounded-full bg-card shadow-sm transition-transform ${
                plannerMode ? 'translate-x-[22px]' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>

        {plannerMode && (
          <div className="flex items-center gap-1.5 text-xs text-primary">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500/60" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            온라인 · 상담 가능
          </div>
        )}

        <p className="text-xs leading-relaxed text-muted-foreground">
          {plannerMode ? (
            '현재 플래너 모드로 이용 중입니다.'
          ) : (
            <>
              웨딩 플래너로 활동하고
              <br />
              예비부부와 연결되어 보세요.
            </>
          )}
        </p>

        <Link
          href={plannerMode ? '/studio' : '/studio'}
          className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          {plannerMode ? (
            <>
              플래너 센터 이동
              <ArrowRight className="size-4" />
            </>
          ) : (
            '플래너 등록하기'
          )}
        </Link>
      </div>
    </aside>
  )
}
