'use client'

import { useMemo, useState } from 'react'
import { Check, ImageIcon, Store, X } from 'lucide-react'
import {
  AdminPageHeader,
  FilterTabs,
  MockDataNotice,
  StatCard,
  StatusBadge,
} from '@/components/admin/admin-ui'
import {
  formatWon,
  receiptReviews,
  type ReceiptReview,
  type ReceiptStatus,
} from '@/lib/admin-data'

const statusFilters: (ReceiptStatus | '전체')[] = [
  '전체',
  '검토대기',
  '승인',
  '반려',
]

export default function AdminReceiptsPage() {
  const [list, setList] = useState<ReceiptReview[]>(receiptReviews)
  const [status, setStatus] = useState<ReceiptStatus | '전체'>('검토대기')

  const filtered = useMemo(
    () => list.filter((r) => status === '전체' || r.status === status),
    [list, status],
  )

  const count = (s: ReceiptStatus) => list.filter((r) => r.status === s).length

  const decide = (id: string, next: ReceiptStatus, reason?: string) =>
    setList((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: next, rejectReason: reason } : r,
      ),
    )

  return (
    <>
      <AdminPageHeader
        title="영수증 인증 심사"
        description="후기에 첨부된 결제 영수증을 검토하고 인증 배지를 부여합니다."
      />

      <MockDataNotice>
        승인 / 반려 버튼은 <strong>화면 내 상태만 변경</strong>합니다. 새로고침
        하면 초기값으로 돌아가며, 실제 반영에는 백엔드 API가 필요합니다.
      </MockDataNotice>

      <div className="grid grid-cols-3 gap-4">
        <StatCard label="검토대기" value={`${count('검토대기')}건`} />
        <StatCard label="승인" value={`${count('승인')}건`} />
        <StatCard label="반려" value={`${count('반려')}건`} />
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
                    {r.category}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-foreground">
                  {r.postTitle}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {r.submitter} · {r.submittedAt} 제출
                </p>
              </div>
              <span className="shrink-0 text-lg font-bold tabular-nums text-primary">
                {formatWon(r.claimedAmount)}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 rounded-xl bg-muted/60 px-4 py-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Store className="size-3.5" />
                {r.vendor}
              </span>
              <span className="flex items-center gap-1.5">
                <ImageIcon className="size-3.5" />
                영수증 이미지 {r.imageCount}장
              </span>
            </div>

            {r.rejectReason && (
              <p className="rounded-xl bg-destructive/5 px-4 py-3 text-xs leading-relaxed text-destructive">
                반려 사유: {r.rejectReason}
              </p>
            )}

            {r.status === '검토대기' && (
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => decide(r.id, '승인')}
                  className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  <Check className="size-4" />
                  인증 승인
                </button>
                <button
                  type="button"
                  onClick={() =>
                    decide(r.id, '반려', '관리자 검토 결과 인증 요건 미충족')
                  }
                  className="flex items-center gap-1.5 rounded-xl border border-destructive/30 px-4 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
                >
                  <X className="size-4" />
                  반려
                </button>
              </div>
            )}
          </article>
        ))}

        {filtered.length === 0 && (
          <p className="rounded-2xl border border-border bg-card px-5 py-10 text-center text-sm text-muted-foreground">
            해당 상태의 심사 건이 없습니다.
          </p>
        )}
      </div>
    </>
  )
}
