'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Check, FileCheck2, FileX2, Images, X } from 'lucide-react'
import {
  AdminCard,
  AdminPageHeader,
  MockDataNotice,
  StatusBadge,
} from '@/components/admin/admin-ui'
import {
  plannerApplications,
  portfolioReviews,
  type PlannerApplication,
  type PlannerApplicationStatus,
  type PortfolioReview,
  type PortfolioReviewStatus,
} from '@/lib/admin-data'

type Tab = '플래너 가입 심사' | '포트폴리오 승인'

export default function AdminPlannersPage() {
  const [tab, setTab] = useState<Tab>('플래너 가입 심사')
  const [apps, setApps] = useState<PlannerApplication[]>(plannerApplications)
  const [folios, setFolios] = useState<PortfolioReview[]>(portfolioReviews)

  const decideApp = (id: string, next: PlannerApplicationStatus) =>
    setApps((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: next } : a)),
    )

  const decideFolio = (id: string, next: PortfolioReviewStatus) =>
    setFolios((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: next } : f)),
    )

  const pendingApps = apps.filter(
    (a) => a.status === '서류검토' || a.status === '보류',
  ).length
  const pendingFolios = folios.filter((f) => f.status === '검토대기').length

  return (
    <>
      <AdminPageHeader
        title="플래너 승인"
        description={`가입 심사 대기 ${pendingApps}건 · 포트폴리오 검토 대기 ${pendingFolios}건`}
      />

      <MockDataNotice>
        승인 / 반려는 <strong>화면 내 상태만 변경</strong>합니다. 새로고침하면
        초기값으로 돌아갑니다.
      </MockDataNotice>

      <div className="flex gap-1.5">
        {(['플래너 가입 심사', '포트폴리오 승인'] as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
              tab === t
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-accent hover:text-foreground'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === '플래너 가입 심사' ? (
        <div className="flex flex-col gap-3">
          {apps.map((a) => (
            <article
              key={a.id}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5"
            >
              <div className="flex flex-wrap items-start gap-4">
                <Image
                  src={a.avatar}
                  alt={a.name}
                  width={48}
                  height={48}
                  className="size-12 shrink-0 rounded-full object-cover"
                />
                <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-semibold text-foreground">
                      {a.name}
                    </h3>
                    <StatusBadge status={a.status} />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {a.agency} · 경력 {a.career} · {a.region} · {a.appliedAt}{' '}
                    신청
                  </p>
                  {a.specialties.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {a.specialties.map((s) => (
                        <span
                          key={s}
                          className="rounded-full bg-secondary px-2.5 py-1 text-xs text-secondary-foreground"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {a.documents.map((d) => (
                  <span
                    key={d.label}
                    className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs ${
                      d.uploaded
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-destructive/5 text-destructive'
                    }`}
                  >
                    {d.uploaded ? (
                      <FileCheck2 className="size-3.5" />
                    ) : (
                      <FileX2 className="size-3.5" />
                    )}
                    {d.label}
                    {!d.uploaded && ' 미제출'}
                  </span>
                ))}
              </div>

              {(a.status === '서류검토' || a.status === '보류') && (
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => decideApp(a.id, '승인')}
                    className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    <Check className="size-4" />
                    승인
                  </button>
                  {a.status !== '보류' && (
                    <button
                      type="button"
                      onClick={() => decideApp(a.id, '보류')}
                      className="rounded-xl border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                    >
                      보류 (서류 보완 요청)
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => decideApp(a.id, '반려')}
                    className="flex items-center gap-1.5 rounded-xl border border-destructive/30 px-4 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
                  >
                    <X className="size-4" />
                    반려
                  </button>
                </div>
              )}
            </article>
          ))}
        </div>
      ) : (
        <AdminCard
          title="포트폴리오 게시 승인"
          description="플래너가 등록한 포트폴리오를 검토 후 라운지에 노출합니다."
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted-foreground">
                  <th className="px-2 py-3 font-medium">제목</th>
                  <th className="px-2 py-3 font-medium">플래너</th>
                  <th className="px-2 py-3 font-medium">유형 · 지역</th>
                  <th className="px-2 py-3 font-medium">이미지</th>
                  <th className="px-2 py-3 font-medium">상태</th>
                  <th className="px-2 py-3 font-medium">관리</th>
                </tr>
              </thead>
              <tbody>
                {folios.map((f) => (
                  <tr
                    key={f.id}
                    className="border-b border-border/60 last:border-0"
                  >
                    <td className="px-2 py-3.5 font-medium text-foreground">
                      {f.title}
                    </td>
                    <td className="px-2 py-3.5 text-muted-foreground">
                      {f.planner}
                    </td>
                    <td className="px-2 py-3.5 text-muted-foreground">
                      {f.type} · {f.region}
                    </td>
                    <td className="px-2 py-3.5">
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <Images className="size-3.5" />
                        {f.imageCount}
                      </span>
                    </td>
                    <td className="px-2 py-3.5">
                      <StatusBadge status={f.status} />
                    </td>
                    <td className="px-2 py-3.5">
                      {f.status === '검토대기' ? (
                        <div className="flex gap-1.5">
                          <button
                            type="button"
                            onClick={() => decideFolio(f.id, '게시중')}
                            className="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
                          >
                            게시
                          </button>
                          <button
                            type="button"
                            onClick={() => decideFolio(f.id, '반려')}
                            className="rounded-lg border border-destructive/30 px-3 py-1.5 text-xs text-destructive transition-colors hover:bg-destructive/10"
                          >
                            반려
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AdminCard>
      )}
    </>
  )
}
