'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, BadgeCheck, Star, Clock, Check } from 'lucide-react'
import type { Planner } from '@/lib/wedding-data'

const budgetOptions = [
  '1000~3000만원',
  '3000~5000만원',
  '5000만원 이상',
  '럭셔리 웨딩',
]

export type ConsultationFormData = {
  name: string
  phone: string
  weddingDate: string
  budget: string
  message: string
}

export function ConsultationModal({
  open,
  onClose,
  planner,
  onSubmit,
}: {
  open: boolean
  onClose: () => void
  planner: Planner
  onSubmit: (data: ConsultationFormData) => void
}) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [weddingDate, setWeddingDate] = useState('')
  const [budget, setBudget] = useState('')
  const [message, setMessage] = useState('')
  const [agreed, setAgreed] = useState(false)

  if (!open) return null

  const valid =
    name.trim() && phone.trim() && weddingDate && budget && message.trim() && agreed

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!valid) return
    onSubmit({ name, phone, weddingDate, budget, message })
    // reset for next time
    setName('')
    setPhone('')
    setWeddingDate('')
    setBudget('')
    setMessage('')
    setAgreed(false)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/45 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="상담 신청하기"
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[92vh] w-full max-w-[560px] flex-col overflow-hidden rounded-t-3xl bg-card shadow-2xl duration-200 animate-in fade-in zoom-in-95 sm:rounded-3xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="text-xl font-semibold text-foreground">
            상담 신청하기
          </h2>
          <button
            aria-label="닫기"
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar">
          {/* Planner summary */}
          <div className="flex items-center gap-3 border-b border-border bg-secondary/40 px-6 py-4">
            <Image
              src={planner.avatar || '/placeholder.svg'}
              alt={planner.name}
              width={52}
              height={52}
              className="size-12 rounded-full object-cover"
            />
            <div className="flex flex-col gap-0.5">
              <span className="flex items-center gap-1 font-medium text-foreground">
                {planner.name} 플래너
                {planner.verified && <BadgeCheck className="size-4 text-primary" />}
              </span>
              <span className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-0.5">
                  <Star className="size-3.5 fill-primary text-primary" />
                  {planner.rating}
                </span>
                <span className="flex items-center gap-0.5">
                  <Clock className="size-3.5" />
                  평균 응답시간 {planner.responseTime.replace('평균 ', '')}
                </span>
              </span>
            </div>
          </div>

          {/* Form */}
          <form id="consultation-form" onSubmit={handleSubmit} className="flex flex-col gap-4 px-6 py-5">
            <Field label="이름" required>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="이름을 입력해주세요"
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
              />
            </Field>

            <Field label="연락처" required>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="010-0000-0000"
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
              />
            </Field>

            <Field label="예식 예정일" required>
              <input
                type="date"
                value={weddingDate}
                onChange={(e) => setWeddingDate(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-primary"
              />
            </Field>

            <Field label="예상 예산" required>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-primary"
              >
                <option value="" disabled>
                  예산을 선택해주세요
                </option>
                {budgetOptions.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="문의 내용" required>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value.slice(0, 300))}
                rows={4}
                placeholder="원하시는 웨딩 스타일, 하객 규모, 희망 일정 등을 자유롭게 작성해주세요."
                className="w-full resize-none rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
              />
              <span className="mt-1 block text-right text-[11px] text-muted-foreground">
                {message.length} / 300
              </span>
            </Field>

            {/* Agreement */}
            <label className="flex cursor-pointer items-center gap-2.5 rounded-xl bg-secondary/50 px-3.5 py-3">
              <button
                type="button"
                role="checkbox"
                aria-checked={agreed}
                onClick={() => setAgreed((v) => !v)}
                className={`flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                  agreed
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-muted-foreground/40 bg-card text-transparent'
                }`}
              >
                <Check className="size-3.5" />
              </button>
              <span className="flex-1 text-xs text-secondary-foreground">
                개인정보 수집 및 이용에 동의합니다.{' '}
                <span className="text-muted-foreground">(필수)</span>
              </span>
              <button
                type="button"
                className="shrink-0 text-xs text-primary underline-offset-2 hover:underline"
              >
                자세히 보기
              </button>
            </label>
          </form>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 border-t border-border px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-border py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            취소
          </button>
          <button
            type="submit"
            form="consultation-form"
            disabled={!valid}
            className="flex-1 rounded-xl bg-primary py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            상담 신청하기
          </button>
        </div>
      </div>
    </div>
  )
}

function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="ml-0.5 text-primary">*</span>}
      </label>
      {children}
    </div>
  )
}
