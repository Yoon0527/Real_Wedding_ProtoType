'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { X, Link2, MessageCircle, AtSign, Star, Check } from 'lucide-react'

export type SharePlanner = {
  name: string
  avatar: string
  rating: number
}

export function ShareModal({
  open,
  onClose,
  planner,
  url,
}: {
  open: boolean
  onClose: () => void
  planner: SharePlanner
  url: string
}) {
  const [toast, setToast] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  // Trigger enter animation
  useEffect(() => {
    if (open) {
      const id = requestAnimationFrame(() => setMounted(true))
      return () => cancelAnimationFrame(id)
    }
    setMounted(false)
  }, [open])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  const showToast = (msg: string) => {
    setToast(msg)
    window.setTimeout(() => setToast(null), 2600)
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      /* clipboard may be unavailable */
    }
    showToast('링크가 복사되었습니다.')
  }

  const shareKakao = () => {
    // Kakao Share API entry point (SDK not loaded in preview)
    const w = window as unknown as { Kakao?: { Share?: { sendDefault: (o: unknown) => void } } }
    if (w.Kakao?.Share) {
      w.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: `${planner.name} 플래너`,
          description: `평점 ${planner.rating} · Wedding Planner`,
          imageUrl: planner.avatar,
          link: { mobileWebUrl: url, webUrl: url },
        },
      })
    } else {
      showToast('카카오톡 공유 창을 여는 중입니다.')
    }
  }

  const shareInstagram = async () => {
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      /* clipboard may be unavailable */
    }
    showToast('링크가 복사되었습니다. 인스타그램 스토리 또는 DM에 붙여넣어 공유해보세요.')
  }

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="공유하기"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 transition-opacity duration-200"
        style={{ opacity: mounted ? 1 : 0 }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative z-10 w-[90vw] max-w-[420px] rounded-[20px] bg-white p-6 shadow-2xl transition-all duration-200 sm:w-[380px] lg:w-[420px]"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'scale(1)' : 'scale(0.95)',
        }}
      >
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">공유하기</h2>
          <button
            onClick={onClose}
            aria-label="닫기"
            className="flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Planner preview */}
        <div className="mb-6 flex items-center gap-3 rounded-2xl bg-secondary/60 p-3">
          <Image
            src={planner.avatar || '/placeholder.svg'}
            alt={planner.name}
            width={48}
            height={48}
            className="size-12 shrink-0 rounded-full object-cover"
          />
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-medium text-foreground">
              {planner.name} 플래너
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="size-3.5 fill-primary text-primary" />
              {planner.rating}
            </span>
          </div>
        </div>

        {/* Share options */}
        <div className="mb-6 flex items-start justify-center gap-6">
          <ShareOption
            label="링크 복사"
            onClick={copyLink}
            icon={<Link2 className="size-6 text-foreground" />}
          />
          <ShareOption
            label="카카오톡 공유"
            onClick={shareKakao}
            icon={<MessageCircle className="size-6 text-foreground" />}
          />
          <ShareOption
            label="인스타그램 공유"
            onClick={shareInstagram}
            icon={<AtSign className="size-6 text-foreground" />}
          />
        </div>

        {/* Link copy section */}
        <div className="flex items-center gap-2 rounded-2xl border border-border bg-secondary/40 p-1.5 pl-3">
          <input
            type="text"
            readOnly
            value={url}
            aria-label="공유 링크"
            className="min-w-0 flex-1 truncate bg-transparent text-xs text-muted-foreground outline-none"
          />
          <button
            onClick={copyLink}
            className="shrink-0 rounded-xl bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            복사
          </button>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-[80] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 px-2">
          <div className="flex items-start gap-3 rounded-2xl border border-border bg-popover px-4 py-3 shadow-lg duration-300 animate-in fade-in slide-in-from-bottom-4">
            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Check className="size-3.5" />
            </span>
            <p className="text-sm leading-relaxed text-foreground">{toast}</p>
          </div>
        </div>
      )}
    </div>
  )
}

function ShareOption({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-20 flex-col items-center gap-2 text-center"
    >
      <span className="flex size-16 items-center justify-center rounded-full bg-secondary transition-all duration-200 hover:scale-105 hover:shadow-md">
        {icon}
      </span>
      <span className="text-xs text-foreground">{label}</span>
    </button>
  )
}
