'use client'

import { useState, useSyncExternalStore } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ClipboardList,
  BadgeCheck,
  MessageCircle,
  CalendarDays,
  ChevronRight,
  MapPin,
  Wallet,
} from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { PageHeader, EmptyState } from '@/components/my-wedding-ui'
import {
  consultations,
  consultationStatuses,
  statusStyles,
  type Consultation,
  type ConsultationStatus,
} from '@/lib/my-wedding-data'
import {
  subscribeConsultations,
  getSubmittedConsultations,
  getServerConsultations,
} from '@/lib/consultation-store'

export default function ConsultationsPage() {
  const [tab, setTab] = useState<ConsultationStatus | '전체'>('전체')

  const submitted = useSyncExternalStore(
    subscribeConsultations,
    getSubmittedConsultations,
    getServerConsultations,
  )

  const allConsultations = [...submitted, ...consultations]

  const countFor = (status: ConsultationStatus | '전체') =>
    status === '전체'
      ? allConsultations.length
      : allConsultations.filter((c) => c.status === status).length

  const filtered =
    tab === '전체' ? allConsultations : allConsultations.filter((c) => c.status === tab)

  return (
    <AppShell>
      <PageHeader
        title="📋 상담내역"
        count={allConsultations.length}
        description="플래너에게 신청한 상담 진행 상황을 한눈에 확인하세요."
      />

      {/* Status tabs */}
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 no-scrollbar">
        {consultationStatuses.map((status) => {
          const active = tab === status
          return (
            <button
              key={status}
              onClick={() => setTab(status)}
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm transition-colors ${
                active
                  ? 'bg-primary font-medium text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-accent'
              }`}
            >
              {status}
              <span
                className={`rounded-full px-1.5 text-[11px] ${
                  active ? 'bg-primary-foreground/20' : 'bg-card text-muted-foreground'
                }`}
              >
                {countFor(status)}
              </span>
            </button>
          )
        })}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<ClipboardList className="size-7" />}
          title="해당하는 상담 내역이 없어요"
          description="마음에 드는 플래너에게 상담을 신청하면 이곳에서 진행 상황을 확인할 수 있어요."
        />
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map((c) => (
            <ConsultationCard key={c.id} consultation={c} />
          ))}
        </div>
      )}
    </AppShell>
  )
}

function ConsultationCard({ consultation: c }: { consultation: Consultation }) {
  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 sm:p-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Image
            src={c.planner.avatar || '/placeholder.svg'}
            alt={c.planner.name}
            width={48}
            height={48}
            className="size-12 rounded-full object-cover"
          />
          <div className="flex flex-col gap-0.5">
            <span className="flex items-center gap-1 font-medium text-foreground">
              {c.planner.name} 플래너
              {c.planner.verified && <BadgeCheck className="size-4 text-primary" />}
            </span>
            <span className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-xs text-muted-foreground">
              <span>{c.weddingType}</span>
              <span className="flex items-center gap-0.5">
                <MapPin className="size-3" />
                {c.region}
              </span>
              <span className="flex items-center gap-0.5">
                <Wallet className="size-3" />
                {c.budget}
              </span>
            </span>
          </div>
        </div>
        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${statusStyles[c.status]}`}
        >
          {c.status}
        </span>
      </div>

      {/* Message preview */}
      <p className="rounded-xl bg-secondary/60 px-3.5 py-2.5 text-sm leading-relaxed text-secondary-foreground">
        {c.message}
      </p>

      {/* Timeline */}
      <ol className="flex items-center justify-between gap-1">
        {c.timeline.map((step, idx) => (
          <li key={step.label} className="flex flex-1 flex-col items-center gap-1.5 text-center">
            <div className="flex w-full items-center">
              <span
                className={`h-0.5 flex-1 ${idx === 0 ? 'bg-transparent' : c.timeline[idx].done ? 'bg-primary' : 'bg-border'}`}
              />
              <span
                className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 ${
                  step.done
                    ? 'border-primary bg-primary'
                    : 'border-border bg-card'
                }`}
              >
                {step.done && <span className="size-1.5 rounded-full bg-primary-foreground" />}
              </span>
              <span
                className={`h-0.5 flex-1 ${idx === c.timeline.length - 1 ? 'bg-transparent' : c.timeline[idx + 1].done ? 'bg-primary' : 'bg-border'}`}
              />
            </div>
            <span
              className={`text-[11px] leading-tight ${step.done ? 'font-medium text-foreground' : 'text-muted-foreground'}`}
            >
              {step.label}
            </span>
            <span className="text-[10px] text-muted-foreground">{step.date}</span>
          </li>
        ))}
      </ol>

      {/* Schedule info */}
      {c.scheduleDate && (
        <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm">
          <CalendarDays className="size-4 text-primary" />
          <span className="text-muted-foreground">상담 일정</span>
          <span className="font-medium text-foreground">{c.scheduleDate}</span>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2">
        <button className="relative flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
          <MessageCircle className="size-4" />
          채팅
          {c.unreadMessages > 0 && (
            <span className="flex min-w-4 items-center justify-center rounded-full bg-primary-foreground px-1 text-[10px] font-semibold leading-4 text-primary">
              {c.unreadMessages}
            </span>
          )}
        </button>
        <button className="flex items-center gap-1.5 rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent">
          <CalendarDays className="size-4" />
          일정
        </button>
        <Link
          href={`/portfolio/${consultationPortfolioId(c)}`}
          className="ml-auto flex items-center gap-1 rounded-xl px-3 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-accent"
        >
          상세보기
          <ChevronRight className="size-4" />
        </Link>
      </div>
    </article>
  )
}

// Map a consultation back to a representative portfolio for the detail link.
function consultationPortfolioId(c: Consultation) {
  const map: Record<string, string> = {
    p1: 'w1',
    p2: 'w2',
    p3: 'w3',
    p4: 'w4',
  }
  return map[c.planner.id] ?? 'w1'
}
