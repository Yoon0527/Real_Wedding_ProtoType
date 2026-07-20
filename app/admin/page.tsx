'use client'

import {
  AdminCard,
  AdminPageHeader,
  MockDataNotice,
  StatCard,
} from '@/components/admin/admin-ui'
import { TrafficChart } from '@/components/admin/traffic-chart'
import {
  conversionFunnel,
  summaryStats,
  topContents,
  trafficSeries,
} from '@/lib/admin-data'

export default function AdminDashboardPage() {
  const funnelMax = conversionFunnel[0].value

  return (
    <>
      <AdminPageHeader
        title="대시보드"
        description="최근 14일 서비스 지표 요약"
      />

      <MockDataNotice>
        <strong>목업 지표입니다.</strong> 현재 저장소에는 데이터베이스와 클릭
        추적 코드가 없습니다. 실제 수치를 보려면 이벤트 로그 수집을 도입한 뒤{' '}
        <code className="rounded bg-amber-100 px-1 py-0.5">lib/admin-data.ts</code>
        의 <code className="rounded bg-amber-100 px-1 py-0.5">trafficSeries</code>
        · <code className="rounded bg-amber-100 px-1 py-0.5">topContents</code> 를
        API 응답으로 교체하세요.
      </MockDataNotice>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {summaryStats.map((s) => (
          <StatCard
            key={s.key}
            label={s.label}
            value={s.value}
            delta={s.delta}
            hint={s.hint}
          />
        ))}
      </div>

      <AdminCard
        title="일별 조회수 · 클릭수"
        description="최근 14일 (2026-07-05 ~ 07-18)"
      >
        <TrafficChart data={trafficSeries} />
      </AdminCard>

      <div className="grid gap-4 lg:grid-cols-2">
        <AdminCard title="클릭 상위 콘텐츠" description="최근 7일 누적">
          <ul className="flex flex-col gap-3">
            {topContents.map((c, i) => {
              const ctr = ((c.clicks / c.views) * 100).toFixed(1)
              return (
                <li key={c.id} className="flex items-center gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-semibold text-muted-foreground">
                    {i + 1}
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="truncate text-sm text-foreground">
                      {c.title}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {c.kind} · 조회 {c.views.toLocaleString()} · 클릭{' '}
                      {c.clicks.toLocaleString()}
                    </span>
                  </div>
                  <span className="shrink-0 text-sm font-semibold text-primary">
                    {ctr}%
                  </span>
                </li>
              )
            })}
          </ul>
        </AdminCard>

        <AdminCard
          title="전환 퍼널"
          description="방문 → 상담 신청까지의 단계별 이탈"
        >
          <ul className="flex flex-col gap-3">
            {conversionFunnel.map((step, i) => {
              const pct = (step.value / funnelMax) * 100
              const prev = i > 0 ? conversionFunnel[i - 1].value : null
              return (
                <li key={step.label} className="flex flex-col gap-1.5">
                  <div className="flex items-baseline justify-between text-sm">
                    <span className="text-foreground">{step.label}</span>
                    <span className="flex items-baseline gap-2">
                      <span className="font-semibold text-foreground">
                        {step.value.toLocaleString()}
                      </span>
                      {prev && (
                        <span className="text-xs text-muted-foreground">
                          {((step.value / prev) * 100).toFixed(1)}%
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${Math.max(pct, 1.5)}%` }}
                    />
                  </div>
                </li>
              )
            })}
          </ul>
        </AdminCard>
      </div>
    </>
  )
}
