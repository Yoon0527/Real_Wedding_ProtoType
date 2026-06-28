'use client'

import { useMemo, useState } from 'react'
import { SearchX } from 'lucide-react'
import { portfolios, budgetLabel, budgetTierIndex, type Portfolio } from '@/lib/wedding-data'
import { FilterBar, defaultFilters, type LoungeFilters } from './filter-bar'
import { MasonryFeed } from './masonry-feed'
import { PortfolioCard } from './portfolio-card'

function responseMinutes(responseTime: string) {
  const match = responseTime.match(/\d+/)
  return match ? Number(match[0]) : 999
}

function matchesCategory(p: Portfolio, category: string) {
  switch (category) {
    case '인기 플래너':
      return p.badge === '인기'
    case '신규 플래너':
      return p.badge === 'NEW'
    case '응답 빠른 플래너':
      return p.badge === '응답빠름'
    case '인증 플래너':
      return p.planner.verified
    case '계약 TOP 플래너':
      return p.planner.consultations >= 1000
    default:
      return true
  }
}

export function LoungeFeed({ items }: { items?: Portfolio[] } = {}) {
  const [filters, setFilters] = useState<LoungeFilters>(defaultFilters)

  const source = items ?? portfolios
  const usingCustomItems = items !== undefined

  const filtersActive = Boolean(
    filters.region ||
      filters.category ||
      filters.style ||
      filters.budget ||
      filters.rating ||
      filters.available,
  )
  const sortActive = filters.sort !== '추천순'

  const results = useMemo(() => {
    let list = source.filter((p) => {
      if (filters.region && p.region !== filters.region) return false
      if (filters.style && p.type !== filters.style) return false
      if (filters.budget && budgetLabel(p) !== filters.budget) return false
      if (filters.rating && p.rating < Number.parseFloat(filters.rating)) return false
      if (filters.category && !matchesCategory(p, filters.category)) return false
      if (filters.available && responseMinutes(p.planner.responseTime) > 20) return false
      return true
    })

    switch (filters.sort) {
      case '인기순':
        list = [...list].sort((a, b) => b.likes - a.likes)
        break
      case '리뷰 많은순':
        list = [...list].sort((a, b) => b.comments - a.comments)
        break
      case '최신순':
        list = [...list].reverse()
        break
      case '낮은 가격순':
        list = [...list].sort((a, b) => budgetTierIndex(a) - budgetTierIndex(b))
        break
      default:
        break
    }
    return list
  }, [filters, source])

  return (
    <div className="flex flex-col gap-6">
      <FilterBar filters={filters} onChange={setFilters} />

      {/* When nothing is filtered or sorted, preserve the original infinite masonry feed */}
      {!usingCustomItems && !filtersActive && !sortActive ? (
        <MasonryFeed />
      ) : results.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-border bg-card/60 px-6 py-20 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-secondary text-muted-foreground">
            <SearchX className="size-7" />
          </div>
          <div className="flex flex-col gap-1.5">
            <h3 className="text-lg font-semibold text-foreground">검색 결과가 없습니다.</h3>
            <p className="text-sm text-muted-foreground">
              선택하신 조건에 맞는 플래너가 없습니다.
            </p>
          </div>
          <button
            onClick={() => setFilters(defaultFilters)}
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            필터 초기화
          </button>
        </div>
      ) : (
        <div className="columns-2 gap-4 sm:columns-3 lg:columns-3 xl:columns-4 2xl:columns-5">
          {results.map((item) => (
            <PortfolioCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}
