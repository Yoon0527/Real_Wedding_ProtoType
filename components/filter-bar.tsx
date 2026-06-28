'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { budgetTierLabels } from '@/lib/wedding-data'

export type LoungeFilters = {
  region: string
  category: string
  style: string
  budget: string
  rating: string
  available: boolean
  sort: string
}

export const defaultFilters: LoungeFilters = {
  region: '',
  category: '',
  style: '',
  budget: '',
  rating: '',
  available: false,
  sort: '추천순',
}

const dropdownFilters: { key: keyof LoungeFilters; label: string; options: string[] }[] = [
  {
    key: 'region',
    label: '지역 전체',
    options: ['서울', '경기', '인천', '부산', '제주'],
  },
  {
    key: 'category',
    label: '주요 카테고리',
    options: ['인기 플래너', '신규 플래너', '응답 빠른 플래너', '인증 플래너', '계약 TOP 플래너'],
  },
  {
    key: 'style',
    label: '웨딩 스타일',
    options: ['스몰웨딩', '호텔웨딩', '야외웨딩', '하우스웨딩', '채플웨딩', '가든웨딩', '전통혼례'],
  },
  {
    key: 'budget',
    label: '예산 범위',
    options: [...budgetTierLabels],
  },
  {
    key: 'rating',
    label: '별점 전체',
    options: ['4.0+', '4.5+', '4.8+'],
  },
]

const sortOptions = ['추천순', '인기순', '리뷰 많은순', '최신순', '낮은 가격순']

function Dropdown({
  label,
  options,
  value,
  onChange,
  align = 'left',
}: {
  label: string
  options: string[]
  value: string
  onChange: (v: string) => void
  align?: 'left' | 'right'
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const active = Boolean(value)

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm transition-colors ${
          active
            ? 'border-primary bg-accent text-accent-foreground'
            : 'border-border bg-card text-secondary-foreground hover:border-primary/60'
        }`}
      >
        <span className={active ? 'font-medium' : ''}>{value || label}</span>
        <ChevronDown
          className={`size-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          className={`absolute z-30 mt-2 min-w-[180px] overflow-hidden rounded-2xl border border-border bg-popover p-1.5 shadow-lg ${
            align === 'right' ? 'right-0' : 'left-0'
          }`}
        >
          {value && (
            <button
              onClick={() => {
                onChange('')
                setOpen(false)
              }}
              className="mb-1 w-full rounded-lg px-3 py-2 text-left text-xs text-muted-foreground hover:bg-secondary"
            >
              선택 해제
            </button>
          )}
          {options.map((opt) => {
            const selected = value === opt
            return (
              <button
                key={opt}
                onClick={() => {
                  onChange(opt)
                  setOpen(false)
                }}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  selected
                    ? 'bg-secondary font-medium text-secondary-foreground'
                    : 'text-popover-foreground hover:bg-secondary'
                }`}
              >
                {opt}
                {selected && <Check className="size-3.5 text-primary" />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export function FilterBar({
  filters,
  onChange,
}: {
  filters: LoungeFilters
  onChange: (next: LoungeFilters) => void
}) {
  const set = (key: keyof LoungeFilters, value: string | boolean) =>
    onChange({ ...filters, [key]: value })

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {dropdownFilters.map((f) => (
        <Dropdown
          key={f.key}
          label={f.label}
          options={f.options}
          value={(filters[f.key] as string) || ''}
          onChange={(v) => set(f.key, v)}
        />
      ))}

      <button
        onClick={() => set('available', !filters.available)}
        className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors ${
          filters.available
            ? 'border-primary bg-primary text-primary-foreground'
            : 'border-border bg-card text-secondary-foreground hover:border-primary/60'
        }`}
      >
        <span
          className={`relative inline-flex h-4 w-7 items-center rounded-full transition-colors ${
            filters.available ? 'bg-primary-foreground/30' : 'bg-muted-foreground/25'
          }`}
        >
          <span
            className={`absolute size-3 rounded-full bg-card transition-transform ${
              filters.available ? 'translate-x-3.5' : 'translate-x-0.5'
            }`}
          />
        </span>
        상담 가능 플래너만 보기
      </button>

      <div className="ml-auto">
        <Dropdown
          label="추천순"
          options={sortOptions}
          value={filters.sort}
          onChange={(v) => set('sort', v || '추천순')}
          align="right"
        />
      </div>
    </div>
  )
}
