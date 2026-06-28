"use client"

import { CheckCircle, Star, MessageCircle, ChevronDown } from "lucide-react"

const planners = [
  {
    id: 1,
    name: "김지현",
    title: "웨딩 플래너",
    rating: 4.9,
    reviews: 127,
    consultations: 342,
    styles: ["모던", "클래식"],
    location: "강남/서초",
    verified: true,
    portfolio: [
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
    ],
  },
  {
    id: 2,
    name: "이수민",
    title: "프리미엄 플래너",
    rating: 4.8,
    reviews: 98,
    consultations: 289,
    styles: ["내추럴", "로맨틱"],
    location: "청담/압구정",
    verified: true,
    portfolio: [
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
    ],
  },
  {
    id: 3,
    name: "박소연",
    title: "수석 플래너",
    rating: 4.9,
    reviews: 156,
    consultations: 256,
    styles: ["럭셔리", "미니멀"],
    location: "잠실/송파",
    verified: true,
    portfolio: [
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
    ],
  },
  {
    id: 4,
    name: "최유진",
    title: "웨딩 플래너",
    rating: 4.7,
    reviews: 84,
    consultations: 198,
    styles: ["빈티지", "가든"],
    location: "홍대/마포",
    verified: true,
    portfolio: [
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
    ],
  },
  {
    id: 5,
    name: "정민서",
    title: "시니어 플래너",
    rating: 4.8,
    reviews: 112,
    consultations: 267,
    styles: ["모던", "시크"],
    location: "분당/판교",
    verified: true,
    portfolio: [
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
    ],
  },
  {
    id: 6,
    name: "한예린",
    title: "웨딩 플래너",
    rating: 4.6,
    reviews: 67,
    consultations: 145,
    styles: ["클래식", "로맨틱"],
    location: "일산/파주",
    verified: true,
    portfolio: [
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
    ],
  },
]

export function PlannerView() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground">플래너 라운지</h2>
        <p className="text-sm text-muted-foreground mt-1">
          인증된 전문 플래너들과 상담하세요
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg text-sm hover:bg-muted transition-colors">
          <span>스타일</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg text-sm hover:bg-muted transition-colors">
          <span>지역</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg text-sm hover:bg-muted transition-colors">
          <span>예산</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      {/* Planner cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {planners.map((planner) => (
          <article
            key={planner.id}
            className="bg-card rounded-xl border border-border p-5 hover:shadow-md transition-shadow cursor-pointer"
          >
            {/* Header */}
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <span className="text-lg font-medium text-muted-foreground">
                  {planner.name[0]}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground">{planner.name}</h3>
                  {planner.verified && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full">
                      <CheckCircle className="h-3 w-3" />
                      인증 전문가
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">{planner.title}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-4 flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-amber-500" />
                <span className="font-medium text-foreground">{planner.rating}</span>
                <span className="text-muted-foreground">({planner.reviews})</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <MessageCircle className="h-4 w-4" />
                <span>상담 {planner.consultations}회</span>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-3 flex flex-wrap gap-2">
              {planner.styles.map((style) => (
                <span
                  key={style}
                  className="px-2.5 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                >
                  {style}
                </span>
              ))}
              <span className="px-2.5 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                📍 {planner.location}
              </span>
            </div>

            {/* Portfolio preview */}
            <div className="mt-4 flex gap-2">
              {planner.portfolio.map((img, i) => (
                <div
                  key={i}
                  className="flex-1 aspect-square rounded-lg bg-muted overflow-hidden"
                >
                  <img
                    src={img}
                    alt={`${planner.name} 포트폴리오 ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* CTA */}
            <button className="mt-4 w-full py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors">
              상담 요청하기
            </button>
          </article>
        ))}
      </div>
    </div>
  )
}
