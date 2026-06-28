'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Bookmark, Scale, X, BadgeCheck, Star, MessageCircle } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { PortfolioCard } from '@/components/portfolio-card'
import { PageHeader, EmptyState } from '@/components/my-wedding-ui'
import { bookmarkedPortfolios } from '@/lib/my-wedding-data'
import type { Portfolio } from '@/lib/wedding-data'

const budgetTiers = ['₩1,000 ~ ₩3,000', '₩3,000 ~ ₩5,000', '₩5,000+', '럭셔리']
const budgetFor = (item: Portfolio) =>
  item.budget ?? budgetTiers[item.id.charCodeAt(item.id.length - 1) % budgetTiers.length]

export default function BookmarksPage() {
  const items = bookmarkedPortfolios
  const [selected, setSelected] = useState<string[]>([])
  const [compareOpen, setCompareOpen] = useState(false)

  const toggle = (id: string) =>
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length >= 3
          ? prev
          : [...prev, id],
    )

  const selectedItems = items.filter((i) => selected.includes(i.id))

  return (
    <AppShell>
      <PageHeader
        title="🔖 찜목록"
        count={items.length}
        description="저장한 플래너를 모아 비교하고 상담을 신청해보세요. 최대 3명까지 비교할 수 있어요."
      />

      {items.length === 0 ? (
        <EmptyState
          icon={<Bookmark className="size-7" />}
          title="찜한 플래너가 없어요"
          description="플래너 포트폴리오의 찜하기 버튼을 눌러 저장해보세요. 나중에 비교할 수 있어요."
        />
      ) : (
        <>
          <div className="columns-2 gap-4 pb-24 sm:columns-2 lg:columns-3 xl:columns-4">
            {items.map((item) => (
              <PortfolioCard
                key={item.id}
                item={item}
                defaultBookmarked
                bookmarkLabel="저장됨"
                selectable
                selected={selected.includes(item.id)}
                onToggleSelect={() => toggle(item.id)}
              />
            ))}
          </div>

          {/* Sticky compare bar */}
          {selected.length > 0 && (
            <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-card/95 backdrop-blur-md lg:left-64">
              <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {selectedItems.map((i) => (
                      <Image
                        key={i.id}
                        src={i.planner.avatar || '/placeholder.svg'}
                        alt={i.planner.name}
                        width={36}
                        height={36}
                        className="size-9 rounded-full border-2 border-card object-cover"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-foreground">
                    <span className="font-semibold text-primary">{selected.length}</span>명
                    선택됨
                  </span>
                  <button
                    onClick={() => setSelected([])}
                    className="text-xs text-muted-foreground underline-offset-2 hover:underline"
                  >
                    선택 해제
                  </button>
                </div>
                <button
                  onClick={() => setCompareOpen(true)}
                  disabled={selected.length < 2}
                  className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Scale className="size-4" />
                  비교하기
                </button>
              </div>
            </div>
          )}

          {/* Compare modal */}
          {compareOpen && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
              onClick={() => setCompareOpen(false)}
            >
              <div
                className="flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-card shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between border-b border-border px-5 py-4">
                  <h2 className="font-serif text-lg font-semibold text-foreground">
                    플래너 비교 ({selectedItems.length})
                  </h2>
                  <button
                    onClick={() => setCompareOpen(false)}
                    aria-label="닫기"
                    className="flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary"
                  >
                    <X className="size-5" />
                  </button>
                </div>

                <div className="overflow-y-auto p-5">
                  <div
                    className="grid gap-4"
                    style={{ gridTemplateColumns: `repeat(${selectedItems.length}, minmax(0, 1fr))` }}
                  >
                    {selectedItems.map((i) => (
                      <div
                        key={i.id}
                        className="flex flex-col gap-3 rounded-2xl border border-border p-4"
                      >
                        <Image
                          src={i.image || '/placeholder.svg'}
                          alt={i.title}
                          width={200}
                          height={120}
                          className="h-24 w-full rounded-xl object-cover"
                        />
                        <div className="flex items-center gap-2">
                          <Image
                            src={i.planner.avatar || '/placeholder.svg'}
                            alt={i.planner.name}
                            width={28}
                            height={28}
                            className="size-7 rounded-full object-cover"
                          />
                          <span className="flex items-center gap-1 text-sm font-medium text-foreground">
                            {i.planner.name}
                            {i.planner.verified && (
                              <BadgeCheck className="size-3.5 text-primary" />
                            )}
                          </span>
                        </div>

                        <dl className="flex flex-col gap-2 text-xs">
                          <CompareRow label="별점">
                            <span className="flex items-center gap-1 text-foreground">
                              <Star className="size-3 fill-primary text-primary" />
                              {i.planner.rating}
                            </span>
                          </CompareRow>
                          <CompareRow label="후기">{i.planner.reviews}개</CompareRow>
                          <CompareRow label="상담수">
                            {i.planner.consultations.toLocaleString()}건
                          </CompareRow>
                          <CompareRow label="응답">{i.planner.responseTime}</CompareRow>
                          <CompareRow label="예산">{budgetFor(i)}</CompareRow>
                          <CompareRow label="스타일">
                            <span className="text-right text-foreground">
                              {i.planner.specialties.slice(0, 2).join(', ')}
                            </span>
                          </CompareRow>
                        </dl>

                        <Link
                          href={`/portfolio/${i.id}`}
                          className="mt-1 flex items-center justify-center gap-1.5 rounded-xl bg-primary py-2 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
                        >
                          <MessageCircle className="size-3.5" />
                          상담 신청
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </AppShell>
  )
}

function CompareRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-1.5">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium text-foreground">{children}</dd>
    </div>
  )
}
