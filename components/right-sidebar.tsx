import Image from 'next/image'
import { Star, BadgeCheck, ArrowRight } from 'lucide-react'
import { planners, advertisements } from '@/lib/wedding-data'
import { AdCard } from '@/components/ad-card'

export function RightSidebar() {
  const ranking = [...planners]
    .sort((a, b) => b.consultations - a.consultations)
    .slice(0, 3)

  const ads = [...advertisements].sort(
    (a, b) => a.exposurePriority - b.exposurePriority,
  )

  return (
    <aside className="hidden xl:flex w-[300px] shrink-0 flex-col gap-5 overflow-y-auto no-scrollbar border-l border-border bg-sidebar px-5 py-6">
      {/* Section 1 — This week's popular planners */}
      <section className="shrink-0 rounded-2xl border border-border bg-card p-4 shadow-sm">
        <h3 className="mb-3 font-serif text-lg font-semibold text-foreground">
          이번 주 인기 플래너
        </h3>
        <div className="flex flex-col gap-3">
          {ranking.map((p, i) => (
            <div key={p.id} className="flex items-center gap-3">
              <span className="w-4 text-center font-serif text-lg font-semibold text-primary">
                {i + 1}
              </span>
              <Image
                src={p.avatar || '/placeholder.svg'}
                alt={p.name}
                width={40}
                height={40}
                className="size-10 rounded-full object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1">
                  <span className="truncate text-sm font-medium text-foreground">
                    {p.name} 플래너
                  </span>
                  {p.verified && <BadgeCheck className="size-3.5 shrink-0 text-primary" />}
                </div>
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-0.5">
                    <Star className="size-3 fill-primary text-primary" />
                    {p.rating}
                  </span>
                  <span>상담 {p.consultations.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="mt-4 flex w-full items-center justify-center gap-1 rounded-xl bg-secondary py-2.5 text-xs font-medium text-secondary-foreground transition-colors hover:bg-accent">
          더 많은 인기 플래너 보기
          <ArrowRight className="size-3.5" />
        </button>
      </section>

      {/* Sections 2-6 — Advertisement slots */}
      {ads.map((ad) => (
        <AdCard key={ad.id} ad={ad} />
      ))}

      {/* Footer disclosure */}
      <p className="px-1 text-[10px] leading-relaxed text-muted-foreground">
        위 콘텐츠는 광고 제휴를 통해 제공되는 스폰서 광고입니다.
      </p>
    </aside>
  )
}
