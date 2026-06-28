'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, Heart, Bookmark, Trash2, BadgeCheck, MapPin } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { PageHeader, EmptyState } from '@/components/my-wedding-ui'
import { recentGroups, type RecentGroup } from '@/lib/my-wedding-data'

export default function RecentPage() {
  const [groups, setGroups] = useState<RecentGroup[]>(recentGroups)

  const total = groups.reduce((sum, g) => sum + g.items.length, 0)

  const removeItem = (groupKey: string, portfolioId: string) =>
    setGroups((prev) =>
      prev
        .map((g) =>
          g.key === groupKey
            ? { ...g, items: g.items.filter((it) => it.portfolio.id !== portfolioId) }
            : g,
        )
        .filter((g) => g.items.length > 0),
    )

  const clearAll = () => setGroups([])

  return (
    <AppShell>
      <PageHeader
        title="🕒 최근 본 게시물"
        count={total}
        description="최근에 살펴본 플래너 포트폴리오예요. 다시 보거나 저장할 수 있어요."
        action={
          total > 0 ? (
            <button
              onClick={clearAll}
              className="flex items-center gap-1.5 rounded-full border border-border px-3.5 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-destructive hover:text-destructive"
            >
              <Trash2 className="size-3.5" />
              기록 전체 삭제
            </button>
          ) : undefined
        }
      />

      {total === 0 ? (
        <EmptyState
          icon={<Clock className="size-7" />}
          title="최근 본 게시물이 없어요"
          description="플래너 포트폴리오를 둘러보면 이곳에 방문 기록이 시간순으로 정리돼요."
        />
      ) : (
        <div className="flex flex-col gap-8">
          {groups.map((group) => (
            <section key={group.key} className="flex flex-col gap-4">
              {/* Timeline group header */}
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
                  <span className="size-2 rounded-full bg-primary" />
                  {group.label}
                </span>
                <span className="text-xs text-muted-foreground">{group.items.length}개</span>
                <div className="h-px flex-1 bg-border/70" />
              </div>

              {/* Entries */}
              <ul className="flex flex-col gap-3 border-l border-border pl-5">
                {group.items.map((entry) => {
                  const item = entry.portfolio
                  return (
                    <li key={item.id} className="relative">
                      <span className="absolute -left-[27px] top-6 size-2.5 rounded-full border-2 border-background bg-primary" />
                      <div className="flex gap-3 rounded-2xl border border-border bg-card p-3 transition-shadow hover:shadow-sm">
                        <Link
                          href={`/portfolio/${item.id}`}
                          className="relative size-20 shrink-0 overflow-hidden rounded-xl sm:size-24"
                        >
                          <Image
                            src={item.image || '/placeholder.svg'}
                            alt={item.title}
                            fill
                            sizes="96px"
                            className="object-cover"
                          />
                        </Link>

                        <div className="flex min-w-0 flex-1 flex-col gap-1">
                          <div className="flex items-start justify-between gap-2">
                            <Link
                              href={`/portfolio/${item.id}`}
                              className="line-clamp-1 font-medium text-foreground hover:underline"
                            >
                              {item.title}
                            </Link>
                            <span className="shrink-0 text-[11px] text-muted-foreground">
                              {entry.viewedAt}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Image
                                src={item.planner.avatar || '/placeholder.svg'}
                                alt={item.planner.name}
                                width={16}
                                height={16}
                                className="size-4 rounded-full object-cover"
                              />
                              {item.planner.name}
                              {item.planner.verified && (
                                <BadgeCheck className="size-3 text-primary" />
                              )}
                            </span>
                            <span className="flex items-center gap-0.5">
                              <MapPin className="size-3" />
                              {item.region}
                            </span>
                          </div>

                          {/* Quick actions */}
                          <div className="mt-auto flex items-center gap-1 pt-1">
                            <Link
                              href={`/portfolio/${item.id}`}
                              className="rounded-lg bg-secondary px-3 py-1.5 text-[11px] font-medium text-secondary-foreground transition-colors hover:bg-accent"
                            >
                              다시 보기
                            </Link>
                            <QuickIcon label="좋아요">
                              <Heart className="size-4" />
                            </QuickIcon>
                            <QuickIcon label="찜하기">
                              <Bookmark className="size-4" />
                            </QuickIcon>
                            <button
                              onClick={() => removeItem(group.key, item.id)}
                              aria-label="기록 삭제"
                              className="ml-auto flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-destructive"
                            >
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </section>
          ))}
        </div>
      )}
    </AppShell>
  )
}

function QuickIcon({ label, children }: { label: string; children: React.ReactNode }) {
  const [active, setActive] = useState(false)
  return (
    <button
      onClick={() => setActive((v) => !v)}
      aria-label={label}
      aria-pressed={active}
      className={`flex size-8 items-center justify-center rounded-lg transition-colors hover:bg-secondary ${
        active ? 'text-primary' : 'text-muted-foreground'
      }`}
    >
      {children}
    </button>
  )
}
