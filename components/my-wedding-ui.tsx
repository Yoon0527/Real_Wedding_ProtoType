import type { ReactNode } from 'react'
import Link from 'next/link'

export function PageHeader({
  title,
  count,
  description,
  action,
}: {
  title: string
  count?: number
  description?: string
  action?: ReactNode
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div className="flex flex-col gap-1">
        <h1 className="flex items-center gap-2 text-2xl font-semibold text-foreground">
          {title}
          {typeof count === 'number' && (
            <span className="text-base font-normal text-muted-foreground">{count}</span>
          )}
        </h1>
        {description && (
          <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
        )}
      </div>
      {action}
    </div>
  )
}

export function EmptyState({
  icon,
  title,
  description,
}: {
  icon: ReactNode
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-border bg-card/50 px-6 py-20 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-secondary text-muted-foreground">
        {icon}
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
      <Link
        href="/"
        className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        플래너 둘러보기
      </Link>
    </div>
  )
}
