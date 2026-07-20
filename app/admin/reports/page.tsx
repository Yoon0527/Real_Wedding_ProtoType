'use client'

import { useMemo, useState } from 'react'
import { AlertTriangle, Flag, Trash2, Undo2 } from 'lucide-react'
import {
  AdminPageHeader,
  FilterTabs,
  MockDataNotice,
  StatCard,
  StatusBadge,
} from '@/components/admin/admin-ui'
import {
  contentReports,
  type ContentReport,
  type ReportStatus,
} from '@/lib/admin-data'

const statusFilters: (ReportStatus | '전체')[] = [
  '전체',
  '처리대기',
  '경고',
  '삭제됨',
  '반려',
]

export default function AdminReportsPage() {
  const [list, setList] = useState<ContentReport[]>(contentReports)
  const [status, setStatus] = useState<ReportStatus | '전체'>('처리대기')

  const filtered = useMemo(
    () =>
      [...list]
        .filter((r) => status === '전체' || r.status === status)
        .sort((a, b) => b.reportCount - a.reportCount),
    [list, status],
  )

  const decide = (id: string, next: ReportStatus) =>
    setList((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: next } : r)),
    )

  const pending = list.filter((r) => r.status === '처리대기').length
  const totalReports = list.reduce((sum, r) => sum + r.reportCount, 0)

  return (
    <>
      <AdminPageHeader
        title="콘텐츠 모더레이션"
        description="신고된 게시글 · 후기 · 댓글을 검토하고 조치합니다."
      />

      <MockDataNotice>
        조치 버튼은 <strong>화면 내 상태만 변경</strong>합니다. 실제 콘텐츠는
        삭제되지 않으며, 새로고침하면 초기값으로 돌아갑니다.
      </MockDataNotice>

      <div className="grid grid-cols-3 gap-4">
        <StatCard label="처리 대기" value={`${pending}건`} />
        <StatCard label="누적 신고 수" value={`${totalReports}회`} />
        <StatCard
          label="조치 완료"
          value={`${list.filter((r) => r.status !== '처리대기').length}건`}
        />
      </div>

      <FilterTabs options={statusFilters} value={status} onChange={setStatus} />

      <div className="flex flex-col gap-3">
        {filtered.map((r) => (
          <article
            key={r.id}
            className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex min-w-0 flex-col gap-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge status={r.status} />
                  <span className="rounded-full bg-secondary px-2.5 py-1 text-xs text-secondary-foreground">
                    {r.targetType}
                  </span>
                  <span className="flex items-center gap-1 rounded-full bg-destructive/10 px-2.5 py-1 text-xs font-medium text-destructive">
                    <Flag className="size-3" />
                    {r.reason}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-foreground">
                  {r.targetTitle}
                </h3>
                <p className="text-xs text-muted-foreground">
                  작성자 {r.author} · {r.reportedAt} 신고
                </p>
              </div>
              <span className="flex shrink-0 items-center gap-1.5 text-sm font-semibold text-destructive">
                <AlertTriangle className="size-4" />
                신고 {r.reportCount}회
              </span>
            </div>

            <blockquote className="rounded-xl border-l-2 border-border bg-muted/60 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
              {r.excerpt}
            </blockquote>

            {r.status === '처리대기' && (
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => decide(r.id, '삭제됨')}
                  className="flex items-center gap-1.5 rounded-xl border border-destructive/30 px-4 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
                >
                  <Trash2 className="size-4" />
                  콘텐츠 삭제
                </button>
                <button
                  type="button"
                  onClick={() => decide(r.id, '경고')}
                  className="rounded-xl border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                >
                  작성자 경고
                </button>
                <button
                  type="button"
                  onClick={() => decide(r.id, '반려')}
                  className="flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <Undo2 className="size-4" />
                  신고 반려
                </button>
              </div>
            )}
          </article>
        ))}

        {filtered.length === 0 && (
          <p className="rounded-2xl border border-border bg-card px-5 py-10 text-center text-sm text-muted-foreground">
            해당 상태의 신고 건이 없습니다.
          </p>
        )}
      </div>
    </>
  )
}
