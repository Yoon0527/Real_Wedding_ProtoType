'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Heart,
  MessageCircle,
  Star,
  BadgeCheck,
  Share2,
  Bookmark,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  X,
  Camera,
  ImagePlus,
  Siren,
  Check,
} from 'lucide-react'
import type { Portfolio } from '@/lib/wedding-data'
import { LeftSidebar } from '@/components/left-sidebar'
import { ShareModal } from '@/components/share-modal'

export type Review = {
  id: string
  name: string
  rating: number
  text: string
  date: string
  weddingDate: string
  photos: string[]
}

type Props = {
  item: Portfolio
  gallery: string[]
  otherWorks: Portfolio[]
  related: Portfolio[]
  reviews: Review[]
}

const sortLabels = {
  latest: '최신순',
  high: '별점 높은순',
  low: '별점 낮은순',
} as const
type SortKey = keyof typeof sortLabels

export function PortfolioDetailClient({
  item,
  gallery,
  otherWorks,
  related,
  reviews,
}: Props) {
  const planner = item.planner

  /* ---------- Gallery carousel ---------- */
  const [current, setCurrent] = useState(0)
  const touchStartX = useRef<number | null>(null)
  const thumbRef = useRef<HTMLDivElement>(null)

  const goTo = (i: number) => setCurrent((i + gallery.length) % gallery.length)
  const next = () => goTo(current + 1)
  const prev = () => goTo(current - 1)

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    if (delta > 50) prev()
    else if (delta < -50) next()
    touchStartX.current = null
  }

  /* ---------- Engagement ---------- */
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const likeCount = item.likes + (liked ? 1 : 0)

  /* ---------- Toast ---------- */
  const [toast, setToast] = useState<{ title: string; desc?: string } | null>(null)
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const showToast = (title: string, desc?: string) => {
    setToast({ title, desc })
    if (toastTimer.current) clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 3200)
  }

  /* ---------- Share (existing centered modal) ---------- */
  const [shareOpen, setShareOpen] = useState(false)
  const shareUrl =
    typeof window !== 'undefined'
      ? window.location.href
      : `https://realwedding.co.kr/portfolio/${item.id}`

  /* ---------- Bookmark ---------- */
  const toggleBookmark = () => {
    setBookmarked((v) => {
      const nv = !v
      showToast(nv ? '찜목록에 저장되었습니다.' : '찜이 해제되었습니다.')
      return nv
    })
  }

  /* ---------- Report modal ---------- */
  const [reportOpen, setReportOpen] = useState(false)

  /* ---------- Other works slider ---------- */
  const worksRef = useRef<HTMLDivElement>(null)
  const scrollWorks = (dir: 1 | -1) => {
    worksRef.current?.scrollBy({ left: dir * 320, behavior: 'smooth' })
  }

  /* ---------- Reviews ---------- */
  const [sort, setSort] = useState<SortKey>('latest')
  const [sortOpen, setSortOpen] = useState(false)
  const [writeOpen, setWriteOpen] = useState(false)

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sort === 'high') return b.rating - a.rating
    if (sort === 'low') return a.rating - b.rating
    return b.date.localeCompare(a.date)
  })

  /* ---------- Lightbox ---------- */
  const [lightbox, setLightbox] = useState<{ photos: string[]; index: number } | null>(
    null,
  )
  const openLightbox = (photos: string[], index: number) =>
    setLightbox({ photos, index })
  const lightboxNext = () =>
    setLightbox((lb) =>
      lb ? { ...lb, index: (lb.index + 1) % lb.photos.length } : lb,
    )
  const lightboxPrev = () =>
    setLightbox((lb) =>
      lb
        ? { ...lb, index: (lb.index - 1 + lb.photos.length) % lb.photos.length }
        : lb,
    )

  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      <LeftSidebar />

      <div className="min-w-0 flex-1 overflow-y-auto no-scrollbar">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 md:px-6">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-foreground transition-colors hover:text-primary"
          >
            <ChevronLeft className="size-4" />
            플래너 라운지
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setReportOpen(true)}
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <Siren className="size-4" />
              신고
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-6 md:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* Main column */}
          <div className="flex flex-col gap-6">
            {/* Gallery carousel */}
            <div className="flex flex-col gap-3">
              <div
                className="group relative overflow-hidden rounded-3xl bg-secondary"
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
              >
                <Image
                  key={current}
                  src={gallery[current] || '/placeholder.svg'}
                  alt={`${item.title} ${current + 1}`}
                  width={800}
                  height={600}
                  priority
                  className="aspect-[4/3] w-full object-cover duration-500 animate-in fade-in"
                />

                {/* Arrows */}
                <button
                  aria-label="이전 사진"
                  onClick={prev}
                  className="absolute left-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground opacity-0 shadow-md backdrop-blur transition-opacity hover:bg-background group-hover:opacity-100 max-lg:opacity-100"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  aria-label="다음 사진"
                  onClick={next}
                  className="absolute right-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground opacity-0 shadow-md backdrop-blur transition-opacity hover:bg-background group-hover:opacity-100 max-lg:opacity-100"
                >
                  <ChevronRight className="size-5" />
                </button>

                {/* Count */}
                <span className="absolute bottom-3 right-3 rounded-full bg-foreground/70 px-3 py-1 text-xs font-medium text-background backdrop-blur">
                  {current + 1} / {gallery.length}
                </span>
              </div>

              {/* Thumbnails */}
              <div
                ref={thumbRef}
                className="no-scrollbar flex gap-2 overflow-x-auto pb-1"
              >
                {gallery.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`${i + 1}번째 사진 보기`}
                    className={`relative size-16 shrink-0 overflow-hidden rounded-xl transition-all md:size-20 ${
                      i === current
                        ? 'ring-2 ring-primary ring-offset-2 ring-offset-background'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={src || '/placeholder.svg'}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Social actions */}
            <div className="flex items-center justify-center gap-6 border-y border-border py-4">
              <button
                onClick={() => setLiked((v) => !v)}
                aria-pressed={liked}
                className="flex flex-col items-center gap-1 text-xs font-medium text-foreground transition-colors hover:text-primary"
              >
                <Heart
                  className={`size-6 transition-colors ${liked ? 'fill-primary text-primary' : ''}`}
                />
                좋아요 {likeCount.toLocaleString()}
              </button>
              <button
                onClick={toggleBookmark}
                aria-pressed={bookmarked}
                className="flex flex-col items-center gap-1 text-xs font-medium text-foreground transition-colors hover:text-primary"
              >
                <Bookmark
                  className={`size-6 transition-colors ${bookmarked ? 'fill-primary text-primary' : ''}`}
                />
                찜하기
              </button>
              <button
                onClick={() => setShareOpen(true)}
                className="flex flex-col items-center gap-1 text-xs font-medium text-foreground transition-colors hover:text-primary"
              >
                <Share2 className="size-6" />
                공유
              </button>
            </div>

            {/* Title + meta */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                  {item.type}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="size-3.5" />
                  {item.region}
                </span>
              </div>
              <h1 className="text-balance font-serif text-3xl font-semibold leading-tight text-foreground md:text-4xl">
                {item.title}
              </h1>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-3 border-t border-border pt-6 leading-relaxed text-secondary-foreground">
              <p>
                {planner.name} 플래너가 완성한 {item.region} 지역의 {item.type}{' '}
                포트폴리오입니다. 신랑신부의 취향과 감성을 가장 우선으로 생각하며,
                공간 연출부터 플로럴 데코, 동선까지 모든 디테일을 직접
                기획했습니다.
              </p>
              <p>
                자연스러운 채광과 따뜻한 색감을 살린 연출로, 하객 모두가 오래
                기억할 단 하나의 웨딩을 만들어 드립니다. 상담을 통해 예산과 일정에
                맞는 맞춤 제안을 받아보세요.
              </p>
            </div>

            {/* Other works slider */}
            {otherWorks.length > 0 && (
              <section className="flex flex-col gap-4 border-t border-border pt-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-xl font-semibold text-foreground">
                    플래너의 다른 작업
                  </h2>
                  <div className="flex items-center gap-1.5">
                    <button
                      aria-label="이전"
                      onClick={() => scrollWorks(-1)}
                      className="flex size-8 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      <ChevronLeft className="size-4" />
                    </button>
                    <button
                      aria-label="다음"
                      onClick={() => scrollWorks(1)}
                      className="flex size-8 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      <ChevronRight className="size-4" />
                    </button>
                  </div>
                </div>

                <div
                  ref={worksRef}
                  className="no-scrollbar -mx-1 flex gap-3 overflow-x-auto scroll-smooth px-1 pb-1"
                >
                  {otherWorks.map((w) => (
                    <Link
                      key={w.id}
                      href={`/portfolio/${w.id}`}
                      className="group flex w-[calc(50%-6px)] shrink-0 flex-col gap-2 sm:w-[calc(33.333%-8px)] lg:w-[calc(25%-9px)]"
                    >
                      <div className="overflow-hidden rounded-2xl">
                        <Image
                          src={w.image || '/placeholder.svg'}
                          alt={w.title}
                          width={220}
                          height={220}
                          className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-col gap-0.5 px-0.5">
                        <span className="truncate text-sm font-medium text-foreground">
                          {w.title}
                        </span>
                        <span className="truncate text-xs text-muted-foreground">
                          {w.type} · {w.region}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>

                <Link
                  href={`/planner/${planner.id}/portfolio`}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-border py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  전체 포트폴리오 보기
                  <ChevronRight className="size-4" />
                </Link>
              </section>
            )}

            {/* Reviews */}
            <section className="flex flex-col gap-4 border-t border-border pt-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <h2 className="font-serif text-xl font-semibold text-foreground">
                    후기 {planner.reviews}개
                  </h2>
                  <span className="flex items-center gap-1 text-sm font-medium text-foreground">
                    <Star className="size-4 fill-primary text-primary" />
                    {planner.rating}
                  </span>
                </div>
                <button
                  onClick={() => setWriteOpen(true)}
                  className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  <Camera className="size-4" />
                  후기 작성하기
                </button>
              </div>

              {/* Sort dropdown */}
              <div className="relative w-fit">
                <button
                  onClick={() => setSortOpen((v) => !v)}
                  className="flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary"
                >
                  {sortLabels[sort]}
                  <ChevronRight
                    className={`size-3.5 transition-transform ${sortOpen ? 'rotate-90' : 'rotate-90'}`}
                  />
                </button>
                {sortOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setSortOpen(false)}
                    />
                    <div className="absolute left-0 top-full z-20 mt-1.5 w-36 overflow-hidden rounded-xl border border-border bg-popover py-1 shadow-lg">
                      {(Object.keys(sortLabels) as SortKey[]).map((k) => (
                        <button
                          key={k}
                          onClick={() => {
                            setSort(k)
                            setSortOpen(false)
                          }}
                          className={`block w-full px-3.5 py-2 text-left text-xs transition-colors hover:bg-accent ${
                            sort === k
                              ? 'font-semibold text-primary'
                              : 'text-foreground'
                          }`}
                        >
                          {sortLabels[k]}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="flex flex-col gap-3">
                {sortedReviews.map((r) => (
                  <div
                    key={r.id}
                    className="rounded-2xl border border-border bg-card p-4"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">
                        {r.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {r.date}
                      </span>
                    </div>
                    <div className="mb-2 flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`size-3.5 ${
                              i < r.rating
                                ? 'fill-primary text-primary'
                                : 'text-border'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[11px] text-muted-foreground">
                        예식일 {r.weddingDate}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-secondary-foreground">
                      {r.text}
                    </p>
                    {r.photos.length > 0 && (
                      <div className="mt-3 flex gap-2">
                        {r.photos.slice(0, 4).map((p, i) => (
                          <button
                            key={i}
                            onClick={() => openLightbox(r.photos, i)}
                            className="relative size-16 overflow-hidden rounded-xl md:size-20"
                          >
                            <Image
                              src={p || '/placeholder.svg'}
                              alt={`후기 사진 ${i + 1}`}
                              fill
                              className="object-cover transition-transform hover:scale-105"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sticky planner card */}
          <aside className="lg:sticky lg:top-20 lg:h-fit">
            <div className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-5">
              <div className="flex items-center gap-3">
                <Image
                  src={planner.avatar || '/placeholder.svg'}
                  alt={planner.name}
                  width={56}
                  height={56}
                  className="size-14 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-base font-semibold text-foreground">
                      {planner.name} 플래너
                    </span>
                    {planner.verified && (
                      <BadgeCheck className="size-4 text-primary" />
                    )}
                  </div>
                  <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-0.5">
                      <Star className="size-3 fill-primary text-primary" />
                      {planner.rating} ({planner.reviews})
                    </span>
                    <span className="flex items-center gap-0.5">
                      <Clock className="size-3" />
                      {planner.responseTime}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-secondary-foreground">
                {planner.intro}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {planner.specialties.map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-secondary px-2.5 py-1 text-xs text-secondary-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-2 rounded-2xl bg-secondary py-3 text-center">
                <div>
                  <div className="text-sm font-semibold text-foreground">
                    {planner.consultations.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-muted-foreground">상담</div>
                </div>
                <div className="border-x border-border">
                  <div className="text-sm font-semibold text-foreground">
                    {planner.reviews}
                  </div>
                  <div className="text-[11px] text-muted-foreground">후기</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">
                    {planner.rating}
                  </div>
                  <div className="text-[11px] text-muted-foreground">별점</div>
                </div>
              </div>

              <button className="flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
                <MessageCircle className="size-4" />
                상담 신청하기
              </button>

              <ul className="flex flex-col gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 text-primary" />
                  무료 1:1 맞춤 상담
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 text-primary" />
                  예산별 견적 제안
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 text-primary" />
                  계약 후 전담 케어
                </li>
              </ul>
            </div>
          </aside>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-12 border-t border-border pt-8">
            <h2 className="mb-5 font-serif text-2xl font-semibold text-foreground">
              비슷한 {item.type} 포트폴리오
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/portfolio/${r.id}`}
                  className="group flex flex-col gap-2"
                >
                  <div className="overflow-hidden rounded-2xl">
                    <Image
                      src={r.image || '/placeholder.svg'}
                      alt={r.title}
                      width={240}
                      height={240}
                      className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <span className="truncate px-0.5 text-sm font-medium text-foreground">
                    {r.title}
                  </span>
                  <span className="-mt-1.5 truncate px-0.5 text-xs text-muted-foreground">
                    {r.type} · {r.region}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Review write modal */}
      {writeOpen && (
        <ReviewWriteModal
          onClose={() => setWriteOpen(false)}
          onSubmit={() => {
            setWriteOpen(false)
            showToast('후기가 정상적으로 등록되었습니다.')
          }}
        />
      )}

      {/* Report modal */}
      {reportOpen && (
        <ReportModal
          onClose={() => setReportOpen(false)}
          onSubmit={() => {
            setReportOpen(false)
            showToast(
              '신고가 정상적으로 접수되었습니다.',
              '관리자가 검토 후 처리할 예정입니다.',
            )
          }}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-[60] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 px-2">
          <div className="flex items-start gap-3 rounded-2xl border border-border bg-popover px-4 py-3 shadow-lg duration-300 animate-in fade-in slide-in-from-bottom-4">
            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Check className="size-3.5" />
            </span>
            <div className="flex flex-col gap-0.5">
              <p className="text-sm font-medium text-foreground">{toast.title}</p>
              {toast.desc && (
                <p className="text-xs text-muted-foreground">{toast.desc}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/80 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <button
            aria-label="닫기"
            onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-background/80 text-foreground"
          >
            <X className="size-5" />
          </button>
          <button
            aria-label="이전"
            onClick={(e) => {
              e.stopPropagation()
              lightboxPrev()
            }}
            className="absolute left-4 flex size-11 items-center justify-center rounded-full bg-background/80 text-foreground"
          >
            <ChevronLeft className="size-6" />
          </button>
          <div
            className="relative max-h-[80vh] w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox.photos[lightbox.index] || '/placeholder.svg'}
              alt="후기 사진 크게 보기"
              width={1000}
              height={750}
              className="mx-auto max-h-[80vh] w-auto rounded-2xl object-contain"
            />
            <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-foreground/70 px-3 py-1 text-xs text-background">
              {lightbox.index + 1} / {lightbox.photos.length}
            </span>
          </div>
          <button
            aria-label="다음"
            onClick={(e) => {
              e.stopPropagation()
              lightboxNext()
            }}
            className="absolute right-4 flex size-11 items-center justify-center rounded-full bg-background/80 text-foreground"
          >
            <ChevronRight className="size-6" />
          </button>
        </div>
      )}

      {/* Share modal (existing centered modal) */}
      <ShareModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        url={shareUrl}
        planner={{
          name: planner.name,
          avatar: planner.avatar,
          rating: planner.rating,
        }}
      />
      </div>
    </div>
  )
}

/* ---------- Report modal ---------- */
const reportReasons = [
  '허위 포트폴리오',
  '타인의 사진 도용',
  '광고성 콘텐츠',
  '부적절한 이미지',
  '욕설 및 비방',
  '기타',
] as const

function ReportModal({
  onClose,
  onSubmit,
}: {
  onClose: () => void
  onSubmit: () => void
}) {
  const [reason, setReason] = useState<string>('')
  const [detail, setDetail] = useState('')

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        className="flex max-h-[90vh] w-full max-w-md flex-col overflow-y-auto rounded-t-3xl bg-card p-6 sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-serif text-xl font-semibold text-foreground">
            포트폴리오 신고하기
          </h3>
          <button
            aria-label="닫기"
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent"
          >
            <X className="size-5" />
          </button>
        </div>
        <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
          부적절하거나 허위로 등록된 포트폴리오를 신고해주세요.
        </p>

        <form
          className="flex flex-col gap-5"
          onSubmit={(e) => {
            e.preventDefault()
            onSubmit()
          }}
        >
          {/* Reason radio */}
          <fieldset className="flex flex-col gap-2">
            <legend className="mb-1 text-sm font-medium text-foreground">
              신고 사유
            </legend>
            {reportReasons.map((r) => (
              <label
                key={r}
                className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-sm transition-colors ${
                  reason === r
                    ? 'border-primary bg-primary/5 text-foreground'
                    : 'border-border text-secondary-foreground hover:border-primary/40'
                }`}
              >
                <input
                  type="radio"
                  name="reportReason"
                  value={r}
                  checked={reason === r}
                  onChange={() => setReason(r)}
                  className="sr-only"
                />
                <span
                  className={`flex size-4 shrink-0 items-center justify-center rounded-full border ${
                    reason === r ? 'border-primary' : 'border-muted-foreground/40'
                  }`}
                >
                  {reason === r && (
                    <span className="size-2 rounded-full bg-primary" />
                  )}
                </span>
                {r}
              </label>
            ))}
          </fieldset>

          {/* Detail */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="reportDetail"
              className="text-sm font-medium text-foreground"
            >
              상세 내용
            </label>
            <textarea
              id="reportDetail"
              rows={4}
              maxLength={500}
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              placeholder="신고 사유를 입력해주세요."
              className="resize-none rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
            />
            <span className="self-end text-[11px] text-muted-foreground">
              {detail.length} / 500
            </span>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-border py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={!reason}
              className="flex-1 rounded-xl bg-primary py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              신고 접수
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

/* ---------- Review write modal ---------- */
function ReviewWriteModal({
  onClose,
  onSubmit,
}: {
  onClose: () => void
  onSubmit: () => void
}) {
  const [rating, setRating] = useState(5)
  const [hover, setHover] = useState(0)

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        className="flex max-h-[90vh] w-full max-w-md flex-col overflow-y-auto rounded-t-3xl bg-card p-6 sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-serif text-xl font-semibold text-foreground">
            후기 작성
          </h3>
          <button
            aria-label="닫기"
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent"
          >
            <X className="size-5" />
          </button>
        </div>

        <form
          className="flex flex-col gap-5"
          onSubmit={(e) => {
            e.preventDefault()
            onSubmit()
          }}
        >
          {/* Rating */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">별점</label>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setRating(i + 1)}
                  onMouseEnter={() => setHover(i + 1)}
                  onMouseLeave={() => setHover(0)}
                  aria-label={`${i + 1}점`}
                >
                  <Star
                    className={`size-8 transition-colors ${
                      i < (hover || rating)
                        ? 'fill-primary text-primary'
                        : 'text-border'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Wedding date */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="weddingDate"
              className="text-sm font-medium text-foreground"
            >
              웨딩 진행일
            </label>
            <input
              id="weddingDate"
              type="date"
              className="rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-primary"
            />
          </div>

          {/* Text */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="reviewText"
              className="text-sm font-medium text-foreground"
            >
              후기 작성
            </label>
            <textarea
              id="reviewText"
              rows={4}
              placeholder="플래너와 함께한 경험을 들려주세요."
              className="resize-none rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
            />
          </div>

          {/* Photo attach */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-foreground">사진 첨부</span>
            <label
              htmlFor="reviewPhotos"
              className="flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-border py-6 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <ImagePlus className="size-6" />
              사진을 추가해 주세요 (최대 4장)
              <input
                id="reviewPhotos"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
              />
            </label>
          </div>

          <button
            type="submit"
            className="mt-1 rounded-xl bg-primary py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            후기 등록하기
          </button>
        </form>
      </div>
    </div>
  )
}
