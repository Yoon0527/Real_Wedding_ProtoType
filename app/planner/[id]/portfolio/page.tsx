import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, BadgeCheck, Star, MapPin } from 'lucide-react'
import { planners, portfolios } from '@/lib/wedding-data'

export function generateStaticParams() {
  return planners.map((p) => ({ id: p.id }))
}

export default async function PlannerPortfolioPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const planner = planners.find((p) => p.id === id)
  if (!planner) notFound()

  const works = portfolios.filter((p) => p.planner.id === planner.id)

  return (
    <div className="min-h-dvh bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center gap-2 px-4 py-3 md:px-6">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-foreground transition-colors hover:text-primary"
          >
            <ChevronLeft className="size-4" />
            플래너 라운지
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-8 md:px-6">
        {/* Planner header */}
        <div className="mb-8 flex items-center gap-4">
          <Image
            src={planner.avatar || '/placeholder.svg'}
            alt={planner.name}
            width={72}
            height={72}
            className="size-18 rounded-full object-cover"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-serif text-2xl font-semibold text-foreground">
                {planner.name} 플래너
              </h1>
              {planner.verified && <BadgeCheck className="size-5 text-primary" />}
            </div>
            <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Star className="size-3.5 fill-primary text-primary" />
                {planner.rating} ({planner.reviews})
              </span>
              <span>포트폴리오 {works.length}개</span>
            </div>
          </div>
        </div>

        <h2 className="mb-5 font-serif text-xl font-semibold text-foreground">
          전체 포트폴리오
        </h2>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {works.map((w) => (
            <Link key={w.id} href={`/portfolio/${w.id}`} className="group flex flex-col gap-2">
              <div className="overflow-hidden rounded-2xl">
                <Image
                  src={w.image || '/placeholder.svg'}
                  alt={w.title}
                  width={240}
                  height={240}
                  className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <span className="truncate px-0.5 text-sm font-medium text-foreground">
                {w.title}
              </span>
              <span className="-mt-1.5 flex items-center gap-1 px-0.5 text-xs text-muted-foreground">
                <MapPin className="size-3" />
                {w.type} · {w.region}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
