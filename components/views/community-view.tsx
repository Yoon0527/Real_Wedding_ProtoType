"use client"

import { useState, useMemo } from "react"
import { CheckCircle, MapPin, Star, Sparkles, Heart, ChevronDown, SlidersHorizontal, LayoutGrid, List, Camera, Pencil } from "lucide-react"
import { cn } from "@/lib/utils"

// Categories
const categories = [
  { id: "all", label: "전체" },
  { id: "wedding-hall", label: "웨딩홀" },
  { id: "studio", label: "스튜디오" },
  { id: "dress", label: "드레스" },
  { id: "makeup", label: "메이크업" },
  { id: "married-life", label: "결혼 생활" },
  { id: "etc", label: "기타" },
]

// Regions
const regions = [
  { id: "all", label: "전체 지역" },
  { id: "gangnam", label: "서울 강남/서초" },
  { id: "mapo", label: "서울 마포/용산" },
  { id: "gyeonggi", label: "인천/경기" },
  { id: "busan", label: "부산" },
  { id: "daegu", label: "대구" },
]

// Sort options
const sortOptions = [
  { id: "popular", label: "인기순" },
  { id: "price-low", label: "가격 낮은 순" },
  { id: "price-high", label: "가격 높은 순" },
]

const communityPosts = [
  {
    id: 1,
    title: "강남 S컨벤션 웨딩홀 솔직 후기",
    nickname: "행복한신부",
    role: "예비부부",
    location: "강남 S컨벤션",
    regionId: "gangnam",
    categoryId: "wedding-hall",
    totalCost: 32000000,
    likes: 245,
    image: "/placeholder.svg?height=300&width=400",
    imageCount: 8,
    verified: true,
    body: "정말 만족스러운 웨딩홀이었어요. 하객분들께서 음식이 너무 맛있다고 칭찬해주셨고, 특히 로비 공간이 넓어서 포토존으로 활용하기 좋았습니다. 웨딩플래너분도 친절하게 안내해주셔서 당일 진행이 매끄러웠어요.",
  },
  {
    id: 2,
    title: "청담 A스튜디오 촬영 후기",
    nickname: "웨딩마스터",
    role: "신혼부부",
    location: "청담 A스튜디오",
    regionId: "gangnam",
    categoryId: "studio",
    totalCost: 2500000,
    likes: 189,
    image: "/placeholder.svg?height=300&width=400",
    imageCount: 12,
    verified: true,
    body: "스튜디오 분위기가 정말 고급스럽고 조명도 완벽했어요. 사진작가분이 포즈도 자연스럽게 이끌어주시고, 보정도 과하지 않게 해주셔서 자연스러운 웨딩사진이 나왔습니다.",
  },
  {
    id: 3,
    title: "압구정 B드레스샵 후기",
    nickname: "드레스퀸",
    role: "예비부부",
    location: "압구정 B드레스샵",
    regionId: "gangnam",
    categoryId: "dress",
    totalCost: 1800000,
    likes: 312,
    image: null,
    imageCount: 0,
    verified: false,
    body: "드레스 종류가 정말 다양했어요. 특히 A라인과 머메이드 드레스 컬렉션이 인상적이었고, 피팅룸도 넓어서 편하게 입어볼 수 있었습니다. 직원분들이 체형에 맞는 드레스를 추천해주셔서 선택에 큰 도움이 되었어요.",
  },
  {
    id: 4,
    title: "서초 C메이크업 솔직 후기",
    nickname: "뷰티브라이드",
    role: "신혼부부",
    location: "서초 C메이크업",
    regionId: "gangnam",
    categoryId: "makeup",
    totalCost: 800000,
    likes: 156,
    image: "/placeholder.svg?height=300&width=400",
    imageCount: 5,
    verified: true,
    body: "당일 메이크업이 정말 오래 지속됐어요. 리허설 때와 본식 때 다르게 해주셨는데 둘 다 만족스러웠습니다. 헤어스타일링도 깔끔하게 잘 해주셨어요.",
  },
  {
    id: 5,
    title: "반포 D플라워 센터피스 후기",
    nickname: "플라워러버",
    role: "예비부부",
    location: "반포 D플라워",
    regionId: "gangnam",
    categoryId: "etc",
    totalCost: 1200000,
    likes: 98,
    image: null,
    imageCount: 0,
    verified: true,
    body: "플라워 장식이 정말 화사하고 예뻤어요. 센터피스뿐만 아니라 버진로드 장식과 부케까지 모두 맡겼는데, 컨셉에 맞게 통일감 있게 꾸며주셔서 웨딩홀 분위기가 확 살았습니다.",
  },
  {
    id: 6,
    title: "잠실 E웨딩홀 본식 후기",
    nickname: "잠실신부",
    role: "신혼부부",
    location: "잠실 E웨딩홀",
    regionId: "gangnam",
    categoryId: "wedding-hall",
    totalCost: 28000000,
    likes: 203,
    image: "/placeholder.svg?height=300&width=400",
    imageCount: 15,
    verified: false,
    body: "주차 공간이 넉넉해서 하객분들이 편하게 오실 수 있었어요. 식사 퀄리티도 좋았고, 대기 공간도 쾌적했습니다. 본식 진행도 매끄러웠어요.",
  },
  {
    id: 7,
    title: "마포 F스튜디오 웨딩 촬영",
    nickname: "스튜디오덕후",
    role: "예비부부",
    location: "마포 F스튜디오",
    regionId: "mapo",
    categoryId: "studio",
    totalCost: 1900000,
    likes: 134,
    image: "/placeholder.svg?height=300&width=400",
    imageCount: 6,
    verified: true,
    body: "다양한 컨셉의 촬영 공간이 있어서 여러 분위기의 사진을 찍을 수 있었어요. 야외 촬영도 병행했는데 자연광 사진이 특히 예쁘게 나왔습니다.",
  },
  {
    id: 8,
    title: "용산 G메이크업샵 솔직 후기",
    nickname: "메이크업마스터",
    role: "신혼부부",
    location: "용산 G메이크업",
    regionId: "mapo",
    categoryId: "makeup",
    totalCost: 650000,
    likes: 87,
    image: null,
    imageCount: 0,
    verified: false,
    body: "가성비가 정말 좋았어요. 금액 대비 퀄리티가 높았고, 원장님이 직접 해주셔서 더 신뢰가 갔습니다. 민감성 피부인데 순한 제품으로 해주셔서 트러블도 없었어요.",
  },
  {
    id: 9,
    title: "분당 H드레스샵 후기",
    nickname: "분당신부",
    role: "예비부부",
    location: "분당 H드레스샵",
    regionId: "gyeonggi",
    categoryId: "dress",
    totalCost: 2200000,
    likes: 176,
    image: "/placeholder.svg?height=300&width=400",
    imageCount: 4,
    verified: true,
    body: "분당 지역에서는 제일 큰 드레스샵이에요. 수선도 꼼꼼하게 해주시고, 액세서리 대여도 가능해서 한 곳에서 다 해결할 수 있어서 편했습니다.",
  },
  {
    id: 10,
    title: "결혼 3년차, 살림 분담하다 싸운 이야기",
    nickname: "세컨드이어",
    role: "기혼 부부",
    location: "",
    regionId: "all",
    categoryId: "married-life",
    totalCost: 0,
    likes: 412,
    image: "/placeholder.svg?height=300&width=400",
    imageCount: 2,
    verified: false,
    body: "결혼하면 당연히 공평하게 나눌 줄 알았는데, 막상 같이 살아보니 서로 '공평함'의 기준이 완전히 달랐어요. 그 과정에서 꽤 크게 싸우기도 했지만, 지금은 나름의 방식을 찾아가고 있는 중입니다. 비슷한 경험 있으신 분들과 이야기 나눠보고 싶어요.",
  },
  {
    id: 11,
    title: "신혼집 첫 인테리어 — 예산 500만원으로 꾸민 후기",
    nickname: "홈메이커즈",
    role: "기혼 부부",
    location: "",
    regionId: "all",
    categoryId: "married-life",
    totalCost: 0,
    likes: 287,
    image: "/placeholder.svg?height=300&width=400",
    imageCount: 9,
    verified: false,
    body: "전세 신혼집을 500만원 예산으로 꾸민 과정을 공유합니다. 가구는 대부분 이케아와 중고 마켓을 활용했고, 조명 하나만 바꿔도 분위기가 확 달라지더라고요. 이것저것 시행착오를 거쳐 지금은 꽤 마음에 드는 공간이 됐어요.",
  },
  {
    id: 12,
    title: "맞벌이 부부의 밥상 — 일주일 식단 관리법 공유",
    nickname: "쿡플부부",
    role: "기혼 부부",
    location: "",
    regionId: "all",
    categoryId: "married-life",
    totalCost: 0,
    likes: 198,
    image: null,
    imageCount: 0,
    verified: false,
    body: "둘 다 퇴근이 늦다 보니 매일 요리하는 건 사실상 불가능했어요. 그래서 주말에 2시간 투자해서 일주일치 반찬을 한꺼번에 만들어두는 방식으로 정착했습니다. 장보기 리스트부터 보관 방법까지 저희가 쓰는 루틴을 공유해볼게요.",
  },
]

const popularPlanners = [
  { id: 1, name: "김지현 플래너", rating: 4.9, consultations: 342 },
  { id: 2, name: "이수민 플래너", rating: 4.8, consultations: 289 },
  { id: 3, name: "박소연 플래너", rating: 4.9, consultations: 256 },
]

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("ko-KR").format(amount)
}

function formatPriceShort(amount: number) {
  if (amount >= 10000000) {
    return `${(amount / 10000000).toFixed(1)}천만`
  } else if (amount >= 10000) {
    return `${Math.floor(amount / 10000)}만`
  }
  return formatCurrency(amount)
}

// Dropdown Component
function Dropdown({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: { id: string; label: string }[]
  value: string
  onChange: (value: string) => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const selectedOption = options.find((o) => o.id === value)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-lg text-sm hover:border-primary/50 transition-colors min-w-[140px]"
      >
        <span className="text-muted-foreground text-xs">{label}:</span>
        <span className="flex-1 text-left text-foreground truncate">{selectedOption?.label}</span>
        <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", isOpen && "rotate-180")} />
      </button>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 mt-1 w-full bg-card border border-border rounded-lg shadow-lg z-20 py-1 max-h-60 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  onChange(option.id)
                  setIsOpen(false)
                }}
                className={cn(
                  "w-full px-3 py-2 text-sm text-left hover:bg-muted transition-colors",
                  value === option.id && "bg-primary/10 text-primary font-medium"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// Verification Toggle Component
function VerificationToggle({
  checked,
  onChange,
}: {
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-lg">
      <button
        onClick={() => onChange(!checked)}
        className={cn(
          "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
          checked ? "bg-primary" : "bg-muted"
        )}
        role="switch"
        aria-checked={checked}
      >
        <span
          className={cn(
            "inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform",
            checked ? "translate-x-5" : "translate-x-0.5"
          )}
        />
      </button>
      <span className="text-sm font-medium text-foreground whitespace-nowrap">
        인증된 팩트만 보기
      </span>
    </div>
  )
}

// Price Range Slider Component
function PriceRangeSlider({
  value,
  onChange,
  max = 50000000,
}: {
  value: number
  onChange: (value: number) => void
  max?: number
}) {
  return (
    <div className="flex items-center gap-3 px-3 py-2 bg-card border border-border rounded-lg min-w-[200px]">
      <span className="text-muted-foreground text-xs whitespace-nowrap">예산:</span>
      <div className="flex-1 flex items-center gap-2">
        <input
          type="range"
          min={0}
          max={max}
          step={1000000}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 h-1.5 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
        />
        <span className="text-xs text-foreground whitespace-nowrap min-w-[80px] text-right">
          ~{formatPriceShort(value)} 원
        </span>
      </div>
    </div>
  )
}

type ViewMode = "grid" | "list"

interface CommunityViewProps {
  onNavigate?: (view: string) => void
}

export function CommunityView({ onNavigate }: CommunityViewProps) {
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [maxPrice, setMaxPrice] = useState(50000000)
  const [sortBy, setSortBy] = useState("popular")
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [verifiedOnly, setVerifiedOnly] = useState(false)

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let posts = communityPosts.filter((post) => {
      // Category filter
      if (activeCategory !== "all" && post.categoryId !== activeCategory) return false
      // Region filter
      if (selectedRegion !== "all" && post.regionId !== selectedRegion) return false
      // Price filter
      if (post.totalCost > maxPrice) return false
      // Verification filter
      if (verifiedOnly && !post.verified) return false
      return true
    })

    // Sort
    switch (sortBy) {
      case "price-low":
        posts = [...posts].sort((a, b) => a.totalCost - b.totalCost)
        break
      case "price-high":
        posts = [...posts].sort((a, b) => b.totalCost - a.totalCost)
        break
      case "popular":
      default:
        posts = [...posts].sort((a, b) => b.likes - a.likes)
        break
    }

    return posts
  }, [activeCategory, selectedRegion, maxPrice, sortBy, verifiedOnly])

  const getCategoryLabel = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId)?.label || ""
  }

  const getRegionLabel = (regionId: string) => {
    return regions.find((r) => r.id === regionId)?.label || ""
  }

  return (
    <div className="flex gap-6">
      {/* Main content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-foreground">팩트 커뮤니티</h2>
            <p className="text-sm text-muted-foreground mt-1">
              영수증 인증을 통과한 실제 후기만 모았습니다
            </p>
          </div>
          <button
            onClick={() => onNavigate?.("post-form")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm flex-shrink-0"
          >
            <Pencil className="h-4 w-4" />
            <span>후기 작성</span>
          </button>
        </div>

        {/* Category Filter Bar */}
        <div className="mb-4 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                  activeCategory === category.id
                    ? category.id === "married-life"
                      ? "bg-rose-500 text-white shadow-sm"
                      : "bg-primary text-primary-foreground shadow-sm"
                    : "bg-card border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                )}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Advanced Detail Filters */}
        <div className="mb-6 p-4 bg-card border border-border rounded-xl">
          <div className="flex items-center gap-2 mb-3">
            <SlidersHorizontal className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">상세 필터</span>
          </div>
          {activeCategory === "married-life" ? (
            <div className="flex flex-wrap items-center gap-3">
              <Dropdown
                label="정렬"
                options={sortOptions}
                value={sortBy}
                onChange={setSortBy}
              />
              <p className="text-xs text-muted-foreground">
                결혼 생활 카테고리는 지역·예산·인증 필터가 적용되지 않습니다.
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-3">
              <Dropdown
                label="지역"
                options={regions}
                value={selectedRegion}
                onChange={setSelectedRegion}
              />
              <PriceRangeSlider value={maxPrice} onChange={setMaxPrice} />
              <Dropdown
                label="정렬"
                options={sortOptions}
                value={sortBy}
                onChange={setSortBy}
              />
              <VerificationToggle 
                checked={verifiedOnly} 
                onChange={setVerifiedOnly}
              />
            </div>
          )}
        </div>

        {/* Post List Header: count + view toggle */}
        <div className="flex items-center justify-between mb-4 pt-2">
          <p className="text-sm text-muted-foreground">
            전체{" "}
            <span className="font-semibold text-foreground">{filteredPosts.length}개</span>
          </p>
          <div className="flex items-center gap-1 border border-border rounded-lg p-1 bg-card">
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-1.5 rounded-md transition-colors",
                viewMode === "grid"
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
              aria-label="그리드 보기"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "p-1.5 rounded-md transition-colors",
                viewMode === "list"
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
              aria-label="리스트 보기"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <SlidersHorizontal className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-lg font-medium text-foreground">조건에 맞는 팩트 리뷰가 없습니다.</p>
            <p className="text-sm text-muted-foreground mt-1">필터 조건을 변경해보세요.</p>
          </div>
        ) : (
          <>
            {/* Grid View */}
            {viewMode === "grid" && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    onClick={() => onNavigate?.("review-detail")}
                    className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer group"
                  >
                    {/* Image or Text Card */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {post.image ? (
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 p-4 flex items-center">
                          <p className="text-sm text-foreground/80 line-clamp-4 leading-relaxed">
                            {post.body}
                          </p>
                        </div>
                      )}
                      {/* Fact verified badge - Most prominent */}
                      {post.verified && (
                        <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground text-xs font-semibold rounded-lg shadow-md z-10">
                          <CheckCircle className="h-4 w-4" />
                          <span>팩트 인증됨</span>
                        </div>
                      )}
                      {/* Likes badge */}
                      <div className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-1 bg-black/60 text-white text-xs rounded-md">
                        <Heart className="h-3 w-3" />
                        <span>{post.likes}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      {/* Category and Region Tags */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded">
                          {getCategoryLabel(post.categoryId)}
                        </span>
                        <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded">
                          {getRegionLabel(post.regionId)}
                        </span>
                      </div>

                      <h3 className="font-semibold text-foreground line-clamp-2 text-balance">
                        {post.title}
                      </h3>
                      
                      <div className="mt-3 flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                          <span className="text-xs text-muted-foreground">{post.nickname[0]}</span>
                        </div>
                        <span className="text-sm text-muted-foreground truncate flex-1 min-w-0">
                          {post.nickname}
                        </span>
                        <span className="text-xs px-2 py-0.5 bg-muted text-muted-foreground rounded-full flex-shrink-0">
                          {post.role}
                        </span>
                      </div>

                      <div className="mt-3 pt-3 border-t border-border flex items-center justify-between gap-2">
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          {post.categoryId !== "married-life" && post.location && (
                            <div className="flex items-center gap-1 min-w-0">
                              <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                              <span className="truncate">{post.location}</span>
                            </div>
                          )}
                          {post.imageCount > 0 && (
                            <div className="flex items-center gap-1 flex-shrink-0">
                              <Camera className="h-3.5 w-3.5" />
                              <span>{post.imageCount}</span>
                            </div>
                          )}
                        </div>
                        {post.categoryId !== "married-life" && (
                          <div className="flex items-center gap-1 text-sm font-semibold text-foreground flex-shrink-0">
                            <span>{formatCurrency(post.totalCost)} 원</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* List View */}
            {viewMode === "list" && (
              <div className="flex flex-col gap-3">
                {filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    onClick={() => onNavigate?.("review-detail")}
                    className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer group"
                  >
                    <div className="flex items-stretch">
                      {/* Text Content */}
                      <div className={cn("flex-1 p-4 flex flex-col justify-between", !post.image && "w-full")}>
                        {/* Top Section */}
                        <div>
                        {/* Fact Verified Badge */}
                        {post.verified && (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-md mb-2">
                            <CheckCircle className="h-3.5 w-3.5" />
                            <span>팩트 인증됨</span>
                          </div>
                        )}

                          {/* Category and Region Tags */}
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded">
                              {getCategoryLabel(post.categoryId)}
                            </span>
                            <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded">
                              {getRegionLabel(post.regionId)}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="font-semibold text-foreground text-balance">
                            {post.title}
                          </h3>

                          {/* Body Preview */}
                          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                            {post.body}
                          </p>
                        </div>

                        {/* Bottom Section */}
                        <div className="mt-3 pt-3 border-t border-border flex items-center justify-between gap-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            {post.categoryId !== "married-life" && post.location && (
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                                <span>{post.location}</span>
                              </div>
                            )}
                            {post.categoryId !== "married-life" && post.location && (
                              <span className="text-border">|</span>
                            )}
                            {post.categoryId !== "married-life" && (
                              <span className="font-medium text-foreground">{formatCurrency(post.totalCost)} 원</span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground flex-shrink-0">
                            <div className="flex items-center gap-1">
                              <Heart className="h-3.5 w-3.5" />
                              <span>{post.likes}</span>
                            </div>
                            {post.imageCount > 0 && (
                              <div className="flex items-center gap-1">
                                <Camera className="h-3.5 w-3.5" />
                                <span>{post.imageCount}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Thumbnail (only if image exists) */}
                      {post.image && (
                        <div className="w-32 sm:w-40 flex-shrink-0 relative overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Right sidebar */}
      <aside className="hidden lg:block w-72 flex-shrink-0">
        <div className="sticky top-20 space-y-4">
          {/* Popular planners */}
          <div className="bg-card rounded-xl border border-border p-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Star className="h-4 w-4 text-primary" />
              이번 주 인기 플래너
            </h3>
            <ul className="mt-4 space-y-3">
              {popularPlanners.map((planner, index) => (
                <li key={planner.id} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{planner.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {planner.rating} · 상담 {planner.consultations}회
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Compatibility card */}
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl border border-border p-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              우리 커플 사주/궁합 매칭
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              두 분의 생년월일로 궁합을 확인하고 최적의 웨딩 날짜를 추천받으세요.
            </p>
            <button className="mt-4 w-full py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors">
              궁합 보러가기
            </button>
          </div>
        </div>
      </aside>
    </div>
  )
}
