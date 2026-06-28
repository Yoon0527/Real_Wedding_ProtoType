"use client"

import { Heart, Calendar, MapPin, Sparkles } from "lucide-react"

export function WeddingView() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      {/* Icon */}
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
        <Heart className="h-10 w-10 text-primary" />
      </div>

      {/* Title */}
      <h2 className="text-xl font-bold text-foreground mb-2">마이 웨딩</h2>
      <p className="text-sm text-muted-foreground mb-8 max-w-sm leading-relaxed">
        웨딩 준비 현황을 한눈에 확인하고,
        <br />
        체크리스트와 일정을 관리해보세요.
      </p>

      {/* Coming soon features */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-lg">
        {[
          { icon: Calendar, label: "웨딩 일정", desc: "D-Day 타임라인" },
          { icon: MapPin, label: "업체 관리", desc: "계약 업체 현황" },
          { icon: Sparkles, label: "체크리스트", desc: "준비 진행률" },
        ].map((item) => (
          <div
            key={item.label}
            className="p-4 rounded-xl border border-dashed border-border bg-muted/30 text-center"
          >
            <item.icon className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm font-medium text-foreground">{item.label}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Coming soon badge */}
      <div className="mt-8 px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full">
        Coming Soon
      </div>
    </div>
  )
}
