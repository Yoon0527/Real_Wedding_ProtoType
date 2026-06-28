'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Loader2 } from 'lucide-react'
import { portfolios } from '@/lib/wedding-data'
import { PortfolioCard } from './portfolio-card'

const PAGE_SIZE = 12

export function MasonryFeed() {
  const [count, setCount] = useState(PAGE_SIZE)
  const [loading, setLoading] = useState(false)
  const sentinel = useRef<HTMLDivElement>(null)

  // Repeat the dataset to simulate an endless feed with unique keys
  const buildItems = (n: number) =>
    Array.from({ length: n }, (_, i) => {
      const base = portfolios[i % portfolios.length]
      return { ...base, key: `${base.id}-${i}` }
    })

  const items = buildItems(count)

  const loadMore = useCallback(() => {
    setLoading(true)
    const t = setTimeout(() => {
      setCount((c) => c + PAGE_SIZE)
      setLoading(false)
    }, 600)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const el = sentinel.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && count < 96) {
          loadMore()
        }
      },
      { rootMargin: '600px' },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [loadMore, loading, count])

  return (
    <div>
      <div className="columns-2 gap-4 sm:columns-3 lg:columns-3 xl:columns-4 2xl:columns-5">
        {items.map((item) => (
          <PortfolioCard key={item.key} item={item} />
        ))}
      </div>

      <div ref={sentinel} className="flex justify-center py-8">
        {loading && (
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        )}
      </div>
    </div>
  )
}
