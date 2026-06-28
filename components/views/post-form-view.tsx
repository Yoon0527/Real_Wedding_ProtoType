"use client"

import { useState, useRef, useMemo } from "react"
import {
  ArrowLeft, ImagePlus, X, FileText, ShieldCheck,
  Lock, Upload, ChevronDown, Calendar, MapPin,
  BadgeCheck, AlertCircle, Check, Star
} from "lucide-react"
import { cn } from "@/lib/utils"

const CATEGORIES = [
  { id: "wedding-hall", label: "웨딩홀" },
  { id: "studio", label: "스튜디오" },
  { id: "dress", label: "드레스" },
  { id: "makeup", label: "메이크업" },
  { id: "hanbok", label: "한복" },
  { id: "flower", label: "플라워" },
  { id: "honeymoon", label: "신혼여행" },
  { id: "etc", label: "기타" },
]

// Rating items per category. "가격 투명도" is always appended as the common item.
const CATEGORY_RATING_ITEMS: Record<string, string[]> = {
  "wedding-hall": ["주차 및 교통 편의", "식사 / 뷔페 퀄리티", "홀 분위기 및 인테리어", "직원 서비스"],
  "studio":       ["사진 퀄리티", "포토그래퍼 역량", "배경 및 세트 다양성"],
  "dress":        ["드레스 상태 및 퀄리티", "피팅 서비스", "헬퍼 전문성"],
  "makeup":       ["메이크업 지속력", "요구사항 반영도", "샵 관리 상태"],
}

const COMMON_ITEM = "가격 투명도"

function getRatingItems(categoryId: string | null): string[] {
  if (!categoryId || !CATEGORY_RATING_ITEMS[categoryId]) return []
  return [...CATEGORY_RATING_ITEMS[categoryId], COMMON_ITEM]
}

// ── StarRating sub-component ───────────────────────────────────────────────
function StarRating({
  value,
  onChange,
}: {
  value: number
  onChange: (v: number) => void
}) {
  const [hovered, setHovered] = useState(0)
  const display = hovered || value

  return (
    <div className="flex items-center gap-0.5" onMouseLeave={() => setHovered(0)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          className="p-0.5 transition-transform hover:scale-110"
          aria-label={`${star}점`}
        >
          <Star
            className={cn(
              "h-5 w-5 transition-colors",
              display >= star
                ? "fill-primary text-primary"
                : "fill-transparent text-muted-foreground/40"
            )}
          />
        </button>
      ))}
      {value > 0 && (
        <span className="ml-1.5 text-xs font-semibold text-primary tabular-nums">
          {value}.0
        </span>
      )}
    </div>
  )
}

const REGIONS = [
  "강남", "서초", "송파", "마포", "용산",
  "성동", "광진", "분당", "일산", "수원", "기타",
]

interface PhotoItem {
  id: string
  url: string
  name: string
}

interface PostFormViewProps {
  onBack: () => void
}

export function PostFormView({ onBack }: PostFormViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [ratings, setRatings] = useState<Record<string, number>>({})
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [photos, setPhotos] = useState<PhotoItem[]>([])
  const [venueName, setVenueName] = useState("")
  const [totalPrice, setTotalPrice] = useState("")
  const [weddingDate, setWeddingDate] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("")
  const [regionOpen, setRegionOpen] = useState(false)
  const [receiptFile, setReceiptFile] = useState<File | null>(null)
  const [receiptDragOver, setReceiptDragOver] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const photoInputRef = useRef<HTMLInputElement>(null)
  const receiptInputRef = useRef<HTMLInputElement>(null)

  // Photo upload
  const handlePhotoAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    const newPhotos: PhotoItem[] = files.slice(0, 10 - photos.length).map((f) => ({
      id: crypto.randomUUID(),
      url: URL.createObjectURL(f),
      name: f.name,
    }))
    setPhotos((prev) => [...prev, ...newPhotos])
    e.target.value = ""
  }

  const removePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id))
  }

  // Receipt upload
  const handleReceiptDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setReceiptDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) setReceiptFile(file)
  }

  const handleReceiptInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setReceiptFile(file)
  }

  // Price formatting
  const formatPrice = (raw: string) => {
    const digits = raw.replace(/\D/g, "")
    return digits ? Number(digits).toLocaleString("ko-KR") : ""
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/,/g, "")
    setTotalPrice(formatPrice(raw))
  }

  const isFormValid =
    selectedCategory &&
    title.trim().length > 0 &&
    content.trim().length > 0 &&
    venueName.trim().length > 0 &&
    totalPrice.length > 0 &&
    weddingDate.length > 0

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return
    setSubmitted(true)
    setTimeout(() => {
      onBack()
    }, 1800)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <Check className="h-8 w-8 text-primary" />
        </div>
        <p className="text-lg font-semibold text-foreground">게시글이 등록되었습니다</p>
        <p className="text-sm text-muted-foreground">팩트 인증 검토 후 게시됩니다</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label="뒤로가기"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-foreground">팩트 후기 작성</h1>
          <p className="text-xs text-muted-foreground mt-0.5">실제 경험을 바탕으로 솔직하게 작성해 주세요</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* 1. Category */}
        <section className="bg-card border border-border rounded-xl p-5">
          <label className="block text-sm font-semibold text-foreground mb-3">
            카테고리 <span className="text-primary">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => { setSelectedCategory(cat.id); setRatings({}) }}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-medium border transition-all",
                  selectedCategory === cat.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* 2. Title & Content */}
        <section className="bg-card border border-border rounded-xl p-5 space-y-4">
          <div>
            <label htmlFor="post-title" className="block text-sm font-semibold text-foreground mb-2">
              제목 <span className="text-primary">*</span>
            </label>
            <input
              id="post-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={60}
              placeholder="예) 강남 A웨딩홀 본식 솔직 후기"
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
            />
            <p className="text-right text-xs text-muted-foreground mt-1">{title.length} / 60</p>
          </div>
          <div>
            <label htmlFor="post-content" className="block text-sm font-semibold text-foreground mb-2">
              본문 내용 <span className="text-primary">*</span>
            </label>
            <textarea
              id="post-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={7}
              maxLength={2000}
              placeholder="실제 경험을 구체적으로 작성해 주세요. 좋았던 점, 아쉬웠던 점, 팁 등을 공유해 주시면 예비부부들에게 큰 도움이 됩니다."
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition resize-none leading-relaxed"
            />
            <p className="text-right text-xs text-muted-foreground mt-1">{content.length} / 2000</p>
          </div>
        </section>

        {/* 3. Photo Upload */}
        <section className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-foreground">
              사진 첨부 <span className="text-muted-foreground font-normal">(최대 10장)</span>
            </label>
            <span className="text-xs text-muted-foreground">{photos.length} / 10</span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
            {/* Add photo button */}
            {photos.length < 10 && (
              <button
                type="button"
                onClick={() => photoInputRef.current?.click()}
                className="aspect-square rounded-lg border-2 border-dashed border-border bg-muted/40 hover:border-primary/50 hover:bg-primary/5 flex flex-col items-center justify-center gap-1 transition-colors"
              >
                <ImagePlus className="h-5 w-5 text-muted-foreground" />
                <span className="text-[10px] text-muted-foreground">추가</span>
              </button>
            )}

            {/* Preview thumbnails */}
            {photos.map((photo, index) => (
              <div key={photo.id} className="relative aspect-square rounded-lg overflow-hidden border border-border group">
                <img
                  src={photo.url}
                  alt={`업로드 사진 ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {index === 0 && (
                  <div className="absolute top-1 left-1 px-1.5 py-0.5 bg-black/60 text-white text-[9px] rounded font-medium">
                    대표
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => removePhoto(photo.id)}
                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="사진 삭제"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
          <input
            ref={photoInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handlePhotoAdd}
          />
          <p className="text-xs text-muted-foreground mt-2">첫 번째 사진이 대표 이미지로 사용됩니다.</p>
        </section>

        {/* 4. Star Ratings — shown only when a rateable category is selected */}
        {selectedCategory && getRatingItems(selectedCategory).length > 0 && (() => {
          const items = getRatingItems(selectedCategory)
          const rated = items.map((item) => ratings[item] ?? 0)
          const filled = rated.filter((v) => v > 0)
          const average = filled.length > 0
            ? filled.reduce((a, b) => a + b, 0) / filled.length
            : 0

          return (
            <section className="bg-card border border-border rounded-xl overflow-hidden">
              {/* Section header with live average */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-primary fill-primary flex-shrink-0" />
                  <span className="text-sm font-semibold text-foreground">항목별 평점</span>
                </div>
                {average > 0 ? (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={cn(
                            "h-3.5 w-3.5",
                            average >= s ? "fill-primary text-primary" : "fill-transparent text-muted-foreground/30"
                          )}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-bold text-primary tabular-nums">
                      {average.toFixed(1)}
                    </span>
                    <span className="text-xs text-muted-foreground">/ 5.0 평균</span>
                  </div>
                ) : (
                  <span className="text-xs text-muted-foreground">평점을 입력해 주세요</span>
                )}
              </div>

              {/* Rating rows */}
              <div className="divide-y divide-border">
                {items.map((item, idx) => {
                  const isCommon = item === COMMON_ITEM
                  return (
                    <div
                      key={item}
                      className={cn(
                        "flex items-center justify-between px-5 py-3.5 gap-4",
                        isCommon && "bg-primary/[0.03]"
                      )}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-xs font-medium text-muted-foreground tabular-nums w-4 flex-shrink-0">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className={cn(
                          "text-sm truncate",
                          isCommon ? "font-semibold text-primary" : "text-foreground"
                        )}>
                          {item}
                        </span>
                        {isCommon && (
                          <span className="flex-shrink-0 text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium">
                            공통
                          </span>
                        )}
                      </div>
                      <StarRating
                        value={ratings[item] ?? 0}
                        onChange={(v) => setRatings((prev) => ({ ...prev, [item]: v }))}
                      />
                    </div>
                  )
                })}
              </div>
            </section>
          )
        })()}

        {/* 5. Fact Data */}
        <section className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <BadgeCheck className="h-5 w-5 text-primary flex-shrink-0" />
            <div>
              <h2 className="text-sm font-semibold text-foreground">팩트 데이터</h2>
              <p className="text-xs text-muted-foreground">정확한 정보를 입력할수록 팩트 인증 뱃지가 부여됩니다</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Venue Name */}
            <div>
              <label htmlFor="venue-name" className="block text-xs font-medium text-muted-foreground mb-1.5">
                업체명 / 장소명 <span className="text-primary">*</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="venue-name"
                  type="text"
                  value={venueName}
                  onChange={(e) => setVenueName(e.target.value)}
                  placeholder="예) 강남 그랜드볼룸"
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Total Price */}
              <div>
                <label htmlFor="total-price" className="block text-xs font-medium text-muted-foreground mb-1.5">
                  총 비용 (원) <span className="text-primary">*</span>
                </label>
                <input
                  id="total-price"
                  type="text"
                  inputMode="numeric"
                  value={totalPrice}
                  onChange={handlePriceChange}
                  placeholder="0"
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition text-right tabular-nums"
                />
              </div>

              {/* Wedding Date */}
              <div>
                <label htmlFor="wedding-date" className="block text-xs font-medium text-muted-foreground mb-1.5">
                  이용 날짜 <span className="text-primary">*</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <input
                    id="wedding-date"
                    type="date"
                    value={weddingDate}
                    onChange={(e) => setWeddingDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                  />
                </div>
              </div>
            </div>

            {/* Region */}
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">지역</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setRegionOpen((o) => !o)}
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg border border-border bg-background text-sm text-left transition hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <span className={selectedRegion ? "text-foreground" : "text-muted-foreground"}>
                    {selectedRegion || "지역을 선택하세요"}
                  </span>
                  <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", regionOpen && "rotate-180")} />
                </button>
                {regionOpen && (
                  <div className="absolute z-20 top-full mt-1 w-full bg-card border border-border rounded-lg shadow-lg overflow-hidden">
                    <div className="grid grid-cols-3 gap-0.5 p-1 max-h-48 overflow-y-auto">
                      {REGIONS.map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => { setSelectedRegion(r); setRegionOpen(false) }}
                          className={cn(
                            "px-2 py-2 rounded-md text-sm text-center transition-colors",
                            selectedRegion === r
                              ? "bg-primary text-primary-foreground font-medium"
                              : "text-foreground hover:bg-muted"
                          )}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 5. Receipt Upload — Secure Section */}
        <section className="rounded-xl overflow-hidden border border-primary/20">
          {/* Secure header bar */}
          <div className="flex items-center gap-2.5 px-5 py-3.5 bg-primary/8 border-b border-primary/15">
            <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-primary">영수증 / 계약서 업로드</p>
              <p className="text-[11px] text-primary/70">팩트 인증을 위한 보안 영역입니다</p>
            </div>
            <div className="ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">
              <Lock className="h-3 w-3 text-primary" />
              <span className="text-[11px] font-medium text-primary">비공개 처리</span>
            </div>
          </div>

          <div className="bg-card p-5 space-y-4">
            {/* Drop zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setReceiptDragOver(true) }}
              onDragLeave={() => setReceiptDragOver(false)}
              onDrop={handleReceiptDrop}
              onClick={() => receiptInputRef.current?.click()}
              className={cn(
                "rounded-lg border-2 border-dashed p-6 flex flex-col items-center gap-2 cursor-pointer transition-all",
                receiptDragOver
                  ? "border-primary bg-primary/5"
                  : receiptFile
                  ? "border-primary/40 bg-primary/5"
                  : "border-border hover:border-primary/40 hover:bg-muted/30"
              )}
            >
              {receiptFile ? (
                <>
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-foreground text-center">{receiptFile.name}</p>
                  <p className="text-xs text-muted-foreground">{(receiptFile.size / 1024).toFixed(0)} KB</p>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setReceiptFile(null) }}
                    className="text-xs text-muted-foreground hover:text-foreground underline"
                  >
                    파일 변경
                  </button>
                </>
              ) : (
                <>
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <Upload className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium text-foreground">파일을 여기에 드래그하거나 클릭하세요</p>
                  <p className="text-xs text-muted-foreground">PDF, JPG, PNG 최대 20MB</p>
                </>
              )}
            </div>
            <input
              ref={receiptInputRef}
              type="file"
              accept=".pdf,image/*"
              className="hidden"
              onChange={handleReceiptInput}
            />

            {/* Privacy disclaimer */}
            <div className="flex gap-2.5 p-3.5 rounded-lg bg-muted/50 border border-border">
              <AlertCircle className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div className="text-xs text-muted-foreground leading-relaxed space-y-1">
                <p className="font-medium text-foreground">개인정보 보호 안내</p>
                <p>업로드된 영수증 및 계약서는 팩트 인증 검토에만 사용되며, 게시글에 공개되지 않습니다.</p>
                <p>개인정보(이름, 연락처, 주소 등)는 검토 후 즉시 파기됩니다. 파일은 AES-256 암호화로 안전하게 보호됩니다.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Submit */}
        <div className="flex gap-3 pt-2 pb-8">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 py-3 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={!isFormValid}
            className={cn(
              "flex-[2] py-3 rounded-xl text-sm font-semibold transition-all",
              isFormValid
                ? "bg-primary text-primary-foreground hover:opacity-90 shadow-sm"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            )}
          >
            {receiptFile ? "팩트 인증 후기 등록" : "후기 등록"}
          </button>
        </div>
      </form>
    </div>
  )
}
