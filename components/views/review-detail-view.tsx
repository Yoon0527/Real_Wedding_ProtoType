"use client"

import { useState, useRef, useEffect } from "react"
import {
  CheckCircle, MapPin, CalendarDays,
  Wallet, Star, Heart, MessageCircle, Share2,
  ChevronLeft, ChevronRight, BadgeCheck,
  MoreVertical, Flag, UserX, Ban, X, CheckCircle2,
  AlertCircle, Send,
} from "lucide-react"
import { cn } from "@/lib/utils"

// ── Static mock data ─────────────────────────────────────────────────────────
const POST = {
  title: "강남 S컨벤션 웨딩홀 솔직 후기 — 200명 규모 본식 전체 비용 공개",
  nickname: "행복한신부",
  role: "예비 신부",
  date: "2025.04.18",
  category: "웨딩홀",
  venueName: "강남 S컨벤션",
  totalCost: 45500000,
  weddingDate: "2024.10",
  likes: 245,
  comments: 38,
  isVerified: true,
  images: [
    "/placeholder.svg?height=480&width=720&text=웨딩홀+전경",
    "/placeholder.svg?height=480&width=720&text=홀+내부",
    "/placeholder.svg?height=480&width=720&text=식사+코스",
    "/placeholder.svg?height=480&width=720&text=플라워+장식",
  ],
  priceTransparency: 5,
  ratings: [
    { label: "주차 및 교통",         score: 5.0 },
    { label: "식사 퀄리티",           score: 4.0 },
    { label: "홀 분위기",             score: 5.0 },
    { label: "직원 응대",             score: 4.5 },
  ],
  body: `결혼 준비를 하면서 가장 많이 고민했던 웨딩홀 후기를 공유합니다. 저는 200명 규모의 본식을 강남 S컨벤션에서 진행했어요.

전체적인 만족도는 정말 높았습니다. 우선 위치가 강남역 도보 5분 거리라 하객분들이 찾아오시기 너무 편리했고, 지하 주차장도 200대 규모라 주차 걱정이 전혀 없었어요.

식사 퀄리티는 웨딩홀 치고 상당히 높은 편이었어요. 한식 뷔페였는데 고기 종류만 5가지 이상이었고, 샐러드 바와 디저트 코너도 알차게 구성되어 있었습니다. 하객분들께서 음식이 너무 맛있다고 칭찬을 많이 해주셨어요.

홀 분위기는 클래식하면서도 모던한 느낌이라 어르신들도, 젊은 하객분들도 모두 좋아하셨습니다. 특히 조명이 따뜻한 골드 톤이라 사진이 전부 예쁘게 나온 것이 가장 만족스러웠어요.

비용은 솔직하게 공개합니다. 홀 대관비 기본 800만원, 1인당 식대 6만 5천원 x 200명 = 1,300만원, 꽃장식 350만원, 영상 450만원, 기타 부대비용 포함 총 4,550만원이 나왔습니다. 처음 견적보다 약 150만원 초과됐는데 그 부분은 미리 협의했으면 좋았을 것 같아요.

플래너 서비스는 정말 최상이었어요. 당일 진행을 꼼꼼하게 도와주셔서 저는 긴장 풀고 식을 즐길 수 있었습니다. 이 정도 금액이면 충분히 납득할 수 있는 퀄리티라고 생각합니다.`,
}

const REPORT_REASONS = [
  "허위 정보 / 조작 후기",
  "스팸 / 광고성 게시물",
  "욕설 / 혐오 표현",
  "개인정보 침해",
]

const COMMENTS = [
  {
    id: 1,
    nickname: "예비신랑A",
    date: "2025.04.19",
    text: "정말 도움이 되는 후기 감사해요! 저도 비슷한 규모로 알아보고 있는데 비용 공개가 너무 현실적이에요.",
    likes: 14,
  },
  {
    id: 2,
    nickname: "웨딩준비중",
    date: "2025.04.20",
    text: "식대가 6만 5천원이면 괜찮은 편 아닌가요? 제가 알아본 곳은 7만원 넘었는데 퀄리티가 훨씬 낮았어요.",
    likes: 8,
  },
  {
    id: 3,
    nickname: "플래너김수진",
    date: "2025.04.21",
    text: "S컨벤션 저도 거래한 적 있는데 직원분들이 정말 프로페셔널하시더라고요. 좋은 선택 하셨네요!",
    likes: 22,
  },
]

// ── MoreMenu ─────────────────────────────────────────────────────────────────
function MoreMenu({
  onReportPost,
  onReportUser,
  onBlockUser,
}: {
  onReportPost: () => void
  onReportUser: () => void
  onBlockUser: () => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    if (open) document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [open])

  const items: { icon: React.ElementType; label: string; action: () => void; danger: boolean }[] = [
    { icon: Flag,  label: "게시글 신고",  action: onReportPost, danger: false },
    { icon: UserX, label: "작성자 신고",  action: onReportUser, danger: false },
    { icon: Ban,   label: "작성자 차단",  action: onBlockUser,  danger: true  },
  ]

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="더보기"
      >
        <MoreVertical className="h-5 w-5 text-gray-500" />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1.5 w-44 rounded-2xl bg-white border border-gray-200 shadow-xl z-50 overflow-hidden">
          {items.map(({ icon: Icon, label, action, danger }, idx) => (
            <button
              key={label}
              onClick={() => { setOpen(false); action() }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-2.5 text-[13px] font-medium transition-colors",
                idx !== 0 && "border-t border-gray-100",
                danger ? "text-red-500 hover:bg-red-50" : "text-gray-700 hover:bg-gray-50"
              )}
            >
              <Icon className={cn("h-4 w-4 flex-shrink-0", danger ? "text-red-400" : "text-gray-400")} />
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ── ReportModal ───────────────────────────────────────────────────────────────
function ReportModal({ title, onClose }: { title: string; onClose: () => void }) {
  const [selected, setSelected] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (!selected) return
    setSubmitted(true)
    setTimeout(onClose, 1800)
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center bg-black/40 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-gray-200" />
        </div>
        <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-gray-200">
          <h2 className="text-[15px] font-bold text-gray-900">{title}</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 transition-colors">
            <X className="h-4 w-4 text-gray-400" />
          </button>
        </div>
        {submitted ? (
          <div className="flex flex-col items-center gap-3 py-12">
            <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
              <CheckCircle2 className="h-7 w-7 text-green-600" />
            </div>
            <p className="text-[14px] font-semibold text-gray-800">신고가 접수되었습니다</p>
            <p className="text-xs text-gray-500 text-center px-8">검토 후 조치하겠습니다. 소중한 제보 감사합니다.</p>
          </div>
        ) : (
          <>
            <p className="px-5 pt-4 pb-2 text-[12px] text-gray-500">해당하는 신고 사유를 선택해 주세요.</p>
            <div className="px-5 pb-2 flex flex-col gap-2">
              {REPORT_REASONS.map((reason) => (
                <button
                  key={reason}
                  onClick={() => setSelected(reason)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left text-[13px] font-medium transition-all",
                    selected === reason
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300 hover:bg-gray-100"
                  )}
                >
                  <span className={cn(
                    "w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors",
                    selected === reason ? "border-primary bg-primary" : "border-gray-300"
                  )}>
                    {selected === reason && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </span>
                  {reason}
                </button>
              ))}
            </div>
            <div className="px-5 py-4">
              <button
                onClick={handleSubmit}
                disabled={!selected}
                className={cn(
                  "w-full py-3.5 rounded-xl text-[14px] font-bold transition-all",
                  selected
                    ? "bg-primary text-primary-foreground hover:opacity-90 shadow-sm"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                )}
              >
                신고 제출
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// ── BlockToast ────────────────────────────────────────────────────────────────
function BlockToast({ visible }: { visible: boolean }) {
  return (
    <div className={cn(
      "fixed bottom-24 left-0 right-0 z-[60] flex justify-center transition-all duration-300",
      visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
    )}>
      <div className="mx-4 max-w-sm w-full flex items-center gap-3 px-5 py-3.5 bg-gray-900 text-white rounded-2xl shadow-xl">
        <Ban className="h-4 w-4 text-red-400 flex-shrink-0" />
        <p className="text-[13px] font-medium">이 사용자의 게시물을 더 이상 볼 수 없습니다.</p>
      </div>
    </div>
  )
}

// ── StarRow ───────────────────────────────────────────────────────────────────
function StarRow({ score, max = 5 }: { score: number; max?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-4 w-4",
            i < score ? "fill-primary text-primary" : "fill-transparent text-gray-200"
          )}
        />
      ))}
    </div>
  )
}

// ── RatingBar ─────────────────────────────────────────────────────────────────
function RatingBar({ label, score }: { label: string; score: number }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[13px] text-gray-600">{label}</span>
        <span className="text-[13px] font-semibold text-gray-700 tabular-nums">
          {score.toFixed(1)} / 5.0
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-primary/10 overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-700"
          style={{ width: `${(score / 5) * 100}%` }}
        />
      </div>
    </div>
  )
}

// ── CommentMoreMenu ───────────────────────────────────────────────────────────
function CommentMoreMenu({ onReport, onBlock }: { onReport: () => void; onBlock: () => void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    if (open) document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [open])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="댓글 더보기"
      >
        <MoreVertical className="h-3.5 w-3.5 text-gray-400" />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 w-36 rounded-xl bg-white border border-gray-200 shadow-lg z-50 overflow-hidden">
          <button
            onClick={() => { setOpen(false); onReport() }}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-[12px] font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Flag className="h-3.5 w-3.5 text-gray-400" />
            신고하기
          </button>
          <button
            onClick={() => { setOpen(false); onBlock() }}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-[12px] font-medium text-red-500 hover:bg-red-50 transition-colors border-t border-gray-100"
          >
            <Ban className="h-3.5 w-3.5 text-red-400" />
            차단하기
          </button>
        </div>
      )}
    </div>
  )
}

// ── CommentSection ────────────────────────────────────────────────────────────
function CommentSection({
  commentLikes,
  commentLikeCounts,
  onToggleLike,
  onReport,
  onBlock,
  commentInput,
  onCommentInputChange,
}: {
  commentLikes: Record<number, boolean>
  commentLikeCounts: Record<number, number>
  onToggleLike: (id: number) => void
  onReport: () => void
  onBlock: () => void
  commentInput: string
  onCommentInputChange: (v: string) => void
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-200">
        <span className="text-[13px] font-bold text-gray-900">
          댓글 <span className="text-primary">{POST.comments}</span>
        </span>
      </div>
      <div className="divide-y divide-gray-100">
        {COMMENTS.map((comment) => (
          <div key={comment.id} className="px-5 py-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                <span className="text-[11px] font-bold text-gray-500">{comment.nickname[0]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[13px] font-semibold text-gray-900">{comment.nickname}</span>
                    <span className="text-[11px] text-gray-500">{comment.date}</span>
                  </div>
                  <CommentMoreMenu onReport={onReport} onBlock={onBlock} />
                </div>
                <p className="mt-1.5 text-[13px] text-gray-700 leading-relaxed">{comment.text}</p>
                <button
                  onClick={() => onToggleLike(comment.id)}
                  className="mt-2.5 flex items-center gap-1.5 group"
                >
                  <Heart className={cn(
                    "h-3.5 w-3.5 transition-all",
                    commentLikes[comment.id]
                      ? "fill-primary text-primary scale-110"
                      : "text-gray-300 group-hover:text-primary/50"
                  )} />
                  <span className={cn(
                    "text-[11px] tabular-nums transition-colors",
                    commentLikes[comment.id] ? "text-primary font-semibold" : "text-gray-500"
                  )}>
                    {commentLikeCounts[comment.id]}
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Desktop-only comment input at the bottom of the scroll area */}
      <div className="hidden sm:flex px-4 py-3 border-t border-gray-100 items-center gap-3 bg-gray-50">
        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <span className="text-[10px] font-bold text-primary">나</span>
        </div>
        <input
          type="text"
          value={commentInput}
          onChange={(e) => onCommentInputChange(e.target.value)}
          placeholder="댓글을 남겨보세요..."
          className="flex-1 px-3 py-2 rounded-full bg-white border border-gray-200 text-[12px] text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all"
        />
        <button
          disabled={!commentInput.trim()}
          className={cn(
            "p-2 rounded-full transition-colors",
            commentInput.trim() ? "text-primary hover:bg-primary/10" : "text-gray-300"
          )}
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
interface ReviewDetailViewProps {
  onBack: () => void
}

export function ReviewDetailView({ onBack }: ReviewDetailViewProps) {
  const [currentImage, setCurrentImage] = useState(0)
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(POST.likes)
  const [reportModal, setReportModal] = useState<"post" | "user" | "comment" | null>(null)
  const [blockToast, setBlockToast] = useState(false)
  const [blocked, setBlocked] = useState(false)
  const [commentLikes, setCommentLikes] = useState<Record<number, boolean>>({})
  const [commentLikeCounts, setCommentLikeCounts] = useState<Record<number, number>>(
    Object.fromEntries(COMMENTS.map((c) => [c.id, c.likes]))
  )
  const [commentInput, setCommentInput] = useState("")

  // Touch swipe state for carousel
  const touchStartX = useRef<number | null>(null)

  // Lock background scroll
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  // ESC key closes modal
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onBack() }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [onBack])

  const toggleCommentLike = (id: number) => {
    const isLiked = commentLikes[id]
    setCommentLikes((prev) => ({ ...prev, [id]: !isLiked }))
    setCommentLikeCounts((prev) => ({ ...prev, [id]: prev[id] + (isLiked ? -1 : 1) }))
  }

  const avgScore = POST.ratings.reduce((s, r) => s + r.score, 0) / POST.ratings.length

  const handleLike = () => {
    setLiked((v) => !v)
    setLikeCount((c) => (liked ? c - 1 : c + 1))
  }

  const handleBlockUser = () => {
    setBlockToast(true)
    setTimeout(() => setBlockToast(false), 3000)
    setTimeout(() => setBlocked(true), 400)
  }

  const prevImage = () => setCurrentImage((i) => (i - 1 + POST.images.length) % POST.images.length)
  const nextImage = () => setCurrentImage((i) => (i + 1) % POST.images.length)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) diff > 0 ? nextImage() : prevImage()
    touchStartX.current = null
  }

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onBack}
    >
      {/*
        Mobile  : bottom sheet — 95dvh, slides up, rounded top corners
        Desktop : centered modal — max-w-[800px], max-h-[90vh], scrollable
      */}
      <div
        className={cn(
          "relative w-full bg-white shadow-2xl flex flex-col",
          "h-[95dvh] rounded-t-3xl",
          "sm:h-auto sm:max-h-[90vh] sm:max-w-[800px] sm:rounded-2xl sm:mx-4",
          "animate-in slide-in-from-bottom duration-300 sm:fade-in sm:zoom-in-95 sm:duration-200"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle — mobile only */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden flex-shrink-0">
          <div className="w-10 h-1.5 rounded-full bg-gray-200" />
        </div>

        {/* Close button */}
        <button
          onClick={onBack}
          className="absolute top-3 right-3 z-30 p-2 rounded-full bg-white hover:bg-gray-100 border border-gray-200 shadow-sm transition-colors"
          aria-label="닫기"
        >
          <X className="h-5 w-5 text-gray-600" />
        </button>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto overscroll-contain" style={{ touchAction: "pan-y" }}>
          {blocked ? (
            // Blocked state
            <div className="flex flex-col items-center justify-center min-h-full gap-4 py-32 px-8">
              <div className="w-16 h-16 rounded-full bg-red-50 border border-red-100 flex items-center justify-center">
                <Ban className="h-7 w-7 text-red-400" />
              </div>
              <p className="text-[14px] font-semibold text-gray-800 text-center">이 사용자를 차단했습니다</p>
              <p className="text-xs text-gray-500 text-center">이 사용자의 게시물이 더 이상 표시되지 않습니다.</p>
              <button
                onClick={onBack}
                className="mt-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                커뮤니티로 돌아가기
              </button>
            </div>
          ) : (
            <div className="pb-4">
              {/* ── Sticky top bar ── */}
              <div className="sticky top-0 z-20 flex items-center justify-between gap-3 px-4 py-3 bg-white/95 backdrop-blur-sm border-b border-gray-200">
                <span className="text-sm font-semibold text-gray-900 truncate">{POST.category} 후기</span>
                <MoreMenu
                  onReportPost={() => setReportModal("post")}
                  onReportUser={() => setReportModal("user")}
                  onBlockUser={handleBlockUser}
                />
              </div>

              {/* ── Author header ── */}
              <div className="px-5 pt-5 pb-3 flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <span className="text-sm font-bold text-primary">{POST.nickname[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[15px] font-bold text-gray-900">{POST.nickname}</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-primary/10 text-primary border border-primary/20">
                      {POST.role}
                    </span>
                    {POST.isVerified && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-green-50 text-green-700 border border-green-200">
                        <CheckCircle className="h-3 w-3" />
                        영수증 인증됨
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{POST.date}</p>
                </div>
              </div>

              {/* ── Title ── */}
              <div className="px-5 pb-4">
                <h1 className="text-[17px] font-bold text-gray-900 leading-snug text-balance">{POST.title}</h1>
              </div>

              {/* ── Image carousel ── */}
              <div
                className="group relative w-full aspect-[4/3] sm:aspect-[16/9] bg-gray-100 overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <img
                  key={currentImage}
                  src={POST.images[currentImage]}
                  alt={`웨딩 사진 ${currentImage + 1}`}
                  className="w-full h-full object-cover"
                />
                {POST.images.length > 1 && (
                  <>
                    {/* Desktop: arrows visible on hover */}
                    <button
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity sm:flex hidden items-center justify-center"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity sm:flex hidden items-center justify-center"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                    {/* Mobile: minimal tap areas */}
                    <button onClick={prevImage} className="absolute left-0 top-0 h-full w-1/4 sm:hidden" aria-label="이전" />
                    <button onClick={nextImage} className="absolute right-0 top-0 h-full w-1/4 sm:hidden" aria-label="다음" />
                  </>
                )}
                {/* Dot indicators */}
                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 pointer-events-none">
                  {POST.images.map((_, i) => (
                    <span
                      key={i}
                      className={cn(
                        "h-1.5 rounded-full bg-white transition-all",
                        i === currentImage ? "w-4 opacity-100" : "w-1.5 opacity-50"
                      )}
                    />
                  ))}
                </div>
                {/* Counter badge */}
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-black/40 text-white text-[11px] font-medium">
                  {currentImage + 1} / {POST.images.length}
                </div>
              </div>

              {/* ── Fact summary card ── */}
              <div className="mx-4 mt-4">
                <div className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                  <div className="flex items-center gap-2 px-4 py-3 bg-primary/5 border-b border-gray-200">
                    <BadgeCheck className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-xs font-bold text-primary tracking-wide uppercase">팩트 인증 데이터</span>
                  </div>
                  <div className="divide-y divide-gray-200">
                    <div className="flex items-center gap-3 px-4 py-3">
                      <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      <span className="text-xs text-gray-500 w-14 flex-shrink-0">업체명</span>
                      <span className="text-[13px] font-semibold text-gray-900 truncate">{POST.venueName}</span>
                    </div>
                    <div className="flex items-center gap-3 px-4 py-3">
                      <Wallet className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      <span className="text-xs text-gray-500 w-14 flex-shrink-0">총 견적</span>
                      <span className="text-[13px] font-bold text-primary">
                        {POST.totalCost.toLocaleString("ko-KR")}원
                      </span>
                    </div>
                    <div className="flex items-center gap-3 px-4 py-3">
                      <CalendarDays className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      <span className="text-xs text-gray-500 w-14 flex-shrink-0">진행일</span>
                      <span className="text-[13px] font-semibold text-gray-900">{POST.weddingDate}</span>
                    </div>
                  </div>
                </div>
                {/* Unverified warning */}
                {!POST.isVerified && (
                  <div className="mt-2 flex items-start gap-2 px-1">
                    <AlertCircle className="h-3.5 w-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <p className="text-[11px] text-gray-400 leading-relaxed">
                      해당 견적은 증빙 서류가 첨부되지 않은 일반 후기입니다.
                    </p>
                  </div>
                )}
              </div>

              {/* ── Dynamic rating report ── */}
              <div className="mx-4 mt-4">
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="px-4 py-4 border-b border-gray-200 flex items-center justify-between">
                    <span className="text-[13px] font-bold text-gray-900">항목별 평점</span>
                    <div className="flex items-center gap-2">
                      <StarRow score={Math.round(avgScore)} />
                      <span className="text-sm font-bold text-primary tabular-nums">{avgScore.toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="px-4 py-4 space-y-5">
                    {/* Price transparency — featured row */}
                    <div className="flex items-center justify-between p-3 rounded-xl bg-primary/5 border border-primary/20">
                      <div>
                        <p className="text-[10px] font-semibold text-primary uppercase tracking-wide mb-0.5">공통 항목</p>
                        <p className="text-[13px] font-bold text-gray-900">가격 투명성</p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <StarRow score={POST.priceTransparency} />
                        <span className="text-xs font-semibold text-primary tabular-nums">
                          {POST.priceTransparency}.0 / 5.0
                        </span>
                      </div>
                    </div>
                    {/* Category bars */}
                    <div className="space-y-4">
                      {POST.ratings.map((r) => (
                        <RatingBar key={r.label} label={r.label} score={r.score} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Review body ── */}
              <div className="mx-4 mt-4">
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-5 py-5">
                  <p className="text-[14px] text-gray-700 leading-7 whitespace-pre-line">{POST.body}</p>
                </div>
              </div>

              {/* ── Tags ── */}
              <div className="px-4 pt-3 pb-2 flex flex-wrap gap-2">
                {[POST.category, POST.venueName, "200명규모", "강남"].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 text-xs font-medium">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* ── Like row (desktop) — before comments ── */}
              <div className="hidden sm:flex items-center gap-4 px-5 py-3 border-t border-b border-gray-100 mx-4 mt-2 rounded-xl">
                <button
                  onClick={handleLike}
                  className="flex items-center gap-2 group"
                >
                  <div className={cn(
                    "p-1.5 rounded-full transition-all",
                    liked ? "bg-primary/10" : "group-hover:bg-primary/5"
                  )}>
                    <Heart className={cn(
                      "h-5 w-5 transition-all",
                      liked ? "fill-primary text-primary scale-110" : "text-gray-400"
                    )} />
                  </div>
                  <span className="text-[13px] font-medium tabular-nums text-gray-600">{likeCount.toLocaleString()}</span>
                </button>
                <button className="flex items-center gap-2 group">
                  <div className="p-1.5 rounded-full group-hover:bg-gray-100 transition-colors">
                    <MessageCircle className="h-5 w-5 text-gray-400" />
                  </div>
                  <span className="text-[13px] font-medium tabular-nums text-gray-600">{POST.comments}</span>
                </button>
                <button className="flex items-center gap-2 group ml-auto">
                  <div className="p-1.5 rounded-full group-hover:bg-gray-100 transition-colors">
                    <Share2 className="h-5 w-5 text-gray-400" />
                  </div>
                  <span className="text-[13px] font-medium text-gray-600">공유</span>
                </button>
              </div>

              {/* ── Comments ── */}
              <div className="mx-4 mt-4 mb-6">
                <CommentSection
                  commentLikes={commentLikes}
                  commentLikeCounts={commentLikeCounts}
                  onToggleLike={toggleCommentLike}
                  onReport={() => setReportModal("comment")}
                  onBlock={handleBlockUser}
                  commentInput={commentInput}
                  onCommentInputChange={setCommentInput}
                />
              </div>
            </div>
          )}
        </div>

        {/* ── Mobile sticky bottom bar (like + comment input) ── */}
        {!blocked && (
          <div className="flex-shrink-0 sm:hidden border-t border-gray-200 bg-white px-4 py-3 flex items-center gap-3">
            <button onClick={handleLike} className="flex items-center gap-1.5 flex-shrink-0">
              <Heart className={cn(
                "h-5 w-5 transition-all",
                liked ? "fill-primary text-primary scale-110" : "text-gray-400"
              )} />
              <span className="text-[12px] tabular-nums text-gray-600 font-medium">{likeCount.toLocaleString()}</span>
            </button>
            <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-full bg-gray-100 border border-gray-200">
              <input
                type="text"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="댓글을 남겨보세요..."
                className="flex-1 bg-transparent text-[13px] text-gray-700 placeholder:text-gray-400 focus:outline-none"
              />
              <button
                disabled={!commentInput.trim()}
                className={cn(
                  "flex-shrink-0 transition-colors",
                  commentInput.trim() ? "text-primary" : "text-gray-300"
                )}
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <button className="flex-shrink-0 p-1.5 hover:bg-gray-100 rounded-full transition-colors">
              <Share2 className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        )}

      </div>

      {/* Report modals — z-[60] to stack above the post modal */}
      {reportModal === "post"    && <ReportModal title="게시글 신고" onClose={() => setReportModal(null)} />}
      {reportModal === "user"    && <ReportModal title="작성자 신고" onClose={() => setReportModal(null)} />}
      {reportModal === "comment" && <ReportModal title="댓글 신고"   onClose={() => setReportModal(null)} />}

      <BlockToast visible={blockToast} />
    </div>
  )
}
