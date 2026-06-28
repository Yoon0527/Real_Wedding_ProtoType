"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, MessageSquare, Star, Pencil, EyeOff, Trash2, Link2, CheckCircle2 } from "lucide-react"

const metrics = [
  { 
    title: "이번 달 프로필 조회수", 
    value: "1,247", 
    change: "+12%", 
    icon: Eye,
    description: "지난 달 대비"
  },
  { 
    title: "신규 상담 신청", 
    value: "28", 
    change: "+5", 
    icon: MessageSquare,
    description: "이번 주"
  },
  { 
    title: "내 리뷰 평점", 
    value: "4.9", 
    change: "32개 리뷰", 
    icon: Star,
    description: "전체 평균"
  },
]

const portfolioItems = [
  {
    id: 1,
    title: "로맨틱 가든 웨딩",
    location: "더채플앳청담",
    date: "2024.03.15",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop",
    status: "published",
    linkedReviews: [
      { author: "행복한신부", rating: 5, verified: true },
      { author: "예비신랑77", rating: 5, verified: true },
    ]
  },
  {
    id: 2,
    title: "모던 시크 웨딩",
    location: "포시즌스 서울",
    date: "2024.02.28",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=300&fit=crop",
    status: "published",
    linkedReviews: [
      { author: "웨딩준비중", rating: 5, verified: true },
    ]
  },
  {
    id: 3,
    title: "클래식 호텔 웨딩",
    location: "신라호텔",
    date: "2024.02.10",
    image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&h=300&fit=crop",
    status: "hidden",
    linkedReviews: []
  },
  {
    id: 4,
    title: "내추럴 아웃도어 웨딩",
    location: "헤이리 아트밸리",
    date: "2024.01.20",
    image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&h=300&fit=crop",
    status: "published",
    linkedReviews: [
      { author: "봄날의신부", rating: 4, verified: true },
      { author: "신랑입니다", rating: 5, verified: true },
      { author: "결혼해요", rating: 5, verified: true },
    ]
  },
  {
    id: 5,
    title: "럭셔리 하우스 웨딩",
    location: "아만티 서울",
    date: "2024.01.05",
    image: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=400&h=300&fit=crop",
    status: "published",
    linkedReviews: [
      { author: "happy_bride", rating: 5, verified: true },
    ]
  },
  {
    id: 6,
    title: "빈티지 스타일 웨딩",
    location: "성북동 빌라",
    date: "2023.12.18",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&h=300&fit=crop",
    status: "published",
    linkedReviews: []
  },
]

export function PlannerStudioView() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">플래너 스튜디오</h1>
        <p className="text-muted-foreground mt-1">포트폴리오 관리</p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon
          return (
            <Card key={metric.title} className="bg-card">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{metric.title}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-foreground">{metric.value}</span>
                      <span className="text-sm text-primary font-medium">{metric.change}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{metric.description}</p>
                  </div>
                  <div className="p-2.5 bg-primary/10 rounded-lg">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Portfolio Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div>
            <CardTitle className="text-lg">내 포트폴리오</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              총 {portfolioItems.length}개의 포트폴리오
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            + 새 포트폴리오 추가
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {portfolioItems.map((item) => (
              <div 
                key={item.id} 
                className="group border border-border rounded-lg overflow-hidden bg-card hover:shadow-md transition-shadow"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {item.status === "hidden" && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Badge variant="secondary" className="bg-white/90 text-foreground">
                        <EyeOff className="h-3 w-3 mr-1" />
                        숨김 상태
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.location} · {item.date}</p>
                  </div>

                  {/* Linked Fact Reviews */}
                  {item.linkedReviews.length > 0 ? (
                    <div className="bg-primary/5 rounded-lg p-3 space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-primary">
                        <Link2 className="h-3.5 w-3.5" />
                        <span>연결된 팩트 리뷰 ({item.linkedReviews.length})</span>
                      </div>
                      <div className="space-y-1.5">
                        {item.linkedReviews.slice(0, 2).map((review, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-1.5">
                              {review.verified && (
                                <CheckCircle2 className="h-3 w-3 text-primary" />
                              )}
                              <span className="text-foreground">{review.author}</span>
                            </div>
                            <div className="flex items-center gap-0.5 text-amber-500">
                              <Star className="h-3 w-3 fill-current" />
                              <span>{review.rating}</span>
                            </div>
                          </div>
                        ))}
                        {item.linkedReviews.length > 2 && (
                          <p className="text-xs text-muted-foreground">
                            +{item.linkedReviews.length - 2}개 더보기
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-muted/50 rounded-lg p-3">
                      <p className="text-xs text-muted-foreground text-center">
                        아직 연결된 팩트 리뷰가 없습니다
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-1">
                    <Button variant="outline" size="sm" className="flex-1 text-xs h-8">
                      <Pencil className="h-3 w-3 mr-1" />
                      수정
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 text-xs h-8">
                      {item.status === "hidden" ? (
                        <>
                          <Eye className="h-3 w-3 mr-1" />
                          공개
                        </>
                      ) : (
                        <>
                          <EyeOff className="h-3 w-3 mr-1" />
                          숨김
                        </>
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
