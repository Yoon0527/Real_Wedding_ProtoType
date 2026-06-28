'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Heart,
  Eye,
  MessageCircle,
  BadgeCheck,
  Star,
  Bookmark,
  Share2,
  Wallet,
  Check,
} from 'lucide-react'
import type { Portfolio } from '@/lib/wedding-data'
import { budgetLabel } from '@/lib/wedding-data'
import { ShareModal } from '@/components/share-modal'
import { ConsultationModal, type ConsultationFormData } from '@/components/consultation-modal'
import { addConsultation } from '@/lib/consultation-store'
import type { Consultation } from '@/lib/my-wedding-data'

const badgeStyles: Record<string, string> = {
  BEST: 'bg-primary text-primary-foreground',
  NEW: 'bg-foreground text-background',
  인기: 'bg-accent text-accent-foreground',
  응답빠름: 'bg-card text-primary border border-primary',
}

export function PortfolioCard({
  item,
  defaultBookmarked = false,
  bookmarkLabel = '찜하기',
  selectable = false,
  selected = false,
  onToggleSelect,
}: {
  item: Portfolio
  defaultBookmarked?: boolean
  bookmarkLabel?: string
  selectable?: boolean
  selected?: boolean
  onToggleSelect?: () => void
}) {
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(defaultBookmarked)
  const [shareOpen, setShareOpen] = useState(false)
  const [consultOpen, setConsultOpen] = useState(false)
  const [toast, setToast] = useState(false)

  const budget = budgetLabel(item)

  const handleConsultSubmit = (data: ConsultationFormData) => {
    const today = new Date()
    const shortDate = `${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`
    const isoDate = today.toISOString().slice(0, 10)

    const record: Consultation = {
      id: `c-${Date.now()}`,
      planner: item.planner,
      status: '대기중',
      weddingType: item.type,
      region: item.region,
      requestedDate: isoDate,
      budget: data.budget,
      message: data.message,
      unreadMessages: 0,
      timeline: [
        { label: '상담 요청', date: shortDate, done: true },
        { label: '플래너 응답', date: '-', done: false },
        { label: '상담 진행', date: '-', done: false },
        { label: '예약 확정', date: '-', done: false },
      ],
    }
    addConsultation(record)
    setConsultOpen(false)
    setToast(true)
    setTimeout(() => setToast(false), 3000)
  }

  const shareUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/portfolio/${item.id}`
      : `https://realwedding.co.kr/portfolio/${item.id}`

  return (
    <div className="group mb-4 break-inside-avoid">
      <div
        className={`rounded-2xl bg-card shadow-sm transition-shadow hover:shadow-md ${
          selectable && selected ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''
        }`}
      >
        {/* Image area */}
        <Link href={`/portfolio/${item.id}`} className="relative block overflow-hidden rounded-t-2xl">
          <Image
            src={item.image || '/placeholder.svg'}
            alt={item.title}
            width={400}
            height={item.height}
            className="w-full object-cover"
            style={{ aspectRatio: `400 / ${item.height}` }}
          />

          {/* Compare selection checkbox */}
          {selectable && (
            <button
              onClick={(e) => {
                e.preventDefault()
                onToggleSelect?.()
              }}
              aria-label="비교 선택"
              aria-pressed={selected}
              className={`absolute left-3 top-3 z-10 flex size-7 items-center justify-center rounded-full border-2 backdrop-blur transition-colors ${
                selected
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-white bg-white/80 text-transparent'
              }`}
            >
              <Check className="size-4" />
            </button>
          )}

          {/* Badge */}
          {item.badge && (
            <span
              className={`absolute top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                selectable ? 'left-12' : 'left-3'
              } ${badgeStyles[item.badge]}`}
            >
              {item.badge}
            </span>
          )}

          {/* Quick Like button (always visible) */}
          <button
            onClick={(e) => {
              e.preventDefault()
              setLiked((v) => !v)
            }}
            aria-label="좋아요"
            aria-pressed={liked}
            className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-white/90 text-foreground backdrop-blur transition-transform hover:scale-110"
          >
            <Heart className={`size-4 ${liked ? 'fill-primary text-primary' : ''}`} />
          </button>

          {/* Hover overlay */}
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="p-4">
              <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white">
                <span className="flex items-center gap-1">
                  <Heart className="size-3.5" />
                  {item.likes}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="size-3.5" />
                  {item.views.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="size-3.5" />
                  {item.comments}
                </span>
                <span className="flex items-center gap-1">
                  <Wallet className="size-3.5" />
                  예산 {budget}
                </span>
              </div>
              <span className="inline-block rounded-full bg-white px-4 py-2 text-xs font-medium text-foreground">
                포트폴리오 보기
              </span>
            </div>
          </div>
        </Link>

        {/* Bottom info bar */}
        <div className="flex items-center justify-between gap-2 px-3 py-2.5">
          <Link href={`/portfolio/${item.id}`} className="flex min-w-0 items-center gap-2">
            <Image
              src={item.planner.avatar || '/placeholder.svg'}
              alt={item.planner.name}
              width={24}
              height={24}
              className="size-6 shrink-0 rounded-full object-cover"
            />
            <span className="flex min-w-0 items-center gap-1">
              <span className="truncate text-xs font-medium text-foreground">
                {item.planner.name} 플래너
              </span>
              {item.planner.verified && (
                <BadgeCheck className="size-3.5 shrink-0 text-primary" />
              )}
            </span>
          </Link>
          <span className="flex shrink-0 items-center gap-0.5 text-xs text-muted-foreground">
            <Star className="size-3 fill-primary text-primary" />
            {item.rating}
          </span>
        </div>

        {/* Card actions */}
        <div className="flex items-stretch gap-1 border-t border-border px-2 py-1.5">
          {/* Like */}
          <button
            onClick={() => setLiked((v) => !v)}
            aria-pressed={liked}
            className="flex flex-1 flex-col items-center justify-center gap-1 rounded-lg py-1.5 text-[10px] text-secondary-foreground transition-colors hover:bg-accent"
          >
            <Heart className={`size-4 ${liked ? 'fill-primary text-primary' : ''}`} />
            좋아요
          </button>

          {/* Bookmark — matches sidebar icon */}
          <button
            onClick={() => setBookmarked((v) => !v)}
            aria-pressed={bookmarked}
            className="flex flex-1 flex-col items-center justify-center gap-1 rounded-lg py-1.5 text-[10px] text-secondary-foreground transition-colors hover:bg-accent"
          >
            <Bookmark className={`size-4 ${bookmarked ? 'fill-primary text-primary' : ''}`} />
            {bookmarked ? bookmarkLabel : '찜하기'}
          </button>

          {/* Consultation */}
          <button
            onClick={() => setConsultOpen(true)}
            className="flex flex-1 flex-col items-center justify-center gap-1 whitespace-nowrap rounded-lg py-1.5 text-[10px] font-medium text-primary transition-colors hover:bg-accent"
          >
            <MessageCircle className="size-4" />
            상담신청
          </button>

          {/* Share */}
          <button
            onClick={() => setShareOpen(true)}
            className="flex flex-1 flex-col items-center justify-center gap-1 rounded-lg py-1.5 text-[10px] text-secondary-foreground transition-colors hover:bg-accent"
          >
            <Share2 className="size-4" />
            공유
          </button>
        </div>
      </div>

      <ShareModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        url={shareUrl}
        planner={{
          name: item.planner.name,
          avatar: item.planner.avatar,
          rating: item.rating,
        }}
      />

      <ConsultationModal
        open={consultOpen}
        onClose={() => setConsultOpen(false)}
        planner={item.planner}
        onSubmit={handleConsultSubmit}
      />

      {/* Success toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background shadow-lg duration-300 animate-in fade-in slide-in-from-bottom-2">
          <Check className="size-4 text-primary" />
          상담 신청이 완료되었습니다.
        </div>
      )}
    </div>
  )
}
