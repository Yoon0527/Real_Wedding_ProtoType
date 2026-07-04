import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Advertisement } from '@/lib/wedding-data'

export function AdCard({ ad }: { ad: Advertisement }) {
  return (
    <Link
      href={ad.destinationUrl}
      aria-label={`${ad.title} 광고 - ${ad.advertiserName}`}
      className="group relative block shrink-0 overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      {/* AD badge */}
      <span className="absolute right-2.5 top-2.5 z-10 rounded-md bg-foreground/55 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-background backdrop-blur-sm">
        AD
      </span>

      {/* Image */}
      <div className="relative h-36 w-full overflow-hidden">
        <Image
          src={ad.image || '/placeholder.svg'}
          alt={ad.title}
          fill
          sizes="300px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
      </div>

      {/* Body */}
      <div className="flex flex-col gap-1 p-4">
        <span className="text-base font-semibold leading-snug text-foreground">
          {ad.title}
        </span>
        <span className="text-sm font-medium text-primary">{ad.subtitle}</span>
        <span className="text-xs text-muted-foreground">{ad.description}</span>

        <span className="mt-3 flex items-center justify-between">
          <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3.5 py-1.5 text-xs font-medium text-primary-foreground transition-opacity group-hover:opacity-90">
            {ad.ctaText}
            <ArrowRight className="size-3.5" />
          </span>
          <span className="text-[10px] text-muted-foreground">{ad.advertiserName}</span>
        </span>
      </div>
    </Link>
  )
}
