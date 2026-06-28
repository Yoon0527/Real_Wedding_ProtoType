import type { Consultation } from '@/lib/my-wedding-data'

/**
 * Lightweight in-memory store for consultation requests submitted during the session.
 * App Router navigations are client-side, so requests created from the lounge/cards
 * appear in MY 웨딩 → 상담내역 without a full reload. (Resets on hard refresh.)
 */
let submitted: Consultation[] = []
const listeners = new Set<() => void>()
const emptySnapshot: Consultation[] = []

export function addConsultation(consultation: Consultation) {
  submitted = [consultation, ...submitted]
  listeners.forEach((l) => l())
}

export function subscribeConsultations(cb: () => void) {
  listeners.add(cb)
  return () => listeners.delete(cb)
}

export function getSubmittedConsultations() {
  return submitted
}

export function getServerConsultations() {
  return emptySnapshot
}
