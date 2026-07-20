'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import {
  Search,
  Bell,
  Heart,
  ChevronDown,
  User,
  Pencil,
  MessageSquare,
  Clock,
  LogOut,
  CalendarCheck,
  Sparkles,
  X,
} from 'lucide-react'
import { searchExamples } from '@/lib/wedding-data'
import { LoginModal } from '@/components/auth/login-modal'
import { SignupModal } from '@/components/auth/signup-modal'

type NotificationCategory = 'messages' | 'general'

type Notification = {
  id: string
  text: string
  time: string
  unread: boolean
  icon: typeof Bell
  category: NotificationCategory
}

const initialNotifications: Notification[] = [
  {
    id: 'n1',
    text: '김하나 플래너가 상담 문의에 답변했습니다.',
    time: '방금 전',
    unread: true,
    icon: MessageSquare,
    category: 'messages',
  },
  {
    id: 'n2',
    text: '상담 일정이 확정되었습니다.',
    time: '2시간 전',
    unread: true,
    icon: CalendarCheck,
    category: 'messages',
  },
  {
    id: 'n3',
    text: '찜한 플래너가 새로운 포트폴리오를 등록했습니다.',
    time: '어제',
    unread: false,
    icon: Sparkles,
    category: 'general',
  },
]

const notifTabs: { id: NotificationCategory; label: string; icon: typeof Bell }[] = [
  { id: 'messages', label: '메시지', icon: MessageSquare },
  { id: 'general', label: '일반', icon: Bell },
]

const profileMenu = [
  { label: '내 프로필', icon: User },
  { label: '프로필 수정', icon: Pencil },
  { label: '찜한 플래너', icon: Heart },
  { label: '상담 내역', icon: MessageSquare },
  { label: '최근 본 플래너', icon: Clock },
]

export function TopHeader() {
  // Auth-aware demo state. Starts logged out so the login/signup CTAs are visible.
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [openMenu, setOpenMenu] = useState<'none' | 'profile' | 'bell'>('none')
  const [authModal, setAuthModal] = useState<'none' | 'login' | 'signup'>('none')
  const [notifTab, setNotifTab] = useState<NotificationCategory>('messages')
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
  const containerRef = useRef<HTMLDivElement>(null)

  const unreadCount = notifications.filter((n) => n.unread).length
  const tabNotifications = notifications.filter((n) => n.category === notifTab)
  const tabUnreadCount = (category: NotificationCategory) =>
    notifications.filter((n) => n.category === category && n.unread).length

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))
  }

  function deleteNotification(id: string) {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpenMenu('none')
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <>
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="flex items-center gap-4 px-4 py-3 md:px-6">
        {/* Search */}
        <div className="flex flex-1 flex-col gap-1.5">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="어떤 웨딩 스타일을 찾고 계신가요?"
              className="h-11 w-full rounded-full border border-border bg-card pl-11 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
            />
          </div>
          <div className="hidden items-center gap-2 pl-2 sm:flex">
            <span className="text-[11px] text-muted-foreground">추천 검색어</span>
            {searchExamples.map((ex) => (
              <button
                key={ex}
                className="text-[11px] text-secondary-foreground transition-colors hover:text-primary"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>

        {/* Right actions */}
        <div ref={containerRef} className="flex items-center gap-1.5">
          {/* Notification bell (always visible) */}
          <div className="relative">
            <button
              aria-label="알림"
              onClick={() => setOpenMenu(openMenu === 'bell' ? 'none' : 'bell')}
              className="relative flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-accent"
            >
              <Bell className="size-5" />
              {unreadCount > 0 && (
                <span className="absolute right-1.5 top-1.5 flex min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold leading-4 text-primary-foreground">
                  {unreadCount}
                </span>
              )}
            </button>

            {openMenu === 'bell' && (
              <div className="absolute right-0 top-12 z-50 w-80 overflow-hidden rounded-2xl border border-border bg-popover shadow-xl">
                <div className="flex items-center justify-between border-b border-border px-4 py-3">
                  <span className="text-sm font-semibold text-foreground">알림</span>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="text-[11px] font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                      모두 읽음
                    </button>
                  )}
                </div>

                {/* Category tabs */}
                <div className="flex border-b border-border">
                  {notifTabs.map((tab) => {
                    const TabIcon = tab.icon
                    const count = tabUnreadCount(tab.id)
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setNotifTab(tab.id)}
                        className={`flex flex-1 items-center justify-center gap-1.5 py-2.5 text-[13px] font-medium transition-colors ${
                          notifTab === tab.id
                            ? 'border-b-2 border-primary text-primary'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <TabIcon className="size-3.5" />
                        {tab.label}
                        {count > 0 && (
                          <span className="flex min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold leading-4 text-primary-foreground">
                            {count}
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>

                <ul className="max-h-96 overflow-y-auto">
                  {tabNotifications.length === 0 ? (
                    <li className="flex items-center justify-center px-4 py-10 text-[13px] text-muted-foreground">
                      새로운 알림이 없습니다.
                    </li>
                  ) : (
                    tabNotifications.map((n) => {
                      const Icon = n.icon
                      return (
                        <li key={n.id} className="group relative">
                          <button className="flex w-full items-start gap-3 py-3 pl-4 pr-9 text-left transition-colors hover:bg-secondary">
                            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                              <Icon className="size-4" />
                            </span>
                            <span className="flex-1">
                              <span className="block text-[13px] leading-snug text-foreground">
                                {n.text}
                              </span>
                              <span className="mt-0.5 block text-[11px] text-muted-foreground">
                                {n.time}
                              </span>
                            </span>
                            {n.unread && (
                              <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" />
                            )}
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteNotification(n.id)
                            }}
                            aria-label="알림 삭제"
                            className="absolute right-2 top-2 flex size-6 items-center justify-center rounded-full text-muted-foreground opacity-0 transition-opacity hover:bg-muted hover:text-foreground group-hover:opacity-100"
                          >
                            <X className="size-3.5" />
                          </button>
                        </li>
                      )
                    })
                  )}
                </ul>
                <button className="block w-full border-t border-border py-3 text-center text-[13px] font-medium text-primary transition-colors hover:bg-secondary">
                  알림 전체 보기
                </button>
              </div>
            )}
          </div>

          {isLoggedIn ? (
            <>
              {/* Profile */}
              <div className="relative ml-2 sm:ml-3">
                <button
                  onClick={() => setOpenMenu(openMenu === 'profile' ? 'none' : 'profile')}
                  className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2.5 transition-colors hover:bg-accent"
                >
                  <span className="relative size-8 overflow-hidden rounded-full">
                    <Image
                      src="/weddings/planner-1.png"
                      alt="김하나 프로필"
                      fill
                      sizes="32px"
                      className="object-cover"
                    />
                  </span>
                  <span className="hidden text-sm font-medium text-foreground sm:block">김하나</span>
                  <ChevronDown
                    className={`size-4 text-muted-foreground transition-transform ${openMenu === 'profile' ? 'rotate-180' : ''}`}
                  />
                </button>

                {openMenu === 'profile' && (
                  <div className="absolute right-0 top-12 z-50 w-56 overflow-hidden rounded-2xl border border-border bg-popover py-2 shadow-xl">
                    <div className="flex items-center gap-3 px-4 pb-2 pt-1">
                      <span className="relative size-10 overflow-hidden rounded-full">
                        <Image
                          src="/weddings/planner-1.png"
                          alt="김하나 프로필"
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-foreground">김하나</span>
                        <span className="block text-[11px] text-muted-foreground">
                          예비 신부 · 2026년 봄 예정
                        </span>
                      </span>
                    </div>
                    <div className="my-1 h-px bg-border" />
                    {profileMenu.map((item) => {
                      const Icon = item.icon
                      return (
                        <button
                          key={item.label}
                          className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-[13px] text-foreground transition-colors hover:bg-secondary"
                        >
                          <Icon className="size-4 text-muted-foreground" />
                          {item.label}
                        </button>
                      )
                    })}
                    <div className="my-1 h-px bg-border" />
                    <button
                      onClick={() => {
                        setIsLoggedIn(false)
                        setOpenMenu('none')
                      }}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-[13px] text-foreground transition-colors hover:bg-secondary"
                    >
                      <LogOut className="size-4 text-muted-foreground" />
                      로그아웃
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => setAuthModal('login')}
                className="rounded-full px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                로그인
              </button>
              <button
                onClick={() => setAuthModal('signup')}
                className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                회원가입
              </button>
            </>
          )}
        </div>
      </div>
    </header>

    {/* Auth modals — rendered OUTSIDE <header>. The header's `backdrop-blur-md`
        creates a containing block that would otherwise trap the modals'
        `position: fixed` inside the ~64px header instead of the viewport. */}
    {authModal === 'login' && (
      <LoginModal
        onClose={() => setAuthModal('none')}
        onOpenSignup={() => setAuthModal('signup')}
      />
    )}
    {authModal === 'signup' && (
      <SignupModal
        onClose={() => setAuthModal('none')}
        onOpenLogin={() => setAuthModal('login')}
      />
    )}
    </>
  )
}
